#flashcards/automatica/07_03_dominant_poles

In cosa consiste l'ipotesi di "poli dominanti" (*dominant poles approximation*) nel progetto del controllo a ciclo chiuso?
?
Nel posizionare due poli complessi coniugati $\lambda_{1,2} = -\xi\omega_n \pm j\omega_n\sqrt{1-\xi^2}$ molto più vicini all'asse immaginario rispetto a tutti gli altri poli, i quali vengono allocati a parte reale molto più negativa (almeno 3–5 volte più lontani).

Dati due poli dominanti desiderati in $s = -a \pm jb$, qual è il polinomio caratteristico del secondo ordine corrispondente?
?
$$p_{dom}(s) = (s - (-a + jb))(s - (-a - jb)) = (s + a)^2 + b^2 = s^2 + 2as + (a^2 + b^2)$$

Qual è la formula che lega il coefficiente di smorzamento $\xi$ alla sovraelongazione percentuale massima $S\%$ per un prototipo del 2° ordine?
?
$$S\% = 100 \cdot e^{-\frac{\pi\xi}{\sqrt{1 - \xi^2}}}$$

Come è definito il tempo di assestamento al $2\%$ ($t_{s,2\%}$) in funzione della parte reale $\sigma = \xi\omega_n$ dei poli dominanti?
?
$$t_{s,2\%} \approx \frac{4}{\xi\omega_n} = \frac{4}{\sigma}$$

In un sistema di ordine $n = 3$, dove si alloca tipicamente il terzo polo reale non dominante $\lambda_3$ rispetto alla parte reale $\sigma = \xi\omega_n$ dei poli dominanti?
?
A una distanza da 3 a 5 volte superiore verso sinistra: $\lambda_3 \le -5 \xi\omega_n$, in modo che il suo modo proprio $e^{\lambda_3 t}$ decada molto rapidamente prima che il transitorio dominante si sviluppi.
