#flashcards/automatica/04_04_singular_routh_tables

Cosa si intende per "primo caso singolare" nella tabella di Routh?
?
La comparsa di uno zero isolato come primo elemento di una riga, mentre almeno un altro elemento della stessa riga è non nullo (divisione per zero al passo successivo).

Come si risolve operativamente il primo caso singolare (zero isolato nella prima colonna) nella tabella di Routh?
?
Si sostituisce lo zero con un parametro infinitesimo $\epsilon > 0$, si completano i calcoli della tabella, e si valutano i segni della prima colonna per il limite $\epsilon \to 0^+$.

Cosa si intende per "secondo caso singolare" nella tabella di Routh?
?
La comparsa di una riga i cui coefficienti sono tutti identicamente nulli (riga di zeri).

Quale configurazione delle radici del polinomio indica inequivocabilmente una riga identicamente nulla nella tabella di Routh?
?
La presenza di radici a simmetria centrale rispetto all'origine del piano complesso (coppie immaginarie pure $\pm j\omega$, coppie reali opposte $\pm \sigma$, o quadruplette complesse $\pm \sigma \pm j\omega$).

Come si costruisce il "polinomio ausiliario" $A(s)$ in presenza di una riga identicamente nulla alla riga $s^k$?
?
Si prendono i coefficienti della riga immediatamente superiore ($s^{k+1}$), associandoli alle sole potenze pari decrescenti di $s$ a partire da $s^{k+1}$.

Come si completa la tabella di Routh dopo aver scritto il polinomio ausiliario $A(s)$?
?
Si calcola la derivata prima $\frac{d}{ds} A(s)$ e si inseriscono i coefficienti della derivata al posto della riga nulla, proseguendo regolarmente l'algoritmo di Routh.
