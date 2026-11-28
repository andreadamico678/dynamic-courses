#flashcards/automatica/03_02_free_response

What are the free state response $\mathbf{x}_l(t)$ and free output response $\mathbf{y}_l(t)$ for $\mathbf{u}(t) \equiv \mathbf{0}$?
?
$$\mathbf{x}_l(t) = e^{\mathbf{A}t}\mathbf{x}_0, \qquad \mathbf{y}_l(t) = \mathbf{C}e^{\mathbf{A}t}\mathbf{x}_0$$

---

What natural time-domain modes correspond to a simple real eigenvalue $\lambda_i$ of $\mathbf{A}$?
?
A single pure exponential $e^{\lambda_i t}$.

---

What natural modes arise from an eigenvalue $\lambda_i$ with a Jordan block of size $m \ge 2$?
?
Secular polynomial-exponential modes $e^{\lambda_i t}, \; t e^{\lambda_i t}, \; \dots, \; t^{m-1} e^{\lambda_i t}$.

---

When does a repeated eigenvalue $\lambda_i$ ($m_a > 1$) produce *no* secular $t^k e^{\lambda_i t}$ terms ($k \ge 1$)?
?
When $\mathbf{A}$ has full geometric multiplicity $m_g(\lambda_i) = m_a(\lambda_i)$ (diagonalizable eigenspace, all Jordan blocks of size $1 \times 1$).

---

What real natural modes correspond to a complex conjugate eigenvalue pair $\lambda_{1,2} = \sigma \pm j\omega$?
?
Oscillatory envelopes $e^{\sigma t}\cos(\omega t)$ and $e^{\sigma t}\sin(\omega t)$.

---

If initial state $\mathbf{x}(0) = c_i \mathbf{v}_i$ aligns with a single right eigenvector $\mathbf{v}_i$ of $\mathbf{A}$, what is $\mathbf{x}_l(t)$?
?
$$\mathbf{x}_l(t) = c_i e^{\lambda_i t}\mathbf{v}_i$$

---

For an arbitrary initial state $\mathbf{x}_0 = \sum_{i=1}^n c_i \mathbf{v}_i$ with distinct eigenvalues, what is the modal decomposition of $\mathbf{x}_l(t)$?
?
$$\mathbf{x}_l(t) = \sum_{i=1}^n c_i e^{\lambda_i t} \mathbf{v}_i, \qquad \mathbf{c} = \mathbf{T}^{-1}\mathbf{x}_0$$

---

In an asymptotically stable 2D phase plane with distinct real eigenvalues $\lambda_2 < \lambda_1 < 0$, which eigenvector does an off-axis trajectory align with as $t \to \infty$?
?
The slower decaying eigenvector $\mathbf{v}_1$ (smallest $|\operatorname{Re}(\lambda)|$), because the faster mode decays away first.

---

What immediate algebraic check catches sign or residue errors in any computed free trajectory $\mathbf{x}_l(t)$?
?
Evaluate at $t = 0$ and verify $\mathbf{x}_l(0) = \mathbf{x}(0)$.
