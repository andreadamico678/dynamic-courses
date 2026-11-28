#flashcards/computer-architecture/05_pipelined_processor/15_structural_hazards

What is a **structural hazard** in a pipelined processor?
?
A hardware resource conflict where two or more in-flight instructions in different pipeline stages attempt to use the **exact same physical unit** during the same clock cycle.

---

What conflict arises with a **unified single-port memory** (*una sola memoria per dati e istruzioni*), and what is its CPI stall penalty?
?
During stage **`MEM`**, a `lw` or `sw` accesses the single memory port at the exact cycle stage **`IF`** fetches an older+3 instruction, forcing `IF` to stall $1$ cycle:
$$\text{Stalls}_{\text{struct}} = \left(f_{\text{load}} + f_{\text{store}}\right) \times 1$$

---

How does a **modified Harvard L1 cache** architecture eliminate unified-memory structural stalls?
?
Splitting level-1 memory into physically separate **Instruction Cache (`I-Cache`)** for `IF` and **Data Cache (`D-Cache`)** for `MEM` gives independent ports so instruction fetches and `lw`/`sw` data accesses run in parallel ($\text{Stalls}_{\text{struct}} = 0$).

---

Why does overlapping `WB` (instruction $i$) and `ID` (instruction $i+3$) on the Register File cause zero stalls in standard RISC-V?
?
The Register File provides **separate read/write ports** and uses **split-phase clocking (double pumping)**: `WB` commits writes in the **first half** of the clock cycle, and `ID` samples reads in the **second half**, yielding updated registers at distance $k \ge 3$ with `0` stalls.
