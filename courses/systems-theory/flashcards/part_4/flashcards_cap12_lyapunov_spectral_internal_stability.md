#flashcards/automatica/04_02_spectral_stability

Qual è la definizione formale di stato di equilibrio $\mathbf{x}_e$ **stabile** secondo Lyapunov?
?
Per ogni intorno $\epsilon > 0$ di $\mathbf{x}_e$, esiste un intorno $\delta > 0$ tale che, se $\|\mathbf{x}(0) - \mathbf{x}_e\| < \delta$, allora la traiettoria rimane confinata in $\|\mathbf{x}(t) - \mathbf{x}_e\| < \epsilon$ per tutti i $t \ge 0$.

Qual è la definizione formale di stato di equilibrio $\mathbf{x}_e$ **asintoticamente stabile** secondo Lyapunov?
?
È stabile secondo Lyapunov e inoltre attrattivo: esiste $\delta > 0$ tale che se $\|\mathbf{x}(0) - \mathbf{x}_e\| < \delta$, allora $\lim_{t \to \infty} \|\mathbf{x}(t) - \mathbf{x}_e\| = 0$.

Qual è la condizione necessaria e sufficiente sugli autovalori $\lambda_i(\mathbf{A})$ per l'asintotica stabilità di un sistema LTI continuo?
?
Tutti gli autovalori devono avere parte reale strettamente negativa:
$$\forall i, \quad \operatorname{Re}(\lambda_i) < 0$$

Qual è la condizione necessaria e sufficiente sugli autovalori per la semplice stabilità di un sistema LTI continuo?
?
Tutti gli autovalori hanno $\operatorname{Re}(\lambda_i) \le 0$, e per ciascun autovalore con $\operatorname{Re}(\lambda_i) = 0$ la molteplicità geometrica deve eguagliare quella algebrica ($m_g(\lambda) = m_a(\lambda)$).

Cosa rappresenta la molteplicità geometrica $m_g(\lambda)$ di un autovalore $\lambda$?
?
La dimensione dell'autospazio associato, ovvero il numero di autovettori linearmente indipendenti:
$$m_g(\lambda) = n - \operatorname{rank}(\lambda\mathbf{I} - \mathbf{A}) = \dim(\ker(\lambda\mathbf{I} - \mathbf{A}))$$

Perché una matrice $\mathbf{A}$ con un autovalore $\lambda = 0$ avente $m_g < m_a$ genera instabilità temporale?
?
Perché nella forma canonica di Jordan compare un blocco non diagonale di dimensione $\ge 2$, che genera nella risposta libera un modo secolare $t^k$ divergente per $t \to \infty$.

Nei sistemi LTI, la stabilità dell'equilibrio dipende dallo stato iniziale $\mathbf{x}(0)$ o è una proprietà globale del sistema?
?
È una proprietà globale indipendente dallo stato iniziale e dal punto di equilibrio scelto: un sistema LTI è asintoticamente stabile in un punto se e solo se è asintoticamente stabile ovunque.
