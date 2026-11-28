#flashcards/automatica/01_03_block_diagrams

What is the equivalent transfer function of two blocks $G_1(s)$ and $G_2(s)$ connected in cascade (series)?
?
The product $W(s) = G_2(s) G_1(s)$ (or $G_1(s) G_2(s)$ for scalar SISO blocks).

---

What is the equivalent transfer function of two non-interacting blocks $G_1(s)$ and $G_2(s)$ summed or subtracted in parallel?
?
$W(s) = G_1(s) \pm G_2(s)$.

---

What is the closed-loop transfer function $W(s) = Y(s)/U(s)$ for forward path $G(s)$ and feedback return path $H(s)$ under negative feedback?
?
$$W(s) = \frac{G(s)}{1 + G(s)H(s)}$$

---

How does positive feedback at the summing junction alter the canonical closed-loop transfer function formula?
?
The denominator sign flips from plus to minus: $W(s) = \frac{G(s)}{1 - G(s)H(s)}$.

---

In the canonical feedback loop, how do the forward-path transfer function $G(s)$ and loop transfer function $L(s)$ differ?
?
$L(s) \triangleq G(s)H(s)$ is the full open-loop product entering the denominator $1 \pm L(s)$, whereas only $G(s)$ appears in the numerator.

---

Why is the numerator of a non-unity negative-feedback loop equal to $G(s)$ rather than $G(s)H(s)$?
?
Because the forward signal $U(s) \to Y(s)$ passes only through $G(s)$, while $H(s)$ sits in the return path ($E = U - HY$, $Y = GE$).

---

To move a summing junction from *before* block $G(s)$ to *after* $G(s)$, what block must be inserted on the arriving side branch?
?
Multiply the arriving side branch by $G(s)$ so $G(U_1 \pm U_2) = GU_1 \pm GU_2$ holds.

---

To move a summing junction from *after* block $G(s)$ to *before* $G(s)$, what block must be inserted on the arriving side branch?
?
Multiply the arriving side branch by $\frac{1}{G(s)}$ so $G(U_1 \pm \frac{1}{G}U_2) = GU_1 \pm U_2$.

---

To move a takeoff (pickoff) point from *before* block $G(s)$ to *after* $G(s)$, what block must be added to the tapped branch?
?
Insert $\frac{1}{G(s)}$ on the tapped branch to undo $G(s)$ and recover $U(s) = \frac{1}{G}(GU)$.

---

To move a takeoff (pickoff) point from *after* block $G(s)$ to *before* $G(s)$, what block must be added to the tapped branch?
?
Insert $G(s)$ on the tapped branch so the tapped output stays equal to $G(s)U(s)$.

---

Can an adjacent summing junction and takeoff point be swapped directly without adding compensating blocks?
?
No; summing junctions commute with other summing junctions, and takeoff points commute with other takeoff points, but a summer and a takeoff point do not commute.
