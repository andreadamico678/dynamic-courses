#!/usr/bin/env python3
"""Reliable open-license image search, download, optimization, and attribution tool for Dynamic Courses."""

from __future__ import annotations

import argparse
import io
import json
import pathlib
import re
import sys
import urllib.parse
import urllib.request
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMAGES_ROOT = ROOT / "public" / "images"
UA = "DynamicCoursesBot/1.0 (https://github.com/andreadamico678/dynamic-courses)"
ALLOWED_MIMES = {"image/jpeg", "image/png", "image/webp"}
OPENVERSE_LICENSES = {"cc0", "pdm", "by", "by-sa"}


def _get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8", errors="replace"))


def search_wikimedia(query: str, limit: int) -> list[dict]:
    params = urllib.parse.urlencode(
        {
            "action": "query",
            "generator": "search",
            "gsrnamespace": "6",
            "gsrsearch": query,
            "gsrlimit": str(max(limit * 3, 12)),
            "prop": "imageinfo",
            "iiprop": "url|size|mime|extmetadata",
            "format": "json",
        }
    )
    data = _get_json(f"https://commons.wikimedia.org/w/api.php?{params}")
    results: list[dict] = []
    for page in data.get("query", {}).get("pages", {}).values():
        infos = page.get("imageinfo") or []
        if not infos:
            continue
        info = infos[0]
        mime = info.get("mime", "")
        w, h = info.get("width", 0), info.get("height", 0)
        if mime not in ALLOWED_MIMES or w < 600 or h < 350:
            continue
        meta = info.get("extmetadata", {})
        lic = re.sub(r"<[^>]+>", "", meta.get("LicenseShortName", {}).get("value", "Unknown")).strip()
        if any(bad in lic.lower() for bad in ("non-free", "fair use", "copyrighted", "nc", "nd")):
            continue
        artist = re.sub(r"<[^>]+>", "", meta.get("Artist", {}).get("value", "Wikimedia Commons")).strip()
        results.append(
            {
                "source": "wikimedia",
                "title": page.get("title", "").replace("File:", ""),
                "width": w,
                "height": h,
                "mime": mime,
                "license": lic,
                "author": artist[:80],
                "url": info.get("url", ""),
                "page": info.get("descriptionurl", ""),
            }
        )
        if len(results) >= limit:
            break
    return results


def search_openverse(query: str, limit: int) -> list[dict]:
    params = urllib.parse.urlencode(
        {
            "q": query,
            "page_size": str(max(limit * 2, 10)),
            "license": ",".join(sorted(OPENVERSE_LICENSES)),
        }
    )
    try:
        data = _get_json(f"https://api.openverse.org/v1/images/?{params}")
    except Exception:
        return []
    results: list[dict] = []
    for item in data.get("results", []):
        w, h = item.get("width") or 0, item.get("height") or 0
        url = item.get("url") or ""
        if w < 600 or h < 350 or not url:
            continue
        lic = f"CC {item.get('license', '').upper()} {item.get('license_version', '')}".strip()
        results.append(
            {
                "source": "openverse",
                "title": (item.get("title") or "Untitled")[:70],
                "width": w,
                "height": h,
                "mime": item.get("filetype", ""),
                "license": lic,
                "author": (item.get("creator") or "Unknown")[:80],
                "url": url,
                "page": item.get("foreign_landing_url") or url,
            }
        )
        if len(results) >= limit:
            break
    return results


def cmd_search(args: argparse.Namespace) -> int:
    wm = search_wikimedia(args.query, args.limit)
    ov = search_openverse(args.query, args.limit)
    combined = wm + ov
    if not combined:
        print(f"No suitably sized (>=600px), openly licensed raster images found for: {args.query!r}")
        return 1
    for i, item in enumerate(combined, start=1):
        print(
            f"[{i}] ({item['source']}) {item['width']}x{item['height']} | {item['license']} | "
            f"{item['title']}\n    URL: {item['url']}\n    Author: {item['author']}"
        )
    return 0


