# Architettura del Set di Istruzioni: RISC-V (RV32I / RV64I)

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Linguaggio del Calcolatore — Repertorio RISC-V, Registri, Formati di Istruzione e Salti

---

## 1. Caratteristiche Fondamentali dell'ISA RISC-V

L'architettura **RISC-V** (sviluppata all'Università di Berkeley a partire dal 2010 come standard aperto e modulare) rispetta rigorosamente i principi di progettazione RISC:
- **Architettura Load/Store:** La memoria è accessibile esclusivamente tramite apposite istruzioni di trasferimento (`load` e `store`). Nessuna istruzione aritmetico-logica opera direttamente sugli operandi in memoria; tutti i calcoli avvengono all'interno del banco dei registri.
- **Operazioni a 3 operandi:** Formato fisso `Opcode Destinazione, Sorgente1, Sorgente2` (es. `add rd, rs1, rs2`), preservando i registri sorgente.
- **Istruzioni a lunghezza fissa:** Tutte le istruzioni base occupano rigorosamente 32 bit (4 byte), semplificando la logica di Fetch e Decodifica nella pipeline.
- **Indirizzamento della memoria:** A livello di singolo byte, con convenzione **Little-Endian** (il byte meno significativo risiede all'indirizzo di memoria più basso).
- **Banco Registri General-Purpose:** 32 registri interi ($x_0 - x_{31}$) a 32 bit in RV32 e a 64 bit in RV64, più 32 registri dedicati al floating-point ($f_0 - f_{31}$).

---

## 2. Banco dei Registri: Nomenclatura, Alias ABI e Vincoli

| Numero Registro | Nome ABI (Alias) | Ruolo Architetturale e Convenzioni di Chiamata | Preservato nelle Chiamate? |
| :---: | :---: | :--- | :---: |
| **`x0`** | **`zero`** | Costante cablata a zero ($0$). Ogni scrittura in $x_0$ viene scartata. | Invariante hardware |
| **`x1`** | **`ra`** | Return Address (indirizzo di ritorno per le procedure salvato da `jal`/`jalr`). | No (Caller-saved) |
| **`x2`** | **`sp`** | Stack Pointer (puntatore alla cima dello stack, decrescente). | **Sì** (Callee-saved) |
| **`x3`** | **`gp`** | Global Pointer (puntatore all'area delle variabili statiche/globali). | Costante di runtime |
| **`x4`** | **`tp`** | Thread Pointer (puntatore ai dati del thread locale). | Costante di runtime |
| **`x5 - x7`** | **`t0 - t2`** | Registri temporanei per calcoli intermedi non preservati. | No (Caller-saved) |
| **`x8 - x9`** | **`s0 - s1`** | Registri salvati (*saved registers*) / $s_0$ usato come Frame Pointer (`fp`). | **Sì** (Callee-saved) |
| **`x10 - x11`**| **`a0 - a1`** | Primi due argomenti di funzione e registri per il valore di ritorno. | No (Caller-saved) |
| **`x12 - x17`**| **`a2 - a7`** | Ulteriori argomenti passati alle procedure (fino a 8 totali). | No (Caller-saved) |
| **`x18 - x27`**| **`s2 - s11`**| Ulteriori registri salvati della funzione chiamante. | **Sì** (Callee-saved) |
| **`x28 - x31`**| **`t3 - t6`** | Registri temporanei aggiuntivi. | No (Caller-saved) |

---

## 3. Mappa della Memoria di un Processo RISC-V

Lo spazio di indirizzamento virtuale è partizionato nelle seguenti aree logiche:

```text
Indirizzi Alti (0x0000 003F FFFF FFF0)
  +-----------------------------------+
  |          Reserved Kernel          |  Livello Kernel (OS & Device Drivers)
  +-----------------------------------+
  |         Memory-Mapped I/O         |  Registri periferiche e controller
  +-----------------------------------+
  |            Kernel Data            |  Dati del sistema operativo
  +-----------------------------------+
  |            Kernel Text            |  Codice sorgente del kernel
  +===================================+
  |         STACK SEGMENT             |  Cresce verso il basso (allocazione frame locali)
  |               |                   |  Puntato da $sp (x2)
  |               v                   |
  |                                   |
  |               ^                   |
  |               |                   |
  |      DYNAMIC DATA (HEAP)          |  Cresce verso l'alto (allocazione dinamica: malloc)
  +-----------------------------------+
  |         STATIC / DATA             |  Variabili globali e statiche (.data / .bss)
  |                                   |  Inizio: 0x0000 0000 1000 0000, puntato da $gp
  +-----------------------------------+
  |          TEXT SEGMENT             |  Codice macchina del programma (.text)
  |                                   |  Inizio convenzionale: 0x0000 0000 0040 0000
  +-----------------------------------+
  |          Reserved / Null          |  Area protetta anti-null pointer dereference
Indirizzi Bassi (0x0000 0000 0000 0000)
```

---

## 4. Struttura dei File Sorgente Assembly e Direttive

Un programma assembly RISC-V è composto da **sezioni di dati**, **sezioni di testo/istruzioni**, **etichette (*labels*)** e **commenti** (introdotti da `#`).

### Tabella delle Direttive per l'Assembler

| Direttiva | Descrizione Funzionale | Esempio d'Uso |
| :--- | :--- | :--- |
| **`.data`** | Alloca i dati successivi nel segmento dati statici. | `.data` |
| **`.text`** | Alloca il codice macchina successivo nel segmento testo. | `.text` |
| **`.byte`** | Alloca una lista di interi a 8 bit (1 byte ciascuno). | `val: .byte 12, -4, 0x1F` |
| **`.half`** | Alloca interi a 16 bit (2 byte, mezza word). | `val: .half 1024, -2` |
| **`.word`** | Alloca interi a 32 bit (4 byte, word standard). | `val: .word 524, 0xAABBCCDD` |
| **`.dword`**| Alloca interi a 64 bit (8 byte, double word). | `val: .dword 32586` |
| **`.asciz`**| Alloca una stringa ASCII terminata automaticamente da byte nullo `\0`. | `msg: .asciz "Errore\n"` |
| **`.space`**| Riserva un blocco contiguo di $n$ byte non inizializzati. | `buffer: .space 256` |
| **`.eqv`**  | Definisce una costante simbolica sostituita testualmente. | `.eqv MAX_SIZE 100` |
| **`.include`**| Include testualmente il contenuto di un altro file sorgente. | `.include "macro.s"` |

### Regola dell'Allineamento Naturale della Memoria
Ogni accesso alla memoria deve iniziare ad un indirizzo che sia un **multiplo esatto della dimensione del tipo di dato**:
- Dati a 1 byte (`.byte` / `lb` / `sb`): Possono risiedere a qualsiasi indirizzo.
- Dati a 2 byte (`.half` / `lh` / `sh`): Indirizzo multiplo di 2 (bit 0 = 0).
- Dati a 4 byte (`.word` / `lw` / `sw`): Indirizzo multiplo di 4 (bit 1:0 = 00).
- Dati a 8 byte (`.dword` / `ld` / `sd`): Indirizzo multiplo di 8 (bit 2:0 = 000).

---

## 5. I Formati di Istruzione RISC-V a 32 Bit

Tutte le istruzioni sono classificate in 6 formati strutturati per mantenere i registri sorgente e destinazione nelle medesime posizioni di bit, ottimizzando la decodifica:

```text
Bit:    31        25 24    20 19    15 14  12 11     7 6      0
R-Type: [  funct7   ][  rs2  ][  rs1  ][funct3][  rd   ][ opcode ]
I-Type: [      immediate[11:0]        ][  rs1  ][funct3][  rd   ][ opcode ]
S-Type: [imm[11:5]  ][  rs2  ][  rs1  ][funct3][imm[4:0]][ opcode ]
B-Type: [imm[12|10:5]][  rs2 ][  rs1  ][funct3][imm[4:1|11]][ opcode ]
U-Type: [              immediate[31:12]                ][  rd   ][ opcode ]
J-Type: [        immediate[20|10:1|11|19:12]           ][  rd   ][ opcode ]
```

---

## 6. Il Repertorio Completo delle Istruzioni RISC-V

### 6.1 Istruzioni di Trasferimento Memoria (Load & Store)
Formato di indirizzamento base: `offset(Rbase)` dove l'indirizzo effettivo è $\text{Address} = \text{Reg}[Rbase] + \text{offset}$.

| Istruzione | Sintassi | Operazione Semantica | Estensione del Segno? |
| :--- | :--- | :--- | :--- |
| **`lb`** | `lb rd, imm(rs1)` | Carica 1 byte da memoria in `rd`. | Estende il bit 7 a 32/64 bit. |
| **`lbu`** | `lbu rd, imm(rs1)` | Carica 1 byte senza segno in `rd`. | Riempie i bit superiori con zeri. |
| **`lh`** | `lh rd, imm(rs1)` | Carica 2 byte (halfword) in `rd`. | Estende il bit 15 a 32/64 bit. |
| **`lhu`** | `lhu rd, imm(rs1)` | Carica 2 byte senza segno in `rd`. | Riempie i bit superiori con zeri. |
| **`lw`** | `lw rd, imm(rs1)` | Carica 4 byte (word) in `rd`. | In RV64 estende il bit 31 a 64 bit. |
| **`lwu`** | `lwu rd, imm(rs1)` | Carica 4 byte unsigned in `rd` (RV64). | Riempie con zeri. |
| **`ld`** | `ld rd, imm(rs1)` | Carica 8 byte (doubleword) in `rd` (RV64). | Non applicabile (64 bit pieni). |
| **`sb`** | `sb rs2, imm(rs1)` | Scrive il byte meno significativo di `rs2` in memoria. | — |
| **`sh`** | `sh rs2, imm(rs1)` | Scrive i 2 byte meno significativi di `rs2` in memoria. | — |
| **`sw`** | `sw rs2, imm(rs1)` | Scrive la word (4 byte) di `rs2` in memoria. | — |
| **`sd`** | `sd rs2, imm(rs1)` | Scrive la doubleword (8 byte) di `rs2` in memoria (RV64).| — |

---

### 6.2 Istruzioni Aritmetiche e Logiche (ALU)

#### Somme e Sottrazioni
- `add rd, rs1, rs2`: `rd = rs1 + rs2`
- `addi rd, rs1, imm`: `rd = rs1 + imm` (immediato a 12 bit con segno, da $-2048$ a $+2047$).
- `sub rd, rs1, rs2`: `rd = rs1 - rs2`
- *(Nota architetturale: non esiste `subi` perché si utilizza direttamente `addi` con immediato negativo, es. `addi x8, x8, -10`).*
- `mul rd, rs1, rs2`: moltiplicazione intera (estrae i 32 o 64 bit meno significativi).
- `mulh / mulhu / mulhsu`: estrae la metà alta del prodotto a 64/128 bit (rispettivamente signed $\times$ signed, unsigned $\times$ unsigned, signed $\times$ unsigned).
- `div / divu`: divisione con segno o senza segno (`rd = rs1 / rs2`).
- `rem / remu`: resto della divisione intera (`rd = rs1 % rs2`).

#### Operazioni Logiche Bit a Bit
- `and / andi`: AND bit a bit (usato per mascheramento, es. `andi rd, rs1, 1` isola il bit LSB per verificare parità).
- `or / ori`: OR bit a bit (usato per forzare bit a 1).
- `xor / xori`: XOR bit a bit (usato per invertire bit selezionati).

#### Operazioni di Confronto (Set Less Than)
- `slt rd, rs1, rs2`: `rd = 1` se `rs1 < rs2` (con segno), altrimenti `0`.
- `sltu rd, rs1, rs2`: confronto senza segno (*unsigned*).
- `slti / sltiu`: confronto con valore immediato a 12 bit.

#### Operazioni di Shift
- **Shift a sinistra logico (`sll / slli`):** Inserisce zeri a destra (equivale a moltiplicare per potenze di 2: `x << k`).
- **Shift a destra logico (`srl / srli`):** Inserisce zeri a sinistra (divisione non corretta per negativi).
- **Shift a destra aritmetico (`sra / srai`):** Replica il bit di segno a sinistra (preserva il segno aritmetico in complemento a due).

---

### 6.3 Gestione dei Grandi Immediati a 32 Bit (`lui` e `auipc`)
Poiché le istruzioni immediate di tipo I contengono solo 12 bit di costante:
- Per caricare una costante a 32 bit $N = A \cdot 2^{12} + B$:
  ```assembly
  lui  rd, A          # Carica i 20 bit più significativi (bit 31:12) in rd, azzera bit 11:0
  addi rd, rd, B      # Somma i 12 bit meno significativi con segno
  ```
- **Pseudo-istruzione equivalente:** `li rd, costante` (espansa automaticamente dall'assembler in 1 o 2 istruzioni).
- `auipc rd, imm`: Somma l'immediato a 20 bit shiftato a sinistra di 12 posizioni al valore corrente del $PC$ (`rd = PC + (imm << 12)`), fondamentale per codice rilocabile position-independent.

---

### 6.4 Istruzioni di Salto Condizionato (Branch)
I branch RISC-V usano indirizzamento relativo al Program Counter (PC-relative): $PC_{\text{target}} = PC + \text{offset}$ (con offset shiftato a sinistra di 1 bit, risoluzione a multipli di 2 byte).

| Istruzione | Condizione di Salto | Descrizione |
| :--- | :--- | :--- |
| **`beq rs1, rs2, label`** | `rs1 == rs2` | Salta se i due registri sono uguali. |
| **`bne rs1, rs2, label`** | `rs1 != rs2` | Salta se i due registri sono diversi. |
| **`blt rs1, rs2, label`** | `rs1 < rs2` | Salta se `rs1` è minore di `rs2` (con segno). |
| **`bltu rs1, rs2, label`**| `rs1 < rs2` | Salta se minore unsigned. |
| **`bge rs1, rs2, label`** | `rs1 >= rs2` | Salta se maggiore o uguale (con segno). |
| **`bgeu rs1, rs2, label`**| `rs1 >= rs2` | Salta se maggiore o uguale unsigned. |

#### Pseudo-Istruzioni di Branch
- `beqz rs1, label` $\implies$ `beq rs1, x0, label` (salta se uguale a zero).
- `bnez rs1, label` $\implies$ `bne rs1, x0, label` (salta se diverso da zero).

---

### 6.5 Istruzioni di Salto Incondizionato e Chiamata a Procedura

| Istruzione | Sintassi | Semantica Operativa | Applicazione Tipica |
| :--- | :--- | :--- | :--- |
| **`jal`** | `jal rd, label` | `rd = PC + 4; PC += offset` | Chiamata a funzione (`jal ra, label`). |
| **`jalr`**| `jalr rd, rs1, imm` | `rd = PC + 4; PC = rs1 + imm` | Ritorno da procedura o chiamate a puntatori di funzione. |
| **`j` (pseudo)** | `j label` | `jal x0, label` | Salto incondizionato (non salva il PC). |
| **`jr` (pseudo)**| `jr rs1` | `jalr x0, rs1, 0` | Salto a registro incondizionato. |
| **`ret` (pseudo)**| `ret` | `jalr x0, ra, 0` | Ritorno standard dal chiamante. |
| **`call` (pseudo)**| `call label` | Inoltra chiamata a lunga distanza (`auipc` + `jalr`). | Invocazione di funzioni C/Assembly. |
