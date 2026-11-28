#drills/computer-architecture/06_cache_memory/23_cache_performance

*(Jan 2026 C1 Q3)* Compute `Stalls_D` (per instruction) given:
- $\text{IC} = 2{,}000$ instructions, $f_{\text{LOAD}} = 20\%$, **`Store Misses = 15`**
- $\text{MR}_D = 4\%$, $\text{MissPenalty}_D = 45\text{ cycles}$
Spot the fatal error in $(0.20 + 15/2000) \times 0.04 \times 45 = 0.3735$.
?
`Store Misses = 15` is **already an absolute miss count**, NOT an instruction count — multiplying $15$ by $\text{MR}_D = 0.04$ undercounts store misses by $25\times$!
- **Load misses:** $2{,}000 \times 0.20 \times 0.04 = 16\text{ misses}$
- **Total D-misses:** $16 + 15 = 31\text{ misses}$
- **Exact `Stalls_D`:** $\frac{31}{2{,}000} \times 45 = \mathbf{0.6975\text{ cycles/instr}}$

---

*(June 2025 Q5)* A Harvard processor has $\text{CPI}_{\text{exe}} = 1.6$, $f_{\text{LOAD}} = 15\%$, $f_{\text{STORE}} = 15\%$, $\text{MR}_I = 3\%$, $P_I = 40\text{ cycles}$, $\text{MR}_D = 6\%$, $P_D = 40\text{ cycles}$.
A student writes $\text{CPI} = 1.6 + (0.03 \times 40) + (0.06 \times 40) = 5.20$. Fix the error.
?
$$\text{CPI} = 1.6 + (1.0 \times 0.03 \times 40) + \mathbf{(0.15 + 0.15)} \times 0.06 \times 40 = 1.6 + 1.20 + 0.72 = \mathbf{3.52}$$
- **Trap avoided:** Every instruction fetches from `I-Cache` ($\times 1.0$), whereas **only Loads and Stores** ($30\%$) access `D-Cache`!

---

*(July 16, 2026 Q4)* Reference Cache A ($B = 16\text{ B}$) has $t_{\text{hit},A} = 1\text{ ns}$, $\text{MR}_A = 4\%$, $\text{MP}_A = 40\text{ ns}$ ($\text{AMAT}_A = 2.60\text{ ns}$).
Candidate Cache C ($B = 64\text{ B}$) has $\text{MR}_C = 3.5\%$ and **$\text{MP}_C = 44\text{ ns}$**. Find the maximum allowable Hit Time $t_{\text{hit},C,\max}$.
?
$$t_{\text{hit},C} + (0.035 \times \mathbf{44}) \le 2.60 \implies t_{\text{hit},C} \le 2.60 - 1.54 = \mathbf{1.06\text{ ns}}$$
- **Trap avoided:** Larger blocks ($64\text{ B}$ vs. $16\text{ B}$) raise Cache C's Miss Penalty in the table to **$44\text{ ns}$**—carelessly reusing Cache A's $40\text{ ns}$ gives the wrong answer ($1.20\text{ ns}$).

---

*(Sept 4, 2026 Q4)* Reference Cache A has $t_{\text{hit},A} = 1.1\text{ ns}$, $\text{MR}_A = 3\%$, $\text{MP}_A = 40\text{ ns}$ ($\text{AMAT}_A = 2.30\text{ ns}$).
Candidate Cache C has $t_{\text{hit},C} = 1.15\text{ ns}$ and $\text{MP}_C = 44\text{ ns}$. Find the maximum allowable Miss Rate $\text{MR}_{C,\max}$ (in $\%$).
?
$$1.15 + 44 \cdot \text{MR}_C \le 2.30 \implies \text{MR}_C \le \frac{2.30 - 1.15}{44} = \frac{1.15}{44} \approx 0.02614 = \mathbf{2.614\%}$$

---

*(Slide Deck CA-INF25)* Over $1{,}000$ CPU memory references, `L1` ($t_{\text{hit},L1} = 1\text{ cycle}$) records **$40$ misses**, and `L2` ($t_{\text{hit},L2} = 10\text{ cycles}$, $\text{MP}_{L2} = 100\text{ cycles}$) records **$20$ misses**.
Spot why $1 + 0.04(10 + 0.02 \times 100) = 1.48\text{ cycles}$ is wrong, and compute the true two-level $\text{AMAT}$.
?
$20 / 1{,}000 = 2\%$ is the **global** `L2` miss rate; plugging it inside $0.04(\dots)$ multiplies by $\text{MR}_{L1}$ **twice**!
- **Local `L2` miss rate:** $\text{MR}_{L2} = \frac{20\text{ L2 misses}}{40\text{ L1 misses}} = \mathbf{50\%}$ ($0.50$).
- **True $\text{AMAT}$:** $1 + 0.04 \times (10 + 0.50 \times 100) = 1 + 0.40 + 2.00 = \mathbf{3.4\text{ cycles}}$.
