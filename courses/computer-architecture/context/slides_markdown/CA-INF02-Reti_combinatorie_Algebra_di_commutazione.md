# Reti Combinatorie: Algebra di Commutazione

- **Docente:** Maurizio Palesi
- **Riferimento:** Progettazione di Sistemi Digitali — Reti Combinatorie

---

## 1. Introduzione all'Algebra Booleana

Per descrivere e sintetizzare dispositivi digitali è indispensabile disporre di:
1. Un modello matematico formale che rappresenti insiemi di numeri binari.
2. Le funzioni che stabiliscono le relazioni tra ingressi e uscite.

### Definizione Formale
Un'algebra booleana è definita come una quintupla:
$$\langle B, \text{op}_1, \text{op}_2, a, b \rangle$$
dove:
- $B$: Insieme di definizione su cui agiscono le operazioni.
- $\text{op}_1, \text{op}_2$: Operazioni binarie interne ($B \times B \to B$).
- $a, b \in B$: Elementi neutri rispettivamente per $\text{op}_1$ e $\text{op}_2$.

### Algebra di Commutazione
L'algebra booleana a due soli valori ($|B| = 2$) prende il nome di **Algebra di Commutazione**:
- $B = \{0, 1\}$
- $\text{op}_1 = \text{AND}$ (prodotto logico): vale $1$ se e solo se entrambi gli operandi valgono $1$, altrimenti $0$. Elemento neutro $a = 1$.
- $\text{op}_2 = \text{OR}$ (somma logica): vale $0$ se e solo se entrambi gli operandi valgono $0$, altrimenti $1$. Elemento neutro $b = 0$.
- Dalla presenza di due soli elementi discende l'operatore unario di negazione/complemento:
  - $\text{NOT}$: $\text{NOT}(0) = 1$, $\text{NOT}(1) = 0$.

---

## 2. Descrizione delle Funzioni Booleane

Una generica funzione dell'algebra di commutazione può essere descritta in tre modi equivalenti:
1. In forma vettoriale multi-uscita: $f(B^n) \to B^m$
2. Insieme di $m$ funzioni scalari a singola uscita: $f_i(B^n) \to B$, con $i = 1, 2, \dots, m$
3. **Tabella della Verità** (Truth Table), che elenca l'uscita associata a ciascuna delle $2^n$ combinazioni degli ingressi.

### Tabelle della Verità Fondamentali

| $x$ | $y$ | $\text{AND}(x, y)$ ($x \cdot y$) | $\text{OR}(x, y)$ ($x + y$) | $\text{NOT}(x)$ ($\overline{x}$) |
| :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 |

### Notazioni Simboliche
- $\text{AND}(x, y) \implies z = x \cdot y \implies z = xy$
- $\text{OR}(x, y) \implies z = x + y$
- $\text{NOT}(x) \implies z = \overline{x} \implies z = x'$

---

## 3. Postulati e Teoremi dell'Algebra di Commutazione

| Proprietà | Forma AND (Prodotto) | Forma OR (Somma) |
| :--- | :--- | :--- |
| **Identità** | $1 \cdot x = x$ | $0 + x = x$ |
| **Elemento Nullo (Assorbimento di costante)** | $0 \cdot x = 0$ | $1 + x = 1$ |
| **Idempotenza** | $x \cdot x = x$ | $x + x = x$ |
| **Inverso (Complementarità)** | $x \cdot \overline{x} = 0$ | $x + \overline{x} = 1$ |
| **Commutativa** | $x \cdot y = y \cdot x$ | $x + y = y + x$ |
| **Associativa** | $(x \cdot y) \cdot z = x \cdot (y \cdot z)$ | $(x + y) + z = x + (y + z)$ |
| **Distributiva** | $x \cdot (y + z) = (x \cdot y) + (x \cdot z)$ | $x + (y \cdot z) = (x + y) \cdot (x + z)$ |
| **Assorbimento** | $x \cdot (x + y) = x$ | $x + (x \cdot y) = x$ |
| **Teoremi di De Morgan** | $\overline{x \cdot y} = \overline{x} + \overline{y}$ | $\overline{x + y} = \overline{x} \cdot \overline{y}$ |

