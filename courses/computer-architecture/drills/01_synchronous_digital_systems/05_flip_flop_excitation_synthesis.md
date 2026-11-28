#drills/computer-architecture/01_synchronous_digital_systems/05_flip_flop_excitation_synthesis

*(July 2026 Q2)* Your 6-state FSM minimizes to **3 states**, which you encode on $k = 2$ JK flip-flops ($y_1 y_0$) as $S_0 = 00$, $S_1 = 01$, $S_2 = 10$.
How must binary state `11` be entered into the 3-variable K-maps for $J_1, K_1, J_0, K_0$, and $u$, and what happens if you fill `11` with `0`s?
?
Both cells `(y1y0 = 11, X = 0)` and `(y1y0 = 11, X = 1)` must be marked **`X` (Don't Care)** in **every** K-map ($J_1, K_1, J_0, K_0, u$).
- **Trap avoided:** State `11` is unreachable in normal operation; filling it with `0`s prevents `1`s in rows `01` and `10` from doubling into 4-cell groups and produces non-minimal SOP equations.

---

*(Sept 4 & Sept 18, 2026 Q2)* In your encoded transition table, present state $y_1 y_0 = 01$ transitions on $X = 1$ to next state $y_1^+ y_0^+ = 10$.
Write the 4 excitation entries for **SR flip-flops** $(S_1, R_1, S_0, R_0)$ versus **JK flip-flops** $(J_1, K_1, J_0, K_0)$.
?
- **SR flip-flops:** $(S_1, R_1, S_0, R_0) = \mathbf{(1, 0, 0, 1)}$ ($0 \to 1$ requires strict Set `1, 0`; $1 \to 0$ requires strict Reset `0, 1`).
- **JK flip-flops:** $(J_1, K_1, J_0, K_0) = \mathbf{(1, X, X, 1)}$.
- **Trap avoided:** Never copy JK's `X`s onto `0 -> 1` or `1 -> 0` when the exam asks for **FF SR**, because $S = R = 1$ is forbidden in SR bistables!

---

While building an **SR flip-flop** excitation table, present state $y_1 y_0 = 10$ remains in $y_1^+ y_0^+ = 10$ on $X = 0$. A student writes $(S_1, R_1, S_0, R_0) = (0, 0, 0, 0)$.
Fix the tuple so the K-maps achieve minimal SOP.
?
**Correct SR tuple:** $(S_1, R_1, S_0, R_0) = \mathbf{(X, 0, 0, X)}$.
- **Trap avoided:** Holding $1 \to 1$ allows either Hold (`0, 0`) or re-asserting Set (`1, 0`) $\implies (X, 0)$; holding $0 \to 0$ allows Hold (`0, 0`) or Reset (`0, 1`) $\implies (0, X)$. Writing `(0, 0, 0, 0)` throws away two valid Don't Cares.

---

*(July 2026 Q2)* A reduced 3-state Mealy table ($S_0 = 00$, $S_1 = 01$, $S_2 = 10$, `11` unused) has $u = 1$ **only** on transition $S_2 \xrightarrow{X = 1 / 1} S_0$ (all other transitions output $0$).
Which cell(s) of $u(y_1, y_0, X)$ get `1`, which get `X`, and what is the minimal SOP for $u$?
?
- **`1` cell:** $(y_1 y_0 = 10,\; X = 1)$ (**present** state $S_2$, not next state $S_0$!).
- **`X` cells:** $(11, 0)$ and $(11, 1)$ (unused state `11`).
- **Minimal SOP:** Pairing $(10, 1)$ with $(11, 1)$ eliminates $y_0$, giving **$u = y_1 X$**.

---

Your excitation table lists binary rows in counting order `00, 01, 10, 11`, giving column vectors for $J_0$:
- At $X = 0$: `[0, X, 1, X]` (for `00, 01, 10, 11`)
- At $X = 1$: `[1, X, 1, X]` (for `00, 01, 10, 11`)
Place these into a Gray-ordered K-map (rows `00, 01, 11, 10`) and extract minimal $J_0$.
?
Gray-ordered rows `00, 01, 11, 10` hold:
- Col $X = 0$: `[0, X, X, 1]`
- Col $X = 1$: `[1, X, X, 1]`
**Minimal SOP:** **$J_0 = X + y_1$** (the entire $X = 1$ column of 4 cells gives $X$, and rows `11, 10` across $X \in \{0, 1\}$ give $y_1$).
- **Trap avoided:** Copying counting-order rows `10, 11` into the K-map without swapping rows 3 and 4 corrupts every implicant.
