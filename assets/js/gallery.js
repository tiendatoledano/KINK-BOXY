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
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--c-mute);padding:2rem;">No hay imágenes subidas en esta categoría.</p>';
      return;
    }
    
    grid.innerHTML = items.map(function (it) {
      var textoNombres = it.nombres || it.descripcion || '';
      var textoFecha = it.fecha ? `<span class="gallery__fecha">${it.fecha}</span>` : '';
      
      var htmlInfo = (textoNombres || textoFecha) ? 
        `<div class="gallery__info">${textoFecha}<p>${textoNombres}</p></div>` : '';
      
      // onerror="this.parentElement.style.display='none'" -> Si la foto no existe, oculta la caja completa
      return `<figure class="gallery__item" data-cat="${it.categoria}" 
        data-src="${it.src}" data-alt="${it.alt || ''}" 
        data-nombres="${textoNombres}" tabindex="0" role="button" 
        aria-label="Ampliar imagen: ${it.alt || ''}">
        <img src="${it.src}" alt="${it.alt || ''}" loading="lazy" decoding="async" 
        onerror="this.parentElement.style.display='none'">
        ${htmlInfo}
        </figure>`;
    }).join('');
  }

  function filtrar(cat) {
    render(cat === 'all' ? todas : todas.filter(function (i) { return i.categoria === cat; }));
  }

  Promise.all(CATEGORIAS.map(function (c) {
    return fetch('data/galeria-' + c + '.json')
      .then(function (r) { 
        if (!r.ok) throw new Error('No se encontró ' + c);
        return r.json(); 
      })
      .catch(function (e) { return []; });
  })).then(function (results) {
    todas = [].concat.apply([], results);
    render(todas);
  });

  document.querySelectorAll('.filters [data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      filtrar(btn.dataset.filter);
    });
  });
})();