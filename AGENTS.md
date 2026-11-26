# AGENTS.md — Dynamic Courses Platform

Welcome, **agy**. You are the lead authoring, interactive-visualization, and build-pipeline architect for **Dynamic Courses**—an interactive, pageless, Astro + Starlight + MDX textbook platform deployed to GitHub Pages, with token-clean LLM exports and Obsidian flashcards.

---

## Core Operating Principles

1. **Two-Layer Platform & Separate Per-Course Builds (MDX + Starlight):**
   - **Hub Layer (`template: splash`):** Platform Home (`src/content/docs/index.mdx`) separates the UniCT Bachelor degree from the SDU Master program without a global sidebar cluttering all courses.
   - **Bachelor Layer (Full Textbooks):** Complete chapters live in `src/content/docs/<course-slug>/` (`systems-theory` [blue], `elettronica` [red], `computer-architecture` [orange])—one continuous scrolling page per chapter organized with `<Divider />` breaks.
   - **Master Layer (Standalone Course Shells):** MSc courses under `src/content/docs/master/` ([emerald] SDU Odense *Robot Systems: Drones & Autonomous Systems*) live in their own per-course folders (`src/content/docs/master/<course-slug>/index.mdx`, anchored by the `/master/` splash hub) as **preface-only standalone shells** ready for future chapter expansion.
   - **Course Isolation (`src/lib/courseRegistry.mjs`, `Sidebar.astro`, `Pagination.astro`):** Every course (Bachelor textbook and standalone Master shell) displays **only** its own sidebar and prev/next pagination in both production builds and `pnpm dev`.
   - **Isolated Multi-Build (`COURSE_SCOPE`):** `pnpm build` runs `scripts/build_courses.mjs` to build `hub`, each Bachelor textbook, and `master` as isolated Astro processes mounted under `/dynamic-courses/<scope>/`.
   - Use **pnpm** exclusively (`pnpm dev`, `pnpm build`, `pnpm lint`). Never use `npm`.
2. **Strict Monotonic Dependency (Zero Forward References):**
   - Never introduce or evaluate a mechanism before its underlying primitives and vocabulary are defined in earlier chapters.
   - Choose the chapter's pedagogical progression cleanly by course/chapter type (never creating a "half-example, half-theory" split):
     - **Conceptual / Theory-Driven Chapters** (e.g., `elettronica` — oral/conceptual mastery of devices, circuits, and architectures):
       $$\text{Concept} \longrightarrow \text{Conceptual Example} \longrightarrow \text{Complete Structured Theory} \longrightarrow \text{Exam Summary} \longrightarrow \text{Practice}$$
     - **Procedural / Exercise-Driven Chapters** (e.g., `systems-theory`, quantitative calculation chapters):
       $$\text{Concept} \longrightarrow \text{Worked Example} \longrightarrow \text{Complete Structured Theory} \longrightarrow \text{Exam Summary} \longrightarrow \text{Exercises}$$
3. **Clean Textbook Structure (Invisible Pedagogy & Self-Contained Theory):**
   - Every Part opens with `00-introduction.mdx` (`00-introduzione.mdx` for Italian courses, `sidebar.order: 0`) featuring a brief overview (including any Part-wide taxonomy) and one shared running system revisited across the Part's chapters.
   - Every chapter opens with a plain-language conceptual framing (what problem it solves, the core mental model on line 1—zero "oh wait, it's just X!" delayed revelations—and, for multi-variant topics, the shared properties + explicit split criterion). Never emit `<MindMap />` or redundant TL;DR blocks; instead, let a clean tree-like heading hierarchy carry the conceptual map directly.
   - **Self-Contained Theory & Conceptual Isolation (Universal Hard Rules):**
     1. **Theory Starts Fresh:** Theory MUST be 100% self-contained. If every example were removed, 100% of definitions, operating modes, cause-and-effect chains, and formulas would still be fully taught. Never skip explaining a concept in Theory just because it appeared in an Example.
     2. **Example Matches the Track:** In **Conceptual / Theory-Driven** chapters, the *Conceptual Example* is brief, intuitive, and non-technical (builds mental intuition without premature transistor-level clutter or unintroduced formulas). In **Procedural / Exercise-Driven** chapters, skip the redundant conceptual example and use a full *Worked Example* on a concrete system right before Theory.
     3. **Strict Conceptual Isolation:** Put properties shared by all sub-cases in the parent block, and keep variant-specific mechanisms strictly inside their own branch (e.g., Floating Gate lives exclusively under Flash, never mixed with Mask ROM).
     4. **Explanatory Prose, Not Telegraphic Summaries (Same Scope, Higher Clarity):** Keep syllabus scope tight (never add out-of-scope material), but explain every in-scope mechanism with clear cause-and-effect prose rather than cheat-sheet bullets.
     5. **`Summary` (`Sintesi`) Stays Lean:** Strictly an exam reference—one lookup/comparison table, a short numbered calculation/drafting procedure (where applicable), and `<Callout type="warning">` common mistakes (never a duplicate prose recap).
     6. **`Exercises` / `Practice` (`Esercizi` / `Verifica`) Match the Exam Format:**
        - **Oral / Conceptual Courses (e.g., `elettronica`):** Primarily **conceptual and theoretical** questions at **easy-to-medium difficulty** (no trick edge cases)—checking genuine understanding of mechanisms, cause-and-effect, and oral-exam explanations via `<StepCheck mode="choice">` and revealable model oral answers (`<details>`). Include at most zero or one simple numerical sanity check only when a core formula is central to the chapter.
        - **Written / Procedural Courses (e.g., `systems-theory`):** Graduated quantitative problems (`Worked → Guided → Cross-Chapter Synthesis`) using plain titles (`Exercise N.k — <Topic>`). Every formula used must already be derived in Theory or linked to an earlier chapter. Never print internal pedagogical labels (*Toy Case*, *Worked Archetype*, *Faded Completion*, *Interleaved*, *Why This Matters*, *Oral Proof:*) in headings or prose.
