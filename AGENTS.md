# Shared UI components

This repository owns reusable components for several products. Keep product
permissions, credentials, routes, and backend selection in the consuming product.
Edit source files here. Do not maintain consumer patches against generated bundles.

Before changing a public component, inspect its consumers and published API.
Preserve existing optional parameters and response shapes unless a behavior change
is explicitly approved. Explain state ownership and compatibility decisions in
comments. Add tests for races and independent component instances.

## Discover state and request ownership

`packages/Discover` publishes `@infinilabs/discover`. Its public entry is
`src/components/index.tsx`. Import public types from the package root.

Each mounted Discover owns a context from `createContext()` in
`src/components/context.ts`. That context owns query, filters, time range, refresh
state, index inventory, and the index-pattern service. Query builders must use
those same services. Do not restore module-level mutable search state.

The host's `queryParams` owns the complete saved query. Back/Forward restores
query text, columns, sorting, filters, range, and time field without remounting.
Missing filters and ranges clear previous conditions. A missing time field uses
the selected index's default. An explicit empty time field disables it.
Distinguish a local publication echo from external navigation. Defaults and
unchanged search results must not create history entries.

The index-pattern service owns its cache per instance. `setup()` starts a binding
generation and returns its cleanup function. Reads and saved-object completions
from an old generation cannot publish into a new binding. Old cleanup cannot
unbind a newer binding, even when both use the same callback.

Index selection, search, and export requests need current owners. Reject late
responses after a query change, index change, replacement request, or unmount.
Close an opened point-in-time search handle even when its export becomes stale.
Stop refresh subscriptions when their component or index owner ends.

The optional `onIndexChange(index)` reports a selection before field loading.
The optional `errorContent` renders a host-owned failure inside the result panel.
Errors must not become successful empty searches or partial export files.
Keep field search and result controls mounted when hits are empty. After a
failure, hide old result statistics and disable result-derived actions.

Host callbacks supply authentication and permissions. Forward current callbacks
without retaining an old render's closure. When backend identity or credentials
change, the host must remount Discover with a new React `key`. Reusing a callback
identity is not evidence that two sessions share field permissions.

The checked Console source uses its own Discover page and vendor components.
It does not import this package. Recheck consumers before future behavior changes.
This observation does not cover repositories that are unavailable locally.

## Verification and release

Before release, run `CI=true pnpm install --frozen-lockfile --ignore-scripts`
from the repository root in a clean checkout. Installation covers the whole
workspace, even when a release targets one component. A standalone package
install does not prove that the release can install its dependencies.
When workspace manifests or peer dependencies change, regenerate the root
lockfile with the pnpm version in `packageManager`. Keep its generated peer
resolutions together and repeat the frozen installation before release.

Run `npm test` and `npm run build` from `packages/Discover`.
Set `NODE_OPTIONS=--max-old-space-size=8192` for the production build.
Tests live in `packages/Discover/test`. Test original source and real state
transitions. Do not depend on minified variable names or bundle chunk names.
Compare new TypeScript diagnostics with the unchanged source baseline.

Keep ESM, CommonJS, and root type exports available. Do not publish local `link:`
or filesystem dependencies. Build and inspect package contents before release.
Do not hand-edit `dist`. Follow the existing release process and obtain explicit
authorization before publishing or changing the package version.

Merge and publish the upstream fix before a consumer updates its dependency.
The consumer then removes its temporary patch and updates its lockfile.
Do not encode a developer's clone path in source, documentation, or dependencies.
