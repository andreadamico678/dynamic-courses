#!/usr/bin/env python3
"""Migrate Linear Systems Theory from Quarto (.qmd) to Astro Starlight (.mdx) + SVGs."""

from __future__ import annotations

import pathlib
import re
import subprocess
import tempfile

SRC_BOOK = pathlib.Path(r"c:\Users\Andrea\Desktop\projects\personal\dynamic-text-books\books\automatica\systems_theory")
DST_ROOT = pathlib.Path(r"C:\Users\Andrea\Desktop\projects\professional\dynamic-courses")
DOCS_DIR = DST_ROOT / "src" / "content" / "docs" / "systems-theory"
SVG_DIR = DST_ROOT / "public" / "diagrams" / "systems-theory"

AREA_MAP = {
    "01_state_models_and_block_diagrams": "01-state-models",
    "02_laplace_and_resolvent_methods": "02-laplace-resolvent",
    "03_time_response_and_matrix_exponential": "03-time-response",
    "04_system_stability_and_routh": "04-stability-routh",
    "05_harmonic_response_and_bode": "05-frequency-bode",
    "06_kalman_structural_properties": "06-kalman-structure",
    "07_state_feedback_control": "07-state-feedback",
    "08_state_observers_and_compensation": "08-observers-compensation",
}

KNOWN_JSX = (
    "Divider",
    "Callout",
    "MindMap",
    "Exercise",
    "StepCheck",
    "BodeExplorer",
    "RouthExplorer",
    "PhaseFlowExplorer",
    "figure",
    "img",
    "figcaption",
    "details",
    "summary",
    "strong",
    "em",
    "code",
)

# Interactive step checks injected into flagship chapters (exact SymPy/analytical values)
CHAPTER_STEPCHECKS: dict[tuple[int, int], list[str]] = {
    (13, 1): [
        '<StepCheck client:load prompt="Compute entry b₁ in row s¹ of the Routh table for p(s) = s³ + 2s² + 4s + 12:" expected={-2} tolerance={0.01} explanation="b₁ = (2·4 − 1·12)/2 = −2." />',
        '<StepCheck client:load mode="choice" prompt="How many sign changes appear in the first column [1, 2, −2, 12]?" options={["0 (Stable)", "1 RHP root", "2 RHP roots", "3 RHP roots"]} correctIndex={2} explanation="Sign flips +2 → −2 and −2 → +12 give 2 RHP roots." />',
    ],
    (15, 1): [
        '<StepCheck client:load prompt="For G(s) = 10 / [s(s+3)(s+5)], find the upper critical gain K_crit:" expected={12} tolerance={0.05} explanation="p(s,K) = s³ + 8s² + 15s + 10K ⇒ 8·15 > 10K ⇒ K < 12." />',
        '<StepCheck client:load prompt="Find the sustained oscillation frequency ω_osc at K = K_crit:" expected={3.873} tolerance={0.05} unit="rad/s" explanation="Row s² gives 8s² + 120 = 0 ⇒ ω_osc = √15 ≈ 3.87 rad/s." />',
    ],
    (16, 1): [
        '<StepCheck client:load prompt="Evaluate the L₁ norm ∫₀^∞ |5 e^(−2t)| dt for w₁(t):" expected={2.5} tolerance={0.02} explanation="5 / 2 = 2.5 < ∞, so system 1 is BIBO stable." />',
        '<StepCheck client:load mode="choice" prompt="Is system 2 with w₂(t) = 3·1(t) (pole at s = 0) BIBO stable?" options={["Yes, poles on jω axis are BIBO stable", "No, ∫|3|dt diverges to ∞"]} correctIndex={1} explanation="An integrator pole at s = 0 is simply stable, NOT BIBO stable." />',
    ],
    (17, 1): [
        '<StepCheck client:load prompt="For W(s) = 10(s+2)/[s(s+20)], compute 20 log₁₀|K_B| (anchor at ω = 1 rad/s):" expected={0} tolerance={0.05} unit="dB" explanation="K_B = (10·2)/20 = 1 ⇒ 20 log₁₀(1) = 0 dB." />',
        '<StepCheck client:load prompt="Compute the asymptotic magnitude at ω = 20 rad/s:" expected={-6.02} tolerance={0.15} unit="dB" explanation="y(2) = −6.02 dB, slope 0 dB/dec on [2, 20] ⇒ y(20) = −6.02 dB." />',
    ],
    (17, 2): [
        '<StepCheck client:load prompt="For W(s) = 200(s+5)/[s(s+2)(s+50)], compute 20 log₁₀|K_B|:" expected={20} tolerance={0.05} unit="dB" explanation="K_B = (200·5)/(2·50) = 10 ⇒ 20 dB." />',
        '<StepCheck client:load prompt="Determine the asymptotic gain crossover frequency ω_c:" expected={4.47} tolerance={0.15} unit="rad/s" explanation="Crossing occurs on the −40 dB/dec segment [2, 5] where 13.98 − 40 log₁₀(ω_c/2) = 0 ⇒ ω_c ≈ 4.47 rad/s." />',
    ],
    (18, 2): [
        '<StepCheck client:load prompt="What is the low-frequency horizontal phase limit φ(0⁺) for W(s) = 10(1+0.2s)/[s(1+0.5s)(1+0.02s)]?" expected={-90} tolerance={0.5} unit="deg" explanation="Type g = 1, K_B > 0 ⇒ φ(0⁺) = −90°." />',
        '<StepCheck client:load prompt="What is the high-frequency horizontal phase limit φ(∞)?" expected={-180} tolerance={0.5} unit="deg" explanation="Pole-zero excess n − m = 3 − 1 = 2 ⇒ φ(∞) = −180°." />',
        '<StepCheck client:load prompt="Compute the phase margin φ_m = 180° + φ(4.47):" expected={60.8} tolerance={1.0} unit="deg" explanation="φ(4.47) ≈ −119.2° ⇒ φ_m ≈ +60.8°." />',
    ],
}

