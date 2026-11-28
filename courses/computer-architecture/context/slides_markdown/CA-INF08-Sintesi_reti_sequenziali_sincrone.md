# Sintesi di Reti Sequenziali Sincrone (FSM)

- **Docente:** Maurizio Palesi
- **Riferimento:** Progettazione di Sistemi Digitali — Macchine a Stati Finiti di Mealy e Moore, Modello di Huffman e Procedura di Sintesi

---

## 1. Definizione Formale di Macchina Sequenziale

Una macchina sequenziale a stati finiti (FSM, *Finite State Machine*) è formalmente definita dalla quintupla:
$$\mathcal{M} = \langle I, U, S, \delta, \lambda \rangle$$
dove:
- $I$: Insieme finito dei simboli d'ingresso ($\{i_1, i_2, \dots, i_p\}$ codificati su $n$ bit).
- $U$: Insieme finito dei simboli d'uscita ($\{u_1, u_2, \dots, u_q\}$ codificati su $m$ bit).
- $S$: Insieme finito e non vuoto degli stati interni ($\{s_0, s_1, \dots, s_{k-1}\}$).
- $\delta$: Funzione di transizione di stato prossimo:
  $$\delta: S \times I \to S \quad \implies \quad s^{t+1} = \delta(s^t, i^t)$$
- $\lambda$: Funzione delle uscite:
  - **Macchina di Mealy:** L'uscita dipende congiuntamente dallo stato attuale e dall'ingresso attuale:
    $$\lambda_{\text{Mealy}}: S \times I \to U \quad \implies \quad u^t = \lambda(s^t, i^t)$$
  - **Macchina di Moore:** L'uscita dipende esclusivamente dallo stato interno corrente:
    $$\lambda_{\text{Moore}}: S \to U \quad \implies \quad u^t = \lambda(s^t)$$

---

## 2. Il Modello Canonico di Huffman

La struttura hardware di una rete sequenziale sincrona è descritta dal modello di Huffman:
- **Rete Combinatoria:** Calcola le uscite primarie $Z_1, \dots, Z_m$ e i segnali di eccitazione per la memoria di stato a partire dagli ingressi primari $X_1, \dots, X_n$ e dai segnali di stato presente $y_1, \dots, y_k$.
- **Memoria di Stato:** Banco di $k$ flip-flop sincroni sincronizzati dallo stesso segnale di Clock ($C_k$). All'arrivo del fronte attivo di clock, i valori di stato prossimo $Y_1, \dots, Y_k$ vengono trasferiti alle uscite $y_1, \dots, y_k$.

---

## 3. Tabella e Diagramma degli Stati

### 3.1 Diagramma degli Stati
È un grafo orientato $G(V, E, L)$ in cui:
- Ogni nodo $v \in V$ rappresenta uno stato $s_i \in S$.
  - Nelle macchine di Moore, l'uscita è indicata internamente al nodo ($s_i / u_i$).
- Ogni arco orientato $e \in E$ rappresenta una transizione valida.
  - Nelle macchine di Mealy, l'arco è etichettato con la coppia ingresso/uscita ($i_x / u_y$).
  - Nelle macchine di Moore, l'arco è etichettato solo con il simbolo d'ingresso ($i_x$).

### 3.2 Struttura della Tabella degli Stati

#### Macchina di Mealy
| Stato Presente | Ingresso $i_1$ ($s^{t+1} / u$) | Ingresso $i_2$ ($s^{t+1} / u$) | $\dots$ |
| :---: | :---: | :---: | :---: |
| $s_0$ | $s_1 / u_1$ | $s_2 / u_2$ | $\dots$ |
| $s_1$ | $s_1 / u_0$ | $s_2 / u_1$ | $\dots$ |

#### Macchina di Moore
| Stato Presente | Ingresso $i_1$ ($s^{t+1}$) | Ingresso $i_2$ ($s^{t+1}$) | $\dots$ | Uscita $U$ |
| :---: | :---: | :---: | :---: | :---: |
| $s_0$ | $s_1$ | $s_2$ | $\dots$ | $u_1$ |
| $s_1$ | $s_1$ | $s_2$ | $\dots$ | $u_0$ |

---

## 4. La Procedura Standard di Sintesi in 8 Passi

