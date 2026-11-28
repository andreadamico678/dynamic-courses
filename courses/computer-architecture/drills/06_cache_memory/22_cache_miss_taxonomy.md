#drills/computer-architecture/06_cache_memory/22_cache_miss_taxonomy

Doubling cache block size $B$ from $32\text{ B}$ to $64\text{ B}$ inside a fixed $4\text{ KiB}$ cache cuts Compulsory misses, yet measured $\text{AMAT}$ gets worse. Which two effects caused the slowdown?
?
1. **Higher Miss Penalty ($\text{MP}$):** Transferring twice as many bytes per miss takes more DRAM bus cycles.
2. **More Conflict and Capacity Misses:** Because total block count $NB = C / B$ halves (from $128$ to $64$ blocks), fewer distinct blocks fit in cache and active lines evict each other more often.

---

*(Slide Deck CA-INF25)* Inspect this C nested loop over a $5000 \times 100$ row-major `int` matrix:
```c
for (j = 0; j < 100; j++)
    for (i = 0; i < 5000; i++)
        x[i][j] = 2 * x[i][j];
```
Which cache locality property is violated, and which **compiler cache optimization** fixes it?
?
- **Violation:** **Spatial locality** — in row-major C, `x[i][j]` and `x[i+1][j]` sit $100 \times 4 = 400\text{ bytes}$ apart, skipping across cache lines and evicting each block before `j + 1` reuses its neighbors!
- **Fix — *Loop Interchange*:** Swap the loops (`for (i = 0..4999) for (j = 0..99)`) so the inner loop steps sequentially through contiguous row elements `x[i][0], x[i][1], ...` inside each fetched cache block.

---

*(Slide Deck CA-INF25)* A program accesses two parallel arrays together on every iteration (`val[i]` and `key[i]`), suffering frequent Conflict misses when `val[i]` and `key[i]` map to the same cache set.
Which **compiler/data-layout optimization** fixes this, and how?
?
**Merging Arrays** (Array of Structs): replace separate `int val[N]; int key[N];` with `struct { int val; int key; } merged[N];`.
- **Why it works:** Placing `merged[i].val` and `merged[i].key` side-by-side in the **same cache block** converts two separate fetches (and potential set collisions) into a single miss + immediate spatial hit.

---

*(Slide Deck CA-INF25)* Inspect two consecutive loops over large arrays `a, b, c, d` that exceed L1 capacity $C$:
```c
for (i = 0; i < N; i++) a[i] = b[i] + c[i];
for (i = 0; i < N; i++) d[i] = a[i] * c[i];
```
Which misses spike in Loop 2, and what single transformation eliminates them?
?
**Capacity misses** on `a[i]` and `c[i]` (evicted from L1 before Loop 1 finishes).
- **Fix — *Loop Fusion*:** Fuse both statements into **one** `for (i = 0; i < N; i++)` loop so `a[i]` and `c[i]` are reused immediately (**temporal locality**) while still hot in L1/registers.
