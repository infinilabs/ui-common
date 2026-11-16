import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const fixture = await vi.hoisted(async () => {
  const { Subject } = await import('rxjs');
  const contexts: any[] = [];
  const makeContext = () => {
    let query: any = { query: '', language: 'kuery' };
    let filters: any[] = [];
    let patterns: any = [];
    let getter: any;
    const service: any = {
      generation: 0,
      setup: vi.fn(({ getIndexPattern }: any) => {
        const generation = ++service.generation;
        getter = getIndexPattern;
        return () => {
          if (generation === service.generation) {
            service.generation++;
            getter = undefined;
          }
        };
      }),
      get: vi.fn((name: string) => getter?.(name))
    };
    const refresh = new Subject<void>();
    const timefilter: any = {
      _time: { from: '', to: '' },
      setTime: vi.fn((value: any) => {
        timefilter._time = value;
      }),
      setRefreshInterval: vi.fn(),
      getAutoRefreshFetch$: () => refresh,
      refresh,
      getBounds: () => ({})
    };
    const context: any = {
      filterManager: {
        setFilters: vi.fn((value: any[]) => {
          filters = value;
        }),
        getFilters: () => filters,
        removeAll: vi.fn(() => {
          filters = [];
        }),
        addFilters: vi.fn()
      },
      queryStringManager: {
        setQuery: vi.fn((value: any) => {
          query = value;
        }),
        getQuery: () => query
      },
      timefilter,
      storage: {},
      intervalOptions: [],
      getTimeBuckets: () => null,
      services: {
        indexPatternService: service,
        data: { autocomplete: { setup: vi.fn() } }
      },
      setIndexPatterns: vi.fn((value: any) => {
        patterns = value;
      }),
      getIndexPatterns: () => patterns,
      getSearchParams: vi.fn((pattern: any, _interval: any, sort: any) => ({
        index: pattern.id,
        body: {
          query: { bool: { filter: [] } },
          observed: {
            query,
            filters,
            range: timefilter._time,
            sort,
            timeField: pattern.timeFieldName
          }
        }
      }))
    };
    contexts.push(context);
    return context;
  };
  return { contexts, makeContext, shared: makeContext(), downloads: vi.fn() };
});

