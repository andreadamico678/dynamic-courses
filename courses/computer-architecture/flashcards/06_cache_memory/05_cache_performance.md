#flashcards/computer-architecture/cache_memory/cache_performance

What is the single-level **AMAT** formula?
?
$\text{AMAT} = t_{\text{hit}} + (\text{MR} \times \text{MP})$.

What is the two-level (L1 + L2) **AMAT** formula?
?
$\text{AMAT} = t_{\text{hit},L1} + \text{MR}_{L1} \times \big(t_{\text{hit},L2} + \text{MR}_{L2} \times \text{MP}_{L2}\big)$.

What is the **CPI with memory stalls** for split L1 I-cache and D-cache?
?
$\text{CPI} = \text{CPI}_{\text{exe}} + (1 \times \text{MR}_I \times P_I) + (f_{\text{load}} + f_{\text{store}}) \times \text{MR}_D \times P_D$.
