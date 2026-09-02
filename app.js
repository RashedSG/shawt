/* شوط (Shawṭ) complete edition — safety gate first, then plan / load / feed.
   Load model is Banister-style fitness-fatigue (public), not TrainingPeaks TSS.
   Zones: Talk Test or Cooper 1968. No proprietary copy of TriDot / TP / Garmin / Whoop. */

const ICON_PATHS = {
  home:`<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>`,
  calendar:`<rect x="3.5" y="5" width="17" height="15" rx="2"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>`,
  calendarCheck:`<rect x="3.5" y="5" width="17" height="15" rx="2"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><path d="M8.5 14.7l2.1 2 4.2-4.4"/>`,
  clipboard:`<rect x="6" y="4" width="12" height="16" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><line x1="8.5" y1="10.2" x2="15.5" y2="10.2"/><line x1="8.5" y1="13.7" x2="15.5" y2="13.7"/>`,
  users:`<circle cx="8.5" cy="8" r="3"/><path d="M3.5 19c0-3.3 2.3-5.5 5-5.5s5 2.2 5 5.5"/><circle cx="16.7" cy="9" r="2.3"/><path d="M14.8 13.9c2.1.4 3.7 2.2 3.7 5.1"/>`,
  user:`<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3"/>`,
  sun:`<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="19.1" y2="4.9"/>`,
  moon:`<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5Z"/>`,
  run:`<path d="M3 16.7c0-1 .5-1.7 1.4-2.1l4-1.6c.5-.2.8-.6.8-1.1V9.6c0-.6.5-1 1-.8l3.2 1.2c1 .4 2 .6 3 .6H20"/><circle cx="15.5" cy="4.7" r="1.7"/>`,
  swim:`<path d="M2.5 12.3c1.6-1.5 3.2-1.5 4.8 0s3.2 1.5 4.8 0 3.2-1.5 4.8 0 3.2 1.5 4.8 0"/><path d="M2.5 17c1.6-1.5 3.2-1.5 4.8 0s3.2 1.5 4.8 0 3.2-1.5 4.8 0 3.2 1.5 4.8 0"/><circle cx="9.5" cy="6.3" r="1.7"/>`,
  bike:`<circle cx="6" cy="17" r="3.2"/><circle cx="18" cy="17" r="3.2"/><path d="M6 17l4-9.3h3l-2.2 4.3h4.4l2.8 5"/>`,
  tri:`<circle cx="12" cy="5.3" r="2"/><circle cx="5.5" cy="17.5" r="2"/><circle cx="18.5" cy="17.5" r="2"/><path d="M12 7.3l-5.4 8.6M12 7.3l5.4 8.6M8 17.5h8"/>`,
  shoe:`<path d="M3 16.6c0-1 .5-1.7 1.4-2.1l4-1.6c.5-.2.8-.6.8-1.1V9.5c0-.6.5-1 1-.8l3.2 1.2c1 .4 2 .6 3 .6H20c.6 0 1 .5 1 1v1.9c0 1.7-1.4 3.1-3.1 3.1H4.3c-.7 0-1.3.3-1.3.3Z"/>`,
  goggles:`<circle cx="7.6" cy="12" r="3.3"/><circle cx="16.4" cy="12" r="3.3"/><line x1="10.6" y1="11.2" x2="13.4" y2="11.2"/>`,
  suit:`<path d="M8.2 3h7.6l1 4.2-2.9 1V21H10V8.2l-2.9-1Z"/>`,
  cap:`<path d="M4 14.2a8 8 0 0 1 16 0"/><line x1="3" y1="14.2" x2="21" y2="14.2"/>`,
  bottle:`<rect x="9" y="9" width="6" height="12" rx="2"/><rect x="10" y="4" width="4" height="5" rx="1"/>`,
  medal:`<circle cx="12" cy="15" r="4.6"/><path d="M9 11 7 3h3l2 5.3L14 3h3l-2 8"/>`,
  clock:`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  mapPin:`<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>`,
  ruler:`<rect x="9" y="2.5" width="6" height="19" rx="1.2"/>`,
  scale:`<circle cx="12" cy="13.5" r="7"/><path d="M12 13.5 15 10"/>`,
  droplet:`<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z"/>`,
  flag:`<line x1="5" y1="21" x2="5" y2="4"/><path d="M5 5h13l-3 3.5L18 12H5"/>`,
  heart:`<path d="M12 20s-7-4.5-9-9.5C1.5 6 4 3 7 3c2 0 3.5 1.3 5 3.3C13.5 4.3 15 3 17 3c3 0 5.5 3 4 7.5-2 5-9 9.5-9 9.5Z"/>`,
  stopwatch:`<circle cx="12" cy="13" r="8"/><line x1="12" y1="13" x2="12" y2="9"/>`,
  trendUp:`<polyline points="4,17 10,11 14,15 20,7"/><polyline points="14,7 20,7 20,13"/>`,
  shield:`<path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6Z"/>`,
  alertTriangle:`<path d="M12 4 21 19H3Z"/><line x1="12" y1="9.5" x2="12" y2="14"/><circle cx="12" cy="16.7" r="0.9" fill="currentColor" stroke="none"/>`,
  checkCircle:`<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.3l2.4 2.4 5-5.4"/>`,
  xCircle:`<circle cx="12" cy="12" r="8.5"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>`,
  info:`<circle cx="12" cy="12" r="8.5"/><line x1="12" y1="11" x2="12" y2="16.5"/><circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none"/>`,
  lock:`<rect x="5.5" y="10.5" width="13" height="9" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>`,
  stethoscope:`<path d="M6 4v6a4 4 0 0 0 8 0V4"/><path d="M18 10v3a5 5 0 0 1-10 0"/><circle cx="19" cy="9" r="1.6"/>`,
  strength:`<line x1="3" y1="12" x2="21" y2="12"/><rect x="4" y="8.5" width="3.2" height="7" rx="1"/><rect x="16.8" y="8.5" width="3.2" height="7" rx="1"/>`,
  brick:`<circle cx="5.6" cy="17.2" r="2.6"/><path d="M5.6 17.2 9 10.5h2.6"/><circle cx="16.6" cy="4.9" r="1.6"/><path d="M11.4 20.5 14 15.6l2.6 1.5L20 12.8"/>`,
  mobility:`<circle cx="12" cy="4.6" r="1.8"/><path d="M12 6.8v6.4M7.6 20 12 13.2 16.4 20M7 10.4h10"/>`,
  race:`<line x1="5" y1="21" x2="5" y2="4"/><path d="M5 5h13l-3 3.5L18 12H5"/>`,
};
function icon(name,size){ size=size||20; return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON_PATHS[name]||''}</svg>`; }
function applyStaticIcons(){ document.querySelectorAll('[data-icon]').forEach(el=>{ el.innerHTML = icon(el.dataset.icon, el.dataset.iconSize?+el.dataset.iconSize:18); }); }

const STORE_KEY = 'shawt.v3';
const LEGACY_KEYS = ['trigulf.v2'];
const defaultState = () => ({
  lang:'ar', theme:'dark', qStep:1,
  q:{ height:null, weight:null, city:'Abu Dhabi', goal:null, sport:null, hours:4,
      medical:[], cardiacFlag:null, cardiacClearance:null, allergens:[], allergySeverity:{},
      sleep:null, ramadan:null, cooperDistanceM:null, completed:false },
  clearanceConfirmed:false, clearanceConfirmedAt:null,
  womensHealthEnabled:false, accountTab:'profile', communityTab:'feed',
  weekOffset:0,
  planned:[],
  activities:[],
  kudos:{},
  follows:['sara_ad','omar_dxb','noura_ruh'],
  joinedEvents:[],
  eventCity:'all',
});

let state = defaultState();
function persist(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} }
function loadState(){
  try{
    let raw = localStorage.getItem(STORE_KEY);
    let migrated = false;
    if(!raw){
      for(const k of LEGACY_KEYS){
        const old = localStorage.getItem(k);
        if(old){ raw = old; migrated = true; break; }
      }
    }
    if(!raw) return;
    const s = JSON.parse(raw);
    state = Object.assign(defaultState(), s);
    state.q = Object.assign(defaultState().q, s.q||{});
    if(migrated){ state.planned = []; persist(); }
  }catch(e){}
}

const T = {
  ar:{
    brand:"شوط",
    nav_home:"الرئيسية", nav_how:"كيف تعمل", nav_plan:"خطتي", nav_nutrition:"التغذية",
    nav_equipment:"المعدات", nav_routes:"المسارات", nav_community:"المجتمع", nav_specialist:"أخصائي",
    nav_q:"التقييم", nav_account:"حسابي", nav_dash:"لوحة التحكم", nav_act:"الأنشطة", nav_events:"الفعاليات", nav_progress:"تقدمي", nav_aware:"الوعي", nav_climate:"الطقس والصيام", nav_supp:"المكملات",
    cta_start:"ابدأ التقييم", foot_legal:"الشروط والخصوصية", foot_specialist:"أخصائي", foot_account:"حسابي",
    hero_eyebrow:"منصة أداء للإمارات: أبوظبي إلى الفجيرة والقرى",
    hero_title:"أداء، حافز، وفعالية — الخطة تخدم الرقم لا العكس",
    hero_lead:"سجّل تنوعاً: جري، سباحة، دراجة، قوّة، تمرين مزدوج، وفعاليات خليجية. الأمان بوابة، والأداء هو المركز. مو تشخيص طبي.",
    vision_eyebrow:"الرؤية",
    vision_title:"رياضة خليجية واعية: نبدأ بالأمان، نكمّل بالعلم، ونحترم المناخ والجسم",
    vision_body:"نؤمن إن أول سباق أو أول كيلومتر ما يستاهل مخاطرة. المنصة تعلّم قبل ما توجّه، وتوضح القيد قبل الرقم، وتربطك بمختص بدل ما تتظاهر إنها طبيب.",
    aware_title:"مفاهيم توعوية",
    aware_sub:"محتوى تعليمي عام — لا يغني عن استشارة مختص ولا يُعد تشخيصاً",
    aware_read:"اقرأ المفهوم",
    aware_back:"رجوع للوعي",

    hero_cta1:"ابدأ تقييمك الآن", hero_cta2:"كيف تعمل المنصة",
    trust1:"لا تشخيص طبي", trust2:"استبعاد صارم للحساسية الشديدة", trust3:"حمل تدريبي شفاف",
    how_eyebrow:"العملية", how_title:"كيف تعمل المنصة",
    how1_t:"تقييم آمن", how1_d:"فحص قلبي وحساسية قبل أي شدة.",
    how2_t:"تقويم أسبوعي", how2_d:"جلسات حسب رياضتك وساعاتك، مع سقف شدة.",
    how3_t:"حمل لياقة وإرهاق", how3_d:"نموذج Banister العلني: لياقة أبطأ، إرهاق أسرع — مو نسخ TSS.",
    how4_t:"سجل ومسارات", how4_d:"تسجيل نشاط، إعجابات، ومسار لا يتجاوز 125٪ من مسافة التمرين.",
    how_engine_title:"من أين تأتي الأرقام",
    how_engine_body:"النطاقات من اختبار الكلام أو اختبار Cooper 1968. الحمل = الزمن × معامل الشدة. اللياقة متوسط 42 يوم والإرهاق 7 أيام. الحر يزيد الوقت المتوقع مو رقم مختلق.",
    how_no_copy:"لا ننسخ خوارزميات TriDot أو TrainingPeaks أو Garmin أو Whoop أو Oura.",
    q_title:"التقييم الآمن", q_step_of:"سؤال {n} من {total}",
    q_height_h:"وش طولك؟", q_height_sub:"بالسنتيمتر", q_weight_h:"وش وزنك؟", q_weight_sub:"بالكيلوغرام",
    q_city_h:"وش مدينتك؟", q_goal_h:"وش هدفك الرياضي؟",
    goal_fit:"لياقة عامة", goal_race:"إكمال أول سباق", goal_time:"تحسين وقتي",
    q_sport_h:"وش الرياضة المستهدفة؟", sport_run:"الجري", sport_swim:"السباحة", sport_bike:"الدراجات", sport_tri:"التراياثلون",
    sport_brick:"تمرين مزدوج", sport_strength:"القوة", sport_race:"سباق", sport_mobility:"حركة ومرونة",
    q_hours_h:"كم ساعة متاحة لك أسبوعياً؟",
    q_medical_h:"هل عندك أي من هذي الحالات؟", q_medical_sub:"اختياري — اختر كل ما ينطبق",
    med_none:"لا شي", med_diabetes:"سكري", med_asthma:"ربو", med_joint:"مشاكل مفاصل", med_other:"أخرى",
    q_cardiac_h:"هل شعرت بألم صدر أو إغماء أثناء أو بعد مجهود بدني؟",
    q_cardiac_sub:"الإجابة تحدد نقطة بداية الخطة فقط",
    yes:"نعم", no:"لا",
    q_cardiac_err:"لازم تجاوب قبل التكملة",
    q_cardiac_followup_h:"هل عندك موافقة طبية خلال آخر 12 شهر؟",
    q_cardiac_followup_sub:"معيار PAR-Q+ — الموافقة ترفع السقف المؤقت",
    q_cardiac_followup_err:"لازم تجاوب قبل التكملة",
    q_allergens_h:"عندك أي حساسية غذائية؟", q_allergens_sub:"اختر كل ما ينطبق",
    all_nuts:"مكسرات", all_shellfish:"محار وقشريات", all_gluten:"غلوتين", all_dairy:"ألبان", all_none:"لا شي",
    q_severity_h:"وش شدة رد فعلك المعتاد؟", q_severity_sub:"إجباري لكل حساسية",
    sev_mild:"خفيف", sev_moderate:"متوسط", sev_severe:"شديد — استبعاد كامل",
    q_severity_err:"حدد الشدة لكل حساسية",
    q_sleep_h:"كم ساعة تنام تقريباً بالليلة؟",
    sleep_lt5:"أقل من 5", sleep_5_6:"5 إلى 6", sleep_7_8:"7 إلى 8", sleep_8plus:"أكثر من 8",
    q_ramadan_h:"هل تصوم رمضان حالياً أو قريباً؟",
    q_back:"السابق", q_next:"التالي", q_finish:"اعرض ملخص خطتي",
    sum_title:"ملخص التقييم", sum_sub:"كل قيد أمان انطبق على خطتك",
    sum_cardiac_locked:"بنبدأك بشدة منخفضة مؤقتاً لين موافقة مختص",
    sum_cardiac_cleared:"عرض قلبي مع موافقة سارية — بداية معتادة",
    sum_cardiac_ok:"لا يوجد عرض قلبي مُبلَّغ عنه",
    sum_allergy_locked:"استبعاد صارم من التغذية: ",
    sum_allergy_ok:"لا يوجد حساسية شديدة",
    sum_ramadan_note:"الشدة العالية بعد الإفطار",
    sum_cta:"الذهاب لخطتي",
    disclaimer_text:"هذا التقييم ليس تشخيصاً طبياً. العرض القلبي يخفض الشدة وينصح بمراجعة مختص.",
    plan_title:"خطتي الأسبوعية", plan_no_data:"أكمل التقييم أول عشان نبني خطتك",
    plan_go_q:"ابدأ التقييم", plan_intensity:"سقف الشدة", intensity_low:"منخفضة", intensity_mid:"معتادة",
    plan_reason_cardiac:"مؤقت لين موافقة المختص", plan_reason_none:"بدون قيود صحية إضافية",
    plan_zones_title:"نطاقات شدتك", plan_zones_source_test:"مبنية على اختبار Cooper",
    plan_zones_source_talk:"نطاقات اختبار الكلام — لين تسوي اختبار حقيقي",
    zone_easy:"سهل", zone_moderate:"متوسط", zone_hard:"صعب",
    zone_easy_desc:"تقدر تكمل جملة وأنت تتمرن", zone_moderate_desc:"جمل قصيرة فقط", zone_hard_desc:"كلمة أو كلمتين",
    plan_heat_note:"بالحر الشديد توقع وقت أطول بنفس الجهد",
    cooper_cta:"مسافة اختبار Cooper (12 دقيقة)", cooper_input_label:"المتر", cooper_calc:"احسب نطاقاتي",
    pt_zone:"النطاق", pt_pace:"الوتيرة / الوصف",
    plan_constraints_title:"القيود المطبّقة", plan_ramadan_applied:"رمضان: الشدة العالية بعد الإفطار",
    plan_specialist_cta:"مراجعة مختص", plan_clearance_cta:"أكّد الموافقة من حسابي",
    nutr_title:"التغذية", nutr_excl_note:"تم استبعاد {n} عنصر لحساسية شديدة", nutr_no_excl:"لا يوجد عناصر مستبعدة",
    equip_title:"المعدات", equip_size:"المقاس المقترح", equip_for_sport:"معدات رياضتك", equip_other:"معدات أخرى",
    routes_title:"المسارات والقطاعات", routes_target:"مسافة تمرين اليوم",
    routes_cost:"درجة التطابق", routes_excluded:"مستبعد — فرق مسافة كبير",
    routes_rule_note:"أي مسار أطول من التمرين بأكثر من 25٪ يُستبعد.",
    routes_city_match:"بمدينتك", routes_no_city_match:"أكمل التقييم لترجيح مدينتك",
    comm_title:"المجتمع", comm_tab_challenges:"التحديات", comm_tab_forum:"المنتدى", comm_tab_events:"فعاليات", comm_tab_feed:"الخلاصة",
    comm_join:"انضم", comm_participants:"مشارك",
    spec_title:"أخصائي", spec_sub:"إحالة لمختص مرخّص — مو استشارة داخل المنصة",
    spec_cardio:"طبيب قلب رياضي", spec_allergy:"أخصائي حساسية وربو", spec_sports_med:"طبيب طب رياضي",
    spec_find:"دلّني على أقرب مختص", spec_disclaimer:"شوط لا يقدّم تشخيصاً أو علاجاً.",
    acc_title:"حسابي", acc_tab_profile:"ملخص ملفي", acc_tab_settings:"الإعدادات", acc_tab_privacy:"الخصوصية والبيانات",
    acc_lang:"اللغة", acc_theme:"المظهر", acc_theme_light:"فاتح", acc_theme_dark:"داكن",
    acc_womens_health:"تفعيل قسم صحة المرأة (خاص)",
    acc_womens_health_sub:"قسم منفصل وغير ظاهر للعامة",
    acc_womens_health_link:"فتح قسم صحة المرأة",
    acc_export:"تصدير بياناتي", acc_delete:"حذف حسابي", acc_no_profile:"ما أكملت التقييم بعد",
    acc_clearance_toggle:"أكّد موافقة مختص للنشاط البدني",
    acc_clearance_sub:"تصديق ذاتي (PAR-Q+) صالح 12 شهر", acc_clearance_valid:"سارية حتى",
    wh_title:"صحة المرأة (خاص)", wh_note:"خاص بالكامل، ما يظهر بالبروفايل العام.", wh_back:"رجوع للحساب",
    legal_title:"الشروط والخصوصية",
    legal_data_h:"تصنيف البيانات", legal_data_b:"بيانات القلب والحساسية وصحة المرأة حسّاسة ومعزولة منطقياً على جهازك (حفظ محلي).",
    legal_diag_h:"إخلاء مسؤولية طبية", legal_diag_b:"لا تشخيص ولا استشارة طبية. القيود مبنية على إجاباتك.",
    legal_analytics_h:"النماذج المستخدمة", legal_analytics_b:"Cooper 1968، Talk Test، ونموذج Banister للياقة/الإرهاق. ليست خوارزميات تجارية.",
    legal_ip_h:"الملكية الفكرية", legal_ip_b:"لا ننسخ منطق TriDot أو TrainingPeaks أو Whoop أو Garmin أو Oura.",
    dash_title:"لوحة التحكم", dash_ready:"الجاهزية اليوم", dash_energy:"الطاقة",
    dash_load:"حمل 7 أيام", dash_fit:"اللياقة", dash_fat:"الإرهاق", dash_form:"الفورمة",
    dash_today:"تمرين اليوم", dash_pmc:"الحمل اليومي (14 يوم)",
    dash_need_q:"سوّ التقييم عشان تظهر لوحة التحكم",
    ready_locked:"الجاهزية منخفضة بسبب قفل الأمان",
    ready_tired:"الإرهاق أعلى من اللياقة — يوم سهل أو راحة",
    ready_go:"جسمك جاهز لشدة خطتك",
    act_title:"الأنشطة", act_add:"سجّل نشاط", act_empty:"ما في أنشطة بعد. سجّل من هنا أو علّم جلسة من الخطة.",
    act_km:"المسافة (كم)", act_min:"الدقائق", act_rpe:"الجهد 1–10", act_save:"حفظ النشاط",
    act_sport:"الرياضة", kudos:"إعجاب",
    mark_done:"تم", marked:"مكتمل", rest:"راحة",
    week_prev:"الأسبوع السابق", week_next:"الأسبوع الجاي",
    compliance:"الالتزام",
    seg_title:"قطاعات المسار",
    feed_you:"أنت",
    chip_post_iftar:"بعد الإفطار",
    med_note_asthma:"ذكرت الربو: إحماء أطول قبل الشدة، وخطة الدواء من طبيبك لا من التطبيق.",
    med_note_joint:"ذكرت مشاكل مفاصل: بدائل أقل صدمة (سباحة أو دراجة) تنفع بدل جلسة جري صعبة.",
    med_note_diabetes:"ذكرت السكري: الصيام مع التمرين قرار طبي — راجع مختصك قبل الجلسات الطويلة.",
  },
  en:{
    brand:"Shawṭ",
    nav_home:"Home", nav_how:"How it works", nav_plan:"My Plan", nav_nutrition:"Nutrition",
    nav_equipment:"Equipment", nav_routes:"Routes", nav_community:"Community", nav_specialist:"Specialist",
    nav_q:"Assessment", nav_account:"Account", nav_dash:"Dashboard", nav_act:"Activities", nav_events:"Events", nav_progress:"Progress", nav_aware:"Awareness", nav_climate:"Weather & fasting", nav_supp:"Supplements",
    cta_start:"Start assessment", foot_legal:"Terms & Privacy", foot_specialist:"Specialist", foot_account:"Account",
    hero_eyebrow:"Safe plan, load, and community",
    hero_title:"Performance, drive, and events — the plan serves the result",
    hero_lead:"Log variety: run, swim, bike, strength, brick, and Gulf events. Safety is the gate; performance is the centre. Not a diagnosis.",
    vision_eyebrow:"Vision",
    vision_title:"Aware Gulf sport: safety first, evidence next, climate and body respected",
    vision_body:"A first race is never worth an avoidable risk. The platform teaches before it prescribes, shows the constraint before the number, and refers to a specialist instead of pretending to be a clinic.",
    aware_title:"Awareness concepts",
    aware_sub:"General education — not a diagnosis and not a substitute for a clinician",
    aware_read:"Read the concept",
    aware_back:"Back to awareness",

    hero_cta1:"Start your assessment", hero_cta2:"How the platform works",
    trust1:"No medical diagnosis", trust2:"Hard exclusion for severe allergies", trust3:"Transparent training load",
    how_eyebrow:"The process", how_title:"How the platform works",
    how1_t:"Safe assessment", how1_d:"Cardiac and allergy checks before intensity.",
    how2_t:"Weekly calendar", how2_d:"Sessions matched to sport and hours, with an intensity cap.",
    how3_t:"Fitness and fatigue", how3_d:"Public Banister model — not a copy of TSS.",
    how4_t:"Log and routes", how4_d:"Log activities, kudos, and exclude routes >125% of workout distance.",
    how_engine_title:"Where the numbers come from",
    how_engine_body:"Zones from the Talk Test or Cooper 1968. Load = minutes × intensity factor. Fitness ~42-day and fatigue ~7-day averages. Heat adds time, not a fake multiplier.",
    how_no_copy:"We do not copy TriDot, TrainingPeaks, Garmin, Whoop, or Oura algorithms.",
    q_title:"Safe Assessment", q_step_of:"Question {n} of {total}",
    q_height_h:"What's your height?", q_height_sub:"In centimeters", q_weight_h:"What's your weight?", q_weight_sub:"In kilograms",
    q_city_h:"What's your city?", q_goal_h:"What's your sport goal?",
    goal_fit:"General fitness", goal_race:"Finish my first race", goal_time:"Improve my time",
    q_sport_h:"Which sport?", sport_run:"Running", sport_swim:"Swimming", sport_bike:"Cycling", sport_tri:"Triathlon",
    sport_brick:"Brick", sport_strength:"Strength", sport_race:"Race", sport_mobility:"Mobility",
    q_hours_h:"Hours per week?",
    q_medical_h:"Any of these conditions?", q_medical_sub:"Optional — select all that apply",
    med_none:"None", med_diabetes:"Diabetes", med_asthma:"Asthma", med_joint:"Joint issues", med_other:"Other",
    q_cardiac_h:"Chest pain or fainting during or after exertion?",
    q_cardiac_sub:"Sets your plan starting point only",
    yes:"Yes", no:"No", q_cardiac_err:"You must answer before continuing",
    q_cardiac_followup_h:"Medical clearance in the last 12 months?",
    q_cardiac_followup_sub:"PAR-Q+ — clearance lifts the temporary cap",
    q_cardiac_followup_err:"You must answer before continuing",
    q_allergens_h:"Any food allergies?", q_allergens_sub:"Select all that apply",
    all_nuts:"Nuts", all_shellfish:"Shellfish", all_gluten:"Gluten", all_dairy:"Dairy", all_none:"None",
    q_severity_h:"How severe is the typical reaction?", q_severity_sub:"Required for every allergy",
    sev_mild:"Mild", sev_moderate:"Moderate", sev_severe:"Severe — hard exclude",
    q_severity_err:"Set a severity for every allergy",
    q_sleep_h:"Hours of sleep per night?",
    sleep_lt5:"Less than 5", sleep_5_6:"5 to 6", sleep_7_8:"7 to 8", sleep_8plus:"More than 8",
    q_ramadan_h:"Observing Ramadan now or soon?",
    q_back:"Back", q_next:"Next", q_finish:"Show my plan summary",
    sum_title:"Assessment Summary", sum_sub:"Every safety constraint on your plan",
    sum_cardiac_locked:"Low intensity until specialist clearance",
    sum_cardiac_cleared:"Reported symptom with valid clearance — normal start",
    sum_cardiac_ok:"No reported cardiac symptom",
    sum_allergy_locked:"Hard exclusion from nutrition: ",
    sum_allergy_ok:"No severe allergy reported",
    sum_ramadan_note:"High intensity after iftar",
    sum_cta:"Go to my plan",
    disclaimer_text:"Not a medical diagnosis. A cardiac flag caps intensity; see a specialist.",
    plan_title:"My weekly plan", plan_no_data:"Complete the assessment first",
    plan_go_q:"Start assessment", plan_intensity:"Intensity cap", intensity_low:"Low", intensity_mid:"Normal",
    plan_reason_cardiac:"Temporary, pending clearance", plan_reason_none:"No extra health constraints",
    plan_zones_title:"Your intensity zones", plan_zones_source_test:"Based on Cooper test",
    plan_zones_source_talk:"Talk Test zones until a real test",
    zone_easy:"Easy", zone_moderate:"Moderate", zone_hard:"Hard",
    zone_easy_desc:"Full conversation", zone_moderate_desc:"Short sentences", zone_hard_desc:"A word or two",
    plan_heat_note:"In severe heat expect longer times at the same effort",
    cooper_cta:"Cooper test distance (12 min)", cooper_input_label:"meters", cooper_calc:"Calculate zones",
    pt_zone:"Zone", pt_pace:"Pace / description",
    plan_constraints_title:"Constraints applied", plan_ramadan_applied:"Ramadan: high intensity after iftar",
    plan_specialist_cta:"See a specialist", plan_clearance_cta:"Confirm clearance in account",
    nutr_title:"Nutrition", nutr_excl_note:"{n} item(s) hard-excluded", nutr_no_excl:"No items excluded",
    equip_title:"Equipment", equip_size:"Suggested size", equip_for_sport:"Gear for your sport", equip_other:"Other gear",
    routes_title:"Routes & segments", routes_target:"Today's workout distance",
    routes_cost:"Match score", routes_excluded:"Excluded — distance gap too large",
    routes_rule_note:"Any route more than 25% over workout distance is excluded.",
    routes_city_match:"in your city", routes_no_city_match:"Complete the assessment to prioritize your city",
    comm_title:"Community", comm_tab_challenges:"Challenges", comm_tab_forum:"Forum", comm_tab_events:"Events", comm_tab_feed:"Feed",
    comm_join:"Join", comm_participants:"participants",
    spec_title:"Specialist", spec_sub:"Referral to a licensed practitioner — not in-app care",
    spec_cardio:"Sports cardiologist", spec_allergy:"Allergy & asthma specialist", spec_sports_med:"Sports medicine physician",
    spec_find:"Find the nearest specialist", spec_disclaimer:"Shawṭ does not diagnose or treat.",
    acc_title:"Account", acc_tab_profile:"My profile", acc_tab_settings:"Settings", acc_tab_privacy:"Privacy & data",
    acc_lang:"Language", acc_theme:"Theme", acc_theme_light:"Light", acc_theme_dark:"Dark",
    acc_womens_health:"Enable Women's Health (private)",
    acc_womens_health_sub:"Separate and never shown publicly",
    acc_womens_health_link:"Open Women's Health",
    acc_export:"Export my data", acc_delete:"Delete my account", acc_no_profile:"Assessment not completed",
    acc_clearance_toggle:"Confirm specialist clearance to exercise",
    acc_clearance_sub:"Self-attestation (PAR-Q+), valid 12 months", acc_clearance_valid:"Valid until",
    wh_title:"Women's Health (private)", wh_note:"Fully private.", wh_back:"Back to account",
    legal_title:"Terms & Privacy",
    legal_data_h:"Data classification", legal_data_b:"Cardiac, allergy, and women's health data stay on-device.",
    legal_diag_h:"Medical disclaimer", legal_diag_b:"No diagnosis. Flags come from your answers only.",
    legal_analytics_h:"Models used", legal_analytics_b:"Cooper 1968, Talk Test, Banister fitness-fatigue. Not commercial engines.",
    legal_ip_h:"Intellectual property", legal_ip_b:"No copied logic from TriDot, TrainingPeaks, Whoop, Garmin, or Oura.",
    dash_title:"Dashboard", dash_ready:"Readiness today", dash_energy:"Energy",
    dash_load:"7-day load", dash_fit:"Fitness", dash_fat:"Fatigue", dash_form:"Form",
    dash_today:"Today's session", dash_pmc:"Daily load (14 days)",
    dash_need_q:"Complete the assessment to open the dashboard",
    ready_locked:"Readiness low because of the safety lock",
    ready_tired:"Fatigue above fitness — easy day or rest",
    ready_go:"Ready for your planned intensity",
    act_title:"Activities", act_add:"Log activity", act_empty:"No activities yet.",
    act_km:"Distance (km)", act_min:"Minutes", act_rpe:"Effort 1–10", act_save:"Save activity",
    act_sport:"Sport", kudos:"Kudos",
    mark_done:"Done", marked:"Completed", rest:"Rest",
    week_prev:"Previous week", week_next:"Next week",
    compliance:"Compliance",
    seg_title:"Route segments",
    feed_you:"You",
    chip_post_iftar:"After iftar",
    med_note_asthma:"You reported asthma: warm up longer before intensity; your medication plan comes from your clinician.",
    med_note_joint:"You reported joint issues: a lower-impact swap (swim or bike) can replace a hard run.",
    med_note_diabetes:"You reported diabetes: fasting plus training is a clinical decision — check before long sessions.",
  }
};
function t(key){ return (T[state.lang] && T[state.lang][key]) || key; }
function tn(key,n){ return t(key).replace('{n}', n); }

const Q_LAST = 13;
function currentAllergensExclNone(){ return (state.q.allergens||[]).filter(a=>a!=='none'); }
function activeSteps(){
  const steps = [1,2,3,4,5,6,7,8];
  if(state.q.cardiacFlag==='true') steps.push(9);
  steps.push(10);
  if(currentAllergensExclNone().length>0) steps.push(11);
  steps.push(12,13);
  return steps;
}
function stepPosition(step){
  const s = activeSteps(); const i = s.indexOf(step);
  return { index: i<0?0:i, total: s.length, isLast: i===s.length-1 };
}
function nextStepFrom(step){
  const s = activeSteps(); const i = s.indexOf(step);
  return (i<0 || i===s.length-1) ? Q_LAST+1 : s[i+1];
}
function prevStepFrom(step){
  const s = activeSteps(); const i = s.indexOf(step);
  return i<=0 ? s[0] : s[i-1];
}
function clearanceStillValid(){
  if(!state.clearanceConfirmedAt) return false;
  return ((Date.now()-new Date(state.clearanceConfirmedAt).getTime())/86400000) < 365;
}
function safetyGate(){
  const cardiacReported = state.q.cardiacFlag === 'true';
  const clearedAtIntake = state.q.cardiacClearance === 'true';
  const cardiacLocked = cardiacReported && !clearedAtIntake && !clearanceStillValid();
  const severeAllergens = Object.keys(state.q.allergySeverity||{}).filter(a => state.q.allergySeverity[a]==='severe');
  let intensityCeiling = 'low';
  if(!cardiacLocked && (state.q.goal==='race' || state.q.goal==='time')) intensityCeiling = 'mid';
  return { cardiacReported, cardiacLocked, severeAllergens, intensityCeiling };
}

function cooperVO2max(distanceM){ return (distanceM - 504.9) / 44.73; }
function formatPace(secPerKm){
  const m = Math.floor(secPerKm/60), s = Math.round(secPerKm%60);
  return `${m}:${s<10?'0':''}${s} /km`;
}
function paceZonesFromCooper(distanceM){
  const testPaceSec = 720 / (distanceM/1000);
  return { easy:testPaceSec*1.35, moderate:testPaceSec*1.15, hard:testPaceSec*1.02 };
}

const IF = { easy:0.45, moderate:0.70, hard:0.90 };
function sessionLoad(min, zone){ return Math.round((min||0) * (IF[zone]||0.45)); }

function startOfGulfWeek(d){
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = (x.getDay()+1)%7;
  x.setDate(x.getDate()-diff);
  return x;
}
function iso(d){ const p=n=>String(n).padStart(2,'0'); return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate()); }
function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }

const SESSION_TITLES = {
  ar:{run:{easy:'جري سهل تحفيزي',moderate:'جري وتيرة',hard:'تكرار مضمار'},
      swim:{easy:'سباحة تقنية',moderate:'سباحة عتبة',hard:'سرعات قصيرة'},
      bike:{easy:'دراجة تحمل',moderate:'دراجة ثابتة',hard:'فواصل دراجة'},
      strength:{easy:'قوة وثبات',moderate:'قوة دوائر',hard:'قوة شدة'},
      brick:{easy:'تمرين مزدوج خفيف',moderate:'دراجة ثم جري',hard:'محاكاة سباق'}},
  en:{run:{easy:'Easy motivational run',moderate:'Steady run',hard:'Track reps'},
      swim:{easy:'Technique swim',moderate:'Threshold swim',hard:'Swim reps'},
      bike:{easy:'Endurance ride',moderate:'Steady ride',hard:'Bike intervals'},
      strength:{easy:'Strength & stability',moderate:'Circuit strength',hard:'Heavy strength'},
      brick:{easy:'Easy brick',moderate:'Bike then run',hard:'Race simulation'}},
};
function sessionTitle(sport, zone){
  const pack = (SESSION_TITLES[state.lang]||SESSION_TITLES.ar)[sport]
            || (SESSION_TITLES[state.lang]||SESSION_TITLES.ar).run;
  return pack[zone] || pack.easy;
}
function unit(k){
  const u = {km:{ar:'كم',en:'km'}, min:{ar:'د',en:'min'}, load:{ar:'حمل',en:'load'}};
  return (u[k]||{})[state.lang] || (u[k]||{}).ar || '';
}
function activityTitle(a){
  if(a.text && typeof a.text === 'object') return a.text[state.lang] || a.text.ar;
  if(a.text) return a.text;
  if(a.zone && a.fromPlan) return sessionTitle(a.sport, a.zone);
  return t('sport_'+a.sport);
}
function medicalNotes(){
  const m = state.q.medical || [];
  const out = [];
  if(m.includes('asthma')) out.push(t('med_note_asthma'));
  if(m.includes('joint')) out.push(t('med_note_joint'));
  if(m.includes('diabetes')) out.push(t('med_note_diabetes'));
  return out;
}
function ensurePlan(){
  if(!state.q.completed) return;
  const horizon = iso(addDays(new Date(), 14));
  if((state.planned||[]).some(p=>p.date>=horizon)) return;
  rebuildPlan();
}
function rebuildPlan(){
  const gate = safetyGate();
  const hours = state.q.hours || 4;
  const sport = state.q.sport || 'run';
  const ramadan = state.q.ramadan==='true';
  const cap = gate.intensityCeiling;
  const week0 = startOfGulfWeek(new Date());
  const specs = sessionSpecs(sport, hours, cap, ramadan);
  const doneMap = {};
  (state.planned||[]).forEach(p=>{ if(p.done) doneMap[p.id]=true; });
  const history = (state.planned||[]).filter(p=>p.done && p.date < iso(week0));
  const planned = [];
  for(let w=0; w<12; w++){
    specs.forEach(s=>{
      const date = iso(addDays(week0, w*7 + s.day));
      let zone = s.zone;
      if(cap==='low' && zone==='hard') zone='easy';
      const id = 'p-'+date+'-'+s.sport+'-'+s.day;
      planned.push({
        id, date, sport:s.sport, zone, min:s.min, km:s.km,
        postIftar: ramadan && zone!=='easy',
        done: !!doneMap[id]
      });
    });
  }
  state.planned = [...history, ...planned];
  persist();
}

function sessionSpecs(sport, hours, cap, ramadan){
  const budget = Math.max(90, hours*60);
  const mix = {
    run:[{day:0,sport:'run',zone:'easy',frac:0.18},{day:1,sport:'strength',zone:'easy',frac:0.14},{day:2,sport:'run',zone:'moderate',frac:0.22},{day:4,sport:'run',zone:'easy',frac:0.16},{day:6,sport:'run',zone:'hard',frac:0.30}],
    swim:[{day:0,sport:'swim',zone:'easy',frac:0.20},{day:1,sport:'strength',zone:'easy',frac:0.12},{day:2,sport:'swim',zone:'moderate',frac:0.24},{day:5,sport:'swim',zone:'easy',frac:0.16},{day:6,sport:'swim',zone:'hard',frac:0.28}],
    bike:[{day:0,sport:'bike',zone:'easy',frac:0.18},{day:1,sport:'strength',zone:'easy',frac:0.12},{day:2,sport:'bike',zone:'moderate',frac:0.24},{day:4,sport:'bike',zone:'easy',frac:0.16},{day:6,sport:'bike',zone:'hard',frac:0.30}],
    tri:[{day:0,sport:'swim',zone:'easy',frac:0.12},{day:1,sport:'bike',zone:'easy',frac:0.16},{day:2,sport:'run',zone:'easy',frac:0.12},{day:3,sport:'strength',zone:'easy',frac:0.10},{day:4,sport:'brick',zone:'moderate',frac:0.16},{day:5,sport:'bike',zone:'moderate',frac:0.16},{day:6,sport:'run',zone:'hard',frac:0.18}],
  };
  const list = (mix[sport]||mix.run).map(s=>{
    let zone = s.zone;
    if(cap==='low' && zone!=='easy') zone='easy';
    const min = Math.round(budget * s.frac / 5)*5;
    const km = s.sport==='swim' ? +(min*0.03).toFixed(1) : (s.sport==='bike'||s.sport==='brick') ? +(min*0.22).toFixed(1) : s.sport==='strength' ? 0 : +(min*0.09).toFixed(1);
    return {day:s.day, sport:s.sport, zone, min, km};
  });
  return list.filter(s=>s.min>=20);
}

function triathlonProgress(){
  const acts = state.activities||[];
  const planned = state.planned||[];
  const from = iso(addDays(new Date(),-28));
  const recentA = acts.filter(a=>a.date>=from);
  const recentP = planned.filter(p=>p.date>=from && p.date<=iso(new Date()));
  const doneP = recentP.filter(p=>p.done).length;
  const completion = recentP.length ? Math.round(100*doneP/recentP.length) : (recentA.length?100:0);
  const by = {swim:0,bike:0,run:0,brick:0,other:0};
  recentA.forEach(a=>{
    const k = ['swim','bike','run','brick'].includes(a.sport)?a.sport:'other';
    by[k]+=1;
  });
  function bestPace(sport){
    const rows = acts.filter(a=>a.sport===sport && a.km>0 && a.min>0);
    if(!rows.length) return null;
    const paced = rows.map(a=>({...a, secPerKm:(a.min*60)/a.km})).sort((x,y)=>x.secPerKm-y.secPerKm);
    return paced[0];
  }
  const lastCooper = state.q.cooperDistanceM;
  const ff = fitnessFatigue();
  return {completion, doneP, plannedN:recentP.length, logged:recentA.length, by, bestRun:bestPace('run'), bestBike:bestPace('bike'), lastCooper, ff};
}
function fmtPace(sec){
  if(!sec||!isFinite(sec)) return '—';
  const m=Math.floor(sec/60), s=Math.round(sec%60);
  return m+':' + String(s).padStart(2,'0');
}

function fitnessFatigue(){
  const today = new Date();
  let fit=0, fat=0, load7=0;
  for(let i=0;i<42;i++){
    const d = iso(addDays(today,-i));
    const loads = [];
    // الجلسة المكتملة تُنشئ نشاطاً مرتبطاً، فالمصدر الوحيد للحمل هو الأنشطة
    (state.activities||[]).filter(a=>a.date===d).forEach(a=>loads.push(a.load||0));
    const L = loads.reduce((s,x)=>s+x,0);
    fit += L * Math.exp(-i/42);
    if(i<7){ fat += L * Math.exp(-i/7); load7 += L; }
  }
  const fitness = Math.round(fit/10);
  const fatigue = Math.round(fat/4);
  const form = fitness - fatigue;
  return {fitness, fatigue, form, load7};
}
function readiness(){
  const gate = safetyGate();
  const ff = fitnessFatigue();
  let score = 72;
  if(gate.cardiacLocked) score -= 28;
  if(state.q.sleep==='lt5') score -= 18;
  else if(state.q.sleep==='5_6') score -= 8;
  else if(state.q.sleep==='8plus') score += 6;
  if(state.q.ramadan==='true') score -= 6;
  if(ff.form < -8) score -= 12;
  else if(ff.form > 8) score += 6;
  score = Math.max(18, Math.min(96, score));
  const energy = Math.max(15, Math.min(95, 80 + ff.form - (gate.cardiacLocked?20:0) - (state.q.sleep==='lt5'?15:0)));
  let band = 'ok', msg = t('ready_go');
  if(gate.cardiacLocked || score<45){ band='low'; msg=t('ready_locked'); }
  else if(score<62 || ff.form<-8){ band='mid'; msg=t('ready_tired'); }
  return {score, energy:Math.round(energy), band, msg, ...ff};
}

const FOODS = [
  { img:'img/food1.jpg', slot:'iftar', name:{ar:'صحن دجاج مشوي وأرز',en:'Grilled chicken & rice bowl'}, allergens:[] },
  { img:'img/food2.jpg', slot:'recover', name:{ar:'سموذي فول سوداني وموز',en:'Peanut & banana smoothie'}, allergens:['nuts'] },
  { img:'img/food3.jpg', slot:'iftar', name:{ar:'سلطة روبيان',en:'Shrimp salad'}, allergens:['shellfish'] },
  { img:'img/food2.jpg', slot:'suhoor', name:{ar:'شوفان بالحليب',en:'Milk oatmeal'}, allergens:['dairy'] },
  { img:'img/food1.jpg', slot:'suhoor', name:{ar:'خبز قمح كامل بالأفوكادو',en:'Whole wheat toast & avocado'}, allergens:['gluten'] },
  { img:'img/food3.jpg', slot:'recover', name:{ar:'زبادي يوناني بالعسل',en:'Greek yogurt with honey'}, allergens:['dairy'] },
  { img:'img/food1.jpg', slot:'iftar', name:{ar:'تمر وماء (افتتاح الإفطار)',en:'Dates & water (iftar open)'}, allergens:[] },
  { img:'img/food3.jpg', slot:'iftar', name:{ar:'سمك مشوي وخضار ورز',en:'Grilled fish, veg and rice'}, allergens:[] },
];
const FAST_SLOTS = [
  {id:'suhoor', title:{ar:'السحور',en:'Suhoor'},
    aim:{ar:'وقود بطيء + سوائل قبل الإمساك',en:'Slow fuel and fluid before the fast starts'},
    points:{ar:[
      'كربوهيدرات معقّدة + بروتين + ماء أو شوربة. تجنّب المالح جداً إذا يزعج عطشك طول النهار.',
      'الهدف: تقلل الإحساس بالفراغ حتى المغرب، لا «تخزين» سعرات دفعة واحدة.',
      'إن كنت ستتمرن عصراً بسهولة فقط: السحور أهم من وجبة ضخمة ثقيلة.'
    ],en:[
      'Complex carbohydrate + protein + water or soup. Go easy on very salty food if it drives daytime thirst.',
      'Aim: reduce emptiness until sunset, not one giant calorie dump.',
      'If you only train easy before sunset, suhoor matters more than a heavy feast.'
    ]}},
  {id:'iftar', title:{ar:'الإفطار',en:'Iftar'},
    aim:{ar:'افتح بلطف ثم أعد السوائل والطاقة',en:'Open gently, then restore fluid and energy'},
    points:{ar:[
      'تمر وماء أولاً (سنة وعملي: سكر سريع + سائل). انتظر قليلاً قبل الوجبة الكاملة إذا المعدة حساسة.',
      'بعدها طبق فيه رز/خبز + بروتين + خضار. هذا موضع إعادة الكربوهيدرات بعد يوم بلا أكل (اتجاه مراجعات رمضان 2024: المدخول ينخفض عند البالغين إن لم يُخطَّط).',
      'لا تجرّب جلًّ جديداً أو مشروب سباق أول مرة على الإفطار.'
    ],en:[
      'Dates and water first (quick sugar + fluid). Wait briefly before a full plate if your gut is sensitive.',
      'Then a plate with rice/bread + protein + vegetables. This is the main carbohydrate restore after a day without food (BJSM 2024: adult intake often falls unless planned).',
      'Do not debut a new gel or race drink at first iftar.'
    ]}},
  {id:'recover', title:{ar:'بعد تمرين ما بعد الإفطار',en:'After the post-iftar session'},
    aim:{ar:'ضمن نافذة المساء: سائل + كربوهيدرات + بروتين',en:'Evening window: fluid + carbohydrate + protein'},
    points:{ar:[
      'إذا تمرّنت بعد الإفطار بساعة–ثلاث، خذ وجبة أو حصة صغيرة خلال الساعة التالية: لبن/زبادي أو دجاج وأرز إن سمحت الحساسية.',
      'الماء على دفعات أهم من دفعة واحدة كبيرة.',
      'النوم جزء من التغذية في رمضان؛ السهر يضعف اليوم الثاني أكثر من نقص 200 سعرة.'
    ],en:[
      'If you trained 1–3 hours after iftar, take a meal or small serving in the next hour: yogurt or chicken and rice if allergens allow.',
      'Sip water rather than one huge bolus.',
      'Sleep is part of Ramadan nutrition; a short night hurts the next day more than missing 200 kcal.'
    ]}},
];

const GEAR = [
  { img:'img/gear.jpg', icon:'shoe', sport:'run', name:{ar:'حذاء جري تهوية عالية',en:'High-ventilation running shoe'}, size:{ar:'43 EU',en:'43 EU'} },
  { img:'img/swim.jpg', icon:'goggles', sport:'swim', name:{ar:'نظارة سباحة',en:'Swim goggles'}, size:{ar:'وجه متوسط',en:'Medium fit'} },
  { img:'img/bike.jpg', icon:'bike', sport:'bike', name:{ar:'دراجة طريق',en:'Road bike'}, size:{ar:'إطار 54 سم',en:'54cm frame'} },
  { img:'img/run.jpg', icon:'suit', sport:'tri', name:{ar:'بدلة تراياثلون',en:'Tri-suit'}, size:{ar:'مقاس M',en:'Size M'} },
  { img:'img/hero-run.jpg', icon:'cap', sport:'run', name:{ar:'قبعة شمس',en:'Sun cap'}, size:{ar:'مقاس واحد',en:'One size'} },
  { img:'img/bike.jpg', icon:'bottle', sport:'bike', name:{ar:'زجاجة ترطيب',en:'Bottle'}, size:{ar:'750 مل',en:'750 ml'} },
];
const ROUTES = [
  { img:'img/skyline.jpg', name:{ar:'كورنيش أبوظبي',en:'Abu Dhabi Corniche'}, km:8, saved:true, city:'Abu Dhabi', seg:{ar:'قطاع المارينا',en:'Marina split'} },
  { img:'img/hero-run.jpg', name:{ar:'مسار جميرا',en:'Jumeirah Route'}, km:9, saved:false, city:'Dubai', seg:{ar:'كفر جميرا',en:'Jumeirah KOM'} },
  { img:'img/run.jpg', name:{ar:'حديقة الفجيرة',en:'Fujairah Park Loop'}, km:40, saved:true, city:'Fujairah', seg:{ar:'لفة الحديقة',en:'Park lap'} },
  { img:'img/skyline.jpg', name:{ar:'الخليج التجاري',en:'Business Bay Loop'}, km:10.5, saved:false, city:'Dubai', seg:{ar:'جسر القناة',en:'Canal bridge'} },
  { img:'img/swim.jpg', name:{ar:'كورنيش الدوحة',en:'Doha Corniche'}, km:7, saved:true, city:'Doha', seg:{ar:'قطاع المتحف',en:'Museum split'} },
  { img:'img/bike.jpg', name:{ar:'بوليفارد الرياض',en:'Riyadh Sports Boulevard'}, km:12, saved:false, city:'Riyadh', seg:{ar:'تسلق البوليفارد',en:'Boulevard climb'} },
];


const TOPICS = [
  {id:'vision', img:'img/skyline.jpg', tag:{ar:'رؤية',en:'Vision'},
    title:{ar:'ليش شوط مبني على أدلة معلنة',en:'Why Shawṭ is built on public evidence'},
    body:{ar:[
      'المنصة لا تخترع بروتوكول عيادة. تأخذ أدوات منشورة وتقف عند حدّها: تقييم جاهزية للنشاط (PAR-Q+) وليس تشخيصاً، واختبار ميداني للجري وليس مختبر VO2 مغلق.',
      'Warburton وزملاؤه (2011) صمّموا PAR-Q+ كي يكون العلم الموجب متابعةً لا حظراً دائماً؛ الموافقة السريرية ترفع القيد. Cooper (1968) في JAMA ربط مسافة 12 دقيقة بتقدير الاستهلاك الأقصى للأكسجين.',
      'نموذج الحمل عندنا Banister: اللياقة تتراكم أبطأ والإرهاق أسرع. هذا إطار بحثي معروف، وليس TSS التجاري.'
    ], en:[
      'The platform does not invent a clinic protocol. It uses published tools and stops at their limit: activity readiness (PAR-Q+), not diagnosis; a field run test, not a closed-circuit VO2 lab.',
      'Warburton and colleagues (2011) designed PAR-Q+ so a flagged answer triggers follow-up rather than a permanent ban; clinical clearance can lift the cap. Cooper (1968) in JAMA related 12-minute distance to estimated maximal oxygen uptake.',
      'Our load frame is Banister’s: fitness accumulates slowly, fatigue faster. That is a public research model, not commercial TSS.'
    ]},
    refs:[
      'Warburton DER, Jamnik VK, Bredin SSD, Gledhill N. The Physical Activity Readiness Questionnaire for Everyone (PAR-Q+). Health & Fitness Journal of Canada. 2011;4(2):3–17.',
      'Cooper KH. A means of assessing maximal oxygen intake. JAMA. 1968;203(3):201–204.',
      'Banister EW, Calvert TW, Savage MV, Bach T. A systems model of training for athletic performance. Aust J Sports Med. 1975;7:57–61.'
    ]},
  {id:'heat', img:'img/hero-run.jpg', tag:{ar:'مناخ',en:'Climate'},
    title:{ar:'الحر: تأقلم أسبوعين لا معامل سحري',en:'Heat: about two weeks of acclimatization, not a magic factor'},
    body:{ar:[
      'إجماع Racinais وزملائه (2015) — ومنهم باحثون في سبيتار بالدوحة — يقول إن أهم تدخل قبل المنافسة في الحر هو التأقلم: تعرّض متكرر للجهد والحر خلال أسبوع إلى أسبوعين.',
      'نفس الإجماع: ابدأ التمرين وأنت في حالة ترطيب مقبولة، وقلّل العجز المائي أثناء الجهد. الظل ومرافق التبريد مسؤولية المنظّم في السباقات الجماعية.',
      'بيان ACSM 2023 عن أمراض الحر الجهدية يؤكد أن ضربة الحر حالة طوارئ: أوقف توليد الحرارة وبرّد بسرعة. التطبيق لذلك يذكّر ويخفض الشدة، ولا يدّعي علاج حرارة الجسم.'
    ], en:[
      'The Racinais et al. (2015) consensus — including Aspetar researchers in Doha — states that the most important intervention before competing in the heat is acclimatization: repeated exercise-heat exposure over 1–2 weeks.',
      'The same consensus: start euhydrated and limit fluid deficit during work. Shade and cooling facilities are an organizer duty at mass events.',
      'The 2023 ACSM consensus on exertional heat illness treats heat stroke as an emergency: stop heat generation and cool rapidly. The app therefore reminds and caps intensity; it does not treat core temperature.'
    ]},
    refs:[
      'Racinais S, Alonso JM, Coutts AJ, et al. Consensus recommendations on training and competing in the heat. Scand J Med Sci Sports. 2015;25(Suppl 1):6–19. PMID: 25943653.',
      'Roberts WO, et al. ACSM Expert Consensus Statement on Exertional Heat Illness. Curr Sports Med Rep. 2023;22(4):134–149. PMID: 37036463.'
    ]},
  {id:'hydrate', img:'img/swim.jpg', tag:{ar:'ترطيب',en:'Hydration'},
    title:{ar:'الترطيب حسب العرق لا حسب شعار الزجاجة',en:'Replace sweat, do not follow a bottle slogan'},
    body:{ar:[
      'موقف ACSM لاستبدال السوائل (Sawka et al., 2007) يربط نقص السوائل بانخفاض تحمّل الجهد وزيادة اختزان الحرارة، خصوصاً في الجو الحار.',
      'التوصية العامة: ابدأ قريب من التوازن المائي، واشرب على فترات مبكرة. الكمية فردية حسب معدل العرق، وليست رقماً واحداً لكل الرياضيين.',
      'عجز يقارب 2٪ من وزن الجسم قد يضعف الأداء الهوائي في الحر. المنصة لا تحسب عرقك؛ تذكّرك بالمبدأ وتحجب المشروبات إذا كانت حساسيتك شديدة تجاه مكوّن فيها.'
    ], en:[
      'The ACSM fluid-replacement position stand (Sawka et al., 2007) links dehydration to lower endurance and greater heat storage, especially in the heat.',
      'General guidance: start near euhydration and drink early at intervals. Volume is individual (sweat rate), not one number for every athlete.',
      'A deficit near 2% of body mass can impair aerobic work in the heat. The app does not measure your sweat; it restates the principle and hides drinks that contain a severe allergen you declared.'
    ]},
    refs:[
      'Sawka MN, Burke LM, Eichner ER, Maughan RJ, Montain SJ, Stachenfeld NS. ACSM position stand: exercise and fluid replacement. Med Sci Sports Exerc. 2007;39(2):377–390.',
      'Racinais S, et al. Consensus recommendations on training and competing in the heat. Scand J Med Sci Sports. 2015;25(Suppl 1):6–19.'
    ]},
  {id:'ramadan', img:'img/food1.jpg', tag:{ar:'رمضان',en:'Ramadan'},
    title:{ar:'الصيام: الشدة العالية تتأثر أكثر من الكتلة العضلية',en:'Fasting: high intensity dips more than lean mass'},
    body:{ar:[
      'استعراض مراجعات في BJSM (2024) ربط مراعاة رمضان لدى الرياضيين بنقص محتمل في مدة النوم، وانخفاض المدخول المائي والكربوهيدرات عند البالغين، وتراجع في اختبارات الشدة العالية — مع جودة منهجية منخفضة إلى حرجة للمراجعات المشمولة.',
      'نفس الاستعراض: لا ارتباط واضح مع الكتلة النحيلة أو بعض المؤشرات الدموية. الحفاظ على الطاقة والماء والنوم وحمل التدريب يقلّل احتمال الهبوط.',
      'لذلك الخطة تؤجّل الشدة العالية بعد الإفطار. هذا ترتيب وقائي مبني على اتجاه الأدلة، لا على قياس سكر أو مختبر داخل التطبيق.'
    ], en:[
      'A 2024 BJSM overview of systematic reviews associated Ramadan observance in athletes with shorter sleep, lower adult energy/carbohydrate/water intake, and poorer high-intensity test scores — while warning that included reviews were low to critically low in quality.',
      'The same overview: no clear association with lean mass or some haematological indices. Keeping energy, water, sleep, and training load stable makes large drops less likely.',
      'That is why the plan delays high intensity until after iftar. It is a precaution from the direction of the evidence, not an in-app glucose or lab test.'
    ]},
    refs:[
      'Overview of systematic reviews on Ramadan fasting, health indices and exercise-test performance in athletes. Br J Sports Med. 2024;58(3):136. doi:10.1136/bjsports-2023-107687.',
      'Chtourou H, et al. and related Ramadan-training literature: high-intensity sessions are the most consistently affected quality.'
    ]},
  {id:'heart', img:'img/run.jpg', tag:{ar:'أمان',en:'Safety'},
    title:{ar:'PAR-Q+: العلم يفتح سؤالاً لا يُقفل الرياضي للأبد',en:'PAR-Q+: a flag opens a question, it does not ban sport forever'},
    body:{ar:[
      'PAR-Q+ (Warburton et al., 2011) أداة جاهزية للنشاط البدني للجميع. الإجابة الموجبة تستدعي أسئلة متابعة أو مراجعة مختص، وليست حكماً بأن القلب مريض.',
      'ألم الصدر أو الإغماء مع الجهد من الأسئلة الكلاسيكية لأن تجاهلها في برامج مجتمعية مرتبط بارتفاع الخطر. التطبيق يخفض سقف الشدة إلى أن تُذكر موافقة خلال 12 شهراً.',
      'لا يوجد هنا تخطيط قلب ولا تصنيف سريري. إذا تكررت الأعراض أثناء التمرين: توقف واطلب رعاية — هذا سلوك سلامة لا تشخيص.'
    ], en:[
      'PAR-Q+ (Warburton et al., 2011) is an activity-readiness tool for everyone. A yes opens follow-up or clinician review; it is not a diagnosis of heart disease.',
      'Chest pain or exertional syncope sit in the classic item set because ignoring them in community programs raises risk. The app caps intensity until 12-month clearance is attested.',
      'There is no ECG and no clinical class here. Recurrent symptoms during exercise: stop and seek care — a safety behavior, not a diagnosis.'
    ]},
    refs:[
      'Warburton DER, Jamnik VK, Bredin SSD, Gledhill N. PAR-Q+. Health & Fitness Journal of Canada. 2011;4(2):3–17.',
      'Bredin SSD, Gledhill N, Jamnik VK, Warburton DER. PAR-Q+ and ePARmed-X+: new risk stratification and physical activity clearance. Health & Fitness Journal of Canada. 2013.'
    ]},
  {id:'allergy', img:'img/food2.jpg', tag:{ar:'حساسية',en:'Allergy'},
    title:{ar:'تجنّب المسبب المؤكد أشد من ملصق تحذير',en:'Avoiding a known trigger is stricter than a warning label'},
    body:{ar:[
      'إرشادات الحساسية الغذائية (مثل إطار NIAID للولايات المتحدة وإرشادات EAACI الأوروبية) تعتبر تجنّب المسبب المؤكد حجر الأساس لمن لديه حساسية IgE حقيقية، إلى جانب خطة طوارئ يقررها الطبيب.',
      'لذلك «الشديد» عندنا يخفي الطبق بالكامل. التنبيه وحده لا يكفي إذا إقرارك أن التفاعل شديد.',
      'التطبيق لا يشخص الحساسية ولا يقرر إبينفرين. يطبّق إقرارك فقط.'
    ], en:[
      'Food-allergy guidance (NIAID in the US; EAACI in Europe) treats strict avoidance of a confirmed trigger as foundational for true IgE-mediated allergy, alongside a clinician-set emergency plan.',
      'That is why “severe” hides the dish entirely. A warning alone is not enough if you declared the reaction severe.',
      'The app does not diagnose allergy or prescribe epinephrine. It only applies your declaration.'
    ]},
    refs:[
      'Boyce JA, et al. Guidelines for the diagnosis and management of food allergy in the United States (NIAID). J Allergy Clin Immunol. 2010;126(6 Suppl):S1–58.',
      'Muraro A, et al. EAACI food allergy and anaphylaxis guidelines. Allergy. 2014 (and subsequent updates).'
    ]},
  {id:'sleep', img:'img/bike.jpg', tag:{ar:'تعافٍ',en:'Recovery'},
    title:{ar:'النوم أداء: النقص يضرب القرار قبل العضلة',en:'Sleep is performance: loss hits decisions before muscle'},
    body:{ar:[
      'مراجعة Watson (2017) في Current Sports Medicine Reports تلخّص أن تقييد النوم يرتبط بتراجع الأداء المعرفي والمزاج والمهارات، ويضعف التعافي من الحمل.',
      'جاهزيتنا تنخفض مع أقل من خمس ساعات لأن هذا أقل من التوصيات العامة للبالغين (حوالي 7 ساعات فأكثر لدى معظم البالغين)، لا لأننا نشخّص أرقاً.',
      'نموذج Banister يفصل الإرهاق (سريع) عن اللياقة (بطيء). يوم سهل بعد ليلة قصيرة متسق مع هذا الفصل.'
    ], en:[
      'Watson (2017) in Current Sports Medicine Reports summarizes that sleep restriction tracks with worse cognition, mood, and skill, and weaker recovery from load.',
      'Readiness drops under five hours because that sits well below typical adult sleep need (about 7+ hours for most adults), not because we diagnose insomnia.',
      'Banister separates fast-moving fatigue from slower fitness. An easy day after a short night follows that split.'
    ]},
    refs:[
      'Watson AM. Sleep and Athletic Performance. Curr Sports Med Rep. 2017;16(6):413–418.',
      'Banister EW, et al. A systems model of training for athletic performance. Aust J Sports Med. 1975;7:57–61.',
      'Consensus on adult sleep duration: Watson NF, et al. Recommended amount of sleep. Sleep Health / AASM-related guidance, ~7 hours for most adults.'
    ]},
  {id:'talk', img:'img/run.jpg', tag:{ar:'شدة',en:'Intensity'},
    title:{ar:'اختبار الكلام: شدة بلا ساعة أولاً',en:'The Talk Test: intensity before you own a watch'},
    body:{ar:[
      'Persinger وزملاؤه (2004) في Medicine & Science in Sports & Exercise وجدوا أن اختبار الكلام ثابت بما يكفي لوصف شدة التمرين في الميدان.',
      'سهل = جملة كاملة. متوسط = جمل قصيرة. صعب = كلمة أو كلمتين. هذا ما نعرضه قبل أي رقم وتيرة.',
      'بعد مسافة Cooper تتحوّل النطاقات إلى وتيرة مشتقة من أدائك، مع بقاء الحر كملاحظة وقت لا كمعامل ملفّق.'
    ], en:[
      'Persinger et al. (2004) in Medicine & Science in Sports & Exercise found the Talk Test consistent enough for field intensity prescription.',
      'Easy = full sentences. Moderate = short sentences. Hard = a word or two. That is what we show before any pace number.',
      'After a Cooper distance, zones become paces from your trial. Heat remains a time note, not a fabricated coefficient.'
    ]},
    refs:[
      'Persinger R, Foster C, Gibson M, Fater DC, Porcari JP. Consistency of the talk test for exercise prescription. Med Sci Sports Exerc. 2004;36(9):1632–1636.',
      'Cooper KH. A means of assessing maximal oxygen intake. JAMA. 1968;203(3):201–204.'
    ]},
  {id:'women', img:'img/food3.jpg', tag:{ar:'خصوصية',en:'Privacy'},
    title:{ar:'التدريب وصحة المرأة: دليل منفصل عن الخلاصة الاجتماعية',en:'Women’s health and training: evidence, kept off the social feed'},
    body:{ar:[
      'مجموعات IOC حول الحامل والرياضية (Bø, Artal, Barakat وآخرون في BJSM) تؤكد أن النشاط مناسب لكثير من الحوامل بعد تقييم فردي، وأن العودة بعد الولادة قرار سريري لا قالب واحد.',
      'لذلك القسم خاص واختياري: الدليل موجود، والعرض الاجتماعي ممنوع.',
      'أي أعراض غير معتادة أو عودة مبكرة بعد ولادة أو جراحة تُحال لمختص. التطبيق لا يدير حملاً.'
    ], en:[
      'IOC expert groups on the pregnant athlete (Bø, Artal, Barakat and colleagues in BJSM) support activity for many pregnant athletes after individual screening, and treat postpartum return as a clinical decision, not one template.',
      'That is why the section is private and optional: the evidence can live here; the social feed cannot.',
      'Unusual symptoms or early return after birth or surgery go to a clinician. The app does not manage a pregnancy.'
    ]},
    refs:[
      'Bø K, Artal R, Barakat R, et al. Exercise and pregnancy in recreational and elite athletes: IOC expert group, parts 1–5. Br J Sports Med. 2016–2018.',
      'ACOG Committee Opinion No. 804. Physical activity and exercise during pregnancy and the postpartum period. 2020.'
    ]},
];


const CLIMATE = [
  {id:'heat', img:'img/hero-run.jpg',
    title:{ar:'الحر الجاف',en:'Dry heat'},
    when:{ar:'ظهر أبوظبي/الرياض، شمس مباشرة، رطوبة أقل نسبياً',en:'Midday sun, lower humidity (inland afternoon)'},
    rules:{ar:[
      'التأقلم: 7–14 يوماً جهد خفيف في الحر قبل أي شدة (Racinais et al., 2015).',
      'انقل الجلسة إلى قبل الشروق أو بعد المغرب.',
      'خفّض الشدة درجة: ما كان متوسطاً يصبح سهلاً في أول موجة حر.',
      'إذا دوار أو توقف تعرق أو ارتباك: أوقف التمرين واطلب مساعدة (ACSM 2023).'
    ],en:[
      'Acclimatize 7–14 days of easy heat work before hard sessions (Racinais et al., 2015).',
      'Move the session to before sunrise or after sunset.',
      'Drop one intensity grade in the first heat wave.',
      'Dizziness, stopped sweating, or confusion: stop and get help (ACSM 2023).'
    ]},
    sessions:{ar:[
      {t:'جري فجر سهل',d:'25–40 د · جمل كاملة · ظل آخر 5 د'},
      {t:'دراجة مغرب تحمل',d:'40–70 د · وتيرة كلام مريح · زجاجتان ماء'},
      {t:'سباحة مساء',d:'20–35 د تقنية · المسبح أبرد من البرّ'}
    ],en:[
      {t:'Dawn easy run',d:'25–40 min · full sentences · last 5 min in shade'},
      {t:'Evening endurance ride',d:'40–70 min · easy talk · two bottles'},
      {t:'Evening swim',d:'20–35 min technique · pool cooler than air'}
    ]}},
  {id:'humid', img:'img/swim.jpg',
    title:{ar:'الرطوبة العالية',en:'High humidity'},
    when:{ar:'ساحل الخليج: دبي، أبوظبي صيفاً، الدوحة، المنامة — العرق ما يتبخّر',en:'Gulf coast in summer — sweat evaporates poorly'},
    rules:{ar:[
      'الرطوبة تمنع تبريد العرق. نفس درجة الحرارة أحسّ أخطر من الحر الجاف.',
      'قصّر المدة 20–30٪ عن جلسة الحر الجاف، وزِد فترات المشي/الوقوف في ظل.',
      'السباحة أو النادي المكيّف أفضل من جري كورنيش وقت الظهيرة.',
      'الترطيب مبكر وعلى فترات (Sawka / ACSM 2007) — العطش يتأخر.'
    ],en:[
      'Humidity blocks evaporative cooling. The same air temperature is harder than dry heat.',
      'Cut duration 20–30% versus a dry-heat session and insert shade walk breaks.',
      'Prefer a pool or cooled indoor space over a noon corniche run.',
      'Drink early and often (Sawka / ACSM 2007) — thirst lags.'
    ]},
    sessions:{ar:[
      {t:'جري/مشي متناوب',d:'20–30 د · 3 د جري سهل + 1 د مشي'},
      {t:'سباحة تقنية',d:'30 د · مجموعات قصيرة واستراحة على الحافة'},
      {t:'قوة داخل النادي',d:'25–40 د · بدون فواصل عالية إذا ما فيه تكييف كافٍ'}
    ],en:[
      {t:'Run/walk intervals',d:'20–30 min · 3 min easy run + 1 min walk'},
      {t:'Swim drills',d:'30 min · short sets, rest at the wall'},
      {t:'Indoor strength',d:'25–40 min · skip hard intervals without good cooling'}
    ]}},
  {id:'cold', img:'img/bike.jpg',
    title:{ar:'البرد',en:'Cold'},
    when:{ar:'شتاء داخلي أو فجر شتوي في الرياض/الجبل — ريح تزيد الإحساس بالبرد',en:'Inland winter or windy pre-dawn — wind chill matters'},
    rules:{ar:[
      'إجماع ACSM لأمراض البرد: إحماء أطول، أطراف مغطاة، لا تبدأ وأنت مبلل.',
      'الطبقات: قاعدة تبعد الرطوبة + وسط عازل + قشرة للريح.',
      'الشدة العالية بعد دفء العضلة (10–15 د سهل أولاً).',
      'إذا تخدير أصابع أو ارتباك أو توقف ارتعاش: ادخل دافئ واطلب تقييم — مو تكمل الرقم.'
    ],en:[
      'ACSM cold-illness guidance: longer warm-up, cover extremities, do not start wet.',
      'Layers: wicking base + insulation + wind shell.',
      'Hard work only after the muscle is warm (10–15 min easy first).',
      'Numb fingers, confusion, or a stop in shivering: get warm and assessed — do not chase the number.'
    ]},
    sessions:{ar:[
      {t:'إحماء ثم وتيرة',d:'12 د سهل + 20 د متوسط + 8 د تهدئة'},
      {t:'دراجة طريق شتاء',d:'45–70 د · قفازات وغطاء أذنين · انتبه للمطر'},
      {t:'جري قصير سريع بعد الدفء',d:'فقط إذا الإحماء اكتمل وما في ريح قاطعة'}
    ],en:[
      {t:'Warm-up then steady',d:'12 min easy + 20 min moderate + 8 min cool-down'},
      {t:'Winter road ride',d:'45–70 min · gloves and ear cover · watch rain'},
      {t:'Short strides after warmth',d:'Only if the warm-up is done and wind is not biting'}
    ]}},
  {id:'fast', img:'img/food1.jpg',
    title:{ar:'وقت الصيام',en:'While fasting'},
    when:{ar:'رمضان أو صيام تطوّع طويل — بلا ماء من الفجر للمغرب',en:'Ramadan or long voluntary fast — no fluid from dawn to sunset'},
    rules:{ar:[
      'استعراض BJSM 2024: الشدة العالية والنوم الأكثر تأثراً؛ الكتلة النحيلة غالباً محفوظة إذا الطاقة بعد الإفطار كافية.',
      'قبل المغرب: سهل أو راحة أو مهارة قصيرة. بعد الإفطار بساعة إلى ثلاث: المكان المناسب للمتوسط/الصعب إذا الموافقة الطبية تسمح.',
      'لا تبدأ مشروب سباق جديد في أول إفطار. أي حساسية شديدة تُستبعد.',
      'سكري أو حمل أو أعراض غير معتادة: القرار للمختص لا للتطبيق.'
    ],en:[
      'BJSM 2024 overview: high intensity and sleep are most affected; lean mass is often preserved if energy after iftar is adequate.',
      'Before sunset: easy, rest, or brief skill. One to three hours after iftar: the window for moderate/hard if medical clearance allows.',
      'Do not debut a race drink at first iftar. Severe allergens stay excluded.',
      'Diabetes, pregnancy, or unusual symptoms: clinician call, not the app.'
    ]},
    sessions:{ar:[
      {t:'قبل المغرب',d:'15–25 د مشي أو سباحة تقنية خفيفة — بلا فواصل'},
      {t:'بعد الإفطار',d:'30–50 د متوسط أو تكرار قصير إذا السقف مو منخفض'},
      {t:'يوم راحة نشطة',d:'مشي عائلي بعد التراويح · نوم أولوية'}
    ],en:[
      {t:'Before sunset',d:'15–25 min walk or easy technique swim — no intervals'},
      {t:'After iftar',d:'30–50 min moderate or short reps if intensity is not capped'},
      {t:'Active rest',d:'Family walk after taraweeh · sleep is the session'}
    ]}},
];


const SUPPS = [
  {id:'foodfirst', grade:{ar:'أساس',en:'Foundation'}, color:'var(--recovery)',
    title:{ar:'الطعام أولاً',en:'Food first'},
    body:{ar:'إجماع اللجنة الأولمبية الدولية (Maughan et al., BJSM 2018): معظم الرياضيين يغطّون الحاجة من الأكل إذا الطاقة كافية. المكمل يملأ فجوة مثبتة، لا يستبدل السحور والإفطار.',
          en:'IOC consensus (Maughan et al., BJSM 2018): most athletes meet needs from food when energy is adequate. A supplement fills a documented gap; it does not replace suhoor or iftar.'}},
  {id:'caffeine', grade:{ar:'أدلة جيدة',en:'Strong evidence'}, color:'var(--secondary)',
    title:{ar:'الكافيين',en:'Caffeine'},
    body:{ar:'يحسّن اليقظة وبعض أداء التحمّل بجرعات تقريبية 3–6 مغ/كجم في الدراسات، مع تفاوت فردي كبير. في الحر والصيام قد يزيد الإحساس بالقلب والعطش. لا تبدأه أول مرة يوم سباق أو أول إفطار. ليس علاجاً.',
          en:'Improves alertness and some endurance outcomes at about 3–6 mg/kg in trials, with large individual spread. In heat and fasting it can amplify heart awareness and thirst. Do not debut it on race day or first iftar. Not a treatment.'}},
  {id:'creatine', grade:{ar:'أدلة جيدة',en:'Strong evidence'}, color:'var(--secondary)',
    title:{ar:'كرياتين مونوهيدرات',en:'Creatine monohydrate'},
    body:{ar:'أكثر المكملات دراسة للقوة والعمل المتكرر. يحتاج سوائل كافية؛ في رمضان والحر لا تفترض «تحميلاً» عنيفاً من غير ماء. توقف وراجع مختص إذا كلية أو مرض مزمن.',
          en:'The most studied supplement for strength and repeated efforts. It needs enough fluid; do not run an aggressive load in Ramadan or heat without water. Stop and see a clinician if you have kidney disease or another chronic condition.'}},
  {id:'protein', grade:{ar:'أدلة جيدة',en:'Strong evidence'}, color:'var(--secondary)',
    title:{ar:'البروتين (شرش / نباتي)',en:'Protein (whey / plant)'},
    body:{ar:'مفيد إذا وجبة ما بعد التمرين ناقصة، لا إذا الإفطار فيه دجاج أو سمك أو لبن. انتبه للحساسية: شرش = ألبان. النباتي قد يحمل صويا. الشديد عندنا يُستبعد من الاقتراح.',
          en:'Useful when the post-session meal is thin, not when iftar already has chicken, fish, or yogurt. Allergy: whey is dairy; plant blends may include soy. Severe declarations are excluded here.'}},
  {id:'nitrate', grade:{ar:'أدلة متوسطة',en:'Moderate evidence'}, color:'var(--warning)',
    title:{ar:'نترات (شوندر)',en:'Nitrate (beetroot)'},
    body:{ar:'بعض دراسات التحمّل تظهر فائدة في غير المتدربين جداً. التأثير ليس مضموناً للنخبة. قد يخفض الضغط؛ لا تخلطه مع وصفات ضغط من غير طبيب.',
          en:'Some endurance trials help less-trained athletes more than elites. Effect is not guaranteed. It can lower blood pressure — do not stack with BP drugs without a clinician.'}},
  {id:'beta', grade:{ar:'أدلة متوسطة',en:'Moderate evidence'}, color:'var(--warning)',
    title:{ar:'بيتا ألانين',en:'Beta-alanine'},
    body:{ar:'قد يؤخر الحموضة في المجهود 1–4 دقائق بعد أسابيع من الاستخدام. التنميل شائع وغير ضار عادة. لا يُعد بديلاً عن التأقلم على الحر.',
          en:'May buffer efforts lasting about 1–4 minutes after weeks of use. Tingling is common and usually benign. It is not a substitute for heat acclimatization.'}},
  {id:'d3', grade:{ar:'حسب النقص',en:'If deficient'}, color:'var(--warning)',
    title:{ar:'فيتامين D والحديد',en:'Vitamin D and iron'},
    body:{ar:'يُكمَّلان بعد تحليل يثبته مختص، لا بالتخمين. نقص الحديد شائع أكثر عند بعض الرياضيات. الجرعة ليست من التطبيق.',
          en:'Replace only after a clinician-confirmed lab, not by guesswork. Iron deficiency is more common in some female athletes. Dose is not set by this app.'}},
  {id:'avoid', grade:{ar:'تجنّب',en:'Avoid'}, color:'var(--danger)',
    title:{ar:'حوارق وحزم مجهولة',en:'Fat-burners and mystery stacks'},
    body:{ar:'خطر تلوث بمنشطات (WADA) ومواد غير مكتوبة على الملصق. «حرق دهون» في رمضان غالباً تسويق. أي منتج يعد بنتيجة سحرية أو يرفع النبض بقوة خارج الكافيين المعتاد: لا مكان له في الخطة.',
          en:'Contamination with banned substances (WADA) and off-label stimulants is a documented risk. “Fat burn” in Ramadan is usually marketing. Anything promising a miracle or a hard pulse spike beyond usual caffeine does not belong on the plan.'}},
];

function computeRoutes(targetKm){
  const userCity = state.q.city;
  return ROUTES.map(r=>{
    const cityMatch = r.city === userCity;
    const excluded = r.km > targetKm*1.25;
    const cost = Math.abs(targetKm - r.km)/targetKm - 0.45*(r.saved?1:0) - 0.12*(cityMatch?1:0);
    return {...r, cityMatch, excluded, cost};
  }).sort((a,b)=> (a.excluded===b.excluded) ? a.cost-b.cost : (a.excluded?1:-1));
}

const COMMUNITY_FEED = [
  { id:'c1', user:'sara_ad', city:'Abu Dhabi', sport:'run', km:8, min:48, daysAgo:1, text:{ar:'كورنيش أبوظبي قبل الشروق',en:'Corniche before sunrise'} },
  { id:'c2', user:'omar_dxb', city:'Dubai', sport:'bike', km:42, min:95, daysAgo:2, text:{ar:'لفة جميرا مع حر معقول',en:'Jumeirah loop, manageable heat'} },
  { id:'c3', user:'noura_ruh', city:'Riyadh', sport:'run', km:10, min:58, daysAgo:3, text:{ar:'بوليفارد الرياض مسائي',en:'Evening boulevard run'} },
];

function closeDrawer(){
  document.getElementById('drawer')?.classList.remove('open');
  document.getElementById('drawerBg')?.classList.remove('open');
  document.documentElement.classList.remove('nav-open');
  const menuBtn=document.getElementById('menuToggle');
  if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
}
function navigate(){
  const hash = location.hash.replace('#/','') || 'home';
  const raw = hash.split('?')[0];
  const parts = raw.split('/');
  const route = parts[0] || 'home';
  state._topicId = parts[1] || null;
  renderRoute(route);
  document.querySelectorAll('[data-route]').forEach(el=>{
    const on = el.dataset.route===route;
    el.classList.toggle('active', on);
    if(on) el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current');
  });
  const skip=document.getElementById('skipLink');
  if(skip) skip.textContent = state.lang==='ar' ? 'تخطي إلى المحتوى' : 'Skip to content';
  const live=document.getElementById('liveStatus');
  if(live) live.textContent = '';

  closeDrawer();
  window.scrollTo({top:0, behavior:'instant'});
}
window.addEventListener('hashchange', navigate);


const MOTIVATIONS = {
  ar:['الشدة اللي تقدر تتكلم فيها تبني أسبوعك.','رقم اليوم يخدم رقم الشهر.','الفعالية مو عقوبة — هي اختبار مرح.','الراحة جزء من الحمل، مو غياب عنه.'],
  en:['The pace you can talk at builds the week.','Today’s number serves the month.','An event is a test, not a punishment.','Rest is part of load, not absence from it.']
};
function motivationLine(){
  const arr = MOTIVATIONS[state.lang]||MOTIVATIONS.ar;
  return arr[new Date().getDate() % arr.length];
}
function eventDate(offset){ return iso(addDays(new Date(), offset)); }

const ORGANIZERS = [
  {id:'adnoc-adsc', name:{ar:'أدنوك + مجلس أبوظبي الرياضي',en:'ADNOC + Abu Dhabi Sports Council'},
    why:{ar:'المنظم والراعي المعلن لماراثون أبوظبي وسباقات الظنة والعين.',en:'Named organiser and title sponsor of the Abu Dhabi Marathon and the Al Dhannah / Al Ain lead-up races.'},
    site:'https://www.adnocabudhabimarathon.com/'},
  {id:'adsc', name:{ar:'مجلس أبوظبي الرياضي',en:'Abu Dhabi Sports Council'},
    why:{ar:'الجهة الرسمية لرزنامة أبوظبي الجماهيرية واستضافة سبارتن الوثبة.',en:'Official mass-participation calendar body for Abu Dhabi and co-host of Spartan in Al Wathba.'},
    site:'https://adsc.gov.ae/'},
  {id:'dsc', name:{ar:'مجلس دبي الرياضي',en:'Dubai Sports Council'},
    why:{ar:'جهة الإمارة للياقة المجتمعية وشراكات سبارتن في دبي وحتا.',en:'Emirate body for community fitness and Spartan partnerships in Dubai and Hatta.'},
    site:'https://www.dubaissports.ae/'},
  {id:'spartan', name:{ar:'سبارتن ميدل إيست',en:'Spartan Middle East'},
    why:{ar:'المنظم المعلن لسباقات العوائق في الوثبة واتحاد أرينا ومنشآت دبي.',en:'Named OCR organiser for Al Wathba, Etihad Arena and Dubai venues.'},
    site:'https://arabia.spartan.com/'},
  {id:'scdm', name:{ar:'ماراثون دبي ستاندرد تشارترد',en:'Standard Chartered Dubai Marathon'},
    why:{ar:'السباق الطريقي الدولي السنوي المعلن في دبي.',en:'Published annual international road race in Dubai.'},
    site:'https://www.dubaimarathon.org/'},
  {id:'rakhalf', name:{ar:'نصف ماراثون رأس الخيمة',en:'Ras Al Khaimah Half Marathon'},
    why:{ar:'سباق نخبوي معلن على جزيرة المرجان.',en:'Published elite-label half marathon on Al Marjan Island.'},
    site:'https://www.rakhalfmarathon.com/'},
  {id:'uae-cycling', name:{ar:'طواف الإمارات',en:'UAE Tour'},
    why:{ar:'السباق الدراجي الرسمي متعدد المراحل على أرض الدولة.',en:'The country’s official multi-stage cycling tour.'},
    site:'https://www.theuaetour.com/'},
];

function EVENTS(){
  const official = [
    {id:'adnoc-dhannah', date:'2026-10-24', sport:'run', city:'Al Dhannah', km:10, org:'ADNOC / ADSC',
      title:{ar:'سباق أدنوك المجتمعي — الظنة 10 كم',en:'ADNOC Community Race — Al Dhannah 10K'},
      url:'https://www.adnocabudhabimarathon.com/'},
    {id:'adnoc-alain', date:'2026-11-07', sport:'run', city:'Al Ain', km:21.1, org:'ADNOC / ADSC',
      title:{ar:'سباق أدنوك المجتمعي — العين نصف ماراثون',en:'ADNOC Community Race — Al Ain Half'},
      url:'https://www.adnocabudhabimarathon.com/'},
    {id:'spartan-wc', date:'2026-11-19', sport:'race', city:'Al Wathba', km:21, org:'Spartan / ADSC',
      title:{ar:'بطولة العالم سبارتن — صحراء الوثبة',en:'Spartan World Championship — Al Wathba'},
      url:'https://arabia.spartan.com/'},
    {id:'ultra-hatta', date:'2026-11-28', sport:'run', city:'Hatta', km:30, org:'Ultra Trail Dubai',
      title:{ar:'ألترا تريل دبي — حتا',en:'Ultra Trail Dubai — Hatta'},
      url:'https://www.hdsports.org/running/united-arab-emirates-races-running-calendar'},
    {id:'adnoc-admh', date:'2026-12-12', sport:'run', city:'Abu Dhabi', km:42.2, org:'ADNOC / ADSC',
      title:{ar:'ماراثون أدنوك أبوظبي',en:'ADNOC Abu Dhabi Marathon'},
      url:'https://www.adnocabudhabimarathon.com/'},
    {id:'adnoc-10k', date:'2026-12-12', sport:'run', city:'Abu Dhabi', km:10, org:'ADNOC / ADSC',
      title:{ar:'أدنوك أبوظبي 10 كم',en:'ADNOC Abu Dhabi 10K'},
      url:'https://www.adnocabudhabimarathon.com/'},
    {id:'adnoc-5k', date:'2026-12-12', sport:'run', city:'Abu Dhabi', km:5, org:'ADNOC / ADSC',
      title:{ar:'أدنوك أبوظبي 5 كم عائلي',en:'ADNOC Abu Dhabi 5K'},
      url:'https://www.adnocabudhabimarathon.com/'},
    {id:'rak-half-27', date:'2027-02-13', sport:'run', city:'Ras Al Khaimah', km:21.1, org:'RAK Half / World Athletics',
      title:{ar:'نصف ماراثون رأس الخيمة (موسم قادم)',en:'Ras Al Khaimah Half Marathon (next season)'},
      url:'https://www.rakhalfmarathon.com/'},
    {id:'dxb-marathon-27', date:'2027-01-17', sport:'run', city:'Dubai', km:42.2, org:'Standard Chartered Dubai Marathon',
      title:{ar:'ماراثون دبي ستاندرد تشارترد (موسم قادم)',en:'Standard Chartered Dubai Marathon (next season)'},
      url:'https://www.dubaimarathon.org/'},
  ];
  const community = [
    {id:'e-parkrun', offset:3, sport:'run', city:'Abu Dhabi', km:5, org:'شوط', title:{ar:'تجمع جري كورنيش 5 كم',en:'Corniche 5K meetup'}},
    {id:'e-ow', offset:6, sport:'swim', city:'Khor Fakkan', km:1.5, org:'شوط', title:{ar:'سباحة ساحل خورفكان',en:'Khor Fakkan coastal swim'}},
    {id:'e-ride', offset:8, sport:'bike', city:'Al Ain', km:60, org:'شوط', title:{ar:'طلعة طريق العين',en:'Al Ain road ride'}},
    {id:'e-hatta', offset:14, sport:'run', city:'Hatta', km:12, org:'شوط', title:{ar:'جري حتا الجبلي',en:'Hatta trail run'}},
    {id:'e-rak', offset:16, sport:'bike', city:'Ras Al Khaimah', km:40, org:'شوط', title:{ar:'دراجة جزيرة المرجان',en:'Al Marjan island ride'}},
  ].map(e=>({...e, date:iso(addDays(new Date(), e.offset))}));
  return [...official, ...community].sort((a,b)=>a.date.localeCompare(b.date));
}

function renderRoute(route){
  ensurePlan();
  const app = document.getElementById('app');
  const views = {
    home:viewHome, how:viewHow, questionnaire:viewQuestionnaire, plan:viewPlan,
    nutrition:viewNutrition, equipment:viewEquipment, routes:viewRoutes,
    community:viewCommunity, specialist:viewSpecialist, account:viewAccount,
    legal:viewLegal, 'womens-health':viewWomensHealth,
    dashboard:viewDashboard, activities:viewActivities, events:viewEvents, progress:viewProgress,
    awareness:viewAwareness, topic:viewTopic, climate:viewClimate, supplements:viewSupplements,
  };
  app.innerHTML = (views[route] || viewHome)();
  bindViewEvents(route);
  applyTranslations();
}

function disclaimer(){ return `<div class="disclaimer">${icon('info',18)}<span>${t('disclaimer_text')}</span></div>`; }

function viewHome(){
  if(state.q.completed) return viewDashboard();
  return `
  <section class="hero"><div class="container hero-grid">
    <div>
      <div class="eyebrow" data-t="hero_eyebrow"></div>
      <h1 data-t="hero_title" style="margin-top:10px;"></h1>
      <p class="lead" data-t="hero_lead"></p>
      <div class="hero-cta">
        <a href="#/questionnaire" class="btn btn-primary" data-t="hero_cta1"></a>
        <a href="#/how" class="btn btn-ghost" data-t="hero_cta2"></a>
      </div>
      <div class="trust-badges">
        <span class="trust-chip">${icon('shield',14)}<span data-t="trust1"></span></span>
        <span class="trust-chip">${icon('xCircle',14)}<span data-t="trust2"></span></span>
        <span class="trust-chip">${icon('trendUp',14)}<span data-t="trust3"></span></span>
      </div>
    </div>
    <div class="hero-visual"><img src="img/hero-run.jpg" alt=""></div>
  </div></section>
  <section><div class="container">
    <div class="section-head"><div class="eyebrow" data-t="how_eyebrow"></div><h2 data-t="how_title"></h2></div>
    <div class="steps">
      <div class="step-card"><div class="step-num">1</div><h3 data-t="how1_t"></h3><p class="muted small" data-t="how1_d"></p></div>
      <div class="step-card"><div class="step-num">2</div><h3 data-t="how2_t"></h3><p class="muted small" data-t="how2_d"></p></div>
      <div class="step-card"><div class="step-num">3</div><h3 data-t="how3_t"></h3><p class="muted small" data-t="how3_d"></p></div>
      <div class="step-card"><div class="step-num">4</div><h3 data-t="how4_t"></h3><p class="muted small" data-t="how4_d"></p></div>
    </div>
  </div></section>
  <section><div class="container">
    <div class="section-head"><div class="eyebrow" data-t="vision_eyebrow"></div><h2 data-t="vision_title"></h2>
      <p class="muted" style="margin-top:10px;" data-t="vision_body"></p></div>
    <div class="grid g3">${TOPICS.slice(0,3).map(topicCard).join('')}</div>
    <a href="#/awareness" class="btn btn-ghost" style="margin-top:16px;" data-t="aware_title"></a>
  </div></section>
  <section><div class="container">
    <div class="section-head"><h2 data-t="nav_events"></h2>
      <p class="muted">${state.lang==='ar'?'أدنوك، سبارتن، ومجالس الرياضة — داخل الإمارات.':'ADNOC, Spartan, and sports councils — inside the UAE.'}</p></div>
    ${EVENTS().filter(e=>e.date>=iso(new Date())).slice(0,4).map(e=>`<div class="card" style="margin-bottom:10px;"><strong>${e.title[state.lang]}</strong><div class="muted small">${e.date} · ${e.city}</div></div>`).join('')}
    <a href="#/events" class="btn btn-primary" style="margin-top:8px;" data-t="nav_events"></a>
  </div></section>`;
}


function topicCard(tp){
  return `<a class="card media-card" href="#/topic/${tp.id}">
    <img src="${tp.img}" alt="">
    <div class="media-body">
      <div class="eyebrow">${tp.tag[state.lang]}</div>
      <h3 style="margin-top:6px;">${tp.title[state.lang]}</h3>
      <p class="muted small" style="margin-top:8px;">${t('aware_read')}</p>
    </div></a>`;
}

function viewClimate(){
  const gate = safetyGate();
  const cap = gate.intensityCeiling;
  return `<section><div class="container">
    ${disclaimer()}
    <div class="section-head"><h2 data-t="nav_climate"></h2>
      <p class="muted">${state.lang==='ar'
        ? 'اقتراحات ميدانية حسب الظرف. إذا القفل القلبي فعّال، خذ النسخة السهلة فقط.'
        : 'Field suggestions by condition. If the cardiac lock is on, use the easy version only.'}</p>
      ${cap==='low'?`<div class="safety-banner">${icon('shield',20)}<span>${t('sum_cardiac_locked')}</span></div>`:''}
    </div>
    ${CLIMATE.map(c=>`
      <div class="card media-card" style="margin-bottom:16px;">
        <img src="${c.img}" alt="" style="height:160px;">
        <div class="media-body">
          <h3>${c.title[state.lang]}</h3>
          <p class="muted small" style="margin-top:6px;">${c.when[state.lang]}</p>
          <ul class="muted" style="margin:12px 0 0 0; padding-inline-start:18px;">
            ${c.rules[state.lang].map(r=>`<li style="margin-bottom:6px;">${r}</li>`).join('')}
          </ul>
          <h3 style="margin-top:16px;">${state.lang==='ar'?'جلسات مقترحة':'Suggested sessions'}</h3>
          ${c.sessions[state.lang].map(s=>`<div class="wo-chip" style="margin-top:8px;">${s.t}<br><span class="muted">${s.d}${cap==='low' && state.lang==='ar'?' · سقف منخفض': cap==='low'?' · low cap':''}</span></div>`).join('')}
        </div>
      </div>`).join('')}
    <p class="muted small">${state.lang==='ar'
      ? 'المراجع: Racinais 2015؛ ACSM حر 2023؛ Sawka 2007؛ BJSM رمضان 2024. تفاصيل الاستشهاد في صفحة الوعي.'
      : 'Sources: Racinais 2015; ACSM heat 2023; Sawka 2007; BJSM Ramadan 2024. Full citations live on Awareness.'}</p>
  </div></section>`;
}

function viewAwareness(){
  return `<section><div class="container">
    ${disclaimer()}
    <div class="section-head"><h2 data-t="aware_title"></h2><p class="muted" data-t="aware_sub"></p></div>
    <div class="card" style="margin-bottom:18px;">
      <div class="eyebrow" data-t="vision_eyebrow"></div>
      <h3 style="margin-top:8px;" data-t="vision_title"></h3>
      <p class="muted" style="margin-top:8px;" data-t="vision_body"></p>
    </div>
    <div class="grid g3">${TOPICS.map(topicCard).join('')}</div>
  </div></section>`;
}
function viewTopic(){
  const tp = TOPICS.find(x=>x.id===state._topicId) || TOPICS[0];
  return `<section><div class="container wizard-wrap">
    ${disclaimer()}
    <div class="card media-card">
      <img src="${tp.img}" alt="" style="height:220px;">
      <div class="media-body">
        <div class="eyebrow">${tp.tag[state.lang]}</div>
        <h2 style="margin-top:8px;">${tp.title[state.lang]}</h2>
        ${tp.body[state.lang].map(p=>`<p style="margin-top:12px;">${p}</p>`).join('')}
        <h3 style="margin-top:22px;">${state.lang==='ar'?'المراجع':'References'}</h3>
        <ol class="muted small" style="margin-top:8px; padding-inline-start:18px;">${(tp.refs||[]).map(r=>`<li style="margin-bottom:8px;">${r}</li>`).join('')}</ol>
        <a href="#/awareness" class="btn btn-ghost" style="margin-top:16px;" data-t="aware_back"></a>
      </div>
    </div>
  </div></section>`;
}


function viewHow(){
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="how_title"></h2></div>
    <div class="grid g2">
      <div class="step-card"><div class="step-num">1</div><h3 data-t="how1_t"></h3><p class="muted small" data-t="how1_d"></p></div>
      <div class="step-card"><div class="step-num">2</div><h3 data-t="how2_t"></h3><p class="muted small" data-t="how2_d"></p></div>
      <div class="step-card"><div class="step-num">3</div><h3 data-t="how3_t"></h3><p class="muted small" data-t="how3_d"></p></div>
      <div class="step-card"><div class="step-num">4</div><h3 data-t="how4_t"></h3><p class="muted small" data-t="how4_d"></p></div>
    </div>
    <div class="card" style="margin-top:var(--sp-3);">
      <h3 data-t="how_engine_title"></h3>
      <p class="muted small" style="margin-top:8px;" data-t="how_engine_body"></p>
      <div class="disclaimer" style="margin-top:14px;">${icon('shield',18)}<span data-t="how_no_copy"></span></div>
    </div>
  </div></section>`;
}

