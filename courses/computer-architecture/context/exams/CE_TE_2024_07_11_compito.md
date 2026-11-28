# Computer Architecture Exam - 11 July 2024

                                                     Appello dell'11 luglio 2024

**Scoring:** Q1+Q2=8, Q3=5, Q4=9, Q5=3, Q6=7.
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2>= 5, Q4>=5, Q5+Q6 >=6

Per consegnare i sorgenti relativi ai quesiti VHDL e Assembly è necessario creare e inviare una cartella compressa
contenente i sorgenti tramite studium. Usare come identificativo della cartella cognome_nome

**Duration:** 2h 30 min

## Question 1
Data la funzione booleana f(a,b,c,d,e)= Σ(0, 4, 8, 9, 16, 20, 21, 24, 25) scrivere l'espressione logica minima
   utilizzando il metodo di Quine-McCluskey.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   Stato              x=0                      x=1
    A                 C/0                      E/0
     B                C/0                      D/0
     C                A/0                      B/0
    D                 B/0                      A/1
     E                A/0                      F/0
     F                E/0                      A/1

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Data l'entity

```vhdl
Entity CU is
Port(clk : in std_logic;                                             clk
       ready, err, X: in std_logic;                              ready='0'
        C: in integer range 0 to 2;                                   C
                                                                 ready='0'
        stato: out std_logic_vector(2 downto 0) );                  ready                           stato[2:0]
End CU;                                                                                            ready='0'
Architecture beh of CU is                                             err
 begin                                                                X
--
end beh;
```

descrivere in VHDL il comportamento descritto dal seguente diagramma degli stati
                                                                C<2
       ready='0'
                   ready='1'
                                                                  100-
                                                                             C=2
        000-                  001-                    010-
                                       X='1', err='0'
                                                                                   000-

                    err='1'
                                 X='0', err='0'
                                                  011-

Le variazioni di stato avvengono sul fronte di salita del clock.

## Question 4
Scrivere un programma nel linguaggio Assembly del processore MIPS che traduce il seguente programma C
(Usare come nome del file cognome.nome.s):

```c
int controlla(char *st, int d)
{int i,speciale,numero;

    speciale=0;
    numero=0;

    for(i=0;i<d;i++)
      { if(st[i]==35 || st[i]==36)
              speciale=1;
             else
                  if(st[i]>47 && st[i]<=57)
                        numero=1;
       }

    return numero+speciale;
}

main() {
  char STRINGA[16];
  int i, len,ris;

       for(i=0; i<3;)
       {
         printf("Inserisci una Password con almeno 8 caratteri contenente \n");
         printf("almeno un numero e un carattere tra # e $ \n");
         scanf("%s",STRINGA);
         len=strlen(STRINGA);
         if(len>=8)
         {
           ris= controlla(STRINGA,len);
           if(ris<2)
                   printf("Password %d-esima non corretta\n",i);
           else i++;
         }
       }
}

```
## Question 5
Valutare CPI di un processore pipeline considerando il seguente instruction mix (load 20%, store 15%, branch
20% con 45% di branch taken, ALU 45%) e assumendo
-la presenza di due memorie distinte per i dati e le istruzioni,
-di non usare il data forwarding,
-di usare solo gli stalli per la gestione dei branch,
-di rilevare l'esito del branch nella fase di memory access,
- che il 30% delle load sono seguite da un'istruzione ALU che da essa dipende
- che il 30% delle istruzioni ALU sono seguite da un'istruzione ALU che da essa dipende,
- che in tutti gli altri casi non vi sia una dipendenza dati.

## Question 6
Discutere delle politiche di block placement della memoria cache e di come tali politiche influenzano il miss
rate e l'hit time.
