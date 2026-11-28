#drills/computer-architecture/06_cache_memory/21_cache_write_policies

A CPU uses a Write-Through cache with a 4-entry FIFO Write Buffer where each DRAM write takes 50 CPU cycles. Isolated stores take 0 stall cycles—what specific instruction pattern still triggers write stalls, and why?
?
A **burst of closely spaced `sw` instructions** arriving faster than DRAM can drain entries ($\ge 5$ stores inside 50 cycles) fills all 4 FIFO slots (**buffer saturation**), forcing the CPU to stall until the oldest queued store finishes writing to DRAM.

---

*(Feb 2026 C2 & Sept 18, 2026 Q5)* A cache uses **Write-Back** with a per-line **Dirty Bit ($D$)**.
Compare what the cache controller must do on a **read miss** that evicts a victim block with $D = 0$ versus $D = 1$.
?
- **$D = 0$ (clean victim):** Main memory already has an identical copy $\implies$ overwrite the victim line immediately ($1$ memory bus read for the new block).
- **$D = 1$ (dirty victim):** The victim holds uncommitted edits $\implies$ the controller must **first write the entire victim block back to DRAM** before fetching the requested missing block ($2$ memory transfers!).

---

A loop initializes a fresh array `for (int i = 0; i < 1024; i++) A[i] = 0;` (`16` ints per $64\text{-B}$ cache block) on a **Write-Back** cache mistakenly configured with **No-Write-Allocate**.
What happens across the $1{,}024$ stores compared to **Write-Allocate**?
?
- **With No-Write-Allocate:** Every single one of the $1{,}024$ stores misses (since blocks are never loaded into cache) and writes straight to slow DRAM ($1{,}024$ DRAM writes!).
- **With Write-Allocate:** Only the first store in each $16$-int block (`i = 0, 16, 32, ...`) misses and fetches the line ($64$ misses), while the other $15$ stores per block hit cleanly in SRAM!
