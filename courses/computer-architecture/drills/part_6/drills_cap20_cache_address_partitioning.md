#drills/computer_architectures/06_02_cache_address_partitioning
.
Come viene partizionato un indirizzo di memoria CPU a 32 bit nei tre campi fondamentali per l'accesso a una memoria cache?
?
L'indirizzo a 32 bit è suddiviso rigorosamente in:
$$[\text{TAG} \,|\, \text{INDEX} \,|\, \text{BYTE OFFSET}]$$
.
1. **Byte Offset ($b$ bit):** Identifica il singolo byte all'interno del blocco dati ($b = \log_2(\text{Block Size in byte})$).
2. **Index ($s$ bit):** Seleziona il set o blocco della cache ($s = \log_2(\text{Numero di Set } NS)$).
3. **Tag ($t$ bit):** Identifica univocamente quale blocco di memoria è presente nel set ($t = 32 - s - b$).
.
Dati i seguenti parametri di una cache per processore a 32 bit:
.
- Capacità dati totale $= 16\text{ KB} = 16384\text{ byte}$
- Dimensione del blocco $= 32\text{ byte}$
- Organizzazione: **Set-Associative a 4 vie** ($N = 4$)
  Calcola il numero di bit dei campi Byte Offset, Index e Tag.
  ?
.
1. **Numero totale di blocchi ($NB$):**
   $$NB = \frac{\text{Capacità}}{\text{Dimensione Blocco}} = \frac{16384\text{ B}}{32\text{ B}} = 512\text{ blocchi}$$
2. **Numero di Set ($NS$):**
   $$NS = \frac{NB}{N} = \frac{512}{4} = 128\text{ set}$$
3. **Bit dei campi:**
   - $\text{Byte Offset} = \log_2(32) = \mathbf{5\text{ bit}}$
   - $\text{Index} = \log_2(128) = \mathbf{7\text{ bit}}$
   - $\text{Tag} = 32 - (7 + 5) = 32 - 12 = \mathbf{20\text{ bit}}$
.
In una cache Direct-Mapped con capacità $8\text{ KB}$ e blocchi da $16\text{ byte}$, a quanti bit ammonta il campo Index e a quanti bit il campo Tag?
?
.
1. $NB = \frac{8192\text{ B}}{16\text{ B}} = 512\text{ blocchi}$
2. In direct-mapped, $NS = NB = 512\text{ set}$.
.
- $\text{Byte Offset} = \log_2(16) = \mathbf{4\text{ bit}}$
- $\text{Index} = \log_2(512) = \mathbf{9\text{ bit}}$
- $\text{Tag} = 32 - 9 - 4 = \mathbf{19\text{ bit}}$
.
Dato l'indirizzo esadecimale a 32 bit `0x00A3801C` inviato alla cache del drill precedente (Offset = 4 bit, Index = 9 bit, Tag = 19 bit).
Quali sono i valori esatti del Tag, dell'Index (in decimale) e del Byte Offset?
?
Convertendo in binario le cifre rilevanti:
.
- Gli ultimi 4 bit (nibble `C` $= 1100_2$) formano l'**Offset**: $1100_2 = \mathbf{12}$
- I 9 bit precedenti (provenienti da `801`: `... 000 0000 0001` con bit adiacente):
  Scrivendo `0x00A3801C`:
  `0000 0000 1010 0011 1000 0000 0001 1100`
  - Bit 3..0 (Offset): `1100` $= 12$
  - Bit 12..4 (Index, 9 bit): `0 0000 0001` $= \mathbf{1}$ (Set Index 1)
  - Bit 31..13 (Tag, 19 bit): `0000 0000 1010 0011 100` $= 0x0051C$
.
Oltre ai byte dati, quali bit di metadati ausiliari devono essere memorizzati per **ogni singola linea** di una cache Write-Back?
?
Ogni linea di cache deve contenere:
.
1. I bit di **Tag** (per verificare la corrispondenza con l'indirizzo della CPU).
2. **1 bit di Validità (Valid Bit)**: indica se la linea contiene dati validi o spazzatura/resettata.
3. **1 bit di Modifica (Dirty Bit)**: indica se il blocco è stato modificato da una scrittura della CPU e non ancora riversato in memoria principale.
   (Inoltre, per set-associative con LRU, alcuni bit di stato per la politica di rimpiazzo).
