#flashcards/automatica/07_02_ackermann_formula

What is Ackermann's Formula for the single-input state-feedback gain $\mathbf{K} \in \mathbb{R}^{1 \times n}$?
?
$$\mathbf{K} = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix} \mathcal{R}^{-1} p^*(\mathbf{A}) = \mathbf{t}_n^T p^*(\mathbf{A})$$

---

What structural prerequisite must hold before Ackermann's formula can be applied?
?
The pair $(\mathbf{A}, \mathbf{B})$ must be single-input ($m = 1$) and completely controllable ($\det(\mathcal{R}) \neq 0$).

---

Why does Ackermann's formula eliminate the need to compute open-loop polynomial coefficients $a_i$?
?
By the Cayley-Hamilton theorem $p(\mathbf{A}) = \mathbf{0}$, so $p^*(\mathbf{A}) = p^*(\mathbf{A}) - p(\mathbf{A})$ automatically encodes all coefficient differences $(\alpha_i - a_i)$.

---

How do you solve for the generator row vector $\mathbf{t}_n^T = \mathbf{e}_n^T \mathcal{R}^{-1}$ without inverting the entire matrix $\mathcal{R}$?
?
Solve the single $n$-unknown linear system $\mathbf{t}_n^T \mathcal{R} = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix}$.

---

How does left-to-right vector propagation avoid computing full $n \times n$ matrix powers $\mathbf{A}^2, \dots, \mathbf{A}^n$ when evaluating Ackermann's formula?
?
Set $\mathbf{w}_0^T = \mathbf{t}_n^T$, compute $\mathbf{w}_k^T = \mathbf{w}_{k-1}^T\mathbf{A}$ recursively, and sum $\mathbf{K} = \mathbf{w}_n^T + \alpha_{n-1}\mathbf{w}_{n-1}^T + \dots + \alpha_0\mathbf{w}_0^T$.

---

What common algebra error occurs when writing $p^*(\mathbf{A}) = \mathbf{A}^n + \dots + \alpha_1 \mathbf{A} + \alpha_0$ explicitly as a matrix?
?
Omitting the identity matrix $\mathbf{I}_n$ on the constant term $\alpha_0$; it must be $\alpha_0 \mathbf{I}_n$, shifting only the diagonal.

---

In Ackermann's formula, on which side of $p^*(\mathbf{A})$ must $\mathbf{e}_n^T \mathcal{R}^{-1}$ be multiplied, and why?
?
On the **left**, because $\mathbf{t}_n^T \in \mathbb{R}^{1 \times n}$ is a row vector yielding the $1 \times n$ gain row $\mathbf{K}$.

---

Which feedback control law convention matches $\mathbf{K} = \mathbf{e}_n^T \mathcal{R}^{-1} p^*(\mathbf{A})$ directly?
?
Negative state feedback $\mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) + \mathbf{v}(t)$, yielding $\mathbf{A}_{\text{cl}} = \mathbf{A} - \mathbf{B}\mathbf{K}$.
