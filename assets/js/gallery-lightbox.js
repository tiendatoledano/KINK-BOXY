

/* =========================================================
   GALLERY-LIGHTBOX.JS — Visor de imágenes ampliadas
   ========================================================= */

(function () {
  'use strict';
  var lb = document.getElementById('lightbox');
  var box = document.getElementById('lightboxBox');
  var close = document.getElementById('lightboxClose');
  if (!lb || !box) return;

  function abrir(src, alt, nombres) {
    var htmlNombres = nombres ? '<div class="lightbox__info">' + nombres + '</div>' : '';
    
    box.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;width:100%;height:100%;justify-content:center;">' +
      '<img src="' + src + '" alt="' + (alt || '') + '" ' +
      'style="max-width:100%;max-height:75vh;object-fit:contain;">' +
      htmlNombres +
      '</div>';
      
    lb.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }
  
  function cerrar() {
    lb.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    box.innerHTML = '';
  }

  document.addEventListener('click', function (e) {
    var item = e.target.closest('.gallery__item');
    if (item) abrir(item.dataset.src || item.querySelector('img').src, item.dataset.alt, item.dataset.nombres);
  });
  
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.classList.contains('gallery__item')) {
      var item = document.activeElement;
      abrir(item.dataset.src, item.dataset.alt, item.dataset.nombres);
    }
  });
  
  if (close) close.addEventListener('click', cerrar);
  lb.addEventListener('click', function (e) { if (e.target === lb) cerrar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
})();













