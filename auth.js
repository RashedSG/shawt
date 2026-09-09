/* شوط — الحساب: تسجيل دخول Google عبر Firebase Authentication.
   طبقة مستقلة فوق app.js (المثبّت على CDN)، على نمط coach.js/reshape.js.

   مصدر الحقيقة الوحيد لحالة المستخدم هو onAuthStateChanged — لا نكتب
   المستخدم في localStorage الخاص بالتطبيق ولا نقرأه منه. جلسة Firebase
   وحدها تقرر من المسجَّل، وهي التي تُجدِّد الرمز وتُبطله. */

const FIREBASE_VERSION = "12.18.0";
const CDN = "https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION;

const T = {
  ar: {
    title: "الحساب",
    lead: "سجّل الدخول لحفظ هويتك عبر الأجهزة. خطتك وأنشطتك تبقى على هذا الجهاز كما هي.",
    loading: "جارٍ التحقق من الجلسة…",
    signIn: "متابعة باستخدام Google",
    signingIn: "جارٍ فتح نافذة Google…",
    redirecting: "جارٍ تحويلك إلى Google…",
    signOut: "تسجيل الخروج",
    signedInAs: "مسجَّل الدخول",
    name: "الاسم",
    email: "البريد الإلكتروني",
    uid: "معرّف Firebase",
    noName: "بلا اسم",
    noEmail: "بلا بريد",
    retry: "حاول مرة أخرى",
    errTitle: "تعذّر تسجيل الدخول",
    e_popupBlocked: "المتصفح حجب النافذة المنبثقة. نحاول الآن بطريقة التحويل…",
    e_cancelled: "أُلغي تسجيل الدخول. تقدر تحاول مرة ثانية.",
    e_unauthorizedDomain: "هذا النطاق غير مصرّح به في مشروع Firebase. أضف rashedsg.github.io في Authentication ← Settings ← Authorized domains.",
    e_notAllowed: "مزوّد Google غير مفعّل في مشروع Firebase. فعّله من Authentication ← Sign-in method.",
    e_network: "تعذّر الاتصال بالشبكة. تحقق من اتصالك وحاول مجدداً.",
    e_storage: "المتصفح يمنع تخزين الجلسة. جرّب إيقاف وضع التصفح الخاص أو السماح لملفات الارتباط.",
    e_apiKey: "مفتاح Firebase غير صالح. راجع القيم في firebase-config.js.",
    e_generic: "صار خطأ غير متوقع أثناء تسجيل الدخول."
  },
  en: {
    title: "Account",
    lead: "Sign in to carry your identity across devices. Your plan and activities stay on this device as they are.",
    loading: "Checking your session…",
    signIn: "Continue with Google",
    signingIn: "Opening the Google window…",
    redirecting: "Redirecting you to Google…",
    signOut: "Sign out",
    signedInAs: "Signed in",
    name: "Name",
    email: "Email",
    uid: "Firebase UID",
    noName: "No name",
    noEmail: "No email",
    retry: "Try again",
    errTitle: "Sign-in failed",
    e_popupBlocked: "The browser blocked the popup. Trying the redirect method…",
    e_cancelled: "Sign-in was cancelled. You can try again.",
    e_unauthorizedDomain: "This domain is not authorised in the Firebase project. Add rashedsg.github.io under Authentication → Settings → Authorized domains.",
    e_notAllowed: "The Google provider is not enabled in the Firebase project. Enable it under Authentication → Sign-in method.",
    e_network: "Could not reach the network. Check your connection and try again.",
    e_storage: "The browser is blocking session storage. Try leaving private mode or allowing cookies.",
    e_apiKey: "The Firebase key is not valid. Check the values in firebase-config.js.",
    e_generic: "An unexpected error occurred while signing in."
  }
};

function isAr() {
  try { return !(typeof state !== "undefined" && state && state.lang === "en"); }
  catch (e) { return true; }
}
function t(k) { return (T[isAr() ? "ar" : "en"])[k] || k; }
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

