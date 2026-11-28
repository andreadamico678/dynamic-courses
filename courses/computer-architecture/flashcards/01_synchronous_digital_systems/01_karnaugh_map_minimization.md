#flashcards/computer-architecture/01_synchronous_digital_systems/01_karnaugh_map_minimization

What Boolean law allows Karnaugh map grouping to eliminate a variable?
?
The **Adjacency Law**: $A \cdot B + A \cdot \overline{B} = A$, canceling any single variable that complements between two adjacent cells (Hamming distance $d_H = 1$).

---

What is the mandatory 2-bit Gray-code header ordering for rows and columns in a 4-variable Karnaugh map?
?
Reflected Gray code **`00, 01, 11, 10`**, so adjacent entries—including the opposite wrap-around borders `00` and `10`—differ in exactly $1$ bit.

---

What sizes are valid for rectangular groups in a Karnaugh map, and how many variables does a group of $2^k$ cells eliminate?
?
Only powers of two ($2^k \in \{1, 2, 4, 8, 16, 32\}$); grouping $2^k$ cells eliminates exactly **$k$** variables that change across the group.

---

What is a **Prime Implicant (PI)** on a Karnaugh map?
?
A maximally expanded power-of-two implicant of `1`s (and optional `X`s) that cannot be doubled to $2^{k+1}$ cells without absorbing a `0`.

---

What defines an **Essential Prime Implicant (EPI)**, and how is it handled in minimal SOP?
?
A prime implicant that covers at least one `1`-minterm covered by **no other** prime implicant; every EPI **must** appear in the final minimal SOP expression.

---

How must **Don't Care (`X`)** cells be treated during Karnaugh map minimization?
?
Include an `X` **only** when it enlarges a valid group containing at least one `1`; never create a group of `X`s alone, and treat ungrouped `X`s as `0`.

---

How are minterms mapped onto a 5-variable Karnaugh map $f(a, b, c, d, e)$?
?
Split across two stacked $4 \times 4$ grids over $(bc, de)$: **Layer 0** ($a = 0$) holds $m_0 \dots m_{15}$, and **Layer 1** ($a = 1$) holds $m_{16} \dots m_{31}$ at matching coordinates shifted by $+16$; identical $(bc, de)$ blocks across both layers merge in 3D to eliminate $a$.
