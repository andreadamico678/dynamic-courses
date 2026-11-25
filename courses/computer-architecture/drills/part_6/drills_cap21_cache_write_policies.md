#drills/computer_architectures/06_03_cache_write_policies
.
Domanda teorica d'esame (Appello 18 Settembre 2026, Domanda 5):
_"Qual è la differenza fondamentale tra la politica di scrittura **Write-Through** e la politica **Write-Back** in una cache? Qual è il principale vantaggio del Write-Back?"_
?
.
- **Write-Through:** Ogni operazione di scrittura della CPU aggiorna **simultaneamente** sia la linea di cache sia la memoria principale (RAM).
- **Write-Back:** La scrittura della CPU aggiorna **soltanto la linea di cache**, marcandola come modificata tramite un **Dirty Bit**. La memoria principale viene aggiornata solo successivamente, al momento dell'espulsione (rimpiazzo) del blocco sporco.
- **Principale Vantaggio del Write-Back:** **Riduzione drastica del traffico sul bus di memoria**. Se un blocco o una variabile vengono riscritti migliaia di volte in un ciclo (es. un contatore o accumulatori), si esegue una sola scrittura finale in RAM invece di migliaia, abbattendo la latenza e il consumo energetico.
.
A cosa serve il **Dirty Bit** (bit di modifica) in una cache Write-Back e cosa accade durante un rimpiazzo se il Dirty Bit è $0$ vs se è $1$?
?
Il Dirty Bit tiene traccia dello stato di coerenza tra la linea di cache e la memoria principale:
.
- Se **Dirty Bit = 0 (linea pulita):** il blocco in cache è identico alla copia in RAM. Durante il rimpiazzo, il blocco può essere **sovrascritto istantaneamente** senza effettuare alcun accesso in scrittura alla memoria.
- Se **Dirty Bit = 1 (linea sporca):** il blocco contiene dati modificati non presenti in RAM. Durante il rimpiazzo, l'intero blocco deve essere **preventivamente riversato (scritto) in RAM** prima di caricare il nuovo blocco, raddoppiando la penalità di miss.
.
Quale componente hardware viene inserito tra la cache e la memoria principale nelle architetture Write-Through per evitare che la CPU si blocchi ad ogni operazione di Store (**Write Stall**)?
?
Viene inserito un **Write Buffer (Buffer di Scrittura)** FIFO:
La CPU scrive il dato e l'indirizzo nel Write Buffer alla velocità della cache e prosegue immediatamente l'esecuzione delle istruzioni successive. Il controller di memoria provvede poi a scaricare asincronamente i dati dal buffer verso la RAM.
La CPU si arresta solo nell'evento raro in cui il Write Buffer risulti completamente saturo.
.
Cosa prevedono rispettivamente le due politiche di gestione del mancato accesso in scrittura (Write Miss): **Write-Allocate** vs **No-Write-Allocate**?
?
.
- **Write-Allocate (Fetch on Write):** In caso di miss in scrittura, il blocco mancante viene prelevato dalla memoria principale, caricato in cache, e successivamente modificato in cache con il nuovo dato.
- **No-Write-Allocate (Write Around):** In caso di miss in scrittura, il blocco non viene caricato in cache: il dato viene scritto direttamente nella sola memoria principale, ignorando la cache.
.
Qual è l'abbinamento standard tra politiche di scrittura e politiche di write miss adottato universalmente nei processori moderni?
?
.
- **Write-Back è abbinato a Write-Allocate:** Poiché Write-Back punta a trattenere tutte le future scritture nello stesso blocco all'interno della cache, ha senso spendere un miss iniziale per caricare il blocco, sfruttando la località temporale e spaziale.
- **Write-Through è abbinato a No-Write-Allocate:** Poiché Write-Through deve comunque scrivere in memoria principale ad ogni operazione, scrivere direttamente in RAM su miss evita l'onere di allocare e invalidare blocchi in cache per scritture isolate.
