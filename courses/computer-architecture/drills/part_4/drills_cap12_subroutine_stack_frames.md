#drills/computer_architectures/04_02_subroutine_stack_frames
.
In base alla convenzione di chiamata (Calling Convention) standard di RISC-V, qual è la distinzione fondamentale tra registri **Caller-Saved** e **Callee-Saved**?
?
.
- **Caller-Saved (Volatili):** Registri `t0-t6` (temporanei) e `a0-a7` (argomenti/ritorno). La funzione chiamata (callee) è libera di sovrascriverli; se la funzione chiamante (caller) ne ha bisogno dopo la chiamata `jal`, deve salvarli lei stessa sul proprio stack.
- **Callee-Saved (Preservati):** Registri `s0-s11` (saved registers), `ra` (return address) e `sp` (stack pointer). La funzione chiamata **deve preservarli**: se intende utilizzarli, deve salvarli all'inizio (prologo) e ripristinarli prima di ritornare (epilogo).
.
Perché una funzione **Non-Leaf** (una funzione che a sua volta invoca altre sottofunzioni, come tipicamente il `main`) deve tassativamente salvare il registro `ra` sul proprio stack frame?
?
Perché quando la funzione esegue l'istruzione di salto a sottoprogramma:
.
```assembly
jal ra, funzione_ausiliaria
```
.
l'hardware sovrascrive istantaneamente il registro `ra` con l'indirizzo dell'istruzione successiva alla chiamata. Se `ra` originario non è stato salvato sullo stack, il punto di ritorno della funzione non-leaf viene perso irrimediabilmente, causando un loop infinito o un crash.
.
In un'architettura RISC-V a 32 bit (RV32I), qual è il vincolo di **allineamento dello Stack Pointer (`sp`)** imposto dall'ABI al confine di chiamata di una funzione?
?
Lo Stack Pointer deve essere rigorosamente allineato a **16 byte**:
$$\text{sp} \pmod{16} = 0$$
Qualsiasi allocazione dello stack frame (es. `addi sp, sp, -N`) deve decrementare `sp` di un multiplo intero di $16$ byte ($16, 32, 48, 64, \dots$).
.
Nel `main()` di un compito d'esame sono presenti:
.
- Due buffer locali: `char prima[16]` ($16$ byte) e `char seconda[16]` ($16$ byte).
- Salvataggio del registro `ra` ($4$ byte) e di due registri callee-saved `s0, s1` ($8$ byte).
  Qual è la dimensione minima dello stack frame allineata a 16 byte da allocare nel prologo?
  ?
  Spazio dati richiesto:
  $$\text{Buffer} = 16 + 16 = 32\text{ byte}$$
  $$\text{Registri } (ra, s0, s1) = 4 + 4 + 4 = 12\text{ byte}$$
  $$\text{Spazio totale grezzo} = 32 + 12 = 44\text{ byte}$$
  Arrotondando al multiplo superiore di 16 byte:
  $$\lceil 44 / 16 \rceil \times 16 = 3 \times 16 = 48\text{ byte}$$
  Nel prologo si alloca:
.
```assembly
addi sp, sp, -48
```
.
Qual è la sequenza tipica di prologo ed epilogo per una funzione che deve salvare `ra` e il registro `s0` allocando uno stack frame di 16 byte?
?
.
```assembly
# PROLOGO
    addi sp, sp, -16    # alloca 16 byte sullo stack
    sw   ra, 12(sp)     # salva il return address
    sw   s0, 8(sp)      # salva il registro preservato s0
.
    # ... corpo della funzione ...
.
# EPILOGO
    lw   s0, 8(sp)      # ripristina s0 originario
    lw   ra, 12(sp)     # ripristina ra originario
    addi sp, sp, 16     # dealloca lo stack frame
    ret                 # ritorna al chiamante (jalr x0, ra, 0)
```
.
Quali registri vengono utilizzati per passare i parametri a una funzione e quale registro restituisce il valore di ritorno principale in RISC-V?
?
.
- **Parametri d'ingresso:** Registri da **`a0`** a **`a7`** (fino a 8 parametri interi/puntatori).
- **Valore di ritorno:** Registri **`a0`** (e `a1` per valori a 64 bit).
  Prima di eseguire `jal`, il chiamante inserisce gli argomenti in `a0, a1, ...`; dopo il ritorno, il chiamante trova il risultato in `a0`.
