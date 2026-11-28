#flashcards/automatica/05_02_bode_phase

Why do Bode plots examine open-loop $L(s) = C(s)G(s)$ to assess stability of a unity negative-feedback loop $W_{\text{CL}}(s) = \frac{L(s)}{1 + L(s)}$?
?
Closed-loop poles solve $1 + L(s) = 0 \iff L(s) = -1$, so proximity of $L(j\omega)$ to $(-1 + j0) = (0\text{ dB}, -180^\circ)$ measures closed-loop stability margins.

---

What is the exact low-frequency phase limit $\varphi(0^+)$ of a minimum-phase transfer function with Bode gain $K_B$ and type $g$?
?
$$\varphi(0^+) = \arg(K_B) - g \cdot 90^\circ$$

---

What baseline phase shift $\arg(K_B)$ occurs when $K_B > 0$ versus when $K_B < 0$?
?
$0^\circ$ when $K_B > 0$, and $-180^\circ$ across all frequencies when $K_B < 0$.

---

What is the exact high-frequency phase limit $\varphi(\infty)$ of a minimum-phase rational function with $n$ total poles and $m$ finite zeros?
?
$$\varphi(\infty) = \arg(K_B) - (n - m)\cdot 90^\circ$$

---

Over what frequency band does the 3-segment linear phase ramp of a simple real pole $(1 + s/\omega_c)^{-1}$ run, and with what slope?
?
From $0.1\omega_c$ to $10\omega_c$ with slope $-45^\circ/\text{decade}$, passing exactly through $(\omega_c, -45^\circ)$.

---

What is the maximum error between the 3-segment asymptotic phase ramp and $-\arctan(\omega/\omega_c)$, and where does it occur?
?
$\arctan(0.1) \approx 5.71^\circ$, occurring at the two ramp endpoints $\omega = 0.1\omega_c$ and $\omega = 10\omega_c$.

---

At $\omega = \omega_n$, what is the exact phase and normalized slope $d\varphi_{p2}/d(\omega/\omega_n)$ of a second-order complex pole pair?
?
Exact phase is always $-90^\circ$ regardless of $\zeta$, and the slope at $\omega = \omega_n$ equals $-1/\zeta\text{ rad}$.

---

How are the gain crossover frequency $\omega_{gc}$ and phase margin $\varphi_m$ defined on open-loop $L(j\omega)$?
?
$\omega_{gc}$ solves $|L(j\omega_{gc})| = 1$ ($0\text{ dB}$), and $\varphi_m = 180^\circ + \arg L(j\omega_{gc})$.

---

How are the phase crossover frequency $\omega_\pi$ and gain margin $K_{m,\text{dB}}$ defined on open-loop $L(j\omega)$?
?
$\omega_\pi$ solves $\arg L(j\omega_\pi) = -180^\circ$, and $K_{m,\text{dB}} = -|L(j\omega_\pi)|_{\text{dB}} = 20\log_{10}(1/|L(j\omega_\pi)|)$.

---

What trigonometric identity solves $\arctan(\omega_\pi/\omega_1) + \arctan(\omega_\pi/\omega_2) = 90^\circ$ algebraically for $\omega_\pi$?
?
$\arctan(a) + \arctan(b) = 90^\circ \iff a \cdot b = 1$, yielding $\omega_\pi = \sqrt{\omega_1 \omega_2}$.
