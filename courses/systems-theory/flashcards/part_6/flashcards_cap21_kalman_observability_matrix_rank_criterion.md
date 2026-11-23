#flashcards/automatica/06_02_kalman_observability

Qual è la definizione formale di osservabilità (*observability*) per un sistema LTI continuo?
?
Uno stato iniziale $\mathbf{x}(0)$ è osservabile se può essere determinato univocamente dalla conoscenza dell'ingresso $\mathbf{u}(t)$ e dell'uscita misurata $\mathbf{y}(t)$ su un intervallo di tempo finito $[0, t_1]$.

Come è definita analiticamente la matrice di osservabilità $\mathcal{Q}$ di Kalman per una coppia $(\mathbf{A}, \mathbf{C})$ di ordine $n$?
?
$$\mathcal{Q} = \begin{bmatrix} \mathbf{C} \\ \mathbf{C}\mathbf{A} \\ \mathbf{C}\mathbf{A}^2 \\ \vdots \\ \mathbf{C}\mathbf{A}^{n-1} \end{bmatrix} \in \mathbb{R}^{np \times n}$$

Cosa stabilisce il Criterio di Rango di Kalman per la completa osservabilità della coppia $(\mathbf{A}, \mathbf{C})$?
?
Il sistema è completamente osservabile se e solo se la matrice $\mathcal{Q}$ ha rango pieno di colonna:
$$\operatorname{rank}(\mathcal{Q}) = n$$

Qual è il sottospazio di inosservabilità $\mathcal{X}_{no}$ di un sistema espresso mediante la matrice $\mathcal{Q}$?
?
È il nucleo (*null space*) della matrice di osservabilità:
$$\mathcal{X}_{no} = \ker(\mathcal{Q}) = \{\mathbf{x} \in \mathbb{R}^n : \mathcal{Q}\mathbf{x} = \mathbf{0}\}$$

Cosa afferma il test di Popov-Belevitch-Hautus (PBH) per l'osservabilità di un modo associato all'autovalore $\lambda$?
?
Un autovalore $\lambda$ è osservabile se e solo se la matrice congiunta ha rango pieno di colonna:
$$\operatorname{rank}\left( \begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} \\ \mathbf{C} \end{bmatrix} \right) = n$$

In base al principio di dualità di Kalman, qual è la relazione algebrica tra osservabilità e controllabilità?
?
La coppia $(\mathbf{A}, \mathbf{C})$ è osservabile se e solo se la coppia duale $(\mathbf{A}^T, \mathbf{C}^T)$ è controllabile.
