# True Syllabus: Computer Architectures (Esame 2026/2027)

> **Scopo del documento:** Questo sillabo operativo è distillato **dall'intersezione tra il programma ufficiale (`syllabus.md`), i compiti d'esame 2026 (`exams/CA_TE_2026_*.md`) e i testi di riferimento (Fummi [T1], Patterson & Hennessy [T2])**.  
> **Criterio di selezione:** Elimina il 100% della teoria non verificata (fisica dei semiconduttori, dimostrazioni algebriche pure, CPU a singolo ciclo, toolchain linker/loader, chiamate file-system e istruzioni a 64 bit) e integra tutte le metodologie operative e le **6 Varianti d'Assicurazione Latenti** per blindare il superamento dell'esame con certezza assoluta ($\ge 18/30$ fino a 30L).

---

## 1. Regolamento d'Esame e Vincoli di Superamento

- **Tipologia di Prova:** Prova unica scritta e al calcolatore.
- **Durata:** 2 ore e 30 minuti.
- **Punteggio Totale:** 32 punti (corrispondenti a 30 e Lode).
- **Punteggio Minimo Totale:** $\ge 18 / 30$.

### Sbarramenti di Sezione Obbligatori (Mandatory Thresholds)
Il mancato raggiungimento della soglia minima anche in una sola sezione comporta la **bocciatura automatica**, indipendentemente dai punti accumulati altrove:

| Sezione | Quesiti | Punteggio Massimo | Soglia Minima di Superamento | Focus Tematico |
| :--- | :---: | :---: | :---: | :--- |
| **I. Reti Logiche** | **Q1 + Q2** | **11 punti** | **$\ge 6 / 11$** | FSM Mealy/Moore su sequenze & Minimizzazione/Sintesi con FF |
| **II. Architetture & Prestazioni** | **Q3 + Q4 + Q5** | **12 punti** | **$\ge 7 / 12$** | Calcolo CPI, Cache/AMAT, Teoria Pipeline/Scrittura/3 C's |
| **III. Assembly RISC-V** | **Q6** | **9 punti** | **$\ge 5 / 9$** | Traduzione C in RISC-V RV32I/M (funzioni iterative o ricorsive) |

---

## 2. Sezione I: Reti Logiche (Quesiti 1 e 2 — 11 Punti, Soglia $\ge 6$)

### Modulo 1.1: Riconoscitori di Sequenze con FSM (Quesito 1 — 5/6 Punti)

#### Schema Principale: Modello di Mealy (7/7 Compiti nel 2026)
- **Modello di Mealy:** Uscite associate alle transizioni ($u^t = \lambda(s^t, i^t)$) per rilevamento a ritardo nullo sull'ultimo simbolo.
- **Alfabeto a 2 Ingressi:** Tracciamento delle 4 combinazioni binarie di ingresso: $xy \in \{00, 01, 10, 11\}$.
- **Sequenze con Ripetizioni Arbitrarie:** Gestione formale di pattern del tipo $\{11, (10, \dots, 10), 11, (01, \dots, 01), 00\}$:
  - Stati di attesa della sequenza minima.
  - Auto-anelli (*self-loops*) per la reiterazione della coppia ripetuta $(XY, \dots, XY)$.
  - Transizioni di avanzamento condizionate all'uscita dal loop.
- **Riconoscimento di Sequenze Parzialmente Sovrapposte (Overlap):**
  - Calcolo del *Longest Prefix-Suffix*: in caso di simbolo non atteso, la transizione deve convergere sullo stato che rappresenta il più lungo prefisso valido compatibile con i simboli ricevuti.
- **Deliverable richiesto:**
  1. Grafo orientato degli stati (Diagramma degli Stati) con coppie $xy / u$ su ogni arco.
  2. Tabella degli stati formalizzata ($4$ colonne per $xy=00, 01, 11, 10$).

