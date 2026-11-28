# Computer Architecture Exam - 31 January 2023

## Variant C1

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa con
i sorgenti tramite studium. Usare come identificativo della cartella cognome.nome

**Duration:** 2h 20 min

## Question 1
Data la funzione booleana f(a,b,c,d,e)= Σ(5,7,11,15,21,22,23,30,31) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 D/0                      B/0
     B                B/0                      C/0
     C                A/0                      B/1
    D                 A/0                      F/0
     E                D/0                      F/1
     F                F/0                      E/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF T.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

```vhdl
Entity CU is
Port(clk, start: in std_logic;                                        clk
       Op,ready: in std_logic;
       stato: out std_logic_vector(2 downto 0) );                    start                            stato[2:0]
End CU;                                                               Op
Architecture beh of CU is
                                                                    ready
 begin
--
end beh;
```

descrivere in VHDL il comportamento descritto dal seguente diagramma degli stati

                               ready='0'
       start='0'                                                   100-
                   start='1'                                                        101-
        000-                  001-             010-

                                                                                              000-
                                                                   011-

## Question 4
Scrivere un programma in linguaggio Assembly MIPS che traduce il seguente programma C
(cognome.nome.s):

```c
int calcola(char *s, int d,int num)
{ int j,f;

         if(num==1) return 1;

          f=1;
          for(j=0;j<d;j++)
               if(s[j] -48 < num )
                   f=f*(s[j]-48);
        return f;
}

main() {
  char NUM[8];
  int i,val,ris;

         printf("Inserisci una stringa di soli numeri \n");
         scanf("%s",NUM);
         for(i=0; i<strlen(NUM);i++)
         {

         printf("Inserisci un numero ad una cifra");
         scanf("%d",&val);

         ris= calcola(NUM, strlen(NUM),val);

         printf(" Valore= %d \n",ris);
    }
}

```
## Question 5
Valutare CPI di un processore pipeline considerando il seguente instruction mix (load 20%, store 10%,
branch 20% con 50% di branch taken, ALU 50%) e assumendo
-la presenza di due memorie distinte per i dati e le istruzioni,
-di non usare il data forwarding,
-di usare l'approccio predict untaken per la gestione dei branch,
-di rilevare l'esito del branch nella fase di execute,
- che il 20% delle load e il 30% delle istruzioni ALU sono seguite da un'istruzione che da essa dipende.

## Question 6
Discutere dell'implementazione microprogrammata dell'unità di controllo.

## Variant C2

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa con
i sorgenti tramite studium. Usare come identificativo della cartella cognome.nome

**Duration:** 2h 20 min

## Question 1
Data la funzione booleana f(a,b,c,d,e)= Σ(0,2,6,8,16,20,21,22,23) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 A/0                      B/0
     B                E/0                      C/0
     C                A/0                      B/1
    D                 A/0                      E/1
     E                F/0                      D/0
     F                B/0                      C/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF T.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

Entity DP is
Port(clk, sel: in std_logic;                                     clk
       WRA,WRB,WRR: in std_logic;                                sel
       Din: in std_logic_vector(15 downto 0);                   WRA
       R: out std_logic_vector(15 downto 0) );                  WRB                                R[15:0]
End DP;                                                         WRR
Architecture beh of DP is
 begin                                                       Din[15:0]
--
end beh;

descrivere in VHDL il comportamento descritto dal seguente schematico
                                          somma[15:0]

                     MUX
    Din[15:0]
                              clk           A

                    sel      WRA
                                                            +
                                                                                         R[15:0]
                                                                               RegRis
                             clk                                   clk
                                            B
                            WRB                                   WRR

Sul fronte di discesa del clock viene memorizzato sull'uscita R il risultato della somma tra A e B quando WRR = '1'.
Sul fronte di discesa del clock viene memorizzato in A o il risultato della somma o l'ingresso Din quando WRA='1'.
Sul fronte di discesa del clock viene memorizzato in B l'ingresso Din quando WRB='1'.

## Question 4
Scrivere un programma in linguaggio Assembly MIPS che traduce il seguente programma C
(cognome.nome.s):

```c
int calcola(char *s)
{ int j,f,t;

         f=0;
         j=0;
         do {
               f=f+s[j]%10; //resto della divisione per 10
               j++;
         } while(s[j]!=48) ;

        return f;
}

main() {
  char VAL[8];
  int i,num,ris;

         printf("Inserisci il numero di stringhe da leggere \n");
         scanf("%d",&num);

          for(i=0; i<num;i++)
          {
               printf("Inserisci una stringa chiusa dal carattere 0 \n");
               scanf("%s",VAL);

                ris= calcola(VAL);

                printf(" Valore= %d \n",ris);
    }
}

```
## Question 5
Valutare il CPI di un processore pipeline con una gerarchia di memoria con cache separata istruzioni e dati
sapendo che
-fLOAD=20%
-fSTORE=20%,
-MissRateIstruzioni= 3%,
-MissRateDati= 5%,
-MissPenaltyIstruzioni= 40 cicli,
-MissPenaltyDati= 45 cicli,
-CPIexecution=1,5
-Numero di Istruzioni = 1500

## Question 6
Discutere dei control hazard nella pipeline e come possono essere risolti.
