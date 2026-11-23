#flashcards/automatica/02_02_partial_fractions

Nel calcolo dell'antitrasformata mediante fratti semplici per un polo reale semplice $p_i$, qual è la formula del residuo di Heaviside $R_i$?
?
$$R_i = \lim_{s \to p_i} (s - p_i) F(s)$$

Qual è l'antitrasformata temporale del termine a fratto semplice $\frac{R_i}{s - p_i}$ per polo reale semplice?
?
$$\mathcal{L}^{-1}\left\{ \frac{R_i}{s - p_i} \right\} = R_i e^{p_i t} \cdot 1(t)$$

Per un polo $p$ di molteplicità algebrica $m \ge 2$, qual è la formula generale per estrarre il coefficiente del fratto $\frac{A_{m-k}}{(s - p)^{m-k}}$?
?
$$A_{m-k} = \frac{1}{k!} \lim_{s \to p} \frac{d^k}{ds^k} \left[ (s - p)^m F(s) \right]$$

Qual è l'antitrasformata temporale del termine a polo multiplo $\frac{1}{(s - p)^m}$ con $m \ge 1$?
?
$$\mathcal{L}^{-1}\left\{ \frac{1}{(s - p)^m} \right\} = \frac{t^{m-1}}{(m-1)!} e^{pt} \cdot 1(t)$$

Per una coppia di poli complessi coniugati $s_{1,2} = -\sigma \pm j\omega_d$ con residuo complesso coniugato $R = |R| e^{j\theta}$, qual è l'espressione reale nel tempo dell'antitrasformata?
?
$$\mathcal{L}^{-1}\left\{ \frac{R}{s - p} + \frac{R^*}{s - p^*} \right\} = 2 |R| e^{-\sigma t} \cos(\omega_d t + \theta) \cdot 1(t)$$

Quale condizione sui gradi dei polinomi numeratore $N(s)$ e denominatore $D(s)$ deve valere per poter applicare direttamente la scomposizione in fratti semplici?
?
La funzione razionale deve essere strettamente propria: $\deg(N(s)) < \deg(D(s))$. Se $\deg(N) \ge \deg(D)$, si esegue prima la divisione polinomiale.
