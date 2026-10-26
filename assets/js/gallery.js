/* =========================================================
   GALLERY.JS — Carga galería desde JSON por categoría
   Sube imágenes a: assets/img/galeria/
   Edita el JSON de su categoría en: data/galeria-*.json
   ========================================================= */

(function () {
  'use strict';

  var CATS = ['entrenamiento', 'eventos', 'examenes', 'historico'];
  var BASE_IMG = 'assets/img/galeria/';
  var BASE_JSON = 'data/galeria-';

  function fetchJSON(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' en ' + url);
      return r.json();
    });
  }

  function altFromFilename(nombre) {
    return nombre
      .replace(/\.(jpe?g|png|webp|gif|avif)$/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function buildCard(nombreArchivo, cat, index) {
    var alt = altFromFilename(nombreArchivo);
    var src = BASE_IMG + nombreArchivo;
    var sizeClass = (index % 5 === 0) ? ' gallery__item--wide' : '';

    return (
      '<figure class="gallery__item' + sizeClass + ' reveal" ' +
        'data-cat="' + cat + '" ' +
        'data-src="' + src + '" ' +
        'data-alt="' + alt + '" ' +
        'tabindex="0" role="button" ' +
        'aria-label="Ver imagen: ' + alt + '">' +
        '<img src="' + src + '" alt="' + alt + '" loading="lazy" decoding="async">' +
        '<span class="gallery__cap">' + alt + '</span>' +
      '</figure>'
    );
  }

  function render() {
    var cont = document.getElementById('gallery');
    if (!cont) return;

    Promise.all(
      CATS.map(function (cat) {
        return fetchJSON(BASE_JSON + cat + '.json')
          .then(function (lista) {
            return { cat: cat, lista: Array.isArray(lista) ? lista : [] };
          })
          .catch(function (err) {
            console.warn('Galería [' + cat + ']:', err.message);
            return { cat: cat, lista: [] };
          });
      })
    ).then(function (resultados) {
      var total = 0;
      var html = resultados.map(function (r) {
        return r.lista.map(function (n, i) {
          total++;
          return buildCard(n, r.cat, i);
        }).join('');
      }).join('');

      if (total === 0) {
        cont.innerHTML =
          '<p style="text-align:center;color:var(--c-mute);grid-column:1/-1">' +
          'Aún no hay imágenes. Suba archivos a <code>assets/img/galeria/</code> ' +
          'y añada su nombre al JSON de la categoría en <code>data/</code>.' +
          '</p>';
        return;
      }

      cont.innerHTML = html;
      document.dispatchEvent(new CustomEvent('kbr:galleryReady'));
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();