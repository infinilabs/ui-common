import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

import { Subscription } from "rxjs";
import "@elastic/eui/dist/eui_theme_light.min.css";
import { Card, Empty, Spin } from "antd";
import { getStateColumnActions } from "./vendor/discover/public/application/angular/doc_table/actions/columns";
import { DiscoverSidebar } from "./vendor/discover/public/application/components/sidebar/discover_sidebar";
import { DiscoverHistogram } from "./vendor/discover/public/application/components/histogram/histogram";
import moment from "moment";
import { getContext } from "./context";
import { createSearchBar } from "./vendor/data/public/ui/search_bar/create_search_bar";
import { DiscoverNoResults } from "./vendor/discover/public/application/angular/directives/no_results";
import { buildPointSeriesData } from "./vendor/discover/public/application/angular/helpers/";
import { generateFilters } from "./vendor/data/public/query/filter_manager/lib/generate_filters";
import Table from "./vendor/discover/public/application/components/discover_table/table";
import { LoadingSpinner } from "./vendor/discover/public/application/components/loading_spinner/loading_spinner";
import { cloneDeep } from "lodash";
import ResultHeader from "./ResultHeader";
import { FilterStateStore, IndexPattern } from "./vendor/data/common";
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { getTimezone } from "@/utils/utils";

import 'uno.css'
import './index.scss'
import './euiicons'

loader.config({ monaco });

const SidebarMemoized = React.memo(DiscoverSidebar);

const {
  filterManager,
  queryStringManager,
  timefilter,
  storage,
  getEsQuery,
  getSearchParams,
  intervalOptions,
  getTimeBuckets,
  fetchESRequest,
  services,
  setIndexPatterns,
} = getContext();

const SearchBar = createSearchBar();
let isFrist = true;

