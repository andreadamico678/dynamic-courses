# Computer Architecture Exam - 16 July 2026

                                               Appello del 16 luglio 2026

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta
il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
{01, 00, (00,.., 00), (01,.., 01), 00} o {01, 01, (01,.., 01), 00, 01}
Le sequenze minime sono {01, 00, 00, 01,00} e {01, 01, 01, 00,01}
 (XY,.., XY) indica una sequenza di coppie XY consecutive
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                C/0                      E/0
     B                D/0                      A/0
     C                A/0                      B/0
     D                B/0                      A/1
     E                F/0                      C/0
     F                E/0                      C/1
-       Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-       Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF JK.
-       Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Valutare il CPI di un processore pipeline considerando il seguente instruction mix
(load 22%, store 13%, branch 15% con 60% di branch taken, ALU 50%)
e assumendo
- la presenza di due memorie distinte per i dati e le istruzioni,
- di usare solo stalli nella gestione dei branch,
- di rilevare l'esito del branch nella fase di decode,
- di usare il data forwarding,
- che per i dati si verifichino solo le seguenti dipendenze
 a) il 30% delle istruzioni ALU dipende da un'istruzione ALU precedente a distanza 1 {ALU (i) ->ALU(i+1) };
 b) il 10% delle istruzioni ALU dipende da un'istruzione Load precedente a distanza 2 {ALU (i) ->ALU(i+2) };
 c) il 15% delle istruzioni ALU dipende da un'istruzione Load precedente a distanza 1 {Load (i) ->ALU(i+1) };
 d) il 30% delle istruzioni Branch dipende da un'istruzione ALU precedente a distanza 1 {ALU (i)->Branch (i+1) };

## Question 4
Date le seguenti memorie cache
    Cache       Cache size        Hit time      Associatività      Miss Rate        Block size        Miss Penalty
                  (KB)              (ns)                                              (byte)              (ns)
    A              16                1                1               4%                16                 40
    B              16                 ?               2              3,6%               32                 42
    C              16                 ?               4              3,5%               64                 44

Indicare il valore massimo dello Hit time affinché le cache B e C abbiano prestazioni non inferiori a quelle della
cache A.

## Question 5
Discutere della politica Write through con write buffer per la scrittura della memoria cache.
Quale problema risolviamo con il write buffer? Come funziona il write Buffer? Quando si hanno stalli in scrittura
in presenza di un write buffer?

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)

```c
main() {
  char lettere[16],numeri[16];
  int i, dim, cor;

  for(i=0; i<3;i++)
     {
        printf("Inserisci una stringa di lettere minuscole (a,..,j)\n");
        scanf("%s",lettere);
        dim=strlen(lettere);
        printf("Inserisci una stringa di numeri di uguale dimensione\n");

        // Dato il lettera l(i) inserita nella prima stringa,
        // il numero da inserire n(i) = pos(l(i)) posizione della lettera nell'alfabeto
        // Se inserissimo ad esempio acdf- dovremmo inserire come seconda stringa 0235-
        // poiché n(0) = pos(a)=0, n(1)=pos(c)= 2, n(2) = pos(d)= 3, n(3) = pos(f) = 5

              scanf("%s",numeri);
          if(strlen(numeri)!=dim)
                 printf("La seconda stringa ha una diversa dimensione\n");

          else
                 {
                     cor= elabora(dim, lettere, numeri);
                     printf("L'errore quadratico medio e' = %d\n", cor) ;
                 }

      }
 }

int elabora(int n, char *le, char *nu)
{int i,ris,d;

 ris=0;
 i=0;

 for(i=0; i<n; i++)
   {
      d=(le[i]-97) - (nu[i]-48);
      if(d != 0)
         ris=ris+d*d;
   }

 return ris/n;
}
```
