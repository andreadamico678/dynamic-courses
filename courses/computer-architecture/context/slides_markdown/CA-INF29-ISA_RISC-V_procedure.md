# Chiamate a Procedura in RISC-V: Stack, Frame e Convenzioni ABI

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Linguaggio del Calcolatore — Flusso di Controllo, Convenzioni di Chiamata Caller/Callee-Saved, Stack Pointer e Subroutine Annidate

---

## 1. Meccanismo della Chiamata a Procedura

L'esecuzione di una funzione/subroutine in architettura RISC-V comporta due requisiti essenziali:
1. **Deviazione e Ripristino del Flusso di Controllo:** Trasferimento del $PC$ all'inizio della procedura e successivo ritorno all'istruzione immediatamente seguente quella chiamante.
2. **Passaggio di Informazioni e Isolamento dello Stato:** Trasferimento ordinato dei parametri d'ingresso, allocazione delle variabili locali e restituzione del risultato senza corrompere i dati del chiamante.

### Le Istruzioni Hardware di Salto e Ritorno
- **Chiamata (`jal ra, label` o pseudo-istruzione `call label`):**
  Salva l'indirizzo di ritorno nel registro Return Address (`ra` / `x1`):
  $$ra = PC + 4; \quad PC = \text{Indirizzo}(\text{label})$$
- **Ritorno (`jr ra` o pseudo-istruzione `ret`):**
  Ripristina il Program Counter dal registro `ra`:
  $$PC = ra$$

---

## 2. Lo Stack e lo Stack Pointer (`sp`)

Quando una procedura necessita di registri interni, oppure quando invoca un'altra funzione (*chiamata non foglia* o ricorsione), il contenuto dei registri e l'indirizzo `ra` devono essere salvati nella memoria **Stack**.

- Il registro **`sp` (`x2`)** punta costantemente alla parola in cima allo stack (*top of stack*).
- **Direzione di crescita:** In RISC-V (come in quasi tutte le architetture moderne) lo stack **cresce verso il basso** (da indirizzi di memoria alti verso indirizzi più bassi).
- **Allocazione (Push):** Lo stack pointer viene **decrementato**:
  ```assembly
  addi sp, sp, -24        # Alloca 24 byte (3 parole da 64 bit o 6 da 32 bit)
  ```
- **Deallocazione (Pop):** Lo stack pointer viene **incrementato** della stessa quantità:
  ```assembly
  addi sp, sp, 24         # Rilascia lo spazio allocato
  ```

---

## 3. Convenzioni ABI sui Registri: Caller-Saved vs. Callee-Saved

Per consentire l'interoperabilità tra moduli software e compilatori C:

| Categoria | Registri Coinvolti | Regola e Responsabilità |
| :--- | :--- | :--- |
| **Callee-Saved (Preservati dalla funzione chiamata)** | **`s0 - s11`** (`x8-x9`, `x18-x27`), **`sp`** (`x2`) | Se la funzione chiamata intende usare uno di questi registri, **deve salvarne il vecchio valore nello stack nel prologo e ripristinarlo prima di ritornare (epilogo)**. Il chiamante ha la certezza che tali registri non subiranno alterazioni. |
| **Caller-Saved (Non preservati dalla funzione chiamata)** | **`t0 - t6`** (`x5-x7`, `x28-x31`), **`a0 - a7`** (`x10-x17`), **`ra`** (`x1`) | Possono essere sovrascritti liberamente dalla funzione chiamata. Se il chiamante ha bisogno di preservare questi dati dopo la `call`, è responsabilità del **chiamante stesso** salvarli nel proprio frame di stack prima di effettuare il salto. |

---

## 4. Struttura Canonica di una Procedura: Prologo, Corpo ed Epilogo

Ogni procedura ben formata si articola in tre sezioni strutturate:

