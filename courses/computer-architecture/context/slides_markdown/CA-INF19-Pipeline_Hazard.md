# Conflitti nella Pipeline: Structural ed Hazard Dati (Forwarding e Stalli)

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Calcolatore — Hazard Strutturali, Data Hazard, Forwarding Hardware, Hazard Detection Unit e Software Scheduling

---

## 1. Tassonomia dei Limiti alla Pipeline (Gli Hazard)

I conflitti (**Hazard**) sono situazioni microarchitetturali che impediscono alla successiva istruzione nel flusso del programma di essere eseguita nel ciclo di clock designato. Si dividono in tre categorie:

1. **Hazard Strutturali (*Structural Hazards*):** Conflitti causati dalla contesa simultanea di una stessa risorsa hardware da parte di più stadi della pipeline.
2. **Hazard sui Dati (*Data Hazards*):** Una o più istruzioni dipendono dal risultato di un'istruzione precedente che è ancora in volo all'interno della pipeline e non ha ancora completato la fase di scrittura.
3. **Hazard di Controllo (*Control / Branch Hazards*):** Il flusso di prelievo delle istruzioni (IF) dipende dall'esito di un'istruzione di salto condizionato (`beq`, `bne`) o incondizionato (`jal`, `jalr`) calcolato solo negli stadi successivi (EX o MEM).

---

## 2. Impatto degli Hazard sulle Prestazioni

In presenza di hazard, il processore è costretto a inserire **cicli di stallo** (detti anche **bolle** o *bubbles*), durante i quali uno o più stadi rimangono inattivi emettendo segnali equivalenti a un'istruzione nulla (`NOP` — *No Operation*).

### Formula Estesa del CPI Pipelined con Hazard
$$\text{CPI}_{\text{pipe}} = \text{CPI}_{\text{ideale}} + \text{Numero medio di cicli di stallo per istruzione}$$

$$\text{CPI}_{\text{pipe}} = 1 + \sum (\text{Frequenza}_{\text{Hazard}} \times \text{Penalità}_{\text{Hazard}})$$

$$\text{CPI}_{\text{pipe}} = 1 + (f_{\text{struct}} \times P_{\text{struct}}) + (f_{\text{data}} \times P_{\text{data}}) + (f_{\text{ctrl}} \times P_{\text{ctrl}})$$

### Speedup con Hazard (Stadi Bilanciati)
$$\text{Speedup} = \frac{T_{\text{CPU, seq}}}{T_{\text{CPU, pipe}}} = \frac{\text{CPI}_{\text{seq}} \times T_{CK}}{\text{CPI}_{\text{pipe}} \times T_{CK}} = \frac{N_{\text{stadi}}}{1 + \text{Cicli di Stallo per Istruzione}}$$

---

## 3. Hazard Strutturali

### Caso Tipico: Memoria Unificata (Von Neumann pura)
Se la CPU dispone di una singola memoria unificata per istruzioni e dati con una sola porta di accesso:
- Nello stesso ciclo di clock $CC_4$:
  - L'istruzione $I$ (es. `lw`) richiede l'accesso in lettura/scrittura alla memoria nello stadio **MEM**.
  - L'istruzione $I+3$ richiede contemporaneamente la lettura dell'istruzione dalla memoria nello stadio **IF**.
- Si genera un conflitto strutturale sulla porta di memoria.

### Risoluzioni Architetturali
1. **Introduzione di 1 ciclo di stallo (Bolla / NOP):**
   - L'Unità di Controllo sospende lo stadio IF per 1 ciclo, impedendo l'aggiornamento del $PC$ e del registro $IF/ID$, inserendo una NOP nello stadio $ID/EX$.
   - Penalità: $+1$ ciclo per ogni istruzione di memoria che collide con il fetch.
2. **Architettura Harvard Separata (Soluzione Standard Moderna):**
   - Suddivisione della cache di primo livello (L1) in **I-Cache** (Instruction Cache dedicata allo stadio IF) e **D-Cache** (Data Cache dedicata allo stadio MEM). Entrambe le memorie operano in parallelo senza alcuna contesa.
