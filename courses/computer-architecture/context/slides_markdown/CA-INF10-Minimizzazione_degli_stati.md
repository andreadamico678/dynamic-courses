# Minimizzazione degli Stati nelle Macchine Sequenziali Sincrone

- **Docente:** Maurizio Palesi
- **Riferimento:** Progettazione di Sistemi Digitali — Riduzione delle FSM Completamente Specificate e Tabella delle Implicazioni

---

## 1. Motivazioni e Obiettivi

In una FSM con insieme degli stati $S$, il numero minimo di flip-flop necessari nella memoria di stato è:
$$N_{\text{min}} = \lceil \log_2 |S| \rceil$$

Nella formulazione iniziale del modello possono comparire **stati ridondanti** o **stati irraggiungibili**:
- L'eliminazione degli stati non necessari:
  1. Riduce o preserva il numero di elementi di memoria (ad esempio passare da 8 a 4 stati risparmia 1 flip-flop, da 3 a 2 FF).
  2. Semplifica notevolmente la rete combinatoria di stato prossimo ($\delta$) e delle uscite ($\lambda$), riducendo l'area di silicio e migliorando la velocità del circuito.

### Le Due Fasi Fondamentali della Riduzione
1. **Eliminazione degli stati irraggiungibili:** Rimozione di tutti gli stati che non possono essere raggiunti tramite alcuna sequenza di ingressi a partire dallo stato iniziale di reset.
2. **Identificazione e fusione degli stati equivalenti:**
   - *Macchine completamente specificate:* Ricerca delle classi di equivalenza (relazione di equivalenza partizionante).
   - *Macchine non completamente specificate:* Ricerca dei complessi di compatibilità (le relazioni non sono transitive a causa dei don't care).

---

## 2. Equivalenza e Indistinguibilità (FSM Completamente Specificate)

### Definizione di Indistinguibilità
Siano:
- $I_\alpha = (i_1, i_2, \dots, i_k)$ una sequenza finita arbitraria di simboli di ingresso.
- $U_{\alpha, i} = \lambda(s_i, I_\alpha)$ la corrispondente sequenza di uscite prodotta a partire dallo stato iniziale $s_i$.

Due stati $s_i, s_j \in S$ sono definiti **indistinguibili** ($s_i \sim s_j$) se e solo se:
$$U_{\alpha, i} = U_{\alpha, j}, \quad \forall I_\alpha$$
Ossia se per qualunque sequenza di ingresso applicata, la macchina produce la medesima sequenza di uscita sia partendo da $s_i$ sia partendo da $s_j$.

### Proprietà della Relazione
Nelle macchine completamente specificate, l'indistinguibilità è una **relazione di equivalenza** che gode delle seguenti proprietà:
1. **Riflessiva:** $s_i \sim s_i$
2. **Simmetrica:** $s_i \sim s_j \implies s_j \sim s_i$
3. **Transitiva:** $s_i \sim s_j \land s_j \sim s_k \implies s_i \sim s_k$

Pertanto, gli stati indistinguibili formano una **partizione unica** di classi di equivalenza disgiunte. Ciascuna classe può essere collassata in un singolo macro-stato nella macchina minima equivalente.

---

## 3. Criterio Operativo di Paull-Unger

Poiché verificare l'uguaglianza per tutte le infinite sequenze di ingresso è computazionalmente inattuabile, si applica la **Regola di Paull-Unger**:

> Due stati $s_i$ e $s_j$ sono indistinguibili ($s_i \sim s_j$) se e solo se per ogni simbolo di ingresso $i \in I$:
> 1. **Uscite identiche:** $\lambda(s_i, i) = \lambda(s_j, i)$
> 2. **Stati prossimi indistinguibili:** $\delta(s_i, i) \sim \delta(s_j, i)$

La regola si applica ricorsivamente: poiché gli insiemi $I$ ed $S$ sono finiti, la verifica converge sempre in un numero finito di passi.

---

## 4. Algoritmo della Tabella delle Implicazioni

La **Tabella delle Implicazioni** è una matrice triangolare inferiore priva della diagonale principale che confronta tutte le coppie non ordinate di stati distinti $(s_i, s_j)$.

### Regole di Compilazione
Per ciascuna casella corrispondente alla coppia $(s_i, s_j)$:
1. Se esiste almeno un ingresso $x \in I$ per cui le uscite differiscono ($\lambda(s_i, x) \ne \lambda(s_j, x)$):
   - La casella viene **marcata con $\mathbf{X}$** (coppia sicuramente non equivalente).
2. Se per tutti gli ingressi le uscite coincidono:
   - Se anche gli stati prossimi coincidono per ogni ingresso ($\delta(s_i, x) = \delta(s_j, x)$ oppure formano la coppia stessa), la casella viene contrassegnata con **$\sim$** (equivalenza incondizionata).
   - Altrimenti, nella casella si iscrivono le coppie di stati prossimi da cui dipende l'indistinguibilità (coppie implicate):
     $$\{\delta(s_i, x), \delta(s_j, x)\}$$

### Ciclo Iterativo di Eliminazione
1. Si scorre l'intera tabella. Se una casella contiene una coppia implicata che risulta marcata con $\mathbf{X}$ in un'altra posizione della tabella, anche la casella corrente viene **eliminata e marcata con $\mathbf{X}$**.
2. Il processo si ripete fino a quando un'intera iterazione non produce alcuna nuova eliminazione (*punto fisso*).
3. Tutte le caselle superstiti prive di $\mathbf{X}$ rappresentano coppie di stati equivalenti.

---

## 5. Esempio Completo di Minimizzazione

### Tabella degli Stati Iniziale (Macchina di Mealy a 7 stati)

| Stato Presente | Ingresso $0$ ($s^{t+1} / u$) | Ingresso $1$ ($s^{t+1} / u$) |
| :---: | :---: | :---: |
| **a** | $g / 0$ | $e / 1$ |
| **b** | $c / 0$ | $a / 1$ |
| **c** | $e / 1$ | $g / 0$ |
| **d** | $b / 0$ | $e / 1$ |
| **e** | $g / 0$ | $a / 1$ |
| **f** | $d / 1$ | $f / 0$ |
| **g** | $a / 1$ | $g / 0$ |

---

### Costruzione e Risoluzione della Tabella delle Implicazioni

#### 1. Esame preliminare delle uscite:
- Gli stati $\{a, b, d, e\}$ hanno profilo di uscita $(0, 1)$ per ingressi $(0, 1)$.
- Gli stati $\{c, f, g\}$ hanno profilo di uscita $(1, 0)$ per ingressi $(0, 1)$.
- Qualunque coppia mista tra il primo e il secondo gruppo viene **immediatamente marcata con $\mathbf{X}$** per incompatibilità sulle uscite.

#### 2. Analisi delle coppie omogenee:
- **Coppia $(a, b)$:** uscite identiche. Stati prossimi: per $0 \to (g, c)$; per $1 \to (e, a)$. Implica $\{g, c\}$ e $\{a, e\}$.
- **Coppia $(a, d)$:** per $0 \to (g, b)$; per $1 \to (e, e) \implies$ implica $\{b, g\}$. Ma $b$ ha uscite $(0, 1)$ e $g$ ha uscite $(1, 0)$, quindi $\{b, g\}$ ha una $\mathbf{X}$. Di conseguenza $(a, d) \to \mathbf{X}$.
- **Coppia $(a, e)$:** per $0 \to (g, g)$; per $1 \to (e, a)$. Implica solo $\{a, e\}$ (auto-dipendenza) $\implies \mathbf{a \sim e}$.
- **Coppia $(b, e)$:** per $0 \to (c, g)$; per $1 \to (a, a)$. Implica $\{c, g\}$.
- **Coppia $(c, g)$:** per $0 \to (e, a)$; per $1 \to (g, g)$. Implica $\{a, e\}$. Poiché $a \sim e$, ne consegue che $\mathbf{c \sim g}$!
- Poiché $c \sim g$, anche l'implicazione di $(b, e)$ e $(a, b)$ è soddisfatta $\implies \mathbf{a \sim b \sim e}$.
- **Stato $d$:** implica $\{b, g\}$ che è incompatibile $\implies d$ non è equivalente ad alcuno stato.
- **Stato $f$:** per $0$ va in $d$; $c$ va in $e$. Implica $\{d, e\}$ che ha uscite diverse $\implies f$ non è equivalente ad alcuno stato.

---

### Classi di Indistinguibilità Ricavate
$$\alpha = \{a, b, e\}$$
$$\beta = \{c, g\}$$
$$\gamma = \{d\}$$
$$\delta = \{f\}$$

La macchina passa da **7 stati a 4 stati**, consentendo di scendere da 3 flip-flop ($\lceil \log_2 7 \rceil = 3$) a soli **2 flip-flop** ($\lceil \log_2 4 \rceil = 2$).

---

### Tabella degli Stati Minima Equivalente (4 Stati)

| Stato Minimo | Ingresso $0$ | Ingresso $1$ |
| :---: | :---: | :---: |
| **$\alpha$** | $\beta / 0$ | $\alpha / 1$ |
| **$\beta$** | $\alpha / 1$ | $\beta / 0$ |
| **$\gamma$** | $\alpha / 0$ | $\alpha / 1$ |
| **$\delta$** | $\gamma / 1$ | $\delta / 0$ |
