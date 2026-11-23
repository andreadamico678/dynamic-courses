# Elettronica A-L — Syllabus Ufficiale

- **Corso di Laurea:** Ingegneria Informatica (L-8) — 3° anno, 1° semestre
- **Docente:** Prof. Gianluca Giustolisi
- **SSD:** ING-INF/01 — Elettronica
- **Crediti:** 9 CFU

---

## 1. Risultati di Apprendimento Attesi

### Obiettivi

Fornire conoscenze di base sulla modellistica dei dispositivi elettronici, sul funzionamento dei circuiti analogici e digitali in tecnologia CMOS e sulle configurazioni circuitali basate su amplificatori operazionali, nonché sull'utilizzo di strumenti CAD di simulazione circuitale (LTspice).

### Conoscenza e Comprensione

Comprensione della fisica dei dispositivi elettronici a stato solido e dei modelli matematici/circuitali per descriverne il funzionamento. Funzionamento di circuiti analogici e digitali CMOS e stadi con amplificatori operazionali. Comprensione delle tipologie di analisi numerica CAD (.op, .dc, .ac, .tran).

### Capacità di Applicare Conoscenza e Comprensione

Analisi e sintesi/progetto di circuiti elettronici analogici e digitali elementari, con validazione tramite simulazione circuitale.

### Autonomia di Giudizio

Capacità di effettuare scelte architetturali e dimensionali nel dimensionamento dei componenti e nella polarizzazione.

### Abilità Comunicative

Padronanza del linguaggio tecnico dell'elettronica circuitale e rigore formale nella spiegazione analitica e nel colloquio orale.

---

## 2. Prerequisiti Richiesti

### Conoscenze Indispensabili

- **Analisi Matematica I:** Studio di funzioni, limiti, derivate, integrali.
- **Fisica II:** Grandezze elettromagnetiche, campo elettrico, potenziale, legge di Gauss.
- **Elettrotecnica:** Leggi di Kirchhoff (LKT, LKC), teoremi di Thévenin e Norton, partitori, principio di sovrapposizione degli effetti.

### Conoscenze Importanti

- Calcolo infinitesimale ed equazioni differenziali.
- Circuiti lineari tempo-invarianti (LTI) in regime stazionario, sinusoidale e transitorio.
- Trasformata di Laplace.

### Conoscenze Utili

- Teoria dei sistemi retroazionati, funzioni di trasferimento, diagrammi di Bode.

---

## 3. Testi di Riferimento

1. **Jaeger - Blalock**, _Microelettronica_, McGraw-Hill (5ª Edizione).
2. **Sedra - Smith**, _Circuiti per la Microelettronica_, EdiSES.
3. Slide ufficiali delle lezioni e manuali LTspice.

---

## 4. Modalità di Verifica dell'Apprendimento

Colloquio orale della durata media di circa 40 minuti articolato su tre macro-aree:

1. **Fisica dei dispositivi e semiconduttori / diodi**
2. **Circuiti analogici (Op-Amp, MOSFET a singolo stadio, risposta in frequenza)**
3. **Circuiti digitali (Inverter CMOS, porte combinatorie, memorie e sequenziali)**

Viene inoltre verificata la capacità di impostare lo svolgimento di esercizi numerici di analisi o dimensionamento circuitale.

---

## 5. Contenuti del Corso (Articolazione Didattica)

### Modulo 1: Introduzione all'Elettronica & Teoria Circuitale (5h)

- Breve prospettiva storica dell'elettronica.
- Segnali elettrici analogici e digitali; conversione A/D e D/A.
- Notazione convenzionale dei segnali (valori DC, piccolo segnale, segnale totale).
- Generatori controllati (VCVS, VCCS, CCVS, CCCS).
- Richiami di Elettrotecnica: KVL, KCL, partitori di tensione e corrente, equivalenti Thévenin/Norton.
- Spettro di frequenza dei segnali e concetto di amplificazione. Esempio guida: ricevitore FM.

### Modulo 2: Elettronica dello Stato Solido (4h)

