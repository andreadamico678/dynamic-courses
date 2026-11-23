#flashcards/automatica/02_01_laplace_primitives

Qual è la definizione integrale della trasformata di Laplace monolatera $\mathcal{L}\{f(t)\}$ per un segnale causale $f(t)$?
?
$$F(s) = \int_0^\infty f(t) e^{-st} \, dt, \quad s = \sigma + j\omega \in \mathbb{C}$$

Qual è la trasformata di Laplace dell'impulso unitario di Dirac $\delta(t)$?
?
$$\mathcal{L}\{\delta(t)\} = 1$$

Qual è la trasformata di Laplace del gradino unitario di Heaviside $1(t)$?
?
$$\mathcal{L}\{1(t)\} = \frac{1}{s}$$

Qual è la trasformata di Laplace del segnale rampa unitaria $t \cdot 1(t)$?
?
$$\mathcal{L}\{t \cdot 1(t)\} = \frac{1}{s^2}$$

Qual è la trasformata di Laplace dell'esponenziale reale o complesso $e^{at} \cdot 1(t)$?
?
$$\mathcal{L}\{e^{at} \cdot 1(t)\} = \frac{1}{s - a}$$

Qual è la trasformata di Laplace della derivata prima $\dot{f}(t)$ a condizioni iniziali non nulle?
?
$$\mathcal{L}\left\{\frac{df(t)}{dt}\right\} = s F(s) - f(0^-)$$

Qual è la trasformata di Laplace dell'integrale temporale $\int_0^t f(\tau) d\tau$?
?
$$\mathcal{L}\left\{\int_0^t f(\tau) d\tau\right\} = \frac{F(s)}{s}$$

Qual è l'enunciato del teorema del ritardo temporale (*time-shift theorem*) $\mathcal{L}\{f(t - \tau) 1(t - \tau)\}$ per $\tau > 0$?
?
$$\mathcal{L}\{f(t - \tau) 1(t - \tau)\} = e^{-s\tau} F(s)$$

Qual è l'enunciato del teorema della traslazione in frequenza (*frequency-shift theorem*) $\mathcal{L}\{e^{at} f(t)\}$?
?
$$\mathcal{L}\{e^{at} f(t)\} = F(s - a)$$

Sotto quale ipotesi vincolante è applicabile il Teorema del Valore Finale $\lim_{t \to \infty} f(t) = \lim_{s \to 0} s F(s)$?
?
Tutti i poli della funzione $s F(s)$ devono trovarsi rigorosamente nel semipiano sinistro aperto ($\operatorname{Re}(s) < 0$).
