#drills/computer-architecture/05_pipelined_processor/18_pipeline_performance

In a pipeline with full forwarding (`Load = 20%`, `ALU = 55%`), compare $\text{Stalls}_{\text{data}}$ under two different exam wordings:
- **Wording A** *(Sept 18, 2026 Q3)*: *"il 20% delle istruzioni ALU dipende da un'istruzione Load precedente a distanza 1"*
- **Wording B** *(June 2025 Q5)*: *"il 30% delle Load sono seguite da un'istruzione ALU che da essa dipende"*
?
- **Wording A (consumer-relative to `ALU`):** $0.55 \times 0.20 \times 1 = \mathbf{0.110}$.
- **Wording B (producer-relative to `Load`):** $0.20 \times 0.30 \times 1 = \mathbf{0.060}$.
- **Trap avoided:** Always multiply the conditional percentage by the grammatical subject (`delle ALU` $\to f_{\text{ALU}}$; `delle Load` $\to f_{\text{Load}}$).

---

*(July 16, 2026 Q3)* Full forwarding is ON (`ALU = 50%`). Profiling lists three `ALU` dependencies:
- a) $30\%$ of `ALU` depend on `ALU` at distance $k = 1$
- b) $10\%$ of `ALU` depend on `Load` at distance **$k = 2$**
- c) $15\%$ of `ALU` depend on `Load` at distance **$k = 1$**
Filter out the decoys and compute $\text{Stalls}_{\text{data}}$.
?
- a) `ALU -> ALU` ($k = 1$): **$0$ stalls** (`EX/MEM -> EX` bypass).
- b) `Load -> ALU` ($k = 2$): **$0$ stalls** (`MEM/WB -> EX` bypass — decoy!).
- c) `Load -> ALU` ($k = 1$, Load-Use): $0.50 \times 0.15 \times 1 = \mathbf{0.075\text{ cycles/instr}}$.

---

*(Jan 2026 C2 Q3)* Evaluate $\text{CPI}$ for: `Load 20%`, `Store 15%`, `Branch 20%` ($40\%$ taken), `ALU 45%`, split I/D memories, **NO data forwarding**, Predict-Untaken resolved in **`ID`**, with producer-relative dependencies:
- $25\%$ of `ALU` followed by dependent `ALU` ($k = 1$)
- $30\%$ of `Load` followed by dependent `ALU` ($k = 1$)
- $10\%$ of `ALU` followed by dependent `Branch` ($k = 1$)
?
- $\text{Stalls}_{\text{struct}} = 0$ (split memories).
- **Data stalls (Forwarding OFF $\implies$ every $k = 1$ RAW stalls $2$ cycles until `WB` first-half write!):**
  - `ALU -> ALU`: $0.45 \times 0.25 \times 2 = 0.225$
  - `Load -> ALU`: $0.20 \times 0.30 \times 2 = 0.120$
  - `ALU -> Branch` (reads in `ID`): $0.45 \times 0.10 \times 2 = 0.090$
- $\text{Stalls}_{\text{ctrl}}$ (`ID`, Predict-Untaken): $0.20 \times 0.40 \times 1 = 0.080$.
- **Total $\text{CPI}$:** $1.00 + 0.225 + 0.120 + 0.090 + 0.080 = \mathbf{1.515\text{ cycles/instr}}$.

---

*(Feb 2026 C1 vs. C2 Q3)* `Load = 18%`, and *"30% of Load instructions depend on the preceding ALU instruction at distance $k = 1$ (`ALU(i) -> Load(i+1)`)"* (for base-register address calculation).
How many stalls per instruction does this clause add when **Forwarding is ON** versus when **Forwarding is OFF**?
?
- **Forwarding ON:** **$0$ stalls** (`ALU` finishes `EX` right before `Load` enters `EX`, so `EX/MEM -> EX` forwards the base address cleanly).
- **Forwarding OFF:** $0.18 \times 0.30 \times \mathbf{2} = \mathbf{0.108\text{ cycles/instr}}$ (`Load` must wait 2 cycles in `ID` for `ALU` to write the base register in `WB`).
