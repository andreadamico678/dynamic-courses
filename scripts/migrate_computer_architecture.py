#!/usr/bin/env python3
"""Migrate Computer Architecture from Quarto (.qmd) to Astro Starlight (.mdx) + SVGs."""

from __future__ import annotations

import pathlib
import re
import shutil
import subprocess
import tempfile

SRC_BOOK = pathlib.Path(r"C:\Users\Andrea\Desktop\projects\personal\dynamic-text-books\books\computer_architectures")
DST_ROOT = pathlib.Path(r"C:\Users\Andrea\Desktop\projects\professional\dynamic-courses")
DOCS_DIR = DST_ROOT / "src" / "content" / "docs" / "computer-architecture"
SVG_DIR = DST_ROOT / "public" / "diagrams" / "computer-architecture"
COURSE_META_DIR = DST_ROOT / "courses" / "computer-architecture"

CHAPTER_PLAN: list[tuple[str, str, int, int, str]] = [
    # Part I: Synchronous Digital Systems
    ("chapters/01_synchronous_digital_systems/01_karnaugh_map_minimization.qmd", "01-synchronous-digital-systems/01-karnaugh-map-minimization.mdx", 1, 1, "Karnaugh Map Minimization"),
    ("chapters/01_synchronous_digital_systems/02_mealy_sequence_detectors.qmd", "01-synchronous-digital-systems/02-mealy-sequence-detectors.mdx", 2, 2, "Mealy Sequence Detectors"),
    ("chapters/01_synchronous_digital_systems/03_moore_sequence_detectors.qmd", "01-synchronous-digital-systems/03-moore-sequence-detectors.mdx", 3, 3, "Moore Sequence Detectors"),
    ("chapters/01_synchronous_digital_systems/04_implication_table_minimization.qmd", "01-synchronous-digital-systems/04-implication-table-minimization.mdx", 4, 4, "Implication Table Minimization"),
    ("chapters/01_synchronous_digital_systems/05_flip_flop_excitation_synthesis.qmd", "01-synchronous-digital-systems/05-flip-flop-excitation-synthesis.mdx", 5, 5, "Flip-Flop Excitation Synthesis"),
    # Part II: Computer Performance
    ("chapters/02_computer_performance/01_cpu_performance_equation.qmd", "02-computer-performance/06-cpu-performance-equation.mdx", 6, 1, "CPU Performance Equation"),
    ("chapters/02_computer_performance/02_amdahls_law.qmd", "02-computer-performance/07-amdahls-law.mdx", 7, 2, "Amdahl's Law"),
    # Part III: RISC-V Instruction Set
    ("chapters/03_riscv_instructions/01_riscv_instructions.qmd", "03-riscv-instructions/08-riscv-instructions.mdx", 8, 1, "RISC-V Instructions"),
    ("chapters/03_riscv_instructions/02_control_flow.qmd", "03-riscv-instructions/09-control-flow.mdx", 9, 2, "Control Flow Translation"),
    ("chapters/03_riscv_instructions/03_arrays_and_strings.qmd", "03-riscv-instructions/10-arrays-and-strings.mdx", 10, 3, "Arrays and Strings"),
    # Part IV: RISC-V Subroutines & Systems
    ("chapters/04_riscv_subroutines/01_system_calls.qmd", "04-riscv-subroutines/11-system-calls.mdx", 11, 1, "System Calls"),
    ("chapters/04_riscv_subroutines/02_subroutine_stack_frames.qmd", "04-riscv-subroutines/12-subroutine-stack-frames.mdx", 12, 2, "Subroutine Stack Frames"),
    ("chapters/04_riscv_subroutines/03_recursive_subroutines.qmd", "04-riscv-subroutines/13-recursive-subroutines.mdx", 13, 3, "Recursive Subroutines"),
    # Part V: Pipelined Processor Microarchitecture
    ("chapters/05_pipelined_processor/01_five_stage_pipeline.qmd", "05-pipelined-processor/14-five-stage-pipeline.mdx", 14, 1, "Five-Stage Pipeline"),
    ("chapters/05_pipelined_processor/02_structural_hazards.qmd", "05-pipelined-processor/15-structural-hazards.mdx", 15, 2, "Structural Hazards"),
    ("chapters/05_pipelined_processor/03_data_hazards.qmd", "05-pipelined-processor/16-data-hazards.mdx", 16, 3, "Data Hazards and Forwarding"),
    ("chapters/05_pipelined_processor/04_control_hazards.qmd", "05-pipelined-processor/17-control-hazards.mdx", 17, 4, "Control Hazards and Branching"),
    ("chapters/05_pipelined_processor/05_pipeline_performance.qmd", "05-pipelined-processor/18-pipeline-performance.mdx", 18, 5, "Pipeline Performance"),
    # Part VI: Cache Memory Systems
    ("chapters/06_cache_memory/01_cache_block_placement.qmd", "06-cache-memory/19-cache-block-placement.mdx", 19, 1, "Cache Block Placement"),
    ("chapters/06_cache_memory/02_cache_address_partitioning.qmd", "06-cache-memory/20-cache-address-partitioning.mdx", 20, 2, "Cache Address Partitioning"),
    ("chapters/06_cache_memory/03_cache_write_policies.qmd", "06-cache-memory/21-cache-write-policies.mdx", 21, 3, "Cache Write Policies"),
    ("chapters/06_cache_memory/04_cache_miss_taxonomy.qmd", "06-cache-memory/22-cache-miss-taxonomy.mdx", 22, 4, "Cache Miss Taxonomy"),
    ("chapters/06_cache_memory/05_cache_performance.qmd", "06-cache-memory/23-cache-performance.mdx", 23, 5, "Cache Memory Performance"),
]

