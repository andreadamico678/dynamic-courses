#flashcards/automatica/02_02_partial_fraction_expansion_heaviside_residues

What degree condition on $F(s) = N(s)/D(s)$ must hold before performing partial fraction expansion?
?
$F(s)$ must be strictly proper ($\deg N < \deg D$).

---

What step is mandatory when $F(s) = N(s)/D(s)$ is biproper or improper ($\deg N \ge \deg D$)?
?
Perform Euclidean polynomial long division first to obtain $F(s) = Q(s) + \frac{R(s)}{D(s)}$ with $\deg R < \deg D$.

---

In the time domain, what waveforms come from a non-zero polynomial quotient $Q(s) = q_0 + q_1 s + \dots$ after long division?
?
A Dirac delta impulse $q_0 \delta(t)$ and generalized distributional derivatives $q_1 \dot{\delta}(t) + \dots$ at $t = 0$.

---

How is the residue $R_i$ computed for a simple pole at $s = p_i$ by Heaviside cover-up?
?
$$R_i = \lim_{s \to p_i} (s - p_i) F(s)$$

---

Why does a repeated pole $(s - p)^m$ require differentiation to obtain lower-order coefficients $A_{m-1}, \dots, A_1$?
?
Clearing $(s - p)^m$ gives $(s - p)^m F(s) = A_m + A_{m-1}(s - p) + \dots$, so only $A_m$ survives at $s = p$ and lower coefficients appear in higher Taylor derivatives.

---

What is the differential residue formula for coefficient $A_{m-k}$ of $\frac{1}{(s - p)^{m-k}}$ in a pole of multiplicity $m$?
?
$$A_{m-k} = \frac{1}{k!} \lim_{s \to p} \frac{d^k}{ds^k}\big[(s - p)^m F(s)\big], \qquad k = 0, 1, \dots, m - 1$$

---

What is the inverse Laplace transform of a single repeated-pole term $\frac{A_r}{(s - p)^r}$ ($r \ge 1$)?
?
$$A_r \frac{t^{r-1}}{(r-1)!} e^{pt} \cdot 1(t)$$

---

How is a real irreducible quadratic fraction $\frac{Bs + C}{(s - \sigma)^2 + \omega^2}$ rewritten before inversion?
?
Complete the numerator around $(s - \sigma)$: $B\frac{s - \sigma}{(s - \sigma)^2 + \omega^2} + \left(\frac{C + B\sigma}{\omega}\right)\frac{\omega}{(s - \sigma)^2 + \omega^2}$.

---

What is the real time-domain inverse of $\frac{B(s - \sigma) + (C + B\sigma)}{(s - \sigma)^2 + \omega^2}$?
?
$$e^{\sigma t}\left[B\cos(\omega t) + \left(\frac{C + B\sigma}{\omega}\right)\sin(\omega t)\right]\cdot 1(t)$$

---

After computing residues for a strictly proper $F(s)$, how can you quickly cross-check them using the Initial Value Theorem?
?
Verify that $\sum R_i$ (simple poles, or simple + $A_1$ coefficients) matches $\lim_{s \to \infty} sF(s)$.
