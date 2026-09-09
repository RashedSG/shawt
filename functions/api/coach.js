/* شوط — المدرب: دالة وسيطة تحمل مفتاح API بعيداً عن المتصفح.
   Cloudflare Pages Function → المسار /api/coach
   المفتاح يُقرأ من متغير البيئة ANTHROPIC_API_KEY في لوحة الاستضافة.

   المبدأ: المدرب يشرح الأرقام التي حسبها التطبيق، ولا يحسبها من جديد.
   بوابة السلامة تُشتق هنا من الحقول الخام، لا من راية يرسلها المتصفح. */

import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-opus-5";
const MAX_QUESTION = 600;   // حرف
const MAX_TURNS = 12;       // رسالة في السجل

/* بوابة السلامة — مرآة safetyGate() و clearanceStillValid() في app.js.
   تُشتق من الحقول الخام حتى لا تُتجاوز بتعديل الراية في المتصفح. */
function deriveGate(q, clearanceConfirmedAt) {
  const cardiacReported = q.cardiacFlag === "true";
  const clearedAtIntake = q.cardiacClearance === "true";
  let clearanceValid = false;
  if (clearanceConfirmedAt) {
    const age = (Date.now() - new Date(clearanceConfirmedAt).getTime()) / 86400000;
    clearanceValid = age < 365;
  }
  const cardiacLocked = cardiacReported && !clearedAtIntake && !clearanceValid;
  const intensityCeiling =
    !cardiacLocked && (q.goal === "race" || q.goal === "time") ? "mid" : "low";
  return { cardiacReported, cardiacLocked, intensityCeiling };
}

const RULES_AR = `أنت مدرب تحمّل في تطبيق "شوط" للإمارات. تشرح أرقام المستخدم، ولا تخترعها.

قواعد ملزمة:
- الأرقام في "حالة المستخدم" حسبها التطبيق بمعادلات ثابتة (كوبر 1968 للمناطق، ونموذج لياقة-تعب على طريقة Banister للحمل). اقرأها كما هي. لا تعيد حسابها، ولا تقترح إيقاعاً أو حملاً برقم من عندك.
- إذا سُئلت عن رقم غير موجود في الحالة، قل إن التطبيق لم يحسبه بعد ووجّه المستخدم للاختبار الميداني أو التقييم.
- لا تشخّص، ولا تصف دواء، ولا تفسّر عرضاً طبياً. ألم الصدر أو الدوار أو ضيق النفس غير المعتاد = توقف وراجع مختصاً، بلا استثناء.
- سقف الشدة في الحالة ملزم. إذا كان القفل القلبي مفعّلاً فلا تقترح زيادة شدة أو مسافة أو اختباراً أقصوياً مهما كان الإلحاح، واذكر مراجعة المختص بجملة واحدة هادئة.
- الحر ثانوي: يعدّل توقيت الشوط ومكانه، لا يلغي الخطة.

الأسلوب:
- عربية فصيحة واضحة. من ثلاث إلى ست جمل. بلا عناوين ولا قوائم إلا إذا طُلبت خطوات.
- خاطب المستخدم مباشرة. اربط جوابك برقمه هو، لا بنصيحة عامة.
- لا تكرر الأرقام كلها؛ اذكر ما يخدم السؤال فقط.`;

const RULES_EN = `You are an endurance coach inside "Shawt", a UAE training app. You explain the user's numbers; you do not invent them.

Binding rules:
- The figures under "User state" were computed by the app with fixed formulas (Cooper 1968 for pace zones, a Banister-style fitness-fatigue model for load). Read them as given. Never recompute them, and never propose a pace or load figure of your own.
- If asked about a number not present in the state, say the app has not computed it yet and point to the field test or the assessment.
- Do not diagnose, prescribe, or interpret a medical symptom. Chest pain, dizziness, or unusual breathlessness = stop and see a specialist, without exception.
- The intensity ceiling in the state is binding. If the cardiac lock is on, never suggest more intensity, more distance, or a maximal test however insistent the question, and mention seeing a specialist once, calmly.
- Heat is secondary: it shifts when and where a session happens, it does not cancel the plan.

Style:
- Clear English. Three to six sentences. No headings or lists unless steps were asked for.
- Address the user directly. Anchor the answer in their number, not in general advice.
- Do not restate every figure; cite only what serves the question.`;

