import { expect, it, vi } from "vitest";
import { IndexPatternsService } from "../src/components/vendor/data/common/index_patterns/index_patterns/index_patterns";

// Field formatting is independent from binding ownership. Keep the real service
// and cache while replacing its field-model and host-service dependencies.
vi.mock("../src/components/vendor/data/common/index_patterns/index_patterns/index_pattern", () => ({
  IndexPattern: class {
    id: string;
    title: string;
    fields: Record<string, unknown>;
    version?: string;
    constructor({ spec }: any) {
      this.id = spec.id;
      this.title = spec.title;
      this.fields = spec.fields;
    }
    isUnsupportedTimePattern() { return false; }
    resetOriginalSavedObjectBody() {}
    getAsSavedObjectBody() { return { fields: this.fields }; }
    getOriginalSavedObjectBody() { return { fields: this.fields }; }
  },
}));
vi.mock("../src/components/vendor/data/common/index_patterns/index_patterns/ensure_default_index_pattern", () => ({
  createEnsureDefaultIndexPattern: () => vi.fn(),
}));
vi.mock("../src/components/vendor/data/common", () => ({
  UI_SETTINGS: { SHORT_DOTS_ENABLE: "dots", META_FIELDS: "meta" },
}));
vi.mock("../src/components/vendor/data/common/index_patterns/lib", () => ({
  IndexPatternMissingIndices: class extends Error {},
}));
vi.mock("../src/components/vendor/data/common/index_patterns/errors", () => ({
  DuplicateIndexPatternError: class extends Error {},
}));
vi.mock("../src/components/vendor/data/common/kbn_field_types/kbn_field_types_factory", () => ({
  createKbnFieldTypes: () => [{ name: "string", esTypes: ["keyword"] }],
}));

/** Helper function to delay a host response until after its service binding changes. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  return { promise: new Promise<T>(done => { resolve = done; }), resolve: (value: T) => resolve(value) };
}

/** Helper function to construct the service with controllable host dependencies. */
function fixture(getIndexPattern?: (id: string) => Promise<any>) {
  const config = { get: vi.fn(async () => []), set: vi.fn() };
  const saved = { find: vi.fn(async () => []), create: vi.fn(), update: vi.fn(), delete: vi.fn() };
  const service = new IndexPatternsService({
    uiSettings: config, savedObjectsClient: saved, onNotification: vi.fn(), onError: vi.fn(),
    onUnsupportedTimePattern: vi.fn(), getIndexPattern,
  } as any);
  return { service, config, saved };
}
const fields = (name: string) => ({ fields: { [name]: { keyword: { aggregatable: true, searchable: true } } } });

// The legacy constructor callback still works without a setup call.
it("keeps constructor-based reads and same-binding caching", async () => {
  const getter = vi.fn(async () => fields("public"));
  const { service } = fixture(getter);
  const first = await service.get("logs", "index");
  expect(Object.keys(first!.fields)).toEqual(["public"]);
  expect(await service.get("logs", "index")).toBe(first);
  expect(getter).toHaveBeenCalledOnce();
});

// Services embedded in independent hosts must never share fields or clear each other's cache.
it("isolates field caches between service instances", async () => {
  const firstGetter = vi.fn(async () => fields("first"));
  const secondGetter = vi.fn(async () => fields("second"));
  const first = fixture(firstGetter).service;
  const second = fixture(secondGetter).service;
  const firstPattern = await first.get("logs", "index");
  expect(Object.keys((await second.get("logs", "index"))!.fields)).toEqual(["second"]);
  second.setup({ getIndexPattern: async () => fields("replacement") });
  expect(await first.get("logs", "index")).toBe(firstPattern);
  expect(firstGetter).toHaveBeenCalledOnce();
});

// A new binding needs fresh fields even when it requests the same index.
it("refetches fields after rebinding", async () => {
  const { service } = fixture(async () => fields("private"));
  await service.get("logs", "index");
  service.setup({ getIndexPattern: async () => fields("public") });
  expect(Object.keys((await service.get("logs", "index"))!.fields)).toEqual(["public"]);
});

// A late field response cannot refill a newer binding's populated cache.
it("discards stale field reads", async () => {
  const old = deferred<any>();
  const { service } = fixture(() => old.promise);
  const previous = service.get("logs", "index");
  service.setup({ getIndexPattern: async () => fields("public") });
  const current = await service.get("logs", "index");
  old.resolve(fields("private"));
  expect(await previous).toBeUndefined();
  expect(await service.get("logs", "index")).toBe(current);
});

