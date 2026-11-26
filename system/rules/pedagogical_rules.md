# Pedagogical Rules & Interactive Standards

Every chapter page is designed for fast visual intuition, rigorous written/oral exam mastery, and zero friction when studying.

---

### 1. Chapter & Part Structure (Invisible Pedagogy & Two-Track Flow)

Teach via ordering, conceptual isolation, and clear cause-and-effect prose—never by printing educational theory jargon on the student's page. **Never** use labels like *Why This Matters:*, *Toy Case*, *Derivation / Oral Proof:*, *Guided Lab:*, *Plain English:*, *Worked Archetype*, *Faded Completion*, *Interleaved Practice*, *Anchor System*, or parenthetical meta-tags like *(Conceptual)* or *(Oral Core)* in headings or prose. Keep every heading plain and direct (`2–5` words, no colon theatrics). Do **not** print redundant ASCII mind maps, `<MindMap />`, or TL;DR blocks—let the clean tree-like heading hierarchy carry the structure directly.

* **Part Overview (`00-introduction.mdx` / `00-introduzione.mdx`, `sidebar.order: 0`):**
  Opens with `## Introduction` (`## Introduzione`), any cross-chapter taxonomy shared across the Part (never bury a Part-wide taxonomy inside one chapter), one shared running example revisited across the Part's chapters, and the chapter links.

* **Choose One of Two Chapter Tracks (Never Mix Half-Example / Half-Theory):**

  #### Track A — Conceptual / Theory-Driven Chapters (e.g., *Elettronica*, architectural & physical-device chapters)
  $$\text{Concept} \longrightarrow \text{Conceptual Example} \longrightarrow \text{Complete Structured Theory} \longrightarrow \text{Summary} \longrightarrow \text{Practice}$$

  1. **Concept (Opening / Section Lead-In):**
     - State the **plain mental model first** (1 short paragraph: what problem this solves, what it fundamentally is—eliminating any "oh wait, it's just X!" delayed realization).
     - When a topic splits into sub-families (e.g., Mask ROM vs. Flash, SRAM vs. DRAM), state *only* what is 100% shared by all sub-families plus the **single criterion that divides them**.
  2. **Conceptual Example (Intuition Only — Lightweight & Non-Technical):**
     - Present one brief, intuitive concrete scenario (e.g., "1M wires vs. 2048 wires" or a high-level bit trace) that makes the core idea click *before* technical details.
     - **Hard Boundary:** Keep the conceptual example light and jargon-free. **Never** cram transistor-level derivations, premature edge cases, or unintroduced formulas into it, and **never** use it to replace part of the Theory section.
  3. **Complete Structured Theory (Starts Fresh, 100% Self-Contained):**
     - Start fresh from the ground up and teach *every* concept, operating mode, physical cause-and-effect chain, and formula completely on its own.
     - **Strict Conceptual Isolation (Tree-Like Hierarchy):** Mirror a clean conceptual tree directly in your headings (`###` / `####`) and nested prose—shared parent properties live in the parent block; branch-specific mechanisms live *exclusively* inside their own branch (e.g., Floating Gate and block erase belong strictly under Flash, never in the shared intro or Mask ROM).
     - **Full Explanatory Prose, Not Cheat-Sheet Bullets:** Keep syllabus scope strictly unchanged (no extra out-of-scope content), but unpack every in-scope mechanism with explicit cause-and-effect reasoning (*why* A causes B causes C) so a student can learn directly from the page without consulting external sources.
     - **Quantitative Plug-Ins:** If a conceptual chapter derives a formula (e.g., DRAM charge sharing $\Delta V_{BL}$, CMOS threshold $V_M$), place any concrete numerical check *after* deriving the formula (inside Theory or in Exercises), never unintroduced before Theory.
     - Include diagrams (`<figure className="dc-svg-wrap">`), interactive explorers (when applicable), and inline `<StepCheck>` checks right where each mechanism lands.

  #### Track B — Procedural / Exercise-Driven Chapters (e.g., *Systems Theory / Automatica*, quantitative calculation chapters)
  $$\text{Concept} \longrightarrow \text{Worked Example} \longrightarrow \text{Complete Structured Theory} \longrightarrow \text{Summary} \longrightarrow \text{Exercises}$$

  1. **Concept (Opening Framing):** One concise 1–2 paragraph opening introducing the plain mental model and what problem the method solves using prior-chapter vocabulary. Skip a separate conceptual example (redundant when a full worked example follows).
  2. **`<Divider label="1 · Example" />` (`"1 · Esempio"`):**
     - Solve one complete concrete numerical/modeling system *first* with its diagram placed right next to the equations and clear physical meaning in normal prose.
     - Include the interactive explorer (with a 1–2 line prompt on what to adjust) when applicable, plus one inline `<StepCheck>`.
  3. **`<Divider label="2 · Theory" />` (`"2 · Teoria"`):**
     - **Starts Fresh & 100% Self-Contained:** Even though a worked example appeared above, Theory MUST stand completely on its own—open with 1–2 sentences framing how the subsections connect, then derive every general definition, rule, edge case, and formula cleanly in connected prose. Never omit a rule or mechanism because it was touched in `1 · Example`.
     - Include an inline `<StepCheck>` check after the core result.

