#flashcards/automatica/05_01_bode_magnitude

Qual è la forma canonica costante di Bode (*Bode standard form*) per una funzione di trasferimento $G(s)$?
?
$$G(s) = \frac{K_B}{s^g} \frac{\prod (1 + s\tau_i)}{\prod (1 + s T_j)}$$
dove $K_B$ è il guadagno di Bode e $g$ è il tipo del sistema (numero di integratori nell'origine).

A quale quota in decibel passa l'asintoto a bassa frequenza dovuto a $K_B / s^g$ alla pulsazione normalizzata $\omega = 1\text{ rad/s}$?
?
Passa esattamente a:
$$|G(j\cdot 1)|_{\text{dB}} = 20\log_{10}|K_B|$$

Quale pendenza introduce nel diagramma dei moduli di Bode un termine integratore nell'origine $1/s^g$?
?
Una pendenza costante di $-20 \cdot g\text{ dB/decade}$.

Quale pendenza introduce nel diagramma dei moduli di Bode un polo reale stabile $(1 + sT)$ a partire dalla sua pulsazione di taglio $\omega_p = 1/|T|$?
?
Una variazione di pendenza di $-20\text{ dB/decade}$ (piega verso il basso).

Quale pendenza introduce nel diagramma dei moduli di Bode uno zero reale $(1 + s\tau)$ a partire dalla sua pulsazione di taglio $\omega_z = 1/|\tau|$?
?
Una variazione di pendenza di $+20\text{ dB/decade}$ (piega verso l'alto).

Qual è l'errore massimo tra il diagramma asintotico di ampiezza e il diagramma reale in corrispondenza della pulsazione di taglio di un polo reale semplice?
?
L'errore è esattamente pari a $-3\text{ dB}$ ($20\log_{10}(1/\sqrt{2}) \approx -3.01\text{ dB}$).
