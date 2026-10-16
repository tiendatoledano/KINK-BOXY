/* =========================================================
   CONFIG.JS — Configuración global del sitio
   KEN BOXING RYU
   ========================================================= */

window.KBR = window.KBR || {};

KBR.config = {
  // Datos del sitio
  site: {
    name: 'KEN BOXING RYU',
    subtitle: 'Arte Marcial Cubano',
    founder: 'Julio Lemus Calderón',
    founderGrade: 'Cinturón Negro 9no DAN',
    founderTitle: 'Shihan · Hanshi · Fundador',
    founderSignature: 'Cinturón Negro 9no DAN · Shihan · Hanshi',
    year: new Date().getFullYear()
  },

  // Rutas
  paths: {
    home: 'index.html',
    master: 'el-maestro.html',
    style: 'el-estilo.html',
    philosophy: 'filosofia.html',
    techniques: 'tecnicas.html',
    bibliography: 'bibliografia.html',
    gallery: 'galeria.html',
    thanks: 'agradecimiento.html',
    contact: 'contacto.html'
  },

  // Navegación principal (para generar el header dinámicamente)
  nav: [
    { href: 'index.html',        label: 'Inicio' },
    { href: 'el-maestro.html',   label: 'El Maestro' },
    { href: 'el-estilo.html',    label: 'El Estilo' },
    { href: 'filosofia.html',    label: 'Filosofía' },
    { href: 'tecnicas.html',     label: 'Técnicas' },
    { href: 'bibliografia.html', label: 'Bibliografía' },
    { href: 'galeria.html',      label: 'Galería' },
    { href: 'agradecimiento.html', label: 'Agradecimiento' },
    { href: 'contacto.html',     label: 'Contacto' }
  ],

  // Imágenes
  images: {
    masterPortrait: 'https://i.postimg.cc/G3Tv7yqh/IMG-20261016-WA0005.jpg',
    masterHero: 'https://i.postimg.cc/dQGKjWM6/IMG-20261016-WA0002.jpg'
  },

  // Breakpoints
  breakpoints: {
    mobile: 780,
    tablet: 960,
    desktop: 1240
  }
};