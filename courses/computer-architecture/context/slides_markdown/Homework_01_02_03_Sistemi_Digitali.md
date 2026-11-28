# Raccolta Homework di Progettazione: Sistemi Digitali Combinatori e Sequenziali

- **Docente:** Maurizio Palesi
- **Riferimento:** Esercitazioni Pratiche di Sintesi Circuitale ed FSM — Tracce e Risoluzioni Complete

---

## Homework 1: Ascensore Combinatorio

### 1. Testo della Traccia
Si progetti un circuito combinatorio per controllare la salita e la discesa della cabina di un ascensore tra tre piani ($0, 1, 2$).
- **Ingressi:**
  - $pd = (pd_1, pd_0) \in \{0, 1\}^2$: piano desiderato selezionato dalla pulsantiera:
    - `00`: piano terra ($0$)
    - `01`: primo piano ($1$)
    - `10`: secondo piano ($2$)
    - `11`: nessun piano selezionato (stato di riposo)
  - $pa = (pa_1, pa_0) \in \{0, 1\}^2$: piano attuale rilevato dai sensori:
    - `00`: piano terra ($0$)
    - `01`: primo piano ($1$)
    - `10`: secondo piano ($2$)
    - `11`: configurazione non ammessa (don't care)
- **Uscite:**
  - $u = (u_1, u_0) \in \{0, 1\}^2$: comando del motore di trazione:
    - `00`: cabina ferma
    - `01`: cabina in salita ($pd > pa$)
    - `10`: cabina in discesa ($pd < pa$)
    - `11`: non utilizzato

---

### 2. Tabella della Verità Completa del Blocco Controllore

| $pd_1$ | $pd_0$ | $pa_1$ | $pa_0$ | Piano Desiderato ($pd$) | Piano Attuale ($pa$) | Relazione | Uscita $u_1 u_0$ | Commento |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 0 | 0 | 0 | 0 | 0 | 0 | $pd == pa$ | **0 0** | Cabina già al piano |
| 0 | 0 | 0 | 1 | 0 | 1 | $pd < pa$ | **1 0** | Discesa verso terra |
| 0 | 0 | 1 | 0 | 0 | 2 | $pd < pa$ | **1 0** | Discesa verso terra |
| 0 | 0 | 1 | 1 | 0 | inv | — | **- -** | Configurazione $pa=3$ impossibile |
| 0 | 1 | 0 | 0 | 1 | 0 | $pd > pa$ | **0 1** | Salita al piano 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | $pd == pa$ | **0 0** | Cabina già al piano |
| 0 | 1 | 1 | 0 | 1 | 2 | $pd < pa$ | **1 0** | Discesa verso piano 1 |
| 0 | 1 | 1 | 1 | 1 | inv | — | **- -** | $pa=3$ impossibile |
| 1 | 0 | 0 | 0 | 2 | 0 | $pd > pa$ | **0 1** | Salita al piano 2 |
| 1 | 0 | 0 | 1 | 2 | 1 | $pd > pa$ | **0 1** | Salita al piano 2 |
| 1 | 0 | 1 | 0 | 2 | 2 | $pd == pa$ | **0 0** | Cabina già al piano |
| 1 | 0 | 1 | 1 | 2 | inv | — | **- -** | $pa=3$ impossibile |
| 1 | 1 | 0 | 0 | Riposo | 0 | — | **0 0** | Nessun comando |
| 1 | 1 | 0 | 1 | Riposo | 1 | — | **0 0** | Nessun comando |
| 1 | 1 | 1 | 0 | Riposo | 2 | — | **0 0** | Nessun comando |
| 1 | 1 | 1 | 1 | Riposo | inv | — | **- -** | $pa=3$ impossibile |

---

### 3. Mappe di Karnaugh e Minimizzazione

#### 3.1 Mappa per $u_1$ (Comando Discesa)
$u_1 = 1$ quando $pd < pa$: per $(pd, pa) \in \{(0, 1), (0, 2), (1, 2)\}$.
- Coordinate: $(0001) \to 1$, $(0010) \to 1$, $(0110) \to 1$.
- Mappa con $pd_1 pd_0$ colonna, $pa_1 pa_0$ riga:
  - Casella $(00, 01) = 1$
  - Casella $(00, 10) = 1$
  - Casella $(01, 10) = 1$
  - Tutta la riga $pa_1 pa_0 = 11$ è Don't Care ($-$).

Raggruppamenti ottimi per $u_1$:
1. Gruppo $pa_1 \cdot \overline{pa}_0 \cdot \overline{pd}_1$ (copre $pd \in \{00, 01\}$ su $pa=10$) $\implies pa_1 \cdot \overline{pd}_1$.
2. Gruppo $\overline{pd}_1 \cdot \overline{pd}_0 \cdot pa_0$.

$$u_1 = \overline{pd}_1 \cdot pa_1 + \overline{pd}_1 \cdot \overline{pd}_0 \cdot pa_0 = \overline{pd}_1 \cdot (pa_1 + \overline{pd}_0 \cdot pa_0)$$

---

#### 3.2 Mappa per $u_0$ (Comando Salita)
$u_0 = 1$ quando $pd > pa$ e $pd \ne 3$: per $(pd, pa) \in \{(1, 0), (2, 0), (2, 1)\}$.
- Coordinate: $(0100) \to 1$, $(1000) \to 1$, $(1001) \to 1$.
- Don't care su riga $pa = 11$.

Raggruppamenti ottimi per $u_0$:
1. Gruppo $pd_1 \cdot \overline{pd}_0 \cdot \overline{pa}_1$ (copre $pa \in \{00, 01\}$ su $pd=10$) $\implies pd_1 \cdot \overline{pd}_0 \cdot \overline{pa}_1$.
2. Gruppo $\overline{pd}_1 \cdot pd_0 \cdot \overline{pa}_1 \cdot \overline{pa}_0$.

$$u_0 = \overline{pa}_1 \cdot (pd_1 \cdot \overline{pd}_0 + pd_0 \cdot \overline{pa}_0)$$

---

## Homework 2: Ascensore Sequenziale (FSM)

### 1. Testo della Traccia
Si realizzi il medesimo controllore di ascensore come **macchina sequenziale sincrona**:
- Il circuito non riceve più in ingresso il piano attuale $pa$, ma **memorizza internamente la posizione corrente della cabina** nello stato $S \in \{P_0, P_1, P_2\}$.
- **Ingresso:** $pd \in \{00, 01, 10, 11\}$ (piano desiderato o riposo).
- **Uscita:** $u \in \{00, 01, 10\}$ (fermo, salita, discesa).
- **Stato Iniziale:** Piano terra ($P_0$).

---

### 2. Tabella degli Stati e Transizioni (Modello di Mealy)

| Stato Presente (Piano Attuale) | $pd = 00$ ($P_0$) | $pd = 01$ ($P_1$) | $pd = 10$ ($P_2$) | $pd = 11$ (Riposo) |
| :---: | :---: | :---: | :---: | :---: |
| **$P_0$ (Piano Terra)** | $P_0 / 00$ | $P_1 / 01$ (Salita) | $P_1 / 01$ (Salita verso $P_2$) | $P_0 / 00$ |
| **$P_1$ (Piano 1)** | $P_0 / 10$ (Discesa) | $P_1 / 00$ | $P_2 / 01$ (Salita) | $P_1 / 00$ |
| **$P_2$ (Piano 2)** | $P_1 / 10$ (Discesa) | $P_1 / 10$ (Discesa verso $P_1$) | $P_2 / 00$ | $P_2 / 00$ |

---

### 3. Codifica degli Stati e Sintesi con Flip-Flop D
Assegniamo 2 bit di stato $(y_1, y_0)$:
- $P_0 = 00$
- $P_1 = 01$
- $P_2 = 10$
- $11$ = Don't Care (stato non utilizzato).

Poiché $D_1 = Y_1$ e $D_0 = Y_0$, minimizzando le mappe di Karnaugh a 4 variabili ($y_1 y_0, pd_1 pd_0$):
- Le equazioni di pilotaggio dei flip-flop e delle uscite $u_1, u_0$ derivano direttamente dalla funzione di transizione e di uscita.

---

## Homework 3: Centralina per Cancello Automatico

### 1. Testo della Traccia
Progettare la centralina di controllo per l'apertura e chiusura temporizzata di un cancello motorizzato:
- **Sensori e Ingressi:**
  - $R$: Radiocomando di apertura ($1$ = impulso di apertura, $0$ = inattivo).
  - $F_C$: Finecorsa di apertura ($1$ = completamente aperto, $0$ = in corsa).
  - $F_O$: Finecorsa di chiusura ($1$ = completamente chiuso, $0$ = in corsa).
  - $P$: Coppia di fotocellule di sicurezza ($1$ = ostacolo rilevato, $0$ = varco libero).
  - $T_{15}$: Segnale di timeout da 15 secondi emesso da un timer interno.
  - Frequenza di Clock: $f_{CK} = 50\text{ Hz}$ ($T_{CK} = 20\text{ ms}$).
- **Uscite Motore ($M_1, M_0$):**
  - `00`: Fermo
  - `10`: Apertura (corsa verso $F_C$)
  - `01`: Chiusura (corsa verso $F_O$)

---

### 2. Macchina a Stati Finiti (FSM)

```text
       +----------------------- R = 1 -----------------------+
       |                                                     |
       v                                                     |
[ S0: Chiuso ] ---> R=1 ---> [ S1: Apertura ] ---> FC=1 ---> [ S2: Attesa 15s ]
       ^                           ^                                |
       |                           | P=1                            | T15=1
       |                           |                                v
       +--------- FO=1 ------------+------------------------ [ S3: Chiusura ]
```

1. **Stato $S_0$ (Chiuso):** Motore fermo ($00$). Se riceve $R = 1 \implies$ transita in $S_1$.
2. **Stato $S_1$ (Apertura):** Motore in apertura ($10$). Rimane in $S_1$ finché $F_C = 0$. Quando $F_C = 1 \implies$ passa in $S_2$ e avvia il timer.
3. **Stato $S_2$ (Pausa / Aperto):** Motore fermo ($00$). Attende per 15 secondi. Quando $T_{15} = 1 \implies$ passa in $S_3$ (chiusura). Se durante la pausa arriva un nuovo impulso $R=1$, resetta il conteggio dei 15s.
4. **Stato $S_3$ (Chiusura):** Motore in chiusura ($01$).
   - Se le fotocellule rilevano un ostacolo ($P = 1$): **inverte immediatamente la marcia** e ritorna in $S_1$ (Riapertura di sicurezza).
   - Se il cancello raggiunge la battuta ($F_O = 1$): ferma il motore e torna in $S_0$.

---

### 3. Calcolo di Sicurezza Cinematica (Punto 4)
- **Velocità lineare del cancello:** $v = 15\text{ cm/s} = 0.15\text{ m/s}$.
- **Frequenza di campionamento del controllore:** $f_{CK} = 50\text{ Hz} \implies T_{CK} = \dfrac{1}{50} = 0.02\text{ s} = 20\text{ ms}$.
- **Massimo spostamento residuo:**  
  Nel caso peggiore, l'ostacolo taglia il raggio fotocellula immediatamente dopo un fronte di clock. La centralina campiona l'evento al fronte successivo, con un ritardo massimo di 1 periodo di clock:
  $$\Delta s_{\max} = v \times T_{CK} = 15\text{ cm/s} \times 0.02\text{ s} = \mathbf{0.3\text{ cm}} = \mathbf{3\text{ mm}}$$
*Conclusione:* Il cancello avanza al più di soli 3 millimetri prima che la centralina rilevi l'ostacolo e inverta la marcia dell'attuatore.
