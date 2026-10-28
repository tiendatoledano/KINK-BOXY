/* =========================================================
   GALLERY-HOME.JS — Galería resumida para la portada (4 fotos)
   ========================================================= */

(function () {
  'use strict';
  var grid = document.getElementById('gallery-home');
  if (!grid) return;

  var CATS = ['entrenamiento', 'eventos', 'examenes', 'historico'];

  Promise.all(CATS.map(function (c) {
    return fetch('data/galeria/galeria-' + c + '.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  })).then(function (results) {
    var todas = [];
    
    // Tomamos 1 foto de cada categoría para tener 4 en portada
    results.forEach(function(catArray) {
      if (catArray && catArray.length > 0) {
        todas.push(catArray[0]);
      }
    });
    
    if (!todas.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--c-mute);padding:2rem;">Próximamente: imágenes del estilo.</p>';
      return;
    }
    
    grid.innerHTML = todas.map(function (it) {
      return '<figure class="gallery__item" style="cursor:pointer" ' +
        'onclick="location.href=\'galeria.html\'" role="button" tabindex="0">' +
        '<img src="' + it.src + '" alt="' + (it.alt || '') + '" loading="lazy" ' +
        'style="width:100%;height:100%;object-fit:cover;" ' +
        'onerror="this.parentElement.style.display=\'none\'">' +
        '</figure>';
    }).join('');
  });
})();