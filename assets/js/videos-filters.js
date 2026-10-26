/* =========================================================
   VIDEOS-FILTERS.JS — Filtros de la página de técnicas
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('kbr:videosReady', function () {
    var filterBtns = document.querySelectorAll('.filters button');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        filterBtns.forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        var f = b.dataset.filter;
        document.querySelectorAll('.video-card').forEach(function (c) {
          c.classList.toggle('is-hidden', !(f === 'all' || c.dataset.cat === f));
        });
      });
    });
  });
})();