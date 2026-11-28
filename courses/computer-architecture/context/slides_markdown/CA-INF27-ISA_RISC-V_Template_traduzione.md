# Pattern di Traduzione dal Linguaggio C ad Assembly RISC-V

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Linguaggio del Calcolatore — Mappatura di Costrutti Condizionali e Iterativi (If-Else, While, For, Do-While)

---

## 1. Mappatura delle Variabili nei Registri

Nelle convenzioni di traduzione:
- Le variabili locali del linguaggio C vengono allocate preferibilmente nei registri salvati **`s0 - s11`** (es. `s0` per la variabile principale, `s1` per la seconda).
- I valori immediati o le costanti di confronto e i flag booleani intermedi vengono memorizzati nei registri temporanei **`t0 - t6`**.

---

## 2. Traduzione del Costrutto Condizionale If-Else

```c
if (var1 == var2)
    istruzione_true;
else
    istruzione_false;
```

### Pattern A: Salto su Condizione Vera (`beq`)
```assembly
    # var1 in s0, var2 in s1
istr_if:
    beq  s0, s1, istr_true       # Se var1 == var2 salta al ramo true
    # Ramo Else (False)
    istruzione_false
    j    successiva_if           # Salta oltre il ramo true
istr_true:
    istruzione_true
successiva_if:
```

### Pattern B: Salto su Condizione Inversa (Più compatto ed efficiente con `bne`)
I compilatori ottimizzanti invertono la condizione logica per eseguire il ramo vero immediatamente di seguito:
```assembly
istr_if:
    bne  s0, s1, istr_false      # Se var1 != var2 salta all'else
    istruzione_true             # Esecuzione in caduta (fall-through)
    j    successiva_if
istr_false:
    istruzione_false
successiva_if:
```

---

## 3. Gestione dei Confronti di Disuguaglianza

RISC-V non possiede istruzioni di branch diretto tipo "salta se minore di un immediato" in un'unica operazione di branch. Si utilizzano le istruzioni `slt` / `slti` combinate con `beq` / `bne`.

### 3.1 Confronto tra Variabili (`if (var1 < var2)`)

#### Approccio Standard a 2 Istruzioni (`slt` + `beq`/`bne`)
```c
if (var1 < var2)
    istruzione_true;
else
    istruzione_false;
```
```assembly
    slt  t0, s0, s1              # t0 = 1 se s0 < s1, altrimenti 0
istr_if:
    beq  t0, zero, istr_false    # Se t0 == 0 (ovvero var1 >= var2) salta all'else
    istruzione_true
    j    successiva_if
istr_false:
    istruzione_false
successiva_if:
```

#### Approccio Diretto RISC-V (`blt`)
```assembly
istr_if:
    bge  s0, s1, istr_false      # Condizione complementare: salta se s0 >= s1
    istruzione_true
    j    successiva_if
istr_false:
    istruzione_false
successiva_if:
```

---

### 3.2 Confronto con Valore Immediato (`if (var < imm)`)
```assembly
    slti t0, s0, imm             # t0 = 1 se s0 < imm
istr_if:
    beq  t0, zero, istr_false    # Salta all'else se var >= imm
    istruzione_true
    j    successiva_if
istr_false:
    istruzione_false
successiva_if:
```

### 3.3 Regole di Inversione Logica per Disuguaglianze
- `var > imm` $\iff$ `imm < var` $\implies$ si carica `imm` in `t0` e si calcola `slt t1, t0, s0`.
- `var <= imm` $\iff$ negazione di `var > imm` (invertendo i rami true e false).
- `var >= imm` $\iff$ negazione di `var < imm`.

---

## 4. Traduzione del Ciclo While

```c
while (var1 == valore) {
    istruzione_while;
}
```

```assembly
    # var1 in s0, valore in t0
while:
    bne  s0, t0, end_loop        # Esce dal ciclo se la condizione è falsa (s0 != t0)
    istruzione_while
    j    while                   # Ritorna all'inizio del controllo
end_loop:
```

Nel caso con disuguaglianza `while (var1 < valore)`:
```assembly
    addi t0, zero, valore
while:
    bge  s0, t0, end_loop        # Esce se s0 >= valore
    istruzione_while
    j    while
end_loop:
```

---

## 5. Traduzione del Ciclo For

```c
for (i = 0; i < 5; i++) {
    istruzione_for;
}
```

Equivalente logico in pseudo-C:
```c
i = 0;
while (i < 5) {
    istruzione_for;
    i++;
}
```

### Implementazione Assembly Ottimizzata
```assembly
    # Indice i in s0
inizializza:
    addi s0, zero, 0             # i = 0
    addi t0, zero, 5             # Valore limite 5 in t0
for_loop:
    bge  s0, t0, end_loop        # Se i >= 5 esce dal loop
    istruzione_for              # Corpo del ciclo
    addi s0, s0, 1               # Passo di incremento: i++
    j    for_loop
end_loop:
```

---

## 6. Traduzione del Ciclo Do-While

```c
i = 0;
do {
    istruzione_while;
    i++;
} while (i < 10);
```

Nei cicli post-condizionali il controllo avviene al fondo del loop, eliminando un salto incondizionato nel flusso iterativo:

```assembly
    addi s0, zero, 0             # i = 0
    addi t0, zero, 10            # Limite 10 in t0
do_while_loop:
    istruzione_while            # Corpo del ciclo eseguito almeno una volta
    addi s0, s0, 1               # i++
    blt  s0, t0, do_while_loop   # Se i < 10 salta direttamente all'inizio del loop
end_loop:
```
*Vantaggio microarchitetturale:* Il corpo del loop contiene **un solo branch condizionato al termine** senza alcuna istruzione `j` di ritorno, minimizzando gli hazard di controllo nella pipeline.