EXPLORER_INJECTIONS: dict[int, tuple[str, str]] = {
    8: ('import PhaseFlowExplorer from "@components/PhaseFlowExplorer.tsx";', '<PhaseFlowExplorer client:load initialPreset="focus" />'),
    9: ('import PhaseFlowExplorer from "@components/PhaseFlowExplorer.tsx";', '<PhaseFlowExplorer client:load initialPreset="node" />'),
    15: ('import RouthExplorer from "@components/RouthExplorer.tsx";', '<RouthExplorer client:load />'),
    17: ('import BodeExplorer from "@components/BodeExplorer.tsx";', '<BodeExplorer client:load initialKb={10} initialType={1} initialPole={2} initialZero={5} />'),
    18: ('import BodeExplorer from "@components/BodeExplorer.tsx";', '<BodeExplorer client:load initialKb={10} initialType={1} initialPole={2} initialZero={5} />'),
}


def load_ordered_chapters() -> list[pathlib.Path]:
    yml = (SRC_BOOK / "_quarto.yml").read_text(encoding="utf-8")
    return [SRC_BOOK / rel for rel in re.findall(r"-\s+(chapters/[^\s]+\.qmd)", yml)]


def parse_solutions(sol_path: pathlib.Path) -> dict[tuple[int, int], str]:
    txt = sol_path.read_text(encoding="utf-8")
    sols: dict[tuple[int, int], str] = {}
    sections = re.split(r"(?=^##\s+Chapter\s+\d+:)", txt, flags=re.M)
    for sec in sections:
        m_ch = re.match(r"^##\s+Chapter\s+(\d+):", sec)
        if not m_ch:
            continue
        ch_num = int(m_ch.group(1))
        ex_parts = re.split(r"(?=^###\s+Exercise\s+\d+\.\d+\s+Solution)", sec, flags=re.M)
        for ep in ex_parts:
            m_ex = re.match(r"^###\s+Exercise\s+(\d+)\.(\d+)\s+Solution[^\n]*\n(.*)", ep, re.S)
            if m_ex:
                sols[(ch_num, int(m_ex.group(2)))] = m_ex.group(3).strip()
    return sols


