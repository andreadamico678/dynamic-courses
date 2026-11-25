#drills/computer_architectures/04_01_system_calls
.
In ambiente di simulazione RARS / RISC-V adottato negli esami UniCT, quale registro della CPU deve tassativamente contenere il **codice del servizio di sistema** prima dell'invocazione dell'istruzione `ecall`?
?
Il registro **`a7`** (registro hardware `x17`).
L'istruzione `ecall` (Environment Call) legge il codice di servizio memorizzato in `a7` ed esegue la corrispondente trap verso l'ambiente di sistema operativo o simulatore.
.
Quali sono i codici di servizio `ecall` fondamentali costantemente utilizzati negli esami per l'I/O su console?
?
| Servizio | Codice in `a7` | Parametri d'Ingresso | Valore Restituito |
| :--- | :---: | :--- | :--- |
| **Print Integer** | `1` | `a0` = intero da stampare | — |
| **Print String** | `4` | `a0` = indirizzo della stringa null-terminata | — |
| **Read Integer** | `5` | — | `a0` = intero inserito |
| **Read String** | `8` | `a0` = puntatore al buffer, `a1` = dimensione massima | — |
| **Exit** | `10` | — | Termina l'esecuzione |
| **Print Char** | `11` | `a0` = codice ASCII del carattere | — |
.
Come si scrive la sequenza assembly RISC-V corretta per stampare a video il messaggio `msg: .string "Inserisci numero: "` e leggere un intero da tastiera memorizzandolo nel registro `s0`?
?
.
```assembly
    # Stampa la stringa di prompt
    la a0, msg        # a0 = indirizzo del messaggio
    li a7, 4          # a7 = 4 (Print String)
    ecall
.
    # Legge l'intero da console
    li a7, 5          # a7 = 5 (Read Integer)
    ecall
    mv s0, a0         # s0 = valore intero inserito dall'utente
```
.
Negli esami viene richiesta la lettura di una stringa in un buffer locale `char prima[16]`.
Come si invoca correttamente il servizio `ecall 8` (Read String) garantendo che non si verifichi un buffer overflow?
?
Si deve caricare nel registro `a0` l'indirizzo del buffer (es. sullo stack) e nel registro `a1` la capacità massima del buffer in byte ($16$):
.
```assembly
    # Assumendo il buffer allocato sullo stack a partire da sp:
    mv a0, sp         # a0 = indirizzo base del buffer
    li a1, 16         # a1 = numero massimo di byte da leggere (incluso '\0')
    li a7, 8          # a7 = 8 (Read String)
    ecall
```
.
Il simulatore leggerà fino a $15$ caratteri seguiti dal terminatore nullo `'\0'`, proteggendo la memoria circostante.
.
Quando si legge una stringa da tastiera con il servizio `ecall 8`, quale carattere speciale viene memorizzato alla fine della riga prima del byte nullo `'\0'` se l'utente preme Invio?
?
Viene memorizzato il carattere di **newline `'\n'` (ASCII 10, 0x0A)**.
Se l'esercizio richiede di calcolare la lunghezza effettiva della stringa inserita o confrontarla, spesso si deve verificare se l'ultimo carattere prima di `'\0'` è `'\n'` ed eventualmente sostituirlo con `'\0'` o sottrarre 1 dal conteggio.
