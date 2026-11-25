#flashcards/computer-architecture/cache_memory/cache_block_placement

How is the total number of blocks $NB$ calculated from cache capacity $C$ and block size $B$?
?
$NB = C / B$ (both in bytes).

How is the number of sets $NS$ calculated for an $N$-way set-associative cache?
?
$NS = NB / N = C / (B \cdot N)$.

In a Direct-Mapped cache ($N = 1$) with $NB$ blocks, how does block address $j$ map to a cache block?
?
$\text{Cache Block Index} = j \bmod NB$.

In an $N$-way set-associative cache with $NS$ sets, how does block address $j$ map to a cache set?
?
$\text{Set Index} = j \bmod NS$ (the block can be placed in any of the $N$ ways within that set).

How is the byte block address $j$ computed from a 32-bit byte address $\text{Addr}$ and block size $B$?
?
$j = \lfloor \text{Addr} / B \rfloor$.