def slugify(name: str) -> str:
    s = re.sub(r"^\d+_", "", name.replace(".qmd", ""))
    return s.replace("_", "-")


def build_chapter_url(idx_path: pathlib.Path) -> str:
    area = AREA_MAP[idx_path.parent.name]
    # Use chapter index prefix from original filename to preserve order
    num_prefix = idx_path.name.split("_", 1)[0]
    slug = slugify(idx_path.name)
    return f"/dynamic-courses/systems-theory/{area}/{num_prefix}-{slug}/"


def compile_tikz_to_svgs(tikz_jobs: list[tuple[str, str]]) -> set[str]:
    """Compile all TikZ figures in one standalone PDF pass and convert to SVG."""
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    if not tikz_jobs:
        return set()

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = pathlib.Path(tmp)
        tex = (
            r"\documentclass[border=6pt, multi=page]{standalone}" "\n"
            r"\usepackage{amsmath,amssymb,tikz,pgfplots}" "\n"
            r"\pgfplotsset{compat=1.18}" "\n"
            r"\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, patterns, decorations.pathmorphing, automata}" "\n"
            r"\newenvironment{page}{\ignorespaces}{\unskip}" "\n"
            r"\begin{document}" "\n"
        )
        for _, code in tikz_jobs:
            cleaned = code.replace(r"\resizebox{0.92\linewidth}{!}{", "").replace(r"\resizebox{0.82\linewidth}{!}{", "")
            # Remove matching trailing } if resizebox was stripped
            if cleaned != code:
                idx = cleaned.rfind("}")
                if idx != -1:
                    cleaned = cleaned[:idx] + cleaned[idx + 1 :]
            cleaned = cleaned.replace(r"\centering", "")
            tex += f"\\begin{{page}}\n{cleaned.strip()}\n\\end{{page}}\n"
        tex += r"\end{document}"

        tex_file = tmp_path / "all_figs.tex"
        tex_file.write_text(tex, encoding="utf-8")
        res = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-output-directory", str(tmp_path), str(tex_file)],
            capture_output=True,
            text=True,
        )
        pdf_file = tmp_path / "all_figs.pdf"
        if res.returncode != 0 or not pdf_file.exists():
            print("WARNING: pdflatex reported issues on TikZ batch; checking generated pages.")
            print(res.stdout[-1200:])

        created: set[str] = set()
        if pdf_file.exists():
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


