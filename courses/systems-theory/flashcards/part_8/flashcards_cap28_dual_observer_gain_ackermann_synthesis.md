#flashcards/automatica/08_02_dual_ackermann

Under Kalman Duality, what controller synthesis problem $(\mathbf{A}_{\text{dual}}, \mathbf{B}_{\text{dual}}, \mathbf{K}_{\text{dual}})$ is equivalent to observer pole placement for $(\mathbf{A}, \mathbf{C}, \mathbf{L})$?
?
$$\mathbf{A}_{\text{dual}} = \mathbf{A}^T, \qquad \mathbf{B}_{\text{dual}} = \mathbf{C}^T, \qquad \mathbf{K}_{\text{dual}} = \mathbf{L}^T$$

---

Why does $\det(s\mathbf{I}_n - (\mathbf{A} - \mathbf{L}\mathbf{C}))$ equal $\det(s\mathbf{I}_n - (\mathbf{A}^T - \mathbf{C}^T\mathbf{L}^T))$ identically?
?
Because any square matrix shares the same determinant with its transpose ($\det(\mathbf{M}) = \det(\mathbf{M}^T)$).

---

How does the dual controllability matrix $\mathcal{R}_{\text{dual}}$ of $(\mathbf{A}^T, \mathbf{C}^T)$ relate to the primal observability matrix $\mathcal{O}$ of $(\mathbf{A}, \mathbf{C})$?
?
$$\mathcal{R}_{\text{dual}} = \mathcal{O}^T$$

---

What is the Dual Ackermann Observer Formula for a single-output observable pair $(\mathbf{A}, \mathbf{C})$ and target polynomial $p_o^*(s)$?
?
$$\mathbf{L} = p_o^*(\mathbf{A})\,\mathcal{O}^{-1}\begin{bmatrix} 0 \\ \vdots \\ 0 \\ 1 \end{bmatrix} = p_o^*(\mathbf{A})\,\mathbf{q}_n$$

---

In the Dual Ackermann formula $\mathbf{L} = p_o^*(\mathbf{A})\mathbf{q}_n$, how do you find $\mathbf{q}_n$ without inverting all of $\mathcal{O}$?
?
Solve the single column system $\mathcal{O}\mathbf{q}_n = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix}^T$; $\mathbf{q}_n$ is the **last column** of $\mathcal{O}^{-1}$.

---

How does right-to-left column propagation avoid full $n \times n$ matrix powers in Dual Ackermann?
?
Set $\mathbf{v}_0 = \mathbf{q}_n$, compute $\mathbf{v}_k = \mathbf{A}\mathbf{v}_{k-1}$ sequentially, and sum $\mathbf{L} = \mathbf{v}_n + \gamma_{n-1}\mathbf{v}_{n-1} + \dots + \gamma_0\mathbf{v}_0$.

---

How does factor multiplication order differ between primal controller Ackermann and Dual Ackermann for observers?
?
Controller Ackermann puts $\mathbf{e}_n^T\mathcal{R}^{-1}$ on the **left** of $p^*(\mathbf{A})$, whereas observer Ackermann puts $p_o^*(\mathbf{A})$ on the **left** of $\mathcal{O}^{-1}\mathbf{e}_n$.

---

In Observable Canonical Form $(\mathbf{A}_o, \mathbf{C}_o) = (\mathbf{A}_c^T, \mathbf{B}_c^T)$, where do $[-a_0, \dots, -a_{n-1}]^T$ sit and what is $\mathbf{C}_o$?
?
They sit vertically down the last column of $\mathbf{A}_o$, and $\mathbf{C}_o = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix}$, decoupling gains via $l_{oi} = \gamma_i - a_i$.