/* الحالة المعروضة. المستخدم يأتي من Firebase حصراً. */
var view = { phase: "loading", user: null, error: "", busy: false };
var auth = null;
var api = null;

function errorMessage(code) {
  switch (code) {
    case "auth/popup-blocked": return t("e_popupBlocked");
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
    case "auth/user-cancelled":
    case "auth/redirect-cancelled-by-user": return t("e_cancelled");
    case "auth/unauthorized-domain": return t("e_unauthorizedDomain");
    case "auth/operation-not-allowed": return t("e_notAllowed");
    case "auth/network-request-failed": return t("e_network");
    case "auth/web-storage-unsupported": return t("e_storage");
    case "auth/invalid-api-key": return t("e_apiKey");
    default: return t("e_generic");
  }
}

/* الحالات التي لا يمكن معها فتح نافذة منبثقة — عندها فقط نلجأ للتحويل. */
function needsRedirect(code) {
  return code === "auth/popup-blocked" ||
         code === "auth/operation-not-supported-in-this-environment" ||
         code === "auth/web-storage-unsupported";
}

function avatar(user) {
  if (user.photoURL) {
    return '<img class="auth-avatar" src="' + esc(user.photoURL) +
           '" alt="" referrerpolicy="no-referrer" width="64" height="64">';
  }
  var src = user.displayName || user.email || "?";
  return '<div class="auth-avatar auth-avatar-fallback" aria-hidden="true">' +
         esc(src.trim().charAt(0).toUpperCase()) + "</div>";
}

function row(label, value, mono) {
  return '<div class="auth-row"><span class="muted small">' + esc(label) + "</span>" +
         '<div class="auth-val' + (mono ? " auth-mono" : "") + '">' + esc(value) + "</div></div>";
}

function cardHTML() {
  var body;
  if (view.phase === "loading") {
    body = '<div class="auth-loading"><span class="auth-spinner" aria-hidden="true"></span>' +
           '<span class="muted">' + esc(t("loading")) + "</span></div>";
  } else if (view.phase === "signedIn" && view.user) {
    var u = view.user;
    body =
      '<div class="auth-profile">' + avatar(u) +
        '<div class="auth-ident"><span class="auth-badge">' + esc(t("signedInAs")) + "</span>" +
          '<div class="auth-name">' + esc(u.displayName || t("noName")) + "</div>" +
          '<div class="muted small">' + esc(u.email || t("noEmail")) + "</div>" +
        "</div>" +
      "</div>" +
      '<div class="auth-rows">' +
        row(t("name"), u.displayName || t("noName")) +
        row(t("email"), u.email || t("noEmail")) +
        row(t("uid"), u.uid, true) +
      "</div>" +
      '<button type="button" class="btn btn-ghost" id="authSignOut"' + (view.busy ? " disabled" : "") + ">" +
        esc(t("signOut")) + "</button>";
  } else {
    body =
      '<p class="muted small auth-lead">' + esc(t("lead")) + "</p>" +
      (view.error
        ? '<div class="auth-error" role="alert"><b>' + esc(t("errTitle")) + "</b><span>" + esc(view.error) + "</span></div>"
        : "") +
      '<button type="button" class="btn btn-primary auth-google" id="authSignIn"' + (view.busy ? " disabled" : "") + ">" +
        '<span class="auth-g" aria-hidden="true">' + GOOGLE_G + "</span>" +
        "<span>" + esc(view.busy ? t("signingIn") : (view.error ? t("retry") : t("signIn"))) + "</span>" +
      "</button>";
  }
  return '<div class="card auth-card" id="authCard"><h3 class="auth-title">' + esc(t("title")) + "</h3>" + body + "</div>";
}

var GOOGLE_G =
  '<svg viewBox="0 0 18 18" width="18" height="18" focusable="false">' +
  '<path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>' +
  '<path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18z"/>' +
  '<path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34z"/>' +
  '<path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"/>' +
  "</svg>";

