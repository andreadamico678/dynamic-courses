#flashcards/computer-architecture/06_cache_memory/21_cache_write_policies

How does **Write-Through** operate on a cache write hit?
?
Every store updates **both** the cache SRAM line and lower-level memory (main DRAM) simultaneously; cache lines remain clean (`0` Dirty bits needed) and evictions require zero write-backs.

---

What is the **main advantage of Write-Through over Write-Back**, and what is its main drawback?
?
- **Advantage:** Main memory is **always coherent (up to date)** with the cache, simplifying DMA I/O, multiprocessor consistency, and eviction hardware.
- **Drawback:** High memory-bus bandwidth consumption and slow DRAM write latency on every store.

---

How does a **Write Buffer** eliminate most Write-Through write stalls, and when do **write stalls still occur**?
?
A small hardware **FIFO queue** latches `(Address, Data)` in $1$ cycle so the CPU keeps executing while DRAM drains entries in the background; **write stalls still occur when a burst of stores fills all FIFO entries (buffer saturation)** faster than DRAM can drain them (plus on read misses hitting an address queued in the buffer).

---

How does **Write-Back** operate on a write hit, and what is the role of the **Dirty bit ($D$)**?
?
Stores update **only the cache SRAM line** and set its per-block **Dirty bit ($D = 1$)**; main memory is updated only later when a `Dirty = 1` line is chosen as a victim for replacement.

---

What happens on eviction of a victim block in a **Write-Back** cache when `Dirty = 0` versus `Dirty = 1`?
?
- **`D = 0` (clean):** Overwrite immediately ($1$ DRAM read for the incoming block).
- **`D = 1` (dirty):** Must first write the modified victim block back to DRAM, then fetch the incoming block (**$2$ DRAM block transfers**).

---

What is the **main advantage of Write-Back over Write-Through**, and what is its trade-off?
?
- **Advantage:** **Drastically reduces off-chip memory-bus traffic** and improves write speed because repeated stores to the same variable or block coalesce inside fast cache SRAM.
- **Trade-off:** Main memory stays stale while `D = 1`, dirty evictions double miss latency, and DMA requires explicit cache clean/invalidate maintenance.

---

How do **Write-Allocate (Fetch-on-Write)** and **No-Write-Allocate (Write-Around)** differ on a cache write miss?
?
- **Write-Allocate:** Fetches the missing $B$-byte block from DRAM into cache first, then writes the word in SRAM.
- **No-Write-Allocate:** Bypasses the cache completely and writes the word directly into lower-level memory without allocating a cache line.

---

Which write-miss policies pair with **Write-Through** and **Write-Back**, and why?
?
- **Write-Through + No-Write-Allocate:** Future stores go to DRAM anyway, so fetching a line on a write miss wastes bus bandwidth.
- **Write-Back + Write-Allocate:** Loading the line into SRAM lets all subsequent writes/reads in that block hit in cache with zero DRAM traffic.
