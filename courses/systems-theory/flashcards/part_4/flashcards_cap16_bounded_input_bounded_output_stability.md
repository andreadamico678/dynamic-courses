#flashcards/automatica/04_06_bibo_stability

What initial-state assumption defines Bounded-Input Bounded-Output (BIBO) stability?
?
Zero initial state ($\mathbf{x}(0) = \mathbf{0}$), isolating purely the forced input-output map.

---

What is the formal time-domain definition of BIBO stability?
?
Every bounded input ($\sup_{t \ge 0} |u(t)| \le M_u < \infty$) produces a bounded output ($\sup_{t \ge 0} |y(t)| \le M_y < \infty$).

---

What is the exact necessary and sufficient impulse-response condition for BIBO stability of an LTI system?
?
Absolute integrability of the impulse response ($L_1$ norm): $\|w\|_1 = \int_0^\infty |w(t)|\,dt < \infty$.

---

What adversarial bounded input proves necessity of $\|w\|_1 < \infty$ over a horizon $T$?
?
Setting $u_T(t) = \operatorname{sgn}(w(T - t))$ ($|u_T| \le 1$) drives $y(T) = \int_0^T |w(\tau)|\,d\tau \to \infty$ if $\|w\|_1 = \infty$.

---

What is the necessary and sufficient $s$-domain pole condition for BIBO stability of a rational transfer function $W(s)$?
?
After cancelling any common numerator-denominator factors, every pole $p_k$ of reduced $W(s)$ satisfies $\operatorname{Re}(p_k) < 0$.

---

Are an integrator $W(s) = 1/s$ or an undamped oscillator $W(s) = 1/(s^2 + \omega_0^2)$ BIBO stable?
?
No; they are internally simply stable, but their impulse responses are not absolutely integrable and bounded resonant inputs drive unbounded outputs.

---

Does internal asymptotic stability of $(\mathbf{A}, \mathbf{B}, \mathbf{C})$ always imply BIBO stability?
?
Yes, because $\operatorname{poles}(W(s)) \subseteq \sigma(\mathbf{A})$, so all $\operatorname{Re}(\lambda_i) < 0$ forces all $\operatorname{Re}(p_k) < 0$.

---

Why does BIBO stability of $W(s)$ fail to guarantee internal asymptotic stability in general?
?
An unstable eigenvalue ($\operatorname{Re}(\lambda_i) \ge 0$) can cancel from $W(s)$ if that mode is uncontrollable or unobservable, leaving $W(s)$ stable while states diverge.

---

Under what exact structural condition are BIBO stability and internal asymptotic stability equivalent?
?
If and only if $(\mathbf{A}, \mathbf{B}, \mathbf{C})$ is minimal (completely controllable and completely observable), preventing pole-zero cancellations.
