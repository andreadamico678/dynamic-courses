# Computer Architecture Exam - 16 June 2025

## Variant C1

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta il
seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.
L'uscita u nel generico istante vale 1 con l'arrivo delle quattro coppie consecutive (1,1) (-,1) (0,1) (-,1).

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 B/0                      C/0
     B                D/0                      E/0
     C                B/0                      A/0
    D                 E/0                      B/0
     E                A/1                      F/0
     F                E/0                      B/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

3 Data l'entity

Entity CU is
Port( op: in std_logic;
       stato: in std_logic_vector(1 downto 0);
       Sc0, Sc1, Sc2, Sc3, Sc4: out std_logic);
End CU;
Architecture beh of CU is
 begin
--
end beh;

descrivere in VHDL il comportamento descritto dalla seguente tabella

        Ingressi                  Uscite
        op stato Sc0       Sc1    Sc2 Sc3        Sc4
        0    00   0         0      0     1        0
        1    00   0         1      1     1        0
        0    01   1         0      0     1        0
        1    01   1         0      1     1        0
        0    10   0         1      0     0        0
        1    10   0         0      1     0        0
        0    11   0         0      0     0        0
        1    11   0         0      1     0        1

## Question 4
Scrivere un programma in linguaggio Assembly MIPS che traduce il seguente programma C
(cognome.nome.s):

main() {
  char ST[32];
  int i, num, val;

       for(i=0; i<4;i++)
       {
         printf("Inserisci il numero di caratteri da inserire (<32) \n");
         scanf("%d",&num);
         printf("Inserisci una stringa di %d numeri \n",num);
         scanf("%s",ST);
         if(num==strlen(ST))
             {
               val= elabora(ST,num);
               printf("Il valore medio della stringa e' %d \n", val);
             }
       }

}

```c
int elabora(char *a0, int a1)
{int s0,numero, t;

    numero=0;
    s0=0;
    while(s0<a1)
      {
        t=a0[s0]-48;
        if(t<0|| t>=10)
                   s0++;
        else {
                   numero += t;
                   s0++;
             }
      }

    return numero/a1;
}

```
## Question 5
Valutare il CPI di un processore pipeline con una gerarchia di memoria con 2 cache distinte per istruzioni e
dati sapendo che
-fLOAD = 15%,
-fSTORE = 15%,
-MissRateIstruzioni= 3%,
-MissPenaltyIstruzione= 40 cicli,
MissRateDati= 6%,
-MissPenaltyDati= 40 cicli,

-CPIexecution=1,6
-Numero di Istruzioni = 4000

## Question 6
Discutere dei data hazard e della loro gestione.

## Variant C2

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta il
seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.
L'uscita u nel generico istante vale 1 con l'arrivo delle quattro coppie consecutive (0,0) (-,0) (1,0) (-,0).

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 B/0                      A/0
     B                C/0                      D/0
     C                F/0                      E/0
    D                 A/1                      C/0
     E                C/0                      F/0
     F                A/1                      C/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

3 Data l'entity

Entity CU is
Port( op: in std_logic;
       stato: in std_logic_vector(1 downto 0);
       En0, En1, We0, We1, Sel: out std_logic);
End CU;
Architecture beh of CU is
 begin
--
end beh;

descrivere in VHDL il comportamento descritto dalla seguente tabella

        Ingressi         Uscite
        op stato En0 En1 We0 We1                 Sel
        0    00   0   0   0     0                 0
        1    00   0   0   1     0                 0
        0    01   1   0   0     0                 1
        1    01   1   1   1     1                 1
        0    10   0   0   0     1                 1
        1    10   0   1   1     0                 1
        0    11   0   0   0     0                 0
        1    11   0   1   1     0                 0

## Question 4
Scrivere un programma in linguaggio Assembly MIPS che traduce il seguente programma C
(cognome.nome.s):

main() {
  char STRING[16];
  int i, dim, len,max;

       for(i=0; i<3;i++)
       {
         printf("Dimensione della stringa \n");
         scanf("%d",&dim);
          do{
               printf("Inserisci una stringa di %d caratteri \n",dim);
             scanf("%s",STRING);
       } while (strlen(STRING)<dim);

            max= massimo(STRING,dim);
            printf("Il valore del massimo carattere e' %d \n",max);

        }
}

```c
int massimo(char *str, int n)
{int i,max;
  int tc;

    max=0;
      for(i=0;i<n;i++)
      { tc= str[i]-65;
              // Verifichiamo se e' una lettera maiuscola
              // e se e' maggiore dei precedenti caratteri
             if(tc>=max && tc<26 )
                  max=tc;
      }
    return max;
}

```
## Question 5
Valutare CPI di un processore pipeline considerando il seguente instruction mix (load 25%, store 15%, branch
15% con 50% di branch taken, ALU 45%) e assumendo
-la presenza di due memorie distinte per i dati e le istruzioni,
-di usare il data forwarding,
-di usare l'approccio predict untaken per la gestione dei branch,
-di rilevare l'esito del branch nella fase di memory access,
- che il 30% delle load sono seguite da un'istruzione ALU che da essa dipende
- che il 30% delle istruzioni ALU sono seguite da un'istruzione ALU che da essa dipende,
- che in tutti gli altri casi non vi sia una dipendenza dati.

## Question 6
Discutere delle politiche di block placement nella memoria cache. Confrontare tali politiche rispetto a miss
rate e hit time.
