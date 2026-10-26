/* =========================================================
   GALLERY-LIGHTBOX.JS — Lightbox + filtros de galería
   Se activa cuando gallery.js termina de renderizar
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('kbr:galleryReady', function () {
    var items = document.querySelectorAll('.gallery__item');
    var lb = document.getElementById('lightbox');
    var lbBox = document.getElementById('lightboxBox');
    var lbClose = document.getElementById('lightboxClose');

    if (!lb || !lbBox || !lbClose) return;

    function open(el) {
      lbBox.innerHTML =
        '<img src="' + el.dataset.src + '" alt="' + el.dataset.alt +
        '" style="width:100%;height:100%;object-fit:contain;display:block">';
      lb.classList.add('is-open');
      document.body.classList.add('no-scroll');
      lbClose.focus();
    }

    function close() {
      lb.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }

    items.forEach(function (it) {
      it.addEventListener('click', function () { open(it); });
      it.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(it);
        }
      });
    });

    lbClose.addEventListener('click', close);
    lb.addEventListener('click', function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
    });

    var filterBtns = document.querySelectorAll('.filters button');
    filterBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        filterBtns.forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        var f = b.dataset.filter;
        document.querySelectorAll('.gallery__item').forEach(function (c) {
          c.classList.toggle('is-hidden', !(f === 'all' || c.dataset.cat === f));
        });
      });
    });
  });
})();