KNOWN_JSX = (
    "Divider",
    "Callout",
    "MindMap",
    "Exercise",
    "StepCheck",
    "AmdahlExplorer",
    "PipelineExplorer",
    "CacheAddressExplorer",
    "figure",
    "img",
    "figcaption",
    "details",
    "summary",
    "strong",
    "em",
    "code",
)

FIG_BLOCK_RE = re.compile(
    r":::\s*\{#(fig-[A-Za-z0-9_-]+)\}\s*\n(.*?\\end\{tikzpicture\}\s*(?:\})?\s*(?:```)?)\s*\n(.*?)\n:::",
    re.S,
)


def clean_latex_for_title(text: str) -> str:
    def repl_m(m: re.Match) -> str:
        s = m.group(1)
        s = s.replace(r"\parallel", "∥").replace(r"\mu", "μ").replace(r"\lambda", "λ")
        s = s.replace(r"\Delta", "Δ").replace(r"\tau", "τ").replace(r"\theta", "θ")
        s = re.sub(r"\\text\{([^}]*)\}", r"\1", s)
        s = s.replace("{", "").replace("}", "").replace("\\", "")
        return s

    out = re.sub(r"\$([^$]+)\$", repl_m, text)
    return out.replace('"', "'").strip()


def extract_tikz_body(raw_block: str) -> str:
    m = re.search(r"(\\begin\{tikzpicture\}.*?\\end\{tikzpicture\})", raw_block, re.S)
    if m:
        return m.group(1).strip()
    return raw_block.strip()


