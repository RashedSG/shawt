/* ==========================================================================
   إعدادات Firebase — استبدل القيم أدناه ببيانات مشروعك.

   من أين تجيبها:
   Firebase Console ← ⚙️ Project settings ← General ← Your apps
   ← Web app (</>) ← SDK setup and configuration ← Config

   ملاحظة أمنية: هذه القيم ليست أسراراً. مفتاح الويب (apiKey) مُعرِّف
   للمشروع لا كلمة مرور، وهو مكشوف في أي تطبيق ويب بالتصميم. الحماية
   الفعلية تأتي من "النطاقات المصرّح بها" (Authorized domains) وقواعد
   الأمان — لا من إخفاء هذا الملف.

   لا تضع هنا أبداً: مفتاح Service Account، أو private_key، أو أي بيانات
   اعتماد Firebase Admin SDK. تلك تُستخدم على خادم فقط، ولا مكان لها في
   المتصفح ولا في مستودع عام.
   ========================================================================== */

export const firebaseConfig = {
  apiKey: "REPLACE_API_KEY",
  authDomain: "REPLACE_PROJECT.firebaseapp.com",
  projectId: "REPLACE_PROJECT_ID",
  storageBucket: "REPLACE_PROJECT.appspot.com",
  messagingSenderId: "REPLACE_SENDER_ID",
  appId: "REPLACE_APP_ID"
};

/* ما دامت القيم بديلة، تبقى ميزة الحساب مخفية تماماً ولا تظهر للزوار.
   بمجرد تعبئة القيم الحقيقية تظهر بطاقة تسجيل الدخول من نفسها. */
export function isConfigured() {
  return Object.values(firebaseConfig).every(
    (v) => typeof v === "string" && v.length > 0 && !v.startsWith("REPLACE")
  );
}
