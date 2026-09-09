/* شوط — المدرب: طبقة واجهة فوق app.js، بلا مساس بمنطق الحساب.
   تقرأ مخرجات readiness() و safetyGate() وتبعثها للوسيط ليشرحها. */
(function () {
  var ENDPOINT = window.SHAWT_COACH_ENDPOINT || "/api/coach";
  var history = [];
  var busy = false;

  function ar() {
    try { return !(typeof state !== "undefined" && state && state.lang === "en"); }
    catch (e) { return true; }
  }
  function L(a, e) { return ar() ? a : e; }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var ASK_AR = [
    "ليش جاهزيتي بهذا الرقم؟",
    "أقدر أزيد الشدة هذا الأسبوع؟",
    "كيف أوزّع الشوط مع الحر؟"
  ];
  var ASK_EN = [
    "Why is my readiness at this number?",
    "Can I raise intensity this week?",
    "How do I fit the bout around the heat?"
  ];

  /* لقطة مشتقّة — أقل ما يكفي للشرح، لا نسخة من الحالة كاملة. */
  function snapshot() {
    var s = {};
    try {
      var r = readiness();
      s.readinessScore = r.score;
      s.readinessBand = r.band;
      s.readinessMsg = r.msg;
      s.fitness = r.fitness;
      s.fatigue = r.fatigue;
      s.form = r.form;
      s.load7 = r.load7;
    } catch (e) {}
    try {
      s.q = {
        cardiacFlag: state.q.cardiacFlag,
        cardiacClearance: state.q.cardiacClearance,
        goal: state.q.goal
      };
      s.clearanceConfirmedAt = state.clearanceConfirmedAt || null;
      s.city = state.q.city;
      s.goal = state.q.goal;
      s.sport = state.q.sport;
      s.hours = state.q.hours;
      s.medical = state.q.medical || [];
      s.ramadan = state.q.ramadan === "true";
    } catch (e) {}
    try {
      if (state.q.cooperDistanceM) {
        var z = paceZonesFromCooper(state.q.cooperDistanceM);
        s.zones = {
          easy: formatPace(z.easy),
          moderate: formatPace(z.moderate),
          hard: formatPace(z.hard)
        };
      }
    } catch (e) {}
    try {
      var h = UP_heatBand();
      if (h) s.heatLevel = h.level;
    } catch (e) {}
    try {
      var days = weekDays();
      var week = (state.planned || []).filter(function (p) {
        return days.some(function (d) { return d.date === p.date; });
      });
      s.weekCount = week.length;
      s.doneCount = week.filter(function (p) { return p.done; }).length;
      var today = iso(new Date());
      var t0 = (state.planned || []).filter(function (p) { return p.date === today; })[0];
      if (t0) s.todayLabel = sessionTitle(t0.sport, t0.zone) + " · " + t0.min + " " + L("دقيقة", "min");
    } catch (e) {}
    return s;
  }

  function locked() {
    try { return safetyGate().cardiacLocked; } catch (e) { return false; }
  }

  function cardHTML() {
    var asks = ar() ? ASK_AR : ASK_EN;
    return '' +
      '<div class="card coach-card" id="coachCard">' +
        '<div class="coach-head">' +
          '<h3>' + L("اسأل المدرب", "Ask the coach") + '</h3>' +
          '<span class="coach-tag">' + L("يشرح أرقامك", "Explains your numbers") + '</span>' +
        '</div>' +
        '<p class="muted small coach-lead">' +
          L("المدرب يقرأ جاهزيتك وحملك ومناطقك كما حسبها التطبيق، ويشرح ما تعنيه. لا يغيّر الخطة.",
            "The coach reads the readiness, load and zones the app already computed, and explains what they mean. It does not change the plan.") +
        '</p>' +
        (locked()
          ? '<p class="coach-locked">' + L("القفل القلبي مفعّل — المدرب لن يقترح زيادة شدة. راجع مختصاً.",
                                            "Cardiac lock is on — the coach will not suggest more intensity. Please see a specialist.") + '</p>'
          : '') +
        '<div class="coach-asks">' +
          asks.map(function (a) {
            return '<button type="button" class="coach-chip" data-ask="' + esc(a) + '">' + esc(a) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="coach-thread" id="coachThread" aria-live="polite"></div>' +
        '<form class="coach-form" id="coachForm">' +
          '<input type="text" id="coachInput" class="coach-input" maxlength="600" autocomplete="off" ' +
            'placeholder="' + L("اكتب سؤالك…", "Type your question…") + '">' +
          '<button type="submit" class="btn btn-primary btn-sm" id="coachSend">' + L("أرسل", "Send") + '</button>' +
        '</form>' +
        '<p class="muted small coach-privacy">' +
          L("سؤالك وملخص أرقامك يُرسلان للمعالجة عند مزوّد النموذج. بقية بياناتك تبقى على جهازك.",
            "Your question and a summary of your figures are sent to the model provider for processing. The rest of your data stays on your device.") +
        '</p>' +
      '</div>';
  }

  function bubble(role, text) {
    var d = document.createElement("div");
    d.className = "coach-msg coach-" + role;
    d.textContent = text;
    document.getElementById("coachThread").appendChild(d);
    return d;
  }

  async function ask(question) {
    if (busy || !question) return;
    busy = true;
    var input = document.getElementById("coachInput");
    var send = document.getElementById("coachSend");
    if (input) input.value = "";
    if (send) send.disabled = true;

    bubble("user", question);
    var out = bubble("bot", L("يقرأ أرقامك…", "Reading your numbers…"));
    var got = "";

    try {
      var res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: question,
          lang: ar() ? "ar" : "en",
          snapshot: snapshot(),
          history: history.slice(-12)
        })
      });
      if (!res.ok || !res.body) throw new Error("http " + res.status);

      var reader = res.body.getReader();
      var dec = new TextDecoder();
      for (;;) {
        var chunk = await reader.read();
        if (chunk.done) break;
        got += dec.decode(chunk.value, { stream: true });
        out.textContent = got;
        out.scrollIntoView({ block: "nearest" });
      }
      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content: got });
    } catch (e) {
      out.textContent = L("ما وصل الرد. تأكد من اتصالك وجرّب مرة ثانية.",
                          "No answer came through. Check your connection and try again.");
    } finally {
      busy = false;
      if (send) send.disabled = false;
      if (input) input.focus();
    }
  }

  function wire() {
    var card = document.getElementById("coachCard");
    if (!card) return;
    card.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-ask]");
      if (chip) ask(chip.getAttribute("data-ask"));
    });
    document.getElementById("coachForm").addEventListener("submit", function (e) {
      e.preventDefault();
      ask(document.getElementById("coachInput").value.trim());
    });
  }

  function mount() {
    var raw = (location.hash || "#/home").replace("#/", "").split("?")[0].split("/")[0] || "home";
    if (raw !== "plan") return;
    try { if (!state.q.completed) return; } catch (e) { return; }

    var app = document.getElementById("app");
    if (!app || document.getElementById("coachCard")) return;
    var anchor = app.querySelector(".container > .card");
    if (!anchor) return;

    history = [];
    anchor.insertAdjacentHTML("afterend", cardHTML());
    wire();
  }

  /* مسارا الدخول مختلفان: تحميل كامل يمر بـ navigate()، أما التنقل داخل
     الصفحة فيمر بمستمع hashchange الذي سجّله app.js على المرجع الأصلي —
     فلا يراه التغليف. نغطّي الاثنين. */
  var prev = window.navigate;
  window.navigate = function () {
    if (typeof prev === "function") prev.apply(this, arguments);
    setTimeout(mount, 0);
  };
  window.addEventListener("hashchange", function () { setTimeout(mount, 0); });
  if (document.getElementById("app")) setTimeout(mount, 40);
})();
