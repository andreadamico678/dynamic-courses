#flashcards/computer-architecture/06_cache_memory/19_cache_block_placement

Why does a memory hierarchy place fast SRAM caches between CPU registers and off-chip DRAM?
?
To hide DRAM's $40\text{--}80\text{ ns}$ latency (the Memory Wall): SRAM delivers near-register speed while DRAM provides large low-cost capacity, exploiting **temporal locality** (recently used items stay in cache) and **spatial locality** (neighboring bytes load together in $B$-byte blocks).

---

How are total cache blocks $NB$, number of sets $NS$, and memory block address $j$ computed?
?
$$NB = \frac{C}{B}, \qquad NS = \frac{NB}{N}, \qquad j = \left\lfloor \frac{\text{Byte Address}}{B} \right\rfloor$$
where $C$ is cache capacity (bytes), $B$ is block size (bytes), and $N$ is associativity.

---

How does **Direct-Mapped ($N = 1$)** block placement work and what lookup hardware does it require?
?
Every block is its own 1-slot set ($NS = NB$), mapping memory block $j$ to unique slot $\text{Block Index} = j \bmod NB$; hardware uses only **$1$ tag comparator** and **zero way-selection multiplexers**.

---

How does **$N$-Way Set-Associative** placement work and what lookup hardware does it require?
?
The cache has $NS = NB / N$ sets of $N$ slots (**ways**); memory block $j$ maps to $\text{Set Index} = j \bmod NS$ and can occupy any of its $N$ ways, requiring **$N$ parallel tag comparators** and an **$N$-to-$1$ output multiplexer**.

---

How does **Fully Associative ($N = NB$)** placement work and why is it limited to small tables like TLBs?
?
All $NB$ blocks sit in a **single set** ($NS = 1$, zero Index bits), allowing block $j$ anywhere; checking all $NB$ tags simultaneously requires **$NB$ parallel comparators** (huge area, power, and delay).

---

How do Direct-Mapped, $N$-Way Set-Associative, and Fully Associative compare on **Miss Rate** versus **Hit Time**?
?
- **Miss Rate:** Highest in Direct-Mapped (conflict thrashing), sharply lower in $2$/$4$-Way, and lowest (**zero conflict misses**) in Fully Associative.
- **Hit Time ($t_{\text{hit}}$):** Fastest in Direct-Mapped ($1$ comparator, no way mux), slightly slower in $N$-Way ($N$ comparators + mux), and slowest in Fully Associative ($NB$ comparators).

---

What are the three cache **block replacement policies** when an $N$-way set ($N \ge 2$) is full, and why does Direct-Mapped need none?
?
- **LRU:** Evicts the least recently accessed way (lowest miss rate, needs age tracking bits).
- **FIFO:** Evicts the oldest loaded way using a modulo-$N$ counter.
- **Random:** Evicts a uniform pseudorandom way (zero per-set tracking bits).
Direct-Mapped ($N = 1$) has only 1 slot per set, so the incoming block overwrites it unconditionally.
