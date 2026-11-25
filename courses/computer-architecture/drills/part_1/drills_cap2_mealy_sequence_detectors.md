#drills/computer_architectures/01_02_mealy_sequence_detectors
.
In una macchina a stati finiti (FSM) di tipo **Mealy**, da quali variabili dipende l'uscita $u^t$ al generico istante di clock $t$ e in quale momento commuta a $1$?
?
Dipende sia dallo **stato presente** $s^t$ sia dall'**ingresso istantaneo** $x^t$:
$$u^t = \lambda(s^t, x^t)$$
L'uscita vale $1$ **nello stesso identico ciclo di clock** in cui si presenta sul bus l'ultimo simbolo della sequenza (proprietà *Zero-Latency*), direttamente sull'arco di transizione che porta allo stato successivo.
.
Data la specifica dell'esame del 26 Gennaio 2026 (Variante C1):
Riconoscere la sequenza con ingressi $xy \in \{00, 01, 11, 10\}$:
$$\{11, (10, \dots, 10), 11, (01, \dots, 01), 00\}$$
dove $(XY, \dots, XY)$ indica una o più coppie $XY$ consecutive.
Quali sono gli stati minimi della catena di avanzamento principale e cosa memorizza ciascuno?
?
La catena minima di avanzamento richiede 5 stati oltre al reset:
- **$S_0$:** Stato iniziale di reset (nessun simbolo valido).
- **$S_1$:** Ha riconosciuto il primo simbolo $\{11\}$.
- **$S_2$:** Ha riconosciuto $\{11, 10\}$ (e assorbe in auto-anello ulteriori coppie $10$).
- **$S_3$:** Ha riconosciuto $\{11, (10..10), 11\}$.
- **$S_4$:** Ha riconosciuto $\{11, (10..10), 11, 01\}$ (e assorbe in auto-anello ulteriori coppie $01$).
L'arrivo di $xy = 00$ in $S_4$ completa la sequenza generando l'uscita $u = 1$.
.
Nello stato $S_2$ del problema precedente (che ha riconosciuto $\{11, 10\}$):
Cosa accade se all'istante successivo si presenta in ingresso $xy = 10$, e cosa accade se si presenta $xy = 11$?
?
1. Se $xy = 10$: la sequenza prevede ripetizioni arbitrarie $(10, \dots, 10)$. Lo stato esegue un **auto-anello (self-loop)** su se stesso:
   $$\text{Transizione: } S_2 \xrightarrow{10 / 0} S_2$$
2. Se $xy = 11$: si esce dalle ripetizioni di $10$ e si prosegue verso il simbolo successivo della sequenza target, transitando in $S_3$:
   $$\text{Transizione: } S_2 \xrightarrow{11 / 0} S_3$$
.
Nello stato $S_4$ (che ha riconosciuto $\{11, (10..10), 11, 01\}$ e accetta ripetizioni di $01$), l'ingresso corrente è $xy = 00$, completando la sequenza.
Sapendo che il circuito deve riconoscere anche sequenze parzialmente sovrapposte, e che le sequenze ammesse iniziano tutte per $11$, verso quale stato transita l'arco con uscita $u = 1$?
?
Transita verso lo stato iniziale **$S_0$**:
$$\text{Transizione: } S_4 \xrightarrow{00 / 1} S_0$$
*Motivazione:* L'uscita commuta a $1$ su questo arco perché la sequenza è completa. Il simbolo finale appena ricevuto è $00$. Poiché nessuna sequenza valida inizia con $00$ (tutte iniziano con $11$), non esiste alcun suffisso utile che possa fungere da prefisso per la sequenza successiva; si deve quindi ripartire da $S_0$.
.
Nello stato $S_1$ (ha riconosciuto il prefisso $\{11\}$), se all'istante successivo l'ingresso è nuovamente $xy = 11$, quale transizione garantisce di non perdere la sequenza?
?
Si crea un **auto-anello** su $S_1$ con uscita $0$:
$$S_1 \xrightarrow{11 / 0} S_1$$
*Motivazione:* La sequenza vista è $\{11, 11\}$. Il secondo $11$ può essere interpretato come l'inizio di una nuova sequenza target valida. Rimanendo in $S_1$, la macchina preserva il prefisso $\{11\}$ senza resettare a $S_0$.
.
In una FSM con ingressi $xy$, se nello stato $S_3$ (che ha visto $\{11, 10, 11\}$) arriva l'ingresso inatteso $xy = 10$, qual è la transizione corretta applicando la regola del massimo suffisso-prefisso?
?
La sequenza complessiva vista finora è:
$$\{11, 10, 11\} + \{10\} = \{11, 10, 11, 10\}$$
Cerchiamo il più lungo suffisso che coincida con un prefisso della sequenza target $\{11, 10, \dots\}$:
- Suffisso di lunghezza 2: $\{11, 10\}$ coincide esattamente con il prefisso di lunghezza 2, rappresentato dallo stato $S_2$!
Pertanto la transizione corretta è:
$$S_3 \xrightarrow{10 / 0} S_2$$
Resettare a $S_0$ sarebbe un grave errore d'esame perché ignorerebbe la coppia $\{11, 10\}$ già pronta per una nuova sequenza.
