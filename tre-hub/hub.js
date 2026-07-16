/* ============================================================
   TRI LAB — JS condiviso delle pagine Hub (tre-hub/)
   Nessuna dipendenza esterna: reveal on scroll + anno corrente.
   ============================================================ */
(function () {
  'use strict';

  /* Reveal on scroll */
  var els = document.querySelectorAll('.reveal');
  function revealAll() { els.forEach(function (el) { el.classList.add('in'); }); }

  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });

    /* Rete di sicurezza: se dopo il load nulla si è rivelato (tab aperta in
       background → l'observer non scatta), mostra tutto senza animazione.
       Se anche solo un elemento è già .in, l'animazione scroll è viva → non tocca. */
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (!document.querySelector('.reveal.in')) revealAll();
      }, 600);
    });
  } else {
    revealAll();
  }

  /* Anno corrente nel footer */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================
   Popup dettaglio servizi: l'elenco mostra solo i titoli,
   i 4 blocchi (Cos'è / Come funziona / Perché serve / Per chi è)
   vivono in <template> e si aprono nel modale al click.
   ============================================================ */
(function () {
  'use strict';
  var modal = document.getElementById('svcModal');
  if (!modal) return;
  var body = modal.querySelector('.svc-modal-body');
  var closeBtn = modal.querySelector('.svc-modal-close');
  var lastFocus = null;

  function open(tplId) {
    var tpl = document.getElementById(tplId);
    if (!tpl || !('content' in tpl)) return;
    if (!modal.classList.contains('open')) lastFocus = document.activeElement;
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.scrollTop = 0;
    closeBtn.focus();
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    body.innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  /* Delegazione: funziona sia per le voci in pagina sia per i richiami
     (callout / componenti) dentro il contenuto clonato nel modale. */
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-tpl]');
    if (opener) { e.preventDefault(); open(opener.getAttribute('data-tpl')); return; }
    if (e.target === modal) close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();
