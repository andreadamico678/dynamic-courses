# Conflitti di Controllo nella Pipeline: Branch Hazards, Stalli e Valutazione Precoce

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Calcolatore — Branch Hazards, Penalità di Salto, Flush della Pipeline, Anticipo in ID e Interazione Data-Control Hazard

---

## 1. Natura del Control Hazard (Branch Hazard)

Per mantenere la pipeline satura al massimo throughput ($1 \text{ istruzione/ciclo}$), lo stadio **IF (Instruction Fetch)** deve prelevare una nuova istruzione a ogni ciclo di clock.
- Per le istruzioni sequenziali ordinarie, l'indirizzo della successiva istruzione è noto immediatamente durante IF ($PC + 4$).
- Per un'istruzione di salto condizionato (`beq`, `bne`, `blt`, `bge`), il calcolo della condizione di salto e dell'indirizzo di destinazione (*Branch Target Address*) richiede tempo:
  - Nel datapath elementare a 5 stadi non ottimizzato, l'esito del salto è noto e il $PC$ viene aggiornato solo nello **stadio MEM** (fine ciclo 4).
  - Tra il fetch del branch e la risoluzione effettiva in MEM, la pipeline ha già iniziato a prelevare istruzioni successive potenzialmente errate.

### Terminologia Fondamentale
- **Branch Taken (Salto Preso):** La condizione è verificata; il flusso di esecuzione devia verso l'indirizzo target ($PC \leftarrow PC_{\text{target}}$).
- **Branch Untaken / Not Taken (Salto Non Preso):** La condizione non è verificata; il flusso prosegue in modo sequenziale ($PC \leftarrow PC + 4$).

---

## 2. Risoluzione con Stalli Puri (Verifica in MEM)

Se il processore non effettua alcuna predizione e attende che l'esito del salto sia consolidato alla fine dello stadio MEM:
- Il nuovo $PC$ corretto viene scritto alla fine dello stadio MEM.
- Durante gli stadi ID, EX e MEM del branch, il processore deve inserire **3 cicli di stallo (bolle / idle)**.

```text
Ciclo:             CC1    CC2     CC3     CC4     CC5    CC6    CC7    CC8
Branch (beq):      IF     ID      EX      MEM     WB
Istr. successiva:         stallo  stallo  stallo  IF     ID     EX     MEM
```

### Penalità di Salto e Calcolo degli Stalli
$$\text{Branch Penalty} = 3 \text{ cicli di clock}$$
$$\text{Stalli Medi per Istruzione dovuti ai Salti} = \text{Frequenza Branch} \times \text{Branch Penalty}$$

*Esempio:* Con $20\%$ di istruzioni di branch ($f_{\text{branch}} = 0.20$):
$$\text{Stalli Medi} = 0.20 \times 3 = 0.6 \text{ cicli/istruzione} \implies \text{CPI} = 1 + 0.6 = 1.6$$

---

## 3. Strategia Predittiva Statica: Branch Not Taken con Pipeline Flush

Per ridurre la penalità, si assume a livello architetturale che il salto **non sia preso (*Predict Not Taken*)**:
1. Il processore prosegue prelevando normalmente le istruzioni sequenziali $PC+4, PC+8, PC+12$.
2. **Se il branch è effettivamente NOT TAKEN:**
   - La previsione è corretta; tutte le istruzioni prelevate sono valide.
   - **Costo: 0 cicli di stallo!**
3. **Se il branch è TAKEN:**
   - La previsione è errata; le 3 istruzioni già entrate nella pipeline (in IF, ID, EX) appartengono al percorso errato.
   - Devono essere annullate tramite **Pipeline Flush** (azzeramento dei segnali di controllo nei registri $IF/ID$, $ID/EX$, $EX/MEM$), trasformandole in NOP.
   - Il $PC$ viene caricato con il Branch Target Address.
   - **Penalità:** 3 cicli di stallo.

### Penalità Media con Predizione Not Taken (Verifica in MEM)
$$\text{Branch Penalty} = 3 \times \text{Frequenza Branch Taken}$$
Se il $50\%$ dei salti è preso ($f_{\text{taken}} = 0.50$):
$$\text{Branch Penalty Medio} = 3 \times 0.50 = 1.5 \text{ cicli}$$
*(Dimezza esattamente la penalità rispetto alla soluzione con stalli incondizionati).*

---

## 4. Anticipo della Verifica del Branch nello Stadio ID (Early Branch Resolution)

