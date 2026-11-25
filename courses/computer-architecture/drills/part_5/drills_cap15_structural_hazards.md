#drills/computer_architectures/05_02_structural_hazards
.
Che cos'è un **Azzardo Strutturale (Structural Hazard)** in una pipeline?
?
È un conflitto hardware che si manifesta quando due o più istruzioni presenti contemporaneamente in stadi diversi della pipeline tentano di accedere alla **stessa risorsa fisica nello stesso identico ciclo di clock**.
.
Negli esercizi d'esame sulla valutazione del CPI (Domanda 3), cosa comporta l'assunzione di:
_"la presenza di una sola memoria unificata per dati e istruzioni"_?
?
Si verifica un azzardo strutturale di memoria:
.
- Nello stadio **IF** la pipeline deve prelevare una nuova istruzione.
- Nello stadio **MEM** un'istruzione `Load` o `Store` deve accedere alla memoria per leggere o scrivere dati.
  Avendo una sola porta di memoria, non possono avvenire simultaneamente: la pipeline deve inserire **1 ciclo di stallo (bolla)** per **ogni istruzione di memoria (`Load` e `Store`)**.
.
In una pipeline con memoria unificata e il seguente instruction mix:
Load $20\%$, Store $10\%$, ALU $50\%$, Branch $20\%$.
Qual è il contributo dello stallo strutturale al CPI medio?
?
Tutte le istruzioni che accedono alla memoria nello stadio MEM (Load + Store) subiscono $1$ stallo:
$$\text{Frequenza istruzioni memoria} = f_{\text{Load}} + f_{\text{Store}} = 20\% + 10\% = 30\% = 0.30$$
$$\text{Stall}_{\text{strutturale}} = (f_{\text{Load}} + f_{\text{Store}}) \times 1\text{ ciclo} = 0.30 \times 1 = 0.30\text{ cicli/istruzione}$$
.
In quale modo l'architettura **Harvard** (o l'adozione di memorie cache L1 separate per Istruzioni e Dati, nota come architettura di Harvard modificata) risolve l'azzardo strutturale di memoria?
?
Fornisce due percorsi fisicamente separati e indipendenti verso la memoria:
.
- Una cache dedicata alle istruzioni (**I-Cache**) per lo stadio IF.
- Una cache dedicata ai dati (**D-Cache**) per lo stadio MEM.
  Poiché IF e MEM accedono a banchi di memoria distinti con porte indipendenti, possono operare in parallelo nello stesso ciclo con **zero cicli di stallo strutturali**.
.
Come viene risolto a costo zero l'azzardo strutturale sul **Register File**, in cui un'istruzione nello stadio WB tenta di scrivere un registro mentre un'altra istruzione nello stadio ID tenta di leggerne uno nello stesso ciclo?
?
Mediante la tecnica del **campionamento a mezza fase (Split-Phase Register Access)**:
.
1. Nella **prima metà** del ciclo di clock (fase ALTA) avviene la **scrittura** del registro per l'istruzione nello stadio WB.
2. Nella **seconda metà** del ciclo di clock (fase BASSA) avviene la **lettura** dei registri per l'istruzione nello stadio ID.
   In questo modo, se un'istruzione in ID legge lo stesso registro appena scritto da WB, ottiene immediatamente il valore aggiornato senza alcun ciclo di stallo.
