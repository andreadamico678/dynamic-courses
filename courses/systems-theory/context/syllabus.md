# Insegnamento: Automatica (A - L)

- **Corso di Laurea:** Ingegneria Informatica (Classe L-8) — DIEEI, Università degli Studi di Catania
- **Anno Accademico:** 2026/2027 — 3° anno
- **Docente:** [Prof. Paolo Pietro Arena](https://www.dieei.unict.it/corsi/l-8-inf/docenti/uid.VzcxK0p5UEZoenRvOW80Mnlud0lXcHJLam1SM2RrQS92R3NybUlHZUpUVT0=) (Teoria dei Sistemi & Controlli Automatici)
- **Settore Scientifico-Disciplinare (SSD):** ING-INF/04 — Automatica
- **Crediti Formativi:** 12 CFU
- **Periodo Didattico:** Insegnamento annuale

---

# Modulo 1: Teoria dei Sistemi (6 CFU)

## 1. Risultati di Apprendimento Attesi (Descrittori di Dublino)
Il modulo si prefigge di raggiungere i seguenti obiettivi, in linea con i descrittori di Dublino:
1. **Conoscenza e capacità di comprensione:**
   - Analizzare un sistema lineare tempo-invariante (LTI), ricavandone il modello in forma di stato e successivamente risolvendone le equazioni della dinamica, anche con l'ausilio della trasformata di Laplace.
   - Determinare le proprietà strutturali di stabilità, controllabilità e osservabilità.
   - Formulare la funzione di trasferimento di un sistema lineare tempo-invariante e determinarne la risposta in frequenza.
2. **Capacità di applicare conoscenza e comprensione:**
   - Applicare le conoscenze acquisite al progetto del regolatore lineare sullo stato per un sistema dinamico lineare e del relativo osservatore di stato.
3. **Autonomia di giudizio:**
   - Giudicare il potenziale e i limiti della Teoria dei Sistemi Lineari e Tempo-Invarianti (LTI), in particolare in relazione agli aspetti di modellistica e di stabilità.
4. **Abilità comunicativa:**
   - Illustrare con rigore gli aspetti di base della Teoria dei Sistemi LTI, interagire e collaborare in team con colleghi ed esperti del settore.
5. **Capacità di apprendimento:**
   - Estendere autonomamente le proprie conoscenze sulla Teoria dei Sistemi dinamici LTI, attingendo alla vasta letteratura scientifica disponibile.

## 2. Modalità di Svolgimento dell'Insegnamento
- **Lezioni frontali:** condotte sia alla lavagna che con l'ausilio di personal computer (proiezione di slide teoriche, esempi applicativi e simulazioni al calcolatore).
- **Esercitazioni:** sessioni interattive con coinvolgimento attivo degli studenti per stimolare l'attenzione e ricavare valutazioni a campione dei risultati di apprendimento.
- *(Eventuale didattica a distanza/mista: potranno essere introdotte variazioni contingenti nel rispetto del programma previsto).*

## 3. Prerequisiti Richiesti
- Algebra dei numeri complessi.
- Equazioni differenziali lineari.
- Algebra delle matrici e geometria lineare.

## 4. Frequenza delle Lezioni
Il corso non prevede frequenza obbligatoria. L'assidua frequenza a lezioni ed esercitazioni è tuttavia fortemente raccomandata per il conseguimento degli obiettivi formativi nei tempi previsti.

## 5. Contenuti Dettagliati del Corso (Teoria dei Sistemi)

- **Modulo 1 — Concetti Introduttivi, Modelli di Stato e Trasformata di Laplace (14h didattica):**
  - *Parte A (5h):* Concetto di sistema dinamico: classificazioni MIMO, SISO, MISO, SIMO, variabili di stato; Algebra degli schemi a blocchi; Modelli in forma di stato.
  - *Parte B (9h):* Trasformata di Laplace, impulso di Dirac, impulso di durata finita. Teoremi di: traslazione in frequenza, ritardo, derivata e integrale, valore iniziale e finale. Antitrasformata di Laplace: poli e zeri, fratti semplici. Concetto di funzione di trasferimento; antitrasformata di poli complessi e coniugati, semplici e con molteplicità; trasformata di una funzione periodica; Funzione di trasferimento come trasformata della risposta all'impulso (e derivata della risposta indiciale); Invarianza della f.d.t. rispetto a cambi di coordinate.

- **Modulo 2 — Formula di Lagrange e Risoluzione della Dinamica (5h didattica):**
  - Formula di Lagrange per sistemi continui e discreti; transitorio e regime permanente, evoluzione libera ed evoluzione forzata.
  - Matrice di transizione: proprietà, definizione e calcolo analitico tramite inversione $\mathcal{L}^{-1}\{(sI - A)^{-1}\}$.
  - Forma minima; poli e autovalori; dimostrazione della formula di Lagrange.
  - Teorema di Cayley-Hamilton; Uso del teorema di Cayley-Hamilton e del teorema di Sylvester per il calcolo di $e^{At}$.

- **Modulo 3 — Stabilità, Teoria di Lyapunov e Piano delle Fasi (9h didattica):**
  - Movimento, traiettoria, stati di equilibrio; Definizione di stato di equilibrio stabile secondo Lyapunov.
  - Stabilità nei sistemi non lineari; applicazione della definizione di stato di equilibrio per un semplice sistema non lineare del primo ordine con funzione generatrice cubica; Bacino di attrazione.
  - Stabilità nei sistemi lineari a tempo continuo e a tempo discreto tramite autovalori; BIBO-stabilità.
  - Realizzazione in forma diagonale tramite blocchi e caratteristiche di robustezza: forma minima e ruolo dei residui nella forma diagonale.
  - Criterio algebrico di Routh.
  - Criteri di stabilità di Lyapunov per sistemi non lineari; Equazione matriciale di Lyapunov per sistemi lineari continui ($A^T P + PA = -Q$) e discreti ($A^T P A - P = -Q$).
  - Linearizzazione nell'intorno del punto di equilibrio.
  - Diagonalizzazione e forma di Jordan, molteplicità geometrica vs molteplicità algebrica e implicazioni sulla stabilità.
  - Geometria del movimento nel piano delle fasi: fuochi, nodi, centri, selle.

- **Modulo 4 — Raggiungibilità, Osservabilità e Sintesi dello Stato (9h didattica):**
  - Raggiungibilità e matrice di raggiungibilità; controllabilità a zero, relazione controllabilità e raggiungibilità, $A$-invarianza.
  - Matrice di controllabilità, forma canonica di Kalman per la controllabilità, forma canonica di controllo (FCC).
  - Regolatore lineare sullo stato: retroazione statica dello stato ($u = -Kx$), allocazione arbitraria degli autovalori, formula di Ackermann, stabilizzabilità.
  - Osservabilità e matrice di osservabilità; Forma canonica di Kalman per l'osservabilità, forma minima, forma canonica di osservabilità (FCO).
  - Progetto dell'osservatore asintotico dello stato (Luenberger).
  - Compensatore dinamico basato su osservatore e Teorema della Separazione.

- **Modulo 5 — Risposta Armonica, Bode e Sistemi a Tempo Discreto (7h didattica):**
  - Sistemi del primo e del secondo ordine; Funzione di risposta armonica; Diagrammi di Bode (modulo e fase).
  - Trasformata $\mathcal{Z}$ e antitrasformata $\mathcal{Z}$.
  - Trasformazione bilineare (Tustin).
  - Sistemi FIR e IIR.
  - Controllo a risposta piatta (Deadbeat control).

- **Modulo 6 — Esercitazioni MATLAB (6h didattica):**
  - Approfondimenti al calcolatore sulla risposta in frequenza, determinazione delle proprietà strutturali e calcolo dei parametri caratteristici dei sistemi dinamici lineari.

## 6. Testi di Riferimento (Teoria dei Sistemi)
- **A. Giua, C. Seatzu**, *Analisi dei sistemi dinamici*, Springer, II edizione.
- Dispense e note del docente.

## 7. Programmazione Dettagliata delle Lezioni
| Lezione | Argomenti Trattati | Riferimenti |
| :---: | :--- | :--- |
| **1** | Concetto di sistema dinamico: sistemi MIMO, SISO, MISO, SIMO, variabili di stato; Algebra degli schemi a blocchi; Modelli in forma di stato. | Giua-Seatzu, Capp. 2–7 |
| **2** | Trasformata di Laplace, impulso di Dirac, impulso di durata finita. Teoremi di: traslazione in frequenza, ritardo, derivata e integrale, valore iniziale e finale. Antitrasformata di Laplace: poli e zeri, fratti semplici. | Giua-Seatzu, Capp. 5–6 |
| **3** | Concetto di funzione di trasferimento; antitrasformata di poli complessi e coniugati, semplici e con molteplicità; trasformata di una funz. periodica; Funzione di trasf. come derivata della risposta all'impulso; invarianza della f.d.t. | Giua-Seatzu, Capp. 5–6 |
| **4** | Formula di Lagrange per sistemi continui e discreti; transitorio e regime, evoluzione libera e forzata; Matrice di transizione: Proprietà; Definizione e calcolo tramite $(sI - A)^{-1}$; forma minima; poli e autovalori. | Giua-Seatzu, Capp. 3–4 |
| **5** | Teorema di Cayley-Hamilton; Uso del teorema di C-H e del teorema di Sylvester per il calcolo di $\exp(At)$. | Giua-Seatzu, Capp. 3–4 |
| **6** | Movimento; traiettoria; equilibrio; definizione di stato di equilibrio stabile secondo Lyapunov; Stabilità nei sistemi non lineari. | Giua-Seatzu, Cap. 9 |
| **7** | Applicazione della definizione di stato di equilibrio per un semplice sistema non lineare del primo ordine con funzione generatrice cubica; bacino di attrazione. | Giua-Seatzu, Cap. 9 |
| **8** | Stabilità nei sistemi lineari tempo continui e tempo discreti tramite autovalori; BIBO stabilità; realizzazione in forma diagonale tramite blocchi e caratteristiche di robustezza: forma minima e ruolo dei residui nella forma diagonale. | Giua-Seatzu, Cap. 9 |
| **9** | Criterio di Routh. | Giua-Seatzu, Cap. 9 |
| **10** | Linearizzazione; Diagonalizzazione e forma di Jordan, stabilità: molteplicità geometrica vs molteplicità algebrica. | Giua-Seatzu, Cap. 9 |
| **11** | Geometria del movimento nel piano delle fasi: fuoco, nodo, sella. | Giua-Seatzu, Cap. 9 |
| **12** | Raggiungibilità; matrice di raggiungibilità; controllabilità a zero, controllabilità e raggiungibilità, $A$-invarianza, matrice di controllabilità, forma canonica di Kalman per la controllabilità. | Giua-Seatzu, Cap. 11 |
| **13** | Forma canonica di controllo; regolatore lineare sullo stato: allocazione arbitraria degli autovalori; formula di Ackermann; stabilizzabilità. | Giua-Seatzu, Cap. 11 |
| **14** | Osservabilità; Forma canonica di Kalman, forma minima, forma canonica di osservabilità, osservatore; compensatore - teorema della separazione. | Giua-Seatzu, Cap. 11 |
| **15** | Sistemi del primo e del secondo ordine: funzione di risposta armonica; diagrammi di Bode; trasformata zeta; antitrasformata zeta; Trasformazione bilineare; Sistemi FIR-IIR; Controllo a risposta piatta. | Giua-Seatzu, Cap. 10; Dispense |
| **16** | Esercitazione con MATLAB: risposta in frequenza e analisi proprietà strutturali. | Dispense del docente |

## 8. Verifica dell'Apprendimento (Teoria dei Sistemi)
- **Prova in itinere (Chiarimento Ufficiale Docente — Prof. Arena):**
  - **Prova UNICA di Fine Corso:** Non è prevista alcuna prova parziale a metà semestre (nessuna prova durante la pausa didattica di novembre). La prova in itinere per il modulo di Teoria dei Sistemi è **singola e omnicomprensiva**, collocata esclusivamente alla **fine del corso/semestre** (tipicamente a metà/fine gennaio).
  - **Perimetro Integrale degli Argomenti:** Poiché la prova si tiene al termine del ciclo di lezioni, essa comprende l'**intero programma** del modulo: modelli di stato e algebra dei blocchi, trasformata di Laplace e risolvente $(sI-A)^{-1}$, formula di Lagrange e matrice esponenziale $e^{At}$, stabilità interna di Lyapunov e criterio di Routh, proprietà strutturali di raggiungibilità e osservabilità con decomposizione di Kalman, sintesi del regolatore di stato (Ackermann), osservatore asintotico (Luenberger) con principio di separazione, sistemi del 1° e 2° ordine, risposta armonica e diagrammi di Bode.
  - **Progressione delle Lezioni vs Materiale Online:** La presenza di slide già disponibili online (in particolare sui sistemi del II ordine e sulla funzione di risposta armonica) non riflette l'avanzamento effettivo delle lezioni in aula. Tali tematiche vengono affrontate dal docente esclusivamente nella parte conclusiva del semestre.
  - **Esonero e Validità:** Il superamento della prova in itinere garantisce l'esonero dalla parte di Teoria dei Sistemi nella prova scritta d'esame, limitatamente agli appelli della sessione estiva.
- **Esame generale di Automatica:** Prova scritta divisa in due parti (Teoria dei Sistemi max 15 punti + Controlli Automatici max 15 punti). Accesso alla prova orale con punteggio complessivo scritto $\ge 18/30$.
- **Esempi di domande ed esercizi frequenti:**
  1. Modelli di sistemi dinamici: determinazione delle equazioni di stato differenziali/alle differenze e/o della funzione di trasferimento.
  2. Calcolo dell'evoluzione libera e forzata dello stato e dell'uscita.
  3. Analisi della stabilità (Routh, autovalori, Lyapunov), controllabilità e osservabilità.
  4. Progetto di un regolatore lineare con allocazione poli (Ackermann) per un sistema SISO.
  5. Progetto del relativo osservatore asintotico di stato (Luenberger).
  6. Tracciamento della risposta in frequenza (diagrammi di Bode) di un sistema dinamico lineare.

---

# Modulo 2: Controlli Automatici (6 CFU)

## 1. Risultati di Apprendimento Attesi (Descrittori di Dublino)
Il modulo si prefigge di raggiungere i seguenti obiettivi, in linea con i descrittori di Dublino:
1. **Conoscenza e capacità di comprensione:**
   - Comprendere le basi del controllo in retroazione di un sistema dinamico lineare, tempo-continuo e tempo-discreto.
   - Analizzarne la stabilità a ciclo chiuso anche a seguito di disturbi o variazioni parametriche.
   - Conoscere e formulare le specifiche di un sistema di controllo, sia nel dominio del tempo che della frequenza.
2. **Capacità di applicare conoscenza e comprensione:**
   - Eseguire il progetto di un controllore in retroazione per un sistema dinamico lineare LTI tempo-continuo, con la capacità di derivarne una versione digitale.
   - Eseguire il progetto e la taratura utilizzando i regolatori standard di tipo PID.
3. **Autonomia di giudizio:**
   - Giudicare il potenziale e i limiti della Teoria del Controllo di Sistemi Lineari e Tempo-Invarianti (LTI).
4. **Abilità comunicativa:**
   - Illustrare con precisione tecnica gli aspetti di base della Teoria del Controllo di Sistemi LTI, interagendo e collaborando in team con esperti del settore.
5. **Capacità di apprendimento:**
   - Estendere autonomamente le proprie conoscenze sulla Teoria del Controllo LTI, attingendo alla vasta letteratura disponibile nel settore.

## 2. Modalità di Svolgimento dell'Insegnamento
Lezioni frontali alla lavagna e con supporto multimediale (slide teoriche, simulazioni di controllo e dinamica); esercitazioni applicative con partecipazione attiva degli studenti.

## 3. Prerequisiti Richiesti
Conoscenza approfondita degli argomenti del modulo di Teoria dei Sistemi:
- Algebra dei numeri complessi.
- Equazioni differenziali lineari.
- Algebra delle matrici.
- Modelli di stato, trasformata di Laplace e Z, risposta armonica.

## 4. Frequenza delle Lezioni
Non obbligatoria, ma fortemente raccomandata per l'acquisizione delle competenze di sintesi e dimensionamento dei sistemi retroazionati.

## 5. Contenuti Dettagliati del Corso (Controlli Automatici)

- **Modulo 1 — Analisi della Risposta nel Tempo e in Frequenza (9h didattica):**
  - Introduzione ai sistemi di controllo.
  - Performance della risposta di sistemi lineari del 1° e 2° ordine nel dominio del tempo: costanti di tempo, tempo di risposta, tempo di salita, tempo di assestamento.
  - Dipendenza delle caratteristiche della risposta dalla posizione dei poli del sistema nel piano $s$.
  - Caratteristiche della risposta in frequenza di sistemi del 1° e 2° ordine: pulsazione di attraversamento, banda passante, modulo alla risonanza.
  - Sistemi a fase non-minima.
  - Diagrammi polari (Nyquist).

- **Modulo 2 — Struttura della Retroazione, Stabilità di Nyquist e Luogo delle Radici (12h didattica):**
  - Controllo a catena aperta e a catena chiusa.
  - Effetto della retroazione sulla sensitività alle variazioni parametriche, sui disturbi in catena diretta ed in catena di retroazione e sulla banda passante di un sistema lineare.
  - Accuratezza a regime di un sistema retroazionato per ingressi canonici (gradino, rampa, parabola); classificazione dei sistemi in tipi.
  - Analisi della stabilità dei sistemi lineari retroazionati mediante il Criterio di Nyquist. Margine di fase e margine di guadagno.
  - Metodo del Luogo delle Radici: regole di tracciamento ed esempi applicativi.

- **Modulo 3 — Specifiche e Sintesi delle Reti Compensatrici (12h didattica):**
  - Specifiche di un sistema di controllo: specifiche statiche e specifiche dinamiche.
  - Trasformazione di specifiche nel dominio del tempo in specifiche sulla risposta armonica.
  - Carta di Nichols.
  - Sintesi per tentativi. Reti compensatrici elementari: reti anticipatrici e reti attenuatrici.
  - Sintesi per tentativi per compensazione della risposta in frequenza.
  - Sintesi con l'ausilio del luogo delle radici.

- **Modulo 4 — Realizzazione Circuitale e Regolatori Standard PID (6h didattica):**
  - Realizzazione di reti compensatrici tramite reti elettriche passive e circuiti attivi ad amplificatori operazionali.
  - Controllori standard di tipo PID: strutture, metodi di taratura empirici (Ziegler-Nichols) e metodi analitici di taratura.

- **Modulo 5 — Controllo Digitale e Discretizzazione (5h didattica):**
  - Relazione tra il piano Z ed il piano S.
  - Discretizzazione e ricostruzione dei segnali. Teorema del campionamento di Shannon.
  - Specifiche di un sistema di controllo nel discreto.
  - Progettazione di un sistema di controllo discreto; sintesi del controllore discreto per traslazione/emulazione.

- **Modulo 6 — Esercitazioni MATLAB (6h didattica):**
  - Esercitazioni con l'ausilio del codice MATLAB su analisi di stabilità a catena chiusa, tracciamento Root Locus / Nichols e sintesi di controllori PID.

## 6. Testi di Riferimento (Controlli Automatici)
1. **Norman S. Nise**, *Controlli Automatici*, CittàStudi.
2. **Richard C. Dorf, Robert H. Bishop**, *Controlli Automatici*, Pearson.
3. Dispense del docente.

## 7. Programmazione Dettagliata delle Lezioni
| Lezione | Argomenti Trattati | Riferimenti |
| :---: | :--- | :--- |
| **1** | Introduzione ai sistemi di controllo; performance della risposta di sistemi lineari del 1° e 2° ordine nel dominio del tempo: costanti di tempo, tempo di risposta, tempo di salita, tempo di assestamento. | Nise, Capp. 1–4; Dispense |
| **2** | Dipendenza delle caratteristiche della risposta dalla posizione dei poli del sistema nel piano $s$. Caratteristiche della risposta in frequenza di sistemi del 1° e 2° ordine: pulsazione di attraversamento, banda passante, modulo alla risonanza. | Nise, Capp. 1–4; Dispense |
| **3** | Diagrammi polari. Controllo a catena aperta e a catena chiusa. Effetto della retroazione sulla sensitività alle variazioni parametriche, sui disturbi in catena diretta ed in retroazione e sulla banda passante. | Nise, Cap. 10; Dispense |
| **4** | Accuratezza a regime di un sistema retroazionato per ingressi a gradino, a rampa, a parabola; classificazione dei sistemi di controllo in tipi. | Nise, Cap. 10; Dispense |
| **5** | Analisi della stabilità dei sistemi lineari retroazionati mediante il criterio di Nyquist. Margine di fase e di guadagno. | Nise, Cap. 10; Dispense |
| **6** | Metodo del luogo delle radici: regole di tracciamento ed esempi. | Nise; Cap. 10; Dispense |
| **7** | Specifiche di un sistema di controllo: statiche e dinamiche. Trasformazione di specifiche dal tempo alla risposta armonica. Carta di Nichols. | Nise, Capp. 8, 10, 11; Dispense |
| **8** | Sintesi per tentativi. Reti compensatrici elementari: reti anticipatrici e reti attenuatrici. Sintesi per compensazione della risposta in frequenza. | Dispense del docente |
| **9** | Sintesi con l'ausilio del luogo delle radici. | Nise, Capp. 8, 10, 11; Dispense |
| **10** | Realizzazione di reti compensatrici tramite reti elettriche passive e amplificatori operazionali. | Dorf-Bishop; Dispense |
| **11** | Controllori standard di tipo PID: metodi di taratura empirici, metodi analitici di taratura. | Nise, Cap. 9; Dispense |
| **12** | Relazione tra il piano Z ed il piano S. Discretizzazione e ricostruzione. Teorema di Shannon. Specifiche di un sistema di controllo nel discreto. | Nise, Cap. 11; Dispense |

## 8. Verifica dell'Apprendimento (Controlli Automatici)
- **Prove in itinere:** Sono previste una o due prove in itinere, con un punteggio cumulativo fino a 30 punti. Gli studenti che cumulano un punteggio $\ge 18$ possono evitare di eseguire la parte di Controlli Automatici all'interno del compito scritto di Automatica, limitatamente agli appelli della sessione estiva.
- **Esame generale di Automatica:** Prova scritta divisa in due parti: Teoria dei Sistemi (max 15 punti) e Controlli Automatici (max 15 punti). Accesso alla prova orale con punteggio complessivo scritto $\ge 18/30$.
- **Criterio di superamento minimo (18/30):** Lo studente dovrà dimostrare di saper rappresentare e analizzare le proprietà strutturali di un sistema LTI e progettare un controllore in retroazione con almeno una delle tecniche trattate nel corso. *(La verifica potrà essere effettuata per via telematica qualora le condizioni istituzionali lo richiedano).*
- **Esempi di esercizi frequenti:**
  1. Dato un sistema sotto forma di funzione di trasferimento, progettare un controllore in retroazione che soddisfi opportune specifiche statiche e dinamiche, utilizzando la sintesi per tentativi nel dominio della frequenza.
  2. Dato un sistema sotto forma di funzione di trasferimento, determinarne la stabilità a ciclo chiuso utilizzando il criterio di Nyquist.
- **Esempi di domande teoriche frequenti:**
  1. Come si analizza la stabilità di un sistema retroazionato?
  2. Criterio di Nyquist: enunciato e dimostrazione rigorosa.
  3. Quali sono le specifiche di un sistema di controllo (statiche e dinamiche)?
  4. Come si trasformano le specifiche di un sistema di controllo dal dominio del tempo al dominio della frequenza?
  5. Come si effettua la sintesi per tentativi con reti anticipatrici e attenuatrici?
  6. Come si effettua la sintesi e la taratura di un controllore standard PID?
  7. Come si effettua la traslazione di un controllore analogico in forma digitale?
