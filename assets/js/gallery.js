/* =========================================================
   GALLERY.JS — Carga JSON de galería y renderiza con filtros
   ========================================================= */

(function () {
  'use strict';
  var grid = document.getElementById('gallery');
  if (!grid) return;

  var CATEGORIAS = ['entrenamiento', 'eventos', 'examenes', 'historico'];
  var todas = [];

function render(items) {
  if (!items.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--c-mute);padding:2rem;">Aún no hay imágenes en esta categoría.</p>';
    return;
  }
  grid.innerHTML = items.map(function (it) {
    // Si la imagen tiene nombres, creamos el HTML para mostrarlos
    var htmlNombres = it.nombres ? '<div class="gallery__info"><p>' + it.nombres + '</p></div>' : '';
    
    return '<figure class="gallery__item" data-cat="' + it.categoria + '" ' +
      'data-src="' + it.src + '" data-alt="' + (it.alt || '') + '" ' +
      'data-nombres="' + (it.nombres || '') + '" tabindex="0" role="button" ' +
      'aria-label="Ampliar imagen: ' + (it.alt || '') + '">' +
      '<img src="' + it.src + '" alt="' + (it.alt || '') + '" loading="lazy" decoding="async" ' +
      'style="width:100%;height:100%;object-fit:cover;">' +
      htmlNombres +
      '</figure>';
  }).join('');
}


  
  function filtrar(cat) {
    render(cat === 'all' ? todas : todas.filter(function (i) { return i.categoria === cat; }));
  }

  // Carga los JSON
  Promise.all(CATEGORIAS.map(function (c) {
    return fetch('data/galeria-' + c + '.json')
      .then(function (r) { 
        if (!r.ok) throw new Error('No se encontró ' + c);
        return r.json(); 
      })
      .catch(function (e) { 
        console.warn('Error cargando ' + c + ':', e); 
        return []; 
      });
  })).then(function (results) {
    todas = [].concat.apply([], results);
    render(todas);
  });

  // Filtros
  document.querySelectorAll('.filters [data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      filtrar(btn.dataset.filter);
    });
  });
})();