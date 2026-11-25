# Pedagogical Rules & Interactive Standards

Every chapter page is designed for fast visual intuition, rigorous oral/written exam mastery, and interactive exploration.

---

### 1. Chapter & Part Structure (Invisible Pedagogy)

Teach via ordering and clarity, never by printing educational theory jargon on the student's page. **Never** use labels like *Why This Matters:*, *Toy Case*, *Derivation / Oral Proof:*, *Guided Lab:*, *Plain English:*, *Worked Archetype*, *Faded Completion*, *Interleaved Practice*, or *Anchor System* in headings or prose. Keep every heading plain and direct (`2–4` words, no colon theatrics).

* **Part Overview (`00-introduction.mdx` / `00-introduzione.mdx`, `sidebar.order: 0`):**
  Opens with an expanded `<MindMap />`, a short `## Introduction` (`## Introduzione`), a shared running example revisited across the Part's chapters, and the chapter links.

* **Chapter Page Structure:**
  Opens with `<MindMap client:load defaultCollapsed ... />`, one concise motivating paragraph under a plain 2–4 word `##` heading, and four `<Divider />` sections:

1. **`<Divider label="1 · Example" />` (`"1 · Esempio"`):**
   - Solve one concrete numerical system *first* with its diagram placed right next to the equations and clear physical meaning in normal prose.
   - Include the interactive explorer (with a 1–2 line prompt on what to adjust) and one inline `<StepCheck>`.
2. **`<Divider label="2 · Theory" />` (`"2 · Teoria"`):**
   - Move from the concrete example to general definitions and proofs in clean prose (short plain `###` headings like `### All-Pass Factorization`), plus an inline `<StepCheck>` check.
   - **Multi-Circuit / Multi-Mechanism Micro-Cycles (`Esempio → Teoria`):** When a single chapter covers 2 or more distinct circuits or architectures that share a theme (e.g., Memory Architectures: Matrix, SRAM 6T, DRAM 1T-1C, ROM/Flash), never write a partial example for just one circuit at the top leaving the rest as a wall of abstract theory. Instead, organize each circuit as its own numbered `<Divider />` section containing a complete concrete **`### Esempio — <Circuit>`** (with its schematic figure, full operational walkthrough, and `<StepCheck>`) immediately followed by its formal **`### Teoria — <Circuit>`** (general equations and derivations). **Never** describe this structural choice or mention "micro-cicli", "Esempio → Teoria", or "esame orale" in the chapter introduction or prose — teach purely through the domain content (Invisible Pedagogy).
3. **`<Divider label="3 · Summary" />` (`"3 · Sintesi"`):**
   - Single-source-of-truth lookup table (never duplicated in Theory), a numbered procedure (including *Pencil-on-Paper* plotting rules), a brief list of key proofs, and `<Callout type="warning" title="Common Mistakes">`.
4. **`<Divider label="4 · Exercises" />` (`"4 · Esercizi"`):**
   - Progress quietly from one complete worked problem (`Exercise N.1`), to a partially guided problem (`Exercise N.2`), to mixed cross-chapter problems (`Exercise N.3+`), using plain titles (`Exercise 19.1 — Transport Delay Margin`).

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

### 4. Global Symbol Registry, Terminology Bridges & Cross-Chapter Continuity

* Always obey `courses/<course-slug>/symbols.yaml`. Use the exact established symbols for open-loop vs. closed-loop functions (e.g., $G(s), H(s), L(s), W_{\text{CL}}(s)$) instead of inventing ad-hoc conflicting notation across chapters.
* Never recycle conflicting symbols across chapters (e.g., Routh row $s^2$ uses `[\alpha_1, \alpha_2]`, never `b_1, b_2`).
* Insert explicit 2-line terminology bridges whenever domain terms or symbols shift (`eigenvalues` $\leftrightarrow$ `polynomial roots` $\leftrightarrow$ `poles`; Evans $K$ vs. Bode $K_B$; Ch. 3 closed-loop $W(s)$ vs. Part V open-loop $L(s)$ and closed-loop $W_{\text{CL}}(s)$).
* **Explicit Reference Link-Backs & Visual Anchoring:** Whenever a chapter builds on a previously defined circuit, feedback topology, or theorem (e.g., unity negative feedback, Initial Value Theorem, or state-space similarity transforms), explicitly link back to the defining chapter (`/dynamic-courses/...`) and show or reference the canonical architecture diagram rather than relying on unexplained shorthand such as `"in feedback"`.

---

### 5. Callout Discipline, Typography & Zero Boilerplate

* `<Callout>` is strictly reserved for `warning` (Exam Pitfalls), `tip` (Quick-Reference Summaries *after* derivation), and `bridge` (Robotics/Engineering tie-ins).
* Never inject per-chapter `"Level 3 Omitted"` disclaimer boxes; state exam scope once in the course preface (`index.mdx`).
* Never hardcode legacy `Chapter X.Y` or `Exercise X.Y.Z` strings; use markdown links `[Section](/systems-theory/...)` and unified `Exercise N.k` numbering.
* **Keyword-Only Bold Discipline:** Use `**bold**` strictly for short key terms, vocabulary, or list lead-in labels (1–4 words). Never wrap whole clauses, full sentences, or multi-sentence blocks in `**...**`.
