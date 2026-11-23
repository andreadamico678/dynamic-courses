#flashcards/elettronica/parte_4_amplificatori_frequenza

Come si trattano l'alimentazione $V_{DD}$ e i condensatori grandi ($C_G, C_D, C_S$) nel modello di piccolo segnale a centro banda?
?
$V_{DD}$ diventa massa AC (cortocircuito verso massa) e i condensatori grandi di accoppiamento e bypass diventano cortocircuiti ideali.

---

Quali sono guadagno $A_v$, $R_{in}$ e $R_{out}$ dello stadio Common Source base a centro banda?
?
$A_v = -g_m (R_D \parallel r_o \parallel R_L)$, $R_{in} = R_1 \parallel R_2$, $R_{out} = R_D \parallel r_o$.

---

Quali effetti produce una resistenza di degenerazione $R_S$ non bypassata nello stadio Common Source?
?
Riduce e stabilizza il guadagno ($A_v \approx -\frac{g_m (R_D \parallel R_L)}{1 + g_m R_S}$ trascurando $r_o$), linearizza lo stadio e moltiplica la resistenza vista nel Drain ($R_{out,\text{drain}} \approx r_o(1 + g_m R_S)$).

---

Quali sono le proprietà distintive dello stadio Common Drain (Source Follower)?
?
Guadagno non invertente leggermente inferiore a $1$ ($A_v = \frac{g_m R_{Leq}}{1 + g_m R_{Leq}}$), elevata impedenza d'ingresso e bassissima impedenza d'uscita ($R_{out} \approx \frac{1}{g_m} \parallel R_S$), ideale come buffer di tensione.

---

Quali sono le proprietà distintive dello stadio Common Gate (CG)?
?
Bassa resistenza d'ingresso ($R_{in} \approx \frac{1}{g_m} \parallel R_S$), guadagno di tensione non invertente ($A_v \approx +g_m (R_D \parallel R_L)$), funzione di buffer di corrente e assenza di effetto Miller su $C_{gd}$.

---

Come si esprime la resistenza d'uscita approssimata di uno specchio di corrente Cascode a 4 MOSFET?
?
$$R_{out} \approx g_m r_o^2$$

---

Cosa stima il metodo delle costanti di tempo in cortocircuito (SCTC) e come combina le costanti di tempo?
?
Stima la frequenza di taglio inferiore $f_L$ dovuta ai condensatori grandi esterni, sommando gli **inversi** delle costanti di tempo: $f_L \approx \frac{1}{2\pi}\sum_j \frac{1}{R_{j,sc} C_j}$.

---

Cosa enuncia il Teorema di Miller applicato alla capacità $C_{gd}$ di uno stadio Common Source con guadagno invertente $A_v = -|A_v|$?
?
La capacità di retroazione $C_{gd}$ vista dal nodo d'ingresso equivale a una capacità verso massa amplificata di fattore $(1 + |A_v|)$: $C_M = C_{gd}(1 + |A_v|)$.

---

Cosa stima il metodo delle costanti di tempo a circuito aperto (OCTC) e come combina le costanti di tempo?
?
Stima la frequenza di taglio superiore $f_H$ dovuta alle capacità parassite interne, sommando direttamente le costanti di tempo: $f_H \approx \frac{1}{2\pi \sum_k R_{k0} C_k}$.
