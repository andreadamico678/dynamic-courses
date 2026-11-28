# Valutazione delle Prestazioni dei Calcolatori Elettronici

- **Docente:** Maurizio Palesi / Giuseppe Ascia
- **Riferimento:** Il Calcolatore — Metriche Prestazionali, Legge di Amdahl, Equazione del Tempo CPU e MIPS

---

## 1. L'Approccio Quantitativo alla Progettazione

Negli ultimi decenni l'incremento prestazionale dei microprocessori ha superato la mera evoluzione tecnologica della densità dei transistor (legge di Moore), grazie all'adozione dell'**approccio quantitativo basato su misure sperimentali del carico di lavoro effettivo**.

### Principio Guida
> **"Rendere veloce il caso più frequente" (*Make the common case fast*)**

### La Transizione da CISC a RISC
Le analisi empiriche sull'esecuzione dei programmi hanno dimostrato che:
- **Regola 80/20:** L'80% delle istruzioni eseguite a runtime appartiene a un ristretto sottoinsieme pari al solo 20% del repertorio disponibile.
- Nelle architetture CISC (*Complex Instruction Set Computer*), le istruzioni complesse e poco usate rallentavano il ciclo di clock di tutte le altre istruzioni a causa di logiche di decodifica pesanti e microprogrammazione.
- Le architetture RISC (*Reduced Instruction Set Computer*) implementano in hardware solo le primitive ad alta frequenza d'uso a singolo ciclo, delegando al compilatore ottimizzante la composizione di sequenze articolate, riducendo drasticamente il periodo di clock.

---

## 2. Indici Prestazionali Fondamentali

| Metrica | Definizione | Esempi tipici | Utente target |
| :--- | :--- | :--- | :--- |
| **Tempo di Risposta (Latenza / Tempo di Esecuzione)** | Tempo totale intercorso tra l'avvio e la terminazione completa di un singolo task. | Durata dell'esecuzione di un programma, tempo di apertura file, rendering. | Singolo utente / Desktop / Workstation |
| **Throughput (Produttività / Banda)** | Quantità complessiva di lavoro completato nell'unità di tempo. | Numero di transazioni al secondo (TPS), query web servite al secondo, job batch. | Data center / Server web / Cloud |

