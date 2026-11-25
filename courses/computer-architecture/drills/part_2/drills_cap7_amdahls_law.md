#drills/computer_architectures/02_02_amdahls_law
.
Qual è l'enunciato analitico della **Legge di Amdahl** che quantifica lo speedup complessivo $S$ ottenuto velocizzando una frazione del sistema?
?
$$S = \frac{1}{(1 - f_{\text{enh}}) + \frac{f_{\text{enh}}}{s_{\text{enh}}}}$$
dove:
.
- $f_{\text{enh}} \in [0, 1]$: Frazione del tempo di esecuzione originario interessata dal potenziamento (frazione migliorabile).
- $s_{\text{enh}} > 1$: Fattore di accelerazione locale applicato a tale frazione.
- $1 - f_{\text{enh}}$: Frazione non modificata (frazione seriale o vincolata).
.
Un processore spende l'$80\%$ del tempo di esecuzione in calcoli in virgola mobile ($f_{\text{enh}} = 0.80$). Se una nuova unità FPU accelera tali calcoli di $4$ volte ($s_{\text{enh}} = 4$), qual è lo speedup complessivo del sistema?
?
Applicando la legge di Amdahl:
$$S = \frac{1}{(1 - 0.80) + \frac{0.80}{4}} = \frac{1}{0.20 + 0.20} = \frac{1}{0.40} = 2.5$$
Lo speedup complessivo è pari a $2.5\times$ (il programma viene eseguito in $2.5$ volte meno tempo, ossia con una riduzione del tempo del $60\%$).
.
Qual è il **limite teorico massimo assoluto** ($S_{\max}$) raggiungibile accelerando una frazione $f_{\text{enh}} = 0.75$ del tempo, anche rendendo l'unità potenziata infinitamente veloce ($s_{\text{enh}} \to \infty$)?
?
Facendo tendere $s_{\text{enh}} \to \infty$, il termine $\frac{f_{\text{enh}}}{s_{\text{enh}}} \to 0$:
$$S_{\max} = \frac{1}{1 - f_{\text{enh}}} = \frac{1}{1 - 0.75} = \frac{1}{0.25} = 4$$
Anche con un'accelerazione infinita sulla frazione migliorabile, il sistema non potrà **mai** essere velocizzato più di $4$ volte, a causa del collo di bottiglia rappresentato dal $25\%$ non accelerato.
.
Se una parte del codice occupa solo il $10\%$ del tempo totale ($f_{\text{enh}} = 0.10$), e un team di ingegneri spende mesi per accelerarla di $100$ volte ($s_{\text{enh}} = 100$), quale speedup complessivo si ottiene?
?
$$S = \frac{1}{(1 - 0.10) + \frac{0.10}{100}} = \frac{1}{0.90 + 0.001} = \frac{1}{0.901} \approx 1.11$$
Lo speedup totale è di appena $1.11\times$ (circa l'$11\%$ di miglioramento).
Questo illustra il principio guida dell'architettura dei calcolatori: **ottimizzare il caso comune (make the common case fast)**, non quello marginale.
.
Un'applicazione spende il $60\%$ del tempo in accessi alla memoria. Si desidera ottenere uno speedup complessivo $S = 1.5$. Quale accelerazione locale $s_{\text{enh}}$ deve garantire il nuovo sottosistema di memoria?
?
Dall'equazione di Amdahl:
$$\frac{1}{(1 - 0.60) + \frac{0.60}{s_{\text{enh}}}} = 1.5 \implies 0.40 + \frac{0.60}{s_{\text{enh}}} = \frac{1}{1.5} = \frac{2}{3} \approx 0.6667$$
Isolando il termine con $s_{\text{enh}}$:
$$\frac{0.60}{s_{\text{enh}}} = \frac{2}{3} - 0.40 = 0.6667 - 0.40 = 0.2667 = \frac{4}{15}$$
$$s_{\text{enh}} = \frac{0.60}{4/15} = 0.60 \times \frac{15}{4} = \frac{9}{4} = 2.25$$
Il sottosistema di memoria deve essere velocizzato di almeno $2.25$ volte.
