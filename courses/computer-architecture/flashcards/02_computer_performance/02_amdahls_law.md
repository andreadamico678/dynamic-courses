#flashcards/computer_architectures/computer_performance/amdahls_law

Qual è la formula della Legge di Amdahl per lo speedup globale $S_{\text{tot}}$?
?
$$S_{\text{tot}} = \frac{T_{\text{old}}}{T_{\text{new}}} = \frac{1}{(1 - F) + \dfrac{F}{S}}$$

---

Come si ricava la frazione temporale $F$ della classe $k$ per la Legge di Amdahl a partire da un instruction mix $(f_i, \text{CPI}_i)$?
?
$$F = \frac{f_k \cdot \text{CPI}_k}{\text{CPI}_{\text{old}}}$$
(frazione del tempo/cicli originali, mai la semplice percentuale di istruzioni $f_k$ se $\text{CPI}_k \neq \text{CPI}_{\text{old}}$).

---

Qual è il limite asintotico teorico dello speedup globale per $S \to \infty$ nella Legge di Amdahl?
?
$$S_{\max} = \lim_{S \to \infty} S_{\text{tot}} = \frac{1}{1 - F}$$

---

Quale condizione di fattibilità va verificata prima di invertire la Legge di Amdahl rispetto al fattore locale $S$ per un obiettivo $S_{\text{target}}$?
?
$$S_{\text{target}} < \frac{1}{1 - F}$$
Se $S_{\text{target}} \ge \frac{1}{1 - F}$, l'obiettivo supera il tetto asintotico imposto dalla frazione seriale $(1 - F)$ ed è fisicamente impossibile ($S \le 0$).

---

Qual è la formula inversa della Legge di Amdahl per calcolare l'accelerazione locale $S$ necessaria a raggiungere $S_{\text{target}} < \frac{1}{1 - F}$?
?
$$S = \frac{F}{\dfrac{1}{S_{\text{target}}} - (1 - F)}$$

---

Qual è la formula inversa della Legge di Amdahl per trovare la frazione temporale $F$ da accelerare dato un fattore locale fisso $S > 1$ e un obiettivo $S_{\text{target}} \le S$?
?
$$F = \frac{1 - \dfrac{1}{S_{\text{target}}}}{1 - \dfrac{1}{S}}$$
