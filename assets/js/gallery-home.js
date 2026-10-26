/* =========================================================
   GALLERY-HOME.JS — Muestra fotos aleatorias en el index
   ========================================================= */

(function () {
  'use strict';

  var CATS = ['entrenamiento', 'eventos', 'examenes', 'historico'];
  var BASE_IMG = 'assets/img/galeria/';
  var BASE_JSON = 'data/galeria-';

  function fetchJSON(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('Error');
      return r.json();
    });
  }

  function render() {
    var cont = document.getElementById('gallery-home');
    if (!cont) return;

    Promise.all(
      CATS.map(function (cat) {
        return fetchJSON(BASE_JSON + cat + '.json')
          .then(function (lista) { return lista; })
          .catch(function () { return []; });
      })
    ).then(function (resultados) {
      // Juntar todas las imágenes de todas las categorías
      var todas = [];
      resultados.forEach(function (lista, index) {
        lista.forEach(function (archivo) {
          todas.push({ cat: CATS[index], archivo: archivo });
        });
      });

      // Tomar solo las primeras 6 para no sobrecargar el index
      var mostrar = todas.slice(0, 6);

      if (mostrar.length === 0) {
        cont.innerHTML = '<p style="text-align:center;color:var(--c-mute);grid-column:1/-1">Aún no hay imágenes en el archivo.</p>';
        return;
      }

      cont.innerHTML = mostrar.map(function (item) {
        var src = BASE_IMG + item.archivo;
        var alt = item.archivo.replace(/\.[^/.]+$/, "").replace(/-/g, ' ');
        return (
          '<figure class="gallery__item reveal" style="position:relative; overflow:hidden; border-radius:4px;">' +
            '<img src="' + src + '" alt="' + alt + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;">' +
          '</figure>'
        );
      }).join('');
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();