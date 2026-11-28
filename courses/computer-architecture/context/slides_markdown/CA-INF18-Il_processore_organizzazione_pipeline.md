# Organizzazione della Pipeline della CPU

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Calcolatore — Sovrapposizione Temporale, Datapath a 5 Stadi, Registri Interstadio e Segnali di Controllo

---

## 1. Il Concetto di Pipelining

La **pipeline** è una tecnica di organizzazione microarchitetturale basata sulla **sovrapposizione temporale** dell'esecuzione di istruzioni multiple, analoga a una catena di montaggio industriale.

### Principi Fondamentali
1. L'esecuzione di ogni istruzione viene suddivisa in una sequenza temporale di stadi indipendenti (*pipeline stages*).
2. Ciascuno stadio impegna una specifica risorsa hardware dedicata.
3. Al completamento di ogni stadio, la risorsa viene rilasciata e resa disponibile per l'istruzione successiva nel flusso del programma.
4. **Effetto prestazionale:**
   - La pipeline **non riduce la latenza** (tempo di esecuzione) della singola istruzione; in presenza di piccoli overhead dei registri interstadio, la latenza della singola istruzione può persino aumentare leggermente.
   - La pipeline **massimizza il throughput** (frequenza di completamento), consentendo idealmente di completare un'istruzione a ogni ciclo di clock.

---

## 2. Confronto Quantitativo: Processore Sequenziale vs. Pipelined

Consideriamo una CPU classica con le seguenti latenze fisiche dei componenti per i 5 stadi funzionali:

| Tipo Istruzione | IF (Fetch Istr.) | ID (Decode/Reg) | EX (Esecuzione ALU) | MEM (Accesso Dati) | WB (Write Back) | Latenza Totale |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Tipo R (add, sub)** | $200\text{ ps}$ | $100\text{ ps}$ | $200\text{ ps}$ | $0\text{ ps}$ | $100\text{ ps}$ | $600\text{ ps}$ |
| **Load (lw)** | $200\text{ ps}$ | $100\text{ ps}$ | $200\text{ ps}$ | $200\text{ ps}$ | $100\text{ ps}$ | $800\text{ ps}$ |
| **Store (sw)** | $200\text{ ps}$ | $100\text{ ps}$ | $200\text{ ps}$ | $200\text{ ps}$ | $0\text{ ps}$ | $700\text{ ps}$ |
| **Branch (beq)**| $200\text{ ps}$ | $100\text{ ps}$ | $200\text{ ps}$ | $0\text{ ps}$ | $0\text{ ps}$ | $500\text{ ps}$ |

---

### 2.1 Esecuzione Sequenziale a Singolo Ciclo
In un processore a singolo ciclo non pipelined, la durata del periodo di clock $T_{\text{seq}}$ deve essere dimensionata sul **caso peggiore** (istruzione `lw`):
$$T_{\text{seq}} = 800\text{ ps}$$

Per eseguire 3 istruzioni di load consecutive (`lw x1, 100(x4)`, `lw x2, 200(x4)`, `lw x3, 300(x4)`):
$$T_{\text{esec}} = 3 \times 800\text{ ps} = 2400\text{ ps}$$

---

### 2.2 Esecuzione con Pipeline
Il periodo di clock $T_{\text{pipe}}$ è vincolato dalla latenza dello **stadio più lento**:
$$T_{\text{pipe}} = \max(t_{\text{IF}}, t_{\text{ID}}, t_{\text{EX}}, t_{\text{MEM}}, t_{\text{WB}}) = \max(200, 100, 200, 200, 100) = 200\text{ ps}$$

Per 3 istruzioni `lw`:
- La prima istruzione impiega 5 cicli per riempire la pipeline ($5 \times 200 = 1000\text{ ps}$).
- Ciascuna delle restanti 2 istruzioni completa nei 2 cicli successivi ($2 \times 200 = 400\text{ ps}$).
$$T_{\text{pipe}} = (5 + 2) \times 200\text{ ps} = 7 \times 200\text{ ps} = 1400\text{ ps}$$

