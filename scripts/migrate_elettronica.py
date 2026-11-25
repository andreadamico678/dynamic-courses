#!/usr/bin/env python3
"""Migrate Elettronica (Microelettronica) from Quarto (.qmd) to Astro Starlight (.mdx) + SVGs."""

from __future__ import annotations

import pathlib
import re
import shutil
import subprocess
import tempfile

SRC_BOOK = pathlib.Path(r"C:\Users\Andrea\Desktop\projects\personal\dynamic-text-books\books\elettronica")
DST_ROOT = pathlib.Path(r"C:\Users\Andrea\Desktop\projects\professional\dynamic-courses")
DOCS_DIR = DST_ROOT / "src" / "content" / "docs" / "elettronica"
SVG_DIR = DST_ROOT / "public" / "diagrams" / "elettronica"

# Exact mapping from legacy .qmd relative paths to the 6-Part Matryoshka structure
CHAPTER_PLAN: list[tuple[str, str, int, int, str]] = [
    # (rel_qmd, out_rel_mdx, ch_num, order_in_part, canonical_title)
    ("chapters/01_fondamenti_circuitali/01_teoria_circuitale.qmd", "01-fondamenti-dispositivi/01-teoria-circuitale.mdx", 1, 1, "Teoria Circuitale Elementare"),
    ("chapters/02_fisica_semiconduttori/01_stato_solido.qmd", "01-fondamenti-dispositivi/02-fisica-stato-solido.mdx", 2, 2, "Fisica dello Stato Solido"),
    ("chapters/03_dispositivi_giunzione/01_giunzione_pn.qmd", "01-fondamenti-dispositivi/03-giunzione-pn.mdx", 3, 3, "Giunzione p-n e Diodo"),
    ("chapters/03_dispositivi_giunzione/02_modelli_circuitali_diodo.qmd", "01-fondamenti-dispositivi/04-modelli-diodo.mdx", 4, 4, "Modelli Circuitali del Diodo"),
    ("chapters/04_transistori_mos/01_struttura_fisica.qmd", "02-transistori-mos/05-struttura-fisica-mos.mdx", 5, 1, "Struttura Fisica del MOSFET"),
    ("chapters/04_transistori_mos/02_caratteristiche_corrente.qmd", "02-transistori-mos/06-caratteristiche-corrente.mdx", 6, 2, "Caratteristiche Statiche di Corrente"),
    ("chapters/04_transistori_mos/03_piccolo_segnale.qmd", "02-transistori-mos/07-modello-piccolo-segnale.mdx", 7, 3, "Modello di Piccolo Segnale"),
    ("chapters/04_transistori_mos/04_capacita_parassite.qmd", "02-transistori-mos/08-capacita-parassite.mdx", 8, 4, "Capacità Parassite del MOSFET"),
    ("chapters/04_transistori_mos/05_polarizzazione_dc.qmd", "02-transistori-mos/09-polarizzazione-dc.mdx", 9, 5, "Polarizzazione DC del MOSFET"),
    ("chapters/06_amplificatori_operazionali/01_opamp_ideale.qmd", "03-amplificatori-operazionali/10-opamp-ideale.mdx", 10, 1, "Amplificatore Operazionale Ideale"),
    ("chapters/06_amplificatori_operazionali/02_circuiti_computazionali.qmd", "03-amplificatori-operazionali/11-circuiti-computazionali.mdx", 11, 2, "Circuiti Computazionali ad Op-Amp"),
    ("chapters/06_amplificatori_operazionali/03_non_idealita.qmd", "03-amplificatori-operazionali/12-non-idealita-opamp.mdx", 12, 3, "Non-Idealità dell'Op-Amp Reale"),
    ("chapters/07_amplificatori_singolo_stadio/01_common_source.qmd", "04-amplificatori-frequenza/13-common-source.mdx", 13, 1, "Amplificatore Common Source"),
    ("chapters/07_amplificatori_singolo_stadio/02_common_drain.qmd", "04-amplificatori-frequenza/14-common-drain.mdx", 14, 2, "Amplificatore Common Drain"),
    ("chapters/07_amplificatori_singolo_stadio/03_common_gate.qmd", "04-amplificatori-frequenza/15-common-gate-multistadio.mdx", 15, 3, "Common Gate e Multistadio"),
    ("chapters/07_amplificatori_singolo_stadio/04_specchi_corrente.qmd", "04-amplificatori-frequenza/16-specchi-corrente.mdx", 16, 4, "Specchi di Corrente MOS"),
    ("chapters/08_risposta_frequenza/01_risposta_frequenza.qmd", "04-amplificatori-frequenza/17-risposta-frequenza.mdx", 17, 5, "Risposta in Frequenza"),
    ("chapters/05_circuiti_digitali_cmos/01_metriche_digitali.qmd", "05-logica-cmos/18-metriche-digitali.mdx", 18, 1, "Metriche dei Circuiti Digitali"),
    ("chapters/05_circuiti_digitali_cmos/02_invertitore_cmos.qmd", "05-logica-cmos/19-invertitore-cmos.mdx", 19, 2, "Invertitore CMOS Statico"),
    ("chapters/05_circuiti_digitali_cmos/03_porte_logiche.qmd", "05-logica-cmos/20-porte-logiche-cmos.mdx", 20, 3, "Porte Logiche Combinatorie"),
    ("chapters/05_circuiti_digitali_cmos/04_buffer_scalati.qmd", "05-logica-cmos/21-buffer-scalati.mdx", 21, 4, "Buffer Scalati in Cascata"),
    ("chapters/05_circuiti_digitali_cmos/05_circuiti_sequenziali.qmd", "06-sequenziali-memorie/22-circuiti-sequenziali.mdx", 22, 1, "Circuiti Sequenziali CMOS"),
    ("chapters/05_circuiti_digitali_cmos/06_memorie.qmd", "06-sequenziali-memorie/23-architetture-memoria.mdx", 23, 2, "Architetture di Memoria"),
]