### Teorema di Espansione di Shannon
Data una qualsiasi funzione booleana $f(B^n) \to B$:
- **Forma Somma (Shannon SOP):**  
  $$f(x_1, x_2, \dots, x_n) = x_1 \cdot f(1, x_2, \dots, x_n) + \overline{x}_1 \cdot f(0, x_2, \dots, x_n)$$
- **Forma Prodotto (Shannon POS):**  
  $$f(x_1, x_2, \dots, x_n) = \left(x_1 + f(0, x_2, \dots, x_n)\right) \cdot \left(\overline{x}_1 + f(1, x_2, \dots, x_n)\right)$$
*Dimostrazione:* per induzione matematica completa sul numero di variabili.

### Principio di Dualità
Un'equazione booleana rimane valida se si applica l'operatore duale a entrambi i membri:
- Si sostituisce ogni operatore $\text{AND}$ con $\text{OR}$ e viceversa.
- Si sostituisce ogni costante $1$ con $0$ e viceversa.

*Esempi di coppie duali:*
1. $x + xy = x(1 + y) = x \iff x(x + y) = x + (0 \cdot y) = x$
2. $xy + x\overline{y} = x(y + \overline{y}) = x \iff (x + y)(x + \overline{y}) = x + (y\overline{y}) = x$
3. $x + \overline{x}y = (x + \overline{x})(x + y) = x + y \iff x(\overline{x} + y) = x\overline{x} + xy = xy$

### Teorema del Consenso
$$xy + \overline{x}z + yz = xy + \overline{x}z$$

*Dimostrazione algebrica:*
$$
\begin{aligned}
xy + \overline{x}z + yz &= xy + \overline{x}z + yz(x + \overline{x}) \\
&= xy + \overline{x}z + xyz + \overline{x}yz \\
&= xy(1 + z) + \overline{x}z(1 + y) \\
&= xy(1) + \overline{x}z(1) \\
&= xy + \overline{x}z \quad \blacksquare
\end{aligned}
$$

Applicando il principio di dualità si ottiene la forma POS:
$$(x + y)(\overline{x} + z)(y + z) = (x + y)(\overline{x} + z)$$

---

## 4. Dalla Funzione Logica al Circuito Elettronico

Per implementare una funzione booleana in un circuito hardware:
- Le **variabili** corrispondono a **conduttori elettrici** (linee di segnale).
- Gli **operatori** corrispondono a **porte logiche** (interruttori a semiconduttore).

### Transistori CMOS (Tipo N e Tipo P)
- **NMOS (Tipo N):** Conduce quando il potenziale sul terminale di Gate è alto ($\text{Gate} = 1 \implies \text{conduzione}$ verso massa $0\text{ V}$).
- **PMOS (Tipo P):** Conduce quando il potenziale sul terminale di Gate è basso ($\text{Gate} = 0 \implies \text{conduzione}$ verso alimentazione $V_{DD}$, es. $3\text{ V}$).

La **porta logica NOT CMOS** è composta da una coppia complementare:
- Pull-Up Network (PUN): 1 transistor PMOS collegato tra $V_{DD}$ e l'uscita $z$.
- Pull-Down Network (PDN): 1 transistor NMOS collegato tra l'uscita $z$ e GND ($0\text{ V}$).
- Se $x = 0$: PMOS conduce, NMOS è interdetto $\implies z = 3\text{ V}$ (livello logico $1$).
- Se $x = 1$: PMOS è interdetto, NMOS conduce $\implies z = 0\text{ V}$ (livello logico $0$).

### Porte Logiche Derivate

| Nome | Simbolo Logico / Descrizione | Espressione | Tabella di Verità ($x, y \to z$) |
| :--- | :--- | :--- | :--- |
| **NAND** | Porta AND con uscita invertita | $z = \overline{x \cdot y}$ | $(0,0)\to 1;\ (0,1)\to 1;\ (1,0)\to 1;\ (1,1)\to 0$ |
| **NOR** | Porta OR con uscita invertita | $z = \overline{x + y}$ | $(0,0)\to 1;\ (0,1)\to 0;\ (1,0)\to 0;\ (1,1)\to 0$ |
| **XOR** | OR Esclusivo (diversità) | $z = x \oplus y = x\overline{y} + \overline{x}y$ | $(0,0)\to 0;\ (0,1)\to 1;\ (1,0)\to 1;\ (1,1)\to 0$ |
| **XNOR** | Equivalenza logica | $z = \overline{x \oplus y} = xy + \overline{x}\,\overline{y}$ | $(0,0)\to 1;\ (0,1)\to 0;\ (1,0)\to 0;\ (1,1)\to 1$ |

