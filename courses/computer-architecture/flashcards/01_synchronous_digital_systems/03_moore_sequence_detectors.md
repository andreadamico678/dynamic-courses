#flashcards/computer-architecture/01_synchronous_digital_systems/03_moore_sequence_detectors

Upon what does output $u^t$ depend in a Moore FSM, and where is it written in diagrams and tables?
?
It depends **exclusively on present state** $S^t$ ($u^t = \lambda(S^t)$), written inside state circles ($S_k / u$) and in a dedicated `Output u` column (never `/ u` on arcs or next-state cells).

---

How many states does a Moore sequence detector require for a fixed length-$L$ pattern compared to Mealy, and why?
?
**$L + 1$ states**: $L$ prefix states with $u = 0$ plus a dedicated recognition state $S_{\text{rec}} / 1$, since reset state $S_0$ must hold $u = 0$.

---

What are the two hardware consequences of registering outputs in a Moore machine instead of using a Mealy machine?
?
1. **1-cycle output latency:** $u = 1$ asserts on cycle $L + 1$ after the clock edge latches $S_{\text{rec}} / 1$.
2. **Input glitch immunity & shorter critical paths:** no combinational path connects primary input $xy^t$ to $u^t$.

---

How must outgoing transitions from a Moore recognition state $S_{\text{rec}} / 1$ be routed for overlapping detection?
?
Append each input $xy \in \{00, 01, 11, 10\}$ to the completed string $W$ and apply the LPS rule to jump straight to any valid suffix prefix ($S_1, S_2, \dots$) rather than resetting blindly to $S_0$.

---

When can a dual-branch Moore sequence detector NOT share a single recognition state $S_{\text{rec}} / 1$?
?
Whenever the two completed branches end in **different suffix histories** that require different outgoing LPS transitions on subsequent inputs; each suffix history needs its own $u = 1$ state.
