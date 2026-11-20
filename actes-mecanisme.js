/* A mechanism shown act by act: one button per act; a click shows that act's drawing and its text.
   vues: [{ viewBox, html }] (ChimOrga.actesMecanisme); textes: { a0: { bouton, texte }, a1: … }, one per act, from the page's table.
   svg, boutons, texte: the page's elements. Returns montre(k). No text of its own: every word comes from the table. */
(function (root) {
  function monter({ vues, textes, svg, boutons, texte }) {
    const ids = vues.map((_, k) => "a" + k), extra = Object.keys(textes).filter(k => !ids.includes(k)), sans = ids.filter(k => !textes[k]);
    if (!vues.length || extra.length || sans.length) throw new Error("actes : un texte par acte, " + vues.length + " actes ; sans texte [" + sans + "], texte en trop [" + extra + "]");
    boutons.innerHTML = ids.map((id, k) => `<button type="button" data-k="${k}">${textes[id].bouton}</button>`).join("");
    const montre = k => {
      svg.setAttribute("viewBox", vues[k].viewBox); svg.innerHTML = vues[k].html;
      texte.textContent = textes["a" + k].texte;
      boutons.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.k === k)));
    };
    boutons.onclick = e => { const b = e.target.closest("button"); if (b) montre(+b.dataset.k); };
    montre(0);
    return montre;
  }
  const api = { monter };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ActesMecanisme = api;
})(typeof self !== "undefined" ? self : this);
