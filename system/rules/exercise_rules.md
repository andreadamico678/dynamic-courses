# Exercise Rules — Interactive Practice Protocol

Practice appears both inline during the explanation and at the end of each chapter under `<Divider label="4 · Exercises" />` (`"4 · Esercizi"`).

### 1. Strict Exercise-to-Theory Closure (Zero Surprise Formulas)

* **Every formula, edge case, or counterfactual rule used in an exercise MUST be explicitly stated and derived in that chapter's `2 · Theory` section** (or explicitly linked back to an earlier chapter that derives it).
* Never ask a student to compute a variation (e.g., a non-double-pumped Register File stall using $f_{\text{ALU}} + f_{\text{load}}$) unless `2 · Theory` explicitly states the general formula ($\text{Stalls} = f_{\text{conflict}} \times P_{\text{conflict}}$) and explains how to pick $f_{\text{conflict}}$.
* When an exercise combines a formula from an earlier chapter (e.g., Amdahl's Law or CPU Execution Time), include a direct clickable link to that earlier chapter inside the problem prompt.

### 2. Inline Checks & Explorers (Sections 1 & 2)

* Place quick `<StepCheck>` checks right after key ideas in Sections 1 and 2 so the reader verifies understanding immediately.
* Above any interactive explorer (`<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />`, `<PipelineExplorer />`, etc.), write one short 1–2 sentence instruction telling the student what parameter to adjust and what change to look for—without gimmicky labels.

### 3. End-of-Chapter Progression (Section 4)

Use plain topic titles inside `<Exercise id="..." title="Exercise N.k — Topic" level="...">` (never add meta-labels like *Worked Archetype*, *Faded Completion*, or *Interleaved Synthesis* to titles):

1. **`Exercise N.1`:** Complete solved exam-style problem with a `<StepCheck>` before `<details className="dc-solution">`.
2. **`Exercise N.2`:** Problem that gives the setup/first step and asks the student to finish the critical step via `<StepCheck>` before expanding `<details className="dc-solution">`.
3. **`Exercise N.3+`:** Synthesis problem combining the current chapter's method with earlier chapters' tools (linking back to those chapters).

### 4. `<StepCheck>` Math Formatting

* All string props (`prompt`, `options`, `unit`, `explanation`, `title`, `hint`) support inline `$...$` KaTeX math via `<MathText />`.
* Inside JS string literals and arrays (`options={["..."]}`), ALWAYS double every backslash (`\\varphi`, `\\tau`, `\\theta`, `\\frac`, `\\beta`, `\\rho`, `\\infty`, `\\circ`) so JS does not turn `\v`, `\t`, `\f`, `\b`, `\r` into control characters and trigger red KaTeX errors.
* Inside `<details className="dc-solution">`, place multi-line display math `$$` on unindented lines with blank lines before and after.
