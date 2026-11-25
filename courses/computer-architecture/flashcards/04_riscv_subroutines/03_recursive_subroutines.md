#flashcards/computer-architecture/04_03_recursive_subroutines

Quali valori minimi deve salvare nello stack frame ogni attivazione di una subroutine ricorsiva lineare (es. `n * fact(n - 1)`)?
?
L'indirizzo di ritorno `ra` e il parametro vivo `n` (salvando `a0` in uno slot dello stack oppure salvando `s0` nel prologo e copiando `mv s0, a0`).

---

Perché l'argomento `a0` deve essere salvato in `s0` o sullo stack prima di eseguire una `jal` / `call` ricorsiva?
?
Perché `a0` viene prima sovrascritto per passare l'argomento figlio (es. `n - 1`) e poi sovrascritto di nuovo dal valore di ritorno della chiamata ricorsiva.

---

Cosa accade a runtime se una funzione ricorsiva dimentica di salvare e ripristinare `ra` sullo stack?
?
Ogni `jal` ricorsiva sovrascrive `ra` con l'indirizzo interno alla funzione stessa, causando un ciclo infinito su `ret` al rientro dal caso base.

---

In una ricorsione a doppia ramificazione come `F(n - 1) + F(n - 2)`, come si protegge il risultato della prima chiamata durante la seconda?
?
Si salva sia `s0` (per conservare `n`) sia `s1` nello stack frame, copiando il risultato di `F(n - 1)` in `s1` (`mv s1, a0`) prima di invocare `F(n - 2)`.

---

Come deve terminare il caso base di una funzione ricorsiva che ha già allocato il frame (`addi sp, sp, -16`) nel prologo?
?
Deve caricare il valore base in `a0` e saltare all'epilogo condiviso (`j epilogue`) per ripristinare `ra`, eseguire `addi sp, sp, 16` e infine `ret`.

---

Quanto spazio di picco sullo stack consuma una ricorsione con profondità massima simultanea $D_{\max}$ e frame allineato di $K$ byte?
?
$B_{\text{peak}} = D_{\max} \cdot K$ byte (deallocati poi in ordine LIFO durante il rientro).
