#flashcards/elettronica/parte_3_amplificatori_operazionali

Quali condizioni garantiscono la validità del principio di cortocircuito virtuale ($v_+ \approx v_-$) in un Op-Amp?
?
Guadagno differenziale ad anello aperto molto elevato ($A_0 \to \infty$), retroazione **negativa** verso il morsetto invertente e funzionamento in zona lineare (assenza di saturazione).

---

Quanto valgono il guadagno di tensione $A_v$ e la resistenza d'ingresso $R_{in}$ dell'amplificatore invertente ideale?
?
$A_v = -\frac{R_2}{R_1}$ e $R_{in} = R_1$ (grazie alla massa virtuale sul morsetto invertente).

---

Quanto valgono il guadagno di tensione $A_v$ e la resistenza d'ingresso $R_{in}$ dell'amplificatore non invertente ideale?
?
$A_v = 1 + \frac{R_2}{R_1}$ e $R_{in} \to \infty$.

---

Quale vantaggio tecnologico rende la scala $R\text{-}2R$ superiore al DAC a resistori pesati in binario?
?
La scala $R\text{-}2R$ usa solo due valori resistivi ($R$ e $2R$) indipendentemente dal numero di bit $N$, evitando rapporti resistivi esponenziali $2^{N-1}$ impossibili da realizzare con precisione su silicio.

---

Perché nell'integratore di Miller reale si inserisce un resistore di perdita $R_2$ in parallelo al condensatore $C$?
?
Per chiudere l'anello di retroazione negativa in DC (limitando il guadagno statico a $-R_2/R_1$) ed evitare che $V_{OS}$ e $I_B$ portino l'uscita in saturazione.

---

In un amplificatore differenziale (sottrattore), come si definisce il rapporto di reiezione di modo comune ($\text{CMRR}$)?
?
$$\text{CMRR}_{\text{dB}} = 20 \log_{10}\left|\frac{A_d}{A_{cm}}\right|$$

---

Qual è il valore ottimale del resistore di compensazione $R_3$ sul morsetto non invertente per annullare l'errore dovuto a $I_B$ (quando $I_{B+} = I_{B-}$)?
?
$R_3 = R_1 \parallel R_2$.

---

In un Op-Amp a polo dominante con guadagno-banda costante $\text{GBW}$, come si calcola la banda a $-3\,\text{dB}$ ad anello chiuso?
?
$f_{-3\,\text{dB}} = \frac{\text{GBW}}{1 + R_2/R_1}$ (si divide per il guadagno di rumore $1/\beta$, anche nello stadio invertente).

---

Qual è la frequenza massima di piena potenza $f_M$ prima che insorga distorsione triangolare da Slew-Rate ($SR$) per un segnale sinusoidale di ampiezza $V_p$?
?
$$f_M = \frac{SR}{2\pi V_p}$$
