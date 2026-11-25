#drills/computer_architectures/05_04_control_hazards
.
In cosa consiste la strategia statica di gestione dei salti nota come **Predict Untaken (Predizione di Salto Non Preso)**?
?
La pipeline assume ottimisticamente che tutti i salti condizionati **non vengano presi** ($PC \leftarrow PC + 4$):
.
- Se all'esito del confronto il salto risulta effettivamente **non preso (Untaken)**: la predizione è corretta e la pipeline prosegue senza alcuna perdita di tempo (**0 cicli di stallo**).
- Se il salto risulta **preso (Taken)**: le istruzioni prelevate erroneamente lungo il percorso sequenziale devono essere annullate (**pipeline flush / squash**) e il PC viene aggiornato al target, sprecando cicli di clock (penalità di salto).
.
Negli esercizi d'esame sulla valutazione del CPI, qual è il numero di cicli di stallo (penalità di salto) subito quando un branch risulta preso (Taken) a seconda dello stadio in cui viene risolto l'esito del salto?
?
La penalità equivale esattamente al numero di istruzioni già entrate nella pipeline che devono essere svuotate (flushed):
.
- **Esito risolto nello stadio ID:** **$1$ ciclo di stallo** (viene annullata solo l'istruzione in IF).
- **Esito risolto nello stadio EX:** **$2$ cicli di stallo** (vengono annullate le istruzioni in IF e ID).
- **Esito risolto nello stadio MEM:** **$3$ cicli di stallo** (vengono annullate le istruzioni in IF, ID ed EX).
.
In una pipeline con risoluzione dei salti anticipata nello stadio **ID**, cosa accade se un'istruzione di branch dipende dal risultato di un'istruzione ALU immediatamente precedente:
.
```assembly
add x1, x2, x3    # ALU calcola x1 in EX
beq x1, x4, label # Branch confronta x1 nello stadio ID!
```
.
?
Si verifica un conflitto temporale:
Il valore di $x_1$ viene calcolato alla fine dello stadio EX dell'istruzione `add`, ma l'istruzione `beq` ne ha bisogno all'inizio dello stadio ID nello stesso ciclo.
Poiché il dato non può viaggiare all'indietro tra stadi, il forwarding diretto non basta:
La pipeline deve inserire **$1$ ciclo di stallo aggiuntivo** per consentire a `add` di completare EX e inoltrare il dato al comparatore nello stadio ID.
.
Se una traccia d'esame specifica:
.
- Branch: $12\%$ delle istruzioni totali
- Il $50\%$ dei branch è Taken
- L'esito del branch viene rilevato nella fase di **Memory Access (MEM)**
  Qual è il contributo dei branch presi al CPI medio?
  ?
  La frequenza dei branch presi vale:
  $$f_{\text{taken}} = 12\% \times 50\% = 0.12 \times 0.50 = 0.06$$
  Poiché la risoluzione avviene in MEM, la penalità di salto preso è di $3$ cicli:
  $$\text{Stall}_{\text{branch}} = 0.06 \times 3\text{ cicli} = 0.18\text{ cicli/istruzione}$$
.
Che cos'è il **Branch Delay Slot** e come viene sfruttato dai compilatori per eliminare la penalità di salto?
?
È uno slot architetturale (tipico dell'architettura MIPS classica) in cui l'istruzione posizionata immediatamente dopo il branch viene eseguita **incondizionatamente**, indipendentemente dal fatto che il salto sia preso o meno.
Il compilatore inserisce in questo slot un'istruzione utile indipendente dal salto, evitando di dover scartare l'istruzione in IF e riducendo a zero la penalità percepita. (Nota: RISC-V ha deliberatamente eliminato il branch delay slot per semplificare l'hardware delle implementazioni superscalari moderne).
