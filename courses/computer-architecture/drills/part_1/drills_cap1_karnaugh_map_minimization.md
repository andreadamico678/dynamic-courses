#drills/computer_architectures/01_01_karnaugh_minimization
.
Data la seguente mappa di Karnaugh per $Y(A,B,C,D)$:
.
| $AB \backslash CD$ |  00   | 01  | 11  |  10   |
| :----------------: | :---: | :-: | :-: | :---: |
|       **00**       | **1** |  0  |  0  | **1** |
|       **01**       |   0   |  0  |  0  |   0   |
|       **11**       |   0   |  0  |  0  |   0   |
|       **10**       | **1** |  0  |  0  | **1** |
.
Qual è l'espressione minima SOP che raggruppa le quattro celle a '1'?
?
I 4 angoli della mappa sono reciprocamente adiacenti per continuità toroidale del codice Gray.
Formano un unico gruppo da 4 celle ($2^2$):
.
- Nelle righe $AB = 00$ e $10$, la variabile $A$ cambia valore ($0 \to 1$), mentre $B=0$ rimane costante $\implies \bar{B}$.
- Nelle colonne $CD = 00$ e $10$, la variabile $C$ cambia valore ($0 \to 1$), mentre $D=0$ rimane costante $\implies \bar{D}$.
  L'espressione minima SOP è:
  $$Y = \bar{B}\bar{D}$$
.
Data la seguente mappa di Karnaugh per $Y(A,B,C,D)$:
.
| $AB \backslash CD$ |  00   |  01   |  11   |  10   |
| :----------------: | :---: | :---: | :---: | :---: |
|       **00**       | **1** | **1** | **1** | **1** |
|       **01**       | **1** | **1** |   0   |   0   |
|       **11**       |   0   |   0   |   0   |   0   |
|       **10**       |   0   |   0   |   0   |   0   |
.
Qual è l'espressione minima SOP che copre tutti gli '1' senza termini ridondanti?
?
.
1. L'intera prima riga copre le 4 celle $(00, 00), (00, 01), (00, 11), (00, 10)$:
   - È un gruppo da 4 celle $\implies \bar{A}\bar{B}$.
   - È un **implicante primo essenziale** perché copre le celle $(00, 11)$ e $(00, 10)$ che non appartengono a nessun altro gruppo.
2. Il quadrato $2 \times 2$ in alto a sinistra copre $(00, 00), (00, 01), (01, 00), (01, 01)$:
   - È un gruppo da 4 celle $\implies \bar{A}\bar{C}$.
   - È un **implicante primo essenziale** perché copre le celle $(01, 00)$ e $(01, 01)$ che non appartengono a nessun altro gruppo.
3. Entrambi i gruppi sono essenziali. La cella $(00, 00)$ è coperta da entrambi.
   L'espressione minima SOP è:
   $$Y = \bar{A}\bar{B} + \bar{A}\bar{C}$$
.
Data la seguente mappa di Karnaugh con condizioni di indifferenza ($X$) derivanti da stati non utilizzati:
.
| $AB \backslash CD$ |  00   |  01   | 11  | 10  |
| :----------------: | :---: | :---: | :-: | :-: |
|       **00**       | **1** | **1** |  0  |  0  |
|       **01**       | **1** | **1** |  0  |  0  |
|       **11**       | **X** | **X** |  0  |  0  |
|       **10**       | **X** | **X** |  0  |  0  |
.
Sfruttando opportunamente i Don't Care ($X$), qual è l'espressione minima SOP?
?
Senza le $X$, gli '1' formerebbero solo un quadrato $2 \times 2$ nelle prime due righe $\implies \bar{A}\bar{C}$ (2 variabili).
Considerando le 4 celle con $X$ nelle righe $11$ e $10$ come '1', possiamo raggruppare **tutte le 8 celle ($2 \times 4$) delle prime due colonne**:
.
- Le colonne $CD = 00$ e $01$ condividono $C = 0 \implies \bar{C}$.
- Le righe coprono tutte e 4 le combinazioni di $AB$, quindi $A$ e $B$ vengono eliminate completamente.
  L'espressione minima SOP si riduce a un singolo letterale:
  $$Y = \bar{C}$$
.
Data la seguente mappa di Karnaugh a 3 variabili ($y_1, y_0, x$):
.
| $y_1 y_0 \backslash x$ |   0   |   1   |
| :--------------------: | :---: | :---: |
|         **00**         | **1** |   0   |
|         **01**         | **1** | **1** |
|         **11**         |   0   | **1** |
|         **10**         | **1** |   0   |
.
Qual è l'espressione minima SOP?
?
Identifichiamo gli implicanti primi essenziali:
.
1. Nella colonna $x=1$, le celle nelle righe $01$ e $11$ sono adiacenti:
   - Condividono $y_0 = 1$ e $x = 1 \implies y_0 x$ (copre le celle $(01, 1)$ e $(11, 1)$).
2. Nella colonna $x=0$, rimangono da coprire le tre celle a '1':
   - Celle nelle righe $00$ e $01$ (adiacenti) $\implies \bar{y}_1 \bar{x}$.
   - Cella nella riga $10$: è adiacente alla riga $00$ (bordo superiore e inferiore) $\implies \bar{y}_0 \bar{x}$.
     L'espressione minima SOP è:
     $$Y = \bar{y}_1 \bar{x} + \bar{y}_0 \bar{x} + y_0 x$$
.
Data la seguente mappa di Karnaugh per $Y(A,B,C,D)$:
.
| $AB \backslash CD$ |  00   | 01  | 11  |  10   |
| :----------------: | :---: | :-: | :-: | :---: |
|       **00**       |   0   |  0  |  0  |   0   |
|       **01**       | **1** |  0  |  0  | **1** |
|       **11**       | **1** |  0  |  0  | **1** |
|       **10**       |   0   |  0  |  0  |   0   |
.
Qual è il gruppo massimale che copre i quattro '1'?
?
Le colonne esterne $CD = 00$ e $CD = 10$ sono adiacenti lungo i bordi laterali della mappa.
Insieme alle righe adiacenti $AB = 01$ e $AB = 11$, formano un unico gruppo da 4 celle ($2 \times 2$):
.
- Nelle righe $01$ e $11$: $A$ commuta, rimane $B = 1 \implies B$.
- Nelle colonne $00$ e $10$: $C$ commuta, rimane $D = 0 \implies \bar{D}$.
  L'espressione minima SOP è:
  $$Y = B\bar{D}$$
.
Data la seguente mappa di Karnaugh per $Y(A,B,C,D)$:
.
| $AB \backslash CD$ |  00   |  01   |  11   |  10   |
| :----------------: | :---: | :---: | :---: | :---: |
|       **00**       | **1** | **1** | **1** | **1** |
|       **01**       | **1** | **1** | **1** | **1** |
|       **11**       |   0   |   0   |   0   |   0   |
|       **10**       |   0   |   0   |   0   |   0   |
.
Qual è l'espressione minima SOP?
?
Le prime due righe ($AB = 00$ e $AB = 01$) sono interamente riempite da '1', formando un unico rettangolo da 8 celle ($2 \times 4$):
.
- Coprendo tutte e 4 le colonne di $CD$, le variabili $C$ e $D$ sono completamente eliminate.
- Nelle prime due righe ($00$ e $01$), la variabile $B$ commuta ($0 \to 1$), quindi si elimina $B$.
- Rimane costante solo $A = 0$:
  $$Y = \bar{A}$$