function choiceBtn(group,value,labelKey,critical){
  const selected = state.q[group]===value ? 'selected':'';
  return `<button class="choice ${critical?'choice-critical':''} ${selected}" data-qgroup="${group}" data-qvalue="${value}" data-t="${labelKey}"></button>`;
}
function iconChoice(group,value,iconName,labelKey){
  const selected = state.q[group]===value ? 'selected':'';
  return `<button type="button" class="choice choice-icon ${selected}" data-qgroup="${group}" data-qvalue="${value}" aria-pressed="${selected?'true':'false'}">
    <span class="choice-icon-wrap">${icon(iconName,20)}</span><span data-t="${labelKey}"></span></button>`;
}
function multiChip(arrName,value,labelKey){
  const selected = (state.q[arrName]||[]).includes(value) ? 'selected':'';
  return `<button type="button" class="choice ${selected}" data-qmulti="${arrName}" data-qvalue="${value}" data-t="${labelKey}" aria-pressed="${selected?'true':'false'}"></button>`;
}

function viewQuestionnaire(){
  const step = state.qStep;
  if(step > Q_LAST) return renderSummary();
  const pos = stepPosition(step);
  const pct = (pos.index+1)/pos.total*100;
  const stepLabel = t('q_step_of').replace('{n}',pos.index+1).replace('{total}',pos.total);
  let body='';
  if(step===1) body = qNumber('height','q_height_h','q_height_sub','ruler','175');
  else if(step===2) body = qNumber('weight','q_weight_h','q_weight_sub','scale','72');
  else if(step===3) body = qCity();
  else if(step===4) body = `<div class="q-text" data-t="q_goal_h"></div><div class="choice-group" style="margin-top:16px;">
    ${choiceBtn('goal','fitness','goal_fit')}${choiceBtn('goal','race','goal_race')}${choiceBtn('goal','time','goal_time')}</div>`;
  else if(step===5) body = `<div class="q-text" data-t="q_sport_h"></div><div class="choice-group-4" style="margin-top:16px;">
    ${iconChoice('sport','run','run','sport_run')}${iconChoice('sport','swim','swim','sport_swim')}
    ${iconChoice('sport','bike','bike','sport_bike')}${iconChoice('sport','tri','tri','sport_tri')}</div>`;
  else if(step===6) body = `<div class="q-text" data-t="q_hours_h"></div><div class="field" style="margin-top:16px;"><div class="input-wrap"><span class="field-icon">${icon('clock')}</span>
    <select id="qHours">${[2,3,4,5,6,8,10].map(h=>`<option value="${h}" ${state.q.hours===h?'selected':''}>${h}</option>`).join('')}</select></div></div>`;
  else if(step===7) body = `<div class="q-text" data-t="q_medical_h"></div><div class="q-sub" data-t="q_medical_sub"></div>
    <div class="choice-group" style="grid-template-columns:repeat(2,1fr);">
      ${multiChip('medical','none','med_none')}${multiChip('medical','diabetes','med_diabetes')}
      ${multiChip('medical','asthma','med_asthma')}${multiChip('medical','joint','med_joint')}${multiChip('medical','other','med_other')}</div>`;
  else if(step===8) body = `<div class="q-text" data-t="q_cardiac_h"></div><div class="q-sub" data-t="q_cardiac_sub"></div>
    <div class="choice-group-2">${choiceBtn('cardiacFlag','true','yes',true)}${choiceBtn('cardiacFlag','false','no')}</div>
    <div class="err-msg" id="cardiacErr" data-t="q_cardiac_err" role="alert"></div>`;
  else if(step===9) body = `<div class="q-text" data-t="q_cardiac_followup_h"></div><div class="q-sub" data-t="q_cardiac_followup_sub"></div>
    <div class="choice-group-2">${choiceBtn('cardiacClearance','true','yes')}${choiceBtn('cardiacClearance','false','no')}</div>
    <div class="err-msg" id="cardiacFollowupErr" data-t="q_cardiac_followup_err" role="alert"></div>`;
  else if(step===10) body = `<div class="q-text" data-t="q_allergens_h"></div><div class="q-sub" data-t="q_allergens_sub"></div>
    <div class="choice-group" style="grid-template-columns:repeat(2,1fr);">
      ${multiChip('allergens','nuts','all_nuts')}${multiChip('allergens','shellfish','all_shellfish')}
      ${multiChip('allergens','gluten','all_gluten')}${multiChip('allergens','dairy','all_dairy')}${multiChip('allergens','none','all_none')}</div>`;
  else if(step===11){
    const list = currentAllergensExclNone();
    const labelMap = {nuts:'all_nuts',shellfish:'all_shellfish',gluten:'all_gluten',dairy:'all_dairy'};
    body = `<div class="q-text" data-t="q_severity_h"></div><div class="q-sub" data-t="q_severity_sub"></div>
      ${list.map(a=>`<div class="severity-row"><span class="allergen-name" data-t="${labelMap[a]}"></span>
        <div class="severity-choices">
          <button class="sev-btn sel-mild ${state.q.allergySeverity[a]==='mild'?'selected':''}" data-sev-allergen="${a}" data-sev-value="mild" data-t="sev_mild"></button>
          <button class="sev-btn sel-moderate ${state.q.allergySeverity[a]==='moderate'?'selected':''}" data-sev-allergen="${a}" data-sev-value="moderate" data-t="sev_moderate"></button>
          <button class="sev-btn sel-severe ${state.q.allergySeverity[a]==='severe'?'selected':''}" data-sev-allergen="${a}" data-sev-value="severe" data-t="sev_severe"></button>
        </div></div>`).join('')}
      <div class="err-msg" id="severityErr" data-t="q_severity_err" role="alert"></div>`;
  }
  else if(step===12) body = `<div class="q-text" data-t="q_sleep_h"></div><div class="choice-group" style="margin-top:16px;">
    ${choiceBtn('sleep','lt5','sleep_lt5')}${choiceBtn('sleep','5_6','sleep_5_6')}${choiceBtn('sleep','7_8','sleep_7_8')}${choiceBtn('sleep','8plus','sleep_8plus')}</div>`;
  else if(step===13) body = `<div class="q-text" data-t="q_ramadan_h"></div><div class="choice-group-2" style="margin-top:16px;">
    ${choiceBtn('ramadan','true','yes')}${choiceBtn('ramadan','false','no')}</div>`;
  else body = `<div class="q-text" data-t="sum_title"></div><div class="q-sub" data-t="sum_sub"></div>`;

  return `<section><div class="container wizard-wrap">
    <div class="step-label">${stepLabel}</div>
    <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}" aria-label="${stepLabel}"><div class="progress-fill" style="width:${pct}%;"></div></div>
    <div class="card">${body}
      <div class="wizard-nav">
        ${step>1?`<button class="btn btn-ghost" id="qBack" data-t="q_back"></button>`:`<span></span>`}
        <button class="btn btn-primary" id="qNext" data-t="${pos.isLast?'q_finish':'q_next'}"></button>
      </div>
    </div>
  </div></section>`;
}
function qNumber(field,hKey,subKey,iconName,placeholder){
  return `<div class="q-text" data-t="${hKey}"></div><div class="q-sub" data-t="${subKey}"></div>
  <div class="input-wrap"><span class="field-icon">${icon(iconName)}</span>
  <input type="number" id="qInput_${field}" value="${state.q[field]||''}" placeholder="${placeholder}"></div>`;
}
function qCity(){
  const cities=['Abu Dhabi','Dubai','Fujairah','Riyadh','Jeddah','Doha','Kuwait','Manama'];
  return `<div class="q-text" data-t="q_city_h"></div>
  <div class="input-wrap" style="margin-top:16px;"><span class="field-icon">${icon('mapPin')}</span>
  <select id="qInput_city">${cities.map(c=>`<option ${state.q.city===c?'selected':''}>${c}</option>`).join('')}</select></div>`;
}
function renderSummary(){
  const gate = safetyGate();
  return `<section><div class="container wizard-wrap"><div class="card">
    ${disclaimer()}<h3 data-t="sum_title"></h3><p class="muted small" data-t="sum_sub" style="margin-bottom:14px;"></p>
    <div class="constraint-item ${gate.cardiacLocked?'locked':'ok'}">${icon(gate.cardiacLocked?'alertTriangle':'checkCircle',20)}
      <span>${gate.cardiacLocked?t('sum_cardiac_locked'):t('sum_cardiac_ok')}</span></div>
    <div class="constraint-item ${gate.severeAllergens.length?'locked':'ok'}">${icon(gate.severeAllergens.length?'alertTriangle':'checkCircle',20)}
      <span>${gate.severeAllergens.length? t('sum_allergy_locked')+gate.severeAllergens.map(a=>t('all_'+a)).join('، '):t('sum_allergy_ok')}</span></div>
    ${state.q.ramadan==='true'?`<div class="constraint-item ok">${icon('info',20)}<span>${t('sum_ramadan_note')}</span></div>`:''}
    <a href="#/plan" class="btn btn-primary" style="margin-top:18px;width:100%;" id="sumGoPlan" data-t="sum_cta"></a>
  </div></div></section>`;
}

