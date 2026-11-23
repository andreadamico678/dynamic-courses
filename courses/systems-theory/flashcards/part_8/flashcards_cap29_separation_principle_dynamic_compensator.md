#flashcards/automatica/08_03_separation_principle

Come è realizzata la legge di controllo in retroazione dello stato quando le variabili di stato fisiche $\mathbf{x}(t)$ non sono direttamente misurabili?
?
Alimentando il controllore con lo stato stimato $\hat{\mathbf{x}}(t)$ fornito dall'osservatore di Luenberger:
$$\mathbf{u}(t) = -\mathbf{K}\hat{\mathbf{x}}(t) + \mathbf{v}(t)$$

Qual è la dimensione complessiva dello spazio di stato del sistema a ciclo chiuso con compensatore dinamico basato su osservatore?
?
La dimensione è pari a $2n$: $n$ stati per il processo fisico $\mathbf{x}(t)$ e $n$ stati per l'osservatore $\hat{\mathbf{x}}(t)$ (oppure per l'errore di stima $\mathbf{e}(t)$).

Qual è la struttura a blocchi triangolare superiore della matrice dinamica del sistema esteso nello stato $[\mathbf{x}^T \quad \mathbf{e}^T]^T$?
?
$$\begin{bmatrix} \dot{\mathbf{x}} \\ \dot{\mathbf{e}} \end{bmatrix} = \begin{bmatrix} \mathbf{A} - \mathbf{B}\mathbf{K} & \mathbf{B}\mathbf{K} \\ \mathbf{0} & \mathbf{A} - \mathbf{L}\mathbf{C} \end{bmatrix} \begin{bmatrix} \mathbf{x} \\ \mathbf{e} \end{bmatrix}$$

Cosa afferma formalmente il Principio di Separazione (*Separation Principle*) per la stabilità a ciclo chiuso?
?
I poli del controllore $\mathbf{K}$ e i poli dell'osservatore $\mathbf{L}$ possono essere progettati in modo totalmente indipendente; lo spettro complessivo del sistema a ciclo chiuso è l'unione disgiunta dei poli del controllore e dei poli dell'osservatore:
$$\det(s\mathbf{I} - \mathbf{A}_{ext}) = \det(s\mathbf{I} - (\mathbf{A} - \mathbf{B}\mathbf{K})) \cdot \det(s\mathbf{I} - (\mathbf{A} - \mathbf{L}\mathbf{C}))$$

Qual è la funzione di trasferimento $C_{comp}(s)$ del compensatore dinamico basato su osservatore che elabora l'errore di uscita per generare l'ingresso di controllo $\mathbf{U}(s) = -C_{comp}(s) \mathbf{Y}(s)$?
?
$$C_{comp}(s) = \mathbf{K} \left( s\mathbf{I} - (\mathbf{A} - \mathbf{B}\mathbf{K} - \mathbf{L}\mathbf{C}) \right)^{-1} \mathbf{L}$$

Il principio di separazione garantisce che il transitorio del sistema controllato con osservatore sia identico a quello con retroazione dallo stato ideale misurato?
?
No: sebbene gli autovalori asintotici siano gli stessi, la presenza dell'errore di stima $\mathbf{e}(0) \neq \mathbf{0}$ introduce un transitorio addizionale (*peaking phenomenon*) e zeri aggiuntivi nella funzione di trasferimento a ciclo chiuso.
