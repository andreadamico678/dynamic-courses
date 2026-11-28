#flashcards/computer-architecture/03_riscv_instructions/09_control_flow

What is the condition inversion rule for translating C `if (cond) { body; }` into RISC-V assembly?
?
Test the logical negation `!cond` and branch forward to `skip_if` / `else_blk` when `!cond` holds, so true conditions fall straight into `{ body; }`.

---

Which signed B-type branch skips the guarded block for `if (a < b)` vs. `if (a <= b)`?
?
- `if (a < b)` $\implies$ `bge a, b, skip` ($\neg(a < b) \iff a \ge b$).
- `if (a <= b)` $\implies$ `bgt a, b, skip` ($\neg(a \le b) \iff a > b$, assembled as `blt b, a, skip`).

---

How do signed (`blt`/`bge`) and unsigned (`bltu`/`bgeu`) conditional branches differ on `0xFFFFFFFF` vs. `0`?
?
`blt`/`bge` treat bit 31 as a two's complement sign bit (`0xFFFFFFFF` $= -1 < 0$), whereas `bltu`/`bgeu` treat all 32 bits as unsigned magnitude (`0xFFFFFFFF` $= 2^{32} - 1 > 0$).

---

What instruction is mandatory at the end of the `then` block in an `if (...) { ... } else { ... }` translation?
?
An unconditional jump **`j end_if`** right before `else_blk:` so the `then` path does not fall straight through into `else_blk`.

---

How do short-circuit `if (A && B)` and `if (A || B)` guards differ when translated into branches?
?
- **`A && B`:** Test `!A` then `!B`, jumping both to the same `skip_body` label.
- **`A || B`:** Test `A` **positively** to jump into `exec_body`, then test `!B` inverted to jump to `skip_body` right above `exec_body:`.

---

How are top-tested (`while`/`for`) and bottom-tested (`do-while`) loops structured in RISC-V?
?
- **`while`/`for`:** Test `!cond` at the top to jump to `loop_exit`, with unconditional `j loop_top` at the bottom.
- **`do-while`:** Run the body first and test **un-inverted** `cond` at the bottom to branch back to `do_top`.

---

Where do `break` and `continue` jump inside a translated `for (init; cond; step)` loop?
?
`break` jumps to `for_exit` (terminating the loop immediately), whereas `continue` jumps to `for_step` so the loop increment (`i++`) still executes before the next test.
