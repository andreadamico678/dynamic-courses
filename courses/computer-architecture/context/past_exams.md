# Past Exams Analysis: Computer Architectures

## Historical Exam Breakdown & Format Invariants

The exam collection contains 10 past exams:
- **2023–2025 (CE_TE series):** Older Italian curriculum papers testing foundational digital systems and MIPS assembly.
- **2026 (CA_TE series):** Five exam sessions (January, February, June, July, September 2026) with seven full variants (C1/C2 for Jan & Feb). These establish the strict 2026/2027 format:
  - 6 mandatory questions.
  - Exactly 2 hours 30 minutes.
  - Total 32 points (30 e Lode).
  - Mandatory section thresholds:
    - Section I (Q1+Q2): $\ge 6 / 11$
    - Section II (Q3+Q4+Q5): $\ge 7 / 12$
    - Section III (Q6): $\ge 5 / 9$

---

## Question Archetypes & Recurring Pitfalls

### Question 1: FSM Sequence Recognizers (5–6 Points)
- **Problem Statement:** Synthesize a state diagram and 4-column state table ($xy=00, 01, 11, 10$) for a Mealy FSM recognizing arbitrary-repetition sequences over a 2-bit input alphabet $xy$.
- **Frequent Exam Specifications:**
  - Jan 2026 C1: $\{11, (10, \dots, 10), 11, (01, \dots, 01), 00\}$ or $\{11, (10, \dots, 10), (01, \dots, 01), 00\}$.
  - Jan 2026 C2: $\{10, 10, (01, \dots, 01), (10, \dots, 10), 00\}$ or $\{10, 10, (10, \dots, 10), (01, \dots, 01), 00\}$.
  - Feb 2026 C1: $\{00, 01, (00, \dots, 00), (01, \dots, 01), 10\}$ or $\{00, (10, \dots, 10), 00, (01, \dots, 01), 00\}$.
  - June 2026: $\{00, 00, (00, \dots, 00), (01, \dots, 01), 10\}$ or $\{00, 01, (00, \dots, 00), 00, 01\}$.
- **Recurring Traps:**
  1. *Overlap Failure:* Failing to find the longest common prefix-suffix on mismatched symbols, resetting blindly to the start state $S_0$ instead of an intermediate state.
  2. *Self-Loop Exits:* Mishandling transitions out of $(XY, \dots, XY)$ loops when the exit symbol is identical to the first symbol of the prefix.
  3. *Zero-Latency Output:* In Mealy models, the output $u=1$ occurs *on the transition arc* with the final symbol, not one cycle later.

### Question 2: State Minimization & Flip-Flop Synthesis (5–6 Points)
- **Problem Statement:** Given a 6-state single-input FSM table:
  1. Minimize states using an Implication Table.
  2. Encode the minimal states into binary using $k = \lceil \log_2 |S_{\text{min}}| \rceil$ flip-flops.
  3. Build transition and excitation tables (JK or SR flip-flops).
  4. Synthesize minimal SOP Boolean equations for flip-flop inputs and output $u$ using Karnaugh maps.
- **Recurring Traps:**
  1. *Premature Equivalence:* Forgetting that an incompatible next-state pair in the implication table cascades backward to eliminate previously assumed compatible pairs.
  2. *Unused States (Don't Cares):* Reducing a 6-state machine to 5 states requires 3 flip-flops ($2^3 = 8$ total codes). The 3 unused binary combinations (e.g., $101, 110, 111$) **must** be marked as Don't Cares (`-` / `X`) across all K-map entries, drastically simplifying SOP terms.

### Question 3: Quantitative CPI Evaluation (3 Points)
- **Two Distinct Variations:**
  - *Variant A (Pipelined Hazards):* Instruction mix given with percentages (Load, Store, Branch, ALU). Memory architecture (unified vs Harvard), branch predictor (Predict Untaken), resolution stage (ID, EX, or MEM), data forwarding, and RAW dependency fractions.
    - Hazard penalty rules:
      - Unified memory: $+1$ cycle stall for every memory instruction (Load and Store).
      - Forwarding ALU $\to$ ALU: 0 stalls.
      - Forwarding Load $\to$ ALU at distance 1: 1 stall cycle (*Load-Use*).
      - Predict Untaken: Untaken = 0 stalls; Taken = 1 stall (ID), 2 stalls (EX), 3 stalls (MEM).
      - ALU $\to$ Branch dependency with ID resolution: $+1$ extra stall even with forwarding!
  - *Variant B (Memory Hierarchy CPI):* Separate I-Cache and D-Cache, Miss Rates, Miss Penalties, CPI execution, instruction count. Stalls from instruction misses and data misses summed into execution CPI.
- **Recurring Traps:**
  1. Double-counting or omitting memory stalls in unified vs Harvard pipelines.
  2. Assuming forwarding eliminates the Load-Use stall (it does not; 1 bubble remains).
  3. Misidentifying the branch penalty when resolution occurs in EX (2 cycles) vs MEM (3 cycles).

### Question 4: Cache Placement & AMAT Calculations (3–4 Points)
- **Two Distinct Variations:**
  - *Variant A (Block Placement & Address Partitioning):* Given cache capacity in blocks (e.g., 64 blocks, 1024 blocks), block size (e.g., 64 bytes), and main memory block address $j=50$ or a 32-bit CPU address:
    - Direct-Mapped: $\text{Index} = j \pmod{NB}$.
    - $N$-way set-associative: $\text{Set Index} = j \pmod{NS}$ where $NS = NB / N$.
    - Field bits: $\text{Offset} = \log_2(\text{Block Size})$, $\text{Index} = \log_2(NS)$, $\text{Tag} = 32 - (\text{Index} + \text{Offset})$.
  - *Variant B (AMAT Performance Ranking):* Given parameters for Caches A, B, C (Hit Time, Miss Rate, Miss Penalty):
    - Compute $\text{AMAT} = \text{Hit Time} + (\text{Miss Rate} \times \text{Miss Penalty})$.
    - Solve inverse inequalities: find maximum allowable Hit Time or Miss Rate for Cache B/C to outperform Cache A ($\text{AMAT}_B \le \text{AMAT}_A$).

### Question 5: Architectural Theory (5–6 Points)
- **Cyclic Questions:**
  1. Data forwarding: internal bypass multiplexers, Forwarding Unit conditions, Load-Use stall detection.
  2. Alternative data hazard solutions: compiler software scheduling with concrete assembly before/after examples.
  3. Control hazards: Predict Untaken mechanics, pipeline flush, NOP injection.
  4. Write policies: Write-Through vs Write-Back, dirty bit, write buffer operation, write stalls, Write-Allocate vs No-Write-Allocate.
  5. Cache miss taxonomy: Patterson & Hennessy 3 C's (Compulsory, Capacity, Conflict) and mitigation techniques.

### Question 6: RISC-V Assembly Program (9 Points)
- **Problem Statement:** Translate a complete C program featuring a non-leaf `main` function and an auxiliary computational function (`elabora`, `calcola`, `esegui_calcolo`).
- **Standard Structural Elements:**
  - Console I/O loops (`printf`, `scanf` via `ecall`).
  - Validation loops (`do { scanf(...) } while (cond);`).
  - Character buffer allocation (`char buf[16]` on stack).
  - String length calculation (`strlen` custom loop or pointer difference).
  - Byte-by-byte traversal with ASCII conversion (`buf[i] - 48` or `buf[i] - 65`).
  - Subroutine invocation preserving `ra` and callee-saved registers (`s0-s11`).
  - *Insurance Variant:* Recursive functions requiring full stack frame saving and restoration.
