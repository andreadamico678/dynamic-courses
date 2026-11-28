#drills/computer-architecture/06_cache_memory/20_cache_address_partitioning

*(Feb 2026 C2 Q4)* For a cache of $NB = 2048$ blocks of $B = 32\text{ bytes}$ on a 32-bit CPU, you already found the Direct-Mapped split: $\text{Offset} = 5\text{ bits}$, $\text{Index} = 11\text{ bits}$, $\text{Tag} = 16\text{ bits}$.
Without recomputing powers of two from scratch, write `(Index, Tag)` for **2-way** and **4-way** set-associative.
?
- **2-Way ($N = 2$):** `Index = 10 bits`, `Tag = 17 bits`
- **4-Way ($N = 4$):** `Index = 9 bits`, `Tag = 18 bits`
- **Shortcut & trap avoided:** Every $2\times$ doubling of associativity halves $NS$, shifting **$-1$ bit from `Index` into `+1` bit of `Tag`**, while `Offset` ($\log_2 32 = 5$) never changes.

---

A 32-bit CPU uses a **32 KiB** ($C = 32\text{ KiB}$) 8-way set-associative cache with $B = 64\text{-byte}$ blocks.
A student sets $NB = 32{,}768$ and gets $\text{Index} = \log_2(32768 / 8) = 12\text{ bits}$. Fix the error and find `(Offset, Index, Tag)`.
?
$32\text{ KiB} = 2^{15}\text{ bytes}$ is total **byte capacity $C$**, not block count $NB$!
- $NB = C / B = 2^{15} / 2^6 = 2^9 = 512\text{ blocks}$
- $NS = 512 / 8 = 64 = 2^6\text{ sets}$
- **Correct split:** `Offset = 6 bits`, **`Index = 6 bits`**, **`Tag = 20 bits`** ($6 + 6 + 20 = 32$).

---

*(Slide Deck CA-INF23)* A cache has $NB = 1024$ blocks of $B = 16\text{ bytes}$ on a 32-bit processor and is **Fully Associative**.
What are the exact bit widths of `Offset`, `Index`, and `Tag`?
?
- `Offset` $= \log_2(16) = \mathbf{4\text{ bits}}$
- `Index` $= \log_2(1) = \mathbf{0\text{ bits}}$ (only $NS = 1$ set exists!)
- `Tag` $= 32 - 0 - 4 = \mathbf{28\text{ bits}}$

---

Right after power-on reset, all SRAM tag arrays hold `0x00000`, and the CPU reads address `0x00000000` (`Tag = 0`, `Index = 0`, `Offset = 0`).
Why doesn't the cache falsely report a **Cache Hit** on garbage SRAM data?
?
Hardware initializes every line's **Valid bit ($V$) to `0`** on reset, and a hit requires **`(V == 1) AND (Stored_Tag == Addr_Tag)`**. With $V = 0$, the access cleanly triggers a Compulsory miss.
