#flashcards/automatica/04_01_equilibrium_points

Qual è la condizione algebrica affinché uno stato $\mathbf{x}_e$ sia un punto di equilibrio (*equilibrium state*) per un sistema LTI autonomo $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x}$?
?
La derivata temporale dello stato deve essere identicamente nulla:
$$\dot{\mathbf{x}} = \mathbf{0} \iff \mathbf{A} \mathbf{x}_e = \mathbf{0}$$

Se la matrice dinamica $\mathbf{A}$ è non singolare ($\det(\mathbf{A}) \neq 0$), quanti punti di equilibrio possiede il sistema autonomo $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x}$?
?
Un unico punto di equilibrio isolato nell'origine dello spazio di stato: $\mathbf{x}_e = \mathbf{0}$.

Cosa accade ai punti di equilibrio di un sistema LTI autonomo quando la matrice dinamica $\mathbf{A}$ è singolare ($\det(\mathbf{A}) = 0$)?
?
Esistono infiniti punti di equilibrio che costituiscono un intero sottospazio vettoriale coincidente con il nucleo di $\mathbf{A}$: $\mathcal{X}_e = \ker(\mathbf{A})$.

Dato un ingresso costante costante a regime $\mathbf{u}(t) = \mathbf{u}_e$, come si calcola lo stato di equilibrio forzato $\mathbf{x}_e$ se $\det(\mathbf{A}) \neq 0$?
?
$$\mathbf{0} = \mathbf{A} \mathbf{x}_e + \mathbf{B} \mathbf{u}_e \iff \mathbf{x}_e = -\mathbf{A}^{-1} \mathbf{B} \mathbf{u}_e$$

Qual è l'uscita di equilibrio corrispondente $\mathbf{y}_e$ per un ingresso costante $\mathbf{u}_e$ se $\det(\mathbf{A}) \neq 0$?
?
$$\mathbf{y}_e = \mathbf{C} \mathbf{x}_e + \mathbf{D} \mathbf{u}_e = \left( -\mathbf{C} \mathbf{A}^{-1} \mathbf{B} + \mathbf{D} \right) \mathbf{u}_e = W(0) \mathbf{u}_e$$
dove $W(0)$ è il guadagno statico (*DC gain*) del sistema.
