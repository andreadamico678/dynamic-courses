#flashcards/automatica/01_02_similarity_transformations

Data una trasformazione lineare di coordinate dello stato $\mathbf{x} = \mathbf{T}\mathbf{z}$, quale condizione deve soddisfare la matrice $\mathbf{T}$?
?
La matrice $\mathbf{T} \in \mathbb{R}^{n \times n}$ deve essere non singolare, ovvero invertibile ($\det(\mathbf{T}) \neq 0$).

Sotto la trasformazione di similarità $\mathbf{x} = \mathbf{T}\mathbf{z}$, qual è l'espressione analitica della matrice dinamica trasformata $\tilde{\mathbf{A}}$?
?
$$\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$$

Sotto la trasformazione di coordinate $\mathbf{x} = \mathbf{T}\mathbf{z}$, qual è l'espressione analitica della nuova matrice di ingresso $\tilde{\mathbf{B}}$?
?
$$\tilde{\mathbf{B}} = \mathbf{T}^{-1}\mathbf{B}$$

Sotto la trasformazione di coordinate $\mathbf{x} = \mathbf{T}\mathbf{z}$, qual è l'espressione analitica della nuova matrice di uscita $\tilde{\mathbf{C}}$?
?
$$\tilde{\mathbf{C}} = \mathbf{C}\mathbf{T}$$

Cosa accade alla matrice di trasmissione diretta $\mathbf{D}$ a seguito di una trasformazione di similarità $\mathbf{x} = \mathbf{T}\mathbf{z}$?
?
Rimane invariata: $\tilde{\mathbf{D}} = \mathbf{D}$.

Come varia il polinomio caratteristico $p(\lambda) = \det(\lambda\mathbf{I} - \mathbf{A})$ sotto una trasformazione di coordinate $\mathbf{x} = \mathbf{T}\mathbf{z}$?
?
È un invariante intrinseco di similarità: $\det(\lambda\mathbf{I} - \tilde{\mathbf{A}}) = \det(\lambda\mathbf{I} - \mathbf{A})$.

Cosa accade agli autovalori del sistema (*eigenvalues*) sotto una trasformazione di similarità dello stato?
?
Gli autovalori sono rigorosamente invarianti: le frequenze naturali e i modi propri del sistema non dipendono dalla base scelta per rappresentare lo stato.

Cosa accade alla traccia di $\mathbf{A}$ ($\operatorname{tr}(\mathbf{A}) = \sum \lambda_i$) sotto un cambio di base $\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$?
?
La traccia è invariante per similarità: $\operatorname{tr}(\tilde{\mathbf{A}}) = \operatorname{tr}(\mathbf{A})$.

Cosa accade al determinante di $\mathbf{A}$ ($\det(\mathbf{A}) = \prod \lambda_i$) sotto un cambio di base $\tilde{\mathbf{A}} = \mathbf{T}^{-1}\mathbf{A}\mathbf{T}$?
?
Il determinante è invariante per similarità: $\det(\tilde{\mathbf{A}}) = \det(\mathbf{A})$.
