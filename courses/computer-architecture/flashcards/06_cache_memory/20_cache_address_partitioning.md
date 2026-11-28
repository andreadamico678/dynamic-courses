#flashcards/computer-architecture/06_cache_memory/20_cache_address_partitioning

What are the three ordered fields of a 32-bit CPU memory address from MSB to LSB, and how do their bit widths relate?
?
**`Tag (t)` | `Index (n)` | `Byte Offset (m)`**, satisfying $t + n + m = 32$.

---

How are Byte Offset width $m$, Index width $n$, and Tag width $t$ computed for a 32-bit address?
?
- **Byte Offset:** $m = \log_2(B)$ (selects a byte inside the $B$-byte block).
- **Index:** $n = \log_2(NS)$ (selects the set/block among $NS = NB / N$ sets).
- **Tag:** $t = 32 - (n + m)$ (identifies which memory block occupies that slot).

---

What happens to `(Offset, Index, Tag)` when associativity doubles ($N \to 2N$) at fixed capacity $C$ and block size $B$?
?
**Offset $m$ stays unchanged**, **Index $n$ shrinks by $1$ bit** ($NS$ halves), and **Tag $t$ grows by $1$ bit** ($t + n + m = 32$ invariant).

---

What is the exact `Index` bit width $n$ for a **Fully Associative** cache, and why?
?
**$n = 0$ bits**, because $N = NB \implies NS = NB / NB = 1$ single set ($\log_2 1 = 0$), leaving all $32 - m$ upper bits as the Tag.

---

What condition guarantees a valid **Cache Hit**, and what role does the **Valid bit ($V$)** serve?
?
$\text{Hit} \iff (V == 1) \land (\text{Stored Tag} == \text{Addr Tag})$. Reset initializes $V = 0$ on every line so random SRAM garbage (including `Tag = 0`) never triggers false hits at boot.
