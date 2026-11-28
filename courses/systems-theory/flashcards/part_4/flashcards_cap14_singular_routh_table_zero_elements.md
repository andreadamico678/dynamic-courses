#flashcards/automatica/04_04_singular_routh_tables

What defines Singular Case 1 (isolated zero) vs. Singular Case 2 (vanishing row) in a Routh table?
?
Case 1 has $a_{k,1} = 0$ with at least one non-zero entry later in row $s^k$; Case 2 has every entry in row $s^k$ equal to $0$.

---

How is an isolated first-column zero (Singular Case 1) resolved in a Routh table?
?
Replace the leading $0$ with an infinitesimal $\varepsilon > 0$, finish the table symbolically, and count sign changes as $\varepsilon \to 0^+$.

---

In Singular Case 1, does choosing $-\varepsilon$ instead of $+\varepsilon$ change the counted number of RHP roots?
?
No; both $+\varepsilon$ and $-\varepsilon$ yield the exact same number of Column 1 sign changes (two sign changes around a nonzero pivot).

---

What root symmetry triggers a complete row of zeros (Singular Case 2) in row $s^k$?
?
An even polynomial factor $A(s) = A(-s)$ whose roots sit symmetrically about the origin ($\pm j\omega_0$, $\pm\sigma_0$, or $\pm\sigma \pm j\omega$).

---

From which row do you construct the auxiliary polynomial $A(s)$ when row $s^k$ vanishes completely?
?
From row $s^{k+1}$ immediately above the vanishing row, stepping down powers by $2$ ($s^{k+1}, s^{k-1}, \dots$).

---

After building the auxiliary polynomial $A(s)$ for a vanishing row $s^k$, what replaces row $s^k$ so the Routh table can continue?
?
The coefficients of the derivative $\frac{dA(s)}{ds}$.

---

Why is a polynomial with a vanishing row $s^k$ and zero Column 1 sign changes *not* asymptotically stable?
?
Zero Column 1 sign changes prove only $n_{\text{RHP}} = 0$; solving $A(s) = 0$ reveals the imaginary-axis roots $n_{j\omega}$.

---

Once $n_{\text{RHP}}$ is read from Column 1 and $n_{j\omega}$ is found from $A(s) = 0$, how is $n_{\text{LHP}}$ obtained?
?
$$n_{\text{LHP}} = n - n_{\text{RHP}} - n_{j\omega}$$
