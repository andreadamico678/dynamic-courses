#flashcards/automatica/02_04_transfer_function_invariants

Qual è l'espressione analitica della matrice di trasferimento $\mathbf{W}(s)$ ricavata a partire dalle matrici di stato $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$?
?
$$\mathbf{W}(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + \mathbf{D}$$

A quali condizioni iniziali è definita rigorosamente la funzione di trasferimento $\mathbf{W}(s) = \frac{\mathbf{Y}(s)}{\mathbf{U}(s)}$?
?
A condizioni iniziali identicamente nulle per tutte le variabili di stato: $\mathbf{x}(0) = \mathbf{0}$.

Cosa accade alla funzione di trasferimento $\mathbf{W}(s)$ sotto una trasformazione di similarità dello stato $\mathbf{x} = \mathbf{T}\mathbf{z}$?
?
Rimane rigorosamente invariata:
$$\tilde{\mathbf{W}}(s) = \tilde{\mathbf{C}}(s\mathbf{I} - \tilde{\mathbf{A}})^{-1}\tilde{\mathbf{B}} + \tilde{\mathbf{D}} = \mathbf{W}(s)$$

Qual è la relazione tra i poli della funzione di trasferimento $W(s)$ e gli autovalori della matrice dinamica $\mathbf{A}$?
?
Tutti i poli di $W(s)$ sono autovalori di $\mathbf{A}$, ma non tutti gli autovalori di $\mathbf{A}$ sono necessariamente poli di $W(s)$ (possono verificarsi cancellazioni polo-zero per modi non controllabili o non osservabili).

Sotto quale condizione tutti gli autovalori di $\mathbf{A}$ coincidono esattamente con i poli della funzione di trasferimento $W(s)$?
?
Quando la realizzazione di stato $(\mathbf{A}, \mathbf{B}, \mathbf{C})$ è in **forma minima** (*minimal realization*), ovvero contemporaneamente completamente controllabile e completamente osservabile.

Come si calcola la risposta all'impulso $w(t)$ conoscendo la funzione di trasferimento $W(s)$?
?
$$w(t) = \mathcal{L}^{-1}\{W(s)\}$$
La funzione di trasferimento è la trasformata di Laplace della risposta impulsiva.
