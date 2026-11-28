#drills/computer-architecture/05_pipelined_processor/17_control_hazards

*(July 16, 2026 Q3)* Instruction mix has `Branch = 15%` (with **$60\%$ branch taken**). Branches are resolved in stage **`ID`** using **solo stalli** (stall-always, no branch prediction).
Compute $\text{Stalls}_{\text{ctrl}}$.
?
$$\text{Stalls}_{\text{ctrl}} = 0.15 \times 1.00 \times 1 = \mathbf{0.15\text{ cycles/instr}}$$
- **Trap avoided:** Under *solo stalli*, the pipeline freezes on **$100\%$ of branches** (both taken and untaken) until `ID` resolves the outcome—the "$60\%$ taken" figure is a **distractor**!

---

*(June 2026 Q3)* Instruction mix has `Branch = 12%` (with **$50\%$ branch taken**), using **Predict-Untaken** with branch outcome resolved in stage **`MEM`**.
Compute $\text{Stalls}_{\text{ctrl}}$.
?
$$\text{Stalls}_{\text{ctrl}} = 0.12 \times 0.50 \times \mathbf{3} = \mathbf{0.18\text{ cycles/instr}}$$
- **Trap avoided:** Resolving in `MEM` flushes **3** wrong-path instructions (`IF`, `ID`, and `EX`) on every taken branch ($P_{\text{ID}} = 1,\; P_{\text{EX}} = 2,\; P_{\text{MEM}} = 3$). Untaken branches cost $0$ stalls.

---

With full hardware forwarding active, $30\%$ of `Branch` instructions ($f_{\text{Branch}} = 0.15$) depend on the immediately preceding `ALU` instruction (`ALU(i) -> Branch(i+1)` at $k = 1$).
Compare the extra data-hazard stalls caused by this dependency when branches resolve in **`ID`** versus when branches resolve in **`EX`** (or **`MEM`**).
?
- **Branch resolved in `ID`:** **$+1$ extra stall** ($0.15 \times 0.30 \times 1 = \mathbf{0.045}$ cycles/instr), because `ALU(i)` is still computing in `EX` during the cycle `Branch(i+1)` needs the value in `ID`'s comparator!
- **Branch resolved in `EX` or `MEM`:** **$0$ extra stalls (decoy!)**, because `EX/MEM -> EX` forwards `ALU(i)`'s result directly on time.
