import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

import "@elastic/eui/dist/eui_theme_light.min.css";
import { Card } from "antd";
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
import { cloneDeep } from "lodash";

import 'uno.css'
import './index.scss'
import './euiicons'
import ResultHeader from "./ResultHeader";
import { IndexPattern } from "./vendor/data/common";

import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { getTimezone } from "@/utils/utils";
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
  indices: string[];
  indexPattern: IndexPattern;
  setIndexPattern: React.Dispatch<React.SetStateAction<IndexPattern | undefined>>
  onIndexPatternChange: (index: string) => void;
  onSearch?: (index: string, body: any) => Promise<any> | undefined
  params: any;
}) => {

  const {
    indexPattern,
    setIndexPattern,
    onIndexPatternChange,
    onSearch,
    params,
  } = props;

  const {
    queryParam, setQueryParam,
    columnsParam, setColumnsParam,
    timeParam, setTimeParam,
    whetherToSample, setWhetherToSample,
    sampleSize, setSampleSize,
    topNumber, setTopNumber,
    sampleRecords, setSampleRecords
  } = params || {};

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

  // refactor

  const rangeCacheRef = useRef();

  useEffect(() => {
    timefilter.setTime({
      from: timeParam && timeParam[0] || "now-15m",
      to: timeParam && timeParam[1] || "now",
    });
  }, [])

  const [state, setState] = useState<any>({
    columns: columnsParam || ["_source"], //['name', 'address'],
    interval: "15s",
    sort: [],
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
  const resetDistinctParams = () => {
    setDistinctParams({
      ...distinctParams,
      type: distinctParamsDefault.type,
      field: distinctParamsDefault.field,
    });
  };
  useMemo(() => {
    resetDistinctParams();
  }, [indexPattern]);

  const [queryFrom, setQueryFrom] = React.useState(0);

  const columns = state.columns;

  const updateQuery = useCallback(
    async (_payload?: any) => {
      if (!indexPattern || !onSearch) {
        return;
      }
      setResultState("loading");
      let aggs = null;
      if (!_payload?.isScrollLoad) {
        setQueryFrom(0);
      }

      const params = getSearchParams(
        _payload?.indexPattern || indexPattern,
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
      if (!res?.hits || res?.error) {
        res.hits = {
          hits: [],
        };
      }
      res.hits.hits = res.hits.hits || [];
      setSearchResult(res);

      const { query } = queryStringManager.getQuery();
      if (query != queryParam) {
        setQueryParam?.(query);
      }
      setTimeParam?.([timefilter._time?.from, timefilter._time?.to]);
    },
    [
      state.interval,
      state.sort,
      indexPattern,
      distinctParams,
      queryFrom,
      indexPattern?.timeFieldName,
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
    setColumnsParam?.(state.columns);
  }, [state.columns]);

  useEffect(() => {
    if (indexPattern) {
      if (indexPattern?.timeFieldName) {
        const newSort = [[indexPattern?.timeFieldName, 'desc']]
        setState({
          ...state,
          sort: newSort
        });
        updateQuery({ sort: newSort });
      } else {
        setState({
          ...state,
          sort: []
        });
        updateQuery({ sort: [] });
      }
    }
  }, [indexPattern]);

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
        setRecords([...records, ...rows]);
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

    const dsl_json = sampleRecords === 'all'
      ? {
        "top5": {
          "terms": {
            "field": name,
            "size": topNumber || 5,
          }
        }
      }
      : {
        "sample": {
          "sampler": {
            "shard_size": sampleSize || 5000
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
                "size": topNumber || 5,
                "shard_size": 25
              }
            }
          }
        },
        "top5": {
          "terms": {
            "field": name,
            "size": topNumber || 5,
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
      const buckets = sampleRecords === 'all'
        ? res?.aggregations?.['top5']?.buckets
        : res?.aggregations?.sample?.['top5']?.buckets;
      const count = sampleRecords === 'all'
        ? res?.aggregations?.['top5']?.sum_other_doc_count
        : res?.aggregations?.sample?.sample_count?.value;
      afterFuc(buckets || [], count || 0);
    }
  }

  const onTimeFieldChange = async (timeField: string) => {
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

  return (
    <Card className={`min-h-full h-auto flex flex-col`} classNames={{ body: '!p-0 flex-1 flex flex-col' }}>
      <>
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
            onFiltersUpdated: getContext().defaultFiltersUpdated(),
            indexPatterns: [indexPattern],
            filterManager,
            query: {
              language: "kuery",
              query: queryParam || "",
            },
            queryStringManager,
            queryString: queryStringManager,
            timefilter,
            storage,
            onQuerySubmit: updateQuery,
            services,
            dateRangeFrom: timeParam && timeParam[0] || "now-15m", // change by hardy
            dateRangeTo: timeParam && timeParam[1] || "now",
            selectedIndexPattern: indexPattern,
            setIndexPattern: onIndexPatternChange,
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
              showTimeInterval: !!histogramData,
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
          }}
        />
      </>
      <div className="flex flex-1 min-h-0 border-t border-t-solid border-[var(--ant-color-border)]">
        {resultState === "none" && queryFrom === 0 ? (
          <>
            <DiscoverNoResults
              timeFieldName={opts.timefield}
              queryLanguage={state.query?.language || ""}
            />
          </>
        ) : (
          <>
            {
              !collapseState.sideBar && (
                <div className="min-h-0 w-300px p-8px border-r border-r-solid border-[var(--ant-color-border)]">
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
                    indices={props.indices}
                    distinctParams={distinctParams}
                    onDistinctParamsChange={onDistinctParamsChange}
                    total={total}
                    onFieldAgg={onFieldAgg}
                    whetherToSample={whetherToSample}
                    sampleSize={sampleSize}
                    topNumber={topNumber}
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
            <div className="flex-1 min-h-0 overflow-x-auto">
              {
                <ResultHeader
                  collapseState={collapseState}
                  setCollapseState={setCollapseState}
                  took={searchResult.took || 1}
                  total={total}
                  timeChartProps={timeChartProps}
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
                      />
                    </div>
                  </div>
                )
              }
              <div>
                {records && records.length > 0 ? (
                  <div>
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
                      setQueryFrom={setQueryFrom}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
};

export interface IDiscoverProps {
  indices: string[];
  getIndexPattern?: (index: string) => Promise<any> | undefined
  onSuggestions?: (index: string, body: any) => Promise<string[]> | undefined
  onSearch?: (index: string, body: any) => Promise<string[]> | undefined
}

export default (props: IDiscoverProps) => {

  const {
    indices = [],
    getIndexPattern,
    onSearch,
    onSuggestions
  } = props;

  const [queryParam, setQueryParam] = useState();
  const [columnsParam, setColumnsParam] = useState();
  const [timeParam, setTimeParam] = useState();
  const [whetherToSample, setWhetherToSample] = useState();
  const [sampleSize, setSampleSize] = useState();
  const [topNumber, setTopNumber] = useState();
  const [sampleRecords, setSampleRecords] = useState();

  const [indexPattern, setIndexPattern] = useState<IndexPattern>()

  const fetchIndexPattern = async (index: string) => {
    if (!index) return;
    const newIndexPattern = await services.indexPatternService.get(
      index,
      "index",
    );
    if (!newIndexPattern) return;
    const timeFields: string[] = [];
    newIndexPattern.fields.forEach((field) => {
      if (field.spec.type === "date") {
        timeFields.push(field.displayName);
      }
    });
    if (
      timeFields &&
      timeFields.length == 1 &&
      newIndexPattern.timeFieldName == ""
    ) {
      newIndexPattern.timeFieldName = timeFields[0];
    }
    setIndexPattern(newIndexPattern)
    const indexPatterns = [newIndexPattern];
    indexPatterns.get = (id) => {
      return Promise.resolve(indexPatterns.find((ip) => ip.id == id));
    };
    setIndexPatterns(indexPatterns);
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
    fetchIndexPattern(indices[0])
  }, [indices])

  const params = {
    queryParam, setQueryParam,
    columnsParam, setColumnsParam,
    timeParam, setTimeParam,
    whetherToSample, setWhetherToSample,
    sampleSize, setSampleSize,
    topNumber, setTopNumber,
    sampleRecords, setSampleRecords
  }

  if (!indexPattern) return null;

  return (
    <Discover
      indices={indices}
      params={params}
      indexPattern={indexPattern}
      setIndexPattern={setIndexPattern}
      onIndexPatternChange={fetchIndexPattern}
      onSearch={onSearch}
    />
  )
};