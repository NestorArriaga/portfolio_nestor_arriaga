#!/bin/bash
set -e

SRC_DIR="public/projects/granular/analisis"
DEST_DIR="public/projects/granular/analisis/webp"

mkdir -p "$DEST_DIR"

WIDTHS=(960 1440 2480)

for file in "$SRC_DIR"/*.svg; do
  filename=$(basename -- "$file")
  name="${filename%.*}"
  
  for width in "${WIDTHS[@]}"; do
    dest_png="$DEST_DIR/${name}-${width}.png"
    dest_webp="$DEST_DIR/${name}-${width}.webp"
    
    echo "Processing $name at $width px..."
    # SVG to PNG
    rsvg-convert -w "$width" --background-color=none -o "$dest_png" "$file"
    # PNG to WEBP
    cwebp -q 82 -quiet "$dest_png" -o "$dest_webp"
    # Clean up PNG
    rm "$dest_png"
  done
done

echo "Done."
