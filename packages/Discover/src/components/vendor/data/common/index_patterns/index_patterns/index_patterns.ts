/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { SavedObjectsClientCommon } from "../..";

import { createIndexPatternCache } from "./_pattern_cache";
import { IndexPattern } from "./index_pattern";
import {
  createEnsureDefaultIndexPattern,
  EnsureDefaultIndexPattern,
} from "./ensure_default_index_pattern";
import {
  OnNotification,
  OnError,
  OnUnsupportedTimePattern,
  UiSettingsCommon,
  IIndexPatternsApiClient,
  GetFieldsOptions,
  IndexPatternSpec,
  IndexPatternAttributes,
  FieldSpec,
  FieldFormatMap,
  IndexPatternFieldMap,
} from "../types";
import { FieldFormatsStartCommon } from "../../field_formats";
import { UI_SETTINGS, SavedObject } from "../../../common";
import { SavedObjectNotFound } from "../../../../utils/common";
import { IndexPatternMissingIndices } from "../lib";
import { findByTitle } from "../utils";
import { DuplicateIndexPatternError } from "../errors";
import { createKbnFieldTypes } from "../../kbn_field_types/kbn_field_types_factory";

const MAX_ATTEMPTS_TO_RESOLVE_CONFLICTS = 3;
const savedObjectType = "view";

export interface IndexPatternSavedObjectAttrs {
  title: string;
}

interface IndexPatternsServiceDeps {
  uiSettings: UiSettingsCommon;
  savedObjectsClient: SavedObjectsClientCommon;
  apiClient: IIndexPatternsApiClient;
  fieldFormats: FieldFormatsStartCommon;
  onNotification: OnNotification;
  onError: OnError;
  onRedirectNoIndexPattern?: () => void;
  onUnsupportedTimePattern: OnUnsupportedTimePattern;
  getIndexPattern: any;
}

export class IndexPatternsService {
  private config: UiSettingsCommon;
  private savedObjectsClient: SavedObjectsClientCommon;
  private savedObjectsCache?: Array<
    SavedObject<IndexPatternSavedObjectAttrs>
  > | null;
  private apiClient: IIndexPatternsApiClient;
  private fieldFormats: FieldFormatsStartCommon;
  private onNotification: OnNotification;
  private onError: OnError;
  private onUnsupportedTimePattern: OnUnsupportedTimePattern;
  private getIndexPattern: any;
  // A service can be rebound to another host session. Its old requests must not
  // refill the new session's fields or change retained saved objects.
  public generation = 0;
  private indexPatternCache = createIndexPatternCache();
  private patternGenerations = new WeakMap<IndexPattern, number>();
  ensureDefaultIndexPattern: EnsureDefaultIndexPattern;

  constructor({
    uiSettings,
    savedObjectsClient,
    apiClient,
    fieldFormats,
    onNotification,
    onError,
    onUnsupportedTimePattern,
    onRedirectNoIndexPattern = () => {},
    getIndexPattern,
  }: IndexPatternsServiceDeps) {
    this.apiClient = apiClient;
    this.config = uiSettings;
    this.savedObjectsClient = savedObjectsClient;
    this.fieldFormats = fieldFormats;
    this.onNotification = onNotification;
    this.onError = onError;
    this.onUnsupportedTimePattern = onUnsupportedTimePattern;
    this.ensureDefaultIndexPattern = createEnsureDefaultIndexPattern(
      uiSettings,
      onRedirectNoIndexPattern
    );
    this.getIndexPattern = getIndexPattern
  }

  /**
   * Refresh cache of index pattern ids and titles
   */
  private async refreshSavedObjectsCache() {
    const generation = this.generation;
    const cache = await this.savedObjectsClient.find<
      IndexPatternSavedObjectAttrs
    >({
      type: "index-pattern",
      fields: ["title"],
      perPage: 10000,
    });
    if (generation === this.generation) this.savedObjectsCache = cache;
  }

  /**
   * Get list of index pattern ids
   * @param refresh Force refresh of index pattern list
   */
  getIds = async (refresh: boolean = false) => {
    if (!this.savedObjectsCache || refresh) {
      await this.refreshSavedObjectsCache();
    }
    if (!this.savedObjectsCache) {
      return [];
    }
    return this.savedObjectsCache.map((obj) => obj?.id);
  };

  /**
   * Get list of index pattern titles
   * @param refresh Force refresh of index pattern list
   */
  getTitles = async (refresh: boolean = false): Promise<string[]> => {
    if (!this.savedObjectsCache || refresh) {
      await this.refreshSavedObjectsCache();
    }
    if (!this.savedObjectsCache) {
      return [];
    }
    return this.savedObjectsCache.map((obj) => obj?.attributes?.title);
  };

