#drills/computer_architectures/05_05_pipeline_performance
.
Qual è la formula generale e modulare per calcolare il **$\text{CPI}$ complessivo** di un processore pipeline in presenza di azzardi hardware?
?
$$\text{CPI} = \text{CPI}_{\text{ideale}} + \text{Stall}_{\text{strutturali}} + \text{Stall}_{\text{dati}} + \text{Stall}_{\text{controllo}}$$
dove $\text{CPI}_{\text{ideale}} = 1.0$ (il valore asintotico di completamento di 1 istruzione per ciclo in assenza di conflitti).
.
In una traccia d'esame:
.
- Instruction mix: Load $16\%$, Store $12\%$, Branch $12\%$ (con $50\%$ Taken), ALU $60\%$
- Presenza di **una sola memoria unificata** per dati e istruzioni
  Qual è il valore esatto di $\text{Stall}_{\text{strutturali}}$?
  ?
  Ogni istruzione che accede alla memoria dati nello stadio MEM genera $1$ ciclo di stallo per conflitto con lo stadio IF:
  $$f_{\text{mem}} = f_{\text{Load}} + f_{\text{Store}} = 0.16 + 0.12 = 0.28$$
  $$\text{Stall}_{\text{strutturali}} = 0.28 \times 1\text{ ciclo} = 0.28\text{ cicli/istruzione}$$
.
Nella stessa traccia:
.
- L'esito dei branch è rilevato nello stadio **Memory Access (MEM)** con strategia _Predict Untaken_.
- Branch totali: $12\%$, con il $50\%$ Taken.
  Qual è il valore esatto di $\text{Stall}_{\text{controllo}}$?
  ?
  I branch Untaken non subiscono stalli ($0$ cicli).
  I branch Taken subiscono una penalità pari allo svuotamento dei $3$ stadi precedenti (IF, ID, EX):
  $$f_{\text{taken}} = f_{\text{Branch}} \times 50\% = 0.12 \times 0.50 = 0.06$$
  $$\text{Stall}_{\text{controllo}} = 0.06 \times 3\text{ cicli} = 0.18\text{ cicli/istruzione}$$
.
Nella stessa traccia:
.
- Con Data Forwarding attivo:
- Il $30\%$ delle istruzioni ALU dipende da una ALU precedente a distanza 1: $\{\text{ALU}(i) \to \text{ALU}(i+1)\}$
- Il $35\%$ delle istruzioni ALU dipende da una Load precedente a distanza 1: $\{\text{Load}(i) \to \text{ALU}(i+1)\}$
  Qual è il valore esatto di $\text{Stall}_{\text{dati}}$?
  ?
.
1. La dipendenza $\text{ALU} \to \text{ALU}$ con forwarding causa **$0$ cicli di stallo** (il dato viene inoltrato da EX/MEM a EX).
2. La dipendenza $\text{Load} \to \text{ALU}$ a distanza 1 è un azzardo **Load-Use**, che causa **$1$ ciclo di stallo** inevitabile.
   Frequenza globale delle istruzioni interessate:
   $$f_{\text{Load-Use}} = f_{\text{ALU}} \times 35\% = 0.60 \times 0.35 = 0.21$$
   $$\text{Stall}_{\text{dati}} = 0.21 \times 1\text{ ciclo} = 0.21\text{ cicli/istruzione}$$
.
Sommando i risultati dei 3 drill precedenti (Appello 25 Giugno 2026), qual è il $\text{CPI}$ finale del processore?
?
$$\text{CPI} = \text{CPI}_{\text{ideale}} + \text{Stall}_{\text{strutturali}} + \text{Stall}_{\text{dati}} + \text{Stall}_{\text{controllo}}$$
$$\text{CPI} = 1.0 + 0.28 + 0.21 + 0.18 = 1.67\text{ cicli/istruzione}$$
.
In un secondo modello d'esame (Variante Gerarchia di Memoria, Appello 26 Gennaio 2026):
.
- $\text{CPI}_{\text{execution}} = 1.5$
- $\text{MissRate}_{\text{istruzioni}} = 2.5\%$, $\text{MissPenalty}_{\text{istruzioni}} = 45$ cicli
- Istruzioni di memoria dati totali: Load $20\%$, Store totali $= 15$ su $2000$ istruzioni totali ($15/2000 = 0.75\%$) $\implies f_{\text{dati}} = 20\% + 0.75\% = 20.75\% = 0.2075$
- $\text{MissRate}_{\text{dati}} = 4\%$, $\text{MissPenalty}_{\text{dati}} = 45$ cicli
  Qual è il CPI complessivo del sistema?
  ?
.
1. Stalli per miss istruzioni:
   $$\text{Stall}_I = \text{MissRate}_I \times \text{MissPenalty}_I = 0.025 \times 45 = 1.125\text{ cicli}$$
2. Stalli per miss dati:
   $$\text{Stall}_D = f_{\text{dati}} \times \text{MissRate}_D \times \text{MissPenalty}_D = 0.2075 \times 0.04 \times 45 = 0.3735\text{ cicli}$$
3. CPI totale:
   $$\text{CPI} = \text{CPI}_{\text{execution}} + \text{Stall}_I + \text{Stall}_D = 1.5 + 1.125 + 0.3735 = 2.9985 \approx 3.00\text{ cicli/istruzione}$$
