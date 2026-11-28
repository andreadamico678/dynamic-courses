#drills/computer-architecture/03_riscv_instructions/09_control_flow

*(June 2026 Q6)* Inspect this translation of `if (num < 26) { val = esegui_calcolo(num, lettere); } else { printf("Errore\n"); }` (`num` in `s1`):
```asm
    li   t0, 26
    bge  s1, t0, else_err
    mv   a0, s1
    addi a1, sp, 0
    call esegui_calcolo
    mv   s2, a0
else_err:
    la   a0, str_err
    li   a7, 4
    ecall
end_if:
```
What bug occurs whenever `num < 26` is true, and what missing line fixes it?
?
Insert **`j end_if`** immediately above `else_err:`.
- **Trap avoided:** Without an unconditional jump at the end of the `then` block, valid executions fall straight through into `else_err:` and print `"Errore"` anyway!

---

*(Jan 2026 C2 Q6)* Inside `main`, input validation ends with:
```c
do {
    ...
    ris = processa(primo, pa1, pa2);
} while (ris < 0);
```
Right after `call processa` returns `ris` in `a0` (and gets saved to `s3`), write the single branch instruction at the bottom of `do_loop:` that implements `while (ris < 0);`.
?
```asm
blt a0, zero, do_loop    # (or: bltz a0, do_loop)
```
- **Trap avoided:** Unlike top-tested `while`/`for` loops, a bottom-tested `do-while` jumps back when the C condition is **true**—never invert `< 0` into `bge`!

---

*(Jan 2026 C2 Q6)* Inside `processa`, `p` is in `t0` and `k` is in `t1`. Translate this early-exit guard inside the loop:
```c
if (p == 0 && k > 0)
    return -1;
```
?
```asm
    bnez t0, skip_err     # Short-circuit: if p != 0, skip
    blez t1, skip_err     # If k <= 0, skip
    li   a0, -1
    ret
skip_err:
```
- **Trap avoided:** For `A && B`, invert *each* condition (`p != 0`, `k <= 0`) and jump to the **same** `skip_err` label; only when both fall through does `return -1` execute.

---

*(June 2025 Q4)* Inside a digit-scanning loop (`t` in `t2`), translate:
```c
if (t < 0 || t >= 10)
    i++;
else {
    numero += t;
    i++;
}
```
?
```asm
    bltz t2, only_inc     # Clause 1 TRUE -> enter then-branch immediately!
    li   t3, 10
    bge  t2, t3, only_inc # Clause 2 TRUE -> enter then-branch!
    add  t1, t1, t2       # else: numero += t
only_inc:
    addi t0, t0, 1        # i++ runs in both paths
```
- **Trap avoided:** On `A || B`, test the first clause **positively** (`bltz`) to jump straight into the target action—if you inverted `t < 0` to `bgez` jumping past the `if`, `t = 15` would falsely skip the `if` even though `t >= 10` is true!

---

*(Sept 18, 2026 Q6)* Inside `for (i = 0; i < num; i++)` (labels `for_top:`, `for_step:` where `i++` lives, and `for_exit:`), the user is asked whether to quit early:
```c
if (risp == 1)
    break;
```
With `risp` in `a0`, write the branch for `if (risp == 1) break;`.
?
```asm
    li  t0, 1
    beq a0, t0, for_exit
```
- **Trap avoided:** `break` jumps directly to **`for_exit`** (completely exiting the `for` loop), whereas `continue` jumps to **`for_step`** so `i++` still executes.