  /**
   * Get list of index pattern ids with titles
   * @param refresh Force refresh of index pattern list
   */
  getIdsWithTitle = async (
    refresh: boolean = false
  ): Promise<Array<{ id: string; title: string }>> => {
    if (!this.savedObjectsCache || refresh) {
      await this.refreshSavedObjectsCache();
    }
    if (!this.savedObjectsCache) {
      return [];
    }
    return this.savedObjectsCache.map((obj) => ({
      id: obj?.id,
      title: obj?.attributes?.title,
    }));
  };

  /**
   * Clear index pattern list cache
   * @param id optionally clear a single id
   */
  clearCache = (id?: string) => {
    this.savedObjectsCache = null;
    if (id) {
      this.indexPatternCache.clear(id);
    } else {
      this.indexPatternCache.clearAll();
    }
  };

  getCache = async () => {
    if (!this.savedObjectsCache) {
      await this.refreshSavedObjectsCache();
    }
    return this.savedObjectsCache;
  };

  /**
   * Get default index pattern
   */
  getDefault = async () => {
    const defaultIndexPatternId = await this.config.get("defaultIndex");
    if (defaultIndexPatternId) {
      return await this.get(defaultIndexPatternId);
    }

    return null;
  };

  /**
   * Optionally set default index pattern, unless force = true
   * @param id
   * @param force
   */
  setDefault = async (id: string, force = false) => {
    if (force || !this.config.get("defaultIndex")) {
      await this.config.set("defaultIndex", id);
    }
  };

  private isFieldRefreshRequired(specs?: IndexPatternFieldMap): boolean {
    if (!specs) {
      return true;
    }

    return Object.values(specs).every((spec) => {
      // See https://github.com/elastic/kibana/pull/8421
      const hasFieldCaps = "aggregatable" in spec && "searchable" in spec;

      // See https://github.com/elastic/kibana/pull/11969
      const hasDocValuesFlag = "readFromDocValues" in spec;

      return !hasFieldCaps || !hasDocValuesFlag;
    });
  }

  /**
   * Get field list by providing { pattern }
   * @param options
   */
  getFieldsForWildcard = async (options: GetFieldsOptions = {}) => {
    const metaFields = await this.config.get(UI_SETTINGS.META_FIELDS);
    return this.apiClient.getFieldsForWildcard({
      pattern: options.pattern,
      metaFields,
      type: options.type,
      params: options.params || {},
    });
  };

  /**
   * Get field list by providing an index patttern (or spec)
   * @param options
   */
  getFieldsForIndexPattern = async (
    indexPattern: IndexPattern | IndexPatternSpec,
    options: GetFieldsOptions = {}
  ) =>
    this.getFieldsForWildcard({
      pattern: indexPattern.title as string,
      ...options,
      type: indexPattern.type,
      params: indexPattern.typeMeta && indexPattern.typeMeta.params,
    });

  /**
   * Refresh field list for a given index pattern
   * @param indexPattern
   */
  refreshFields = async (indexPattern: IndexPattern) => {
    try {
      const fields = await this.getFieldsForIndexPattern(indexPattern);
      const scripted = indexPattern
        .getScriptedFields()
        .map((field) => field.spec);
      indexPattern.fields.replaceAll([...fields, ...scripted]);
    } catch (err) {
      if (err instanceof IndexPatternMissingIndices) {
        this.onNotification({
          title: (err as any).message,
          color: "danger",
          iconType: "alert",
        });
      }

      this.onError(err, {
        title:
          "Error fetching fields for index pattern {indexPattern.title} (ID: {indexPattern.id})",
      });
    }
  };

  /**
   * Refreshes a field list from a spec before an index pattern instance is created
   * @param fields
   * @param id
   * @param title
   * @param options
   */
  private refreshFieldSpecMap = async (
    fields: IndexPatternFieldMap,
    id: string,
    title: string,
    options: GetFieldsOptions
  ) => {
    const scriptdFields = Object.values(fields).filter(
      (field) => field.scripted
    );
    try {
      const newFields = await this.getFieldsForWildcard(options);
      return this.fieldArrayToMap([...newFields, ...scriptdFields]);
    } catch (err) {
      if (err instanceof IndexPatternMissingIndices) {
        this.onNotification({
          title: (err as any).message,
          color: "danger",
          iconType: "alert",
        });
        return {};
      }

      this.onError(err, {
        title: `Error fetching fields for index pattern ${title} (ID: ${id})`,
      });
    }
    return fields;
  };

