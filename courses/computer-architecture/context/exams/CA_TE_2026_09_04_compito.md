# Computer Architecture Exam - 4 September 2026

                                            Appello del 4 settembre 2026

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che
rappresenta il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

 L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
{01, 01, (00,.., 00), 01, 11} o {01, 01, (11,.., 11), 01, 00}
Le sequenze minime sono {01, 01, 00, 01,11} e {01, 01, 11, 01,00}
 (XY,.., XY) indica una sequenza di coppie XY consecutive
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                D/0                      B/0
     B                B/0                      C/0
     C                A/1                      C/1
     D                A/0                      F/0
     E                D/1                      E/1
     F                F/0                      E/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Valutare il CPI di un processore pipeline con una gerarchia di memoria con cache separata istruzioni e dati sapendo
che
-Load Misses = 25,
-fSTORE=15%,

-MissRateIstruzioni= 2%,
-MissPenaltyIstruzioni= 45 cicli,

-MissRateDati= 3% ,
-MissPenaltyDati= 45 cicli,

-CPIexecution=1,5,
-Numero di Istruzioni = 3000

## Question 4
Date le seguenti memorie cache

Cache       Hit time (ns)     Associatività   Miss Rate       Block size (byte)      Miss Penalty (ns)
A                1,1                1            3%                  16                       40
B                1,12               2             ?                  32                       42
C                1,15               4             ?                  64                       44

Indicare il valore massimo del Miss Rate affinché le cache B e C abbiano prestazioni non inferiori a quelle della
cache A.

## Question 5
Quali soluzioni possiamo usare per la gestione dei control hazard?
Dare una breve descrizione per ciascuna soluzione.

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)
```c
main() {
  char stringa[16];
  int i, a1,a2, risultato;
      i=0;
      do{

            do{
                printf("Inserisci una stringa con almeno 3 caratteri\n");
                scanf("%s",stringa);
                a1 = strlen(stringa);
            }while(a1<3) ;
          printf("Inserisci un numero ad una cifra\n");
          scanf("%d",&a2);

          risultato= processa(stringa,a1,a2);
          printf("Il risultato e' %d\n",risultato);
          if(risultato>0)
             i++;

          }while(i<4);
}

int processa(char *str, int p1, int p2)
{int s0,cn,sm;
 int ca,pot;

    cn=0;
    sm=0;

    for(s0=p1-1;s0>=0;s0--)
      { ca=str[s0]-48;

          if(ca>=0 && ca<p2 )       // se numero <p2
          { cn++;
            sm+=ca;
          }
      }

          if(cn==0)
               return -1;
          else return sm/cn;
}
```
