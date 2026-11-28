# Mappe di Karnaugh: Esempi Notevoli di Sintesi Combinatoria

- **Docente:** Maurizio Palesi
- **Riferimento:** Progettazione di Sistemi Digitali — Comparatori, Sommatore a 1 bit e Calcolo Costi/Ritardi

---

## 1. Comparatore a 1 Bit

Un comparatore a 1 bit riceve in ingresso due segnali logici $a$ e $b$ e genera un'uscita $o$.

### 1.1 Comparatore di Uguaglianza ($a = b$)

#### Tabella della Verità
| $a$ | $b$ | $o$ |
| :---: | :---: | :---: |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

#### Mappa di Karnaugh
| $b \backslash a$ | $0$ | $1$ |
| :---: | :---: | :---: |
| **0** | **1** | 0 |
| **1** | 0 | **1** |

Non esistono adiacenze a distanza 1. I mintermini sono isolati. L'espressione è già in forma minima (funzione XNOR):
$$o(a, b) = \overline{a}\,\overline{b} + a\,b = \overline{a \oplus b}$$

---

### 1.2 Comparatore Minore-Uguale ($a \le b$)

#### Tabella della Verità
| $a$ | $b$ | $o$ |
| :---: | :---: | :---: |
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

#### Mappa di Karnaugh
| $b \backslash a$ | $0$ | $1$ |
| :---: | :---: | :---: |
| **0** | **1** | 0 |
| **1** | **1** | **1** |

Raggruppamenti:
- Gruppo verticale (colonna $a = 0$): $\overline{a}$
- Gruppo orizzontale (riga $b = 1$): $b$

Espressione minima:
$$o(a, b) = \overline{a} + b$$

---

## 2. Comparatore a 2 Bit

Due parole da 2 bit: $A = (a_1, a_0)$ e $B = (b_1, b_0)$. Uscita $o$.

### 2.1 Comparatore di Uguaglianza a 2 Bit ($A = B$)

#### Specifica Funzionale
$$o = 1 \iff (a_1 == b_1 \land a_0 == b_0)$$

#### Tabella della Verità (Estratto)
- $o = 1$ per le sole 4 combinazioni in cui i due numeri coincidono:
  - $(a_1 a_0 b_1 b_0) = (0000) \implies 1$
  - $(a_1 a_0 b_1 b_0) = (0101) \implies 1$
  - $(a_1 a_0 b_1 b_0) = (1010) \implies 1$
  - $(a_1 a_0 b_1 b_0) = (1111) \implies 1$
- Tutte le altre 12 configurazioni valgono $0$.

#### Mappa di Karnaugh ($a_1 a_0$ colonna, $b_1 b_0$ riga)
| $b_1 b_0 \backslash a_1 a_0$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **00** | **1** | 0 | 0 | 0 |
| **01** | 0 | **1** | 0 | 0 |
| **11** | 0 | 0 | **1** | 0 |
| **10** | 0 | 0 | 0 | **1** |

Nessuna casella con $1$ è adiacente ad un'altra. L'espressione minima a due livelli coincide con la somma dei 4 mintermini:
$$o(a_1, a_0, b_1, b_0) = \overline{a}_1\,\overline{a}_0\,\overline{b}_1\,\overline{b}_0 + \overline{a}_1\,a_0\,\overline{b}_1\,b_0 + a_1\,a_0\,b_1\,b_0 + a_1\,\overline{a}_0\,b_1\,\overline{b}_0$$
*(In forma multi-livello fattorizzata corrisponde a: $(\overline{a_1 \oplus b_1}) \cdot (\overline{a_0 \oplus b_0})$).*

---

### 2.2 Comparatore Minore-Uguale a 2 Bit ($A \le B$)

#### Specifica Funzionale
$$o = 1 \iff (a_1 == b_1 \land a_0 \le b_0) \lor (a_1 < b_1)$$

#### Mappa di Karnaugh ($a_1 a_0$ colonna, $b_1 b_0$ riga)
| $b_1 b_0 \backslash a_1 a_0$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **00** | **1** | 0 | 0 | 0 |
| **01** | **1** | **1** | 0 | 0 |
| **11** | **1** | **1** | **1** | **1** |
| **10** | **1** | **1** | 0 | **1** |

