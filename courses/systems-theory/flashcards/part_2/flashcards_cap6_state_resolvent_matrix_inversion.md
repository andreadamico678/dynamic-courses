#flashcards/automatica/02_03_resolvent_inversion

Qual è la definizione formale della matrice risolvente dello stato $\boldsymbol{\Phi}(s)$?
?
$$\boldsymbol{\Phi}(s) = (s\mathbf{I} - \mathbf{A})^{-1}$$

Qual è la formula algebrica standard per l'inversione della matrice risolvente $(s\mathbf{I} - \mathbf{A})^{-1}$?
?
$$(s\mathbf{I} - \mathbf{A})^{-1} = \frac{\operatorname{adj}(s\mathbf{I} - \mathbf{A})}{\det(s\mathbf{I} - \mathbf{A})}$$
dove $\operatorname{adj}(\cdot)$ è la matrice dei cofattori trasposta (matrice aggiunta).

A cosa coincide il denominatore scalare comune di tutti gli elementi della matrice risolvente $(s\mathbf{I} - \mathbf{A})^{-1}$?
?
Al polinomio caratteristico della matrice dinamica:
$$p(s) = \det(s\mathbf{I} - \mathbf{A})$$

Qual è la relazione fondamentale che lega la matrice risolvente $(s\mathbf{I} - \mathbf{A})^{-1}$ alla matrice di transizione temporale $e^{\mathbf{A}t}$?
?
La matrice di transizione è l'antitrasformata di Laplace termine a termine della matrice risolvente:
$$e^{\mathbf{A}t} = \mathcal{L}^{-1}\left\{ (s\mathbf{I} - \mathbf{A})^{-1} \right\}$$

Per una matrice diagonale $\mathbf{A} = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$, qual è la matrice risolvente $(s\mathbf{I} - \mathbf{A})^{-1}$?
?
La matrice diagonale contenente i singoli poli invertiti:
$$(s\mathbf{I} - \mathbf{A})^{-1} = \operatorname{diag}\left( \frac{1}{s - \lambda_1}, \dots, \frac{1}{s - \lambda_n} \right)$$

Cosa accade alla matrice risolvente $(s\mathbf{I} - \mathbf{A})^{-1}$ al tendere di $s \to \infty$?
?
Tende alla matrice nulla: $\lim_{s \to \infty} (s\mathbf{I} - \mathbf{A})^{-1} = \mathbf{0}$, coerentemente con il fatto che ogni suo elemento è strettamente proprio.
