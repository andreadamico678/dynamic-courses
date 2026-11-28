#flashcards/automatica/03_03_lagrange_convolution

What is Lagrange's complete state trajectory formula for $\dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t)$ starting from $\mathbf{x}(0) = \mathbf{x}_0$?
?
$$\mathbf{x}(t) = e^{\mathbf{A}t}\mathbf{x}_0 + \int_0^t e^{\mathbf{A}(t-\tau)}\mathbf{B}\mathbf{u}(\tau)\,d\tau$$

---

How does Lagrange's formula partition the total response $\mathbf{y}(t)$ into free and forced components?
?
$\mathbf{y}(t) = \mathbf{y}_l(t) + \mathbf{y}_f(t)$, where $\mathbf{y}_l(t)$ is from $\mathbf{x}_0$ with $\mathbf{u} \equiv \mathbf{0}$ and $\mathbf{y}_f(t)$ is from $\mathbf{u}(t)$ with $\mathbf{x}_0 = \mathbf{0}$.

---

What is the difference between the free response $\mathbf{y}_l(t)$ and the total transient response $\mathbf{y}_{\text{trans}}(t)$?
?
$\mathbf{y}_l(t)$ comes solely from $\mathbf{x}_0$, whereas $\mathbf{y}_{\text{trans}}(t)$ combines decaying natural modes from *both* $\mathbf{y}_l(t)$ and $\mathbf{y}_f(t)$.

---

What is the continuous-time impulse response matrix $\mathbf{W}(t)$ (for $t \ge 0$) of $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$?
?
$$\mathbf{W}(t) = \mathbf{C}e^{\mathbf{A}t}\mathbf{B}\cdot 1(t) + \mathbf{D}\delta(t)$$

---

How is the forced output $\mathbf{y}_f(t)$ written as a convolution in the time domain and as a product in the Laplace domain?
?
$\mathbf{y}_f(t) = (\mathbf{W} * \mathbf{u})(t) = \int_0^t \mathbf{W}(t - \tau)\mathbf{u}(\tau)\,d\tau$, corresponding to $\mathbf{Y}_f(s) = \mathbf{W}(s)\mathbf{U}(s)$.

---

Under what condition does the forced output to a constant step $\mathbf{u}(t) = \mathbf{u}_0 \cdot 1(t)$ converge to $\mathbf{y}_{\text{ss}} = (-\mathbf{C}\mathbf{A}^{-1}\mathbf{B} + \mathbf{D})\mathbf{u}_0$?
?
Only when $\mathbf{A}$ is Hurwitz (all eigenvalues satisfy $\operatorname{Re}(\lambda_i) < 0$); otherwise the response either oscillates or diverges.

---

When solving $\mathbf{x}_f(t)$ or $\mathbf{y}_f(t)$ by hand under time pressure, why is Laplace inversion usually preferable to evaluating Lagrange's convolution integral directly?
?
$\mathcal{L}^{-1}\{(s\mathbf{I}-\mathbf{A})^{-1}\mathbf{B}\mathbf{U}(s)\}$ converts matrix convolution into partial fraction expansion without integrating exponentials.
