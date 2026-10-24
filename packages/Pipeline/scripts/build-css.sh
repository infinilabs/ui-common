#!/bin/sh
# Regenerate dist/pipeline-ui.css. Requires a tailwindcss v3 CLI on PATH
# (logpilot/web has one: ../../../logpilot/web/node_modules/.bin/tailwindcss).
# The artifact is committed — rerun only when package classes change.
set -e
cd "$(dirname "$0")/.."
TW="${TW:-../../../logpilot/web/node_modules/.bin/tailwindcss}"
"$TW" -c tailwind.config.mjs -i src/theme.css -o dist/pipeline-ui.css --minify
