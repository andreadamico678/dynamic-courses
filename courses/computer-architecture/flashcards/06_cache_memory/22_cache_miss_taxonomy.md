#flashcards/computer-architecture/06_cache_memory/22_cache_miss_taxonomy

What defines a **Compulsory (Cold-Start)** miss, what hardware change reduces it, and what is its $\text{AMAT}$ trade-off?
?
Occurs on the **first-ever reference** to a block; reduced by increasing **block size $B$** (spatial prefetching), at the cost of higher **Miss Penalty** ($\text{MP}$) and fewer total blocks ($NB = C/B$), which can increase conflict/capacity misses.

---

What defines a **Capacity** miss, what hardware change reduces it, and what is its $\text{AMAT}$ trade-off?
?
Occurs when the active **working set exceeds total cache capacity $C$**, forcing evictions and reloads; reduced by increasing **cache capacity $C$** (or adding L2), at the cost of slower **Hit Time** ($t_{\text{hit}}$), silicon area, and power.

---

What defines a **Conflict (Collision)** miss, what hardware change reduces it, and what is its $\text{AMAT}$ trade-off?
?
Occurs in Direct-Mapped or $N$-way caches when more than $N$ active blocks map to the **same set** ($j \bmod NS$); reduced by increasing **associativity $N$**, at the cost of slower **Hit Time** ($t_{\text{hit}}$) from $N$ comparators and a wider output mux.

---

Why does lowering Miss Rate $\text{MR}$ by increasing associativity $N$ or block size $B$ not guarantee faster cache performance ($\text{AMAT}$)?
?
Because $\text{AMAT} = t_{\text{hit}} + \text{MR} \cdot \text{MP}$: if the added comparator/mux delay $\Delta t_{\text{hit}}$ or larger-block $\Delta\text{MP}$ outweighs $\lvert \Delta\text{MR} \rvert \cdot \text{MP}$, overall $\text{AMAT}$ increases.

---

How does **Merging Arrays** reduce cache misses at zero hardware cost (`CA-INF25`)?
?
Combining two parallel arrays accessed together (`int Val[N]; int Key[N];`) into one array of structs (`struct { int Val, Key; } MA[N];`) places paired elements into the same cache block, eliminating **conflict misses** and improving **spatial locality**.

---

How does **Loop Interchange** reduce cache misses at zero hardware cost (`CA-INF25`)?
?
Swapping nested loops so multi-dimensional arrays are traversed sequentially in memory order (row-major in C: outer `i`, inner `j` for `x[i][j]`) consumes every word inside each fetched block before eviction (**spatial locality**).

---

How does **Loop Fusion** reduce cache misses at zero hardware cost (`CA-INF25`)?
?
Combining two sequential loops with identical bounds that touch shared arrays into a single loop body reuses cached array blocks immediately before they are evicted (**temporal locality**).
