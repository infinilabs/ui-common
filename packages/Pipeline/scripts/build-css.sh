#!/bin/sh
# Regenerate dist/pipeline-ui.css (a committed artifact — rerun only when
# package classes change). Uses the tailwindcss v3 CLI from this package's
# own devDependencies; override with TW=<cli> if needed.
set -e
cd "$(dirname "$0")/.."
TW="${TW:-node_modules/.bin/tailwindcss}"
if [ ! -x "$TW" ]; then
  echo "tailwindcss CLI not found at $TW — run: pnpm install (node >= 22 for pnpm v11)" >&2
  exit 1
fi
"$TW" -c tailwind.config.mjs -i src/theme.css -o dist/pipeline-ui.css --minify
