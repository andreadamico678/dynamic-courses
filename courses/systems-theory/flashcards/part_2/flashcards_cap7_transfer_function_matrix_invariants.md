#flashcards/automatica/02_04_transfer_function_invariants

What is the algebraic formula mapping a state-space quadruple $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$ to its transfer function matrix $\mathbf{W}(s)$?
?
$$\mathbf{W}(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + \mathbf{D}$$

---

What assumption on initial conditions defines the transfer function relation $\mathbf{Y}(s) = \mathbf{W}(s)\mathbf{U}(s)$?
?
Zero initial state ($\mathbf{x}(0^-) = \mathbf{0}$), isolating purely the forced response.

---

What is the general inclusion relationship between the poles $\mathcal{P}_W$ of reduced $\mathbf{W}(s)$ and the eigenvalues $\sigma(\mathbf{A})$?
?
$\mathcal{P}_W \subseteq \sigma(\mathbf{A})$: every pole of $\mathbf{W}(s)$ is an eigenvalue of $\mathbf{A}$, though some eigenvalues may cancel out.

---

When does the pole set $\mathcal{P}_W$ equal the full eigenvalue spectrum $\sigma(\mathbf{A})$ (so $n$ equals the McMillan degree)?
?
If and only if no pole-zero cancellations occur, meaning the realization $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$ is minimal (completely controllable and observable).

---

What does $\lim_{s \to \infty} \mathbf{W}(s)$ equal, and what does it tell you about properness?
?
$\lim_{s \to \infty} \mathbf{W}(s) = \mathbf{D}$; thus $\mathbf{W}(s)$ is strictly proper iff $\mathbf{D} = \mathbf{0}$, and biproper iff $\mathbf{D} \neq \mathbf{0}$.

---

Assuming $\det(\mathbf{A}) \neq 0$, what is the static DC gain matrix $\mathbf{W}(0)$ directly from state-space matrices?
?
$$\mathbf{W}(0) = -\mathbf{C}\mathbf{A}^{-1}\mathbf{B} + \mathbf{D}$$

---

When does the DC gain formula $\mathbf{W}(0) = -\mathbf{C}\mathbf{A}^{-1}\mathbf{B} + \mathbf{D}$ fail to apply?
?
When $\mathbf{A}$ is singular ($\lambda = 0 \in \sigma(\mathbf{A})$), such as a plant containing an open-loop integrator.

---

Why is cancelling an unstable RHP plant mode with a controller zero at the same RHP location strictly dangerous?
?
The mode disappears externally from $W(s)$ but remains an unstable uncontrollable or unobservable mode internally that diverges under disturbances or parameter mismatch.