### Effetto degli Interventi Hardware su Latenza e Throughput
- **Sostituzione della CPU con un modello a frequenza più alta:** Migliora **sia** il tempo di esecuzione (minore latenza) **sia** il throughput (più task completati nell'unità di tempo).
- **Aggiunta di processori in un sistema multiprocessore (scalabilità orizzontale):**
  - I singoli task sequenziali **non** vengono eseguiti più rapidamente (la latenza del singolo thread rimane invariata).
  - Aumenta il throughput complessivo del sistema. Nel caso di sistemi saturi con lunghe code di attesa, l'abbattimento del tempo di accodamento può ridurre indirettamente anche il tempo di risposta percepito.

---

## 3. Definizione Matematica di Prestazione e Speedup

La prestazione di un calcolatore $X$ rispetto a un carico di lavoro è definita come l'inverso del suo tempo di esecuzione:
$$\text{Prestazione}_X = \frac{1}{\text{Tempo di Esecuzione}_X}$$

$$\text{Prestazione}_X > \text{Prestazione}_Y \iff \text{Tempo di Esecuzione}_X < \text{Tempo di Esecuzione}_Y$$

### Speedup Relativo
Lo speedup (accelerazione) della macchina $X$ rispetto alla macchina $Y$ è dato dal rapporto:
$$\text{Speedup}_{X/Y} = \frac{\text{Prestazione}_X}{\text{Prestazione}_Y} = \frac{\text{Tempo di Esecuzione}_Y}{\text{Tempo di Esecuzione}_X}$$

*Esempio:* Se $\text{Tempo}_Y = 15\text{ s}$ e $\text{Tempo}_X = 10\text{ s}$:
$$\text{Speedup} = \frac{15}{10} = 1.5 \implies X \text{ è 1.5 volte più veloce di } Y$$

### Variazione Percentuale
Affermare che "$X$ è l'$n\%$ più veloce di $Y$" significa:
$$\frac{\text{Prestazione}_X}{\text{Prestazione}_Y} = 1 + \frac{n}{100} \implies n = \frac{\text{Prestazione}_X - \text{Prestazione}_Y}{\text{Prestazione}_Y} \times 100\% = \left(\frac{\text{Tempo}_Y - \text{Tempo}_X}{\text{Tempo}_X}\right) \times 100\%$$

---

## 4. La Legge di Amdahl

La **Legge di Amdahl** quantifica l'accelerazione massima ottenibile migliorando solo una frazione del sistema.

### Formulazione Matematica
Sia:
- $F \in [0, 1]$: la frazione di tempo originaria impiegata dalla parte del programma/sistema oggetto di miglioramento.
- $(1 - F)$: la frazione rimanente non modificabile.
- $S$: lo speedup locale applicato alla frazione migliorata.

Il nuovo tempo di esecuzione complessivo è:
$$T_{\text{nuovo}} = T_{\text{vecchio}} \cdot \left[ (1 - F) + \frac{F}{S} \right]$$

Lo speedup globale del sistema risulta:
$$\text{Speedup}_{\text{totale}} = \frac{T_{\text{vecchio}}}{T_{\text{nuovo}}} = \frac{1}{(1 - F) + \dfrac{F}{S}}$$

---

### Esercizi Guidati sulla Legge di Amdahl

#### Esercizio 1: Miglioramento dell'Unità Floating Point
- Un coprocessore FP viene accelerato di un fattore $S = 5$.
- Le istruzioni floating point rappresentano una frazione $F = 10\% = 0.10$ del tempo di esecuzione originario.
$$\text{Speedup}_{\text{totale}} = \frac{1}{(1 - 0.10) + \dfrac{0.10}{5}} = \frac{1}{0.90 + 0.02} = \frac{1}{0.92} \approx 1.087$$
*Conclusione:* Un incremento di $5\times$ sul blocco FP produce solo l'$8.7\%$ di miglioramento complessivo.

#### Esercizio 2: Ottimizzazione dell'ALU
- L'ALU viene ottimizzata con uno speedup modesto pari a $S = 1.5$.
- Le operazioni ALU coprono una frazione $F = 50\% = 0.50$ del tempo totale.
$$\text{Speedup}_{\text{totale}} = \frac{1}{(1 - 0.50) + \dfrac{0.50}{1.5}} = \frac{1}{0.50 + 0.333} = \frac{1}{0.833} \approx 1.20$$
*Conclusione:* Migliorare del $50\%$ una componente ad alta frequenza d'uso produce un beneficio ($+20\%$) molto superiore rispetto a quintuplicare una componente rara.

---

### Corollario di Amdahl: Limite Asintotico
Nel caso ideale in cui la frazione $F$ venga resa istantanea ($S \to \infty$):
$$\text{Speedup}_{\text{massimo}} = \lim_{S \to \infty} \frac{1}{(1 - F) + \dfrac{F}{S}} = \frac{1}{1 - F}$$

| Frazione Migliorata $F$ | Frazione Invariata $(1 - F)$ | Speedup Massimo Teorico ($S \to \infty$) |
| :---: | :---: | :---: |
| 1% (0.01) | 99% (0.99) | 1.01 |
| 5% (0.05) | 95% (0.95) | 1.05 |
| 10% (0.10) | 90% (0.90) | 1.11 |
| 20% (0.20) | 80% (0.80) | 1.25 |
| 50% (0.50) | 50% (0.50) | 2.00 |
| 70% (0.70) | 30% (0.30) | 3.33 |
| 80% (0.80) | 20% (0.20) | 5.00 |
| 90% (0.90) | 10% (0.10) | 10.00 |
| 95% (0.95) | 5% (0.05) | 20.00 |

---

## 5. L'Equazione Fondamentale del Tempo di CPU

Il tempo speso dalla CPU per eseguire un determinato programma si calcola come:
$$T_{\text{CPU}} = \text{Cicli di Clock Totali} \times T_{CK} = \frac{\text{Cicli di Clock Totali}}{f_{CK}}$$

### Scomposizione nei Tre Fattori Architetturali
Introducendo il conteggio dinamico delle istruzioni ($N_{ist}$ o $IC$, *Instruction Count*) e il numero medio di cicli di clock per istruzione ($CPI$, *Cycles Per Instruction*):
$$T_{\text{CPU}} = N_{ist} \times CPI \times T_{CK} = \frac{N_{ist} \times CPI}{f_{CK}}$$

1. **$N_{ist}$ (Instruction Count):**
   - Dipende dal set di istruzioni (ISA), dalla qualità del codice sorgente e dalle strategie di ottimizzazione del compilatore.
2. **$CPI$ (Cycles Per Instruction):**
   - Dipende dall'organizzazione microarchitetturale interna (monociclo $CPI = 1$, multiciclo $CPI > 1$, pipeline ideale $CPI \approx 1$, superscalare $CPI < 1$).
3. **$T_{CK} = 1 / f_{CK}$ (Periodo di Clock):**
   - Dipende dalla tecnologia dei semiconduttori (lunghezza di canale CMOS) e dal ritardo del cammino critico del circuito.

---

## 6. Calcolo del CPI Medio Pesato

Dato un repertorio di $n$ classi di istruzioni, dove la classe $i$-esima ha $CPI_i$ e viene eseguita $N_i$ volte con frequenza relativa $f_i = N_i / N_{ist}$:
$$\text{Cicli Totali} = \sum_{i=1}^n (CPI_i \times N_i)$$

$$CPI_{\text{medio}} = \sum_{i=1}^n \left( CPI_i \times \frac{N_i}{N_{ist}} \right) = \sum_{i=1}^n (CPI_i \times f_i)$$

$$T_{\text{CPU}} = N_{ist} \times \left( \sum_{i=1}^n CPI_i \times f_i \right) \times T_{CK}$$

---

### Esempio Pratico Numerico
Dato un processore con frequenza di clock $f_{CK} = 500\text{ MHz}$ ($T_{CK} = 1 / (500 \cdot 10^6) = 2\text{ ns}$) e un programma da $N_{ist} = 100$ istruzioni con la seguente ripartizione:

| Tipo Istruzione | Frequenza Relativa ($f_i$) | $CPI_i$ | Contributo ai Cicli ($f_i \times CPI_i$) |
| :--- | :---: | :---: | :---: |
| **ALU** | 43% (0.43) | 1 | $0.43 \times 1 = 0.43$ |
| **Load (lw)** | 21% (0.21) | 4 | $0.21 \times 4 = 0.84$ |
| **Store (sw)** | 12% (0.12) | 4 | $0.12 \times 4 = 0.48$ |
| **Branch (beq)**| 12% (0.12) | 2 | $0.12 \times 2 = 0.24$ |
| **Jump (jal)** | 12% (0.12) | 2 | $0.12 \times 2 = 0.24$ |
| **Totale** | **100%** | — | **$CPI = 2.23$** |

Calcolo del tempo di CPU:
$$T_{\text{CPU}} = 100 \times 2.23 \times \frac{1}{500 \times 10^6\text{ Hz}} = 223 \times 2\text{ ns} = 446\text{ ns}$$

---

## 7. Metrica MIPS e Relativi Limiti

La metrica **MIPS** (*Million Instructions Per Second*) esprime il tasso dinamico di emissione delle istruzioni:
$$\text{MIPS} = \frac{N_{ist}}{T_{\text{CPU}} \times 10^6} = \frac{f_{CK}}{CPI \times 10^6} = \frac{1}{CPI \times T_{CK} \times 10^6}$$

### Perché il MIPS non è una misura affidabile per confrontare architetture diverse
- Il MIPS varia inversamente con il CPI e direttamente con la frequenza, ma ignora completamente il numero di istruzioni ($N_{ist}$) necessarie per svolgere il medesimo algoritmo.
- Una macchina CISC può richiedere $N$ istruzioni complesse con $CPI = 2$, mentre una macchina RISC può richiedere $2N$ istruzioni semplici con $CPI = 1$ e tempo di clock dimezzato. In tal caso il MIPS può risultare ingannevole e premiare un processore che risulta in realtà più lento nel tempo di esecuzione complessivo.
