#flashcards/computer-architecture/03_riscv_instructions/03_arrays_and_strings

How do you compute the address and load element `A[i]` of a 32-bit `int A[]` array (`base` in `a0`, `i` in `s0`)?
?
Scale `i` by $4$ (`slli t0, s0, 2`), add the base pointer (`add t0, a0, t0`), and load a 32-bit word (`lw t1, 0(t0)`).

---

How do you compute the address and load character `S[i]` of a C string `char S[]` (`base` in `a0`, `i` in `s0`)?
?
Add `i` with unit byte stride (`add t0, a0, s0`) with no shift, then execute `lbu t1, 0(t0)`.

---

Why should C characters in ASCII string algorithms be loaded with `lbu` instead of `lb`?
?
`lbu` zero-extends bits `[31:8]`, preventing bytes $\ge \text{0x80}$ from sign-extending into negative 32-bit numbers.

---

What sentinel byte marks the end of a C string in memory, and how is it tested in RV32I?
?
The null byte `'\0'` (`0x00`), tested after `lbu t1, 0(t0)` via `beqz t1, str_done` (`beq t1, zero, str_done`).

---

In a pointer-walking `strlen` routine starting at `a0` and stopping `t0` on `'\0'`, how is the length computed?
?
Subtract the starting address from the terminal pointer: `sub a0, t0, a0`.

---

Which RV32I instruction converts an ASCII digit character (`'0'`–`'9'`) in `t0` into its integer value $0$–$9$?
?
`addi t0, t0, -48` (subtracting ASCII `'0'` $= 48 = \text{0x30}$).

---

Which RV32I instructions map ASCII `'A'`–`'Z'` and `'a'`–`'z'` to zero-based indices $0$–$25$?
?
`addi t0, t0, -65` for uppercase (`'A'` $= 65$) and `addi t0, t0, -97` for lowercase (`'a'` $= 97$).

---

When can a RISC-V subroutine omit stack frame allocation (`addi sp, sp, -N`) completely?
?
When it is a leaf subroutine (executes zero nested `call`/`jal` instructions) and uses only caller-saved registers (`a0`–`a7`, `t0`–`t6`).
