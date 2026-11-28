#flashcards/computer-architecture/06_cache_memory/23_cache_performance

What is the single-level **Average Memory Access Time ($\text{AMAT}$)** formula, and does higher performance mean larger or smaller $\text{AMAT}$?
?
$$\text{AMAT} = t_{\text{hit}} + (\text{MR} \cdot \text{MP})$$
Because $\text{AMAT}$ is average latency, **smaller $\text{AMAT}$ means strictly higher performance** (Rank 1 = $\min \text{AMAT}$).

---

How do you solve for **maximum allowable Hit Time** $t_{\text{hit},B,\max}$ and **maximum allowable Miss Rate** $\text{MR}_{B,\max}$ so Cache B performs no worse than Cache A?
?
Enforce $\text{AMAT}_B \le \text{AMAT}_A$:
$$t_{\text{hit},B} \le \text{AMAT}_A - \text{MR}_B \cdot \text{MP}_B, \qquad \text{MR}_B \le \frac{\text{AMAT}_A - t_{\text{hit},B}}{\text{MP}_B}$$
(Keep $t_{\text{hit}}$ and $\text{MP}$ in identical time units and express $\text{MR}$ as a decimal before solving.)

---

What is the **nested two-level (`L1` + `L2`) $\text{AMAT}$** formula?
?
$$\text{AMAT} = t_{\text{hit},L1} + \text{MR}_{L1}\big(t_{\text{hit},L2} + \text{MR}_{L2} \cdot \text{MP}_{L2}\big)$$
where $\text{MR}_{L2}$ is the **local** `L2` miss rate.

---

How do **local** and **global** `L2` miss rates differ when given absolute miss counts over $N_{\text{acc}}$ CPU accesses?
?
- **Local $\text{MR}_{L2}$:** $\frac{\text{Misses}_{L2}}{\text{Misses}_{L1}}$ (misses in `L2` divided by accesses reaching `L2` — used inside $\text{MR}_{L1}(t_{\text{hit},L2} + \text{MR}_{L2}\cdot\text{MP}_{L2})$).
- **Global $\text{MR}_{L2,\text{global}}$:** $\frac{\text{Misses}_{L2}}{N_{\text{acc}}} = \text{MR}_{L1} \cdot \text{MR}_{L2}$.

---

How is **Memory-Stall $\text{CPI}$** calculated for split `I-Cache` and `D-Cache` using percentages vs. hybrid absolute miss counts?
?
- **Percentage form:** $\text{CPI} = \text{CPI}_{\text{exe}} + (1.0 \cdot \text{MR}_I P_I) + (f_{\text{load}} + f_{\text{store}})\,\text{MR}_D P_D$ (never multiply an absolute `Store Misses` integer count by $\text{MR}_D$!).
- **Hybrid absolute-miss form:** $\text{Stalls}_D = \dfrac{\text{Misses}_{\text{load}} + \text{Misses}_{\text{store}}}{\text{IC}} \cdot P_D$.