def compile_tikz_to_svgs(tikz_jobs: list[tuple[str, str]]) -> set[str]:
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    if not tikz_jobs:
        return set()

    preamble = (
        r"\documentclass[border=6pt, multi=page]{standalone}" "\n"
        r"\usepackage[utf8]{inputenc}" "\n"
        r"\usepackage[T1]{fontenc}" "\n"
        r"\usepackage{amsmath,amssymb,tikz,pgfplots}" "\n"
        r"\pgfplotsset{compat=1.18}" "\n"
        r"\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, patterns, decorations.pathmorphing, automata}" "\n"
        r"\newenvironment{page}{\ignorespaces}{\unskip}" "\n"
    )

    created: set[str] = set()
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = pathlib.Path(tmp)
        tex = preamble + "\\begin{document}\n"
        for _, code in tikz_jobs:
            tex += f"\\begin{{page}}\n{code}\n\\end{{page}}\n"
        tex += "\\end{document}\n"

        tex_file = tmp_path / "all_figs.tex"
        tex_file.write_text(tex, encoding="utf-8")
        res = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-output-directory", str(tmp_path), str(tex_file)],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        pdf_file = tmp_path / "all_figs.pdf"
        if res.returncode == 0 and pdf_file.exists():
            for i, (fig_id, _) in enumerate(tikz_jobs, start=1):
                out_svg = SVG_DIR / f"{fig_id}.svg"
                sv = subprocess.run(
                    ["dvisvgm", "--pdf", "--no-fonts", f"--page={i}", "-o", str(out_svg), str(pdf_file)],
                    capture_output=True,
                    text=True,
                )
                if sv.returncode == 0 and out_svg.exists():
                    svg_txt = out_svg.read_text(encoding="utf-8")
                    svg_txt = re.sub(r"\bfill-opacity=(['\"])0(?:\.0+)?\1", "", svg_txt)
                    svg_txt = re.sub(r"\bstroke-opacity=(['\"])0(?:\.0+)?\1", "", svg_txt)
                    out_svg.write_text(svg_txt, encoding="utf-8")
                    created.add(fig_id)
                else:
                    print(f"WARNING: dvisvgm failed for {fig_id}: {sv.stderr}")
            return created

        print("Batch pdflatex failed; compiling figures individually...")
        for fig_id, code in tikz_jobs:
            single_dir = tmp_path / fig_id
            single_dir.mkdir(exist_ok=True)
            s_tex = (
                r"\documentclass[border=6pt]{standalone}" "\n"
                r"\usepackage[utf8]{inputenc}" "\n"
                r"\usepackage[T1]{fontenc}" "\n"
                r"\usepackage{amsmath,amssymb,tikz,pgfplots}" "\n"
                r"\pgfplotsset{compat=1.18}" "\n"
                r"\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, patterns, decorations.pathmorphing, automata}" "\n"
                r"\begin{document}" "\n"
                f"{code}\n"
                r"\end{document}" "\n"
            )
            stex_file = single_dir / f"{fig_id}.tex"
            stex_file.write_text(s_tex, encoding="utf-8")
            sr = subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-output-directory", str(single_dir), str(stex_file)],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            spdf = single_dir / f"{fig_id}.pdf"
            out_svg = SVG_DIR / f"{fig_id}.svg"
            if sr.returncode == 0 and spdf.exists():
                sv = subprocess.run(
                    ["dvisvgm", "--pdf", "--no-fonts", "-o", str(out_svg), str(spdf)],
                    capture_output=True,
                    text=True,
                )
                if sv.returncode == 0 and out_svg.exists():
                    svg_txt = out_svg.read_text(encoding="utf-8")
                    svg_txt = re.sub(r"\bfill-opacity=(['\"])0(?:\.0+)?\1", "", svg_txt)
                    svg_txt = re.sub(r"\bstroke-opacity=(['\"])0(?:\.0+)?\1", "", svg_txt)
                    out_svg.write_text(svg_txt, encoding="utf-8")
                    created.add(fig_id)
                    continue
            print(f"ERROR compiling {fig_id}: {sr.stdout[-600:]}")
    return created


