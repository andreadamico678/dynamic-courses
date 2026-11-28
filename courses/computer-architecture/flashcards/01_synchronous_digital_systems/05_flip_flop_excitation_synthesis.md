#flashcards/computer-architecture/01_synchronous_digital_systems/05_flip_flop_excitation_synthesis

How many flip-flops $k$ are required to binary-encode $\lvert S_{\text{min}} \rvert$ minimal states, and how are leftover codes handled?
?
$k = \lceil \log_2 \lvert S_{\text{min}} \rvert \rceil$ flip-flops; all $2^k - \lvert S_{\text{min}} \rvert$ unused state codes are marked as **Don't Cares (`X`)** in every excitation and output K-map.

---

What are the **JK Flip-Flop** excitation pairs $(J, K)$ for the four transitions $Q \to Q^+$?
?
- $0 \to 0$: `(0, X)`
- $0 \to 1$: `(1, X)`
- $1 \to 0$: `(X, 1)`
- $1 \to 1$: `(X, 0)`

---

What are the **SR Flip-Flop** excitation pairs $(S, R)$ for the four transitions $Q \to Q^+$, and what input pair is forbidden?
?
- $0 \to 0$: `(0, X)`
- $0 \to 1$: `(1, 0)` (no Don't Care!)
- $1 \to 0$: `(0, 1)` (no Don't Care!)
- $1 \to 1$: `(X, 0)`
Forbidden input: **$S = 1, R = 1$** ($S \cdot R = 0$ required).

---

Why do JK flip-flops typically produce simpler combinational SOP logic than SR or D flip-flops?
?
Every JK transition includes one Don't Care (`X`)—$50\%$ of all entries—allowing larger K-map groupings than SR (which lacks `X` on $0 \to 1$ and $1 \to 0$) or D ($D = Q^+$, zero `X`s).

---

In a Mealy FSM excitation table, which state variables index the output $u$ K-map row?
?
The **present state** bits $y_{k-1} \dots y_0$ together with input $X$ (`u(present_state, X)`), **never** the next state $y^+$.

---

What must you do before copying binary excitation rows (`00, 01, 10, 11`) into a 3-variable or 4-variable Karnaugh map?
?
Swap rows `10` and `11` into **Gray-code order** (`00, 01, 11, 10`) so geometrically adjacent K-map rows remain at Hamming distance $1$.
