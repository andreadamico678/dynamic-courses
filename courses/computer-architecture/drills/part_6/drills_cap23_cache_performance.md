#drills/computer_architectures/06_05_cache_performance
.
Qual è la formula analitica dell'**AMAT (Average Memory Access Time / Tempo Medio di Accesso alla Memoria)**, l'indice prestazionale standard impiegato negli esami (Domanda 4)?
?
$$\text{AMAT} = \text{Hit Time} + (\text{Miss Rate} \times \text{Miss Penalty})$$
dove:
.
- $\text{Hit Time}$: Tempo necessario per accedere alla cache e determinare se il dato è presente (successo).
- $\text{Miss Rate}$: Frequenza percentuale con cui un accesso alla cache fallisce ($N_{\text{miss}} / N_{\text{accessi}}$).
- $\text{Miss Penalty}$: Tempo necessario per recuperare il blocco mancante dalla memoria principale e caricarlo in cache.
.
Problema d'esame reale (Appello 25 Giugno 2026, Domanda 4):
Date le seguenti tre memorie cache da $8\text{ KB}$:
.
- **Cache A:** $\text{Hit Time} = 1.00\text{ ns}$, $\text{Miss Rate} = 5.0\%$, $\text{Miss Penalty} = 40\text{ ns}$
- **Cache B:** $\text{Hit Time} = 1.05\text{ ns}$, $\text{Miss Rate} = 4.7\%$, $\text{Miss Penalty} = 42\text{ ns}$
- **Cache C:** $\text{Hit Time} = 1.10\text{ ns}$, $\text{Miss Rate} = 4.5\%$, $\text{Miss Penalty} = 42\text{ ns}$
  Calcola l'AMAT per ciascuna delle 3 cache e formula la graduatoria dalla migliore alla peggiore.
  ?
.
1. **Calcolo AMAT:**
   - $\text{AMAT}_A = 1.00 + (0.050 \times 40) = 1.00 + 2.000 = \mathbf{3.000\text{ ns}}$
   - $\text{AMAT}_B = 1.05 + (0.047 \times 42) = 1.05 + 1.974 = \mathbf{3.024\text{ ns}}$
   - $\text{AMAT}_C = 1.10 + (0.045 \times 42) = 1.10 + 1.890 = \mathbf{2.990\text{ ns}}$
.
2. **Graduatoria (prestazioni migliori = tempo di accesso minore):**
   - **$1^\circ$ Posto (Migliore):** **Cache C** ($2.990\text{ ns}$)
   - **$2^\circ$ Posto:** **Cache A** ($3.000\text{ ns}$)
   - **$3^\circ$ Posto (Peggiore):** **Cache B** ($3.024\text{ ns}$)
.
Problema d'esame reale (Appello 18 Settembre 2026, Domanda 4):
Date le cache:
.
- **Cache A:** $\text{Hit Time} = 1.09\text{ ns}$, $\text{Miss Rate} = 3.8\%$, $\text{Miss Penalty} = 40\text{ ns}$
- **Cache B:** $\text{Hit Time} = 1.16\text{ ns}$, $\text{Miss Rate} = 3.6\%$, $\text{Miss Penalty} = 40\text{ ns}$
- **Cache C:** $\text{Hit Time} = 1.23\text{ ns}$, $\text{Miss Rate} = 3.5\%$, $\text{Miss Penalty} = 40\text{ ns}$
  Indica la migliore e la peggiore cache dal punto di vista delle prestazioni.
  ?
.
1. **Calcolo AMAT:**
   - $\text{AMAT}_A = 1.09 + (0.038 \times 40) = 1.09 + 1.520 = \mathbf{2.610\text{ ns}}$
   - $\text{AMAT}_B = 1.16 + (0.036 \times 40) = 1.16 + 1.440 = \mathbf{2.600\text{ ns}}$
   - $\text{AMAT}_C = 1.23 + (0.035 \times 40) = 1.23 + 1.400 = \mathbf{2.630\text{ ns}}$
.
2. **Risultato:**
   - **Migliore:** **Cache B** (tempo minimo: $2.600\text{ ns}$)
   - **Peggiore:** **Cache C** (tempo massimo: $2.630\text{ ns}$)
.
Data una Cache 1 con $\text{AMAT}_1 = 2.0\text{ ns}$.
Si vuole progettare una Cache 2 con $\text{Hit Time} = 1.2\text{ ns}$ e $\text{Miss Penalty} = 50\text{ ns}$.
Qual è il **tasso di miss massimo ammissibile ($\text{Miss Rate}_{\max}$)** affinché la Cache 2 sia prestazionalmente non peggiore della Cache 1?
?
Imponiamo la disuguaglianza $\text{AMAT}_2 \le \text{AMAT}_1$:
$$\text{Hit Time}_2 + (\text{Miss Rate}_2 \times \text{Miss Penalty}_2) \le 2.0$$
$$1.2 + (\text{Miss Rate}_2 \times 50) \le 2.0$$
$$\text{Miss Rate}_2 \times 50 \le 2.0 - 1.2 = 0.8$$
$$\text{Miss Rate}_2 \le \frac{0.8}{50} = \frac{1.6}{100} = 1.6\%$$
Il tasso di miss non deve superare l'$1.6\%$ ($0.016$).