def sanitize_mdx_text(text: str) -> str:
    """Protect non-math prose from MDX JSX parsing edge cases while preserving math and components."""
    # Strip Quarto {#eq-...} and {#sec-...} tags
    text = re.sub(r"\$\$\s*\{#eq-[A-Za-z0-9_-]+\}", "$$", text)
    text = re.sub(r"^(#{1,6}\s+[^\n]+?)\s*\{#[A-Za-z0-9_-]+\}\s*$", r"\1", text, flags=re.M)

    # remark-math@6 requires multi-line $$ delimiters on their own lines
    def fence_multiline_math(m: re.Match) -> str:
        indent = m.group(1)
        body = m.group(2)
        if "\n" not in body:
            return m.group(0)
        body_clean = body.strip("\r\n")
        return f"{indent}$$\n{indent}{body_clean}\n{indent}$$"

    text = re.sub(r"^([ \t]*)\$\$(.+?)\$\$$", fence_multiline_math, text, flags=re.M | re.S)

    # Convert Quarto tables ::: {#tbl-...} ... : Caption :::
    def repl_tbl(m: re.Match) -> str:
        inner = m.group(1).strip()
        lines = inner.splitlines()
        if lines and lines[-1].strip().startswith(": "):
            cap = lines[-1].strip()[2:].strip()
            body = "\n".join(lines[:-1]).strip()
            return f"{body}\n\n*Table: {cap}*"
        return inner

    text = re.sub(r":::\s*\{#tbl-[^}]+\}\s*\n(.*?)\n:::", repl_tbl, text, flags=re.S)

    # Convert Quarto callouts
    def repl_callout(m: re.Match) -> str:
        kind = m.group(1)
        body = m.group(2).strip()
        lines = body.splitlines()
        title = kind.capitalize()
        if lines and re.match(r"^#{2,4}\s+", lines[0]):
            title = re.sub(r"^#{2,4}\s+", "", lines[0]).strip()
            body = "\n".join(lines[1:]).strip()
        ctype = "warning" if kind == "warning" else ("tip" if kind in ("tip", "important") else "note")
        if "Robotics Bridge" in title or "Bridge" in title:
            ctype = "bridge"
        title_esc = title.replace('"', "'")
        return f'<Callout type="{ctype}" title="{title_esc}">\n\n{body}\n\n</Callout>'

    text = re.sub(
        r":::\s*\{\.callout-(warning|tip|important|note)[^}]*\}\s*\n(.*?)\n:::",
        repl_callout,
        text,
        flags=re.S,
    )

    # Escape bare '<' followed by letter/digit outside math and known JSX tags
    out_parts: list[str] = []
    # Split by fenced code blocks, $$...$$, and $...$
    token_re = re.compile(r"(```.*?```|\$\$.*?\$\$|\$[^$\n]+\$)", re.S)
    for idx, part in enumerate(token_re.split(text)):
        if idx % 2 == 1:
            out_parts.append(part)
        else:
            # Outside math: protect '<' that is not a known JSX/HTML tag
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
        if "Chapter Exercises" in heading or heading.startswith("Exercise "):
            continue
        heading = re.sub(r"\{#[^}]+\}", "", heading).strip()
        # Strip inline LaTeX markers that might render awkwardly in markmap SVG or keep concise
        heading = heading.replace("`", "")
        indent = "  " if lvl == "##" else "    "
        lines.append(f"{indent}- {heading}")
    return "\n".join(lines)