* **Multi-Architecture / Comparative Chapters (e.g., Memory Architectures, Sequential Circuits):**
  - Open with `## Introduzione` (`## Introduction`) stating the shared problem and the top-level taxonomy/split criterion separating the families.
  - Dedicate one numbered `<Divider />` section to each family/architecture (without printing meta-terms like "micro-cicli"). Inside each `<Divider />` section, follow the chapter's track cleanly:
    - **Track A:** *Shared Concept & Split Criterion → Brief Conceptual Example (when helpful; omit if trivial) → Complete, Tree-Isolated Theory (with diagrams + `<StepCheck>`)*.
    - **Track B:** *Brief Concept → Worked Example → Complete Self-Contained Theory (with diagrams + `<StepCheck>`)*.

* **Universal Theory & End-of-Chapter Rules (Both Tracks):**
  - **Self-Contained Theory Litmus Test:** Mentally delete every Example block. If *any* definition, operating mode, physical reason, or formula is now missing, Theory is incomplete and must be fixed. ("No Duplication" means never repeating the same prose under two Theory headings or inside `Summary`; it is **never** an excuse to omit theory that was previewed in an Example.)
  - **Complete Formula Closure:** Every formula, edge case, or variation tested in Exercises MUST be explicitly stated and derived in Theory (or explicitly linked back to the earlier chapter that derives it). Never spring an unexplained formula inside an exercise or solution.
  - **`<Divider label="... · Summary" />` (`"... · Sintesi"`):**
    Keep this section strictly as a **lean exam reference**, never a repetitive prose recap of Theory (now that the body teaches thoroughly, a crisp reference table works cleanly):
    - One single-source comparison/formula lookup table (never duplicated in Theory).
    - One numbered calculation / drafting procedure (including *Pencil-on-Paper* rules for graphical topics) when the chapter teaches a procedure.
    - `<Callout type="warning" title="Common Mistakes">` listing high-frequency exam/decoy traps.
    - Omit repetitive bullet-list prose recaps (`### Key Mechanisms` / `### Concetti Chiave`). Only include a brief proof checklist if oral derivations are directly required by that course's exam.
  - **`<Divider label="... · Exercises" />` (`"... · Esercizi"` / `"... · Verifica"`):**
    Match the practice style to the course's exam format (see `system/rules/exercise_rules.md`):
    - **Track A (Conceptual / Oral-Exam Chapters, e.g. *Elettronica*):** Primarily **conceptual and theoretical** questions at **easy-to-medium difficulty** (no obscure edge cases), using `<StepCheck mode="choice">` and clear revealable oral-style explanations in `<details className="dc-solution">` to check genuine understanding. Keep numerical calculations minimal (0–1 simple core sanity check only where a formula is central).
    - **Track B (Procedural / Written-Exam Chapters, e.g. *Systems Theory*):** Progress quietly from one complete worked problem (`Exercise N.1`), to a partially guided problem (`Exercise N.2`), to mixed cross-chapter problems (`Exercise N.3+`), using plain titles (`Exercise 15.1 — Unified Memory Versus Split Caches`).

---

### 2. The "Pencil-on-Paper" Graphical Drafting Standard

