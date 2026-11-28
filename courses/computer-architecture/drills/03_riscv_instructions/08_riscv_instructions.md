#drills/computer-architecture/03_riscv_instructions/08_riscv_instructions

A byte sensor buffer at `a0` holds raw unsigned byte `0xFF` (`255`). A student loads it with `lb t0, 0(a0)` and checks `blt t0, zero, error`.
Why does `error` trigger falsely, and what single opcode change fixes it?
?
Change `lb` to **`lbu t0, 0(a0)`**.
- **Trap avoided:** `lb` sign-extends bit 7 (`1`) across bits `31:8`, turning `0xFF` into `0xFFFFFFFF` (`-1 < 0`). `lbu` zero-extends the upper 24 bits to `0x000000FF` (`+255`).

---

While translating `x = x + 4096;` (`x` in `s0`), a student writes `addi s0, s0, 4096`.
Why does this exceed the RV32I I-type immediate format, and what 2-instruction sequence safely adds `4096`?
?
Signed 12-bit immediates only span **$[-2048, +2047]$**, so `+4096` overflows 12 bits:
```asm
li  t0, 4096
add s0, s0, t0
```

---

Register `t0` holds the signed 32-bit integer `-20` (`0xFFFFFFEC`). Compare the value placed in `t1` by `srli t1, t0, 2` versus `srai t1, t0, 2`.
?
- **`srai t1, t0, 2`:** **`-5`** (`0xFFFFFFFB`, replicates sign bit `1` into bits `31:30`).
- **`srli t1, t0, 2`:** **`+1,073,741,819`** (`0x3FFFFFFB`, shifts `0`s into bits `31:30`, destroying the negative sign!).

---

Register `s0` holds the base address of a 32-bit integer array `int v[8]`. A student writes `lw t1, 3(s0)` to load `v[3]`.
Identify both bugs in `lw t1, 3(s0)` and write the corrected instruction.
?
**Correct instruction:** **`lw t1, 12(s0)`**.
- **Trap avoided:** Each `int` is $4$ bytes ($3 \times 4 = 12$). Offset `3` reads from an unaligned byte address `s0 + 3` (triggering a misaligned load exception or reading scrambled bytes across `v[0]` and `v[1]`).
