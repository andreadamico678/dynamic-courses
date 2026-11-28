# Computer Architecture Exam - 24 September 2024

## Variant C1

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa
contenente i sorgenti tramite studium. Usare come identificativo della cartella cognome_nome

**Duration:** 2h 30 min

## Question 1
Data la funzione booleana f(a,b,c,d,e)= Σ(8, 9, 12, 13, 24, 25, 27, 29, 31) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 D/0                      B/0
     B                C/0                      E/0
     C                C/0                      A/1
    D                 F/0                      E/0
     E                C/0                      B/0
     F                A/0                      E/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

```vhdl
Entity CU is
Port(clk : in std_logic;                                           clk
       ready, cond, x: in std_logic;                           ready='0'
        C: in integer range 0 to 1;                                 C
                                                               ready='0'
        stato: out integer range 0 to 5 );                        ready
                                                                                                      stato
End CU;                                                                                            ready='0'
Architecture beh of CU is                                         cond
 begin                                                                x
--
end beh;
```

descrivere in VHDL il comportamento descritto dal seguente diagramma degli stati
                                                            C=0
       ready='0'
                   ready='1'                           x='1'      4
                                                                           C=1
          0                    1                   2
                                   cond='0'
                                                                                 0
                                                    x='0'
                                   cond='1'
                                               3

Le variazioni di stato avvengono sul fronte di salita del clock.

## Question 4
Scrivere un programma nel linguaggio Assembly del processore MIPS che traduce il seguente programma C
(Usare come nome del file cognome.nome.s):

```c
int calcola(char *a0, char *a1, int a2)
{int i,c;

    c=0;
    for(i=0;i<a2;i++)
     {
       if(a1[i] < 58)
           c=c+a1[i]-48;
       else c=c+a0[i]-48;
     }

return c;
}

main() {
  char STA[24],STB[24];
  char *a0,*a1;
  int i, a2, val;

       for(i=0; i<4;i++)
       {
          printf("Inserisci la prima stringa di soli numeri\n");
         scanf("%s",STA);
         a2=strlen(STA);
         do{
            printf("Inserisci la seconda stringa con almeno %d caratteri\n", a2);
             scanf("%s",STB);
         }while(strlen(STB)<strlen(STA));

         a0=STA;
        a1=STB;
         val= calcola(a0,a1,a2);
        if(val>0)
           printf("%d: Risultato = %d\n", i, val);
       }

}

```
## Question 5
Valutare il CPI di un processore pipeline con una gerarchia di memoria 2 cache distinte per istruzioni e dati
sapendo che
-Load Misses =24
-Store Misses =18
-MissRateIstruzioni= 4%,
-MissPenaltyIstruzione= 40 cicli,
 MissRateDati= 6%,
-MissPenaltyDati= 50 cicli,
-CPIexecution=1,6
-Numero di Istruzioni = 2000

## Question 6
Discutere dei data hazard e delle soluzioni che possono essere adottare per ridurre il loro impatto sulle
prestazioni del processore pipeline.

## Variant C2

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa
contenente i sorgenti tramite studium. Usare come identificativo della cartella cognome_nome

**Duration:** 2h 30 min

## Question 2
1. Data la funzione booleana f(a,b,c,d,e)= Σ(9, 11, 13, 15, 21, 23, 25, 29, 31) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 D/0                      B/0
     B                C/0                      E/0
     C                F/0                      A/1
    D                 A/0                      E/0
     E                F/0                      B/0
     F                C/0                      D/1

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF JK.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

```vhdl
Entity CU is
Port(clk : in std_logic;                                             clk
       ready, cond: in std_logic;                                ready='0'
        C: in integer range 0 to 1;                                   C
                                                                 ready='0'
        stato: out std_logic_vector(2 downto 0) );                  ready
                                                                                                    stato[2:0]
End CU;                                                                                            ready='0'
Architecture beh of CU is                                           cond
 begin
--
end beh;
```

descrivere in VHDL il comportamento descritto dal seguente diagramma degli stati
                                                              C=0
       ready='0'
                   ready='1'
                                                                 100-
                                                                             C=1
        000-                  001-                 010-
                                       cond='0'
                                                                               000-
                                       cond='1'
                                                  011-

Le variazioni di stato avvengono sul fronte di salita del clock.

## Question 4
Scrivere un programma nel linguaggio Assembly del processore MIPS che traduce il seguente programma C
(Usare come nome del file cognome.nome.s):

```c
int calcola(char *st0, char *st1, int a2)
{int i,s;

    s=0;
    for(i=0;i<a2;i++)
     {
       if(st0[i] < 58 )
           s=s+st0[i]-48;
       else if(st1[i] < 58 )
               s=s+st1[i]-48;
     }

return s;
}

main() {
  char STA[24],STB[24];
  int i, a2, val;

     for(i=0; i<4; i++)
       {
         printf("Inserisci la prima stringa con almeno un numero\n");
         scanf("%s",STA);
         a2=strlen(STA);

           printf("Inserisci la seconda stringa con %d caratteri\n", a2);
           scanf("%s",STB);
           if(strlen(STA)==strlen(STB))
            {
              val= calcola(STA,STB,a2);
              printf("%d: Risultato = %d\n", i, val);

           }
       }

}

```
## Question 5
Valutare il CPI di un processore pipeline con una gerarchia di memoria con un'unica cache istruzioni e dati
sapendo che
-fLoad =20%
-Store Misses =24
-MissRate= 5%,
-MissPenalty= 40 cicli,
 -CPIexecution=1,7
-Numero di Istruzioni = 2000

## Question 6
Discutere dei control hazard e delle soluzioni che possono essere adottare per ridurre il loro impatto sulle
prestazioni del processore pipeline.
