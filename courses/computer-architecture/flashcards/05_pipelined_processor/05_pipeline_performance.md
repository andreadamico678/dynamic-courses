#flashcards/computer-architecture/05_pipelined_processor/05_pipeline_performance

Qual è l'equazione generale di $\text{CPI}_{\text{pipe}}$ per un processore scalare a 5 stadi?
?
$$\text{CPI}_{\text{pipe}} = 1 + \sum_i \left(f_i \times \text{Penalty}_i\right) = 1 + \text{Stalls}_{\text{struct}} + \text{Stalls}_{\text{data}} + \text{Stalls}_{\text{ctrl}}$$

---

Come cambia la frequenza di Load-Use tra *"il 25% delle istruzioni ALU dipende da una Load precedente"* e *"il 25% delle istruzioni Load è seguito da una ALU dipendente"*?
?
Nel primo caso (percentuale riferita al consumatore) si calcola $f_{\text{ALU}} \times 0.25$; nel secondo caso (percentuale riferita al produttore) si calcola $f_{\text{Load}} \times 0.25$.

---

Come si esprime lo speedup reale $S$ di un processore a pipeline rispetto a un processore a ciclo singolo a parità di $\text{IC}$ ($\text{IC} \gg 5$)?
?
$$S = \frac{T_{\text{exec,single}}}{T_{\text{exec,pipe}}} = \frac{1 \times T_{\text{clk,single}}}{\text{CPI}_{\text{pipe}} \times T_{\text{clk,pipe}}}$$