vi.mock('../src/components/context', () => ({
  getContext: () => fixture.shared,
  createContext: fixture.makeContext,
  Storage: class {},
  timeBucketConfig: {},
  timefilterConfig: {}
}));
vi.mock('@elastic/eui/dist/eui_theme_light.min.css', () => ({}));
vi.mock('uno.css', () => ({}));
vi.mock('../src/components/index.scss', () => ({}));
vi.mock('../src/components/euiicons', () => ({}));
vi.mock('@monaco-editor/react', () => ({ loader: { config: vi.fn() } }));
vi.mock('monaco-editor', () => ({}));
vi.mock('@/utils/utils', () => ({ getTimezone: () => 'UTC' }));
vi.mock('../src/components/vendor/data/common', () => ({
  FilterStateStore: { APP_STATE: 'appState' }
}));
vi.mock('../src/components/vendor/data/public/query', () => ({
  Timefilter: class {}
}));
vi.mock(
  '../src/components/vendor/data/common/search/aggs/buckets/lib/time_buckets',
  () => ({ TimeBuckets: class {} })
);
vi.mock(
  '../src/components/vendor/discover/public/application/angular/helpers/',
  () => ({ buildPointSeriesData: vi.fn() })
);
vi.mock(
  '../src/components/vendor/data/public/query/filter_manager/lib/generate_filters',
  () => ({ generateFilters: () => [] })
);
vi.mock('antd', () => {
  const Empty: any = () => <div>No index</div>;
  Empty.PRESENTED_IMAGE_SIMPLE = 'empty';
  return {
    Card: ({ children }: any) => <div>{children}</div>,
    Empty,
    Spin: () => <div>Loading index</div>
  };
});
vi.mock(
  '../src/components/vendor/data/public/ui/search_bar/create_search_bar',
  () => ({
    createSearchBar: () =>
      function SearchBar(props: any) {
        return (
          <div>
            <input
              aria-label="Query editor"
              defaultValue="retained query draft"
            />
            <output data-testid="selection">
              {props.selectedIndexPattern.id}
            </output>
            <button
              onClick={() => {
                props.queryStringManager.setQuery({
                  query: 'edited',
                  language: 'kuery'
                });
                props.onQuerySubmit();
              }}
            >
              Search edited
            </button>
            <button onClick={() => props.onQuerySubmit()}>Search again</button>
            <button
              onClick={() =>
                props.timeSetting.onTimeSettingChange({
                  timeField: '',
                  timeInterval: undefined
                })
              }
            >
              Remove time field
            </button>
            {props.indices.map((index: any) => (
              <button
                key={index.name}
                onClick={() => props.setIndexPattern(index.name)}
              >
                Select {index.name}
              </button>
            ))}
          </div>
        );
      }
  })
);
vi.mock(
  '../src/components/vendor/discover/public/application/components/sidebar/discover_sidebar',
  () => ({
    DiscoverSidebar: (props: any) => (
      <div>
        <input
          aria-label="Field search"
          defaultValue="retained field draft"
        />
        <output data-testid="workspace-state">
          {JSON.stringify({
            columns: props.state.columns,
            sort: props.state.sort
          })}
        </output>
        <output data-testid="samples">
          {JSON.stringify({
            hits: props.hits,
            fieldCounts: props.fieldCounts,
            total: props.total,
            resultsAvailable: props.resultsAvailable
          })}
        </output>
        <button onClick={() => props.onAddField('local')}>Add column</button>
      </div>
    )
  })
);
vi.mock(
  '../src/components/vendor/discover/public/application/components/histogram/histogram',
  () => ({ DiscoverHistogram: () => <div>Histogram</div> })
);
vi.mock(
  '../src/components/vendor/discover/public/application/angular/directives/no_results',
  () => ({ DiscoverNoResults: () => <div>No documents</div> })
);
vi.mock(
  '../src/components/vendor/discover/public/application/components/discover_table/table',
  () => ({ default: (props: any) => <div>Documents: {props.hits.length}</div> })
);
vi.mock(
  '../src/components/vendor/discover/public/application/components/loading_spinner/loading_spinner',
  () => ({ LoadingSpinner: () => <div>Reading</div> })
);
vi.mock('../src/components/ResultHeader', () => ({
  default: (props: any) => (
    <div>
      <button
        disabled={!props.resultsAvailable}
        onClick={() => props.onDownloadQuery(0, 1, fixture.downloads)}
      >
        Export
      </button>
      <button
        disabled={!props.resultsAvailable}
        onClick={() => props.onDownloadQuery(0, 2, fixture.downloads)}
      >
        Export two records
      </button>
      <output data-testid="summary">
        {JSON.stringify({
          took: props.took,
          total: props.total,
          resultsAvailable: props.resultsAvailable
        })}
      </output>
    </div>
  )
}));

import Discover from '../src/components';

/** Helper function to hold a response until after the selected index changes. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  return {
    promise: new Promise<T>((done) => {
      resolve = done;
    }),
    resolve
  };
}

/** Helper function to provide fields without replacing the host component's real selection state. */
function pattern(id: string, dates: string[] = []) {
  return {
    id,
    title: id,
    timeFieldName: '',
    fields: dates.map((name) => ({
      spec: { name, type: 'date' },
      displayName: name
    })),
    getTimeField() {
      return this.timeFieldName
        ? { displayName: this.timeFieldName }
        : undefined;
    },
    flattenHit: (hit: any) => hit._source || {}
  };
}

/** Helper function to return the actual response shape expected by the workspace. */
function response(count = 0) {
  return {
    took: 37,
    hits: {
      total: { value: count },
      hits: Array.from({ length: count }, (_, index) => ({
        _id: String(index),
        _source: { message: 'record' }
      }))
    }
  };
}

/** Helper function to supply stable host callbacks and index inputs across rerenders. */
function host(overrides: any = {}) {
  return {
    indices: [{ name: 'logs' }],
    queryParams: { index: 'logs' },
    getIndexPattern: vi.fn(async (name: string) => pattern(name)),
    onSearch: vi.fn(async () => response()),
    setQueryParams: vi.fn(),
    ...overrides
  };
}

beforeEach(() => {
  fixture.contexts.splice(1);
  vi.clearAllMocks();
});
afterEach(cleanup);

