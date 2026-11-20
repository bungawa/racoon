/* Display languages. One string table per language; the same interactions for all.
   Tables: { fr: { key: "texte {x}" }, en: {...} }. The fallback language (fr) is complete;
   others may be partial: a missing key falls back, and missing() lists it.
   Data fields are either a plain string (fallback language) or { fr, en, ... }: pick() reads both. */
(function (root) {
  const FALLBACK = "fr", PSEUDO = "qps";

  function create(tables, opt) {
    opt = opt || {};
    const fallback = opt.fallback || FALLBACK;
    if (!tables || !tables[fallback]) throw new Error("i18n: no table for fallback language " + fallback);
    const langs = Object.keys(tables);
    /* "qps" (pseudo-locale) = fallback text wrapped in ⟦ ⟧, to find text that skips the tables. */
    const pseudo = opt.lang === PSEUDO, lang = langs.includes(opt.lang) ? opt.lang : fallback;
    const vars = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (v && k in v ? v[k] : m));
    const wrap = x => !pseudo ? x : typeof x === "string" ? "⟦" + x + "⟧" : Array.isArray(x) ? x.map(wrap)
      : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, wrap(v)])) : x;   // texts nested in objects too

    function t(key, v) {
      const s = key in (tables[lang] || {}) ? tables[lang][key] : tables[fallback][key];
      if (s === undefined) throw new Error("i18n: unknown key " + key);
      return wrap(typeof s === "function" ? s(v || {}) : typeof s === "string" ? vars(s, v) : s);
    }
    function pick(field) {
      if (field == null || typeof field !== "object") return wrap(field);
      return wrap(lang in field ? field[lang] : field[fallback]);
    }
    /* Fill [data-i18n] (text), [data-i18n-html] (trusted markup from our own tables), [data-i18n-attr="attr:key;attr:key"]. */
    function apply(el) {
      el.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
      el.querySelectorAll("[data-i18n-html]").forEach(n => { n.innerHTML = t(n.dataset.i18nHtml); });
      el.querySelectorAll("[data-i18n-attr]").forEach(n => n.dataset.i18nAttr.split(";").forEach(p => { const [a, k] = p.split(":"); n.setAttribute(a.trim(), t(k.trim())); }));
      if (el.documentElement) el.documentElement.lang = pseudo ? fallback : lang;
    }
    return { lang: pseudo ? PSEUDO : lang, langs, fallback, t, pick, apply };
  }

  /* Keys the fallback has and `lang` lacks, and keys `lang` has that the fallback does not (typos). */
  function missing(tables, lang, fallback) {
    const f = Object.keys(tables[fallback || FALLBACK]), l = Object.keys(tables[lang] || {});
    return { absent: f.filter(k => !l.includes(k)), unknown: l.filter(k => !f.includes(k)) };
  }

  /* Language for this visit: ?lang=xx, then a remembered choice, then the browser, then the fallback. */
  function chooseLang(available, env) {
    env = env || {};
    const ok = l => l && available.includes(l) ? l : null;
    let saved = null;
    try { saved = env.storage ? env.storage.getItem("lang") : null; } catch (e) { /* storage blocked */ }
    const nav = (env.languages || []).map(l => String(l).slice(0, 2));
    return ok(env.query) || ok(saved) || nav.map(ok).find(Boolean) || FALLBACK;
  }

  /* Browser start-up: pick the language, build t(), fill the page. */
  function boot(tables) {
    const q = new URLSearchParams(location.search).get("lang");
    let storage = null; try { storage = localStorage; } catch (e) { /* blocked */ }
    const I = create(tables, { lang: q === PSEUDO ? PSEUDO : chooseLang(Object.keys(tables), { query: q, storage, languages: navigator.languages }) });
    try { if (q && q !== PSEUDO && I.lang === q) localStorage.setItem("lang", q); } catch (e) { /* blocked */ }
    I.apply(document);
    if (root.Sigles) root.Sigles.watch(document.querySelector("main"), I.t, Object.assign({}, tables[I.fallback], tables[I.lang] || {}));   // acronyms spelled out once per context
    if (root.Liens) root.Liens.watch(document.querySelector("main"), I);   // references to other pages become links
    api.current = I;                                    // the page's instance, for shared scripts (navigation.js)
    return I;
  }

  const api = { FALLBACK, PSEUDO, create, missing, chooseLang, boot };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.I18n = api;
})(typeof self !== "undefined" ? self : this);
