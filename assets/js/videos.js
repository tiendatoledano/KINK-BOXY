/* =========================================================
   VIDEOS.JS — Carga todos los videos y los renderiza
   ========================================================= */

(function () {
  'use strict';
  var grid = document.getElementById('videoGrid');
  if (!grid) return;

  var CATS = [
    { file: 'katas',         tag: 'Katas' },
    { file: 'entrenamiento', tag: 'Entrenamiento' },
    { file: 'combate',       tag: 'Combate' },
    { file: 'documental',    tag: 'Documental' }
  ];

  Promise.all(CATS.map(function (c) {
    // 🔽 AQUÍ ESTÁ EL CAMBIO DE RUTA
    return fetch('data/videos/videos-' + c.file + '.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (arr) {
        return arr.map(function (v) {
          return Object.assign({ categoria: c.file, tag: c.tag }, v);
        });
      })
      .catch(function () { return []; });
  })).then(function (results) {
    var all = [].concat.apply([], results);
    if (!all.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--c-mute);padding:2rem;">Aún no hay videos publicados.</p>';
      return;
    }
    grid.innerHTML = all.map(function (v) {
      return '<article class="video-card" data-cat="' + v.categoria + '">' +
        '<div class="video-card__frame">' +
          '<iframe src="https://www.youtube.com/embed/' + v.id + '" ' +
          'title="' + v.titulo + '" loading="lazy" ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
          'allowfullscreen></iframe>' +
        '</div>' +
        '<div class="video-card__body">' +
          '<span class="video-card__tag">' + v.tag + '</span>' +
          '<h3>' + v.titulo + '</h3>' +
          '<p>' + v.descripcion + '</p>' +
          '<div class="video-card__meta">' +
            '<span>' + (v.duracion || '') + ' · ' + (v.anio || '') + '</span>' +
            '<span class="video-card__kanji">' + (v.kanji || '') + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  });
})();