# Computer Architecture Exam - 26 January 2026

## Variant C1

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che
rappresenta il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

 L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
{11, (10,.., 10), 11, (01,.., 01), 00} o {11, (10,.., 10), (01, .., 01), 00}
Le sequenze minime sono {11, 10, 11, 01, 00} e {11, 10, 01, 00}
 (XY,.., XY) indica una sequenza di coppie XY consecutive
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                B/0                      E/0
     B                D/0                      C/0
     C                F/0                      A/0
     D                A/1                      B/0
     E                F/0                      C/0
     F                D/0                      E/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima
    equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF JK.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e
    l'uscita.

## Question 3
Valutare il CPI di un processore pipeline con una gerarchia di memoria con cache separata istruzioni e dati
sapendo che
-Store Misses = 15,
-fLOAD=20%,

-MissRateIstruzioni= 2,5%,
-MissPenaltyIstruzioni= 45 cicli,

-MissRateDati= 4% ,
-MissPenaltyDati= 45 cicli,

-CPIexecution=1,5,
-Numero di Istruzioni = 2000

## Question 4
Date una memoria cache di 64 blocchi, in quale blocco o set verrebbe piazzato un blocco della main
memory di indirizzo j = 50 nei seguenti casi ?
a) cache direct mapped
b) cache set associative a 2 vie
c) cache set associative a 4 vie
Indicare il valore dell'index nei 3 casi.

## Question 5
Discutere della gestione dei data hazard mediante il data forwarding.

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)

```c
main() {
  char prima[16],seconda[16];
  int i, pa2, res;

 for(i=0; i<3;i++)
   {
     printf("Inserisci una prima stringa di numeri\n");
     scanf("%s",prima);
     pa2=strlen(prima);
     do{ printf("Inserisci una seconda stringa di numeri della stessa dimensione\n");
         scanf("%s",seconda);
     } while(strlen(seconda)!=pa2);

        res= elabora(prima, seconda, pa2);
        printf("%d ) Risultato = %d\n", i, res)            ;
    }

}

int elabora(char *p, char *s, int n)
{int v,i,ris,t;
 t=1;
 ris=0;
 for(i=n-1;i>=0;i--)
   {
      v=p[i]-s[i];
      if(v>=1)
         ris=ris+v*t;
      t=t*10;
   }

 return ris;
}

```
## Variant C2

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che
rappresenta il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

 L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze:
{10, 10, {01, .., 01}, {10, .., 10}, 00} o {10, 10, {10, .., 10}, {01, .., 01}, 00}
Le sequenze minime sono {10, 10, 01, 10, 00} e {10, 10, 10, 01, 00}
 {XY,.., XY} indica una sequenza di coppie XY consecutive

Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                E/0                      A/0
     B                F/0                      A/0
     C                B/0                      C/0
     D                A/1                      B/0
     E                D/0                      C/0
     F                C/1                      E/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima
    equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e
    l'uscita.

## Question 3
Valutare il CPI di un processore pipeline considerando il seguente instruction mix (load 20%,
store 15%, branch 20% con 40% di branch taken, ALU 45%) e assumendo
-la presenza di due memorie distinte per i dati e le istruzioni,
-di non usare il data forwarding,
-di usare la tecnica del predict untaken nella gestione dei branch,
-di rilevare l'esito del branch nella fase di decode,
- che il 25% delle istruzioni ALU sono seguite da un'istruzione ALU che da essa dipende.
- che il 30% delle istruzioni Load sono seguite da un'istruzione ALU che da essa dipende.
- che il 10% delle istruzioni ALU sono seguite da un'istruzione branch che da essa dipende

## Question 4
Date una memoria cache di 256 blocchi, in quale blocco o set verrebbe piazzato un blocco della main
memory di indirizzo j = 450 nei seguenti casi ?
a) cache direct mapped
b) cache set associative a 2 vie
c) cache set associative a 4 vie
Indicare il valore dell'index nei 3 casi.

## Question 5
Discutere della gestione dei control hazard mediante la tecnica del predict untaken.

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)

```c
main() {
  char primo[8];
  int i, pa1, pa2, ris;

    for(i=0; i<3;i++)
       { printf("Inserisci una stringa di numeri( max 7 caratteri)\n");
          scanf("%s",primo);
          pa1=strlen(primo);
          do{ printf("Inserisci un numero intero con almeno lo stesso numero di cifre\n");
              scanf("%d",&pa2);
              ris= processa(primo, pa1, pa2);
          } while(ris<0);

             printf("Risultato = %d\n",ris);
         }
}

int processa(char *p0, int n, int a2)
{int v,j,k,ris,t,p;

 p=a2;
 ris=0;
 k=n-1;

 while(k>=0)
   {
      t=p%10;
      v=p0[k]-48-t;
      ris=ris+v;

         p=p/10;

         if(p==0 && k>0)
           return -1;

         k--;
     }

 return ris;
}
```