// Browser history restores all search inputs in one mounted workspace without publishing old columns back.
it('restores controlled history and clears omitted conditions without remounting', async () => {
  const props = host({
    getIndexPattern: vi.fn(async (name: string) => pattern(name, ['timestamp']))
  });
  const initial = {
    index: 'logs',
    query: 'old',
    columns: ['a'],
    sort: [['a', 'asc']],
    range: ['now-1h', 'now'],
    timeField: 'timestamp',
    filters: [{ meta: { key: 'a' }, query: { term: { a: 1 } } }]
  };
  const view = render(
    <Discover
      {...props}
      queryParams={initial}
    />
  );
  const input = await screen.findByRole('textbox', { name: 'Field search' });
  await waitFor(() => expect(props.onSearch).toHaveBeenCalled());
  props.setQueryParams.mockClear();
  props.onSearch.mockClear();
  const next = {
    index: 'logs',
    query: 'new',
    columns: ['b'],
    sort: [['b', 'desc']],
    timeField: ''
  };
  view.rerender(
    <Discover
      {...props}
      queryParams={next}
    />
  );
  await waitFor(() => expect(props.onSearch).toHaveBeenCalled());
  expect(screen.getByRole('textbox', { name: 'Field search' })).toBe(input);
  expect(
    JSON.parse(screen.getByTestId('workspace-state').textContent!)
  ).toEqual({ columns: ['b'], sort: [['b', 'desc']] });
  expect(props.onSearch.mock.lastCall![1].observed).toMatchObject({
    query: { query: 'new' },
    filters: [],
    range: { from: '', to: '' },
    sort: [['b', 'desc']],
    timeField: ''
  });
  expect(props.setQueryParams).not.toHaveBeenCalled();
});

// A local publication is acknowledged once, while Back to its previous URL remains an external restore.
it('acknowledges local edits without a publication or search loop', async () => {
  const props = host({ queryParams: { index: 'logs', columns: ['a'] } });
  const view = render(<Discover {...props} />);
  await screen.findByRole('textbox', { name: 'Field search' });
  await waitFor(() => expect(props.onSearch).toHaveBeenCalled());
  props.setQueryParams.mockClear();
  props.onSearch.mockClear();
  fireEvent.click(screen.getByRole('button', { name: 'Add column' }));
  expect(props.setQueryParams).toHaveBeenCalledOnce();
  const edited = props.setQueryParams.mock.calls[0][0];
  expect(edited.columns).toEqual(['a', 'local']);
  view.rerender(
    <Discover
      {...props}
      queryParams={edited}
    />
  );
  expect(props.onSearch).not.toHaveBeenCalled();
  expect(props.setQueryParams).toHaveBeenCalledOnce();
  view.rerender(<Discover {...props} />);
  await waitFor(() => expect(props.onSearch).toHaveBeenCalled());
  expect(
    JSON.parse(screen.getByTestId('workspace-state').textContent!).columns
  ).toEqual(['a']);
  expect(props.setQueryParams).toHaveBeenCalledOnce();
});

// Default normalization and repeated search completions do not create browser history entries.
it('keeps implicit defaults out of publications and restores the default time field', async () => {
  const props = host({
    getIndexPattern: vi.fn(async (name: string) => pattern(name, ['timestamp']))
  });
  const view = render(<Discover {...props} />);
  await screen.findByRole('textbox', { name: 'Field search' });
  await waitFor(() => expect(props.onSearch).toHaveBeenCalled());
  expect(props.setQueryParams).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await act(async () => {});
  expect(props.setQueryParams).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Remove time field' }));
  await waitFor(() => expect(props.setQueryParams).toHaveBeenCalledOnce());
  const edited = props.setQueryParams.mock.calls[0][0];
  expect(edited.timeField).toBe('');
  view.rerender(
    <Discover
      {...props}
      queryParams={edited}
    />
  );
  view.rerender(<Discover {...props} />);
  await waitFor(() =>
    expect(props.onSearch.mock.lastCall![1].observed.timeField).toBe(
      'timestamp'
    )
  );
});