### Insiemi Funzionalmente Completi (Operatori Universali)
Un insieme di operatori è detto universale se consente di esprimere qualsiasi funzione booleana:
1. $\{\text{AND}, \text{NOT}\}$:
   $$x + y = \overline{\overline{x + y}} = \overline{\overline{x} \cdot \overline{y}}$$
2. $\{\text{OR}, \text{NOT}\}$:
   $$x \cdot y = \overline{\overline{x \cdot y}} = \overline{\overline{x} + \overline{y}}$$
3. $\{\text{NAND}\}$ è universale:
   - $\overline{x} = x \text{ NAND } x$
   - $x \cdot y = \overline{x \text{ NAND } y} = (x \text{ NAND } y) \text{ NAND } (x \text{ NAND } y)$
   - $x + y = \overline{x} \text{ NAND } \overline{y} = (x \text{ NAND } x) \text{ NAND } (y \text{ NAND } y)$
4. $\{\text{NOR}\}$ è universale:
   - $\overline{x} = x \text{ NOR } x$
   - $x + y = \overline{x \text{ NOR } y} = (x \text{ NOR } y) \text{ NOR } (x \text{ NOR } y)$
   - $x \cdot y = \overline{x} \text{ NOR } \overline{y} = (x \text{ NOR } x) \text{ NOR } (y \text{ NOR } y)$

---

## 5. Livelli di Espressioni e Reti a 2 Livelli

- **Numero di livelli:** Il massimo numero di operatori in cascata attraversati da un percorso che va dai letterali di ingresso all'uscita.
- Esempio di espressione a due livelli:
  $$F = x \cdot y + x + z + y \cdot w$$
  - *Primo livello:* Porte AND ($x \cdot y$, $y \cdot w$).
  - *Secondo livello:* Porta OR che somma tutti i termini.

---

## 6. Forme Canoniche e Terminologia Topologica

Dato uno spazio booleano a $n$ variabili, le $2^n$ combinazioni costituiscono i vertici di un **$n$-cubo** (ipercubo booleano), dove due vertici adiacenti differiscono per una distanza di Hamming unitaria ($d_H = 1$).

### Definizioni Cruciali
- **Letterale:** Variabile booleana diretta o negata (es. $a, \overline{a}$).
- **Implicante:** Un prodotto di letterali $P$ tale che, per ogni assegnazione per cui $P = 1$, anche la funzione vale $1$ ($P \implies f$). Geometricamente corrisponde a un sottocubo di soli $1$ di dimensione $2^k$ (con $k$ variabili eliminate).
- **Mintermine ($m_i$):** Implicante contenente tutte le $n$ variabili della funzione. Vale $1$ per un singolo punto dello spazio booleano. L'indice decimale $i$ è il codice binario dell'assegnazione.
- **Maxtermine ($M_i$):** Termine somma contenente tutte le $n$ variabili che vale $0$ per una sola assegnazione dello spazio. Relazione fondamentale:
  $$M_i = \overline{m_i}$$
- **On-set:** Insieme dei mintermini per cui la funzione vale $1$.
- **Off-set:** Insieme dei maxtermini per cui la funzione vale $0$.
- **Don't care set (DC-set):** Insieme delle configurazioni di indifferenza (indicate con '$-$') in cui il valore dell'uscita non è vincolato.
- **Implicante Primo:** Implicante che non è contenuto interamente in nessun altro implicante di dimensione maggiore (non espandibile).
- **Implicante Essenziale:** Implicante primo che copre almeno un mintermine non coperto da alcun altro implicante primo.
- **Copertura:** Un insieme di implicanti la cui unione copre interamente l'On-set della funzione.

### Prima e Seconda Forma Canonica
1. **Prima Forma Canonica (SOP - Somma di Prodotti):**
   Somma logica di tutti i mintermini dell'On-set:
   $$f(x_1, \dots, x_n) = \sum_{m_i \in \text{On-set}} m_i$$
