#drills/computer-architecture/01_synchronous_digital_systems/01_karnaugh_map_minimization

You are minimizing $f(a, b, c, d)$ on a $4 \times 4$ Gray-coded Karnaugh map and have `1`s at $(00, 00), (00, 10), (10, 00)$ plus a Don't Care `X` at $(10, 10)$ (all other cells `0`):
```text
ab \ cd | 00  01  11  10
--------+---------------
  00    |  1   0   0   1
  01    |  0   0   0   0
  11    |  0   0   0   0
  10    |  1   0   0   X
```
A student writes $f = \overline{a}\overline{b}\overline{d} + \overline{b}\overline{c}\overline{d}$. Spot the inefficiency and write the minimal SOP.
?
**Minimal SOP:** $f = \overline{b}\overline{d}$.
- **Trap avoided:** All four outer corners wrap toroidally into a single $2 \times 2$ group of $4$ cells once `X` at $(10, 10)$ is promoted to `1`. Across rows $\{00, 10\}$, $a$ cancels leaving $\overline{b}$; across columns $\{00, 10\}$, $c$ cancels leaving $\overline{d}$.

---

In a 5-variable K-map $f(a, b, c, d, e)$ split into Layer 0 ($a = 0$, $m_0 \dots m_{15}$) and Layer 1 ($a = 1$, $m_{16} \dots m_{31}$), column $de = 00$ at rows $bc \in \{01, 11\}$ contains:
- **Layer 0 ($a = 0$):** $m_4 = 1$, $m_{12} = 1$
- **Layer 1 ($a = 1$):** $m_{20} = 1$, $d_{28} = X$
Write the single minimal product term covering $\{m_4, m_{12}, m_{20}\}$.
?
**Minimal term:** $c\overline{d}\overline{e}$.
- **Trap avoided:** Matching coordinates $(bc, de)$ on Layer 0 and Layer 1 are 3D-adjacent ($m_k$ sits beneath $m_{k+16}$). Grouping $\{m_4, m_{12}, m_{20}, d_{28}\}$ across both layers forms a $4$-cell block that eliminates both $a$ ($0 \to 1$) and $b$ ($0 \to 1$).

---

While minimizing an excitation K-map $J_1(y_1, y_0, X)$, you already covered every `1` in the map using $y_0 X$, but two unused-state Don't Cares (`X`) at $(11, 0)$ and $(10, 0)$ remain ungrouped:
```text
y1y0 \ X |  0   1
---------+--------
   00    |  0   0
   01    |  0   1
   11    |  X   1
   10    |  X   0
```
Should you group $(11, 0)$ and $(10, 0)$ into an extra term $y_1\overline{X}$? State the final minimal SOP for $J_1$.
?
**No — final minimal SOP:** $J_1 = y_0 X$.
- **Trap avoided:** Don't Cares (`X`) are promoted to `1` *only* when they enlarge a group covering at least one required `1`. Grouping standalone `X` cells adds unnecessary gates.

---

On this 3-variable K-map for $Y(y_1, y_0, X)$:
```text
y1y0 \ X |  0   1
---------+--------
   00    |  1   0
   01    |  1   1
   11    |  0   1
   10    |  0   0
```
A student groups all three pairs and writes $Y = \overline{y}_1\overline{X} + \overline{y}_1 y_0 + y_0 X$. Which term must be deleted, and why?
?
**Delete $\overline{y}_1 y_0$**, leaving $Y = \overline{y}_1\overline{X} + y_0 X$.
- **Trap avoided:** Cell $(01, 0)$ is already covered by essential prime implicant $\overline{y}_1\overline{X}$, and cell $(01, 1)$ is already covered by essential prime implicant $y_0 X$. The horizontal bridge $\overline{y}_1 y_0$ covers zero new `1`s (consensus redundancy).

---

You need to plot $f(a, b, c, d) = \sum m(2, 6, 10, 14)$ onto a $4 \times 4$ K-map $(ab \backslash cd)$. Which column(s) receive the `1`s, and what is the minimal SOP?
?
All four `1`s land in the **rightmost column $cd = 10$** (across all four rows $ab = 00, 01, 11, 10$), collapsing to **$f = c\overline{d}$**.
- **Trap avoided:** Because Gray code swaps `11` and `10`, decimal $+2$ ($cd = 10_2$) is column 4 (`10`), not column 3 (`11`), and row $m_{12..15}$ (`11`) sits *above* row $m_{8..11}$ (`10`). Misplacing `10` vs `11` fragments a 1-gate wire into multiple terms.
