#drills/computer-architecture/06_cache_memory/19_cache_block_placement

*(Jan 2026 C2 Q4)* A cache has $NB = 256$ total blocks. Where does main memory block $j = 450$ map in a **4-way set-associative** cache?
Spot the bug if a student computes $450 \bmod 256 = 194$.
?
First divide by $N = 4$ to get the number of sets:
$$NS = \frac{NB}{N} = \frac{256}{4} = 64\text{ sets} \implies \text{Set Index} = 450 \bmod 64 = 450 - (7 \times 64) = \mathbf{2}$$
Block $450$ maps to **Set 2** (any of its 4 ways).
- **Trap avoided:** Set indices only span $0 \dots 63$; computing $j \bmod NB = 194$ references a nonexistent set!

---

A processor emits raw **byte address `3200`** to a Direct-Mapped cache of $NB = 64$ blocks with block size $B = 32\text{ bytes}$.
A student computes `3200 mod 64 = 0` (Block 0). Fix the calculation.
?
Convert the byte address to **block address $j$** first:
$$j = \left\lfloor \frac{3200}{32} \right\rfloor = 100 \implies \text{Block Index} = 100 \bmod 64 = \mathbf{36}$$
- **Trap avoided:** Modulo $NS$ applies strictly to block index $j$, never to the unshifted byte address!

---

Inside a tight loop, a CPU alternates between main memory blocks $j_1 = 18$ and $j_2 = 82$ on a cache with $NB = 64$ total blocks.
Compare conflict behavior in **Direct-Mapped** ($N = 1$) versus **2-Way Set-Associative** ($N = 2$).
?
- **Direct-Mapped ($NS = 64$):** $18 \bmod 64 = 18$ and $82 \bmod 64 = 18$ $\implies$ **100% conflict thrashing** on Block 18 (they evict each other every access).
- **2-Way Set-Associative ($NS = 32$):** $18 \bmod 32 = 18$ and $82 \bmod 32 = 18$ $\implies$ **zero conflict misses** (one sits in Way 0 and the other in Way 1 of Set 18).
