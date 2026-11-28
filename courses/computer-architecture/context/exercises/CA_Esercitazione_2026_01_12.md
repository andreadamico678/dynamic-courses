# Computer Architecture - Ingegneria Informatica
## Esercitazione del 12 gennaio 2026

---

### Esercizio 1.A
Data la funzione booleana:
$$f(a,b,c,d,e) = \sum m(4, 6, 12, 14, 15, 20) + d(7, 13, 22, 28, 29)$$
scrivere l'espressione logica minima.

---

### Esercizio 1.B
Data la funzione booleana:
$$f(a,b,c,d,e) = \sum m(0, 2, 5, 7, 20, 21) + d(4, 16, 17, 18, 23)$$
scrivere l'espressione logica minima.

---

### Esercizio 1.C
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta il seguente circuito a due ingressi $xy$ e una sola uscita $u$ avente la seguente specifica funzionale.

L'uscita $u$ nel generico istante vale $1$ se vengono riconosciute le seguenti sequenze:
$$\{00, 01, \dots, 01, 00\} \quad \text{o} \quad \{00, 10, \dots, 10, 00\}$$

Le sequenze minime riconosciute sono:
$$\{00, 01, 00\} \quad \text{e} \quad \{00, 10, 00\}$$

- Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.
- $(XY, \dots, XY)$ indica una sequenza di coppie $XY$ consecutive.

---

### Esercizio 1.D
Si realizzi il diagramma degli stati e la tabella degli stati della macchina a stati finiti (tipo Mealy) che rappresenta il seguente circuito a due ingressi $xy$ e una sola uscita $u$ avente la seguente specifica funzionale.

L'uscita $u$ nel generico istante vale $1$ se vengono riconosciute le seguenti sequenze:
$$\{10, 11, \dots, 11, 01, 01\} \quad \text{o} \quad \{10, 10, \dots, 10, 00, 00\}$$

Le sequenze minime riconosciute sono:
$$\{10, 11, 01, 01\} \quad \text{e} \quad \{10, 10, 00, 00\}$$

- Il circuito è in grado di riconoscere anche sequenze parzialmente sovrapposte oltre che disgiunte.
- $(XY, \dots, XY)$ indica una sequenza di coppie $XY$ consecutive.

---

### Esercizio 2
Data la seguente tabella degli stati relativa ad una rete sequenziale con un solo ingresso $x$:

| Stato Presente | $X = 0$ ($S^{t+1} / U$) | $X = 1$ ($S^{t+1} / U$) |
| :---: | :---: | :---: |
| **A** | B / 0 | E / 0 |
| **B** | D / 0 | C / 0 |
| **C** | F / 0 | A / 0 |
| **D** | A / 1 | B / 0 |
| **E** | F / 0 | C / 0 |
| **F** | D / 0 | E / 0 |

1. Eseguire la minimizzazione degli stati e realizzare la tabella degli stati della macchina minima equivalente.
2. Costruire la tabella delle transizioni e delle eccitazioni usando come elemento di memoria i **FF JK**.
3. Scrivere l'espressione logica minima delle funzioni booleane che rappresentano lo stato prossimo e l'uscita.

---

### Esercizio 3.A
Valutare il CPI di un processore pipeline con una gerarchia di memoria con cache separata istruzioni e dati sapendo che:
- $\text{Store Misses} = 15$
- $f_{\text{LOAD}} = 20\%$
- $\text{MissRate}_{\text{Istruzioni}} = 2{,}5\%$
- $\text{MissPenalty}_{\text{Istruzioni}} = 45\text{ cicli}$
- $\text{MissRate}_{\text{Dati}} = 4\%$
- $\text{MissPenalty}_{\text{Dati}} = 45\text{ cicli}$
- $\text{CPI}_{\text{execution}} = 1{,}5$
- $\text{Numero di Istruzioni} = 2000$

---

### Esercizio 3.B
Valutare il CPI di un processore pipeline considerando il seguente instruction mix:
- $\text{Load } 15\%$
- $\text{Store } 15\%$
- $\text{Branch } 20\%$ (con $45\%$ di branch taken)
- $\text{ALU } 50\%$

Assumendo:
- La presenza di una sola memoria per i dati e le istruzioni.
- Di usare il **data forwarding**.
- Di usare la tecnica del **predict untaken** nella gestione dei branch.
- Di rilevare l'esito del branch nella fase di **decode (ID)**.
- Che il $30\%$ delle istruzioni ALU e delle Load sono seguite da un'istruzione ALU che da essa dipende.
- Che il $10\%$ delle istruzioni ALU sono seguite da un'istruzione branch che da essa dipende.

---

### Esercizio 4
Scrivere un programma nel linguaggio **Assembly RISC-V** che traduce il seguente programma C:
*(Usare come nome del file il seguente formato: `cognome_nome.asm`)*

```c
main() {
    char stringa[16];
    int i, res, num;

    printf("Quante volte vuoi eseguire il ciclo? Inserisci il numero\n");
    scanf("%d", &num);

    for (i = 0; i < num; i++) {
        do {
            printf("Inserisci una stringa con almeno 2 numeri\n");
            scanf("%s", stringa);
            res = calcola(stringa, strlen(stringa));
            if (res < 0)
                printf("Pochi numeri\n");
        } while (res < 0);

        printf("%d ) Risultato = %d\n", i, res);
    }
}

int calcola(char *s, int n) {
    int j, ris, numeri;
    // Questa funzione calcola il prodotto di numeri presenti nella stringa modulo 1024
    numeri = 0;
    ris = 1;

    for (j = 0; j < n; j++) {
        if (s[j] < 48)
            continue;
        else if (s[j] >= 58)
            continue;
        else {
            numeri++;
            ris = (ris * (s[j] - 48)) % 1024;
        }
    }

    if (numeri < 2)
        ris = -1;

    return ris;
}
```
