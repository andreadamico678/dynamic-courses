#drills/computer_architectures/04_03_recursive_subroutines
.
Cosa deve salvare tassativamente sullo stack frame **ogni livello di attivazione** di una procedura ricorsiva in RISC-V prima di richiamare se stessa?
?
Deve salvare:
.
1. Il registro del return address **`ra`** (per non perdere il punto di ritorno al livello gerarchico superiore).
2. Il parametro d'ingresso corrente **`a0`** (o i registri temporanei che devono essere usati dopo il ritorno della chiamata ricorsiva, poiché la chiamata figlia sovrascriverà `a0`).
.
Considera la funzione fattoriale ricorsiva:
.
```c
int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
```
.
All'interno del caso base ($n \le 1$), è necessario eseguire una chiamata ricorsiva o salvare lo stack?
?
No. Nel caso base:
.
- Non si effettuano ulteriori chiamate di funzione.
- Si carica semplicemente il valore di ritorno in `a0`: `li a0, 1`.
- Si dealloca lo stack frame (se era stato allocato) e si esegue direttamente `ret` tornando al livello chiamante.
.
Nel codice ricorsivo del fattoriale, quale sequenza di istruzioni calcola $n \times \text{fact}(n - 1)$ dopo il ritorno dalla chiamata ricorsiva?
?
.
```assembly
    # Prima della chiamata fact(n-1):
    # s0 (o stack) conservava il valore originario di n
    jal ra, fact        # a0 contiene ora fact(n-1)
.
    lw  t0, 0(sp)       # ricarica il valore originario di n salvato sullo stack
    mul a0, a0, t0      # a0 = fact(n-1) * n (risultato finale del livello corrente)
.
    lw  ra, 4(sp)       # ripristina ra
    addi sp, sp, 16     # rilascia lo stack frame
    ret
```
.
Se una funzione ricorsiva alloca uno stack frame di $16$ byte ad ogni invocazione, quanta memoria stack viene consumata durante il calcolo per un input $n = 50$?
?
Poiché vi sono $50$ record di attivazione attivi contemporaneamente sullo stack:
$$\text{Memoria Totale} = 50 \times 16\text{ byte} = 800\text{ byte}$$
Se la ricorsione non presenta una condizione di terminazione valida (caso base), si genera un esaurimento progressivo dello stack noto come **Stack Overflow**, che corrompe i segmenti dati o scatena un'eccezione di protezione della memoria.
