#flashcards/automatica/06_04_stabilizability

When is an LTI pair $(\mathbf{A}, \mathbf{B})$ defined to be stabilizable?
?
When there exists a static gain $\mathbf{K}$ such that $\mathbf{A} - \mathbf{B}\mathbf{K}$ is Hurwitz ($\operatorname{Re}(\lambda) < 0$ for all closed-loop eigenvalues).

---

In controllability canonical coordinates, how does the characteristic polynomial $\det(s\mathbf{I} - (\mathbf{A} - \mathbf{B}\mathbf{K}))$ factor?
?
$$\det\big(s\mathbf{I}_{r_c} - (\mathbf{A}_c - \mathbf{B}_c\mathbf{K}_c)\big) \cdot \det(s\mathbf{I}_{n-r_c} - \mathbf{A}_{\bar{c}})$$
showing the uncontrollable eigenvalues $\sigma(\mathbf{A}_{\bar{c}})$ are invariant under any state feedback $\mathbf{K}$.

---

What is the necessary and sufficient condition on the uncontrollable block $\mathbf{A}_{\bar{c}}$ for $(\mathbf{A}, \mathbf{B})$ to be stabilizable?
?
Every uncontrollable eigenvalue satisfies $\operatorname{Re}(\lambda) < 0$ strictly.

---

What is the PBH Stabilizability Criterion, and which eigenvalues of $\mathbf{A}$ can be skipped?
?
$\operatorname{rank}\begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} & \mathbf{B} \end{bmatrix} = n$ for every $\lambda \in \sigma(\mathbf{A})$ with $\operatorname{Re}(\lambda) \ge 0$; strictly stable modes ($\operatorname{Re}(\lambda) < 0$) never need testing.

---

Is a system with an uncontrollable eigenvalue at $\lambda = 0$ or $\lambda = \pm j\omega$ stabilizable?
?
No; asymptotic stability requires $\operatorname{Re}(\lambda) < 0$ strictly, and $\operatorname{Re}(\lambda) = 0$ cannot be moved left by feedback.

---

When is a pair $(\mathbf{A}, \mathbf{C})$ defined to be detectable?
?
When there exists an observer gain $\mathbf{L}$ such that the estimation error matrix $\mathbf{A} - \mathbf{L}\mathbf{C}$ is Hurwitz (every unobservable mode has $\operatorname{Re}(\lambda) < 0$).

---

What is the PBH Detectability Criterion for $(\mathbf{A}, \mathbf{C})$?
?
$$\operatorname{rank}\begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} \\ \mathbf{C} \end{bmatrix} = n \qquad \forall \lambda \in \sigma(\mathbf{A}) \text{ with } \operatorname{Re}(\lambda) \ge 0$$

---

How does detectability relate by duality to stabilizability?
?
$(\mathbf{A}, \mathbf{C})$ is detectable if and only if the dual pair $(\mathbf{A}^T, \mathbf{C}^T)$ is stabilizable.
