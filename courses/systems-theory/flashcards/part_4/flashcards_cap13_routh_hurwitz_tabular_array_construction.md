#flashcards/automatica/04_03_routh_tabular_array

What normalization must be applied to $p(s) = a_n s^n + \dots + a_0$ before testing Stodola's condition and building a Routh array?
?
Ensure a strictly positive leading coefficient $a_n > 0$ (multiplying $p(s)$ by $-1$ if $a_n < 0$).

---

What is Stodola's necessary condition for a polynomial $p(s) = a_n s^n + \dots + a_0$ ($a_n > 0$) to be strictly Hurwitz?
?
All coefficients must be strictly present and strictly positive: $a_i > 0$ for every $i = 0, 1, \dots, n$.

---

For which polynomial degrees is Stodola's condition ($a_i > 0$ for all $i$) both necessary and sufficient for strict Hurwitz stability?
?
Only degrees $n = 1$ and $n = 2$; for $n \ge 3$ it is necessary only.

---

In the regular Routh table (rows $s^n = [a_n, a_{n-2}, \dots]$ and $s^{n-1} = [a_{n-1}, a_{n-3}, \dots]$), what is the formula for entry $b_j$ in row $s^{n-2}$?
?
$$b_j = \frac{a_{n-1} a_{n-2j} - a_n a_{n-2j-1}}{a_{n-1}}$$

---

How does Routh's criterion determine strict Hurwitz stability and count right-half-plane roots in the regular case?
?
$p(s)$ is strictly Hurwitz iff all $(n + 1)$ entries in Column 1 are strictly positive; otherwise $n_{\text{RHP}}$ equals the number of sign changes in Column 1.

---

Which scalar row scaling operation is valid during Routh table construction, and which one corrupts the table?
?
Multiplying any entire row by $k > 0$ preserves all signs and ratios, whereas multiplying by $-1$ or a negative scalar flips Column 1 signs.

---

What is the closed-form Routh-Hurwitz sufficient condition for a normalized cubic $s^3 + a_2 s^2 + a_1 s + a_0$ ($a_2, a_1, a_0 > 0$)?
?
$$a_2 a_1 > a_0$$

---

What is the closed-form Routh-Hurwitz sufficient condition for a normalized quartic $s^4 + a_3 s^3 + a_2 s^2 + a_1 s + a_0$ ($a_i > 0$)?
?
$a_3 a_2 > a_1$ and $a_3 a_2 a_1 > a_1^2 + a_3^2 a_0$.

---

Can the Routh-Hurwitz criterion distinguish defective ($m_g < m_a$) from non-defective repeated eigenvalues on the $j\omega$-axis?
?
No; Routh-Hurwitz counts polynomial root locations only and requires a state-matrix rank check for geometric multiplicity.
