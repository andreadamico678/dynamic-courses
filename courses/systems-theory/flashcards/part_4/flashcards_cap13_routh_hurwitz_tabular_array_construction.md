#flashcards/automatica/04_03_routh_tabular_array

A quale scopo si costruisce la tabella di Routh-Hurwitz per un polinomio $P(s) = a_n s^n + a_{n-1} s^{n-1} + \dots + a_0$?
?
Per determinare il numero esatto di radici a parte reale positiva ($\operatorname{Re}(s) > 0$) senza dover calcolare esplicitamente le radici del polinomio.

Qual è la condizione necessaria (ma non sufficiente) per l'asintotica stabilità ricavabile dai coefficienti del polinomio caratteristico?
?
Tutti i coefficienti da $a_n$ ad $a_0$ devono essere strettamente positivi (o strettamente negativi): nessun coefficiente deve essere nullo e non devono esserci cambi di segno tra coefficienti successivi.

Come vengono disposti i coefficienti del polinomio nelle prime due righe ($s^n$ ed $s^{n-1}$) della tabella di Routh?
?
- Riga $s^n$: i coefficienti di posto pari a partire da $a_n$ ($a_n, a_{n-2}, a_{n-4}, \dots$).
- Riga $s^{n-1}$: i coefficienti dispari ($a_{n-1}, a_{n-3}, a_{n-5}, \dots$).

Qual è la formula algebrica per calcolare il primo elemento $b_1$ della riga $s^{n-2}$ dati gli elementi $a_n, a_{n-2}$ e $a_{n-1}, a_{n-3}$?
?
$$b_1 = \frac{a_{n-1} a_{n-2} - a_n a_{n-3}}{a_{n-1}}$$

Cosa sancisce il Teorema di Routh-Hurwitz in merito al numero di radici a parte reale positiva ($\operatorname{Re}(s) > 0$)?
?
Il numero di radici del polinomio nel semipiano destro aperto ($\mathbb{C}^+$) è pari al numero di variazioni di segno presenti tra gli elementi della prima colonna della tabella di Routh.

Qual è la condizione necessaria e sufficiente affinché tutte le radici del polinomio si trovino nel semipiano sinistro ($\operatorname{Re}(s) < 0$)?
?
Tutti gli elementi della prima colonna della tabella di Routh devono essere strettamente concordi in segno (tutti strettamente positivi se $a_n > 0$).