function weekDays(){
  const names = state.lang==='ar'
    ? ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة']
    : ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
  const start = addDays(startOfGulfWeek(new Date()), state.weekOffset*7);
  return names.map((n,i)=>({label:n, date:iso(addDays(start,i))}));
}

function viewPlan(){
  if(!state.q.completed){
    return `<section><div class="container wizard-wrap" style="text-align:center;"><div class="card">
      <p class="muted" data-t="plan_no_data"></p>
      <a href="#/questionnaire" class="btn btn-primary" style="margin-top:14px;" data-t="plan_go_q"></a>
    </div></div></section>`;
  }
  const gate = safetyGate();
  const days = weekDays();
  const weekItems = (state.planned||[]).filter(p=>days.some(d=>d.date===p.date));
  const doneN = weekItems.filter(p=>p.done).length;
  const hasTest = !!state.q.cooperDistanceM;
  let zoneRows;
  if(hasTest){
    const z = paceZonesFromCooper(state.q.cooperDistanceM);
    zoneRows = [{label:t('zone_easy'),pace:formatPace(z.easy)},{label:t('zone_moderate'),pace:formatPace(z.moderate)},{label:t('zone_hard'),pace:formatPace(z.hard)}];
  } else {
    zoneRows = [{label:t('zone_easy'),pace:t('zone_easy_desc')},{label:t('zone_moderate'),pace:t('zone_moderate_desc')},{label:t('zone_hard'),pace:t('zone_hard_desc')}];
  }
  return `<section><div class="container">
    ${disclaimer()}
    ${gate.cardiacLocked?`<div class="safety-banner">${icon('shield',22)}<span><b>${t('sum_cardiac_locked')}</b></span></div>`:''}
    <div class="card" style="margin-bottom:var(--sp-3);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <h2 data-t="plan_title"></h2>
        <a href="#/climate" class="btn btn-ghost btn-sm" data-t="nav_climate"></a>
        <span class="intensity-badge ${gate.intensityCeiling==='low'?'intensity-low':'intensity-mid'}">
          ${gate.intensityCeiling==='low'?t('intensity_low'):t('intensity_mid')}
        </span>
      </div>
      <p class="muted small">${gate.cardiacLocked?t('plan_reason_cardiac'):t('plan_reason_none')} · ${t('compliance')} ${doneN}/${weekItems.length||0}</p>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="btn btn-ghost btn-sm" id="weekPrev" data-t="week_prev"></button>
        <button class="btn btn-ghost btn-sm" id="weekNext" data-t="week_next"></button>
      </div>
    </div>
    <p class="week-hint">${state.lang==="ar"?"اسحب لعرض بقية أيام الأسبوع":"Swipe to see the rest of the week"}</p><div class="week-scroll"><div class="week-grid" style="margin-bottom:var(--sp-3);">
      ${days.map(d=>{
        const items = weekItems.filter(p=>p.date===d.date);
        return `<div class="day-col ${d.date===iso(new Date())?'is-today':''}"><h4>${d.label}<br><span class="muted">${d.date.slice(5)}</span></h4>
          ${items.length? items.map(p=>`
            <button class="wo-chip ${p.done?'done':''}" data-toggle-plan="${p.id}" aria-pressed="${p.done?'true':'false'}">
              ${icon(p.sport,14)} ${sessionTitle(p.sport,p.zone)}<br>
              <span class="muted">${p.min} ${unit('min')}${p.km? ' · '+p.km+' '+unit('km'):''} · ${t('zone_'+p.zone)} · ${unit('load')} ${sessionLoad(p.min,p.zone)}</span><br>
              <span class="muted">${p.postIftar? t('chip_post_iftar')+' · ':''}${p.done?t('marked'):t('mark_done')}</span>
            </button>`).join('') : `<span class="muted small">${t('rest')}</span>`}
        </div>`;
      }).join('')}
    </div></div>
    <div class="card" style="margin-bottom:var(--sp-3);">
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <h3 data-t="plan_zones_title"></h3>
        <span class="estimate-tag">${hasTest?t('plan_zones_source_test'):t('plan_zones_source_talk')}</span>
      </div>
      <p class="muted small" style="margin-top:8px;" data-t="plan_heat_note"></p>
      <table class="pt-table"><thead><tr><th data-t="pt_zone"></th><th data-t="pt_pace"></th></tr></thead>
      <tbody>${zoneRows.map(z=>`<tr><td>${z.label}</td><td>${z.pace}</td></tr>`).join('')}</tbody></table>
      ${!hasTest?`<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--card-border);">
        <label style="display:block;font-weight:700;margin-bottom:8px;" data-t="cooper_cta"></label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <input type="number" id="cooperInput" placeholder="2400" style="max-width:140px;padding:10px 12px;border-radius:8px;border:1.5px solid var(--card-border);background:var(--bg);color:var(--text);">
          <button class="btn btn-primary btn-sm" id="cooperCalcBtn" data-t="cooper_calc"></button>
        </div></div>`: (state.q.cooperDistanceM? `<p class="muted small" style="margin-top:8px;">VO2max ≈ ${cooperVO2max(state.q.cooperDistanceM).toFixed(1)}</p>`:'')}
    </div>
    <div class="card">
      <h3 data-t="plan_constraints_title"></h3>
      <div class="constraint-item ${gate.cardiacLocked?'locked':'ok'}">${icon(gate.cardiacLocked?'lock':'checkCircle',18)}
        <span>${gate.cardiacLocked?t('sum_cardiac_locked'):(gate.cardiacReported?t('sum_cardiac_cleared'):t('sum_cardiac_ok'))}</span></div>
      <div class="constraint-item ${gate.severeAllergens.length?'locked':'ok'}">${icon(gate.severeAllergens.length?'lock':'checkCircle',18)}
        <span>${gate.severeAllergens.length?t('sum_allergy_locked')+gate.severeAllergens.map(a=>t('all_'+a)).join('، '):t('sum_allergy_ok')}</span></div>
      ${state.q.ramadan==='true'?`<div class="constraint-item ok">${icon('calendarCheck',18)}<span>${t('plan_ramadan_applied')}</span></div>`:''}
      ${medicalNotes().map(n=>`<div class="constraint-item ok">${icon('info',18)}<span>${n}</span></div>`).join('')}
      ${gate.cardiacLocked?`<a href="#/specialist" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="plan_specialist_cta"></a>`:''}
    </div>
  </div></section>`;
}


