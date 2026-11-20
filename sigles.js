/* Acronyms: each one is spelled out at least once per context.
   A context is the page's <main>, or an element marked data-contexte (a panel that re-renders, like the map's detail).
   If a context's text already contains the expansion, nothing is added. Otherwise the first occurrence becomes a
   button that opens a popover with the definition. An acronym seen only where no button may go (a link, a chip, a drawing)
   gets its button in one « Sigles : … » line at the end of the context. Definitions are table keys "sigle.<ACRONYME>" (locales/<l>/sigles.js).
   Pure core: plan(); DOM: watch(). */
(function (root) {
  const PREFIX = "sigle.";
  const SKIP = "script,style,code,math,svg,a,button,select,option,textarea,title,abbr,.chip,[popover],.sigle,.sigles,.no-sigle";
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const norm = s => s.normalize("NFC").toLowerCase().replace(/[  \s]+/g, " ").replace(/[’']/g, "'");
  const tokenRe = list => new RegExp("(?<![\\p{L}\\p{N}])(" + list.slice().sort((a, b) => b.length - a.length).map(esc).join("|") + ")(?![\\p{L}\\p{N}\\u207a\\u207b])", "gu");   // an ion is not a sigle: HO⁻, CN⁻ (\p{N} already covers ² ₂)

  /* a definition is « Développement » or « Développement — précision » ; the text spells it out if it holds the développement */
  const name = d => String(d).replace(/<[^>]+>/g, "").split(" \u2014 ")[0].replace(/[⟦⟧]/g, "").trim();

  /* the acronyms the tables define: {CGPM: "Conférence générale des poids et mesures", …} */
  function glossary(table) {
    const g = {};
    for (const k in table) if (k.startsWith(PREFIX)) g[k.slice(PREFIX.length)] = table[k];
    return g;
  }

  /* inside « … » in its own text: a cited title, which liens.js turns into a link (no button there, as in a link):
     « Substitutions nucléophiles SN2 et SN1 » stays whole, so it can be found and linked */
  const cite = (s, at) => s.lastIndexOf("«", at) > s.lastIndexOf("»", at);

  /* texts: the context's text pieces in document order; canWrap[i]: may a button go in piece i.
     → [{sigle, piece, at}] where to put a popover, in reading order; {sigle, piece: null} when the acronym only
     appears where no button may go (it then goes to the « Sigles » line). Acronyms spelled out in the context get none. */
  function plan(texts, defs, canWrap) {
    const keys = Object.keys(defs);
    if (!keys.length) return [];
    const whole = norm(texts.join(" ")), re = tokenRe(keys), first = new Map(), seen = [];
    texts.forEach((s, i) => {
      for (const m of s.matchAll(re)) {
        const k = m[1];
        if (!seen.includes(k)) seen.push(k);
        if (!first.has(k) && (!canWrap || canWrap[i]) && !cite(s, m.index)) first.set(k, { sigle: k, piece: i, at: m.index });
      }
    });
    return seen.filter(k => !whole.includes(norm(name(defs[k])))).map(k => first.get(k) || { sigle: k, piece: null, at: null });
  }

  /* every acronym the context mentions, spelled out or not → [ACRONYME] (for tests and audits) */
  function mentioned(texts, defs) {
    const keys = Object.keys(defs);
    if (!keys.length) return [];
    const re = tokenRe(keys), seen = new Set();
    texts.forEach(s => { for (const m of s.matchAll(re)) seen.add(m[1]); });
    return [...seen];
  }

  /* ---------- DOM ---------- */
  let uid = 0;
  function pieces(ctx) {                                  // text nodes of this context, not of a nested one
    const out = [], w = ctx.ownerDocument.createTreeWalker(ctx, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      const p = n.parentElement;
      if (!p || !n.nodeValue.trim()) continue;
      const own = p.closest("[data-contexte]");
      if (own && own !== ctx && ctx.contains(own)) continue;
      out.push({ node: n, wrap: !p.closest(SKIP) });
    }
    return out;
  }
  function place(btn, pop) {                              // open the popover next to its button, inside the viewport
    const r = btn.getBoundingClientRect(), w = Math.min(320, innerWidth - 32);
    pop.style.width = w + "px";
    pop.style.left = Math.max(16, Math.min(r.left, innerWidth - w - 16)) + "px";
    pop.style.top = (r.bottom + 6) + "px";
  }
  function button(doc, sigle, def) {
    const btn = doc.createElement("button"), pop = doc.createElement("span"), id = "sigle-" + (++uid);
    btn.type = "button"; btn.className = "sigle"; btn.textContent = sigle;
    btn.setAttribute("popovertarget", id); btn.dataset.sigle = sigle;
    pop.id = id; pop.className = "definition"; pop.setAttribute("popover", ""); pop.setAttribute("role", "note");
    pop.innerHTML = def;                                  // our own table text, may hold <i>
    pop.addEventListener("beforetoggle", e => { if (e.newState === "open") place(btn, pop); });
    doc.body.append(pop);                                   // out of the text: textContent and copy stay clean
    return btn;
  }
  function wrap(node, at, sigle, def) {
    const after = node.splitText(at); after.splitText(sigle.length);
    after.replaceWith(button(node.ownerDocument, sigle, def));
  }
  /* one line at the end of the context for acronyms that only sit in links, chips or drawings */
  function note(ctx, list, defs, label) {
    const doc = ctx.ownerDocument, p = doc.createElement("p");
    p.className = "caption sigles"; p.append(doc.createTextNode(label + " "));
    list.forEach((k, i) => { if (i) p.append(doc.createTextNode(", ")); p.append(button(doc, k, defs[k])); });
    ctx.append(p);
  }
  function apply(ctx, defs, label) {
    const mine = el => (el.closest("[data-contexte]") || ctx) === ctx;   // not inside a nested context
    const old = [...ctx.querySelectorAll("p.sigles")].find(mine) || null;
    const had = old ? [...old.querySelectorAll("button.sigle")].map(b => b.dataset.sigle) : [];
    const inText = new Set([...ctx.querySelectorAll("button.sigle")].filter(b => mine(b) && !b.closest("p.sigles")).map(b => b.dataset.sigle));
    const ps = pieces(ctx).filter(p => !p.node.parentElement.closest("p.sigles")), todo = plan(ps.map(p => p.node.nodeValue), defs, ps.map(p => p.wrap)).filter(x => !inText.has(x.sigle));
    todo.filter(x => x.piece !== null).sort((a, b) => b.piece - a.piece || b.at - a.at).forEach(x => wrap(ps[x.piece].node, x.at, x.sigle, defs[x.sigle]));
    const rest = todo.filter(x => x.piece === null).map(x => x.sigle);
    if (rest.join() === had.join()) return;                 // unchanged: touch nothing (other observers, e.g. typography, would loop)
    if (old) old.remove();
    if (rest.length) note(ctx, rest, defs, label);
  }
  function contexts(main) { return [main, ...main.querySelectorAll("[data-contexte]")]; }

  /* t: the page's I18n t(); table: the merged tables (to list the acronyms). Re-applies when the page changes. */
  function watch(main, t, table) {
    if (!main) return;
    const keys = Object.keys(glossary(table)), defs = {};
    keys.forEach(k => { defs[k] = t(PREFIX + k); });
    let queued = false;
    const label = t("sigles.note");
    const run = () => {
      queued = false; obs.disconnect();
      document.querySelectorAll(".definition[popover]").forEach(p => { if (!document.querySelector(`[popovertarget="${p.id}"]`)) p.remove(); });   // panel re-rendered
      contexts(main).forEach(c => apply(c, defs, label));
      obs.observe(main, { subtree: true, childList: true, characterData: true });
    };
    const obs = new MutationObserver(() => { if (!queued) { queued = true; queueMicrotask(run); } });
    run();
  }

  const api = { PREFIX, SKIP, glossary, plan, mentioned, watch, norm, name };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Sigles = api;
})(typeof self !== "undefined" ? self : this);
