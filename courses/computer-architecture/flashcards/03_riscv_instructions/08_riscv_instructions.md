#flashcards/computer-architecture/03_riscv_instructions/08_riscv_instructions

What is the hardware behavior of RISC-V register `x0` (`zero`)?
?
It is hardwired to `0x00000000`: reads always return $0$, and any instruction targeting `x0` as destination silently discards the write without error.

---

What signed integer range fits in the 12-bit two's complement immediate of I-type (`addi`, `lw`, `jalr`) and S-type (`sw`, `sb`) instructions?
?
$[-2^{11},\; 2^{11} - 1] = [-2048,\; +2047]$, sign-extended from bit 11 across bits `[31:12]`. Constants outside this range require `li` (`lui` + `addi`).

---

How do you subtract a small constant $K$ in RISC-V, given there is no `subi` instruction?
?
Use **`addi rd, rs1, -K`** (valid for $-2047 \le K \le 2048$).

---

How do `lb` and `lbu` differ when loading a byte whose MSB (bit 7) is `1` (such as `0x80` $= 128$)?
?
- **`lb`:** Sign-extends bit 7 across `[31:8]`, yielding `0xFFFFFF80` ($-128$).
- **`lbu`:** Zero-extends bits `[31:8]`, yielding `0x00000080` ($+128$). Use `lbu` for ASCII characters.

---

What is the operand order of RISC-V loads (`lw`, `lbu`) versus stores (`sw`, `sb`)?
?
- **Loads:** destination register first — `lw rd, offset(rs1)` ($rd \leftarrow \text{Mem}[rs1 + \text{offset}]$).
- **Stores:** source value register first — `sw rs2, offset(rs1)` ($\text{Mem}[rs1 + \text{offset}] \leftarrow rs2$).

---

How do `srli` and `srai` differ when shifting a negative signed integer right by $k$ bits?
?
`srli` inserts `0`s into bits `[31:32-k]` (unsigned division $\lfloor x / 2^k \rfloor$), whereas `srai` replicates sign bit `rs1[31]` to preserve two's complement sign (signed division).

---

Which RV32M instructions perform integer multiplication, quotient division, and remainder?
?
`mul rd, rs1, rs2` (low 32 bits of product), `div rd, rs1, rs2` ($rs1 / rs2$, truncated toward 0), and `rem rd, rs1, rs2` ($rs1 \bmod rs2$, same sign as dividend $rs1$).

---

Which base instruction implements `ret` and `jr rs1` in RV32I?
?
`jalr x0, 0(ra)` for `ret` (jumping to `ra` while discarding $\text{PC} + 4$ into `x0`), and `jalr x0, 0(rs1)` for `jr rs1`.
