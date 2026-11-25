# Pedagogical Rules & Interactive Standards

Every chapter page is designed for fast visual intuition, rigorous written/oral exam mastery, and zero friction when studying.

---

### 1. Chapter & Part Structure (Invisible Pedagogy)

Teach via ordering and clarity, never by printing educational theory jargon on the student's page. **Never** use labels like *Why This Matters:*, *Toy Case*, *Derivation / Oral Proof:*, *Guided Lab:*, *Plain English:*, *Worked Archetype*, *Faded Completion*, *Interleaved Practice*, *Anchor System*, or parenthetical meta-tags like *(Conceptual)* or *(Oral Core)* in headings or prose. Keep every heading plain and direct (`2–5` words, no colon theatrics).

* **Part Overview (`00-introduction.mdx` / `00-introduzione.mdx`, `sidebar.order: 0`):**
  Opens with `## Introduction` (`## Introduzione`), any cross-chapter taxonomy shared across the Part (never bury a Part-wide taxonomy inside one chapter), one shared running example revisited across the Part's chapters, and the chapter links.

* **Chapter Page Structure:**
  Opens with one concise motivating paragraph under a plain 2–4 word `##` heading, and four `<Divider />` sections:

1. **`<Divider label="1 · Example" />` (`"1 · Esempio"`):**
   - Solve one concrete numerical system *first* with its diagram placed right next to the equations and clear physical meaning in normal prose.
   - Include the interactive explorer (with a 1–2 line prompt on what to adjust) when applicable, plus one inline `<StepCheck>`.
2. **`<Divider label="2 · Theory" />` (`"2 · Teoria"`):**
   - **Connected Progression Required:** Never drop disconnected topic headings back-to-back. Open `2 · Theory` (or its first subsection) with 1–2 sentences stating *how the subsections relate* (e.g., general rule $\to$ specific hardware fixes, or baseline $\to$ optimization).
   - **Complete Formula Closure:** Every formula, edge case, or variation tested in `4 · Exercises` MUST be explicitly stated and derived in `2 · Theory` (or explicitly linked back to the earlier chapter that derives it). Never spring an unexplained formula inside an exercise or solution.
   - **No Duplication:** Never explain the same mechanism twice under different headings in the same chapter.
   - **Multi-Circuit / Multi-Mechanism Micro-Cycles (`Esempio → Teoria`):** When a single chapter covers 2 or more distinct circuits or architectures that share a theme (e.g., Memory Architectures), organize each circuit as its own numbered `<Divider />` section containing a concrete `### Esempio — <Circuit>` immediately followed by its formal `### Teoria — <Circuit>`, without printing meta-terms like "micro-cicli".
   - Include an inline `<StepCheck>` check after the core result.
3. **`<Divider label="3 · Summary" />` (`"3 · Sintesi"`):**
   - Keep this section strictly as a **lean exam reference**, never a repetitive prose recap of `2 · Theory` (students should synthesize prose summaries in their own words):
     - One single-source lookup table (never duplicated in Theory).
     - One numbered calculation / drafting procedure (including *Pencil-on-Paper* rules for graphical topics).
     - `<Callout type="warning" title="Common Mistakes">` listing high-frequency exam/decoy traps.
     - Omit repetitive bullet-list prose recaps (`### Key Mechanisms` / `### Concetti Chiave`). Only include a brief proof checklist if oral derivations are directly required by that course's exam.
4. **`<Divider label="4 · Exercises" />` (`"4 · Esercizi"`):**
   - Progress quietly from one complete worked problem (`Exercise N.1`), to a partially guided problem (`Exercise N.2`), to mixed cross-chapter problems (`Exercise N.3+`), using plain titles (`Exercise 15.1 — Unified Memory Versus Split Caches`).

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