Whenever a chapter teaches a graphical method (Bode Magnitude, Bode Phase, Phase Portraits, Stability Sets), Section 3 must explicitly specify:
1. **Axes & Window:** Axis scales (linear vs. log), units, and finite plotting window $[\omega_{\text{start}}, \omega_{\text{end}}]$.
2. **First Dot / Anchor:** Exact coordinates where the pencil touches the paper first.
3. **Next Vertices:** Exact vertex-to-vertex formula (including non-decade ratios).
4. **Connecting Geometry & Deviations:** Straight segments vs. smooth curves, and exact vertical offsets (e.g., $-3.01\text{ dB}$) separated cleanly from slope rules.

---

### 3. Visuals, Interactive Simulators & Image Sourcing Workflow

Do not emit redundant text-outline mind maps (`<MindMap />` is deprecated and disallowed by the linter). Instead, pair equations with real visual aids chosen from three tiers:

1. **Interactive Simulators:** `<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />`, `<PipelineExplorer />`, `<CacheAddressExplorer />`, etc. where students vary parameters live.
2. **Technical Vector Diagrams (`public/diagrams/<course-slug>/<slug>.svg`):** Self-contained hand-authored SVGs with explicit `<text>` labels, explicit `viewBox`, `#fff` background, and zero overlapping text inside `<figure className="dc-svg-wrap">`. Never export via `dvisvgm --pdf --no-fonts`.
3. **Real Hardware Photos & Editorial Illustrations (`public/images/<course-slug>/<slug>.webp`):**
   - **Never hotlink external URLs** (they break, get blocked, or lack attribution).
   - **Sourcing Photos:** Run `python scripts/fetch_image.py search "<keywords>"` (queries Wikimedia Commons & Openverse for openly licensed `>= 600px` raster photos), pick the cleanest result, and download/optimize via `python scripts/fetch_image.py fetch <course> <slug> "<url>" --caption "..."` (auto-converts to WebP/JPEG `<= 1400px`, strips EXIF, logs attribution to `public/images/<course>/ATTRIBUTION.md`).
   - **Custom Illustrations:** If no clean open photo exists, generate an image using the `image-generator` subagent into `public/images/<course-slug>/<slug>.png`.
   - **Mandatory Visual Inspection:** Always inspect the saved file in `public/images/` with `read_file` before embedding it in MDX via `<figure className="dc-img-wrap">` to confirm subject accuracy, clarity, and absence of watermarks.

---

### 4. Global Symbol Registry, Terminology Bridges & Cross-Chapter Continuity

* Always obey `courses/<course-slug>/symbols.yaml`. Never invent ad-hoc conflicting notation across chapters.
* Insert explicit 2-line terminology bridges whenever domain terms or symbols shift (`eigenvalues` $\leftrightarrow$ `polynomial roots` $\leftrightarrow$ `poles`; Evans $K$ vs. Bode $K_B$).
* **Explicit Reference Link-Backs:** Whenever a chapter relies on a prior circuit, architecture, or theorem, explicitly link back to the defining chapter (`/dynamic-courses/...`).

---

### 5. Math Formatting, Callouts & Typography

* **Display Math Delimiters (`remark-math` Safety):** Always place multi-line display math `$$` on **unindented lines with blank lines before and after** (`\n\n$$\n...\n$$\n\n`). Never indent `$$\begin{aligned}` or `$$\begin{array}` inside Markdown list items—indented multi-line `$$` fails to parse and renders red `katex-error` text.
* **JSX Prop Math Escaping:** Inside JS string arrays or JSX expressions (`options={["..."]}`), ALWAYS double-escape LaTeX backslashes (`\\varphi`, `\\tau`, `\\theta`, `\\frac`, `\\beta`, `\\rho`, `\\infty`) so JavaScript does not interpret `\v`, `\t`, `\f`, `\b`, or `\r` as control characters.
* **No Raw Pipes `|` Inside Markdown Table Math:** Use `\lvert ... \rvert` or `\mid` inside `$...$` in Markdown table rows.
* `<Callout>` is strictly reserved for `warning` (Exam Pitfalls), `tip` (Quick-Reference Notes *after* derivation), and `bridge` (Engineering/Career tie-ins).
* Never inject `"Level 3 Omitted"` boilerplate or legacy `Chapter X.Y` / `Exercise X.Y.Z` strings.
* **Keyword-Only Bold:** Use `**bold**` strictly for short key terms (1–4 words) or list lead-in labels—never bold full sentences or paragraphs.
