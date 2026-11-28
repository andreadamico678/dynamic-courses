#flashcards/computer-architecture/02_computer_performance/06_cpu_performance_equation

What is the **CPU Performance Equation** (Iron Law) for wall-clock execution time $T_{\text{exec}}$?
?
$$T_{\text{exec}} = \text{IC} \times \text{CPI} \times T_{\text{clk}} = \frac{\text{IC} \times \text{CPI}}{f_{\text{clk}}}$$
where $\text{IC}$ is dynamic instruction count, $\text{CPI}$ is average cycles per instruction, and $T_{\text{clk}} = 1 / f_{\text{clk}}$ is the clock period.

---

How do you compute weighted average $\text{CPI}$ from an instruction mix $(f_i, \text{CPI}_i)$?
?
$$\text{CPI} = \sum_{i=1}^{m} f_i \cdot \text{CPI}_i, \qquad f_i = \frac{\text{IC}_i}{\text{IC}} \;\; \left(\sum_{i=1}^m f_i = 1\right)$$

---

How do you convert instruction share $f_i$ into **execution-time share $F_i$**?
?
$$F_i = \frac{f_i \cdot \text{CPI}_i}{\text{CPI}}$$
Fast 1-cycle instructions take less runtime share than $f_i$, whereas slow multi-cycle instructions take more.

---

What happens to $\text{CPI}_{\text{new}}$ and $T_{\text{exec,new}}$ when a compiler deletes fast 1-cycle ALU instructions while keeping multi-cycle instructions unchanged?
?
$T_{\text{exec,new}}$ **decreases** (fewer total clock cycles), while average **$\text{CPI}_{\text{new}}$ rises** because slower instructions form a larger share of the smaller $\text{IC}_{\text{new}}$; always recompute $C_{\text{tot}}^{\text{new}} / \text{IC}_{\text{new}}$ instead of reusing old $f_i$.

---

How do you express relative speedup $S$ between baseline machine $A$ and faster machine $B$, and distinguish "25% faster" from "25% less time"?
?
$S = \frac{\text{Perf}_B}{\text{Perf}_A} = \frac{T_{\text{exec},A}}{T_{\text{exec},B}}$.
- **"25% faster"** means $S = 1.25 \implies T_B = T_A / 1.25 = 0.80\,T_A$.
- **"25% less time"** means $T_B = 0.75\,T_A \implies S = 1 / 0.75 = 1.33\times$.

---

Why is $\text{MIPS} = \frac{\text{IC}}{T_{\text{exec}} \times 10^6} = \frac{f_{\text{clk}}}{\text{CPI} \times 10^6}$ unreliable for comparing different ISAs or compiler optimizations?
?
Because $\text{MIPS}$ ignores $\text{IC}$: a program executing many simple instructions can report higher $\text{MIPS}$ while taking longer $T_{\text{exec}}$, and deleting 1-cycle ALU ops lowers $\text{MIPS}$ on a faster binary.