def parse_solutions_by_chapter() -> dict[int, str]:
    sol_file = SRC_BOOK / "appendices" / "solutions.qmd"
    if not sol_file.exists():
        return {}
    raw = sol_file.read_text(encoding="utf-8")
    out: dict[int, str] = {}
    parts = re.split(r"(?=^###\s+Solutions for Chapter\s+\d+:)", raw, flags=re.M)
    for p in parts:
        m = re.match(r"^###\s+Solutions for Chapter\s+(\d+):[^\n]*\n(.*)", p.strip(), flags=re.S)
        if m:
            ch = int(m.group(1))
            body = m.group(2).strip()
            # Trim trailing '---' or '## Area ...' headers from next part
            body = re.sub(r"\n---\s*(\n##\s+Area\s+\d+:[^\n]*)?\s*$", "", body, flags=re.S).strip()
            out[ch] = body
    return out


def escape_table_math_pipes(text: str) -> str:
    lines = text.splitlines()
    out_lines: list[str] = []
    for line in lines:
        if line.lstrip().startswith("|"):
            chars: list[str] = []
            in_math = False
            i = 0
            while i < len(line):
                ch = line[i]
                if ch == "\\" and i + 1 < len(line):
                    chars.append(line[i : i + 2])
                    i += 2
                    continue
                if ch == "$":
                    in_math = not in_math
                    chars.append(ch)
                elif ch == "|" and in_math:
                    chars.append(r"\mid ")
                else:
                    chars.append(ch)
                i += 1
            out_lines.append("".join(chars))
        else:
            out_lines.append(line)
    return "\n".join(out_lines)


def sanitize_mdx_text(text: str) -> str:
    text = text.replace("```assembly", "```asm")
    text = re.sub(r"\$\$\s*\{#eq-[A-Za-z0-9_-]+\}", "$$", text)
    text = re.sub(r"^(#{1,6}\s+[^\n]+?)\s*\{#[A-Za-z0-9_-]+\}\s*$", r"\1", text, flags=re.M)
    text = re.sub(r"^:\s*(.+?)\s*\{#tbl-[A-Za-z0-9_-]+\}\s*$", r"*Table: \1*", text, flags=re.M)

    def repl_tbl(m: re.Match) -> str:
        inner = m.group(1).strip()
        lines = inner.splitlines()
        if lines and lines[-1].strip().startswith(": "):
            cap = lines[-1].strip()[2:].strip()
            body = "\n".join(lines[:-1]).strip()
            return f"{body}\n\n*Table: {cap}*"
        return inner

    text = re.sub(r":::\s*\{#tbl-[^}]+\}\s*\n(.*?)\n:::", repl_tbl, text, flags=re.S)

    def repl_callout(m: re.Match) -> str:
        kind = m.group(1)
        attr_title = m.group(2)
        body = m.group(3).strip()
        lines = body.splitlines()
        title = attr_title or kind.capitalize()
        if not attr_title and lines and re.match(r"^#{2,4}\s+", lines[0]):
            title = re.sub(r"^#{2,4}\s+", "", lines[0]).strip()
            body = "\n".join(lines[1:]).strip()

        if kind == "note":
            return f"### {title}\n\n{body}"

        ctype = "warning" if kind == "warning" else "tip"
        title_clean = clean_latex_for_title(title)
        return f'<Callout type="{ctype}" title="{title_clean}">\n\n{body}\n\n</Callout>'

    text = re.sub(
        r':::\s*\{\.callout-(warning|tip|important|note)(?:\s+title="([^"]*)")?[^}]*\}\s*\n(.*?)\n:::',
        repl_callout,
        text,
        flags=re.S,
    )

    text = escape_table_math_pipes(text)

    out_parts: list[str] = []
    token_re = re.compile(r"(```.*?```|\$\$.*?\$\$|\$[^$\n]+\$)", re.S)
    for idx, part in enumerate(token_re.split(text)):
        if idx % 2 == 1:
            out_parts.append(part)
        else:
            def esc_lt(lm: re.Match) -> str:
                after = lm.group(1)
                for tag in KNOWN_JSX:
                    if after.startswith(tag) and (len(after) == len(tag) or after[len(tag)] in " />"):
                        return "<" + after
                if after.startswith("/"):
                    for tag in KNOWN_JSX:
                        if after[1:].startswith(tag):
                            return "<" + after
                return "&lt;" + after

            part = re.sub(r"<([A-Za-z/][A-Za-z0-9_-]*)", esc_lt, part)
            out_parts.append(part)
    return "".join(out_parts)


