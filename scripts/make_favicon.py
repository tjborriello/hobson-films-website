"""
Generate favicon assets by recoloring the existing logo to brand orange.

Reads:  assets/hobson-films-logo-light.png  (cream/light variant)
Writes: assets/favicon-32.png  (32x32 browser tab)
        assets/favicon-192.png (192x192 PWA / android-chrome)
        assets/favicon-512.png (512x512 fallback)
        assets/apple-touch-icon.png (180x180 iOS home screen)

The source logo has transparency; non-transparent pixels are recolored to
brand orange (#E85D24). We pad with whitespace to a square aspect ratio
so the favicon doesn't get squashed.
"""

from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "hobson-films-logo-light.png"
BRAND_ORANGE = (232, 93, 36)  # #E85D24

def recolor_and_square(im: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    """Recolor non-transparent pixels to `color`; pad to square aspect."""
    im = im.convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 0:
                pixels[x, y] = (*color, a)
    # Pad to square so favicon doesn't distort
    side = max(w, h)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(im, ((side - w) // 2, (side - h) // 2), im)
    return square

def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Source logo not found: {SRC}")

    src = Image.open(SRC)
    base = recolor_and_square(src, BRAND_ORANGE)

    targets = [
        ("favicon-32.png",        32),
        ("favicon-192.png",       192),
        ("favicon-512.png",       512),
        ("apple-touch-icon.png",  180),
    ]
    for name, size in targets:
        out_path = ROOT / "assets" / name
        resized = base.resize((size, size), Image.LANCZOS)
        resized.save(out_path, optimize=True)
        print(f"  wrote {out_path.relative_to(ROOT)} ({size}x{size})")

if __name__ == "__main__":
    main()
