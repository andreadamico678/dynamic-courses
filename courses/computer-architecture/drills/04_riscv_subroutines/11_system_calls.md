#drills/computer-architecture/04_riscv_subroutines/11_system_calls

Spot the register-clobber bug in this translation of `scanf("%d", &num); printf("Inserisci stringa: ");`:
```asm
    li   a7, 5            # ReadInt -> returns num in a0
    ecall
    la   a0, str_prompt2
    li   a7, 4            # PrintString
    ecall
    mv   s1, a0           # Save num into s1
```
?
`la a0, str_prompt2` **overwrites `a0` with the string pointer** before `num` was saved, so `s1` receives `&str_prompt2` instead of `num`!
- **Fix:** Move `mv s1, a0` **immediately** after the first `ecall` (`ReadInt`).

---

In `.data`, you declared `msg: .asciz "Valore = "`. In `.text`, a student writes:
```asm
    lw   a0, msg
    li   a7, 4
    ecall
```
What happens in RARS when `ecall` executes?
?
RARS crashes with an invalid memory read!
- **Trap avoided:** `lw a0, msg` loads the first 4 ASCII characters (`"Valo" = 0x6F6C6156`) into `a0` and tells `PrintString` to dereference address `0x6F6C6156`. Always use **`la a0, msg`** to load the pointer.

---

*(Feb 2026 C1 Q6)* Inside `main`, `char buffer[32]` starts at `0(sp)`, `a1` (`strlen`) is in `s2`, and integer index `num` (`0 <= num < 32`) is in `s1`. Translate:
```c
a2 = buffer[num];
minori = calcola(buffer, a1, a2);
```
?
```asm
    add  t0, sp, s1       # &buffer[num] = sp + num (1-byte stride)
    lbu  a2, 0(t0)        # 3rd arg a2 = buffer[num]
    addi a0, sp, 0        # 1st arg a0 = &buffer[0]
    mv   a1, s2           # 2nd arg a1 = strlen(buffer)
    call calcola
```
- **Trap avoided:** Using `lw` instead of `lbu` packs 4 adjacent characters into `a2`, and using `lw a0, 0(sp)` instead of `addi a0, sp, 0` passes character bytes instead of the buffer pointer.

---

At the end of `main` (right above helper label `elabora:`), a student restores `s0`, `s1`, `ra`, runs `addi sp, sp, 32`, and omits `li a7, 10; ecall` (or writes `ret` when launched directly from RARS default startup).
What goes wrong when `li a7, 10; ecall` is omitted completely?
?
`PC` increments by `+4` straight into the **first instruction of `elabora:`** right below `main`, executing the helper a bogus extra time with leftover registers!
- **Rule:** Always terminate standalone RARS `main` with `li a7, 10; ecall`.
