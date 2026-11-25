# Exercise Rules — Interactive Practice Protocol

Practice appears both inline during the explanation and at the end of each chapter under `<Divider label="4 · Exercises" />` (`"4 · Esercizi"`).

### 1. Inline Checks & Explorers (Sections 1 & 2)

* Place quick `<StepCheck>` checks right after key ideas in Sections 1 and 2 so the reader verifies understanding immediately.
* Above any interactive explorer (`<BodeExplorer />`, `<RouthExplorer />`, `<PhaseFlowExplorer />`), write one short 1–2 sentence instruction telling the student what parameter to adjust and what change to look for—without gimmicky labels.

### 2. End-of-Chapter Progression (Section 4)

Use plain topic titles inside `<Exercise id="..." title="Exercise N.k — Topic" level="...">` (never add meta-labels like *Worked Archetype*, *Faded Completion*, or *Interleaved Synthesis* to titles):

1. **`Exercise N.1`:** Complete solved exam-style problem with a `<StepCheck>` before `<details className="dc-solution">`.
2. **`Exercise N.2`:** Problem that gives the setup/first step and asks the student to finish the critical step via `<StepCheck>` before expanding `<details className="dc-solution">`.
3. **`Exercise N.3+`:** Synthesis problem combining the current chapter's method with earlier chapters' tools (e.g., Bode + Routh-Hurwitz + Laplace IVT).

### 3. `<StepCheck>` Math Formatting

* All string props (`prompt`, `options`, `unit`, `explanation`, `title`, `hint`) support inline `$...$` KaTeX math via `<MathText />`. Remember to double backslashes inside JS arrays (`options={["$\\omega_{gc}$"]}`).
