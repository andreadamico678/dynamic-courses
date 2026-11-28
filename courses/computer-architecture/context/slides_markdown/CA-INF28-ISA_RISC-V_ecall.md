# Chiamate di Sistema in RISC-V (`ecall`)

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Linguaggio del Calcolatore — Interfaccia con il Sistema Operativo, Servizi di I/O, File System e Simulatore RARS/Venus

---

## 1. Il Meccanismo delle Chiamate di Sistema (`ecall`)

L'istruzione **`ecall`** (*Environment Call*) consente al codice in esecuzione a livello utente (*User Mode*) di invocare servizi protetti forniti dal sistema operativo (*Supervisor / Kernel Mode*) o dall'ambiente di simulazione (RARS, Venus, Spike), quali:
- Operazioni di Input/Output su console standard (`stdin`, `stdout`).
- Manipolazione del file system (apertura, lettura, scrittura, chiusura di file).
- Terminazione pulita del processo con codice di stato.

---

## 2. Convenzione Standard di Chiamata per le `ecall`

Per invocare un servizio di sistema occorre rispettare rigorosamente la seguente sequenza di 4 passi:
1. **Caricare il codice del servizio nel registro `a7`:**
   ```assembly
   li   a7, <numero_servizio>
   ```
2. **Caricare gli argomenti d'ingresso nei registri dedicati:**
   - Registri interi: `a0`, `a1`, `a2`.
   - Registri floating-point: `fa0`.
3. **Eseguire l'istruzione `ecall`:**
   ```assembly
   ecall
   ```
4. **Prelevare il valore di ritorno:**
   - I valori restituiti dal sistema vengono depositati in `a0` (o `fa0` per numeri a virgola mobile).

---

## 3. Tabella Completa dei Servizi di Sistema (RARS / Venus ABI)

| Servizio | Codice (`a7`) | Descrizione Funzionale | Argomenti in Ingresso | Valori Restituiti |
| :--- | :---: | :--- | :--- | :--- |
| **`PrintInt`** | **1** | Stampa un numero intero su console. | `a0` = intero da stampare | Nessuno |
| **`PrintFloat`**| **2** | Stampa un numero float a 32 bit. | `fa0` = float da stampare | Nessuno |
| **`PrintDouble`**|**3** | Stampa un float a 64 bit (double). | `fa0` = double da stampare | Nessuno |
| **`PrintString`**|**4** | Stampa una stringa ASCII terminata da byte nullo `\0`. | `a0` = indirizzo di memoria della stringa | Nessuno |
| **`ReadInt`** | **5** | Legge un numero intero da tastiera. | Nessuno | `a0` = intero letto |
| **`ReadFloat`** | **6** | Legge un valore float da tastiera. | Nessuno | `fa0` = float letto |
| **`ReadDouble`**| **7** | Legge un valore double da tastiera. | Nessuno | `fa0` = double letto |
| **`ReadString`**| **8** | Legge una linea di testo da tastiera in un buffer. | `a0` = indirizzo buffer, `a1` = numero max caratteri | Nessuno |
| **`PrintChar`** | **11**| Stampa un singolo carattere ASCII. | `a0` = codice ASCII (solo byte basso) | Nessuno |
| **`ReadChar`** | **12**| Legge un singolo carattere da console. | Nessuno | `a0` = carattere letto |
| **`Exit`** | **10**| Termina l'esecuzione del programma con codice 0. | Nessuno | Nessuno |
| **`Open`** | **1024**| Apre un file su disco dato il percorso. | `a0` = puntatore a stringa path, `a1` = flag apertura | `a0` = file descriptor (o $-1$ se errore) |
| **`Close`** | **57** | Chiude un file descriptor aperto. | `a0` = file descriptor da chiudere | Nessuno |
| **`Read`** | **63** | Legge blocchi di byte da un file descriptor. | `a0` = fd, `a1` = indirizzo buffer, `a2` = max byte | `a0` = byte effettivamente letti (o $-1$) |
| **`Write`** | **64** | Scrive byte da un buffer su un file descriptor. | `a0` = fd, `a1` = indirizzo buffer, `a2` = byte da scrivere | `a0` = byte effettivamente scritti (o $-1$) |