// Empty and failed results replace the result panel while field input and result controls keep their DOM identity.
it('preserves workspace controls through empty results, failures, and recovery', async () => {
  const props = host({ onSearch: vi.fn().mockResolvedValue(response(1)) });
  const view = render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  const fieldInput = screen.getByRole('textbox', { name: 'Field search' });
  const exportButton = screen.getByRole('button', { name: 'Export' });
  props.onSearch.mockResolvedValue(response());
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await screen.findByText('No documents');
  expect(screen.getByRole('textbox', { name: 'Field search' })).toBe(
    fieldInput
  );
  expect(screen.getByRole('button', { name: 'Export' })).toBe(exportButton);
  view.rerender(
    <Discover
      {...props}
      errorContent={<div role="alert">Search failed</div>}
    />
  );
  expect(screen.getByRole('textbox', { name: 'Field search' })).toBe(
    fieldInput
  );
  expect(screen.getByRole('alert')).toHaveTextContent('Search failed');
  expect(exportButton).toBeDisabled();
  expect(JSON.parse(screen.getByTestId('summary').textContent!)).toEqual({
    resultsAvailable: false
  });
  expect(JSON.parse(screen.getByTestId('samples').textContent!)).toEqual({
    hits: [],
    fieldCounts: {},
    resultsAvailable: false
  });
  props.onSearch.mockResolvedValue(response(1));
  view.rerender(<Discover {...props} />);
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await screen.findByText('Documents: 1');
  expect(screen.getByRole('textbox', { name: 'Field search' })).toBe(
    fieldInput
  );
  expect(exportButton).not.toBeDisabled();
});

// Existing required props now use private state and controlled history without extra opt-in flags.
it('uses private controlled state and a stable empty-result workspace with the existing props', async () => {
  const props = host({
    queryParams: { index: 'logs', query: 'initial', range: ['start', 'end'] }
  });
  const view = render(<Discover {...props} />);
  await screen.findByText('No documents');
  const fieldInput = screen.getByRole('textbox', { name: 'Field search' });
  const context = fixture.contexts[1];
  expect(context).not.toBe(fixture.shared);
  expect(context.timefilter._time).toMatchObject({ from: 'start', to: 'end' });
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'logs', query: 'history' }}
    />
  );
  await waitFor(() =>
    expect(context.queryStringManager.getQuery().query).toBe('history')
  );
  expect(context.timefilter._time).toMatchObject({ from: '', to: '' });
  expect(screen.getByRole('textbox', { name: 'Field search' })).toBe(
    fieldInput
  );
});

// Concurrent controlled hosts keep separate query, filter and metadata bindings even with the same getter callback.
it('isolates controlled workspaces and leaves a newer same-callback instance alive on cleanup', async () => {
  const getter = vi.fn(async (name: string) => pattern(name));
  const first = host({
    getIndexPattern: getter,
    queryParams: { index: 'logs', query: 'first' }
  });
  const second = host({
    getIndexPattern: getter,
    queryParams: { index: 'logs', query: 'second' }
  });
  const view = render(
    <>
      <section data-testid="first">
        <Discover
          key="first"
          {...first}
        />
      </section>
      <section data-testid="second">
        <Discover
          key="second"
          {...second}
        />
      </section>
    </>
  );
  await waitFor(() =>
    expect(
      screen.getAllByRole('textbox', { name: 'Field search' })
    ).toHaveLength(2)
  );
  const firstContext = fixture.contexts[1],
    secondContext = fixture.contexts[2];
  expect(firstContext).not.toBe(secondContext);
  expect(firstContext.queryStringManager.getQuery().query).toBe('first');
  expect(secondContext.queryStringManager.getQuery().query).toBe('second');
  const secondInput = within(screen.getByTestId('second')).getByRole(
    'textbox',
    { name: 'Field search' }
  );
  const generation = secondContext.services.indexPatternService.generation;
  view.rerender(
    <>
      <section data-testid="first" />
      <section data-testid="second">
        <Discover
          key="second"
          {...second}
        />
      </section>
    </>
  );
  expect(secondContext.services.indexPatternService.generation).toBe(
    generation
  );
  expect(
    within(screen.getByTestId('second')).getByRole('textbox', {
      name: 'Field search'
    })
  ).toBe(secondInput);
  expect(secondContext.queryStringManager.getQuery().query).toBe('second');
  expect(
    await secondContext.services.indexPatternService.get('logs')
  ).toBeDefined();
});