function viewProgress(){
  const p = triathlonProgress();
  const lang = state.lang;
  const how = lang==='ar' ? [
    ['السباحة','وقت لكل 100 م على نفس الإحساس (اختبار كلام). أعد نفس المسافة كل 4–6 أسابيع في نفس المسبح إن أمكن.'],
    ['الدراجة','زمن أو متوسط سرعة على نفس المسار ونفس الإحساس، أو قدرة تقريبية إن عندك عدّاد. الحر يبطّئ الرقم بدون أن يعني تراجع اللياقة.'],
    ['الجري','وتيرة الكيلومتر من اختبار Cooper أو من جري سهل معلوم. قارن بنفس درجة الحديث لا بأسرع يوم.'],
    ['الانتقال','زمن التمرين المزدوج (دراجة ثم جري) أهم من كل جزء لوحده في يوم السباق.'],
    ['الثبات','نسبة إكمال جلسات الأسبوع. في التراياثلون الثبات يتفوّق على أسبوع بطولي ثم انقطاع.'],
    ['الحمل','لياقة Banister (42 يوماً) مقابل إرهاق (7 أيام). فورمة موجبة قبل السباق هدف، مو أعلى حمل ممكن.']
  ] : [
    ['Swim','Time per 100 m at the same Talk Test. Repeat the same distance every 4–6 weeks in the same pool if you can.'],
    ['Bike','Time or average speed on the same route at the same sensation, or power if you have a meter. Heat slows the clock without meaning lost fitness.'],
    ['Run','Km pace from Cooper or from a known easy run. Compare the same talk level, not your fastest day.'],
    ['Transition','Brick time (bike then run) matters more on race day than isolated splits.'],
    ['Consistency','Share of planned sessions completed. In triathlon, consistency beats one heroic week and a gap.'],
    ['Load','Banister fitness (42 days) versus fatigue (7 days). Positive form before a race is the aim, not the highest possible load.']
  ];
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="nav_progress"></h2>
      <p class="muted">${lang==='ar'?'التقدم في التراياثلون = ثبات + أجزاء الثلاثة + انتقال، مو الوزن وحده.':'Triathlon progress = consistency + three disciplines + brick, not scale weight.'}</p></div>
    <div class="stat-grid" style="margin-bottom:18px;">
      <div class="card stat-card"><div class="stat-val">${p.completion}%</div><div class="stat-lbl">${lang==='ar'?'إكمال 28 يوماً':'28-day completion'}</div></div>
      <div class="card stat-card"><div class="stat-val">${p.logged}</div><div class="stat-lbl">${lang==='ar'?'أنشطة مسجّلة':'Logged sessions'}</div></div>
      <div class="card stat-card"><div class="stat-val">${p.ff.fitness}</div><div class="stat-lbl">${lang==='ar'?'لياقة':'Fitness'}</div></div>
      <div class="card stat-card"><div class="stat-val">${p.ff.form}</div><div class="stat-lbl">${lang==='ar'?'فورمة':'Form'}</div></div>
    </div>
    <div class="card" style="margin-bottom:14px;">
      <h3>${lang==='ar'?'توزيع آخر 28 يوماً':'Last 28 days mix'}</h3>
      <p class="muted small" style="margin-top:8px;">${lang==='ar'?'سباحة':'Swim'} ${p.by.swim} · ${lang==='ar'?'دراجة':'Bike'} ${p.by.bike} · ${lang==='ar'?'جري':'Run'} ${p.by.run} · ${lang==='ar'?'مزدوج':'Brick'} ${p.by.brick} · ${lang==='ar'?'أخرى':'Other'} ${p.by.other}</p>
      <p class="muted small">${lang==='ar'?'هدف توازن تقريبي للهواة: لا يختفي أحد الأجزاء أسبوعين متتاليين.':'A simple amateur aim: no discipline disappears for two weeks.'}</p>
    </div>
    <div class="grid g2" style="margin-bottom:16px;">
      <div class="card"><h3>${lang==='ar'?'أفضل وتيرة جري مسجّلة':'Best logged run pace'}</h3>
        <p style="font-weight:800;margin-top:8px;">${p.bestRun?fmtPace(p.bestRun.secPerKm)+' /'+unit('km'):'—'}</p></div>
      <div class="card"><h3>${lang==='ar'?'أفضل وتيرة دراجة مسجّلة':'Best logged bike pace'}</h3>
        <p style="font-weight:800;margin-top:8px;">${p.bestBike?fmtPace(p.bestBike.secPerKm)+' /'+unit('km'):'—'}</p></div>
    </div>
    <div class="card" style="margin-bottom:16px;">
      <h3>Cooper</h3>
      <p class="muted small" style="margin-top:8px;">${p.lastCooper? (lang==='ar'?`${p.lastCooper} م — أعد الاختبار كل 6–8 أسابيع على نفس المسار.`:`${p.lastCooper} m — retest every 6–8 weeks on the same course.`):(lang==='ar'?'ما في اختبار بعد. سجّله من الخطة بعد التقييم.':'No test yet. Log it from the plan after assessment.')}</p>
    </div>
    <h3 style="margin-bottom:10px;">${lang==='ar'?'كيف تقيس — لا ماذا تخمّن':'How to measure — not what to guess'}</h3>
    <div class="grid g2">${how.map(([h,b])=>`<div class="card"><h3>${h}</h3><p class="muted small" style="margin-top:8px;">${b}</p></div>`).join('')}</div>
    <p class="muted small" style="margin-top:14px;">${lang==='ar'
      ? 'المراجع العملية: Cooper 1968؛ اختبار الكلام Persinger 2004؛ نموذج Banister 1975. الأرقام هنا تقدير ميداني وليست VO2 مختبري ولا FTP تجاري.'
      : 'Working refs: Cooper 1968; Talk Test Persinger 2004; Banister 1975. These are field estimates, not lab VO2 or commercial FTP.'}</p>
  </div></section>`;
}

function viewDashboard(){
  if(!state.q.completed){
    return `<section><div class="container wizard-wrap"><div class="card"><p class="muted" data-t="dash_need_q"></p>
      <a href="#/questionnaire" class="btn btn-primary" style="margin-top:12px;" data-t="plan_go_q"></a></div></div></section>`;
  }
  const r = readiness();
  const today = iso(new Date());
  const todays = (state.planned||[]).filter(p=>p.date===today);
  const bars = [];
  for(let i=13;i>=0;i--){
    const d = iso(addDays(new Date(),-i));
    let L=0;
    (state.activities||[]).filter(a=>a.date===d).forEach(a=>L+=a.load||0);
    bars.push(L);
  }
  const maxB = Math.max(10,...bars);
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="dash_title"></h2><p class="muted small">${state.q.city} · ${state.q.sport?t('sport_'+state.q.sport):''}</p>
      <p class="muted">${motivationLine()}</p></div>
    <div class="hero-cta" style="margin-bottom:16px;">
      <a href="#/plan" class="btn btn-primary">${t('dash_today')}</a>
      <a href="#/activities" class="btn btn-ghost">${t('act_add')}</a>
      <a href="#/progress" class="btn btn-ghost">${t('nav_progress')}</a>
    </div>
    <div class="stat-grid" style="margin-bottom:var(--sp-3);">
      <div class="card stat-card" style="display:flex;align-items:center;gap:14px;">
        <div class="readiness-ring readiness-${r.band}">${r.score}</div>
        <div><div class="stat-lbl" data-t="dash_ready"></div><div class="muted small">${r.msg}</div></div>
      </div>
      <div class="card stat-card"><div class="stat-val">${r.energy}</div><div class="stat-lbl" data-t="dash_energy"></div></div>
      <div class="card stat-card"><div class="stat-val">${r.load7}</div><div class="stat-lbl" data-t="dash_load"></div></div>
      <div class="card stat-card"><div class="stat-val">${r.form}</div><div class="stat-lbl" data-t="dash_form"></div>
        <div class="muted small">${t('dash_fit')} ${r.fitness} · ${t('dash_fat')} ${r.fatigue}</div></div>
    </div>
    <div class="grid g2">
      <div class="card">
        <h3 data-t="dash_today"></h3>
        ${todays.length? todays.map(p=>`<p style="margin-top:10px;font-weight:700;">${icon(p.sport,16)} ${sessionTitle(p.sport,p.zone)} · ${p.min} ${unit('min')} · ${t('zone_'+p.zone)}${p.postIftar?' · '+t('chip_post_iftar'):''}</p>`).join('') : `<p class="muted" style="margin-top:8px;">${t('rest')}</p>`}
        <a href="#/plan" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="nav_plan"></a>
      </div>
      <div class="card">
        <h3 data-t="dash_pmc"></h3>
        <div class="pmc-bars">${bars.map(b=>`<div class="pmc-bar" style="height:${Math.round(b/maxB*100)}%;"></div>`).join('')}</div>
      </div>
    </div>
    ${(() => {
      const today = iso(new Date());
      const next = EVENTS().filter(e=>e.date>=today).slice(0,3);
      const joined = new Set(state.joinedEvents||[]);
      if(!next.length) return '';
      return `<div class="card" style="margin-top:16px;">
        <h3>${state.lang==='ar'?'الشوط الجاي في الرزنامة':'Next split on the calendar'}</h3>
        ${next.map(e=>`<p style="margin-top:10px;">${e.date} · ${e.city} · ${e.title[state.lang]} ${joined.has(e.id)?' · ✓':''}</p>`).join('')}
        <a href="#/events" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="nav_events"></a>
      </div>`;
    })()}
  </div></section>`;
}


