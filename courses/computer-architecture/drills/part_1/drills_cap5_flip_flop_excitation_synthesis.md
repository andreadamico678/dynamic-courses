#drills/computer_architectures/01_05_flip_flop_synthesis
.
Data una macchina a stati minimizzata composta da $N = 5$ stati ($A, B, C, D, E$), quanti flip-flop $k$ sono necessari per codificare gli stati in binario e quali combinazioni rimangono non utilizzate?
?
1. Numero minimo di flip-flop:
   $$k = \lceil \log_2 N \rceil = \lceil \log_2 5 \rceil = \mathbf{3\text{ flip-flop}} \quad (y_2, y_1, y_0)$$
   Con 3 flip-flop si generano $2^3 = 8$ codici.
2. Codificando gli stati $A=000, B=001, C=010, D=011, E=100$, le 3 combinazioni non utilizzate:
   $$\mathbf{101, \quad 110, \quad 111}$$
   devono essere inserite tassativamente come **Don't Care ($X$)** in tutte le mappe di Karnaugh delle eccitazioni e dell'uscita.
.
Qual è la tabella di eccitazione fondamentale del **Flip-Flop JK** per le 4 possibili transizioni dello stato $Q \to Q^+$?
?
| Transizione $Q \to Q^+$ | Ingresso $J$ | Ingresso $K$ | Significato |
| :---: | :---: | :---: | :--- |
| $0 \to 0$ | **$0$** | **$X$** | Mantieni 0 ($J=0, K=0$) o Reset ($J=0, K=1$) |
| $0 \to 1$ | **$1$** | **$X$** | Set ($J=1, K=0$) o Toggle ($J=1, K=1$) |
| $1 \to 0$ | **$X$** | **$1$** | Reset ($J=0, K=1$) o Toggle ($J=1, K=1$) |
| $1 \to 1$ | **$X$** | **$0$** | Mantieni 1 ($J=0, K=0$) o Set ($J=1, K=0$) |
.
Qual è la tabella di eccitazione fondamentale del **Flip-Flop SR** per le 4 possibili transizioni dello stato $Q \to Q^+$?
?
| Transizione $Q \to Q^+$ | Ingresso $S$ | Ingresso $R$ | Significato |
| :---: | :---: | :---: | :--- |
| $0 \to 0$ | **$0$** | **$X$** | Mantieni 0 ($S=0, R=0$) o Reset ($S=0, R=1$) |
| $0 \to 1$ | **$1$** | **$0$** | Solo Set ($S=1, R=0$) |
| $1 \to 0$ | **$0$** | **$1$** | Solo Reset ($S=0, R=1$) |
| $1 \to 1$ | **$X$** | **$0$** | Mantieni 1 ($S=0, R=0$) o Set ($S=1, R=0$) |
.
*Nota:* La combinazione $S=1, R=1$ è vietata.
.
In una riga della tabella delle transizioni, lo stato presente codificato con due flip-flop è $y_1 y_0 = 01$ e con ingresso $X=1$ lo stato prossimo diventa $y_1^+ y_0^+ = 10$.
Quali valori assumono le eccitazioni $(J_1, K_1, J_0, K_0)$ impiegando **Flip-Flop JK**?
?
Si valuta la transizione di ciascun flip-flop separatamente:
1. **Per il flip-flop $y_1$ ($Q_1 \to Q_1^+$):**
   Transizione $0 \to 1 \implies J_1 = 1, \quad K_1 = X$
2. **Per il flip-flop $y_0$ ($Q_0 \to Q_0^+$):**
   Transizione $1 \to 0 \implies J_0 = X, \quad K_0 = 1$
I valori di eccitazione da inserire nella tabella sono:
$$(J_1, K_1, J_0, K_0) = (1, X, X, 1)$$
.
Nella stessa transizione di stato ($y_1 y_0 = 01 \to y_1^+ y_0^+ = 10$ per $X=1$), quali valori assumono le eccitazioni $(S_1, R_1, S_0, R_0)$ se l'esame richiede l'uso di **Flip-Flop SR**?
?
Applicando la tabella di eccitazione SR a ciascun flip-flop:
1. **Per il flip-flop $y_1$ ($Q_1 \to Q_1^+$):**
   Transizione $0 \to 1 \implies S_1 = 1, \quad R_1 = 0$
2. **Per il flip-flop $y_0$ ($Q_0 \to Q_0^+$):**
   Transizione $1 \to 0 \implies S_0 = 0, \quad R_0 = 1$
I valori di eccitazione per FF SR sono:
$$(S_1, R_1, S_0, R_0) = (1, 0, 0, 1)$$
.
Perché i flip-flop di tipo JK sono preferiti ai flip-flop di tipo D o T nella sintesi manuale d'esame delle reti sequenziali?
?
Perché per ogni transizione di stato, uno dei due ingressi ($J$ o $K$) assume **sempre** il valore Don't Care ($X$).
La presenza sistematica del $50\%$ di Don't Care nelle tabelle di $J$ e $K$ permette raggruppamenti molto più ampi nelle mappe di Karnaugh, portando a equazioni SOP estremamente compatte.
