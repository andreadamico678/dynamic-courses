#flashcards/automatica/02_03_resolvent_inversion

What is the definition of the state resolvent matrix $\mathbf{\Phi}(s)$ and its Laplace transform identity?
?
$\mathbf{\Phi}(s) = (s\mathbf{I} - \mathbf{A})^{-1} = \mathcal{L}\{e^{\mathbf{A}t}\}$.

---

Taking the Laplace transform of $\dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t)$ with initial state $\mathbf{x}(0^-)$, what is $\mathbf{X}(s)$?
?
$$\mathbf{X}(s) = (s\mathbf{I} - \mathbf{A})^{-1}\mathbf{x}(0^-) + (s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B}\mathbf{U}(s)$$

---

How is the state resolvent $(s\mathbf{I} - \mathbf{A})^{-1}$ expressed via the cofactor matrix and characteristic polynomial $p(s) = \det(s\mathbf{I} - \mathbf{A})$?
?
$$(s\mathbf{I} - \mathbf{A})^{-1} = \frac{\operatorname{adj}(s\mathbf{I} - \mathbf{A})}{p(s)} = \frac{\mathbf{C}_{\text{cof}}^T(s\mathbf{I} - \mathbf{A})}{p(s)}$$

---

Which cofactor sits in row $i$, column $j$ of $\operatorname{adj}(s\mathbf{I} - \mathbf{A})$?
?
The transposed cofactor $C_{ji}(s) = (-1)^{i+j} M_{ji}(s)$ obtained by deleting row $j$ and column $i$ of $(s\mathbf{I} - \mathbf{A})$.

---

Why is every entry of $(s\mathbf{I} - \mathbf{A})^{-1}$ guaranteed to be strictly proper ($\deg N < \deg D$)?
?
Every diagonal cofactor has degree $n - 1$ and every off-diagonal cofactor has degree at most $n - 2$, while $p(s) = \det(s\mathbf{I} - \mathbf{A})$ has degree $n$.

---

What does $\lim_{s \to \infty} s(s\mathbf{I} - \mathbf{A})^{-1}$ equal, and what initial property does it prove?
?
It equals $\mathbf{I}$, proving $\left.e^{\mathbf{A}t}\right|_{t=0^+} = \mathbf{I}$.

---

For a $2 \times 2$ matrix $\mathbf{A}$, what is the characteristic polynomial $p(s) = \det(s\mathbf{I}_2 - \mathbf{A})$ in terms of trace and determinant?
?
$$p(s) = s^2 - \operatorname{Tr}(\mathbf{A}) s + \det(\mathbf{A})$$

---

What is the closed-form $2 \times 2$ state resolvent formula for $\mathbf{A} = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$?
?
$$(s\mathbf{I}_2 - \mathbf{A})^{-1} = \frac{1}{s^2 - \operatorname{Tr}(\mathbf{A})s + \det(\mathbf{A})}\begin{bmatrix} s - a_{22} & a_{12} \\ a_{21} & s - a_{11} \end{bmatrix}$$

---

How can you check your hand-computed $3 \times 3$ adjugate $\operatorname{adj}(s\mathbf{I} - \mathbf{A})$ against transposition errors?
?
Verify that row 1 of $(s\mathbf{I} - \mathbf{A})$ times column 1 of $\operatorname{adj}(s\mathbf{I} - \mathbf{A})$ equals $p(s)$ and times column 2 equals $0$.
