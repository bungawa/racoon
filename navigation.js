/* Previous / next lesson, in the order of the parcours (Parcours.ordreLecons on /parcours.json), and the lesson's step:
   links at the top of the lesson (end of its header) and after its footer. Without the parcours, the delivery order of lecons/index.json.
   Runs by itself on a lesson page, after /parcours.js; texts come from the page's I18n (kit keys nav.*, table keys etape.<id>). */
(function (root) {
  /* list: [{chemin, titre}], here: current path → {prev, next} (null at either end, or if the page is not listed) */
  function neighbours(list, here) {
    const i = list.findIndex(l => l.chemin === here);
    return i < 0 ? { prev: null, next: null } : { prev: list[i - 1] || null, next: list[i + 1] || null };
  }
  /* lessons in parcours order, with their titles from the delivered list; a lesson not delivered is skipped */
  function ordered(parcours, lecons, P) {
    P = P || root.Parcours;
    if (!parcours || !P) return lecons;
    const by = new Map(lecons.map(l => [l.chemin, l]));
    return P.ordreLecons(parcours).filter(c => by.has(c)).map(c => by.get(c));
  }
  async function mount() {
    const foot = document.querySelector("main .foot"), I = root.I18n && root.I18n.current;
    if (!foot || !I || !location.pathname.startsWith("/racoon/lecons/")) return;
    const get = u => fetch(u).then(r => r.ok ? r.json() : Promise.reject(r.status));
    const [lecons, parcours] = await Promise.allSettled([get("/racoon/lecons/index.json"), get("/racoon/parcours.json")]);
    if (lecons.status !== "fulfilled") return;
    const P = parcours.status === "fulfilled" ? parcours.value : null, here = location.pathname.replace(/\.html$/, "").replace(/\/$/, "");
    const n = neighbours(ordered(P, lecons.value), here), etape = P && root.Parcours ? root.Parcours.etapeDe(P, here) : null;
    if (!n.prev && !n.next && !etape) return;
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const html = [etape && `<a class="chip c-tint" rel="up" href="/racoon/etape?id=${esc(etape)}">${esc(I.t("nav.etape", { titre: I.t("etape." + etape) }))}</a>`,
      n.prev && `<a class="chip plain" rel="prev" href="${esc(n.prev.chemin)}">${esc(I.t("nav.prev", { titre: I.pick(n.prev.titre) }))}</a>`,
      n.next && `<a class="chip plain" rel="next" href="${esc(n.next.chemin)}">${esc(I.t("nav.next", { titre: I.pick(n.next.titre) }))}</a>`].filter(Boolean).join("");
    const nav = () => { const e = document.createElement("nav"); e.className = "tags"; e.setAttribute("aria-label", I.t("nav.label")); e.innerHTML = html; return e; };
    const head = document.querySelector("main .head");   // the same links at the top of the lesson and after its footer
    if (head) head.append(nav());
    foot.after(nav());
  }
  const api = { neighbours, ordered, mount };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.Navigation = api; if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount(); }
})(typeof self !== "undefined" ? self : this);
