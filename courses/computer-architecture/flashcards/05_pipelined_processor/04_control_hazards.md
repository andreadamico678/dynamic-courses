#flashcards/computer-architecture/05_pipelined_processor/04_control_hazards

Qual è la penalità $P_{\text{stage}}$ (in cicli di flush sul salto preso) se il branch viene risolto nello stadio `ID`, `EX` oppure `MEM`?
?
Risoluzione in `ID` $\implies 1$ ciclo; risoluzione in `EX` $\implies 2$ cicli; risoluzione in `MEM` $\implies 3$ cicli ($P_{\text{stage}} = \text{indice stadio} - 1$).

---

Come cambia la formula di $\text{Stalls}_{\text{ctrl}}$ tra la politica statica **Predict-Untaken** e la politica **Solo Stalli**?
?
Predict-Untaken penalizza solo i salti presi ($f_{\text{branch}} \times p_{\text{taken}} \times P_{\text{stage}}$); Solo Stalli penalizza il $100\%$ dei branch ($f_{\text{branch}} \times 1.0 \times P_{\text{stage}}$).

---

Con forwarding attivo, quanti cicli di stallo extra genera una dipendenza `ALU(i) -> Branch(i+1)` a distanza $k = 1$ in funzione dello stadio di risoluzione del branch?
?
**$+1$ ciclo di stallo** se il branch è risolto anticipatamente nello stadio **`ID`**; **$0$ cicli di stallo** (dato esca da ignorare!) se il branch è risolto in **`EX` o `MEM`**.

---

Quali sono le 5 soluzioni architetturali/software per la gestione dei control hazard?
?
(1) Congelamento / Solo stalli, (2) Risoluzione anticipata del branch in `ID`, (3) Predizione statica (Predict-Untaken), (4) Predizione dinamica (contatore saturante a 2 bit + BTB), (5) *Delayed branching* del compilatore.
