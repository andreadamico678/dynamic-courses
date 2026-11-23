#flashcards/automatica/05_02_bode_phase

Qual è il contributo costante di fase introdotto da un polo nell'origine di molteplicità $g$ ($1/s^g$)?
?
Una fase costante su tutte le frequenze pari a:
$$\Delta\phi = -g \cdot 90^\circ$$

Qual è il contributo asintotico totale di fase introdotto da un polo reale stabile $(1 + sT)$ con $T > 0$?
?
Un ritardo di fase che parte da $0^\circ$ per $\omega \ll 1/T$, vale esattamente $-45^\circ$ alla pulsazione di taglio $\omega = 1/T$, e tende asintoticamente a $-90^\circ$ per $\omega \gg 1/T$.

Qual è il contributo asintotico totale di fase introdotto da uno zero reale a parte reale negativa $(1 + s\tau)$ con $\tau > 0$?
?
Un anticipo di fase che parte da $0^\circ$, vale $+45^\circ$ a $\omega = 1/\tau$, e tende asintoticamente a $+90^\circ$ ad alte frequenze.

Se il guadagno di Bode $K_B$ è negativo ($K_B < 0$), qual è la fase iniziale a bassissima frequenza ($\omega \to 0$)?
?
La fase parte da $-180^\circ$ (oppure $+180^\circ$), dovuta all'argomento di una costante reale negativa.

Per una coppia di poli complessi coniugati $s^2 + 2\xi\omega_n s + \omega_n^2$, quanto vale esattamente lo sfasamento alla pulsazione naturale $\omega = \omega_n$?
?
Vale esattamente $-90^\circ$, con uno sfasamento complessivo ad alta frequenza pari a $-180^\circ$.

Cosa accade alla pendenza della curva di fase nei pressi di $\omega_n$ quando lo smorzamento $\xi$ diventa molto piccolo ($\xi \to 0$)?
?
La transizione della fase tra $0^\circ$ e $-180^\circ$ diventa estremamente ripida, approssimando un salto discontinuo a gradino di $-180^\circ$ per $\xi = 0$.
