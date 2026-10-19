/* Island delle pagine interne. Contatti porta al banner «Prenota una call conoscitiva» in fondo alla pagina in cui sei. */
(function(){
  var me=document.currentScript,BASE=((me&&me.src)||'').replace(/island\.js.*$/,''),ROOT=BASE.replace(/assets\/$/,'');
  var l=document.createElement('link');l.rel='stylesheet';l.href=BASE+'island.css';document.head.appendChild(l);
  var P=location.pathname.replace(/index\.html$/,''),cur=/\/ai\/?$/.test(P)?'ai':(/case-study\/?$/.test(P)?'case':'');
  var IC={
    home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    serv:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    ai:'<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    case:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'};
  var V=[['home','Home',ROOT,''],['serv','Servizi',ROOT+'#servizi',''],['ai','L\'AI',ROOT+'ai/','ai'],['case','Case study',ROOT+'case-study/','case'],['mail','Contatti','#','cta']];
  var w=document.createElement('div');w.className='is-wrap';
  w.innerHTML='<nav class="is-cap" aria-label="Navigazione principale">'+V.map(function(v){
    return '<a class="is-l'+(v[3]===cur&&v[3]!=='cta'&&v[3]!==''?' on':'')+'" href="'+v[2]+'"'+(v[3]===cur&&v[3]&&v[3]!=='cta'?' aria-current="page"':'')+(v[3]==='cta'?' data-cta':'')+' aria-label="'+v[1]+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+IC[v[0]]+'</svg><span>'+v[1]+'</span></a>'}).join('')+'</nav>';
  document.body.appendChild(w);
  var cta=w.querySelector('[data-cta]');
  cta.addEventListener('click',function(e){var t=document.querySelector('.hub-bigcta');if(!t)return;e.preventDefault();t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'})});
})();
