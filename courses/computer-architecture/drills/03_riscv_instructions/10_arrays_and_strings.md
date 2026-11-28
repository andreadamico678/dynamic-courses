#drills/computer-architecture/03_riscv_instructions/10_arrays_and_strings

*(July 2026 Q6)* Inside `int elabora(int n, char *le, char *nu)` (`a0 = n`, `a1 = le`, `a2 = nu`, loop index `i` in `t0`), translate the line:
```c
d = (le[i] - 97) - (nu[i] - 48);
```
into `t3` (`d`).
?
```asm
    add  t1, a1, t0       # &le[i] (1-byte char stride: NO slli!)
    lbu  t1, 0(t1)        # le[i]
    addi t1, t1, -97      # le[i] - 'a'
    add  t2, a2, t0       # &nu[i]
    lbu  t2, 0(t2)        # nu[i]
    addi t2, t2, -48      # nu[i] - '0'
    sub  t3, t1, t2       # d = (le[i] - 97) - (nu[i] - 48)
```
- **Trap avoided:** `char *` elements have stride $1$ byte (never shift `t0` by $2$), and always use `lbu` for ASCII characters.

---

*(Jan 2026 C1 Q6)* In `elabora(char *p, char *s, int n)` where `p` and `s` both contain ASCII digits `'0'`–`'9'`, the C code computes `v = p[i] - s[i];`.
A student subtracts `48` from `p[i]` (`addi t5, t5, -48`) and forgets to subtract `48` from `s[i]`. What bug occurs, and is `-48` needed at all?
?
**No `-48` is needed at all** — just `sub t3, t5, t6` directly!
- **Trap avoided:** Because `(d1 + 48) - (d2 + 48) = d1 - d2`, the two `'0'` offsets cancel automatically. Subtracting `48` from only one operand makes `v` negative by `-48` (`v < 1` always), causing `elabora` to return `0` on every input!

---

*(June 2026 Q6)* Inside `int esegui_calcolo(int nu, char *let)` (`a0 = nu`, `a1 = let`, `t` = `let[i]` in `t1`, `conta` in `t2`), translate:
```c
if (t - 65 >= nu - 1 && t - 65 < nu + 2)
    conta++;
```
without clobbering `nu` (`a0`) for future loop iterations.
?
```asm
    addi t3, t1, -65      # t3 = t - 65
    addi t4, a0, -1       # t4 = nu - 1 (keep a0 intact!)
    blt  t3, t4, skip_inc # if (t - 65 < nu - 1) skip
    addi t4, a0, 2        # t4 = nu + 2
    bge  t3, t4, skip_inc # if (t - 65 >= nu + 2) skip
    addi t2, t2, 1        # conta++
skip_inc:
```
- **Trap avoided:** Computing `addi a0, a0, -1` in place would permanently decrement `nu` on every character of the string!

---

Inspect this broken leaf `strlen` (`a0 = char *str`):
```asm
strlen:
strlen_loop:
    lbu  t1, 0(a0)
    beqz t1, strlen_done
    addi a0, a0, 1
    j    strlen_loop
strlen_done:
    ret
```
What wrong value does this return in `a0`, and what 2-line fix repairs it?
?
It returns the **memory address of `'\0'`** (e.g., `0x7FFFEFFC`) instead of the string length!
- **Fix:** Save/walk in `t0` (`mv t0, a0` at entry, `lbu t1, 0(t0)`, `addi t0, t0, 1`) and end with **`sub a0, t0, a0`** before `ret`.

---

*(Sept 4, 2026 Q6)* At the end of leaf helper `processa`, `cn` is in `t0` and `sm` is in `t1`. Translate the final return statement:
```c
if (cn == 0)
    return -1;
else
    return sm / cn;
```
?
```asm
    bnez t0, do_div
    li   a0, -1
    ret
do_div:
    div  a0, t1, t0       # a0 = sm / cn
    ret
```
- **Trap avoided:** Note RV32M operand order `div rd, dividend, divisor` (`sm` first in `t1`, `cn` second in `t0` — reversing them computes `cn / sm = 0`!).
