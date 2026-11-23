#flashcards/elettronica/parte_1_fondamenti_diodi

Cosa esprime la legge dell'azione di massa in un semiconduttore all'equilibrio termico?
?
Il prodotto tra la concentrazione degli elettroni $n$ e quella delle lacune $p$ è costante e uguale al quadrato della concentrazione intrinseca: $n \cdot p = n_i^2$.

---

In un cristallo di silicio drogato con donori ($N_D \gg n_i$), come si calcola la concentrazione dei portatori minoritari $p_n$?
?
$p_n = \frac{n_i^2}{N_D}$.

---

Cosa lega la relazione di Einstein in un semiconduttore non degenere?
?
Il rapporto tra coefficiente di diffusione e mobilità è uguale alla tensione termica $V_T = \frac{kT}{q}$: $\frac{D_n}{\mu_n} = \frac{D_p}{\mu_p} = V_T \approx 25.9\,\text{mV}$ a $300\,\text{K}$.

---

Come si esprime il potenziale di contatto (built-in) $V_0$ di una giunzione p-n all'equilibrio?
?
$$V_0 = V_T \ln\left(\frac{N_A N_D}{n_i^2}\right)$$

---

In una giunzione p-n fortemente asimmetrica ($p^+$-$n$, con $N_A \gg N_D$), da quale lato penetra prevalentemente la zona di svuotamento (SCR)?
?
Dalla parte meno drogata (regione $n$), poiché la neutralità di carica impone $N_A x_p = N_D x_n$.

---

Perché il potenziale di contatto $V_0$ di una giunzione p-n non è misurabile con un voltmetro esterno?
?
Le barriere di potenziale dei contatti metallo-semiconduttore ai due terminali compensano esattamente $V_0$ lungo la maglia chiusa, dando tensione netta nulla all'equilibrio.

---

Quanto vale il coefficiente di variazione termica della tensione diretta $V_D$ di un diodo al silicio a corrente costante?
?
Circa $-2\,\text{mV}/^\circ\text{C}$ (diminuisce al crescere della temperatura).

---

Qual è la differenza fisica e termica tra effetto Zener ($V_Z < 5.6\,\text{V}$) ed effetto Valanga ($V_Z > 5.6\,\text{V}$)?
?
L'effetto Zener è dovuto al tunneling quantistico (coefficiente termico negativo), mentre l'effetto Valanga è dovuto alla ionizzazione per urto (coefficiente termico positivo).

---

Quale fenomeno capacitivo domina in un diodo polarizzato inversamente rispetto a uno polarizzato direttamente?
?
In polarizzazione inversa domina la capacità di giunzione (svuotamento) $C_j$; in polarizzazione diretta domina la capacità di diffusione $C_d$ legata all'accumulo di portatori minoritari.

---

Perché il diodo Schottky è molto più veloce del diodo a giunzione p-n in commutazione?
?
Perché è una giunzione metallo-semiconduttore a portatori maggioritari, priva di accumulo di carica minoritaria e quindi con tempo di recupero inverso $t_{rr} \approx 0$.

---

Come si calcola la resistenza differenziale di piccolo segnale $r_d$ di un diodo polarizzato a corrente continua $I_D$?
?
$$r_d = \frac{\eta V_T}{I_D}$$

---

Quanto vale la tensione inversa di picco (PIV) richiesta al diodo in un raddrizzatore a singola semionda con filtro capacitivo $C$?
?
$\text{PIV} \ge 2 V_p$, poiché il condensatore resta carico a $+V_p$ mentre la sorgente scende a $-V_p$.

---

Come si dimezza la tensione di ripple $V_r$ a parità di $R_L$ e $C$ passando da singola semionda a ponte di Graetz?
?
Nel ponte di Graetz la frequenza di scarica raddoppia a $2f$, dimezzando il ripple ($V_r \approx \frac{V_{out,\max}}{2 f R_L C}$) con $\text{PIV} \ge V_p$.

---

In quale condizione di carico e alimentazione si dimensiona il limite massimo $R_{\text{serie},\max}$ di un regolatore Zener?
?
Nel caso peggiore di tensione di ingresso minima ($V_{S,\min}$) e corrente di carico massima ($I_{L,\max}$), garantendo $I_Z \ge I_{Z,\min}$.
