#drills/computer_architectures/01_03_moore_sequence_detectors
.
In una macchina a stati finiti (FSM) di tipo **Moore**, da quali variabili dipende l'uscita $u^t$ al generico istante di clock $t$?
?
Dipende **esclusivamente dallo stato interno presente** $s^t$:
$$u^t = \lambda(s^t)$$
L'uscita è svincolata dal valore istantaneo dell'ingresso ed è associata al nodo di stato (oppure all'uscita dei flip-flop di stato).
.
Perché nel riconoscimento di una sequenza di lunghezza $L$, una macchina di Moore richiede tipicamente **un numero di stati maggiore** ($L+1$ stati) rispetto a una macchina di Mealy ($L$ stati)?
?
In Mealy, l'ultimo simbolo genera l'uscita $u=1$ direttamente sull'arco di transizione.
In Moore, l'uscita $u=1$ può essere prodotta solo **dopo essere entrati in uno stato di riconoscimento dedicato** (stato di successo $S_{rec}$).
Pertanto Moore richiede uno stato aggiuntivo in cui l'etichetta di stato produce $u=1$.
.
Qual è la conseguenza sulla latenza temporale del riconoscimento di una sequenza quando si adotta un modello di Moore rispetto a Mealy?
?
Nel modello di Moore l'uscita $u=1$ compare con **un ciclo di clock di ritardo** rispetto a Mealy.
L'uscita rimane $0$ durante il ciclo in cui arriva l'ultimo simbolo e commuta a $1$ solo al fronte attivo di clock successivo, quando lo stato di successo viene campionato nei flip-flop.
.
Qual è il vantaggio architetturale fondamentale del modello di Moore rispetto al modello di Mealy nei sistemi digitali sincroni ad alta frequenza?
?
Nel modello di Moore l'uscita è campionata direttamente dai registri di stato (o da una logica combinatoria isolata dagli ingressi primari), eliminando i percorsi combinatori diretti tra ingresso e uscita.
Questo:
.
1. Elimina i **glitch** (transitori spuri) sull'uscita causati da commutazioni asincrone dell'ingresso.
2. Spezza i lunghi cammini critici combinatori tra stadi successivi, consentendo frequenze di clock più elevate.
.
Dato uno stato di Moore $S_4$ con uscita associata $u=1$ che ha riconosciuto la sequenza $101$, se il simbolo successivo è $0$, in quale stato transita la macchina sapendo che la sequenza da riconoscere può sovrapporsi?
?
La sequenza terminata è $101$. Con l'ingresso $0$, la storia recente è $1010$.
Il più lungo suffisso di $1010$ che è prefisso di $101$:
.
- Lunghezza 2: $10$ (è prefisso di $101$).
  La macchina transita nello stato che rappresenta il prefisso $10$ (stato $S_2$, con uscita $u=0$).