Per abbattere drasticamente la penalità a monte, l'hardware viene arricchito con risorse dedicate nello **stadio ID**:
1. **Sommatore dedicato per il Target:** Un addizionatore a 32 bit autonomo nello stadio ID che calcola $PC_{\text{target}} = \text{IF/ID.NPC} + (\text{Imm} \ll 1)$ senza impegnare l'ALU principale.
2. **Comparatore rapido di registri:** Un banco di porte XOR/NOR a 32 bit che confronta direttamente le uscite del Register File nello stadio ID (verifica di uguaglianza per `beq` / disuguaglianza per `bne`).

```text
Stadio ID:
  IR[19:15] ----> [ Reg File ] ---> DatoA ----+---> [ Comparatore Rapido (XOR) ] ---> Zero? ---> PCSrc
  IR[24:20] ----> [ Reg File ] ---> DatoB ----+
  IF/ID.NPC ----------------------------------+---> [ Sommatore Branch ID ] -------> Target Address
  Imm ----------------------------------------+
```

### Impatto Prestazionale dell'Anticipo in ID
- L'esito del salto è noto alla **fine dello stadio ID (Ciclo 2)**.
- Il nuovo $PC$ viene aggiornato all'inizio del Ciclo 3.
- È presente una sola istruzione in volo nello stadio IF.

#### Tabella Temporale (Predict Not Taken con Verifica in ID)
- **Branch Not Taken:**
  ```text
  Branch:            IF    ID    EX    MEM    WB
  Istruzione i+1:          IF    ID    EX     MEM    WB  (Nessuna penalità: 0 stalli)
  ```
- **Branch Taken:**
  ```text
  Branch:            IF    ID    EX    MEM    WB
  Istruzione i+1:          IF    (FLUSH / NOP)
  Target Address:                IF    ID     EX     MEM    WB  (1 solo ciclo di stallo)
  ```

$$\text{Branch Penalty} = 1 \text{ ciclo di stallo se Taken, } 0 \text{ stalli se Not Taken}$$
$$\text{Con frequenza Taken del 50\%} \implies \text{Branch Penalty Medio} = 1 \times 0.50 = 0.5 \text{ cicli}$$

---

## 5. Interazione Critica tra Data Hazard e Branch Anticipato in ID

Quando la decisione di salto viene anticipata allo stadio ID, si introduce una nuova criticità: **il branch ha bisogno dei dati dei registri già nello stadio ID**.

### 5.1 Dipendenza con Verifica in EX/MEM
Se la verifica del branch avvenisse in EX, una dipendenza da un'istruzione ALU precedente (`addi x1, x1, 4` seguita da `beq x1, x6, L1`) verrebbe risolta a costo zero tramite il **Forwarding standard** da $EX/MEM$ verso l'ingresso dell'ALU.

### 5.2 Dipendenza con Anticipo in ID
Poiché il comparatore del branch richiede i dati durante ID (Ciclo 2 dell'istruzione di branch):
- Se l'istruzione precedente è un'operazione ALU (`addi x1, x1, 4`), il dato $x1$ viene prodotto dall'ALU solo al termine del suo stadio EX (fine Ciclo 3 dell'ALU).
- Non è possibile effettuare il forwarding verso l'ID in tempo, perché il dato non esiste ancora!
- **Regola:** **È necessario inserire 1 ciclo di stallo per Data Hazard**, prima di poter inoltrare il dato dall'uscita dell'ALU ($EX/MEM$) al comparatore rapido in ID.

### 5.3 Conteggio Complessivo degli Stalli (ALU seguita da Branch)

| Strategia di Controllo | Branch Untaken | Branch Taken |
| :--- | :---: | :---: |
| **Soli stalli (senza predizione, branch in ID)** | $1 \text{ stallo dati} + 1 \text{ stallo branch} = \mathbf{2 \text{ stalli}}$ | $1 \text{ stallo dati} + 1 \text{ stallo branch} = \mathbf{2 \text{ stalli}}$ |
| **Predict Not Taken (branch in ID)** | $1 \text{ stallo dati} + 0 \text{ stalli controllo} = \mathbf{1 \text{ stallo}}$ | $1 \text{ stallo dati} + 1 \text{ flush controllo} = \mathbf{2 \text{ stalli}}$ |

```text
Esempio temporale (Predict Not Taken, Branch Taken con dipendenza su x1):
CC1:  addi x1, x1, 4   [IF]
CC2:  beq  x1, x6, L1        [IF]    (HDU rileva dipendenza da addi in EX)
CC3:  beq  x1, x6, L1        [stallo dati]  (addi in EX, genera risultato x1)
CC4:  beq  x1, x6, L1        [ID]    (Forwarding da EX/MEM a ID; esito: TAKEN -> FLUSH)
CC5:  Target (and x12...)    [IF]    (Inizia il fetch dell'istruzione bersaglio)
Totale ritardo: 2 cicli di bolla (1 stallo dati + 1 flush di controllo).
```