- Struttura dei semiconduttori (silicio), reticolo cristallino e modello a legami covalenti.
- Generazione termica, ricombinazione e concentrazione intrinseca $n_i$.
- Legge dell'azione di massa ($n \cdot p = n_i^2$).
- Meccanismi di trasporto: moto di deriva (_drift_), mobilità ($\mu_n, \mu_p$), conducibilità e resistività del silicio intrinseco; saturazione della velocità di deriva ad alti campi.
- Drogaggio donor ($N_D$) e acceptor ($N_A$); concentrazione dei portatori maggioritari e minoritari.
- Meccanismo di diffusione (_diffusion_), gradiente di concentrazione e relazione di Einstein ($D/\mu = V_T$).
- Densità di corrente totale (drift + diffusion). Modello a bande energetiche: banda di valenza, banda di conduzione, gap energetico ($E_g$) e livello di Fermi.

### Modulo 3: Diodi a Stato Solido e Circuiti a Diodi (14h)

- Giunzione p-n all'equilibrio termodinamico: regione di carica spaziale (deplezione), potenziale di contatto $V_0$.
- Polarizzazione diretta e inversa; caratteristica $I$-$V$ esponenziale (equazione di Shockley).
- Tensione di soglia termica $V_T$, fattore di idealità $\eta$ e corrente di saturazione inversa $I_S$.
- Coefficiente di variazione termica della tensione del diodo ($\approx -2\text{ mV/}^\circ\text{C}$).
- Meccanismi di breakdown inverso: effetto Zener ed effetto valanga; diodo Zener e modelli.
- Effetti capacitivi nel diodo: capacità di giunzione (transizione) in polarizzazione inversa e capacità di diffusione in diretta.
- Comportamento dinamico in commutazione (_reverse recovery time_).
- Modelli circuitali: modello esponenziale per grandi segnali, modello a caduta di tensione costante ($V_{D,\text{on}} \approx 0.7\text{ V}$), modello a piccolo segnale ($r_d = V_T / I_D$), modello ideale a soglia zero.
- Analisi grafica tramite retta di carico.
- Circuiti applicativi: raddrizzatori a semionda con carico R, C, ed RC (calcolo del ripple e filtraggio); raddrizzatore a doppia semionda (trasformatore con presa centrale e ponte di Graetz).
- Regolatore di tensione Zener (stabilizzazione rispetto a variazioni di alimentazione $V_S$ e di carico $I_L$).
- Dispositivi ottici e speciali: diodo Schottky (metallo-semiconduttore, bassa caduta e alta velocità), fotodiodi, celle fotovoltaiche, LED.

### Modulo 4: Transistori ad Effetto di Campo MOS (9h)

- Struttura fisica del condensatore MOS: metallo/polisilicio, ossido di gate ($\text{SiO}_2$), substrato semiconduttore (body).
- Regioni operative del condensatore MOS: accumulazione, svuotamento (_depletion_), inversione (inversione debole e forte inversione); tensione di soglia $V_{th}$.
- Struttura del MOSFET a canale n (NMOS) a 4 terminali (Gate, Drain, Source, Body).
- Funzionamento qualitativo e quantitativo:
  - Interdizione ($V_{GS} < V_{th}$).
  - Regione di triodo / lineare ($V_{GS} \ge V_{th}$, $V_{DS} < V_{GS} - V_{th}$): resistenza di canale $R_{on}$.
  - Regione di saturazione ($V_{GS} \ge V_{th}$, $V_{DS} \ge V_{GS} - V_{th}$): strozzamento del canale (_pinch-off_), equazione parabolica $I_D = \frac{1}{2} k_n' \frac{W}{L} (V_{GS} - V_{th})^2$.
- Transconduttanza di saturazione $g_m$.
- Non-idealità: modulazione della lunghezza di canale ($\lambda$) e resistenza differenziale di uscita $r_o$; effetto body ($\gamma$) e modulazione di $V_{th}$ da $V_{SB}$.
- Transistore PMOS: differenze di polarità, portatori lacune, equazioni duali.
- Modello capacitivo del MOSFET: capacità parassite intrinseche ($C_{gs}, C_{gd}, C_{gb}, C_{db}, C_{sb}$) in interdizione, triodo e saturazione.
- Tecniche di polarizzazione DC: rete a 4 resistori (partitore di gate con resistenza di source stabilizzante), analisi analitica e con retta di carico.

