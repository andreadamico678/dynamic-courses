#flashcards/automatica/06_01_kalman_controllability

In continuous-time LTI systems, what distinguishes *reachability* from *controllability*?
?
Reachability steers from $\mathbf{x}(0) = \mathbf{0}$ to a target $\mathbf{x}^*$, whereas controllability steers from $\mathbf{x}(0) = \mathbf{x}_0$ back to $\mathbf{0}$.

---

Why are reachability and controllability strictly equivalent for every continuous-time LTI system?
?
By Liouville's identity $\det(e^{\mathbf{A}t_f}) = e^{\operatorname{Tr}(\mathbf{A})t_f} > 0$, so $e^{\mathbf{A}t_f}$ is invertible and $\mathbf{x}^* = -e^{\mathbf{A}t_f}\mathbf{x}_0$ is bijective.

---

How is the Kalman controllability matrix $\mathcal{R}$ (also denoted $\mathbf{P}$ or $\mathcal{M}_c$) defined for an $n$-state pair $(\mathbf{A}, \mathbf{B})$?
?
$$\mathcal{R} = \begin{bmatrix} \mathbf{B} & \mathbf{A}\mathbf{B} & \mathbf{A}^2\mathbf{B} & \dots & \mathbf{A}^{n-1}\mathbf{B} \end{bmatrix} \in \mathbb{R}^{n \times (nm)}$$

---

Why does the Kalman controllability matrix $\mathcal{R}$ stop at matrix power $\mathbf{A}^{n-1}\mathbf{B}$?
?
By the Cayley-Hamilton theorem, every $\mathbf{A}^k\mathbf{B}$ for $k \ge n$ is a linear combination of $\{\mathbf{B}, \dots, \mathbf{A}^{n-1}\mathbf{B}\}$.

---

What is Kalman's rank criterion for complete controllability of a SISO pair ($m = 1$) vs. a MIMO pair ($m > 1$)?
?
For $m = 1$, $\mathcal{R}$ is $n \times n$ so check $\det(\mathcal{R}) \neq 0$; for $m > 1$, $\mathcal{R}$ is rectangular so use row reduction to verify $\operatorname{rank}(\mathcal{R}) = n$.

---

What subspace of $\mathbb{R}^n$ is spanned by the columns of $\mathcal{R}$, and what two invariance properties hold when $\operatorname{rank}(\mathcal{R}) < n$?
?
The reachable subspace $\mathcal{X}_r = \operatorname{Im}(\mathcal{R})$, which is $\mathbf{A}$-invariant ($\mathbf{A}\mathcal{X}_r \subseteq \mathcal{X}_r$) and contains $\operatorname{Im}(\mathbf{B})$.

---

What is the PBH rank criterion for complete controllability of $(\mathbf{A}, \mathbf{B})$?
?
$$\operatorname{rank}\begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} & \mathbf{B} \end{bmatrix} = n \qquad \forall \lambda \in \sigma(\mathbf{A})$$

---

Why does the PBH test only need to be checked at the open-loop eigenvalues $\lambda \in \sigma(\mathbf{A})$ rather than all $\lambda \in \mathbb{C}$?
?
For any $\lambda \notin \sigma(\mathbf{A})$, $\lambda\mathbf{I} - \mathbf{A}$ already has full rank $n$ before appending $\mathbf{B}$.

---

In the PBH eigenvector test, which eigenvectors diagnose an uncontrollable eigenvalue $\lambda \in \sigma(\mathbf{A})$?
?
There exists a non-zero left eigenvector $\mathbf{v}^T \neq \mathbf{0}^T$ satisfying $\mathbf{v}^T\mathbf{A} = \lambda\mathbf{v}^T$ and $\mathbf{v}^T\mathbf{B} = \mathbf{0}^T$.
