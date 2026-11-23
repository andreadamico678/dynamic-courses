#flashcards/automatica/05_03_non_minimum_phase

Qual è la definizione formale di un sistema a fase non minima (*non-minimum phase system*)?
?
Un sistema dinamico LTI che presenta almeno uno zero nel semipiano destro complesso ($\operatorname{Re}(z) > 0$) e/o un tempo morto di trasporto puro ($e^{-s\tau}$ con $\tau > 0$).

Qual è il comportamento qualitativo nel tempo della risposta al gradino di un sistema con uno zero reale a parte reale positiva?
?
Manifesta una sottoelongazione iniziale (*initial undershoot*): la risposta transitoria parte inizialmente in direzione opposta rispetto al valore asintotico di regime permanente.

Qual è l'effetto combinato di modulo e fase introdotto nei diagrammi di Bode da uno zero nel semipiano destro $(1 - s/\omega_z)$ con $\omega_z > 0$?
?
Incrementa il modulo con pendenza $+20\text{ dB/decade}$ (come uno zero standard), ma introduce un ritardo di fase di $-90^\circ$ (comportandosi sulla fase esattamente come un polo instabile).

Perché i sistemi a fase non minima sono considerati intrinsecamente difficili da controllare in anello chiuso?
?
Perché lo zero a destra erode il margine di fase senza ridurre il guadagno, imponendo un limite superiore invalicabile alla pulsazione di attraversamento e alla banda passante massima del sistema a ciclo chiuso.

Qual è il contributo di modulo e di fase introdotto da un ritardo puro di trasporto $e^{-s\tau}$ nei diagrammi di Bode?
?
Modulo identicamente nullo in $\text{dB}$ su tutte le frequenze ($20\log_{10}|e^{-j\omega\tau}| = 0\text{ dB}$), ma ritardo di fase linearmente divergente: $\Delta\phi(\omega) = -\omega\tau\text{ rad} = -\frac{180}{\pi}\omega\tau\text{ gradi}$.

Come viene linearmente approssimato un ritardo finito $e^{-s\tau}$ con funzioni razionali per l'analisi di stato?
?
Mediante l'approssimazione razionale di Padé del primo ordine:
$$e^{-s\tau} \approx \frac{1 - s\frac{\tau}{2}}{1 + s\frac{\tau}{2}}$$
che introduce esplicitamente uno zero a fase non minima in $s = +2/\tau$.
