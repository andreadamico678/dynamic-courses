#flashcards/elettronica/parte_6_sequenziali_memorie_ltspice

Cos'è la condizione di *race-around* in un flip-flop JK sensibile al livello e come si elimina?
?
Quando $J = K = 1$ e la durata dell'impulso di clock supera il ritardo di propagazione del flip-flop, l'uscita commuta ripetutamente nello stesso ciclo; si elimina con architetture Master-Slave o edge-triggered.

---

Come funziona un Transmission Gate (TG) CMOS e perché supera il singolo pass-transistor NMOS?
?
Unisce un NMOS e un PMOS in parallelo pilotati in controfase ($CK$ e $\overline{CK}$), trasferendo senza perdita di soglia $V_{TN}$ o $|V_{TP}|$ l'intero intervallo di tensione $[0, V_{DD}]$.

---

Quali sono i due vincoli di rapporto geometrico nella cella SRAM 6T per garantire lettura non distruttiva e scrittura corretta?
?
In lettura il pull-down NMOS deve prevalere sull'NMOS di accesso (**Cell Ratio** $CR > 1.2$); in scrittura l'NMOS di accesso deve prevalere sul PMOS di pull-up (**Pull-Up Ratio** $PR < 1.8$).

---

Perché la lettura nella cella DRAM 1T-1C è distruttiva e richiede il *refresh* periodico?
?
La carica immagazzinata su $C_S$ si ridistribuisce (*charge sharing*) sull'elevata capacità di bitline $C_{BL}$ alterando il dato in cella ($\Delta V = (V_{\text{cell}} - V_{pre})\frac{C_S}{C_S + C_{BL}}$); inoltre le correnti di perdita scaricano $C_S$ nel tempo.

---

Qual è il meccanismo fisico di memorizzazione nelle memorie EPROM, EEPROM e Flash?
?
L'intrappolamento di carica elettrica su un gate isolato flottante (*floating gate*) che altera la tensione di soglia $V_{th}$ del transistore.

---

In LTspice, qual è la differenza tra i suffissi `M` e `MEG` in una netlist SPICE?
?
Poiché SPICE è case-insensitive, `M` indica sempre **milli** ($10^{-3}$), mentre per **Mega** ($10^6$) è obbligatorio scrivere `MEG`.

---

Qual è la differenza tra le direttive LTspice `.op`, `.ac` e `.tran`?
?
`.op` calcola il punto di lavoro DC; `.ac` esegue un'analisi in frequenza linearizzata di piccolo segnale attorno al punto `.op`; `.tran` integra nel tempo le equazioni non lineari complete.
