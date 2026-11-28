#flashcards/automatica/06_03_kalman_decomposition

Into which four structural subspaces does the Kalman Canonical Decomposition partition $\mathbb{R}^n$?
?
$\mathbb{R}^n = \mathcal{X}_{co} \oplus \mathcal{X}_{c\bar{o}} \oplus \mathcal{X}_{\bar{c}o} \oplus \mathcal{X}_{\bar{c}\bar{o}}$ (controllable/uncontrollable paired with observable/unobservable).

---

How are $\mathcal{X}_{c\bar{o}}$, $\mathcal{X}_{co}$, and $\mathcal{X}_{\bar{c}\bar{o}}$ defined algebraically from $\mathcal{X}_c = \operatorname{Im}(\mathcal{R})$ and $\mathcal{X}_{no} = \ker(\mathcal{O})$?
?
$\mathcal{X}_{c\bar{o}} = \mathcal{X}_c \cap \mathcal{X}_{no}$, while $\mathcal{X}_{co}$ complements $\mathcal{X}_{c\bar{o}}$ in $\mathcal{X}_c$ and $\mathcal{X}_{\bar{c}\bar{o}}$ complements $\mathcal{X}_{c\bar{o}}$ in $\mathcal{X}_{no}$.

---

Which of the four Kalman canonical subsystems determines the transfer function matrix $\mathbf{W}(s)$?
?
Exclusively the controllable and observable core $(\mathbf{A}_{co}, \mathbf{B}_{co}, \mathbf{C}_{co}, \mathbf{D})$.

---

In Kalman Canonical Form, what happens algebraically to eigenvalues belonging to $\mathcal{X}_{c\bar{o}}$, $\mathcal{X}_{\bar{c}o}$, and $\mathcal{X}_{\bar{c}\bar{o}}$ when forming $\mathbf{W}(s)$?
?
They cancel identically between $\operatorname{adj}(s\mathbf{I} - \mathbf{A})$ and $\det(s\mathbf{I} - \mathbf{A})$, leaving $\mathbf{W}(s)$ blind to those modes.

---

What is the McMillan degree condition for a state-space realization $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$ to be minimal?
?
State dimension equals the controllable-observable order ($n = n_{co}$), holding iff $(\mathbf{A}, \mathbf{B})$ is controllable and $(\mathbf{A}, \mathbf{C})$ is observable.

---

In the two-block controllability decomposition $\mathbf{T} = \begin{bmatrix} \mathbf{T}_c & \mathbf{T}_{\bar{c}} \end{bmatrix}$, where is $\mathbf{T}_c$ placed and how is it chosen?
?
Placed on the **left**, using $r_c$ linearly independent columns of $\mathcal{R}$ spanning $\operatorname{Im}(\mathcal{R})$, then completed on the right so $\det(\mathbf{T}) \neq 0$.

---

What block structure do $\hat{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$ and $\hat{\mathbf{B}} = \mathbf{T}^{-1}\mathbf{B}$ take in controllability decomposition?
?
$\hat{\mathbf{A}} = \begin{bmatrix} \mathbf{A}_c & \mathbf{A}_{12} \\ \mathbf{0} & \mathbf{A}_{\bar{c}} \end{bmatrix}$ (block upper-triangular) and $\hat{\mathbf{B}} = \begin{bmatrix} \mathbf{B}_c \\ \mathbf{0} \end{bmatrix}$.

---

In the two-block observability decomposition $\mathbf{T} = \begin{bmatrix} \mathbf{T}_o & \mathbf{T}_{\bar{o}} \end{bmatrix}$, where is $\mathbf{T}_{\bar{o}}$ placed and how is it chosen?
?
Placed on the **right**, using $n - r_o$ basis vectors spanning $\ker(\mathcal{O})$, then completed on the left so $\det(\mathbf{T}) \neq 0$.

---

What block structure do $\hat{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$ and $\hat{\mathbf{C}} = \mathbf{C}\mathbf{T}$ take in observability decomposition?
?
$\hat{\mathbf{A}} = \begin{bmatrix} \mathbf{A}_o & \mathbf{0} \\ \mathbf{A}_{21} & \mathbf{A}_{\bar{o}} \end{bmatrix}$ (block lower-triangular) and $\hat{\mathbf{C}} = \begin{bmatrix} \mathbf{C}_o & \mathbf{0} \end{bmatrix}$.
