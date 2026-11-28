#flashcards/automatica/05_01_bode_magnitude

Why must all poles of $W(s)$ lie strictly in the open left half-plane to interpret $W(j\omega)$ as the steady-state sinusoidal frequency response?
?
So all transient poles decay to zero as $t \to \infty$, leaving only the persistent sinusoid of amplitude $|W(j\omega)| U$ and phase $\arg W(j\omega)$.

---

How is the Bode gain $K_B$ computed from a transfer function in Evans pole-zero form?
?
Factor constant terms out of every $(s + a)$ binomial into $(1 + s/a)$ form so that $K_B = \lim_{s \to 0} s^g W(s)$.

---

What is the difference between Evans proportional gain $K$ and Bode gain $K_B$?
?
Evans $K$ multiplies unnormalized monic $(s - z_i)/(s - p_k)$ factors, whereas Bode $K_B$ multiplies unit-DC factors $(1 + s\tau)$ and fixes the $20\log_{10}|K_B|$ intercept at $\omega = 1\text{ rad/s}$.

---

What universal anchor point fixes the low-frequency asymptote $W_{\text{LF}}(j\omega) = K_B / (j\omega)^g$ on a Bode magnitude plot?
?
The point $(\omega = 1\text{ rad/s}, \; 20\log_{10}|K_B|\text{ dB})$ with initial slope $S_0 = -20g\text{ dB/decade}$.

---

What are the asymptotic slope change and exact corner error of a stable simple real pole $(1 + s/\omega_c)^{-1}$?
?
Slope drops by $-20\text{ dB/decade}$ above $\omega_c$, and the exact magnitude sits $-3.01\text{ dB}$ below the sharp vertex at $\omega = \omega_c$.

---

What are the asymptotic slope change and exact corner error of a stable simple real zero $(1 + s/\omega_c)$?
?
Slope rises by $+20\text{ dB/decade}$ above $\omega_c$, and the exact magnitude sits $+3.01\text{ dB}$ above the sharp vertex at $\omega = \omega_c$.

---

Why is subtracting $-3.01\text{ dB}$ from the slope at $\omega_c$ wrong when drafting a Bode magnitude plot?
?
$-3.01\text{ dB}$ is solely a vertical point offset at $\omega = \omega_c$ between the piecewise-linear asymptotes and the exact curve; the slope changes by $-20\text{ dB/decade}$.

---

What formula walks from one corner height $y(\omega_k)$ to the next vertex $y(\omega_{k+1})$ along a linear segment of slope $S_{\text{current}}$?
?
$$y(\omega_{k+1}) = y(\omega_k) + S_{\text{current}} \log_{10}\!\left(\frac{\omega_{k+1}}{\omega_k}\right)$$

---

For a second-order complex pole pair $\left(1 + \frac{2\zeta}{\omega_n}s + \frac{s^2}{\omega_n^2}\right)^{-1}$, what is the high-frequency slope and exact magnitude at $\omega = \omega_n$?
?
High-frequency slope is $-40\text{ dB/decade}$, and at $\omega = \omega_n$ the exact magnitude is $|F_{p2}(j\omega_n)|_{\text{dB}} = -20\log_{10}(2\zeta)\text{ dB}$.

---

For what range of damping ratio $\zeta > 0$ does a second-order complex pole pair exhibit a resonant peak $M_r > 1$?
?
If and only if $0 < \zeta < \frac{1}{\sqrt{2}} \approx 0.707$.

---

When $0 < \zeta < 1/\sqrt{2}$, what are the resonant peak frequency $\omega_r$ and peak magnitude $M_r$?
?
$$\omega_r = \omega_n\sqrt{1 - 2\zeta^2}, \qquad M_r = \frac{1}{2\zeta\sqrt{1 - \zeta^2}}$$
