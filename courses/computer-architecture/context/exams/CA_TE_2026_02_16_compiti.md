# Computer Architecture Exam - 16 February 2026

## Variant C1

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che
rappresenta il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

 L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
{00, 01, (00,.., 00), (01,.., 01), 10} o {00, (10,.., 10), 00, (01, .., 01), 00}
Le sequenze minime sono {00, 01, 00, 01,10} e {00, 10, 00, 01,00}
 (XY,.., XY) indica una sequenza di coppie XY consecutive
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                B/0                      A/0
     B                B/0                      C/0
     C                C/0                      D/0
     D                A/1                      F/0
     E                B/0                      E/0
     F                E/1                      D/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Valutare il CPI di un processore pipeline considerando il seguente instruction mix (load 14%,
store 10%, branch 16% con 50% di branch taken, ALU 60%) e assumendo
- la presenza di una sola memoria per dati e istruzioni,
- di usare la tecnica del predict untaken nella gestione dei branch,
- di rilevare l'esito del branch nella fase di execute,
- di usare il data forwarding,
- che per i dati si verifichino solo le seguenti dipendenze
          a) il 30% delle istruzioni ALU dipende da un'istruzione ALU precedente {ALU (i) -> ALU(i+1) };
          b) il 25% delle istruzioni ALU dipende da una Load precedente {Load (i) -> ALU(i+1) };
          c) il 30% delle istruzioni Load dipende da un'istruzione ALU precedente {ALU (i) -> Load (i+1) };

## Question 4
Data una memoria cache di 1024 blocchi da 64 byte e dato l'indirizzo a 32 bit generato dal processore, quanti bit
servono per l'index e per il Tag nei seguenti casi?
a) cache direct mapped
b) cache set associativa a 2 vie
c) cache set associativa a 4 vie

## Question 5
Discutere della politica write through per la scrittura della memoria cache.
   Qual è il principale vantaggio del write through rispetto al write back ?
   Quale politica di Write miss viene solitamente abbinata al write through ?

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)
```c
main() {
char buffer[32];
int i, num, minori,a1,a2;

    for(i=0; i<3;i++)
    {
      do{
          printf("\n Inserisci un numero minore di 32          ");
          scanf("%d",&num);
      } while (num>=32);

        printf("\n Inserisci una stringa con almeno %d caratteri (solo lettere maiuscole) ", num);
        scanf("%s",buffer);
        a1=strlen(buffer);
        a2=buffer[num];

        minori= calcola(buffer, a1, a2);
        printf("\n Risultato = %d ",minori);
    }
}

int calcola(char *buf,          int n, int val)
{int i,ris,t,conta;

    conta=0;
    ris=0;
    i=0;
    while(i<n)
     { t=val - buf[i];
       if(t>=1)
           {
             ris=ris+t;
             conta++;
           }
       i++;
     }
    if (conta == 0)
         return 0;
    else return ris/conta;
}

```
## Variant C2

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta
il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
{01, (00,.., 00), 01, (10,.., 10), 00} o {10, 00, (00,.., 00), (01, .., 01), 00}
Le sequenze minime sono {01, 00, 01, 10, 00} e {10, 00, 00, 01,00}
 (XY,.., XY) indica una sequenza di coppie XY consecutive
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                B/0                      E/0
     B                F/0                      C/0
     C                F/0                      A/1
     D                B/0                      C/0
     E                D/0                      A/0
     F                D/0                      C/0

-   Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-   Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
-   Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Valutare il CPI di un processore pipeline considerando il seguente instruction mix (load 18%,
store 12%, branch 15% con 40% di branch taken, ALU 55%) e assumendo
- la presenza di due memorie distinte per i dati e le istruzioni,
- di usare solo stalli nella gestione dei branch,
- di rilevare l'esito del branch nella fase di decode,
- di non usare il data forwarding,
- che per i dati si verifichino solo le seguenti dipendenze
   a) il 30% delle istruzioni ALU dipende da un'istruzione ALU precedente a distanza 1 {ALU (i) ->ALU(i+1) };
   b) il 15% delle istruzioni ALU dipende da un'istruzione ALU precedente a distanza 2 {ALU (i) ->ALU(i+2) };
   c) il 30% delle istruzioni Load dipende da un'istruzione ALU precedente a distanza 1 {ALU (i) -> Load (i+1) };

## Question 4
Data una memoria cache di 2048 blocchi da 32 byte e dato l'indirizzo a 32 bit generato dal processore, quanti bit
servono per l'index e per il Tag nei seguenti casi?
a) cache direct mapped
b) cache set associativa a 2 vie
c) cache set associativa a 4 vie

## Question 5
Discutere della politica write back per la scrittura della memoria cache.
 Qual è il principale vantaggio del write back rispetto al Write through ? Quale politica di Write miss viene
solitamente abbinata al write back ?

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)

```c
main() {
  char caratteri[16];
  int i, pos, valore, a0,a2;

     for(i=0; i<3;i++)
     {
       do{
           printf("\nInserisci una stringa di numeri \n");
           scanf("%s",caratteri);

             printf("\n Inserisci un numero minore di %d\n",strlen(caratteri));
             scanf("%d",&pos);

         } while (pos>=strlen(caratteri));

          a0=caratteri[pos];
          a2=strlen(caratteri);
          valore= calcola_valore(a0,caratteri, a2);

          printf("Il valore ottenuto e' %d",valore);
     }
}

int calcola_valore(int a0, char *car,           int dim)
{int i,maggiore,minore;

    maggiore=0;
    minore=0;

    i=dim-1;
    do {

         if(car[i]>a0)
                  maggiore++;
         elseif(car[i]<a0)
                  minore++;

         i--;
    }while(i>=0);

      if(maggiore>minore)
         return maggiore;
    else return minore;
}
```