// Out-of-order selections cannot replace a newer pattern, including a return to the still-displayed index.
it('discards late selections and cancels pending selection when returning to the loaded index', async () => {
  const pendingA = deferred<any>(),
    pendingB = deferred<any>();
  const getter = vi.fn((name: string) =>
    name === 'a' ? pendingA.promise : pendingB.promise
  );
  const props = host({
    indices: [{ name: 'a' }, { name: 'b' }],
    queryParams: { index: 'a' },
    getIndexPattern: getter
  });
  const view = render(<Discover {...props} />);
  await waitFor(() => expect(getter).toHaveBeenCalledWith('a'));
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'b' }}
    />
  );
  await waitFor(() => expect(getter).toHaveBeenCalledWith('b'));
  await act(async () => pendingB.resolve(pattern('b')));
  expect(screen.getByTestId('selection')).toHaveTextContent('b');
  await act(async () => pendingA.resolve(pattern('a')));
  expect(screen.getByTestId('selection')).toHaveTextContent('b');
  const pendingNextA = deferred<any>();
  getter.mockImplementation((name: string) =>
    name === 'a' ? pendingNextA.promise : Promise.resolve(pattern('b'))
  );
  fireEvent.click(screen.getByRole('button', { name: 'Select a' }));
  fireEvent.click(screen.getByRole('button', { name: 'Select b' }));
  await act(async () => pendingNextA.resolve(pattern('a')));
  expect(screen.getByTestId('selection')).toHaveTextContent('b');
});

// Query submissions echo through the host once and browser Back restores the prior query without another publication.
it('acknowledges a submitted query before restoring an earlier history entry', async () => {
  const props = host({ queryParams: { index: 'logs', query: 'original' } });
  const view = render(<Discover {...props} />);
  await screen.findByRole('textbox', { name: 'Field search' });
  await waitFor(() => expect(props.onSearch).toHaveBeenCalled());
  props.onSearch.mockClear();
  props.setQueryParams.mockClear();
  fireEvent.click(screen.getByRole('button', { name: 'Search edited' }));
  await waitFor(() => expect(props.setQueryParams).toHaveBeenCalledOnce());
  const edited = props.setQueryParams.mock.calls[0][0];
  expect(edited.query).toBe('edited');
  expect(props.onSearch).toHaveBeenCalledOnce();
  view.rerender(
    <Discover
      {...props}
      queryParams={edited}
    />
  );
  expect(props.onSearch).toHaveBeenCalledOnce();
  view.rerender(<Discover {...props} />);
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledTimes(2));
  expect(props.onSearch.mock.lastCall![1].observed.query.query).toBe(
    'original'
  );
  expect(props.setQueryParams).toHaveBeenCalledOnce();
});

// A field read that ignores unmount must not publish a pattern into its disposed instance or a newer same-callback instance.
it('ignores an unmounted selection while a newer instance reuses the getter', async () => {
  const old = deferred<any>();
  const getter = vi
    .fn()
    .mockReturnValueOnce(old.promise)
    .mockImplementation(async (name: string) => pattern(name));
  const props = host({ getIndexPattern: getter });
  const first = render(<Discover {...props} />);
  await waitFor(() => expect(getter).toHaveBeenCalledOnce());
  const oldContext = fixture.contexts[1];
  first.unmount();
  render(<Discover {...props} />);
  await screen.findByRole('textbox', { name: 'Field search' });
  const currentContext = fixture.contexts[2];
  const generation = currentContext.services.indexPatternService.generation;
  await act(async () => old.resolve(pattern('private')));
  expect(oldContext.setIndexPatterns).not.toHaveBeenCalled();
  expect(currentContext.services.indexPatternService.generation).toBe(
    generation
  );
  expect(screen.getByTestId('selection')).toHaveTextContent('logs');
  expect(currentContext.getIndexPatterns()[0].id).toBe('logs');
});