---

## 4. Flag per le Chiamate di File I/O (`Open`)

Il parametro passato in `a1` per il servizio `Open` (`a7 = 1024`) configura la modalità di accesso:
- `O_RDONLY` (`0x01` / `1`): Apertura in sola lettura.
- `O_WRONLY` (`0x02` / `2`): Apertura in sola scrittura.
- `O_RDWR` (`0x03` / `3`): Apertura in lettura e scrittura simultanea.
- `O_CREAT` (`0x04` / `4`): Crea il file se non esiste già sul disco.
- `O_APPEND` (`0x08` / `8`): Accoda i nuovi dati al fondo del file preesistente.

---

## 5. Esempi Pratici Completi di Codice Assembly RISC-V

### 5.1 Stampa di Stringa ed Intero Formattato
Equivalente della chiamata C: `printf("La somma e' %d\n", somma);`

```assembly
.data
msg:    .asciz "La somma e' "
somma:  .word  30
nl:     .asciz "\n"

.text
.globl main
main:
    # 1. Stampa della stringa di prefisso
    li   a7, 4               # Servizio 4: PrintString
    la   a0, msg             # Indirizzo della stringa in a0
    ecall

    # 2. Stampa del valore intero
    li   a7, 1               # Servizio 1: PrintInt
    lw   a0, somma           # Carica il valore 30 in a0
    ecall

    # 3. Stampa newline
    li   a7, 4
    la   a0, nl
    ecall

    # 4. Terminazione corretta
    li   a7, 10              # Servizio 10: Exit
    ecall
```

---

### 5.2 Acquisizione di Due Numeri da Tastiera, Somma e Stampa Finale

```assembly
.data
msg1:   .asciz "Inserisci un numero: "
msg2:   .asciz "Risultato: "
nl:     .asciz "\n"

.text
.globl main
main:
    # Richiesta primo numero
    li   a7, 4
    la   a0, msg1
    ecall

    # Lettura primo numero x
    li   a7, 5               # Servizio 5: ReadInt
    ecall
    mv   t0, a0              # t0 = x

    # Richiesta secondo numero
    li   a7, 4
    la   a0, msg1
    ecall

    # Lettura secondo numero y
    li   a7, 5
    ecall
    mv   t1, a0              # t1 = y

    # Calcolo somma in t2
    add  t2, t0, t1          # t2 = x + y

    # Stampa stringa di intestazione risultato
    li   a7, 4
    la   a0, msg2
    ecall

    # Stampa del risultato
    li   a7, 1
    mv   a0, t2              # a0 = somma
    ecall

    # Stampa a capo
    li   a7, 4
    la   a0, nl
    ecall

    # Uscita
    li   a7, 10
    ecall
```

---

### 5.3 Apertura, Lettura e Chiusura di un File di Testo

```assembly
.data
path:       .asciz "dati.txt"
buffer:     .space 64        # Buffer di ricezione da 64 byte
fd:         .word  0

.text
.globl main
main:
    # 1. Apertura file in sola lettura
    li   a7, 1024            # Open service
    la   a0, path            # Puntatore al percorso
    li   a1, 1               # O_RDONLY = 1
    ecall
    blt  a0, zero, errore    # Se a0 == -1 l'apertura è fallita
    sw   a0, fd, t0          # Salva il file descriptor restituito

    # 2. Lettura di fino a 64 byte dal file
    li   a7, 63              # Read service
    lw   a0, fd              # File descriptor
    la   a1, buffer          # Indirizzo del buffer di destinazione
    li   a2, 64              # Lunghezza massima in byte
    ecall

    # 3. Chiusura del file
    li   a7, 57              # Close service
    lw   a0, fd
    ecall

    # 4. Uscita
    li   a7, 10
    ecall

errore:
    li   a7, 10
    ecall
```
