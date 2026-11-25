#flashcards/computer-architecture/01_synchronous_digital_systems/02_mealy_sequence_detectors

Da cosa dipende l'uscita $u^t$ in una macchina di Mealy e dove va annotata nel grafo di stato?
?
Dipende sia dallo stato presente $S^t$ sia dall'ingresso corrente $xy^t$ ($u^t = \lambda(S^t, xy^t)$) e si annota sugli archi di transizione come $xy / u$.

---

In quale ciclo di clock commuta a `1` l'uscita di un riconoscitore di sequenze di Mealy rispetto a uno di Moore?
?
Nello stesso identico ciclo di clock (latenza $0$ cicli) in cui si presenta sul bus l'ultimo simbolo valido della sequenza.

---

Quanti stati richiede un riconoscitore di Mealy per una sequenza fissa di lunghezza minima $L$?
?
$L$ stati ($S_0 \dots S_{L-1}$), asserendo $u = 1$ direttamente sull'arco di ritorno attivato dall'$L$-esimo simbolo.

---

Come si sintetizza un blocco di ripetizione $(XY, \dots, XY)$ in una FSM d'esame?
?
Con un arco di avanzamento obbligatorio ($XY / 0$) verso uno stato dedicato $S_k$, seguito da un auto-anello $S_k \xrightarrow{XY / 0} S_k$ sullo stato $S_k$ (mai sullo stato precedente).

---

Come si determina lo stato prossimo su un ingresso inatteso o finale in un riconoscitore con sovrapposizione (*overlap*)?
?
Si concatena l'ingresso $xy$ alla storia dello stato corrente e si transita verso lo stato il cui prefisso coincide con il più lungo suffisso proprio valido della stringa ottenuta (regola LPS).

---

Quante transizioni uscenti deve avere ogni riga della tabella degli stati per ingressi a 2 bit $xy$?
?
Esattamente $4$ celle complete nella forma $S^{t+1} / u$, ordinate secondo le colonne `00, 01, 11, 10` senza alcuna cella vuota.
