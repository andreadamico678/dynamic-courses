#flashcards/computer-architecture/05_pipelined_processor/17_control_hazards

Why do **control hazards (branch hazards)** arise in a pipelined processor?
?
Because stage `IF` must fetch a new instruction on every clock cycle, whereas a conditional branch's true direction (taken/untaken) and target address (`PC + Imm`) are only known in a later stage (`ID`, `EX`, or `MEM`).

---

What is the taken-branch flush penalty $P_{\text{stage}}$ when branches resolve in stage **`ID`**, **`EX`**, or **`MEM`**?
?
$P_{\text{stage}} = \text{stage index} - 1$: **`ID` $\to 1$ cycle**, **`EX` $\to 2$ cycles**, **`MEM` $\to 3$ cycles** (equal to the number of wrong-path instructions already in the pipeline that must be flushed).

---

How does **Stall-Always (*Solo Stalli*)** handle conditional branches, and what is its $\text{Stalls}_{\text{ctrl}}$ formula?
?
Hardware freezes `IF` and inserts `NOP` bubbles on **every branch** (both taken and untaken) until resolution, ignoring $p_{\text{taken}}$ completely:
$$\text{Stalls}_{\text{ctrl}} = f_{\text{branch}} \times 1.0 \times P_{\text{stage}}$$

---

How does **Predict-Untaken** operate on untaken versus taken branches, and what happens during a **Pipeline Flush**?
?
The pipeline speculatively fetches sequentially along `PC + 4`:
- **If Untaken:** **$0$ stalls** (speculated instructions stay valid).
- **If Taken:** **Pipeline Flush** zeroes wrong-path control signals (`NOP` bubbles) via flush lines while redirecting `PC` to the branch target:
$$\text{Stalls}_{\text{ctrl}} = f_{\text{branch}} \times p_{\text{taken}} \times P_{\text{stage}}$$

---

What two hardware blocks must be added to stage **`ID`** for **Early Branch Resolution**, and what new data hazard side-effect appears?
?
Add a dedicated **target adder** (`PC + Imm`) and a fast **register comparator** directly in `ID` (cutting flush penalty to $1$ cycle); however, `ALU(i) -> Branch(i+1)` at $k = 1$ now stalls **$+1$ extra cycle** because `ALU` finishes `EX` after `ID` needs the operand (whereas `EX`/`MEM` resolution forwards `ALU -> Branch` with `0` extra stalls).

---

How does **Dynamic Branch Prediction** differ from static Predict-Untaken?
?
Hardware maintains a **Branch History Table (prediction bits indexed by low `PC` bits)** that learns from recent runtime executions (e.g., predicting loops taken repeatedly), eliminating taken-branch stalls on predictable branches.
