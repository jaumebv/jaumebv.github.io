/* ==========================================================================
   i18n — English lives in the HTML (source of truth, SEO, no-JS).
   Spanish strings live in dictionaries: shared ones below, page-specific
   ones in assets/i18n/<page>.es.js (loaded before this file).

   Markup:
     data-i18n="key"                    → replaces innerHTML
     data-i18n-attr="attr:key;attr:key" → replaces attributes
   ========================================================================== */
(() => {
  "use strict";

  const ES_COMMON = {
    "nav.work": "Proyectos",
    "nav.toolkit": "Skills",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",
    "nav.resume": "CV",
    "nav.allWork": "Todos los proyectos",
    "nav.menu": "Abrir menú",
    "nav.lang": "Idioma",
    "brand.role": "Programador de Videojuegos y C++",

    "footer.built": "Hecho a mano · HTML y CSS · diseño minimalista",
    "footer.top": "Volver arriba",

    "common.back": "Volver al portfolio",
    "common.next": "Siguiente proyecto",
    "common.overview": "Resumen",
    "common.role": "Rol",
    "common.team": "Equipo",
    "common.year": "Año",
    "common.engine": "Motor",
    "common.platform": "Plataforma",
    "common.stack": "Stack",
    "common.duration": "Duración",
    "common.type": "Tipo",
    "common.pause": "Pausar",
    "common.play": "Reproducir",
    "common.watchDemo": "Ver demo",
    "common.watchVideo": "Ver vídeo",
    "common.gallery": "Galería",
    "common.close": "Cerrar",
    "common.prev": "Anterior",
    "common.nextImg": "Siguiente",
    "common.copy": "Copiar email",
    "common.copied": "¡Copiado!",
    "common.contactCta": "¿Hablamos?",
    "common.email": "Escríbeme",
  };

  const DICT = { es: Object.assign({}, ES_COMMON, window.I18N_ES || {}) };
  const SUPPORTED = ["en", "es"];
  const root = document.documentElement;
  const originals = new WeakMap();

  function snapshot(el) {
    if (originals.has(el)) return originals.get(el);
    const snap = { html: null, attrs: {} };
    if (el.hasAttribute("data-i18n")) snap.html = el.innerHTML;
    const spec = el.getAttribute("data-i18n-attr");
    if (spec) {
      spec.split(";").forEach((pair) => {
        const [attr] = pair.split(":").map((s) => s.trim());
        if (attr) snap.attrs[attr] = el.getAttribute(attr);
      });
    }
    originals.set(el, snap);
    return snap;
  }

  function apply(lang) {
    const dict = DICT[lang];
    document.querySelectorAll("[data-i18n], [data-i18n-attr]").forEach((el) => {
      const snap = snapshot(el);
      const key = el.getAttribute("data-i18n");
      if (key) {
        const val = dict && dict[key];
        el.innerHTML = val != null ? val : snap.html;
      }
      const spec = el.getAttribute("data-i18n-attr");
      if (spec) {
        spec.split(";").forEach((pair) => {
          const [attr, k] = pair.split(":").map((s) => s.trim());
          if (!attr || !k) return;
          const val = dict && dict[k];
          const orig = snap.attrs[attr];
          if (val != null) el.setAttribute(attr, val);
          else if (orig != null) el.setAttribute(attr, orig);
        });
      }
    });
    root.lang = lang;
    document.querySelectorAll("[data-set-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  function setLang(lang, persist) {
    if (!SUPPORTED.includes(lang)) lang = "en";
    apply(lang);
    if (persist) { try { localStorage.setItem("lang", lang); } catch {} }
  }

  let initial = "en";
  try {
    const stored = localStorage.getItem("lang");
    if (stored && SUPPORTED.includes(stored)) initial = stored;
  } catch {}
  const q = new URLSearchParams(location.search).get("lang");
  if (q && SUPPORTED.includes(q)) initial = q;

  setLang(initial, false);
  root.classList.remove("i18n-pending");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-set-lang]");
    if (!btn) return;
    setLang(btn.getAttribute("data-set-lang"), true);
  });

  window.i18n = { setLang, get lang() { return root.lang; } };
})();