function viewEvents(){
  const joined = new Set(state.joinedEvents||[]);
  const all = EVENTS();
  const cities = ['all', ...Array.from(new Set(all.map(e=>e.city)))];
  const filter = state.eventCity || 'all';
  const list = filter==='all' ? all : all.filter(e=>e.city===filter);
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="nav_events"></h2>
      <p class="muted">${motivationLine()}</p></div>
    <p class="muted small" style="margin-bottom:14px;">${state.lang==='ar'
      ? 'رزنامة الإمارات فقط. الانضمام محلي على جهازك — التسجيل عند المنظم.'
      : 'UAE calendar only. Join is local on this device — entry is with the organiser.'}</p>
    <div class="field" style="max-width:280px;margin-bottom:16px;">
      <label>${state.lang==='ar'?'المدينة':'City'}</label>
      <select id="eventCityFilter">${cities.map(c=>`<option value="${c}" ${filter===c?'selected':''}>${c==='all'?(state.lang==='ar'?'كل المدن':'All cities'):c}</option>`).join('')}</select>
    </div>
    <div class="card" style="margin-bottom:16px;">
      <h3>${state.lang==='ar'?'معايير تصنيف الفعاليات':'How events are classified'}</h3>
      <ul class="muted small" style="margin-top:10px;padding-inline-start:18px;">
        <li>${state.lang==='ar'?'الجغرافيا: داخل الإمارات فقط — إمارة أو مدينة أو قرية مدرجة. لا تُعرض سباقات خارج الدولة.':'Geography: UAE only — an emirate, city or listed town. No races outside the country.'}</li>
        <li>${state.lang==='ar'?'المصدر: رسمي إذا التاريخ من منظم معلن (أدنوك، مجلس أبوظبي الرياضي، سبارتن، ماراثون دبي). مجتمعي إذا تجمّع محلي داخل التطبيق.':'Source: official if the date comes from a named organiser (ADNOC, ADSC, Spartan, Dubai Marathon). Community if it is an in-app meetup.'}</li>
        <li>${state.lang==='ar'?'الرياضة: جري، سباحة، دراجة، سباق/عوائق، مزدوج، قوة، حركة — حسب طبيعة الحدث لا حسب الراعي فقط.':'Sport: run, swim, bike, race/OCR, brick, strength, mobility — by the effort, not by the sponsor logo alone.'}</li>
        <li>${state.lang==='ar'?'المسافة: الرقم المعلن للكتلة الرئيسية (42.2 / 21.1 / 10…). المسافات العائلية تظهر كفعاليات منفصلة إن وُجدت.':'Distance: the published flagship distance (42.2 / 21.1 / 10…). Family distances appear as separate rows when listed.'}</li>
        <li>${state.lang==='ar'?'الترتيب: التاريخ الأقرب أولاً. الماضي لا يُحذف إن بقي في الرزنامة للتوثيق، والقادم يظهر أعلى بعد الفرز.':'Order: soonest date first. Past rows may remain as record; sorting still puts the next date on top.'}</li>
        <li>${state.lang==='ar'?'الانضمام: إشارة محلية على جهازك، ليست تسجيلاً لدى المنظم ولا دفع رسوم.':'Join: a local flag on this device — not organiser registration and not a payment.'}</li>
        <li>${state.lang==='ar'?'القفل الأمني: الفعالية لا تلغي سقف الشدة إن التقييم القلبي مقفول. سبارتن والماراثون الكامل يُعاملان كحمل عالٍ.':'Safety gate: an event does not lift a cardiac intensity cap. Spartan and a full marathon count as high load.'}</li>
      </ul>
    </div>
    <div class="card" style="margin-bottom:16px;">
      <h3>${state.lang==='ar'?'المنظمون المعتمدون في الرزنامة':'Listed organisers'}</h3>
      <p class="muted small" style="margin-top:8px;">${state.lang==='ar'
        ? 'اعتماد الرزنامة يعني: جهة معلنة لها موقع وتاريخ منشور. ليس ترخيصاً حكومياً من شوط ولا ضمان سلامة يوم السباق.'
        : 'Listed means: a named body with a public site and date. Not a government licence issued by Shawṭ, and not a guarantee of race-day safety.'}</p>
      ${ORGANIZERS.map(o=>`<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--card-border);">
        <strong>${o.name[state.lang]}</strong>
        <p class="muted small" style="margin-top:4px;">${o.why[state.lang]}</p>
        <a class="muted small" href="${o.site}" target="_blank" rel="noopener">${o.site.replace('https://','')}</a>
      </div>`).join('')}
    </div>
    <p class="muted small" style="margin-bottom:12px;">${state.lang==='ar'
      ? 'مصادر التواريخ الرسمية: مواقع المنظمين أعلاه. التواريخ قد تتغيّر — تحقق قبل الدفع.'
      : 'Official dates come from the organiser sites above. Dates can move — confirm before paying.'}</p>
    ${list.map(e=>`<div class="card" style="margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap;">
      <img src="${e.sport==='swim'?'img/swim.jpg':e.sport==='bike'?'img/bike.jpg':e.sport==='strength'?'img/gear.jpg':'img/hero-run.jpg'}" alt="" style="width:88px;height:88px;object-fit:cover;border-radius:12px;">
      <div style="flex:1;min-width:180px;">
        <div class="eyebrow">${e.date} · ${e.city}${e.org?' · '+e.org:''}</div>
        <h3 style="margin-top:4px;">${e.title[state.lang]}</h3>
        <p class="muted small">${t('sport_'+e.sport)}${e.km? ' · '+e.km+' '+unit('km'):''}</p>
        ${e.url?`<a class="muted small" href="${e.url}" target="_blank" rel="noopener">${state.lang==='ar'?'موقع المنظم':'Organiser site'}</a>`:''}
      </div>
      <button class="btn ${joined.has(e.id)?'btn-ghost':'btn-primary'} btn-sm" data-join="${e.id}">${joined.has(e.id)?(state.lang==='ar'?'منضم':'Joined'):(state.lang==='ar'?'أنضم':'Join')}</button>
    </div>`).join('')}
  </div></section>`;
}

function viewActivities(){
  const acts = (state.activities||[]).slice().sort((a,b)=>b.date.localeCompare(a.date));
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="act_title"></h2>
      <p class="muted">${motivationLine()}</p>
      <a href="#/events" class="btn btn-ghost btn-sm" data-t="nav_events"></a></div>
    <div class="card" style="margin-bottom:var(--sp-3);">
      <h3 data-t="act_add"></h3>
      <div class="grid g2" style="margin-top:12px;">
        <div class="field"><label data-t="act_sport"></label>
          <select id="actSport">${['run','swim','bike','brick','strength','mobility','race'].map(s=>`<option value="${s}">${t('sport_'+s)}</option>`).join('')}</select></div>
        <div class="field"><label>${state.lang==='ar'?'التاريخ':'Date'}</label><input type="date" id="actDate" value="${iso(new Date())}"></div>
        <div class="field"><label data-t="act_km"></label><input type="number" id="actKm" step="0.1" placeholder="8"></div>
        <div class="field"><label data-t="act_min"></label><input type="number" id="actMin" placeholder="50"></div>
        <div class="field"><label data-t="act_rpe"></label><input type="number" id="actRpe" min="1" max="10" placeholder="5"></div>
      </div>
      <button class="btn btn-primary" id="actSave" style="margin-top:8px;" data-t="act_save"></button>
    </div>
    ${acts.length? acts.map(a=>activityCard(a,true)).join('') : `<p class="muted" data-t="act_empty"></p>`}
  </div></section>`;
}
function activityCard(a, mine){
  const liked = !!state.kudos[a.id];
  const count = (a.kudos||0) + (liked?1:0);
  return `<div class="card feed-card" style="margin-bottom:12px;">
    <div class="feed-meta"><strong>${mine?t('feed_you'):a.user}</strong><span>${a.date}</span></div>
    <div style="font-weight:800;">${icon(a.sport,16)} ${activityTitle(a)}</div>
    <div class="muted small">${a.km||0} ${unit('km')} · ${a.min||0} ${unit('min')} · ${unit('load')} ${a.load||0}</div>
    <button class="kudos-btn ${liked?'on':''}" data-kudos="${a.id}" aria-pressed="${liked?'true':'false'}">${icon('heart',14)} ${t('kudos')} ${count}</button>
  </div>`;
}


function viewSupplements(){
  const severe = safetyGate().severeAllergens;
  return `<section><div class="container">
    ${disclaimer()}
    <div class="section-head">
      <h2 data-t="nav_supp"></h2>
      <p class="muted">${state.lang==='ar'
        ? 'تفاصيل توعوية حسب تصنيف الأدلة (IOC 2018). ليست وصفة، وليست تصريحاً لمسابقة، وليست بديلاً عن فحص منشطات معتمد.'
        : 'Educational detail by evidence grade (IOC 2018). Not a prescription, not a race clearance, and not a substitute for certified batch testing.'}</p>
    </div>
    <div class="disclaimer">${icon('alertTriangle',18)}<span>${state.lang==='ar'
      ? 'المنتجات الملوثة سبب شائع لإيقاف رياضي. ابحث عن دفعات مختبرة من طرف ثالث إن قررت بعد استشارة مختص.'
      : 'Contaminated products are a common reason athletes are sanctioned. If you proceed after clinical advice, look for third-party batch testing.'}</span></div>
    ${severe.length?`<p class="excl-note">${t('sum_allergy_locked')} ${severe.map(a=>t('all_'+a)).join('، ')}</p>`:''}
    <div class="grid g2">
      ${SUPPS.map(s=>{
        const hideWhey = s.id==='protein' && severe.includes('dairy');
        return `<div class="card" ${hideWhey?'style="opacity:.45"':''}>
          <span class="estimate-tag" style="border-color:${s.color};color:${s.color}">${s.grade[state.lang]}</span>
          <h3 style="margin-top:10px;">${s.title[state.lang]}</h3>
          <p class="muted small" style="margin-top:8px;">${s.body[state.lang]}</p>
          ${hideWhey?`<p class="muted small" style="color:var(--danger);margin-top:8px;">${state.lang==='ar'?'مستبعد بسبب حساسية ألبان شديدة.':'Hidden pathway: severe dairy allergy.'}</p>`:''}
        </div>`;
      }).join('')}
    </div>
    <div class="card" style="margin-top:16px;">
      <h3>${state.lang==='ar'?'في الحر والرطوبة والصيام': 'In heat, humidity, and fasting'}</h3>
      <ul class="muted small" style="margin-top:10px;padding-inline-start:18px;">
        <li>${state.lang==='ar'?'لا تبدأ مكمل جديد في أول أسبوع رمضان أو أول موجة حر.' : 'Do not start a new supplement in week one of Ramadan or the first heat wave.'}</li>
        <li>${state.lang==='ar'?'الكافيين + حر + نقص سوائل يزيد العبء. خفّف لا تُضاعف.' : 'Caffeine + heat + low fluid raises strain. Reduce, do not stack.'}</li>
        <li>${state.lang==='ar'?'الكرياتين بلا ماء كافٍ فكرة سيئة في صيام نهار الخليج.' : 'Creatine without enough water is a poor idea in a Gulf daytime fast.'}</li>
        <li>${state.lang==='ar'?'الجرعة والفحص المختبري للمختص. التطبيق يصنّف الدليل فقط.' : 'Dose and labs belong to a clinician. The app only grades the evidence.'}</li>
      </ul>
      <p class="muted small" style="margin-top:12px;">Maughan RJ, et al. IOC consensus statement: dietary supplements and the high-performance athlete. Br J Sports Med. 2018;52(7):439–455. · WADA Prohibited List (updated annually).</p>
    </div>
  </div></section>`;
}

