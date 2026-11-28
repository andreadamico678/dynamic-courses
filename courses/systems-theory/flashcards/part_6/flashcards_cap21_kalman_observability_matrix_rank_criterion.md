#flashcards/automatica/06_02_kalman_observability

Why does observability depend strictly on $(\mathbf{A}, \mathbf{C})$ and never on $\mathbf{B}$, $\mathbf{D}$, or $\mathbf{u}(t)$?
?
Since $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$ and $\mathbf{u}(t)$ are known, subtracting the forced response isolates $\mathbf{y}_{\text{free}}(t) = \mathbf{C}e^{\mathbf{A}t}\mathbf{x}_0$.

---

How is the Kalman observability matrix $\mathcal{O}$ (also denoted $\mathbf{Q}$ or $\mathcal{M}_o$) constructed for $(\mathbf{A}, \mathbf{C})$?
?
$$\mathcal{O} = \begin{bmatrix} \mathbf{C} \\ \mathbf{C}\mathbf{A} \\ \vdots \\ \mathbf{C}\mathbf{A}^{n-1} \end{bmatrix} \in \mathbb{R}^{(np) \times n}$$

---

What is Kalman's rank criterion for complete observability of $(\mathbf{A}, \mathbf{C})$ in SISO ($p = 1$) vs. MIMO ($p > 1$)?
?
$\operatorname{rank}(\mathcal{O}) = n$, tested by $\det(\mathcal{O}) \neq 0$ when $p = 1$ or row reduction when $p > 1$.

---

When $\operatorname{rank}(\mathcal{O}) = r_o < n$, what subspace defines the unobservable states $\mathcal{X}_{no}$ and its dimension?
?
$\mathcal{X}_{no} = \ker(\mathcal{O}) = \bigcap_{k=0}^{n-1}\ker(\mathbf{C}\mathbf{A}^k)$, of dimension $n - r_o$.

---

What two geometric properties satisfy the unobservable subspace $\mathcal{X}_{no} = \ker(\mathcal{O})$?
?
It is $\mathbf{A}$-invariant ($\mathbf{A}\mathcal{X}_{no} \subseteq \mathcal{X}_{no}$) and contained in the sensor null space ($\mathcal{X}_{no} \subseteq \ker(\mathbf{C})$).

---

What does the Principle of Kalman Duality assert for $(\mathbf{A}, \mathbf{C})$ and $(\mathbf{A}, \mathbf{B})$?
?
$(\mathbf{A}, \mathbf{C})$ is observable iff $(\mathbf{A}^T, \mathbf{C}^T)$ is controllable ($\mathcal{R}_{\text{dual}} = \mathcal{O}^T$), and $(\mathbf{A}, \mathbf{B})$ is controllable iff $(\mathbf{A}^T, \mathbf{B}^T)$ is observable.

---

What is the PBH rank criterion for complete observability of $(\mathbf{A}, \mathbf{C})$?
?
$$\operatorname{rank}\begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} \\ \mathbf{C} \end{bmatrix} = n \qquad \forall \lambda \in \sigma(\mathbf{A})$$

---

In the PBH eigenvector test, which eigenvectors diagnose an unobservable eigenvalue $\lambda \in \sigma(\mathbf{A})$?
?
There exists a non-zero right eigenvector $\mathbf{v} \neq \mathbf{0}$ satisfying $\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$ and $\mathbf{C}\mathbf{v} = \mathbf{0}$.

---

What avoids output-derivative noise amplification when reconstructing $\mathbf{x}_0$ in continuous time on physical hardware?
?
Integrating over $[0, t_f]$ with the observability Gramian $\mathbf{W}_o(t_f) = \int_0^{t_f} e^{\mathbf{A}^T t}\mathbf{C}^T\mathbf{C}e^{\mathbf{A}t}\,dt$ ($\ker(\mathbf{W}_o) = \ker(\mathcal{O})$).
