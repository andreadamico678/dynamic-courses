#flashcards/automatica/03_01_matrix_exponential

Qual è la definizione formale in serie di potenze della matrice esponenziale $e^{\mathbf{A}t}$?
?
$$e^{\mathbf{A}t} = \sum_{k=0}^{\infty} \frac{\mathbf{A}^k t^k}{k!} = \mathbf{I} + \mathbf{A}t + \frac{1}{2!} \mathbf{A}^2 t^2 + \dots$$

Qual è il valore della matrice di transizione all'istante iniziale $t = 0$?
?
$$e^{\mathbf{A} \cdot 0} = \mathbf{I} \quad (\text{matrice identità } n \times n)$$

Qual è la proprietà fondamentale dell'inversa di $e^{\mathbf{A}t}$?
?
$$\left(e^{\mathbf{A}t}\right)^{-1} = e^{-\mathbf{A}t}$$

Qual è l'espressione della derivata temporale della matrice esponenziale $\frac{d}{dt} e^{\mathbf{A}t}$?
?
$$\frac{d}{dt} e^{\mathbf{A}t} = \mathbf{A} e^{\mathbf{A}t} = e^{\mathbf{A}t} \mathbf{A}$$

Perché la proprietà esponenziale $e^{\mathbf{A}t_1} e^{\mathbf{B}t_2} = e^{\mathbf{A}t_1 + \mathbf{B}t_2}$ non vale in generale per matrici $\mathbf{A}$ e $\mathbf{B}$ arbitrarie?
?
Perché il prodotto matriciale non è commutativo ($\mathbf{A}\mathbf{B} \neq \mathbf{B}\mathbf{A}$). La proprietà vale solo se $\mathbf{A}$ e $\mathbf{B}$ commutano ($\mathbf{A}\mathbf{B} = \mathbf{B}\mathbf{A}$).

Come si calcola la matrice esponenziale $e^{\mathbf{A}t}$ se la matrice $\mathbf{A}$ è diagonalizzabile con autovettori $\mathbf{T}$ ($\mathbf{A} = \mathbf{T} \mathbf{\Lambda} \mathbf{T}^{-1}$)?
?
$$e^{\mathbf{A}t} = \mathbf{T} e^{\mathbf{\Lambda}t} \mathbf{T}^{-1} = \mathbf{T} \operatorname{diag}\left(e^{\lambda_1 t}, \dots, e^{\lambda_n t}\right) \mathbf{T}^{-1}$$

Cosa afferma il Teorema di Cayley-Hamilton applicato al calcolo di $e^{\mathbf{A}t}$ per una matrice di ordine $n$?
?
Poiché $\mathbf{A}^n$ è combinazione lineare delle potenze inferiori, $e^{\mathbf{A}t}$ può essere espresso esattamente come un polinomio di grado $n-1$:
$$e^{\mathbf{A}t} = \sum_{k=0}^{n-1} \alpha_k(t) \mathbf{A}^k$$

Come si determinano i coefficienti scalari $\alpha_k(t)$ nel metodo di Cayley-Hamilton per il calcolo di $e^{\mathbf{A}t}$ per autovalori distinti $\lambda_i$?
?
Imponendo l'uguaglianza sugli autovalori: per ogni $\lambda_i$, si risolve il sistema $e^{\lambda_i t} = \sum_{k=0}^{n-1} \alpha_k(t) \lambda_i^k$.
