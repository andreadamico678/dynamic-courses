#flashcards/automatica/08_01_luenberger_observer

What differential equation defines a full-order Luenberger state observer with gain matrix $\mathbf{L} \in \mathbb{R}^{n \times p}$?
?
$$\dot{\hat{\mathbf{x}}}(t) = \mathbf{A}\hat{\mathbf{x}}(t) + \mathbf{B}\mathbf{u}(t) + \mathbf{L}\big(\mathbf{y}(t) - \mathbf{C}\hat{\mathbf{x}}(t)\big)$$

---

For an open-loop state simulator without innovation feedback ($\mathbf{L} = \mathbf{0}$), what equation governs the estimation error $\mathbf{e}(t) = \mathbf{x}(t) - \hat{\mathbf{x}}(t)$?
?
$\dot{\mathbf{e}}(t) = \mathbf{A}\mathbf{e}(t)$, so errors diverge on unstable plants, stall on integrators, and drift under disturbances.

---

Under innovation correction $+\mathbf{L}(\mathbf{y} - \mathbf{C}\hat{\mathbf{x}})$, what differential equation governs $\mathbf{e}(t) = \mathbf{x}(t) - \hat{\mathbf{x}}(t)$?
?
$$\dot{\mathbf{e}}(t) = (\mathbf{A} - \mathbf{L}\mathbf{C})\mathbf{e}(t)$$

---

Why does the control input term $\mathbf{B}\mathbf{u}(t)$ vanish completely from the Luenberger estimation error dynamics $\dot{\mathbf{e}}(t)$?
?
Because $\mathbf{B}\mathbf{u}(t)$ enters both the plant $\dot{\mathbf{x}}$ and the observer $\dot{\hat{\mathbf{x}}}$ identically and cancels on subtraction.

---

What is the necessary and sufficient condition for $\mathbf{L}$ to assign arbitrary observer error eigenvalues $\sigma(\mathbf{A} - \mathbf{L}\mathbf{C})$?
?
The pair $(\mathbf{A}, \mathbf{C})$ must be completely observable ($\operatorname{rank}(\mathcal{O}) = n$).

---

When can an asymptotic observer ($\lim_{t \to \infty} \mathbf{e}(t) = \mathbf{0}$) still exist even if $(\mathbf{A}, \mathbf{C})$ is not completely observable?
?
If and only if $(\mathbf{A}, \mathbf{C})$ is detectable: every unobservable eigenvalue already has $\operatorname{Re}(\lambda_i) < 0$.

---

What common sign or order mistakes corrupt observer synthesis $\mathbf{A}_o = \mathbf{A} - \mathbf{L}\mathbf{C}$?
?
Subtracting $-\mathbf{L}(\mathbf{y} - \mathbf{C}\hat{\mathbf{x}})$ (giving $\mathbf{A} + \mathbf{L}\mathbf{C}$) or reversing the matrix product to $\mathbf{C}\mathbf{L}$ instead of $\mathbf{L}\mathbf{C}$.

---

Where should observer poles $\beta_i$ typically be placed relative to the dominant controller poles $\mu_{\text{dom}}$?
?
Roughly $2$ to $5$ times deeper in the LHP: $|\operatorname{Re}(\beta_i)| \approx (2 \text{ to } 5) \times |\operatorname{Re}(\mu_{\text{dom}})|$.

---

What trade-off prevents placing observer poles $20\times$ or $50\times$ faster than the controller?
?
In $\dot{\mathbf{e}} = (\mathbf{A} - \mathbf{L}\mathbf{C})\mathbf{e} + \mathbf{w}_d - \mathbf{L}\mathbf{v}_m$, overly large $\mathbf{L}$ amplifies high-frequency measurement noise $\mathbf{v}_m(t)$ into actuator chatter.