function buildStateBlock(s, gate, ar) {
  const L = [];
  const n = (v) => (v === null || v === undefined ? "—" : v);
  if (ar) {
    L.push(`المدينة: ${n(s.city)} · الهدف: ${n(s.goal)} · الرياضة: ${n(s.sport)} · ساعات الأسبوع: ${n(s.hours)}`);
    L.push(`الجاهزية: ${n(s.readinessScore)}/100 (${n(s.readinessBand)}) — ${n(s.readinessMsg)}`);
    L.push(`اللياقة: ${n(s.fitness)} · التعب: ${n(s.fatigue)} · الفارق: ${n(s.form)} · حمل ٧ أيام: ${n(s.load7)}`);
    L.push(`سقف الشدة: ${gate.intensityCeiling === "low" ? "منخفض" : "متوسط"} · القفل القلبي: ${gate.cardiacLocked ? "مفعّل" : "غير مفعّل"}`);
    if (s.zones) L.push(`مناطق الإيقاع من كوبر: سهل ${s.zones.easy} · متوسط ${s.zones.moderate} · صعب ${s.zones.hard}`);
    else L.push(`مناطق الإيقاع: لم يُسجَّل اختبار كوبر بعد.`);
    if (s.heatLevel != null) L.push(`مستوى الحر الآن: ${s.heatLevel} من ٥`);
    L.push(`التزام الأسبوع: ${n(s.doneCount)} من ${n(s.weekCount)} شوط`);
    if (s.todayLabel) L.push(`شوط اليوم في الخطة: ${s.todayLabel}`);
    if (s.medical && s.medical.length) L.push(`ملاحظات صحية مسجّلة: ${s.medical.join("، ")}`);
    if (s.ramadan) L.push(`صائم في رمضان: نعم`);
  } else {
    L.push(`City: ${n(s.city)} · Goal: ${n(s.goal)} · Sport: ${n(s.sport)} · Hours/week: ${n(s.hours)}`);
    L.push(`Readiness: ${n(s.readinessScore)}/100 (${n(s.readinessBand)}) — ${n(s.readinessMsg)}`);
    L.push(`Fitness: ${n(s.fitness)} · Fatigue: ${n(s.fatigue)} · Form: ${n(s.form)} · 7-day load: ${n(s.load7)}`);
    L.push(`Intensity ceiling: ${gate.intensityCeiling} · Cardiac lock: ${gate.cardiacLocked ? "ON" : "off"}`);
    if (s.zones) L.push(`Cooper pace zones: easy ${s.zones.easy} · moderate ${s.zones.moderate} · hard ${s.zones.hard}`);
    else L.push(`Pace zones: no Cooper test recorded yet.`);
    if (s.heatLevel != null) L.push(`Current heat level: ${s.heatLevel} of 5`);
    L.push(`Week compliance: ${n(s.doneCount)} of ${n(s.weekCount)} bouts`);
    if (s.todayLabel) L.push(`Today's planned bout: ${s.todayLabel}`);
    if (s.medical && s.medical.length) L.push(`Recorded health notes: ${s.medical.join(", ")}`);
    if (s.ramadan) L.push(`Fasting in Ramadan: yes`);
  }
  return L.join("\n");
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost({ request, env }) {
  // نفس الأصل فقط — يمنع استخدام الوسيط من مواقع أخرى.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json(403, { error: "cross_origin" });
  }
  if (!env.ANTHROPIC_API_KEY) return json(500, { error: "missing_key" });

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "bad_json" });
  }

  const ar = body.lang !== "en";
  const question = String(body.question || "").trim().slice(0, MAX_QUESTION);
  if (!question) return json(400, { error: "empty_question" });

  const snap = body.snapshot && typeof body.snapshot === "object" ? body.snapshot : {};
  const gate = deriveGate(snap.q || {}, snap.clearanceConfirmedAt);

  const history = Array.isArray(body.history) ? body.history.slice(-MAX_TURNS) : [];
  const messages = history
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  const stateBlock = buildStateBlock(snap, gate, ar);
  const header = ar ? "حالة المستخدم" : "User state";
  messages.push({
    role: "user",
    content: `<${header}>\n${stateBlock}\n</${header}>\n\n${question}`,
  });

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    // مهمة شرح قصيرة — جهد منخفض مع إبقاء التفكير التكيّفي على وضعه الافتراضي.
    output_config: { effort: "low" },
    // احتياط من جانب الخادم إذا رفض النموذج سؤالاً طبي الطابع.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [
      { type: "text", text: ar ? RULES_AR : RULES_EN, cache_control: { type: "ephemeral" } },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  const out = new ReadableStream({
    async start(controller) {
      let wrote = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            wrote = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        if (!wrote) {
          controller.enqueue(
            encoder.encode(
              ar
                ? "ما أقدر أجاوب على هذا السؤال. إذا كان طبياً، راجع مختصاً."
                : "I can't answer that one. If it's medical, please see a specialist."
            )
          );
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            "\n" + (ar ? "انقطع الاتصال. جرّب مرة ثانية." : "The connection dropped. Try again.")
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(out, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
