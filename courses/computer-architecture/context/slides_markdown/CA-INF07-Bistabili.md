# Elementi di Memoria: I Bistabili (Latch e Flip-Flop)

- **Docente:** Maurizio Palesi
- **Riferimento:** Progettazione di Sistemi Digitali — Sistemi Sequenziali e Memorie Elementari

---

## 1. Classificazione dei Sistemi Digitali

| Caratteristica | Sistemi Combinatori | Sistemi Sequenziali |
| :--- | :--- | :--- |
| **Equazione di uscita** | $O(t) = f(I(t))$ | $O(t) = f(I(t), S(t))$ |
| **Dipendenza temporale** | Uscita funzione esclusiva degli ingressi all'istante corrente $t$. | Uscita funzione degli ingressi attuali e della sequenza storica degli eventi passati. |
| **Memoria interna** | Assente. | Presente tramite lo **stato interno** $S(t) \in \mathcal{S}$. |
| **Equazione di stato prossimo** | Non applicabile. | $S(t+1) = g(I(t), S(t))$ (funzione di transizione). |

---

## 2. Definizione e Tassonomia dei Bistabili

Un **bistabile** è un circuito sequenziale elementare a retroazione in grado di assumere stabilmente uno tra due stati logici ($Q \in \{0, 1\}$) in assenza di sollecitazioni esterne, memorizzando 1 bit di informazione.

### Classificazione per Meccanismo di Pilotaggio
1. **Bistabili Asincroni (Latch ad anello non controllato):**
   - L'evoluzione dello stato è causata direttamente dal livello dei segnali applicati agli ingressi dati.
2. **Bistabili Sincroni con Abilitazione di Livello (Latch trasparenti sincroni):**
   - Le transizioni possono avvenire solo quando il segnale di abilitazione/sincronismo (Clock o Enable $T$) si trova al livello logico attivo ($T = 1$, *intervallo di trasparenza*).
3. **Bistabili Edge-Triggered (Flip-Flop sensibili al fronte):**
   - Il campionamento degli ingressi e l'aggiornamento dello stato avvengono esclusivamente durante una transizione rapida del clock (fronte di salita o fronte di discesa).

---

## 3. Latch Set-Reset (SR) Asincrono

Il latch SR a porte NOR incrociate presenta due ingressi ($S$: Set, $R$: Reset) e due uscite complementari ($Q, \overline{Q}$).

### Schema Circuitale e Retroazione
- Porta NOR 1: riceve in ingresso $R$ e l'uscita retroazionata $\overline{Q}$, generando $Q$:
  $$Q = \overline{R + \overline{Q}}$$
- Porta NOR 2: riceve in ingresso $S$ e l'uscita retroazionata $Q$, generando $\overline{Q}$:
  $$\overline{Q} = \overline{S + Q}$$

### Analisi del Funzionamento
- **$S=0, R=0$ (Memorizzazione):** $Q^* = Q$. Lo stato precedente viene preservato indefinitamente.
- **$S=1, R=0$ (Set):** Forza $Q = 1$ e $\overline{Q} = 0$.
- **$S=0, R=1$ (Reset):** Forza $Q = 0$ e $\overline{Q} = 1$.
- **$S=1, R=1$ (Configurazione Vietata / Indifferenza):**
  - Entrambe le uscite tendono a $0$ ($Q = \overline{Q} = 0$), violando la complementarità.
  - Al rilascio simultaneo da $(1, 1) \to (0, 0)$, il circuito entra in **metastabilità** o assume uno stato impredicibile dipendente dallo sbilanciamento microscopico dei ritardi interni ($\Delta_1$ vs $\Delta_2$).
  - **Vincolo progettuale fondamentale:** $S \cdot R = 0$ (mai entrambi attivi).

### Tabella delle Transizioni e Mappa di Karnaugh per $Q^*(S, R, Q)$

