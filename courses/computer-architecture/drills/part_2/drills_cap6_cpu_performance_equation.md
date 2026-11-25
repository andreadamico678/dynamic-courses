#drills/computer_architectures/02_01_cpu_performance
.
Qual è la formula fondamentale dell'**Equazione delle Prestazioni della CPU** (Iron Law) che esprime il tempo di esecuzione CPU ($T_{\text{CPU}}$)?
?
$$T_{\text{CPU}} = I \times \text{CPI} \times T_c = \frac{I \times \text{CPI}}{f}$$
dove:
.
- $I$: Numero totale di istruzioni dinamiche eseguite dal programma (Instruction Count).
- $\text{CPI}$: Cicli di clock medi per istruzione (Cycles Per Instruction).
- $T_c$: Periodo del segnale di clock (Clock Cycle Time).
- $f = 1/T_c$: Frequenza di clock del processore (Clock Frequency).
.
Un processore con frequenza di clock $f = 2.5\text{ GHz}$ esegue un programma. Qual è il periodo di clock $T_c$ in nanosecondi e picosecondi?
?
$$T_c = \frac{1}{f} = \frac{1}{2.5 \times 10^9\text{ Hz}} = 0.4 \times 10^{-9}\text{ s} = 0.4\text{ ns} = 400\text{ ps}$$
.
Dato il seguente instruction mix di un programma:
.
- Istruzioni ALU: $60\%$, ciascuna richiede $1$ ciclo
- Istruzioni Load: $20\%$, ciascuna richiede $2$ cicli
- Istruzioni Store: $10\%$, ciascuna richiede $2$ cicli
- Istruzioni Branch: $10\%$, ciascuna richiede $3$ cicli
  Qual è il valore medio del $\text{CPI}$?
  ?
  Applicando la media pesata del CPI sulle frequenze relative:
  $$\text{CPI} = \sum_{k} f_k \times \text{CPI}_k$$
  $$\text{CPI} = (0.60 \times 1) + (0.20 \times 2) + (0.10 \times 2) + (0.10 \times 3)$$
  $$\text{CPI} = 0.60 + 0.40 + 0.20 + 0.30 = 1.50\text{ cicli/istruzione}$$
.
Se un ottimizzatore del compilatore riduce il numero di istruzioni ALU del $30\%$, quale fattore dell'equazione delle prestazioni viene modificato direttamente, e cosa può succedere al CPI medio?
?
.
1. Viene ridotto direttamente l'**Instruction Count ($I$)**.
2. Il **$\text{CPI}$ medio può aumentare**, perché riducendo le istruzioni veloci ad 1 ciclo (ALU), aumenta il peso percentuale delle istruzioni più lente (Load, Store, Branch).
   Nonostante l'aumento del CPI, il tempo CPU totale generalmente diminuisce se la riduzione di $I$ prevale sull'aumento del CPI.
.
Come si definisce lo **Speedup** ($S$) di una macchina B rispetto a una macchina A quando eseguono lo stesso programma?
?
Lo Speedup è il rapporto inverso tra i tempi di esecuzione:
$$S = \frac{\text{Tempo}_{\text{CPU, A}}}{\text{Tempo}_{\text{CPU, B}}} = \frac{\text{Prestazioni}_B}{\text{Prestazioni}_A}$$
Se $S > 1$, la macchina B è più veloce della macchina A di un fattore $S$.
Se $S = 1.25$, la macchina B è il $25\%$ più veloce della macchina A.
.
Perché la metrica MIPS (Million Instructions Per Second $= \frac{I}{T_{\text{CPU}} \times 10^6} = \frac{f}{\text{CPI} \times 10^6}$) è inaffidabile per confrontare architetture con Instruction Set diversi?
?
Perché il numero di istruzioni $I$ necessarie per completare lo stesso compito varia radicalmente tra architetture diverse (ad esempio, un processore CISC x86 esegue meno istruzioni ma con CPI più alto rispetto a un processore RISC-V).
Una macchina con MIPS più alto può richiedere più tempo complessivo se deve eseguire un numero di istruzioni sproporzionatamente maggiore.