3. **Register File a Doppia Porta:**
   - La scrittura nello stadio WB avviene nel **primo semiperiodo** del ciclo di clock (fronte di salita o livello alto).
   - La lettura nello stadio ID avviene nel **secondo semiperiodo** del ciclo di clock (fronte di discesa o livello basso).
   - In questo modo un dato scritto da un'istruzione in WB può essere letto nello stesso ciclo da un'altra istruzione in ID senza conflitti.

---

## 4. Hazard sui Dati (Data Hazards)

Si verificano in presenza di dipendenze Read-After-Write (RAW):

```assembly
add  x1, x2, x3     # Scrive il risultato in x1 nello stadio WB (Ciclo 5)
sub  x4, x1, x5     # Legge x1 nello stadio ID (Ciclo 2) -> Legge valore obsoleto!
```

### 4.1 Risoluzione Tramite Soli Stalli (Senza Forwarding)
Se il processore non possiede circuiti di inoltro dati:
- Il valore aggiornato di $x1$ è disponibile nel Register File solo a metà del ciclo 5 (durante WB).
- L'istruzione dipendente deve attendere nello stadio ID fino a quando il dato non è scritto:
  - Tra istruzioni consecutive a distanza 1: sono necessari **2 cicli di stallo**.
  - Tra istruzioni a distanza 2: è necessario **1 ciclo di stallo**.
  - Tra istruzioni a distanza 3 o superiore: **0 cicli di stallo** (la lettura in ID avviene nel ciclo 5 contemporaneamente o dopo WB).

---

## 5. Risoluzione Hardware: Il Forwarding (Bypassing)

Il principio del **Forwarding (Inoltro / Bypassing)** stabilisce che:
> *Non è necessario attendere che il registro di destinazione venga fisicamente scritto nel Register File per far avanzare l'istruzione successiva: il dato viene prelevato direttamente dalle uscite degli stadi intermedi non appena è stato prodotto.*

### 5.1 Percorsi di Inoltro Principali
1. **Inoltro EX/MEM $\to$ EX (Distanza 1):**
   - Il risultato dell'ALU dell'istruzione precedente è presente nel registro interstadio $EX/MEM.ALUOut$.
   - Viene inoltrato direttamente come operando all'ingresso dell'ALU nel ciclo corrente.
2. **Inoltro MEM/WB $\to$ EX (Distanza 2):**
   - Il risultato dell'istruzione antecedente è presente nel registro interstadio $MEM/WB$.
   - Viene inoltrato all'ingresso dell'ALU selezionando tra $ALUOut$ e $MemOut$ tramite multiplatore.
3. **Inoltro MEM/WB $\to$ MEM (Store Data Forwarding):**
   - Quando una `sw` memorizza un registro calcolato dall'istruzione precedente (`add x8, x3, x2` seguita da `sw x8, 0(x4)`), il dato per la memoria viene inoltrato direttamente a $dataw$ senza stalli.

### 5.2 Equazioni Booleane della Forwarding Unit
La Forwarding Unit confronta gli indirizzi di registro nei registri interstadio:

#### Inoltro verso l'operando A dell'ALU (`ForwardA` a 2 bit):
- **Da EX/MEM (Priorità massima):**
  ```text
  se (EX/MEM.RegWrite == 1 e EX/MEM.Rd != 0 e EX/MEM.Rd == ID/EX.Rs1)
      ForwardA = 10 (seleziona EX/MEM.ALUOut)
  ```
- **Da MEM/WB:**
  ```text
  se (MEM/WB.RegWrite == 1 e MEM/WB.Rd != 0 e MEM/WB.Rd == ID/EX.Rs1
      e non (EX/MEM.RegWrite == 1 e EX/MEM.Rd != 0 e EX/MEM.Rd == ID/EX.Rs1))
      ForwardA = 01 (seleziona dato da MEM/WB)
  ```
- **Nessun inoltro:**
  ```text
  altrimenti ForwardA = 00 (seleziona dato standard dal Register File ID/EX.A)
  ```

*(Condizioni analoghe si applicano a `ForwardB` confrontando con `ID/EX.Rs2`).*

---

