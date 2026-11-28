#flashcards/automatica/03_01_matrix_exponential

How is the matrix exponential $e^{\mathbf{A}t}$ defined via convergent infinite power series?
?
$$e^{\mathbf{A}t} \triangleq \sum_{k=0}^\infty \frac{(\mathbf{A}t)^k}{k!} = \mathbf{I} + \mathbf{A}t + \frac{\mathbf{A}^2 t^2}{2!} + \dots$$

---

How does the state transition matrix $e^{\mathbf{A}t}$ relate to the state resolvent matrix $(s\mathbf{I} - \mathbf{A})^{-1}$?
?
$$e^{\mathbf{A}t} = \mathcal{L}^{-1}\left\{(s\mathbf{I} - \mathbf{A})^{-1}\right\} \cdot 1(t)$$

---

What is the time derivative of $e^{\mathbf{A}t}$?
?
$$\frac{d}{dt}e^{\mathbf{A}t} = \mathbf{A}e^{\mathbf{A}t} = e^{\mathbf{A}t}\mathbf{A}$$

---

What two boundary checks validate any hand-computed matrix exponential $e^{\mathbf{A}t}$?
?
Verify $e^{\mathbf{A}\cdot 0} = \mathbf{I}$ and $\left.\frac{d}{dt}e^{\mathbf{A}t}\right|_{t=0} = \mathbf{A}$.

---

What is the inverse of the state transition matrix $e^{\mathbf{A}t}$, and does it exist for all finite $t$?
?
$(e^{\mathbf{A}t})^{-1} = e^{-\mathbf{A}t}$, which exists for every finite $t \in \mathbb{R}$.

---

Under what algebraic condition does the matrix factorization $e^{(\mathbf{A}+\mathbf{B})t} = e^{\mathbf{A}t}e^{\mathbf{B}t}$ hold?
?
If and only if the two matrices commute ($\mathbf{A}\mathbf{B} = \mathbf{B}\mathbf{A}$).

---

Why is exponentiating each scalar entry $[e^{a_{ij}t}]$ invalid in general for computing $e^{\mathbf{A}t}$?
?
Entry-wise exponentiation holds only when $\mathbf{A}$ is strictly diagonal; off-diagonal couplings create mixed powers $\mathbf{A}^k$.

---

How does spectral decomposition compute $e^{\mathbf{A}t}$ when $\mathbf{A}$ has $n$ linearly independent eigenvectors?
?
With modal matrix $\mathbf{T} = [\mathbf{v}_1 \; \dots \; \mathbf{v}_n]$ and $\mathbf{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$, compute $e^{\mathbf{A}t} = \mathbf{T}e^{\mathbf{\Lambda}t}\mathbf{T}^{-1}$.

---

How does the Cayley-Hamilton method evaluate $e^{\mathbf{A}t}$ as a finite polynomial in $\mathbf{A}$?
?
Expand $e^{\mathbf{A}t} = \sum_{k=0}^{n-1} \alpha_k(t)\mathbf{A}^k$, solving for $\alpha_k(t)$ by equating $e^{\lambda_i t}$ (and its derivatives up to order $m_a - 1$ for repeated roots) to $\sum_{k=0}^{n-1}\alpha_k(t)\lambda_i^k$.

---

Under zero-order hold (ZOH) sampling at period $T_s$, what is the discrete state transition matrix $\mathbf{A}_d$ of $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$?
?
$$\mathbf{A}_d = e^{\mathbf{A} T_s}$$
