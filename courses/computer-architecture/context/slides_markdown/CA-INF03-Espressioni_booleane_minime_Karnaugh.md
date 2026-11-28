# Mappe di Karnaugh: Teoria e Minimizzazione a Due Livelli

- **Docente:** Maurizio Palesi
- **Riferimento:** Progettazione di Sistemi Digitali — Espressioni Booleane Minime

---

## 1. Obiettivi della Minimizzazione

Nelle espressioni booleane a due livelli in forma **SP** (Somma di Prodotti, o SOP) e **PS** (Prodotto di Somme, o POS), l'ottimizzazione persegue due scopi ordinati:
1. **Ridurre il numero di mintermini (o maxtermini):** Minimizza il numero di porte del primo livello (linee di prodotto o somma).
2. **Ridurre il numero di letterali:** Minimizza il fan-in (numero di ingressi) di ciascuna porta e il cablaggio associato.

*Esempio di riduzione algebrica:*
$$f(a, b, c) = a\,b\,\overline{c} + a\,b\,c + \overline{a}\,b\,c \iff f(a, b, c) = a\,b + b\,c$$

### Metodologie Principali
- **Mappe di Karnaugh:** Metodo grafico esatto, ottimale ed intuitivo per funzioni da 2 a 4 variabili (estendibile con difficoltà a 5–6 variabili; impraticabile oltre).
- **Metodo di Quine-McCluskey / Espresso:** Metodi tabulari ed algoritmici automatizzabili via software (CAD logico).

---

## 2. Principio Algebrico di Adiacenza

La minimizzazione sfrutta l'assioma fondamentale di complementazione:
- **Per forma SP:**
  $$a \cdot Z + \overline{a} \cdot Z = (a + \overline{a}) \cdot Z = 1 \cdot Z = Z$$
  dove $Z$ è un termine prodotto (implicante) a $(n-1)$ variabili.
- **Per forma PS:**
  $$(a + Z) \cdot (\overline{a} + Z) = a\,\overline{a} + Z = 0 + Z = Z$$
  dove $Z$ è un termine somma a $(n-1)$ variabili.

*Esempio:*
$$a\,b\,\overline{c} + a\,b\,c = a\,b\,(\overline{c} + c) = a\,b$$