def build_mindmap_md(title: str, body: str) -> str:
    lines = [f"# {title}"]
    for m in re.finditer(r"^(##|###)\s+(.+)$", body, flags=re.M):
        lvl, heading = m.group(1), m.group(2).strip()
        heading = re.sub(r"\{#[^}]+\}", "", heading).strip()
        heading = heading.replace("`", "")
        indent = "  " if lvl == "##" else "    "
        lines.append(f"{indent}- {heading}")
    return "\n".join(lines)


def main() -> None:
    # Copy syllabus & drills
    ctx_dir = COURSE_META_DIR / "context"
    ctx_dir.mkdir(parents=True, exist_ok=True)
    if (SRC_BOOK / "true_syllabus.md").exists():
        shutil.copy2(SRC_BOOK / "true_syllabus.md", ctx_dir / "syllabus.md")
    if (SRC_BOOK / "drills").exists():
        dst_drills = COURSE_META_DIR / "drills"
        if dst_drills.exists():
            shutil.rmtree(dst_drills)
        shutil.copytree(SRC_BOOK / "drills", dst_drills)

    solutions_map = parse_solutions_by_chapter()
    print(f"Parsed inline solutions for {len(solutions_map)} chapters.")

    sec_map: dict[str, tuple[str, str]] = {}
    tikz_jobs: list[tuple[str, str]] = []

    for rel_qmd, out_rel_mdx, ch_num, _, canon_title in CHAPTER_PLAN:
        txt = (SRC_BOOK / rel_qmd).read_text(encoding="utf-8")
        url = f"/dynamic-courses/computer-architecture/{out_rel_mdx[:-4]}/"
        for sm in re.finditer(r"\{#(sec-[A-Za-z0-9_-]+)\}", txt):
            sec_map[sm.group(1)] = (canon_title, url)
        for fm in FIG_BLOCK_RE.finditer(txt):
            tikz_jobs.append((fm.group(1), extract_tikz_body(fm.group(2))))

    print(f"Compiling {len(tikz_jobs)} TikZ figures to SVG...")
    created_svgs = compile_tikz_to_svgs(tikz_jobs)
    print(f"Converted {len(created_svgs)}/{len(tikz_jobs)} SVGs.")

    if DOCS_DIR.exists():
        shutil.rmtree(DOCS_DIR)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    for rel_qmd, out_rel_mdx, ch_num, order_in_part, canon_title in CHAPTER_PLAN:
        raw = (SRC_BOOK / rel_qmd).read_text(encoding="utf-8")
        # Strip YAML frontmatter and top H1 if present
        body = re.sub(r"^---\s*\n.*?\n---\s*\n", "", raw, count=1, flags=re.S)
        body = re.sub(r"^#\s+[^\n]+\n", "", body, count=1)

        # Strip "(See step-by-step solution in @sec-solutions-chX)."
        body = re.sub(r"\*?\(See step-by-step solutions? in @sec-solutions-ch\d+\)\.?(\*)?", "", body)

        # Append inline solution from solutions_map if available
        if ch_num in solutions_map:
            sol_body = solutions_map[ch_num]
            body = body.rstrip() + f"\n\n<details className=\"dc-solution\">\n<summary>Show Step-by-Step Solution</summary>\n\n{sol_body}\n\n</details>\n"

        def repl_fig(m: re.Match) -> str:
            fig_id = m.group(1)
            caption = clean_latex_for_title(m.group(3).strip())
            if fig_id in created_svgs:
                return (
                    f'<figure id="{fig_id}" className="dc-svg-wrap">\n'
                    f'  <img src="/dynamic-courses/diagrams/computer-architecture/{fig_id}.svg" alt="{caption}" />\n'
                    f'  <figcaption>{m.group(3).strip()}</figcaption>\n'
                    f'</figure>'
                )
            return f"*{m.group(3).strip()}*"

        body = FIG_BLOCK_RE.sub(repl_fig, body)

        def repl_ref(m: re.Match) -> str:
            kind, label = m.group(1), m.group(2)
            full = f"{kind}-{label}"
            if kind == "sec" and full in sec_map:
                t, u = sec_map[full]
                return f"[{t}]({u})"
            if kind == "fig":
                return f"[the figure](#{full})"
            if kind == "tbl":
                return "the reference table"
            if kind == "eq":
                return "the equation above"
            return full

        body = re.sub(r"(?<![A-Za-z0-9_])@(sec|fig|tbl|eq)-([A-Za-z0-9_-]+)", repl_ref, body)
        body = re.sub(r"^\s*---\s*$", "\n<Divider />\n", body, flags=re.M)
        body = sanitize_mdx_text(body)

        mm_md = build_mindmap_md(f"Ch. {ch_num}: {canon_title}", body).replace("`", "'")

        out_file = DOCS_DIR / out_rel_mdx
        out_file.parent.mkdir(parents=True, exist_ok=True)

        mdx = (
            "---\n"
            f'title: "{ch_num}. {canon_title}"\n'
            f'description: "Computer Architecture — Chapter {ch_num}: {canon_title}"\n'
            "sidebar:\n"
            f"  order: {order_in_part}\n"
            "---\n\n"
            'import Divider from "@components/Divider.astro";\n'
            'import Callout from "@components/Callout.astro";\n'
            'import MindMap from "@components/MindMap.tsx";\n'
            'import Exercise from "@components/Exercise.tsx";\n'
            'import StepCheck from "@components/StepCheck.tsx";\n\n'
            f'<MindMap client:load defaultCollapsed title="Chapter {ch_num} Map" markdown={{`{mm_md}`}} />\n\n'
            f"{body.strip()}\n"
        )
        out_file.write_text(mdx, encoding="utf-8")

    # Migrate Preface -> src/content/docs/computer-architecture/index.mdx
    idx_raw = (SRC_BOOK / "index.qmd").read_text(encoding="utf-8")
    idx_raw = re.sub(r"^#\s+Preface\s*\{\.unnumbered\}\s*\n", "", idx_raw)
    idx_raw = re.sub(r"^\s*---\s*$", "\n<Divider />\n", idx_raw, flags=re.M)
    idx_raw = sanitize_mdx_text(idx_raw)
    idx_mdx = (
        "---\n"
        'title: "Computer Architecture"\n'
        'description: "Synchronous Digital Logic, RISC-V Assembly, Pipelined Processors, and Cache Hierarchies — UniCT L-8"\n'
        "---\n\n"
        'import Divider from "@components/Divider.astro";\n'
        'import Callout from "@components/Callout.astro";\n'
        'import MindMap from "@components/MindMap.tsx";\n\n'
        '<MindMap client:load title="Course Map" markdown={`# Computer Architecture\n'
        '  - Part I: Synchronous Digital Systems\n'
        '  - Part II: Computer Performance\n'
        '  - Part III: RISC-V Instruction Set\n'
        '  - Part IV: RISC-V Subroutines & Systems\n'
        '  - Part V: Pipelined Processor Microarchitecture\n'
        '  - Part VI: Cache Memory Systems`} />\n\n'
        f"{idx_raw.strip()}\n"
    )
    (DOCS_DIR / "index.mdx").write_text(idx_mdx, encoding="utf-8")
    print(f"Migrated {len(CHAPTER_PLAN)} chapters + Preface to {DOCS_DIR}")


if __name__ == "__main__":
    main()
