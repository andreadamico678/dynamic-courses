# Checkpoints: Teoria dei Sistemi

### 31 Ottobre 2026
- **Capitoli:**
  - Parte I (Modelli di Stato & Blocchi): Cap 1 (Equazioni di Stato & Modellistica Meccanica), Cap 2 (Trasformazioni Coordinate & Invarianti), Cap 3 (Schemi a Blocchi)
  - Parte II (Laplace & Risolvente): Cap 4 (Primitivi & Teoremi Laplace), Cap 5 (Fratti Semplici & Residui), Cap 6 (Risolvente dello Stato $(sI-A)^{-1}$), Cap 7 (Invarianti FdT $W(s)$)
  - Parte III (Dinamica Temporale & $e^{At}$): Cap 8 (Matrice Esponenziale $e^{At}$ & Cayley-Hamilton), Cap 9 (Risposta Libera $x_l(t)$), Cap 10 (Risposta Forzata & Convoluzione di Lagrange)
  - Parte IV (Stabilità di Lyapunov — Inizio): Cap 11 (Equilibrio LTI), Cap 12 (Lyapunov Spettrale $m_a$ vs $m_g$)
- **Esercizi d'Esame:**
  - Archetipo 1: Autovalori, risolvente $(sI-A)^{-1}$, calcolo $e^{At}$, risposta libera $x_l(t) = e^{At}x(0)$ e risposta all'impulso $w(t)$
  - Archetipo 4: Riduzione algebrica schemi a blocchi multianello a singola FdT $W(s)$ e formulazione matriciale da sistemi meccanici a due carrelli
  - Stabilità Interna: Calcolo punti di equilibrio e stabilità secondo Lyapunov ($m_a$ vs $m_g$)
- **Target:** Risolvere Archetipo 1 e Archetipo 4 in $\le 40$ min

---

### 30 Novembre 2026
- **Capitoli:**
  - Parte IV (Criterio di Routh & Stabilità): Cap 13 (Costruzione Tabella di Routh), Cap 14 (Casi Singolari: Pivot nullo e riga nulla), Cap 15 (Stabilità Parametrica $K$), Cap 16 (Stabilità BIBO)
  - Parte V (Risposta Armonica & Bode): Cap 17 (Bode Ampiezza), Cap 18 (Bode Fase & Risonanze), Cap 19 (Sistemi a Fase Non Minima & Ritardi)
- **Esercizi d'Esame:**
  - Tabella di Routh: Studio della stabilità al variare del parametro incognito $K$, risoluzione casi singolari, intervalli di stabilità e pulsazione di oscillazione $\omega_{osc}$
  - Archetipo 2: Forma costante di Bode ($K_B$), tracciamento asintotico ed esatto modulo/fase con zeri a parte reale positiva e risonanze
- **Target:** Risolvere tabella di Routh parametrica e tracciare Bode completo a fase non minima in $\le 45$ min

---

### 31 Dicembre 2026
- **Capitoli:**
  - Parte VI (Proprietà Strutturali di Kalman): Cap 20 (Matrice $P$ & Raggiungibilità), Cap 21 (Matrice $Q$ & Osservabilità), Cap 22 (Decomposizione Canonica di Kalman), Cap 23 (Stabilizzabilità & Rilevabilità PBH)
  - Parte VII (Controllo in Retroazione dello Stato): Cap 24 (Forma Canonica di Controllo), Cap 25 (Formula di Ackermann $K$), Cap 26 (Poli Dominanti $\lambda_{1,2} = -a \pm jb$, $\xi, \omega_n$)
  - Parte VIII (Osservatori di Stato & Compensazione): Cap 27 (Osservatore Asintotico di Luenberger), Cap 28 (Ackermann Duale $L$), Cap 29 (Principio di Separazione & Compensatore Dinamico)
  - Appendice: Soluzioni ed esercizi (`appendices/solutions.qmd`)
- **Esercizi d'Esame:**
  - Archetipo 3: Rango $\mathcal{P}$ e $\mathcal{Q}$, decomposizione di Kalman, sintesi regolatore $K$ con Ackermann da specifiche $\xi, \omega_n$, osservatore $L$
  - Prova integrale: Compito completo di Teoria dei Sistemi a tempo
- **Target:** Risolvere Archetipo 3 in $\le 45$ min; prova integrale in $\le 90$ min (o $\le 180$ min con Controlli Automatici)