function viewNutrition(){
  const gate = safetyGate();
  const slotLabel = {suhoor:{ar:'سحور',en:'Suhoor'},iftar:{ar:'إفطار',en:'Iftar'},recover:{ar:'بعد التمرين',en:'After training'}};
  const excludedCount = FOODS.filter(f=>f.allergens.some(a=>gate.severeAllergens.includes(a))).length;
  const fastingOn = state.q.ramadan==='true';
  return `<section><div class="container">${disclaimer()}
    <div class="section-head"><h2 data-t="nutr_title"></h2>
      <a href="#/supplements" class="btn btn-ghost btn-sm" data-t="nav_supp"></a>
      <p class="muted">${state.lang==='ar'?'تغذية الرياضي الصائم: نوافذ ثلاث، والأدلة تقول إن التخطيط يمنع هبوط المدخول لا أن الصيام «يحرق دهون سحرياً».':'Fasting-athlete nutrition: three windows. Evidence says planning stops an intake drop — fasting is not a magic fat hack.'}</p>
    </div>
    ${fastingOn?`<div class="disclaimer">${icon('info',18)}<span>${state.lang==='ar'?'أشرت أنك في رمضان أو قريب منه — النوافذ أدناه هي الافتراض لخطتك.':'You marked Ramadan now or soon — the windows below are the default for your plan.'}</span></div>`:''}
    <div class="grid g3" style="margin-bottom:22px;">
      ${FAST_SLOTS.map(s=>`<div class="card"><div class="eyebrow">${s.title[state.lang]}</div>
        <h3 style="margin-top:6px;">${s.aim[state.lang]}</h3>
        <ul class="muted small" style="margin-top:10px; padding-inline-start:18px;">${s.points[state.lang].map(x=>`<li style="margin-bottom:6px;">${x}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
    <p class="excl-note">${excludedCount>0?tn('nutr_excl_note',excludedCount):t('nutr_no_excl')}</p>
    <div class="grid g3">${FOODS.map(f=>{
      const isExcluded = f.allergens.some(a=>gate.severeAllergens.includes(a));
      return `<div class="card food-card media-card ${isExcluded?'excluded':''}"><img src="${f.img}" alt="">
        <div class="media-body">
          <span class="estimate-tag">${slotLabel[f.slot][state.lang]}</span>
          <h3 style="margin-top:8px;">${f.name[state.lang]}</h3>
          ${f.allergens.map(a=>`<span class="allergen-tag">${t('all_'+a)}</span>`).join('')}
        </div></div>`;
    }).join('')}</div>
    <p class="muted small" style="margin-top:16px;">${state.lang==='ar'
      ? 'مرجع الاتجاه: استعراض مراجعات BJSM 2024 عن رمضان (جودة المراجعات منخفضة–حرجة). سوائل الجهد: Sawka et al., ACSM 2007. الحساسية الشديدة تُخفي الطبق. ليس خطة مرض السكري أو علاجاً.'
      : 'Direction of evidence: BJSM 2024 overview of Ramadan reviews (low to critically low review quality). Exercise fluid: Sawka et al., ACSM 2007. Severe allergy hides the dish. Not a diabetes meal plan or treatment.'}</p>
  </div></section>`;
}
function gearCard(g){
  return `<div class="card gear-card media-card"><img src="${g.img}" alt="">
    <div class="media-body"><h3>${g.name[state.lang]}</h3>
    <div class="muted small" style="margin-top:4px;"><span data-t="equip_size"></span>: ${g.size[state.lang]}</div></div></div>`;
}
function viewEquipment(){
  const mySport = state.q.completed ? state.q.sport : null;
  const matched = mySport ? GEAR.filter(g=>g.sport===mySport) : GEAR;
  const rest = mySport ? GEAR.filter(g=>g.sport!==mySport) : [];
  return `<section><div class="container"><div class="section-head"><h2 data-t="equip_title"></h2></div>
    ${mySport?`<h3 style="margin-bottom:10px;" data-t="equip_for_sport"></h3>`:''}
    <div class="grid g3" style="margin-bottom:var(--sp-3);">${matched.map(gearCard).join('')}</div>
    ${rest.length?`<h3 style="margin-bottom:10px;" data-t="equip_other"></h3><div class="grid g3">${rest.map(gearCard).join('')}</div>`:''}
  </div></section>`;
}
function viewRoutes(){
  const target = state._routeTarget || 8;
  const computed = computeRoutes(target);
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="routes_title"></h2></div>
    <div class="disclaimer">${icon('info',18)}<span data-t="routes_rule_note"></span></div>
    ${!state.q.completed?`<p class="muted small" style="margin-bottom:12px;" data-t="routes_no_city_match"></p>`:''}
    <div class="field" style="max-width:260px;"><label data-t="routes_target"></label>
      <select id="routeTargetSelect">${[5,8,10,15,21,40].map(k=>`<option value="${k}" ${target===k?'selected':''}>${k} km</option>`).join('')}</select></div>
    <div class="card" style="margin-top:var(--sp-2);">
      ${computed.map(r=>`<div class="route-row ${r.excluded?'excluded':''}">
        <span>${r.name[state.lang]} — ${r.km} km ${r.cityMatch?`<span class="estimate-tag">${t('routes_city_match')}</span>`:''}<br>
          <span class="muted small">${t('seg_title')}: ${r.seg[state.lang]}</span></span>
        ${r.excluded?`<span class="route-excluded-tag">${t('routes_excluded')}</span>`:`<span class="route-cost">${t('routes_cost')}: ${r.cost.toFixed(2)}</span>`}
      </div>`).join('')}
    </div>
  </div></section>`;
}
function viewCommunity(){
  const tab = state.communityTab || 'feed';
  let content='';
  if(tab==='events'){
    content = `<a class="btn btn-primary" href="#/events">${state.lang==='ar'?'كل الفعاليات':'All events'}</a>
      <p class="muted small" style="margin-top:10px;">${state.lang==='ar'?'مضمار، كورنيش، مياه مفتوحة، قوة، تراياثلون مجتمعي.':'Track, corniche, open water, strength, community triathlon.'}</p>`;
  } else if(tab==='challenges'){
    content = `<div class="grid g2">
      <div class="card"><h3>${state.lang==='ar'?'تحدي 50 كم شهري':'Monthly 50km'}</h3>
        <p class="muted small">210 <span data-t="comm_participants"></span></p>
        <button class="btn btn-primary btn-sm" style="margin-top:10px;" data-t="comm_join"></button></div>
      <div class="card"><h3>${state.lang==='ar'?'تحدي السباحة الأسبوعي':'Weekly swim'}</h3>
        <p class="muted small">88 <span data-t="comm_participants"></span></p>
        <button class="btn btn-primary btn-sm" style="margin-top:10px;" data-t="comm_join"></button></div></div>`;
  } else if(tab==='forum'){
    content = `<div class="grid" style="gap:10px;">${[{ar:'نصائح للتمرين بالحر؟',en:'Tips for training in the heat?'},{ar:'كيف أبدأ أول سباق؟',en:'How do I start my first race?'}].map(q=>`<div class="card">${q[state.lang]}</div>`).join('')}</div>`;
  } else {
    const mine = (state.activities||[]).slice(-5).reverse().map(a=>({...a,user:'you'}));
    const feed = [...mine, ...COMMUNITY_FEED.map(c=>({...c, date:iso(addDays(new Date(),-(c.daysAgo||1))), load:sessionLoad(c.min,'moderate'), kudos:12}))];
    content = feed.map(a=>activityCard(a, a.user==='you')).join('');
  }
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="comm_title"></h2></div>
    <div style="display:flex;gap:20px;border-bottom:1px solid var(--card-border);margin-bottom:var(--sp-3);">
      ${['feed','challenges','forum','events'].map(k=>`<button class="tab-btn" data-ctab="${k}" style="padding:10px 0;font-weight:700;color:${tab===k?'var(--primary)':'var(--text-dim)'};border-bottom:2px solid ${tab===k?'var(--primary)':'transparent'};" data-t="comm_tab_${k}"></button>`).join('')}
    </div>${content}
  </div></section>`;
}
function viewSpecialist(){
  const specs=[{icon:'stethoscope',key:'spec_cardio'},{icon:'shield',key:'spec_allergy'},{icon:'medal',key:'spec_sports_med'}];
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="spec_title"></h2><p class="muted small" data-t="spec_sub"></p></div>
    <div class="disclaimer">${icon('info',18)}<span data-t="spec_disclaimer"></span></div>
    <div class="grid g3">${specs.map(s=>`<div class="card specialist-card"><div class="sicon">${icon(s.icon,22)}</div>
      <div><h3 data-t="${s.key}"></h3><a class="btn btn-ghost btn-sm" style="margin-top:10px;" href="https://www.google.com/maps/search/${encodeURIComponent(s.key==='spec_cardio'?'sports cardiologist':s.key==='spec_allergy'?'allergy clinic':'sports medicine')}+near+${encodeURIComponent(state.q.city||'Abu Dhabi')}" target="_blank" rel="noopener" data-t="spec_find"></a></div></div>`).join('')}
  </div></section>`;
}
function viewAccount(){
  const tab = state.accountTab;
  const tabs=[['profile','acc_tab_profile'],['settings','acc_tab_settings'],['privacy','acc_tab_privacy']];
  let content='';
  if(tab==='profile'){
    content = !state.q.completed ? `<p class="muted" data-t="acc_no_profile"></p>` :
      `<div class="grid g2">
        <div><span class="muted small" data-t="q_height_h"></span><div style="font-weight:700;">${state.q.height||'—'} cm</div></div>
        <div><span class="muted small" data-t="q_weight_h"></span><div style="font-weight:700;">${state.q.weight||'—'} kg</div></div>
        <div><span class="muted small" data-t="q_goal_h"></span><div style="font-weight:700;">${state.q.goal?t('goal_'+state.q.goal):'—'}</div></div>
        <div><span class="muted small" data-t="q_sport_h"></span><div style="font-weight:700;">${state.q.sport?t('sport_'+state.q.sport):'—'}</div></div>
        <div><span class="muted small">${state.lang==='ar'?'الساعات أسبوعياً':'Weekly hours'}</span><div style="font-weight:700;">${state.q.hours||'—'}</div></div>
        <div><span class="muted small" data-t="q_city_h"></span><div style="font-weight:700;">${state.q.city||'—'}</div></div>
      </div>
      <p class="muted small" style="margin-top:14px;">${state.lang==='ar'?'إعادة التعيين تمسح الطول والوزن والهدف والساعات ومسافة كوبر، وتبني الخطة من جديد. الأسئلة الطبية تبقى.':'Reset clears height, weight, goal, hours and Cooper distance, then rebuilds the plan. Medical answers stay.'}</p>
      <button class="btn btn-ghost" id="resetMetricsBtn" style="margin-top:10px;">${state.lang==='ar'?'إعادة تعيين القياسات والأهداف':'Reset measurements and goals'}</button>`;
  } else if(tab==='settings'){
    content = `<div class="field"><label data-t="acc_lang"></label>
      <select id="accLangSelect"><option value="ar" ${state.lang==='ar'?'selected':''}>العربية</option><option value="en" ${state.lang==='en'?'selected':''}>English</option></select></div>
      <div class="field"><label data-t="acc_theme"></label>
      <select id="accThemeSelect"><option value="light" ${state.theme==='light'?'selected':''} data-t="acc_theme_light"></option><option value="dark" ${state.theme==='dark'?'selected':''} data-t="acc_theme_dark"></option></select></div>`;
  } else {
    const validUntil = state.clearanceConfirmedAt ? new Date(new Date(state.clearanceConfirmedAt).getTime()+365*86400000).toLocaleDateString(state.lang==='ar'?'ar-EG':'en-GB') : '';
    content = `${state.q.cardiacFlag==='true'?`<div class="toggle-row"><div>
        <div style="font-weight:700;" data-t="acc_clearance_toggle"></div>
        <div class="muted small" data-t="acc_clearance_sub"></div>
        ${state.clearanceConfirmed?`<div class="muted small">${t('acc_clearance_valid')} ${validUntil}</div>`:''}
      </div><button type="button" class="switch ${state.clearanceConfirmed?'on':''}" id="clearanceToggle" role="switch" aria-checked="${state.clearanceConfirmed?'true':'false'}"><span class="knob"></span></button></div>`:''}
      <div class="toggle-row"><div>
        <div style="font-weight:700;" data-t="acc_womens_health"></div>
        <div class="muted small" data-t="acc_womens_health_sub"></div>
      </div><button type="button" class="switch ${state.womensHealthEnabled?'on':''}" id="whToggle" role="switch" aria-checked="${state.womensHealthEnabled?'true':'false'}"><span class="knob"></span></button></div>
      ${state.womensHealthEnabled?`<a href="#/womens-health" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="acc_womens_health_link"></a>`:''}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;">
        <button class="btn btn-ghost" id="exportBtn" data-t="acc_export"></button>
        <button class="btn btn-danger" id="deleteBtn" data-t="acc_delete"></button>
      </div>`;
  }
  return `<section><div class="container"><div class="section-head"><h2 data-t="acc_title"></h2></div>
    <div class="account-layout">
      <div class="account-tabs">${tabs.map(([v,k])=>`<button class="${tab===v?'active':''}" data-atab="${v}" data-t="${k}"></button>`).join('')}</div>
      <div class="card" style="flex:1;width:100%;">${content}</div>
    </div></div></section>`;
}
function viewWomensHealth(){
  return `<section><div class="container wizard-wrap"><div class="card">${disclaimer()}
    <h2 data-t="wh_title"></h2><p class="muted small" style="margin-top:10px;" data-t="wh_note"></p>
    <a href="#/account" class="btn btn-ghost" style="margin-top:16px;" data-t="wh_back"></a></div></div></section>`;
}
function viewLegal(){
  const blocks=[['legal_data_h','legal_data_b'],['legal_diag_h','legal_diag_b'],['legal_analytics_h','legal_analytics_b'],['legal_ip_h','legal_ip_b']];
  return `<section><div class="container wizard-wrap"><div class="section-head"><h2 data-t="legal_title"></h2></div>
    ${blocks.map(([h,b])=>`<div class="legal-block card" style="margin-bottom:14px;"><h3 data-t="${h}"></h3><p class="muted small" style="margin-top:8px;" data-t="${b}"></p></div>`).join('')}
  </div></section>`;
}

function bindViewEvents(route){
  if(route==='questionnaire'){ bindQuestionnaireEvents(); bindWizardSwipe(); }
  if(route==='routes'){
    const sel=document.getElementById('routeTargetSelect');
    if(sel) sel.addEventListener('change', e=>{ state._routeTarget=+e.target.value; persist(); renderRoute('routes'); });
  }
  if(route==='events'){
    const citySel=document.getElementById('eventCityFilter');
    if(citySel) citySel.addEventListener('change', e=>{ state.eventCity=e.target.value; persist(); renderRoute('events'); });
    document.querySelectorAll('[data-join]').forEach(btn=>btn.addEventListener('click',()=>{
      const id=btn.dataset.join;
      const set=new Set(state.joinedEvents||[]);
      if(set.has(id)) set.delete(id); else set.add(id);
      state.joinedEvents=[...set]; persist(); renderRoute('events');
    }));
  }
  if(route==='community'){
    document.querySelectorAll('[data-ctab]').forEach(btn=>btn.addEventListener('click',()=>{ state.communityTab=btn.dataset.ctab; persist(); renderRoute('community'); }));
  }
  if(route==='account'){
    document.querySelectorAll('[data-atab]').forEach(btn=>btn.addEventListener('click',()=>{ state.accountTab=btn.dataset.atab; persist(); renderRoute('account'); }));
    const langSel=document.getElementById('accLangSelect');
    if(langSel) langSel.addEventListener('change', e=>setLang(e.target.value));
    const themeSel=document.getElementById('accThemeSelect');
    if(themeSel) themeSel.addEventListener('change', e=>setTheme(e.target.value));
    const wh=document.getElementById('whToggle');
    if(wh) wh.addEventListener('click',()=>{ state.womensHealthEnabled=!state.womensHealthEnabled; persist(); renderRoute('account'); });
    const cl=document.getElementById('clearanceToggle');
    if(cl) cl.addEventListener('click',()=>{
      state.clearanceConfirmed=!state.clearanceConfirmed;
      state.clearanceConfirmedAt=state.clearanceConfirmed?new Date().toISOString():null;
      rebuildPlan(); persist(); renderRoute('account');
    });
    const ex=document.getElementById('exportBtn');
    if(ex) ex.addEventListener('click',()=>{
      const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='shawt-data.json'; a.click();
    });
    const rst=document.getElementById('resetMetricsBtn');
    if(rst) rst.addEventListener('click',()=>{
      if(!confirm(state.lang==='ar'?'تصفير الطول والوزن والهدف والساعات؟ الأسئلة الطبية تبقى.':'Clear height, weight, goal and hours? Medical answers stay.')) return;
      state.q.height=null; state.q.weight=null; state.q.goal=null; state.q.hours=4; state.q.cooperDistanceM=null;
      state.q.completed=false; state.qStep=1; state.planned=[];
      persist(); location.hash='#/questionnaire'; navigate();
    });
    const del=document.getElementById('deleteBtn');
    if(del) del.addEventListener('click',()=>{
      if(confirm(state.lang==='ar'?'حذف كل البيانات المحلية؟':'Delete all local data?')){
        localStorage.removeItem(STORE_KEY); state=defaultState(); persist(); setLang('ar'); setTheme('dark'); location.hash='#/home'; navigate();
      }
    });
  }
  if(route==='plan'){
    const cooperBtn=document.getElementById('cooperCalcBtn');
    if(cooperBtn) cooperBtn.addEventListener('click',()=>{
      const val=+document.getElementById('cooperInput').value;
      if(val>800 && val<6000){ state.q.cooperDistanceM=val; persist(); renderRoute('plan'); }
    });
    const prev=document.getElementById('weekPrev'); const next=document.getElementById('weekNext');
    if(prev) prev.addEventListener('click',()=>{ state.weekOffset--; persist(); renderRoute('plan'); });
    if(next) next.addEventListener('click',()=>{ state.weekOffset++; persist(); renderRoute('plan'); });
    document.querySelectorAll('[data-toggle-plan]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const p=state.planned.find(x=>x.id===btn.dataset.togglePlan);
        if(!p) return;
        p.done=!p.done;
        const linkedId = 'a-'+p.id;
        if(p.done){
          if(!state.activities.some(a=>a.id===linkedId)){
            state.activities.push({id:linkedId, date:p.date, sport:p.sport, km:p.km, min:p.min,
              zone:p.zone, load:sessionLoad(p.min,p.zone), fromPlan:true, kudos:0});
          }
        } else {
          state.activities = state.activities.filter(a=>a.id!==linkedId);
        }
        persist(); renderRoute('plan');
      });
    });
  }
  if(route==='activities'){
    const save=document.getElementById('actSave');
    if(save) save.addEventListener('click',()=>{
      const min=+document.getElementById('actMin').value||0;
      const rpe=+document.getElementById('actRpe').value||5;
      const zone = rpe>=8?'hard': rpe>=5?'moderate':'easy';
      state.activities.push({
        id:'log-'+Date.now(), date:document.getElementById('actDate').value||iso(new Date()),
        sport:document.getElementById('actSport').value, km:+document.getElementById('actKm').value||0,
        min, load:sessionLoad(min,zone), text:'', kudos:0
      });
      persist(); renderRoute('activities');
    });
  }
  document.querySelectorAll('[data-kudos]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.dataset.kudos;
      state.kudos[id]=!state.kudos[id];
      persist(); navigate();
    });
  });
}


function tapFeedback(){
  try{ if(navigator.vibrate) navigator.vibrate(8); }catch(e){}
}
function bindWizardSwipe(){
  const wrap=document.querySelector('.wizard-wrap');
  if(!wrap) return;
  let x0=0,y0=0,t0=0;
  wrap.addEventListener('touchstart',e=>{
    if(e.target.closest('input,select,textarea,button')) return;
    const p=e.changedTouches[0]; x0=p.clientX; y0=p.clientY; t0=Date.now();
  },{passive:true});
  wrap.addEventListener('touchend',e=>{
    if(!x0) return;
    const p=e.changedTouches[0];
    const dx=p.clientX-x0, dy=p.clientY-y0; x0=0;
    if(Math.abs(dx)<64 || Math.abs(dy)>50 || Date.now()-t0>600) return;
    const rtl=document.documentElement.dir==='rtl';
    const next=(rtl && dx>0) || (!rtl && dx<0);
    const btn=document.getElementById(next?'qNext':'qBack');
    if(btn){ tapFeedback(); btn.click(); }
  },{passive:true});
}

function bindQuestionnaireEvents(){
  document.querySelectorAll('[data-qgroup]').forEach(btn=>btn.addEventListener('click',()=>{
    state.q[btn.dataset.qgroup]=btn.dataset.qvalue; persist(); renderRoute('questionnaire');
  }));
  document.querySelectorAll('[data-qmulti]').forEach(btn=>btn.addEventListener('click',()=>{
    const arrName=btn.dataset.qmulti, v=btn.dataset.qvalue;
    let arr=state.q[arrName]||[];
    if(v==='none') state.q[arrName]=arr.includes('none')?[]:['none'];
    else {
      arr=arr.filter(x=>x!=='none');
      arr=arr.includes(v)?arr.filter(x=>x!==v):[...arr,v];
      state.q[arrName]=arr;
    }
    persist(); renderRoute('questionnaire');
  }));
  document.querySelectorAll('[data-sev-allergen]').forEach(btn=>btn.addEventListener('click',()=>{
    state.q.allergySeverity[btn.dataset.sevAllergen]=btn.dataset.sevValue; persist(); renderRoute('questionnaire');
  }));
  const backBtn=document.getElementById('qBack');
  if(backBtn) backBtn.addEventListener('click',()=>{ state.qStep=Math.max(1,prevStepFrom(state.qStep)); persist(); renderRoute('questionnaire'); });
  const nextBtn=document.getElementById('qNext');
  if(nextBtn) nextBtn.addEventListener('click',()=>{
    const step=state.qStep;
    const h=document.getElementById('qInput_height'); if(h) state.q.height=h.value;
    const w=document.getElementById('qInput_weight'); if(w) state.q.weight=w.value;
    const c=document.getElementById('qInput_city'); if(c) state.q.city=c.value;
    const hoursSel=document.getElementById('qHours'); if(hoursSel) state.q.hours=+hoursSel.value;
    if(step===8 && state.q.cardiacFlag===null){ document.getElementById('cardiacErr').classList.add('show'); return; }
    if(step===9 && state.q.cardiacClearance===null){ document.getElementById('cardiacFollowupErr').classList.add('show'); return; }
    if(step===11){
      const missing=currentAllergensExclNone().some(a=>!state.q.allergySeverity[a]);
      if(missing){ document.getElementById('severityErr').classList.add('show'); return; }
    }
    const s=nextStepFrom(step); state.qStep=s;
    if(s>Q_LAST){ state.q.completed=true; state.planned=[]; rebuildPlan(); }
    persist(); renderRoute('questionnaire');
  });
  const sumGo=document.getElementById('sumGoPlan');
  if(sumGo) sumGo.addEventListener('click',()=>{ state.q.completed=true; if(!state.planned.length) rebuildPlan(); persist(); });
}

function applyTranslations(){
  document.querySelectorAll('[data-t]').forEach(el=>{ el.textContent = t(el.getAttribute('data-t')); });
}
function setLang(lang){
  state.lang=lang; persist();
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  const b=document.getElementById('langToggle'); if(b) b.textContent=lang==='ar'?'EN':'AR';
  navigate();
}
function setTheme(theme){
  state.theme=theme; persist();
  document.documentElement.classList.toggle('light', theme==='light');
  document.documentElement.classList.toggle('dark', theme==='dark');
  const themeMeta=document.querySelector('meta[name="theme-color"]');
  if(themeMeta) themeMeta.setAttribute('content', theme==='light' ? '#F4F4F1' : '#000000');
  const b=document.getElementById('themeToggle');
  if(b){
    b.innerHTML=icon(theme==='dark'?'sun':'moon',17);
    b.setAttribute('aria-label', state.lang==='ar' ? (theme==='dark'?'التبديل للمظهر الفاتح':'التبديل للمظهر الداكن') : (theme==='dark'?'Switch to light theme':'Switch to dark theme'));
  }
}

document.addEventListener('pointerdown',e=>{
  if(e.pointerType==='touch' && e.target.closest('button,a.btn,.choice,.wo-chip,.kudos-btn,.sev-btn,.switch')) tapFeedback();
});
document.getElementById('langToggle').addEventListener('click',()=>setLang(state.lang==='ar'?'en':'ar'));
document.getElementById('themeToggle').addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
const menuBtn=document.getElementById('menuToggle');
const drawer=document.getElementById('drawer');
const drawerBg=document.getElementById('drawerBg');
if(menuBtn) menuBtn.addEventListener('click',()=>{
  drawer.classList.add('open'); drawerBg.classList.add('open'); document.documentElement.classList.add('nav-open');
  menuBtn.setAttribute('aria-expanded','true');
  const first=drawer.querySelector('a'); if(first) first.focus();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeDrawer();
});
if(drawerBg) drawerBg.addEventListener('click', closeDrawer);
if(drawer) drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeDrawer));

/* ===== شوط — طبقة الأداء ===== */
/* ===================================================================
   شوط — طبقة الأداء (Performance layer)
   تُدرَج بعد التعريفات الأصلية وقبل loadState()، فتتجاوز الدوال المكرّرة.
   كل الأسماء الجديدة تبدأ بـ UP_ تفادياً لتعارض const مع الملف الأصلي.
   =================================================================== */

const UP_WX_ATTR = 'Open-Meteo (CC BY 4.0)';
const UP_NCM = 'https://www.ncm.gov.ae/';
const UP_CITIES = {
  'Abu Dhabi':[24.4539,54.3773], 'Dubai':[25.2048,55.2708], 'Sharjah':[25.3463,55.4209],
  'Ajman':[25.4052,55.5136], 'Umm Al Quwain':[25.5647,55.5534], 'Ras Al Khaimah':[25.7895,55.9432],
  'Fujairah':[25.1288,56.3265], 'Al Ain':[24.1302,55.8023], 'Al Dhannah':[24.1300,52.6100],
  'Hatta':[24.8000,56.1200], 'Khor Fakkan':[25.3390,56.3560], 'Liwa':[23.1300,53.7800],
  'Al Marjan Island':[25.6900,55.7300]
};
const UP_UAE_CITIES = Object.keys(UP_CITIES);
const UP_LAST = 8;                       // عدد شاشات التسجيل الجديدة
const UP_RETEST_DAYS = 49;               // 7 أسابيع
const UP_WX_TTL = 30*60*1000;            // صلاحية ذاكرة الطقس

/* ---------- نصوص ---------- */
Object.assign(T.ar, {
  hero_eyebrow:"تدريب أداء في مناخ الإمارات",
  hero_title:"درّب على رقم، مو على إحساس",
  hero_lead:"خطة أسبوعية من حجمك الحالي وأيامك، نافذة تمرين حسب حرارة مدينتك، واختبارات ميدانية تقيس التقدّم. التقييم الصحي بوابة سريعة — مو التطبيق كله.",
  hero_cta1:"ابنِ خطتي",
  trust1:"خطة من أرقامك الحالية", trust2:"نافذة تمرين حسب الحر", trust3:"اختبار ميداني كل 7 أسابيع",
  nav_weather:"الطقس والتمرين", nav_tests:"الاختبارات",

  q_city_h:"وين تتمرّن عادة؟", q_city_sub:"نستخدمها لحرارة اليوم والمسارات والرزنامة",
  q_sport_h:"رياضتك الأساسية؟", q_sport_sub:"تقدر تسجّل غيرها، بس الخطة تُبنى على هذي",
  q_goal_sub:"يحدّد شكل الأسبوع: تحمّل أو سرعة",
  q_race_h:"في سباق مستهدف؟", q_race_sub:"اختياري — يضبط التدرّج حتى تاريخه",
  q_race_none:"بدون سباق حالياً",
  q_level_h:"وين مستواك الحين؟", q_level_sub:"بصراحة — الخطة تبدأ من هنا",
  lvl_new:"جديد", lvl_new_d:"أقل من شهرين تدريب منتظم",
  lvl_return:"راجع", lvl_return_d:"كنت متدرّب وانقطعت شهرين فأكثر",
  lvl_inter:"متوسط", lvl_inter_d:"منتظم من ٣ شهور فأكثر وأكملت مسافتك",
  lvl_adv:"متقدّم", lvl_adv_d:"تتدرّب بخطة وتنافس على وقت",
  q_volume_h:"حجمك في آخر أسبوعين", q_volume_sub:"تقريب كافي — الخطة تبني عليه بدل ما تخمّن",
  q_weekly:"كم أسبوعياً", q_longest:"أطول جلسة",
  q_days_h:"كم يوم تقدر تتمرّن؟", q_days_sub:"اختر الأيام اللي تناسبك فعلاً",
  q_days_pick:"أيامك",
  q_ref_h:"عندك رقم حديث؟", q_ref_sub:"اختياري — يحوّل النطاقات من وصف إلى وتيرة",
  q_ref_dist:"المسافة", q_ref_time:"الوقت (دقيقة:ثانية)", q_ref_none:"ما عندي رقم",
  q_safety_h:"بوابة أمان سريعة", q_safety_sub:"سؤالان فقط قبل ما نفتح الشدة العالية (PAR-Q+)",
  q_days_err:"اختر يوماً واحداً على الأقل",
  q_volume_err:"اكتب رقماً تقريبياً للحجم الأسبوعي",
  sum_perf_title:"نقطة البداية",
  sum_start_vol:"أسبوعك الأول", sum_progress:"التدرّج", sum_progress_v:"‏+٥٪ أسبوعياً وأسبوع تخفيف كل رابع أسبوع",
  sum_cap10:"لا نزيد أيامك أكثر من يوم واحد عن عادتك الحالية",

  wx_title:"الطقس والتمرين", wx_now:"الحين", wx_feels:"محسوسة", wx_hum:"رطوبة", wx_wind:"رياح",
  wx_window:"أفضل نافذة اليوم", wx_window_sub:"أقل حرارة محسوسة في الـ24 ساعة الجاية",
  wx_band1:"مريح — نفّذ خطتك كما هي",
  wx_band2:"حذر — قدّم الترطيب وقصّر الإحماء تحت الشمس",
  wx_band3:"مرتفع — انزل درجة شدة أو انقل الجلسة للفجر/بعد المغرب",
  wx_band4:"خطر — سهل فقط أو داخلي، وألغِ الفواصل",
  wx_band5:"حرج — لا جلسة خارجية اليوم",
  wx_hum_note:"الرطوبة تمنع تبخّر العرق، فرفعنا التصنيف درجة.",
  wx_src:"الأرقام من Open-Meteo. التحذيرات الرسمية (ضباب، غبار، عواصف) من المركز الوطني للأرصاد.",
  wx_official:"المركز الوطني للأرصاد",
  wx_refresh:"تحديث", wx_fail:"ما قدرنا نجيب الطقس. تحقق من الاتصال أو حدّث.",
  wx_stale:"آخر تحديث",
  wx_manual:"أدخل الحرارة يدوياً", wx_disclaimer:"هذي إرشادات تقريبية على الحرارة المحسوسة، مو قياس WBGT ولا بديل عن تحذير رسمي.",

  tests_title:"الاختبارات الميدانية", tests_sub:"رقم واحد كل 7 أسابيع أصدق من ساعة تخمّن يومياً",
  test_run:"كوبر — 12 دقيقة جري", test_run_sub:"أقصى مسافة في 12 دقيقة على مسار مستوٍ",
  test_swim:"CSS — سباحة 400 و200", test_swim_sub:"الفرق بينهما يعطي سرعة العتبة الحرجة",
  test_bike:"دراجة — 20 دقيقة", test_bike_sub:"متوسط سرعة ثابت أقصى ما تقدر تحافظ عليه",
  test_save:"احفظ النتيجة", test_history:"السجل", test_none:"ما في اختبار مسجّل",
  test_due:"حان وقت إعادة الاختبار", test_next:"الإعادة بعد",
  test_days:"يوم", test_result:"النتيجة",
  test_m:"متر", test_400:"زمن 400م", test_200:"زمن 200م", test_kmh:"متوسط السرعة كم/س",
  test_heat_note:"سجّل الاختبار في نفس الظرف تقريباً — اختبار الظهر في أغسطس ما يقارن باختبار فجر يناير.",
  css_pace:"وتيرة CSS لكل 100م", ftp_est:"عتبة تقديرية",

  ci_title:"تسجيل اليوم", ci_sub:"سؤالان يضبطان جاهزية اليوم",
  ci_sleep:"كم نمت؟", ci_sore:"كيف جسمك؟",
  ci_sore1:"مرتاح", ci_sore2:"عادي", ci_sore3:"متعب", ci_sore4:"وجع واضح",
  ci_save:"سجّل", ci_done:"سجّلت اليوم", ci_edit:"عدّل",
  ready_heat:"الحر يخفض جاهزيتك اليوم",

  acc_tab_training:"تفضيلات التدريب",
  acc_import:"استيراد نسخة", acc_import_ok:"تم الاستيراد", acc_import_bad:"الملف غير صالح",
  acc_ramadan:"أصوم رمضان", acc_allergens:"حساسية غذائية", acc_allergens_sub:"تُستخدم لإخفاء الأطعمة في صفحة التغذية فقط",
  acc_body:"قياسات اختيارية", acc_rebuild:"أعِد بناء الخطة",
  ev_past:"عرض السباقات الماضية", ev_upcoming:"القادم فقط",
});
Object.assign(T.en, {
  hero_eyebrow:"Performance training built for UAE heat",
  hero_title:"Train against a number, not a feeling",
  hero_lead:"A week built from your current volume and days, a training window based on your city's heat, and field tests that show the change. The health gate is a short door — not the whole app.",
  hero_cta1:"Build my plan",
  trust1:"Plan from your current numbers", trust2:"Heat-aware training window", trust3:"Field test every 7 weeks",
  nav_weather:"Weather & training", nav_tests:"Tests",

  q_city_h:"Where do you usually train?", q_city_sub:"Used for today's heat, routes and the race calendar",
  q_sport_h:"Your main sport?", q_sport_sub:"Log anything you like — the plan is built on this one",
  q_goal_sub:"Sets the shape of the week: endurance or speed",
  q_race_h:"A target race?", q_race_sub:"Optional — paces the build-up to that date",
  q_race_none:"No race right now",
  q_level_h:"Where are you now?", q_level_sub:"Be honest — the plan starts here",
  lvl_new:"New", lvl_new_d:"Under two months of regular training",
  lvl_return:"Returning", lvl_return_d:"Trained before, off for two months or more",
  lvl_inter:"Intermediate", lvl_inter_d:"Consistent 3+ months, can cover the distance",
  lvl_adv:"Advanced", lvl_adv_d:"Training to a plan and racing for time",
  q_volume_h:"Your last two weeks", q_volume_sub:"An estimate is enough — better than us guessing",
  q_weekly:"Weekly volume", q_longest:"Longest session",
  q_days_h:"How many days can you train?", q_days_sub:"Pick the days that actually work",
  q_days_pick:"Your days",
  q_ref_h:"Any recent result?", q_ref_sub:"Optional — turns zones from words into paces",
  q_ref_dist:"Distance", q_ref_time:"Time (mm:ss)", q_ref_none:"No recent number",
  q_safety_h:"Quick safety gate", q_safety_sub:"Two questions before high intensity opens (PAR-Q+)",
  q_days_err:"Pick at least one day",
  q_volume_err:"Enter an approximate weekly volume",
  sum_perf_title:"Your starting point",
  sum_start_vol:"First week", sum_progress:"Progression", sum_progress_v:"+5% per week, with an easier fourth week",
  sum_cap10:"We never add more than one training day above your current habit",

  wx_title:"Weather & training", wx_now:"Now", wx_feels:"Feels like", wx_hum:"Humidity", wx_wind:"Wind",
  wx_window:"Best window today", wx_window_sub:"Lowest apparent temperature in the next 24 hours",
  wx_band1:"Comfortable — run the plan as written",
  wx_band2:"Caution — drink earlier, keep the warm-up out of direct sun",
  wx_band3:"High — drop one intensity grade or move to dawn / after sunset",
  wx_band4:"Danger — easy or indoor only, cancel intervals",
  wx_band5:"Critical — no outdoor session today",
  wx_hum_note:"Humidity blocks sweat evaporation, so the grade was raised one step.",
  wx_src:"Numbers from Open-Meteo. Official warnings (fog, dust, storms) come from the National Center of Meteorology.",
  wx_official:"National Center of Meteorology",
  wx_refresh:"Refresh", wx_fail:"Could not load weather. Check the connection or refresh.",
  wx_stale:"Updated",
  wx_manual:"Enter temperature manually", wx_disclaimer:"Approximate guidance from apparent temperature — not a WBGT measurement and not a substitute for an official warning.",

  tests_title:"Field tests", tests_sub:"One honest number every 7 weeks beats a watch guessing daily",
  test_run:"Cooper — 12-minute run", test_run_sub:"Maximum distance in 12 minutes on flat ground",
  test_swim:"CSS — 400m and 200m", test_swim_sub:"The gap between them gives critical swim speed",
  test_bike:"Bike — 20 minutes", test_bike_sub:"The hardest average speed you can hold steady",
  test_save:"Save result", test_history:"History", test_none:"No test logged yet",
  test_due:"Time to retest", test_next:"Retest in",
  test_days:"days", test_result:"Result",
  test_m:"meters", test_400:"400m time", test_200:"200m time", test_kmh:"Average speed km/h",
  test_heat_note:"Retest in similar conditions — a midday August test does not compare to a January dawn.",
  css_pace:"CSS pace per 100m", ftp_est:"Estimated threshold",

  ci_title:"Today's check-in", ci_sub:"Two questions that set today's readiness",
  ci_sleep:"Hours slept", ci_sore:"How does the body feel?",
  ci_sore1:"Fresh", ci_sore2:"Normal", ci_sore3:"Tired", ci_sore4:"Clearly sore",
  ci_save:"Log it", ci_done:"Logged today", ci_edit:"Edit",
  ready_heat:"Heat is lowering today's readiness",

  acc_tab_training:"Training preferences",
  acc_import:"Import a backup", acc_import_ok:"Imported", acc_import_bad:"File not valid",
  acc_ramadan:"I fast in Ramadan", acc_allergens:"Food allergies", acc_allergens_sub:"Only used to hide dishes on the nutrition page",
  acc_body:"Optional measurements", acc_rebuild:"Rebuild the plan",
  ev_past:"Show past races", ev_upcoming:"Upcoming only",
});

/* ---------- CSS ---------- */
const UP_CSS = `
.up-band{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:20px;font-weight:800;font-size:13.5px;}
.up-b1{background:color-mix(in srgb,var(--recovery) 16%,transparent);color:var(--recovery);}
.up-b2{background:color-mix(in srgb,var(--secondary) 16%,transparent);color:var(--secondary);}
.up-b3{background:color-mix(in srgb,var(--warning) 22%,transparent);color:#8a6b0f;}
.up-b4,.up-b5{background:color-mix(in srgb,var(--danger) 14%,transparent);color:var(--danger);}
.up-wx-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:12px;}
.up-wx-grid div{background:var(--bg);border:1px solid var(--card-border);border-radius:12px;padding:10px;text-align:center;}
.up-wx-grid b{display:block;font-size:19px;font-weight:800;}
.up-wx-grid span{font-size:11.5px;color:var(--text-dim);font-weight:700;}
.up-hours{display:flex;gap:4px;align-items:flex-end;height:74px;margin-top:12px;overflow-x:auto;padding-bottom:4px;}
.up-hour{flex:0 0 30px;display:flex;flex-direction:column;align-items:center;gap:4px;}
.up-hour i{display:block;width:16px;border-radius:4px 4px 0 0;background:var(--secondary);font-style:normal;}
.up-hour.best i{background:var(--primary);}
.up-hour span{font-size:9.5px;color:var(--text-dim);}
.up-daychips{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;}
.up-daychip{padding:12px 2px;border-radius:10px;border:1.5px solid var(--card-border);font-weight:700;font-size:12px;min-height:48px;}
.up-daychip.on{border-color:var(--primary);background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary);}
.up-lvl{display:grid;gap:8px;}
.up-lvl button{text-align:start;padding:14px;border-radius:12px;border:1.5px solid var(--card-border);}
.up-lvl button.on{border-color:var(--primary);background:color-mix(in srgb,var(--primary) 10%,transparent);}
.up-lvl b{display:block;font-weight:800;margin-bottom:3px;}
.up-lvl span{font-size:12.5px;color:var(--text-dim);}
.up-row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;}
.up-row .field{flex:1;min-width:130px;margin-bottom:0;}
.up-due{border-color:var(--warning) !important;}
@media (max-width:720px){ .up-wx-grid{grid-template-columns:repeat(2,minmax(0,1fr));} }
`;

/* ---------- أدوات ---------- */
/* الصور المتاحة فعلياً في img/: bike, city, food1-3, gear, hero-run, run, skyline, swim, logo.svg */
function sportImg(sport){
  const map={swim:'img/swim.jpg', bike:'img/bike.jpg', run:'img/run.jpg', race:'img/hero-run.jpg',
    strength:'img/gear.jpg', tri:'img/run.jpg', brick:'img/bike.jpg', mobility:'img/gear.jpg'};
  return map[sport] || 'img/city.jpg';
}
function UP_num(v){ const n = parseFloat(v); return isFinite(n) ? n : null; }
function UP_dayNames(){ return state.lang==='ar'
  ? ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة']
  : ['Sat','Sun','Mon','Tue','Wed','Thu','Fri']; }
function UP_parseTime(str){
  if(!str) return null;
  const m = String(str).trim().split(':').map(Number);
  if(m.some(isNaN)) return null;
  if(m.length===3) return m[0]*3600+m[1]*60+m[2];
  if(m.length===2) return m[0]*60+m[1];
  return m[0]*60;
}
function UP_fmtSec(s){
  if(s==null||!isFinite(s)) return '—';
  const m=Math.floor(s/60), x=Math.round(s%60);
  return m+':'+String(x).padStart(2,'0');
}
function UP_volUnit(){
  const sp = state.q.sport;
  if(sp==='swim') return state.lang==='ar'?'م':'m';
  return state.lang==='ar'?'كم':'km';
}
/* دقائق لكل وحدة حجم — تقدير ميداني معلن، لا رقم تجاري */
function UP_minPerUnit(sport){
  if(sport==='swim') return 0.025;          // ~2:30 لكل 100م
  if(sport==='bike'||sport==='brick') return 2.4; // ~25 كم/س
  return 6.8;                                // جري سهل ~6:48/كم
}

/* ---------- الطقس ---------- */
function UP_coords(){
  const c = state.q.city;
  return UP_CITIES[c] || UP_CITIES['Abu Dhabi'];
}
function UP_wxFresh(){
  const w = state.wx;
  return w && w.city===state.q.city && (Date.now()-w.ts) < UP_WX_TTL;
}
async function UP_fetchWeather(force){
  if(!force && UP_wxFresh()) return state.wx;
  const [lat,lon] = UP_coords();
  const url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude='+lat+'&longitude='+lon
    + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m'
    + '&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability'
    + '&timezone=Asia%2FDubai&forecast_days=2';
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('http '+res.status);
    const d = await res.json();
    const nowIso = new Date().toISOString().slice(0,13);
    const start = Math.max(0, d.hourly.time.findIndex(x=>x.slice(0,13) >= nowIso));
    const hours = d.hourly.time.slice(start, start+24).map((tm,i)=>({
      t: tm,
      temp: d.hourly.temperature_2m[start+i],
      app: d.hourly.apparent_temperature[start+i],
      rh: d.hourly.relative_humidity_2m[start+i],
      pop: d.hourly.precipitation_probability ? d.hourly.precipitation_probability[start+i] : null
    }));
    state.wx = { city: state.q.city, ts: Date.now(), failed:false,
      cur:{ temp:d.current.temperature_2m, app:d.current.apparent_temperature,
            rh:d.current.relative_humidity_2m, wind:d.current.wind_speed_10m }, hours };
    persist();
    return state.wx;
  }catch(e){
    state.wx = Object.assign({}, state.wx||{}, {failed:true, ts:Date.now(), city:state.q.city});
    persist();
    return null;
  }
}
/* التصنيف: الحرارة المحسوسة + رفع درجة عند رطوبة عالية */
function UP_band(app, rh){
  if(app==null) return null;
  let level = app<28?1 : app<32?2 : app<37?3 : app<41?4 : 5;
  const humid = rh!=null && rh>=70 && app>=28;
  if(humid) level = Math.min(5, level+1);
  return { level, humid, app, rh, msg: t('wx_band'+level) };
}
function UP_heatBand(){
  const w = state.wx;
  if(!w || !w.cur || w.failed) return null;
  return UP_band(w.cur.app, w.cur.rh);
}
function UP_bestWindow(){
  const w = state.wx;
  if(!w || !w.hours || !w.hours.length) return null;
  const ok = w.hours.filter(h=>{ const hr=+h.t.slice(11,13); return hr>=4 && hr<=23; });
  if(!ok.length) return null;
  let best=null;
  for(let i=0;i<ok.length-1;i++){
    const avg=(ok[i].app+ok[i+1].app)/2;
    if(!best || avg<best.avg) best={avg, from:ok[i], to:ok[i+1]};
  }
  return best;
}

/* ---------- تسجيل اليوم ---------- */
function UP_todayCheckin(){ return (state.checkins||{})[iso(new Date())] || null; }
function UP_sleepFallback(){
  const m = {lt5:4.5, '5_6':5.5, '7_8':7.5, '8plus':8.5};
  return m[state.q.sleep] != null ? m[state.q.sleep] : null;
}

/* ---------- الاختبارات ---------- */
function UP_tests(type){ return (state.tests||[]).filter(x=>!type||x.type===type).sort((a,b)=>b.date.localeCompare(a.date)); }
function UP_lastTest(type){ return UP_tests(type)[0] || null; }
function UP_daysSince(date){ return Math.floor((new Date(iso(new Date())) - new Date(date))/86400000); }
function UP_testDue(){
  const type = state.q.sport==='swim' ? 'swim' : state.q.sport==='bike' ? 'bike' : 'run';
  const last = UP_lastTest(type);
  if(!last) return {type, due:true, days:null};
  const d = UP_daysSince(last.date);
  return {type, due: d>=UP_RETEST_DAYS, days: UP_RETEST_DAYS-d, last};
}
function UP_cssPace(t400, t200){
  if(!t400 || !t200 || t400<=t200) return null;
  const speed = 200/(t400-t200);          // م/ث
  return 100/speed;                        // ثانية لكل 100م
}
function UP_saveTest(rec){
  state.tests = state.tests || [];
  state.tests.push(Object.assign({id:'t-'+Date.now(), date:iso(new Date())}, rec));
  if(rec.type==='run' && rec.meters) state.q.cooperDistanceM = rec.meters;
  persist();
}

/* ---------- التسجيل الجديد ---------- */
function activeSteps(){ return [1,2,3,4,5,6,7,8]; }
function stepPosition(step){
  const s=activeSteps(); const i=s.indexOf(step);
  return { index: i<0?0:i, total: s.length, isLast: i===s.length-1 };
}
function nextStepFrom(step){ return step>=UP_LAST ? UP_LAST+1 : step+1; }
function prevStepFrom(step){ return step<=1 ? 1 : step-1; }

function UP_levelDefaults(sport, level){
  const base = {
    run:   {new:[10,3], return:[15,5], inter:[30,10], adv:[50,18]},
    swim:  {new:[2000,600], return:[3000,800], inter:[6000,1500], adv:[12000,2500]},
    bike:  {new:[40,15], return:[60,25], inter:[120,45], adv:[200,80]},
    tri:   {new:[20,6], return:[30,10], inter:[60,20], adv:[100,35]},
  };
  return (base[sport]||base.run)[level] || (base[sport]||base.run).inter;
}
function UP_weeklyMinutes(){
  const sport = state.q.sport||'run';
  const vol = UP_num(state.q.weeklyVol);
  if(vol) return Math.round(vol * UP_minPerUnit(sport));
  return (state.q.hours||4)*60;
}
function UP_daysPicked(){
  const d = state.q.trainDays;
  if(d && d.length) return d.slice().sort((a,b)=>a-b);
  const n = state.q.daysPerWeek || 4;
  return [[6],[2,6],[0,2,6],[0,2,4,6],[0,1,2,4,6],[0,1,2,3,4,6],[0,1,2,3,4,5,6]][Math.min(6,Math.max(0,n-1))];
}

function viewQuestionnaire(){
  const step = state.qStep;
  if(step > UP_LAST) return renderSummary();
  const pos = stepPosition(step);
  const pct = (pos.index+1)/pos.total*100;
  const stepLabel = t('q_step_of').replace('{n}',pos.index+1).replace('{total}',pos.total);
  const sport = state.q.sport||'run';
  let body='';

  if(step===1){
    body = `<div class="q-text" data-t="q_city_h"></div><div class="q-sub" data-t="q_city_sub"></div>
      <div class="input-wrap"><span class="field-icon">${icon('mapPin')}</span>
      <select id="qInput_city">${UP_UAE_CITIES.map(c=>`<option ${state.q.city===c?'selected':''}>${c}</option>`).join('')}</select></div>`;
  }
  else if(step===2){
    body = `<div class="q-text" data-t="q_sport_h"></div><div class="q-sub" data-t="q_sport_sub"></div>
      <div class="choice-group-4" style="margin-top:12px;">
      ${iconChoice('sport','run','run','sport_run')}${iconChoice('sport','swim','swim','sport_swim')}
      ${iconChoice('sport','bike','bike','sport_bike')}${iconChoice('sport','tri','tri','sport_tri')}</div>`;
  }
  else if(step===3){
    const races = EVENTS().filter(e=>e.date>=iso(new Date())).slice(0,8);
    body = `<div class="q-text" data-t="q_goal_h"></div><div class="q-sub" data-t="q_goal_sub"></div>
      <div class="choice-group" style="margin-top:12px;">
        ${choiceBtn('goal','fitness','goal_fit')}${choiceBtn('goal','race','goal_race')}${choiceBtn('goal','time','goal_time')}</div>
      <div class="field" style="margin-top:18px;">
        <label data-t="q_race_h"></label>
        <div class="muted small" style="margin-bottom:6px;" data-t="q_race_sub"></div>
        <select id="qRace">
          <option value="">${t('q_race_none')}</option>
          ${races.map(e=>`<option value="${e.id}" ${state.q.raceId===e.id?'selected':''}>${e.date} — ${e.title[state.lang]}</option>`).join('')}
        </select></div>`;
  }
  else if(step===4){
    const lv=[['new','lvl_new','lvl_new_d'],['return','lvl_return','lvl_return_d'],['inter','lvl_inter','lvl_inter_d'],['adv','lvl_adv','lvl_adv_d']];
    body = `<div class="q-text" data-t="q_level_h"></div><div class="q-sub" data-t="q_level_sub"></div>
      <div class="up-lvl">${lv.map(([v,a,b])=>`<button type="button" class="${state.q.level===v?'on':''}" data-up="lvl" data-v="${v}">
        <b data-t="${a}"></b><span data-t="${b}"></span></button>`).join('')}</div>`;
  }
  else if(step===5){
    const d = UP_levelDefaults(sport, state.q.level||'inter');
    body = `<div class="q-text" data-t="q_volume_h"></div><div class="q-sub" data-t="q_volume_sub"></div>
      <div class="up-row">
        <div class="field"><label>${t('q_weekly')} (${UP_volUnit()})</label>
          <input type="number" id="qVol" value="${state.q.weeklyVol||''}" placeholder="${d[0]}"></div>
        <div class="field"><label>${t('q_longest')} (${UP_volUnit()})</label>
          <input type="number" id="qLong" value="${state.q.longestVol||''}" placeholder="${d[1]}"></div>
      </div>
      <div class="err-msg" id="volErr" data-t="q_volume_err" role="alert"></div>`;
  }
  else if(step===6){
    const picked = state.q.trainDays || [];
    body = `<div class="q-text" data-t="q_days_h"></div><div class="q-sub" data-t="q_days_sub"></div>
      <div class="up-daychips">${UP_dayNames().map((n,i)=>`
        <button type="button" class="up-daychip ${picked.includes(i)?'on':''}" data-up="day" data-v="${i}" aria-pressed="${picked.includes(i)?'true':'false'}">${n}</button>`).join('')}</div>
      <p class="muted small" style="margin-top:12px;" data-t="sum_cap10"></p>
      <div class="err-msg" id="daysErr" data-t="q_days_err" role="alert"></div>`;
  }
  else if(step===7){
    const dists = sport==='swim' ? [['400','400 m'],['1500','1500 m']]
      : sport==='bike' ? [['20','20 km'],['40','40 km']]
      : [['5','5 km'],['10','10 km'],['21.1','21.1 km'],['42.2','42.2 km']];
    body = `<div class="q-text" data-t="q_ref_h"></div><div class="q-sub" data-t="q_ref_sub"></div>
      <div class="up-row">
        <div class="field"><label data-t="q_ref_dist"></label>
          <select id="qRefDist">${dists.map(([v,l])=>`<option value="${v}" ${state.q.refDist===v?'selected':''}>${l}</option>`).join('')}</select></div>
        <div class="field"><label data-t="q_ref_time"></label>
          <input type="text" id="qRefTime" inputmode="numeric" placeholder="28:30" value="${state.q.refTime||''}"></div>
      </div>
      <p class="muted small" style="margin-top:10px;" data-t="q_ref_none"></p>`;
  }
  else if(step===8){
    body = `<div class="q-text" data-t="q_safety_h"></div><div class="q-sub" data-t="q_safety_sub"></div>
      <div style="margin-top:14px;font-weight:700;" data-t="q_cardiac_h"></div>
      <div class="choice-group-2" style="margin-top:8px;">${choiceBtn('cardiacFlag','true','yes',true)}${choiceBtn('cardiacFlag','false','no')}</div>
      <div class="err-msg" id="cardiacErr" data-t="q_cardiac_err" role="alert"></div>
      ${state.q.cardiacFlag==='true'?`
        <div style="margin-top:20px;font-weight:700;" data-t="q_cardiac_followup_h"></div>
        <div class="muted small" data-t="q_cardiac_followup_sub"></div>
        <div class="choice-group-2" style="margin-top:8px;">${choiceBtn('cardiacClearance','true','yes')}${choiceBtn('cardiacClearance','false','no')}</div>
        <div class="err-msg" id="cardiacFollowupErr" data-t="q_cardiac_followup_err" role="alert"></div>`:''}
      <div class="disclaimer" style="margin-top:18px;">${icon('info',18)}<span data-t="disclaimer_text"></span></div>`;
  }

  return `<section><div class="container wizard-wrap">
    <div class="step-label">${stepLabel}</div>
    <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}" aria-label="${stepLabel}"><div class="progress-fill" style="width:${pct}%;"></div></div>
    <div class="card">${body}
      <div class="wizard-nav">
        ${step>1?`<button class="btn btn-ghost" id="qBack" data-t="q_back"></button>`:`<span></span>`}
        <button class="btn btn-primary" id="qNext" data-t="${pos.isLast?'q_finish':'q_next'}"></button>
      </div>
    </div>
  </div></section>`;
}

function UP_collectStep(step){
  if(step===1){ const c=document.getElementById('qInput_city'); if(c) state.q.city=c.value; }
  if(step===3){ const r=document.getElementById('qRace'); if(r){ state.q.raceId=r.value||null;
    const ev=EVENTS().find(e=>e.id===r.value); state.q.raceDate=ev?ev.date:null; } }
  if(step===5){
    const v=document.getElementById('qVol'), l=document.getElementById('qLong');
    if(v) state.q.weeklyVol=UP_num(v.value);
    if(l) state.q.longestVol=UP_num(l.value);
  }
  if(step===7){
    const d=document.getElementById('qRefDist'), tm=document.getElementById('qRefTime');
    if(d) state.q.refDist=d.value;
    if(tm) state.q.refTime=tm.value.trim()||null;
  }
}
function bindQuestionnaireEvents(){
  document.querySelectorAll('[data-qgroup]').forEach(btn=>btn.addEventListener('click',()=>{
    UP_collectStep(state.qStep);
    state.q[btn.dataset.qgroup]=btn.dataset.qvalue; persist(); renderRoute('questionnaire');
  }));
  const back=document.getElementById('qBack');
  if(back) back.addEventListener('click',()=>{ UP_collectStep(state.qStep); state.qStep=prevStepFrom(state.qStep); persist(); renderRoute('questionnaire'); });
  const next=document.getElementById('qNext');
  if(next) next.addEventListener('click',()=>{
    const step=state.qStep;
    UP_collectStep(step);
    if(step===2 && !state.q.sport) state.q.sport='run';
    if(step===5 && !state.q.weeklyVol){
      const d=UP_levelDefaults(state.q.sport||'run', state.q.level||'inter');
      state.q.weeklyVol=d[0]; state.q.longestVol=state.q.longestVol||d[1];
    }
    if(step===6 && !(state.q.trainDays||[]).length){ document.getElementById('daysErr').classList.add('show'); return; }
    if(step===8){
      if(state.q.cardiacFlag==null){ document.getElementById('cardiacErr').classList.add('show'); return; }
      if(state.q.cardiacFlag==='true' && state.q.cardiacClearance==null){ document.getElementById('cardiacFollowupErr').classList.add('show'); return; }
    }
    const s=nextStepFrom(step); state.qStep=s;
    if(s>UP_LAST){ state.q.completed=true; state.q.hours=Math.round(UP_weeklyMinutes()/60); state.planned=[]; rebuildPlan(); }
    persist(); renderRoute('questionnaire');
  });
  const sumGo=document.getElementById('sumGoPlan');
  if(sumGo) sumGo.addEventListener('click',()=>{ state.q.completed=true; if(!state.planned.length) rebuildPlan(); persist(); });
}

function renderSummary(){
  const gate = safetyGate();
  const week1 = Math.round((state.q.weeklyVol||0));
  const days = UP_daysPicked().map(i=>UP_dayNames()[i]).join('، ');
  return `<section><div class="container wizard-wrap"><div class="card">
    <h3 data-t="sum_perf_title"></h3>
    <table class="pt-table" style="margin-bottom:16px;">
      <tbody>
        <tr><td data-t="sum_start_vol"></td><td>${week1} ${UP_volUnit()} · ${UP_daysPicked().length} ${state.lang==='ar'?'أيام':'days'}</td></tr>
        <tr><td data-t="q_days_pick"></td><td>${days}</td></tr>
        <tr><td data-t="sum_progress"></td><td data-t="sum_progress_v"></td></tr>
      </tbody></table>
    <h3 data-t="sum_title"></h3>
    <p class="muted small" data-t="sum_sub" style="margin-bottom:10px;"></p>
    <div class="constraint-item ${gate.cardiacLocked?'locked':'ok'}">${icon(gate.cardiacLocked?'alertTriangle':'checkCircle',20)}
      <span>${gate.cardiacLocked?t('sum_cardiac_locked'):t('sum_cardiac_ok')}</span></div>
    ${state.q.raceDate?`<div class="constraint-item ok">${icon('flag',20)}<span>${state.q.raceDate}</span></div>`:''}
    <a href="#/plan" class="btn btn-primary" style="margin-top:18px;width:100%;" id="sumGoPlan" data-t="sum_cta"></a>
  </div></div></section>`;
}

/* ---------- بناء الخطة من الحجم والأيام ---------- */
function sessionSpecs(sport, hours, cap, ramadan){
  const days = UP_daysPicked();
  const budget = UP_weeklyMinutes();
  const n = days.length;
  const shares = {1:[1],2:[.45,.55],3:[.3,.3,.4],4:[.22,.24,.22,.32],
    5:[.18,.2,.18,.14,.3],6:[.16,.18,.16,.12,.14,.24],7:[.14,.16,.14,.12,.12,.14,.18]}[n] || [.25,.25,.25,.25];
  const speedGoal = state.q.goal==='time';
  const zoneFor = (i)=>{
    if(cap==='low') return 'easy';
    if(i===n-1) return n>=3 ? 'moderate' : 'easy';       // الجلسة الطويلة
    if(n>=3 && i===1) return speedGoal ? 'hard' : 'moderate';
    if(n>=5 && i===3) return 'hard';
    return 'easy';
  };
  const minPer = UP_minPerUnit(sport);
  return days.map((day,i)=>{
    const min = Math.max(20, Math.round(budget*shares[i]/5)*5);
    const isStrength = n>=4 && i===2 && sport!=='swim';
    const s = isStrength ? 'strength' : (sport==='tri' ? ['swim','bike','run','strength','brick','bike','run'][i%7] : sport);
    const km = s==='strength' ? 0 : +(min/UP_minPerUnit(s)).toFixed(1);
    return { day, sport:s, zone: isStrength ? 'easy' : zoneFor(i), min, km };
  });
}
function UP_weekFactor(w){
  const f = 1 + 0.05*w;
  const deload = (w%4===3) ? 0.75 : 1;
  return Math.min(1.6, f) * deload;
}
function rebuildPlan(){
  const gate = safetyGate();
  const cap = gate.intensityCeiling;
  const ramadan = state.q.ramadan==='true';
  const week0 = startOfGulfWeek(new Date());
  const specs = sessionSpecs(state.q.sport||'run', state.q.hours||4, cap, ramadan);
  const doneMap = {};
  (state.planned||[]).forEach(p=>{ if(p.done) doneMap[p.id]=true; });
  const history = (state.planned||[]).filter(p=>p.done && p.date < iso(week0));
  const planned = [];
  for(let w=0; w<12; w++){
    const f = UP_weekFactor(w);
    specs.forEach(s=>{
      const date = iso(addDays(week0, w*7 + s.day));
      let zone = s.zone;
      if(cap==='low' && zone!=='easy') zone='easy';
      const id = 'p-'+date+'-'+s.sport+'-'+s.day;
      planned.push({ id, date, sport:s.sport, zone,
        min: Math.round(s.min*f/5)*5,
        km: s.km ? +(s.km*f).toFixed(1) : 0,
        week: w, deload: (w%4===3),
        postIftar: ramadan && zone!=='easy',
        done: !!doneMap[id] });
    });
  }
  state.planned = [...history, ...planned];
  persist();
}

/* ---------- الجاهزية مع تسجيل اليوم والحر ---------- */
function readiness(){
  const gate = safetyGate();
  const ff = fitnessFatigue();
  const ci = UP_todayCheckin();
  const heat = UP_heatBand();
  let score = 72;
  if(gate.cardiacLocked) score -= 28;
  const sleepH = ci && ci.sleep!=null ? ci.sleep : UP_sleepFallback();
  if(sleepH!=null){
    if(sleepH < 5) score -= 18;
    else if(sleepH < 6.5) score -= 8;
    else if(sleepH >= 8) score += 6;
  }
  if(ci && ci.soreness) score -= (ci.soreness-2)*7;
  if(state.q.ramadan==='true') score -= 6;
  if(ff.form < -8) score -= 12; else if(ff.form > 8) score += 6;
  if(heat && heat.level>=4) score -= 8; else if(heat && heat.level===3) score -= 4;
  score = Math.max(18, Math.min(96, Math.round(score)));
  const energy = Math.max(15, Math.min(95, Math.round(80 + ff.form - (gate.cardiacLocked?20:0) - (sleepH!=null&&sleepH<5?15:0))));
  let band='ok', msg=t('ready_go');
  if(gate.cardiacLocked || score<45){ band='low'; msg=t('ready_locked'); }
  else if(heat && heat.level>=4){ band='mid'; msg=t('ready_heat'); }
  else if(score<62 || ff.form<-8){ band='mid'; msg=t('ready_tired'); }
  return {score, energy, band, msg, ...ff};
}

/* ---------- الواجهات الجديدة ---------- */
function UP_wxCard(compact){
  const w = state.wx;
  if(!w || w.failed || !w.cur){
    return `<div class="card"><h3 data-t="wx_title"></h3>
      <p class="muted small" style="margin-top:8px;" data-t="wx_fail"></p>
      <button class="btn btn-ghost btn-sm" data-up="wxrefresh" style="margin-top:10px;" data-t="wx_refresh"></button></div>`;
  }
  const b = UP_band(w.cur.app, w.cur.rh);
  const win = UP_bestWindow();
  const hrs = (w.hours||[]).slice(0,14);
  const min = Math.min(...hrs.map(h=>h.app)), max = Math.max(...hrs.map(h=>h.app));
  const bestT = win ? win.from.t : null;
  return `<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
      <h3 data-t="wx_title"></h3>
      <span class="up-band up-b${b.level}">${b.msg}</span>
    </div>
    <p class="muted small" style="margin-top:6px;">${state.q.city} · ${t('wx_stale')} ${new Date(w.ts).toLocaleTimeString(state.lang==='ar'?'ar-AE':'en-GB',{hour:'2-digit',minute:'2-digit'})}</p>
    <div class="up-wx-grid">
      <div><b>${Math.round(w.cur.temp)}°</b><span data-t="wx_now"></span></div>
      <div><b>${Math.round(w.cur.app)}°</b><span data-t="wx_feels"></span></div>
      <div><b>${Math.round(w.cur.rh)}%</b><span data-t="wx_hum"></span></div>
      <div><b>${Math.round(w.cur.wind)}</b><span data-t="wx_wind"></span></div>
    </div>
    ${b.humid?`<p class="muted small" style="margin-top:10px;" data-t="wx_hum_note"></p>`:''}
    ${win?`<p style="margin-top:14px;font-weight:800;">${t('wx_window')}: ${win.from.t.slice(11,16)} — ${new Date(new Date(win.to.t).getTime()+3600000).toISOString().slice(11,16)} · ${Math.round(win.avg)}°</p>
      <p class="muted small" data-t="wx_window_sub"></p>`:''}
    ${compact?'':`<div class="up-hours">${hrs.map(h=>{
      const pct = max>min ? 20+70*(h.app-min)/(max-min) : 50;
      return `<div class="up-hour ${h.t===bestT?'best':''}"><i style="height:${Math.round(pct)}%"></i><span>${h.t.slice(11,13)}</span></div>`;
    }).join('')}</div>`}
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
      <button class="btn btn-ghost btn-sm" data-up="wxrefresh" data-t="wx_refresh"></button>
      ${compact?`<a href="#/weather" class="btn btn-ghost btn-sm" data-t="wx_title"></a>`:''}
    </div>
  </div>`;
}
function viewWeather(){
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="wx_title"></h2>
      <p class="muted" data-t="wx_disclaimer"></p></div>
    ${UP_wxCard(false)}
    <div class="card" style="margin-top:16px;">
      <h3>${state.lang==='ar'?'كيف نصنّف':'How the grade works'}</h3>
      <table class="pt-table"><tbody>
        <tr><td>&lt; 28°</td><td data-t="wx_band1"></td></tr>
        <tr><td>28–32°</td><td data-t="wx_band2"></td></tr>
        <tr><td>32–37°</td><td data-t="wx_band3"></td></tr>
        <tr><td>37–41°</td><td data-t="wx_band4"></td></tr>
        <tr><td>&gt; 41°</td><td data-t="wx_band5"></td></tr>
      </tbody></table>
      <p class="muted small" style="margin-top:10px;" data-t="wx_hum_note"></p>
      <p class="muted small" style="margin-top:10px;">${state.lang==='ar'
        ? 'التأقلم 7–14 يوماً يبقى الأهم قبل المنافسة في الحر (Racinais 2015)، وضربة الحر حالة طوارئ (ACSM 2023).'
        : 'Acclimatization over 7–14 days remains the main intervention before racing in heat (Racinais 2015); heat stroke is an emergency (ACSM 2023).'}</p>
    </div>
    <div class="card" style="margin-top:16px;">
      <h3 data-t="wx_official"></h3>
      <p class="muted small" style="margin-top:8px;" data-t="wx_src"></p>
      <a class="btn btn-ghost btn-sm" style="margin-top:10px;" href="${UP_NCM}" target="_blank" rel="noopener" data-t="wx_official"></a>
      <p class="muted small" style="margin-top:10px;">${UP_WX_ATTR}</p>
    </div>
  </div></section>`;
}

