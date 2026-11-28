#drills/computer-architecture/02_computer_performance/06_cpu_performance_equation

A program's dynamic mix contains $20\%$ `lw` instructions ($f_{\text{load}} = 0.20$), each taking $\text{CPI}_{\text{load}} = 4$ cycles, while overall weighted $\text{CPI} = 1.60$.
What fraction $F_{\text{load}}$ of **total CPU execution time** is spent on `lw` instructions?
?
$$F_{\text{load}} = \frac{f_{\text{load}} \cdot \text{CPI}_{\text{load}}}{\text{CPI}} = \frac{0.20 \times 4}{1.60} = \mathbf{0.50 \quad (50\%)}$$
- **Trap avoided:** $f_{\text{load}} = 20\%$ is the share of *instructions*, whereas slow 4-cycle loads consume **50%** of total clock cycles and execution time.

---

A baseline binary executes $\text{IC}_{\text{old}} = 1{,}000$ instructions at fixed $f_{\text{clk}}$: $500$ ALU instructions ($\text{CPI} = 1$) and $500$ non-ALU instructions ($\text{CPI} = 3$), giving $\text{CPI}_{\text{old}} = 2.00$.
A compiler flag deletes $200$ ALU instructions ($300$ ALU remain; non-ALU stay $500$). Compute $\text{CPI}_{\text{new}}$ and state whether execution sped up or slowed down.
?
- **New cycles:** $C_{\text{new}} = 300(1) + 500(3) = 1{,}800\text{ cycles}$ (down from $2{,}000$).
- **New CPI:** $\text{CPI}_{\text{new}} = 1{,}800 / 800 = \mathbf{2.25}$ (higher than $2.00$!).
- **Verdict:** Execution **sped up by $2{,}000 / 1{,}800 = 1.11\times$**.
- **Trap avoided:** Deleting fast 1-cycle instructions raises average $\text{CPI}$ (and lowers $\text{MIPS}$) while strictly *reducing* total runtime $T_{\text{exec}}$; also never reuse old $f_i$ shares once $\text{IC}$ changes.

---

Baseline Core A finishes a benchmark in $T_A = 40\text{ ms}$.
- Spec 1 states Core B is **"25% faster than Core A"**.
- Spec 2 states Core C **"reduces execution time by 25% compared to Core A"**.
Compute $T_B$ and $T_C$.
?
- **$T_B = 40\text{ ms} / 1.25 = \mathbf{32\text{ ms}}$** ($S = T_A / T_B = 1.25$).
- **$T_C = 40\text{ ms} \times (1 - 0.25) = \mathbf{30\text{ ms}}$** ($S = 40 / 30 = 1.33\times$).
- **Trap avoided:** "$n\%$ faster" applies $1 + n/100$ to *performance* ($1 / T_{\text{exec}}$), not $1 - n/100$ to time.

---

Deepening a $2.0\text{ GHz}$ processor's pipeline on the exact same binary ($\text{IC}_{\text{new}} = \text{IC}_{\text{old}}$) inflates average $\text{CPI}$ from $1.50$ to $1.80$ due to wider branch penalties.
What minimum new clock frequency $f_{\text{clk,new}}$ is required to achieve a $1.50\times$ net speedup?
?
$$f_{\text{clk,new}} = S_{\text{target}} \cdot \frac{\text{CPI}_{\text{new}}}{\text{CPI}_{\text{old}}} \cdot f_{\text{clk,old}} = 1.50 \times \frac{1.80}{1.50} \times 2.0\text{ GHz} = \mathbf{3.60\text{ GHz}}$$
- **Trap avoided:** Multiplying $2.0\text{ GHz} \times 1.50 = 3.0\text{ GHz}$ ignores the $20\%$ $\text{CPI}$ penalty ($1.50 \to 1.80$) that must be paid back first ($2.4\text{ GHz}$ just to break even).
