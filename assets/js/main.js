/* =========================================================
   MAIN.JS — Inicializador general
   ========================================================= */

(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    if (window.KBR && window.KBR.config) {
      console.log(
        '%c' + window.KBR.config.site.name + ' %c v1.0',
        'background:#b8860b;color:#fff;padding:2px 8px;font-weight:bold;',
        'background:#141414;color:#c9a227;padding:2px 8px;'
      );
    }
  });
})();