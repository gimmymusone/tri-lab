/* Case study: flusso animato di OrientaCampus (iniettato in [data-flow]) e tab della home */
(function(){
  var node=function(x,y,w,h,t,s,cls){return '<g class="n '+(cls||'')+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14"/><text class="t" x="'+(x+16)+'" y="'+(y+h/2-3)+'">'+t+'</text><text class="s" x="'+(x+16)+'" y="'+(y+h/2+16)+'">'+s+'</text></g>';};
  var svg="<svg class=\"of\" viewBox=\"0 0 1000 520\" role=\"img\" aria-label=\"Flusso: il ticket arriva all'agente AI, che consulta il company brain e risponde. Se il problema è risolto il cliente esce, altrimenti la richiesta passa al responsabile tecnico, che la risolve e il cliente esce soddisfatto.\"><g class=\"of-ln\"><path d=\"M200,250H250\"/><path d=\"M345,300V360\" class=\"of-brain\"/><path d=\"M440,250H500\"/><path d=\"M640,250H686\"/><path d=\"M794,250H860\"/><path d=\"M740,304V380\"/><path d=\"M855,425H926V285\"/><path d=\"M440,280C505,280 540,425 625,425\"/></g><g class=\"of-n\"><rect x=\"30\" y=\"215\" width=\"170\" height=\"70\" rx=\"14\"/><text class=\"t\" x=\"46\" y=\"247\">Ticket in entrata</text><text class=\"s\" x=\"46\" y=\"268\">email · chat · modulo</text></g><g class=\"of-n of-core\"><rect x=\"250\" y=\"200\" width=\"190\" height=\"100\" rx=\"14\"/><text class=\"t\" x=\"266\" y=\"244\">Agente AI centrale</text><text class=\"s\" x=\"266\" y=\"266\">capisce la richiesta</text></g><g class=\"of-n\"><rect x=\"250\" y=\"360\" width=\"190\" height=\"90\" rx=\"14\"/><text class=\"t\" x=\"266\" y=\"400\">Company brain</text><text class=\"s\" x=\"266\" y=\"422\">attinge a tutte le info</text></g><g class=\"of-n\"><rect x=\"500\" y=\"215\" width=\"140\" height=\"70\" rx=\"14\"/><text class=\"t\" x=\"516\" y=\"247\">Risposta</text><text class=\"s\" x=\"516\" y=\"268\">al cliente subito</text></g><g class=\"of-d\"><path d=\"M740,196L794,250L740,304L686,250Z\"/><text x=\"740\" y=\"256\" text-anchor=\"middle\">Risolta?</text></g><g class=\"of-n of-ok\"><rect x=\"860\" y=\"215\" width=\"132\" height=\"70\" rx=\"14\"/><text class=\"t\" x=\"876\" y=\"247\">Cliente</text><text class=\"s\" x=\"876\" y=\"268\">esce soddisfatto</text></g><g class=\"of-n of-ko\"><rect x=\"625\" y=\"380\" width=\"230\" height=\"90\" rx=\"14\"/><text class=\"t\" x=\"641\" y=\"420\">Responsabile tecnico</text><text class=\"s\" x=\"641\" y=\"442\">smistata a chi è di competenza</text></g><text class=\"of-y\" x=\"827\" y=\"240\" text-anchor=\"middle\">SÌ</text><text class=\"of-x\" x=\"754\" y=\"346\">NO</text><text class=\"of-x of-sm\" x=\"452\" y=\"472\">RICHIESTA STRAORDINARIA</text><circle r=\"7\" class=\"of-dot\"><animateMotion dur=\"9s\" repeatCount=\"indefinite\" path=\"M115,250H345H570H740H920\"/></circle><circle r=\"7\" class=\"of-dot of-dot--ko\" opacity=\"0\"><animate attributeName=\"opacity\" to=\"1\" begin=\"4.5s\" dur=\"0.01s\" fill=\"freeze\"/><animateMotion dur=\"9s\" begin=\"4.5s\" repeatCount=\"indefinite\" path=\"M115,250H345H570H740V425H855H926V285\"/></circle><circle r=\"7\" class=\"of-dot of-dot--ko\" opacity=\"0\"><animate attributeName=\"opacity\" to=\"1\" begin=\"1s\" dur=\"0.01s\" fill=\"freeze\"/><animateMotion dur=\"7s\" begin=\"1s\" repeatCount=\"indefinite\" path=\"M115,250H345V280H440C505,280 540,425 625,425H700\"/></circle><circle r=\"6\" class=\"of-dot of-dot--br\"><animateMotion dur=\"3s\" repeatCount=\"indefinite\" path=\"M345,300V360V300\"/></circle></svg>";
  document.querySelectorAll('[data-flow]').forEach(function(el){el.innerHTML=svg;});
  /* siti che scorrono: velocità per progetto (data-rate) × SLOW, riapplicata a ogni avvio perché il browser può azzerarla */
  var SLOW=0.5;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vids=[].slice.call(document.querySelectorAll('.cs-frame video[data-rate]'));
  vids.forEach(function(v){
    var r=(parseFloat(v.dataset.rate)||1)*SLOW,set=function(){v.playbackRate=r};
    v.removeAttribute('autoplay');v.pause();
    set();['loadedmetadata','play','playing'].forEach(function(e){v.addEventListener(e,set)});
  });
  /* parte da capo quando il riquadro è intero nella finestra e vicino al centro; si riazzera quando esce del tutto */
  var check=function(){
    var vh=innerHeight;
    vids.forEach(function(v){
      var r=v.getBoundingClientRect();
      if(!r.height)return;                                   // pannello nascosto (tab)
      if(r.bottom<=0||r.top>=vh){if(v.currentTime){v.pause();v.currentTime=0;}return;}
      var intero=r.top>=0&&r.bottom<=vh||r.height>vh,        // più alto della finestra: basta il centro
          centrale=Math.abs((r.top+r.bottom)/2-vh/2)<vh*0.2;
      if(intero&&centrale&&v.paused&&!reduce)v.play().catch(function(){});
    });
  };
  var raf=0;
  ['scroll','resize'].forEach(function(e){addEventListener(e,function(){raf=raf||requestAnimationFrame(function(){raf=0;check();});},{passive:true});});
  check();setInterval(check,400);                          // copre i cambi di tab senza scroll
  document.querySelectorAll('[data-cs-tabs]').forEach(function(box){
    var tabs=[].slice.call(box.querySelectorAll('[role=tab]')),panels=[].slice.call(box.parentNode.querySelectorAll('[data-cs-panel]'));
    tabs.forEach(function(t){t.addEventListener('click',function(){
      tabs.forEach(function(x){x.setAttribute('aria-selected',x===t);});
      panels.forEach(function(p){var on=p.id===t.getAttribute('aria-controls');p.hidden=!on;var v=p.querySelector('video');if(v){v.pause();v.currentTime=0;}});
    });});
  });
})();
