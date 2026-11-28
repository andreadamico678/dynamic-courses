#flashcards/computer-architecture/05_pipelined_processor/16_data_hazards

Why does only **RAW (Read After Write)** cause data hazards in an in-order 5-stage pipeline, whereas WAR and WAW cannot?
?
An instruction reads source registers early in `ID` while an older instruction writes `rd` late in `WB`; because instructions stay in program order, `WAR` (read in `ID` occurs cycles before younger write in `WB`) and `WAW` (older writes `WB` before younger writes `WB`) never invert.

---

Without data forwarding (with Register File double-pumping active), how many stalls occur for a RAW dependency at distance $k = 1$, $k = 2$, and $k \ge 3$?
?
- **$k = 1$:** **$2$ stall cycles** (`ID` freezes twice until `WB` writes in Cycle 5's first half).
- **$k = 2$:** **$1$ stall cycle** (`ID` freezes once until `WB` finishes).
- **$k \ge 3$:** **$0$ stall cycles** (split-phase Register File delivers the updated value on time).

---

What is the core hardware idea of **Data Forwarding (Bypassing)**, and which two pipeline stages' outputs feed the ALU input multiplexers?
?
Instead of waiting for `WB` to write the Register File, bypass wires and input multiplexers route just-computed results directly from **`EX/MEM`** (end of `EX`) and **`MEM/WB`** (end of `MEM`) into the ALU inputs of the consuming instruction in `EX`.

---

What are the three hardware forwarding paths in the 5-stage RISC-V pipeline and their stall counts for ALU producers?
?
1. **`EX/MEM -> EX`:** Forwards ALU result from distance $k = 1$ (`0` stalls).
2. **`MEM/WB -> EX`:** Forwards ALU or `lw` result from distance $k = 2$ (`0` stalls).
3. **`MEM/WB -> MEM` (store-data forwarding):** Forwards loaded/computed data from `MEM/WB` straight to `D-Cache` write input (`dataw`) for a following `sw` (`0` stalls).

---

What three conceptual checks must the **Forwarding Unit** verify before activating an `EX/MEM` or `MEM/WB` bypass onto an ALU input?
?
1. The older instruction actually writes a register (`RegWrite == 1`).
2. Its destination is not hardwired zero (`Rd != x0`).
3. Its `Rd` matches `ID/EX`'s source `Rs1` or `Rs2`—with **`EX/MEM` taking strict priority** over `MEM/WB` if both match the same register.

---

What is a **Load-Use hazard**, why can't forwarding eliminate it, and how many stalls remain?
?
When `lw` is immediately followed ($k = 1$) by an instruction needing the loaded register in `EX`: `lw` reads memory data only at the **end of `MEM`**, whereas the consumer needs it at the **start of `EX`**. Hardware must insert **$1$ stall bubble** before `MEM/WB -> EX` forwarding delivers the word.

---

What three actions does the **Hazard Detection Unit (HDU)** execute in stage `ID` upon detecting a Load-Use hazard?
?
1. Freeze `PC` (`PCWrite = 0`) so the instruction in `IF` is re-fetched.
2. Freeze `IF/ID` (`IF/IDWrite = 0`) so the consumer stays in `ID`.
3. Zero out `ID/EX` control bits (`MemWrite = 0`, `RegWrite = 0`), injecting a **`NOP` bubble** down the rest of the pipeline.

---

What is the **zero-hardware-cost** software solution for eliminating Load-Use data hazards, and what offset rule applies when hoisting pointer updates?
?
**Compiler instruction scheduling (code reordering)**: move an independent instruction into the slot right after `lw`, pushing the dependent consumer to distance $k \ge 2$ (`MEM/WB -> EX` resolves with `0` stalls). If an `addi s0, s0, +4` crosses a `lw`/`sw`, adjust the memory offset (`-4(s0)`) to preserve the original byte address.
