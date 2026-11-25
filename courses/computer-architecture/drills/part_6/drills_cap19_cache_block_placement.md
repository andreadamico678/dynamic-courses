#drills/computer_architectures/06_01_cache_block_placement
.
Qual è la formula algebrica generale per determinare in quale blocco o set della memoria cache viene mappato un blocco della memoria principale con indirizzo di blocco $j$?
?
.
- **Cache Direct-Mapped (a mappatura diretta):**
  $$\text{Indice Blocco} = j \pmod{NB}$$
  dove $NB$ è il numero totale di blocchi della cache.
- **Cache Set-Associative a $N$ vie:**
  $$\text{Indice Set} = j \pmod{NS}$$
  dove $NS = \frac{NB}{N}$ è il numero totale di set (insiemi) della cache.
.
Problema classico d'esame (Appello 26 Gennaio 2026, Domanda 4):
Data una memoria cache di $NB = 64$ blocchi totali, in quale blocco o set verrebbe piazzato un blocco della main memory di indirizzo $j = 50$ nei seguenti tre casi?
.
1. Cache Direct-Mapped
2. Cache Set-Associative a 2 vie
3. Cache Set-Associative a 4 vie
   Qual è il valore dell'Index nei 3 casi?
   ?
4. **Direct-Mapped ($N=1$):**
   $$NB = 64 \implies \text{Index} = 50 \pmod{64} = 50$$
   Viene mappato nel **blocco 50**.
.
5. **Set-Associative a 2 vie ($N=2$):**
   $$NS = \frac{NB}{N} = \frac{64}{2} = 32\text{ set}$$
   $$\text{Index} = 50 \pmod{32} = 18$$
   Viene mappato nel **set 18** (in uno qualsiasi dei 2 blocchi del set).
.
6. **Set-Associative a 4 vie ($N=4$):**
   $$NS = \frac{NB}{N} = \frac{64}{4} = 16\text{ set}$$
   $$\text{Index} = 50 \pmod{16} = 2$$
   Viene mappato nel **set 2** (in uno qualsiasi dei 4 blocchi del set).
.
In una cache Fully-Associative (completamente associativa) composta da $64$ blocchi, in quale blocco viene posizionato il blocco di memoria $j = 50$?
?
In una cache Fully-Associative:
.
- Il numero di vie è pari al numero totale di blocchi ($N = NB = 64$).
- Il numero di set è $NS = 64 / 64 = 1$ (un unico grande set).
  Il blocco $j = 50$ può essere posizionato in **uno qualsiasi dei 64 blocchi liberi** della cache.
  Non esiste alcun campo Index nell'indirizzo di memoria.
.
Se due blocchi di memoria principale $j_1 = 18$ e $j_2 = 50$ competono per la cache, in quale delle seguenti organizzazioni con $NB = 64$ blocchi possono coesistere contemporaneamente in cache senza sovrascriversi?
.
- ( ) Cache Direct-Mapped
- ( ) Cache Set-Associative a 2 vie
- ( ) In nessuna delle due
  ?
- ( ) Cache Direct-Mapped
- (x) Cache Set-Associative a 2 vie
- ( ) In nessuna delle due
.
_Spiegazione:_ Nella 2-way set-associative, entrambi i blocchi mappano al set $18$ ($18 \pmod{32} = 18$ e $50 \pmod{32} = 18$). Poiché ogni set contiene 2 slot fisici, possono risiedere entrambi nel set 18 simultaneamente! Nella Direct-Mapped avrebbero mappato a blocchi distinti (18 e 50), ma se avessero avuto lo stesso indice si sarebbero scontrati.