2. **Seconda Forma Canonica (POS - Prodotto di Somme):**
   Prodotto logico di tutti i maxtermini dell'Off-set:
   $$f(x_1, \dots, x_n) = \prod_{M_i \in \text{Off-set}} M_i$$

---

## 7. Esercizi Risolti Dettagliati

### Esercizio 1: Semplificazione tramite Teorema del Consenso
**Traccia:** Semplificare l'espressione $(a + b)(\overline{a} + c)$.
**Svolgimento:**
1. Applichiamo la proprietà distributiva:
   $$(a + b)(\overline{a} + c) = a\overline{a} + ac + \overline{a}b + bc$$
2. Poiché $a\overline{a} = 0$:
   $$= ac + \overline{a}b + bc$$
3. Nel termine $bc$, $b$ è associato ad $\overline{a}$ e $c$ è associato ad $a$. Per il Teorema del Consenso ($xy + \overline{x}z + yz = xy + \overline{x}z$, ponendo $x = c, y = a, z = b$):
   $$bc \text{ è il termine di consenso ridondante}$$
4. Espressione minima:
   $$ac + \overline{a}b$$

---

### Esercizio 2: Sintesi XNOR mediante sole porte NAND a 1 e 2 ingressi
**Traccia:** Realizzare una porta XNOR ($z = \overline{x \oplus y} = xy + \overline{x}\,\overline{y}$) utilizzando solo porte NAND.
**Svolgimento:**
1. Partiamo da XOR: $x \oplus y = x\overline{y} + \overline{x}y$.
2. XNOR è la negazione di XOR:
   $$z = \overline{x\overline{y} + \overline{x}y}$$
3. Applicando De Morgan:
   $$z = \overline{x\overline{y}} \cdot \overline{\overline{x}y}$$
   che corrisponde al prodotto di due uscite NAND.
4. Negando due volte per ottenere solo operatori NAND:
   $$z = \overline{\overline{\overline{x\overline{y}} \cdot \overline{\overline{x}y}}}$$
5. Utilizzando le porte NAND a 1 ingresso come invertitori per ottenere $\overline{x}$ e $\overline{y}$:
   - $N_1 = \overline{x} = x \text{ NAND } x$
   - $N_2 = \overline{y} = y \text{ NAND } y$
   - $N_3 = \overline{x \cdot \overline{y}} = x \text{ NAND } N_2$
   - $N_4 = \overline{\overline{x} \cdot y} = N_1 \text{ NAND } y$
   - $N_5 = \overline{N_3 \cdot N_4} = N_3 \text{ NAND } N_4$ (questo genera XOR)
   - $z = \overline{N_5} = N_5 \text{ NAND } N_5$ (invertitore finale per XNOR).

---

### Esercizio 3: Generatore e Rilevatore di Parità (Even Parity)
**Traccia:** Progettare un generatore e un verificatore di parità per parole dati da $N = 3$ bit ($i_1, i_2, i_3$). L'uscita di parità $P$ deve garantire che la parola trasmessa $(i_1, i_2, i_3, P)$ contenga un numero pari di bit a $1$.

**Funzione del Generatore:**
$P = 1$ se il numero di $1$ in $(i_1, i_2, i_3)$ è dispari, altrimenti $P = 0$.
$$P = i_1 \oplus i_2 \oplus i_3$$

| $i_1$ | $i_2$ | $i_3$ | $P$ (Bit Parità) | Somma $1$ totali |
| :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 (pari) |
| 0 | 0 | 1 | 1 | 2 (pari) |
| 0 | 1 | 0 | 1 | 2 (pari) |
| 0 | 1 | 1 | 0 | 2 (pari) |
| 1 | 0 | 0 | 1 | 2 (pari) |
| 1 | 0 | 1 | 0 | 2 (pari) |
| 1 | 1 | 0 | 0 | 2 (pari) |
| 1 | 1 | 1 | 1 | 4 (pari) |

**Funzione del Controllore (Ricevitore):**
Riceve i $4$ bit $(i_1, i_2, i_3, P)$. L'uscita di errore $C$ segnala anomalia ($C = 1$) se la parità totale è dispari:
$$C = i_1 \oplus i_2 \oplus i_3 \oplus P$$
Se $C = 0 \implies$ nessun errore singolo rilevato; se $C = 1 \implies$ errore di trasmissione rilevato.
