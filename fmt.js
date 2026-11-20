/* SI formatting and typography, per display language.
   All languages: U+2212 minus, U+202F digit groups from 5 digits (SI brochure, ISO 80000-1),
   U+00A0 between number and unit. Per language: decimal marker, punctuation spacing.
   Fmt.fix(...) etc. are French (the default); Fmt.forLang("en") gives the same API in English. */
(function (root) {
  const NB = "\u00a0", NNB = "\u202f", MINUS = "\u2212";
  const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  const sup = n => String(n).split("").map(c => SUP[c]).join("");
  const frTypo = s => s // idempotent
    .replace(/ ([;!?»])/g, NNB + "$1")
    .replace(/ :(?=\s|$)/g, NB + ":")
    .replace(/« /g, "«" + NNB);
  const CONV = {
    fr: { decimal: ",", typo: frTypo },
    en: { decimal: ".", typo: s => s },
  };

  function make(lang) {
    const c = CONV[lang];
    if (!c) throw new Error("fmt: no conventions for language " + lang);
    function group(intStr) {
      if (intStr.length < 5) return intStr;
      return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, NNB);
    }

    function fromPlain(s) { // "-1234.50" → "−1 234,50" (fr)
      const neg = s[0] === "-", body = neg ? s.slice(1) : s;
      const [i, d] = body.split(".");
      return (neg ? MINUS : "") + group(i) + (d ? c.decimal + d : "");
    }

    function fix(x, d) { // fixed decimals
      if (!isFinite(x)) return "–";
      const s = x.toFixed(d);
      return fromPlain(/^-0(\.0*)?$/.test(s) ? s.slice(1) : s);
    }

    function num(x, sig) { // significant figures, trailing zeros dropped
      if (!isFinite(x)) return "–";
      if (x === 0) return "0";
      const v = +x.toPrecision(sig || 3);
      const s = Math.abs(v) >= 1e21 || Math.abs(v) < 1e-6 ? v.toFixed(20).replace(/\.?0+$/, "") : String(v);
      return fromPlain(s);
    }

    function sci(x, sig) { // "1,61 × 10⁵"
      if (!isFinite(x)) return "–";
      if (x === 0) return "0";
      sig = sig || 3;
      let e = Math.floor(Math.log10(Math.abs(x)));
      let m = +(x / Math.pow(10, e)).toPrecision(sig);
      if (Math.abs(m) >= 10) { m /= 10; e += 1; }
      return fix(m, sig - 1) + NB + "×" + NB + "10" + sup(e);
    }

    const qty = (s, unit) => s + NB + unit;

    /* si(8000, "N") → "8 kN"; si(2.1e11, "Pa", {prefix: "G"}) → "210 GPa"; unit may be compound ("N·m").
       Auto prefix puts the mantissa in [1, 1000); outside the prefix table falls back to scientific notation. */
    const PREFIX = { T: 1e12, G: 1e9, M: 1e6, k: 1e3, "": 1, m: 1e-3, "µ": 1e-6, n: 1e-9, p: 1e-12, f: 1e-15 };
    function si(x, unit, o) {
      o = o || {};
      const sig = o.sig || 3;
      if (!isFinite(x)) return "–";
      let p = o.prefix;
      if (p == null) {
        const a = Math.abs(+x.toPrecision(sig));        // round first: 999,96 must become 1 k, not 1 000
        p = a === 0 ? "" : Object.keys(PREFIX).find(k => a >= PREFIX[k] * (1 - 5e-13));
        if (p == null) return qty(sci(x, sig), unit);
        if (a >= 1000 * PREFIX.T) return qty(sci(x, sig), unit);
      }
      if (!(p in PREFIX)) throw new Error("fmt: unknown SI prefix " + p);
      return qty(num(x / PREFIX[p], sig), p + unit);
    }

    function temp(K) { // {k, c} rounded
      const r = v => fromPlain(String(Math.round(v) || 0));
      return { k: r(K), c: r(K - 273.15) };
    }

    /* kelvin(373.15) → '373 K <span class="aux">(100 °C)</span>': the one way a temperature is shown (HTML) */
    function kelvin(K) { const t = temp(K); return qty(t.k, "K") + ' <span class="aux">(' + qty(t.c, "°C") + ")</span>"; }

    /* MathML stretches a bracket to the height of its whole row: in f(t) next to an integral, the
       parentheses grow as tall as the integral. Each pair gets its own row, so it grows only with what
       it encloses: (a/b) stays tall, f(t) stays small. pairs() is the rule, fences() applies it. */
    const OPEN = { "(": ")", "[": "]", "{": "}" };
    function pairs(kids) {                 // kids: the text of each child if it is an <mo>, else null
      const out = [], stack = [], k = kids.slice();
      for (let j = 0; j < k.length; j++) {
        if (k[j] in OPEN) stack.push(j);
        else if (stack.length && k[j] === OPEN[k[stack[stack.length - 1]]]) {
          const i = stack.pop();
          if (i > 0 || j < k.length - 1) { out.push([i, j]); k.splice(i, j - i + 1, null); j = i; }
        }
      }
      return out;                          // ranges, in the order to wrap, indexes after earlier wraps
    }
    const ROWS = "math, mrow, msqrt, mstyle, mtd, mpadded, mphantom, menclose";
    function fences(node) {
      const rows = node.matches && node.matches(ROWS) ? [node] : [];
      rows.concat([...node.querySelectorAll(ROWS)]).forEach(row => {
        const kids = [...row.children];
        for (const [i, j] of pairs(kids.map(e => e.localName === "mo" && !e.hasAttribute("stretchy") ? e.textContent.trim() : null))) {
          const r = document.createElementNS(row.namespaceURI, "mrow");
          row.insertBefore(r, kids[i]); kids.slice(i, j + 1).forEach(e => r.appendChild(e)); kids.splice(i, j - i + 1, r);
        }
      });
    }

    /* Fix punctuation spacing in every text node under el, now and on later changes. */
    const ATTRS = ["aria-label", "title", "alt", "placeholder"], ATTRS_SEL = ATTRS.map(a => "[" + a + "]").join(",");
    function autoTypo(el) {
      const run = node => {
        if (!node || !node.isConnected) return;
        if (node.nodeType === 1) fences(node);
        const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        for (let t = w.nextNode(); t; t = w.nextNode()) { const f = c.typo(t.nodeValue); if (f !== t.nodeValue) t.nodeValue = f; }
        const els = node.nodeType === 1 ? [node, ...node.querySelectorAll(ATTRS_SEL)] : [];   // read aloud or shown: typeset too
        els.forEach(e => ATTRS.forEach(a => { const v = e.getAttribute(a); if (v) { const f = c.typo(v); if (f !== v) e.setAttribute(a, f); } }));
      };
      run(el);
      new MutationObserver(ms => ms.forEach(m => m.type === "characterData" ? run(m.target.parentNode || el) : m.type === "attributes" ? run(m.target) : m.addedNodes.forEach(n => run(n.nodeType === 3 ? n.parentNode : n))))
        .observe(el, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    }

    return { lang, NB, NNB, MINUS, PREFIX, sup, fix, num, sci, qty, si, temp, kelvin, typo: c.typo, autoTypo, pairs, fences, LANGS: Object.keys(CONV), forLang: make };
  }

  const api = make("fr");
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Fmt = api;
})(typeof self !== "undefined" ? self : this);
