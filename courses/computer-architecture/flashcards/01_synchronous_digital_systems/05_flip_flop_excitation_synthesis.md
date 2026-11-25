#flashcards/computer-architecture/01_synchronous_digital_systems/05_flip_flop_excitation_synthesis

Quanti flip-flop $k$ servono per codificare in binario $\lvert S_{\text{min}} \rvert$ stati e come si trattano gli stati binari inutilizzati?
?
Servono $k = \lceil \log_2 \lvert S_{\text{min}} \rvert \rceil$ flip-flop; tutti i $2^k - \lvert S_{\text{min}} \rvert$ codici inutilizzati vanno posti a *don't care* ($X$) su tutti gli ingressi di eccitazione e sull'uscita $u$.

---

Quali sono le eccitazioni $(J, K)$ di un flip-flop JK per le quattro transizioni $Q \to Q^*$?
?
$0 \to 0: (0, X)$, $\quad 0 \to 1: (1, X)$, $\quad 1 \to 0: (X, 1)$, $\quad 1 \to 1: (X, 0)$.

---

Quali sono le eccitazioni $(S, R)$ di un flip-flop SR per le quattro transizioni $Q \to Q^*$?
?
$0 \to 0: (0, X)$, $\quad 0 \to 1: (1, 0)$, $\quad 1 \to 0: (0, 1)$, $\quad 1 \to 1: (X, 0)$ (vincolo $S \cdot R = 0$: nessun *don't care* sui cambi di stato).

---

Qual è la regola di eccitazione di un flip-flop T (Toggle) per una transizione $Q \to Q^*$?
?
$T = Q \oplus Q^*$: vale $T = 1$ quando il bit commuta ($0 \to 1$ o $1 \to 0$) e $T = 0$ quando rimane costante ($0 \to 0$ o $1 \to 1$).

---

Qual è la regola di eccitazione di un flip-flop D (Data) per una transizione $Q \to Q^*$?
?
$D = Q^*$: l'ingresso $D$ copia direttamente il bit di stato futuro desiderato.