// Field-model construction awaits host configuration and must retain its original owner.
it("discards a pattern constructed after rebinding", async () => {
  const old = deferred<any>();
  const { service, config } = fixture(async () => fields("private"));
  config.get.mockReturnValueOnce(old.promise);
  const previous = service.get("logs", "index");
  await vi.waitFor(() => expect(config.get).toHaveBeenCalled());
  service.setup({ getIndexPattern: async () => fields("public") });
  const current = await service.get("logs", "index");
  old.resolve([]);
  expect(await previous).toBeUndefined();
  expect(await service.get("logs", "index")).toBe(current);
});

// A failed field read is retryable and cannot become a cached empty pattern.
it("does not cache a resolved field error", async () => {
  const getter = vi.fn().mockResolvedValueOnce({ error: { status: 403 } }).mockResolvedValue(fields("public"));
  const { service } = fixture(getter);
  expect(await service.get("logs", "index")).toBeUndefined();
  expect(Object.keys((await service.get("logs", "index"))!.fields)).toEqual(["public"]);
});

// A stale saved-object creation cannot change the retained pattern or the new cache.
it("discards stale saved-object creation", async () => {
  const { service, saved } = fixture(async () => fields("private"));
  const pattern = (await service.get("logs", "index"))!;
  const old = deferred<any>();
  saved.create.mockReturnValueOnce(old.promise);
  const creating = service.createSavedObject(pattern);
  await vi.waitFor(() => expect(saved.create).toHaveBeenCalledOnce());
  service.setup({ getIndexPattern: async () => fields("public") });
  const current = await service.get("logs", "index");
  old.resolve({ id: "old-id" });
  expect(await creating).toBeUndefined();
  expect(pattern.id).toBe("logs");
  expect(await service.get("logs", "index")).toBe(current);
});

// Retained patterns cannot submit writes using a replacement host binding.
it("rejects retained patterns and stale update completions", async () => {
  const { service, saved } = fixture(async () => fields("private"));
  const pattern = (await service.get("logs", "index"))!;
  const old = deferred<any>();
  saved.update.mockReturnValueOnce(old.promise);
  const updating = service.updateSavedObject(pattern);
  service.setup({ getIndexPattern: async () => fields("public") });
  old.resolve({ id: "old-id", version: "old-version" });
  await updating;
  expect(pattern.id).toBe("logs");
  expect(pattern.version).toBeUndefined();
  await service.updateSavedObject(pattern);
  await service.createSavedObject(pattern);
  expect(saved.update).toHaveBeenCalledOnce();
  expect(saved.find).not.toHaveBeenCalled();
});

// A previous inventory response cannot restore obsolete titles after rebinding.
it("discards stale inventory responses", async () => {
  const { service, saved } = fixture();
  const old = deferred<any>();
  saved.find.mockReturnValueOnce(old.promise);
  const loading = service.getIds(true);
  service.setup({ getIndexPattern: async () => fields("public") });
  old.resolve([{ id: "private" }]);
  expect(await loading).toEqual([]);
});

// Callback identity can be reused, so cleanup belongs to a binding generation.
it("disposes only its own binding even when callbacks are reused", async () => {
  const getter = async () => fields("public");
  const { service } = fixture();
  const releaseFirst = service.setup({ getIndexPattern: getter });
  const releaseSecond = service.setup({ getIndexPattern: getter });
  const generation = service.generation;
  releaseFirst();
  expect(service.generation).toBe(generation);
  expect(await service.get("logs", "index")).toBeDefined();
  releaseSecond();
  expect(await service.get("logs", "index")).toBeUndefined();
});

// Without a binding change, the public creation flow still returns its saved pattern.
it("keeps ordinary pattern creation and saving", async () => {
  const { service, saved } = fixture();
  saved.create.mockResolvedValueOnce({ id: "saved" });
  const pattern = await service.createAndSave({ id: "draft", title: "logs", fields: {} } as any, false, true);
  expect(pattern?.id).toBe("saved");
  expect(saved.create).toHaveBeenCalledOnce();
  expect(await service.get("saved", "index")).toBe(pattern);
});

// An obsolete creation cannot send a saved-object write after its configuration resolves.
it("does not save a draft constructed under the previous binding", async () => {
  const { service, config, saved } = fixture();
  const old = deferred<any>();
  config.get.mockReturnValueOnce(old.promise);
  const creating = service.createAndSave({ id: "draft", title: "logs", fields: {} } as any, false, true);
  service.setup({ getIndexPattern: async () => fields("public") });
  old.resolve([]);
  expect(await creating).toBeUndefined();
  expect(saved.find).not.toHaveBeenCalled();
  expect(saved.create).not.toHaveBeenCalled();
  expect(config.set).not.toHaveBeenCalled();
});
