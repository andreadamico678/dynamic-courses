# Computer Architecture - Ingegneria Informatica
**Appello del 18 settembre 2026**

**Punteggi:** $Q1+Q2=11$, $Q3=3$, $Q4+Q5=9$, $Q6=9$  
Per superare la prova è necessario ottenere un punteggio minimo pari a 18, con:
* $Q1+Q2 \ge 6$
* $Q3+Q4+Q5 \ge 7$
* $Q6 \ge 5$

**Tempo a disposizione:** 2h 30 min

---

### 1.
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta il seguente circuito a due ingressi $xy$ e una sola uscita $u$ avente la seguente specifica funzionale.

L'uscita $u$ nel generico istante vale 1 se vengono riconosciute le seguenti sequenze consecutive:
* $\{01, (00,\dots,00), 01, 00, 01\}$ oppure $\{01, (11,\dots, 11), 01, (01,\dots,01), 00\}$

Le sequenze minime sono $\{01, 00, 01, 00, 01\}$ e $\{01, 11, 01, 01, 00\}$.  
$(XY, \dots, XY)$ indica una sequenza di coppie $XY$ consecutive.  
Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.

---

### 2.
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso $x$:

| Stato | $X=0$ | $X=1$ |
| :---: | :---: | :---: |
| A | $C/0$ | $B/0$ |
| B | $F/0$ | $E/0$ |
| C | $A/0$ | $D/0$ |
| D | $B/0$ | $E/0$ |
| E | $F/0$ | $A/1$ |
| F | $D/0$ | $E/0$ |

* Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
* Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i FF SR.
* Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

---

### 3.
Valutare il $CPI$ di un processore pipeline considerando il seguente instruction mix:
* load: $20\%$
* store: $15\%$
* branch: $10\%$ (con $60\%$ di branch taken)
* ALU: $55\%$

e assumendo:
* la presenza di due memorie distinte per i dati e le istruzioni;
* di usare l'approccio *predict untaken* per la gestione dei branch;
* di rilevare l'esito del branch nella fase di execute;
* di usare il *data forwarding*;
* che per i dati si verifichino solo le seguenti dipendenze:
  a) il $30\%$ delle istruzioni ALU dipende da un'istruzione ALU precedente a distanza 1 $\{\text{ALU}(i) \rightarrow \text{ALU}(i+1)\}$
  b) il $20\%$ delle istruzioni ALU dipende da un'istruzione Load precedente a distanza 1 $\{\text{Load}(i) \rightarrow \text{ALU}(i+1)\}$
  c) il $30\%$ delle istruzioni Branch dipende da un'istruzione ALU precedente a distanza 1 $\{\text{ALU}(i) \rightarrow \text{Branch}(i+1)\}$

---

### 4.
Dopo avere calcolato le prestazioni delle cache A, B e C sulla base dei valori della seguente tabella:

| Cache | Hit time (ns) | Associatività | Miss Rate | Block size (byte) | Miss Penalty (ns) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| A | 1,09 | 1 | 3,8% | 16 | 40 |
| B | 1,16 | 2 | 3,6% | 16 | 40 |
| C | 1,23 | 4 | 3,5% | 16 | 40 |

indicare la migliore e la peggiore cache dal punto di vista delle prestazioni.

---

### 5.
Discutere della politica "write back" per la scrittura della memoria cache.  
Qual è il principale vantaggio del "write back" rispetto al "Write through"? Quale politica di Write miss viene solitamente abbinata al "write back"?

---

### 6.
Scrivere un programma nel linguaggio Assembly RISC-V che traduce il seguente programma C:  
*(Usare come nome del file il seguente formato: `cognome_nome.asm`)*

```c
main()
{
    char string[16];
    int i, risp, res;
    int num;
    printf("Quante stringhe vuoi inserire?\n");
    scanf("%d", &num);
    for(i = 0; i < num; i++) {
        printf("Inserisci una stringa con almeno 3 caratteri\n");
        scanf("%s", string);
        if (strlen(string) < 3)
        {
            printf("Vuoi terminare l'esecuzione? (Si == 1, No != 1)\n");
            scanf("%d", &risp);
            if (risp == 1)
                break;
        }
        else {
            res = process(string);
            printf("Il risultato e' %d\n", res);
        }
    }
}

int process(char *str)
{
    int s0, s1, s2;
    int ci;
    s0 = 0;
    s1 = 0;
    s2 = 1;
    while (str[s0] != 0)
    {
        ci = str[s0] - 48;
        if (ci >= 0 && ci < 10) // se e' un numero
        {
            s1 = s1 + ci * s2;
        }
        s2 = s2 * 10;
        s0++;
    }
    return s1;
}
```