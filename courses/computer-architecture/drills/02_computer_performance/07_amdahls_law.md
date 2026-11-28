#drills/computer-architecture/02_computer_performance/07_amdahls_law

Floating-point multiplies represent $10\%$ of dynamic instructions ($f_{\text{FP}} = 0.10$) at $6$ cycles each, while overall baseline $\text{CPI}_{\text{old}} = 2.0$. A pipelined FPU reduces multiply latency from $6$ cycles to $2$ cycles ($S = 3$).
Spot what goes wrong if you plug $F = 0.10$ into Amdahl's Law, and compute the true overall speedup $S_{\text{tot}}$.
?
$F$ in Amdahl's Law must be the fraction of baseline **execution time**, not instruction count:
$$F = \frac{f_{\text{FP}} \cdot \text{CPI}_{\text{FP}}}{\text{CPI}_{\text{old}}} = \frac{0.10 \times 6}{2.0} = 0.30 \implies S_{\text{tot}} = \frac{1}{(1 - 0.30) + \dfrac{0.30}{3}} = \frac{1}{0.80} = \mathbf{1.25\times}$$
- **Trap avoided:** Plugging $F = 0.10$ falsely yields $1 / (0.90 + 0.033) = 1.07\times$.

---

Memory stalls account for $F = 60\%$ of a program's baseline runtime. An architect asks what local memory speedup $S$ is required to achieve a $3.0\times$ overall system speedup.
Answer immediately without solving for $S$.
?
**Impossible with any finite or infinite memory upgrade.**
- **Trap avoided:** Always check the asymptotic ceiling first: $S_{\max} = \frac{1}{1 - 0.60} = 2.50\times < 3.0\times$. Blindly solving $S = \frac{0.60}{1/3 - 0.40}$ produces a nonsensical negative speedup ($S = -9$).

---

*(Slide Deck CA-INF15)* Which hardware investment delivers the larger overall speedup?
- **Option A:** Accelerate floating-point instructions ($10\%$ of baseline time) by $5\times$.
- **Option B:** Accelerate the integer ALU ($50\%$ of baseline time) by $1.5\times$.
?
**Option B ($1.20\times$ vs. $1.087\times$).**
- Option A: $S_A = \frac{1}{0.90 + 0.10 / 5} = \frac{1}{0.92} \approx 1.087\times$ ($+8.7\%$).
- Option B: $S_B = \frac{1}{0.50 + 0.50 / 1.5} = \frac{1}{0.833} = \mathbf{1.20\times}$ ($+20\%$).
- **Takeaway:** Accelerating the common case ($F = 50\%$) beats big local gains on rare operations ($F = 10\%$).

---

*After* deploying a $2\times$ hardware accelerator ($S = 2$), profiling the **new** execution shows the accelerated routine now consumes $50\%$ of the **new** runtime $T_{\text{new}}$.
Why is $S_{\text{tot}} = \frac{1}{0.50 + 0.50/2} = 1.33\times$ wrong, and what actual speedup $T_{\text{old}} / T_{\text{new}}$ occurred?
?
**Actual speedup:** **$1.50\times$**.
- **Trap avoided:** $50\%$ was measured *post-optimization* ($0.5\,T_{\text{new}}$ unenhanced, $0.5\,T_{\text{new}}$ accelerated). Before the $2\times$ speedup, the accelerated part took $2 \times 0.5\,T_{\text{new}} = 1.0\,T_{\text{new}}$, so $T_{\text{old}} = 0.5\,T_{\text{new}} + 1.0\,T_{\text{new}} = 1.5\,T_{\text{new}}$ ($F_{\text{old}} = 2/3$).
