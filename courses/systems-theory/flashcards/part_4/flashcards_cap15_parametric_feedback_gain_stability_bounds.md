#flashcards/automatica/04_05_parametric_stability

Come si impiega la tabella di Routh per determinare l'intervallo di stabilità di un guadagno di retroazione parametrico $K$?
?
Si compila la tabella di Routh mantenendo $K$ come parametro algebrico e si impone che tutte le espressioni della prima colonna siano contemporaneamente e strettamente positive ($c_i(K) > 0$).

A cosa corrisponde il valore di guadagno $K_{crit}$ per cui un elemento della prima colonna della tabella di Routh si annulla diventando zero?
?
Al valore critico al limite di stabilità (*marginal stability*), in corrispondenza del quale una coppia di poli a ciclo chiuso attraversa l'asse immaginario ($s = \pm j\omega_{osc}$).

Come si determina analiticamente la pulsazione di oscillazione $\omega_{osc}$ al limite di stabilità associata a un guadagno $K_{crit}$?
?
Sostituendo $K_{crit}$ nel polinomio ausiliario $A(s) = a_2 s^2 + a_0 = 0$ ottenuto dalla riga precedente e risolvendo per $s = \pm j\sqrt{a_0 / a_2}$.

Cosa accade alla stabilità del sistema a ciclo chiuso se il guadagno $K$ esce dall'intervallo ammissibile $[K_{min}, K_{max}]$ determinato da Routh?
?
Uno o più elementi della prima colonna cambiano segno, generando variazioni di segno e portando uno o più poli nel semipiano destro instabile ($\operatorname{Re}(s) > 0$).
