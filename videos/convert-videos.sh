#!/usr/bin/env bash
set -euo pipefail

# Tunables (override via env)
: "${VCODEC:=h264}"     # h264 | hevc
: "${CRF_H264:=22}"
: "${CRF_HEVC:=28}"
: "${PRESET:=slow}"
: "${AUDIO_BR:=128k}"
: "${KEEP_SUBS:=1}"
: "${STRIP_METADATA:=1}"
: "${OVERWRITE:=0}"

getsize () {
  if stat --version >/dev/null 2>&1; then
    stat -c%s "$1"
  else
    stat -f%z "$1"
  fi
}

build_codec_args () {
  local v a s m
  if [[ "$VCODEC" == "hevc" ]]; then
    v="-c:v libx265 -crf ${CRF_HEVC} -preset ${PRESET}"
  else
    v="-c:v libx264 -crf ${CRF_H264} -preset ${PRESET} -pix_fmt yuv420p"
  fi
  a="-c:a aac -b:a ${AUDIO_BR}"
  if [[ "$KEEP_SUBS" == "1" ]]; then
    s="-c:s mov_text"
  else
    s="-sn"
  fi
  if [[ "$STRIP_METADATA" == "1" ]]; then
    m="-map_metadata -1"
  else
    m=""
  fi
  # echo a flat string (not an array) for Git Bash friendliness
  echo "$v $a $s $m"
}

convert_one () {
  local f="$1"
  local base="${f%.*}"
  local tmp="${base}.tmp.mp4"
  local args
  args="$(build_codec_args)"

  # Use -fps_mode vfr (instead of deprecated -vsync vfr)
  # Quote +faststart for Windows shells
  ffmpeg -hide_banner -y -i "$f" -map 0 \
    $args \
    -movflags '+faststart' -fps_mode vfr "$tmp"

  local orig_size new_size
  orig_size=$(getsize "$f")
  new_size=$(getsize "$tmp")

  if [[ "$OVERWRITE" == "1" || "$new_size" -lt "$orig_size" ]]; then
    mv -f "$tmp" "${base}.mp4"
    if [[ "${f##*.}" != "mp4" ]]; then rm -f "$f"; fi
    echo "Converted: $f → ${base}.mp4 (saved $((orig_size - new_size)) bytes)"
  else
    rm -f "$tmp"
    echo "Kept original: $f (re-encode wasn’t smaller)"
  fi
}

main () {
  shopt -s nullglob
  for f in *.mp4 *.mov *.m4v *.mkv *.webm *.avi *.mts *.m2ts *.flv; do
    [[ -f "$f" ]] || continue
    convert_one "$f"
  done
}

main "$@"
