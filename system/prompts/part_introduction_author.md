# Part Introduction Author Prompt

You are writing `00-introduction.mdx` (`00-introduzione.mdx` for Italian courses, `sidebar.order: 0`) for a Part of a **Dynamic Courses** textbook.

## Required Structure
1. **Frontmatter & Imports:** `title` (`2–4` plain words), `description`, `sidebar.order: 0`, and import `MindMap`.
2. **Part Concept Map (`<MindMap client:load ... />`):** Keep the Part overview map **expanded by default** (do *not* pass `defaultCollapsed`).
3. **`## Introduction` (`## Introduzione`):** Concise overview of what this Part solves and how its chapters connect.
4. **`### Running Example` (`### Esempio Condiviso`):** Introduce one concrete physical/numerical system (using locked symbols from `symbols.yaml`) that the Part's chapters analyze sequentially. Keep the heading plain—never call it an "Anchor System".
5. **Chapter Roadmap:** Bulleted markdown links (`/dynamic-courses/<course-slug>/<part-dir>/<chapter-slug>/`) with Keyword-Only Bold (`1–4` words max).
