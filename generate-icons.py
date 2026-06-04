#!/usr/bin/env python3
"""
Generate PNG icons from SVG for PWA
"""

import os
import sys
from pathlib import Path

def install_dependencies():
    """Check if cairosvg is installed, if not provide install instructions"""
    try:
        import cairosvg
        return True
    except ImportError:
        print("cairosvg is required to generate PNG icons from SVG.")
        print("\nTo install, run:")
        print("  pip install cairosvg")
        print("\nOr alternatively, use an online tool like:")
        print("  https://icoconvert.com/")
        print("\nOr ImageMagick (if installed):")
        print("  convert public/icon.svg -resize 192x192 public/icon-192x192.png")
        print("  convert public/icon.svg -resize 512x512 public/icon-512x512.png")
        return False

def generate_icons():
    """Generate PNG icons from SVG"""
    try:
        import cairosvg
    except ImportError:
        print("cairosvg not installed. Install it first: pip install cairosvg")
        return False
    
    svg_path = Path("public/icon.svg")
    if not svg_path.exists():
        print(f"SVG file not found: {svg_path}")
        return False
    
    sizes = [192, 512]
    
    for size in sizes:
        output_path = Path(f"public/icon-{size}x{size}.png")
        print(f"Generating {output_path}...")
        try:
            cairosvg.svg2png(
                url=str(svg_path),
                write_to=str(output_path),
                output_width=size,
                output_height=size
            )
            print(f"✓ Created {output_path}")
        except Exception as e:
            print(f"✗ Failed to create {output_path}: {e}")
            return False
    
    return True

if __name__ == "__main__":
    if not install_dependencies():
        sys.exit(1)
    
    if generate_icons():
        print("\n✓ All icons generated successfully!")
        print("\nYour app is ready for PWA installation.")
    else:
        print("\n✗ Icon generation failed.")
        sys.exit(1)