  /**
   * Applies a set of formats to a set of fields
   * @param fieldSpecs
   * @param fieldFormatMap
   */
  private addFormatsToFields = (
    fieldSpecs: FieldSpec[],
    fieldFormatMap: FieldFormatMap
  ) => {
    Object.entries(fieldFormatMap).forEach(([fieldName, value]) => {
      const field = fieldSpecs.find((fld: FieldSpec) => fld.name === fieldName);
      if (field) {
        field.format = value;
      }
    });
  };

  /**
   * Converts field array to map
   * @param fields
   */
  fieldArrayToMap = (fields: FieldSpec[]) =>
    fields.reduce<IndexPatternFieldMap>((collector, field) => {
      collector[field.name] = field;
      return collector;
    }, {});

  /**
   * Converts index pattern saved object to index pattern spec
   * @param savedObject
   */

  savedObjectToSpec = (
    savedObject: SavedObject<IndexPatternAttributes>
  ): IndexPatternSpec => {
    const {
      id,
      version,
      attributes: {
        title,
        viewName,
        timeFieldName,
        intervalName,
        fields,
        sourceFilters,
        fieldFormatMap,
        typeMeta,
        complex_fields: complexFields,
        builtin
      },
      type,
    } = savedObject;

    const parsedSourceFilters = sourceFilters
      ? JSON.parse(sourceFilters)
      : undefined;
    const parsedTypeMeta = typeMeta ? JSON.parse(typeMeta) : undefined;
    const parsedFieldFormatMap = fieldFormatMap
      ? JSON.parse(fieldFormatMap)
      : {};
    const parsedFields: FieldSpec[] = fields ? JSON.parse(fields) : [];
    const parsedComplexFields = complexFields ? JSON.parse(complexFields) : [];

    this.addFormatsToFields(parsedFields, parsedFieldFormatMap);
    return {
      id,
      version,
      title,
      viewName,
      intervalName,
      timeFieldName,
      sourceFilters: parsedSourceFilters,
      fields: this.fieldArrayToMap(parsedFields),
      typeMeta: parsedTypeMeta,
      type,
      complexFields: parsedComplexFields,
      builtin
    };
  };

  /**
   * Get an index pattern by id. Cache optimized
   * @param id
   */

  get = async (
    id: string,
    typ: string,
    // clusterID: string,
  ): Promise<IndexPattern | undefined> => {
    // const cacheID = typ == "index" ? clusterID + id : id;
    const generation = this.generation;
    const getter = this.getIndexPattern;
    const cacheID = id;
    const cache = this.indexPatternCache.get(cacheID);
    if (cache) {
      return cache;
    }

    if (!getter) {
      return;
    }

    function convertEsMapping(originalMapping: any) {
      const kbnFieldTypes = createKbnFieldTypes();
      const esTypeToKbnNameMap: any = {};

      kbnFieldTypes.forEach(type => {
        type.esTypes?.forEach(esType => {
          esTypeToKbnNameMap[esType] = type.name;
        });
      });
      
      return Object.entries(originalMapping).map(([fieldName, fieldDetail]) => {
        const [esType, config] = Object.entries(fieldDetail)[0];
        const kbnTypeName = esTypeToKbnNameMap[esType] || esType;
        return {
          aggregatable: config.aggregatable, 
          esTypes: [esType], 
          name: fieldName, 
          readFromDocValues: false, 
          searchable: config.searchable, 
          type: kbnTypeName
        };
      });
    }

    const res = await getter(id);
    if (generation !== this.generation || !res || res.error) return;

    const savedObject = {
      "id": id,
      "attributes": {
        "title":          id,
        "fields":         JSON.stringify(convertEsMapping(res?.fields || {})),
        "viewName":       id,
        "timeFieldName":  "",
        "fieldFormatMap": "",
      },
      "score":            0,
      "type":             "index",
      "namespaces":       "default",
      "migrationVersion": "7.6.0",
      "updated_at":       "",
    }
    // const savedObject = await this.savedObjectsClient.get<
    //   IndexPatternAttributes
    // >(typ || savedObjectType, id);
    
    // if (!savedObject.version) {
    //   throw new SavedObjectNotFound(savedObjectType, id, 'management/kibana/indexPatterns');
    // }
    const spec = this.savedObjectToSpec(savedObject);
    const { title, type, typeMeta } = spec;
    const parsedFieldFormats: FieldFormatMap = savedObject.attributes
      .fieldFormatMap
      ? JSON.parse(savedObject.attributes.fieldFormatMap)
      : {};
    const isFieldRefreshRequired =
      spec.type == "index" ? false : this.isFieldRefreshRequired(spec.fields);
    let isSaveRequired = isFieldRefreshRequired;
    try {
      spec.fields = isFieldRefreshRequired
        ? await this.refreshFieldSpecMap(
            spec.fields || {},
            id,
            spec.title as string,
            {
              pattern: title,
              metaFields: await this.config.get(UI_SETTINGS.META_FIELDS),
              type,
              params: typeMeta && typeMeta.params,
            }
          )
        : spec.fields;
    } catch (err) {
      if (generation !== this.generation) return;
      isSaveRequired = false;
      if (err instanceof IndexPatternMissingIndices) {
        this.onNotification({
          title: (err as any).message,
          color: "danger",
          iconType: "alert",
        });
      } else {
        this.onError(err, {
          title: `Error fetching fields for index pattern ${title} (ID: ${id})`,
        });
      }
    }

    if (generation !== this.generation) return;
    Object.entries(parsedFieldFormats).forEach(([fieldName, value]) => {
      const field = spec.fields?.[fieldName];
      if (field) {
        field.format = value;
      }
    });

    const indexPattern = await this.create(spec, true);
    if (generation !== this.generation) return;
    this.indexPatternCache.set(cacheID, indexPattern);
    if (isSaveRequired) {
      try {
        this.updateSavedObject(indexPattern);
      } catch (err) {
        this.onError(err, {
          title: `Error saving after fetching fields for index pattern ${indexPattern.title} (ID: ${indexPattern.id})`,
        });
      }
    }

    if (indexPattern.isUnsupportedTimePattern()) {
      this.onUnsupportedTimePattern({
        id: indexPattern.id as string,
        title: indexPattern.title,
        index: indexPattern.getIndex(),
      });
    }

    indexPattern.resetOriginalSavedObjectBody();
    return indexPattern;
  };

