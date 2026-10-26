/* =========================================================
   VIDEOS.JS — Carga videos desde JSON por categoría
   Edita los JSON en: data/videos-*.json
   Cada video necesita: id (YouTube), titulo
   ========================================================= */

(function () {
  'use strict';

  var CATS = ['katas', 'entrenamiento', 'combate', 'documental'];
  var BASE_JSON = 'data/videos-';

  function fetchJSON(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' en ' + url);
      return r.json();
    });
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function cardHTML(v, cat) {
    return (
      '<article class="video-card reveal" data-cat="' + cat + '">' +
        '<div class="video-card__frame">' +
          '<iframe loading="lazy" ' +
            'src="https://www.youtube-nocookie.com/embed/' + v.id +
              '?rel=0&modestbranding=1&playsinline=1" ' +
            'title="' + (v.titulo || 'Video') + '" ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
            'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
        '</div>' +
        '<div class="video-card__body">' +
          '<span class="video-card__tag">' + capitalize(cat) + '</span>' +
          '<h3>' + (v.titulo || 'Sin título') + '</h3>' +
          '<p>' + (v.descripcion || '') + '</p>' +
          '<div class="video-card__meta">' +
            '<span class="video-card__kanji">' + (v.kanji || '武') + '</span>' +
            '<span>' + (v.duracion || '') +
              (v.anio ? ' · ' + v.anio : '') + '</span>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    var grid = document.getElementById('videoGrid');
    if (!grid) return;

    Promise.all(
      CATS.map(function (cat) {
        return fetchJSON(BASE_JSON + cat + '.json')
          .then(function (lista) {
            return { cat: cat, lista: Array.isArray(lista) ? lista : [] };
          })
          .catch(function (err) {
            console.warn('Videos [' + cat + ']:', err.message);
            return { cat: cat, lista: [] };
          });
      })
    ).then(function (resultados) {
      var total = 0;
      var html = resultados.map(function (r) {
        return r.lista.map(function (v) {
          total++;
          return cardHTML(v, r.cat);
        }).join('');
      }).join('');

      if (total === 0) {
        grid.innerHTML =
          '<p style="text-align:center;color:var(--c-mute);grid-column:1/-1">' +
          'Aún no hay videos. Añada objetos a los archivos ' +
          '<code>data/videos-*.json</code>.' +
          '</p>';
        return;
      }

      grid.innerHTML = html;
      document.dispatchEvent(new CustomEvent('kbr:videosReady'));
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();