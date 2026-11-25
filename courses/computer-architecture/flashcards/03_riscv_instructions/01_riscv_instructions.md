#flashcards/computer-architecture/03_riscv_instructions/01_riscv_instructions

What is the hardware behavior of register `x0` (`zero`) in RISC-V?
?
It is hardwired to `0x00000000`: every read returns $0$, and every write targeting `x0` is silently discarded.

---

Which RISC-V ABI registers pass function arguments and return integer results?
?
`a0`–`a7` pass the first 8 arguments; `a0` (and `a1` for 64-bit pairs) returns the result, while `a7` holds the `ecall` service number.

---

Which RISC-V registers are caller-saved versus callee-saved across a `call`?
?
Caller-saved (volatile): `t0`–`t6`, `a0`–`a7`, and `ra`. Callee-saved (must be preserved if modified): `s0`–`s11` and `sp`.

---

What signed integer range fits inside the 12-bit immediate of an I-type or S-type RISC-V instruction?
?
$[-2^{11},\; 2^{11} - 1] = [-2048,\; +2047]$, sign-extended from bit 11 across bits `[31:12]`.

---

How do you subtract a constant $K$ (with $-2047 \le K \le 2048$) from register `rs1` in RISC-V?
?
Use `addi rd, rs1, -K` — RISC-V has no `subi` instruction.

---

How do `lb` and `lbu` differ when loading byte `0x80` from memory into a 32-bit register?
?
`lb` sign-extends bit 7 across bits `[31:8]` (`0xFFFFFF80` $= -128$), whereas `lbu` zero-extends bits `[31:8]` (`0x00000080` $= +128$).

---

What is the operand order difference between RISC-V `lw`/`lbu` loads and `sw`/`sb` stores?
?
Loads place the destination register first (`lw rd, offset(rs1)`), whereas stores place the source value register first (`sw rs2, offset(rs1)`).

---

How does `srai` differ from `srli` when shifting a negative two's complement integer right by $k$ bits?
?
`srai` replicates sign bit 31 into the vacated upper bits (signed division), whereas `srli` inserts zeros (unsigned shift).

---

Which RV32M instruction pair extracts the units decimal digit of a positive integer in `a0` and drops that digit?
?
`li t1, 10`, followed by `rem t2, a0, t1` (`a0 % 10`) and `div a0, a0, t1` (`a0 / 10`).

---

To which base instruction does the subroutine return pseudoinstruction `ret` expand?
?
`jalr x0, 0(ra)` — jumping to `ra` while discarding $\text{PC} + 4$ in `x0`.
