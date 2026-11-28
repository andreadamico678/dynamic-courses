#flashcards/automatica/02_01_laplace_primitives

Why is the lower integration limit of the Unilateral Laplace Transform set to $t = 0^-$ instead of $t = 0^+$?
?
To capture initial stored conditions prior to switching ($0^-$) and Dirac impulses concentrated at $t = 0$.

---

What is the Region of Convergence (ROC) of $F(s) = \int_{0^-}^\infty f(t)e^{-st}\,dt$ for a causal signal bounded by $|f(t)| \le M e^{\sigma_0 t}$?
?
The open right half-plane $\operatorname{Re}(s) > \sigma_0$, strictly to the right of the rightmost pole of $F(s)$.

---

What are the Unilateral Laplace Transforms of $\delta(t)$, $1(t)$, and $\frac{t^n}{n!}1(t)$?
?
$\mathcal{L}\{\delta(t)\} = 1$, $\mathcal{L}\{1(t)\} = \frac{1}{s}$, and $\mathcal{L}\left\{\frac{t^n}{n!}1(t)\right\} = \frac{1}{s^{n+1}}$.

---

What are the Unilateral Laplace Transforms of $e^{at}1(t)$, $e^{-\alpha t}\cos(\omega t)1(t)$, and $e^{-\alpha t}\sin(\omega t)1(t)$?
?
$\frac{1}{s - a}$, $\frac{s + \alpha}{(s + \alpha)^2 + \omega^2}$, and $\frac{\omega}{(s + \alpha)^2 + \omega^2}$.

---

What is the Time Translation Theorem for a causal delayed signal $f(t - \tau)1(t - \tau)$ ($\tau > 0$)?
?
$$\mathcal{L}\{f(t - \tau)1(t - \tau)\} = e^{-s\tau} F(s)$$

---

What common error occurs when transforming a delayed waveform written with unshifted time $t$ instead of $(t - \tau)$?
?
Pulling out $e^{-s\tau}$ directly without first rewriting $f$ as a function of $(t - \tau)$ yields the wrong transform.

---

What is the Frequency Translation Theorem for $\mathcal{L}\{e^{at}f(t)\}$?
?
$$\mathcal{L}\{e^{at}f(t)\} = F(s - a)$$

---

What is the Unilateral Laplace Transform of the first derivative $\dot{f}(t)$ and second derivative $\ddot{f}(t)$?
?
$\mathcal{L}\{\dot{f}(t)\} = sF(s) - f(0^-)$ and $\mathcal{L}\{\ddot{f}(t)\} = s^2 F(s) - s f(0^-) - \dot{f}(0^-)$.

---

What is the Frequency Differentiation property for $\mathcal{L}\{t f(t)\}$?
?
$$\mathcal{L}\{t f(t)\} = -\frac{d}{ds}F(s)$$

---

What is the Initial Value Theorem (IVT) for a rational Laplace transform $F(s)$?
?
$$f(0^+) = \lim_{s \to \infty} s F(s)$$

---

What is the strict precondition required to apply the Final Value Theorem $\lim_{t \to \infty} f(t) = \lim_{s \to 0} s F(s)$?
?
Every pole of $sF(s)$ must lie strictly in the open left half-plane ($\operatorname{Re}(p_i) < 0$).

---

Why does applying the Final Value Theorem to $F(s) = \frac{\omega}{s^2 + \omega^2}$ fail even though $\lim_{s \to 0} sF(s) = 0$ exists algebraically?
?
Because $sF(s)$ has poles on the imaginary axis ($\pm j\omega$), violating the open-LHP precondition, and $\lim_{t \to \infty} \sin(\omega t)$ does not exist.
