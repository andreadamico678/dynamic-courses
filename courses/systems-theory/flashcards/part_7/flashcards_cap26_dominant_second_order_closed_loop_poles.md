#flashcards/automatica/07_03_dominant_poles

What is the standard second-order prototype closed-loop transfer function $W_2(s)$ parameterized by $\zeta$ and $\omega_n$?
?
$$W_2(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

---

For an underdamped second-order pair ($0 < \zeta < 1$), how do $\sigma$, $\omega_d$, $\zeta$, and $\omega_n$ relate to the poles $\mu_{1,2}$?
?
$\mu_{1,2} = -\sigma \pm j\omega_d$ with $\sigma = \zeta\omega_n$, $\omega_d = \omega_n\sqrt{1 - \zeta^2}$, and $\omega_n^2 = \sigma^2 + \omega_d^2$.

---

What formula maps a fractional percent overshoot bound $\hat{s}$ (in decimal, e.g. $0.05$ for $5\%$) to the minimum damping ratio $\zeta$?
?
$$\zeta = \frac{|\ln(\hat{s})|}{\sqrt{\pi^2 + \ln^2(\hat{s})}}$$

---

How do the $5\%$ and $2\%$ settling-time approximations fix the dominant decay rate $\sigma = \zeta\omega_n$?
?
$$\sigma \ge \frac{3}{T_{s,5\%}} \qquad \text{or} \qquad \sigma \ge \frac{4}{T_{s,2\%}}$$

---

What is the peak time $T_p$ of the underdamped second-order step response?
?
$$T_p = \frac{\pi}{\omega_d}$$

---

How does the Rule of Five choose auxiliary real poles $\mu_k$ ($k \ge 3$) relative to the dominant real part $-\sigma$?
?
Place them inside the balanced separation window $3\sigma \le |\operatorname{Re}(\mu_k)| \le 6\sigma$ (standard exam choice: $\mu_k = -5\sigma$).

---

Why does placing an auxiliary pole at $\mu_3 = -5\sigma$ make its transient negligible in the step response?
?
By $t = 1/\sigma$, its exponential decays to $e^{-5} \approx 0.0067$ (below $0.7\%$) while its residue amplitude is also suppressed by pole separation.

---

Why should auxiliary closed-loop poles avoid being pushed extremely far left (e.g., $\mu_k = -50\sigma$)?
?
Because $\alpha_0 = \prod |\mu_i|$ inflates feedback gains $\mathbf{K}$, causing actuator saturation, sensor noise amplification, and excitation of unmodeled high-frequency dynamics.
