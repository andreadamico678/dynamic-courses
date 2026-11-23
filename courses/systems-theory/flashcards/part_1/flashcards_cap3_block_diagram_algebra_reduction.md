#flashcards/automatica/01_03_block_diagrams

Qual è la funzione di trasferimento equivalente $W(s)$ di due blocchi $G_1(s)$ e $G_2(s)$ connessi in cascata (serie)?
?
$$W(s) = G_1(s) \cdot G_2(s)$$

Qual è la funzione di trasferimento equivalente $W(s)$ di due blocchi $G_1(s)$ e $G_2(s)$ connessi in parallelo con somma algebrica?
?
$$W(s) = G_1(s) + G_2(s)$$

Qual è la formula di riduzione in forma chiusa per un anello in retroazione negativa con catena diretta $G(s)$ e catena di reazione $H(s)$?
?
$$W(s) = \frac{G(s)}{1 + G(s)H(s)}$$

Qual è la formula di riduzione per un anello in retroazione positiva con catena diretta $G(s)$ e catena di reazione $H(s)$?
?
$$W(s) = \frac{G(s)}{1 - G(s)H(s)}$$

Cosa si deve inserire sul ramo di ingresso quando si sposta un sommatore da monte a valle di un blocco $G(s)$?
?
Il blocco diretto $G(s)$ sul ramo che entra nel sommatore.

Cosa si deve inserire sul ramo di ingresso quando si sposta un sommatore da valle a monte di un blocco $G(s)$?
?
Il blocco reciproco $\frac{1}{G(s)}$ sul ramo che entra nel sommatore.

Cosa si deve inserire sul ramo derivato quando si sposta un punto di diramazione (prelievo) da monte a valle di un blocco $G(s)$?
?
Il blocco reciproco $\frac{1}{G(s)}$ sul ramo derivato.

Cosa si deve inserire sul ramo derivato quando si sposta un punto di diramazione da valle a monte di un blocco $G(s)$?
?
Il blocco diretto $G(s)$ sul ramo derivato.

È lecito scambiare direttamente l'ordine di due nodi sommatori consecutivi adiacenti senza blocchi intermedi?
?
Sì, per la proprietà associativa e commutativa della somma algebrica.

È lecito scambiare direttamente un nodo sommatore con un punto di diramazione senza modificare i blocchi?
?
No: un sommatore e un punto di diramazione non commutano algebricamente e richiedono l'introduzione di blocchi di compensazione.
