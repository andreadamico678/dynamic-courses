# La Gerarchia di Memoria: Principio di Località, Cache Direct-Mapped e Associative

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Calcolatore — Gap Prestazionale CPU-DRAM, Località Spaziale e Temporale, AMAT e le 5 Domande di Progetto della Cache

---

## 1. Il Gap Prestazionale tra CPU e DRAM (Memory Wall)

Dagli anni '80 fino ai giorni nostri, la velocità e la frequenza di clock delle CPU sono cresciute storicamente a tassi molto superiori rispetto alla velocità di accesso delle memorie DRAM:
- Le memorie **SRAM (Static RAM)** sono estremamente rapide (latenza di $1$ o pochi cicli di clock), ma costose, a basso livello di integrazione e ad alto consumo energetico (6 transistor per cella).
- Le memorie **DRAM (Dynamic RAM)** offrono altissima densità e basso costo (1 transistor + 1 condensatore per cella con necessità di refresh periodico), ma presentano tempi di accesso dell'ordine di decine di nanosecondi (centinaia di cicli di CPU).

### L'Illusione Ottica della Gerarchia
L'obiettivo architetturale della gerarchia di memoria è:
> *Fornire al programmatore l'illusione di disporre di una memoria grande quanto il livello più economico e capiente (DRAM / Disco / SSD), ma veloce quanto il livello più rapido e vicino alla CPU (Registri / Cache L1 SRAM).*

---

## 2. Principi Fondamentali di Località dei Programmi

L'efficacia dell'intera gerarchia di memoria si fonda su due proprietà empiriche intrinseche all'esecuzione del codice software:

```c
// Esempio dimostrativo:
int i = 0, somma = 0;
while (i < 3) {
    if (A[i] > 0)
        somma += A[i];
    i = i + 1;
}
S = somma;
```

1. **Località Temporale (*Temporal Locality*):**
   - Se una locazione di memoria (istruzione o dato) viene referenziata in un dato istante $t$, è molto probabile che venga referenziata nuovamente nel futuro immediato.
   - *Esempio nel codice:* Le variabili scalari `i` e `somma`, così come il corpo ciclico del `while`, vengono richiamati ripetutamente a ogni iterazione del loop.
2. **Località Spaziale (*Spatial Locality*):**
   - Se una locazione di memoria viene referenziata, è molto probabile che a breve vengano referenziate locazioni contigue o strettamente adiacenti.
   - *Esempio nel codice:* Il caricamento delle istruzioni sequenziali contigue (`i = i + 1`, salto, confronto) e la scansione sequenziale degli elementi del vettore `A[0], A[1], A[2]`.

---

## 3. Struttura a Livelli della Gerarchia

I dati fluiscono esclusivamente tra livelli adiacenti:
$$\text{CPU (L}_0\text{ Registri)} \iff \text{L}_1 \text{ Cache (SRAM)} \iff \text{L}_2 \text{ Cache} \iff \text{L}_3 \text{ Cache} \iff \text{Main Memory (DRAM)} \iff \text{Storage (SSD/Disco)}$$

- **Blocco (o Linea di Cache):** L'unità minima atomica di trasferimento dati tra due livelli adiacenti (tipicamente da 16 a 64 byte).

### Tempo Medio di Accesso alla Memoria (AMAT)
$$\text{AMAT} = \text{Hit Time} + (\text{Miss Rate} \times \text{Miss Penalty})$$
dove:
- **Hit Time ($t_{\text{hit}}$):** Tempo impiegato per determinare se il dato è presente nella cache più il tempo di trasferimento del dato al processore.
- **Miss Rate ($M$):** Percentuale di accessi non soddisfatti al livello corrente ($M = 1 - \text{Hit Rate}$).
- **Miss Penalty ($P$):** Tempo necessario per accedere al livello inferiore, trasferire l'intero blocco nella cache e inoltrare la parola richiesta alla CPU.

---

## 4. Le 5 Domande Cardine per il Progettista della Gerarchia

1. **Q1: Dove piazzare un blocco nella cache? (*Block Placement*)**
2. **Q2: Come determinare se un blocco cercato è presente? (*Block Identification*)**
3. **Q3: Quale blocco sostituire in caso di miss? (*Block Replacement*)**
4. **Q4: Qual è la politica di gestione della scrittura? (*Write Strategy*)**
5. **Q5: Cosa avviene in caso di scrittura con dato non presente in cache? (*Write Miss Strategy*)**

---

## 5. Q1: Politiche di Piazzamento del Blocco (*Block Placement*)

Data una cache composta da $NB$ blocchi totali e una memoria principale suddivisa in blocchi di indice $j$:

### 5.1 Direct Mapped (Mappatura Diretta)
Ogni blocco della memoria principale può essere collocato in **una sola ed esclusiva linea di cache**, determinata dalla funzione hash modulo:
$$\text{Index} = j \pmod{NB}$$
- *Proprietà:* È semplice ed economica da realizzare; il tempo di ricerca è minimo (nessun multiplatore o comparatore in parallelo), ma soffre di frequenti conflitti (*conflict misses*) se blocchi diversi mappano sullo stesso indice.

### 5.2 Fully Associative (Completamente Associativa)
Un blocco della memoria principale può essere piazzato in **una qualsiasi riga libera della cache**:
- *Proprietà:* Flessibilità massima, azzera i conflict misses, ma richiede un comparatore di tag per ogni singola linea della cache (costosa in hardware e praticabile solo per strutture piccole come i TLB).