$$\text{Speedup} = \frac{2400\text{ ps}}{1400\text{ ps}} \approx 1.71$$

---

### 2.3 Caso Limite su Sequenze Lunghe ($1\,000\,003$ Istruzioni)
- **Sequenziale:**
  $$T_{\text{seq}} = 1\,000\,003 \times 800\text{ ps} \approx 800\,002\,400\text{ ps}$$
- **Pipelined:**
  $$T_{\text{pipe}} = (5 + 1\,000\,002) \times 200\text{ ps} = 1\,000\,007 \times 200\text{ ps} \approx 200\,001\,400\text{ ps}$$

$$\text{Speedup} = \frac{800\,002\,400}{200\,001\,400} \approx \frac{800\text{ ps}}{200\text{ ps}} = 4.0$$

---

### 2.4 Caso Ideale: Pipeline Perfettamente Bilanciata
Se tutti gli stadi avessero esattamente la stessa durata ($800\text{ ps} / 5 = 160\text{ ps}$ ciascuno):
$$T_{\text{pipe}} = 160\text{ ps}$$
$$\text{Speedup}_{\text{ideale}} = \frac{800\text{ ps}}{160\text{ ps}} = 5.0 = N_{\text{stadi}}$$

> **Teorema del Pipelining Ideale:** Il potenziale incremento prestazionale massimo teorico corrisponde esattamente al **numero di stadi della pipeline** ($N$):
> $$\text{Speedup}_{\max} = N$$
> In condizioni reali, lo speedup effettivo è sempre inferiore a $N$ a causa di:
> 1. Sbilanciamento delle durate tra stadi diversi.
> 2. Ritardo introdotto dai registri interstadio (setup time e clock-to-Q).
> 3. Bolle di stallo generate dai conflitti (hazard strutturali, dati e controllo).

---

## 3. Microarchitettura del Datapath a 5 Stadi

I 5 stadi canonici (RISC-V / MIPS) sono:
1. **IF (Instruction Fetch):** Prelievo dell'istruzione dalla memoria indirizzata dal Program Counter ($PC$) e calcolo di $PC + 4$.
2. **ID (Instruction Decode & Register Read):** Decodifica dell'istruzione, generazione del campo immediato esteso in segno e lettura contemporanea dei registri sorgente $Rs1$ e $Rs2$ dal Register File.
3. **EX (Execute / Address Calculation):** Esecuzione dell'operazione aritmetico-logica nell'ALU oppure calcolo dell'indirizzo effettivo per i trasferimenti in memoria (`Base + Offset`), o calcolo del target di salto.
4. **MEM (Memory Access):** Lettura o scrittura nella memoria dati per le istruzioni di load (`lw`) o store (`sw`).
5. **WB (Write Back):** Scrittura del risultato calcolato dall'ALU o del dato caricato dalla memoria nel registro di destinazione $Rd$ all'interno del Register File.

---

## 4. Ruolo Critico dei Registri Interstadio

Per consentire a 5 istruzioni distinte di coesistere nel processore nello stesso ciclo di clock senza sovrascrivere i reciproci dati intermedi, è indispensabile interporre tra ogni stadio un banco di registri di sincronizzazione:

```text
[ IF ] ---> | IF/ID | ---> [ ID ] ---> | ID/EX | ---> [ EX ] ---> | EX/MEM | ---> [ MEM ] ---> | MEM/WB | ---> [ WB ]
```

### Contenuto dei Registri di Pipeline per Stadio

#### 1. Registro IF/ID
- `IF/ID.IR`: Instruction Register (parola da 32 bit prelevata dalla memoria istruzioni).
- `IF/ID.NPC`: Program Counter incrementato ($PC + 4$), necessario per il calcolo dei salti relativi al PC.