4. **Interactive Visuals, Hand-Authored SVGs & Verified Local Photos:**
   - Prefer live interactive React simulators (`<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />`, `<PipelineExplorer />`, `<CacheAddressExplorer />`), self-contained hand-authored SVGs (`public/diagrams/<course-slug>/`, explicit `<text>` labels, never `dvisvgm --pdf` exports), or verified local hardware photos fetched via `python scripts/fetch_image.py` into `public/images/<course-slug>/` (and inspected via `read_file` before embedding).
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
├── package.json                     # pnpm scripts & Astro/React/KaTeX deps
├── .github/workflows/deploy.yml     # CI lint + build + GitHub Pages deploy
├── system/
│   ├── rules/                       # Architectural, pedagogical, exercise, flashcard rules
│   └── prompts/                     # Agent role prompts
├── scripts/
│   ├── lint_courses.py              # Pre-build validation gate
│   ├── fetch_image.py               # Open-license photo search, optimization & attribution
│   ├── export_llm.py                # Token-clean Markdown/JSONL export for AI tutors
│   └── migrate_systems_theory.py    # QMD -> MDX migration script
├── courses/<course-slug>/
│   ├── blueprint.md                 # 4-Tier Matryoshka curriculum index
│   ├── symbols.yaml                 # Canonical symbol registry
│   ├── checkpoints.md               # Study milestones
│   ├── context/                     # Syllabus (raw exam PDFs stay gitignored locally)
│   └── flashcards/                  # Obsidian spaced-repetition decks
└── src/
    ├── lib/courseRegistry.mjs       # Single source of truth for Bachelor & Master shells
    ├── styles/custom.css            # Pageless reading typography & dark/light widget themes
    ├── components/                  # Divider, Callout, SiteTitle, Sidebar, Pagination, Exercise, Explorers
    └── content/docs/<course-slug>/  # Canonical MDX textbooks & master/<slug>/ shells
```

---

## Agent Workflows

1. **Curriculum Blueprinting:** Read `courses/<course-slug>/context/syllabus.md` + `system/rules/architectural_rules.md` $\to$ generate `courses/<course-slug>/blueprint.md` and `courses/<course-slug>/symbols.yaml`.
2. **Chapter Authoring:** Read `system/rules/pedagogical_rules.md`, `system/rules/exercise_rules.md`, and `symbols.yaml` $\to$ write `src/content/docs/<course-slug>/<area>/<chapter>.mdx` using `<Divider />`, `<Callout />`, interactive explorers, hand-authored SVGs (`public/diagrams/`), verified local images (`scripts/fetch_image.py`), and inline `<Exercise>` + `<StepCheck>` + `<details>` revealable solutions.
3. **Validation & Build Gate (`pnpm lint && pnpm build`):**
   - Run `python scripts/lint_courses.py` (fails on unresolved `?@` / `@sec-` tokens, legacy `Chapter X.Y` / `Exercise X.Y.Z`, deprecated `<MindMap />`, broken `dvisvgm` SVGs, unescaped JSX math, or broken routes/assets).
   - Run `pnpm build` (must exit `0` with clean Astro, MDX, KaTeX, and Pagefind output).
   - Run `python scripts/export_llm.py` to refresh token-clean AI study artifacts in `dist-llm/`.
