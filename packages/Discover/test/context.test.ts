import { afterEach, expect, it, vi } from "vitest";

// HTTP and field formatting are not needed to exercise search state. Keep the
// real query, filter, time, and index-pattern services used by createContext().
vi.mock("../src/components/vendor/core/public/http/fetch", () => ({ Fetch: class {} }));
vi.mock("../src/components/vendor/core/public/saved_objects/saved_objects_client", () => ({ SavedObjectsClient: class {} }));
vi.mock("../src/components/vendor/data/common/field_formats", () => ({
  FieldFormatsRegistry: class {
    init() {}
    getDefaultInstance() { return { convert: (value: unknown) => value }; }
  },
}));
vi.mock("../src/components/vendor/data/public/field_formats", () => ({ baseFormattersPublic: [] }));
vi.mock("../src/components/vendor/data/public/field_formats/utils/deserialize", () => ({ deserializeFieldFormat: vi.fn() }));
vi.mock("../src/components/vendor/data/public/autocomplete", () => ({ AutocompleteService: class {} }));

import { createContext } from "../src/components/context";

const contexts: ReturnType<typeof createContext>[] = [];

/** Helper function to track real contexts so each test can stop their refresh timers. */
function context() {
  const result = createContext();
  contexts.push(result);
  return result;
}

/** Helper function to supply a valid filter that the real filter manager can normalize. */
function filter(tenant: string) {
  return { meta: { key: "tenant", type: "phrase", disabled: false, negate: false, alias: null },
    query: { match_phrase: { tenant } } };
}

const index = { id: "logs", title: "logs", timeFieldName: "", fields: [] } as any;

afterEach(() => {
  for (const item of contexts.splice(0)) item.timefilter.setRefreshInterval({ pause: true });
  vi.useRealTimers();
  localStorage.clear();
});

// Query edits and resets in one mounted workspace cannot change another workspace's current query.
it("owns query state independently for each context", () => {
  const first = context(), second = context();
  first.queryStringManager.setQuery({ query: "first", language: "lucene" });
  second.queryStringManager.setQuery({ query: "second", language: "lucene" });
  first.queryStringManager.clearQuery();
  expect(first.queryStringManager.getQuery().query).toBe("");
  expect(second.queryStringManager.getQuery()).toEqual({ query: "second", language: "lucene" });
});

// Clearing filters during a new selection must affect only that selection's workspace.
it("owns filter state independently for each context", () => {
  const first = context(), second = context();
  first.filterManager.setFilters([filter("first")]);
  second.filterManager.setFilters([filter("second")]);
  first.filterManager.removeAll();
  expect(first.filterManager.getFilters()).toEqual([]);
  expect(second.filterManager.getFilters()[0].query).toEqual({ match_phrase: { tenant: "second" } });
});

// Refresh intervals, refresh events, and time changes belong to the context that created them.
it("isolates time ranges and automatic refresh timers", async () => {
  vi.useFakeTimers();
  const first = context(), second = context();
  first.timefilter.setTime({ from: "now-1h", to: "now" });
  second.timefilter.setTime({ from: "now-1d", to: "now" });
  const firstRefresh = vi.fn(), secondRefresh = vi.fn();
  const firstSubscription = first.timefilter.getAutoRefreshFetch$().subscribe(firstRefresh);
  const secondSubscription = second.timefilter.getAutoRefreshFetch$().subscribe(secondRefresh);
  first.timefilter.setRefreshInterval({ pause: false, value: 100 });
  second.timefilter.setRefreshInterval({ pause: false, value: 200 });
  await vi.advanceTimersByTimeAsync(100);
  expect(firstRefresh).toHaveBeenCalledOnce();
  expect(secondRefresh).not.toHaveBeenCalled();
  first.timefilter.setRefreshInterval({ pause: true });
  await vi.advanceTimersByTimeAsync(100);
  expect(firstRefresh).toHaveBeenCalledOnce();
  expect(secondRefresh).toHaveBeenCalledOnce();
  expect(second.timefilter.getTime()).toEqual({ from: "now-1d", to: "now" });
  expect(second.timefilter.getRefreshInterval()).toEqual({ pause: false, value: 200 });
  firstSubscription.unsubscribe();
  secondSubscription.unsubscribe();
});

