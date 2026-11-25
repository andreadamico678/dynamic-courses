#flashcards/computer-architecture/05_pipelined_processor/01_five_stage_pipeline

Quali sono i 5 stadi ordinati e i 4 registri interstadio della pipeline RISC-V classica?
?
`IF -> [IF/ID] -> ID -> [ID/EX] -> EX -> [EX/MEM] -> MEM -> [MEM/WB] -> WB`.

---

Come si calcola il periodo di clock minimo $T_{\text{clk,pipe}}$ di un processore a pipeline rispetto a $T_{\text{clk,single}}$ a ciclo singolo?
?
$$T_{\text{clk,pipe}} = \max_i\left(t_{\text{stage},i}\right) + t_{\text{setup}} + t_{\text{cq}}, \qquad T_{\text{clk,single}} = \sum_i t_{\text{stage},i}$$

---

In quale stadio della pipeline RISC-V le istruzioni `lw` e `sw` calcolano l'indirizzo effettivo `Reg[rs1] + Imm` e in quale accedono alla memoria dati?
?
Calcolo dell'indirizzo nella ALU nello stadio `EX`; lettura (`MemRead = 1`) o scrittura (`MemWrite = 1`) nella memoria dati nello stadio `MEM`.

---

Perché i segnali di controllo generati in `ID` (`MemRead`, `MemWrite`, `RegWrite`, `MemtoReg`) attraversano i registri interstadio invece di andare direttamente agli stadi `MEM` e `WB`?
?
Perché in ogni ciclo 5 istruzioni diverse occupano i 5 stadi: propagare i bit di controllo attraverso `ID/EX`, `EX/MEM` e `MEM/WB` li mantiene sincronizzati con la propria istruzione.

---

Quanti cicli di clock impiega una pipeline a $k = 5$ stadi priva di stalli per completare $\text{IC}$ istruzioni?
?
$N_{\text{cicli}} = \text{IC} + k - 1 = \text{IC} + 4$ cicli ($4$ cicli iniziali di riempimento più $1$ istruzione completata per ciclo).