### Il Problema dell'Applicazione Algebrica Diretta
Applicare ripetutamente la riduzione a mano risulta complesso perché:
1. Occorre individuare tutti i termini minimizzabili.
2. Alcuni mintermini devono essere **replicati** (sfruttando l'idempotenza $x + x = x$) per partecipare a più raggruppamenti simultaneamente.

*Esempio di insidia:*
$$f(a, b) = \overline{a}\,b + a\,b + a\,\overline{b}$$
- Raggruppando parzialmente: $(\overline{a} + a)b + a\,\overline{b} = b + a\,\overline{b}$ (non minima: 3 letterali).
- Replicando il mintermine centrale $a\,b$:
  $$\overline{a}\,b + a\,b + a\,b + a\,\overline{b} = (\overline{a} + a)b + a(b + \overline{b}) = b + a$$
  che rappresenta la vera forma minima (2 letterali).

---

## 3. Struttura Geometrica delle Mappe di Karnaugh

Una mappa di Karnaugh mappa lo spazio booleano $n$-dimensionale ($n$-cubo) su una griglia bidimensionale in cui:
- Le righe e le colonne sono ordinate secondo il **codice Gray** ($00, 01, 11, 10$), per cui due caselle adiacenti differiscono per **un solo bit** (distanza di Hamming $d_H = 1$).
- La mappa è **toroidale**: la prima colonna è adiacente all'ultima colonna; la prima riga è adiacente all'ultima riga.

### Griglie di Riferimento per 2, 3 e 4 Variabili

#### 2 Variabili ($a, b$)
| $b \backslash a$ | $0$ | $1$ |
| :---: | :---: | :---: |
| **0** | $m_0\ (00)$ | $m_2\ (10)$ |
| **1** | $m_1\ (01)$ | $m_3\ (11)$ |

#### 3 Variabili ($a, b, c$ con $ab$ colonna, $c$ riga)
| $c \backslash ab$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | $m_0\ (000)$ | $m_2\ (010)$ | $m_6\ (110)$ | $m_4\ (100)$ |
| **1** | $m_1\ (001)$ | $m_3\ (011)$ | $m_7\ (111)$ | $m_5\ (101)$ |

#### 4 Variabili ($a, b, c, d$ con $ab$ colonna, $cd$ riga)
| $cd \backslash ab$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **00** | $m_0\ (0000)$ | $m_4\ (0100)$ | $m_{12}\ (1100)$ | $m_8\ (1000)$ |
| **01** | $m_1\ (0001)$ | $m_5\ (0101)$ | $m_{13}\ (1101)$ | $m_9\ (1001)$ |
| **11** | $m_3\ (0011)$ | $m_7\ (0111)$ | $m_{15}\ (1111)$ | $m_{11}\ (1011)$ |
| **10** | $m_2\ (0010)$ | $m_6\ (0110)$ | $m_{14}\ (1110)$ | $m_{10}\ (1010)$ |

---

## 4. Regole di Sintesi Grafica

1. **Dimensione dei raggruppamenti:** I cubi devono contenere un numero di caselle pari a una potenza di due: $2^m \in \{1, 2, 4, 8, 16\}$.
   - Un gruppo di $2^m$ caselle adiacenti elimina $m$ variabili, lasciando un termine prodotto di $(n - m)$ letterali.
2. **Massima dimensione:** A parità di copertura, scegliere sempre il cubo di dimensione maggiore (meno letterali).
3. **Minimo numero di cubi:** Selezionare il minor numero possibile di raggruppamenti per coprire tutti gli $1$ dell'On-set.
4. **Non ridondanza:** Non selezionare cubi i cui $1$ risultano già coperti da altri implicanti primi essenziali selezionati.

---

## 5. Esempi di Minimizzazione Guidata

### Esempio: Minimizzazione a 4 Variabili
Data la funzione con On-set:
$$f(a, b, c, d) = \sum m(0, 2, 3, 6, 7, 8, 12, 13, 14, 15)$$

Mappa di Karnaugh:
```text
cd \ ab   00   01   11   10
  00     [ 1]   0   [ 1] [ 1]
  01       0    0   [ 1]   0
  11     [ 1] [ 1]  [ 1] [ 1]
  10     [ 1] [ 1]    0    0
```

Analisi degli implicanti primi:
- **Cubo 1 (riga $cd = 11$ intera):** copre $(3, 7, 15, 11) \implies c \cdot d$ (dimensione 4).
- **Cubo 2 (colonna $ab = 11$, righe $00, 01, 11$):** copre $(12, 13, 15, 14) \implies a \cdot b$ oppure gruppo $a \cdot \overline{c} \cdot \overline{d}$.
- **Cubo 3 ($cd \in \{11, 10\}, ab \in \{00, 01\}$):** copre $(2, 3, 6, 7) \implies \overline{a} \cdot c$ (dimensione 4).
- **Cubo 4 (angoli o adiacenze specifiche):** copre $(0, 2, 4 \dots)$.
- Confrontando le alternative:
  1. $f_1 = a \cdot \overline{c} + b \cdot c \cdot \overline{d} + \overline{a} \cdot c + c \cdot d$ (copertura minima ottima).
  2. $f_2 = a \cdot \overline{c} + b \cdot c \cdot \overline{d} + \overline{a} \cdot c + a \cdot c \cdot d$.
  3. $f_3 = a \cdot \overline{c} + b \cdot c \cdot \overline{d} + a \cdot c \cdot d + c \cdot d$.
  Tutte e tre sono equivalenti per correttezza logica, ma la prima ($f_1$) ha costo di letterali inferiore ed è la forma minima.

---

## 6. Gestione delle Condizioni di Indifferenza (Don't Care)

Nelle funzioni non completamente specificate (uscite con valore $-$):
- Le caselle con $-$ **non devono obbligatoriamente essere coperte**.
- Possono essere impostate a $1$ se consentono di espandere un cubo raddoppiandone la dimensione (eliminando un letterale).
- Vengono lasciate a $0$ se non apportano alcun beneficio di semplificazione.

| Strategia | Imposizione delle Indifferenze | Risultato ottenuto |
| :--- | :--- | :--- |
| **Imponendo 0 su tutti i DC** | Cubi limitati ai soli mintermini certi | $f = a\,\overline{b}\,\overline{d} + a\,\overline{b}\,\overline{c} + \overline{a}\,c\,d$ (3 prodotti, 9 letterali) |
| **Sfruttando opportunamente i DC come 1** | Cubi espansi a dimensione doppia | $f = a\,\overline{b} + \overline{a}\,\overline{b}\,\overline{c} + c\,d$ (3 prodotti, 7 letterali, area e ritardo inferiori) |
