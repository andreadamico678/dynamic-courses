#flashcards/computer-architecture/05_pipelined_processor/14_five_stage_pipeline

What are the 5 ordered stages and 4 interstage barrier registers of the classic RISC-V pipeline?
?
`IF -> [IF/ID] -> ID -> [ID/EX] -> EX -> [EX/MEM] -> MEM -> [MEM/WB] -> WB`.

---

How does pipelining affect **instruction throughput** versus **single-instruction latency**?
?
Pipelining raises **throughput** (up to $1$ instruction retired per faster clock cycle in steady state), while **single-instruction latency** stays similar or **increases** because fast stages wait for the slowest stage plus $k$ register crossings ($k \cdot T_{\text{clk,pipe}}$).

---

How do the single-cycle clock period $T_{\text{clk,single}}$ and pipelined clock period $T_{\text{clk,pipe}}$ compare?
?
- **Single-cycle:** $T_{\text{clk,single}} = \sum_{i=1}^k t_{\text{stage},i}$ (sum of combinational delays, no pipeline registers).
- **Pipelined:** $T_{\text{clk,pipe}} = \max_i(t_{\text{stage},i}) + t_{\text{setup}} + t_{\text{cq}}$ (governed by the single slowest stage + register overhead).

---

How many cycles does a hazard-free $k$-stage pipeline take to complete $\text{IC}$ instructions, and what 3 factors keep real speedup below $k$?
?
$N_{\text{cycles}} = \text{IC} + k - 1$ ($4$ fill cycles for $k = 5$); real speedup stays strictly below $k$ due to:
1. Stage delay imbalance ($\max(t_i) > \frac{1}{k}\sum t_i$).
2. Interstage register overhead ($t_{\text{setup}} + t_{\text{cq}}$).
3. Pipeline hazard stalls (structural, data, control).

---

In which pipeline stages do `lw` and `sw` compute their memory address versus access Data Memory?
?
They compute the byte address $\text{Reg}[rs1] + \text{Imm}$ in the main ALU during **`EX`**, and read (`MemRead = 1`) or write (`MemWrite = 1`) Data Memory during **`MEM`**.

---

Why must control signals generated in `ID` (`MemRead`, `MemWrite`, `RegWrite`, `MemtoReg`) travel through `ID/EX`, `EX/MEM`, and `MEM/WB` instead of wiring straight to `MEM` and `WB`?
?
Because five different instructions occupy the five stages each cycle; shifting control bits in lockstep alongside data prevents a younger instruction in `ID` from overwriting the controls of older instructions active in `EX`, `MEM`, or `WB`.