## 6. Il Limite del Forwarding: Load-Use Hazard

Il forwarding non può violare la causalità temporale ("non si può viaggiare indietro nel tempo"):
- In un'istruzione di Load (`lw x2, 20(x1)`), il dato proveniente dalla memoria dati è disponibile solo alla fine dello stadio **MEM** (fine del Ciclo 4).
- Se l'istruzione immediatamente successiva (`and x4, x2, x5`) necessita di quel dato nello stadio **EX** (inizio del Ciclo 4), il dato non esiste ancora!
- **Regola:** Il **Load-Use Data Hazard richiede obbligatoriamente 1 ciclo di stallo hardware (bolla)**, seguito da inoltro dallo stadio MEM allo stadio EX.

### Condizione di Rilevamento della Hazard Detection Unit (HDU)
La HDU opera nello stadio ID e introduce uno stallo se:
$$\text{ID/EX.MemRead} == 1 \quad \land \quad (\text{ID/EX.Rd} == \text{IF/ID.Rs1} \lor \text{ID/EX.Rd} == \text{IF/ID.Rs2})$$

#### Azioni intraprese durante lo stallo da Load-Use:
1. **Blocco del Program Counter ($PC$):** Viene disabilitata la scrittura del PC ($PC.Write = 0$).
2. **Blocco del registro IF/ID:** Viene disabilitata la scrittura ($IF/ID.Write = 0$) per preservare l'istruzione decodificata.
3. **Inserimento Bolla:** I segnali di controllo nel registro $ID/EX$ vengono forzati a $0$ ($RegWrite = 0, MemWrite = 0$), trasformando l'operazione in una NOP per gli stadi a valle.

---

## 7. Ottimizzazione del Compilatore: Software Scheduling

Il compilatore ottimizzante riordina le istruzioni indipendenti per colmare lo slot di stallo del Load-Use senza alterare la semantica del programma.

### Esempio di Traduzione del Codice:
$$\text{Codice C:} \quad a = b + c; \quad d = e - f;$$
Tutte le variabili risiedono in memoria (accesso con `ld` e `sd` RV64).

#### Versione Non Ottimizzata (Codice Lento con Forwarding):
```assembly
ld   xb, b(x0)
ld   xc, c(x0)
# --- STALLO 1 (Load-Use su xc) ---
add  xa, xb, xc
sd   xa, a(x0)
ld   xe, e(x0)
ld   xf, f(x0)
# --- STALLO 2 (Load-Use su xf) ---
sub  xd, xe, xf
sd   xd, d(x0)
```
- **Totale stalli con forwarding:** $2$ cicli di stallo.
- **Totale stalli senza forwarding:** $8$ cicli di stallo (2 stalli dopo ogni load e 2 dopo ogni operazione aritmetica).

#### Versione Ottimizzata tramite Software Scheduling (Codice Veloce):
Il compilatore anticipa il caricamento di `xe` ed `xf` negli slot morti:
```assembly
ld   xb, b(x0)
ld   xc, c(x0)
ld   xe, e(x0)       # Istruzione indipendente: assorbe lo stallo di xc!
add  xa, xb, xc       # xc è ora pronto senza alcuno stallo
ld   xf, f(x0)       # Istruzione indipendente: assorbe lo stallo di xe!
sd   xa, a(x0)
sub  xd, xe, xf       # xf è ora pronto senza alcuno stallo
sd   xd, d(x0)
```
- **Totale stalli con forwarding:** **0 cicli di stallo** ($\text{Speedup} = 10 / 8 = 1.25$).
- **Totale stalli senza forwarding:** ridotti a soli 3 cicli.

### Dati Statistici di Efficacia del Compilatore
Misura della percentuale di istruzioni di load che generano stalli nella pipeline:

| Benchmark / Applicazione | Senza Scheduling del Compilatore | Con Software Scheduling | Riduzione Stalli |
| :--- | :---: | :---: | :---: |
| **gcc** | 54% | **31%** | $-42.6\%$ |
| **spice** | 42% | **14%** | $-66.7\%$ |
| **tex** | 65% | **25%** | $-61.5\%$ |