  migrate(indexPattern: IndexPattern, newTitle: string) {
    return this.savedObjectsClient
      .update<IndexPatternAttributes>(
        savedObjectType,
        indexPattern.id!,
        {
          title: newTitle,
          intervalName: null,
        },
        {
          version: indexPattern.version,
        }
      )
      .then(({ attributes: { title, intervalName } }) => {
        indexPattern.title = title;
        indexPattern.intervalName = intervalName;
      })
      .then(() => this);
  }

  /**
   * Create a new index pattern instance
   * @param spec
   * @param skipFetchFields
   */
  async create(
    spec: IndexPatternSpec,
    skipFetchFields = false
  ): Promise<IndexPattern> {
    const generation = this.generation;
    const shortDotsEnable = await this.config.get(
      UI_SETTINGS.SHORT_DOTS_ENABLE
    );
    const metaFields = await this.config.get(UI_SETTINGS.META_FIELDS);
    const indexPattern = new IndexPattern({
      spec,
      savedObjectsClient: this.savedObjectsClient,
      fieldFormats: this.fieldFormats,
      shortDotsEnable,
      metaFields,
    });

    this.patternGenerations.set(indexPattern, generation);
    if (!skipFetchFields && generation === this.generation) {
      await this.refreshFields(indexPattern);
    }

    return indexPattern;
  }

  find = async (search: string, size: number = 10): Promise<IndexPattern[]> => {
    const savedObjects = await this.savedObjectsClient.find<
      IndexPatternSavedObjectAttrs
    >({
      type: "index-pattern",
      fields: ["title"],
      search,
      searchFields: ["title"],
      perPage: size,
    });
    const getIndexPatternPromises = savedObjects.map(async (savedObject) => {
      return await this.get(savedObject.id);
    });
    return await Promise.all(getIndexPatternPromises);
  };

  /**
   * Create a new index pattern and save it right away
   * @param spec
   * @param override Overwrite if existing index pattern exists
   * @param skipFetchFields
   */

  async createAndSave(
    spec: IndexPatternSpec,
    override = false,
    skipFetchFields = false
  ) {
    const generation = this.generation;
    const indexPattern = await this.create(spec, skipFetchFields);
    if (generation !== this.generation) return;
    await this.createSavedObject(indexPattern, override);
    if (generation !== this.generation) return;
    await this.setDefault(indexPattern.id as string);
    return generation === this.generation ? indexPattern : undefined;
  }

  /**
   * Save a new index pattern
   * @param indexPattern
   * @param override Overwrite if existing index pattern exists
   */

