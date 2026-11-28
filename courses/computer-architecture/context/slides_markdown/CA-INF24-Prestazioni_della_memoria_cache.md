# Prestazioni della Memoria Cache e Modelli Quantitativi di Stallo

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Calcolatore — Gerarchia di Memoria, Cicli di Stallo per Miss, Cache Unificata vs. Separata

---

## 1. Modello Quantitativo del Tempo CPU con Memoria Cache

In presenza di una gerarchia di memoria reale, il tempo di CPU totale deve considerare sia i cicli di esecuzione interna del processore sia i cicli di attesa dovuti ai miss nella gerarchia di memoria:

$$T_{\text{CPU}} = \left(\text{Cicli di esecuzione CPU} + \text{Cicli di stallo memoria}\right) \times T_{CK}$$

### Scomposizione degli Stalli di Memoria
Gli stalli di memoria sono prodotti da accessi in **lettura** (Instruction Fetch e Data Load) e in **scrittura** (Data Store):
$$\text{Cicli di stallo memoria} = \text{Stalli in lettura} + \text{Stalli in scrittura}$$

$$\text{Stalli in lettura} = \text{Read Misses} \times \text{Read Miss Penalty}$$
$$\text{Stalli in scrittura} = \text{Write Misses} \times \text{Write Miss Penalty}$$

Poiché:
$$\text{Read Misses} = \text{Reads} \times \text{Read Miss Rate}$$
$$\text{Write Misses} = \text{Writes} \times \text{Write Miss Rate}$$

---

## 2. Formulazione del CPI con Sovraccarico di Memoria (*Memory Stall Overhead*)

Normalizzando rispetto all'Instruction Count ($IC = N_{ist}$):

$$\text{CPI} = \text{CPI}_{\text{exe}} + \text{CPI}_{\text{memory miss overhead}}$$

$$\text{CPI} = \text{CPI}_{\text{exe}} + \left( \frac{\text{Reads}}{IC} \times \text{Read Miss Rate} \times \text{Read Penalty} \right) + \left( \frac{\text{Writes}}{IC} \times \text{Write Miss Rate} \times \text{Write Penalty} \right)$$

Definendo le frequenze di accesso relative alle istruzioni totali:
- $f_{\text{fetch}} = \dfrac{\text{Fetches}}{IC} = 1.0$ (ogni istruzione richiede esattamente un fetch).
- $f_{\text{load}} = \dfrac{\text{Loads}}{IC}$ (frequenza relativa delle istruzioni di load).
- $f_{\text{store}} = \dfrac{\text{Stores}}{IC}$ (frequenza relativa delle istruzioni di store).
- $f_{\text{reads}} = f_{\text{fetch}} + f_{\text{load}} = 1 + f_{\text{load}}$.
- $f_{\text{writes}} = f_{\text{store}}$.

---

## 3. Cache Separate (Harvard: I-Cache e D-Cache) vs. Cache Unificata

### 3.1 Cache Separate (I-Cache e D-Cache)
Le due memorie cache operano in modo disaccoppiato con propri miss rate e penalità:
$$\text{CPI} = \text{CPI}_{\text{exe}} + \left( f_{\text{fetch}} \times M_{\text{instr}} \times P_{\text{instr}} \right) + \left( f_{\text{load}} \times M_{\text{data, read}} \times P_{\text{data}} \right) + \left( f_{\text{store}} \times M_{\text{data, write}} \times P_{\text{data}} \right)$$

---

### 3.2 Cache Unificata
Una singola memoria cache accoglie sia le linee di istruzione sia le linee di dati:
Tutti gli accessi ($f_{\text{fetch}} + f_{\text{load}} + f_{\text{store}} = 1 + f_{\text{load}} + f_{\text{store}}$) condividono il medesimo miss rate globale $M_{\text{cache}}$ e la medesima penalità $P_{\text{cache}}$:
$$\text{CPI} = \text{CPI}_{\text{exe}} + \left( 1 + f_{\text{load}} + f_{\text{store}} \right) \times M_{\text{cache}} \times P_{\text{cache}}$$

---

## 4. Esercizi Numerici Risolti e Benchmark Analitici

### Esempio 1: Cache Istruzioni e Dati Separate
**Dati:**
- $IC = 200$, $T_{CK} = 1\text{ ns}$, $\text{CPI}_{\text{exe}} = 2.0$.
- Frequenza Load = $20\%$ ($0.20$), Frequenza Store = $10\%$ ($0.10$).
- I-Cache: $\text{Miss Rate} = 5\%$, $\text{Miss Penalty} = 50\text{ cicli}$.
- D-Cache: $\text{Miss Rate} = 6\%$ (sia in lettura che scrittura), $\text{Miss Penalty} = 50\text{ cicli}$.

**Risoluzione:**
1. Stalli I-Cache:
   $$\text{Stallo}_{\text{instr}} = 1 \times 0.05 \times 50 = 2.5\text{ cicli/istruzione}$$
2. Stalli D-Cache (Letture):
   $$\text{Stallo}_{\text{load}} = 0.20 \times 0.06 \times 50 = 0.6\text{ cicli/istruzione}$$
3. Stalli D-Cache (Scritture):
   $$\text{Stallo}_{\text{store}} = 0.10 \times 0.06 \times 50 = 0.3\text{ cicli/istruzione}$$
