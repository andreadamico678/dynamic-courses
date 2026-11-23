#flashcards/automatica/08_01_luenberger_observer

Qual è l'equazione differenziale dello stato stimato $\hat{\mathbf{x}}(t)$ nell'osservatore asintotico di Luenberger a tempo continuo?
?
$$\dot{\hat{\mathbf{x}}}(t) = \mathbf{A}\hat{\mathbf{x}}(t) + \mathbf{B}\mathbf{u}(t) + \mathbf{L}\left(\mathbf{y}(t) - \mathbf{C}\hat{\mathbf{x}}(t)\right)$$

Cosa rappresenta il termine $\mathbf{y}(t) - \mathbf{C}\hat{\mathbf{x}}(t)$ nell'osservatore di Luenberger?
?
L'errore di predizione dell'uscita (*output estimation error* o innovazione), che corregge la simulazione a modello aperto.

Qual è l'equazione differenziale che governa l'errore di stima dello stato $\mathbf{e}(t) = \mathbf{x}(t) - \hat{\mathbf{x}}(t)$?
?
$$\dot{\mathbf{e}}(t) = (\mathbf{A} - \mathbf{L}\mathbf{C})\mathbf{e}(t)$$

Perché la dinamica dell'errore $\dot{\mathbf{e}} = (\mathbf{A} - \mathbf{L}\mathbf{C})\mathbf{e}$ è un'equazione autonoma priva dei termini di forzamento $\mathbf{u}(t)$ e $\mathbf{y}(t)$?
?
Perché nella sottrazione $\dot{\mathbf{x}} - \dot{\hat{\mathbf{x}}}$, il termine $\mathbf{B}\mathbf{u}(t)$ si cancella e l'uscita reale $\mathbf{y} = \mathbf{C}\mathbf{x}$ si combina con $\mathbf{C}\hat{\mathbf{x}}$, lasciando l'errore indipendente dall'ingresso di controllo.

Sotto quale condizione algebrica l'errore di stima $\mathbf{e}(t)$ converge asintoticamente a zero ($\lim_{t \to \infty} \mathbf{e}(t) = \mathbf{0}$) da qualunque condizione iniziale $\mathbf{e}(0)$?
?
Se e solo se la matrice dinamica dell'osservatore $(\mathbf{A} - \mathbf{L}\mathbf{C})$ è una matrice di Hurwitz (tutti gli autovalori hanno $\operatorname{Re}(\lambda) < 0$).

Qual è la regola euristica fondamentale per allocare i poli dell'osservatore rispetto ai poli del controllore a retroazione dello stato?
?
I poli dell'osservatore devono essere da 3 a 5 volte più veloci (parte reale negativa più marcata) rispetto ai poli del controllore, in modo che l'errore di stima converga prima che il controllore agisca.