function viewTests(){
  const due = UP_testDue();
  const rows = UP_tests();
  const lastRun = UP_lastTest('run'), lastSwim = UP_lastTest('swim'), lastBike = UP_lastTest('bike');
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="tests_title"></h2><p class="muted" data-t="tests_sub"></p></div>
    <div class="card ${due.due?'up-due':''}" style="margin-bottom:16px;">
      <h3>${due.due?t('test_due'):t('test_next')+' '+Math.max(0,due.days)+' '+t('test_days')}</h3>
      <p class="muted small" style="margin-top:8px;" data-t="test_heat_note"></p>
    </div>
    <div class="grid g3">
      <div class="card"><h3 data-t="test_run"></h3><p class="muted small" data-t="test_run_sub"></p>
        <div class="field" style="margin-top:10px;"><label data-t="test_m"></label><input type="number" id="tRun" placeholder="2400"></div>
        <button class="btn btn-primary btn-sm" data-up="savetest" data-v="run" data-t="test_save"></button>
        ${lastRun?`<p class="muted small" style="margin-top:10px;">${lastRun.date} · ${lastRun.meters} m · VO2max ≈ ${cooperVO2max(lastRun.meters).toFixed(1)}</p>`:''}</div>
      <div class="card"><h3 data-t="test_swim"></h3><p class="muted small" data-t="test_swim_sub"></p>
        <div class="up-row" style="margin-top:10px;">
          <div class="field"><label data-t="test_400"></label><input type="text" id="tSwim400" placeholder="7:10"></div>
          <div class="field"><label data-t="test_200"></label><input type="text" id="tSwim200" placeholder="3:20"></div></div>
        <button class="btn btn-primary btn-sm" style="margin-top:8px;" data-up="savetest" data-v="swim" data-t="test_save"></button>
        ${lastSwim?`<p class="muted small" style="margin-top:10px;">${lastSwim.date} · ${t('css_pace')}: ${UP_fmtSec(lastSwim.cssSec)}</p>`:''}</div>
      <div class="card"><h3 data-t="test_bike"></h3><p class="muted small" data-t="test_bike_sub"></p>
        <div class="field" style="margin-top:10px;"><label data-t="test_kmh"></label><input type="number" step="0.1" id="tBike" placeholder="32"></div>
        <button class="btn btn-primary btn-sm" data-up="savetest" data-v="bike" data-t="test_save"></button>
        ${lastBike?`<p class="muted small" style="margin-top:10px;">${lastBike.date} · ${t('ftp_est')}: ${(lastBike.kmh*0.95).toFixed(1)} km/h</p>`:''}</div>
    </div>
    <div class="card" style="margin-top:16px;">
      <h3 data-t="test_history"></h3>
      ${rows.length? `<table class="pt-table"><tbody>${rows.map(r=>`<tr><td>${r.date}</td><td>${t('sport_'+(r.type==='run'?'run':r.type==='swim'?'swim':'bike'))}</td>
        <td>${r.type==='run'? r.meters+' m' : r.type==='swim'? UP_fmtSec(r.cssSec)+' /100m' : r.kmh+' km/h'}</td></tr>`).join('')}</tbody></table>`
        : `<p class="muted small" style="margin-top:8px;" data-t="test_none"></p>`}
    </div>
  </div></section>`;
}

function UP_checkinCard(){
  const ci = UP_todayCheckin();
  const sore = ci ? ci.soreness : null;
  return `<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <h3 data-t="ci_title"></h3>${ci?`<span class="estimate-tag" data-t="ci_done"></span>`:''}
    </div>
    <p class="muted small" data-t="ci_sub"></p>
    <div class="field" style="margin-top:12px;"><label data-t="ci_sleep"></label>
      <input type="number" step="0.5" id="ciSleep" value="${ci&&ci.sleep!=null?ci.sleep:''}" placeholder="7"></div>
    <label style="font-weight:700;font-size:13.5px;" data-t="ci_sore"></label>
    <div class="choice-group-4" style="margin-top:8px;">
      ${[1,2,3,4].map(v=>`<button type="button" class="choice ${sore===v?'selected':''}" data-up="sore" data-v="${v}" data-t="ci_sore${v}"></button>`).join('')}
    </div>
    <button class="btn btn-primary btn-sm" style="margin-top:12px;" data-up="cisave" data-t="ci_save"></button>
  </div>`;
}

function viewDashboard(){
  if(!state.q.completed){
    return `<section><div class="container wizard-wrap"><div class="card"><p class="muted" data-t="dash_need_q"></p>
      <a href="#/questionnaire" class="btn btn-primary" style="margin-top:12px;" data-t="plan_go_q"></a></div></div></section>`;
  }
  const r = readiness();
  const today = iso(new Date());
  const todays = (state.planned||[]).filter(p=>p.date===today);
  const due = UP_testDue();
  const bars = [];
  for(let i=13;i>=0;i--){
    const d = iso(addDays(new Date(),-i));
    let L=0;
    (state.activities||[]).filter(a=>a.date===d).forEach(a=>L+=a.load||0);
    bars.push(L);
  }
  const maxB = Math.max(10,...bars);
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="dash_title"></h2>
      <p class="muted small">${state.q.city} · ${state.q.sport?t('sport_'+state.q.sport):''} · ${UP_daysPicked().length} ${state.lang==='ar'?'أيام':'days'}</p>
      <p class="muted">${motivationLine()}</p></div>
    <div class="hero-cta" style="margin-bottom:16px;">
      <a href="#/plan" class="btn btn-primary">${t('dash_today')}</a>
      <a href="#/tests" class="btn btn-ghost">${t('tests_title')}</a>
      <a href="#/weather" class="btn btn-ghost">${t('wx_title')}</a>
    </div>
    <div class="stat-grid" style="margin-bottom:var(--sp-3);">
      <div class="card stat-card" style="display:flex;align-items:center;gap:14px;">
        <div class="readiness-ring readiness-${r.band}">${r.score}</div>
        <div><div class="stat-lbl" data-t="dash_ready"></div><div class="muted small">${r.msg}</div></div>
      </div>
      <div class="card stat-card"><div class="stat-val">${r.energy}</div><div class="stat-lbl" data-t="dash_energy"></div></div>
      <div class="card stat-card"><div class="stat-val">${r.load7}</div><div class="stat-lbl" data-t="dash_load"></div></div>
      <div class="card stat-card"><div class="stat-val">${r.form}</div><div class="stat-lbl" data-t="dash_form"></div>
        <div class="muted small">${t('dash_fit')} ${r.fitness} · ${t('dash_fat')} ${r.fatigue}</div></div>
    </div>
    <div class="grid g2" style="margin-bottom:16px;">${UP_wxCard(true)}${UP_checkinCard()}</div>
    <div class="grid g2">
      <div class="card">
        <h3 data-t="dash_today"></h3>
        ${todays.length? todays.map(p=>`<p style="margin-top:10px;font-weight:700;">${icon(p.sport,16)} ${sessionTitle(p.sport,p.zone)} · ${p.min} ${unit('min')} · ${t('zone_'+p.zone)}${p.deload?' · '+(state.lang==='ar'?'أسبوع تخفيف':'deload'):''}</p>`).join('') : `<p class="muted" style="margin-top:8px;">${t('rest')}</p>`}
        <a href="#/plan" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="nav_plan"></a>
      </div>
      <div class="card">
        <h3 data-t="dash_pmc"></h3>
        <div class="pmc-bars">${bars.map(b=>`<div class="pmc-bar" style="height:${Math.round(b/maxB*100)}%;"></div>`).join('')}</div>
        ${due.due?`<a href="#/tests" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="test_due"></a>`:''}
      </div>
    </div>
  </div></section>`;
}

