#flashcards/computer-architecture/04_riscv_subroutines/11_system_calls

How do `.asciz` (`.string`), `.word`, and `.space N` differ inside a `.data` section?
?
- `.asciz` / `.string`: encodes ASCII bytes and automatically appends a terminating `0x00` (`'\0'`).
- `.word`: allocates 4-byte aligned 32-bit integers.
- `.space N`: reserves $N$ uninitialized zero-filled bytes for global arrays (never use `.space` for local C arrays inside functions).

---

Why must you use `la a0, msg` instead of `lw a0, msg` before printing a `.data` string?
?
`la a0, msg` loads the 32-bit **memory address (`&msg`)** of the string, whereas `lw a0, msg` reads the first 4 ASCII characters as raw integer bytes and crashes `PrintString`.

---

Which RARS `a7` service codes handle console output (`PrintInt`, `PrintString`, `PrintChar`) and program termination?
?
- `1`: `PrintInt` (`a0` = signed integer)
- `4`: `PrintString` (`a0` = pointer to null-terminated string)
- `11`: `PrintChar` (`a0` = ASCII code, e.g., `10` for `'\n'`)
- `10`: `Exit` (halts execution cleanly)

---

Which RARS `a7` service codes handle console input (`ReadInt`, `ReadString`), and where do their results go?
?
- `5`: `ReadInt` returns the parsed signed integer in **`a0`** (copy immediately to `s*` before the next `ecall` overwrites `a0`).
- `8`: `ReadString` takes buffer pointer **`a0`** and max byte capacity **`a1`**, storing at most **`a1 - 1`** characters plus `'\0'`.

---

What extra character does RARS `ReadString` (`a7 = 8`) store inside the buffer if the user presses Enter before hitting `a1 - 1` characters?
?
It stores the newline byte **`'\n'` (`0x0A` / `10`)** immediately before `'\0'`; strip byte `10` $\to$ `0` if trailing `'\n'` would skew `strlen`.

---

Why must a standalone RARS `main` terminate with `li a7, 10; ecall` before any helper labels below it?
?
Without `Exit` (`a7 = 10`), `PC` advances by `+4` straight into the first helper subroutine below `main` and executes it again with leftover registers.
