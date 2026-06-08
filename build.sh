#!/usr/bin/env bash
#
# build.sh — assemble index.html from the partials in partials/.
#
# Edit the per-module files in partials/ (NOT index.html, which is generated),
# then run this script to regenerate index.html:
#
#     bash build.sh        # from Git Bash, macOS, or Linux
#
# The output index.html is a single self-contained static file: it opens
# directly by double-clicking (file://) and deploys as-is to Gitee Pages.
#
set -euo pipefail
cd "$(dirname "$0")"

# Order matters: this is the order the modules appear in the page.
parts=(
  _head
  home
  m1-lecture m1-lab
  m2-lecture m2-lab
  m3-lecture m3-lecture-conflict m3-lab
  m4-lecture m4-lab
  m5-lecture m5-lab
  m6-lecture m6-lab
  m7
  _foot
)

for p in "${parts[@]}"; do
  if [ ! -f "partials/$p.html" ]; then
    echo "ERROR: missing partials/$p.html" >&2
    exit 1
  fi
done

# Concatenate verbatim (each partial already carries its own spacing),
# so the generated index.html is byte-for-byte reproducible.
: > index.html
for p in "${parts[@]}"; do
  cat "partials/$p.html" >> index.html
done

echo "Built index.html from ${#parts[@]} partials."
