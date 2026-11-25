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

BANNED_META_PATTERNS = [
    (r"Level\s+3\s+(?:Solution\s+)?Omitted", "Banned boilerplate string"),
    (r"\b(?:Worked Archetype|Faded Completion|Toy Case|Why This Matters:|Oral Proof:|Anchor System)\b", "Banned pedagogical meta-jargon"),
    (r"<MindMap\b", "Deprecated <MindMap /> component removed (use real headings + visual figures/images instead)"),
]

BANNED_HEADING_TAGS = re.compile(
    r"^#{1,4}\s+.*\((?:Conceptual|Oral Core|Written Exam Core|Warm-Up|Toy Case|Worked Archetype)\)",
    re.IGNORECASE,
)

# Single-backslash LaTeX commands inside JS string arrays (options={[...]}) that JS turns into control chars (\b, \f, \n, \r, \t, \v)
JSX_ESCAPE_TRAP = re.compile(
    r'(?<!\\)\\(?:varphi|vec|tau|theta|text|times|tilde|to(?![A-Za-z])|frac|beta|bar|bm|rho|right|neq|nu|nabla|forall|tan|top)'
)


def check_svg_assets(errors: list[str]) -> None:
    diagrams_root = PUBLIC_ROOT / "diagrams"
    if not diagrams_root.exists():
        return
    for svg in sorted(diagrams_root.rglob("*.svg")):
        rel = svg.relative_to(ROOT).as_posix()
        raw = svg.read_text(encoding="utf-8", errors="ignore")
        if "<text" in raw:
            continue
        # computer-architecture dvisvgm exports dropped T1 text fonts; disallow them entirely
        if svg.parent.name == "computer-architecture" and "dvisvgm" in raw:
            errors.append(f"[{rel}] Broken dvisvgm SVG with stripped text labels (replace with hand-authored <text> SVG)")
            continue
        # For legacy CircuiTikZ/TikZ dvisvgm exports in other courses, ensure outlined glyph paths exist
        filled_glyph_paths = sum(
            1
            for m in re.findall(r"<path[^>]+>", raw)
            if "stroke=" not in m and len(re.findall(r"[Cc]", m)) >= 4
        )
        if filled_glyph_paths < 5:
            errors.append(f"[{rel}] SVG has no <text> elements and fewer than 5 glyph paths (likely missing labels)")


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    # 1. Check course metadata
    for course_dir in sorted(p for p in COURSES_ROOT.iterdir() if p.is_dir()):
        for req in ("blueprint.md", "symbols.yaml"):
            if not (course_dir / req).exists():
                errors.append(f"[courses/{course_dir.name}] Missing required file: {req}")

    # 2. Check SVG diagram integrity
    check_svg_assets(errors)

    # 3. Check all MDX chapters
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

        # Verify internal /dynamic-courses/ links in Markdown and HTML href attributes (exclude /diagrams/ assets)
        for lm in re.finditer(r'(?:\(|link:\s*|href=["\'])(/dynamic-courses/(?!diagrams/)[^)\s#"\']+)', txt):
            route = lm.group(1)
            if not route.endswith("/"):
                route += "/"
            if route not in valid_routes:
                errors.append(f"[{rel}] Broken internal route: {lm.group(1)}")

        # Skip platform root index.mdx and part introductions for chapter-only checks
        rel_parts = mdx.relative_to(DOCS_ROOT).parts
        is_master_shell = rel_parts[0] == "master" and mdx.name == "index.mdx"
        is_part_intro = mdx.name in ("00-introduction.mdx", "00-introduzione.mdx")
        is_course_chapter = mdx.parent.parent != DOCS_ROOT and mdx.name != "index.mdx" and not is_part_intro

        # Unresolved Quarto tokens
        for m in re.finditer(r"\?@[A-Za-z0-9_-]+|(?<![A-Za-z0-9_])@(sec|fig|tbl|eq|exr)-[A-Za-z0-9_-]+", txt):
            errors.append(f"[{rel}] Unresolved Quarto reference token: {m.group(0)}")

        # Legacy Chapter X.Y or Exercise X.Y.Z
        for m in re.finditer(r"\bChapters?\s+\d+\.\d+\b", txt):
            errors.append(f"[{rel}] Legacy hardcoded chapter reference: {m.group(0)}")
        for m in re.finditer(r"\bExercise\s+\d+\.\d+\.\d+\b", txt):
            errors.append(f"[{rel}] Legacy hardcoded exercise reference: {m.group(0)}")

        # Banned boilerplate & meta-jargon outside index.mdx
        if mdx.name != "index.mdx":
            for pat, label in BANNED_META_PATTERNS:
                for m in re.finditer(pat, txt, re.IGNORECASE):
                    errors.append(f"[{rel}] {label}: {m.group(0)}")

        # Verify SVG/image paths exist in public/
        for m in re.finditer(r'src="/dynamic-courses/([^"]+)"', txt):
            asset = PUBLIC_ROOT / m.group(1)
            if not asset.exists():
                errors.append(f"[{rel}] Missing public asset: {m.group(1)}")

        # Chapter and Master-shell structure checks
        if is_course_chapter or is_master_shell:
            if "<Divider" not in txt:
                warnings.append(f"[{rel}] No <Divider /> breaks found")

        # JSX options={[...]} single-backslash LaTeX escape traps
        for om in re.finditer(r"options=\{\[(.*?)\]\}", txt, re.S):
            block = om.group(1)
            for trap in JSX_ESCAPE_TRAP.finditer(block):
                errors.append(
                    f"[{rel}] Unescaped LaTeX command in JSX options array ({trap.group(0)}): double the backslash"
                )

        # Line-level checks: banned heading meta-tags, multi-line display math traps, table pipes
        lines = txt.splitlines()
        in_code = False
        for line_no, line in enumerate(lines, start=1):
            stripped = line.strip()
            if stripped.startswith("```"):
                in_code = not in_code
                continue
            if in_code:
                continue

            if BANNED_HEADING_TAGS.match(line):
                errors.append(f"[{rel}:{line_no}] Banned parenthetical meta-tag in heading: {stripped}")

            # Multi-line display math traps: $$\begin{...} opening without closing $$ on same line breaks remark-math
            if re.match(r"^\s*\$\$\\begin\{", line) and not stripped.endswith("$$"):
                errors.append(
                    f"[{rel}:{line_no}] Put '$$' and '\\begin{{...}}' on separate unindented lines with blank lines around '$$'"
                )

            # Markdown table raw pipe inside inline math check (causes MDX/Acorn parse errors)
            if line.lstrip().startswith("|"):
                in_math = False
                i = 0
                while i < len(line):
                    ch = line[i]
                    if ch == "\\" and i + 1 < len(line):
                        i += 2
                        continue
                    if ch == "$":
                        in_math = not in_math
                    elif ch == "|" and in_math:
                        errors.append(
                            f"[{rel}:{line_no}] Raw '|' inside inline math in Markdown table row (use \\lvert / \\rvert or \\mid)"
                        )
                        break
                    i += 1

    for w in warnings:
        print(f"WARNING: {w}")
    for e in errors:
        print(f"ERROR: {e}")

    print(f"\nCourse lint summary: {len(errors)} error(s), {len(warnings)} warning(s) across {len(mdx_files)} MDX file(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
