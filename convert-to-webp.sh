#!/usr/bin/env bash
set -euo pipefail

WEBP_Q=62   # tweak this: 60–70 is usually “web safe” quality

getsize () {
  if stat --version >/dev/null 2>&1; then
    stat -c%s "$1"
  else
    stat -f%z "$1"
  fi
}

shopt -s nullglob
for f in *.jpg *.jpeg *.png; do
  [ -f "$f" ] || continue
  base="${f%.*}"
  tmp="${base}.tmp.webp"

  # convert to webp, strip metadata
  ffmpeg -y -i "$f" -map_metadata -1 -c:v libwebp -q:v ${WEBP_Q} -compression_level 6 -preset photo "$tmp"

  orig_size=$(getsize "$f")
  new_size=$(getsize "$tmp")

  if [ "$new_size" -lt "$orig_size" ]; then
    mv -f "$tmp" "${base}.webp"
    rm -f "$f"
    echo "Converted: $f → ${base}.webp (saved $(($orig_size - $new_size)) bytes)"
  else
    rm -f "$tmp"
    echo "Kept original: $f (WebP wasn’t smaller)"
  fi
done
