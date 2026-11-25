#drills/computer_architectures/01_04_implication_table_minimization
.
Data la seguente tabella degli stati d'esame (Appello 26 Gennaio 2026, Domanda 2):
.
| Stato Presente | $X = 0$ | $X = 1$ |
| :---: | :---: | :---: |
| **A** | $B / 0$ | $E / 0$ |
| **B** | $D / 0$ | $C / 0$ |
| **C** | $F / 0$ | $A / 0$ |
| **D** | $A / 1$ | $B / 0$ |
| **E** | $F / 0$ | $C / 0$ |
| **F** | $D / 0$ | $E / 0$ |
.
Al Passo 1 della tabella delle implicazioni, quali coppie di stati vengono **immediatamente sbarrate con una croce ($\times$)** per incompatibilità diretta dell'uscita?
?
Si confrontano le uscite associate agli stati per tutti gli ingressi:
- Lo stato **$D$** produce uscita $u = 1$ per $X = 0$.
- Tutti gli altri stati ($A, B, C, E, F$) producono uscita $u = 0$ per $X = 0$.
Pertanto, lo stato $D$ è incompatibile con tutti gli altri stati. Vengono sbarrate immediatamente con $\times$ tutte le 5 celle contenenti $D$:
$$(A, D), \quad (B, D), \quad (C, D), \quad (D, E), \quad (D, F)$$
.
Facendo riferimento alla tabella degli stati dell'esame precedente:
.
| Stato | $X = 0$ | $X = 1$ |
| :---: | :---: | :---: |
| **B** | $D / 0$ | $C / 0$ |
| **E** | $F / 0$ | $C / 0$ |
.
Cosa viene inserito nella cella $(B, E)$ della tabella delle implicazioni?
?
Si confrontano gli stati prossimi per ciascun ingresso:
1. Per $X = 0$: $B$ transita in $D$, mentre $E$ transita in $F$. La condizione è la coppia $(D, F)$.
2. Per $X = 1$: sia $B$ che $E$ transitano nello stesso stato $C$. La coppia $(C, C)$ è un'identità banale e non impone vincoli.
Nella cella $(B, E)$ si scrive la sola condizione:
$$(D, F)$$
.
Facendo riferimento alla cella $(B, E)$ che contiene la condizione $(D, F)$:
Sapendo che al Passo 1 la cella $(D, F)$ è stata sbarrata con $\times$ (perché $D$ ha uscita $u=1$ e $F$ ha uscita $u=0$ per $X=0$), cosa accade alla cella $(B, E)$ durante la propagazione a cascata?
?
La cella **$(B, E)$ viene sbarrata con una croce ($\times$)**.
Poiché l'equivalenza di $B$ ed $E$ richiedeva come condizione necessaria l'equivalenza della coppia $(D, F)$, e $(D, F)$ è già stata dichiarata incompatibile ($\times$), anche $B$ ed $E$ non possono essere equivalenti.
.
Facendo riferimento alla tabella degli stati:
.
| Stato | $X = 0$ | $X = 1$ |
| :---: | :---: | :---: |
| **A** | $B / 0$ | $E / 0$ |
| **F** | $D / 0$ | $E / 0$ |
.
Quali condizioni vengono inserite nella cella $(A, F)$? Tale cella sopravvive o viene sbarrata?
?
1. Per $X = 0$: $A$ transita in $B$, mentre $F$ transita in $D \implies$ condizione $(B, D)$.
2. Per $X = 1$: entrambi transitano in $E \implies (E, E)$ (identità).
La cella $(A, F)$ contiene la condizione $(B, D)$.
Poiché la cella $(B, D)$ è già stata eliminata con $\times$ al Passo 1 (per uscita discorde), **la cella $(A, F)$ viene sbarrata con $\times$**.
.
Completata la tabella delle implicazioni per una macchina sequenziale a 6 stati ($A, B, C, D, E, F$), le uniche celle non sbarrate risultano essere $(A, C)$ e $(B, E)$.
Qual è la partizione minima degli stati e quanti flip-flop occorrono per sintetizzarla?
?
1. Raggruppando gli stati equivalenti:
   $$S_0 = \{A, C\}, \quad S_1 = \{B, E\}, \quad S_2 = \{D\}, \quad S_3 = \{F\}$$
   La macchina minima ha **4 stati equivalenti**.
2. Numero di flip-flop necessari:
   $$k = \lceil \log_2 4 \rceil = \mathbf{2\text{ flip-flop}}$$
   (Non rimangono codici di stato inutilizzati poiché $2^2 = 4$).
