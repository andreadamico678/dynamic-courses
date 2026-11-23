#flashcards/elettronica/parte_2_transistori_mos

Quali sono le tre regioni operative del condensatore MOS su substrato di tipo p al crescere di $V_{GB}$?
?
Accumulazione ($V_{GB} < 0$), svuotamento ($0 < V_{GB} < V_{th}$) e forte inversione ($V_{GB} \ge V_{th}$, potenziale superficiale $\phi_s \ge 2\phi_F$).

---

Che effetto produce una tensione positiva Source-Body ($V_{SB} > 0$) sulla tensione di soglia $V_{th}$ di un NMOS?
?
Aumenta $V_{th}$ secondo la legge dell'effetto body: $V_{th} = V_{th0} + \gamma\left(\sqrt{2\phi_F + V_{SB}} - \sqrt{2\phi_F}\right)$.

---

Qual è la condizione esatta sulle tensioni perché un NMOS operi in saturazione (pinch-off)?
?
$V_{GS} \ge V_{th}$ e $V_{DS} \ge V_{GS} - V_{th}$ ($V_{DS} \ge V_{OV}$).

---

Qual è l'equazione della corrente di Drain $I_D$ di un NMOS in regione di triodo (trascurando $\lambda$)?
?
$$I_D = K_n \left[(V_{GS} - V_{th})V_{DS} - \frac{1}{2}V_{DS}^2\right]$$

---

Qual è l'equazione della corrente di Drain $I_D$ di un NMOS in regione di saturazione con modulazione della lunghezza di canale $\lambda$?
?
$$I_D = \frac{1}{2} K_n (V_{GS} - V_{th})^2 (1 + \lambda V_{DS})$$

---

Quali sono le tre formulazioni equivalenti della transconduttanza $g_m$ del MOSFET in saturazione?
?
$$g_m = K_n V_{OV} = \sqrt{2 K_n I_D} = \frac{2 I_D}{V_{OV}}$$

---

Come si esprime il guadagno di tensione intrinseco massimo $\mu_f$ di un singolo MOSFET?
?
$$\mu_f = g_m r_o = \frac{g_m}{\lambda I_D}$$

---

Quanto valgono le capacità intrinseche $C_{gs}$ e $C_{gd}$ di un MOSFET in regione di saturazione?
?
$C_{gs} = \frac{2}{3} C_{ox}'' W L + C_{GSO} W$ e $C_{gd} = C_{GDO} W$ (solo capacità di overlap).

---

Come scala la frequenza di transizione intrinseca $f_T$ del MOSFET rispetto alla lunghezza di canale $L$?
?
Inversamente proporzionale al quadrato di $L$: $f_T = \frac{g_m}{2\pi(C_{gs}+C_{gd})} \propto \frac{1}{L^2}$.

---

Perché nella polarizzazione DC del MOSFET la rete a 4 resistori (con $R_S$) è molto più stabile di quella a 3 resistori?
?
Perché $R_S$ introduce una retroazione negativa locale: se $I_D$ tende a crescere, cresce $V_S = I_D R_S$, si riduce $V_{GS} = V_G - I_D R_S$ e la corrente viene stabilizzata contro le dispersioni di $K_n$ e $V_{th}$.

---

Quando si risolve l'equazione quadratica di polarizzazione $(V_G - I_D R_S - V_{th})^2 = \frac{2 I_D}{K_n}$, quale delle due radici è fisicamente valida?
?
Unicamente la radice che soddisfa $V_{GS} = V_G - I_D R_S > V_{th}$ (tipicamente la radice minore).
