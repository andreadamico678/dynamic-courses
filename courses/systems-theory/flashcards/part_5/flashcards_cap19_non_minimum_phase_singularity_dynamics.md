#flashcards/automatica/05_03_non_minimum_phase

When is a causal open-loop transfer function $L(s)$ classified as non-minimum phase (NMP)?
?
When it contains at least one RHP zero ($\operatorname{Re}(z_i) > 0$), RHP pole, or pure transport delay $e^{-sT_d}$ ($T_d > 0$).

---

How does the all-pass factorization $L_{\text{NMP}}(s) = L_{\text{MP}}(s) \cdot A(s)$ decompose an RHP zero $(1 - s/\omega_z)$?
?
$L_{\text{NMP}}(s) = \left[L_{\text{NMP}}(s)\frac{1 + s/\omega_z}{1 - s/\omega_z}\right] \cdot \left(\frac{1 - s/\omega_z}{1 + s/\omega_z}\right)$, where $|A(j\omega)| = 1$ and $\arg A(j\omega) = -2\arctan(\omega/\omega_z)$.

---

How does a single RHP zero factor $(1 - s/\omega_z)$ ($\omega_z > 0$) affect Bode magnitude and Bode phase?
?
Magnitude bends upward by $+20\text{ dB/decade}$ above $\omega_z$ (like an LHP zero), while phase drops by $-90^\circ$ via $-\arctan(\omega/\omega_z)$ (same phase ramp $-45^\circ/\text{dec}$ as an LHP pole).

---

For $W(s) = \frac{1 - s/z_0}{(1 + s/p_1)(1 + s/p_2)}$ with $z_0, p_1, p_2 > 0$, what is the initial unit-step slope $\dot{y}(0^+)$ by IVT?
?
$$\dot{y}(0^+) = \lim_{s \to \infty} s W(s) = -\frac{p_1 p_2}{z_0} < 0$$
causing negative initial undershoot before settling to $W(0) = +1$.

---

Why is cancelling a plant RHP zero $(1 - s/z_0)$ with a controller pole $1/(1 - s/z_0)$ strictly forbidden?
?
The RHP pole cancels out of $W_{\text{CL}}(s)$ externally, leaving a hidden unstable internal mode $e^{+z_0 t}$ that diverges under disturbances.

---

What practical closed-loop bandwidth ceiling does an uncancellable RHP zero at $s = +z_0$ impose on $\omega_{gc}$?
?
$\omega_{gc} \lesssim z_0 / 2$, because near $\omega \approx z_0$ the RHP zero consumes phase margin without reducing loop gain.

---

What are the exact Bode magnitude (in dB) and phase (in degrees) of a pure transport delay $e^{-sT_d}$ ($T_d > 0$)?
?
$|e^{-j\omega T_d}|_{\text{dB}} = 0\text{ dB}$ at all frequencies, and $\arg(e^{-j\omega T_d}) = -\omega T_d \cdot \frac{180^\circ}{\pi}$ (unbounded linear phase lag in rad).

---

How does the first-order Padé approximation link pure delay $e^{-sT_d}$ to an RHP zero?
?
$$e^{-sT_d} \approx \frac{1 - s(T_d/2)}{1 + s(T_d/2)}$$
which is an all-pass filter with an LHP pole at $-2/T_d$ and an RHP zero at $+2/T_d$.

---

What practical closed-loop bandwidth ceiling does a pure time delay $T_d$ impose on $\omega_{gc}$?
?
$\omega_{gc} \lesssim 1/T_d$, because at $\omega = 1/T_d$ delay alone consumes $1\text{ rad} \approx 57.3^\circ$ of phase margin.