#### 2. Registro ID/EX
- `ID/EX.A`: Valore letto dal registro sorgente $Rs1$ (campo `IR[19:15]`).
- `ID/EX.B`: Valore letto dal registro sorgente $Rs2$ (campo `IR[24:20]`).
- `ID/EX.Imm`: Valore costante a 32 bit con segno estratto e generato dall'Immediate Generator.
- `ID/EX.NPC`: Copia propagata di $PC + 4$.
- `ID/EX.RD`: Indirizzo del registro di destinazione $Rd$ (`IR[11:7]`). Deve essere fatto scorrere lungo tutta la pipeline per raggiungere lo stadio WB nel ciclo esatto in cui il dato è pronto per la scrittura!

#### 3. Registro EX/MEM
- `EX/MEM.ALUOut`: Risultato del calcolo dell'ALU (indirizzo di memoria o risultato matematico).
- `EX/MEM.B`: Valore del secondo operando sorgente, da scrivere in memoria nel caso di istruzioni di Store (`sw`).
- `EX/MEM.Target`: Indirizzo di salto calcolato ($\text{NPC} + (\text{Imm} \ll 1)$).
- `EX/MEM.cond`: Flag booleano di condizione (es. `Zero` dell'ALU per `beq`).
- `EX/MEM.RD`: Indirizzo del registro destinazione propagato dallo stadio ID/EX.

#### 4. Registro MEM/WB
- `MEM/WB.ALUOut`: Risultato ALU propagato per istruzioni di tipo R e tipo I.
- `MEM/WB.MemOut`: Parola dati letta dalla memoria nello stadio MEM per istruzioni di Load.
- `MEM/WB.RD`: Indirizzo del registro destinazione finale nel Register File.

---

## 5. Propagazione dei Segnali dell'Unità di Controllo

L'Unità di Controllo principale decodifica l'istruzione nello **stadio ID** e produce un vettore di segnali di controllo. Poiché tali segnali devono agire negli stadi successivi (EX, MEM, WB), essi vengono **immagazzinati nei registri di pipeline e fatti scorrere di stadio in stadio** in sincronia con l'istruzione di pertinenza.

```text
Stadio ID (Control Unit)
   |
   +---> Segnali EX  (ALUSrc, ALUOp) -------------> Usati in EX
   |
   +---> Segnali MEM (Branch, MemRead, MemWrite) ---> Inoltrati in ID/EX ---> Usati in MEM
   |
   +---> Segnali WB  (MemtoReg, RegWrite) ---------> Inoltrati in ID/EX ---> Inoltrati in EX/MEM ---> Usati in WB
```

### Tabella Completa dei Segnali di Controllo della Pipeline

| Stadio | Segnale | Tipo R (`add`, `sub`) | Load (`lw`) | Store (`sw`) | Branch (`beq`) | Descrizione Funzionale |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **EX** | `ALUSrc` | **0** | **1** | **1** | **0** | Seleziona il secondo operando ALU: 0 = Registro $Rs2$, 1 = Valore Immediato. |
| **EX** | `ALUOp` | **10** (funct) | **00** (add) | **00** (add) | **01** (sub) | Codice operativo a 2 bit inviato all'ALU Control. |
| **MEM**| `Branch` | **0** | **0** | **0** | **1** | Abilita la selezione del PC di salto se la condizione `Zero` è soddisfatta. |
| **MEM**| `MemRead`| **0** | **1** | **0** | **0** | Abilita la lettura dalla memoria dati. |
| **MEM**| `MemWrite`| **0** | **0** | **1** | **0** | Abilita la scrittura nella memoria dati. |
| **WB** | `MemtoReg`| **0** | **1** | **$-$** | **$-$** | Seleziona il dato da scrivere in $Rd$: 0 = ALUOut, 1 = MemOut. |
| **WB** | `RegWrite`| **1** | **1** | **0** | **0** | Abilita la scrittura nel Register File sul fronte del clock. |
