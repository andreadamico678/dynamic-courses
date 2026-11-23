#!/usr/bin/env python3
"""Automated build-gate validation for Dynamic Courses."""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS_ROOT = ROOT / "src" / "content" / "docs"
PUBLIC_ROOT = ROOT / "public"
COURSES_ROOT = ROOT / "courses"


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    # 1. Check course metadata
    for course_dir in sorted(p for p in COURSES_ROOT.iterdir() if p.is_dir()):
        for req in ("blueprint.md", "symbols.yaml"):
            if not (course_dir / req).exists():
                errors.append(f"[courses/{course_dir.name}] Missing required file: {req}")

    # 2. Check all MDX chapters
    mdx_files = sorted(DOCS_ROOT.rglob("*.mdx"))
    if not mdx_files:
        errors.append("No .mdx files found under src/content/docs/")

    valid_routes: set[str] = {"/dynamic-courses/"}
    for mdx in mdx_files:
        rel_doc = mdx.relative_to(DOCS_ROOT).as_posix()
        if rel_doc == "index.mdx":
            valid_routes.add("/dynamic-courses/")
        elif rel_doc.endswith("/index.mdx"):
            valid_routes.add(f"/dynamic-courses/{rel_doc[:-9]}")
        else:
            valid_routes.add(f"/dynamic-courses/{rel_doc[:-4]}/")

    for mdx in mdx_files:
        rel = mdx.relative_to(ROOT).as_posix()
        txt = mdx.read_text(encoding="utf-8")

        # Verify internal /dynamic-courses/ links (exclude /diagrams/ assets)
        for lm in re.finditer(r"(?:\(|link:\s*)(/dynamic-courses/(?!diagrams/)[^)\s#]+)", txt):
            route = lm.group(1)
            if not route.endswith("/"):
                route += "/"
            if route not in valid_routes:
                errors.append(f"[{rel}] Broken internal route: {lm.group(1)}")

        # Skip platform root index.mdx for chapter-only checks
        is_course_chapter = mdx.parent.parent != DOCS_ROOT and mdx.name != "index.mdx"

        # Unresolved Quarto tokens
        for m in re.finditer(r"\?@[A-Za-z0-9_-]+|(?<![A-Za-z0-9_])@(sec|fig|tbl|eq|exr)-[A-Za-z0-9_-]+", txt):
            errors.append(f"[{rel}] Unresolved Quarto reference token: {m.group(0)}")

        # Legacy Chapter X.Y or Exercise X.Y.Z
        for m in re.finditer(r"\bChapters?\s+\d+\.\d+\b", txt):
            errors.append(f"[{rel}] Legacy hardcoded chapter reference: {m.group(0)}")
        for m in re.finditer(r"\bExercise\s+\d+\.\d+\.\d+\b", txt):
            errors.append(f"[{rel}] Legacy hardcoded exercise reference: {m.group(0)}")

        # Banned boilerplate outside index.mdx
        if mdx.name != "index.mdx":
            for m in re.finditer(r"Level\s+3\s+(?:Solution\s+)?Omitted", txt, re.IGNORECASE):
                errors.append(f"[{rel}] Banned boilerplate string: {m.group(0)}")

        # Verify SVG/image paths exist in public/
        for m in re.finditer(r'src="/dynamic-courses/([^"]+)"', txt):
            asset = PUBLIC_ROOT / m.group(1)
            if not asset.exists():
                errors.append(f"[{rel}] Missing public asset: {m.group(1)}")

        # Chapter structure checks
        if is_course_chapter:
            if "<MindMap" not in txt:
                errors.append(f"[{rel}] Missing <MindMap /> component")
            if "<Divider" not in txt:
                warnings.append(f"[{rel}] No <Divider /> breaks found")

    for w in warnings:
        print(f"WARNING: {w}")
    for e in errors:
        print(f"ERROR: {e}")

    print(f"\nCourse lint summary: {len(errors)} error(s), {len(warnings)} warning(s) across {len(mdx_files)} MDX file(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