def main() -> None:
    chapters = load_ordered_chapters()
    solutions = parse_solutions(SRC_BOOK / "appendices" / "solutions.qmd")

    # Collect label map for cross-reference resolution
    sec_map: dict[str, tuple[str, str]] = {}
    tikz_jobs: list[tuple[str, str]] = []

    for idx, ch in enumerate(chapters, start=1):
        txt = ch.read_text(encoding="utf-8")
        title_m = re.search(r'^title:\s*"([^"]+)"', txt, re.M) or re.search(r"^#\s+([^\n]+)", txt, re.M)
        title = re.sub(r"\s*\{#[^}]+\}", "", title_m.group(1)).strip() if title_m else f"Chapter {idx}"
        url = build_chapter_url(ch)
        for sm in re.finditer(r"\{#(sec-[A-Za-z0-9_-]+)\}", txt):
            sec_map[sm.group(1)] = (title, url)
        for fm in re.finditer(r":::\s*\{#(fig-[A-Za-z0-9_-]+)\}\s*\n```\{=latex\}\s*(.*?)```\s*\n(.*?)\n:::", txt, re.S):
            tikz_jobs.append((fm.group(1), fm.group(2)))

    print(f"Compiling {len(tikz_jobs)} TikZ figures to SVG...")
    created_svgs = compile_tikz_to_svgs(tikz_jobs)
    print(f"Converted {len(created_svgs)} SVGs.")

    if DOCS_DIR.exists():
        shutil_rmtree(DOCS_DIR)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    # Track per-part order
    area_orders: dict[str, int] = {}

    for ch_num, ch in enumerate(chapters, start=1):
        raw = ch.read_text(encoding="utf-8")
        area_slug = AREA_MAP[ch.parent.name]
        area_orders[area_slug] = area_orders.get(area_slug, 0) + 1
        order_in_part = area_orders[area_slug]

        # Extract title & strip frontmatter/H1
        title_m = re.search(r'^title:\s*"([^"]+)"', raw, re.M)
        if title_m:
            title = title_m.group(1).strip()
            body = re.sub(r"^---\s*\n.*?\n---\s*\n", "", raw, count=1, flags=re.S)
        else:
            h1_m = re.match(r"^#\s+([^\n]+)\n", raw)
            title = re.sub(r"\s*\{#[^}]+\}", "", h1_m.group(1)).strip() if h1_m else f"Chapter {ch_num}"
            body = re.sub(r"^#\s+[^\n]+\n", "", raw, count=1)

        # Replace figure blocks with SVGs
        def repl_fig(m: re.Match) -> str:
            fig_id = m.group(1)
            caption = m.group(3).strip().replace('"', "'")
            if fig_id in created_svgs:
                return (
                    f'<figure id="{fig_id}" className="dc-svg-wrap">\n'
                    f'  <img src="/dynamic-courses/diagrams/systems-theory/{fig_id}.svg" alt="{caption}" />\n'
                    f'  <figcaption>{caption}</figcaption>\n'
                    f'</figure>'
                )
            return f"*{caption}*"

        body = re.sub(
            r":::\s*\{#(fig-[A-Za-z0-9_-]+)\}\s*\n```\{=latex\}\s*(.*?)```\s*\n(.*?)\n:::",
            repl_fig,
            body,
            flags=re.S,
        )

        # Resolve cross-references (@sec-, @fig-, @tbl-, @eq-)
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

        # Split out ## Chapter Exercises
        ex_split = re.split(r"^##\s+Chapter Exercises\s*$", body, maxsplit=1, flags=re.M)
        main_body = ex_split[0].strip()
        ex_raw = ex_split[1].strip() if len(ex_split) > 1 else ""

        # Replace horizontal rules `---` in main_body with <Divider />
        # Give smart divider labels on the first few major transitions if desired, or clean <Divider />
        main_body = re.sub(r"^\s*---\s*$", "\n<Divider />\n", main_body, flags=re.M)
        main_body = sanitize_mdx_text(main_body)

        # Convert exercises into <Exercise> + <StepCheck> + <details className="dc-solution">
        ex_blocks: list[str] = []
        if ex_raw:
            parts = re.split(r"(?=^###\s+Exercise\s+\d+\.\d+)", ex_raw, flags=re.M)
            for part in parts:
                part = part.strip()
                if not part:
                    continue
                em = re.match(r"^###\s+Exercise\s+(\d+)\.(\d+)(?::\s*([^\[\n]+?))?\s*(?:\(([^)]+)\)|\[([^\]]+)\])?\s*(?:—\s*([^\n]+))?\s*(?:\{#[^}]+\})?\s*\n(.*)", part, re.S)
                if not em:
                    ex_blocks.append(sanitize_mdx_text(part))
                    continue
                c_n, e_n = int(em.group(1)), int(em.group(2))
                lvl = (em.group(4) or em.group(5) or "Level 1").strip("[]")
                raw_title = (em.group(3) or em.group(6) or "").strip()
                extra_title = f": {raw_title}" if raw_title else ""
                prompt_md = sanitize_mdx_text(em.group(7).strip())
                sol_raw = re.sub(r"(?<![A-Za-z0-9_])@(sec|fig|tbl|eq)-([A-Za-z0-9_-]+)", repl_ref, solutions.get((c_n, e_n), "Solution pending."))
                sol_md = sanitize_mdx_text(sol_raw)
                checks = "\n\n".join(CHAPTER_STEPCHECKS.get((c_n, e_n), []))
                checks_block = f"\n\n{checks}\n" if checks else ""

                ex_blocks.append(
                    f'<Exercise client:load id="ex-{c_n}-{e_n}" title="Exercise {c_n}.{e_n}{extra_title}" level="{lvl}">\n\n'
                    f'{prompt_md}{checks_block}\n\n'
                    f'<details className="dc-solution">\n'
                    f'<summary>Reveal Worked Solution</summary>\n\n'
                    f'{sol_md}\n\n'
                    f'</details>\n\n'
                    f'</Exercise>'
                )

        # Build MindMap markdown from main_body
        mm_md = build_mindmap_md(f"Ch. {ch_num}: {title}", main_body).replace("`", "'")

        imports = [
            'import Divider from "@components/Divider.astro";',
            'import Callout from "@components/Callout.astro";',
            'import MindMap from "@components/MindMap.tsx";',
            'import Exercise from "@components/Exercise.tsx";',
            'import StepCheck from "@components/StepCheck.tsx";',
        ]
        explorer_jsx = ""
        if ch_num in EXPLORER_INJECTIONS:
            imp_line, explorer_jsx = EXPLORER_INJECTIONS[ch_num]
            imports.append(imp_line)

        out_dir = DOCS_DIR / area_slug
        out_dir.mkdir(parents=True, exist_ok=True)
        num_prefix = ch.name.split("_", 1)[0]
        out_file = out_dir / f"{num_prefix}-{slugify(ch.name)}.mdx"

        mdx_parts = [
            "---",
            f'title: "{ch_num}. {title}"',
            f'description: "Linear Systems Theory — Chapter {ch_num}: {title}"',
            "sidebar:",
            f"  order: {order_in_part}",
            "---",
            "",
            "\n".join(imports),
            "",
            f'<MindMap client:load title="Chapter {ch_num} Mental Model" markdown={{`{mm_md}`}} />',
            "",
            main_body,
        ]
        if explorer_jsx:
            mdx_parts.extend(["", '<Divider label="Interactive Lab" />', "", explorer_jsx])
        if ex_blocks:
            mdx_parts.extend(["", '<Divider label="Interactive Practice & Exam Drills" />', "", "## Chapter Exercises", "", "\n\n".join(ex_blocks)])

        out_file.write_text("\n".join(mdx_parts).rstrip() + "\n", encoding="utf-8")

    # Migrate Preface (index.qmd -> systems-theory/index.mdx)
    idx_raw = (SRC_BOOK / "index.qmd").read_text(encoding="utf-8")
    idx_raw = re.sub(r"^#\s+Preface\s*\{\.unnumbered\}\s*\n", "", idx_raw)
    idx_raw = idx_raw.replace("(appendices/solutions.qmd)", "(#structure-of-the-textbook)").replace("(flashcards/)", "(https://github.com/andreadamico678/dynamic-courses/tree/main/courses/systems-theory/flashcards)")
    idx_raw = sanitize_mdx_text(idx_raw)
    idx_mdx = (
        "---\n"
        'title: "Linear Systems Theory"\n'
        'description: "State-Space Modeling, Structural Analysis, and State Feedback Control"\n'
        "---\n\n"
        'import Divider from "@components/Divider.astro";\n'
        'import MindMap from "@components/MindMap.tsx";\n\n'
        '<MindMap client:load title="Full Course Overview" markdown={`# Linear Systems Theory\n'
        '  - Part I: Dynamic State Models\n'
        '  - Part II: Laplace & State Resolvent\n'
        '  - Part III: Matrix Exponential & Response\n'
        '  - Part IV: Stability & Routh-Hurwitz\n'
        '  - Part V: Frequency Response & Bode\n'
        '  - Part VI: Kalman Structure\n'
        '  - Part VII: State Feedback Control\n'
        '  - Part VIII: Observers & Compensation`} />\n\n'
        + idx_raw
    )
    (DOCS_DIR / "index.mdx").write_text(idx_mdx, encoding="utf-8")
    print(f"Migrated {len(chapters)} chapters + Preface to {DOCS_DIR}")


def shutil_rmtree(path: pathlib.Path) -> None:
    import shutil
    shutil.rmtree(path)


if __name__ == "__main__":
    main()
