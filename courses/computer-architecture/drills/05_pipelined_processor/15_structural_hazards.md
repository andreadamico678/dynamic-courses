#drills/computer-architecture/05_pipelined_processor/15_structural_hazards

*(June 2026 Q3)* A pipeline has **a single unified memory for instructions and data**, with mix: `Load` $16\%$, `Store` $12\%$, `Branch` $12\%$, `ALU` $60\%$.
A student computes $\text{Stalls}_{\text{struct}} = 0.16 \times 1 = 0.16$. Fix the error.
?
$$\text{Stalls}_{\text{struct}} = (f_{\text{Load}} + f_{\text{Store}}) \times 1 = (0.16 + 0.12) \times 1 = \mathbf{0.28\text{ cycles/instr}}$$
- **Trap avoided:** **Both** `Load` (reading data in `MEM`) and `Store` (writing data in `MEM`) collide with instruction fetch in `IF` on a single-port unified memory!

---

*(July 16 & Sept 18, 2026 Q3)* Same 5-stage pipeline, except the prompt specifies *"la presenza di due memorie distinte per i dati e le istruzioni"* (`Load` $22\%$, `Store` $13\%$).
What is $\text{Stalls}_{\text{struct}}$?
?
**$0$ cycles/instr.**
- **Trap avoided:** Separate Harvard `I-Cache` (`IF`) and `D-Cache` (`MEM`) serve instruction fetch and data access in parallel on every cycle.

---

Consider a pipeline **without** data forwarding executing:
```asm
add x5, x1, x2    # I1: writes x5 in WB during Cycle 5
nop               # I2
nop               # I3
sub x6, x5, x3    # I4: reads x5 in ID during Cycle 5
```
Why does $I_4$ read the updated `x5` in Cycle 5 with **$0$ stall cycles** instead of suffering a structural or RAW conflict?
?
**Split-phase Register File clocking (double pumping):** `WB` ($I_1$) writes `x5` during the **first half** of Cycle 5, and `ID` ($I_4$) reads the updated `x5` during the **second half** of Cycle 5.