  async createSavedObject(indexPattern: IndexPattern, override = false) {
    const generation = this.generation;
    const owner = this.patternGenerations.get(indexPattern);
    if (owner !== undefined && owner !== generation) return;
    const dupe = await findByTitle(this.savedObjectsClient, indexPattern.title);
    if (generation !== this.generation) return;
    if (dupe) {
      if (override) {
        await this.delete(dupe.id);
      } else {
        throw new DuplicateIndexPatternError(
          `Duplicate index pattern: ${indexPattern.title}`
        );
      }
    }

    if (generation !== this.generation) return;
    const body = indexPattern.getAsSavedObjectBody();
    const response = await this.savedObjectsClient.create(
      savedObjectType,
      body,
      {
        id: indexPattern.id,
      }
    );
    if (generation !== this.generation) return;
    this.patternGenerations.set(indexPattern, generation);
    indexPattern.id = response.id;
    this.indexPatternCache.set(indexPattern.id, indexPattern);
    return indexPattern;
  }

  /**
   * Save existing index pattern. Will attempt to merge differences if there are conflicts
   * @param indexPattern
   * @param saveAttempts
   */

  async updateSavedObject(
    indexPattern: IndexPattern,
    saveAttempts: number = 0,
    ignoreErrors: boolean = false
  ): Promise<void | Error> {
    const generation = this.generation;
    const owner = this.patternGenerations.get(indexPattern);
    if (!indexPattern.id || owner !== undefined && owner !== generation) return;

    // get the list of attributes
    const body = indexPattern.getAsSavedObjectBody();
    const originalBody = indexPattern.getOriginalSavedObjectBody();

    // get changed keys
    const originalChangedKeys: string[] = [];
    Object.entries(body).forEach(([key, value]) => {
      if (value !== (originalBody as any)[key]) {
        originalChangedKeys.push(key);
      }
    });

    return this.savedObjectsClient
      .update(savedObjectType, indexPattern.id, body, {
        version: indexPattern.version,
      })
      .then((resp) => {
        if (generation !== this.generation) return;
        if (resp.id) {
          indexPattern.id = resp.id;
        }
        if (resp.version) {
          indexPattern.version = resp.version;
        }
      })
      .catch(async (err) => {
        if (generation !== this.generation) return;
        if (
          err?.res?.status === 409 &&
          saveAttempts++ < MAX_ATTEMPTS_TO_RESOLVE_CONFLICTS
        ) {
          const samePattern = await this.get(indexPattern.id as string);
          if (!samePattern || generation !== this.generation) return;
          // What keys changed from now and what the server returned
          const updatedBody = samePattern.getAsSavedObjectBody();

          // Build a list of changed keys from the server response
          // and ensure we ignore the key if the server response
          // is the same as the original response (since that is expected
          // if we made a change in that key)

          const serverChangedKeys: string[] = [];
          Object.entries(updatedBody).forEach(([key, value]) => {
            if (
              value !== (body as any)[key] &&
              value !== (originalBody as any)[key]
            ) {
              serverChangedKeys.push(key);
            }
          });

          let unresolvedCollision = false;
          for (const originalKey of originalChangedKeys) {
            for (const serverKey of serverChangedKeys) {
              if (originalKey === serverKey) {
                unresolvedCollision = true;
                break;
              }
            }
          }

          if (unresolvedCollision) {
            if (ignoreErrors) {
              return;
            }
            const title =
              "Unable to write index pattern! Refresh the page to get the most up to date changes for this index pattern.";

            this.onNotification({ title, color: "danger" });
            throw err;
          }

          // Set the updated response on this object
          serverChangedKeys.forEach((key) => {
            (indexPattern as any)[key] = (samePattern as any)[key];
          });
          indexPattern.version = samePattern.version;

          // Clear cache
          this.indexPatternCache.clear(indexPattern.id!);

          // Try the save again
          return this.updateSavedObject(
            indexPattern,
            saveAttempts,
            ignoreErrors
          );
        }
        throw err;
      });
  }

  async delete(indexPatternId: string) {
    this.indexPatternCache.clear(indexPatternId);
    return this.savedObjectsClient.delete(savedObjectType, indexPatternId);
  }

  setup({ getIndexPattern }: any) {
    const generation = ++this.generation;
    this.clearCache();
    this.getIndexPattern = getIndexPattern;

    // A later mount can use the same callback. Only the binding created here
    // can release it, so an older cleanup cannot disconnect that later mount.
    return () => {
      if (generation !== this.generation) return;
      this.generation += 1;
      this.clearCache();
      this.getIndexPattern = undefined;
    };
  }
}

export type IndexPatternsContract = PublicMethodsOf<IndexPatternsService>;
