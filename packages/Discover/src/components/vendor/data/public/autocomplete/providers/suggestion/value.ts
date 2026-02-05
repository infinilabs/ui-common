import { flatten } from 'lodash';
import { CoreSetup } from 'kibana/public';
import { escapeQuotes } from './lib/escape_kuery';
import { KqlQuerySuggestionProvider } from './types';
import {
  QuerySuggestion,
  QuerySuggestionTypes,
} from '../query_suggestion_provider';

const wrapAsSuggestions = (start: number, end: number, query: string, values: string[]) =>
  (values || [])
    .filter((value) => value.toLowerCase().includes(query.toLowerCase()))
    .map((value) => ({
      type: QuerySuggestionTypes.Value,
      text: `${value} `,
      start,
      end,
    }));

export const setupGetValueSuggestions: KqlQuerySuggestionProvider = (
  core: CoreSetup<object, DataPublicPluginStart>
) => {
  // const autoCompleteServicePromise = core
  //   .getStartServices()
  //   .then(([_, __, dataStart]) => dataStart.autocomplete);
  const { onSuggestions } = core
  //console.log(core, autoCompleteServicePromise)
  return async (
    { indexPatterns, boolFilter, useTimeRange, signal },
    { start, end, prefix, suffix, fieldName, nestedPath }
  ): Promise<QuerySuggestion[]> => {
    const fullFieldName = nestedPath ? `${nestedPath}.${fieldName}` : fieldName;

    const indexPatternFieldEntries: Array<[IIndexPattern, IFieldType]> = [];
    indexPatterns.forEach((indexPattern) => {
      indexPattern.fields
        .filter((field) => field.name === fullFieldName)
        .forEach((field) => indexPatternFieldEntries.push([indexPattern, field]));
    });

    const query = `${prefix}${suffix}`.trim();

    const data = await Promise.all(
      indexPatternFieldEntries.map(([indexPattern, field]) => {
        const body = {
            "size": 0, 
            "query": {
                "bool": {
                    "filter": boolFilter
                }
            },
            "aggs": {
                "suggestions": {
                    "terms": {
                        "field":          field.name,
                        "include":        query + ".*",
                        "execution_hint": "map",
                        "shard_size":     10,
                    }
                }
            }
        }
        return onSuggestions(indexPattern.title, body).then((res) => {
          const values: any[] = [];
          const suggestionsAgg = res?.aggregations?.suggestions;
          if (suggestionsAgg?.buckets && Array.isArray(suggestionsAgg.buckets)) {
            suggestionsAgg.buckets.forEach(bucket => {
              values.push(bucket.key); 
            });
          }
          const quotedValues = values?.map((value) =>
            typeof value === 'string' ? `"${escapeQuotes(value)}"` : `${value}`
          );

          return wrapAsSuggestions(start, end, query, quotedValues);
        })
      })
    );

    return flatten(data);
  };
};