// Query builders must close over their own services rather than reading a later context's state.
it("builds search requests from the owning context's query and filters", () => {
  const first = context(), second = context();
  first.queryStringManager.setQuery({ query: "first-query", language: "lucene" });
  first.filterManager.setFilters([filter("first-tenant")]);
  second.queryStringManager.setQuery({ query: "second-query", language: "lucene" });
  second.filterManager.setFilters([filter("second-tenant")]);
  const firstRequest = first.getSearchParams(index, "15s", [], null, {}, 5, true, 25, "UTC");
  const secondRequest = second.getSearchParams(index, "15s", [], null, {}, 0, true, 10, "UTC");
  expect(firstRequest).toMatchObject({ index: "logs", body: { from: 5, size: 25, track_total_hits: true } });
  expect(JSON.stringify(firstRequest.body.query)).toContain("first-query");
  expect(JSON.stringify(firstRequest.body.query)).toContain("first-tenant");
  expect(JSON.stringify(firstRequest.body.query)).not.toContain("second");
  expect(JSON.stringify(secondRequest.body.query)).toContain("second-query");
  expect(JSON.stringify(secondRequest.body.query)).toContain("second-tenant");
  first.filterManager.removeAll();
  expect(JSON.stringify(second.getEsQuery(index))).toContain("second-tenant");
});

// Each context owns its index-pattern inventory, callback binding, and field cache.
it("isolates pattern inventories and service bindings", async () => {
  const first = context(), second = context();
  const firstPatterns = [{ id: "first" }] as any;
  firstPatterns.get = async (id: string) => firstPatterns.find(item => item.id === id);
  first.setIndexPatterns(firstPatterns);
  expect(first.getIndexPatterns()).toBe(firstPatterns);
  expect(second.getIndexPatterns()).toHaveLength(0);
  expect(await second.getIndexPatterns().get("first")).toBeUndefined();
  const fields = (name: string) => ({ fields: { [name]: { keyword: { aggregatable: true, searchable: true } } } });
  const releaseFirst = first.services.indexPatternService.setup({ getIndexPattern: async () => fields("first") });
  second.services.indexPatternService.setup({ getIndexPattern: async () => fields("second") });
  const firstPattern = await first.services.indexPatternService.get("logs", "index");
  const secondPattern = await second.services.indexPatternService.get("logs", "index");
  expect(firstPattern!.fields.getByName("first")).toBeDefined();
  expect(secondPattern!.fields.getByName("second")).toBeDefined();
  expect(secondPattern!.fields.getByName("first")).toBeUndefined();
  releaseFirst();
  expect(await first.services.indexPatternService.get("logs", "index")).toBeUndefined();
  expect(await second.services.indexPatternService.get("logs", "index")).toBe(secondPattern);
});

// Histogram interval helpers must derive bounds from their own context's time range.
it("derives histogram intervals from the owning context", () => {
  const first = context(), second = context();
  first.timefilter.setTime({ from: "2026-01-01T00:00:00Z", to: "2026-01-01T01:00:00Z" });
  second.timefilter.setTime({ from: "2026-01-01T00:00:00Z", to: "2026-01-31T00:00:00Z" });
  const firstInterval = first.getTimeBuckets("auto")!.getInterval().expression;
  const secondInterval = second.getTimeBuckets("auto")!.getInterval().expression;
  expect(firstInterval).not.toBe(secondInterval);
  first.timefilter.setTime({ from: "", to: "" });
  expect(first.getTimeBuckets("auto")).toBeUndefined();
  expect(second.getTimeBuckets("auto")!.getInterval().expression).toBe(secondInterval);
});
