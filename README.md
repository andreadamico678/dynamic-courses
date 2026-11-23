# Dynamic Courses

An interactive, pageless engineering textbook platform built with **Astro**, **Starlight**, **MDX**, **KaTeX**, **Markmap**, and **React**, deployed automatically to GitHub Pages.

## Features

- **Pageless Chapter Flow:** Clean continuous reading with explicit `<Divider />` breaks across the 4-Pillar structure (Intuition $\to$ Derivation $\to$ Operational Algorithm $\to$ Worked Archetype & Practice).
- **Matryoshka Mind Maps:** Collapsible, zoomable Markmap hierarchies at the top of every chapter.
- **Interactive Math & Control Simulators:** Live Bode magnitude/phase plotting, parametric Routh-Hurwitz & $s$-plane pole migration, and 2D phase-plane state flow explorers.
- **Brilliant-Style Inline Exercises:** Step-by-step checks with numeric tolerance validation, hints, and expandable worked solutions (stateless—zero tracking).
- **Full-Text Search:** Instant client-side Pagefind search across every course.
- **LLM-Ready Exports:** Clean Markdown & JSONL exports generated via `pnpm export-llm`.

## Local Development

```bash
pnpm install
pnpm dev
```

## Validation & Build

```bash
pnpm lint          # Runs scripts/lint_courses.py
pnpm build         # Builds static site + Pagefind index into dist/
pnpm export-llm    # Generates token-clean AI tutor files in dist-llm/
```
