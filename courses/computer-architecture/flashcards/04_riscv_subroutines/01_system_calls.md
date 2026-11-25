#flashcards/computer-architecture/04_01_system_calls

In quale registro va caricato il codice del servizio richiesto prima di eseguire `ecall` in RARS?
?
Nel registro `a7` (`x17`).

---

Qual è il codice `ecall` in `a7` per stampare un intero con segno (`PrintInt`) e in quale registro si passa il valore?
?
Servizio `1` (`li a7, 1`), con l'intero a 32 bit in `a0`.

---

Qual è il codice `ecall` in `a7` per stampare una stringa null-terminata (`PrintString`) e cosa deve contenere `a0`?
?
Servizio `4` (`li a7, 4`), con l'indirizzo base della stringa caricato in `a0` (es. `la a0, label` o `addi a0, sp, offset`).

---

Qual è il codice `ecall` in `a7` per leggere un intero da tastiera (`ReadInt`) e dove viene restituito il risultato?
?
Servizio `5` (`li a7, 5`); l'intero letto viene restituito in `a0` e va subito copiato (`mv s0, a0`) prima della successiva syscall.

---

Quali argomenti richiede il servizio `ecall` `8` (`ReadString`) e quanti caratteri utente legge al massimo?
?
`a0` = indirizzo base del buffer, `a1` = capacità in byte del buffer; legge al massimo `a1 - 1` caratteri aggiungendo sempre il terminatore `'\0'` (e conservando `'\n'` se Invio è premuto prima del limite).

---

Qual è il codice `ecall` in `a7` per stampare un singolo carattere ASCII (`PrintChar`, es. `'\n'` = `10`)?
?
Servizio `11` (`li a0, 10` seguito da `li a7, 11` ed `ecall`).

---

Qual è la sequenza obbligatoria alla fine di `main` per terminare il programma (`Exit`) senza cadere nelle subroutine sottostanti?
?
`li a7, 10` seguito da `ecall`.

---

Qual è la differenza tra le direttive `.asciz` (o `.string`), `.word` e `.space N` nella sezione `.data`?
?
`.asciz` alloca una stringa ASCII aggiungendo automaticamente il byte `0x00`; `.word` alloca interi a 32 bit allineati alla parola; `.space N` riserva $N$ byte non inizializzati.

---

Perché per passare un'etichetta di `.data` a `PrintString` bisogna usare `la a0, msg` e mai `lw a0, msg`?
?
`la` carica in `a0` l'indirizzo di memoria a 32 bit dell'etichetta (`&msg`), mentre `lw` caricherebbe i primi 4 byte ASCII della stringa come indirizzo errato.
