#flashcards/computer-architecture/01_synchronous_digital_systems/04_implication_table_minimization

What are the two formal conditions for two states $S_i$ and $S_j$ of a completely specified FSM to be equivalent ($S_i \equiv S_j$)?
?
1. **Output compatibility:** identical output on every input ($\lambda(S_i, x) = \lambda(S_j, x)$ for Mealy; $\lambda(S_i) = \lambda(S_j)$ for Moore).
2. **Next-state compatibility:** $\delta(S_i, x) \equiv \delta(S_j, x)$ for every input $x$.

---

How are rows and columns arranged in a lower-triangular Implication Table for $N$ states $\{S_0, \dots, S_{N-1}\}$?
?
Rows top-to-bottom hold $S_1 \dots S_{N-1}$ and columns left-to-right hold $S_0 \dots S_{N-2}$, yielding $\binom{N}{2} = \frac{N(N-1)}{2}$ unique unordered pair cells.

---

What occurs during **Pass 1** of Implication Table minimization?
?
Any state pair $(S_i, S_j)$ whose immediate output signatures differ on at least one input is immediately crossed out with **`X`**.

---

How are **identities** ($P = Q$) and **self-implications** ($\{P, Q\} = \{S_i, S_j\}$) handled when filling implied next-state pairs in Pass 2?
?
Both are trivially satisfied under $S_i \equiv S_j$ and discarded; if no unresolved pairs remain in cell $(S_i, S_j)$, mark it **$\checkmark$** (unconditionally equivalent).

---

How does **Pass 3 (Cascade Elimination)** work, and when is it safe to stop?
?
Scan uncrossed cells top-to-bottom and cross out (`X`) any cell referencing an implied pair already marked `X`; repeat full sweeps until an entire pass adds **zero new `X` marks** (fixed point).

---

How do surviving uncrossed cells form the reduced FSM table, and what transitivity check catches table errors?
?
Merge surviving pairs by **transitivity** ($S_i \equiv S_j \land S_j \equiv S_k \implies S_i \equiv S_k$) into equivalence classes and replace every state with its class representative; if $(B, A)$ and $(C, B)$ survive while $(C, A)$ is `X`, re-audit immediately because equivalence must be transitive.
