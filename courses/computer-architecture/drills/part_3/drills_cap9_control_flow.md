#drills/computer_architectures/03_02_control_flow
.
Nel tradurre una struttura ad alto livello `if (a < b) { corpo_then; } else { corpo_else; }` in assembly RISC-V, quale istruzione di salto condizionato si usa per saltare al ramo `else`?
?
Si applica la **condizione logica inversa**:
La negazione di $a < b$ è $a \ge b$.
Pertanto si salta al ramo `else` se la condizione non è verificata usando l'istruzione:
.
```assembly
bge a, b, else_label
```
.
Qual è il template standard e compatto in assembly RISC-V per implementare un ciclo `for (i = 0; i < 3; i++)` assumendo che `i` risieda nel registro `s0`?
?
.
```assembly
    li s0, 0          # i = 0
for_loop:
    li t0, 3
    bge s0, t0, end_for   # se i >= 3, esci dal ciclo
.
    # ... corpo del ciclo for ...
.
    addi s0, s0, 1    # i++
    j for_loop        # salta all'inizio del ciclo
end_for:
```
.
Negli esami d'architettura (Domanda 6), ricorre costantemente il ciclo di validazione dell'input:
.
```c
do {
    scanf("%s", seconda);
} while (strlen(seconda) != pa2);
```
.
Come si traduce efficientemente in RISC-V un ciclo `do-while` per verificare se la condizione di ripetizione è vera?
?
Nel ciclo `do-while`, il corpo viene eseguito **almeno una volta**, e il salto condizionato si trova **alla fine del ciclo**:
.
```assembly
do_while_loop:
    # ... corpo del ciclo (lettura stringa e calcolo lunghezza in t0) ...
    # assumendo pa2 nel registro s1:
    bne t0, s1, do_while_loop   # se len != pa2, ripeti il ciclo!
    # uscita dal ciclo quando len == pa2
```
.
Non serve alcun salto incondizionato: se la condizione è verificata si risalta in cima con un solo branch!
.
Qual è la differenza fondamentale tra i salti condizionati `blt` / `bge` e le loro varianti `bltu` / `bgeu`?
?
.
- `blt` (Branch Less Than) e `bge` (Branch Greater or Equal): confrontano i registri trattando i valori come interi **con segno** (complemento a due, dove $0xFFFFFFFF = -1 < 0$).
- `bltu` e `bgeu`: confrontano i registri trattando i valori come interi **senza segno** (unsigned, dove $0xFFFFFFFF = 4.294.967.295 > 0$).
  Per il confronto di indirizzi di memoria o byte ASCII positivi, si utilizzano i confronti unsigned.
.
In RISC-V, l'istruzione di salto incondizionato pseudo-istruzione `j label` a quale istruzione hardware reale corrisponde?
?
Corrisponde all'istruzione Jump and Link con registro di destinazione fissato a `x0`:
.
```assembly
jal x0, label
```
.
Poiché il registro di destinazione è `x0`, l'indirizzo di ritorno `PC + 4` viene scartato, realizzando un salto puro senza memorizzare il punto di ritorno.
