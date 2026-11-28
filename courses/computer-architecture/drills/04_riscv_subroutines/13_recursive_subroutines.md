#drills/computer-architecture/04_riscv_subroutines/13_recursive_subroutines

Inspect this buggy recursive translation of `int fact(int n) { if (n <= 1) return 1; return n * fact(n - 1); }`:
```asm
fact:
    addi sp, sp, -8
    sw   ra, 4(sp)
    sw   a0, 0(sp)
    li   t0, 1
    ble  a0, t0, fact_base
    addi a0, a0, -1
    call fact
    lw   t1, 0(sp)
    mul  a0, a0, t1
    lw   ra, 4(sp)
    addi sp, sp, 8
    ret
fact_base:
    li   a0, 1
    ret
```
Trace the bug at `fact_base:` when `fact(3)` reaches `fact(1)`.
?
`fact_base:` returns **without `addi sp, sp, 8`**, leaking $8$ bytes and leaving `sp` pointing to `fact(1)`'s frame! When `fact(2)` executes `lw ra, 4(sp)`, it reloads `fact(1)`'s `ra` instead of its own and loops/crashes.
- **Fix:** Either check `ble a0, t0, fact_base` *before* `addi sp, sp, -8`, or run `addi sp, sp, 8` inside `fact_base:` before `ret`.

---

In recursive array sum `int sum_arr(int *a, int n) { if (n <= 0) return 0; return a[0] + sum_arr(a + 1, n - 1); }` (`a0 = a`, `a1 = n`), a student prepares the recursive call with:
```asm
    addi a0, a0, 1
    addi a1, a1, -1
    call sum_arr
```
Fix the pointer bug and state what must be saved in the stack frame before `call sum_arr`.
?
- **Pointer fix:** In C, `a + 1` on `int *a` advances by **`sizeof(int) = 4` bytes** (`addi a0, a0, 4`, NOT `1`!).
- **Stack saves:** Save **`ra`** plus either **`a[0]`** (`lw t0, 0(a0); sw t0, 0(sp)`) or base pointer `a0` so you can add `a[0]` to the returned `a0` after `call sum_arr`.

---

In `int power(int base, int exp)` (`a0 = base`, `a1 = exp`, returning `base * power(base, exp - 1)`), `base` never changes on the way down.
Why does `addi a1, a1, -1; call power; mul a0, a0, a0` compute the wrong answer instead of `base^exp`?
?
When the base case (`exp == 0`) executes **`li a0, 1`**, `a0` no longer holds `base` — it holds the **return value** ($1$)! `mul a0, a0, a0` just computes $1 \times 1 = 1$ forever.
- **Fix:** Save `base` onto the stack (`sw a0, 0(sp)`) before `call power`, then reload `lw t0, 0(sp)` and compute `mul a0, a0, t0`.
