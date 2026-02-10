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
import "./discover_sidebar.scss";
import React, { useCallback, useEffect, useState, useMemo, useContext } from "react";
import {
  EuiTitle,
  EuiHideFor,
} from "@elastic/eui";
import { DiscoverField } from "./discover_field";
import { DiscoverIndexPattern } from "./discover_index_pattern";
import { DiscoverFieldSearch } from "./discover_field_search";
import { IndexPatternAttributes } from "../../../../../data/common";
import { SavedObject } from "../../../../../../core/types";
// import { FIELDS_LIMIT_SETTING } from '../../../../common';
import { groupFields } from "./lib/group_fields";
import {
  IndexPatternField,
  IndexPattern,
} from "../../../../../data/public";
import { getDetails } from "./lib/get_details";
import { getDefaultFieldFilter, setFieldFilterProp } from "./lib/field_filter";
import { getIndexPatternFieldList } from "./lib/get_index_pattern_field_list";
// import { getServices } from '../../../kibana_services';
import { Input, Select, Space, Switch, Tree, Typography } from "antd";
import { CarryOutOutlined } from "@ant-design/icons";
import { GlobalConfigContext } from "@/components";

export interface DiscoverSidebarProps {
  /**
   * the selected columns displayed in the doc table in discover
   */
  columns: string[];
  /**
   * a statistics of the distribution of fields in the given hits
   */
  fieldCounts: Record<string, number>;
  /**
   * hits fetched from ES, displayed in the doc table
   */
  hits: Array<Record<string, unknown>>;
  /**
   * List of available index patterns
   */
  indexPatternList: Array<SavedObject<IndexPatternAttributes>>;
  /**
   * Callback function when selecting a field
   */
  onAddField: (fieldName: string) => void;
  /**
   * Callback function when adding a filter from sidebar
   */
  onAddFilter: (
    field: IndexPatternField | string,
    value: string,
    type: "+" | "-"
  ) => void;
  /**
   * Callback function when removing a field
   * @param fieldName
   */
  onRemoveField: (fieldName: string) => void;
  /**
   * Currently selected index pattern
   */
  selectedIndexPattern?: IndexPattern;
  /**
   * Callback function to select another index pattern
   */
  setIndexPattern: (id: string) => void;
  isClosed: boolean;
  distinctParams: any;
  onDistinctParamsChange: any;
  whetherToSample?: boolean;
  sampleSize?: number;
  topNumber?: number;
  onCollapseToggle: () => void;
}

