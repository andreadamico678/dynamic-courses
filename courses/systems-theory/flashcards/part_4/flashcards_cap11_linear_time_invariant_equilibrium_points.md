#flashcards/automatica/04_01_equilibrium_points

What algebraic equation defines an equilibrium state $\mathbf{x}_e$ of $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$ under constant input $\mathbf{u}(t) \equiv \mathbf{u}_0$?
?
$$\mathbf{A}\mathbf{x}_e = -\mathbf{B}\mathbf{u}_0$$

---

What are the unique equilibrium state $\mathbf{x}_e$ and steady-state output $\mathbf{y}_e$ when $\det(\mathbf{A}) \neq 0$?
?
$$\mathbf{x}_e = -\mathbf{A}^{-1}\mathbf{B}\mathbf{u}_0, \qquad \mathbf{y}_e = (\mathbf{D} - \mathbf{C}\mathbf{A}^{-1}\mathbf{B})\mathbf{u}_0 = \mathbf{W}(0)\mathbf{u}_0$$

---

When $\det(\mathbf{A}) = 0$, what Rouché-Capelli condition determines whether equilibrium states exist for a constant input $\mathbf{u}_0$?
?
Equilibria exist if and only if $-\mathbf{B}\mathbf{u}_0 \in \operatorname{Im}(\mathbf{A})$, equivalently $\operatorname{rank}(\mathbf{A}) = \operatorname{rank}([\mathbf{A} \mid -\mathbf{B}\mathbf{u}_0])$.

---

If $\det(\mathbf{A}) = 0$ and $-\mathbf{B}\mathbf{u}_0 \notin \operatorname{Im}(\mathbf{A})$, how many equilibria exist and what happens to trajectories?
?
Zero equilibria exist; the constant input forces unbounded state drift along an unconstrained direction.

---

If $\operatorname{rank}(\mathbf{A}) = r < n$ and $-\mathbf{B}\mathbf{u}_0 \in \operatorname{Im}(\mathbf{A})$, what geometric set do the equilibria form?
?
An $(n - r)$-dimensional affine manifold $\mathbf{x}_e = \mathbf{x}_{e,\text{part}} + \ker(\mathbf{A})$.

---

For zero input $\mathbf{u}_0 = \mathbf{0}$, what is the equilibrium set when $\det(\mathbf{A}) \neq 0$ versus when $\det(\mathbf{A}) = 0$?
?
When $\det(\mathbf{A}) \neq 0$, only the origin $\mathbf{x}_e = \mathbf{0}$; when $\det(\mathbf{A}) = 0$, the entire null space $\ker(\mathbf{A})$.

---

In perturbation coordinates $\mathbf{z}(t) = \mathbf{x}(t) - \mathbf{x}_e$ and $\mathbf{v}(t) = \mathbf{u}(t) - \mathbf{u}_0$, what differential equation governs $\mathbf{z}(t)$?
?
$$\dot{\mathbf{z}}(t) = \mathbf{A}\mathbf{z}(t) + \mathbf{B}\mathbf{v}(t)$$

---

Why does analyzing stability around any non-zero trim $\mathbf{x}_e$ reduce to analyzing the origin $\mathbf{z} = \mathbf{0}$?
?
Because $\dot{\mathbf{x}}_e = \mathbf{0}$ and $\mathbf{A}\mathbf{x}_e + \mathbf{B}\mathbf{u}_0 = \mathbf{0}$ cancel, leaving perturbation dynamics with the exact same matrix $\mathbf{A}$.