| $Q$ | $SR = 00$ | $SR = 01$ | $SR = 11$ | $SR = 10$ |
| :---: | :---: | :---: | :---: | :---: |
| **0** | 0 | 0 | $-$ (X) | 1 |
| **1** | 1 | 0 | $-$ (X) | 1 |

Sfruttando la condizione di indifferenza per $SR = 11$:
- Raggruppamento 1 (colonne $11, 10$): $S$
- Raggruppamento 2 (riga $Q=1$, colonne $00, 10$): $\overline{R}\,Q$

**Equazione Caratteristica del Latch SR:**
$$Q^*(S, R, Q) = S + \overline{R}\,Q \quad \text{con il vincolo } S \cdot R = 0$$

### Tabella delle Eccitazioni del Latch SR
Specifica i valori che devono assumere $S$ ed $R$ per forzare una data transizione $Q \to Q^*$:

| Transizione $Q \to Q^*$ | $S$ | $R$ | Commento |
| :---: | :---: | :---: | :--- |
| **$0 \to 0$** | $0$ | $-$ | Non deve essere settato ($S=0$); $R$ può essere $0$ (memoria) o $1$ (reset) |
| **$0 \to 1$** | $1$ | $0$ | Set obbligatorio |
| **$1 \to 0$** | $0$ | $1$ | Reset obbligatorio |
| **$1 \to 1$** | $-$ | $0$ | Non deve essere resettato ($R=0$); $S$ può essere $0$ (memoria) o $1$ (set) |

---

## 4. Bistabile Triggered (T Asincrono)

Un bistabile T (Toggle) inverte il proprio stato a ogni impulso attivo dell'ingresso $T$:
- Se $T = 0$: $Q^* = Q$ (mantenimento).
- Se $T = 1$: $Q^* = \overline{Q}$ (commutazione).

### Equazione Caratteristica
$$Q^*(T, Q) = T \oplus Q = T\,\overline{Q} + \overline{T}\,Q$$

### Tabella delle Eccitazioni del Bistabile T
| $Q \to Q^*$ | $T$ |
| :---: | :---: |
| **$0 \to 0$** | $0$ |
| **$0 \to 1$** | $1$ |
| **$1 \to 0$** | $1$ |
| **$1 \to 1$** | $0$ |
$$\implies T = Q \oplus Q^*$$

---

## 5. Tempistiche di Sincronizzazione: Setup e Hold Time

Nei sistemi sincroni governati da un segnale periodico di clock con periodo $T_{ck} = T_H + T_L$:
- **Tempo di Set-up ($T_{SU}$):** Intervallo minimo di tempo antecedente il fronte attivo di clock durante il quale il dato d'ingresso deve rimanere perfettamente stabile.
- **Tempo di Hold ($T_H$):** Intervallo minimo di tempo successivo al fronte attivo di clock durante il quale il dato d'ingresso deve essere mantenuto stabile.
- La violazione della finestra temporale $[t_{fronte} - T_{SU}, t_{fronte} + T_H]$ causa **metastabilità** all'uscita del bistabile.

---

## 6. Latch Sincroni vs. Flip-Flop Master-Slave

### Limite Strutturale dei Latch Sincroni (Problema della Trasparenza)
In un registro a scorrimento realizzato con bistabili DT a livello (latch trasparenti sincroni):
- Finché l'impulso di clock $T = 1$ è attivo, ogni latch è trasparente.
- Il dato immesso all'ingresso si propaga a cascata attraverso tutti gli stadi in successione se la durata dell'impulso $T$ è superiore al ritardo di propagazione interno dei singoli stadi:
  $$\text{Stato iniziale } (Q_3, Q_2, Q_1) = (1, 0, 1) \xrightarrow{D=0, T=1} (0, 0, 0)$$
- Il sistema fallisce il corretto scorrimento a singolo passo, manifestando corse critiche non controllabili.

