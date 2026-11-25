#flashcards/computer-architecture/01_synchronous_digital_systems/04_implication_table_minimization

Come si etichettano righe e colonne della tabella delle implicazioni triangolare inferiore per $N$ stati $\{S_0, \dots, S_{N-1}\}$?
?
Righe dall'alto in basso con $S_1 \dots S_{N-1}$ e colonne da sinistra a destra con $S_0 \dots S_{N-2}$, formando $\frac{N(N-1)}{2}$ celle.

---

Quale regola determina la sbarratura immediata ($\times$) al Passo 1 della tabella delle implicazioni?
?
Se gli stati $S_i$ e $S_j$ producono uscite diverse ($\lambda(S_i, x) \neq \lambda(S_j, x)$) anche per un solo ingresso $x$, la cella $(S_i, S_j)$ viene immediatamente marcata con $\times$.

---

Cosa si inserisce al Passo 2 in una cella non sbarrata $(S_i, S_j)$ quando gli stati prossimi coincidono ($P = Q$) o formano un'auto-implicazione ($\{P, Q\} = \{S_i, S_j\}$)?
?
Tali vincoli banali si scartano; se tutti gli ingressi producono solo identità o auto-implicazioni, la cella si marca con $\checkmark$ (equivalenza incondizionata).

---

Come funziona la cancellazione a cascata nella tabella delle implicazioni e quando termina?
?
In ogni scansione si sbarra con $\times$ qualunque cella che implichi almeno una coppia $(P, Q)$ già marcata $\times$; si ripete finché un'intera passata non produce zero nuove $\times$ (punto fisso).

---

Come si ricavano le classi di stato minime dalle celle sopravvissute al punto fisso della tabella delle implicazioni?
?
Ogni cella non sbarrata indica $S_i \equiv S_j$; si uniscono le coppie per chiusura transitiva ($S_i \equiv S_j \land S_j \equiv S_k \implies \{S_i, S_j, S_k\}$) lasciando isolati gli stati senza compatibilità.