```assembly
nome_funzione:
    # ---------------- 1. PROLOGO ----------------
    addi sp, sp, -frame_size    # Alloca spazio nello stack
    sd   ra, 0(sp)              # Salva ra (obbligatorio se la funzione chiama altre funzioni)
    sd   s0, 8(sp)              # Salva i registri callee-saved usati
    sd   s1, 16(sp)

    # ---------------- 2. CORPO -----------------
    # Esecuzione del calcolo
    # Parametri ricevuti in a0, a1, ...
    # Risultato depositato in a0 (e a1 se valore a 128 bit)

    # ---------------- 3. EPILOGO ----------------
    ld   s1, 16(sp)             # Ripristina i registri salvati in ordine inverso
    ld   s0, 8(sp)
    ld   ra, 0(sp)              # Ripristina l'indirizzo di ritorno
    addi sp, sp, frame_size     # Dealloca lo stack frame
    ret                         # Salto al chiamante (jr ra)
```

---

## 5. Esempio Completo: Implementazione di `operazione(x, y)` con I/O

Traduciamo il seguente programma C completo in Assembly RISC-V:

```c
#include <stdio.h>

int operazione(int a0, int a1) {
    int t;
    t = a0 + a1;
    return t;
}

int main() {
    int x, y, ris;
    printf("Inserisci un numero ");
    scanf("%d", &x);
    printf("Inserisci un numero ");
    scanf("%d", &y);
    ris = operazione(x, y);
    printf(" Ris= %d\n", ris);
    return 0;
}
```

### Codice Assembly RISC-V Completo

```assembly
.data
str1:   .asciz "Inserisci un numero "
str2:   .asciz " Ris= "
nl:     .asciz "\n"

.text
.globl main

# ==========================================
# PROCEDURA PRINCIPALE: main
# ==========================================
main:
    # Alloca frame stack per main (salvataggio ra e registri salvati)
    addi sp, sp, -32
    sd   ra, 24(sp)
    sd   s0, 16(sp)              # s0 conterrà x
    sd   s1, 8(sp)               # s1 conterrà y
    sd   s2, 0(sp)               # s2 conterrà ris

    # 1. Stampa prompt 1
    li   a7, 4
    la   a0, str1
    ecall

    # 2. Lettura di x
    li   a7, 5                   # ReadInt
    ecall
    mv   s0, a0                  # s0 = x

    # 3. Stampa prompt 2
    li   a7, 4
    la   a0, str1
    ecall

    # 4. Lettura di y
    li   a7, 5                   # ReadInt
    ecall
    mv   s1, a0                  # s1 = y

    # 5. Predisposizione argomenti e chiamata di operazione(x, y)
    mv   a0, s0                  # Primo argomento: a0 = x
    mv   a1, s1                  # Secondo argomento: a1 = y
    jal  ra, operazione          # Chiamata a funzione
    mv   s2, a0                  # s2 = valore restituito (ris)

    # 6. Stampa etichetta risultato
    li   a7, 4
    la   a0, str2
    ecall

    # 7. Stampa valore del risultato
    li   a7, 1                   # PrintInt
    mv   a0, s2
    ecall

    # 8. Stampa newline
    li   a7, 4
    la   a0, nl
    ecall

    # 9. Epilogo del main
    ld   s2, 0(sp)
    ld   s1, 8(sp)
    ld   s0, 16(sp)
    ld   ra, 24(sp)
    addi sp, sp, 32

    # Uscita pulita dal programma
    li   a7, 10
    ecall


# ==========================================
# PROCEDURA CHIAMATA: operazione(a0, a1)
# Calcola: return a0 + a1
# ==========================================
operazione:
    # Prologo (salvataggio del registro callee-saved s0)
    addi sp, sp, -8
    sd   s0, 0(sp)

    # Corpo della procedura
    add  s0, a0, a1              # s0 = a0 + a1
    mv   a0, s0                  # Valore di ritorno in a0

    # Epilogo
    ld   s0, 0(sp)               # Ripristino del registro s0 originale
    addi sp, sp, 8               # Deallocazione frame
    ret                          # Ritorno al chiamante (jr ra)
```
