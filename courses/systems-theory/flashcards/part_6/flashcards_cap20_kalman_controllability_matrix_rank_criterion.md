#flashcards/automatica/06_01_kalman_controllability

Qual è la definizione formale di raggiungibilità (*reachability*) dello stato per un sistema LTI continuo?
?
Uno stato $\mathbf{x}_1$ è raggiungibile dall'origine a un tempo $t_1 > 0$ se esiste un segnale di controllo continuo a tratti $\mathbf{u}(t)$ in $[0, t_1]$ tale che $\mathbf{x}(0) = \mathbf{0} \implies \mathbf{x}(t_1) = \mathbf{x}_1$.

Come è definita analiticamente la matrice di controllabilità/raggiungibilità $\mathcal{P}$ di Kalman per un sistema di ordine $n$?
?
$$\mathcal{P} = \begin{bmatrix} \mathbf{B} & \mathbf{A}\mathbf{B} & \mathbf{A}^2\mathbf{B} & \dots & \mathbf{A}^{n-1}\mathbf{B} \end{bmatrix} \in \mathbb{R}^{n \times nm}$$

Cosa stabilisce il Criterio di Rango di Kalman per la completa controllabilità della coppia $(\mathbf{A}, \mathbf{B})$?
?
Il sistema è completamente controllabile se e solo se la matrice $\mathcal{P}$ ha rango pieno:
$$\operatorname{rank}(\mathcal{P}) = n$$

Qual è il sottospazio di raggiungibilità $\mathcal{X}_r$ di un sistema LTI continuo espresso mediante la matrice $\mathcal{P}$?
?
È lo spazio immagine delle colonne della matrice di controllabilità:
$$\mathcal{X}_r = \operatorname{Im}(\mathcal{P}) \subseteq \mathbb{R}^n$$

Cosa afferma il test di Popov-Belevitch-Hautus (PBH) per la controllabilità di un modo associato all'autovalore $\lambda$?
?
Un autovalore $\lambda$ di $\mathbf{A}$ è controllabile se e solo se la matrice congiunta ha rango pieno di riga:
$$\operatorname{rank}\left( \begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} & \mathbf{B} \end{bmatrix} \right) = n$$

Perché la sequenza delle potenze di $\mathbf{A}$ nella matrice $\mathcal{P}$ si arresta necessariamente ad $\mathbf{A}^{n-1}\mathbf{B}$?
?
Per il Teorema di Cayley-Hamilton: ogni potenza $\mathbf{A}^k$ con $k \ge n$ è combinazione lineare delle prime $n$ potenze, quindi colonne di ordine superiore appartengono già a $\operatorname{Im}(\mathcal{P})$.
