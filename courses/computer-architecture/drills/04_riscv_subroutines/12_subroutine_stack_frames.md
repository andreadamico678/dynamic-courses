#drills/computer-architecture/04_riscv_subroutines/12_subroutine_stack_frames

*(Sept 4 & Sept 18, 2026 Q6)* `main` keeps its outer loop counter `i` in register `s0` and calls this C leaf helper:
```c
int process(char *str) {
    int s0 = 0, s1 = 0, s2 = 1;
    ...
}
```
What bug happens if you map C variables `s0, s1, s2` directly onto hardware registers `s0, s1, s2` inside a zero-stack `process:`? Give the clean fix.
?
Hardware `s0`–`s2` are **callee-saved**: overwriting hardware `s0` inside `process` destroys `main`'s loop counter `i` (causing an infinite loop)!
- **Clean fix:** Map C variables `s0, s1, s2` to volatile temporaries **`t0, t1, t2`** so `process` stays a fast zero-stack leaf function without touching hardware `s0`–`s2`.

---

*(Jan 2026 C1 Q6)* In `main`'s stack frame, `char prima[16]` is at `0(sp)`, `char seconda[16]` is at `16(sp)`, and `pa2` is in `s1`. Spot the fatal bug in this call setup for `res = elabora(prima, seconda, pa2);`:
```asm
    lw   a0, 0(sp)
    lw   a1, 16(sp)
    mv   a2, s1
    call elabora
```
?
`lw` loads the **4 ASCII bytes** stored inside the arrays rather than their **addresses**, causing `lbu` inside `elabora` to crash!
- **Fix:** Compute stack pointers with **`addi`**:
```asm
    addi a0, sp, 0        # a0 = &prima[0]
    addi a1, sp, 16       # a1 = &seconda[0]
    mv   a2, s1
    call elabora
```

---

*(Feb 2026 C2 Q6)* Inside `main`:
```c
do {
    scanf("%s", caratteri);
    printf("Inserisci un numero minore di %d\n", strlen(caratteri));
    scanf("%d", &pos);
} while (pos >= strlen(caratteri));
```
If you store `pos` in `t0` after `ReadInt`, what happens during `while (pos >= strlen(caratteri))` when `call strlen` runs?
?
`strlen` is allowed to overwrite caller-saved **`t0`** freely (in fact, standard `strlen` uses `t0` as its walking pointer!), clobbering `pos` right before `bge`!
- **Fix:** Store `pos` in a callee-saved register (**`s1`**) saved in `main`'s prologue (or cache `len = strlen(caratteri)` in `s2` once so you don't even call `strlen` twice!).

---

*(Jan 2026 C2 Q6)* `main` declares local buffer `char primo[8];` and uses `ra`, `s0` (`i`), `s1` (`pa1`), and `s2` (`pa2`).
Assign a clean, non-overlapping word-aligned RARS stack frame layout ($K$ bytes and exact `sp` offsets).
?
Total bytes: $8\text{ B (buffer)} + 4 \times 4\text{ B (regs)} = \mathbf{24\text{ bytes}}$ (`addi sp, sp, -24`):
- `0(sp)`–`7(sp)`: `char primo[8]` (pass pointer via `addi a0, sp, 0`)
- `8(sp)`: saved `s2`
- `12(sp)`: saved `s1`
- `16(sp)`: saved `s0`
- `20(sp)`: saved `ra`
(And restore with matching `lw`s + `addi sp, sp, 24` in the epilogue.)

---

You finish translating Question 6 (`main` + `elabora`, where `main` invokes `call strlen`), hit **Assemble** in RARS, and get: `Error: Symbol "strlen" not found in symbol table`.
Write the exact 8-instruction block you forgot to append at the bottom of `.text`.
?
RARS does not link C's `<string.h>` — you must include `strlen:` yourself:
```asm
strlen:
    mv   t0, a0
strlen_loop:
    lbu  t1, 0(t0)
    beqz t1, strlen_done
    addi t0, t0, 1
    j    strlen_loop
strlen_done:
    sub  a0, t0, a0
    ret
```
