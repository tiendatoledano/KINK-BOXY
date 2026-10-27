/* =========================================================
   FORMS.JS — Validación de formularios (contacto + agradecimiento)
   KEN BOXING RYU
   ========================================================= */

(function() {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(el, type, msg) {
    el.className = el.className.replace(/\s*is-(error|success)/g, '') + ' is-' + type;
    el.textContent = msg;
  }

  function resetStatus(el) {
    el.className = el.className.replace(/\s*is-(error|success)/g, '');
    el.textContent = '';
  }

  /* ---------- Contacto ---------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      resetStatus(status);

      var nombre  = form.nombre.value.trim();
      var email   = form.email.value.trim();
      var motivo  = form.motivo.value;
      var mensaje = form.mensaje.value.trim();

      if (!nombre || nombre.length < 2) {
        return setStatus(status, 'error', '⚠ Por favor, indique su nombre completo.');
      }
      if (!EMAIL_RE.test(email)) {
        return setStatus(status, 'error', '⚠ Introduzca un correo electrónico válido.');
      }
      if (!motivo) {
        return setStatus(status, 'error', '⚠ Seleccione un motivo de contacto.');
      }
      if (!mensaje || mensaje.length < 10) {
        return setStatus(status, 'error', '⚠ El mensaje debe tener al menos 10 caracteres.');
      }

      setStatus(status, 'success',
        '✓ Gracias, ' + nombre + '. Hemos recibido su mensaje. Le responderemos a la brevedad.');
      form.reset();
    });
  }

  /* ---------- Agradecimiento ---------- */
  function initThankForm() {
    var form = document.getElementById('thankForm');
    if (!form) return;
    var status = document.getElementById('thankStatus');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      resetStatus(status);

      var nombre  = form.tNombre.value.trim();
      var email   = form.tEmail.value.trim();
      var rel     = form.tRelacion.value;
      var mensaje = form.tMensaje.value.trim();

      if (!nombre || nombre.length < 2) {
        return setStatus(status, 'error', '⚠ Indique su nombre.');
      }
      if (!EMAIL_RE.test(email)) {
        return setStatus(status, 'error', '⚠ Correo electrónico inválido.');
      }
      if (!rel) {
        return setStatus(status, 'error', '⚠ Seleccione su relación con el Maestro.');
      }
      if (!mensaje || mensaje.length < 15) {
        return setStatus(status, 'error', '⚠ El mensaje debe tener al menos 15 caracteres.');
      }

      setStatus(status, 'success',
        '✓ Gracias, ' + nombre + '. Su mensaje ha sido recibido y se sumará al muro de agradecimiento.');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initThankForm();
  });
})();