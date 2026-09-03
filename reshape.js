/* شوط — طبقة المنتج: المسار أولًا، الحر سطرًا */
(function () {
  var PATHS = [
    { id: "ad-corniche", city: "Abu Dhabi", img: "img/city.jpg", km: 10, elev: 8, terrain: "flat",
      name: { ar: "كورنيش أبوظبي", en: "Abu Dhabi Corniche" },
      surface: { ar: "إسفلت عريض", en: "Wide asphalt" },
      why: { ar: "مسطح ومستقيم بما يكفي لضبط الإيقاع. أفضل شوط سهل أو اختبار كوبر.", en: "Flat and even — best for easy bouts or a Cooper test." } },
    { id: "saadiyat", city: "Abu Dhabi", img: "img/hero-run.jpg", km: 8, elev: 28, terrain: "roll",
      name: { ar: "حلقة السعديات", en: "Saadiyat Loop" },
      surface: { ar: "إسفلت ساحلي", en: "Coastal asphalt" },
      why: { ar: "تموج خفيف يدرّب الإيقاع دون صعود قاسٍ.", en: "Gentle roll that trains rhythm without a hard climb." } },
    { id: "hafit", city: "Al Ain", img: "img/bike.jpg", km: 12, elev: 260, terrain: "climb",
      name: { ar: "صعود جبل حفيت", en: "Jebel Hafeet Climb" },
      surface: { ar: "طريق جبلي", en: "Mountain road" },
      why: { ar: "تلّ حقيقي. للشوط القاسي فقط، لا لليوم السهل.", en: "A real climb. Hard days only — not for easy work." } },
    { id: "jumeirah", city: "Dubai", img: "img/run.jpg", km: 9, elev: 10, terrain: "flat",
      name: { ar: "مسار جميرا", en: "Jumeirah Route" },
      surface: { ar: "رصيف بحري", en: "Seafront path" },
      why: { ar: "مسطح ومألوف. شوط سهل أو وتيرة كلام.", en: "Flat and familiar. Easy bout or talk-pace work." } },
    { id: "bay", city: "Dubai", img: "img/skyline.jpg", km: 10.5, elev: 36, terrain: "roll",
      name: { ar: "الخليج التجاري", en: "Business Bay Loop" },
      surface: { ar: "جسور وقناة", en: "Bridges and canal" },
      why: { ar: "جسور قصيرة تمزج الإيقاع. مناسب لشوط متوسط.", en: "Short bridges mix the rhythm. Good for a steady bout." } },
    { id: "hatta", city: "Dubai", img: "img/bike.jpg", km: 14, elev: 180, terrain: "climb",
      name: { ar: "سد حتا والتلال", en: "Hatta Dam Hills" },
      surface: { ar: "طرق تلالية", en: "Rolling hills" },
      why: { ar: "تضاريس حقيقية خارج المدينة. لشوط طويل أو قاسٍ.", en: "Real terrain outside the city. Long or hard bouts." } },
    { id: "shj", city: "Sharjah", img: "img/city.jpg", km: 8, elev: 6, terrain: "flat",
      name: { ar: "كورنيش الشارقة", en: "Sharjah Corniche" },
      surface: { ar: "إسفلت ساحلي", en: "Coastal asphalt" },
      why: { ar: "مسطح وواضح المعالم. شوط سهل أو اختبار.", en: "Flat and well marked. Easy bout or a field test." } },
    { id: "kalba", city: "Sharjah", img: "img/swim.jpg", km: 11, elev: 90, terrain: "roll",
      name: { ar: "كلباء الساحل والتلال", en: "Kalba Coast & Hills" },
      surface: { ar: "ساحل ثم ارتفاع", en: "Coast then rise" },
      why: { ar: "يبدأ سهلًا ثم يرتفع. شوط متوسط البناء.", en: "Starts easy then rises. A building middle bout." } }
  ];

  var TERRAIN = {
    flat: { ar: "مسطح", en: "Flat" },
    roll: { ar: "تموج", en: "Rolling" },
    climb: { ar: "تلّ", en: "Climb" }
  };

  function ar() {
    try { return !(typeof state !== "undefined" && state && state.lang === "en"); } catch (e) { return true; }
  }
  function L(obj) { return obj[ar() ? "ar" : "en"]; }
  function cityOf() {
    try { return (state.q && state.q.city) || "Abu Dhabi"; } catch (e) { return "Abu Dhabi"; }
  }
  function cityName() {
    var c = cityOf();
    var map = { "Abu Dhabi": "أبوظبي", Dubai: "دبي", "Al Ain": "العين", Sharjah: "الشارقة", Fujairah: "الفجيرة" };
    return ar() ? (map[c] || c) : c;
  }
  function byCity() {
    var c = cityOf();
    var list = PATHS.filter(function (p) { return p.city === c; });
    if (list.length) return list;
    if (c === "Al Ain") return PATHS.filter(function (p) { return p.city === "Al Ain" || p.city === "Abu Dhabi"; });
    return PATHS.filter(function (p) { return p.city === "Abu Dhabi" || p.city === "Dubai"; });
  }
  function sessionForDay() {
    var d = new Date().getDay();
    if (d === 5) return { key: "rest", ar: "راحة نشطة", en: "Easy reset", min: 30, terrain: "flat", effort: { ar: "مشي أو دوران خفيف", en: "Walk or easy spin" } };
    if (d === 0 || d === 3) return { key: "test", ar: "شوط اختبار أو ثابت", en: "Test or steady", min: 40, terrain: "flat", effort: { ar: "وتيرة منتظمة", en: "Even pace" } };
    if (d === 2 || d === 6) return { key: "build", ar: "شوط بناء", en: "Build bout", min: 50, terrain: "roll", effort: { ar: "أصلب من الكلام بقليل", en: "A notch above talk pace" } };
    return { key: "easy", ar: "شوط سهل", en: "Easy bout", min: 40, terrain: "flat", effort: { ar: "وتيرة كلام", en: "Talk pace" } };
  }
  function pickPath(terrain) {
    var list = byCity();
    var hit = list.filter(function (p) { return p.terrain === terrain; });
    return (hit[0] || list[0] || PATHS[0]);
  }
  function heatLine() {
    var m = new Date().getMonth();
    if (m >= 5 && m <= 8) return ar() ? "الحر مرتفع — أبقِ الشوط على المسار المسطح وفي وقت أبكر." : "Heat is high — keep the bout flat and earlier.";
    if (m >= 4 && m <= 9) return ar() ? "الحر عامل ثانوي اليوم. المسار أهم." : "Heat is secondary today. The route matters more.";
    return ar() ? "موسم أوضح للتضاريس. اختر التل إن كان الشوط قاسيًا." : "Better season for terrain. Pick the climb if the bout is hard.";
  }

  function boutCard() {
    var ses = sessionForDay();
    var path = pickPath(ses.terrain);
    return (
      '<article class="bout-card">' +
        '<div class="bout-kicker">' + (ar() ? "شوط اليوم · " + cityName() : "Today’s bout · " + cityName()) + "</div>" +
        "<h2>" + L(ses) + "</h2>" +
        '<p class="muted">' + L(ses.effort) + " · " + ses.min + (ar() ? " دقيقة" : " min") + "</p>" +
        '<div class="bout-path">' +
          '<img src="' + path.img + '" alt="">' +
          "<div>" +
            "<strong>" + L(path.name) + "</strong>" +
            '<div class="terrain-row">' +
              '<span class="terrain-chip t-' + path.terrain + '">' + L(TERRAIN[path.terrain]) + "</span>" +
              "<span>" + path.km + " كم</span>" +
              "<span>" + (ar() ? "ارتفاع " : "+") + path.elev + " م</span>" +
              "<span>" + L(path.surface) + "</span>" +
            "</div>" +
            '<p class="muted small">' + L(path.why) + "</p>" +
          "</div>" +
        "</div>" +
        '<p class="heat-note">' + heatLine() + "</p>" +
        '<div class="hero-cta">' +
          '<a class="btn btn-primary" href="#/activities">' + (ar() ? "سجّل الشوط" : "Log the bout") + "</a>" +
          '<a class="btn btn-ghost" href="#/routes">' + (ar() ? "كل المسارات" : "All routes") + "</a>" +
        "</div>" +
      "</article>"
    );
  }

  function pathCard(p) {
    return (
      '<a class="card media-card path-card" href="#/routes">' +
        '<img src="' + p.img + '" alt="">' +
        '<div class="media-body">' +
          '<span class="terrain-chip t-' + p.terrain + '">' + L(TERRAIN[p.terrain]) + "</span>" +
          "<h3>" + L(p.name) + "</h3>" +
          '<p class="muted small">' + p.km + " كم · " + (ar() ? "ارتفاع " : "+") + p.elev + " م · " + L(p.surface) + "</p>" +
        "</div>" +
      "</a>"
    );
  }

  function viewNewHome() {
    var paths = byCity().slice(0, 3);
    var done = false;
    try { done = !!(state.q && state.q.completed); } catch (e) {}
    return (
      '<section class="hero"><div class="container hero-grid">' +
        "<div>" +
          '<div class="eyebrow">' + (ar() ? "المسار أولًا" : "Route first") + "</div>" +
          "<h1>" + (ar() ? "الشوط يُقاس على الأرض<br>لا في الطقس وحده" : "The bout is measured on the ground,<br>not by weather alone") + "</h1>" +
          '<p class="lead">' + (ar()
            ? "تختار التضاريس، ثم المدة، ثم الإيقاع. الحر يُراعى في سطر واحد بعد أن يستقر المسار."
            : "Pick terrain, then duration, then pace. Heat is a single line after the route is set.") + "</p>" +
          '<div class="hero-cta">' +
            (done
              ? '<a class="btn btn-primary" href="#/plan">' + (ar() ? "خطتي هذا الأسبوع" : "This week’s plan") + "</a>"
              : '<a class="btn btn-primary" href="#/questionnaire">' + (ar() ? "ابنِ خطتي من مساري" : "Build my plan from my routes") + "</a>") +
            '<a class="btn btn-ghost" href="#/tests">' + (ar() ? "اختبار كوبر 12 دقيقة" : "12-min Cooper test") + "</a>" +
          "</div>" +
          '<div class="trust-badges">' +
            '<span class="trust-chip">' + (ar() ? "مسطح · تموج · تلّ" : "Flat · Roll · Climb") + "</span>" +
            '<span class="trust-chip">' + (ar() ? "رقم من الميدان" : "A field number") + "</span>" +
            '<span class="trust-chip">' + (ar() ? "الحر ثانوي" : "Heat is secondary") + "</span>" +
          "</div>" +
        "</div>" +
        '<div class="hero-visual"><img src="img/hero-run.jpg" alt=""></div>' +
      "</div></section>" +
      '<section><div class="container">' + boutCard() + "</div></section>" +
      '<section><div class="container">' +
        '<div class="section-head"><div class="eyebrow">' + (ar() ? "تضاريس مدينتك" : "Your city’s terrain") + "</div>" +
        "<h2>" + (ar() ? "مسارات تُناسب الشوط لا العكس" : "Routes that fit the bout") + "</h2>" +
        '<p class="muted">' + (ar() ? "المسطح للإيقاع، والتموج للبناء، والتلّ ليوم قاسٍ واحد في الأسبوع." : "Flat for rhythm, rolling to build, climb for one hard day.") + "</p></div>" +
        '<div class="grid g3">' + paths.map(pathCard).join("") + "</div>" +
        '<a class="btn btn-ghost" style="margin-top:16px" href="#/routes">' + (ar() ? "تصفّح المسارات" : "Browse routes") + "</a>" +
      "</div></section>" +
      '<section><div class="container">' +
        '<div class="section-head"><h2>' + (ar() ? "ثلاث خطوات" : "Three steps") + "</h2></div>" +
        '<div class="steps steps-3">' +
          '<div class="step-card"><div class="step-num">1</div><h3>' + (ar() ? "اختر التضاريس" : "Pick terrain") + "</h3><p class=\"muted small\">" + (ar() ? "مسطح أو تموج أو تلّ بحسب هدف اليوم." : "Flat, rolling, or climb — by today’s aim.") + "</p></div>" +
          '<div class="step-card"><div class="step-num">2</div><h3>' + (ar() ? "أكمل الشوط" : "Finish the bout") + "</h3><p class=\"muted small\">" + (ar() ? "مدة وإحساس واضحان. سجّله بعد الباب." : "Clear duration and feel. Log it after.") + "</p></div>" +
          '<div class="step-card"><div class="step-num">3</div><h3>' + (ar() ? "اختبر كل أسبوعين" : "Test every two weeks") + "</h3><p class=\"muted small\">" + (ar() ? "كوبر على مسار مسطح. الرقم يحدّث الخطة." : "Cooper on a flat path. The number updates the plan.") + "</p></div>" +
        "</div>" +
      "</div></section>"
    );
  }

  function enhanceRoutes() {
    var app = document.getElementById("app");
    if (!app) return;
    if (app.querySelector(".terrain-legend")) return;
    var head = app.querySelector(".section-head");
    if (!head) return;
    var box = document.createElement("div");
    box.className = "terrain-legend";
    box.innerHTML =
      '<p class="muted" style="margin:8px 0 14px">' +
      (ar()
        ? "رتّب اختيارك بالتضاريس: المسطح للإيقاع والاختبار، التموج للبناء، التلّ ليوم قاسٍ. الحر ملاحظة لاحقًا لا شرطًا أول."
        : "Choose by terrain: flat for pace and testing, rolling to build, climb for a hard day. Heat is a later note, not the first filter.") +
      "</p>" +
      '<div class="terrain-row">' +
        '<span class="terrain-chip t-flat">' + L(TERRAIN.flat) + "</span>" +
        '<span class="terrain-chip t-roll">' + L(TERRAIN.roll) + "</span>" +
        '<span class="terrain-chip t-climb">' + L(TERRAIN.climb) + "</span>" +
      "</div>";
    head.appendChild(box);
  }

  function applyReshape() {
    var raw = (location.hash || "#/home").replace("#/", "").split("?")[0].split("/")[0] || "home";
    if (raw === "home") {
      var app = document.getElementById("app");
      if (app) app.innerHTML = viewNewHome();
    }
    if (raw === "routes") enhanceRoutes();
  }

  var prev = window.navigate;
  window.navigate = function () {
    if (typeof prev === "function") prev.apply(this, arguments);
    setTimeout(applyReshape, 0);
  };
  if (document.getElementById("app")) setTimeout(applyReshape, 30);
})();
