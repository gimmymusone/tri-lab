/* Popup in stile «modal» (overlay + pannello su desktop, drawer su mobile): prenotazione call conoscitiva (stessa su ogni pagina)
   e benvenuto «Per chi lavori?» (solo home, dopo il loader). Invio al Worker form.3-lab.it/lead. */
(function(){
  var me=document.currentScript,SRC=(me&&me.src)||'',BASE=SRC.replace(/prenota\.js.*$/,'');
  var LEAD='https://form.3-lab.it/lead',TEL_RE=/^\+?[0-9]{8,15}$/;
  var l=document.createElement('link');l.rel='stylesheet';l.href=BASE+'prenota.css';document.head.appendChild(l);
  if(!document.querySelector('link[href*="family=Inter"]')){var f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap';document.head.appendChild(f)}
  var $=function(r,s){return r.querySelector(s)},$$=function(r,s){return [].slice.call(r.querySelectorAll(s))};

  /* ---- il modal: overlay + pannello (header, corpo, footer con azioni) ---- */
  function modal(cls,title,sub,body,footer){
    var ov=document.createElement('div');ov.className='pr-ov '+cls;
    ov.innerHTML='<div class="pr-m" role="dialog" aria-modal="true" aria-labelledby="t-'+cls+'"><div class="pr-b"><header class="pr-h"><h2 class="pr-t" id="t-'+cls+'">'+title+'</h2><p class="pr-s">'+sub+'</p></header>'+body+'</div><footer class="pr-f">'+footer+'</footer></div>';
    document.body.appendChild(ov);
    var api={ov:ov,m:$(ov,'.pr-m'),prev:null,
      open:function(){api.prev=document.activeElement;requestAnimationFrame(function(){ov.classList.add('on');document.documentElement.style.overflow='hidden';var a=$(ov,'input,.pr-chip,.pr-btn.p');if(a)setTimeout(function(){a.focus({preventScroll:true})},120)})},
      close:function(){ov.classList.remove('on');document.documentElement.style.overflow='';if(api.prev&&api.prev.focus)api.prev.focus();if(api.onclose)api.onclose()},
      isOpen:function(){return ov.classList.contains('on')}};
    ov.addEventListener('click',function(e){if(e.target===ov)api.close()});                 // clic fuori
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&api.isOpen())api.close()});
    return api;
  }
  function invia(body){return fetch(LEAD,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){if(!r.ok)throw new Error(r.status)})}

  /* ---------- prenotazione ---------- */
  var WA='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';
  var SERV=['Business planning','Automazioni agentiche','Company brain','Gestionali','Sito web','Growth e sviluppo commerciale','Contabilità manageriale','Fidelity card 3Card','Non lo so ancora'];
  var P=null;
  function creaPrenota(){
    var body='<div class="pr-dots"><div class="pr-dot active" data-d="1">1</div><div class="pr-conn" data-c="1"><i></i></div><div class="pr-dot" data-d="2">2</div><div class="pr-conn" data-c="2"><i></i></div><div class="pr-dot" data-d="3">3</div></div>'+
    '<div class="pr-p on" data-s="1"><p>È gratuita e dura 30 minuti. Lascia la tua email e, se preferisci, anche il WhatsApp: ti ricontattiamo entro 24h per fissare il giorno.</p><input class="pr-in" type="email" data-em placeholder="latua@email.it" aria-label="La tua email" autocomplete="email" required><div class="pr-tel"><input class="pr-in" type="tel" data-tel value="+39 " aria-label="WhatsApp (facoltativo)" autocomplete="tel"><span aria-hidden="true">WhatsApp (facoltativo)</span></div><input class="pr-hp" type="text" data-hp tabindex="-1" autocomplete="off" aria-hidden="true"></div>'+
    '<div class="pr-p" data-s="2"><p>Cosa ti serve? Scegli uno o più servizi (va bene anche «non so ancora»: lo vediamo insieme) e raccontaci in due righe cosa oggi ti rallenta.</p><div class="pr-chips">'+SERV.map(function(s){return '<button class="pr-chip" type="button">'+s+'</button>'}).join('')+'</div><textarea class="pr-area" data-msg rows="4" maxlength="800" placeholder="Il tuo settore, cosa ti serve, cosa oggi ti rallenta… (facoltativo, ma ci aiuta a prepararci)" aria-label="Il tuo messaggio"></textarea><p class="pr-err" data-err role="alert" hidden></p></div>'+
    '<div class="pr-p" data-s="3"><div class="pr-done"><div class="big">🚀</div><b>Fatto!</b><p>Ti abbiamo appena scritto da info@3-lab.it (se non la vedi, controlla lo spam). Ti ricontattiamo entro 24h per fissare la call conoscitiva.</p></div></div>'+
    '<div class="pr-in-s" style="margin-top:22px"><a class="pr-wa" href="https://wa.me/393791801764?text=Ciao%203-LAB%2C%20vorrei%20saperne%20di%20pi%C3%B9" target="_blank" rel="noopener">'+WA+'Preferisci scriverci subito? WhatsApp</a></div>';
    P=modal('pr-book','Prenota una call conoscitiva','Gratuita, 30 minuti: ci racconti la tua azienda e capiamo insieme se e come possiamo aiutarti.',body,
      '<button type="button" class="pr-btn s" data-back>Annulla</button><button type="button" class="pr-btn p" data-next>Continua →</button>');
    var ov=P.ov,panels=$$(ov,'.pr-p'),dots=$$(ov,'.pr-dot'),conns=$$(ov,'.pr-conn'),cur=1,em=$(ov,'[data-em]'),tel=$(ov,'[data-tel]'),err=$(ov,'[data-err]'),back=$(ov,'[data-back]'),next=$(ov,'[data-next]'),foot=$(ov,'.pr-f');
    var telPulito=function(){var t=tel.value.replace(/[\s.\-()]/g,'');return /^\+?\d{0,3}$/.test(t)?'':t};
    function show(n){panels.forEach(function(p){p.classList.toggle('on',+p.dataset.s===n)});dots.forEach(function(d){var k=+d.dataset.d;d.classList.toggle('active',k===n);d.classList.toggle('done',k<n);d.innerHTML=k<n?'✓':k});conns.forEach(function(c){c.classList.toggle('done',+c.dataset.c<n)});cur=n;
      back.textContent=n===1?'Annulla':(P.veloce&&n===2?'← Modifica contatti':'← Indietro');next.textContent=n===1?'Continua →':(P.veloce?'Invia richiesta →':'Invia →');
      back.style.visibility=n===3?'hidden':'';next.disabled=false;if(n===3)next.textContent='Chiudi'}
    tel.addEventListener('input',function(){tel.parentNode.classList.toggle('pieno',!!telPulito())});
    try{var e0=localStorage.getItem('lead-email');if(e0)em.value=e0}catch(x){}
    /* precompila con ciò che il visitatore ha detto all'assistente (e il settore scelto): niente va perso */
    var msg=$(ov,'[data-msg]'),NOMI={produzione:'Produzione e manifattura',servizi:'Servizi professionali',medici:'Studi medici e sanità',ristorazione:'Ristorazione e ospitalità',commercio:'Commercio e negozi',edilizia:'Edilizia e impianti'};
    msg.addEventListener('input',function(){msg.dataset.t='1'});
    P.riempi=function(){
      var pr={},hs=[];try{pr=JSON.parse(sessionStorage.getItem('cw-prof')||'{}')}catch(x){}try{hs=JSON.parse(sessionStorage.getItem('cw-hist')||'[]')}catch(x){}
      if(pr.email&&!em.value.trim()&&/.+@.+\..+/.test(pr.email))em.value=pr.email;
      if(pr.telefono&&!telPulito()){tel.value=pr.telefono;tel.parentNode.classList.add('pieno')}
      if(pr.interesse&&!$(ov,'.pr-chip.sel'))$$(ov,'.pr-chip').forEach(function(c){if(c.textContent.trim()===pr.interesse)c.classList.add('sel')});
      P.hasEmail=/.+@.+\..+/.test(em.value.trim());
      if(msg.dataset.t)return;
      var per=document.documentElement.dataset.per,r=[];
      if(pr.nome)r.push('Nome: '+pr.nome);
      var sett=pr.settore||NOMI[per];if(sett)r.push('Settore: '+sett);
      if(pr.azienda)r.push('Azienda: '+pr.azienda);
      if(pr.dimensione)r.push('Dimensione: '+pr.dimensione);
      if(pr.problema)r.push('Cosa cerca / cosa lo rallenta: '+pr.problema);
      var ult=hs.filter(function(m){return m.ruolo==='u'}).slice(-3).map(function(m){return m.testo}).join(' | ');
      if(!r.length&&!ult)return;
      var t='Dalla chat con l\'assistente — '+r.join(' · ')+(ult?(r.length?'. ':'')+'Ultimi messaggi: '+ult:'')+'.';
      msg.value=t.slice(0,780);
    };
    P.vai=function(n){show(n)};
    function manda(){
      var sel=$$(ov,'.pr-chip.sel').map(function(c){return c.textContent.trim()});next.disabled=true;next.textContent='Invio…';err.hidden=true;
      var testo=$(ov,'[data-msg]').value.trim();if(sel.length)testo=(testo?testo+'\n\n':'')+'Servizi di interesse: '+sel.join(', ');
      invia({email:em.value.trim(),telefono:telPulito()||null,interesse:sel[0]||null,messaggio:testo.slice(0,1000),pagina:location.href,sito:$(ov,'[data-hp]').value})
      .then(function(){try{localStorage.setItem('lead-email',em.value.trim())}catch(x){}show(3)})
      .catch(function(){err.innerHTML='Invio non riuscito. Riprova, oppure scrivici a <a href="mailto:info@3-lab.it">info@3-lab.it</a>.';err.hidden=false;next.disabled=false;next.textContent=P.veloce?'Invia richiesta →':'Invia →'});
    }
    function avanti(){
      if(cur===1){if(!/.+@.+\..+/.test(em.value.trim())){em.classList.add('bad');em.focus();return}em.classList.remove('bad');
        if(telPulito()&&!TEL_RE.test(telPulito())){tel.classList.add('bad');tel.focus();return}tel.classList.remove('bad');show(2);return}
      if(cur===2)manda();
      else if(cur===3)P.close();
    }
    next.addEventListener('click',avanti);
    back.addEventListener('click',function(){if(cur>1)show(cur-1);else P.close()});
    [em,tel].forEach(function(i){i.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();avanti()}})});
    $$(ov,'.pr-chip').forEach(function(c){c.addEventListener('click',function(){c.classList.toggle('sel')})});
  }
  /* opts.veloce: la richiesta è già pronta (email e messaggio dalla chat): si apre direttamente l'ultimo passo, basta premere «Invia richiesta» */
  window.apriPrenota=function(opts){if(!P)creaPrenota();P.riempi();P.veloce=!!(opts&&opts.veloce&&P.hasEmail);P.vai(P.veloce?2:1);P.open()};
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a');if(!a)return;
    var h=a.getAttribute('href')||'';
    if(a.hasAttribute('data-prenota')||(/#contact$/.test(h)&&/prenota/i.test(a.textContent))){e.preventDefault();window.apriPrenota()}
  });

  /* ---------- benvenuto (solo home): settore + email facoltativa ---------- */
  if(!(me&&me.hasAttribute('data-benvenuto')))return;
  var SETT=[['produzione','Produzione e manifattura'],['servizi','Servizi professionali'],['medici','Studi medici e sanità'],['ristorazione','Ristorazione e ospitalità'],['commercio','Commercio e negozi'],['edilizia','Edilizia e impianti'],['generale','Altro / non so']];
  function benvenuto(){
    try{if(localStorage.getItem('per-scelto'))return}catch(x){}
    var W=modal('pr-wel','Per chi lavori?','Il nostro metodo è sempre lo stesso, ma i servizi cambiano in base a chi abbiamo davanti. Dicci in che settore lavori: ti mostriamo solo ciò che ti serve, con gli esempi più vicini a te.',
      '<div class="pr-chips">'+SETT.map(function(s){return '<button class="pr-chip" type="button" data-k="'+s[0]+'">'+s[1]+'</button>'}).join('')+'</div>',
      '<button type="button" class="pr-btn s" data-skip>Salta</button>');
    var ov=W.ov;
    W.onclose=function(){try{localStorage.setItem('per-scelto','1')}catch(x){}};
    $$(ov,'.pr-chip').forEach(function(c){c.addEventListener('click',function(){if(window.perSet)window.perSet(c.dataset.k);W.close()})});   // un clic e si vede il sito
    $(ov,'[data-skip]').addEventListener('click',W.close);
    W.open();
  }
  function quandoCaricato(){var n=0,t=setInterval(function(){if(window.__lfDone||++n>60){clearInterval(t);setTimeout(benvenuto,700)}},300)}
  if(/[?&]solo/.test(location.search))return;
  if(document.readyState==='complete')quandoCaricato();else addEventListener('load',quandoCaricato);
})();
