#flashcards/automatica/04_06_bibo_stability

Qual è la definizione formale di stabilità BIBO (*Bounded-Input Bounded-Output*) per un sistema LTI continuo?
?
A fronte di qualunque segnale di ingresso limitato in ampiezza ($\exists M_u < \infty : |u(t)| \le M_u, \forall t \ge 0$), la risposta di uscita forzata è anch'essa limitata in ampiezza ($\exists M_y < \infty : |y(t)| \le M_y, \forall t \ge 0$).

Qual è la condizione necessaria e sufficiente sulla risposta all'impulso $w(t)$ per la BIBO stabilità?
?
La risposta all'impulso deve essere assolutamente integrabile su $[0, \infty)$:
$$\|w\|_1 = \int_0^\infty |w(t)|\,dt < \infty$$

Qual è la condizione necessaria e sufficiente sui poli della funzione di trasferimento $W(s)$ per la BIBO stabilità?
?
Tutti i poli di $W(s)$ devono avere parte reale strettamente negativa:
$$\forall i, \quad \operatorname{Re}(p_i) < 0$$

Un sistema con un polo sull'asse immaginario (es. integratore ideale $W(s) = 1/s$) è BIBO-stabile?
?
No: applicando un ingresso limitato sinusoidale risonante o un gradino unitario $u(t) = 1(t)$, l'uscita diverge illimitatamente nel tempo ($y(t) = t$), violando la condizione BIBO.

Qual è la relazione fondamentale tra stabilità asintotica interna (secondo Lyapunov) e stabilità BIBO esterna?
?
L'asintotica stabilità interna implica sempre la stabilità BIBO; il viceversa vale solo se la realizzazione di stato è in forma minima (priva di cancellazioni polo-zero instabili).