const Discover = (props: {
  indices: { [key: string]: any }[];
  indexPattern: IndexPattern;
  setIndexPattern: React.Dispatch<React.SetStateAction<IndexPattern | undefined>>
  onIndexPatternChange: (index: string) => void;
  onSearch?: (index: string, body: any) => Promise<any> | undefined
  queryParams: any;
  setQueryParams: (queryParams: any) => void;
  locale?: string;
  theme?: string;
  exportMaxSize?: number;
}) => {

  const {
    indexPattern,
    setIndexPattern,
    onIndexPatternChange,
    onSearch,
    queryParams = {},
    setQueryParams,
    locale,
    theme,
    exportMaxSize = 10000
  } = props;

  const [collapseState, setCollapseState] = useState({
    sideBar: false,
    histogram: false,
  })

  const [timeZone, setTimeZone] = useState(() => getTimezone())

  const [searchResult, setSearchResult] = useState({
    took: 11,
    timed_out: false,
    _shards: { total: 4, successful: 4, skipped: 3, failed: 0 },
    hits: { total: 0, max_score: null, hits: [] },
    aggregations: { counts: { buckets: [] } },
  });

  const rangeCacheRef = useRef();

  useEffect(() => {
    if (queryParams.range && queryParams.range[0] && queryParams.range[1]) {
      timefilter.setTime({
        from: queryParams.range[0],
        to: queryParams.range[1],
      });
    }
    if (Array.isArray(queryParams.filters) && queryParams.filters.length > 0) {
      filterManager.setFilters(queryParams.filters.filter((item: any) => !!item.meta).map((item: any) => {
        return {
          ...item,
          store: FilterStateStore.APP_STATE
        }
      }))
    }
  }, [])

  const [state, setState] = useState<any>({
    columns: queryParams.columns || ["_source"], //['name', 'address'],
    interval: "15s",
    sort: queryParams.sort || [],
  });

  const distinctParamsDefault = {
    type: "string",
    field: "",
    enabled: false,
  };

  const [distinctParams, setDistinctParams] = React.useState(
    distinctParamsDefault
  );
  const onDistinctParamsChange = (obj) => {
    setDistinctParams({ ...distinctParams, ...obj });
  };

  useMemo(() => {
    setDistinctParams({
      ...distinctParams,
      type: distinctParamsDefault.type,
      field: distinctParamsDefault.field,
    });
  }, [indexPattern]);

  useEffect(() => {
    if (indexPattern) {
      setDistinctParams({
        ...distinctParams,
        type: distinctParamsDefault.type,
        field: distinctParamsDefault.field,
      });
      if (indexPattern?.timeFieldName) {
        const newSort = [[indexPattern?.timeFieldName, 'desc']]
        setState({
          ...state,
          columns: ['_source'],
          sort: newSort
        });
        updateQuery({ sort: newSort });
      } else {
        setState({
          ...state,
          columns: ['_source'],
          sort: []
        });
        updateQuery({ sort: [] });
      }
    }
  }, [indexPattern]);

  const subscriptions = useMemo(() => {
    const subscriptions = new Subscription();
    subscriptions.add(
      timefilter.getAutoRefreshFetch$().subscribe({
        next: () => {
          updateQuery();
        },
      })
    );
    return subscriptions;
  }, [indexPattern]);

  const [queryFrom, setQueryFrom] = React.useState(0);

  const columns = state.columns;

  const updateQuery = useCallback(
    async (_payload?: any) => {
      if (!indexPattern || !onSearch) {
        return;
      }
      setResultState((prev) => {
        if (prev === 'next') return prev;
        return "loading"
      });
      let aggs = null;
      if (!_payload?.isScrollLoad) {
        setQueryFrom(0);
      }

      const sort = _payload?.sort || state.sort

      const params = getSearchParams(
        indexPattern,
        _payload?.interval || state.interval,
        _payload?.sort || state.sort,
        _payload?.aggs || aggs,
        distinctParams || {},
        _payload?.isScrollLoad ? queryFrom : 0,
        false
      );

      const filters = cloneDeep(params?.body?.query?.bool?.filter || [])

      if (filters.length > 0) {
        const rangeFilter = filters[filters.length - 1];
        if (rangeFilter?.hasOwnProperty("range")) {
          if (_payload?.rangeFilter) {
            filters[filters.length - 1] = cloneDeep(_payload?.rangeFilter)
            params.body.query.bool.filter = filters
          } else {
            rangeCacheRef.current = rangeFilter
          }
        }
      }
      const { index, body } = params
      const res = await onSearch(index, body);
      if (!res || !res.hits) {
        res.hits = {
          hits: [],
        };
      }
      setSearchResult(res);

      const { query } = queryStringManager.getQuery();
      const allFilters = filterManager.getFilters();
      setQueryParams((prev: any) => {
        return ({
        ...prev,
        query: query != queryParams.query ? query : queryParams.query,
        range: [timefilter._time?.from, timefilter._time?.to],
        sort: sort,
        timeField: indexPattern.timeFieldName,
        filters: allFilters.map((item) => {
          const { meta, query } = item
          const { value, ...rest } = meta || {}
          return {
            meta: rest,
            query
          }
        })
      })
      })
    },
    [
      state.interval,
      state.sort,
      indexPattern,
      distinctParams,
      queryFrom,
      indexPattern?.timeFieldName,
      queryParams
    ]
  );

  useEffect(() => {
    if (queryFrom > 0) {
      updateQuery({ isScrollLoad: true, rangeFilter: rangeCacheRef.current });
    }
  }, [queryFrom]);

  useEffect(() => {
    if (!isFrist) {
      updateQuery();
    } else {
      isFrist = !isFrist;
    }
  }, [props.indices]);

  const onIntervalChange = useCallback(
    (interval) => {
      if (interval) {
        //console.log(calculateInterval(interval))
        setState({ ...state, interval });
      }
    },
    [setState, indexPattern]
  );

  const [resultState, setResultState] = useState("loading");
  const { histogramData, timeChartProps } = useMemo(() => {
    if (!searchResult.hits.hits || searchResult.hits.hits.length == 0) {
      setResultState("none");
      return {};
    }
    if (
      !indexPattern?.timeFieldName ||
      !searchResult.aggregations ||
      !searchResult.aggregations["counts"]
    ) {
      setResultState("ready");
      return { histogramData: null, timeChartProps: null };
    }
    const buckets = getTimeBuckets(state.interval);
    const interval = buckets.getInterval(true);
    const chartTable = {
      columns: [
        {
          id: "key",
          name: `${indexPattern?.getTimeField().displayName} per ${interval.description
            }`,
        },
        { id: "doc_count", name: "count" },
      ],
      rows: [],
    };
    let aggregations = searchResult.aggregations;

    aggregations["counts"].buckets.forEach((bk) => {
      chartTable.rows.push(bk);
    });

    //console.log(interval, moment.duration('1', 'd'))
    const dimensions = {
      x: {
        accessor: 0,
        format: {
          id: "date",
          params: {
            pattern: buckets.getScaledDateFormat(),
            //pattern: 'YYYY-MM-DD',
          },
        },
        params: {
          date: true,
          interval: moment.duration(interval.esValue, interval.esUnit),
          intervalESValue: interval.esValue,
          intervalESUnit: interval.esUnit,
          bounds: buckets.getBounds(),
        },
      },
      y: {
        accessor: 1,
        format: {
          id: "number",
        },
        label: "Count",
      },
    };
    setResultState("ready");
    const timeChartProps = {
      timeRange: {
        from: timefilter.getBounds().min,
        to: timefilter.getBounds().max,
      },
      stateInterval: state.interval || '15s',
      options: intervalOptions,
      onIntervalChange, //(interval)=>{console.log(interval)},
      bucketInterval: {
        // scaled: true,
        // description: 'day',
        // scale: undefined,
        ...interval,
        timeFieldName: indexPattern?.timeFieldName,
      },
    };
    const histogramData = buildPointSeriesData(chartTable, dimensions);
    return { histogramData, timeChartProps };
  }, [searchResult, indexPattern, indexPattern?.timeFieldName, state.interval]);

  useEffect(() => {
    setQueryParams((prev: any) => ({
      ...prev,
      columns: state.columns
    }))
  }, [state.columns]);

  const { onAddColumn, onRemoveColumn, onMoveColumn, onSetColumns } = useMemo(
    () =>
      getStateColumnActions({
        indexPattern,
        setAppState: setState,
        state,
        useNewFieldsApi: false,
      }),
    [indexPattern, state]
  );

  const onSort = useCallback(
    (nsort) => {
      setState({ ...state, sort: nsort });
      updateQuery({ sort: nsort.reverse() });
    },
    [state, indexPattern]
  );

  const onAddFilter = useCallback(
    (field, values, operation) => {
      const fieldName = typeof field === "string" ? field : field.name;
      const newFilters = generateFilters(
        filterManager,
        field,
        values,
        operation,
        String(indexPattern.id)
      );
      filterManager.addFilters(newFilters);
      updateQuery();
    },
    [indexPattern, updateQuery]
  );

  const timefilterUpdateHandler = useCallback(
    (ranges) => {
      timefilter.setTime({
        from: moment(ranges.from).toISOString(),
        to: moment(ranges.to).toISOString(),
        mode: "absolute",
      });
      updateQuery();
    },
    [timefilter]
  );
  const rows = searchResult.hits.hits || [];
  const [records, setRecords] = useState([]);
  useMemo(() => {
    if (rows.length > 0) {
      if (queryFrom > 0) {
        setRecords((rs) => [...rs, ...rows]);
      } else {
        setRecords(rows);
      }
    } else if (queryFrom === 0) {
      setRecords([]);
    }
  }, [rows]);

  const opts = {
    savedSearch: {},
    timefield: indexPattern?.getTimeField()?.displayName,
    chartAggConfigs: {},
  };
  const fieldCounts = {};
  for (const hit of records) {
    for (const key of Object.keys(indexPattern.flattenHit(hit, true))) {
      fieldCounts[key] = (fieldCounts[key] || 0) + 1;
    }
  }
  const total = Number.isInteger(searchResult.hits.total?.value) ? searchResult.hits.total?.value : 0;
  const showDatePicker = indexPattern?.timeFieldName != "";

  const saveDocument = useCallback(
    async ({ _index, _id, _type, _source, is_new }) => {
      return false;
    },
    [updateQuery]
  );

  const deleteDocument = useCallback(
    async ({ _index, _id, _type }) => {
      return false;
    },
    [updateQuery]
  );
  const document = useMemo(() => {
    return { saveDocument, deleteDocument };
  }, [saveDocument, deleteDocument]);

  const onFieldAgg = async (field, beforeFuc, afterFuc) => {
    let name = field?.spec?.name || field?.name
    if (!name || !onSearch) {
      return;
    }
    if (field.isMulti) {
      name = `${name}.keyword`;
    } else {
      if (field?.spec?.aggregatable !== true) {
        return
      }
    }
    if (beforeFuc) {
      beforeFuc()
    }

    const dsl_json = queryParams.sampleRecords === 'all'
      ? {
        "top5": {
          "terms": {
            "field": name,
            "size": queryParams.topNumber || 5,
          }
        }
      }
      : {
        "sample": {
          "sampler": {
            "shard_size": queryParams.sampleSize || 5000
          },
          "aggs": {
            "sample_count": {
              "value_count": {
                "field": name,
              }
            },
            "top5": {
              "terms": {
                "field": name,
                "size": queryParams.topNumber || 5,
                "shard_size": 25
              }
            }
          }
        },
        "top5": {
          "terms": {
            "field": name,
            "size": queryParams.topNumber || 5,
            "shard_size": 25
          }
        }
      };

    const params = getSearchParams(
      indexPattern,
      state.interval,
      state.sort,
      dsl_json,
      distinctParams || {},
      0,
      true,
      0
    );

    const filters = params?.body?.query?.bool?.filter || []

    if (filters.length > 0) {
      if (rangeCacheRef.current) {
        const rangeFilter = filters[filters.length - 1];
        const range = cloneDeep(rangeCacheRef.current);
        if (rangeFilter?.hasOwnProperty("range")) {
          filters[filters.length - 1] = range
          params.body.query.bool.filter = filters
        } else {
          filters.push(range)
        }
        params.body.query.bool.filter = filters
      }
    }

    const { index, body } = params

    const res = await onSearch(index, body);

    if (afterFuc) {
      const buckets = queryParams.sampleRecords === 'all'
        ? res?.aggregations?.['top5']?.buckets
        : res?.aggregations?.sample?.['top5']?.buckets;
      const count = queryParams.sampleRecords === 'all'
        ? res?.aggregations?.['top5']?.sum_other_doc_count
        : res?.aggregations?.sample?.sample_count?.value;
      afterFuc(buckets || [], count || 0);
    }
  }

  const onTimeFieldChange = async (timeField: string) => {
    subscriptions.unsubscribe();
    indexPattern.timeFieldName = timeField;
    setIndexPattern(indexPattern)
    const newSort = [[timeField, 'desc']]
    setState({
      ...state,
      columns: ["_source"],
      sort: newSort,
    });
    updateQuery({ sort: newSort });
  };

  const onDownloadQuery = async (from: number, size: number, callback?: (hits: any[], columns: string[], timeField?: string) => void) => {
    if (!onSearch) return;
    setResultState('downloading')
    const params = getSearchParams(
      indexPattern,
      state.interval,
      state.sort,
      null,
      distinctParams || {},
      from,
      false,
      size
    );

    const { index, body } = params

    const res = await onSearch(index, body);

    const hits = Array.isArray(res?.hits?.hits) ? res?.hits?.hits : []

    const timeField = indexPattern.timeFieldName

    callback?.(hits, columns, timeField)

    setResultState('ready')
  }

  return (
    <Card className={`h-full`} classNames={{ body: '!p-0 h-full flex flex-col' }}>
      <SearchBar
        {...{
          showSearchBar: false,
          showQueryBar: true,
          showQueryInput: true,
          showDatePicker: showDatePicker,
          showFilterBar: true,
          useDefaultBehaviors: true,
          screenTitle: "",
          // filters: filters,
          onFiltersUpdated: (filters) => {
            filterManager.setFilters(filters);
          },
          indexPatterns: [indexPattern],
          filterManager,
          query: {
            language: "kuery",
            query: queryParams.query || "",
          },
          queryStringManager,
          queryString: queryStringManager,
          timefilter,
          storage,
          onQuerySubmit: updateQuery,
          services,
          dateRangeFrom: queryParams.range && queryParams.range[0],
          dateRangeTo: queryParams.range && queryParams.range[1],
          selectedIndexPattern: indexPattern,
          setIndexPattern: (index: string) => {
            subscriptions.unsubscribe()
            onIndexPatternChange(index)
          },
          indices: props.indices,
          histogramData,
          timefilterUpdateHandler,
          histogramOpts: opts,
          timeSetting: {
            ...(timeChartProps || {}),
            showTimeSetting: true,
            showTimeField: true,
            timeField: indexPattern.timeFieldName,
            timeFields: indexPattern.fields.filter((field) => field.spec.type === "date").map((field) => field.displayName),
            showTimeInterval: false,
            timeInterval: timeChartProps?.stateInterval,
            timeIntervals: intervalOptions?.map(({ display, val }) => ({ label: display, value: val })),
            onTimeSettingChange: ({ timeField, timeInterval }) => {
              if (indexPattern.timeFieldName !== timeField) {
                onTimeFieldChange(timeField)
              }
              if (timeChartProps?.stateInterval !== timeInterval) {
                onIntervalChange(timeInterval)
              }
            },
            timeZone,
            onTimeZoneChange: setTimeZone,
            recentlyUsedRanges: []
          },
          locale,
          theme
        }}
      />
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 flex border-t border-t-solid border-[var(--ant-color-border)]">
          {resultState === "none" && queryFrom === 0 ? (
            <>
              <DiscoverNoResults
                timeFieldName={opts.timefield}
                queryLanguage={state.query?.language || ""}
                range={queryParams.range}
              />
            </>
          ) : (
            <>
              {
                !collapseState.sideBar && (
                  <div className="h-full w-300px p-8px border-r border-r-solid border-[var(--ant-color-border)] overflow-y-auto infini-discover-side">
                    <SidebarMemoized
                      config={{}}
                      columns={columns}
                      fieldCounts={fieldCounts}
                      hits={records}
                      indexPatterns={[indexPattern]}
                      onAddField={onAddColumn}
                      onAddFilter={onAddFilter}
                      onRemoveField={onRemoveColumn}
                      selectedIndexPattern={indexPattern}
                      setIndexPattern={() => { }}
                      setAppState={setState}
                      state={state}
                      //unmappedFieldsConfig={unmappedFieldsConfig}
                      //useNewFieldsApi={useNewFieldsApi}
                      distinctParams={distinctParams}
                      onDistinctParamsChange={onDistinctParamsChange}
                      total={total}
                      onFieldAgg={onFieldAgg}
                      whetherToSample={queryParams.whetherToSample}
                      sampleSize={queryParams.sampleSize}
                      topNumber={queryParams.topNumber}
                      onCollapseToggle={() => {
                        setCollapseState((prev) => ({
                          ...prev,
                          sideBar: !prev.sideBar
                        }))
                      }}
                    />
                  </div>
                )
              }
              <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div
                  style={{
                    display: resultState !== "loading" && resultState !== "downloading" ? "none" : "",
                  }}
                >
                  <div className="dscOverlay">
                    <LoadingSpinner />
                  </div>
                </div>
                {
                  <ResultHeader
                    showCollapse={{
                      sideBar: true,
                      histogram: !!histogramData,
                    }}
                    collapseState={collapseState}
                    setCollapseState={setCollapseState}
                    took={searchResult.took || 1}
                    total={total}
                    timeChartProps={timeChartProps}
                    onDownloadQuery={onDownloadQuery}
                    downloading={resultState === "downloading"}
                    exportMaxSize={exportMaxSize}
                  />
                }
                {
                  !collapseState.histogram && opts.chartAggConfigs && histogramData && records.length !== 0 && (
                    <div className="dscTimechart">
                      <div className="h-100px dscHistogramGrid">
                        <DiscoverHistogram
                          chartData={histogramData}
                          timefilterUpdateHandler={
                            timefilterUpdateHandler
                          }
                          theme={theme}
                        />
                      </div>
                    </div>
                  )
                }
                {records && records.length > 0 ? (
                  <Table
                    columns={columns}
                    sortOrder={state.sort || []}
                    indexPattern={indexPattern}
                    onFilter={onAddFilter}
                    onRemoveColumn={onRemoveColumn}
                    onMoveColumn={onMoveColumn}
                    onAddColumn={onAddColumn}
                    onChangeSortOrder={onSort}
                    document={document}
                    hits={records}
                    hitsTotal={total}
                    queryFrom={queryFrom}
                    setQueryFrom={(from) => {
                      setResultState('next')
                      setQueryFrom(from)
                    }}
                    theme={theme}
                  />
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
};

const Container = ({ children }: { children: any }) => {
  return (
    <Card className={`min-h-full h-auto flex flex-col`} classNames={{ body: '!p-0 flex-1 items-center justify-center flex w-full' }}>
      {children}
    </Card>
  )
}

export interface IIndexProps {
  type: string;
  name: string;
  tag?: string;
  disabled?: boolean;
  _source: any;
}

export interface II18nProps {
  filter?: {
    all?: {
      title?: string;
      enable?: string;
      disable?: string;
      invert_inclusion?: string;
      invert_enable_disable?: string;
      remove_all?: string;
    };
    item?: {
      create?: string;
      edit?: string;
      edit_values?: string;
      edit_dsl?: string;
      field?: string;
      operator: string;
      create_label?: string;
      value?: string;
      values?: string;
      range?: string;
      dsl?: string;
      custom_label?: string;
      cancel?: string;
      save?: string;
      include_results?: string;
      exclude_results?: string;
      re_enable?: string;
      temporarily_disable?: string;
      delete?: string;
    };
    operators?: {
      phrase_true?: string;
      phrase_false?: string;
      phrases_true?: string;
      phrases_false?: string;
      range_true?: string;
      range_false?: string;
      exists_true?: string;
      exists_false?: string;
    };
  };
  search?: {
    placeholder?: string;
    refresh?: string;
    update?: string;
  };
  field?: {
    search?: {
      placeholder?: string;
      aggregatable?: string;
      searchable?: string;
      type?: string;
      title?: string;
      any?: string;
      yes?: string;
      no?: string;
      hide_missing_fields?: string;
    };
    distinct_label?: string;
    distinct_type?: string;
    distinct_field?: string;
    selected_label?: string;
    available_label?: string;
    add_field_to_column?: string;
    remove_field_from_column?: string;
    unindexed_field_warning?: string;
    filter_for_value?: string;
    filter_out_value?: string;
    filter_for_field_present?: string;
    scripted_field_presence_error?: string;
    meta_field_presence_error?: string;
    toggle_column_in_table?: string;
    stop_sorting?: string;
    ascending?: string;
    descending?: string;
    remove_column?: string;
    move_to_left?: string;
    move_to_right?: string;
    top?: string;
    top_values?: string;
    top_remote?: string;
    top_local?: string;
    top_result_prefix?: string
    top_result_suffix?: string
  };
  empty?: {
    title?: string;
    desc?: string;
  };
  result?: {
    found?: string;
    records?: string;
    milliscond?: string;
    between?: string;
  };
  download?: {
    title?: string;
  }
}

export interface IDiscoverProps {
  loading?: boolean;
  indices: IIndexProps[];
  getIndexPattern?: (index: string) => Promise<any> | undefined;
  onSuggestions?: (index: string, body: any) => Promise<string[]> | undefined;
  onSearch?: (index: string, body: any) => Promise<string[]> | undefined;
  queryParams: any;
  setQueryParams: (queryParams: any) => void,
  locale?: string;
  theme?: string;
  i18n?: II18nProps;
  exportMaxSize?: number;
}

export const GlobalConfigContext = React.createContext<any>({});

export default (props: IDiscoverProps) => {

  const {
    loading = false,
    indices = [],
    getIndexPattern,
    onSearch,
    onSuggestions,
    queryParams,
    setQueryParams,
    locale,
    theme = 'light',
    i18n = {},
    exportMaxSize = 10000
  } = props;

  const [indexPattern, setIndexPattern] = useState<IndexPattern>()
  const requestRef = useRef<{
    pendingIndex: string | null;
    loadedIndex: string | null;
  }>({
    pendingIndex: null,
    loadedIndex: null,
  });

  const fetchIndexPattern = async (index: string, timeField?: string) => {
    if (!index) return;
    if (requestRef.current.pendingIndex === index) {
      return;
    }

    if (requestRef.current.loadedIndex === index) {
      return;
    }

    requestRef.current.pendingIndex = index;

    const newIndexPattern = await services.indexPatternService.get(
      index,
      "index",
    );
    if (!newIndexPattern) return;
    const timeFields: string[] = [];
    newIndexPattern.fields.forEach((field) => {
      if (field.spec.type === "date") {
        timeFields.push(field.spec.name);
      }
    });
    if (
      timeFields &&
      timeFields.length >= 1
    ) {
      if (timeField && timeFields.includes(timeField)) {
        newIndexPattern.timeFieldName = timeField
      } else if (newIndexPattern.timeFieldName === "") {
        newIndexPattern.timeFieldName = timeFields[0];
      }
    }
    if (newIndexPattern.id !== queryParams?.index) {
      setQueryParams({
        index: newIndexPattern.id,
        columns: ["_source"],
        sort: [],
      });
      queryStringManager.setQuery({
        query: "",
        language: "kuery",
      });
      filterManager.removeAll();
      timefilter.setTime({ from: '', to: ''})
    }
    setIndexPattern(newIndexPattern)
    const indexPatterns = [newIndexPattern];
    indexPatterns.get = (id) => {
      return Promise.resolve(indexPatterns.find((ip) => ip.id == id));
    };
    setIndexPatterns(indexPatterns);

    requestRef.current.loadedIndex = index;
    requestRef.current.pendingIndex = null;
  }

  useEffect(() => {
    if (onSuggestions) {
      services.data.autocomplete.setup(
        {
          onSuggestions
        },
      );
    }
    if (getIndexPattern) {
      services.indexPatternService.setup({ getIndexPattern })
    }
  }, [])

  useEffect(() => {
    if (!Array.isArray(indices) || indices.length === 0) return;
    let index = indices.find((item) => item.name === queryParams?.index)
    if (!index || index.disabled) {
      index = indices.find((item) => !item.disabled)
    }
    if (index) {
      fetchIndexPattern(index.name, queryParams?.timeField)
    }
  }, [indices, queryParams?.index, queryParams?.timeField])

  useEffect(() => {
    requestRef.current = { pendingIndex: null, loadedIndex: null };
  }, [indices]);

  if (loading) return (
    <Container>
      <Spin spinning={loading} />
    </Container>
  )

  if (!indices || indices.length === 0 || !indexPattern) return (
    <Container>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Container>
  )

  return (
    <GlobalConfigContext.Provider value={{ i18n }}>
      <Discover
        indices={indices}
        indexPattern={indexPattern}
        setIndexPattern={setIndexPattern}
        onIndexPatternChange={fetchIndexPattern}
        onSearch={onSearch}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        locale={locale}
        theme={theme}
        exportMaxSize={exportMaxSize}
      />
    </GlobalConfigContext.Provider>
  )
};