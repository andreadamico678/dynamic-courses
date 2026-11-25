#flashcards/computer-architecture/01_synchronous_digital_systems/01_karnaugh_map_minimization

Qual è la sequenza obbligatoria delle intestazioni di riga e colonna in una mappa di Karnaugh a 4 variabili?
?
Il codice Gray riflesso `00, 01, 11, 10` (distanza di Hamming $d_H = 1$ tra celle adiacenti e tra i bordi opposti `00` e `10`).

---

Quali dimensioni possono avere i raggruppamenti rettangolari validi su una mappa di Karnaugh e quante variabili elimina un gruppo di $2^k$ celle?
?
Esclusivamente potenze di due ($2^k \in \{1, 2, 4, 8, 16, 32\}$); un gruppo di $2^k$ celle elimina esattamente $k$ variabili che cambiano valore.

---

Come vanno trattate le celle *don't care* ($X$) nella minimizzazione SOP su mappa di Karnaugh?
?
Si includono solo se raddoppiano la dimensione di un gruppo che contiene almeno un `1`; non si formano mai gruppi composti esclusivamente da `X`, e le `X` non raggruppate valgono `0`.

---

Come si riconosce operativamente un Implicante Primo Essenziale (EPI) su una mappa di Karnaugh?
?
È un implicante primo massimale che copre almeno una cella `1` non coperta da nessun altro implicante primo; va inserito obbligatoriamente nell'espressione SOP minima.

---

Come si organizza una mappa di Karnaugh a 5 variabili $f(a, b, c, d, e)$ e quando si elimina la variabile $a$?
?
In due sottogriglie $4 \times 4$ sovrapposte: Layer 0 ($a = 0$, mintermini $0 \dots 15$) e Layer 1 ($a = 1$, mintermini $16 \dots 31$ con offset $+16$). Due blocchi con identiche coordinate $(bc, de)$ sui due layer si fondono in 3D eliminando $a$.
