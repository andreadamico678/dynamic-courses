#flashcards/computer-architecture/01_synchronous_digital_systems/03_moore_sequence_detectors

Da cosa dipende l'uscita $u^t$ in una macchina di Moore e dove si riporta nel grafo e nella tabella degli stati?
?
Dipende esclusivamente dallo stato presente ($u^t = \lambda(S^t)$): si scrive dentro i cerchi di stato ($S_k / u$) e in una colonna d'uscita separata nella tabella (mai sugli archi).

---

Quanti stati richiede un riconoscitore di sequenze di Moore per una sequenza di lunghezza minima $L$ e perché?
?
$L + 1$ stati: gli $L$ stati di avanzamento con $u = 0$ più uno stato di riconoscimento dedicato $S_{\text{rec}} / 1$, poiché $S_0$ deve mantenere $u = 0$ al reset.

---

Quale latenza temporale introduce un riconoscitore di Moore rispetto a uno di Mealy?
?
Un ritardo di $1$ ciclo di clock: $u$ commuta a `1` solo sul fronte attivo successivo che campiona $S_{\text{rec}} / 1$ nei flip-flop, eliminando i glitch asincroni sugli ingressi.

---

Come si calcolano i 4 archi uscenti dallo stato di riconoscimento $S_{\text{rec}} / 1$ in un riconoscitore di Moore con sovrapposizione?
?
Si concatena ciascun ingresso $xy \in \{00, 01, 11, 10\}$ all'intera sequenza riconosciuta $W$ e si instrada l'arco verso lo stato corrispondente al massimo suffisso valido (LPS), senza resettare ciecamente a $S_0$.
