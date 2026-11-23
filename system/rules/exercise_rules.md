# Exercise & Interactive Practice Rules

Exercises are embedded inline at the end of every chapter using the stateless `<Exercise>` and `<StepCheck>` components—combining Brilliant-style active step verification with authentic university written exam rigor.

---

### 1. Inline Structure & Revealable Solutions

* **No Separate Solutions Appendix Needed for Web:** Each `<Exercise>` lives at the end of its chapter and contains:
  1. Clear problem statement with KaTeX math.
  2. One or more `<StepCheck>` micro-prompts (numeric with tolerance or multiple-choice) for immediate active verification without storing user state.
  3. Optional `hint` and an expandable `<details>` / `<Exercise>` solution drawer showing the complete step-by-step algebraic derivation.
* **Unified Numbering:** Always match the chapter number (`Exercise 17.1`, `Exercise 17.2`). Never use legacy `Exercise 2.5.1` three-part strings.

---

### 2. Progression

1. **`[LEVEL 1: WARM-UP DRILL]`** — Clean parameters isolating the core algorithm.
2. **`[LEVEL 2: EXAM BENCHMARK]`** — Full written-exam problem matching official archetypes.
3. **`[LEVEL 3: EXAM VARIATION & PITFALLS]`** *(optional per course scope)* — Boundary edge cases and traps.

---

### 3. Math Verification & Zero Boilerplate

* All numeric `<StepCheck>` answers and worked solutions should be cross-checked with `sympy` / `scipy.signal`.
* Never append repetitive `"Level 3 Omitted"` disclaimer boxes to chapters.
