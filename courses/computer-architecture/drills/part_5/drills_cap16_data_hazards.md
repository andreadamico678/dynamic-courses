#drills/computer_architectures/05_03_data_hazards
.
Qual è l'unico tipo di dipendenza sui dati che costituisce un vero azzardo nei processori pipeline a esecuzione in ordine (in-order execution)?
?
La dipendenza **RAW (Read After Write)**, detta anche dipendenza vera sui dati (True Data Dependency):
Un'istruzione successiva tenta di leggere un registro prima che un'istruzione precedente abbia terminato di scrivervi il valore aggiornato.
(Le dipendenze WAR e WAW non causano problemi nelle pipeline in-order perché le scritture avvengono rigorosamente nello stadio WB in ordine di programma).
.
In una sequenza di istruzioni ALU dipendenti a distanza 1:
.
```assembly
add x5, x1, x2    # calcola x5 nello stadio EX
sub x6, x5, x3    # usa x5 come operando sorgente
```
.
Quanti cicli di stallo si verificano se la pipeline è dotata di **Data Forwarding** completo?
?
**$0$ cicli di stallo.**
Il risultato di `add` è disponibile all'uscita dell'ALU alla fine dello stadio EX (memorizzato nel registro di pipeline EX/MEM).
I multiplexer della Forwarding Unit intercettano questo valore e lo inoltrano direttamente all'ingresso dell'ALU per l'istruzione `sub` all'inizio del suo stadio EX, eliminando completamente qualsiasi stallo.
.
Che cos'è l'azzardo **Load-Use** (o Load Data Hazard) e quanti cicli di stallo richiede anche in presenza di Data Forwarding?
?
Si verifica quando un'istruzione carica un dato dalla memoria (`lw`) e l'istruzione immediatamente successiva a distanza 1 tenta di usarlo come operando:
.
```assembly
lw  x5, 0(x10)    # il dato è disponibile solo alla fine dello stadio MEM!
add x6, x5, x7    # necessita del dato all'inizio del proprio stadio EX!
```
.
Poiché il dato letto dalla memoria non esiste ancora fisicamente all'inizio dello stadio EX della seconda istruzione, il forwarding da solo non può viaggiare indietro nel tempo.
L'hardware deve tassativamente inserire **1 ciclo di stallo (bolla di Load-Use)**.
.
Qual è la condizione logica verificata dall'**Unità di Rilevamento degli Azzardi (Hazard Detection Unit)** nello stadio ID per identificare un azzardo Load-Use e bloccare la pipeline?
?
L'unità rileva la condizione:
$$\text{ID/EX.MemRead} == 1 \quad \mathbf{AND}$$
$$(\text{ID/EX.RegisterRd} == \text{IF/ID.RegisterRs1} \quad \mathbf{OR} \quad \text{ID/EX.RegisterRd} == \text{IF/ID.RegisterRs2})$$
Se vera:
.
1. Disabilita la scrittura del PC (mantiene il PC inalterato).
2. Disabilita la scrittura del registro IF/ID (mantiene l'istruzione corrente in ID).
3. Inietta zeri nei segnali di controllo di ID/EX (creando una NOP/bolla per lo stadio EX).
.
Nella domanda teorica d'esame (Domanda 5): _"Quali soluzioni possiamo usare per i data hazard oltre al forwarding? Mostrare una soluzione a costo zero in componenti hardware."_ Qual è la risposta richiesta?
?
La soluzione a costo hardware zero è lo **Scheduling del Codice da parte del Compilatore (Software Code Scheduling / Instruction Reordering)**:
Il compilatore riorganizza l'ordine delle istruzioni assembly indipendenti, spostando una o più istruzioni tra la `Load` e l'istruzione consumatrice per colmare la distanza critica senza modificare la semantica del programma.
_Esempio:_
.
```assembly
# Codice non schedulato (1 stallo):
lw  t0, 0(a0)
add t1, t0, t2    # STALLO di 1 ciclo!
lw  t3, 4(a0)
.
# Codice schedulato (0 stalli, costo hardware zero):
lw  t0, 0(a0)
lw  t3, 4(a0)     # Istruzione indipendente interposta: riempie la bolla!
add t1, t0, t2    # Ora t0 è pronto al forwarding con 0 stalli!
```
