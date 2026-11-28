#drills/computer-architecture/01_synchronous_digital_systems/03_moore_sequence_detectors

A synchronous Moore detector for overlapping `{01, 10, 01}` uses states $S_0 / 0$ ($\varepsilon$), $S_1 / 0$ (`01`), $S_2 / 0$ (`01, 10`), and recognition state **$S_3 / 1$** (`01, 10, 01`).
Write the four outgoing next states $(S^{t+1})$ from row **$S_3 / 1$** across Gray columns `xy = (00, 01, 11, 10)`.
?
**$(S_0,\; S_1,\; S_0,\; S_2)$**.
- **Trap avoided:** Because `{01, 10, 01}` already ends with `{01}`, receiving `10` in $S_3 / 1$ forms 2-symbol suffix `{01, 10}` (**$S_2$**, not $S_0$!), and receiving `01` preserves `{01}` (**$S_1$**).

---

A minimal 4-state Mealy sequence detector ($k = \lceil \log_2 4 \rceil = 2$ flip-flops) is converted into an equivalent Moore detector by adding dedicated recognition state $S_4 / 1$ ($5$ states total).
How does this affect the binary flip-flop count $k$ and the subsequent excitation Karnaugh maps?
?
Flip-flop count jumps from $2$ to **$k = \lceil \log_2 5 \rceil = 3$ flip-flops**, doubling every K-map from $8$ cells to $16$ cells and creating **$8 - 5 = 3$ unused state encodings** (`101, 110, 111`) that must be filled with Don't Cares (`X`).

---

On a Moore FSM question, a student writes the row for penultimate state $S_2$ (where `xy = 10` completes the target sequence by entering $S_3$) as:
`| S2 | 00: S0/0 | 01: S1/0 | 11: S0/0 | 10: S3/1 |`
Identify the notation error and rewrite row $S_2$ properly.
?
**Error:** Writing `/ 0` and `/ 1` inside next-state columns is **Mealy** notation ($u = \lambda(S^t, xy^t)$).
- **Correct Moore row:** `| S2 | u = 0 | 00: S0 | 01: S1 | 11: S0 | 10: S3 |` (with output `1` placed exclusively in row $S_3$'s dedicated `Output u` column).

---

Suppose an overlapping Moore detector must assert $u = 1$ on either `{11, 00}` or `{10, 11}` (with $S_1 / 0 = \{11\}$ and $S_2 / 0 = \{10\}$). Why does merging both completions into a single recognition state $S_{\text{rec}} / 1$ create a functional bug?
?
- Completing `{11, 00}` leaves suffix `00` (so a subsequent `00` must go to $S_0$).
- Completing `{10, 11}` leaves suffix `11` (which is already prefix $S_1$, so a subsequent `00` must immediately recognize `{11, 00}`!).
Because the two completions require different next states on `xy = 00`, they must use **two distinct $u = 1$ states**.
