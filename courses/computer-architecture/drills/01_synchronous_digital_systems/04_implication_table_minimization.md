#drills/computer-architecture/01_synchronous_digital_systems/04_implication_table_minimization

*(Feb 2026 C1 Q2)* In a 6-state Mealy table, states `D` (`X=0: A/1`, `X=1: F/0`) and `F` (`X=0: E/1`, `X=1: D/0`) share output signature `(1, 0)`.
When filling implication cell `(F, D)`, $X = 0$ gives `(E, A)` and $X = 1$ gives `(D, F)`. A student crosses out `(F, D)` because `F != D` on $X = 1$. What is the correct entry for `(F, D)`?
?
Write **only `(E, A)`** inside cell `(F, D)` (do **not** cross it out!).
- **Trap avoided:** Implied pair `(D, F)` inside cell `(F, D)` is a **self-implication** ($\{P, Q\} = \{F, D\}$), which holds automatically under the hypothesis $D \equiv F$ and is discarded. Once `(E, A)` resolves to $\checkmark$, `(F, D)` survives too ($D \equiv F$).

---

*(June 2026 Q2)* After Pass 1 and Sweep 1 on a 6-state Mealy implication table, all surviving uncrossed cells form closed implication loops with zero `X` references:
- `(D, B)` contains `(F, C)` and `(F, C)` contains `(D, B)`
- `(C, A)` contains `(F, A), (B, D)` and `(F, A)` contains `(C, A)`
Do you cross these four cells out or keep them equivalent? Write the resulting minimal state partition.
?
**Keep all four equivalent**, yielding **3 minimal classes:** $S_0 = \{A, C, F\}$, $S_1 = \{B, D\}$, $S_2 = \{E\}$.
- **Trap avoided:** Paull–Unger eliminates a cell *only* if an implied pair is marked `X`. When a full pass produces **zero new `X`s** (fixed point), mutually dependent uncrossed pairs are proven indistinguishable forever.

---

*(Feb 2026 C1 Q2)* While scanning top-to-bottom in Pass 2:
- Row `B`, Col `A`: cell `(B, A)` records implied pair `(C, A)` (currently uncrossed).
- One row lower — Row `C`, Col `A`: cell `(C, A)` implies `(D, A)`, which was marked **`X`** in Pass 1, so `(C, A)` gets marked **`X`**.
What happens if you stop after Pass 2 without running Pass 3?
?
Leaving `(B, A)` uncrossed falsely merges $A \equiv B$!
- **Trap avoided:** Crossing out `(C, A)` on Row `C` invalidates `(B, A)` *above* it on Row `B`. Always repeat full top-to-bottom cascade sweeps until an entire pass adds **zero new `X` marks**.

---

Right before building your reduced state table on Question 2, you notice your finished implication table has `(C, A)` uncrossed ($\checkmark$), `(E, C)` uncrossed ($\checkmark$), and `(E, A)` crossed out (`X`). What must you do immediately?
?
**Stop and re-check rows `A`, `C`, and `E`** — there is a guaranteed mistake in your table.
- **Trap avoided:** State equivalence on a completely specified FSM is strictly **transitive** ($A \equiv C \land C \equiv E \implies A \equiv E$). Two uncrossed pairs with the third pair marked `X` is mathematically impossible.

---

After implication reduction, you obtain classes $S_0 = \{A, C, F\}$, $S_1 = \{B, D\}$, and $S_2 = \{E\}$. In the original table on $X = 1$, state `B` transitions to `C / 0` while state `D` transitions to `F / 0`.
Does `C != F` mean `{B, D}` cannot be merged, and what goes in row $S_1$ ($X = 1$) of the minimal table?
?
`{B, D}` **is completely valid**, and row $S_1$ ($X = 1$) gets **$S_0 / 0$**.
- **Trap avoided:** Equivalent states only need their next states to land in the **same equivalence class**, not the exact same original letter. Both `C` and `F` belong to $S_0$.
