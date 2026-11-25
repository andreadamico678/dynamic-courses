#flashcards/computer-architecture/05_pipelined_processor/03_data_hazards

Senza data forwarding (ma con Register File *double-pumped*), quanti cicli di stallo comporta una dipendenza RAW a distanza $k = 1$, $k = 2$ e $k \ge 3$?
?
Distanza $k = 1 \implies 2$ stalli; distanza $k = 2 \implies 1$ stallo; distanza $k \ge 3 \implies 0$ stalli.

---

Con data forwarding completo attivo, quali dipendenze RAW sui dati generano stalli e quanti cicli costano?
?
Esclusivamente il **Load-Use** (`lw` seguita a distanza $k = 1$ da un'istruzione che usa `rd` in `EX`) costa **$1$ ciclo di stallo**; le dipendenze `ALU -> ALU` e `ALU -> Load/Store` costano **$0$ stalli**.

---

Qual è la condizione booleana della Forwarding Unit per attivare `ForwardA = 10` (inoltro da `EX/MEM`)?
?
`EX/MEM.RegWrite == 1` AND `EX/MEM.RegisterRd != 0` AND `EX/MEM.RegisterRd == ID/EX.RegisterRs1`.

---

Perché la condizione per `ForwardA = 01` (inoltro da `MEM/WB`) deve escludere il caso di match su `EX/MEM` e imporre `RegisterRd != 0`?
?
`EX/MEM` ha priorità su `MEM/WB` perché contiene il risultato dell'istruzione più recente; `RegisterRd != 0` impedisce di sovrascrivere con valori non nulli la lettura del registro cablato `x0 = 0`.

---

Qual è la condizione della Hazard Detection Unit in `ID` per rilevare un Load-Use hazard e quali 3 azioni esegue per inserire 1 bolla?
?
Se `ID/EX.MemRead == 1` AND `ID/EX.RegisterRd != 0` AND (`ID/EX.RegisterRd == IF/ID.RegisterRs1` OR `ID/EX.RegisterRd == IF/ID.RegisterRs2`): azzera i segnali di controllo verso `ID/EX` (`NOP`), blocca `IF/IDWrite = 0` e blocca `PCWrite = 0`.

---

Qual è la soluzione software a costo hardware zero per eliminare gli stalli da Load-Use?
?
L'*instruction scheduling* del compilatore: spostare un'istruzione indipendente nello slot immediatamente successivo alla `lw` (aggiornando eventuali offset di indirizzo).
