/* =========================================================
   HEADER.JS — Inyecta header + footer dinámicamente
   ========================================================= */

(function () {
  'use strict';

  function buildHeader() {
    var cfg = window.KBR.config;
    var currentPage = location.pathname.split('/').pop() || 'index.html';

    var navItems = cfg.nav.map(function (item) {
      var current = (item.href === currentPage) ? ' aria-current="page"' : '';
      return '<li><a class="nav__link" href="' + item.href + '"' + current + '>' + item.label + '</a></li>';
    }).join('');

    return (
      '<a href="#main" class="skip-link">Saltar al contenido</a>' +
      '<header class="site-header" id="siteHeader">' +
        '<div class="container">' +
          '<a href="index.html" class="brand" aria-label="Inicio">' +
            '<span class="brand__mark brand__mark--photo">' +
              '<img src="' + cfg.images.masterPortrait + '" alt="Maestro fundador" loading="eager" decoding="async" width="44" height="44">' +
            '</span>' +
            '<span class="brand__text">' +
              cfg.site.name +
              '<small>' + cfg.site.subtitle + '</small>' +
            '</span>' +
          '</a>' +
          '<button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav" aria-label="Abrir menú">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
        '<nav class="nav" id="mainNav" aria-label="Principal">' +
          '<div class="nav__close">' +
            '<span class="nav__close-title">Menú</span>' +
            '<button class="nav__close-btn" id="navClose" aria-label="Cerrar menú">✕</button>' +
          '</div>' +
          '<ul class="nav__list">' + navItems + '</ul>' +
          '<div class="nav__footer">' + cfg.site.name + '</div>' +
        '</nav>' +
      '</header>' +
      '<div class="nav-overlay" id="navOverlay" aria-hidden="true"></div>'
    );
  }

  function buildFooter() {
    var cfg = window.KBR.config;
    return (
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="site-footer__grid">' +
            '<div>' +
              '<h4>' + cfg.site.name + '</h4>' +
              '<p>Archivo histórico y documental del arte marcial cubano fundado por el Maestro ' + cfg.site.founder + '.</p>' +
            '</div>' +
            '<div>' +
              '<h4>Navegación</h4>' +
              '<ul>' +
                '<li><a href="index.html">Inicio</a></li>' +
                '<li><a href="el-maestro.html">El Maestro</a></li>' +
                '<li><a href="el-estilo.html">El Estilo</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4>Archivo</h4>' +
              '<ul>' +
                '<li><a href="filosofia.html">Filosofía</a></li>' +
                '<li><a href="tecnicas.html">Técnicas</a></li>' +
                '<li><a href="bibliografia.html">Bibliografía</a></li>' +
                '<li><a href="galeria.html">Galería</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4>Contacto</h4>' +
              '<ul>' +
                '<li><a href="agradecimiento.html">Agradecimiento</a></li>' +
                '<li><a href="contacto.html">Formulario</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="site-footer__bottom">' +
            '<span>&copy; ' + cfg.site.year + ' ' + cfg.site.name + '. Todos los derechos reservados.</span>' +
            '<span>Diseño Analítico &middot; Archivo Documental</span>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    body.insertAdjacentHTML('afterbegin', buildHeader());
    body.insertAdjacentHTML('beforeend', buildFooter());
    document.dispatchEvent(new CustomEvent('kbr:headerReady'));
  });
})();