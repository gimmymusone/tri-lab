/* ============================================================
   TRI LAB — Contenuti dei servizi degli Hub (fonte unica).
   Ogni servizio è una pagina: servizio.html?s=<id>.
   Per modificare un testo: cambia qui, in un solo posto.
   Blocchi: {h:'Titolo', p:`testo`}  oppure  {h, html:`markup`}.
   ============================================================ */
window.HUB_META = {
  creative:  { num: '01', name: 'Creative Hub',  accent: 'var(--volt)',   page: 'creative-hub.html' },
  business:  { num: '02', name: 'Business Hub',  accent: 'var(--navy)',   page: 'business-hub.html' },
  operation: { num: '03', name: 'Operation Hub', accent: 'var(--signal)', page: 'operation-hub.html' }
};

window.HUB_SERVICES = {

  /* ---------------- BUSINESS ---------------- */
  'biz-1': { hub: 'business', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Pianificazione Strategica & Organization',
    blocks: [
      { h: "Cos'è", p: `Un documento che fissa dove vuole andare l'azienda nei prossimi 5-10 anni (obiettivi, priorità, scelte di fondo) e verifica se l'azienda ha davvero i mezzi per arrivarci: le persone giuste, la tecnologia adatta, le competenze necessarie, un piano per gestire i rischi.` },
      { h: 'Come funziona', p: `Si definiscono obiettivo finale e priorità di lungo periodo, poi si controllano cinque elementi che devono reggerli: le persone e l'organizzazione, la tecnologia, le competenze (know-how), la gestione del rischio, e la direzione stessa. La crescita delle persone chiave in azienda entra qui come parte del lavoro, non come servizio a parte.` },
      { h: 'Perché serve', p: `Molte aziende decidono dove vogliono andare senza controllare se hanno davvero i mezzi per arrivarci. Questo lavoro mette le due cose a confronto prima di partire, così le scelte successive (assunzioni, investimenti, marketing) hanno una direzione comune invece di essere improvvisate una per una.` },
      { h: 'Per chi è', p: `Imprenditori davanti a una decisione di lungo periodo (nuova linea di business, espansione, cambio di modello) che vogliono un quadro solido prima di muoversi.` }
    ],
    callout: { to: 'biz-5', label: 'Incluso e assemblato nel Business Planning Completo' } },

  'biz-2': { hub: 'business', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Analisi di Mercato & Posizionamento',
    blocks: [
      { h: "Cos'è", p: `Uno studio che ti fa capire il mercato in cui operi in modo completo: quanto vale, chi sono davvero i tuoi clienti e cosa cercano, quali concorrenti e quali dinamiche esterne condizionano il tuo settore, e infine dove ti collochi tu rispetto a tutto questo. Non è solo "conviene competere qui o no": è capire a fondo clienti, contesto e concorrenza.` },
      { h: 'Come funziona', p: `Prima si guarda fuori. Si definisce il business su tre assi (chi sono i tuoi clienti, quali bisogni soddisfi, con quali soluzioni), si misura quanto vale il mercato, si mappano i concorrenti e le forze che rendono il settore più o meno favorevole, si controllano i vincoli esterni (normative, economia, tecnologia). Poi si guarda dentro l'azienda: l'equilibrio economico e finanziario di oggi, come si crea valore lungo i tuoi processi, il modello di business attuale. Le due letture si incrociano in un quadro finale (punti di forza, debolezze, opportunità e minacce) che dice dove ti posizioni rispetto ai concorrenti e quali strategie hai davvero a disposizione.` },
      { h: 'Perché serve', p: `Ti serve per tre cose insieme: capire se conviene competere in un mercato, capire davvero chi sono i tuoi clienti e cosa cercano, e capire il contesto (economico, normativo, competitivo) in cui ti muovi. Sapere solo "com'è il mercato" o "come sono fatto io" separatamente non basta a decidere niente: il valore è unire tutto in una direzione operativa.` },
      { h: 'Per chi è', p: `Chi deve decidere se entrare in un mercato, riposizionarsi, capire meglio i propri clienti, o capire perché la crescita si è fermata.` }
    ],
    callout: { to: 'biz-5', label: 'Incluso e assemblato nel Business Planning Completo' } },

  'biz-3': { hub: 'business', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Business Model Design',
    blocks: [
      { h: "Cos'è", p: `Il ridisegno di come la tua azienda crea valore, lo consegna al cliente e guadagna. Non riguarda solo cosa vendi e a che prezzo: riguarda anche quali attività tieni in casa e quali affidi a partner esterni, e a chi ti rivolgi per farlo.` },
      { h: 'Come funziona', p: `Si ridefinisce la proposta di valore (cosa offri ai clienti e perché dovrebbero scegliere te), poi si ricostruisce tutto il resto intorno a questa proposta: come vendi, a chi ti rivolgi, con quali costi e ricavi, e soprattutto quali parti della filiera conviene tenere internamente e quali affidare a fornitori, distributori o produttori terzi. Qualche esempio di innovazione di modello: un'azienda che passa dalla vendita di un prodotto a un abbonamento ricorrente, oppure che smette di produrre internamente e si concentra su marchio e distribuzione, affidando la produzione a un partner esterno.` },
      { h: 'Perché serve', p: `Quando il mercato cambia, o scopri qualcosa di nuovo sulla tua azienda, spesso non basta aggiustare il prezzo o il prodotto: serve ripensare anche chi fa cosa lungo la filiera, cosa conviene tenere in casa e cosa no. Qui il cambiamento diventa un progetto con una logica precisa, non un adattamento fatto per tentativi.` },
      { h: 'Per chi è', p: `Aziende che sentono di dover cambiare non solo cosa vendono, ma come lavorano e con chi.` }
    ],
    callout: { to: 'biz-5', label: 'Incluso e assemblato nel Business Planning Completo' } },

  'biz-4': { hub: 'business', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Piano Economico-Finanziario',
    blocks: [
      { h: "Cos'è", p: `Non è una sfera di cristallo che indovina il futuro, è la programmazione di obiettivi economici raggiungibili, costruita prevedendo più scenari possibili (ottimistico, intermedio, prudente) e un piano d'azione concreto per ciascuno di essi.` },
      { h: 'Come funziona', p: `Si costruiscono le proiezioni economiche (ricavi e costi), patrimoniali (cosa possiede e cosa deve l'azienda) e finanziarie (i flussi di cassa) per gli anni a venire, non come un'unica previsione fissa ma come più ipotesi alternative, ciascuna con la propria linea d'azione. Si verifica se l'investimento richiesto regge in ognuna di queste ipotesi, e si valutano gli impatti ambientali e sociali quando rilevanti.` },
      { h: 'Perché serve', p: `Una strategia senza numeri resta un'idea, ma i numeri utili non sono una previsione unica e certa: sono una gamma di scenari realistici, ciascuno con un piano pronto. Questo passaggio dice se il piano regge, quanto capitale serve, e cosa fare se le cose vanno meglio o peggio del previsto.` },
      { h: 'Per chi è', p: `Chi deve presentare il piano a un socio, una banca, un investitore, o vuole solo sapere se regge prima di eseguirlo.` }
    ],
    callout: { to: 'biz-5', label: 'Incluso e assemblato nel Business Planning Completo' } },

  'biz-5': { hub: 'business', kind: 'Bundle flagship · Percorso completo', kindClass: 't-flagship',
    title: 'Business Planning Completo',
    blocks: [
      { h: "Cos'è", p: `Non un documento che finisce in un cassetto, ma un processo vivo che guida le decisioni e la crescita dell'azienda nel tempo. Mette insieme la pianificazione strategica, l'analisi di mercato e posizionamento, il ridisegno del modello di business e il piano economico-finanziario in un unico percorso coerente, più un piano d'azione concreto su marketing, operatività e finanza.` },
      { h: 'Come funziona', p: `Lo stesso percorso dei quattro servizi, condotto come un unico lavoro continuo invece che come commesse separate. Il risultato è un piano che si aggiorna ogni anno, con un orizzonte operativo di 1 anno dentro una cornice a 4 anni, e che si corregge quando la realtà si discosta dalle previsioni.` },
      { h: 'Perché serve', p: `Un piano fatto così ti dà, insieme: un documento professionale da mostrare a investitori, un accesso più facile a finanziamenti bancari (perché dimostri di sapere dove vai e con quali numeri), chiarezza nella direzione strategica condivisa con soci e collaboratori, metriche concrete per misurare il progresso invece che sensazioni, e una base solida per ogni decisione futura, invece di ripartire da zero ogni volta.` },
      { h: 'Per chi è', p: `Chi deve presentare o eseguire un piano organico, a un board, a investitori, o a se stesso come guida per i prossimi anni.` }
    ],
    note: 'Assembla e potenzia questi quattro servizi:',
    components: [
      { to: 'biz-1', t: 'Pianificazione Strategica & Organization', d: `Dove va l'azienda a 5-10 anni e se ha i mezzi per arrivarci.` },
      { to: 'biz-2', t: 'Analisi di Mercato & Posizionamento', d: `Clienti, contesto e concorrenza, e dove ti collochi tu.` },
      { to: 'biz-3', t: 'Business Model Design', d: `Come crei valore, cosa tieni in casa e cosa affidi fuori.` },
      { to: 'biz-4', t: 'Piano Economico-Finanziario', d: `Più scenari con numeri e piano d'azione per ciascuno.` }
    ] },

  'biz-6': { hub: 'business', kind: 'Servizio continuativo', kindClass: 't-continuativo',
    title: 'Piano di Marketing',
    blocks: [
      { h: "Cos'è", p: `La costruzione e gestione, mese dopo mese, di come la tua azienda si fa conoscere e vende attraverso il marketing.` },
      { h: 'Come funziona', p: `Si individua a chi ti rivolgi e come vuoi essere percepito, si costruisce il marketing mix (prodotto, prezzo, distribuzione, comunicazione), e si ripete un ciclo continuo: analisi della situazione, strategia, azioni concrete, verifica dei risultati economici, correzioni.` },
      { h: 'Perché serve', p: `Il marketing funziona quando si corregge sui risultati, non quando è una campagna isolata lanciata una volta sola. Questo servizio costruisce quel ciclo e lo mantiene attivo nel tempo.` },
      { h: 'Per chi è', p: `Aziende che investono in marketing senza un piano strutturato, o che vogliono smettere di fare campagne a spot.` }
    ] },

  'biz-7': { hub: 'business', kind: 'Servizio continuativo', kindClass: 't-continuativo',
    title: 'Business Development',
    blocks: [
      { h: "Cos'è", p: `La costruzione di un sistema, non solo di singole vendite, per trovare, gestire e far crescere i clienti nel tempo.` },
      { h: 'Come funziona', p: `Si costruisce o rafforza la rete commerciale, si definisce come seguire i clienti più importanti, si disegna il processo di vendita passo per passo, e se serve impostiamo per te il sistema di prospezione di nuovi contatti, gestito da noi o passato al tuo team.` },
      { h: 'Perché serve', p: `Avere un buon prodotto senza un sistema per trovare e convertire clienti in modo ripetibile è il problema più comune nelle piccole e medie aziende. Questo servizio costruisce il sistema, non solo il risultato di una singola campagna.` },
      { h: 'Per chi è', p: `Aziende senza una funzione commerciale strutturata, o che vogliono smettere di dipendere solo dal passaparola.` }
    ] },

  'biz-8': { hub: 'business', kind: 'Pacchetto continuativo', kindClass: 't-continuativo',
    title: 'Contabilità Manageriale',
    intro: `Due servizi che lavorano insieme per darti il controllo economico dell'azienda: uno pianifica in anticipo e verifica strada facendo, l'altro spiega da dove vengono davvero i costi.`,
    subs: [
      { h: 'Budgeting', blocks: [
        { h: "Cos'è", p: `Il sistema di budget della tua azienda (quanto prevedi di vendere, produrre, spendere e incassare), costruito e tenuto sotto controllo nel tempo, confrontando ogni periodo quanto previsto con quanto realmente accaduto.` },
        { h: 'Come funziona', p: `Si costruisce il master budget e i budget di dettaglio (vendite, produzione, acquisti, personale, costi indiretti, budget economico e finanziario). Il confronto periodico tra previsto e reale, con indicatori chiari e responsabilità assegnate per ogni area, è parte integrante del servizio: è quello che lo rende un accompagnamento continuo, e non un documento consegnato una volta sola.` },
        { h: 'Perché serve', p: `Un budget che nessuno controlla più dopo averlo scritto è carta sprecata. Qui il budget resta vivo: si aggiorna, si confronta con i risultati reali, e si corregge la rotta quando serve, invece di scoprire lo scostamento quando è troppo tardi.` },
        { h: 'Per chi è', p: `Aziende che pianificano a sensazione, o che hanno già un budget ma nessuno che lo confronta davvero con i risultati.` }
      ] },
      { h: 'Gestione dei Costi', blocks: [
        { h: "Cos'è", p: `Un'analisi che ti dice quante risorse assorbe davvero ogni prodotto o servizio che vendi, dal momento in cui lo produci o lo acquisti fino al momento in cui lo vendi. Non riguarda solo chi produce: vale anche per chi acquista e rivende, perché anche lì ci sono costi nascosti lungo il percorso (magazzino, gestione, logistica, tempo del personale).` },
        { h: 'Come funziona', p: `Si usa un metodo di calcolo dei costi basato sulle attività, che assegna i costi indiretti (affitti, personale di supporto, magazzino, logistica) alle singole attività che li generano, invece di spalmarli in modo generico su tutti i prodotti. Il risultato è un costo reale per ogni prodotto o servizio, lungo tutto il suo percorso in azienda.` },
        { h: 'Perché serve', p: `Molte aziende non sanno quali prodotti o servizi guadagnano davvero e quali, di fatto, ci rimettono, perché guardano solo il prezzo di acquisto o produzione e non tutte le risorse assorbite nel mezzo. Questa analisi rende visibile quante risorse sta effettivamente assorbendo ogni prodotto che vendi, dall'inizio alla fine, ed è la base per decidere i prezzi, tagliare ciò che non conviene, o investire dove rende di più.` },
        { h: 'Per chi è', p: `Aziende, produttrici o rivenditrici, con più linee di prodotto o servizio che vogliono sapere quali sono davvero profittevoli.` }
      ] }
    ] },

  /* ---------------- OPERATION ---------------- */
  'op-1': { hub: 'operation', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Gestionali di Magazzino',
    blocks: [
      { h: "Cos'è", p: `Un software, costruito su misura, che tiene sotto controllo tutto quello che entra ed esce dal tuo magazzino (scorte, movimentazioni, riordini), senza più fogli Excel paralleli o conteggi a mano.` },
      { h: 'Come funziona', p: `Si progetta e sviluppa il sistema intorno ai processi reali del tuo magazzino, non il contrario.` },
      { h: 'Perché serve', p: `I software standard costringono l'azienda ad adattarsi a loro. Qui è il contrario: meno errori, meno tempo perso a inseguire i numeri.` },
      { h: 'Per chi è', p: `Aziende con magazzino fisico che oggi gestiscono le scorte a mano o con strumenti che non reggono la loro complessità.` }
    ] },

  'op-2': { hub: 'operation', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'CRM',
    blocks: [
      { h: "Cos'è", p: `Un sistema, costruito su misura, che tiene traccia di ogni contatto commerciale (chi è, a che punto è la trattativa, cosa gli hai promesso), così nessun contatto si perde per dimenticanza.` },
      { h: 'Come funziona', p: `Si progetta il sistema intorno al tuo processo di vendita reale, non uno strumento generico adattato alla meglio.` },
      { h: 'Perché serve', p: `Senza un sistema dedicato, i contatti si perdono perché nessuno li ricontatta in tempo, o l'azienda usa strumenti troppo rigidi rispetto al proprio modo di vendere.` },
      { h: 'Per chi è', p: `Aziende che oggi gestiscono i contatti su Excel, email sparse o strumenti troppo rigidi.` }
    ],
    callout: { to: 'op-6', label: 'Componente potenziata, in versione che si aggiorna da sola, del Full Organization Stack' } },

  'op-3': { hub: 'operation', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Reportistica Automatica',
    blocks: [
      { h: "Cos'è", p: `Dashboard e report che si aggiornano da soli, collegati ai dati veri dell'azienda, niente più ore perse ogni mese a copiare numeri a mano.` },
      { h: 'Come funziona', p: `Colleghiamo la reportistica alle fonti dati reali (vendite, magazzino, contabilità), così i numeri si aggiornano automaticamente invece di essere ricostruiti ogni volta.` },
      { h: 'Perché serve', p: `Elimina il lavoro manuale ricorrente e il rischio di errori di trascrizione o dati vecchi nelle decisioni importanti.` },
      { h: 'Per chi è', p: `Aziende dove i report esistono già ma richiedono lavoro manuale ogni volta che servono.` }
    ],
    callout: { to: 'op-6', label: 'Componente potenziata, con indicatori finanziari in tempo reale, del Full Organization Stack' } },

  'op-4': { hub: 'operation', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Automazioni Agentiche di Processo',
    blocks: [
      { h: "Cos'è", p: `Automazioni su misura, costruite con l'intelligenza artificiale, per i processi ripetitivi specifici della tua azienda, quelli che non rientrano in magazzino, CRM o reportistica.` },
      { h: 'Come funziona', p: `Alcuni esempi concreti: un assistente che aggiorna da solo il menu sul sito, un sistema che legge e risponde automaticamente alle email in arrivo, un agente che controlla gli spazi liberi in calendario e gestisce le prenotazioni.` },
      { h: 'Perché serve', p: `Ogni azienda ha 2-3 attività ripetitive che non giustificano un software dedicato ma consumano ore ogni settimana. Le automatizziamo una per una.` },
      { h: 'Per chi è', p: `Aziende con processi ripetitivi identificabili (prenotazioni, risposta email, aggiornamento contenuti) ancora gestiti a mano.` }
    ],
    callout: { to: 'op-6', label: 'Componente potenziata, con valutazione automatica dei nuovi contatti in arrivo, del Full Organization Stack' } },

  'op-5': { hub: 'operation', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Company Brain',
    blocks: [
      { h: "Cos'è", p: `Un archivio unico, consultabile in chat, di tutto quello che l'azienda sa (procedure, documenti, decisioni passate), così non serve più chiedere solo a chi se lo ricorda.` },
      { h: 'Come funziona', p: `Organizziamo la conoscenza aziendale in una struttura accessibile via Claude e interrogabile in linguaggio naturale, lo stesso sistema che usiamo su noi stessi in TRI-LAB.` },
      { h: 'Perché serve', p: `La conoscenza aziendale spesso vive nella testa di poche persone o è sparsa in decine di file. Qui diventa consultabile da chiunque in azienda, e l'azienda dipende meno da singole persone.` },
      { h: 'Per chi è', p: `Aziende in crescita dove solo il fondatore (o pochi altri) sa dove sono le cose, o che vogliono inserire nuove risorse più in fretta.` }
    ],
    callout: { to: 'op-6', label: 'Componente del Full Organization Stack, invariata: è già il cuore del sistema' } },

  'op-6': { hub: 'operation', kind: 'Bundle flagship · Consigliato', kindClass: 't-flagship',
    title: 'Full Organization Stack',
    blocks: [
      { h: "Cos'è", p: `Il CRM, la reportistica automatica, le automazioni di processo e il Company Brain, uniti e potenziati in un unico sistema che lavora per l'azienda ogni giorno, senza bisogno di intervento costante.` },
      { h: 'Come funziona', html: `<p>Quattro pezzi che si parlano tra loro:</p>
        <p><b>Company Brain (Claude):</b> l'archivio di conoscenza aziendale, consultabile in chat.</p>
        <p><b>Dashboard Manageriale (Notion):</b> indicatori finanziari e stato dei progetti aggiornati in tempo reale.</p>
        <p><b>Agenti AI Autonomi (Claude × Hermes):</b> eseguono compiti complessi da soli e valutano in autonomia i nuovi contatti in arrivo.</p>
        <p><b>CRM Evoluto Auto-popolante (n8n):</b> si aggiorna da solo leggendo chiamate, email e messaggi, e assegna i compiti di conseguenza.</p>` },
      { h: 'Perché serve', p: `È la differenza tra comprare 4 strumenti che non si parlano tra loro e ricevere un sistema unico coordinato. Pensato per chi non vuole solo la consulenza ma l'autonomia: trasferiamo i nostri metodi e i nostri strumenti di lavoro, non solo il lavoro già fatto.` },
      { h: 'Per chi è', p: `Aziende che vogliono smettere di dipendere da consulenti esterni per far girare i propri processi quotidiani, e costruire capacità stabile all'interno.` }
    ],
    note: 'Potenzia questi moduli, attivabili anche singolarmente:',
    components: [
      { to: 'op-5', t: 'Company Brain', d: `L'archivio di conoscenza aziendale, consultabile in chat.` },
      { to: 'op-3', t: 'Reportistica Automatica', d: `Diventa la Dashboard Manageriale con indicatori in tempo reale.` },
      { to: 'op-4', t: 'Automazioni Agentiche di Processo', d: `Diventano gli Agenti AI Autonomi che valutano i contatti.` },
      { to: 'op-2', t: 'CRM', d: `Diventa il CRM Evoluto che si popola da solo.` }
    ] },

  /* ---------------- CREATIVE ---------------- */
  'cre-1': { hub: 'creative', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Siti Web',
    blocks: [
      { h: "Cos'è", p: `Un sito internet animato e piacevole da navigare, non una vetrina statica, progettato per due obiettivi precisi: farti conoscere e trasformare chi lo visita in un contatto o un cliente.` },
      { h: 'Come funziona', p: `Ogni scelta (contenuti, percorso di navigazione, animazioni) è pensata per portare il visitatore verso un'azione concreta: chiedere un preventivo, lasciare un contatto, comprare.` },
      { h: 'Perché serve', p: `Un sito che piace ma non converte è un costo, non un investimento. Qui ogni scelta serve a un obiettivo misurabile.` },
      { h: 'Per chi è', p: `Aziende con un sito vecchio o generico, o che semplicemente non genera contatti.` }
    ],
    callout: { to: 'cre-3', label: 'Da monitorare e correggere nel tempo con Performance & Interpretazione' } },

  'cre-2': { hub: 'creative', kind: 'Deliverable puntuale', kindClass: 't-deliverable',
    title: 'Video Ads',
    blocks: [
      { h: "Cos'è", p: `Video pensati per le campagne pubblicitarie sui social, costruiti per farsi notare nei primi secondi e spingere all'azione, non solo per essere belli da vedere.` },
      { h: 'Come funziona', p: `Produciamo immagini e video con strumenti di intelligenza artificiale (Higgsfield), il che permette di realizzare più contenuti, più in fretta e a un costo più basso rispetto a una produzione tradizionale, mantenendo la stessa attenzione al risultato dei siti web.` },
      { h: 'Perché serve', p: `Presenza social costante senza dover aspettare settimane o pagare una produzione da agenzia tradizionale.` },
      { h: 'Per chi è', p: `Aziende che vogliono essere presenti sui social in modo continuo, senza un team creativo interno o un budget da agenzia.` }
    ],
    callout: { to: 'cre-3', label: 'Da monitorare e correggere nel tempo con Performance & Interpretazione' } },

  'cre-3': { hub: 'creative', kind: 'Servizio continuativo', kindClass: 't-continuativo',
    title: 'Performance & Interpretazione',
    blocks: [
      { h: "Cos'è", p: `Un controllo periodico di come sta andando davvero il tuo sito o le tue campagne: non solo numeri, ma indicazioni concrete su cosa cambiare per migliorare i risultati.` },
      { h: 'Come funziona', p: `Analizziamo periodicamente quanto il sito o le campagne ti fanno conoscere e quanti contatti generano, e ti diciamo cosa correggere (un titolo, un'immagine, un percorso di navigazione), invece di limitarci a mostrarti un report di numeri.` },
      { h: 'Perché serve', p: `Un sito o una campagna lanciati e mai più guardati perdono efficacia nel tempo. Questo servizio chiude il cerchio tra creatività e risultato: si corregge, non si osserva soltanto.` },
      { h: 'Per chi è', p: `Chi ha già, o sta per avere, un sito o delle campagne video con noi e vuole che continuino a funzionare nel tempo.` }
    ],
    note: 'Naturale prosecuzione dopo un sito o delle campagne video realizzati con noi.' }

};
