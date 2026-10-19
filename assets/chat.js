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
  var hist=[],busy=false,K='cw-hist',KO='cw-open';
  try{hist=JSON.parse(sessionStorage.getItem(K)||'[]')}catch(e){}
  var save=function(){try{sessionStorage.setItem(K,JSON.stringify(hist.slice(-30)))}catch(e){}};

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
  var FALL=[{tipo:'prenota',testo:'Prenota una call'},{tipo:'whatsapp',testo:'Scrivici su WhatsApp'}];
  function chiedi(testo){
    if(busy||!testo.trim())return;busy=true;send.disabled=true;chips.innerHTML='';
    addMsg('u',testo.trim());inp.value='';typing(true);
    var corpo={messaggi:hist.map(function(m){return {ruolo:m.ruolo,testo:m.testo}}),pagina:location.pathname,settore:document.documentElement.dataset.per||'generale'};
    var ctl=new AbortController(),to=setTimeout(function(){ctl.abort()},25000);
    fetch(URL_CHAT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(corpo),signal:ctl.signal})
      .then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
      .then(function(j){if(!j.ok||!j.reply)throw new Error('vuota');typing(false);addMsg('ai',j.reply,j.azioni)})
      .catch(function(){typing(false);addMsg('ai','In questo momento non riesco a risponderti. Posso però farti parlare direttamente con noi: una call conoscitiva è gratuita e dura 30 minuti.',FALL,true)})
      .then(function(){clearTimeout(to);busy=false;send.disabled=false;inp.focus()});
  }
  var INIZIO=['Che servizi offrite?','Come lavorate?','Ho un\'azienda e voglio capire da dove partire'];
  function inizio(){
    if(!hist.length){addMsg('ai','Ciao! Sono l\'assistente di 3-LAB. Ti aiuto a capire come lavoriamo e cosa possiamo fare per la tua azienda. Di cosa ti occupi?');}
    else hist.forEach(function(m){addMsg(m.ruolo,m.testo,m.azioni,true)});
    chips.innerHTML='';if(hist.length<=1)INIZIO.forEach(function(t){var b=document.createElement('button');b.type='button';b.className='cw-a';b.textContent=t;b.addEventListener('click',function(){chiedi(t)});chips.appendChild(b)});
  }
  var started=false;
  function open(){if(!started){started=true;inizio()}W.classList.add('open');fab.setAttribute('aria-expanded','true');setTimeout(function(){inp.focus({preventScroll:true})},250)}
  function close(){W.classList.remove('open');fab.setAttribute('aria-expanded','false');}
  fab.addEventListener('click',open);$('.cw-x').addEventListener('click',close);
  W.querySelector('[data-q="chat"]').addEventListener('click',open);
  W.querySelector('[data-q="prenota"]').addEventListener('click',function(){vai('prenota')});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&W.classList.contains('open'))close()});
  form.addEventListener('submit',function(e){e.preventDefault();chiedi(inp.value)});
  window.apriChat=open;
})();
