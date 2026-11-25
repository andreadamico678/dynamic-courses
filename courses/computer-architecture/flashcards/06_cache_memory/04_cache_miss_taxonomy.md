#flashcards/computer-architecture/cache_memory/cache_miss_taxonomy

What are the **3 C's** of cache misses?
?
1. **Compulsory (Cold):** first-ever access to a block.
2. **Capacity:** cache cannot hold the entire working set.
3. **Conflict (Collision):** multiple blocks map to the same set and evict each other.

What hardware change reduces each of the 3 C's, and what is the main trade-off?
?
- **Compulsory:** increase block size $B$ (trade-off: higher miss penalty & conflict misses).
- **Capacity:** increase total capacity $C$ (trade-off: slower hit time & higher area/power).
- **Conflict:** increase associativity $N$ (trade-off: slower hit time & extra tag comparators).