KNOWN_JSX = (
    "Divider",
    "Callout",
    "MindMap",
    "Exercise",
    "StepCheck",
    "DiodeRectifierExplorer",
    "MosfetExplorer",
    "SingleStageExplorer",
    "CmosVtcExplorer",
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
    r":::\s*\{#(fig-[A-Za-z0-9_-]+)\}\s*\n(.*?\\end\{tikzpicture\}\s*(?:\})?)\s*\n(.*?)\n:::",
    re.S,
)


def clean_latex_for_title(text: str) -> str:
    """Convert inline $...$ in JSX title attributes into readable Unicode/plain text."""
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
    """Strip outer \\resizebox{...}{...} and \\centering cleanly, preserving \\begin{tikzpicture}...\\end{tikzpicture}."""
    m = re.search(r"(\\begin\{tikzpicture\}.*?\\end\{tikzpicture\})", raw_block, re.S)
    if m:
        return m.group(1).strip()
    return raw_block.strip()


def compile_tikz_to_svgs(tikz_jobs: list[tuple[str, str]]) -> set[str]:
    """Compile all TikZ/CircuiTikZ figures via pdflatex + dvisvgm (fallback per-figure on error)."""
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    if not tikz_jobs:
        return set()

    preamble = (
        r"\documentclass[border=6pt, multi=page]{standalone}" "\n"
        r"\usepackage[utf8]{inputenc}" "\n"
        r"\usepackage[T1]{fontenc}" "\n"
        r"\usepackage{amsmath,amssymb,tikz,pgfplots}" "\n"
        r"\usepackage[siunitx]{circuitikz}" "\n"
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

        # Fallback: compile individually so one bad diagram does not block the other 70
        print("Batch pdflatex failed; compiling figures individually...")
        for fig_id, code in tikz_jobs:
            single_dir = tmp_path / fig_id
            single_dir.mkdir(exist_ok=True)
            s_tex = (
                r"\documentclass[border=6pt]{standalone}" "\n"
                r"\usepackage[utf8]{inputenc}" "\n"
                r"\usepackage[T1]{fontenc}" "\n"
                r"\usepackage{amsmath,amssymb,tikz,pgfplots}" "\n"
                r"\usepackage[siunitx]{circuitikz}" "\n"
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


def sanitize_mdx_text(text: str) -> str:
    """Convert Quarto callouts/tables, promote proof callouts to prose, and protect '<' in prose."""
    text = re.sub(r"\$\$\s*\{#eq-[A-Za-z0-9_-]+\}", "$$", text)
    text = re.sub(r"^(#{1,6}\s+[^\n]+?)\s*\{#[A-Za-z0-9_-]+\}\s*$", r"\1", text, flags=re.M)
    text = re.sub(r"^:\s*(.+?)\s*\{#tbl-[A-Za-z0-9_-]+\}\s*$", r"*Tabella: \1*", text, flags=re.M)

    # Convert Quarto tables ::: {#tbl-...} ... : Caption :::
    def repl_tbl(m: re.Match) -> str:
        inner = m.group(1).strip()
        lines = inner.splitlines()
        if lines and lines[-1].strip().startswith(": "):
            cap = lines[-1].strip()[2:].strip()
            body = "\n".join(lines[:-1]).strip()
            return f"{body}\n\n*Tabella: {cap}*"
        return inner

    text = re.sub(r":::\s*\{#tbl-[^}]+\}\s*\n(.*?)\n:::", repl_tbl, text, flags=re.S)

    # Convert Quarto callouts: promote .callout-note proofs directly into body prose!
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

    # Escape bare '<' outside code blocks and math
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
    sec_map: dict[str, tuple[str, str]] = {}
    tikz_jobs: list[tuple[str, str]] = []

    for rel_qmd, out_rel_mdx, ch_num, _, canon_title in CHAPTER_PLAN:
        txt = (SRC_BOOK / rel_qmd).read_text(encoding="utf-8")
        url = f"/dynamic-courses/elettronica/{out_rel_mdx[:-4]}/"
        for sm in re.finditer(r"\{#(sec-[A-Za-z0-9_-]+)\}", txt):
            sec_map[sm.group(1)] = (canon_title, url)
        for fm in FIG_BLOCK_RE.finditer(txt):
            tikz_jobs.append((fm.group(1), extract_tikz_body(fm.group(2))))

    print(f"Compiling {len(tikz_jobs)} TikZ/CircuiTikZ figures to SVG...")
    created_svgs = compile_tikz_to_svgs(tikz_jobs)
    print(f"Converted {len(created_svgs)}/{len(tikz_jobs)} SVGs.")

    if DOCS_DIR.exists():
        shutil.rmtree(DOCS_DIR)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    for rel_qmd, out_rel_mdx, ch_num, order_in_part, canon_title in CHAPTER_PLAN:
        raw = (SRC_BOOK / rel_qmd).read_text(encoding="utf-8")
        body = re.sub(r"^#\s+[^\n]+\n", "", raw, count=1)

        def repl_fig(m: re.Match) -> str:
            fig_id = m.group(1)
            caption = clean_latex_for_title(m.group(3).strip())
            if fig_id in created_svgs:
                return (
                    f'<figure id="{fig_id}" className="dc-svg-wrap">\n'
                    f'  <img src="/dynamic-courses/diagrams/elettronica/{fig_id}.svg" alt="{caption}" />\n'
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
                return f"[la figura](#{full})"
            if kind == "tbl":
                return "la tabella di riferimento"
            if kind == "eq":
                return "l'equazione precedente"
            return full

        body = re.sub(r"(?<![A-Za-z0-9_])@(sec|fig|tbl|eq)-([A-Za-z0-9_-]+)", repl_ref, body)
        body = re.sub(r"^\s*---\s*$", "\n<Divider />\n", body, flags=re.M)
        body = sanitize_mdx_text(body)

        mm_md = build_mindmap_md(f"Cap. {ch_num}: {canon_title}", body).replace("`", "'")

        out_file = DOCS_DIR / out_rel_mdx
        out_file.parent.mkdir(parents=True, exist_ok=True)

        mdx = (
            "---\n"
            f'title: "{ch_num}. {canon_title}"\n'
            f'description: "Elettronica — Capitolo {ch_num}: {canon_title}"\n'
            "sidebar:\n"
            f"  order: {order_in_part}\n"
            "---\n\n"
            'import Divider from "@components/Divider.astro";\n'
            'import Callout from "@components/Callout.astro";\n'
            'import MindMap from "@components/MindMap.tsx";\n'
            'import Exercise from "@components/Exercise.tsx";\n'
            'import StepCheck from "@components/StepCheck.tsx";\n\n'
            f'<MindMap client:load lang="it" title="Mappa del Capitolo {ch_num}" markdown={{`{mm_md}`}} />\n\n'
            f"{body.strip()}\n"
        )
        out_file.write_text(mdx, encoding="utf-8")

    # Migrate Preface -> src/content/docs/elettronica/index.mdx
    idx_raw = (SRC_BOOK / "index.qmd").read_text(encoding="utf-8")
    idx_raw = re.sub(r"^#\s+Prefazione\s*\{\.unnumbered\}\s*\n", "", idx_raw)
    idx_raw = sanitize_mdx_text(idx_raw)
    idx_mdx = (
        "---\n"
        'title: "Elettronica (Microelettronica)"\n'
        'description: "Fisica dei Dispositivi, Transistori MOS, Amplificatori Analogici e Logica CMOS — L-8 UniCT"\n'
        "---\n\n"
        'import Divider from "@components/Divider.astro";\n'
        'import MindMap from "@components/MindMap.tsx";\n\n'
        '<MindMap client:load lang="it" title="Mappa Generale del Corso" markdown={`# Elettronica (L-8)\n'
        '  - Parte I: Fondamenti dei Dispositivi\n'
        '  - Parte II: Transistori MOS\n'
        '  - Parte III: Amplificatori Operazionali\n'
        '  - Parte IV: Amplificatori e Frequenza\n'
        '  - Parte V: Logica Combinatoria CMOS\n'
        '  - Parte VI: Sequenziali, Memorie e CAD`} />\n\n'
        f"{idx_raw.strip()}\n"
    )
    (DOCS_DIR / "index.mdx").write_text(idx_mdx, encoding="utf-8")
    print(f"Migrated {len(CHAPTER_PLAN)} chapters + Preface to {DOCS_DIR}")


if __name__ == "__main__":
    main()
