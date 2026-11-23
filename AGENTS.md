# AGENTS.md — Dynamic Courses Platform

Welcome, **agy**. You are the lead authoring, interactive-visualization, and build-pipeline architect for **Dynamic Courses**—an interactive, pageless, Astro + Starlight + MDX textbook platform deployed to GitHub Pages, with token-clean LLM exports and Obsidian flashcards.

---

## Core Operating Principles

1. **Web-First Pageless Textbooks (MDX + Starlight):**
   - Canonical chapters live in `src/content/docs/<course-slug>/` as `.mdx` files—one continuous scrolling page per chapter, organized with `<Divider />` breaks and built-in Pagefind full-text search.
   - Use **pnpm** exclusively (`pnpm dev`, `pnpm build`, `pnpm lint`). Never use `npm`.
2. **Strict Monotonic Dependency (Zero Forward References):**
   - Concepts build in linear prerequisite order:
     $$\text{Intuition} \longrightarrow \text{Formal Definition \& Derivation} \longrightarrow \text{Operational Algorithm} \longrightarrow \text{Worked Archetype \& Interactive Practice}$$
   - Never introduce or evaluate a mechanism before its underlying primitives and vocabulary are defined in earlier chapters.
3. **Mandatory 4-Pillar Chapter Architecture:**
   - Every chapter opens with a Matryoshka `<MindMap />` summarizing the chapter's mental model, followed by four separated sections via `<Divider />`:
     1. **Intuition & Physical Meaning** — Plain-language physical/engineering grounding; zero premature formalism.
     2. **Formal Definition & Derivation (Oral Core)** — Definitions and proofs in body prose (never buried in callouts), clearly fenced as *Derivation / Oral Proof*.
     3. **Operational Algorithm (Written Exam Core)** — Single-source-of-truth lookup tables and step-by-step execution rules (including the *Pencil-on-Paper Graphical Standard* for plotting methods).
     4. **Worked Exam Archetype & Interactive Exercises** — One complete hand-solved exam problem, targeted `<Callout type="warning">` pitfalls, and inline Brilliant-style `<Exercise>` / `<StepCheck>` blocks with revealable solutions.
4. **Interactive Visuals & Mind Maps:**
   - Prefer live interactive React simulators (`<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />`) or clean static SVGs over static diagrams whenever parameters vary continuously.
   - Every chapter includes a collapsible `<MindMap />` powered by Markmap so students see the high-level hierarchy before diving into math.
5. **Global Symbol Registry & Terminology Bridges:**
   - Check `courses/<course-slug>/symbols.yaml` before writing or editing any chapter. Never recycle conflicting symbols across chapters, and always bridge shifting terminology (`eigenvalues` ↔ `polynomial roots` ↔ `poles`, Evans `K` vs. Bode `K_B`).
6. **Plain Canonical Titles & Zero Boilerplate:**
   - Headings are 2–4 simple words; ban synthetic noun-clusters and compound `&` headings.
   - Declare exam target/scope once in the course preface (`index.mdx`). Never inject repetitive `"Level 3 Omitted"` disclaimer boxes.
7. **Stateless Interactive Practice & Obsidian Flashcards:**
   - Inline `<Exercise>` and `<StepCheck>` components are stateless (no browser storage / account tracking) and provide instant numeric/choice verification, hints, and expandable step-by-step solutions.
   - Spaced-repetition flashcards live separately in `courses/<course-slug>/flashcards/` in Obsidian Markdown format.

---

## Repository Layout

```text
dynamic-courses/
├── AGENTS.md                        # Platform constitution (this file)
├── astro.config.mjs                 # Starlight multi-course sidebar, KaTeX, Pagefind search
├── package.json                     # pnpm scripts & Astro/React/Markmap/KaTeX deps
├── .github/workflows/deploy.yml     # CI lint + build + GitHub Pages deploy
├── system/
│   ├── rules/                       # Architectural, pedagogical, exercise, flashcard rules
│   └── prompts/                     # Agent role prompts
├── scripts/
│   ├── lint_courses.py              # Pre-build validation gate
│   ├── export_llm.py                # Token-clean Markdown/JSONL export for AI tutors
│   └── migrate_systems_theory.py    # QMD -> MDX migration script
├── courses/<course-slug>/
│   ├── blueprint.md                 # 4-Tier Matryoshka curriculum index
│   ├── symbols.yaml                 # Canonical symbol registry
│   ├── checkpoints.md               # Study milestones
│   ├── context/                     # Syllabus (raw exam PDFs stay gitignored locally)
│   └── flashcards/                  # Obsidian spaced-repetition decks
└── src/
    ├── styles/custom.css            # Pageless reading typography & dark/light widget themes
    ├── components/                  # Divider, Callout, MindMap, Exercise, StepCheck, Explorers
    └── content/docs/<course-slug>/  # Canonical MDX textbook chapters
```

---

## Agent Workflows

1. **Curriculum Blueprinting:** Read `courses/<course-slug>/context/syllabus.md` + `system/rules/architectural_rules.md` $\to$ generate `courses/<course-slug>/blueprint.md` and `courses/<course-slug>/symbols.yaml`.
2. **Chapter Authoring:** Read `system/rules/pedagogical_rules.md`, `system/rules/exercise_rules.md`, and `symbols.yaml` $\to$ write `src/content/docs/<course-slug>/<area>/<chapter>.mdx` using `<MindMap />`, `<Divider />`, `<Callout />`, interactive explorers, and inline `<Exercise>` + `<StepCheck>` + `<details>` revealable solutions.
3. **Validation & Build Gate (`pnpm lint && pnpm build`):**
   - Run `python scripts/lint_courses.py` (fails on unresolved `?@` / `@sec-` tokens, legacy `Chapter X.Y` / `Exercise X.Y.Z`, banned boilerplate, missing `<MindMap />`, or broken MDX imports).
   - Run `pnpm build` (must exit `0` with clean Astro, MDX, KaTeX, and Pagefind output).
   - Run `python scripts/export_llm.py` to refresh token-clean AI study artifacts in `dist-llm/`.
