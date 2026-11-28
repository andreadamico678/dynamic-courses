# Computer Architecture Exam - 25 June 2026

                                               Appello del 25 giugno 2026

**Scoring:** Q1+Q2=11, Q3=3, Q4+Q5=9, Q6=9
**Passing requirements:** è necessario ottenere un punteggio minimo pari a 18, con Q1+Q2 >= 6, Q3+Q4+Q5>= 7, Q6 >=5

**Duration:** 2h 30 min

## Question 1
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che
rappresenta il seguente circuito a due ingressi xy e una sola uscita u avente la seguente specifica funzionale.

 L'uscita u nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
{00, 00, (00,.., 00), (01,.., 01), 10} o {00, 01, (00,.., 00), 00, 01}
Le sequenze minime sono {00, 00, 00, 01,10} e {00, 01, 00, 00,01}
 (XY,.., XY) indica una sequenza di coppie XY consecutive
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

## Question 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso x:
   stato             X=0                       X=1
     A                A/0                      D/0
     B                E/0                      C/0
     C                F/0                      B/0
     D                E/0                      F/0
     E                B/0                      A/1
     F                C/0                      D/0

-       Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
-       Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF JK.
-       Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

## Question 3
Valutare il CPI di un processore pipeline considerando il seguente instruction mix
 (load 16%, store 12%, branch 12% con 50% di branch taken, ALU 60%)
e assumendo
- la presenza di una sola memoria per dati e istruzioni,
- di usare la tecnica del predict untaken nella gestione dei branch,
- di rilevare l'esito del branch nella fase di memory access,
- di usare il data forwarding,
- che per i dati si verifichino solo le seguenti dipendenze
          a) il 30% delle istruzioni ALU dipende da un'istruzione ALU precedente {ALU (i) -> ALU(i+1) };
          b) il 35% delle istruzioni ALU dipende da una Load precedente {Load (i) -> ALU(i+1) };
          b) il 50% delle istruzioni Branch dipende da un'istruzione ALU precedente {ALU (i) -> Branch (i+1) };

## Question 4
Date le seguenti memorie cache

    Cache       Cache size        Hit time      Associatività      Miss Rate        Block size       Miss Penalty
                  (KB)              (ns)                                              (byte)             (ns)
    A               8                 1               1               5%                16                40
    B               8              1,05               2              4,7%               32                42
    C               8                1,1              4              4,5%               32                42

Individuare l'indice prestazionale da usare per valutare le prestazioni delle cache, valutare le prestazioni delle 3
cache rispetto a tale indice e formulare una graduatoria.

## Question 5
Per la gestione dei data hazard oltre a utilizzare il data forwarding, quali altre soluzioni possiamo usare?
Esiste una soluzione a costo zero dal punto di vista dei componenti hardware? Se si, mostrare un esempio di
utilizzo di tale soluzione.

## Question 6
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:
   (Usare come nome del file il seguente formato: cognome_nome.asm)

```c
main() {
  char lettere[16];
  int i, num, val;

    for(i=0; i<3;i++)
       {
          printf("\n Inserisci una stringa con almeno 4 lettere maiuscole\n ");
          scanf("%s",lettere);
          if(strlen(lettere) >= 4)
            {
               printf("Inserisci un numero naturale minore di 25\n");
               scanf("%d",&num);
                if(num<26)
                 {
                      val= esegui_calcolo(num, lettere);
                      printf("Valore= %d\n",val);
                 }
                else printf("Errore\n");
             }
          else     printf("Errore\n");
       }

}

int esegui_calcolo(int nu, char *let)
{int i,ris,t,conta;

 conta=0;
 i=0;
 do {
      t=let[i];
      if(t-65>=nu-1 && t-65<nu+2)
       conta++;
      i++;
 }while(t!=0);

 return conta;
}
```
