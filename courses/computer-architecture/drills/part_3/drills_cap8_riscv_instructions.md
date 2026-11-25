#drills/computer_architectures/03_01_riscv_instructions
.
Qual è la proprietà fondamentale del registro `x0` (nome ABI `zero`) nell'architettura RISC-V?
?
Il registro `x0` è **fissato per via hardware al valore costante zero ($0$)**:
.
- Qualsiasi lettura restituisce sempre il valore $0$.
- Qualsiasi scrittura su `x0` viene ignorata e scartata dall'hardware senza generare eccezioni.
.
Qual è il range numerico rappresentabile in complemento a due per il campo immediato a 12 bit nelle istruzioni RISC-V di tipo I (es. `addi`, `lw`)?
?
Essendo un intero con segno su 12 bit con estensione di segno automatica:
$$[-2^{11}, \, 2^{11} - 1] = [-2048, \, +2047]$$
Costanti al di fuori di questo intervallo richiedono istruzioni a 32 bit composte (come la combinazione di `lui` e `addi`).
.
Dato il registro `t0 = 0x000000FF` (ossia $+255$). Qual è il valore contenuto in `t1` dopo l'esecuzione dell'istruzione di scorrimento logico a sinistra:
`slli t1, t0, 4`?
?
L'istruzione `slli` (Shift Left Logical Immediate) sposta i bit verso sinistra di 4 posizioni, inserendo 4 zeri a destra:
$$0x000000FF \ll 4 = 0x00000FF0$$
In decimale, equivale a moltiplicare per $2^4 = 16$: $255 \times 16 = 4080$.
.
Qual è la differenza fondamentale tra l'istruzione di caricamento byte con segno `lb` (Load Byte) e quella senza segno `lbu` (Load Byte Unsigned)?
?
.
- `lb rd, offset(rs1)`: carica 1 byte dalla memoria e **estende il segno** (copiando il bit più significativo, bit 7, su tutti i rimanenti 24 bit superiori fino a 31). Se il byte è $0x80$ (negativo in signed char), il registro conterrà $0xFFFFFF80$.
- `lbu rd, offset(rs1)`: carica 1 byte dalla memoria e **estende con zeri** (azzerando i 24 bit superiori). Se il byte è $0x80$, il registro conterrà $0x00000080$.
.
Se il registro `s0` contiene l'indirizzo base di memoria di un array di interi a 32 bit (`int array[]`), quale istruzione RISC-V carica il terzo elemento `array[2]` nel registro `t0`?
?
Poiché ogni intero a 32 bit occupa $4$ byte, l'offset per l'indice $i=2$ vale:
$$\text{Offset} = 2 \times 4 = 8\text{ byte}$$
L'istruzione corretta è:
.
```assembly
lw t0, 8(s0)
```
.
Qual è la differenza tra scorrimento a destra logico (`srli`) e scorrimento a destra aritmetico (`srai`) in RISC-V?
?
.
- `srli` (Shift Right Logical Immediate): inserisce **sempre zeri ($0$)** nelle posizioni più significative a sinistra. Si usa per numeri senza segno o manipolazione di campi di bit.
- `srai` (Shift Right Arithmetic Immediate): replica il **bit di segno originario** (bit 31) nelle posizioni più significative a sinistra, preservando il segno del numero in complemento a due (divisione intera per potenze di 2 per numeri con segno).
