import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef
} from 'react';

import '@elastic/eui/dist/eui_theme_light.min.css';
import { Card, Empty, Spin } from 'antd';
import { getStateColumnActions } from './vendor/discover/public/application/angular/doc_table/actions/columns';
import { DiscoverSidebar } from './vendor/discover/public/application/components/sidebar/discover_sidebar';
import { DiscoverHistogram } from './vendor/discover/public/application/components/histogram/histogram';
import moment from 'moment';
import {
  createContext,
  Storage,
  timeBucketConfig,
  timefilterConfig
} from './context';
import { createSearchBar } from './vendor/data/public/ui/search_bar/create_search_bar';
import { DiscoverNoResults } from './vendor/discover/public/application/angular/directives/no_results';
import { buildPointSeriesData } from './vendor/discover/public/application/angular/helpers/';
import { generateFilters } from './vendor/data/public/query/filter_manager/lib/generate_filters';
import Table from './vendor/discover/public/application/components/discover_table/table';
import { LoadingSpinner } from './vendor/discover/public/application/components/loading_spinner/loading_spinner';
import { cloneDeep } from 'lodash';
import ResultHeader from './ResultHeader';
import { FilterStateStore, IndexPattern } from './vendor/data/common';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { getTimezone } from '@/utils/utils';

import 'uno.css';
import './index.scss';
import './euiicons';
import { TimeBuckets } from './vendor/data/common/search/aggs/buckets/lib/time_buckets';
import { Timefilter } from './vendor/data/public/query';

loader.config({ monaco });

const SidebarMemoized = React.memo(DiscoverSidebar);

type DiscoverContext = ReturnType<typeof createContext>;

const SearchBar = createSearchBar();

