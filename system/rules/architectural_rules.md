# Architectural Rules

The textbook structure must form a clean, navigable Matryoshka hierarchy across both the Starlight sidebar and per-chapter mind maps.

---

### 1. The Matryoshka Hierarchy & Bounded Branching Factor

Every curriculum blueprint follows a nested **Matryoshka** hierarchy:
* **Tier 1 (Root):** Course title (e.g., *Linear Systems Theory*).
* **Tier 2 (Parts / Area Clusters):** 4 to 8 coherent parts mapped to Starlight sidebar groups.
* **Tier 3 (Modules):** Logical sub-domains inside a part.
* **Tier 4 (Chapters / Leaves):** One continuous scrolling MDX page per atomic topic.

#### Bounded Branching Rule
* Every parent node must have **2 to 5 (strictly max 6)** direct children. Subdivide any cluster with 7+ items into sub-modules.

---

### 2. Plain Canonical Titles (Ban Synthetic Inflation)

* Titles must be **concise, plain, and standard** (2 to 4 words).
* Ban inflated noun-clusters (*"Unilateral Laplace Transformation Primitives"* $\to$ *"Unilateral Laplace Transform"*).
* Strip redundant meta-suffixes (`...Synthesis`, `...Formulation`, `...Evaluation`).

---

### 3. Atomic Separation (Zero Lazy Compound Headings)

* Never bundle two distinct topics with `&` or `and` in chapter titles unless standard domain convention (e.g., *Pole-Zero Maps*). Split distinct mechanisms into separate pages.

---

### 4. Strict Monotonic Dependency (Zero Forward References)

$$\text{Primitives} \longrightarrow \text{Mechanisms} \longrightarrow \text{Subsystems} \longrightarrow \text{Architectures}$$

* Never introduce or evaluate a concept before its underlying vocabulary and primitives are taught in earlier chapters.
* Whenever coordinates or representations shift (e.g., $\mathbf{z}(t) = \mathbf{x}(t) - \mathbf{x}_e$), state the bridge explicitly.

---

### 5. Starlight Sidebar & Multi-Course Mirroring

* `astro.config.mjs` mirrors `courses/<course-slug>/blueprint.md`, grouping chapters into `PART I` .. `PART VIII` sidebar sections with built-in Pagefind search across all courses.