1. **Specifica formale e Diagramma degli Stati:** Modellazione del testo delle specifiche in grafo orientato.
2. **Tabella degli Stati:** Trascrizione ordinata del diagramma.
3. **Minimizzazione degli Stati:** Identificazione ed eliminazione degli stati equivalenti (tramite partizioni successive o tabella triangolare delle implicazioni).
4. **Codifica degli Stati Interni (*State Assignment*):**
   - Associazione di una parola binaria univoca a ciascuno stato simbolico.
   - Con $|S|$ stati, il numero minimo di bit necessari è:
     $$k = \lceil \log_2 |S| \rceil$$
   - Il numero di possibili codifiche a minimo numero di bit è:
     $$N_{\text{codifiche}} = \frac{(2^k - 1)!}{(2^k - |S|)! \cdot k!}$$
     *(Per $|S| = 8$, esistono 840 codifiche distinte; determinare la combinazione che minimizza l'area delle funzioni booleane è un problema NP-completo).*
   - **Codifiche comuni:**
     - *Binario Naturale:* Minimo numero di flip-flop.
     - *Gray:* Adiacenza unitaria tra stati temporalmente consecutivi (riduce commutazioni ed emissioni EMI).
     - *One-Hot:* $1$ flip-flop per stato (solo un bit alto alla volta). Richiede più registri ma azzera la logica combinatoria di decodifica dello stato (ideale su FPGA).
5. **Tabella delle Transizioni:** Sostituzione dei simboli degli stati con i codici binari assegnati.
6. **Scelta dei Bistabili:** Selezione del tipo di flip-flop (D, T, JK o SR).
7. **Tabella delle Eccitazioni:** Applicazione della tabella di eccitazione del bistabile prescelto per determinare gli ingressi da applicare a ciascun flip-flop.
8. **Sintesi Combinatoria:** Minimizzazione tramite Mappe di Karnaugh delle equazioni di pilotaggio dei flip-flop e delle uscite, con conseguente disegno circuitale.

---

## 5. Esempio Completo di Sintesi Guidata

### Specifica del Sistema
Progettare un controllore sequenziale sincrono con 2 ingressi ($I_H, I_L$) e 1 uscita $U$:
- Ingressi $00$: L'uscita non cambia valore (mantenimento).
- Ingressi $01$: L'uscita si porta a $0$.
- Ingressi $10$: L'uscita si porta a $1$.
- Ingressi $11$: L'uscita commuta al valore opposto (toggle).

### Passo 1 & 2: Diagramma e Tabella degli Stati (Modello di Moore)
Lo stato deve memorizzare il valore attuale dell'uscita: 2 stati necessari:
- $S_0$: Uscita $U = 0$
- $S_1$: Uscita $U = 1$

| Stato Presente | Ingresso $00$ | Ingresso $01$ | Ingresso $11$ | Ingresso $10$ | Uscita $U$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$S_0$** | $S_0$ | $S_0$ | $S_1$ | $S_1$ | **0** |
| **$S_1$** | $S_1$ | $S_0$ | $S_0$ | $S_1$ | **1** |

### Passo 4 & 5: Codifica Naturale e Tabella delle Transizioni
Assegniamo $1$ solo bit di stato $Q$: $S_0 \implies Q = 0$, $S_1 \implies Q = 1$. L'uscita coincide banalmente con lo stato: $U = Q$.

| $Q$ | $I_H I_L = 00$ | $I_H I_L = 01$ | $I_H I_L = 11$ | $I_H I_L = 10$ | Uscita $U$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | 0 | 0 | 1 | 1 | 0 |
| **1** | 1 | 0 | 0 | 1 | 1 |

---

### Passo 6, 7 & 8: Confronto Sintesi sui 4 Tipi di Flip-Flop

#### 1. Sintesi con Flip-Flop SR
Tabella eccitazioni SR:
- $0 \to 0 \implies SR = 0-$
- $0 \to 1 \implies SR = 10$
- $1 \to 0 \implies SR = 01$
- $1 \to 1 \implies SR = -0$

Tabella delle eccitazioni risultante:
| $Q$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | $0-$ | $0-$ | $10$ | $10$ |
| **1** | $-0$ | $01$ | $01$ | $-0$ |

- Mappa per $S$: riga $0 \implies 0, 0, 1, 1$; riga $1 \implies -, 0, 0, -$.  
  Raggruppamento su riga $0$, colonne $11, 10$:
  $$S = I_H \cdot \overline{Q}$$
- Mappa per $R$: riga $0 \implies -, -, 0, 0$; riga $1 \implies 0, 1, 1, 0$.  
  Raggruppamento su riga $1$, colonne $01, 11$:
  $$R = I_L \cdot Q$$

---

#### 2. Sintesi con Flip-Flop JK
Tabella eccitazioni JK:
- $0 \to 0 \implies JK = 0-$
- $0 \to 1 \implies JK = 1-$
- $1 \to 0 \implies JK = -1$
- $1 \to 1 \implies JK = -0$

Tabella delle eccitazioni risultante:
| $Q$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | $0-$ | $0-$ | $1-$ | $1-$ |
| **1** | $-0$ | $-1$ | $-1$ | $-0$ |

- Mappa per $J$: riga $0$ ha $1$ per $I_H = 1$; riga $1$ è interamente don't care ($-$):
  $$J = I_H$$
- Mappa per $K$: riga $0$ è interamente don't care ($-$); riga $1$ ha $1$ per $I_L = 1$:
  $$K = I_L$$

> **Osservazione d'eccellenza:** L'implementazione con FF JK è a **costo zero di logica combinatoria**! Gli ingressi $I_H$ e $I_L$ sono collegati direttamente ai pin $J$ e $K$.

---

#### 3. Sintesi con Flip-Flop D
Poiché $D = Q^*$:
| $Q$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | 0 | 0 | 1 | 1 |
| **1** | 1 | 0 | 0 | 1 |

Mappa di Karnaugh per $D$:
- Gruppo 1: colonne $11, 10$ riga $0 \implies I_H \cdot \overline{Q}$
- Gruppo 2: colonna $00, 10$ riga $1 \implies \overline{I}_L \cdot Q$
$$D = I_H \cdot \overline{Q} + \overline{I}_L \cdot Q$$

---

#### 4. Sintesi con Flip-Flop T
Poiché $T = Q \oplus Q^*$:
| $Q$ | $00$ | $01$ | $11$ | $10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | 0 | 0 | 1 | 1 |
| **1** | 0 | 1 | 1 | 0 |

Mappa di Karnaugh per $T$:
$$T = I_H \cdot \overline{Q} + I_L \cdot Q$$
