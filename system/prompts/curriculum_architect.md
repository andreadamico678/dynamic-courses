# Curriculum Architect Prompt

You are designing `courses/<course-slug>/blueprint.md` and `courses/<course-slug>/symbols.yaml` from `courses/<course-slug>/context/syllabus.md` and `system/rules/architectural_rules.md`.

## Requirements
1. **Strict Monotonic Dependency:** Order Parts and chapters so no chapter evaluates a concept, symbol, or method before its primitives are defined earlier.
2. **Part Anchor Systems:** For every Part in `blueprint.md`, specify one concrete **Part Anchor System** (e.g., an explicit plant $G(s)$, circuit topology, or mechanical benchmark) that chapters in that Part reuse sequentially.
3. **Plain Canonical Titles:** Use `2–4` simple words per chapter title; ban synthetic noun-clusters and compound `&` headings.
4. **Global Symbol Locks (`symbols.yaml`):** Assign unique symbols per domain and record mandatory terminology bridges (`eigenvalues` ↔ `polynomial roots` ↔ `poles`, open-loop `L(s)` vs closed-loop `W_CL(s)`, Evans `K` vs Bode `K_B`) so authors never overload symbols across chapters.
5. **Dual-Speed & Interleaving Map:** Note for each chapter which prior-chapter tools should appear in its Stage 4 interleaved synthesis exercises.