function render() {
  var card = document.getElementById("authCard");
  if (!card) { mount(); return; }
  card.outerHTML = cardHTML();
  wire();
}

function wire() {
  var inBtn = document.getElementById("authSignIn");
  if (inBtn) inBtn.addEventListener("click", signIn);
  var outBtn = document.getElementById("authSignOut");
  if (outBtn) outBtn.addEventListener("click", doSignOut);
}

async function signIn() {
  if (view.busy) return;
  view.busy = true; view.error = ""; render();
  var provider = new api.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    await api.signInWithPopup(auth, provider);
    // onAuthStateChanged يتكفّل بالعرض
  } catch (e) {
    var code = (e && e.code) || "";
    if (needsRedirect(code)) {
      view.error = t("e_popupBlocked"); render();
      try {
        await api.signInWithRedirect(auth, provider);
        return; // الصفحة تغادر الآن
      } catch (e2) {
        view.error = errorMessage((e2 && e2.code) || "");
      }
    } else {
      view.error = errorMessage(code);
    }
    view.busy = false; render();
  }
}

async function doSignOut() {
  if (view.busy) return;
  view.busy = true; render();
  try { await api.signOut(auth); }
  catch (e) { view.error = errorMessage((e && e.code) || ""); }
  view.busy = false;
  // onAuthStateChanged سيضبط الطور
}

/* تُركَّب بعد كل عرض للمسار، لأن app.js يستبدل محتوى #app بالكامل. */
function mount() {
  var raw = (location.hash || "#/home").replace("#/", "").split("?")[0].split("/")[0] || "home";
  if (raw !== "account") return;
  var app = document.getElementById("app");
  if (!app || document.getElementById("authCard")) return;
  var head = app.querySelector(".container > .section-head");
  var layout = app.querySelector(".account-layout");
  if (head) head.insertAdjacentHTML("afterend", cardHTML());
  else if (layout) layout.insertAdjacentHTML("beforebegin", cardHTML());
  else return;
  wire();
}

(async function boot() {
  var cfg;
  try { cfg = await import("./firebase-config.js"); }
  catch (e) { console.info("[shawt] firebase-config.js غير موجود — ميزة الحساب متوقفة."); return; }

  if (!cfg.isConfigured || !cfg.isConfigured()) {
    console.info("[shawt] Firebase غير مضبوط بعد — عبّئ firebase-config.js لتفعيل تسجيل الدخول.");
    return;
  }

  var appMod, authMod;
  try {
    appMod = await import(CDN + "/firebase-app.js");
    authMod = await import(CDN + "/firebase-auth.js");
  } catch (e) {
    console.warn("[shawt] تعذّر تحميل Firebase SDK — ميزة الحساب متوقفة.", e);
    return;
  }

  api = authMod;
  var fbApp = appMod.initializeApp(cfg.firebaseConfig);
  auth = authMod.getAuth(fbApp);

  // جلسة Firebase هي المخزن، لا حالة التطبيق.
  try { await authMod.setPersistence(auth, authMod.browserLocalPersistence); } catch (e) {}

  // يُكمل مسار التحويل إن رجع المستخدم منه.
  try { await authMod.getRedirectResult(auth); }
  catch (e) { view.error = errorMessage((e && e.code) || ""); }

  authMod.onAuthStateChanged(auth, function (user) {
    view.user = user || null;
    view.phase = user ? "signedIn" : "signedOut";
    view.busy = false;
    render();
  }, function (e) {
    view.phase = "signedOut";
    view.error = errorMessage((e && e.code) || "");
    render();
  });

  // مساران للدخول: تحميل كامل يمر بـ navigate()، والتنقل داخل الصفحة
  // يمر بمستمع hashchange الذي سجّله app.js على المرجع الأصلي.
  var prev = window.navigate;
  window.navigate = function () {
    if (typeof prev === "function") prev.apply(this, arguments);
    setTimeout(mount, 0);
  };
  window.addEventListener("hashchange", function () { setTimeout(mount, 0); });
  setTimeout(mount, 0);
})();
