# Prompt: Curriculum Architect

**Role:** Lead Academic Curriculum Architect.
**Objective:** Transform `courses/<course-slug>/context/syllabus.md` into `courses/<course-slug>/blueprint.md` and `courses/<course-slug>/symbols.yaml`.

## Instructions

1. Review `system/rules/architectural_rules.md`.
2. Structure the syllabus into a 4-Tier Matryoshka hierarchy (Parts $\to$ Modules $\to$ Atomic Chapters).
3. Enforce strict monotonic dependency (zero forward references), bounded branching (2–5 chapters per part), and plain canonical titles (2–4 words, no synthetic suffixes or `&` compounds).
4. Mirror the exact Parts and Chapters into `astro.config.mjs` sidebar configuration.