### Modulo 5: Circuiti Digitali CMOS (10h)

- Fondamenti logici: livelli di tensione logica ($V_{OH}, V_{OL}, V_{IH}, V_{IL}$), margini di rumore ($NM_H, NM_L$).
- Metriche dinamiche: tempi di salita ($t_r$), discesa ($t_f$), ritardo di propagazione ($t_{pLH}, t_{pHL}, t_p$), prodotto ritardo-potenza (_Power-Delay Product_, PDP).
- Dissipazione di potenza: dinamica ($P_{\text{dyn}} = C_L V_{DD}^2 f$), di corto circuito e statica/leakage.
- L'invertitore CMOS statico: principio di complementarietà pull-up network (PMOS) e pull-down network (NMOS); caratteristica di trasferimento di tensione (VTC), soglia logica $V_M$, bilanciamento del rapporto di aspetto $(W/L)_p / (W/L)_n$ rispetto alle mobilità.
- Porte logiche combinatorie statiche CMOS: porta NAND, porta NOR; sintesi di funzioni logiche complesse (AOI/OAI) tramite reti di pull-up e pull-down duali.
- Dimensionamento dei transistori per tempi di commutazione equivalenti al gate fondamentale.
- Buffer e disaccoppiatori: ottimizzazione del ritardo su carichi capacitivi elevati, rastrelliera di stadi (_inverter taper_) e fattore di scala ottimo ($e \approx 2.718$ o $\sim 3\text{--}4$).
- Circuiti sequenziali: latch bistabile, latch SR a porte NOR/NAND, race conditions; trasmissione a porta di trasmissione (_transmission gate_).
- Flip-Flop: architettura Master-Slave, Flip-Flop di tipo D edge-triggered; flip-flop JK e T; registri a scorrimento e contatori asincroni/sincroni.
- Architetture di memoria a semiconduttore:
  - SRAM: cella statica a 6 transistori (6T), stabilità in lettura e scrittura.
  - DRAM: cella dinamica a 1 transistore e 1 condensatore (1T-1C), meccanismo di lettura distruttiva e necessità del rinfresco (_refresh_).
  - Memorie non volatili: ROM, flash memory (cella a floating gate).

### Modulo 6: Amplificatori Operazionali (Op-Amp) (9h)

