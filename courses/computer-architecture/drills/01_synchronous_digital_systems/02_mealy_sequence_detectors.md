#drills/computer-architecture/01_synchronous_digital_systems/02_mealy_sequence_detectors

*(Jan 2026 C1 Q1)* A Mealy detector recognizes `{11, (10,..,10), 11, (01,..,01), 00}` or `{11, (10,..,10), (01,..,01), 00}` with states:
- $S_0$: reset ($\varepsilon$), $S_1$: `{11}`, $S_2$: `{11, (10)+}`, $S_3$: `{11, (10)+, 11}`, $S_4$: `... (01)+`.
The machine is currently in **$S_3$** (history ends in `..., 11, 10, 11`). Write all four transitions $(S^{t+1} / u)$ for $xy \in (00, 01, 11, 10)$.
?
- `00`: **$S_0 / 0$** (suffix `11, 00` matches no prefix)
- `01`: **$S_4 / 0$** (advances into the `(01)+` loop)
- `11`: **$S_1 / 0$** (trailing `11` starts a fresh `{11}` prefix — do NOT reset to $S_0$!)
- `10`: **$S_2 / 0$** (trailing two pairs `11, 10` match `{11, (10)+}` — jumping back to $S_2$ preserves a 2-symbol overlap!)

---

*(June 2026 Q1)* Branch A of a Mealy detector specifies `{00, 00, (00,..,00), (01,..,01), 10}`, where the exam states the **minimum valid sequence** is `{00, 00, 00, 01, 10}` (three `00`s minimum).
A student puts the `00 / 0` self-loop on state $S_2$ (`{00, 00}`) and transitions $S_2 \xrightarrow{01 / 0} S_{\text{next}}$. Why does this fail, and how must the `00` prefix states be wired?
?
Putting the `00` loop on $S_2$ allows `00, 00, 01, 10` (only **two** `00`s) to reach recognition!
- **Correct wiring:** $(XY, \dots, XY)$ requires **at least one** Mandatory pair, so `{00, 00, (00)+}` needs **three** states before `01`: $S_0 \xrightarrow{00/0} S_1 \xrightarrow{00/0} S_2 \xrightarrow{00/0} S_3$, with the `00 / 0` self-loop placed strictly on **$S_3$**.

---

*(Jan 2026 C2 Q1)* A dual-branch Mealy detector recognizes:
- Branch A: `{10, 10, (01)+, (10)+, 00}` (where **$S_4$** = `{10, 10, (01)+, (10)+}`)
- Branch B: `{10, 10, (10)+, (01)+, 00}` (where **$S_6$** = `{10, 10, (10)+, (01)+}`)
While in **$S_6$**, unexpected input `xy = 10` arrives. Which next state must $S_6 \xrightarrow{10 / 0} ?$ enter?
?
**$S_4 / 0$** (Branch A's second loop!).
- **Trap avoided:** Every path into $S_6$ passed through `{10, 10, (10)+}` (at least three `10`s) followed by `(01)+`. Appending `10` leaves suffix `..., 10, 10, (01)+, 10`, which is an already-active state **$S_4$** of Branch A (`00` on the very next cycle must output `1`!).

---

*(July 2026 Q1)* A Mealy detector recognizes Branch A `{01, 00, (00)+, (01)+, 00}` (min `{01, 00, 00, 01, 00}`) or Branch B `{01, 01, (01)+, 00, 01}`, with $S_0 = \varepsilon$, $S_1 = \{01\}$, $S_2 = \{01, 00\}$, and Branch B penultimate state **$S_7$** $= \{01, 01, (01)+, 00\}$.
When `xy = 01` arrives in $S_7$, Branch B completes ($u = 1$). Does $S_7 \xrightarrow{01 / 1} ?$ go to $S_0$, $S_1$, or Branch A?
?
**$S_1 / 1$** (prefix `{01}`).
- **Trap avoided:** Upon receiving `01`, the stream ends in `..., 01, 00, 01`. That does *not* match Branch A's 3-symbol requirement `{01, 00, 00}`, so jumping into Branch A is invalid; resetting to $S_0$ is also wrong because the trailing `01` already forms valid 1-symbol prefix **$S_1$**.

---

*(Sept 4, 2026 Q1)* Spec: `{01, 01, (00)+, 01, 11}` or `{01, 01, (11)+, 01, 00}`, with $S_0 = \varepsilon$, $S_1 = \{01\}$, and $S_2 = \{01, 01\}$.
When the machine is in **$S_2$** and receives a third consecutive `01`, what is $S_2$'s transition on `xy = 01`?
?
**Self-loop $S_2 \xrightarrow{01 / 0} S_2$**.
- **Trap avoided:** Appending `01` to `{01, 01}` gives `{01, 01, 01}`, whose last two pairs are still `{01, 01}`. Dropping back to $S_1$ or $S_0$ would break detection on `01, 01, 01, 00, 01, 11`.

---

*(Sept 18, 2026 Q1)* Spec: `{01, (00)+, 01, 00, 01}` or `{01, (11)+, 01, (01)+, 00}` with Branch A states $S_1 = \{01\}$, $S_2 = \{01, (00)+\}$, $S_3 = \{01, (00)+, 01\}$, and $S_4 = \{01, (00)+, 01, 00\}$.
In **$S_4$**, input `xy = 01` completes Branch A. What is the exact transition $S_4 \xrightarrow{01 / ?} ?$?
?
**$S_4 \xrightarrow{01 / 1} S_3$**.
- **Trap avoided:** After `01` arrives in $S_4$, the last three symbols are `01, 00, 01`—which matches `{01, (00)+, 01}` with a single `00`! Returning to **$S_3$** (instead of $S_1$ or $S_0$) lets a subsequent `00, 01` trigger a second `u = 1` in just two cycles.
