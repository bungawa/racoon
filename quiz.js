/* Quiz engine for the daily lessons and the épreuves of the parcours. Pure core + DOM mount.
   Question: {id, prompt, options:[{id,text}], correct, why, hint?, right?, wrong?}
   Two modes: a lesson quiz answers each question at once; an épreuve (opt.exam) lets the reader pick and change
   answers, then grades everything at the end and calls opt.onEnd(grade). */
(function (root) {
  function validate(qs) {
    if (!Array.isArray(qs) || qs.length === 0) throw new Error("quiz: no questions");
    const seen = new Set();
    for (const q of qs) {
      if (!q.id || seen.has(q.id)) throw new Error("quiz: missing or duplicate id " + q.id);
      seen.add(q.id);
      if (!Array.isArray(q.options) || q.options.length < 2) throw new Error("quiz: " + q.id + " needs 2+ options");
      const ids = q.options.map(o => o.id);
      if (new Set(ids).size !== ids.length) throw new Error("quiz: " + q.id + " has duplicate option ids");
      if (!ids.includes(q.correct)) throw new Error("quiz: " + q.id + " correct id not among options");
      if (!q.why) throw new Error("quiz: " + q.id + " needs an explanation");
    }
    return true;
  }

  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, seed) {
    const r = rng(seed), out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function grade(qs, answers) {
    const results = qs.map(q => ({ id: q.id, ok: answers[q.id] === q.correct }));
    return { score: results.filter(r => r.ok).length, total: qs.length, results };
  }

  /* mount(el, qs, {t, seed, exam?, onStart?, onEnd?}): t is the page's I18n t(); question texts are already in the display language. */
  function mount(el, qs, opt) {
    validate(qs);
    const t = opt.t, RIGHT = t("quiz.right"), WRONG = t("quiz.wrong"), exam = !!opt.exam;
    const seed = opt.seed == null ? Date.now() : opt.seed;
    const answers = {}, reveals = [];
    let ended = false;
    if (opt.onStart) opt.onStart();                       // each (re)start: the page clears the last verdict
    el.innerHTML = "";
    const list = document.createElement("ol");
    list.className = "quiz";
    const summary = document.createElement("div");
    summary.className = "quiz-summary";
    summary.hidden = true;

    qs.forEach((q, qi) => {
      const li = document.createElement("li");
      li.className = "q";
      li.innerHTML = '<p class="q-prompt"></p><div class="q-opts" role="group"></div><p class="q-feedback" hidden></p>';
      li.querySelector(".q-prompt").textContent = q.prompt;
      const opts = li.querySelector(".q-opts"), fb = li.querySelector(".q-feedback");
      if (q.hint) {
        const h = document.createElement("button");
        h.type = "button"; h.className = "q-hint"; h.textContent = t("quiz.hint");
        h.onclick = () => { h.textContent = q.hint; h.disabled = true; };
        li.insertBefore(h, opts);
      }
      /* show the verdict and the explanation; an unanswered question shows the right option */
      function reveal() {
        const chosen = answers[q.id], ok = chosen === q.correct;
        [...opts.children].forEach(x => {
          x.disabled = true; x.classList.remove("is-picked");
          if (x.dataset.id === chosen) x.classList.add(ok ? "is-right" : "is-wrong");
          if (!ok && x.dataset.id === q.correct) x.classList.add("is-right");
        });
        const label = ok ? (q.right || RIGHT[qi % RIGHT.length]) : (q.wrong || WRONG[qi % WRONG.length]);
        fb.innerHTML = "<strong></strong> ";
        fb.firstChild.textContent = label;
        fb.appendChild(document.createTextNode(q.why));
        fb.hidden = false;
      }
      reveals.push(reveal);
      shuffle(q.options, seed + qi).forEach(o => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "q-opt"; b.textContent = o.text;
        if (exam) b.setAttribute("aria-pressed", "false");
        b.onclick = () => {
          if (exam) {                                     // pick, or change one's mind, until the épreuve is handed in
            if (ended) return;
            answers[q.id] = o.id;
            [...opts.children].forEach(x => { x.classList.toggle("is-picked", x === b); x.setAttribute("aria-pressed", String(x === b)); });
            return progress();
          }
          if (q.id in answers) return;
          answers[q.id] = o.id;
          reveal();
          if (Object.keys(answers).length === qs.length) showSummary();
        };
        b.dataset.id = o.id;
        opts.appendChild(b);
      });
      list.appendChild(li);
    });

    /* épreuve: a counter and the button that hands it in, enabled once every question has an answer */
    const hand = document.createElement("div");
    hand.className = "quiz-summary"; hand.hidden = !exam;
    hand.innerHTML = '<p class="caption" role="status"></p><button type="button" class="btn"></button>';
    const submit = hand.querySelector("button");
    submit.textContent = t("quiz.submit");
    submit.onclick = () => {
      if (ended || Object.keys(answers).length < qs.length) return;
      ended = true; hand.hidden = true;
      reveals.forEach(f => f());
      showSummary();
    };
    function progress() {
      const n = Object.keys(answers).length;
      hand.firstChild.textContent = t("quiz.answered", { n, total: qs.length });
      submit.disabled = n < qs.length;
    }

    function showSummary() {
      const g = grade(qs, answers);
      summary.innerHTML = '<p class="quiz-score"></p><button type="button" class="btn tinted"></button>';
      summary.querySelector("p").textContent = t("quiz.score", g);
      summary.querySelector("button").textContent = t("quiz.again");
      summary.querySelector("button").onclick = () => mount(el, qs, Object.assign({}, opt, { seed: seed + 1000 }));
      summary.hidden = false;
      if (opt.onEnd) opt.onEnd(g);
    }

    el.appendChild(list);
    el.appendChild(hand);
    el.appendChild(summary);
    if (exam) progress();
    return { answers, grade: () => grade(qs, answers) };
  }

  const api = { validate, rng, shuffle, grade, mount };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Quiz = api;
})(typeof self !== "undefined" ? self : this);
