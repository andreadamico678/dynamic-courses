#flashcards/automatica/03_03_lagrange_convolution

Qual è la Formula di Lagrange completa per lo stato $\mathbf{x}(t)$ di un sistema LTI continuo con stato iniziale $\mathbf{x}(0)$ e ingresso $\mathbf{u}(t)$?
?
$$\mathbf{x}(t) = e^{\mathbf{A}t} \mathbf{x}(0) + \int_0^t e^{\mathbf{A}(t-\tau)} \mathbf{B} \mathbf{u}(\tau) \, d\tau$$

Qual è la Formula di Lagrange per l'uscita $\mathbf{y}(t)$ di un sistema LTI continuo?
?
$$\mathbf{y}(t) = \mathbf{C} e^{\mathbf{A}t} \mathbf{x}(0) + \mathbf{C} \int_0^t e^{\mathbf{A}(t-\tau)} \mathbf{B} \mathbf{u}(\tau) \, d\tau + \mathbf{D} \mathbf{u}(t)$$

Nel dominio temporale, a quale operazione corrisponde l'evoluzione forzata dell'uscita $\mathbf{y}_f(t)$ per un sistema SISO con $D = 0$?
?
Alla convoluzione temporale tra la risposta all'impulso $w(t)$ del sistema e l'ingresso applicato $u(t)$:
$$y_f(t) = (w * u)(t) = \int_0^t w(t - \tau) u(\tau) \, d\tau$$

Come si calcola la risposta indiciale (al gradino unitario $u(t) = 1(t)$) $y_{step}(t)$ a partire dalla risposta all'impulso $w(t)$?
?
Tramite integrazione temporale:
$$y_{step}(t) = \int_0^t w(\tau) \, d\tau \iff w(t) = \frac{d}{dt} y_{step}(t)$$

Nel dominio di Laplace, come si calcola l'evoluzione completa dell'uscita $Y(s)$ separando la componente libera da quella forzata?
?
$$Y(s) = \underbrace{\mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1} \mathbf{x}(0)}_{Y_l(s) \text{ (libera)}} + \underbrace{\left[ \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + \mathbf{D} \right] U(s)}_{Y_f(s) \text{ (forzata)} = W(s)U(s)}$$
