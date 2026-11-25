#flashcards/computer-architecture/04_02_subroutine_stack_frames

Qual è il vincolo di allineamento dello stack pointer `sp` imposto dall'ABI RISC-V e in quale direzione cresce lo stack?
?
Lo stack cresce verso indirizzi decrescenti (`addi sp, sp, -K`) e `sp` deve restare multiplo di 16 byte ($\mathrm{sp} \bmod 16 = 0$, quindi $K \in \{16, 32, 48, 64, \dots\}$).

---

Quali registri RISC-V sono *caller-saved* (volatili attraverso `jal` / `call`)?
?
I temporanei `t0`–`t6`, gli argomenti/ritorni `a0`–`a7` e `ra` (sovrascritto da qualsiasi `jal` annidata).

---

Quali registri RISC-V sono *callee-saved* (preservati attraverso `jal` / `call`)?
?
I registri `s0`–`s11` e lo stack pointer `sp`: se una funzione li modifica, deve salvarli nel prologo e ripristinarli nell'epilogo.

---

Quando una funzione è *leaf* e quando invece è *non-leaf*, e cosa cambia per il registro `ra`?
?
Una funzione *leaf* non esegue alcuna `call`/`jal` e non deve salvare `ra` (zero stack se usa solo `t0`–`t6`); una funzione *non-leaf* invoca altre subroutine e deve obbligatoriamente salvare `ra` sullo stack nel prologo.

---

Qual è il template meccanico di prologo ed epilogo per una funzione *non-leaf* che usa `s0` con frame da 16 byte?
?
Prologo: `addi sp, sp, -16`, `sw ra, 12(sp)`, `sw s0, 8(sp)` $\longrightarrow$ Epilogo: `lw s0, 8(sp)`, `lw ra, 12(sp)`, `addi sp, sp, 16`, `ret` (`jalr zero, 0(ra)`).

---

Dove va allocato un array C locale a una funzione (es. `char prima[16];` in `main`) e come se ne passa l'indirizzo in `a0`?
?
Nello stack frame della funzione (mai in `.data`), calcolandone il puntatore con `addi a0, sp, offset` (mai con `lw`).

---

Se una funzione ausiliaria *leaf* in C dichiara variabili locali chiamate `int s0, s1;`, su quali registri hardware vanno mappate?
?
Sui registri temporanei volatili `t0`–`t6`: modificare il registro hardware `s0` senza salvarlo sullo stack corromperebbe il contatore del chiamante `main`.
