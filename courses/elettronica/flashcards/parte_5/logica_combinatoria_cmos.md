#flashcards/elettronica/parte_5_logica_cmos

Come si definiscono i margini di rumore statici $NM_H$ e $NM_L$ a partire dalla curva VTC?
?
$NM_H = V_{OH} - V_{IH}$ e $NM_L = V_{IL} - V_{OL}$, dove $V_{IL}$ e $V_{IH}$ sono i punti della VTC in cui la pendenza vale $\frac{dv_{out}}{dv_{in}} = -1$.

---

Qual è la formula della potenza dinamica dissipata da un nodo CMOS che commuta capacità $C_L$ alla frequenza $f$?
?
$$P_{\text{dyn}} = \alpha C_L V_{DD}^2 f$$

---

Qual è la formula analitica della soglia logica $V_M$ di un invertitore CMOS con $r = \sqrt{K_n / K_p}$?
?
$$V_M = \frac{V_{DD} - |V_{TP}| + r V_{TN}}{1 + r}$$

---

Quale rapporto geometrico $(W/L)_p / (W/L)_n$ rende simmetrico l'invertitore CMOS ($K_p = K_n$)?
?
$$\frac{(W/L)_p}{(W/L)_n} = \frac{\mu_n}{\mu_p} \approx 2.5 \div 3$$

---

In quale regione operativa della VTC entrambi i transistori dell'invertitore CMOS sono in saturazione e la corrente di cortocircuito è massima?
?
Nella regione centrale attorno alla soglia di commutazione $v_{in} = V_M$.

---

Come si dimensionano $k$ transistori identici collegati in serie nella rete PDN o PUN per mantenere la stessa resistenza equivalente dell'invertitore di riferimento?
?
Si moltiplica la larghezza di ciascun transistore in serie per $k$: $(W/L)_{\text{serie}} = k \cdot (W/L)_{\text{ref}}$.

---

Perché nella tecnologia CMOS la porta NAND è tecnologicamente preferita alla porta NOR a parità di numero di ingressi?
?
Perché la NAND mette in serie i transistori NMOS (più veloci e stretti) e in parallelo i PMOS, mentre la NOR mette in serie i PMOS (già $2.5\text{--}3\times$ più larghi), causando un forte aumento di area e capacità parassite.

---

Qual è il fattore di rastremazione teorico ottimo $f_{\text{opt}}$ di una catena di buffer CMOS scalati che pilota un grande carico $C_L$?
?
$f_{\text{opt}} = e \approx 2.718$, con numero ottimo di stadi $N_{\text{opt}} = \ln(C_L / C_{in})$ (in pratica industriale si sceglie spesso $f = 3 \div 4$, rispettando la parità di $N$).