const Discover = (props: {
  context: DiscoverContext;
  errorContent?: React.ReactNode;
  indices: { [key: string]: any }[];
  indexPattern: IndexPattern;
  setIndexPattern: React.Dispatch<
    React.SetStateAction<IndexPattern | undefined>
  >;
  onIndexPatternChange: (index: string) => void;
  onSearch?: (index: string, body: any) => Promise<any> | undefined;
  onGetIndexSetting?: (index: string) => Promise<any> | undefined;
  onOpenPit?: (
    index: string,
    keepAlive: string
  ) => Promise<string | null> | undefined;
  onClosePit?: (pitId: string) => Promise<void> | undefined;
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
    onGetIndexSetting,
    onOpenPit,
    onClosePit,
    queryParams = {},
    setQueryParams: publishQuery,
    locale,
    theme,
    exportMaxSize = 10000
  } = props;

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
    setIndexPatterns
  } = props.context;

  // Controlled queries come from the host URL. An echoed local publication is
  // acknowledged once. History navigation restores the whole workspace instead.
  const querySync = useRef({
    received: null as string | null,
    pending: null as { key: string; value: any } | null,
    columns: null as string[] | null,
    defaults: {} as any,
    latest: queryParams,
    publish: publishQuery
  });
  querySync.current.latest = queryParams;
  querySync.current.publish = publishQuery;
  const queryKey = JSON.stringify(queryParams);
  const requestOwner = useRef({
    key: queryKey,
    pattern: indexPattern,
    selectedIndex: queryParams.index || (indexPattern.id || indexPattern.title),
    read: 0
  });
  if (
    requestOwner.current.key !== queryKey ||
    requestOwner.current.pattern !== indexPattern
  ) {
    requestOwner.current = {
      key: queryKey,
      pattern: indexPattern,
      selectedIndex: queryParams.index || (indexPattern.id || indexPattern.title),
      read: 0
    };
  }
  const lifetime = useRef({ active: true });
  useEffect(() => {
    lifetime.current.active = true;
    return () => { lifetime.current.active = false; };
  }, []);

  const setQueryParams = (update: any) => {
    const owner = querySync.current;
    const base = owner.pending?.value || owner.latest;
    const value =
      typeof update === 'function' ? update(base) : { ...base, ...update };
    // Search completion also publishes its inputs. Defaults are not a user edit
    // and must not add a duplicate browser history entry.
    if (
      Object.keys(value).every(
        (key) =>
          JSON.stringify(value[key]) ===
          JSON.stringify(base[key] ?? owner.defaults[key])
      )
    )
      return;
    owner.pending = { key: JSON.stringify(value), value };
    owner.publish(value);
  };

  const [collapseState, setCollapseState] = useState({
    sideBar: false,
    histogram: false
  });

  const [timeZone, setTimeZone] = useState(() => getTimezone());

  const indexPatternRef = useRef(indexPattern);
  useEffect(() => {
    indexPatternRef.current = indexPattern;
  }, [indexPattern]);

  const refreshExportLimit = useCallback(async () => {
    if (!onGetIndexSetting) return;
    const index =
      indexPattern?.id || indexPattern?.index || indexPattern?.title;
    if (!index) return;
    try {
      const res = await onGetIndexSetting(index);
      if (
        index !==
        (indexPatternRef.current?.id ||
          indexPatternRef.current?.title)
      ) {
        return;
      }
      const values = Object.values(res || {})
        .map((entry: any) => {
          const explicit = entry?.settings?.index?.max_result_window;
          const fallback = entry?.defaults?.index?.max_result_window;
          const value = Number(explicit || fallback);
          return Number.isFinite(value) && value > 0 ? value : NaN;
        })
        .filter((value) => Number.isFinite(value));
      if (values.length > 0) {
        setMaxResultWindow(Math.min(...values));
      }
    } catch (error) {
      // keep the current limit when the index setting cannot be fetched
    }
  }, [onGetIndexSetting, indexPattern]);

  const [maxResultWindow, setMaxResultWindow] = useState<number>(exportMaxSize);

  useEffect(() => {
    setMaxResultWindow(exportMaxSize);
    refreshExportLimit();
  }, [exportMaxSize, refreshExportLimit]);

  const [searchResult, setSearchResult] = useState({
    took: 11,
    timed_out: false,
    _shards: { total: 4, successful: 4, skipped: 3, failed: 0 },
    hits: { total: 0, max_score: null, hits: [] },
    aggregations: { counts: { buckets: [] } }
  });

  const rangeCacheRef = useRef();
  const updateQueryRef = useRef<any>();
  const queryParamsRef = useRef(queryParams);
  queryParamsRef.current = queryParams;

  const [state, setState] = useState<any>({
    columns: queryParams.columns || ['_source'], //['name', 'address'],
    interval: '15s',
    sort: queryParams.sort || []
  });

  const distinctParamsDefault = {
    type: 'string',
    field: '',
    enabled: false
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
      field: distinctParamsDefault.field
    });
  }, [indexPattern]);

  useEffect(() => {
    if (
      !indexPattern ||
      (queryParams.index &&
        queryParams.index !==
          (indexPattern.id || indexPattern.title))
    )
      return;
    const owner = querySync.current;
    if (owner.received === queryKey) return;
    const ownPublication = owner.pending?.key === queryKey;
    owner.received = queryKey;
    owner.pending = null;
    if (ownPublication) return;

    // Apply all inputs before reading. Omitted filters and ranges clear the
    // previous controlled query instead of inheriting invisible conditions.
    queryStringManager.setQuery({
      query: queryParams.query || '',
      language: 'kuery'
    });
    filterManager.setFilters(
      (Array.isArray(queryParams.filters) ? queryParams.filters : [])
        .filter((filter: any) => !!filter.meta)
        .map((filter: any) => ({ ...filter, store: FilterStateStore.APP_STATE }))
    );
    timefilter.setTime({
      from: queryParams.range?.[0] || '',
      to: queryParams.range?.[1] || ''
    });
    const defaultTimeField =
      indexPattern.fields?.find((field) => field.spec?.type === 'date')?.spec
        .name || '';
    indexPattern.timeFieldName =
      typeof queryParams.timeField === 'string'
        ? queryParams.timeField
        : defaultTimeField;
    const columns = queryParams.columns || ['_source'];
    const sort =
      queryParams.sort ||
      (indexPattern.timeFieldName
        ? [[indexPattern.timeFieldName, 'desc']]
        : []);
    owner.defaults = {
      query: '',
      columns: ['_source'],
      range: ['', ''],
      filters: [],
      timeField: defaultTimeField,
      sort: indexPattern.timeFieldName
        ? [[indexPattern.timeFieldName, 'desc']]
        : []
    };
    // Do not let the old columns effect publish over a query restored by history.
    owner.columns =
      JSON.stringify(state.columns) === JSON.stringify(columns)
        ? null
        : columns;
    setState((previous: any) => ({ ...previous, columns, sort }));
    updateQueryRef.current?.({ sort });
  }, [queryKey, indexPattern]);

  const firstIndices = useRef(true);
  // Subscription lifetime follows the mounted context. Index and time-field
  // edits replace request owners, not the refresh subscription itself.
  useEffect(() => {
    const subscription = timefilter.getAutoRefreshFetch$().subscribe({
      next: () => { updateQueryRef.current?.(); },
    });
    return () => subscription.unsubscribe();
  }, [timefilter]);

  const [queryFrom, setQueryFrom] = React.useState(0);

  const columns = state.columns;

  const updateQuery = useCallback(
    async (_payload?: any) => {
      if (!indexPattern || !onSearch) {
        return;
      }
      const owner = requestOwner.current;
      const patternId = indexPattern.id || indexPattern.title;
      if (!lifetime.current.active || owner.selectedIndex !== patternId) return;
      const read = ++owner.read;
      setResultState((prev) => {
        if (prev === 'next') return prev;
        return 'loading';
      });
      let aggs = null;
      if (!_payload?.isScrollLoad) {
        setQueryFrom(0);
      }

      const sort = _payload?.sort || state.sort;

      const params = getSearchParams(
        indexPattern,
        _payload?.interval || state.interval,
        _payload?.sort || state.sort,
        _payload?.aggs || aggs,
        distinctParams || {},
        _payload?.isScrollLoad ? queryFrom : 0,
        true,
        20,
        timeZone
      );

      const filters = cloneDeep(params?.body?.query?.bool?.filter || []);

      if (filters.length > 0) {
        const rangeFilter = filters[filters.length - 1];
        if (rangeFilter?.hasOwnProperty('range')) {
          if (_payload?.rangeFilter) {
            filters[filters.length - 1] = cloneDeep(_payload?.rangeFilter);
            params.body.query.bool.filter = filters;
          } else {
            rangeCacheRef.current = rangeFilter;
          }
        }
      }
      const { index, body } = params;
      const res = await onSearch(index, body);
      if (
        !lifetime.current.active ||
        owner !== requestOwner.current ||
        read !== owner.read
      )
        return;
      if (!res || res.error) {
        setResultState('ready');
        return;
      }
      if (!res || !res.hits) {
        res.hits = {
          hits: []
        };
      }
      setSearchResult(res);

      const { query } = queryStringManager.getQuery();
      const allFilters = filterManager.getFilters();
      const currentQueryParams = queryParamsRef.current;
      setQueryParams({
        ...currentQueryParams,
        query:
          query != currentQueryParams.query ? query : currentQueryParams.query,
        range: [timefilter._time?.from, timefilter._time?.to],
        sort: sort,
        timeField: indexPattern.timeFieldName,
        filters: allFilters.map((item) => {
          const { meta, query } = item;
          const { value, ...rest } = meta || {};
          return {
            meta: rest,
            query
          };
        })
      });
    },
    [
      state.interval,
      state.sort,
      indexPattern,
      distinctParams,
      queryFrom,
      indexPattern?.timeFieldName,
      timeZone,
      onSearch,
      queryKey
    ]
  );

  updateQueryRef.current = updateQuery;

  useEffect(() => {
    if (queryFrom > 0) {
      updateQueryRef.current?.({
        isScrollLoad: true,
        rangeFilter: rangeCacheRef.current
      });
    }
  }, [queryFrom]);

  useEffect(() => {
    if (!firstIndices.current) {
      updateQueryRef.current?.();
    } else {
      firstIndices.current = false;
    }
  }, [props.indices]);

  const onIntervalChange = (interval) => {
    if (interval) {
      setState({ ...state, interval });
    }
  };

  const [resultState, setResultState] = useState('loading');
  const { histogramData, timeChartProps } = useMemo(() => {
    if (!searchResult.hits.hits || searchResult.hits.hits.length == 0) {
      setResultState('none');
      return {};
    }
    if (
      !indexPattern?.timeFieldName ||
      !searchResult.aggregations ||
      !searchResult.aggregations['counts']
    ) {
      setResultState('ready');
      return { histogramData: null, timeChartProps: null };
    }
    const rows: any[] = [];
    searchResult.aggregations['counts'].buckets.forEach((bk) => {
      rows.push(bk);
    });
    let tf;
    let buckets = getTimeBuckets(state.interval);
    if (!buckets) {
      const from = rows[0]?.key;
      const to = rows[rows.length - 1]?.key;
      if (from && to) {
        const storage = new Storage(localStorage);
        tf = new Timefilter(timefilterConfig, storage);
        tf.setTime({
          from: moment(from).toISOString(),
          to: moment(to).toISOString(),
          mode: 'absolute'
        });
        const bounds = tf.getBounds();
        const timeBuckets = new TimeBuckets(timeBucketConfig);
        timeBuckets.setBounds(bounds);
        timeBuckets.setInterval(searchResult.aggregations['counts'].interval);
        buckets = timeBuckets;
      }
    } else {
      tf = timefilter;
    }
    if (!buckets) {
      setResultState('ready');
      return { histogramData: null, timeChartProps: null };
    }
    const interval = buckets.getInterval(true);
    const chartTable = {
      columns: [
        {
          id: 'key',
          name: `${indexPattern?.getTimeField().displayName} per ${
            interval.description
          }`
        },
        { id: 'doc_count', name: 'count' }
      ],
      rows
    };

    const dimensions = {
      x: {
        accessor: 0,
        format: {
          id: 'date',
          params: {
            pattern: buckets.getScaledDateFormat()
            //pattern: 'YYYY-MM-DD',
          }
        },
        params: {
          date: true,
          interval: moment.duration(interval.esValue, interval.esUnit),
          intervalESValue: interval.esValue,
          intervalESUnit: interval.esUnit,
          bounds: buckets.getBounds()
        }
      },
      y: {
        accessor: 1,
        format: {
          id: 'number'
        },
        label: 'Count'
      }
    };
    setResultState('ready');
    const timeChartProps = {
      timeRange: {
        from: tf?.getBounds().min,
        to: tf?.getBounds().max
      },
      stateInterval:
        state.interval || searchResult.aggregations['counts'].interval || '15s',
      options: intervalOptions,
      onIntervalChange, //(interval)=>{console.log(interval)},
      bucketInterval: {
        // scaled: true,
        // description: 'day',
        // scale: undefined,
        ...interval,
        timeFieldName: indexPattern?.timeFieldName
      }
    };
    const histogramData = buildPointSeriesData(chartTable, dimensions);
    return { histogramData, timeChartProps };
  }, [searchResult, indexPattern, indexPattern?.timeFieldName, state.interval]);

  useEffect(() => {
    {
      const owner = querySync.current;
      if (owner.columns) {
        if (JSON.stringify(state.columns) === JSON.stringify(owner.columns))
          owner.columns = null;
        return;
      }
      if (
        JSON.stringify(state.columns) ===
        JSON.stringify(queryParams.columns || ['_source'])
      )
        return;
    }
    setQueryParams((prev: any) => ({
      ...prev,
      columns: state.columns
    }));
  }, [state.columns]);

  const { onAddColumn, onRemoveColumn, onMoveColumn, onSetColumns } = useMemo(
    () =>
      getStateColumnActions({
        indexPattern,
        setAppState: setState,
        state,
        useNewFieldsApi: false
      }),
    [indexPattern, state]
  );

  const onSort = useCallback(
    (nsort) => {
      setState({ ...state, sort: nsort });
      updateQueryRef.current?.({ sort: [...nsort].reverse() });
    },
    [state, indexPattern]
  );

  const onAddFilter = useCallback(
    (field, values, operation) => {
      const fieldName = typeof field === 'string' ? field : field.name;
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

  const timefilterUpdateHandler = (ranges) => {
    timefilter.setTime({
      from: moment(ranges.from).toISOString(),
      to: moment(ranges.to).toISOString(),
      mode: 'absolute'
    });
    updateQuery();
  };
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
    chartAggConfigs: {}
  };
  const fieldCounts = {};
  for (const hit of records) {
    for (const key of Object.keys(indexPattern.flattenHit(hit, true))) {
      fieldCounts[key] = (fieldCounts[key] || 0) + 1;
    }
  }
  const total = Number.isInteger(searchResult.hits.total?.value)
    ? searchResult.hits.total?.value
    : 0;
  const showDatePicker = indexPattern?.timeFieldName != '';

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
    let name = field?.spec?.name || field?.name;
    if (!name || !onSearch) {
      return;
    }
    if (field.isMulti) {
      name = `${name}.keyword`;
    } else {
      if (field?.spec?.aggregatable !== true) {
        return;
      }
    }
    if (beforeFuc) {
      beforeFuc();
    }

    const dsl_json =
      queryParams.sampleRecords === 'all'
        ? {
            top5: {
              terms: {
                field: name,
                size: queryParams.topNumber || 5
              }
            }
          }
        : {
            sample: {
              sampler: {
                shard_size: queryParams.sampleSize || 5000
              },
              aggs: {
                sample_count: {
                  value_count: {
                    field: name
                  }
                },
                top5: {
                  terms: {
                    field: name,
                    size: queryParams.topNumber || 5,
                    shard_size: 25
                  }
                }
              }
            },
            top5: {
              terms: {
                field: name,
                size: queryParams.topNumber || 5,
                shard_size: 25
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
      0,
      timeZone
    );

    const filters = params?.body?.query?.bool?.filter || [];

    if (filters.length > 0) {
      if (rangeCacheRef.current) {
        const rangeFilter = filters[filters.length - 1];
        const range = cloneDeep(rangeCacheRef.current);
        if (rangeFilter?.hasOwnProperty('range')) {
          filters[filters.length - 1] = range;
          params.body.query.bool.filter = filters;
        } else {
          filters.push(range);
        }
        params.body.query.bool.filter = filters;
      }
    }

    const { index, body } = params;

    const res = await onSearch(index, body);

    if (afterFuc) {
      const buckets =
        queryParams.sampleRecords === 'all'
          ? res?.aggregations?.['top5']?.buckets
          : res?.aggregations?.sample?.['top5']?.buckets;
      const count =
        queryParams.sampleRecords === 'all'
          ? res?.aggregations?.['top5']?.sum_other_doc_count
          : res?.aggregations?.sample?.sample_count?.value;
      afterFuc(buckets || [], count || 0, res?.error);
    }
  };

  const onTimeFieldChange = async (timeField: string) => {
    indexPattern.timeFieldName = timeField;
    setIndexPattern(indexPattern);
    const newSort = timeField ? [[timeField, 'desc']] : [];
    setState({
      ...state,
      columns: ['_source'],
      sort: newSort
    });
    updateQuery({ sort: newSort });
  };

  const EXPORT_PAGE_SIZE = 5000;
  const PIT_KEEP_ALIVE = '2m';

  const exportUsePit = Boolean(onOpenPit && onClosePit);

  const onDownloadQuery = async (
    from: number,
    size: number,
    callback?: (hits: any[], columns: string[], timeField?: string) => void,
    shouldCancel?: () => boolean
  ) => {
    if (!onSearch) return;
    const owner = requestOwner.current;
    const patternId = indexPattern.id || indexPattern.title;
    if (!lifetime.current.active || owner.selectedIndex !== patternId) return;
    const isCurrent = () => lifetime.current.active && owner === requestOwner.current;
    setResultState('downloading');
    const params = getSearchParams(
      indexPattern,
      state.interval,
      state.sort,
      null,
      distinctParams || {},
      0,
      false,
      size,
      timeZone
    );

    const { index, body } = params;
    const timeField = indexPattern.timeFieldName;

    // Single-request fallback when the host does not provide PIT support
    let pitId: string | null = null;
    if (onOpenPit && onClosePit) {
      try {
        pitId = await onOpenPit(index, PIT_KEEP_ALIVE);
      } catch (error) {
        pitId = null;
      }
    }

    if (!isCurrent()) {
      if (pitId) await onClosePit?.(pitId);
      return;
    }
    if (!pitId) {
      const singleBody = { ...body, from, size };
      const res = await onSearch(index, singleBody);
      if (!isCurrent()) return;
      if (res?.error) {
        setResultState('ready');
        return;
      }
      const hits = Array.isArray(res?.hits?.hits) ? res?.hits?.hits : [];
      if (isCurrent() && !shouldCancel?.()) {
        callback?.(hits, columns, timeField);
      }
      setResultState('ready');
      return;
    }

    const hits: any[] = [];
    try {
      // Only the first page request counts toward max_result_window, so apply
      // the from offset server-side when it fits; otherwise skip pages client-side.
      const useFrom =
        from + Math.min(size, EXPORT_PAGE_SIZE) <= maxResultWindow;
      let toSkip = useFrom ? 0 : from;
      let remaining = size;
      let searchAfter: any = undefined;
      let isFirstPage = true;

      while (remaining > 0 && isCurrent() && !shouldCancel?.()) {
        const pageSize = Math.min(toSkip + remaining, EXPORT_PAGE_SIZE);
        const pageBody: any = {
          query: body.query,
          size: pageSize,
          sort: [{ _doc: 'asc' }],
          track_total_hits: false,
          pit: { id: pitId, keep_alive: PIT_KEEP_ALIVE }
        };
        if (isFirstPage && useFrom && from > 0) {
          pageBody.from = from;
        } else if (!isFirstPage) {
          pageBody.search_after = searchAfter;
        }

        const res = await onSearch('', pageBody);
        if (!isCurrent()) return;
        if (res?.error) {
          setResultState('ready');
          return;
        }
        const rawHits = Array.isArray(res?.hits?.hits) ? res?.hits?.hits : [];
        if (rawHits.length === 0 || res?.error) break;

        searchAfter = rawHits[rawHits.length - 1].sort;

        let pageHits = rawHits;
        if (toSkip > 0) {
          const skipped = Math.min(toSkip, rawHits.length);
          toSkip -= skipped;
          pageHits = rawHits.slice(skipped);
        }

        hits.push(...pageHits);
        remaining -= pageHits.length;
        isFirstPage = false;
      }
    } finally {
      try {
        await onClosePit?.(pitId);
      } catch (error) {
        // best effort cleanup; the pit expires via keep_alive anyway
      }
    }

    if (isCurrent() && !shouldCancel?.()) {
      callback?.(hits, columns, timeField);
    }

    if (isCurrent()) setResultState('ready');
  };

  return (
    <Card
      className={`h-full`}
      classNames={{ body: '!p-0 h-full flex flex-col' }}
    >
      <SearchBar
        {...{
          showSearchBar: false,
          showQueryBar: true,
          showQueryInput: true,
          showDatePicker: showDatePicker,
          showFilterBar: true,
          useDefaultBehaviors: true,
          screenTitle: '',
          // filters: filters,
          onFiltersUpdated: (filters) => {
            filterManager.setFilters(filters);
          },
          indexPatterns: [indexPattern],
          filterManager,
          query: {
            language: 'kuery',
            query: queryParams.query || ''
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
                    // Replace the request token without ending the mount. Reselecting
            // the displayed index must still allow the next search.
            requestOwner.current = { ...requestOwner.current, selectedIndex: index, read: 0 };
            onIndexPatternChange(index);
          },
          indices: props.indices,
          histogramData: props.errorContent ? null : histogramData,
          timefilterUpdateHandler,
          histogramOpts: opts,
          timeSetting: {
            ...(timeChartProps || {}),
            showTimeSetting: true,
            showTimeField: true,
            timeField: indexPattern.timeFieldName,
            timeFields: indexPattern.fields
              .filter((field) => field.spec.type === 'date')
              .map((field) => field.displayName),
            showTimeInterval: false,
            timeInterval: timeChartProps?.stateInterval,
            timeIntervals: intervalOptions?.map(({ display, val }) => ({
              label: display,
              value: val
            })),
            onTimeSettingChange: ({ timeField, timeInterval }) => {
              if (indexPattern.timeFieldName !== timeField) {
                onTimeFieldChange(timeField);
              }
              if (timeChartProps?.stateInterval !== timeInterval) {
                onIntervalChange(timeInterval);
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
          {
            <>
              {!collapseState.sideBar && (
                <div className="h-full w-300px p-8px border-r border-r-solid border-[var(--ant-color-border)] overflow-y-auto infini-discover-side">
                  <SidebarMemoized
                    config={{}}
                    columns={columns}
                    fieldCounts={props.errorContent ? {} : fieldCounts}
                    hits={props.errorContent ? [] : records}
                    indexPatterns={[indexPattern]}
                    onAddField={onAddColumn}
                    onAddFilter={onAddFilter}
                    onRemoveField={onRemoveColumn}
                    selectedIndexPattern={indexPattern}
                    setIndexPattern={() => {}}
                    setAppState={setState}
                    state={state}
                    //unmappedFieldsConfig={unmappedFieldsConfig}
                    //useNewFieldsApi={useNewFieldsApi}
                    distinctParams={distinctParams}
                    onDistinctParamsChange={onDistinctParamsChange}
                    total={props.errorContent ? undefined : total}
                    resultsAvailable={!props.errorContent}
                    onFieldAgg={onFieldAgg}
                    whetherToSample={queryParams.whetherToSample}
                    sampleSize={queryParams.sampleSize}
                    topNumber={queryParams.topNumber}
                    onCollapseToggle={() => {
                      setCollapseState((prev) => ({
                        ...prev,
                        sideBar: !prev.sideBar
                      }));
                    }}
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div
                  style={{
                    display:
                      resultState !== 'loading' && resultState !== 'downloading'
                        ? 'none'
                        : ''
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
                      histogram: !props.errorContent && !!histogramData
                    }}
                    collapseState={collapseState}
                    setCollapseState={setCollapseState}
                    took={
                      props.errorContent ? undefined : searchResult.took || 1
                    }
                    total={props.errorContent ? undefined : total}
                    resultsAvailable={!props.errorContent}
                    timeChartProps={props.errorContent ? null : timeChartProps}
                    onDownloadQuery={onDownloadQuery}
                    downloading={resultState === 'downloading'}
                    exportMaxSize={exportUsePit ? total : maxResultWindow}
                    exportUsePit={exportUsePit}
                    onRefreshExportLimit={refreshExportLimit}
                  />
                }
                {!props.errorContent &&
                  !collapseState.histogram &&
                  opts.chartAggConfigs &&
                  histogramData &&
                  records.length !== 0 && (
                    <div className="dscTimechart">
                      <div className="h-100px dscHistogramGrid">
                        <DiscoverHistogram
                          chartData={histogramData}
                          timefilterUpdateHandler={timefilterUpdateHandler}
                          theme={theme}
                          timeZone={timeZone}
                        />
                      </div>
                    </div>
                  )}
                {props.errorContent ? (
                  props.errorContent
                ) : resultState === 'none' && queryFrom === 0 ? (
                  <div className="flex-1 min-h-0 flex flex-col">
                    <DiscoverNoResults
                      timeFieldName={opts.timefield}
                      queryLanguage={state.query?.language || ''}
                      range={queryParams.range}
                    />
                  </div>
                ) : records && records.length > 0 ? (
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
                      setResultState('next');
                      setQueryFrom(from);
                    }}
                    theme={theme}
                  />
                ) : null}
              </div>
            </>
          }
        </div>
      </div>
    </Card>
  );
};

const Container = ({ children }: { children: any }) => {
  return (
    <Card
      className={`min-h-full h-auto flex flex-col`}
      classNames={{
        body: '!p-0 flex-1 items-center justify-center flex w-full'
      }}
    >
      {children}
    </Card>
  );
};

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
    top_result_prefix?: string;
    top_result_suffix?: string;
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
  };
}

export interface IDiscoverProps {
  loading?: boolean;
  /** Render a host-owned failure inside the result panel. */
  errorContent?: React.ReactNode;
  onIndexChange?: (index: string) => void;
  indices: IIndexProps[];
  getIndexPattern?: (index: string) => Promise<any> | undefined;
  onSuggestions?: (index: string, body: any) => Promise<string[]> | undefined;
  onSearch?: (index: string, body: any) => Promise<string[]> | undefined;
  queryParams: any;
  setQueryParams: (queryParams: any) => void;
  locale?: string;
  theme?: string;
  i18n?: II18nProps;
  exportMaxSize?: number;
  onGetIndexSetting?: (index: string) => Promise<any> | undefined;
  onOpenPit?: (
    index: string,
    keepAlive: string
  ) => Promise<string | null> | undefined;
  onClosePit?: (pitId: string) => Promise<void> | undefined;
}

export const GlobalConfigContext = React.createContext<any>({});

const DiscoverHost = (props: IDiscoverProps) => {
  const [context] = useState(() => createContext());
  const {
    services,
    filterManager,
    queryStringManager,
    timefilter,
    setIndexPatterns
  } = context;

  const {
    loading = false,
    indices = [],
    getIndexPattern,
    onSearch,
    onSuggestions,
    onGetIndexSetting,
    onOpenPit,
    onClosePit,
    queryParams,
    setQueryParams,
    locale,
    theme = 'light',
    i18n = {},
    exportMaxSize = 10000
  } = props;

  const [indexPattern, setIndexPattern] = useState<IndexPattern>();
  const requestRef = useRef<{
    pendingIndex: string | null;
    loadedIndex: string | null;
  }>({
    pendingIndex: null,
    loadedIndex: null
  });

  const callbacks = useRef({ getIndexPattern, onSuggestions });
  callbacks.current = { getIndexPattern, onSuggestions };
  const selection = useRef(0);
  const fetchIndexPattern = async (index: string, timeField?: string) => {
    if (!index) return;
    if (requestRef.current.pendingIndex === index) {
      return;
    }

    if (
      requestRef.current.loadedIndex === index &&
      !requestRef.current.pendingIndex
    )
      return;
    const selected = ++selection.current;
    props.onIndexChange?.(index);
    if (requestRef.current.loadedIndex === index) {
      requestRef.current.pendingIndex = null;
      return;
    }

    requestRef.current.pendingIndex = index;

    const generation = services.indexPatternService.generation;
    const newIndexPattern = await services.indexPatternService.get(
      index,
      'index'
    );
    if (
      !newIndexPattern ||
      selected !== selection.current ||
      generation !== services.indexPatternService.generation
    ) {
      if (selected === selection.current)
        requestRef.current.pendingIndex = null;
      return;
    }
    const timeFields: string[] = [];
    newIndexPattern.fields.forEach((field) => {
      if (field.spec.type === 'date') {
        timeFields.push(field.spec.name);
      }
    });
    if (timeFields && timeFields.length >= 1) {
      if (timeField && timeFields.includes(timeField)) {
        newIndexPattern.timeFieldName = timeField;
      } else if (newIndexPattern.timeFieldName === '') {
        newIndexPattern.timeFieldName = timeFields[0];
      }
    }
    if (newIndexPattern.id !== queryParams?.index) {
      setQueryParams({
        index: newIndexPattern.id,
        columns: ['_source'],
        sort: []
      });
      queryStringManager.setQuery({
        query: '',
        language: 'kuery'
      });
      filterManager.removeAll();
      timefilter.setTime({ from: '', to: '' });
      timefilter.setRefreshInterval({ pause: true });
    }
    setIndexPattern(newIndexPattern);
    const indexPatterns = [newIndexPattern];
    indexPatterns.get = (id) => {
      return Promise.resolve(indexPatterns.find((ip) => ip.id == id));
    };
    setIndexPatterns(indexPatterns);

    requestRef.current.loadedIndex = index;
    requestRef.current.pendingIndex = null;
  };

  useEffect(() => {
    // A mount owns these services. Initialize only this workspace's inputs.
    {
      queryStringManager.setQuery({
        query: queryParams?.query || '',
        language: 'kuery'
      });
      filterManager.removeAll();
      timefilter.setTime({ from: '', to: '' });
      timefilter.setRefreshInterval({ pause: true });
    }
    if (onSuggestions) {
      services.data.autocomplete.setup({
        autocomplete: services.data.autocomplete,
        onSuggestions: (index: string, body: any) => callbacks.current.onSuggestions?.(index, body)
      });
    }
    const dispose = getIndexPattern
      ? services.indexPatternService.setup({
          getIndexPattern: (index: string) => callbacks.current.getIndexPattern?.(index)
        })
      : undefined;
    return () => {
      selection.current += 1;
      dispose?.();
      services.data.autocomplete.setup({
        autocomplete: services.data.autocomplete
      });
      timefilter.setRefreshInterval({ pause: true });
    };
  }, []);

  useEffect(() => {
    if (!Array.isArray(indices) || indices.length === 0) return;
    let index = indices.find((item) => item.name === queryParams?.index);
    if (!index || index.disabled) {
      index = indices.find((item) => !item.disabled);
    }
    if (index) {
      fetchIndexPattern(index.name, queryParams?.timeField);
    }
  }, [indices, queryParams?.index, queryParams?.timeField]);

  useEffect(() => {
    requestRef.current = { pendingIndex: null, loadedIndex: null };
  }, [indices]);

  if (loading)
    return (
      <Container>
        <Spin spinning={loading} />
      </Container>
    );

  if (!indices || indices.length === 0 || !indexPattern)
    return (
      <Container>
        {props.errorContent || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Container>
    );

  return (
    <GlobalConfigContext.Provider
      value={{ i18n, getIndexPatterns: context.getIndexPatterns }}
    >
      <Discover
        context={context}
        errorContent={props.errorContent}
        indices={indices}
        indexPattern={indexPattern}
        setIndexPattern={setIndexPattern}
        onIndexPatternChange={fetchIndexPattern}
        onSearch={onSearch}
        onGetIndexSetting={onGetIndexSetting}
        onOpenPit={onOpenPit}
        onClosePit={onClosePit}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        locale={locale}
        theme={theme}
        exportMaxSize={exportMaxSize}
      />
    </GlobalConfigContext.Provider>
  );
};
export default DiscoverHost;
