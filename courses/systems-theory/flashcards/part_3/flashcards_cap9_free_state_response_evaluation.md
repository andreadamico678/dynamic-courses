#flashcards/automatica/03_02_free_response

Qual è l'espressione analitica dell'evoluzione libera dello stato $\mathbf{x}_l(t)$ di un sistema LTI continuo a partire da $\mathbf{x}(0)$?
?
$$\mathbf{x}_l(t) = e^{\mathbf{A}t} \mathbf{x}(0)$$

Qual è l'espressione analitica dell'evoluzione libera dell'uscita $\mathbf{y}_l(t)$ a partire da $\mathbf{x}(0)$?
?
$$\mathbf{y}_l(t) = \mathbf{C} e^{\mathbf{A}t} \mathbf{x}(0)$$

Cosa si intende per "modo naturale" (*natural mode*) associato a un autovalore reale $\lambda_i$?
?
La funzione temporale elementare $e^{\lambda_i t} \cdot 1(t)$, la cui velocità di decadimento o divergenza è governata dalla parte reale $\operatorname{Re}(\lambda_i)$.

Cosa si intende per "modi naturali" associati a una coppia di autovalori complessi coniugati $\lambda_{1,2} = -\sigma \pm j\omega$?
?
Le oscillazioni pseudo-periodiche smorzate o crescenti del tipo $e^{-\sigma t} \cos(\omega t)$ ed $e^{-\sigma t} \sin(\omega t)$.

Cosa compare nei modi naturali se un autovalore $\lambda$ ha molteplicità algebrica $m_a > 1$ e molteplicità geometrica $m_g < m_a$?
?
Compaiono i cosiddetti "modi secolari" (*secular modes*), ovvero funzioni temporali modulate da potenze di $t$: $t^k e^{\lambda t}$ per $k = 1, \dots, m_a - m_g$.

Se lo stato iniziale $\mathbf{x}(0)$ coincide esattamente con un autovettore destro $\mathbf{v}_i$ di $\mathbf{A}$ relativo all'autovalore $\lambda_i$, come evolve lo stato libero $\mathbf{x}_l(t)$?
?
La traiettoria rimane confinata lungo la direzione dell'autovettore:
$$\mathbf{x}_l(t) = e^{\lambda_i t} \mathbf{v}_i$$
senza eccitare alcun altro modo naturale del sistema.
