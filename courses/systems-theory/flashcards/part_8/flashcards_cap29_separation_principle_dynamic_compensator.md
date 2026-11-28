#flashcards/automatica/08_03_separation_principle

What composite $2n \times 2n$ state matrix $\overline{\mathbf{A}}$ governs $(\mathbf{x}, \hat{\mathbf{x}})$ when closing the loop with $\mathbf{u} = -\mathbf{K}\hat{\mathbf{x}} + \mathbf{v}$?
?
$$\overline{\mathbf{A}} = \begin{bmatrix} \mathbf{A} & -\mathbf{B}\mathbf{K} \\ \mathbf{L}\mathbf{C} & \mathbf{A} - \mathbf{B}\mathbf{K} - \mathbf{L}\mathbf{C} \end{bmatrix}$$

---

What involutory coordinate transformation $\mathbf{T}_{\text{sep}}$ switches from $(\mathbf{x}, \hat{\mathbf{x}})$ to error coordinates $(\mathbf{x}, \mathbf{e})$ with $\mathbf{e} = \mathbf{x} - \hat{\mathbf{x}}$?
?
$$\begin{bmatrix} \mathbf{x} \\ \mathbf{e} \end{bmatrix} = \begin{bmatrix} \mathbf{I}_n & \mathbf{0} \\ \mathbf{I}_n & -\mathbf{I}_n \end{bmatrix}\begin{bmatrix} \mathbf{x} \\ \hat{\mathbf{x}} \end{bmatrix}, \qquad (\mathbf{T}_{\text{sep}}^{-1} = \mathbf{T}_{\text{sep}})$$

---

What block upper-triangular state matrix $\mathbf{A}_{\text{total}}$ emerges in $(\mathbf{x}, \mathbf{e})$ coordinates?
?
$$\begin{bmatrix} \dot{\mathbf{x}} \\ \dot{\mathbf{e}} \end{bmatrix} = \begin{bmatrix} \mathbf{A} - \mathbf{B}\mathbf{K} & \mathbf{B}\mathbf{K} \\ \mathbf{0} & \mathbf{A} - \mathbf{L}\mathbf{C} \end{bmatrix}\begin{bmatrix} \mathbf{x} \\ \mathbf{e} \end{bmatrix} + \begin{bmatrix} \mathbf{B} \\ \mathbf{0} \end{bmatrix}\mathbf{v}$$

---

What does the Separation Principle prove for the characteristic polynomial and eigenvalues of the $2n$-dimensional closed loop?
?
$\det(s\mathbf{I}_{2n} - \mathbf{A}_{\text{total}}) = \det(s\mathbf{I}_n - (\mathbf{A} - \mathbf{B}\mathbf{K}))\det(s\mathbf{I}_n - (\mathbf{A} - \mathbf{L}\mathbf{C}))$, so controller poles and observer poles are completely decoupled ($\mathbf{K}$ and $\mathbf{L}$ are designed independently).

---

In $(\mathbf{x}, \mathbf{e})$ coordinates, why do the $n$ observer poles cancel out of the closed-loop transfer matrix $\mathbf{W}_{\text{CL}}(s)$ from $\mathbf{V}(s)$ to $\mathbf{Y}(s)$?
?
Because $\mathbf{B}_{\text{total}} = [\mathbf{B}^T \; \mathbf{0}^T]^T$ leaves all error modes $\mathbf{e}(t)$ uncontrollable from the reference command $\mathbf{v}(t)$, leaving $\mathbf{W}_{\text{CL}}(s) = \mathbf{C}(s\mathbf{I}_n - (\mathbf{A} - \mathbf{B}\mathbf{K}))^{-1}\mathbf{B}$.

---

How does a non-zero initial estimation error $\mathbf{e}(0) \neq \mathbf{0}$ affect the plant trajectory $\mathbf{x}(t)$ despite spectral decoupling?
?
The off-diagonal coupling block $\mathbf{B}\mathbf{K}$ injects a decaying disturbance $\mathbf{B}\mathbf{K}e^{(\mathbf{A}-\mathbf{L}\mathbf{C})t}\mathbf{e}(0)$ into $\dot{\mathbf{x}}(t)$, motivating observer poles $2\text{–}5\times$ faster than controller poles.

---

What is the $n$-th order dynamic compensator transfer function $C(s)$ mapping sensor output $\mathbf{Y}(s)$ to $\mathbf{U}(s) = -C(s)\mathbf{Y}(s)$ (with $\mathbf{v} = \mathbf{0}$)?
?
$$C(s) = \mathbf{K}\big(s\mathbf{I}_n - (\mathbf{A} - \mathbf{B}\mathbf{K} - \mathbf{L}\mathbf{C})\big)^{-1}\mathbf{L}$$

---

Do the eigenvalues of the standalone compensator matrix $\mathbf{A}_{\text{comp}} = \mathbf{A} - \mathbf{B}\mathbf{K} - \mathbf{L}\mathbf{C}$ equal the closed-loop poles?
?
No; $\sigma(\mathbf{A}_{\text{comp}})$ are the *open-loop* poles of $C(s)$ alone (and may even be unstable), whereas closing the loop places the $2n$ poles at $\sigma(\mathbf{A} - \mathbf{B}\mathbf{K}) \cup \sigma(\mathbf{A} - \mathbf{L}\mathbf{C})$.