def save_optimized_image(raw_bytes: bytes, out_path: pathlib.Path, max_width: int) -> tuple[int, int]:
    img = Image.open(io.BytesIO(raw_bytes))
    img = ImageOps.exif_transpose(img)
    if img.width > max_width:
        new_h = round(img.height * (max_width / img.width))
        img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    if out_path.suffix.lower() in (".jpg", ".jpeg"):
        if img.mode in ("RGBA", "P", "LA"):
            bg = Image.new("RGB", img.size, (255, 255, 255))
            rgba = img.convert("RGBA")
            bg.paste(rgba, mask=rgba.split()[3])
            img = bg
        else:
            img = img.convert("RGB")
        img.save(out_path, format="JPEG", quality=86, optimize=True)
    elif out_path.suffix.lower() == ".webp":
        img.save(out_path, format="WEBP", quality=86, method=6)
    else:
        img.save(out_path, format="PNG", optimize=True)
    return img.size


def record_attribution(course: str, filename: str, source_url: str, author: str, license_str: str) -> None:
    attr_file = IMAGES_ROOT / course / "ATTRIBUTION.md"
    if not attr_file.exists():
        attr_file.write_text(
            f"# Image Attribution — `{course}`\n\n"
            "| File | Source | Author | License |\n"
            "| :--- | :--- | :--- | :--- |\n",
            encoding="utf-8",
        )
    entry = f"| `{filename}` | {source_url} | {author} | {license_str} |\n"
    existing = attr_file.read_text(encoding="utf-8")
    if f"| `{filename}` |" not in existing:
        attr_file.write_text(existing + entry, encoding="utf-8")


def cmd_fetch(args: argparse.Namespace) -> int:
    req = urllib.request.Request(args.url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read()

    ext = args.format.lower().lstrip(".")
    if ext not in ("webp", "jpg", "jpeg", "png"):
        print(f"Unsupported output format: {ext}", file=sys.stderr)
        return 1

    slug = re.sub(r"[^a-z0-9-]+", "-", args.slug.lower()).strip("-")
    out_path = IMAGES_ROOT / args.course / f"{slug}.{ext}"
    w, h = save_optimized_image(raw, out_path, args.max_width)
    record_attribution(args.course, out_path.name, args.url, args.author, args.license)

    web_src = f"/dynamic-courses/images/{args.course}/{out_path.name}"
    print(f"Saved: {out_path} ({w}x{h}, {out_path.stat().st_size // 1024} KB)")
    print("NEXT STEP: Inspect the saved file visually with read_file before embedding!\n")
    print(
        f'<figure id="fig-{slug}" className="dc-img-wrap">\n'
        f'  <img src="{web_src}" alt="{args.alt or args.caption or slug}" />\n'
        f'  <figcaption>{args.caption or args.alt or slug}</figcaption>\n'
        f"</figure>"
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Search and fetch verified open-license images for Dynamic Courses.")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_search = sub.add_parser("search", help="Search Wikimedia Commons + Openverse for high-res open raster images")
    p_search.add_argument("query")
    p_search.add_argument("--limit", type=int, default=5)
    p_search.set_defaults(func=cmd_search)

    p_fetch = sub.add_parser("fetch", help="Download, optimize, record attribution, and emit MDX <figure> snippet")
    p_fetch.add_argument("course", help="Course folder under public/images/ (e.g. master, computer-architecture)")
    p_fetch.add_argument("slug", help="Output filename slug without extension")
    p_fetch.add_argument("url", help="Direct image URL")
    p_fetch.add_argument("--format", default="webp", help="webp (default), jpg, or png")
    p_fetch.add_argument("--max-width", type=int, default=1400)
    p_fetch.add_argument("--author", default="Wikimedia Commons / Openverse")
    p_fetch.add_argument("--license", default="CC BY-SA")
    p_fetch.add_argument("--alt", default="")
    p_fetch.add_argument("--caption", default="")
    p_fetch.set_defaults(func=cmd_fetch)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
