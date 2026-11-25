#!/usr/bin/env python3
"""Export token-clean LLM Markdown and JSONL chunks from MDX chapters."""

from __future__ import annotations

import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS_ROOT = ROOT / "src" / "content" / "docs"
OUT_DIR = ROOT / "dist-llm"


def strip_jsx_for_llm(mdx: str) -> str:
    # Remove frontmatter & imports
    txt = re.sub(r"^---\s*\n.*?\n---\s*\n", "", mdx, count=1, flags=re.S)
    txt = re.sub(r"^import\s+[^\n]+\n", "", txt, flags=re.M)

    # Replace Dividers and interactive explorers with clean markers
    txt = re.sub(r'<Divider\s+label="([^"]+)"\s*/>', r"\n---\n### [\1]\n", txt)
    txt = re.sub(r"<Divider\s*/>", "\n---\n", txt)
    txt = re.sub(
        r"<(BodeExplorer|RouthExplorer|PhaseFlowExplorer|DiodeRectifierExplorer|MosfetExplorer|SingleStageExplorer|CmosVtcExplorer|AmdahlExplorer|PipelineExplorer|CacheAddressExplorer)[^>]*/?>",
        r"[Interactive Simulator: \1]",
        txt,
    )

    # Unwrap Callout, Exercise, StepCheck, details
    txt = re.sub(r'<Callout[^>]*title="([^"]+)"[^>]*>', r"> **\1:**", txt)
    txt = txt.replace("</Callout>", "")
    txt = re.sub(r'<Exercise[^>]*title="([^"]+)"[^>]*level="([^"]+)"[^>]*>', r"### \1 (\2)", txt)
    txt = txt.replace("</Exercise>", "")
    txt = re.sub(r'<StepCheck[^>]*prompt="([^"]+)"[^>]*expected=\{([^}]+)\}[^>]*/>', r"- **Check:** \1 (Answer: `\2`)", txt)
    txt = re.sub(r'<StepCheck[^>]*prompt="([^"]+)"[^>]*/>', r"- **Check:** \1", txt)
    txt = re.sub(r"<details[^>]*>\s*<summary>[^<]*</summary>", "**Worked Solution:**", txt)
    txt = txt.replace("</details>", "")
    txt = re.sub(r"<figure[^>]*>.*?<figcaption>(.*?)</figcaption>\s*</figure>", r"*Figure: \1*", txt, flags=re.S)

    return re.sub(r"\n{3,}", "\n\n", txt).strip()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for course_dir in sorted(p for p in DOCS_ROOT.iterdir() if p.is_dir()):
        chapters = sorted(
            p for p in course_dir.rglob("*.mdx")
            if course_dir.name == "master" or p.name != "index.mdx"
        )
        full_md: list[str] = []
        chunks: list[dict] = []

        for ch in chapters:
            raw = ch.read_text(encoding="utf-8")
            m_title = re.search(r'^title:\s*"([^"]+)"', raw, re.M)
            title = m_title.group(1) if m_title else ch.stem
            clean = strip_jsx_for_llm(raw)
            full_md.append(f"# {title}\n\n{clean}")

            # Split into section chunks by ## heading
            for sec in re.split(r"(?=^##\s+)", clean, flags=re.M):
                sec = sec.strip()
                if not sec:
                    continue
                sec_title = sec.splitlines()[0].lstrip("# ").strip()
                chunks.append(
                    {
                        "course": course_dir.name,
                        "chapter": ch.relative_to(course_dir).as_posix(),
                        "title": title,
                        "section": sec_title,
                        "content": sec,
                    }
                )

        (OUT_DIR / f"{course_dir.name}.llm.md").write_text("\n\n---\n\n".join(full_md) + "\n", encoding="utf-8")
        with (OUT_DIR / f"{course_dir.name}.chunks.jsonl").open("w", encoding="utf-8") as f:
            for row in chunks:
                f.write(json.dumps(row, ensure_ascii=False) + "\n")
        print(f"Exported {course_dir.name}: {len(chapters)} chapters, {len(chunks)} chunks -> {OUT_DIR}")


if __name__ == "__main__":
    main()
