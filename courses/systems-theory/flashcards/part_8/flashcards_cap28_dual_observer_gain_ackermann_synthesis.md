#flashcards/automatica/08_02_dual_ackermann

In base alla dualità controllore-osservatore di Kalman, come si relazionano le matrici di stima a quelle di controllo?
?
La coppia $(\mathbf{A}, \mathbf{C})$ per l'osservatore equivale alla coppia $(\mathbf{A}^T, \mathbf{C}^T)$ per il controllore:
$$\mathbf{A} - \mathbf{L}\mathbf{C} \iff (\mathbf{A} - \mathbf{L}\mathbf{C})^T = \mathbf{A}^T - \mathbf{C}^T \mathbf{L}^T$$

Qual è l'espressione analitica della Formula di Ackermann Duale per il calcolo del vettore dei guadagni dell'osservatore $\mathbf{L} \in \mathbb{R}^{n \times 1}$ per un sistema SISO?
?
$$\mathbf{L} = \alpha_{obs}(\mathbf{A}) \mathcal{Q}^{-1} \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}$$
dove $\alpha_{obs}(s)$ è il polinomio caratteristico desiderato per la dinamica dell'osservatore.

Quale colonna della matrice di osservabilità invertita $\mathcal{Q}^{-1}$ seleziona il vettore $\begin{bmatrix} 0 & \dots & 1 \end{bmatrix}^T$ nella Formula di Ackermann duale?
?
Seleziona esattamente l'ultima colonna della matrice $\mathcal{Q}^{-1}$.

Sotto quale specifica precondizione algebrica è applicabile la Formula di Ackermann Duale per l'osservatore?
?
Il sistema deve essere strettamente a singola uscita (SISO, $p=1$) e completamente osservabile ($\det(\mathcal{Q}) \neq 0$).
