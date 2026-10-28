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
    // Si la foto tiene nombres o descripción, creamos la cajita de texto
    var htmlNombres = nombres ? '<div class="lightbox__info">' + nombres + '</div>' : '';
    
    // Inyectamos la imagen y el texto en el contenedor del visor
    box.innerHTML = 
      '<img src="' + src + '" alt="' + (alt || '') + '" loading="eager">' +
      htmlNombres;
      
    // Activamos el visor y bloqueamos el scroll de la página de fondo
    lb.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }
  
  function cerrar() {
    // Ocultamos el visor, quitamos el bloqueo de scroll y vaciamos el contenido
    lb.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    box.innerHTML = '';
  }

  // 1. Detectar clic en cualquier imagen de la galería
  document.addEventListener('click', function (e) {
    var item = e.target.closest('.gallery__item');
    if (item) {
      var src = item.dataset.src || item.querySelector('img').src;
      var alt = item.dataset.alt;
      var nombres = item.dataset.nombres;
      abrir(src, alt, nombres);
    }
  });

  // 2. Permitir abrir con el teclado (Enter) para accesibilidad
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.classList.contains('gallery__item')) {
      var item = document.activeElement;
      var src = item.dataset.src || item.querySelector('img').src;
      var alt = item.dataset.alt;
      var nombres = item.dataset.nombres;
      abrir(src, alt, nombres);
    }
    // 3. Cerrar con la tecla Escape
    if (e.key === 'Escape') {
      cerrar();
    }
  });
  
  // 4. Cerrar al hacer clic en el botón de la X
  if (close) {
    close.addEventListener('click', cerrar);
  }
  
  // 5. Cerrar al hacer clic en el fondo oscuro (fuera de la imagen)
  lb.addEventListener('click', function (e) { 
    if (e.target === lb || e.target === box) {
      cerrar(); 
    }
  });

})();