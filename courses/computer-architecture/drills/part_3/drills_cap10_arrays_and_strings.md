#drills/computer_architectures/03_03_arrays_and_strings
.
In C, le stringhe di caratteri sono array di byte terminati dal carattere nullo `'\0'` (valore numerico ASCII $0$).
Come si implementa un loop compatto in RISC-V per calcolare la lunghezza di una stringa (`strlen(str)`) il cui puntatore base è in `a0`?
?
.
```assembly
# Input: a0 = puntatore alla stringa
# Output: a0 = lunghezza della stringa (escluso '\0')
    mv t0, a0         # t0 punta all'inizio della stringa
strlen_loop:
    lbu t1, 0(t0)     # carica il byte corrente
    beqz t1, strlen_done # se byte == 0 ('\0'), fine!
    addi t0, t0, 1    # avanza il puntatore di 1 byte
    j strlen_loop
strlen_done:
    sub a0, t0, a0    # lunghezza = puntatore_finale - puntatore_iniziale
```
.
Dato un array di interi a 32 bit `int A[]` con indirizzo base in `s0`, e un indice `i` contenuto nel registro `s1`.
Quale sequenza di istruzioni calcola l'indirizzo effettivo dell'elemento `&A[i]` in `t0` e carica il valore `A[i]` in `t1`?
?
Poiché ogni intero occupa $4$ byte ($2^2$), l'offset è $i \times 4$, ottenibile con uno shift logico a sinistra di 2 bit:
.
```assembly
slli t0, s1, 2      # t0 = i * 4 (offset in byte)
add  t0, s0, t0     # t0 = base + offset = &A[i]
lw   t1, 0(t0)      # t1 = A[i]
```
.
Negli esami d'architettura (es. calcolo su stringhe numeriche `v = p[i] - '0'`), come si converte un carattere ASCII che rappresenta una cifra ('0'-'9') nel suo valore numerico intero equivalente ($0-9$)?
?
Il codice ASCII del carattere `'0'` è $48$ ($0x30$).
Sottraendo $48$ dal codice ASCII del carattere si ottiene il valore intero:
.
```assembly
# Assumendo il carattere in t0:
addi t0, t0, -48    # t0 = t0 - 48 (converte '0'..'9' in 0..9)
```
.
In un esercizio d'esame è richiesto di verificare se un carattere ASCII `c` è una lettera maiuscola ($'A' \le c \le 'Z'$). Sapendo che $'A' = 65$ e $'Z' = 90$, quale sequenza di branch esegue il controllo?
?
.
```assembly
# Assumendo il carattere c nel registro t0:
    li t1, 65
    blt t0, t1, non_maiuscola   # se c < 'A', scarta
    li t1, 90
    bgt t0, t1, non_maiuscola   # se c > 'Z', scarta
    # se supera entrambi i test, è una lettera maiuscola!
```
.
In alternativa, sottraendo $65$: `addi t2, t0, -65`, e verificando con `li t1, 26; bgeu t2, t1, non_maiuscola` (confronto unsigned unico).
.
Per memorizzare un singolo carattere ASCII (1 byte) dal registro `t0` nella cella di memoria puntata da `s0` all'offset $i$ presente in `s1`, quali istruzioni si utilizzano?
?
Per i caratteri (1 byte), l'offset non richiede moltiplicazioni (offset $= i \times 1$).
.
```assembly
add t1, s0, s1      # t1 = indirizzo base (s0) + indice i (s1)
sb  t0, 0(t1)       # Store Byte: memorizza il byte meno significativo di t0
```
