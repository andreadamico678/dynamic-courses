#flashcards/automatica/06_04_stabilizability

Qual è la definizione formale di stabilizzabilità (*stabilizability*) per un sistema LTI continuo $(\mathbf{A}, \mathbf{B})$?
?
Un sistema è stabilizzabile se e solo se tutti i suoi modi non controllabili sono asintoticamente stabili (hanno autovalori con $\operatorname{Re}(\lambda) < 0$).

Cosa afferma il criterio PBH di stabilizzabilità per tutti gli autovalori con $\operatorname{Re}(\lambda) \ge 0$?
?
La coppia $(\mathbf{A}, \mathbf{B})$ è stabilizzabile se e solo se per ogni $\lambda \in \sigma(\mathbf{A})$ tale che $\operatorname{Re}(\lambda) \ge 0$:
$$\operatorname{rank}\left( \begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} & \mathbf{B} \end{bmatrix} \right) = n$$

Qual è la definizione formale di rilevabilità (*detectability*) per un sistema LTI continuo $(\mathbf{A}, \mathbf{C})$?
?
Un sistema è rilevabile se e solo se tutti i suoi modi non osservabili sono asintoticamente stabili (hanno autovalori con $\operatorname{Re}(\lambda) < 0$).

Cosa afferma il criterio PBH di rilevabilità per tutti gli autovalori con $\operatorname{Re}(\lambda) \ge 0$?
?
La coppia $(\mathbf{A}, \mathbf{C})$ è rilevabile se e solo se per ogni $\lambda \in \sigma(\mathbf{A})$ tale che $\operatorname{Re}(\lambda) \ge 0$:
$$\operatorname{rank}\left( \begin{bmatrix} \lambda\mathbf{I} - \mathbf{A} \\ \mathbf{C} \end{bmatrix} \right) = n$$

Se un sistema non è completamente controllabile ma è stabilizzabile, è possibile rendere il sistema asintoticamente stabile a ciclo chiuso mediante retroazione dello stato $\mathbf{u} = -\mathbf{K}\mathbf{x}$?
?
Sì: la retroazione dello stato può allocare a piacere tutti i modi controllabili, mentre i modi non controllabili decadono spontaneamente a zero per via della loro stabilità intrinseca.