export function DiscoverSidebar({
  columns,
  fieldCounts,
  hits,
  onAddField,
  onAddFilter,
  onRemoveField,
  selectedIndexPattern,
  setIndexPattern,
  distinctParams,
  onDistinctParamsChange,
  onFieldAgg,
  whetherToSample,
  sampleSize,
  topNumber,
  onCollapseToggle
}: DiscoverSidebarProps) {
  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}
  const [showFields, setShowFields] = useState(false);
  const [fields, setFields] = useState<IndexPatternField[] | null>(null);
  const [fieldFilterState, setFieldFilterState] = useState(
    getDefaultFieldFilter()
  );
  // const services = useMemo(() => getServices(), []);

  useEffect(() => {
    let newFields = getIndexPatternFieldList(
      selectedIndexPattern,
      fieldCounts
    );
    const fieldM = {};
    newFields.forEach((field: IndexPatternField) => {
      fieldM[field.displayName] = field;
    });
    newFields = newFields.map((field: IndexPatternField) => {
      if (!field.displayName.endsWith(".keyword") && fieldM[`${field.displayName}.keyword`]) {
        field.isMulti = true;
      }
      return field;
    })
    setFields(newFields);
  }, [selectedIndexPattern, fieldCounts, hits]); //services

  const onChangeFieldSearch = useCallback(
    (field: string, value: string | boolean | undefined) => {
      const newState = setFieldFilterProp(fieldFilterState, field, value);
      setFieldFilterState(newState);
    },
    [fieldFilterState]
  );

  const getDetailsByField = useCallback(
    (ipField: IndexPatternField) =>
      getDetails(ipField, hits, columns, selectedIndexPattern),
    [hits, columns, selectedIndexPattern]
  );

  const popularLimit = 5; //services.uiSettings.get(FIELDS_LIMIT_SETTING);
  const useShortDots = false; //services.uiSettings.get(UI_SETTINGS.SHORT_DOTS_ENABLE);

  const {
    selected: selectedFields,
    popular: popularFields,
    unpopular: unpopularFields,
    fieldsTree,
  } = useMemo(() => {
    const groupedFields = groupFields(
      fields,
      columns,
      popularLimit,
      fieldCounts,
      fieldFilterState
    );
    const fieldsTree = {};
    groupedFields.unpopular.forEach((field) => {
      const keys = field.displayName.split(".");
      let currentObj = fieldsTree;

      keys.forEach((key, i) => {
        const isLast = i === keys.length - 1;

        if (isLast) {
          const fieldInstance = Object.create(Object.getPrototypeOf(field));

          Object.assign(fieldInstance, field);

          fieldInstance.isLeaf = true;

          currentObj[key] = fieldInstance;
        } else {
          if (!currentObj[key] || currentObj[key] instanceof field.constructor) {
            currentObj[key] = {};
          }
          currentObj = currentObj[key];
        }
      });
    });
    return {
      ...groupedFields,
      fieldsTree,
    };
  }, [fields, columns, popularLimit, fieldCounts, fieldFilterState]);

  const fieldTypes = useMemo(() => {
    const result = ["any"];
    if (Array.isArray(fields)) {
      for (const field of fields) {
        if (result.indexOf(field.type) === -1) {
          result.push(field.type);
        }
      }
    }
    return result;
  }, [fields]);
  const [lastPopoverField, setLastPopoverField] = useState("");

  if (!selectedIndexPattern || !fields) {
    return null;
  }

  const buildTree = (treeObj: any, prefix = "") => {
  return Object.keys(treeObj).map((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const node = treeObj[key];

    if (node.isLeaf) {
      return {
        key: fullKey, 
        selectable: false,
        icon: <CarryOutOutlined />,
        title: (
          <DiscoverField
            field={node}
            indexPattern={selectedIndexPattern}
            onAddField={onAddField}
            onRemoveField={onRemoveField}
            onAddFilter={onAddFilter}
            getDetails={getDetailsByField}
            useShortDots={true}
            setLastPopoverField={setLastPopoverField}
            lastPopoverField={lastPopoverField}
            onFieldAgg={onFieldAgg}
            columns={columns}
            whetherToSample={whetherToSample}
            sampleSize={sampleSize}
            topNumber={topNumber}
          />
        )
      };
    }

    return {
      key: fullKey,
      selectable: false,
      icon: <CarryOutOutlined />,
      title: key,
      children: buildTree(node, fullKey)
    };
  });
};

  return (
    <EuiHideFor sizes={["xs", "s"]}>
      <section className="sidebar-list" aria-label={"Index and fields"}>
        <div className="dscSidebar__item">
          <form>
            <DiscoverFieldSearch
              onChange={onChangeFieldSearch}
              value={fieldFilterState.name}
              types={fieldTypes}
              onCollapseToggle={onCollapseToggle}
            />
          </form>
        </div>
        <div className="sidebar-list">
          <div className="flex items-center gap-8px mb-8px">
            <Typography.Title className="!text-12px !mb-0px" level={5}>{i18nField['distinct_label'] || "Distinct by field"}</Typography.Title>
            <Switch
              size="small"
              checked={distinctParams.enabled}
              onChange={(checked) => {
                onDistinctParamsChange({
                  ...distinctParams,
                  enabled: checked,
                });
              }}
            />
          </div>
          <div style={{ display: distinctParams.enabled ? "block" : "none" }}>
            <Space.Compact className="w-full mb-8px">
              <Space.Addon className="flex-shrink-0">{i18nField['distinct_type'] || "Type"}</Space.Addon>
              <Select
                className="w-full"
                placeholder={"Field type"}
                value={distinctParams?.type}
                options={[
                  { value: "string", label: "String" },
                  { value: "long", label: "Long" },
                ]}
                onChange={(value) => {
                  onDistinctParamsChange({
                    ...distinctParams,
                    type: value,
                  });
                }}
              />
            </Space.Compact>
            <Space.Compact className="w-full mb-8px">
              <Space.Addon className="flex-shrink-0">{i18nField['distinct_field'] || "Field"}</Space.Addon>
              <Input
                className="w-full"
                value={distinctParams?.field}
                onChange={(e) => {
                  onDistinctParamsChange({
                    ...distinctParams,
                    field: e.target.value,
                  });
                }}
              />
            </Space.Compact>
          </div>
        </div>
        <div className="sidebar-list">
          {fields.length > 0 && (
            <>
              <Typography.Title className="!text-12px !mb-8px" level={5}>{i18nField['selected_label'] || "Selected fields"}</Typography.Title>
              <ul
                className="dscSidebarList dscFieldList--selected mb-8px"
                aria-labelledby="selected_fields"
              >
                {selectedFields.map((field: IndexPatternField) => {
                  return (
                    <li
                      key={`field${field.name}`}
                      data-attr-field={field.name}
                      className="dscSidebar__item"
                    >
                      <DiscoverField
                        field={field}
                        indexPattern={selectedIndexPattern}
                        onAddField={onAddField}
                        onRemoveField={onRemoveField}
                        onAddFilter={onAddFilter}
                        getDetails={getDetailsByField}
                        selected={true}
                        useShortDots={useShortDots}
                        setLastPopoverField={setLastPopoverField}
                        lastPopoverField={lastPopoverField}
                        onFieldAgg={onFieldAgg}
                        columns={columns}
                        whetherToSample={whetherToSample}
                        sampleSize={sampleSize}
                        topNumber={topNumber}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className="euiFlexGroup euiFlexGroup--gutterMedium">
                <Typography.Title className="!text-12px !mb-8px" level={5}>{i18nField['available_label'] || "Available fields"}</Typography.Title>
              </div>
            </>
          )}
          {popularFields.length > 0 && (
            <div>
              <EuiTitle
                size="xxxs"
                className={`dscFieldListHeader mb-8px ${!showFields ? "hidden-sm hidden-xs" : ""
                  }`}
              >
                <h4
                  style={{ fontWeight: "normal" }}
                  id="available_fields_popular"
                >
                  Popular
                </h4>
              </EuiTitle>
              <ul
                className={`dscFieldList dscFieldList--popular ${!showFields ? "hidden-sm hidden-xs" : ""
                  }`}
                aria-labelledby="available_fields available_fields_popular"
                data-test-subj={`fieldList-popular`}
              >
                {popularFields.map((field: IndexPatternField) => {
                  return (
                    <li
                      key={`field${field.name}`}
                      data-attr-field={field.name}
                      className="dscSidebar__item"
                    >
                      <DiscoverField
                        field={field}
                        indexPattern={selectedIndexPattern}
                        onAddField={onAddField}
                        onRemoveField={onRemoveField}
                        onAddFilter={onAddFilter}
                        getDetails={getDetailsByField}
                        useShortDots={useShortDots}
                        setLastPopoverField={setLastPopoverField}
                        lastPopoverField={lastPopoverField}
                        onFieldAgg={onFieldAgg}
                        columns={columns}
                        whetherToSample={whetherToSample}
                        sampleSize={sampleSize}
                        topNumber={topNumber}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* <ul
            className={`dscFieldList dscFieldList--unpopular mb-8px ${
              !showFields ? "hidden-sm hidden-xs" : ""
            }`}
            aria-labelledby="available_fields"
            data-test-subj={`fieldList-unpopular`}
          >
            {unpopularFields.map((field: IndexPatternField) => {
              return (
                <li
                  key={`field${field.name}`}
                  data-attr-field={field.name}
                  className="dscSidebar__item"
                >
                  <DiscoverField
                    field={field}
                    indexPattern={selectedIndexPattern}
                    onAddField={onAddField}
                    onRemoveField={onRemoveField}
                    onAddFilter={onAddFilter}
                    getDetails={getDetailsByField}
                    useShortDots={useShortDots}
                    whetherToSample={whetherToSample}
                    sampleSize={sampleSize}
                    topNumber={topNumber}
                  />
                </li>
              );
            })}
          </ul> */}
          <div id="fields-tree-wrapper">
            <Tree
              showLine={false}
              showIcon={false}
              treeData={buildTree(fieldsTree)}
            />
          </div>
        </div>
      </section>
    </EuiHideFor>
  );
}
