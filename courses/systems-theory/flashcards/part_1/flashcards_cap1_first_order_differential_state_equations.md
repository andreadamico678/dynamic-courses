#flashcards/automatica/01_01_state_equations

Qual è la definizione formale di stato $\mathbf{x}(t_0)$ per un sistema dinamico?
?
È il numero minimo di variabili $\{x_1(t_0), \dots, x_n(t_0)\}$ la cui conoscenza a $t_0$, unita alla conoscenza dell'ingresso $\mathbf{u}(t)$ per $t \ge t_0$, determina univocamente l'evoluzione futura dello stato e dell'uscita per ogni $t \ge t_0$.

Nel modello di stato LTI continuo $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$, cosa rappresenta dimensionalmente $n$?
?
L'ordine (*order*) del sistema dinamico, coincidente con la dimensione del vettore di stato $\mathbf{x}(t) \in \mathbb{R}^n$.

Cosa rappresentano fisicamente le componenti del vettore di stato $\mathbf{x}(t)$ nell'architettura circuitale analogica di un sistema?
?
Le uscite degli $n$ integratori ideali ($\int dt$) presenti nel circuito.

Sotto quale specifica condizione fisica la matrice di trasmissione diretta $\mathbf{D}$ è identicamente nulla ($\mathbf{D} = \mathbf{0}$)?
?
Quando il sistema è strettamente proprio (*strictly proper*), ovvero possiede inerzia finita (massa o induttanza/capacità) che impedisce salti istantanei dell'uscita a fronte di gradini di ingresso.

In un sistema meccanico a masse traslazionali, quante variabili di stato sono necessarie per ciascun grado di libertà (massa)?
?
Due variabili di stato per ciascuna massa: la posizione $p_i(t)$ e la velocità $\dot{p}_i(t)$.

Nel passaggio da un'equazione differenziale scalare di ordine $n$ alla forma canonica compagna di Frobenius (*phase-variable form*), come sono definite le variabili di stato?
?
$$x_1(t) = y(t), \quad x_2(t) = \dot{y}(t), \quad \dots, \quad x_n(t) = y^{(n-1)}(t)$$

In una matrice compagna di Frobenius $\mathbf{A} \in \mathbb{R}^{n \times n}$, dove compaiono i coefficienti dell'equazione differenziale scalare ordinaria?
?
Nell'ultima riga della matrice, con segno cambiato e in ordine crescente di derivata: $\begin{bmatrix} -a_0 & -a_1 & \dots & -a_{n-1} \end{bmatrix}$.

Cosa accade alla matrice $\mathbf{B}$ quando un sistema SISO di ordine $n$ è espresso in forma canonica di Frobenius per variabili di fase?
?
Tutti gli elementi sono nulli tranne l'ultimo: $\mathbf{B} = \begin{bmatrix} 0 & 0 & \dots & b_0 \end{bmatrix}^T$.

In un sistema a due masse collegate da molla $k$ e smorzatore $B_1$, perché la forza elastica sulla seconda massa dipende dalla differenza di posizione $(p_1 - p_2)$?
?
Per la legge di Hooke: la forza di richiamo è proporzionale all'allungamento relativo della molla rispetto alla sua lunghezza di riposo.

Cosa descrive concettualmente la matrice di stato $A \in \mathbb{R}^{n \times n}$?
?
Descrive la dinamica autonoma interna (*dynamics*) del sistema quando l'ingresso esterno è spento ($u(t) = 0$).

Cosa determina concettualmente la matrice di ingresso $B \in \mathbb{R}^{n \times m}$?
?
Determina il modo in cui le influenze forzanti esterne (*external influences*) iniettano energia (*inject energy*) all'interno dello stato del sistema.

Cosa mappa concettualmente la matrice di uscita $C \in \mathbb{R}^{p \times n}$?
?
Mappa la distribuzione interna dell'energia (*internal energy distribution*) sui segnali fisicamente misurati dai sensori (*sensor signals*).

Cosa rappresenta concettualmente la matrice di legame diretto $D \in \mathbb{R}^{p \times m}$ (*direct feedthrough*)?
?
Rappresenta l'accoppiamento algebrico istantaneo (*coupling*) diretto tra ingresso e uscita ($\text{Input} \leftrightarrow \text{Output}$).

Perché nei sistemi fisici reali vale universalmente la condizione $D \approx 0$?
?
Per l'inerzia fisica intrinseca (masse, capacità, induttanze) che impedisce il trasferimento istantaneo di energia dall'ingresso ai sensori senza attraversare la dinamica di stato (*strictly proper system*).
