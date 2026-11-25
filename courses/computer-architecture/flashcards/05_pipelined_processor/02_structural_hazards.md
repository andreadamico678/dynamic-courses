#flashcards/computer-architecture/05_pipelined_processor/02_structural_hazards

Quale contributo di stallo strutturale introduce una memoria unificata a singola porta (*una sola memoria per dati e istruzioni*) sul calcolo di $\text{CPI}_{\text{pipe}}$?
?
$$\text{Stalls}_{\text{struct}} = \left(f_{\text{load}} + f_{\text{store}}\right) \times 1$$
Ogni `lw` e `sw` in stadio `MEM` collide nello stesso ciclo con il prelievo istruzione in stadio `IF`.

---

Qual è il contributo $\text{Stalls}_{\text{struct}}$ della memoria quando sono presenti due memorie distinte per istruzioni e dati (architettura Harvard L1)?
?
$\text{Stalls}_{\text{struct}} = 0$, perché `I-Cache` (servita a `IF`) e `D-Cache` (servita a `MEM`) operano in parallelo su porte e bus indipendenti.

---

Come il *double-pumping* (*split-cycle*) del Register File elimina sia il conflitto strutturale `WB`/`ID` sia lo stallo RAW a distanza $k = 3$?
?
La scrittura (`WB`) avviene nella prima metà del ciclo di clock e la lettura (`ID`) nella seconda metà dello stesso ciclo, fornendo il dato appena aggiornato con $0$ cicli di stallo.