// A slow query response cannot overwrite the newer history entry's documents or publish its captured inputs.
it('discards an old search success after a newer history search completes', async () => {
  const old = deferred<any>(),
    current = deferred<any>();
  const props = host({
    queryParams: { index: 'logs', query: 'old' },
    onSearch: vi
      .fn()
      .mockReturnValueOnce(old.promise)
      .mockReturnValueOnce(current.promise)
  });
  const view = render(<Discover {...props} />);
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledOnce());
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'logs', query: 'current' }}
    />
  );
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledTimes(2));
  await act(async () => current.resolve(response(2)));
  await screen.findByText('Documents: 2');
  await act(async () => old.resolve(response(1)));
  expect(screen.getByText('Documents: 2')).toBeInTheDocument();
  expect(screen.queryByText('Documents: 1')).not.toBeInTheDocument();
  expect(props.setQueryParams).not.toHaveBeenCalled();
});

// An older resolved error cannot clear the newer search's pending indicator.
it('ignores an old search error while the current history search is pending', async () => {
  const old = deferred<any>(),
    current = deferred<any>();
  const props = host({
    queryParams: { index: 'logs', query: 'old' },
    onSearch: vi
      .fn()
      .mockReturnValueOnce(old.promise)
      .mockReturnValueOnce(current.promise)
  });
  const view = render(<Discover {...props} />);
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledOnce());
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'logs', query: 'current' }}
    />
  );
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledTimes(2));
  const overlay = screen
    .getByText('Reading')
    .closest('.dscOverlay')!.parentElement!;
  expect(overlay.style.display).toBe('');
  await act(async () => old.resolve({ error: { status: 403 } }));
  expect(overlay.style.display).toBe('');
  expect(props.setQueryParams).not.toHaveBeenCalled();
  await act(async () => current.resolve(response(2)));
  await screen.findByText('Documents: 2');
});

// Choosing a new URL index invalidates the previous search before the new field metadata arrives.
it('invalidates old search results while the next index pattern is pending', async () => {
  const oldSearch = deferred<any>(),
    nextPattern = deferred<any>();
  const props = host({
    indices: [{ name: 'a' }, { name: 'b' }],
    queryParams: { index: 'a', query: 'old' },
    getIndexPattern: vi.fn((name: string) =>
      name === 'a' ? Promise.resolve(pattern('a')) : nextPattern.promise
    ),
    onSearch: vi
      .fn()
      .mockReturnValueOnce(oldSearch.promise)
      .mockResolvedValue(response(2))
  });
  const view = render(<Discover {...props} />);
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledOnce());
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'b', query: 'current' }}
    />
  );
  await waitFor(() => expect(props.getIndexPattern).toHaveBeenCalledWith('b'));
  await act(async () => oldSearch.resolve(response(1)));
  expect(screen.queryByText('Documents: 1')).not.toBeInTheDocument();
  expect(props.setQueryParams).not.toHaveBeenCalled();
  await act(async () => nextPattern.resolve(pattern('b')));
  await screen.findByText('Documents: 2');
  expect(screen.getByTestId('selection')).toHaveTextContent('b');
});

// Callback replacement inside the same mounted owner must forward new field readers and search handlers.
it('uses the latest host callbacks without remounting the workspace', async () => {
  const firstGetter = vi.fn(async (name: string) => pattern(name));
  const nextGetter = vi.fn(async (name: string) => pattern(name));
  const firstSearch = vi.fn(async () => response(1));
  const nextSearch = vi.fn(async () => response(2));
  const props = host({
    indices: [{ name: 'a' }, { name: 'b' }],
    queryParams: { index: 'a' },
    getIndexPattern: firstGetter,
    onSearch: firstSearch
  });
  const view = render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  const editor = screen.getByRole('textbox', { name: 'Query editor' });
  view.rerender(
    <Discover
      {...props}
      getIndexPattern={nextGetter}
      onSearch={nextSearch}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await screen.findByText('Documents: 2');
  expect(screen.getByRole('textbox', { name: 'Query editor' })).toBe(editor);
  fireEvent.click(screen.getByRole('button', { name: 'Select b' }));
  await waitFor(() => expect(nextGetter).toHaveBeenCalledWith('b'));
  expect(firstGetter).toHaveBeenCalledTimes(1);
});

// An export from the previous query must not download old documents after history changes the workspace.
it('does not publish an export that finishes after its query is replaced', async () => {
  const exporting = deferred<any>();
  const props = host({
    queryParams: { index: 'logs', query: 'old' },
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockReturnValueOnce(exporting.promise)
      .mockResolvedValue(response(2))
  });
  const view = render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  fireEvent.click(screen.getByRole('button', { name: 'Export' }));
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledTimes(2));
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'logs', query: 'current' }}
    />
  );
  await screen.findByText('Documents: 2');
  await act(async () => exporting.resolve(response(1)));
  expect(fixture.downloads).not.toHaveBeenCalled();
  expect(screen.getByText('Documents: 2')).toBeInTheDocument();
});

