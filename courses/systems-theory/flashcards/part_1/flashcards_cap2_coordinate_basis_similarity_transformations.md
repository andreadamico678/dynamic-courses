#flashcards/automatica/01_02_similarity_transformations

Under the invertible coordinate transformation $\mathbf{x}(t) = \mathbf{T}\mathbf{z}(t)$ with $\det(\mathbf{T}) \neq 0$, what are the transformed matrices $(\tilde{\mathbf{A}}, \tilde{\mathbf{B}}, \tilde{\mathbf{C}}, \tilde{\mathbf{D}})$?
?
$\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$, $\tilde{\mathbf{B}} = \mathbf{T}^{-1}\mathbf{B}$, $\tilde{\mathbf{C}} = \mathbf{C}\mathbf{T}$, and $\tilde{\mathbf{D}} = \mathbf{D}$.

---

What algebraic condition must a constant matrix $\mathbf{T} \in \mathbb{R}^{n \times n}$ satisfy to define a valid similarity transformation $\mathbf{x} = \mathbf{T}\mathbf{z}$?
?
It must be non-singular ($\det(\mathbf{T}) \neq 0$) so $\mathbf{z} = \mathbf{T}^{-1}\mathbf{x}$ is uniquely defined.

---

Geometrically, what does the $j$-th column of $\mathbf{T}$ represent in $\mathbf{x} = \mathbf{T}\mathbf{z}$?
?
The $j$-th new coordinate basis vector expressed in the original $\mathbf{x}$-coordinates.

---

Which matrices change numerically under a similarity transformation $\mathbf{x} = \mathbf{T}\mathbf{z}$, and which remain invariant?
?
$\mathbf{A}$, $\mathbf{B}$, and $\mathbf{C}$ change entries, whereas $\mathbf{D}$, the characteristic polynomial $p(\lambda)$, the spectrum $\sigma(\mathbf{A})$, and $\mathbf{W}(s)$ remain strictly invariant.

---

Why is the characteristic polynomial invariant under $\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$?
?
$\det(\lambda\mathbf{I} - \mathbf{T}^{-1}\mathbf{A}\mathbf{T}) = \det(\mathbf{T}^{-1})\det(\lambda\mathbf{I} - \mathbf{A})\det(\mathbf{T}) = \det(\lambda\mathbf{I} - \mathbf{A})$.

---

Beyond eigenvalues, which two matrix scalar invariants of $\mathbf{A}$ are preserved by any similarity transformation $\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$?
?
The trace $\operatorname{Tr}(\tilde{\mathbf{A}}) = \operatorname{Tr}(\mathbf{A})$ and the determinant $\det(\tilde{\mathbf{A}}) = \det(\mathbf{A})$.

---

Why does the transfer function matrix $\mathbf{W}(s)$ stay invariant under $\mathbf{x} = \mathbf{T}\mathbf{z}$?
?
$(\mathbf{C}\mathbf{T})[\mathbf{T}^{-1}(s\mathbf{I}-\mathbf{A})\mathbf{T}]^{-1}(\mathbf{T}^{-1}\mathbf{B}) = \mathbf{C}(\mathbf{T}\mathbf{T}^{-1})(s\mathbf{I}-\mathbf{A})^{-1}(\mathbf{T}\mathbf{T}^{-1})\mathbf{B} = \mathbf{C}(s\mathbf{I}-\mathbf{A})^{-1}\mathbf{B}$.

---

How is the modal matrix $\mathbf{M}$ constructed to diagonalize $\mathbf{A}$?
?
By stacking $n$ linearly independent right eigenvectors of $\mathbf{A}$ as columns: $\mathbf{M} = \begin{bmatrix} \mathbf{v}_1 & \dots & \mathbf{v}_n \end{bmatrix}$.

---

What does $\tilde{\mathbf{A}} = \mathbf{M}^{-1}\mathbf{A}\mathbf{M}$ equal when $\mathbf{M}$ consists of $n$ linearly independent eigenvectors of $\mathbf{A}$?
?
The diagonal eigenvalue matrix $\mathbf{\Lambda} = \operatorname{diag}(\lambda_1, \lambda_2, \dots, \lambda_n)$, decoupling the state equations into $\dot{z}_i = \lambda_i z_i + \tilde{b}_i u$.

---

When can a square matrix $\mathbf{A}$ fail to be diagonalizable by any similarity transformation?
?
When it is defective: some repeated eigenvalue has strictly fewer independent eigenvectors than its algebraic multiplicity ($m_g < m_a$).