### Risoluzione: Flip-Flop Master-Slave (Edge-Triggered)
La configurazione **Master-Slave** disaccoppia la fase di acquisizione dalla fase di emissione:
1. **Stadio Master:** Latch controllato dal clock $T$ diretto (attivo quando $T = 1$).
2. **Stadio Slave:** Latch controllato dal clock invertito $\overline{T}$ (attivo quando $T = 0$).
3. **Dinamica:**
   - Durante $T = 1$: il Master campiona il dato d'ingresso $D$ ($Q_m \leftarrow D$), mentre lo Slave è isolato e mantiene l'uscita stabile ($Q_s = Q$).
   - Al fronte di discesa ($1 \to 0$): il Master si isola bloccando il dato campionato; lo Slave diventa trasparente trasferendo $Q_m$ sull'uscita finale $Q_s$.
   - L'effetto complessivo rende il componente sensibile unicamente al **fronte del segnale di clock** (Edge-Sensitive).

---

## 7. Famiglie di Bistabili Sincroni (JK e D)

### 7.1 Bistabile JK Sincrono
Risolve l'indeterminazione del latch SR abilitando la commutazione quando entrambi gli ingressi sono alti:
- $J$: equivale a Set.
- $K$: equivale a Reset.
- Se $J=1, K=1 \implies Q^* = \overline{Q}$ (toggle).

#### Equazione Caratteristica
$$Q^*(J, K, Q) = J\,\overline{Q} + \overline{K}\,Q$$

#### Tabella delle Eccitazioni JK
| $Q \to Q^*$ | $J$ | $K$ |
| :---: | :---: | :---: |
| **$0 \to 0$** | $0$ | $-$ |
| **$0 \to 1$** | $1$ | $-$ |
| **$1 \to 0$** | $-$ | $1$ |
| **$1 \to 1$** | $-$ | $0$ |

---

### 7.2 Bistabile D (Data / Delay)
È l'elemento di memoria standard delle moderne architetture VLSI e dei processori:
$$Q^* = D$$

#### Tabella delle Eccitazioni D
| $Q \to Q^*$ | $D$ |
| :---: | :---: |
| **$0 \to 0$** | $0$ |
| **$0 \to 1$** | $1$ |
| **$1 \to 0$** | $0$ |
| **$1 \to 1$** | $1$ |

---

## 8. Sintesi di Contatori Sincroni Modulo 8

Progettiamo un contatore sincrono binario a 3 bit ($Q_2 Q_1 Q_0$) che conta ciclicamente da $0$ a $7$.

### 8.1 Realizzazione con Flip-Flop T

#### Tabella delle Transizioni ed Eccitazioni
| $Q_2$ | $Q_1$ | $Q_0$ | $Q_2^*$ | $Q_1^*$ | $Q_0^*$ | $T_2$ | $T_1$ | $T_0$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 | 0 | 0 | 1 | 1 | 1 |

#### Equazioni Minime di Pilotaggio
- $T_0 = 1$ (commuta a ogni ciclo di clock).
- $T_1 = Q_0$ (commuta quando $Q_0 = 1$).
- $T_2 = Q_1 \cdot Q_0$ (commuta quando sia $Q_1$ sia $Q_0$ sono a $1$).

---

### 8.2 Realizzazione con Flip-Flop D

Poiché per i bistabili D vale $D_i = Q_i^*$:

#### Mappe di Karnaugh delle Eccitazioni

1. **Rete di $D_0$ ($Q_0^*$):**
   Commuta rispetto a $Q_0$ ad ogni ciclo:
   $$D_0 = \overline{Q}_0$$

2. **Rete di $D_1$ ($Q_1^*$):**
   Vale $1$ quando $(Q_1, Q_0) \in \{(0, 1), (1, 0)\}$:
   $$D_1 = \overline{Q}_1 Q_0 + Q_1 \overline{Q}_0 = Q_1 \oplus Q_0$$

3. **Rete di $D_2$ ($Q_2^*$):**
   $$D_2 = Q_2 \overline{Q}_1 + Q_2 \overline{Q}_0 + \overline{Q}_2 Q_1 Q_0 = Q_2 \oplus (Q_1 \cdot Q_0)$$
