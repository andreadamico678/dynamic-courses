#flashcards/computer-architecture/05_pipelined_processor/18_pipeline_performance

What is the master additive **pipelined $\text{CPI}$ equation** combining all three hazard categories?
?
$$\text{CPI}_{\text{pipe}} = 1 + \sum_i \left(f_i \times \text{Penalty}_i\right) = 1 + \text{Stalls}_{\text{struct}} + \text{Stalls}_{\text{data}} + \text{Stalls}_{\text{ctrl}}$$

---

How do **consumer-relative**, **producer-relative**, and **global-stream** dependency wordings determine the frequency multiplier in $\text{Stalls}_{\text{data}}$?
?
- *"30% of ALU depend on Load"* (consumer-relative): multiply by **$f_{\text{ALU}}$** ($f_{\text{ALU}} \times 0.30$).
- *"30% of Load feed ALU"* (producer-relative): multiply by **$f_{\text{Load}}$** ($f_{\text{Load}} \times 0.30$).
- *"5% of all executed instructions stall"* (global): already normalized to $\text{IC}$ ($0.05$, never multiply again).

---

Which common data-dependency items in `Q3` CPI problems cost **$0$ stalls (decoys)** when full hardware forwarding is ON?
?
1. `ALU -> ALU` or `ALU -> Load/Store` at $k = 1$ (`EX/MEM -> EX`).
2. `Load -> ALU` or `ALU -> ALU` at $k = 2$ (`MEM/WB -> EX`).
3. `ALU -> Branch` at $k = 1$ **when branches resolve in `EX` or `MEM`** (`0` stalls; only `ID` branch resolution adds $+1$ stall!).

---

How do you compute real end-to-end speedup $S$ of a 5-stage pipeline over an unpipelined single-cycle CPU ($\text{CPI}_{\text{single}} = 1$) at the same $\text{IC}$?
?
$$S = \frac{T_{\text{exec,single}}}{T_{\text{exec,pipe}}} = \frac{1 \times T_{\text{clk,single}}}{\text{CPI}_{\text{pipe}} \times T_{\text{clk,pipe}}}$$
Always compare the product $\text{CPI}_{\text{pipe}} \times T_{\text{clk,pipe}}$, never $\text{CPI}_{\text{pipe}}$ alone.
