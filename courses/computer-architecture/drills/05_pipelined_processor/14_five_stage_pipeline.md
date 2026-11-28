#drills/computer-architecture/05_pipelined_processor/14_five_stage_pipeline

A processor's five combinational stages have delays $\text{IF} = 200\text{ ps}$, $\text{ID} = 100\text{ ps}$, $\text{EX} = 200\text{ ps}$, $\text{MEM} = 250\text{ ps}$, $\text{WB} = 100\text{ ps}$, and interstage pipeline registers add $t_{\text{reg}} = 20\text{ ps}$.
A student computes $T_{\text{clk,single}} = 850 + 4(20) = 930\text{ ps}$ and $T_{\text{clk,pipe}} = 850/5 + 20 = 190\text{ ps}$. Fix both errors.
?
- **$T_{\text{clk,single}} = \mathbf{850\text{ ps}}$** (an unpipelined single-cycle datapath has **no** interstage pipeline registers).
- **$T_{\text{clk,pipe}} = \max(200, 100, 200, 250, 100) + 20 = \mathbf{270\text{ ps}}$** (set by the **slowest** stage `MEM`, never the average!).

---

Using $T_{\text{clk,single}} = 850\text{ ps}$ and $T_{\text{clk,pipe}} = 270\text{ ps}$ on the 5-stage pipeline above, compare the **latency of a single instruction** before vs. after pipelining.
?
- **Single-cycle latency:** $1 \times 850\text{ ps} = 850\text{ ps}$.
- **Pipelined latency:** $5 \times 270\text{ ps} = \mathbf{1350\text{ ps}}$ (**increases** by $+500\text{ ps}$!).
- **Trap avoided:** Pipelining accelerates **throughput** (retiring 1 instruction every $270\text{ ps}$ in steady state), never single-instruction latency.

---

*(Slide Deck CA-INF18)* On a 5-stage pipeline with $T_{\text{clk,single}} = 800\text{ ps}$ and $T_{\text{clk,pipe}} = 200\text{ ps}$, compute the exact speedup for a short hazard-free sequence of **only $\text{IC} = 3$ consecutive `lw` instructions**.
?
- $T_{\text{single}} = 3 \times 800\text{ ps} = 2400\text{ ps}$.
- $T_{\text{pipe}} = (5 + 3 - 1) \times 200\text{ ps} = 7 \times 200\text{ ps} = 1400\text{ ps}$.
- **Exact speedup:** $2400 / 1400 = \mathbf{1.71\times}$ (far below the asymptotic $\text{IC} \to \infty$ ratio $800 / 200 = 4.0\times$ because of the $k - 1 = 4$ fill cycles!).

---

During Clock Cycle 4 of hazard-free execution:
- $I_1$ (`lw`) is in `MEM`
- $I_2$ (`add`) is in `EX`
- $I_3$ (`sw`) is in `ID`
Which interstage register currently supplies $I_2$'s `ALUSrc` and holds $I_2$'s `RegWrite = 1`, and what bug would occur if `RegWrite` ran directly from `ID`'s Control Unit to `WB`?
?
**`ID/EX`** holds $I_2$'s controls during Cycle 4 (latching `RegWrite = 1` into `EX/MEM` at the end of Cycle 4).
- **Bug if wired directly:** $I_3$ (`sw`) in `ID` asserts `RegWrite = 0`, which would disable the Register File write of whatever older instruction is retiring in `WB` during Cycle 4!
