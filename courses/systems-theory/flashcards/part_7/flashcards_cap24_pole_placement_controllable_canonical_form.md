#flashcards/automatica/07_01_controllable_canonical_form

What closed-loop matrix replaces $\mathbf{A}$ under linear state feedback $\mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) + \mathbf{v}(t)$?
?
$$\mathbf{A}_{\text{cl}} = \mathbf{A} - \mathbf{B}\mathbf{K}$$

---

For a single-input plant in Controllable Canonical Form $(\mathbf{A}_c, \mathbf{B}_c)$, what structure do $\mathbf{A}_c$ and $\mathbf{B}_c$ have?
?
$\mathbf{A}_c$ has $1$s on the superdiagonal and $[-a_0, -a_1, \dots, -a_{n-1}]$ along its bottom row, while $\mathbf{B}_c = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix}^T$.

---

Why does subtracting $\mathbf{B}_c \mathbf{K}_c$ leave the first $n - 1$ rows of $\mathbf{A}_c$ unchanged and decouple every coefficient of $p_{\text{cl}}(s)$?
?
Because $\mathbf{B}_c = [0, \dots, 0, 1]^T$ confines $\mathbf{B}_c \mathbf{K}_c$ exclusively to the bottom row, shifting each $a_i$ to $a_i + k_{ci}$ independently.

---

For open-loop characteristic $p(s) = s^n + \sum_{i=0}^{n-1} a_i s^i$ and target polynomial $p^*(s) = s^n + \sum_{i=0}^{n-1} \alpha_i s^i$, how is canonical gain $\mathbf{K}_c = [k_{c0}, \dots, k_{c,n-1}]$ computed?
?
$$k_{ci} = \alpha_i - a_i \qquad \text{for } i = 0, 1, \dots, n - 1$$

---

In $\mathbf{K}_c = [k_{c0}, k_{c1}, \dots, k_{c,n-1}]$, which polynomial term does the leftmost entry $k_{c0}$ adjust?
?
The constant term $a_0$ (never the $s^{n-1}$ term $a_{n-1}$).

---

How is the generator row vector $\mathbf{t}_n^T$ extracted from the Kalman controllability matrix $\mathcal{R}$?
?
It is the last row of $\mathcal{R}^{-1}$: $\mathbf{t}_n^T = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix}\mathcal{R}^{-1}$.

---

How is the inverse transformation matrix $\mathbf{T}^{-1}$ built from $\mathbf{t}_n^T$ and $\mathbf{A}$ to map physical coordinates $\mathbf{x} = \mathbf{T}\mathbf{z}$ into companion coordinates?
?
$$\mathbf{T}^{-1} = \begin{bmatrix} \mathbf{t}_n^T \\ \mathbf{t}_n^T\mathbf{A} \\ \vdots \\ \mathbf{t}_n^T\mathbf{A}^{n-1} \end{bmatrix}$$

---

Given canonical gain $\mathbf{K}_c$ and transformation $\mathbf{z} = \mathbf{T}^{-1}\mathbf{x}$, how is the physical feedback gain $\mathbf{K}$ recovered?
?
$$\mathbf{K} = \mathbf{K}_c \mathbf{T}^{-1}$$

---

What quick multiplication check confirms that the rows of $\mathbf{T}^{-1}$ are ordered correctly before computing $\mathbf{K}$?
?
Verify $\mathbf{T}^{-1}\mathbf{B} = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix}^T$.