4. CPI Totale:
   $$\text{CPI} = 2.0 + 2.5 + 0.6 + 0.3 = 5.4$$
5. Tempo CPU Reale:
   $$T_{\text{CPU}} = 200 \times 5.4 \times 1\text{ ns} = 1080\text{ ns}$$
6. Tempo CPU Ideale (Cache perfetta con miss rate = 0):
   $$T_{\text{CPU, ideale}} = 200 \times 2.0 \times 1\text{ ns} = 400\text{ ns}$$
7. Speedup della Cache Ideale:
   $$\text{Speedup} = \frac{T_{\text{CPU}}}{T_{\text{CPU, ideale}}} = \frac{\text{CPI}}{\text{CPI}_{\text{ideale}}} = \frac{5.4}{2.0} = 2.7$$

---

### Esempio 2: Cache Unificata con Conteggio Esplicito dei Miss
**Dati:**
- $IC = 500$, $T_{CK} = 2\text{ ns}$, $\text{CPI}_{\text{seq}} = 3.0$, $\text{Miss Penalty} = 30\text{ cicli}$.
- Eventi rilevati dal profiler: Fetch misses = 25, Load misses = 6, Store misses = 5.

**Risoluzione:**
1. Frequenze dei miss per istruzione:
   - $\dfrac{\text{Fetch Misses}}{IC} = \dfrac{25}{500} = 5\% = 0.05$
   - $\dfrac{\text{Load Misses}}{IC} = \dfrac{6}{500} = 1.2\% = 0.012$
   - $\dfrac{\text{Store Misses}}{IC} = \dfrac{5}{500} = 1.0\% = 0.01$
2. Tasso totale di miss per istruzione:
   $$\text{Miss Rate}_{\text{globale}} = 0.05 + 0.012 + 0.01 = 0.072 \text{ miss/istruzione}$$
3. Sovraccarico di stallo medio:
   $$\text{CPI}_{\text{stall}} = 0.072 \times 30 = 2.16$$
4. CPI effettivo e Speedup:
   $$\text{CPI} = 3.0 + 2.16 = 5.16$$
   $$\text{Speedup}_{\text{ideale}} = \frac{5.16}{3.0} = 1.72$$

---

### Esempio 3: Confronto Architetturale Diretto (Separate vs. Unificata)
**Traccia d'esame:** Un processore esegue $IC = 1000$ istruzioni con $\text{CPI}_{\text{exe}} = 2$ e $T_{CK} = 2\text{ ns}$.
Il programma include 150 Loads ($f_{\text{load}} = 0.15$) e 100 Stores ($f_{\text{store}} = 0.10$).
- **Architettura A (Cache Separate):**
  - I-Cache: Miss Rate = $4\%$, Miss Penalty = $30\text{ cicli}$.
  - D-Cache: Miss Rate = $6\%$, Miss Penalty = $35\text{ cicli}$.
- **Architettura B (Cache Unificata):**
  - Cache Globale: Miss Rate = $5\%$, Miss Penalty = $30\text{ cicli}$.

**Confronto:**
- **Calcolo CPI per Architettura A (Separate):**
  $$\text{CPI}_A = 2 + (1 \times 0.04 \times 30) + (0.15 + 0.10) \times 0.06 \times 35$$
  $$\text{CPI}_A = 2 + 1.20 + (0.25 \times 2.10) = 2 + 1.20 + 0.525 = 3.725$$

- **Calcolo CPI per Architettura B (Unificata):**
  $$\text{Accessi Totali per Istruzione} = 1 + 0.15 + 0.10 = 1.25$$
  $$\text{CPI}_B = 2 + 1.25 \times 0.05 \times 30 = 2 + 1.875 = 3.875$$

**Giudizio ingegneristico:**
$$\text{CPI}_A (3.725) < \text{CPI}_B (3.875)$$
L'**Architettura A (a cache separate) offre prestazioni superiori**, abbattendo il tempo di esecuzione di circa il $4\%$ ed eliminando totalmente i conflitti strutturali sulla porta di accesso alla memoria.

---

### 5. Sensibilità Parametrica: Impatto del Miss Rate sul CPI
Dati: $\text{CPI}_{\text{exe}} = 1.5$, $\text{Penalty} = 50\text{ cicli}$, $f_{\text{load}} = 20\%$, $f_{\text{store}} = 10\%$.
$$\text{CPI} = 1.5 + (1 + 0.20 + 0.10) \times 50 \times \text{Miss Rate} = 1.5 + 65 \times \text{Miss Rate}$$

| Miss Rate (%) | Sovraccarico di Stallo ($65 \times M$) | $\text{CPI}$ Effettivo | Rallentamento Rispetto a Cache Ideale |
| :---: | :---: | :---: | :---: |
| **0% (Ideale)** | $0.00$ | **1.50** | $1.00\times$ (riferimento) |
| **1%** | $0.65$ | **2.15** | $1.43\times$ |
| **2%** | $1.30$ | **2.80** | $1.87\times$ |
| **4%** | $2.60$ | **4.10** | $2.73\times$ |
| **6%** | $3.90$ | **5.40** | $3.60\times$ |
| **8%** | $5.20$ | **6.70** | $4.47\times$ |
| **10%** | $6.50$ | **8.00** | $5.33\times$ |
| **14%** | $9.10$ | **10.60** | $7.07\times$ |
| **20%** | $13.00$ | **14.50** | $9.67\times$ |
