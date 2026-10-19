/* Assistente AI di 3-LAB: guida il visitatore tra i servizi, lo indirizza nel sito e lo porta alla call conoscitiva.
   Parla con il Worker worker-chat (Gemini). La chiave Gemini NON sta qui: sta nei secret del Worker. */
(function(){
  var me=document.currentScript,SRC=(me&&me.src)||'',BASE=SRC.replace(/chat\.js.*$/,''),ROOT=BASE.replace(/assets\/$/,'');
  var URL_CHAT=(me&&me.getAttribute('data-url'))||'https://chat.3-lab.it/chat';
  var l=document.createElement('link');l.rel='stylesheet';l.href=BASE+'chat.css';document.head.appendChild(l);
  if(!document.querySelector('link[href*="family=Inter"]')){var f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';document.head.appendChild(f)}
  var IC={chat:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5c4.7 0 8.5 3.3 8.5 7.6s-3.8 7.6-8.5 7.6c-1 0-2-.15-2.9-.45L4.6 20.5l1.2-3.7C4.5 15.4 3.5 13.4 3.5 11.1 3.5 6.8 7.3 3.5 12 3.5z" fill="currentColor"/><path d="M12 7.2l1.15 3.05 3.05 1.15-3.05 1.15L12 15.6l-1.15-3.05L7.8 11.4l3.05-1.15L12 7.2z" fill="#171717"/></svg>',
    cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    wa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21z"/><path d="M9 10c0 3 2 5 5 5l1.2-1.4-2-1-.9.7a3 3 0 0 1-1.6-1.6l.7-.9-1-2L9 10z"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ai:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 4.9L19 9.7l-4.2 3 1.5 5L12 14.9 7.7 17.7l1.5-5L5 9.7l5.2-1.8L12 3z"/></svg>'};
  var W=document.createElement('div');W.className='cw';
  W.innerHTML='<div class="cw-quick" role="group" aria-label="Azioni rapide"><button type="button" class="cw-q" data-q="chat" aria-label="Chiedi all\'AI">'+IC.chat+'<span>Chiedi all\'AI</span></button><button type="button" class="cw-q" data-q="prenota" aria-label="Prenota una call">'+IC.cal+'<span>Prenota una call</span></button><a class="cw-q" href="https://wa.me/393791801764?text=Ciao%203-LAB%2C%20vorrei%20saperne%20di%20pi%C3%B9" target="_blank" rel="noopener" aria-label="WhatsApp">'+IC.wa+'<span>WhatsApp</span></a></div>'+
  '<button type="button" class="cw-fab" aria-label="Apri l\'assistente AI" aria-expanded="false">'+IC.chat+'</button>'+
  '<section class="cw-p" role="dialog" aria-label="Assistente AI di 3-LAB"><header class="cw-h"><div class="cw-av"><img src="'+ROOT+'logo.svg" alt="" width="22" height="18"></div><div class="cw-ht"><b>Assistente 3-LAB</b><small>AI · ti aiuto a orientarti</small></div><button type="button" class="cw-x" aria-label="Chiudi">'+IC.x+'</button></header><div class="cw-m" aria-live="polite"></div><div class="cw-chips"></div><form class="cw-f"><input class="cw-i" type="text" maxlength="600" placeholder="Scrivi qui…" aria-label="Il tuo messaggio" autocomplete="off"><button class="cw-s" type="submit" aria-label="Invia">'+IC.send+'</button></form><p class="cw-n">Sono un assistente AI: non scrivere dati sensibili.</p></section>';
  document.body.appendChild(W);
  var $=function(s){return W.querySelector(s)},msgs=$('.cw-m'),chips=$('.cw-chips'),form=$('.cw-f'),inp=$('.cw-i'),send=$('.cw-s'),fab=$('.cw-fab');
  var hist=[],busy=false,K='cw-hist',KP='cw-prof';
  try{hist=JSON.parse(sessionStorage.getItem(K)||'[]')}catch(e){}
  var save=function(){try{sessionStorage.setItem(K,JSON.stringify(hist.slice(-30)))}catch(e){}};
  /* profilo del visitatore: ciò che ha detto in chat; resta per la sessione e precompila la prenotazione */
  var prof={};try{prof=JSON.parse(sessionStorage.getItem(KP)||'{}')}catch(e){}
  function fondi(n){if(!n)return;Object.keys(n).forEach(function(k){if(typeof n[k]==='string'&&n[k].trim())prof[k]=n[k].trim()});try{sessionStorage.setItem(KP,JSON.stringify(prof))}catch(e){}}
  window.cwProfilo=function(){return prof};

  /* ---- azioni: indirizzano nel sito o aprono la prenotazione ---- */
  var SEZ={servizi:'#servizi',processo:'#come-lavoriamo',chisiamo:'#about'},PAG={ai:'ai/',portfolio:'case-study/'};
  function vai(tipo){
    if(tipo==='prenota'){if(window.apriPrenota){close();window.apriPrenota()}else location.href=ROOT+'#contact';return}
    if(tipo==='whatsapp'){window.open('https://wa.me/393791801764?text=Ciao%203-LAB%2C%20vorrei%20saperne%20di%20pi%C3%B9','_blank','noopener');return}
    if(PAG[tipo]){location.href=ROOT+PAG[tipo];return}
    var h=SEZ[tipo];if(!h)return;
    var isHome=!!document.getElementById('servizi');
    if(isHome){var t=document.querySelector(h);if(t){var r=document.documentElement;r.style.scrollBehavior='auto';t.scrollIntoView({block:'start'});requestAnimationFrame(function(){r.style.scrollBehavior=''});if(innerWidth<600)close()}}
    else{location.href=ROOT+h}
  }
  function addMsg(ruolo,testo,azioni,nosave){
    var b=document.createElement('div');b.className='cw-b '+(ruolo==='ai'?'ai':'u');b.textContent=testo;msgs.appendChild(b);
    if(azioni&&azioni.length){var a=document.createElement('div');a.className='cw-act';azioni.forEach(function(x){var bt=document.createElement('button');bt.type='button';bt.className='cw-a'+(x.tipo==='prenota'?' p':'');bt.textContent=x.testo;bt.addEventListener('click',function(){vai(x.tipo)});a.appendChild(bt)});msgs.appendChild(a)}
    msgs.scrollTop=msgs.scrollHeight;
    if(!nosave){hist.push({ruolo:ruolo,testo:testo,azioni:azioni||[]});save()}
  }
  function typing(on){var t=msgs.querySelector('.cw-dots');if(on&&!t){t=document.createElement('div');t.className='cw-dots';t.innerHTML='<i></i><i></i><i></i>';msgs.appendChild(t);msgs.scrollTop=msgs.scrollHeight}else if(!on&&t)t.remove()}
  function suggerisci(lista){chips.innerHTML='';(lista||[]).slice(0,3).forEach(function(t){var b=document.createElement('button');b.type='button';b.className='cw-a';b.textContent=t;b.addEventListener('click',function(){chiedi(t)});chips.appendChild(b)})}

  /* ---- risposte immediate alle domande di base (senza attendere il modello) ---- */
  var AZP={tipo:'prenota',testo:'Prenota la call'};
  var RAPIDE=[
    {re:/\b(ciao|salve|buongiorno|buonasera|hey|hola)\b/,r:function(){return ['Ciao! Di cosa si occupa la tua azienda?',[],['Ho un negozio','Studio professionale','Produzione']]}},
    {re:/\b(prezz|cost|quanto (costa|costate|viene|spendo)|tariff|preventiv)/,r:function(){return ['I prezzi dipendono dal tuo caso: si definiscono nella call conoscitiva, gratuita e di 30 minuti. Di cosa ti occupi?',[AZP],['Ho un negozio','Studio professionale','Produzione']]}},
    {re:/\b(servizi|offrite|offri|fate|vendete|cosa fate)\b/,r:function(){return ['Abbiamo sette servizi: business planning, automazioni agentiche, company brain, gestionali, sito web, growth e contabilità manageriale. Quale ti interessa di più?',[{tipo:'servizi',testo:'Vedi i servizi'}],['Automazioni','Sito web','Numeri e margini']]}},
    {re:/\b(come lavorate|metodo|come funziona|processo)\b/,r:function(){return ['Lavoriamo con un metodo in sei passi: capiamo la situazione attuale, troviamo le cause, costruiamo la soluzione e la lasciamo a voi. Qual è il tuo problema oggi?',[{tipo:'processo',testo:'Vedi il metodo'}],['Troppo lavoro a mano','Numeri poco chiari','Sito fermo']]}},
    {re:/\b(contatti|telefono|email|mail|whatsapp|dove siete|indirizzo|sede)\b/,r:function(){return ['Siamo a Marcianise (CE): info@3-lab.it, WhatsApp +39 379 180 1764. Se vuoi, fissiamo una call gratuita.',[AZP,{tipo:'whatsapp',testo:'Scrivici su WhatsApp'}],[]]}},
    {re:/\b(chi siete|chi siamo|siete in)\b/,r:function(){return ['Siamo in tre: due economisti e un ingegnere gestionale. Uniamo numeri, processi e AI per le PMI. Di che azienda parliamo?',[{tipo:'chisiamo',testo:'Conosci il team'}],[]]}},
    {re:/\b(call|prenot|appuntament|parlare con voi|essere (ri)?contattat)/,r:function(){return ['Volentieri! La call è gratuita e dura 30 minuti. Ti apro il modulo: ci basta la tua email.',[AZP],[]]}}
  ];
  function rapida(t){
    var s=t.toLowerCase();if(s.split(/\s+/).length>8)return null;
    for(var i=0;i<RAPIDE.length;i++)if(RAPIDE[i].re.test(s))return RAPIDE[i].r();
    return null;
  }

  var FALL=[{tipo:'prenota',testo:'Prenota una call'},{tipo:'whatsapp',testo:'Scrivici su WhatsApp'}];
  function chiedi(testo){
    if(busy||!testo.trim())return;busy=true;send.disabled=true;chips.innerHTML='';
    addMsg('u',testo.trim());inp.value='';typing(true);
    var q=rapida(testo.trim());
    if(q){setTimeout(function(){typing(false);addMsg('ai',q[0],q[1]);suggerisci(q[2]);busy=false;send.disabled=false;inp.focus()},450);return}
    var corpo={messaggi:hist.map(function(m){return {ruolo:m.ruolo,testo:m.testo}}),pagina:location.pathname,settore:document.documentElement.dataset.per||'generale',profilo:prof};
    var ctl=new AbortController(),to=setTimeout(function(){ctl.abort()},14000);
    fetch(URL_CHAT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(corpo),signal:ctl.signal})
      .then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
      .then(function(j){if(!j.ok||!j.reply)throw new Error('vuota');typing(false);fondi(j.profilo);addMsg('ai',j.reply,j.azioni);suggerisci(j.suggerimenti)})
      .catch(function(){typing(false);addMsg('ai','In questo momento non riesco a risponderti. Posso però farti parlare direttamente con noi: una call conoscitiva è gratuita e dura 30 minuti.',FALL,true)})
      .then(function(){clearTimeout(to);busy=false;send.disabled=false;inp.focus()});
  }

  /* ---- benvenuto adattato al contesto: pagina e settore scelto ---- */
  var SETT={produzione:'produzione',servizi:'servizi professionali',medici:'studio medico',ristorazione:'ristorazione',commercio:'commercio',edilizia:'edilizia e impianti'};
  var CHIPS={
    produzione:['Magazzino e ordini','Dati di produzione','Costi per prodotto'],
    servizi:['Troppe ore non fatturate','Margine per cliente','Preventivi lenti'],
    medici:['Agenda e disdette','Segreteria sovraccarica','Sito dello studio'],
    ristorazione:['Prenotazioni','Costo dei piatti','Fidelity card'],
    commercio:['Magazzino','Clienti che tornano','Sito e vendite online'],
    edilizia:['Margine per commessa','Preventivi','Gestionale di cantiere']};
  function benvenuto(){
    var per=document.documentElement.dataset.per||'generale',sett=SETT[per],path=location.pathname;
    var msg,sug;
    if(sett){msg='Ciao! Vedo che lavori in '+(per==='medici'?'ambito medico':sett)+'. Cosa ti rallenta di più oggi?';sug=CHIPS[per]}
    else if(/\/ai\/?$/.test(path)){msg='Ciao! Qui parliamo di come l\'AI lavora dentro i processi. Che attività ripetitive hai in azienda?';sug=['Email e preventivi','Fatture e dati','Assistenza clienti']}
    else if(/case-study/.test(path)){msg='Ciao! Ti incuriosisce uno di questi progetti? Dimmi di che azienda parliamo e cerco il caso più vicino.';sug=['Ho un negozio','Studio professionale','Produzione']}
    else{msg='Ciao! Sono l\'assistente di 3-LAB. Di cosa si occupa la tua azienda?';sug=['Ho un negozio','Studio professionale','Produzione','Che servizi offrite?']}
    return [msg,sug];
  }
  function inizio(){
    if(!hist.length){var b=benvenuto();addMsg('ai',b[0]);suggerisci(b[1])}
    else{hist.forEach(function(m){addMsg(m.ruolo,m.testo,m.azioni,true)});if(hist.length<=1)suggerisci(benvenuto()[1])}
  }
  var started=false;
  function open(){if(!started){started=true;inizio()}W.classList.add('open');fab.setAttribute('aria-expanded','true');setTimeout(function(){inp.focus({preventScroll:true})},250)}
  function close(){W.classList.remove('open');fab.setAttribute('aria-expanded','false')}
  fab.addEventListener('click',open);$('.cw-x').addEventListener('click',close);
  W.querySelector('[data-q="chat"]').addEventListener('click',open);
  W.querySelector('[data-q="prenota"]').addEventListener('click',function(){vai('prenota')});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&W.classList.contains('open'))close()});
  form.addEventListener('submit',function(e){e.preventDefault();chiedi(inp.value)});
  window.apriChat=open;
})();
