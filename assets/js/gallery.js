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
      var textoFecha = it.fecha ? '<span class="gallery__fecha">' + it.fecha + '</span>' : '';
      
      var htmlInfo = (textoNombres || textoFecha) ? 
        '<div class="gallery__info">' + textoFecha + '<p>' + textoNombres + '</p></div>' : '';
      
      return '<figure class="gallery__item" data-cat="' + it.categoria + '" ' +
        'data-src="' + it.src + '" data-alt="' + (it.alt || '') + '" ' +
        'data-nombres="' + textoNombres + '" tabindex="0" role="button" ' +
        'aria-label="Ampliar imagen: ' + (it.alt || '') + '">' +
        '<img src="' + it.src + '" alt="' + (it.alt || '') + '" loading="lazy" decoding="async" ' +
        'onerror="this.parentElement.style.display=\'none\'">' +
        htmlInfo +
        '</figure>';
    }).join('');
  }

  function filtrar(cat) {
    render(cat === 'all' ? todas : todas.filter(function (i) { return i.categoria === cat; }));
  }

  Promise.all(CATEGORIAS.map(function (c) {
    // Busca en la nueva carpeta data/galeria/
    return fetch('data/galeria/galeria-' + c + '.json')
      .then(function (r) { 
        if (!r.ok) throw new Error('No se encontró ' + c);
        return r.json(); 
      })
      .catch(function (e) { return []; });
  })).then(function (results) {
    // Tomamos solo la primera imagen de cada categoría para tener 4 en total
    var imagenesSeleccionadas = [];
    results.forEach(function(categoriaArray) {
      if (categoriaArray && categoriaArray.length > 0) {
        imagenesSeleccionadas.push(categoriaArray[0]);
      }
    });
    
    todas = imagenesSeleccionadas;
    render(todas);
  });

  document.querySelectorAll('.filters [data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      // Al filtrar, mostramos TODAS las imágenes de esa categoría (no solo la primera)
      if (btn.dataset.filter === 'all') {
        render(todas);
      } else {
        // Para simplificar, si filtra, mostramos la que tenemos en memoria de esa categoría
        var filtradas = todas.filter(function (i) { return i.categoria === btn.dataset.filter; });
        if(filtradas.length > 0) {
          render(filtradas);
        } else {
          // Si no está en memoria, hacemos un fetch rápido
          fetch('data/galeria/galeria-' + btn.dataset.filter + '.json')
            .then(function(r){ return r.json(); })
            .then(function(data){ render(data); })
            .catch(function(){ render([]); });
        }
      }
    });
  });
})();