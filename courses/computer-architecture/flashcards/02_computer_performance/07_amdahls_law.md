#flashcards/computer-architecture/02_computer_performance/07_amdahls_law

What is **Amdahl's Law** for overall speedup $S_{\text{tot}}$ when baseline time fraction $F$ is sped up locally by factor $S$?
?
$$S_{\text{tot}} = \frac{T_{\text{old}}}{T_{\text{new}}} = \frac{1}{(1 - F) + \dfrac{F}{S}}$$
where $F \in [0, 1]$ is the fraction of *unoptimized* runtime $T_{\text{old}}$.

---

What is the **asymptotic maximum speedup $S_{\max}$** as local speedup $S \to \infty$, and what design principle follows from it?
?
$$S_{\max} = \lim_{S \to \infty} S_{\text{tot}} = \frac{1}{1 - F}$$
**Make the common case fast**: accelerating a small $F$ gives tiny global gains regardless of $S$.

---

What feasibility check must hold before solving Amdahl's Law inversely for required local speedup $S$?
?
$$S_{\text{target}} < S_{\max} = \frac{1}{1 - F}$$
If $S_{\text{target}} \ge \frac{1}{1 - F}$, the unenhanced fraction $(1 - F)$ alone exceeds the target runtime, so no finite or infinite accelerator on $F$ can reach $S_{\text{target}}$.

---

What are the two inverted Amdahl formulas (solving for local speedup $S$, and solving for enhanced fraction $F$)?
?
$$S = \frac{F}{\dfrac{1}{S_{\text{target}}} - (1 - F)}, \qquad F = \frac{1 - \dfrac{1}{S_{\text{target}}}}{1 - \dfrac{1}{S}}$$
with $S_{\text{target}} < \frac{1}{1 - F}$ for the $S$ formula and $1 \le S_{\text{target}} \le S$ for the $F$ formula.

---

How does Amdahl's Law generalize when $k$ disjoint baseline time fractions $F_1, \dots, F_k$ are sped up by $S_1, \dots, S_k$ simultaneously?
?
$$S_{\text{tot}} = \frac{1}{\left(1 - \sum_{j=1}^k F_j\right) + \sum_{j=1}^k \dfrac{F_j}{S_j}}$$
