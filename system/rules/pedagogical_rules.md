# Pedagogical Rules & Interactive Standards

Every chapter page is designed for fast visual intuition, rigorous oral/written exam mastery, and interactive exploration.

---

### 1. The Mandatory 4-Pillar Pageless Chapter Architecture

Every chapter `.mdx` page opens with a collapsible `<MindMap />` component summarizing the chapter's high-level mental model, followed by four sections separated by `<Divider />`:

1. **Pillar 1 — Intuition & Physical Meaning (`<Divider label="1 · Intuition" />`):**
   - Plain-language explanation of what the phenomenon *is* physically and what engineering problem it solves. Zero premature formalism.
2. **Pillar 2 — Formal Definition & Derivation (`<Divider label="2 · Derivation (Oral Core)" />`):**
   - Exact mathematical definitions and proofs directly in body prose (never buried inside callout boxes).
   - Tag algebraic derivations as **Derivation / Oral Proof** so readers separate justification from execution steps.
3. **Pillar 3 — Operational Algorithm (`<Divider label="3 · Operational Algorithm (Written Core)" />`):**
   - One self-contained, step-by-step execution recipe.
   - **Single Source of Truth:** All operational lookup tables live **exclusively** here—never duplicated in Pillar 2.
4. **Pillar 4 — Worked Exam Archetype & Practice (`<Divider label="4 · Worked Archetype & Practice" />`):**
   - One complete hand-solved worked example showing every intermediate substitution, followed by `<Callout type="warning">` exam pitfalls, optional `<Callout type="bridge">` robotics applications, and inline `<Exercise>` blocks.

---

### 2. The "Pencil-on-Paper" Graphical Drafting Standard

Whenever a chapter teaches a graphical method (Bode Magnitude, Bode Phase, Phase Portraits, Stability Sets), Pillar 3 must explicitly answer:
1. **Axes & Window:** Axis scales (linear vs. log), units, and finite plotting window $[\omega_{\text{start}}, \omega_{\text{end}}]$.
2. **First Dot / Anchor:** Exact coordinates where the pencil touches the paper first.
3. **Next Vertices:** Exact vertex-to-vertex formula (including non-decade ratios).
4. **Connecting Geometry & Deviations:** Straight segments vs. smooth curves, and exact vertical offsets (e.g., $-3.01\text{ dB}$) separated cleanly from slope rules.

---

### 3. Interactive Visuals & Mind Maps

* **Chapter Mind Map (`<MindMap />`):** Every chapter includes a compact nested Markdown outline rendered via Markmap so students can scan and collapse the chapter's structure at a glance.
* **Interactive Simulators:** Use `<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />` (and custom React/SVG widgets) where students benefit from dragging poles, sweeping gain $K$, or toggling asymptotic vs. exact curves.
* **Static Diagrams:** Convert fixed structural/Venn/block diagrams into clean inline SVGs (or `dvisvgm` exports) inside `.dc-svg-wrap`.

---

### 4. Global Symbol Registry & Terminology Bridges

* Always obey `courses/<course-slug>/symbols.yaml`.
* Never recycle conflicting symbols across chapters (e.g., Routh row $s^2$ uses `[\alpha_1, \alpha_2]`, never `b_1, b_2`).
* Insert explicit 2-line terminology bridges whenever domain terms shift (`eigenvalues` $\leftrightarrow$ `polynomial roots` $\leftrightarrow$ `poles`; Evans $K$ vs. Bode $K_B$).

---

### 5. Callout Discipline & Zero Boilerplate

* `<Callout>` is strictly reserved for `warning` (Exam Pitfalls), `tip` (Quick-Reference Summaries *after* derivation), and `bridge` (Robotics/Engineering tie-ins).
* Never inject per-chapter `"Level 3 Omitted"` disclaimer boxes; state exam scope once in the course preface (`index.mdx`).
* Never hardcode legacy `Chapter X.Y` or `Exercise X.Y.Z` strings; use markdown links `[Section](/systems-theory/...)` and unified `Exercise N.k` numbering.
