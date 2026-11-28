#flashcards/computer-architecture/04_riscv_subroutines/13_recursive_subroutines

What must every non-base activation of a linear recursive subroutine (`fact(n)`) save on its stack frame before `call` / `jal`?
?
Its return address **`ra`** and any live parameter/partial data (e.g., `n` from `a0` or via a saved `s0`) needed after the recursive call returns.

---

Why must incoming parameter `a0` be saved before executing a recursive `call` (`fact(n - 1)`)?
?
Because setting up the child argument overwrites `a0` (`n - 1`), and the child's return value overwrites `a0` again (`fact(n - 1)`), wiping out the caller's original `n` unless backed up.

---

What stack-frame error happens if the base case jumps to `ret` without matching the prologue's `addi sp, sp, -K`?
?
`sp` leaks $K$ bytes downward, so the caller reloads the child's saved `ra` and stack slots instead of its own, causing wrong answers or infinite return loops; either check the base case **before** subtracting `sp`, or jump to a shared epilogue (`j epilogue`).

---

How does advancing an `int *` pointer argument in recursive `sum_arr(a + 1, n - 1)` differ from decrementing count `n - 1`?
?
In C pointer arithmetic, `a + 1` on `int *` advances by `sizeof(int) = 4` bytes (`addi a0, a0, 4`), whereas integer count `n - 1` decrements by `1` (`addi a1, a1, -1`).
