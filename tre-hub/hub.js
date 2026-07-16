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
