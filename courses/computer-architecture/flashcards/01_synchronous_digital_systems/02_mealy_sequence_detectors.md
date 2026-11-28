#flashcards/computer-architecture/01_synchronous_digital_systems/02_mealy_sequence_detectors

Upon what variables does output $u^t$ depend in a Mealy FSM, and where is it annotated in diagrams and tables?
?
It depends on both present state $S^t$ and live input $xy^t$ ($u^t = \lambda(S^t, xy^t)$), written on transition arcs as $xy / u$ and inside next-state table cells as $S^{t+1} / u$.

---

How many cycles of latency does a Mealy sequence detector have when the final matching symbol arrives?
?
**Zero clock cycles**: $u$ asserts to `1` immediately during the same cycle the terminal symbol appears, directly on the transition arc.

---

What is the minimum number of states required by a Mealy detector for a fixed sequence of length $L$?
?
**$L$ states** ($S_0 \dots S_{L-1}$), because the $L$-th symbol emits $u = 1$ on its outgoing transition arc without needing an extra state.

---

How is an arbitrary-repetition block $(XY, \dots, XY)$ (one or more pairs) synthesized in a Mealy FSM?
?
Emit one forward transition $XY / 0$ into a dedicated state $S_k$, and place the self-loop $S_k \xrightarrow{XY / 0} S_k$ on $S_k$ itself (never on the preceding state).

---

How do you find the next state $S^{t+1}$ on a mismatching or sequence-completing input in an overlapping Mealy detector?
?
Append the incoming symbol $xy$ to the current state's history and apply the **Longest Proper Prefix-Suffix (LPS)** rule: route to the state matching the longest trailing suffix that is a valid prefix of any target branch.

---

How many cells must every row of a 2-bit input ($xy$) Mealy state table contain?
?
Exactly **$4$ filled cells** ($S^{t+1} / u$) ordered in Gray columns `00, 01, 11, 10`, with zero blank entries.
