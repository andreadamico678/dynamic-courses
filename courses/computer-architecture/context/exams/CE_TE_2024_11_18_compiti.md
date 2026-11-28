# Computer Architecture Exam - 18 November 2024

## Variant C1

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa con
i sorgenti tramite studium. Usare come identificativo della cartella cognome.nome

**Duration:** 2h 30 min

## Question 1
Data la funzione booleana f(a,b,c,d,e)= Σ(4, 9, 12, 13, 16, 20, 21, 28, 29) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 A/0                      B/0
     B                C/0                      D/0
     C                E/0                      A/1
    D                 E/0                      F/0
     E                C/0                      A/1
     F                C/0                      B/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF T.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

```vhdl
Entity CU is
Port( stato: in std_logic_vector(2 downto 0);
       En0, En1, Wr0, Wr1, Ready: out std_logic);
End CU;
Architecture beh of CU is
 begin
--
end beh;
```

descrivere in VHDL il comportamento descritto dalla seguente tabella

      Ingressi        Uscite
        stato En0 En1 Wr0 Wr1 Ready
        000    0   0   0     0  1
        001    1   0   0     0  0
        010    0   0   0     0  0
         011   1   0   1     0  0
        100    0   1   0     0  0
        101    1   1   1     1  0
         110   0   0   0     0  0
         111   1   0   1     1  0

## Question 4
Scrivere un programma in linguaggio Assembly MIPS che traduce il seguente programma C
(cognome.nome.s):

```c
int calcola(char *a0, int a1, int a2)
{ int s0,s1;

       s0=0;
       for(s1=0;s1<a1;s1++)
         s0=s0+a0[s1]/a2;

       return s0;
}

main() {
  char VALORI[32];

    int s0,a1,a2,r1;

     for(s0=0;s0<3;s0++ )
       {
         do {
           printf("indice= %d : Inserisci una stringa con almeno 2 caratteri\n",s0);
           scanf("%s",VALORI);
          } while (strlen(VALORI)<2);
          printf("Inserisci un numero intero !=0 \n");
          scanf("%d",&a2);
          a1=strlen(VALORI);
          r1=calcola(VALORI,a1,a2);
          printf(" Risultato= %d \n",r1);
       }
}

```
## Question 5
Valutare il CPI di un processore pipeline con una gerarchia di memoria con 2 memorie cache dati e istruzioni
distinte sapendo che
-Load Misses = 18
-Store Misses = 12
-freqStore =15%,
-MissRateIstruzioni= 3%,
-MissPenaltyIstruzioni= 40 cicli,
-MissRateDati= 4%,
-MissPenaltyDati= 40 cicli,
-CPIexecution=1,6
-Numero di Istruzioni = 2000

## Question 6
Discutere dei data hazard e delle soluzioni per la loro gestione.

## Variant C2

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa con
i sorgenti tramite studium. Usare come identificativo della cartella cognome.nome

**Duration:** 2h 30 min

## Question 1
Data la funzione booleana f(a,b,c,d,e)= Σ(0, 4, 5, 12, 13, 20, 25, 28, 29) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 A/0                      F/0
     B                E/0                      B/0
     C                C/0                      A/1
    D                 C/0                      D/0
     E                E/0                      A/1
     F                E/0                      F/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF T.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

```vhdl
Entity CU is
Port( op: in std_logic;
       stato: in std_logic_vector(1 downto 0);
       Read0, Read1, Wr0, Wr1, Ready: out std_logic);
End CU;
Architecture beh of CU is
 begin
--
end beh;
```

descrivere in VHDL il comportamento descritto dalla seguente tabella

        Ingressi             Uscite
        op stato Read0 Read1 Wr0 Wr1 Ready
         0   00    0     0    0     0  1
         1   00    1     0    0     0  0
         0   01    0     0    0     0  0
         1   01    1     0    1     0  0
         0   10    0     1    0     0  0
         1   10    1     1    1     1  0
         0   11    0     0    0     0  0
         1   11    1     0    1     1  0

## Question 4
Scrivere un programma in linguaggio Assembly MIPS che traduce il seguente programma C
(cognome.nome.s):

```c
int elabora(char *a0, int a1)
{ int s0,s1,t;

       s0=0;
       for(s1=0;s1<a1;s1++)
         { t=a0[s1]%a1;
             s0=s0+t;
         }
       return s0;
}

main() {
  char BUFFER[16];
  char *a0;

    int s1,a1,r1;

     for(s1=0;s1<4;s1++ )
       {
          printf("STRINGA n. %d con almeno 4 caratteri \n",s1);
         scanf("%s",BUFFER);
         a0=BUFFER;
          a1=strlen(BUFFER);
          if(a1<4)
                 printf("Stringa non valida\n");
          else{ r1=elabora(a0,a1);
              printf(" Risultato= %d \n",r1);
             }
       }
}

```
## Question 5
Valutare CPI di un processore pipeline considerando il seguente instruction mix (load 20%, store 10%,
branch 15% con 50% di branch taken, ALU 55%) e assumendo
-la presenza di due memorie distinte per i dati e le istruzioni,
-di usare il data forwarding,
-di usare sempre gli stalli nella gestione dei branch,
-di rilevare l'esito del branch nella fase di execute,
- che il 30% delle ALU e il 40 % delle load sono seguite da un'istruzione che da essa dipende.

## Question 6
Discutere delle politiche di scrittura delle memorie cache.
