#flashcards/automatica/04_02_spectral_stability

What is the $\varepsilon$-$\delta$ definition of simple (Lyapunov) stability for $\mathbf{x}_e = \mathbf{0}$?
?
For every $\varepsilon > 0$ there exists $\delta(\varepsilon) > 0$ such that $\|\mathbf{x}(0)\| < \delta \implies \|\mathbf{x}(t)\| < \varepsilon$ for all $t \ge 0$.

---

What extra property distinguishes asymptotic stability from simple Lyapunov stability?
?
Attractivity: in addition to Lyapunov boundedness, trajectories converge back to equilibrium, $\lim_{t \to \infty} \|\mathbf{x}(t)\| = \mathbf{0}$.

---

Why is asymptotic stability in continuous-time LTI systems always global and exponential rather than local?
?
By linearity, scaling any convergent initial state $\mathbf{x}(0)$ scales $\mathbf{x}(t) = e^{\mathbf{A}t}\mathbf{x}(0)$ identically, so all $\mathbf{x}(0) \in \mathbb{R}^n$ decay exponentially.

---

What exact eigenvalue condition makes an LTI matrix $\mathbf{A}$ asymptotically stable (Hurwitz)?
?
Every eigenvalue of $\mathbf{A}$ lies strictly in the open left half-plane: $\operatorname{Re}(\lambda_i) < 0$ for all $i = 1, \dots, n$.

---

Do defective (non-diagonalizable) eigenvalues strictly inside the open left half-plane ($\operatorname{Re}(\lambda) < 0$) break asymptotic stability?
?
No; exponential decay $e^{-|\sigma|t}$ dominates any polynomial factor $t^k$, so $\lim_{t \to \infty} t^k e^{-|\sigma|t} = 0$.

---

What are the exact necessary and sufficient spectral conditions for simple (marginal) stability?
?
All eigenvalues satisfy $\operatorname{Re}(\lambda_i) \le 0$, at least one lies on $\operatorname{Re}(\lambda_k) = 0$, and every boundary eigenvalue is non-defective ($m_g(\lambda_k) = m_a(\lambda_k)$).

---

What geometric multiplicity formula determines whether an eigenvalue $\lambda_k$ on the imaginary axis is non-defective?
?
$$m_g(\lambda_k) = \dim(\ker(\lambda_k\mathbf{I} - \mathbf{A})) = n - \operatorname{rank}(\lambda_k\mathbf{I} - \mathbf{A}) = m_a(\lambda_k)$$

---

When does an LTI system with $\max \operatorname{Re}(\lambda_i) = 0$ become unstable?
?
Whenever at least one imaginary-axis eigenvalue (including $\lambda = 0$) is defective ($m_g(\lambda_k) < m_a(\lambda_k)$), generating unbounded $t^k e^{j\omega_k t}$ growth.

---

How is the asymptotic stability margin (degree of stability) $\alpha$ computed for a Hurwitz matrix $\mathbf{A}$?
?
$$\alpha = \min_{i=1,\dots,n} |\operatorname{Re}(\lambda_i)| > 0$$
