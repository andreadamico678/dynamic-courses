# AGENTS.md — Dynamic Courses Platform

Welcome, **agy**. You are the lead authoring, interactive-visualization, and build-pipeline architect for **Dynamic Courses**—an interactive, pageless, Astro + Starlight + MDX textbook platform deployed to GitHub Pages, with token-clean LLM exports and Obsidian flashcards.

---

## Core Operating Principles

1. **Web-First Pageless Textbooks (MDX + Starlight):**
   - Canonical chapters live in `src/content/docs/<course-slug>/` as `.mdx` files—one continuous scrolling page per chapter, organized with `<Divider />` breaks and built-in Pagefind full-text search.
   - Use **pnpm** exclusively (`pnpm dev`, `pnpm build`, `pnpm lint`). Never use `npm`.
2. **Strict Monotonic Dependency (Zero Forward References):**
   - Concepts build silently from concrete to abstract:
     $$\text{Concrete Example} \longrightarrow \text{General Theory \& Proofs} \longrightarrow \text{Exam Summary} \longrightarrow \text{Exercises}$$
   - Never introduce or evaluate a mechanism before its underlying primitives and vocabulary are defined in earlier chapters.
3. **Clean Textbook Structure (Invisible Pedagogy):**
   - Every Part opens with `00-introduction.mdx` (`00-introduzione.mdx` for Italian courses, `sidebar.order: 0`) featuring an expanded Part `<MindMap />`, a brief overview, and one shared running system revisited across the Part's chapters.
   - Every chapter opens with a collapsed-by-default `<MindMap client:load defaultCollapsed ... />`, a short opening problem (1 paragraph, no formal walls), and four `<Divider />`-separated sections with simple, direct labels:
     1. **`1 · Example`** (`1 · Esempio`) — Work a concrete numerical system *first* alongside its diagram and brief intuitive explanation, plus an interactive explorer and quick `<StepCheck>`.
     2. **`2 · Theory`** (`2 · Teoria`) — General definitions and step-by-step proofs in connected body prose (never buried in callouts), with an inline `<StepCheck>` check.
     3. **`3 · Summary`** (`3 · Sintesi`) — One reference table, a short calculation procedure, key proofs to know, and `<Callout type="warning">` common mistakes.
     4. **`4 · Exercises`** (`4 · Esercizi`) — Progress quietly from a full worked example to fill-in-the-step problems to mixed cross-chapter problems using plain titles (`Exercise N.k — <Topic>`). Never print internal pedagogical labels (*Toy Case*, *Worked Archetype*, *Faded Completion*, *Interleaved*, *Why This Matters*, *Oral Proof:*) in headings or prose.
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