/* ---------- فعاليات: القادم افتراضاً ---------- */
function viewEvents(){
  const joined = new Set(state.joinedEvents||[]);
  const today = iso(new Date());
  const showPast = !!state.showPastEvents;
  const all = EVENTS().filter(e=>showPast || e.date>=today);
  const cities = ['all', ...Array.from(new Set(all.map(e=>e.city)))];
  const filter = state.eventCity || 'all';
  const list = filter==='all' ? all : all.filter(e=>e.city===filter);
  return `<section><div class="container">
    <div class="section-head"><h2 data-t="nav_events"></h2><p class="muted">${motivationLine()}</p></div>
    <p class="muted small" style="margin-bottom:14px;">${state.lang==='ar'
      ? 'رزنامة الإمارات فقط. الانضمام محلي على جهازك — التسجيل عند المنظم، والتواريخ قد تتغيّر.'
      : 'UAE calendar only. Join is local to this device — entry is with the organiser, and dates can move.'}</p>
    <div class="up-row" style="margin-bottom:16px;">
      <div class="field" style="max-width:260px;"><label>${state.lang==='ar'?'المدينة':'City'}</label>
        <select id="eventCityFilter">${cities.map(c=>`<option value="${c}" ${filter===c?'selected':''}>${c==='all'?(state.lang==='ar'?'كل المدن':'All cities'):c}</option>`).join('')}</select></div>
      <button class="btn btn-ghost btn-sm" data-up="pastev" data-t="${showPast?'ev_upcoming':'ev_past'}"></button>
    </div>
    ${list.map(e=>`<div class="card" style="margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap;${e.date<today?'opacity:.6;':''}">
      <img src="${sportImg(e.sport)}" alt="" class="event-thumb">
      <div style="flex:1;min-width:180px;">
        <div class="eyebrow">${e.date} · ${e.city}${e.org?' · '+e.org:''}</div>
        <h3 style="margin-top:4px;">${e.title[state.lang]}</h3>
        <p class="muted small">${t('sport_'+e.sport)}${e.km? ' · '+e.km+' '+unit('km'):''}</p>
        ${e.url?`<a class="muted small" href="${e.url}" target="_blank" rel="noopener">${state.lang==='ar'?'موقع المنظم':'Organiser site'}</a>`:''}
      </div>
      <button class="btn ${joined.has(e.id)?'btn-ghost':'btn-primary'} btn-sm" data-join="${e.id}">${joined.has(e.id)?(state.lang==='ar'?'منضم':'Joined'):(state.lang==='ar'?'أنضم':'Join')}</button>
    </div>`).join('')}
    <div class="card" style="margin-top:8px;">
      <h3>${state.lang==='ar'?'المنظمون المعتمدون':'Listed organisers'}</h3>
      ${ORGANIZERS.map(o=>`<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--card-border);">
        <strong>${o.name[state.lang]}</strong>
        <p class="muted small" style="margin-top:4px;">${o.why[state.lang]}</p>
        <a class="muted small" href="${o.site}" target="_blank" rel="noopener">${o.site.replace('https://','')}</a></div>`).join('')}
    </div>
  </div></section>`;
}

/* ---------- الحساب: تفضيلات تدريب + استيراد ---------- */
function viewAccount(){
  const tab = state.accountTab;
  const tabs=[['profile','acc_tab_profile'],['training','acc_tab_training'],['settings','acc_tab_settings'],['privacy','acc_tab_privacy']];
  let content='';
  if(tab==='profile'){
    content = !state.q.completed ? `<p class="muted" data-t="acc_no_profile"></p>` :
      `<div class="grid g2">
        <div><span class="muted small" data-t="q_sport_h"></span><div style="font-weight:700;">${state.q.sport?t('sport_'+state.q.sport):'—'}</div></div>
        <div><span class="muted small" data-t="q_level_h"></span><div style="font-weight:700;">${state.q.level?t('lvl_'+state.q.level):'—'}</div></div>
        <div><span class="muted small" data-t="q_weekly"></span><div style="font-weight:700;">${state.q.weeklyVol||'—'} ${UP_volUnit()}</div></div>
        <div><span class="muted small" data-t="q_longest"></span><div style="font-weight:700;">${state.q.longestVol||'—'} ${UP_volUnit()}</div></div>
        <div><span class="muted small" data-t="q_days_pick"></span><div style="font-weight:700;">${UP_daysPicked().map(i=>UP_dayNames()[i]).join('، ')}</div></div>
        <div><span class="muted small" data-t="q_city_h"></span><div style="font-weight:700;">${state.q.city||'—'}</div></div>
      </div>
      <button class="btn btn-ghost" id="resetMetricsBtn" style="margin-top:14px;">${state.lang==='ar'?'إعادة التقييم':'Redo assessment'}</button>`;
  } else if(tab==='training'){
    const alls=[['nuts','all_nuts'],['shellfish','all_shellfish'],['gluten','all_gluten'],['dairy','all_dairy']];
    content = `
      <div class="toggle-row"><div><div style="font-weight:700;" data-t="acc_ramadan"></div>
        <div class="muted small" data-t="plan_ramadan_applied"></div></div>
        <button type="button" class="switch ${state.q.ramadan==='true'?'on':''}" data-up="ramadan" role="switch" aria-checked="${state.q.ramadan==='true'?'true':'false'}"><span class="knob"></span></button></div>
      <div style="padding:14px 0;border-bottom:1px solid var(--card-border);">
        <div style="font-weight:700;" data-t="acc_allergens"></div>
        <div class="muted small" style="margin-bottom:10px;" data-t="acc_allergens_sub"></div>
        <div class="choice-group" style="grid-template-columns:repeat(2,1fr);">
          ${alls.map(([v,k])=>`<button type="button" class="choice ${(state.q.allergens||[]).includes(v)?'selected':''}" data-up="allergen" data-v="${v}" data-t="${k}"></button>`).join('')}
        </div>
        ${(state.q.allergens||[]).filter(a=>a!=='none').map(a=>`<div class="severity-row" style="margin-top:10px;">
          <span data-t="all_${a}"></span>
          <div class="severity-choices">
            ${['mild','moderate','severe'].map(s=>`<button class="sev-btn sel-${s} ${state.q.allergySeverity[a]===s?'selected':''}" data-up="sev" data-v="${a}:${s}" data-t="sev_${s}"></button>`).join('')}
          </div></div>`).join('')}
      </div>
      <div style="padding:14px 0;">
        <div style="font-weight:700;margin-bottom:10px;" data-t="acc_body"></div>
        <div class="up-row">
          <div class="field"><label data-t="q_height_h"></label><input type="number" id="accH" value="${state.q.height||''}" placeholder="175"></div>
          <div class="field"><label data-t="q_weight_h"></label><input type="number" id="accW" value="${state.q.weight||''}" placeholder="72"></div>
        </div>
      </div>
      <button class="btn btn-primary" data-up="saveprefs" data-t="acc_rebuild"></button>`;
  } else if(tab==='settings'){
    content = `<div class="field"><label data-t="acc_lang"></label>
      <select id="accLangSelect"><option value="ar" ${state.lang==='ar'?'selected':''}>العربية</option><option value="en" ${state.lang==='en'?'selected':''}>English</option></select></div>
      <div class="field"><label data-t="acc_theme"></label>
      <select id="accThemeSelect"><option value="light" ${state.theme==='light'?'selected':''} data-t="acc_theme_light"></option><option value="dark" ${state.theme==='dark'?'selected':''} data-t="acc_theme_dark"></option></select></div>
      <div class="field"><label data-t="q_city_h"></label>
      <select id="accCity">${UP_UAE_CITIES.map(c=>`<option ${state.q.city===c?'selected':''}>${c}</option>`).join('')}</select></div>`;
  } else {
    const validUntil = state.clearanceConfirmedAt ? new Date(new Date(state.clearanceConfirmedAt).getTime()+365*86400000).toLocaleDateString(state.lang==='ar'?'ar-EG':'en-GB') : '';
    content = `${state.q.cardiacFlag==='true'?`<div class="toggle-row"><div>
        <div style="font-weight:700;" data-t="acc_clearance_toggle"></div>
        <div class="muted small" data-t="acc_clearance_sub"></div>
        ${state.clearanceConfirmed?`<div class="muted small">${t('acc_clearance_valid')} ${validUntil}</div>`:''}
      </div><button type="button" class="switch ${state.clearanceConfirmed?'on':''}" id="clearanceToggle" role="switch" aria-checked="${state.clearanceConfirmed?'true':'false'}"><span class="knob"></span></button></div>`:''}
      <div class="toggle-row"><div>
        <div style="font-weight:700;" data-t="acc_womens_health"></div>
        <div class="muted small" data-t="acc_womens_health_sub"></div>
      </div><button type="button" class="switch ${state.womensHealthEnabled?'on':''}" id="whToggle" role="switch" aria-checked="${state.womensHealthEnabled?'true':'false'}"><span class="knob"></span></button></div>
      ${state.womensHealthEnabled?`<a href="#/womens-health" class="btn btn-ghost btn-sm" style="margin-top:12px;" data-t="acc_womens_health_link"></a>`:''}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;align-items:center;">
        <button class="btn btn-ghost" id="exportBtn" data-t="acc_export"></button>
        <button class="btn btn-ghost" data-up="importbtn" data-t="acc_import"></button>
        <input type="file" id="upImportFile" accept="application/json" class="hidden">
        <button class="btn btn-danger" id="deleteBtn" data-t="acc_delete"></button>
      </div>
      <p class="muted small" style="margin-top:10px;" id="upImportMsg"></p>`;
  }
  return `<section><div class="container"><div class="section-head"><h2 data-t="acc_title"></h2></div>
    <div class="account-layout">
      <div class="account-tabs">${tabs.map(([v,k])=>`<button class="${tab===v?'active':''}" data-atab="${v}" data-t="${k}"></button>`).join('')}</div>
      <div class="card" style="flex:1;width:100%;">${content}</div>
    </div></div></section>`;
}

/* ---------- التوجيه ---------- */
function renderRoute(route){
  ensurePlan();
  const app = document.getElementById('app');
  const views = {
    home:viewHome, how:viewHow, questionnaire:viewQuestionnaire, plan:viewPlan,
    nutrition:viewNutrition, equipment:viewEquipment, routes:viewRoutes,
    community:viewCommunity, specialist:viewSpecialist, account:viewAccount,
    legal:viewLegal, 'womens-health':viewWomensHealth,
    dashboard:viewDashboard, activities:viewActivities, events:viewEvents, progress:viewProgress,
    awareness:viewAwareness, topic:viewTopic, climate:viewClimate, supplements:viewSupplements,
    weather:viewWeather, tests:viewTests,
  };
  app.innerHTML = (views[route] || viewHome)();
  bindViewEvents(route);
  applyTranslations();
}

/* ---------- تفويض الأحداث للعناصر الجديدة ---------- */
function UP_delegate(){
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-up]');
    if(!el) return;
    const kind = el.dataset.up, v = el.dataset.v;
    if(kind==='lvl'){
      state.q.level=v;
      const d=UP_levelDefaults(state.q.sport||'run', v);
      if(!state.q.weeklyVol){ state.q.weeklyVol=d[0]; state.q.longestVol=d[1]; }
      persist(); renderRoute('questionnaire');
    }
    else if(kind==='day'){
      const i=+v; const arr=(state.q.trainDays||[]).slice();
      const at=arr.indexOf(i);
      if(at>-1) arr.splice(at,1); else arr.push(i);
      state.q.trainDays=arr; state.q.daysPerWeek=arr.length; persist(); renderRoute('questionnaire');
    }
    else if(kind==='sore'){
      const d=iso(new Date());
      state.checkins=state.checkins||{};
      state.checkins[d]=Object.assign({}, state.checkins[d]||{}, {soreness:+v});
      persist(); navigate();
    }
    else if(kind==='cisave'){
      const s=document.getElementById('ciSleep');
      const d=iso(new Date());
      state.checkins=state.checkins||{};
      state.checkins[d]=Object.assign({}, state.checkins[d]||{}, {sleep:UP_num(s&&s.value)});
      persist(); navigate();
    }
    else if(kind==='wxrefresh'){
      UP_fetchWeather(true).then(()=>navigate());
    }
    else if(kind==='savetest'){
      if(v==='run'){
        const m=UP_num(document.getElementById('tRun').value);
        if(m && m>500 && m<7000) UP_saveTest({type:'run', meters:m});
      } else if(v==='swim'){
        const t4=UP_parseTime(document.getElementById('tSwim400').value);
        const t2=UP_parseTime(document.getElementById('tSwim200').value);
        const css=UP_cssPace(t4,t2);
        if(css) UP_saveTest({type:'swim', t400:t4, t200:t2, cssSec:Math.round(css)});
      } else {
        const k=UP_num(document.getElementById('tBike').value);
        if(k && k>5 && k<70) UP_saveTest({type:'bike', kmh:k});
      }
      renderRoute('tests');
    }
    else if(kind==='pastev'){ state.showPastEvents=!state.showPastEvents; persist(); renderRoute('events'); }
    else if(kind==='ramadan'){
      state.q.ramadan = state.q.ramadan==='true' ? 'false' : 'true';
      rebuildPlan(); persist(); renderRoute('account');
    }
    else if(kind==='allergen'){
      const arr=(state.q.allergens||[]).filter(a=>a!=='none');
      const at=arr.indexOf(v);
      if(at>-1){ arr.splice(at,1); delete state.q.allergySeverity[v]; }
      else { arr.push(v); state.q.allergySeverity[v]=state.q.allergySeverity[v]||'mild'; }
      state.q.allergens=arr; persist(); renderRoute('account');
    }
    else if(kind==='sev'){
      const [a,s]=v.split(':');
      state.q.allergySeverity[a]=s; persist(); renderRoute('account');
    }
    else if(kind==='saveprefs'){
      const h=document.getElementById('accH'), w=document.getElementById('accW');
      if(h) state.q.height=h.value||null;
      if(w) state.q.weight=w.value||null;
      rebuildPlan(); persist(); renderRoute('account');
    }
    else if(kind==='importbtn'){
      const f=document.getElementById('upImportFile'); if(f) f.click();
    }
  });
  document.addEventListener('change', e=>{
    if(e.target && e.target.id==='upImportFile'){
      const file=e.target.files && e.target.files[0]; if(!file) return;
      const rd=new FileReader();
      rd.onload=()=>{
        try{
          const data=JSON.parse(rd.result);
          if(!data || typeof data!=='object' || !data.q) throw new Error('bad');
          state=Object.assign(defaultState(), data);
          state.q=Object.assign(defaultState().q, data.q||{});
          persist();
          setLang(state.lang||'ar'); setTheme(state.theme||'dark');
          location.hash='#/account'; navigate();
        }catch(err){
          const m=document.getElementById('upImportMsg');
          if(m){ m.textContent=t('acc_import_bad'); m.style.color='var(--danger)'; }
        }
      };
      rd.readAsText(file);
    }
    if(e.target && e.target.id==='accCity'){
      state.q.city=e.target.value; persist();
      UP_fetchWeather(true).then(()=>navigate());
    }
  });
}

/* ---------- تهيئة ---------- */
function UP_injectNav(){
  const add=(sel, href, key, insertBefore)=>{
    const host=document.querySelector(sel); if(!host) return;
    if(host.querySelector(`[href="${href}"]`)) return;
    const a=document.createElement('a');
    a.href=href; a.dataset.route=href.replace('#/',''); a.dataset.t=key; a.textContent=T[state.lang][key]||key;
    if(insertBefore && host.children[insertBefore]) host.insertBefore(a, host.children[insertBefore]);
    else host.appendChild(a);
  };
  add('nav.main-links','#/weather','nav_weather',3);
  add('nav.main-links','#/tests','nav_tests',4);
  add('#drawer','#/weather','nav_weather',6);
  add('#drawer','#/tests','nav_tests',7);
}
function UP_cleanRoutes(){
  for(let i=ROUTES.length-1;i>=0;i--){
    if(!UP_UAE_CITIES.includes(ROUTES[i].city)) ROUTES.splice(i,1);
  }
  const extra=[
    { img:'img/run.jpg', name:{ar:'جري حتا الجبلي',en:'Hatta trail loop'}, km:12, saved:false, city:'Hatta', seg:{ar:'صعود السد',en:'Dam climb'} },
    { img:'img/swim.jpg', name:{ar:'ساحل خورفكان',en:'Khor Fakkan seafront'}, km:5, saved:false, city:'Khor Fakkan', seg:{ar:'قطاع الميناء',en:'Harbour split'} },
    { img:'img/bike.jpg', name:{ar:'حلبة ياس — ليالي الدراجات',en:'Yas Marina — cycle nights'}, km:20, saved:true, city:'Abu Dhabi', seg:{ar:'اللفة الكاملة',en:'Full lap'} },
  ];
  extra.forEach(r=>{ if(!ROUTES.some(x=>x.city===r.city && x.km===r.km)) ROUTES.push(r); });
}
function shawtUpgradeInit(){
  const st=document.createElement('style'); st.textContent=UP_CSS; document.head.appendChild(st);
  if(!UP_UAE_CITIES.includes(state.q.city)) state.q.city='Abu Dhabi';
  state.checkins = state.checkins || {};
  state.tests = state.tests || [];
  if(state.q.completed && !state.q.level){        // ترقية ملف قديم
    state.q.level='inter';
    if(!state.q.weeklyVol){ const d=UP_levelDefaults(state.q.sport||'run','inter'); state.q.weeklyVol=d[0]; state.q.longestVol=d[1]; }
    if(!state.q.trainDays) state.q.trainDays=UP_daysPicked();
    state.planned=[];
  }
  if(state.qStep > UP_LAST && !state.q.completed) state.qStep=1;
  UP_cleanRoutes();
  UP_delegate();
  persist();
  setTimeout(()=>{ UP_injectNav(); UP_fetchWeather(false).then(w=>{ if(w) navigate(); }); }, 0);
}

/* ===== نهاية طبقة الأداء ===== */

loadState();
shawtUpgradeInit();
applyStaticIcons();
setLang(state.lang||'ar');
setTheme(state.theme||'dark');
function syncViewportClass(){
  const w=window.innerWidth;
  document.documentElement.classList.toggle('vp-phone', w<720);
  document.documentElement.classList.toggle('vp-tablet', w>=720 && w<1100);
  document.documentElement.classList.toggle('vp-desk', w>=1100);
}
window.addEventListener('resize', syncViewportClass);
syncViewportClass();
navigate();
