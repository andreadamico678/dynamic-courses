#flashcards/automatica/07_01_controllable_canonical_form

Qual è la legge di controllo per la retroazione lineare statica dello stato con ingresso di riferimento $\mathbf{v}(t)$?
?
$$\mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) + \mathbf{v}(t)$$

Qual è la matrice dinamica a ciclo chiuso $\mathbf{A}_{cl}$ risultante dalla retroazione dello stato $\mathbf{u} = -\mathbf{K}\mathbf{x}$?
?
$$\mathbf{A}_{cl} = \mathbf{A} - \mathbf{B}\mathbf{K}$$

Cosa afferma il Teorema di Allocazione Arbitraria degli Autovalori (*Eigenvalue Placement Theorem*)?
?
Se e solo se la coppia $(\mathbf{A}, \mathbf{B})$ è completamente controllabile, esiste una matrice di guadagno $\mathbf{K}$ tale per cui gli autovalori di $\mathbf{A} - \mathbf{B}\mathbf{K}$ possono essere allocati arbitrariamente nel piano complesso (a meno di simmetria coniugata complessa).

In forma canonica di controllo (FCC), qual è la struttura dell'ultima riga della matrice dinamica $\mathbf{A}_{fcc}$?
?
Contiene direttamente i coefficienti negati del polinomio caratteristico a ciclo aperto:
$$\begin{bmatrix} -a_0 & -a_1 & \dots & -a_{n-1} \end{bmatrix}$$

Qual è la formula elementare per i guadagni di retroazione $\mathbf{K}_{fcc} = \begin{bmatrix} k_0 & k_1 & \dots & k_{n-1} \end{bmatrix}$ nel sistema in forma canonica di controllo?
?
$$k_i = \alpha_i - a_i$$
dove $\alpha_i$ sono i coefficienti desiderati a ciclo chiuso e $a_i$ sono i coefficienti a ciclo aperto.
