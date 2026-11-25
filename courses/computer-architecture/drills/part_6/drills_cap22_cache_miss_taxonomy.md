#drills/computer_architectures/06_04_cache_miss_taxonomy
.
Quali sono le **3 C** della tassonomia dei fallimenti di cache introdotta da Patterson & Hennessy (Domanda teorica d'esame 5)?
?
Le tre categorie esclusive di miss sono:
.
1. **Compulsory Miss (Miss Obbligatori o Cold/Freddi):** Miss che si verificano al **primissimo accesso assoluto** a un blocco di memoria mai referenziato prima.
2. **Capacity Miss (Miss di Capacità):** Miss che si verificano quando il working set del programma supera la **capacità totale** della cache, costringendo l'espulsione di blocchi precedentemente caricati.
3. **Conflict Miss (Miss di Conflitto o Collisione):** Miss che si verificano nelle cache Direct-Mapped o Set-Associative quando più blocchi attivi competono per lo **stesso identico set**, anche se la cache nel suo complesso ha ancora spazio libero.
.
Come si riconosce sperimentalmente un **Conflict Miss** rispetto a un Capacity Miss?
?
Si simula il comportamento su una cache **Fully-Associative (completamente associativa)** avente la stessa identica capacità totale e stessa dimensione del blocco:
.
- Se il miss si verifica **anche nella cache Fully-Associative**, è un **Capacity Miss** (lo spazio totale era insufficiente).
- Se il miss scompare nella cache Fully-Associative, è un **Conflict Miss** (il blocco è stato espulso solo a causa della limitata associatività del set).
.
Qual è la tecnica architetturale primaria per ridurre ciascuna delle 3 categorie di miss?
?
.
1. **Per ridurre i Compulsory Miss:** Aumentare la **dimensione del blocco** (sfruttando la località spaziale: con un singolo miss si caricano più parole consecutive) oppure impiegare tecniche di **Hardware Prefetching** (anticipando i dati).
2. **Per ridurre i Capacity Miss:** Aumentare la **capacità complessiva della cache** (ad es. passando da 8 KB a 32 KB o aggiungendo livelli gerarchici L2/L3).
3. **Per ridurre i Conflict Miss:** Aumentare il **grado di associatività $N$** (es. passando da Direct-Mapped a 2-way o 4-way set-associative) oppure introdurre una **Victim Cache**.
.
In cosa consiste la celebre **Regola Empirica 2:1 (2:1 Cache Rule of Thumb)** enunciata da Mark Hill?
?
Una memoria cache a mappatura diretta (Direct-Mapped) di capacità totale **$C$** presenta all'incirca lo **stesso tasso di fallimento (Miss Rate)** di una cache Set-Associative a 2 vie di capacità dimezzata **$C/2$**:
$$\text{Miss Rate}(\text{Direct-Mapped}, \, C) \approx \text{Miss Rate}(2\text{-way}, \, C/2)$$
Questo evidenzia come l'associatività a 2 vie riduca i miss di conflitto in misura comparabile al raddoppio fisico dello spazio di memoria.
.
Qual è il potenziale svantaggio prestazionale legato all'aumento indiscriminato dell'associatività (es. passando da Direct-Mapped a 8-way set-associative)?
?
L'aumento dell'associatività richiede:
.
1. Multiplexer più grandi per selezionare la via corretta.
2. Comparatori di Tag multipli in parallelo.
   Questo incrementa la complessità logica e il ritardo di propagazione combinatorio, provocando un **aumento dell'Hit Time** (tempo di accesso alla cache nel caso di colpo), che può rallentare il ciclo di clock dell'intera CPU.
