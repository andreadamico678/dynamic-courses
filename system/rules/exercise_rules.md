# Exercise Rules — Interactive Practice Protocol

Practice appears both inline during the explanation and at the end of each chapter under the final `<Divider label="... · Exercises" />` (`"... · Esercizi"`).

### 1. Strict Exercise-to-Theory Closure (Zero Surprise Formulas)

* **Every formula, edge case, or counterfactual rule used in an exercise MUST be explicitly stated and derived in that chapter's Theory section** (or explicitly linked back to an earlier chapter that derives it).
* Never ask a student to compute a variation (e.g., a non-double-pumped Register File stall using $f_{\text{ALU}} + f_{\text{load}}$) unless Theory explicitly states the general formula ($\text{Stalls} = f_{\text{conflict}} \times P_{\text{conflict}}$) and explains how to pick $f_{\text{conflict}}$.
* When an exercise combines a formula from an earlier chapter (e.g., Amdahl's Law or CPU Execution Time), include a direct clickable link to that earlier chapter inside the problem prompt.

### 2. Inline Checks & Explorers (Example & Theory Sections)

* Place quick `<StepCheck>` checks right after key ideas in the Example and Theory sections so the reader verifies understanding immediately.
* Above any interactive explorer (`<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />`, `<PipelineExplorer />`, etc.), write one short 1–2 sentence instruction telling the student what parameter to adjust and what change to look for—without gimmicky labels.

### 3. End-of-Chapter Progression (Match the Track & Exam Format)

Use plain topic titles inside `<Exercise id="..." title="Exercise N.k — Topic" level="...">` (never add meta-labels like *Worked Archetype*, *Faded Completion*, *Oral Proof:*, or *Interleaved Synthesis* to titles).

#### Track A — Conceptual / Oral-Exam Courses (e.g., *Elettronica*)
* **Goal:** Verify genuine understanding of concepts, mechanisms, cause-and-effect, and clear oral explanation—NOT numerical drilling or trick edge cases.
* **Difficulty:** Keep questions **easy to medium** (`Base` / `Intermedio`). Avoid convoluted algebraic edge cases or obscure corner traps.
* **Structure (2–4 concise items):**
  1. **Core Mechanism & Cause-and-Effect Checks (`mode="choice"`):** Ask *why* a circuit or device behaves a certain way, or how changing one physical quantity affects another.
  2. **Conceptual Distinctions & Comparisons:** Test the clean boundaries established in Theory (e.g., Mask ROM vs. Flash, write-back vs. refresh, Latch vs. Flip-Flop, NOR vs. NAND) using `<StepCheck mode="choice">` + a concise, clear model oral explanation inside `<details className="dc-solution">`.
  3. **Minimal Quantitative Checks (Optional, 0–1 max):** Include a simple, direct plug-in calculation *only* if a core formula is central to the chapter (and never make numerical computation the focus of the section).

#### Track B — Procedural / Written-Exam Courses (e.g., *Systems Theory / Automatica*, *Computer Architecture*)
Choose the exercise format that matches what the written exam actually grades—**never force a single-number `<StepCheck>` box where the real deliverable is a state table, assembly program, or open-ended written answer**:
1. **Quantitative Exam Drills** (numeric/choice `<StepCheck>` + `<details className="dc-solution">`): Use `<StepCheck>` when the exam answer is a concrete number, expression, or set/bit count (`CPI`, `AMAT`, bounds, K-map/FSM counts), progressing from `Exercise N.1` (worked) $\to$ `N.2` (guided) $\to$ `N.3+` (synthesis).
2. **Full Written & Lab Artifacts** (`<Exercise>` + `<details className="dc-solution">`, optional `<StepCheck>`): When the exam requires producing a full artifact (4-column Mealy/Moore table, 6-state JK/SR synthesis, or complete C-to-RISC-V `.asm` program), provide the full exam prompt, a brief self-check rubric, and the complete worked table/code inside `<details className="dc-solution">`.
3. **Written Theory Essays** (no forced numeric `<StepCheck>`): When the exam includes an open-ended written theory question (such as *Computer Architecture* Q5), give an authentic exam prompt and include inside `<details className="dc-solution">` both a concise **Grading Checklist** (required points for full marks) and a **Model Written Answer** (with any required timing table or before/after code snippet).

### 4. `<StepCheck>` Math Formatting

* All string props (`prompt`, `options`, `unit`, `explanation`, `title`, `hint`) support inline `$...$` KaTeX math via `<MathText />`.
* Inside JS string literals and arrays (`options={["..."]}`), ALWAYS double every backslash (`\\varphi`, `\\tau`, `\\theta`, `\\frac`, `\\beta`, `\\rho`, `\\infty`, `\\circ`) so JS does not turn `\v`, `\t`, `\f`, `\b`, `\r` into control characters and trigger red KaTeX errors.
* Inside `<details className="dc-solution">`, place multi-line display math `$$` on unindented lines with blank lines before and after.
