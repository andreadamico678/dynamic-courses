#flashcards/automatica/07_02_ackermann_formula

Qual è l'espressione analitica compatta della Formula di Ackermann per il calcolo del vettore $\mathbf{K}$ in un sistema SISO di ordine $n$?
?
$$\mathbf{K} = \begin{bmatrix} 0 & 0 & \dots & 1 \end{bmatrix} \mathcal{P}^{-1} \alpha_{des}(\mathbf{A})$$

Cosa rappresenta la matrice $\alpha_{des}(\mathbf{A})$ nella Formula di Ackermann?
?
È il polinomio caratteristico desiderato a ciclo chiuso valutato nella matrice dinamica a ciclo aperto $\mathbf{A}$:
$$\alpha_{des}(\mathbf{A}) = \mathbf{A}^n + \alpha_{n-1}\mathbf{A}^{n-1} + \dots + \alpha_1\mathbf{A} + \alpha_0\mathbf{I}$$

Quale vettore riga seleziona il termine $\begin{bmatrix} 0 & 0 & \dots & 1 \end{bmatrix} \mathcal{P}^{-1}$ nella Formula di Ackermann?
?
Seleziona esattamente l'ultima riga della matrice di controllabilità invertita $\mathcal{P}^{-1}$.

Sotto quale specifica precondizione algebrica è valida e applicabile la Formula di Ackermann?
?
Il sistema deve essere strettamente a singolo ingresso (SISO, $m=1$) e completamente controllabile ($\det(\mathcal{P}) \neq 0$).

Cosa accade se si tenta di applicare la formula di Ackermann a un sistema che non è a pieno rango di controllabilità?
?
L'inversa $\mathcal{P}^{-1}$ non esiste ($\det(\mathcal{P}) = 0$) e la formula fallisce per divisione per zero.