### 5.3 $N$-Way Set Associative (Associativa a Insiemi a $N$ Vie)
La cache è suddivisa in $NS$ insiemi (*Sets*), ciascuno composto da $N$ blocchi (*Ways*):
$$NS = \frac{NB}{N}$$
Il blocco di memoria $j$ mappa in modo vincolato in un set specifico:
$$\text{Set Index} = j \pmod{NS}$$
All'interno di quel set, il blocco può essere alloggiato in una qualsiasi delle $N$ vie.

---

## 6. Q2: Identificazione del Blocco e Partizione dell'Indirizzo di Memoria

Dato un indirizzo virtuale/fisico a 32 bit emesso dal processore:

```text
Indirizzo CPU a 32 bit:
+------------------------------+--------------------+---------------------+
|          TAG (t bit)         |    INDEX (n bit)   |    OFFSET (m bit)   |
+------------------------------+--------------------+---------------------+
```

1. **Offset ($m$ bit):** Seleziona il singolo byte all'interno del blocco. Per un blocco di dimensione $B = 2^m$ byte:
   $$m = \log_2(B)$$
2. **Index ($n$ bit):** Seleziona l'insieme/linea della cache. Con $NS = 2^n$ set:
   $$n = \log_2(NS)$$
3. **Tag ($t$ bit):** Campo di confronto per verificare l'identità del blocco:
   $$t = 32 - (n + m)$$
4. **Valid Bit ($V$):** Bit di stato associato a ogni linea (pari a 0 all'avvio/reset del calcolatore; posto a 1 quando la linea accoglie un blocco valido).

> **Condizione di Cache Hit:**
> $$\text{Hit} \iff (V == 1) \land (\text{Tag memorizzato nella riga/set} == \text{Tag emesso dalla CPU})$$

### Esempio di Partizionamento con Parametri Variabili
Cache totale da $NB = 1024$ blocchi con blocchi da $B = 16\text{ byte}$ ($m = \log_2 16 = 4\text{ bit}$ di Offset):

| Grado di Associatività ($N$) | Numero di Insiemi ($NS = NB / N$) | Bit Offset ($m$) | Bit Index ($n = \log_2 NS$) | Bit Tag ($32 - n - m$) |
| :---: | :---: | :---: | :---: | :---: |
| **1-way (Direct Mapped)** | $1024$ | 4 bit | **10 bit** | **18 bit** |
| **2-way** | $512$ | 4 bit | **9 bit** | **19 bit** |
| **4-way** | $256$ | 4 bit | **8 bit** | **20 bit** |
| **8-way** | $128$ | 4 bit | **7 bit** | **21 bit** |
| **512-way** | $2$ | 4 bit | **1 bit** | **27 bit** |
| **1024-way (Full Associative)** | $1$ | 4 bit | **0 bit** | **28 bit** |

---

## 7. Q3: Politiche di Rimpiazzo del Blocco (*Block Replacement*)

Quando un set è completamente saturo e si verifica un miss, occorre selezionare quale blocco scartare:
1. **LRU (*Least Recently Used*):** Rimpiazza il blocco che non viene referenziato da più tempo (sfrutta al massimo la località temporale). Richiede bit di tracciamento dello storico per ogni via.
2. **Random:** Sceglie casualmente il blocco da sostituire. Semplice da realizzare in hardware, molto vicina alle prestazioni di LRU all'aumentare dell'associatività.

### Confronto Empirico dei Miss Rate (Dimensione vs. Politica)

| Dimensione Cache | 2-way LRU | 2-way Random | 4-way LRU | 4-way Random | 8-way LRU | 8-way Random |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **16 KB** | 5.18% | 5.69% | 4.67% | 5.29% | 4.39% | 4.96% |
| **64 KB** | 1.88% | 2.01% | 1.54% | 1.66% | 1.39% | 1.53% |
| **256 KB**| 1.15% | 1.17% | 1.13% | 1.13% | 1.12% | 1.12% |

---

## 8. Q4 & Q5: Politiche di Scrittura (*Write Strategy*)

### Politiche di Gestione in Caso di Hit in Scrittura
1. **Write-Through:**
   - Il dato viene aggiornato **contemporaneamente sia nella cache sia nella memoria principale**.
   - *Vantaggi:* La memoria principale è costantemente coerente con la cache; il rimpiazzo di un blocco non richiede scritture di salvataggio.
   - *Svantaggi:* Ogni scrittura avviene alla bassa velocità della memoria principale. Per evitare che la CPU si blocchi su scritture ravvicinate, si adotta un **Write Buffer FIFO** (solitamente di 4 blocchi) che disaccoppia la CPU dalla memoria lenta.
2. **Write-Back:**
   - Il dato viene scritto **esclusivamente nella cache**. La memoria principale viene aggiornata solo nel momento in cui il blocco modificato deve essere rimpiazzato ed espulso.
   - *Meccanismo:* A ogni riga di cache è associato un **Dirty Bit** ($D$):
     - $D = 0$: Blocco "pulito" (identico alla memoria).
     - $D = 1$: Blocco modificato ("sporco"). All'atto dello sfratto, il controller scrive il blocco in memoria solo se $D = 1$.
   - *Vantaggi:* Risparmio drastico di banda sul bus di memoria (molteplici scritture su uno stesso dato non generano traffico verso la memoria).

### Politiche di Gestione in Caso di Miss in Scrittura
1. **Write Allocate:**
   - Il blocco mancante viene prelevato dalla memoria principale, caricato nella linea di cache e successivamente modificato.
2. **Write Not Allocate (No-Write Allocate):**
   - Il blocco non viene caricato in cache: la scrittura aggiorna direttamente la sola memoria principale.

### Coppie Canoniche Standard dell'Industria:
- **Write-Back + Write Allocate** (massimizza l'efficienza degli accessi successivi al blocco).
- **Write-Through + Write Not Allocate** (evita l'inutile caricamento di blocchi in cache che potrebbero non essere riutilizzati).
