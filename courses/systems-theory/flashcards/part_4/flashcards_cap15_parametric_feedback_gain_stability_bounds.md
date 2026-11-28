#flashcards/automatica/04_05_parametric_stability

For a unity negative-feedback loop with plant $G(s) = N(s)/D(s)$ and proportional gain $K$, what is the parameterized closed-loop characteristic polynomial $p(s, K)$?
?
$$p(s, K) = D(s) + K N(s) = 0$$

---

Why must you verify $N(s)$ and $D(s)$ share no unstable common factors before relying on $p(s, K) = D(s) + K N(s) = 0$?
?
An unstable pole-zero cancellation hides an RHP mode inside the loop even when the reduced roots look stable.

---

How do you compute the stabilizing gain interval $(K_{\min}, K_{\max})$ from a symbolic Routh array?
?
Enforce Stodola's bounds $a_i(K) > 0$ and solve $c_{k,1}(K) > 0$ for every Column 1 entry simultaneously.

---

When a Column 1 entry is a rational expression $f(K)/g(K)$, why does stability reduce to checking only $f(K) > 0$?
?
Its denominator $g(K)$ is the pivot of the row above, which is already forced strictly positive by its own Column 1 inequality.

---

Which two boundary conditions correspond to closed-loop poles crossing the imaginary axis as $K$ varies?
?
A real pole crosses at $s = 0$ when $a_0(K) = 0$, or a complex conjugate pair crosses at $\pm j\omega_{\text{osc}}$ when row $s^1$ vanishes.

---

When row $s^1$ vanishes at $K = K_{\text{crit}}$ for any polynomial degree $n \ge 3$, which Routh row gives the auxiliary equation $A(s) = \alpha_1 s^2 + \alpha_2 = 0$?
?
Row $s^2$ (entries $[\alpha_1, \alpha_2]$) immediately above the vanishing $s^1$ row—never row $s^{n-2}$ when $n \ge 4$.

---

What is the sustained oscillation frequency $\omega_{\text{osc}}$ at $K = K_{\text{crit}}$ from row $s^2 = [\alpha_1, \alpha_2]$?
?
$$\omega_{\text{osc}} = \sqrt{\frac{\alpha_2(K_{\text{crit}})}{\alpha_1(K_{\text{crit}})}}$$
