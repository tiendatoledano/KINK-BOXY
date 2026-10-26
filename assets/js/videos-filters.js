/* =========================================================
   VIDEOS-FILTERS.JS — Filtros por categoría de video
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.filters [data-filter]');
    if (!btn) return;
    document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    var f = btn.dataset.filter;
    document.querySelectorAll('.video-card').forEach(function (card) {
      card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f);
    });
  });
})();