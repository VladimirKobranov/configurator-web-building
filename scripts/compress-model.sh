#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
SOURCE=${1:-"$ROOT_DIR/building.glb"}
DESTINATION="$ROOT_DIR/public/objects/building.glb"
TEMP_OUTPUT="$ROOT_DIR/public/objects/.building-draco-$$.glb"

if [ ! -f "$SOURCE" ]; then
  printf 'Source model not found: %s\nUsage: %s [path/to/model.glb]\n' "$SOURCE" "$0" >&2
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  printf 'npx is required. Install Node.js and npm first.\n' >&2
  exit 1
fi

cleanup() {
  rm -f "$TEMP_OUTPUT"
}
trap cleanup EXIT HUP INT TERM

npx --yes @gltf-transform/cli draco "$SOURCE" "$TEMP_OUTPUT" --method edgebreaker
mv -f "$TEMP_OUTPUT" "$DESTINATION"

SOURCE_BYTES=$(wc -c < "$SOURCE" | tr -d ' ')
DESTINATION_BYTES=$(wc -c < "$DESTINATION" | tr -d ' ')
printf 'Compressed model written to: %s\nSource:      %s bytes\nCompressed:  %s bytes\n' \
  "$DESTINATION" "$SOURCE_BYTES" "$DESTINATION_BYTES"