#### > Variante d'Assicurazione 1: Riconoscitore di Tipo Moore
- **Quando si attiva:** Se la traccia specifica *"Si realizzi una macchina a stati di tipo Moore..."*.
- **Differenze operative:**
  1. L'uscita dipende **esclusivamente dallo stato** ($u^t = \lambda(s^t)$) ed è indicata **dentro il nodo** di stato ($S_k / 1$), non sugli archi.
  2. Richiede **1 stato aggiuntivo** rispetto a Mealy (lo "stato di riconoscimento" in cui l'uscita si porta a $1$).
  3. L'uscita viene emessa con **1 ciclo di clock di ritardo** rispetto al modello di Mealy.

---

### Modulo 1.2: Minimizzazione e Sintesi Sequenziale (Quesito 2 — 5/6 Punti)
- **Minimizzazione degli Stati (Tabella delle Implicazioni):**
  - Costruzione della matrice triangolare inferiore per macchine a 6 stati ($A, B, C, D, E, F$).
  - Filtraggio per incompatibilità delle uscite (marcatura immediata con $\mathbf{X}$).
  - Inserimento delle coppie di stati prossimi implicati.
  - Algoritmo iterativo di cancellazione a catena fino al raggiungimento del punto fisso.
  - Partizione delle classi di equivalenza e redazione della tabella degli stati minima equivalente.
- **Scelta e Pilotaggio degli Elementi di Memoria (Bistabili):**
  - Dimensionamento dei registri di stato: $k = \lceil \log_2 |S_{\text{min}}| \rceil$ Flip-Flop.
  - Costruzione della tabella delle transizioni con codifica binaria degli stati.
  - Costruzione della tabella delle eccitazioni per i Flip-Flop assegnati:
    - **Flip-Flop JK:** $0 \to 0 \implies (0, -)$, $0 \to 1 \implies (1, -)$, $1 \to 0 \implies (-, 1)$, $1 \to 1 \implies (-, 0)$.
    - **Flip-Flop SR:** $0 \to 0 \implies (0, -)$, $0 \to 1 \implies (1, 0)$, $1 \to 0 \implies (0, 1)$, $1 \to 1 \implies (-, 0)$.

#### > Variante d'Assicurazione 2: Sintesi con Flip-Flop T o Flip-Flop D
- **Quando si attiva:** Se la traccia richiede bistabili T (richiesto in appelli passati) o D:
  - **Flip-Flop T:** $T = Q \oplus Q^*$ ($1$ se commuta, $0$ se mantiene lo stato).
  - **Flip-Flop D:** $D = Q^*$ (l'ingresso coincide direttamente con lo stato prossimo).
- **Minimizzazione Booleana tramite Mappe di Karnaugh:**
  - Sintesi delle equazioni minime SOP per ciascun ingresso dei bistabili ($J_i, K_i$, $S_i, R_i$, $T_i$ o $D_i$).
  - Sintesi dell'equazione minima per l'uscita $u$.
  - **Gestione degli Stati Non Utilizzati (Don't Care):** Trattamento delle configurazioni inutilizzate (es. stati non assegnati con 3 FF per 5 stati) come condizioni di indifferenza (`-` o `X`) sulle mappe.

---

## 3. Sezione II: Architetture e Prestazioni (Quesiti 3, 4, 5 — 12 Punti, Soglia $\ge 7$)

### Modulo 2.1: Valutazione Quantitativa del CPI (Quesito 3 — 3 Punti)

#### Variante A: Processore Pipelined con Conflitti (Hazards)
- **Formula del CPI:** $\text{CPI}_{\text{pipe}} = 1 + \sum (f_{\text{hazard}} \times \text{Penalità})$.
- **Hazard Strutturali:** Memoria unificata $\implies +1$ ciclo di stallo per ogni istruzione di memoria (Load/Store).
- **Hazard Dati (RAW) con e senza Forwarding:**
  - *Senza Forwarding:* Dipendenza a distanza 1 $\implies 2$ stalli; a distanza 2 $\implies 1$ stallo.
  - *Con Forwarding:* Dipendenza ALU $\to$ ALU a distanza 1 o 2 $\implies 0$ stalli; dipendenza Load $\to$ ALU a distanza 1 (*Load-Use*) $\implies \mathbf{1\text{ ciclo di stallo}}$.
- **Hazard di Controllo (Branch Penalty con Predict Untaken):**
  - Salto Untaken $\implies 0$ cicli di stallo.
  - Salto Taken:
    - Risoluzione nello stadio **Decode (ID):** $\mathbf{1\text{ ciclo di stallo}}$.
    - Risoluzione nello stadio **Execute (EX):** $\mathbf{2\text{ cicli di stallo}}$.
    - Risoluzione nello stadio **Memory (MEM):** $\mathbf{3\text{ cicli di stallo}}$.
- **Interazione Dati-Branch:** Dipendenza ALU $\to$ Branch con risoluzione in ID $\implies \mathbf{1\text{ ciclo di stallo}}$ aggiuntivo anche in presenza di Forwarding.

#### Variante B: Gerarchia di Memoria Cache
- **Formula del CPI:** $\text{CPI} = \text{CPI}_{\text{exe}} + \text{Overhead Stalli Memoria}$.
- **Cache Separate (Harvard):**
  $$\text{CPI} = \text{CPI}_{\text{exe}} + (1 \times M_I \times P_I) + (f_{\text{load}} \times M_D \times P_D) + (f_{\text{store}} \times M_D \times P_D)$$
- **Con Conteggio Assoluto dei Miss:**
  $$\text{Stallo}_{\text{dati}} = \frac{\text{Miss Dati Totali}}{IC} \times \text{Penalità Dati}$$

#### > Variante d'Assicurazione 3: Esercizio Numerico sulla Legge di Amdahl
- **Quando si attiva:** Se Q3 propone un calcolo di speedup su coprocessori o istruzioni specializzate (asteriscato nel Syllabus 2.1).
- **Formula Canonica:**
  $$\text{Speedup}_{\text{totale}} = \frac{1}{(1 - F) + \dfrac{F}{S}}$$
  dove $F$ è la frazione di tempo originaria della parte migliorata ed $S$ è lo speedup locale.
- **Risoluzione inversa:** Calcolo del miglioramento locale $S$ o della frazione $F$ necessari per ottenere un target prefissato di accelerazione globale.

---

### Modulo 2.2: Architettura e Prestazioni della Cache (Quesito 4 — 3/4 Punti)
- **Block Placement Modulo:**
  - *Direct-Mapped ($NB$ blocchi):* $\text{Index} = j \pmod{NB}$.
  - *$N$-Way Set-Associative ($NS = NB / N$ set):* $\text{Set Index} = j \pmod{NS}$.
- **Partizione dell'Indirizzo CPU a 32 Bit:**
  - $\text{Offset } (m\text{ bit}) = \log_2(\text{Dimensione Blocco in Byte})$.
  - $\text{Index } (n\text{ bit}) = \log_2(\text{Numero di Set } NS)$.
  - $\text{Tag } (t\text{ bit}) = 32 - (n + m)$.
- **AMAT a Singolo Livello e Graduatorie:**
  - $\text{AMAT} = \text{Hit Time} + (\text{Miss Rate} \times \text{Miss Penalty})$.
  - Risoluzione disequazioni: $\text{AMAT}_B \le \text{AMAT}_A$ per trovare Hit Time o Miss Rate soglia.

#### > Variante d'Assicurazione 4: AMAT per Cache a Due Livelli (L1 + L2)
- **Quando si attiva:** Se la tabella di Q4 include sia la cache di primo livello (L1) sia quella di secondo livello (L2).
- **Formula Annidata:**
  $$\text{AMAT} = t_{h, L1} + (M_{L1} \times \text{Penalità}_{L1})$$
  dove la penalità di L1 corrisponde all'AMAT di L2:
  $$\text{Penalità}_{L1} = t_{h, L2} + (M_{L2} \times \text{Penalità}_{L2})$$

---

### Modulo 2.3: Teoria Architetturale (Quesito 5 — 5/6 Punti)
Risposte aperte sui seguenti temi ciclici:
1. **Data Forwarding:** Percorsi hardware, condizioni booleane della Forwarding Unit, Load-Use stall.
2. **Control Hazard & Predict Untaken:** Predizione statica, Pipeline Flush, NOP nei registri interstadio.
3. **Software Scheduling:** Soluzione a costo hardware zero tramite riordinamento del codice da parte del compilatore (con codice assembly prima/dopo).
4. **Politiche di Scrittura della Cache:**
   - *Write-Through vs. Write-Back:* Coerenza memoria, traffico bus, Dirty Bit, penalità di sostituzione.
   - *Write Buffer:* Scopo, principio operativo, saturazione della coda e cause degli stalli.
   - *Politiche di Write-Miss:* Write-Allocate (con Write-Back) vs. No-Write-Allocate/Write-Around (con Write-Through).

#### > Variante d'Assicurazione 5: Le "3 C" dei Miss di Cache (Patterson & Hennessy)
- **Quando si attiva:** Se Q5 richiede la classificazione universale dei miss di memoria cache e le relative tecniche di mitigazione:
  1. **Compulsory (Cold) Misses:** Primo accesso assoluto al blocco. *Soluzione:* Aumentare la dimensione del blocco (sfrutta la località spaziale).
  2. **Capacity Misses:** La cache è dimensionalmente incapace di contenere l'insieme di lavoro (*working set*). *Soluzione:* Incrementare la capacità complessiva della cache.
  3. **Conflict (Collision) Misses:** Più blocchi della memoria competono per lo stesso set. *Soluzione:* Incrementare il grado di associatività ($N$-way).

---

## 4. Sezione III: Programmazione Assembly RISC-V (Quesito 6 — 9 Punti, Soglia $\ge 5$)

### Modulo 3.1: Registri RV32I / RV32M e Istruzioni Fondamentali
- **Registri Standard e Ruolo ABI:**
  - `zero` ($x_0$): Costante zero.
  - `ra` ($x_1$): Return address (Caller-saved).
  - `sp` ($x_2$): Stack pointer decrescente (Callee-saved).
  - `a0 - a7` ($x_{10} - x_{17}$): Argomenti e valori di ritorno (`a0, a1`).
  - `s0 - s11` ($x_8-x_9, x_{18}-x_{27}$): Registri preservati per variabili locali (Callee-saved).
  - `t0 - t6` ($x_5-x_7, x_{28}-x_{31}$): Registri temporanei (Caller-saved).
- **Istruzioni Obbligatorie:**
  - `add`, `addi`, `sub`, `and`, `or`, `xor`, `slli`, `srli`.
  - Estensione M: `mul` (prodotto), `div` (divisione intera), `rem` (resto per estrazione cifre decimali `% 10`).
  - `slt`, `slti`.
  - `lb`, `lbu` (caratteri stringa), `lw` (interi), `sb`, `sw`.
  - `beq`, `bne`, `blt`, `bge`, `jal`, `jalr`, `ret`, `call`.

---

### Modulo 3.2: Pattern di Traduzione dal C all'Assembly
- **Inversione delle Condizioni:** `if (a < b)` $\implies$ `bge a, b, else_label`.
- **Cicli:** `for`, `while`, e `do-while` per validazione input utente.
- **Scansione Vettoriale e Conversioni ASCII:**
  - Puntatori a stringa: `add t0, base, i` seguito da `lb t1, 0(t0)`.
  - Conversione carattere a intero: `str[i] - 48`.
  - Offset alfabetico maiuscolo/minuscolo: `let[i] - 65` / `le[i] - 97`.
- **Implementazione Routine `strlen`:** Scansione fino a byte `0x00`.

---

### Modulo 3.3: Gestione Stack Frame e Procedure

#### Procedura Non-Foglia Canonica (`main`):
```assembly
main:
    addi sp, sp, -32        # Alloca stack frame (allineamento a 16 byte)
    sw   ra, 28(sp)         # Obbligatorio salvare ra prima di invocare altre funzioni!
    sw   s0, 24(sp)         # Salva registri callee-saved usati
    sw   s1, 20(sp)
    # ... corpo del programma ...
    lw   s1, 20(sp)
    lw   s0, 24(sp)
    lw   ra, 28(sp)         # Ripristina ra
    addi sp, sp, 32         # Rilascia frame
    li   a7, 10             # Exit
    ecall
```

#### > Variante d'Assicurazione 6: Skeleton per Funzioni Ricorsive
- **Quando si attiva:** Se la funzione secondaria da tradurre è ricorsiva (es. `int calc(int n) { if (n<=1) return 1; return n * calc(n-1); }`).
- **Codice Canonico Protetto:**
  ```assembly
  funzione_ricorsiva:
      addi sp, sp, -16          # Alloca stack frame
      sw   ra, 12(sp)           # Salva indirizzo di ritorno (diventa non-foglia!)
      sw   a0, 8(sp)            # Preserva l'argomento corrente
      
      # Caso base (es. n <= 1)
      li   t0, 1
      bgt  a0, t0, passo_ricorsivo
      li   a0, 1                # Ritorna 1 nel caso base
      j    epilogo_ricorsivo

  passo_ricorsivo:
      addi a0, a0, -1           # Prepara argomento per passo successivo: n - 1
      call funzione_ricorsiva   # Chiamata ricorsiva: risultato restituito in a0
      lw   t1, 8(sp)            # Recupera il vecchio parametro n salvato sullo stack
      mul  a0, a0, t1           # a0 = n * risultato_ricorsione

  epilogo_ricorsivo:
      lw   ra, 12(sp)           # Ripristina ra originario
      addi sp, sp, 16           # Dealloca stack frame
      ret                       # Ritorna al chiamante
  ```

---

### Modulo 3.4: Chiamate di Sistema (`ecall`) Console
- **`PrintInt` (Servizio 1):** `li a7, 1`, intero in `a0`, `ecall`.
- **`PrintString` (Servizio 4):** `li a7, 4`, indirizzo stringa in `a0`, `ecall`.
- **`ReadInt` (Servizio 5):** `li a7, 5`, `ecall`, valore in `a0` (equivale a `scanf("%d", &var)`).
- **`ReadString` (Servizio 8):** `li a7, 8`, indirizzo buffer in `a0`, dimensione in `a1`, `ecall` (`scanf("%s", buf)`).
- **`Exit` (Servizio 10):** `li a7, 10`, `ecall`.

---

## 5. Elenco Ufficiale del Materiale Escluso (Zero-Yield Topics)

I seguenti argomenti presenti nelle slide o nei capitoli introduttivi dei testi **non devono essere studiati** per la prova d'esame:

1. **Fisica dei Semiconduttori & Circuiti CMOS:** Reti di pull-up/pull-down con transistor NMOS e PMOS, modelli di ritardo a ventaglio, tempo di salita/discesa.
2. **Teoremi Booleani Formali:** Teorema di espansione di Shannon (POS/SOP per induzione matematica), Teorema del Consenso con dimostrazioni algebriche pure.
3. **Curve di Ottimizzazione Area-Ritardo:** Frontiere di Pareto, modellazione del ritardo multi-livello ad albero $(K-1)\Delta$.
4. **Metastabilità Interna dei Bistabili:** Circuiti analogici interni di latch master-slave e oscillazioni metastabili.
5. **Datapath e Unità di Controllo a Singolo Ciclo:** Schemi di processori non pipelined, micro-istruzioni e segnali di controllo a ciclo singolo.
6. **Toolchain di Compilazione:** Meccanismi interni di Linker, Loader, file oggetto ELF e risoluzione dei simboli esterni.
7. **Istruzioni RISC-V a 64 Bit (RV64):** `ld`, `sd`, `lwu`, `addw`, `subw`.
8. **Chiamate di Sistema di Basso Livello al File System:** `open` (servizio 1024), `read` (63), `write` (64), `close` (57) e flag UNIX (`O_RDONLY`, `O_CREAT`).
9. **Architettura Circuitale delle RAM:** Struttura a 6 transistor delle SRAM e meccanismo di refresh con condensatore delle DRAM.
