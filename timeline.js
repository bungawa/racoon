/* History timeline for lessons. Event: {year, label?, who, what, context, kind?: "idea"|"experiment"|"use"} */
(function (root) {
  const KINDS = ["idea", "experiment", "use"];

  function validate(evts) {
    if (!Array.isArray(evts) || evts.length === 0) throw new Error("timeline: no events");
    evts.forEach((e, i) => {
      if (!Number.isInteger(e.year)) throw new Error("timeline: event " + i + " needs an integer year");
      if (!e.who || !e.what || !e.context) throw new Error("timeline: event " + i + " needs who, what and context");
      if (e.kind && !KINDS.includes(e.kind)) throw new Error("timeline: event " + i + " has unknown kind " + e.kind);
    });
    return true;
  }

  function yearLabel(e, t) { return e.label || (e.year < 0 ? t("timeline.bce", { y: -e.year }) : String(e.year)); }

  function sorted(evts) { return evts.slice().sort((a, b) => a.year - b.year); }

  /* mount(el, evts, {t}): event texts are already in the display language. */
  function mount(el, evts, opt) {
    validate(evts);
    const t = opt.t;
    const ol = document.createElement("ol");
    ol.className = "list keyed";
    sorted(evts).forEach(e => {
      const li = document.createElement("li");
      li.className = e.kind || "idea";
      li.innerHTML = '<span class="k"></span><div><p><strong></strong> <span></span></p><p class="ctx"></p></div>';
      li.querySelector(".k").textContent = yearLabel(e, t);
      li.querySelector("strong").textContent = e.who;
      li.querySelector("p span").textContent = e.what;
      li.querySelector(".ctx").textContent = e.context;
      ol.appendChild(li);
    });
    el.innerHTML = "";
    el.appendChild(ol);
  }

  const api = { validate, yearLabel, sorted, mount, KINDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Timeline = api;
})(typeof self !== "undefined" ? self : this);
