#flashcards/automatica/06_03_kalman_decomposition

Cosa garantisce la proprietà di $\mathbf{A}$-invarianza del sottospazio di raggiungibilità $\mathcal{X}_r = \operatorname{Im}(\mathcal{P})$?
?
Garantisce che la moltiplicazione per la matrice dinamica $\mathbf{A}$ mantiene qualsiasi vettore di $\mathcal{X}_r$ all'interno di $\mathcal{X}_r$ stesso: $\mathbf{A} \mathcal{X}_r \subseteq \mathcal{X}_r$.

Come si costruisce la matrice di trasformazione di similarità $\mathbf{T}$ per isolare il sottosistema controllabile nella Decomposizione Canonica di Kalman?
?
$$\mathbf{T} = \begin{bmatrix} \mathbf{T}_c & \mathbf{T}_{nc} \end{bmatrix}$$
dove le colonne di $\mathbf{T}_c \in \mathbb{R}^{n \times r}$ formano una base di $\operatorname{Im}(\mathcal{P})$ ($r = \operatorname{rank}(\mathcal{P})$) e $\mathbf{T}_{nc}$ completa la base in $\mathbb{R}^n$.

Qual è la struttura a blocchi della matrice dinamica trasformata $\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$ nella Decomposizione Canonica di Kalman per la controllabilità?
?
$$\tilde{\mathbf{A}} = \begin{bmatrix} \mathbf{A}_c & \mathbf{A}_{12} \\ \mathbf{0} & \mathbf{A}_{nc} \end{bmatrix}$$
con il blocco nullo $\tilde{\mathbf{A}}_{21} = \mathbf{0}$ che impedisce agli stati non controllabili di essere influenzati da quelli controllabili.

Qual è la struttura a blocchi della matrice di ingresso trasformata $\tilde{\mathbf{B}} = \mathbf{T}^{-1}\mathbf{B}$ nella Decomposizione Canonica di Kalman?
?
$$\tilde{\mathbf{B}} = \begin{bmatrix} \mathbf{B}_c \\ \mathbf{0} \end{bmatrix}$$
le righe corrispondenti al sottosistema non controllabile sono identicamente nulle.

In quanti sottospazi fondamentali scompone lo spazio di stato la Decomposizione Canonica Completa di Kalman a 4 vie?
?
In quattro sottospazi disgiunti:
1. Controllabile e osservabile ($\mathcal{X}_{co}$)
2. Controllabile e non osservabile ($\mathcal{X}_{c\bar{o}}$)
3. Non controllabile e osservabile ($\mathcal{X}_{\bar{c}o}$)
4. Non controllabile e non osservabile ($\mathcal{X}_{\bar{c}\bar{o}}$)

Quale dei 4 sottospazi della Decomposizione Completa di Kalman determina l'intera funzione di trasferimento ingresso-uscita $W(s)$?
?
Esclusivamente il sottospazio contemporaneamente controllabile e osservabile ($\mathcal{X}_{co}$). I modi negli altri tre sottospazi si cancellano algebricamente in $W(s)$.
