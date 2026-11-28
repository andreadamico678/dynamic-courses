# Operative Syllabus: Computer Architectures

Distilled from the official UniCT syllabus (`syllabus.md`), the operative syllabus (`true_syllabus.md`), and the 2026 exam sessions (`exams/CA_TE_2026_*.md`).

## 1. Exam Structure and Grading Rubric

- **Format:** Single written and computer-based examination.
- **Duration:** 2 hours and 30 minutes.
- **Total Points:** 32 points (corresponding to 30 e Lode).
- **Minimum Passing Grade:** $\ge 18 / 30$.

### Mandatory Section Thresholds
Failing any single section threshold results in immediate automatic failure:
1. **Section I: Digital Logic Systems (Q1 + Q2):** 11 points total, threshold **$\ge 6 / 11$**.
2. **Section II: Architectures and Processor Performance (Q3 + Q4 + Q5):** 12 points total, threshold **$\ge 7 / 12$**.
3. **Section III: RISC-V Assembly Programming (Q6):** 9 points total, threshold **$\ge 5 / 9$**.

---

## 2. Topic Coverage by Section

### Section I: Digital Logic Systems
- **Module 1.1: FSM Sequence Detectors (Question 1, 5-6 points)**
  - Mealy FSM model ($u^t = \lambda(s^t, i^t)$) for zero-latency detection upon the last symbol.
  - 2-input alphabet $xy \in \{00, 01, 10, 11\}$.
  - Arbitrary repetition sequences $\{XY, (ZW, \dots, ZW), \dots\}$: wait states, self-loops, exit conditions.
  - Overlapping sequence recognition via Longest Prefix-Suffix (KMP) matching.
  - Complete state diagram and 4-column state table ($xy=00, 01, 11, 10$).
  - *Latent Insurance Variant 1:* Moore FSM recognizers ($u^t = \lambda(s^t)$, output inside state node, +1 state, 1 clock cycle latency).
- **Module 1.2: Sequential Synthesis and Minimization (Question 2, 5-6 points)**
  - State minimization using lower triangular implication tables for 6-state machines ($A \dots F$).
  - Output incompatibility filtering ('X'), implied next-state pairs, iterative chain elimination to fixed point.
  - State reduction, binary encoding with $k = \lceil \log_2 |S_{\text{min}}| \rceil$ flip-flops.
  - Flip-Flop JK excitation tables: $0 \to 0 \implies (0, -)$, $0 \to 1 \implies (1, -)$, $1 \to 0 \implies (-, 1)$, $1 \to 1 \implies (-, 0)$.
  - Flip-Flop SR excitation tables: $0 \to 0 \implies (0, -)$, $0 \to 1 \implies (1, 0)$, $1 \to 0 \implies (0, 1)$, $1 \to 1 \implies (-, 0)$.
  - *Latent Insurance Variant 2:* Flip-Flop T ($T = Q \oplus Q^*$) and Flip-Flop D ($D = Q^*$) synthesis.
  - Boolean minimization using Karnaugh maps (4 and 5 variables) for $J_i, K_i, S_i, R_i, T_i, D_i$ and output $u$.
  - Don't Care handling for unused binary state codes.

### Section II: Architectures and Processor Performance
- **Module 2.1: Quantitative CPI Evaluation (Question 3, 3 points)**
  - Pipelined CPI with hazards: $\text{CPI}_{\text{pipe}} = 1 + \sum (f_{\text{hazard}} \times \text{Penalità})$.
  - Structural hazards from unified memory: $+1$ stall cycle for every Load and Store instruction.
  - RAW Data hazards with/without Forwarding:
    - Without forwarding: distance 1 = 2 stalls, distance 2 = 1 stall.
    - With forwarding: ALU $\to$ ALU = 0 stalls; Load $\to$ ALU at distance 1 (*Load-Use*) = 1 stall.
  - Control hazards (Branch Penalty with Predict Untaken):
    - Untaken branch = 0 stalls.
    - Taken branch: ID stage resolution = 1 stall; EX stage = 2 stalls; MEM stage = 3 stalls.
  - ALU $\to$ Branch interaction: 1 additional stall when branch resolves in ID.
  - Cache memory stalls:
    $$\text{CPI} = \text{CPI}_{\text{exe}} + (1 \times M_I \times P_I) + (f_{\text{load}} \times M_D \times P_D) + (f_{\text{store}} \times M_D \times P_D)$$
  - Total miss stall calculation: $\text{Stallo}_{\text{dati}} = \frac{\text{Miss Dati Totali}}{IC} \times \text{Penalità Dati}$.
  - *Latent Insurance Variant 3:* Amdahl's Law speedup calculations and inverse problem solving.
