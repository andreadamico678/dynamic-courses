#flashcards/computer-architecture/cache_memory/cache_address_partitioning

What are the three fields of a 32-bit cache address from MSB to LSB, and what is their bit-sum invariant?
?
$\text{Tag } (t) \mid \text{Index } (n) \mid \text{Byte Offset } (m)$, with $t + n + m = 32$.

How are Offset width $m$, Index width $n$, and Tag width $t$ computed for a 32-bit address?
?
$m = \log_2(B)$, $n = \log_2(NS)$, $t = 32 - n - m$ (where $B$ is block size in bytes and $NS$ is number of sets).

What happens to $(m, n, t)$ when associativity doubles ($N \to 2N$) at fixed capacity $C$ and block size $B$?
?
Offset $m$ stays unchanged; Index $n$ shrinks by $1\text{ bit}$; Tag $t$ grows by $1\text{ bit}$.

What is the total physical SRAM bit formula for a Write-Through vs. a Write-Back cache with $NB$ blocks?
?
Write-Through: $NB \times (8B + t + 1)$ ($1$ Valid bit, $0$ Dirty bits).
Write-Back: $NB \times (8B + t + 2)$ ($1$ Valid bit $+ 1$ Dirty bit).