Copertura minima con 5 implicanti primi essenziali:
1. Gruppo colonna $00$: $\overline{a}_1\,\overline{a}_0$
2. Gruppo riga $11$: $b_1\,b_0$
3. Gruppo riga $10$ e $11$ su colonne $00, 01$: $\overline{a}_1\,b_1$
4. Gruppo riga $01$ e $11$ su colonne $00, 01$: $\overline{a}_0\,b_0$
5. Gruppo adiacenze su $b_1$ e $a_1$: $\overline{a}_1\,b_0$ e $\overline{a}_0\,b_1$

Espressione minima SOP:
$$o(a_1, a_0, b_1, b_0) = \overline{a}_1\,\overline{a}_0 + b_1\,b_0 + \overline{a}_0\,b_1 + \overline{a}_1\,b_0 + \overline{a}_1\,b_1$$

---

## 3. Sommatore Completo a 1 Bit (Full Adder)

Il Full Adder calcola la somma aritmetica di due bit $a, b$ e del riporto in ingresso $c_i$, producendo la somma $o$ e il riporto in uscita $c_o$.

### Tabella della Verità
| $a$ | $b$ | $c_i$ | $c_o$ (Carry out) | $o$ (Sum) |
| :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 |

### Mappe di Karnaugh

#### Riporto in Uscita $c_o(a, b, c_i)$
| $c_i \backslash ab$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | 0 | 0 | **1** | 0 |
| **1** | 0 | **1** | **1** | **1** |

Tre coppie adiacenti di dimensione 2:
$$c_o(a, b, c_i) = a\,b + b\,c_i + a\,c_i$$

#### Bit di Somma $o(a, b, c_i)$
| $c_i \backslash ab$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | 0 | **1** | 0 | **1** |
| **1** | **1** | 0 | **1** | 0 |

Nessuna adiacenza; schema a scacchiera (parità dispari):
$$o(a, b, c_i) = \overline{a}\,\overline{b}\,c_i + \overline{a}\,b\,\overline{c}_i + a\,\overline{b}\,\overline{c}_i + a\,b\,c_i = a \oplus b \oplus c_i$$

---

## 4. Esercizio Completo con Calcolo di Area e Cammino Critico

Data la mappa di Karnaugh a 4 variabili:
```text
cd \ ab   00   01   11   10
  00       0   [ 1]   0    0
  01     [ 1]  [ 1]   0   [ 1]
  11       0   [ 1]  [ 1] [ 1]
  10       0   [ 1]  [ 1]   0
```

### Espressione Minima Ricavata
$$f(a, b, c, d) = \overline{a}\,b + b\,c + \overline{a}\,\overline{c}\,d + b\,c\,d$$

### Valutazione Hardware con Sole Porte a 2 Ingressi e Ritardo Unitario
1. **Calcolo Porte AND (primo livello):**
   - $\overline{a}\,b$: 2 ingressi $\implies 1$ porta AND
   - $b\,c$: 2 ingressi $\implies 1$ porta AND
   - $\overline{a}\,\overline{c}\,d$: 3 ingressi $\implies 2$ porte AND a 2 ingressi
   - $b\,c\,d$: 3 ingressi $\implies 2$ porte AND a 2 ingressi
   - *Totale porte AND:* $1 + 1 + 2 + 2 = 6$ porte.
2. **Calcolo Porte OR (secondo livello):**
   - Somma di 4 termini prodotto $\implies 4 - 1 = 3$ porte OR a 2 ingressi (struttura ad albero bilanciato).
3. **Area Totale:**
   $$\text{Area} = 6 \text{ (AND)} + 3 \text{ (OR)} = 9 \text{ porte logiche}$$
4. **Cammino Critico:**
   - Termini a 3 ingressi attraversano 2 porte AND ($\text{ritardo } 2$).
   - L'albero OR a 4 ingressi richiede 2 stadi di porte a 2 ingressi ($\lceil \log_2 4 \rceil = 2$).
   - Attraversamento in cascata / albero: $2 + 3 = 5$ porte di ritardo (o $2 + 2 = 4$ se perfettamente bilanciato ad albero).