- **Module 2.2: Cache Architecture and Placement (Question 4, 3-4 points)**
  - Block placement modulo: Direct-Mapped ($j \pmod{NB}$), $N$-Way Set-Associative ($j \pmod{NS}$).
  - 32-bit address field partitioning: Offset bits $m = \log_2(\text{Block Size})$, Index bits $n = \log_2(\text{Sets})$, Tag bits $t = 32 - (n + m)$.
  - AMAT calculation: $\text{AMAT} = \text{Hit Time} + (\text{Miss Rate} \times \text{Miss Penalty})$.
  - Performance inequality solving: $\text{AMAT}_B \le \text{AMAT}_A$.
  - *Latent Insurance Variant 4:* Nested AMAT for Two-Level (L1 + L2) Cache Hierarchies.
- **Module 2.3: Architectural Theory (Question 5, 5-6 points)**
  - Data forwarding hardware paths (`EX/MEM -> EX`, `MEM/WB -> EX`, `MEM/WB -> MEM` for `sw`), Forwarding Unit / Hazard Detection Unit wire roles (conceptual context, not memorized boolean `if` syntax), and 1-cycle Load-Use stall.
  - Control hazard handling: stall-always, Predict Untaken with pipeline flush (`NOP`), early branch comparison/target adder in `ID`, and `ALU -> Branch` interaction.
  - Software scheduling: zero-hardware-cost compiler code reordering (before/after assembly examples).
  - Cache write policies: Write-Through vs Write-Back, dirty bit, write buffer operation and write stalls (buffer saturation).
  - Write miss policies: Write-Allocate vs No-Write-Allocate.
  - Cache miss reduction & placement theory (`CA-INF25` & past Q5/Q6): Patterson & Hennessy 3 C's (Compulsory, Capacity, Conflict) with AMAT side-effects, compiler cache optimizations (Merging Arrays, Loop Interchange, Loop Fusion), and block placement comparison (`Direct-Mapped` vs `N-Way` vs `Fully Associative` on miss rate and hit time).

### Section III: RISC-V Assembly Programming
- **Module 3.1: RV32I / RV32M Core ISA (Question 6, 9 points)**
  - Register set ABI conventions: `zero`, `ra`, `sp`, `a0-a7`, `s0-s11`, `t0-t6`.
  - Core instruction set: arithmetic, logical, shifts, comparisons (`slt`, `slti`), loads/stores (`lb`, `lw`, `sb`, `sw`), branches (`beq`, `bne`, `blt`, `bge`), jumps (`jal`, `jalr`, `call`, `ret`).
  - M extension: `mul`, `div`, `rem`.
- **Module 3.2: Translation Patterns and String Traversal**
  - Branch condition inversion (`if (a < b)` $\to$ `bge a, b, else_label`).
  - Loop patterns: `for`, `while`, `do-while`.
  - Array indexing and ASCII conversions: `str[i] - 48` for digits, `let[i] - 65` for letters.
  - `strlen` null-terminator search loop.
- **Module 3.3: Stack Frames and Subroutine Conventions**
  - Non-leaf procedure frame setup: saving/restoring `ra` and callee-saved registers `s0-s11` in word multiples on `sp` (with 16-byte alignment noted as standard compiler ABI).
  - *Latent Insurance Variant 6:* Single-recursion subroutine skeleton: preserving `ra` and argument `a0`, base case check, recursive `call`, combining return values, stack teardown.
- **Module 3.4: Console System Calls (`ecall`)**
  - Services: PrintInt (1), PrintString (4), ReadInt (5), ReadString (8), Exit (10).

---

## 3. Explicitly Excluded Zero-Yield Topics

The following topics from slides or textbooks do not appear on the exam and are omitted to maintain maximum pedagogical yield:
1. CMOS semiconductor physics and transistor pull-up/pull-down networks.
2. Formal Boolean expansion proofs (Shannon expansion theorem, consensus theorem algebraic proofs).
3. Area-delay Pareto curve derivations and $(K-1)\Delta$ tree delay models.
4. Internal bistable metastability and analog latch transistor schematics.
5. Single-cycle processor datapath control unit microcode.
6. Compiler toolchain internals (ELF linker/loader relocation tables).
7. 64-bit RISC-V instructions (RV64).
8. Low-level POSIX file system system calls (`open`, `read`, `write`, `close`).
9. Internal transistor-level memory cell architectures (6T SRAM, 1T DRAM refresh circuitry).
