(function(){
  'use strict';
  var REVIEW_URL='https://search.google.com/local/writereview?placeid=ChIJCwgpoUzFhkcR_dVN5MsMnpk';   // segnaposto: sostituire col link recensioni del locale
  var KEY='mc-crew-card',WELCOME=100,REVIEW_BONUS=50,GOALS=[1000,1800,3500,6000];
  var $=function(id){return document.getElementById(id)};
  var screens={home:$('s-home'),join:$('s-join'),card:$('s-card')};

  function store(v){try{if(v===undefined)return JSON.parse(localStorage.getItem(KEY)||'null');localStorage.setItem(KEY,JSON.stringify(v))}catch(e){return null}}
  function show(name){
    Object.keys(screens).forEach(function(k){screens[k].hidden=k!==name});
    window.scrollTo(0,0);
  }
  function toast(msg){
    var t=$('toast');t.textContent=msg;t.classList.add('show');
    clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},2400);
  }

  // Stelle: 4-5 → Google, 1-3 → feedback privato
  var stars=$('stars').querySelectorAll('button');
  stars.forEach(function(b){b.addEventListener('click',function(){
    var v=+b.dataset.v;
    stars.forEach(function(s){var on=+s.dataset.v<=v;s.classList.toggle('on',on);s.setAttribute('aria-checked',+s.dataset.v===v)});
    $('after-good').hidden=v<4;$('feedback').hidden=v>=4;
  })});
  $('g-review').href=REVIEW_URL;
  $('g-review').addEventListener('click',function(){
    var c=store();if(c){if(!c.reviewed){c.points+=REVIEW_BONUS;c.reviewed=true;store(c)}}else try{localStorage.setItem(KEY+'-rev','1')}catch(e){}
  });
  $('feedback').addEventListener('submit',function(e){
    e.preventDefault();
    if(!$('fb-text').value.trim()){$('fb-text').focus();return}
    $('feedback').reset();$('feedback').hidden=true;
    toast('Grazie, il messaggio è arrivato ai gestori');
  });

  $('go-join').addEventListener('click',function(){
    if(store()){render(store());show('card')}else show('join');
  });
  document.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.go)})});

  // Iscrizione
  $('join').addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('f-name').value.trim(),contact=$('f-contact').value.trim(),err=$('join-err');
    var okMail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact),okTel=/^\+?[\d\s().-]{8,}$/.test(contact);
    err.textContent='';
    if(!name){err.textContent='Scrivi il tuo nome.';$('f-name').focus();return}
    if(!okMail&&!okTel){err.textContent='Inserisci un telefono o un’email valida.';$('f-contact').focus();return}
    if(!$('f-privacy').checked){err.textContent='Per creare la tessera serve il consenso privacy.';return}
    var n=Math.floor(100000+Math.random()*900000);
    var card={name:name,surname:$('f-surname').value.trim(),contact:contact,bday:$('f-bday').value,promo:$('f-promo').checked,
      num:'MC-'+n,points:WELCOME,reviewed:false,since:new Date().toISOString().slice(0,10)};
    try{if(localStorage.getItem(KEY+'-rev')){card.points+=REVIEW_BONUS;card.reviewed=true}}catch(e){}
    store(card);render(card);show('card');
  });

  // Tessera
  function render(c){
    $('c-name').textContent=(c.name+' '+(c.surname||'')).trim();
    $('c-num').textContent=c.num;
    $('c-pts').textContent=c.points;
    var goal=GOALS.filter(function(g){return g>c.points})[0]||GOALS[GOALS.length-1];
    var left=goal-c.points;
    $('c-next').textContent=left>0?'Ancora '+left+' punti per il prossimo premio':'Premio disponibile: chiedilo in cassa';
    $('c-tier').textContent=c.points>=3500?'Crew Gold':'Crew Member';
    $('c-qr').innerHTML=qr(c.num);
    var bar=$('c-bar');bar.style.width='0';
    requestAnimationFrame(function(){requestAnimationFrame(function(){bar.style.width=Math.min(100,c.points/goal*100)+'%'})});
  }
  function qr(text){
    var q=qrcode(0,'M');q.addData(text);q.make();
    return q.createSvgTag({cellSize:4,margin:0,scalable:true});
  }
  document.querySelectorAll('[data-wallet]').forEach(function(b){b.addEventListener('click',function(){
    toast('Tessera aggiunta a '+b.dataset.wallet);
  })});

  var saved=store();
  if(saved){$('go-join').firstChild.nodeValue='Apri la tua Crew Card ';$('go-join').querySelector('small').textContent=saved.points+' punti'}
})();