// Reselecting the current index must not deactivate the lifetime of the still-mounted workspace.
it('accepts a search after reselecting the displayed index', async () => {
  const props = host({
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue(response(2))
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  fireEvent.click(screen.getByRole('button', { name: 'Select logs' }));
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await screen.findByText('Documents: 2');
  expect(props.onSearch).toHaveBeenCalledTimes(2);
});

// Returning to a loaded index while another field read is pending creates a usable new request owner.
it('accepts a search after cancelling a pending selection by returning to the loaded index', async () => {
  const pending = deferred<any>();
  const props = host({
    indices: [{ name: 'a' }, { name: 'b' }],
    queryParams: { index: 'a' },
    getIndexPattern: vi.fn((name: string) =>
      name === 'a' ? Promise.resolve(pattern('a')) : pending.promise
    ),
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue(response(2))
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  fireEvent.click(screen.getByRole('button', { name: 'Select b' }));
  await waitFor(() => expect(props.getIndexPattern).toHaveBeenCalledWith('b'));
  fireEvent.click(screen.getByRole('button', { name: 'Select a' }));
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await screen.findByText('Documents: 2');
  await act(async () => pending.resolve(pattern('b')));
  expect(screen.getByTestId('selection')).toHaveTextContent('a');
  expect(screen.getByText('Documents: 2')).toBeInTheDocument();
});

// New actions must wait for the URL's selected pattern instead of sending the old index under the new query.
it('blocks new searches and exports while the URL index pattern is still loading', async () => {
  const pending = deferred<any>();
  const props = host({
    indices: [{ name: 'a' }, { name: 'b' }],
    queryParams: { index: 'a', query: 'old' },
    getIndexPattern: vi.fn((name: string) =>
      name === 'a' ? Promise.resolve(pattern('a')) : pending.promise
    ),
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue(response(2))
  });
  const view = render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  props.onSearch.mockClear();
  view.rerender(
    <Discover
      {...props}
      queryParams={{ index: 'b', query: 'current' }}
    />
  );
  await waitFor(() => expect(props.getIndexPattern).toHaveBeenCalledWith('b'));
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  fireEvent.click(screen.getByRole('button', { name: 'Export' }));
  await act(async () => {});
  expect(props.onSearch).not.toHaveBeenCalled();
  expect(fixture.downloads).not.toHaveBeenCalled();
  await act(async () => pending.resolve(pattern('b')));
  await screen.findByText('Documents: 2');
  expect(props.onSearch).toHaveBeenCalledOnce();
  expect(props.onSearch.mock.lastCall![0]).toBe('b');
  expect(props.onSearch.mock.lastCall![1].observed.query.query).toBe('current');
});

// An absent callback result keeps the last accepted data and cannot publish a fabricated empty result.
it('handles an absent search response without crashing or replacing the last result', async () => {
  const props = host({
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue(undefined)
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  props.setQueryParams.mockClear();
  const fieldInput = screen.getByRole('textbox', { name: 'Field search' });
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await waitFor(() => expect(props.onSearch).toHaveBeenCalledTimes(2));
  await act(async () => {});
  expect(screen.getByText('Documents: 1')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Field search' })).toBe(
    fieldInput
  );
  expect(props.setQueryParams).not.toHaveBeenCalled();
});

// A host error is not an empty search: keep accepted data and do not publish a new saved query.
it('keeps the last accepted result when the current search returns an error', async () => {
  const props = host({
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue({ error: { status: 403 } })
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  props.setQueryParams.mockClear();
  fireEvent.click(screen.getByRole('button', { name: 'Search again' }));
  await act(async () => {});
  expect(props.onSearch).toHaveBeenCalledTimes(2);
  expect(screen.getByText('Documents: 1')).toBeInTheDocument();
  expect(screen.queryByText('No documents')).not.toBeInTheDocument();
  expect(props.setQueryParams).not.toHaveBeenCalled();
});

// The fallback export must not turn a denied search into a successful empty file.
it('does not download a failed export without PIT support', async () => {
  const props = host({
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue({ error: { status: 403 } })
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  fireEvent.click(screen.getByRole('button', { name: 'Export' }));
  await act(async () => {});
  expect(props.onSearch).toHaveBeenCalledTimes(2);
  expect(fixture.downloads).not.toHaveBeenCalled();
});

// A later PIT failure invalidates every collected page, but the opened handle still needs cleanup.
it('discards partial export results and closes PIT after a later page fails', async () => {
  const firstPage = response(1);
  firstPage.hits.hits[0] = { ...firstPage.hits.hits[0], sort: [1] } as any;
  const props = host({
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValueOnce(firstPage)
      .mockResolvedValue({ error: { status: 403 } }),
    onOpenPit: vi.fn(async () => 'export-pit'),
    onClosePit: vi.fn(async () => {})
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  fireEvent.click(screen.getByRole('button', { name: 'Export two records' }));
  await waitFor(() => expect(props.onClosePit).toHaveBeenCalledWith('export-pit'));
  expect(props.onSearch).toHaveBeenCalledTimes(3);
  expect(props.onSearch.mock.lastCall![1]).toMatchObject({
    pit: { id: 'export-pit' },
    search_after: [1]
  });
  expect(fixture.downloads).not.toHaveBeenCalled();
});

// A valid zero-hit response remains a successful export; only errors suppress the callback.
it('downloads a successful empty export', async () => {
  const props = host({
    onSearch: vi
      .fn()
      .mockResolvedValueOnce(response(1))
      .mockResolvedValue(response())
  });
  render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  fireEvent.click(screen.getByRole('button', { name: 'Export' }));
  await waitFor(() => expect(fixture.downloads).toHaveBeenCalledOnce());
  expect(fixture.downloads).toHaveBeenCalledWith([], ['_source'], '');
});

// A private refresh subscription survives time-field and index edits, then ends with its mounted workspace.
it('keeps automatic refresh active through time-field edits and returning to a loaded index', async () => {
  const pending = deferred<any>();
  const props = host({
    indices: [{ name: 'a' }, { name: 'b' }],
    queryParams: { index: 'a' },
    getIndexPattern: vi.fn((name: string) =>
      name === 'a'
        ? Promise.resolve(pattern('a', ['timestamp']))
        : pending.promise
    ),
    onSearch: vi.fn(async () => response(1))
  });
  const view = render(<Discover {...props} />);
  await screen.findByText('Documents: 1');
  const refresh = fixture.contexts[1].timefilter.refresh;
  expect(refresh.observers).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: 'Remove time field' }));
  await act(async () => {});
  expect(props.onSearch.mock.lastCall![1].observed.sort).toEqual([]);
  expect(props.setQueryParams.mock.lastCall![0]).toMatchObject({
    timeField: '',
    sort: []
  });
  const afterTimeEdit = props.onSearch.mock.calls.length;
  await act(async () => refresh.next());
  expect(props.onSearch).toHaveBeenCalledTimes(afterTimeEdit + 1);
  expect(props.onSearch.mock.lastCall![1].observed.timeField).toBe('');
  expect(props.onSearch.mock.lastCall![1].observed.sort).toEqual([]);
  fireEvent.click(screen.getByRole('button', { name: 'Select b' }));
  await waitFor(() => expect(props.getIndexPattern).toHaveBeenCalledWith('b'));
  fireEvent.click(screen.getByRole('button', { name: 'Select a' }));
  const afterReturn = props.onSearch.mock.calls.length;
  await act(async () => refresh.next());
  expect(props.onSearch).toHaveBeenCalledTimes(afterReturn + 1);
  expect(props.onSearch.mock.lastCall![0]).toBe('a');
  expect(refresh.observers).toHaveLength(1);
  view.unmount();
  expect(refresh.observers).toHaveLength(0);
  const afterUnmount = props.onSearch.mock.calls.length;
  await act(async () => refresh.next());
  expect(props.onSearch).toHaveBeenCalledTimes(afterUnmount);
  await act(async () => pending.resolve(pattern('b')));
});
