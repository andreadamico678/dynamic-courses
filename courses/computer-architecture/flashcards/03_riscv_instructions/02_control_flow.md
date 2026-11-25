#flashcards/computer-architecture/03_riscv_instructions/02_control_flow

What is the condition inversion rule for translating `if (cond)` into RISC-V assembly?
?
Test the logical negation `!cond` and branch forward past the guarded body (`else` or `end_if`) when `!cond` holds.

---

Which signed RISC-V branch skips the body of `if (a < b)`?
?
`bge a, b, skip_label` (since $\neg(a < b) \iff a \ge b$).

---

Which signed RISC-V branch skips the body of `if (a <= b)`?
?
`bgt a, b, skip_label` (expanding to `blt b, a, skip_label`, since $\neg(a \le b) \iff a > b$).

---

How do `blt`/`bge` differ from `bltu`/`bgeu` when comparing `0xFFFFFFFF` against `0`?
?
`blt`/`bge` compare signed two's complement values (`0xFFFFFFFF` $= -1 < 0$), whereas `bltu`/`bgeu` compare unsigned magnitudes (`0xFFFFFFFF` $> 0$).

---

Which instruction is mandatory at the end of the `then` block in an `if-else` translation?
?
An unconditional jump `j end_if` so execution does not fall through into the `else` block.

---

How do you translate a short-circuit `if (A && B)` guard into RISC-V branches?
?
Emit two consecutive inverted branches to `skip_body`: if `!A` holds jump to `skip_body`, then if `!B` holds jump to `skip_body`.

---

How do you translate a short-circuit `if (A || B)` guard into RISC-V branches?
?
Test $A$ positively (`if (A) goto exec_body`), then test `!B` inverted (`if (!B) goto skip_body`) right above `exec_body:`.

---

Why is the branch condition NOT inverted at the bottom of a `do { ... } while (cond);` loop?
?
Because the test sits at the end of the body and jumps backward to `do_top` whenever `cond` is true to repeat the loop.

---

How does `break` inside a `for` or `while` loop compile in RISC-V assembly?
?
As a jump directly to the enclosing loop's exit label (`j loop_exit`, or a direct conditional branch to `loop_exit`).
