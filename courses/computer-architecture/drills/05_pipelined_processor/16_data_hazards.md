#drills/computer-architecture/05_pipelined_processor/16_data_hazards

Trace this back-to-back sequence on a 5-stage pipeline with full forwarding:
```asm
add  x5, x1, x2    # I1
addi x5, x5, 4     # I2
sub  x6, x5, x3    # I3
```
During the cycle when $I_3$ (`sub`) is in stage **`EX`**, both `EX/MEM` ($I_2$) and `MEM/WB` ($I_1$) have `RegWrite = 1` and destination `rd = x5`. Which stage forwards `x5` to $I_3$, and why?
?
**`EX/MEM` ($I_2$'s result)** wins priority over `MEM/WB` ($I_1$'s stale value).
- **Trap avoided:** When two older instructions in flight write the same register, the Forwarding Unit disables the `MEM/WB` bypass whenever `EX/MEM` also writes a non-zero matching `rd`, ensuring $I_3$ receives the most recent architectural value of `x5`.

---

Compare stall counts (with full hardware forwarding active) between Sequence A and Sequence B:
```asm
# Sequence A:                 # Sequence B:
lw t0, 0(s0)                  lw t0, 0(s0)
sw t0, 4(s0)                  sw t1, 0(t0)
```
How many Load-Use stall cycles occur in A versus B?
?
- **Sequence A (`sw` stores `t0`):** **$0$ stalls** (`sw` only needs store payload `t0` at the start of **`MEM`**, resolved cleanly via `MEM/WB -> MEM` forwarding!).
- **Sequence B (`sw` uses `t0` as base address):** **$1$ Load-Use stall** (`sw` needs base register `t0` at the start of **`EX`** to compute `0 + t0`, before `lw` finishes `MEM`!).

---

What hardware bug would occur on `addi x0, x1, 99; add x2, x0, x3` if the Forwarding Unit only checked `EX/MEM.RegWrite == 1` and `EX/MEM.Rd == ID/EX.Rs1`?
?
The Forwarding Unit would bypass `99` out of `EX/MEM` into `add`'s ALU input, making `x0` evaluate to `99` instead of hardwired `0`!
- **Rule:** Every forwarding wire check requires destination **`Rd != x0`**.

---

*(June 2026 Q5 — Zero-Hardware-Cost Solution)* Reorder the 4 instructions below via **compiler instruction scheduling** to eliminate Load-Use stalls without changing program behavior:
```asm
lw   t1, 0(a0)
addi t2, t1, 10    # Load-Use on t1!
lw   t3, 4(a0)
sub  t4, t3, s0    # Load-Use on t3!
sw   t2, 0(a1)
```
?
Interleave the independent second load and first store into the two Load-Use slots (`0` stalls, `0` extra hardware):
```asm
lw   t1, 0(a0)
lw   t3, 4(a0)     # Independent -> fills t1's Load-Use slot!
addi t2, t1, 10    # t1 now forwards from MEM/WB in 0 stalls
sw   t2, 0(a1)     # Fills t3's Load-Use slot (or swap sub after sw)!
sub  t4, t3, s0    # t3 ready in 0 stalls
```

---

*(Feb 2026 C2 Q3)* A pipeline runs **without data forwarding** (`ALU` share $= 55\%$). Profiling reports:
- $30\%$ of `ALU` depend on a preceding `ALU` at distance **$k = 1$**
- $15\%$ of `ALU` depend on a preceding `ALU` at distance **$k = 2$**
Compute the `ALU` contribution to $\text{Stalls}_{\text{data}}$.
?
$$\text{Stalls}_{\text{ALU}} = (0.55 \times 0.30 \times \mathbf{2}) + (0.55 \times 0.15 \times \mathbf{1}) = 0.330 + 0.0825 = \mathbf{0.4125\text{ cycles/instr}}$$
- **Trap avoided:** With forwarding OFF (and split-phase RegFile), distance $k = 1$ costs **$2$ stalls**, distance $k = 2$ costs **$1$ stall**, and $k \ge 3$ costs $0$ stalls.
