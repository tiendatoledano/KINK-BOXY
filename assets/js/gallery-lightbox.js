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
    var htmlNombres = nombres ? `<div class="lightbox__info">${nombres}</div>` : '';
    
    box.innerHTML = `
      <img src="${src}" alt="${alt || ''}" loading="eager">
      ${htmlNombres}
    `;
      
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
    if (item) {
      var src = item.dataset.src || item.querySelector('img').src;
      var alt = item.dataset.alt;
      var nombres = item.dataset.nombres;
      abrir(src, alt, nombres);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.classList.contains('gallery__item')) {
      var item = document.activeElement;
      var src = item.dataset.src || item.querySelector('img').src;
      var alt = item.dataset.alt;
      var nombres = item.dataset.nombres;
      abrir(src, alt, nombres);
    }
    if (e.key === 'Escape') {
      cerrar();
    }
  });
  
  if (close) {
    close.addEventListener('click', cerrar);
  }
  
  lb.addEventListener('click', function (e) { 
    if (e.target === lb || e.target === box) {
      cerrar(); 
    }
  });

})();