#drills/computer_architectures/05_01_five_stage_pipeline
.
Quali sono i **5 stadi** canonici della pipeline RISC classica e qual è la funzione svolta da ciascuno?
?
.
1. **IF (Instruction Fetch):** Prelievo dell'istruzione dalla memoria istruzioni all'indirizzo indicato dal PC e incremento del PC ($PC \leftarrow PC + 4$).
2. **ID (Instruction Decode):** Decodifica dell'opcode/campi dell'istruzione, lettura dei registri sorgente dal Register File ed estensione del campo immediato.
3. **EX (Execute / ALU):** Esecuzione delle operazioni logico-aritmetiche tramite l'ALU, calcolo dell'indirizzo effettivo di memoria (Load/Store) o calcolo del target di salto.
4. **MEM (Memory Access):** Accesso alla memoria dati (lettura per Load o scrittura per Store).
5. **WB (Write Back):** Scrittura del risultato (calcolato dall'ALU o letto dalla memoria dati) nel registro di destinazione del Register File.
.
Qual è il ruolo fondamentale dei **registri di pipeline inter-stadio** (IF/ID, ID/EX, EX/MEM, MEM/WB)?
?
I registri di pipeline separano fisicamente i circuiti combinatori dei diversi stadi ad ogni fronte di clock.
Essi memorizzano e propagano in avanti:
.
1. I dati elaborati (istruzione, operandi, risultati ALU, dati letti dalla memoria).
2. I segnali di controllo generati nello stadio ID necessari per pilotare gli stadi successivi (es. `RegWrite`, `MemRead`, `MemWrite`, `MemtoReg`, `ALUOp`).
.
Dati i ritardi dei singoli stadi combinatori:
$$\text{IF} = 250\text{ ps}, \quad \text{ID} = 150\text{ ps}, \quad \text{EX} = 200\text{ ps}, \quad \text{MEM} = 300\text{ ps}, \quad \text{WB} = 150\text{ ps}$$
e un overhead dei registri di pipeline di $20\text{ ps}$.
Qual è il periodo minimo di clock $T_c$ della pipeline?
?
Il periodo di clock è vincolato tassativamente dallo **stadio più lento (collo di bottiglia)** più l'overhead del registro:
$$\text{Stadio più lento} = \text{MEM} = 300\text{ ps}$$
$$T_c = \max(\text{ritardi stadi}) + t_{\text{reg}} = 300\text{ ps} + 20\text{ ps} = 320\text{ ps}$$
.
In che modo l'introduzione della pipeline a 5 stadi influisce rispettivamente sul **Throughput** (istruzioni completate al secondo) e sulla **Latenza** (tempo necessario per completare una singola istruzione)?
?
.
- **Throughput:** Aumenta drasticamente (fino a $5$ volte nella condizione ideale), poiché ad ogni ciclo di clock viene completata una nuova istruzione.
- **Latenza:** Rimane identica o **aumenta leggermente**, perché la singola istruzione deve attraversare tutti e 5 gli stadi, e la durata di ogni stadio è livellata su quella dello stadio più lento più l'overhead dei registri ($5 \times 320\text{ ps} = 1600\text{ ps} > 1050\text{ ps}$ unpipelined).
  La pipeline migliora la produttività globale, non la velocità della singola istruzione.
