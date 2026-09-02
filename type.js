/* شوط — ضبط تنسيق العنوان والفقرة الافتتاحية */
Object.assign(T.ar, {
  hero_title: "تدرّب وفق رقم\nلا وفق الإحساس",
  hero_lead: "خطة أسبوعية تُبنى من حجمك الحالي وأيامك المتاحة، ونافذة تمرين بحسب حرارة مدينتك، واختبارات ميدانية تقيس التقدّم.\nالتقييم الصحي بوابة قصيرة، وليس التطبيق كلّه."
});
(function () {
  function formatHero() {
    document.querySelectorAll('[data-t="hero_title"], [data-t="hero_lead"]').forEach(function (el) {
      var raw = t(el.getAttribute("data-t"));
      el.innerHTML = String(raw).replace(/\n/g, "<br>");
    });
  }
  var origT = window.applyTranslations;
  window.applyTranslations = function () {
    if (typeof origT === "function") origT();
    formatHero();
  };
  var origN = window.navigate;
  if (typeof origN === "function") {
    window.navigate = function () {
      origN.apply(this, arguments);
      formatHero();
    };
  }
  formatHero();
})();
