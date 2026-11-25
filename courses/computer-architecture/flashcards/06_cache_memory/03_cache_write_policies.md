#flashcards/computer-architecture/cache_memory/cache_write_policies

How does **Write-Through** differ from **Write-Back** on a write hit?
?
Write-Through updates both the cache block and lower-level memory immediately; Write-Back updates only the cache block and sets its **Dirty bit ($D = 1$)**, writing back to memory only upon eviction.

What is a **Write Buffer** and what causes it to stall the CPU?
?
A small FIFO queue between a Write-Through cache and main memory that lets the CPU continue without waiting for slow DRAM writes; it stalls the CPU when the queue becomes full during write bursts.

Which write-miss allocation policy is typically paired with Write-Through vs. Write-Back?
?
Write-Through pairs with **No-Write-Allocate** (write-around); Write-Back pairs with **Write-Allocate** (fetch block into cache on write miss).
