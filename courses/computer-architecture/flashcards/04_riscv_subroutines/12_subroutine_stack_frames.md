#flashcards/computer-architecture/04_riscv_subroutines/12_subroutine_stack_frames

Which RISC-V registers are **caller-saved** (volatile across `call` / `jal`) versus **callee-saved** (preserved across `call`)?
?
- **Caller-saved:** `t0`–`t6`, `a0`–`a7`, and `ra` (callee may overwrite `t*`/`a*` freely; `jal` overwrites `ra`).
- **Callee-saved:** `s0`–`s11` and `sp` (any callee modifying them must save in its prologue and restore in its epilogue).

---

How does a **leaf function** differ from a **non-leaf function** with respect to `ra` and stack allocation?
?
A **leaf** makes zero nested `call`/`jal` calls (leaving `ra` untouched) and runs with zero stack if it uses only `t0`–`t6`/`a0`–`a7`; a **non-leaf** executes `call`/`jal` and **must** save `ra` on its stack frame in the prologue.

---

What is the stack alignment rule in RARS RV32 assembly versus Linux/GCC compilers, and how is frame size $K$ calculated?
?
In RARS, allocate exact **4-byte word multiples**:
$$K = 4 \cdot \left\lceil \frac{B_{\text{buffers}}}{4} \right\rceil + 4 \cdot N_{\text{regs}}$$
(Rounding $K$ up to 16-byte multiples is standard in Linux/GCC compilers, but optional in RARS as long as every `sw`/`lw` is 4-byte aligned.)

---

What is the mechanical **prologue–epilogue** sequence for a non-leaf procedure with a $K$-byte frame?
?
- **Prologue:** `addi sp, sp, -K`, save `ra` at `(K - 4)(sp)` and used `s*` registers below it (`sw`).
- **Epilogue:** restore `s*` and `ra` (`lw`), release `addi sp, sp, K`, and execute `ret`.

---

Where must C local arrays (`char prima[16];` inside `main`) be placed in RISC-V, and how is `&prima[0]` passed to a subroutine?
?
Inside the function's **stack frame** (at low offsets like `0(sp)`—never in `.data`), computing the base pointer with **`addi a0, sp, offset`** (never `lw`, which loads ASCII bytes instead of the pointer).

---

If a C leaf helper declares local variables literally named `int s0, s1, s2;`, which RISC-V registers should you assign to them?
?
Volatile temporaries **`t0, t1, t2`** — C variable names are arbitrary identifiers, and modifying hardware `s0` inside a zero-stack leaf helper corrupts `main`'s preserved registers.
