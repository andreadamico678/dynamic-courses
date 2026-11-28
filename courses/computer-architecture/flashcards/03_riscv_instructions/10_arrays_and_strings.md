#flashcards/computer-architecture/03_riscv_instructions/10_arrays_and_strings

What is the byte-address formula for element `arr[i]` of type `T`, and how does RISC-V compute it for `int *` vs. `char *`?
?
$\text{Addr}(\text{Base}, i) = \text{Base} + i \times \text{sizeof}(T)$.
- **`int *` (`sizeof = 4`):** `slli t0, idx, 2; add t0, base, t0; lw rd, 0(t0)`.
- **`char *` (`sizeof = 1`):** `add t0, base, idx; lbu rd, 0(t0)` (zero shift).

---

How is a null-terminated C string laid out in memory, and how many visible characters fit in `char buf[N]`?
?
Contiguous 1-byte ASCII codes terminated by `'\0'` (`0x00`); `char buf[N]` holds at most **$N - 1$** visible characters plus `'\0'`.

---

How does a pointer-walking `strlen(a0)` subroutine compute string length without modifying `a0` during the loop?
?
Copy `mv t0, a0`, advance `t0` byte by byte until `lbu t1, 0(t0)` hits `beqz t1, strlen_done`, then return `sub a0, t0, a0`.

---

Which constant offsets convert between ASCII digits/letters and integer indices $0$–$9$ or $0$–$25$?
?
- `'0'`–`'9'` $\leftrightarrow 0$–$9$: subtract/add **`48`** (`0x30`).
- `'A'`–`'Z'` $\leftrightarrow 0$–$25$: subtract/add **`65`**.
- `'a'`–`'z'` $\leftrightarrow 0$–$25$: subtract/add **`97`**.
- Case flip (`'A'` $\leftrightarrow$ `'a'`): add/subtract **`32`**.

---

Why does subtracting two same-class ASCII digits (`p[i] - s[i]`) require no `- 48` adjustment?
?
Because $(d_1 + 48) - (d_2 + 48) = d_1 - d_2$ — both base offsets cancel algebraically.

---

When can a RISC-V subroutine omit stack frame allocation (`addi sp, sp, -K`) completely?
?
When it is a **leaf function** (makes zero nested `call`/`jal` calls, keeping `ra` intact), has no local stack arrays, and uses only caller-saved registers (`t0`–`t6`, `a0`–`a7`).