- Caratteristiche dell'amplificatore ideale: guadagno ad anello aperto $A_{vd} \to \infty$, impedenza d'ingresso $R_{in} \to \infty$, impedenza d'uscita $R_{out} = 0$, banda infinita.
- Principio della massa virtuale e corto circuito virtuale in retroazione negativa.
- Configurazioni fondamentali:
  - Amplificatore invertente (guadagno $-R_2/R_1$, impedenza d'ingresso $R_1$).
  - Amplificatore non invertente (guadagno $1 + R_2/R_1$, altissima impedenza d'ingresso).
  - Inseguitore di tensione (_buffer_ a guadagno unitario).
  - Amplificatore di transresistenza e amplificatore sommatore pesato.
  - Amplificatore differenziale e sottrattore a 4 resistori.
  - Convertitori D/A: a resistori pesati e a scala $R\text{-}2R$.
  - Circuiti di integrazione (integratore di Miller e integratore con resistenza in parallelo per stabilità DC) e circuiti derivatori.
- Non-idealità degli amplificatori operazionali reali:
  - Guadagno differenziale finito e modello ad anello chiuso reale.
  - Guadagno di modo comune, tensione di modo comune e rapporto di reiezione di modo comune ($CMRR$).
  - Tensioni di offset d'ingresso ($V_{OS}$) e correnti di polarizzazione ($I_B, I_{OS}$).
  - Resistenze finite d'ingresso e non nulle d'uscita.
  - Risposta in frequenza reale: polo dominante, frequenza di transizione a guadagno unitario $f_T$, prodotto guadagno-banda ($GBW$).
  - Comportamento non lineare a grande segnale: massima escursione di uscita (_output voltage swing_), saturazione e _Slew-Rate_ ($SR = \max |dv_o/dt|$), frequenza di piena potenza.

### Modulo 7: Modelli di Piccolo Segnale e Amplificatori a Singolo Stadio (7h)

- Principio dell'amplificazione lineare per piccoli segnali: punto di riposo DC ($Q$-point) e scostamento incrementale AC.
- Ruolo dei condensatori di accoppiamento DC e di bypass di source.
- Modello per piccoli segnali a $\pi$ ibrido del MOSFET in saturazione: transconduttanza $g_m = \sqrt{2 k_n' (W/L) I_D} = 2 I_D / V_{OV}$, resistenza d'uscita $r_o = 1 / (\lambda I_D)$, transconduttanza di body $g_{mb}$. Guadagno intrinseco $A_{v0} = -g_m r_o$.
- Topologie fondamentali di amplificatori a singolo MOS:
  - **Common-Source (CS):** guadagno di tensione $A_v$, resistenza d'ingresso $R_{in}$, resistenza d'uscita $R_{out}$; trade-off guadagno-escursione dinamica.
  - **Common-Source con resistenza di degenerazione di source ($R_S$):** linearizzazione, stabilizzazione del guadagno, incremento dell'impedenza d'uscita.
  - **Common-Drain (CD / Source Follower):** guadagno $A_v \lesssim 1$, impedenza d'uscita bassa, ideale come stadio buffer.
  - **Common-Gate (CG):** amplificatore a bassa impedenza d'ingresso, elevata impedenza d'uscita, nessun effetto Miller, stadio a corrente (_current buffer_).
- Amplificatori multistadio accoppiati capacitivamente o direttamente.

### Modulo 8: Specchi di Corrente (1h)

- Principio del carico attivo e dello specchio di corrente elementare a due transistori MOS saturati.
- Calcolo del rapporto di riflessione della corrente in funzione delle geometrie $(W/L)$.
- Effetto della modulazione di canale $r_o$ sull'accuratezza della corrente copiata.
- Specchio di corrente Cascode: architettura, elevata impedenza di uscita e headroom minima di tensione.

### Modulo 9: Risposta in Frequenza degli Amplificatori (1h)

- Limiti di banda a bassa frequenza: effetto dei condensatori di accoppiamento e di bypass; calcolo della frequenza di taglio inferiore $f_L$ tramite il metodo delle costanti di tempo in cortocircuito (_Short-Circuit Time Constants_, SCTC).
- Modello del MOSFET ad alta frequenza: condensatori parassiti $C_{gs}$ e $C_{gd}$, frequenza di transizione intrinseca $f_T = g_m / [2\pi (C_{gs} + C_{gd})]$.
- Teorema ed Effetto Miller: sdoppiamento della capacità di retroazione $C_{gd}$ sullo stadio Common-Source e moltiplicazione capacitiva all'ingresso.
- Limiti di banda ad alta frequenza: calcolo della frequenza di taglio superiore $f_H$ tramite il metodo delle costanti di tempo a circuito aperto (_Open-Circuit Time Constants_, OCTC).
- Risposta in frequenza completa (diagramma di Bode dell'amplificatore CS a centro banda e ai limiti di banda).

### Modulo 10: Metodologia e Laboratorio CAD con LTspice (12h)

- Sintassi della netlist SPICE e comandi di analisi:
  - `.op`: punto di lavoro in continua.
  - `.dc`: sweep in tensione/corrente DC per curve caratteristiche.
  - `.ac`: analisi di risposta in frequenza sinusoidale di piccolo segnale.
  - `.tran`: analisi transitoria nel dominio del tempo per forme d'onda e commutazioni.
- Simulazione di:
  - Curve caratteristiche e circuiti raddrizzatori/regolatori a diodi.
  - Curve di uscita $I_D$-$V_{DS}$ e di trasferimento $I_D$-$V_{GS}$ del MOSFET; determinazione parametri di processo.
  - Circuiti logici CMOS (invertitore, NAND, tempi di commutazione, consumo dinamico).
  - Circuiti lineari ed integratori ad operazionali reali (effetto di offset, GBW e slew-rate).
  - Amplificatori a singolo transistore (CS, CD, CG), risposta in frequenza AC e clipping transitorio.

---

## 6. Mappa delle Domande FISSE d'Esame Orale

Di seguito si elencano gli argomenti che vengono chiesti nel corso del colloquio orale.

### Fisica dei Dispositivi
- Concentrazione di portatori (silicio intrinseco, creazione di coppie elettrone-lacuna, densità intrinseca $n_i$)
- Legge dell'azione di massa ($p \cdot n = n_i^2$)
- Corrente di deriva (mobilità $\mu_n, \mu_p$, velocità di deriva, saturazione della velocità, campo elettrico)
- Resistività del Silicio ($\rho = 1/\sigma$, conducibilità $\sigma = q(n\mu_n + p\mu_p)$)
- Semiconduttori drogati (impurità donori di tipo $N$ e accettori di tipo $P$, neutralità della carica, portatori maggioritari e minoritari)
- Corrente di diffusione (gradiente di concentrazione, legge di Fick) e Relazione di Einstein ($D/\mu = V_T = kT/q$)
- Modello a bande di energia (banda di valenza $E_V$, banda di conduzione $E_C$, bandgap $E_G = E_C - E_V$, livelli energetici droganti $E_D, E_A$, semiconduttori compensati)
- Equazione della corrente totale nel semiconduttore e nel diodo
- Modello di piccolo segnale del transistore MOS

### Diodi
- Barriera di potenziale nella giunzione pn ($\phi_j = V_T \ln(N_A N_D / n_i^2)$ e regione di svuotamento $w_{d0}$ in equilibrio)
- Caratteristica $I/V$ del diodo (equazione di Shockley in polarizzazione diretta e inversa, coefficiente di temperatura)
- Regione di breakdown (effetto Valanga per $V_Z > 5.6\,\text{V}$ ed effetto Zener per $V_Z < 5.6\,\text{V}$)
- Effetti capacitivi (capacità di giunzione $C_j$ in polarizzazione inversa e capacità di diffusione $C_D$ in polarizzazione diretta)
- Diodo Schottky (giunzione rettificante metallo-semiconduttore, conduzione per portatori maggioritari, assenza di accumulo minoritario)
- Modello di piccolo segnale del diodo ($g_d = I_D / V_T$, $r_d = V_T / I_D$)
- Analisi di circuiti a diodi (retta di carico, modello matematico iterativo, modello del diodo ideale, modello a caduta di tensione costante CVD, circuiti a più diodi)
- Raddrizzatori a singola semionda (con carico resistivo e con filtro capacitivo $RC$: tensione di ripple $V_r$, intervallo $\Delta T$ e angolo di conduzione $\theta_c$, corrente di picco $I_P$ e di spunto $I_{SC}$, tensione inversa di picco $\text{PIV} \ge 2V_P$)
- Raddrizzatore a doppia semionda (a trasformatore con presa centrale e a ponte di Graetz: confronto di ripple, capacità e $\text{PIV}$)
- Regolatore di tensione a diodo Zener (modello lineare a tratti in breakdown $V_Z + R_Z I_Z$, carico minimo $R_{\min}$, regolazione di linea $dV_L/dV_S$ e regolazione di carico $dV_L/dI_L$)

### Transistori MOS
- Regioni di funzionamento del condensatore MOS (accumulazione, svuotamento, inversione; tensione di soglia $V_{TN}$ ed effetto body $\gamma$)
- Corrente in regione di triodo ($i_D = K_n(v_{GS} - V_{TN} - v_{DS}/2)v_{DS}$)
- Corrente in regione di saturazione ($i_D = \frac{K_n}{2}(v_{GS} - V_{TN})^2$, condizione di pinch-off $v_{DS} \ge v_{GS} - V_{TN}$)
- Modulazione di lunghezza di canale (parametro $\lambda$, tensione di Early $V_A = 1/\lambda$, resistenza di uscita $r_o$)
- Capacità nella regione di triodo ($C_{GS} = C_{GD} = \frac{1}{2} C_{ox}'' WL + C_{GSO}W$)
- Capacità nella regione di saturazione ($C_{GS} = \frac{2}{3} C_{ox}'' WL + C_{GSO}W$, $C_{GD} = C_{GDO}W$) e in interdizione, più capacità di giunzione $C_{SB}, C_{DB}$
- Rete di polarizzazione a 3 resistori (polarizzazione a tensione $V_{GS}$ costante tramite partitore $R_1, R_2$ al gate e $R_D$ al drain; elevata sensibilità a $K_n$ e $V_{TN}$)
- Rete di polarizzazione a 4 resistori (stabilizzazione del punto di riposo $Q$ mediante resistore di degenerazione $R_S$ sul source per NMOS e PMOS)
- Modello di piccolo segnale del transistore MOS (ruolo dei condensatori di accoppiamento e di bypass per la separazione DC/AC; transconduttanza $g_m$ nelle tre espressioni, resistenza di uscita $r_o$, modello ibrido-$\pi$ e modello a T, guadagno intrinseco $\mu_f = g_m r_o$)
- Frequenza di transizione del transistore MOS ($f_T = \frac{1}{2\pi}\frac{g_m}{C_{GC}} \propto \frac{1}{L^2}$)

### Amplificatori Operazionali
- Amplificatore operazionale ideale ($A \to \infty, R_{in} \to \infty, R_{out} \to 0$)
- Cortocircuito virtuale (principio dell'annullamento della tensione differenziale d'ingresso in presenza di retroazione negativa)
- Amplificatore operazionale in configurazione invertente (guadagno $A_v = -R_2/R_1$, resistenza d'ingresso $R_{in} = R_1$, convertitore corrente-tensione)
- Amplificatore operazionale in configurazione non invertente (guadagno $A_v = 1 + R_2/R_1$, resistenza d'ingresso infinita, inseguitore di tensione / buffer)
- Circuito sommatore con amplificatore operazionale
- Circuito sottrattore (amplificatore differenziale: guadagno differenziale $A_{dd}$, guadagno di modo comune $A_{cm}$, rapporto di reiezione di modo comune $\text{CMRR}$)
- Convertitore DAC con sommatore pesato (a resistori pesati in binario)
- Convertitore DAC con rete a scala $R\text{-}2R$
- Integratore di Miller (nel dominio del tempo e nel dominio della frequenza) e circuito derivatore
- Integratore smorzato (con resistore di perdita $R_2$ in parallelo a $C$ per prevenire la saturazione in DC dovuta a correnti di polarizzazione e tensioni di offset)
- Amplificatore operazionale con guadagno finito (errore sul guadagno ad anello chiuso e modifica delle resistenze d'ingresso e d'uscita; tensione di offset $V_{OS}$, correnti di bias $I_B$ e di offset $I_{OS}$ con resistore di compensazione $R_3 = R_1 \parallel R_2$)
- Banda passante di un amplificatore operazionale (modello a polo dominante, prodotto banda-guadagno costante $\text{GBW} = A_0 f_b$, legame tra banda e guadagno ad anello chiuso; Slew-Rate $\text{SR}$ e banda a piena potenza $f_M$)

### Elettronica Digitale
- Definizione dei livelli logici ($V_{OH}, V_{OL}, V_{IH}, V_{IL}$, soglia logica $V_M$) e dei margini di rumore ($NM_H, NM_L$)
- Tempi di salita e di discesa ($t_r, t_f$ tra il $10\%$ e il $90\%$)
- Ritardo di propagazione ($\tau_{PHL}, \tau_{PLH}, \tau_P$ valutato al $50\%$ dell'escursione tramite corrente media e resistenza equivalente $R_{eq}$)
- Dissipazione di potenza nei circuiti digitali CMOS (potenza statica e potenza dinamica di commutazione $P_{dyn} = C_L V_{DD}^2 f$)
- Inverter CMOS (caratteristica di trasferimento VTC, regioni di funzionamento dei transistori NMOS e PMOS, calcolo di $V_M, V_{IL}, V_{IH}$, condizione di simmetria $k_n = k_p \implies (W/L)_p \approx 2.5\text{--}3 (W/L)_n$)
- Porte NOR CMOS (struttura serie/parallelo e dimensionamento dei transistori)
- Porta NAND CMOS (struttura serie/parallelo, dimensionamento e confronto d'area con la porta NOR)
- Porte logiche CMOS complesse (sintesi mediante grafi duali PDN/PUN e dimensionamento nel caso peggiore)
- Circuiti di buffer e numero ottimo di stadi (catena di $N$ invertitori scalati di fattore $f$, fattore di scala ottimo $f_{opt} = e \approx 2.718$)
- Elemento bistabile e Latch SR (a porte NOR e a porte NAND)
- Flip-flop SR (sincronizzato da segnale di clock)
- Flip-flop JK (superamento dello stato proibito, commutazione toggle e condizione di *race-around*)
- Flip-flop T (divisore di frequenza)
- Flip-flop D (cattura del dato e realizzazione CMOS con porte di trasmissione)
- Flip-flop master-slave (architettura a due stadi in controfase per eliminare il *race-around*)
- Flip-Flop edge-triggered (sincronizzazione sul fronte tramite ritardo di propagazione $\Delta\tau$)
- Registri (registri a scorrimento PI-PO, SI-SO, SI-PO, PI-SO)
- Contatori (contatori binari asincroni in cascata con flip-flop T/JK)
- Memorie ad accesso casuale (RAM): architettura a matrice $2^N \times 2^M$, decodificatori di riga/colonna e sense amplifier
- La cella di memoria a sei transistori (SRAM 6-T: struttura bistabile, operazioni di lettura e scrittura)
- Memorie dinamiche (DRAM) e la cella di memoria a un transistore (1-T: condensatore di immagazzinamento $C_S$, *charge sharing* su $C_{BL}$, necessità di *refresh* e lettura distruttiva)
- Memorie a sola lettura (ROM a matrice di transistori NMOS)
- Memorie non volatili (EPROM a *floating gate* con cancellazione UV, EEPROM a cancellazione elettrica)
- Memorie flash (cancellazione elettrica a blocchi e programmazione su *floating gate*)

### Amplificatori a Singolo Stadio, Specchi di Corrente e Risposta in Frequenza
- Amplificatore Common Source (CS con source a massa in AC e CS con resistenza di degenerazione sul source $R_S$): calcolo di guadagno a centro banda $A_v$, resistenza d'ingresso $R_{in}$ e resistenza d'uscita $R_{out}$
- Amplificatore Common Drain (inseguitore di source / *Source Follower*): calcolo di $A_v \approx 1$, $R_{in}$ elevata e bassa resistenza d'uscita $R_{out} \approx 1/g_m \parallel R_S$ (funzione di buffer di tensione)
- Amplificatore Common Gate (CG): calcolo di bassa resistenza d'ingresso $R_{in} \approx 1/g_m \parallel R_S$, $R_{out} \approx R_D$ e guadagno non invertente (buffer di corrente); cenni agli stadi multistadio in cascata accoppiati in AC (CS + CD) e Cascode (CS + CG)
- Specchi di corrente MOS: specchio di corrente semplice a 2 MOSFET (polarizzazione con resistore, rapporto geometrico $(W/L)_2/(W/L)_1$, effetto di $\lambda$) e specchio di corrente Cascode a 4 MOSFET ($R_{out} \approx g_m r_o^2$)
- Metodo delle costanti di tempo di cortocircuito (SCTC) per la stima della frequenza di taglio inferiore $f_L$ (applicato ai condensatori di accoppiamento $C_G, C_D$ e di bypass $C_S$ negli stadi CS, CD e CG)
- Metodo delle costanti di tempo a circuito aperto (OCTC) per la stima della frequenza di taglio superiore $f_H$ (applicato alle capacità parassite interne $C_{GS}, C_{GD}, C_{DB}, C_{SB}$ negli stadi CS, CD e CG; Teorema di Miller $C_M = C_{GD}(1 + |A_v|)$)

> NOTE: Il professore ha detto esplicitamente che all'orale non può chiedere niente al di fuori di questa lista.
