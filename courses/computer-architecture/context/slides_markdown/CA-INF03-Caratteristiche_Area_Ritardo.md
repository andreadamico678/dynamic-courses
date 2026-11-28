# Caratteristiche Area e Ritardo nelle Reti Logiche

- **Docente:** Maurizio Palesi
- **Riferimento:** Ottimizzazione Logica a Due Livelli vs. Multi-Livello — Compromesso Spazio-Temporale

---

## 1. Motivazioni e Metriche di Ottimizzazione

L'ottimizzazione di un circuito digitale impone sempre la gestione di compromessi di progetto (*trade-offs*) tra metriche fisiche e architetturali tra loro contrastanti:
- **Prestazioni:** Minimizzazione del ritardo di propagazione ($t_{pd}$) lungo il cammino critico (massima frequenza operativa $f_{max} = 1 / t_{pd}$).
- **Area di Silicio (Costo):** Numero totale di porte logiche, conteggio dei letterali e footprint in gate equivalenti.
- **Potenza Dissipata:** Potenza dinamica ($P_{dyn} \propto \alpha C_L V_{DD}^2 f$) e potenza statica di leakage.
- **Testabilità e Affidabilità:** Percentuale di guasti coperti e suscettibilità ai disturbi (*noise margin*).

---

## 2. Ottimizzazione Logica a Due Livelli (SOP / POS)

Nelle realizzazioni a **due livelli** (Somma di Prodotti o Prodotto di Somme):
- Hanno applicazione diretta nei blocchi hardware strutturati come i **PLA** (Programmable Logic Array, composti da un piano AND seguito da un piano OR) e nelle macro-celle logiche.
- Costituiscono il blocco costruttivo fondamentale per la sintesi e la ristrutturazione di reti multi-livello complesse.

### Concetto di Copertura e Copertura Minima
- **Copertura:** Insieme di implicanti che coprono tutti i mintermini dell'On-set della funzione.
- **Copertura Minima:** La copertura avente la **minima cardinalità** (minor numero di cubi/implicanti).

> **Nota di implementazione:** Non è sempre detto che la copertura minima a minor cardinalità corrisponda al minor costo circuitale in assoluto:
> - **Nei PLA:** L'obiettivo primario è ridurre il numero di linee di prodotto (termini AND condivisi) e subordinatamente ridurre i letterali.
> - **Nelle celle a porte complesse (Complex CMOS Gates):** Il costo è fortemente legato al numero complessivo di letterali, che determina direttamente il numero di transistor NMOS e PMOS.

---

## 3. Relazione Quantitativa tra Area e Ritardo a Due Livelli

Nel modello circuitale a due livelli con porte a fan-in limitato (porte a due ingressi):
- Il ritardo attraverso una porta ad albero con $K$ ingressi cresce con il numero di stadi logici (approssimabile come $\lceil \log_2 K \rceil \Delta$ oppure in cascata a catena). Nel modello a porte elementari a ritardo unitario $\Delta$:
  - Per un termine prodotto con $K$ letterali, il ritardo del primo livello è $(K - 1)\Delta$.
  - Per una porta OR che raccoglie $M$ termini prodotto, il ritardo del secondo livello è $(M - 1)\Delta$.

### Esempio Pratico
Data una funzione a 4 variabili con 9 mintermini nell'On-set:
$$o = f(x, y, z, v) = \{m_1, m_4, m_5, m_6, m_7, m_9, m_{11}, m_{14}, m_{15}\}$$

Se implementata direttamente in forma canonica non minimizzata (9 mintermini completi):
1. **Primo livello (AND):** 9 porte AND a 4 ingressi. Ciascuna porta a 4 ingressi realizzata con porte a 2 ingressi richiede un ritardo di:
   $$\text{Ritardo AND} = 3\Delta$$
2. **Secondo livello (OR):** 1 porta OR a 9 ingressi. Realizzata ad albero/cascata con porte a 2 ingressi richiede un ritardo di:
   $$\text{Ritardo OR} = 8\Delta$$
3. **Ritardo del Cammino Critico Totale:**
   $$t_{critico} = 3\Delta + 8\Delta = 11\Delta$$

### Effetto della Riduzione Algebrica (Fusione di Mintermini)
Consideriamo i mintermini adiacenti:
$$m_4 = x\,\overline{y}\,\overline{z}\,\overline{v}, \quad m_5 = x\,\overline{y}\,\overline{z}\,v$$
La loro somma booleana produce:
$$m_4 + m_5 = x\,\overline{y}\,\overline{z}(v + \overline{v}) = x\,\overline{y}\,\overline{z}$$
- **Vantaggio in Area:** Si elimina un termine prodotto intero (1 porta AND in meno; da 9 a 8 porte AND).
- **Vantaggio in Ritardo sul secondo livello:** La porta OR riceve ora 8 ingressi invece di 9:
  $$\text{Ritardo OR ridotto} = (8 - 1)\Delta = 7\Delta$$
- **Ritardo del primo livello:** Il termine fuso ha solo 3 ingressi (ritardo $2\Delta$), ma il cammino critico del primo livello resta pari a $3\Delta$ perché gli altri mintermini conservano ancora 4 letterali.
- **Nuovo ritardo critico:**
  $$t_{critico}' = 3\Delta + 7\Delta = 10\Delta$$

### Regola Fondamentale della Logica a Due Livelli
In un circuito a due livelli (SOP):
1. **La riduzione del numero di prodotti (implicanti) riduce contemporaneamente sia l'area sia il ritardo del circuito.**
2. **L'eliminazione di letterali** riduce l'area (porte con meno ingressi) e riduce il ritardo del singolo ramo, ma riduce il ritardo dell'intero circuito solo se tale ramo appartiene al cammino critico.
3. Pertanto, **identificare la copertura minima equivale a ottimizzare simultaneamente sia l'area sia la velocità.**

---

## 4. Confronto Strutturale: Logica a Due Livelli vs. Multi-Livello

| Proprietà | Logica a Due Livelli | Logica Multi-Livello |
| :--- | :--- | :--- |
| **Forma canonica / rappresentazione** | Somma di prodotti (SOP) o Prodotto di somme (POS) | Rete combinatoria libera di profondità arbitraria $k \ge 2$ |
| **Relazione Area-Ritardo** | **Monotona concorde:** Riducendo l'area si riduce anche il ritardo | **Trade-off contrastante (frontiera di Pareto):** Area minima comporta alto ritardo e viceversa |
| **Fattibilità fisica su grande scala** | Bassa (problemi di fan-in eccessivo, routing e capacità parassite) | Elevata (utilizzata nei tool EDA per circuiti VLSI e FPGA moderni) |
| **Algoritmi di sintesi** | Esatti: Mappe di Karnaugh, Quine-McCluskey | Euristici: Decomposizione algebrica, estrazione di fattori comuni |

### Frontiera di Ottimizzazione Multi-Livello (Curva Area/Ritardo)
In una rete multi-livello:
- Un'implementazione ad **area minima** (es. sommatore Ripple-Carry a cascata di Full-Adder) minimizza il silicio ma massimizza la propagazione del riporto (ritardo $O(N)$).
- Un'implementazione a **ritardo minimo** (es. sommatore Carry-Lookahead o parallelo a prefissi) riduce il ritardo a $O(\log N)$ introducendo un significativo sovraccarico di porte e interconnessioni (area elevata).
- Lo spazio di progetto individua una curva decrescente convessa su cui si selezionano i punti ottimi secondo i vincoli di frequenza e budget di silicio.
