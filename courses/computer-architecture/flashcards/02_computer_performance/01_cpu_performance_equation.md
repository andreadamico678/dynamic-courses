#flashcards/computer_architectures/computer_performance/cpu_performance_equation

Qual è l'equazione fondamentale del tempo di esecuzione della CPU ($T_{\text{exec}}$)?
?
$$T_{\text{exec}} = \text{IC} \times \text{CPI} \times T_{\text{clk}} = \frac{\text{IC} \times \text{CPI}}{f_{\text{clk}}}$$

---

Come si calcola il $\text{CPI}$ medio pesato a partire dall'instruction mix di $m$ classi di istruzioni?
?
$$\text{CPI} = \sum_{i=1}^{m} f_i \cdot \text{CPI}_i, \qquad \text{con } f_i = \frac{\text{IC}_i}{\text{IC}} \text{ e } \sum_{i=1}^{m} f_i = 1$$

---

Come si calcola lo speedup relativo $S$ di una macchina nuova rispetto a una macchina di riferimento sullo stesso programma?
?
$$S = \frac{T_{\text{exec,old}}}{T_{\text{exec,new}}} = \frac{\text{IC}_{\text{old}} \cdot \text{CPI}_{\text{old}} \cdot T_{\text{clk,old}}}{\text{IC}_{\text{new}} \cdot \text{CPI}_{\text{new}} \cdot T_{\text{clk,new}}}$$

---

Cosa può accadere al $\text{CPI}$ medio se un compilatore elimina istruzioni ALU veloci da $1$ ciclo, pur riducendo $T_{\text{exec}}$?
?
Il $\text{CPI}$ medio aumenta perché $\text{IC}_{\text{new}}$ diminuisce e cresce il peso relativo delle istruzioni più lente (Load, Store, Branch) rimaste nel programma; bisogna quindi ricalcolare $\text{CPI}_{\text{new}} = C_{\text{tot,new}} / \text{IC}_{\text{new}}$ senza riusare le vecchie frequenze $f_i$.

---

Perché la metrica $\text{MIPS} = \frac{f_{\text{clk}}}{\text{CPI} \times 10^6}$ è ingannevole nel confronto tra architetture o livelli di ottimizzazione diversi?
?
Perché trascura $\text{IC}$: un'architettura o compilazione che esegue più istruzioni semplici può mostrare un $\text{MIPS}$ maggiore pur impiegando più tempo totale $T_{\text{exec}}$.
