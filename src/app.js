/* ============ ابزار ============ */
const FA = '۰۱۲۳۴۵۶۷۸۹';
const fa = v => String(v).replace(/\d/g, d => FA[d]);
const toEn = s => String(s).replace(/[۰-۹]/g, d => FA.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const mmss = ms => { const t=Math.max(0,Math.ceil(ms/1000)); return fa(String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')); };
const fmtPhone = p => fa(p.replace(/^(\d{4})(\d{3})(\d{4})$/,'$1 $2 $3'));
const maskPhone = p => fa(p.slice(0,4)+'****'+p.slice(-3));
const pct = (a,b) => b ? Math.round(a*100/b) : 0;
const faN = n => fa(Math.round(n).toLocaleString('en-US')).replace(/,/g,'٬');
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// جلوگیری از تنها ماندن یک کلمه یا علامت در خط آخر
const nob = t => { const w=String(t).replace(/\s+/g,' ').trim().split(' '); const n=/^[\p{P}\p{S}]+$/u.test(w[w.length-1])?3:2; if(w.length<=n) return w.join(' '); return w.slice(0,-n).join(' ')+' '+w.slice(-n).join(' '); };

const SVGI = (d, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const I = {
  home: SVGI('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  exam: SVGI('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  mission: SVGI('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>'),
  rank: SVGI('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'),
  user: SVGI('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  back: SVGI('<path d="m9 6 6 6-6 6"/>','stroke-width="2.2"'),      // در راست‌به‌چپ، برگشت به سمت راست
  chev: SVGI('<path d="m15 6-6 6 6 6"/>','stroke-width="2.2"'),      // رفتن به جلو، به سمت چپ
  down: SVGI('<path d="m6 9 6 6 6-6"/>','stroke-width="2.2"'),
  arrowL: SVGI('<path d="M19 12H5M11 6l-6 6 6 6"/>','stroke-width="2"'),
  close: SVGI('<path d="M6 6l12 12M18 6 6 18"/>','stroke-width="2.2"'),
  flag: SVGI('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>','stroke-width="2"'),
  grid: SVGI('<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>','stroke-width="2"'),
  check: SVGI('<path d="m5 12.5 4.5 4.5L19 7.5"/>','stroke-width="2.6"'),
  info: SVGI('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>','width="16" height="16" stroke-width="2"'),
  clock: SVGI('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>','stroke-width="2"'),
  lock: SVGI('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>','stroke-width="2"'),
  play: SVGI('<path d="M8 5.5v13l9.5-6.5z" fill="currentColor"/>','stroke-width="1.6"'),
  undo: SVGI('<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>','stroke-width="2"'),
  cam: SVGI('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>','stroke-width="1.9"'),
  zoom: SVGI('<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5M11 8.5v5M8.5 11h5"/>','stroke-width="2.2"'),
  edit: SVGI('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
  chat: SVGI('<path d="M4 5h16v11H9l-5 4z"/>'),
  card: SVGI('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>'),
  out: SVGI('<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>'),
  basket: SVGI('<path d="M3.5 9h17l-1.6 9.2a2 2 0 0 1-2 1.8H7.1a2 2 0 0 1-2-1.8z"/><path d="M8 9l3-5M16 9l-3-5M9.5 13v3M14.5 13v3"/>','stroke-width="2"'),
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="#EBCB7E" stroke="#1D1D1B" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  search: SVGI('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>','stroke-width="2"'),
  crown: '<svg class="crown" viewBox="0 0 26 20" fill="#EBCB7E" stroke="#1D1D1B" stroke-width="1.6" stroke-linejoin="round"><path d="M2 17 4 5l5.5 6L13 2l3.5 9L22 5l2 12z"/></svg>',
};

/* ============ تصویرسازی‌ها ============ */
const SV = inner => `<svg viewBox="0 0 160 120" fill="none" stroke="#1D1D1B" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${inner}</svg>`;
const SHADOW = (cx=80,cy=106,rx=60) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="8" fill="url(#dots)" stroke="none"/>`;
const SPARK = (x,y,d=0) => `<path class="art-spark" style="animation-delay:${d}s" d="M${x} ${y-6}v12M${x-6} ${y}h12"/>`;
const PU='#B7A8EA';
const ART = {
  books: SV(`${SHADOW()}
    <rect x="22" y="82" width="116" height="20" rx="4" fill="${PU}"/><path d="M124 85h10v14h-10" fill="#fff"/><path d="M126 89.5h6M126 94h6" stroke-width="1.1"/>
    <rect x="30" y="62" width="98" height="20" rx="4" fill="#B8CD9E"/><path d="M44 65H34v14h10" fill="#fff"/><path d="M36 69.5h6M36 74h6" stroke-width="1.1"/>
    <g transform="rotate(-5 80 52)"><rect x="40" y="43" width="80" height="19" rx="4" fill="#E2A48F"/><path d="M104 43v19"/><path d="M110 43v26l-4-4-4 4V43" fill="#EBCB7E"/></g>
    <g transform="rotate(-38 120 26)"><rect x="96" y="21" width="44" height="10" rx="1.5" fill="#EBCB7E"/><path d="M140 21l11 5-11 5z" fill="#F7F5F1"/><path d="M148.5 24.8 151 26l-2.5 1.2z" fill="#1D1D1B"/><rect x="90" y="21" width="7" height="10" rx="2" fill="#E2A48F"/></g>
    ${SPARK(28,36)}${SPARK(144,64,.8)}`),
  clock: SV(`${SHADOW()}<path d="M52 92l-8 10M108 92l8 10"/>
    <circle cx="57" cy="30" r="10" fill="#E2A48F"/><circle cx="103" cy="30" r="10" fill="#E2A48F"/>
    <circle cx="80" cy="60" r="36" fill="#fff"/><circle cx="80" cy="60" r="29" fill="#F7F5F1" stroke-width="1.2"/>
    <path d="M80 35v4M80 81v4M55 60h4M101 60h4" stroke-width="1.4"/><path d="M80 60V44M80 60l12 7" stroke-width="2.4"/><circle cx="80" cy="60" r="3" fill="#1D1D1B"/>
    ${SPARK(132,30)}${SPARK(26,58,1)}`),
  target: SV(`${SHADOW()}<circle cx="74" cy="62" r="38" fill="#B8CD9E"/><circle cx="74" cy="62" r="26" fill="#fff"/><circle cx="74" cy="62" r="13" fill="#E2A48F"/><circle cx="74" cy="62" r="3" fill="#1D1D1B"/>
    <path d="M76 60 132 18" stroke-width="2.2"/><path d="M126 14l10-2-2 10M132 22l8 0M126 16l0-8" fill="${PU}"/>${SPARK(134,62)}${SPARK(24,30,.9)}`),
  bubble: SV(`${SHADOW(78)}<path d="M30 26h78a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12H62l-18 16 4-16H30a12 12 0 0 1-12-12V38a12 12 0 0 1 12-12z" fill="${PU}"/>
    <text x="69" y="69" font-size="38" font-weight="800" text-anchor="middle" fill="#1D1D1B" stroke="none" font-family="Yekan Bakh,Tahoma">؟</text>
    <path d="M112 54h26a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9h-4l2 9-12-9h-12a9 9 0 0 1-9-9V63a9 9 0 0 1 9-9z" fill="#E2A48F"/>
    <circle cx="116" cy="69" r="2" fill="#1D1D1B"/><circle cx="125" cy="69" r="2" fill="#1D1D1B"/><circle cx="134" cy="69" r="2" fill="#1D1D1B"/>${SPARK(140,26)}`),
  trophy: SV(`${SHADOW()}<path d="M56 36H42v8a14 14 0 0 0 16 13M104 36h14v8a14 14 0 0 1-16 13" stroke-width="2"/>
    <path d="M56 26h48v24a24 24 0 0 1-48 0z" fill="#B8CD9E"/><path d="M80 36l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#EBCB7E" stroke-width="1.3"/>
    <path d="M76 74h8v12h-8z" fill="#fff"/><rect x="60" y="86" width="40" height="14" rx="3" fill="#E2A48F"/>${SPARK(30,30)}${SPARK(132,24,.7)}${SPARK(136,80,1.4)}`),
  paper: SV(`${SHADOW()}<g transform="rotate(-6 80 60)"><rect x="46" y="16" width="64" height="84" rx="6" fill="#fff"/><path d="M58 34h40M58 46h40M58 58h28" stroke-width="1.4"/></g>
    <circle cx="106" cy="80" r="18" fill="#B8CD9E"/><path d="M98 80l6 6 10-11" stroke-width="2.4"/>${SPARK(30,40)}${SPARK(134,30,.8)}`),
  phone: SV(`${SHADOW()}<rect x="54" y="14" width="52" height="88" rx="10" fill="${PU}"/><rect x="60" y="24" width="40" height="64" rx="4" fill="#fff"/><path d="M74 95h12"/>
    <path d="M70 46h20M70 56h14" stroke-width="1.4"/><circle cx="114" cy="30" r="15" fill="#E2A48F"/><path d="M114 22v9M114 37v.5" stroke-width="2.6"/>${SPARK(32,40)}`),
  key: SV(`${SHADOW()}<circle cx="58" cy="58" r="24" fill="#EBCB7E"/><circle cx="58" cy="58" r="9" fill="#F7F5F1"/>
    <path d="M80 62h52v12h-10v-6h-8v8h-10v-8H80z" fill="#EBCB7E"/>${SPARK(130,34)}${SPARK(28,26,.9)}`),
};

/*__ASSETS__*/

/* ============ داده‌ها (همهٔ عددها فقط از همین‌جا خوانده می‌شوند) ============ */
const DATA = {
  student: { first:'مرتضی', last:'پاشایی', grade:'ششم', province:'تهران', city:'تهران', school:'دبستان فرهنگ' },
  login: { testCode:'12345', unregistered:'09120000000', invite:'AZ1405', resendSeconds:60 },
  exam: { title:'آزمون ۱', free:true, resultAt:'چهارشنبه ۱۳ آبان، ساعت ۱۸:۰۰',
    booklets:[ { title:'استعداد تحلیلی', minutes:20 }, { title:'ریاضی و علوم', minutes:25 } ] },
  otherExams:[
    { title:'آزمون ۲', state:'upcoming', note:'شروع: پنجشنبه ۲۱ آبان، ساعت ۹:۰۰' },
    { title:'آزمون ورودی مهر', state:'missed', note:'مهلت شرکت ۳۰ مهر تموم شد' },
  ],
  // تعداد شرکت‌کننده‌های کشور با هر نمره (بدون خود کاربر)
  national:{20:3,19:27,18:164,17:612,16:1490,15:2780,14:4105,13:5230,12:5910,11:6020,10:5680,9:4870,8:3790,7:2730,6:1820,5:1130,4:640,3:330,2:160,1:70,0:25},
  grades:['پنجم','ششم'], genders:['دختر','پسر'],
  months:['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
  years:[1390,1391,1392,1393,1394,1395,1396,1397,1398],
};
// استان‌ها و شهرها (اولین شهر هر استان، مرکز استان است)
const PROVINCES = {
  'تهران':['تهران','شهریار','اسلامشهر','ورامین','دماوند'],
  'البرز':['کرج','فردیس','نظرآباد','هشتگرد'],
  'اصفهان':['اصفهان','کاشان','نجف‌آباد','خمینی‌شهر','شاهین‌شهر'],
  'فارس':['شیراز','مرودشت','کازرون','جهرم','فسا'],
  'خراسان رضوی':['مشهد','نیشابور','سبزوار','تربت حیدریه','قوچان'],
  'آذربایجان شرقی':['تبریز','مراغه','مرند','میانه','اهر'],
  'آذربایجان غربی':['ارومیه','خوی','مهاباد','میاندوآب','بوکان'],
  'خوزستان':['اهواز','دزفول','آبادان','خرمشهر','بهبهان'],
  'مازندران':['ساری','بابل','آمل','قائم‌شهر','تنکابن'],
  'گیلان':['رشت','بندر انزلی','لاهیجان','لنگرود','آستارا'],
  'کرمان':['کرمان','رفسنجان','سیرجان','بم','جیرفت'],
  'یزد':['یزد','میبد','اردکان','بافق'],
  'قم':['قم'],
  'مرکزی':['اراک','ساوه','خمین','محلات'],
  'همدان':['همدان','ملایر','نهاوند','تویسرکان'],
  'کرمانشاه':['کرمانشاه','اسلام‌آباد غرب','کنگاور','هرسین'],
  'لرستان':['خرم‌آباد','بروجرد','دورود','الیگودرز'],
  'کردستان':['سنندج','سقز','مریوان','بانه'],
  'زنجان':['زنجان','ابهر','خرمدره'],
  'قزوین':['قزوین','تاکستان','آبیک'],
  'سمنان':['سمنان','شاهرود','دامغان','گرمسار'],
  'گلستان':['گرگان','گنبد کاووس','علی‌آباد کتول','بندر ترکمن'],
  'اردبیل':['اردبیل','پارس‌آباد','مشگین‌شهر','خلخال'],
  'هرمزگان':['بندرعباس','قشم','میناب','بندر لنگه'],
  'بوشهر':['بوشهر','برازجان','بندر گناوه','کنگان'],
  'سیستان و بلوچستان':['زاهدان','زابل','چابهار','ایرانشهر'],
  'خراسان شمالی':['بجنورد','شیروان','اسفراین'],
  'خراسان جنوبی':['بیرجند','قائن','فردوس','طبس'],
  'چهارمحال و بختیاری':['شهرکرد','بروجن','فارسان'],
  'کهگیلویه و بویراحمد':['یاسوج','دوگنبدان','دهدشت'],
  'ایلام':['ایلام','دهلران','ایوان','آبدانان'],
};
const CAPS = Object.values(PROVINCES).map(c=>c[0]);
const SCHOOL_NAMES = ['فرهنگ','امام رضا','شهید مطهری','سعدی','فردوسی','پیام','نیکان','علامه طباطبایی','هدف','دانش','شاهد','حافظ','خوارزمی','ابن‌سینا','مهر','پرنیان'];
// فهرست مدرسه‌های هر شهر (نمونه برای پروتوتایپ)
const schoolsOf = city => { let h=0; for(const ch of city) h=(h*31+ch.charCodeAt(0))%9973; const out=[]; for(let i=0;out.length<8;i++){ const n='دبستان '+SCHOOL_NAMES[(h+i*7)%SCHOOL_NAMES.length]; if(!out.includes(n)) out.push(n); } return out; };
const DIFF = { easy:'ساده', medium:'متوسط', hard:'سخت' };
const DIFF_ORDER = { easy:0, medium:1, hard:2 };
const TOPIC = { pattern:'الگو و دنباله', logic:'استدلال و مقایسه', numbers:'کسر، اعشار و درصد', geometry:'شکل‌ها و زاویه‌ها', science:'مواد و انرژی' };

/* ---------- شکل‌های سؤال‌های تصویری ---------- */
const svgUri = s => 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
const TILE = (inner, x=0) => `<g transform="translate(${x} 0)"><rect x="5" y="5" width="90" height="90" rx="16" fill="#F7F5F1" stroke="#1D1D1B" stroke-width="3"/>${inner}</g>`;
const ARROW_IN = rot => `<g transform="rotate(${rot} 50 50)"><path d="M50 20 74 50H60v30H40V50H26z" fill="#947EDC" stroke="#1D1D1B" stroke-width="3" stroke-linejoin="round"/></g>`;
const ARROW = rot => svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${TILE(ARROW_IN(rot))}</svg>`);
const SHAPE = inner => svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${TILE(inner)}</svg>`);
ASSET.arrows = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 100">${TILE(ARROW_IN(0),330)}${TILE(ARROW_IN(90),220)}${TILE(ARROW_IN(180),110)}${TILE('<text x="50" y="68" font-size="52" font-weight="800" text-anchor="middle" fill="#1D1D1B" font-family="Tahoma,sans-serif">?</text>',0)}</svg>`);
const SH_ST = 'stroke="#1D1D1B" stroke-width="3" stroke-linejoin="round"';

const Q = [
  {b:0,d:'medium',t:'pattern', img:'fig', q:'در شکل زیر به جای علامت سؤال چه عددی قرار می‌گیرد؟', o:['۵','۷','۶','۹'], a:2,
   s:'در هر مثلث، جمع دو عدد بیرونی سه برابرِ عددی است که داخل مربع افتاده: ۱۹ + ۵ = ۲۴ = ۳ × ۸ و ۱۷ + ۱۳ = ۳۰ = ۳ × ۱۰ و ۵ + ۷ = ۱۲ = ۳ × ۴. پس ۲ + ۱۶ = ۱۸ = ۳ × ؟ و جواب ۶ است.'},
  {b:0,d:'easy',  t:'logic',   q:'«کتاب» به «کتابخانه» مثل «دارو» به …', o:['پزشک','داروخانه','بیمار','قرص'], a:1, s:'کتابخانه جایی است که کتاب‌ها آنجا نگه‌داری می‌شوند. داروها هم در داروخانه نگه‌داری می‌شوند.'},
  {b:0,d:'easy',  t:'pattern', q:'عدد بعدی این دنباله چیست؟ ۳، ۶، ۱۲، ۲۴، ؟', o:['۳۰','۳۶','۴۲','۴۸'], a:3, s:'هر عدد دو برابرِ عدد قبلی است: ۲۴ × ۲ = ۴۸.'},
  {b:0,d:'easy',  t:'logic',   q:'علی از رضا بلندتر است و رضا از حسن بلندتر است. کوتاه‌ترین کیست؟', o:['علی','رضا','حسن','نمی‌شود فهمید'], a:2, s:'اگر به ترتیب قد بچینیم: علی، رضا، حسن. پس حسن از همه کوتاه‌تر است.'},
  {b:0,d:'easy',  t:'logic',   q:'کدام کلمه با بقیه فرق دارد؟', o:['سیب','موز','هویج','گلابی'], a:2, s:'سیب، موز و گلابی میوه‌اند ولی هویج سبزی است.'},
  {b:0,d:'medium',t:'geometry',q:'ساعت دقیقاً ۳:۰۰ است. زاویهٔ بین دو عقربه چند درجه است؟', o:['۴۵','۶۰','۹۰','۱۲۰'], a:2, s:'صفحهٔ ساعت ۱۲ قسمت دارد و هر قسمت ۳۰ درجه است. از ۱۲ تا ۳ سه قسمت است: ۳ × ۳۰ = ۹۰ درجه.'},
  {b:0,d:'medium',t:'logic',   q:'اگر امروز شنبه باشد، ۱۰ روز بعد چه روزی است؟', o:['دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه'], a:1, s:'هر ۷ روز همان روز تکرار می‌شود. ۱۰ = ۷ + ۳، پس کافی است ۳ روز از شنبه جلو برویم: یکشنبه، دوشنبه، سه‌شنبه.'},
  {b:0,d:'easy',  t:'pattern', img:'arrows', q:'شکل‌ها از راست به چپ به ترتیب آمده‌اند. شکل بعدی کدام است؟', o:['فلش رو به بالا','فلش رو به راست','فلش رو به چپ','فلش رو به پایین'], oi:[ARROW(0),ARROW(90),ARROW(270),ARROW(180)], a:2,
   s:'فلش در هر شکل یک ربع دور (۹۰ درجه) در جهت عقربه‌های ساعت می‌چرخد: بالا، راست، پایین. پس شکل بعدی فلشی است که رو به چپ است.'},
  {b:0,d:'hard',  t:'logic',   q:'سارا در یک صف، نفر پنجم از جلو و نفر هشتم از عقب است. صف چند نفر است؟', o:['۱۱','۱۲','۱۳','۱۴'], a:1, s:'جلوی سارا ۴ نفر و پشت سرش ۷ نفر هستند. با خود سارا: ۴ + ۷ + ۱ = ۱۲ نفر.'},
  {b:0,d:'medium',t:'numbers', q:'قیمت ۵ مداد ۲۰ هزار تومان است. ۸ مداد چند هزار تومان می‌شود؟', o:['۲۸','۳۰','۳۲','۴۰'], a:2, s:'قیمت یک مداد: ۲۰ ÷ ۵ = ۴ هزار تومان. پس ۸ مداد: ۸ × ۴ = ۳۲ هزار تومان.'},
  {b:1,d:'medium',t:'numbers', q:'حاصل ۳/۴ + ۱/۸ چیست؟', o:['۴/۱۲','۵/۸','۷/۸','۱'], a:2, s:'اول مخرج‌ها را یکی می‌کنیم: ۳/۴ = ۶/۸. حالا ۶/۸ + ۱/۸ = ۷/۸.'},
  {b:1,d:'hard',  t:'numbers', q:'بزرگ‌ترین شمارندهٔ مشترک ۱۲ و ۱۸ کدام است؟', o:['۲','۳','۶','۳۶'], a:2, s:'شمارنده‌های ۱۲: ۱، ۲، ۳، ۴، ۶، ۱۲ و شمارنده‌های ۱۸: ۱، ۲، ۳، ۶، ۹، ۱۸. بزرگ‌ترین شمارندهٔ مشترک ۶ است.'},
  {b:1,d:'easy',  t:'geometry',q:'کدام شکل محور تقارن ندارد؟', o:['مربع','مثلث متساوی‌الاضلاع','قلب','متوازی‌الاضلاع'],
   oi:[SHAPE(`<rect x="24" y="24" width="52" height="52" fill="#B8CD9E" ${SH_ST}/>`), SHAPE(`<path d="M50 20 82 76H18z" fill="#EBCB7E" ${SH_ST}/>`), SHAPE(`<path d="M50 80C22 62 16 44 24 32c8-11 22-9 26 3 4-12 18-14 26-3 8 12 2 30-26 48z" fill="#E2A48F" ${SH_ST}/>`), SHAPE(`<path d="M36 28h50L64 72H14z" fill="#947EDC" ${SH_ST}/>`)], a:3,
   s:'مربع، مثلث متساوی‌الاضلاع و قلب را می‌شود با یک خط طوری تا کرد که دو نیمه دقیقاً روی هم بیفتند. متوازی‌الاضلاعی که مستطیل یا لوزی نیست، چنین خطی ندارد.'},
  {b:1,d:'medium',t:'numbers', q:'۲۵ درصدِ عدد ۸۰ چند است؟', o:['۱۵','۲۰','۲۵','۴۰'], a:1, s:'۲۵ درصد یعنی یک‌چهارم. ۸۰ ÷ ۴ = ۲۰.'},
  {b:1,d:'hard',  t:'numbers', q:'حاصل ۰٫۶ × ۰٫۵ چیست؟', o:['۰٫۰۳','۰٫۳','۳','۱٫۱'], a:1, s:'اول بدون ممیز ضرب می‌کنیم: ۶ × ۵ = ۳۰. دو عدد روی هم دو رقم اعشار دارند، پس جواب ۰٫۳۰ یعنی ۰٫۳ است.'},
  {b:1,d:'easy',  t:'science', q:'کدام منبع انرژی تجدیدپذیر است؟', o:['زغال‌سنگ','نفت','خورشید','گاز طبیعی'], a:2, s:'انرژی خورشید تمام نمی‌شود، ولی زغال‌سنگ، نفت و گاز سوخت‌های فسیلی‌اند و یک روز تمام می‌شوند.'},
  {b:1,d:'medium',t:'science', q:'آب خالص در فشار هوای معمولی در چند درجهٔ سانتی‌گراد می‌جوشد؟', o:['۵۰','۸۰','۱۰۰','۱۲۰'], a:2, s:'آب خالص در فشار معمولی هوا در ۱۰۰ درجهٔ سانتی‌گراد می‌جوشد.'},
  {b:1,d:'hard',  t:'science', q:'کدام یک «مخلوط» است؟', o:['آب نمک','آب مقطر','اکسیژن','طلای خالص'], a:0, s:'آب نمک از دو مادهٔ جدا (آب و نمک) درست شده، پس مخلوط است. بقیه هر کدام فقط یک ماده‌اند.'},
  {b:1,d:'medium',t:'science', q:'کدام اندام خون را در بدن به گردش درمی‌آورد؟', o:['ریه','قلب','کبد','کلیه'], a:1, s:'قلب یک ماهیچهٔ قوی است که مثل پمپ، خون را به همهٔ بدن می‌فرستد.'},
  {b:1,d:'hard',  t:'science', q:'آهنربا کدام یک را جذب می‌کند؟', o:['قاشق چوبی','لیوان شیشه‌ای','میخ آهنی','سکهٔ مسی'], a:2, s:'آهنربا فقط بعضی فلزها مثل آهن را جذب می‌کند. چوب، شیشه و مس جذب آهنربا نمی‌شوند.'},
];
const BOOKLETS = [...new Set(Q.map(q=>q.b))];
const QB = b => Q.map((q,i)=>({...q,i})).filter(q=>q.b===b);

const MISSIONS = {
  pattern:{ title:'الگو و دنباله', learn:'برای پیدا کردن عدد بعدی، فاصلهٔ هر عدد با عدد قبلی را بنویس. اگر فاصله‌ها ثابت بود یا خودشان یک الگو داشتند (مثلاً هر بار ۱ تا بیشتر می‌شوند)، عدد بعدی را با همان الگو پیدا کن. گاهی هم هر عدد دو برابر عدد قبلی است.',
    qs:[ {q:'عدد بعدی چیست؟ ۱، ۳، ۶، ۱۰، ؟', o:['۱۲','۱۴','۱۵','۱۶'], a:2, s:'فاصله‌ها ۲، ۳، ۴ هستند و هر بار یکی بیشتر می‌شوند. فاصلهٔ بعدی ۵ است: ۱۰ + ۵ = ۱۵.'},
         {q:'عدد بعدی چیست؟ ۵، ۱۰، ۲۰، ۴۰، ؟', o:['۵۰','۶۰','۸۰','۱۰۰'], a:2, s:'هر عدد دو برابر عدد قبلی است: ۴۰ × ۲ = ۸۰.'} ] },
  logic:{ title:'استدلال و مقایسه', learn:'وقتی چند نفر یا چند چیز را با هم مقایسه می‌کنیم، آن‌ها را روی یک خط مرتب کن. برای روزهای هفته هم یادت باشد هر ۷ روز همان روز تکرار می‌شود؛ پس فقط باقی‌ماندهٔ تقسیم بر ۷ را بشمار.',
    qs:[ {q:'مینا از نگار بزرگ‌تر است و نگار از لیلا بزرگ‌تر است. بزرگ‌ترین کیست؟', o:['مینا','نگار','لیلا','هر سه هم‌سن‌اند'], a:0, s:'اگر به ترتیب سن بچینیم: مینا، نگار، لیلا. پس مینا از همه بزرگ‌تر است.'},
         {q:'اگر امروز دوشنبه باشد، ۸ روز بعد چه روزی است؟', o:['دوشنبه','سه‌شنبه','چهارشنبه','یکشنبه'], a:1, s:'۸ = ۷ + ۱. بعد از ۷ روز دوباره دوشنبه است و یک روز بعدش سه‌شنبه.'} ] },
  numbers:{ title:'کسر، اعشار و درصد', learn:'برای جمع دو کسر، اول مخرج‌ها را یکی کن. برای درصد، عدد را بر ۱۰۰ تقسیم کن و در درصد ضرب کن؛ مثلاً ۲۰٪ از ۵۰ یعنی ۵۰ ÷ ۱۰۰ × ۲۰.',
    qs:[ {q:'حاصل ۱/۲ + ۱/۴ چیست؟', o:['۲/۶','۱/۸','۳/۴','۱'], a:2, s:'۱/۲ همان ۲/۴ است. پس ۲/۴ + ۱/۴ = ۳/۴.'},
         {q:'۲۰ درصدِ عدد ۵۰ چند است؟', o:['۵','۱۰','۲۰','۲۵'], a:1, s:'۵۰ ÷ ۱۰۰ × ۲۰ = ۱۰. یا ساده‌تر: ۱۰٪ از ۵۰ می‌شود ۵ و ۲۰٪ دو برابرش یعنی ۱۰.'} ] },
  geometry:{ title:'شکل‌ها و زاویه‌ها', learn:'صفحهٔ ساعت ۳۶۰ درجه است و ۱۲ قسمت دارد؛ پس فاصلهٔ هر دو عدد ۳۰ درجه است. محیط یعنی جمع اندازهٔ ضلع‌ها و مساحت مستطیل یعنی طول × عرض.',
    qs:[ {q:'ساعت دقیقاً ۶:۰۰ است. زاویهٔ بین دو عقربه چند درجه است؟', o:['۹۰','۱۲۰','۱۵۰','۱۸۰'], a:3, s:'از ۱۲ تا ۶ شش قسمت است و هر قسمت ۳۰ درجه: ۶ × ۳۰ = ۱۸۰ درجه.'},
         {q:'مساحت مستطیلی به طول ۵ و عرض ۴ سانتی‌متر چقدر است؟', o:['۹','۱۸','۲۰','۲۵'], a:2, s:'مساحت مستطیل = طول × عرض = ۵ × ۴ = ۲۰ سانتی‌متر مربع.'} ] },
  science:{ title:'مواد و انرژی', learn:'مخلوط یعنی چند ماده که با هم قاطی شده‌اند ولی هر کدام ویژگی خودش را دارد؛ مثل آب نمک. فلزها معمولاً گرما و برق را خوب از خود عبور می‌دهند.',
    qs:[ {q:'کدام یک رسانای خوب گرما است؟', o:['چوب','مس','پلاستیک','شیشه'], a:1, s:'مس فلز است و فلزها گرما را خوب عبور می‌دهند. چوب، پلاستیک و شیشه نارسانا هستند.'},
         {q:'یخ در چند درجهٔ سانتی‌گراد ذوب می‌شود؟', o:['صفر','۱۰','۵۰','۱۰۰'], a:0, s:'یخ در صفر درجهٔ سانتی‌گراد ذوب می‌شود و به آب تبدیل می‌شود.'} ] },
};

/* ---------- رتبه‌بندی کشوری ---------- */
const NAMES = ['آرین','سارا','نیما','هستی','پارسا','یاسمن','امیرعلی','مهسا','رادین','نازنین','کیان','ترانه','سینا','آوا','بردیا','فاطمه','محمد','زهرا','علی','مریم','حسین','رها','ماهان','النا'];
const INITS = ['ا','ب','ر','ک','م','ن','ح','ص','ج','ف','ط','ق','ش'];
const NAT = DATA.national;
const TOTAL = Object.values(NAT).reduce((a,b)=>a+b,0) + 1;
const aboveOf = s => Object.keys(NAT).filter(k=>+k>s).reduce((a,k)=>a+NAT[k],0);
// در نمرهٔ برابر، کسی که زودتر تحویل داده جلوتر است؛ کاربر حدوداً در یک‌سوم اول هم‌نمره‌ها می‌نشیند
const rankOf = score => aboveOf(score) + Math.max(1, Math.round((NAT[score]||0)*0.3));
const scoreAt = rank => { let c=0; for(const s of Object.keys(NAT).map(Number).sort((a,b)=>b-a)){ c+=NAT[s]; if(rank<=c) return s; } return 0; };
const person = (seed, rank) => ({ name:NAMES[(seed*5+3)%NAMES.length]+' '+INITS[(seed*7+2)%INITS.length]+'.', city:CAPS[(seed*11+4)%CAPS.length], av:(seed*3+1)%8, rank, score:scoreAt(rank) });
// ده نفر اول کشور، با خود کاربر اگر جزوشان باشد
function topList(){
  const r = S.exam.status==='published' ? result() : null;
  const list = Array.from({length:10},(_,i)=>person(i,i+1));
  if(r && r.rank<=10) list.splice(r.rank-1,0,{ me:true, name:'تو', city:me().city, av:S.avatar, score:r.correct });
  return list.slice(0,10).map((x,i)=>({...x, rank:i+1, score:x.me?x.score:scoreAt(i+1)}));
}


/* ============ وضعیت ============ */
const KEY = 'azmoun-demo-v4';
// دادهٔ هر کاربر (با شمارهٔ موبایل) جداست؛ کاربر جدید همیشه از آزمون اول شروع می‌کند
const freshExam = () => ({ status:'available', booklet:0, idx:BOOKLETS.map(()=>0), answers:Array(Q.length).fill(null), flags:Array(Q.length).fill(false), passed:Array(Q.length).fill(false), endsAt:BOOKLETS.map(()=>null) });
const freshUser = () => ({ profile:null, avatar:0, exam:freshExam(), missions:{ done:[] }, basket:[], story:null });
const USER_KEYS = ['profile','avatar','exam','missions','basket','story'];
const fresh = () => ({ loggedIn:false, phone:'', registered:[], accounts:{}, ...freshUser() });
function stashUser(){ if(!S.phone) return; S.accounts[S.phone] = JSON.parse(JSON.stringify(Object.fromEntries(USER_KEYS.map(k=>[k,S[k]])))); }
function loadUser(phone, forceNew){ const u = {...freshUser(), ...((!forceNew && S.accounts[phone]) || {})}; USER_KEYS.forEach(k=>S[k]=JSON.parse(JSON.stringify(u[k]))); }
let S; try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch(e) { S = fresh(); }
if(!S.accounts) S.accounts={};
const save = () => { if(S.loggedIn) stashUser(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} };
const me = () => ({...DATA.student, ...(S.profile||{})});
const avatar = (i=S.avatar) => ASSET.avatars[i % ASSET.avatars.length];

let route = { name: S.loggedIn ? 'home' : 'login', p:{} };
let stack = [], NAV = 'tab';
let L = { mode:'login', phone:'', otp:'', err:'', resendAt:0 };
const freshR = () => ({ step:0, invite:'', first:'', last:'', nid:'', phone:'', birth:null, gender:'', grade:'', province:'', city:'', school:'', errs:{} });
let R = freshR();
let M = { id:null, view:'learn', k:0, wrong:null, right:null };

/* ============ ناوبری و افکت‌ها ============ */
const top0 = () => window.scrollTo({top:0, behavior:'instant'});
function go(name, p={}, push=true){ if(push) stack.push(route); route={name,p}; closeSheet(); NAV = push?'fwd':'tab'; render(); top0(); }
function back(){ route = stack.pop() || {name:S.loggedIn?'home':'login',p:{}}; closeSheet(); NAV='back'; render(); top0(); }
function tab(name){ if(route.name===name && !stack.length) return; stack=[]; go(name,{},false); haptic(); }
function rerender(dir){ NAV=dir; render(); top0(); }
const haptic = (ms=8) => { try { navigator.vibrate && navigator.vibrate(ms); } catch(e) {} };

let toastTimer;
function toast(msg){
  document.querySelectorAll('.toast').forEach(t=>t.remove()); clearTimeout(toastTimer);
  const t=document.createElement('div'); t.className='toast'+($('#layer .overlay:not(.closing)')?' top':''); t.textContent=msg; document.body.appendChild(t);
  toastTimer=setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),260); },2300);
}
function sheet(html){
  $('#layer').innerHTML = `<div class="overlay" onclick="if(event.target===this)closeSheet()"><div class="sheet"><div class="handle-zone"><div class="handle"></div></div>${html}</div></div>`;
  dragSheet($('#layer .sheet'));
}
function closeSheet(){ const o=$('#layer .overlay'); if(!o || o.classList.contains('closing')) return; o.classList.add('closing'); setTimeout(()=>o.remove(),230); }
function dragSheet(el){
  const z=el.querySelector('.handle-zone'); let y0=null, dy=0;
  z.addEventListener('pointerdown', e=>{ y0=e.clientY; dy=0; el.classList.add('dragging'); z.setPointerCapture(e.pointerId); });
  z.addEventListener('pointermove', e=>{ if(y0===null) return; dy=Math.max(0,e.clientY-y0); el.style.transform=`translateY(${dy}px)`; el.parentNode.style.background=`rgba(29,29,27,${.35*Math.max(0,1-dy/300)})`; });
  const end=()=>{ if(y0===null) return; y0=null; el.classList.remove('dragging');
    if(dy>90){ el.style.setProperty('--dy',dy+'px'); el.style.transform=''; closeSheet(); }
    else { el.style.transition='transform .3s var(--ease)'; el.style.transform=''; el.parentNode.style.background=''; setTimeout(()=>el.style.transition='',300); } };
  z.addEventListener('pointerup', end); z.addEventListener('pointercancel', end);
}
function kick(sel, cls){ const el=typeof sel==='string'?$(sel):sel; if(!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
function burst(x, y){
  const colors=['#947EDC','#B8CD9E','#E2A48F','#EBCB7E','#1D1D1B'];
  for(let i=0;i<22;i++){
    const d=document.createElement('i'); d.className='confetti'; d.style.left=x+'px'; d.style.top=y+'px'; d.style.background=colors[i%colors.length]; document.body.appendChild(d);
    const a=Math.random()*Math.PI*2, r=70+Math.random()*90;
    d.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r+60}px) rotate(${Math.random()*540}deg)`,opacity:0}],{duration:900+Math.random()*400,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>d.remove();
  }
}
function countUp(root){
  root.querySelectorAll('[data-count]').forEach(el=>{
    const to=+el.dataset.count, from=+(el.dataset.from||0), suf=el.dataset.suffix||'', f=el.dataset.sep?faN:fa, delay=+(el.dataset.delay||0), dur=+(el.dataset.dur||900);
    el.textContent=f(from)+suf;
    setTimeout(()=>{ const t0=performance.now();
      const step=now=>{ const k=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-k,3); el.textContent=f(Math.round(from+(to-from)*e))+suf; if(k<1) requestAnimationFrame(step); else if(delay) kick(el,'bump'); };
      requestAnimationFrame(step); }, delay);
  });
}
function growBars(root){ root.querySelectorAll('.bar>i,.progress>i,.seg-b>i').forEach(el=>{ const w=el.style.width; el.style.transition='none'; el.style.width='0'; void el.offsetWidth; el.style.transition=''; requestAnimationFrame(()=>el.style.width=w); }); }
function morph(a, b){
  if(a.nodeType!==b.nodeType || a.nodeName!==b.nodeName){ a.replaceWith(b); return; }
  if(a.nodeType===3){ if(a.nodeValue!==b.nodeValue) a.nodeValue=b.nodeValue; return; }
  if(a.nodeType!==1) return;
  for(const at of [...a.attributes]) if(!b.hasAttribute(at.name)) a.removeAttribute(at.name);
  for(const at of [...b.attributes]) if(a.getAttribute(at.name)!==at.value) a.setAttribute(at.name, at.value);
  morphKids(a, b);
}
function morphKids(a, b){ const ac=[...a.childNodes], bc=[...b.childNodes]; bc.forEach((n,i)=>{ if(ac[i]) morph(ac[i], n); else a.appendChild(n); }); for(let i=bc.length;i<ac.length;i++) ac[i].remove(); }

/* ============ محاسبه‌ها ============ */
function result(){
  const a=S.exam.answers; let correct=0; const by={easy:[0,0],medium:[0,0],hard:[0,0]}; const wrong=[];
  Q.forEach((q,i)=>{ by[q.d][1]++; if(a[i]===q.a){correct++;by[q.d][0]++;} else wrong.push(i); });
  return { correct, total:Q.length, by, wrong, rank:rankOf(correct) };
}
function missionList(){
  if(S.exam.status!=='published') return [];
  const topics={}; result().wrong.forEach(i=>{ const q=Q[i]; if(!(q.t in topics) || DIFF_ORDER[q.d]<DIFF_ORDER[topics[q.t]]) topics[q.t]=q.d; });
  return Object.keys(topics).map(t=>({id:t, level:topics[t], ...MISSIONS[t]})).sort((x,y)=>DIFF_ORDER[x.level]-DIFF_ORDER[y.level]);
}
const activeMission = () => missionList().find(m=>!S.missions.done.includes(m.id));
const openBasket = () => S.basket.filter(b=>!b.solved);
const timeLeft = () => { const e=S.exam.endsAt[S.exam.booklet]; return e ? e-Date.now() : DATA.exam.booklets[S.exam.booklet].minutes*60000; };
const passedOf = i => S.exam.passed[i];

/* ============ اجزای مشترک ============ */
const topbar = (title, extra='<span class="sp"></span>', onBack='back()', icon=I.back) => `<div class="topbar sticky"><button class="icon-btn" onclick="${onBack}" aria-label="بازگشت">${icon}</button><div class="title">${title}</div>${extra}</div>`;
const actions = html => `<div class="actions">${html}</div>`;
const empty = (art, title, text) => `<div class="empty"><div class="illus sm">${art}</div><h2>${title}</h2><p class="muted">${text}</p></div>`;
const examMeta = () => `${fa(Q.length)} سؤال · ${fa(DATA.exam.booklets.reduce((s,x)=>s+x.minutes,0))} دقیقه`;
const ring = (v,t,label) => { const C=2*Math.PI*42; return `<div class="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" class="trk"/><circle cx="50" cy="50" r="42" class="val" style="--c:${C.toFixed(1)};--off:${(C*(1-v/t)).toFixed(1)}"/></svg><div class="ring-t"><b>${fa(v)}/${fa(t)}</b><span>${label}</span></div></div>`; };
const testHint = html => `<div class="hint">حالت تست · ${html}</div>`;
function navbar(active){
  const items=[['home','خانه',I.home],['exams','آزمون‌ها',I.exam],['missions','مأموریت‌ها',I.mission],['leaderboard','رتبه‌بندی',I.rank],['profile','پروفایل',I.user]];
  return `<nav class="nav">${items.map(([k,l,ic])=>`<button class="${k===active?'on':''}" onclick="tab('${k}')">${k===active?'<span class="pill"></span>':''}${ic}<span>${l}</span></button>`).join('')}</nav>`;
}
// پراگرس آزمون: فقط وقتی دانش‌آموز با دکمه از سؤال رد می‌شود جلو می‌رود (جواب داده یا نداده)، یک تکه برای هر دفترچه
function xprog(){
  const e=S.exam, n=Q.filter((q,i)=>passedOf(i)).length;
  const segs=BOOKLETS.map(b=>{ const list=QB(b), c=list.filter(x=>passedOf(x.i)).length, p=pct(c,list.length);
    return `<div class="seg-b ${b<e.booklet?'done':''}" style="flex:${list.length}"><i style="width:${p}%"></i>${b===e.booklet?`<span class="knob" style="--p:${p}">${fa(n)}</span>`:''}</div>`; }).join('');
  return `<div class="xtrack" aria-label="${fa(n)} از ${fa(Q.length)} سؤال">${segs}<span class="xend">${fa(Q.length)}</span></div>`;
}
const optIn = (q,j) => q.oi ? `<img class="opt-img" src="${q.oi[j]}" alt="${esc(q.o[j])}">` : q.o[j];
const optsCls = q => q.oi ? 'opts-img' : 'stack';
const qBody = q => `<p class="q-text">${nob(q.q)}</p>${q.img?`<button class="q-img" onclick="zoomImg('${q.img}')"><img src="${ASSET[q.img]}" alt="شکل سؤال"><span class="zoom">${I.zoom}بزرگ‌نمایی</span></button>`:''}`;
function zoomImg(k){ sheet(`<h2>شکل سؤال</h2><div class="card" style="padding:10px"><img src="${ASSET[k]}" alt="شکل سؤال" style="width:100%;display:block"></div><div class="acts"><button class="btn btn-primary" onclick="closeSheet()">بستن</button></div>`); }

/* ============ صفحه‌ها ============ */
const V = {};

/* ---------- ورود ---------- */
V.login = () => `<div class="screen no-nav has-act stack">
    <div class="illus" style="margin:24px 0 4px">${ART.books}</div>
    <div><h1>ورود به آزمون</h1><p class="muted">شماره‌ای رو بزن که مدرسه برات ثبت کرده.</p></div>
    <div class="f"><label class="f-label" for="phone">شمارهٔ موبایل</label>
      <input id="phone" class="field ltr ${L.err?'err':''}" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" value="${fa(L.phone)}" oninput="onPhone(this)" onkeydown="if(event.key==='Enter')submitPhone()">
      ${L.err?`<div class="err-msg">${L.err}</div>`:''}</div>
    ${testHint(`کد پیامک: <b class="ltr">${fa(DATA.login.testCode)}</b> · شمارهٔ ثبت‌نشده: <b class="ltr">${fa(DATA.login.unregistered)}</b>`)}
  </div>${actions(`<button id="phoneBtn" class="btn btn-primary" onclick="submitPhone()" ${L.phone.length===11?'':'disabled'}>دریافت کد</button>
    <button class="btn btn-ghost" onclick="startRegister()">ثبت‌نام با کد دعوت</button>`)}`;
function onPhone(el){ const v=toEn(el.value).replace(/\D/g,'').slice(0,11); L.phone=v; el.value=fa(v); $('#phoneBtn').disabled=v.length!==11; if(L.err){ L.err=''; render(); } }
function submitPhone(){
  const btn=$('#phoneBtn'); if(!btn || btn.classList.contains('loading')) return;
  if(!/^09\d{9}$/.test(L.phone)){ L.err='شماره باید ۱۱ رقم باشه و با ۰۹ شروع بشه.'; render(); kick('#phone','shake'); haptic(30); return; }
  btn.classList.add('loading');
  setTimeout(()=>{ btn.classList.remove('loading');
    if(L.phone===DATA.login.unregistered && !S.registered.includes(L.phone)){ go('unregistered'); return; }
    L.mode='login'; L.otp=''; L.err=''; L.resendAt=Date.now()+DATA.login.resendSeconds*1000; go('otp'); setTimeout(()=>$('#otp')&&$('#otp').focus(),380);
  },650);
}
V.unregistered = () => `<div class="screen no-nav has-act stack">${topbar('')}
    ${empty(ART.phone,'این شماره ثبت نشده',`شمارهٔ <b class="ltr">${fmtPhone(L.phone)}</b> توی فهرست مدرسه نیست.`)}
    <div class="card stack small"><b>چی کار کنم؟</b>
      <p>۱. اگه از مدرسه کد دعوت گرفتی، با همون ثبت‌نام کن.</p>
      <p>۲. اگه کد دعوت نداری، از پدر یا مادرت بخواه به دفتر مدرسه زنگ بزنن.</p></div>
  </div>${actions(`<button class="btn btn-primary" onclick="startRegister()">ثبت‌نام با کد دعوت</button><button class="btn btn-ghost" onclick="back()">وارد کردن شمارهٔ دیگه</button>`)}`;

V.otp = () => `<div class="screen no-nav has-act stack">${topbar('')}
    <div><h1>کد رو وارد کن</h1><p class="muted">کد ۵ رقمی به <b class="ltr">${fmtPhone(L.phone)}</b> پیامک شد.</p></div>
    <button class="btn btn-ghost btn-xs" onclick="back()">${I.edit}اصلاح شماره</button>
    <div class="f"><input id="otp" class="field otp ltr ${L.err?'err':''}" type="tel" inputmode="numeric" autocomplete="one-time-code" maxlength="5" placeholder="•••••" oninput="onOtp(this)" aria-label="کد تأیید">
      ${L.err?`<div class="err-msg">${L.err}</div>`:''}</div>
    <div id="resend"></div>
    ${testHint(`کد پیامک: <b class="ltr">${fa(DATA.login.testCode)}</b>`)}
  </div>${actions(`<button class="btn btn-primary" id="otpBtn" onclick="submitOtp()" disabled>${L.mode==='register'?'تأیید و ورود':'ورود'}</button>`)}`;
function onOtp(el){ const v=toEn(el.value).replace(/\D/g,'').slice(0,5); el.value=fa(v); L.otp=v; if(L.err){ L.err=''; render(); } $('#otpBtn').disabled=v.length!==5; if(v.length===5) submitOtp(); }
function submitOtp(){
  const el=$('#otp'), btn=$('#otpBtn'), v=L.otp||''; if(btn.classList.contains('loading')) return;
  btn.disabled=false; btn.classList.add('loading'); el.blur();
  setTimeout(()=>{
    btn.classList.remove('loading');
    if(v!==DATA.login.testCode){ L.err='کد درست نیست. دوباره بزن یا کد جدید بگیر.'; el.value=''; L.otp=''; render(); $('#otpBtn').disabled=true; kick('#otp','shake'); haptic(30); el.focus(); return; }
    stashUser();
    if(L.mode==='register'){
      loadUser(R.phone, true);
      S.profile={ first:R.first.trim(), last:R.last.trim(), grade:R.grade, province:R.province, city:R.city, school:R.school, gender:R.gender, birth:R.birth, nid:R.nid };
      if(!S.registered.includes(R.phone)) S.registered.push(R.phone);
    } else loadUser(L.phone);
    S.loggedIn=true; S.phone=L.phone; stashUser(); save();
    const wasReg=L.mode==='register'; L={mode:'login',phone:'',otp:'',err:'',resendAt:0}; R=freshR();
    stack=[]; if(wasReg){ W=0; go('welcome',{},false); } else { go('home',{},false); toast(`خوش اومدی ${me().first}!`); }
  },600);
}
function resend(){ L.resendAt=Date.now()+DATA.login.resendSeconds*1000; L.err=''; toast('کد جدید پیامک شد'); tickResend(); }
function tickResend(){ const el=$('#resend'); if(!el) return; const left=L.resendAt-Date.now();
  el.innerHTML = left>0 ? `<button class="btn btn-ghost btn-xs" disabled>ارسال دوبارهٔ کد تا ${mmss(left)}</button>` : `<button class="btn btn-ghost btn-xs" onclick="resend()">ارسال دوبارهٔ کد</button>`; }

/* ---------- ثبت‌نام ---------- */
function startRegister(){ R=freshR(); go('invite'); setTimeout(()=>$('#invite')&&$('#invite').focus(),380); }
V.invite = () => `<div class="screen no-nav has-act stack">${topbar('ثبت‌نام')}
    <div class="illus sm">${ART.key}</div>
    <div><h1>کد دعوت</h1><p class="muted">کد دعوتی که از مدرسه گرفتی رو وارد کن.</p></div>
    <div class="f"><input id="invite" class="field ltr ${R.errs.invite?'err':''}" style="text-transform:uppercase;text-align:center;letter-spacing:4px" maxlength="10" autocomplete="off" autocapitalize="characters" placeholder="------" value="${esc(R.invite)}" oninput="onInvite(this)" onkeydown="if(event.key==='Enter')submitInvite()" aria-label="کد دعوت">
      ${R.errs.invite?`<div class="err-msg">${R.errs.invite}</div>`:''}</div>
    ${testHint(`کد دعوت: <b class="ltr">${DATA.login.invite}</b>`)}
  </div>${actions(`<button class="btn btn-primary" id="invBtn" onclick="submitInvite()" ${R.invite.trim()?'':'disabled'}>ادامه</button>`)}`;
function onInvite(el){ R.invite=toEn(el.value).toUpperCase().replace(/\s/g,''); $('#invBtn').disabled=!R.invite; if(R.errs.invite){ delete R.errs.invite; render(); } }
function submitInvite(){
  const btn=$('#invBtn'); if(!btn || btn.disabled || btn.classList.contains('loading')) return; btn.classList.add('loading');
  setTimeout(()=>{ btn.classList.remove('loading');
    if(R.invite!==DATA.login.invite){ R.errs.invite='این کد دعوت معتبر نیست. دوباره نگاهش کن.'; render(); kick('#invite','shake'); haptic(30); return; }
    go('register');
  },650);
}
const fld = (key, label, inner) => `<div class="f ${R.errs[key]?'has-err':''}" id="f-${key}"><label class="f-label">${label}</label>${inner}${R.errs[key]?`<div class="err-msg">${R.errs[key]}</div>`:''}</div>`;
const fmtDate = b => `${fa(b.d)} ${DATA.months[b.m-1]} ${fa(b.y)}`;
const REG_STEPS = [
  { title:'اسمت چیه؟', sub:'همون‌طور که توی شناسنامه‌ت نوشته شده.', keys:['first','last','nid'] },
  { title:'یه کم از خودت بگو', sub:'برای ساختن کارنامه‌ت لازمه.', keys:['birth','gender'] },
  { title:'کجا درس می‌خونی؟', sub:'کلاس و مدرسه‌ت رو انتخاب کن.', keys:['grade','province','city','school'] },
  { title:'شمارهٔ موبایلت چنده؟', sub:'کد تأیید به این شماره پیامک می‌شه.', keys:['phone'] },
];
const enterNext = `onkeydown="if(event.key==='Enter')regNext()"`;
const FIELDS = {
  first: () => fld('first','نام',`<input class="field txt ${R.errs.first?'err':''}" value="${esc(R.first)}" autocomplete="given-name" ${enterNext} oninput="R.first=this.value;clr('first')">`),
  last:  () => fld('last','نام خانوادگی',`<input class="field txt ${R.errs.last?'err':''}" value="${esc(R.last)}" autocomplete="family-name" ${enterNext} oninput="R.last=this.value;clr('last')">`),
  nid:   () => fld('nid','کد ملی',`<input class="field ltr ${R.errs.nid?'err':''}" type="tel" inputmode="numeric" maxlength="10" placeholder="۰۰۱۲۳۴۵۶۷۹" value="${fa(R.nid)}" ${enterNext} oninput="onDigits(this,'nid',10)">`),
  phone: () => fld('phone','شمارهٔ موبایل',`<input class="field ltr ${R.errs.phone?'err':''}" type="tel" inputmode="numeric" maxlength="11" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" value="${fa(R.phone)}" ${enterNext} oninput="onDigits(this,'phone',11)">`),
  birth: () => fld('birth','تاریخ تولد',`<button class="field field-btn ${R.errs.birth?'err':''}" onclick="openDate()">${R.birth?`<span>${fmtDate(R.birth)}</span>`:'<span class="muted">انتخاب کن</span>'}${I.down}</button>`),
  gender:() => fld('gender','جنسیت',`<div class="seg">${DATA.genders.map(g=>`<button class="${R.gender===g?'on':''}" onclick="setR('gender','${g}')">${g}</button>`).join('')}</div>`),
  grade: () => fld('grade','کلاس',`<div class="seg">${DATA.grades.map(g=>`<button class="${R.grade===g?'on':''}" onclick="setR('grade','${g}')">${g}</button>`).join('')}</div>`),
  province:() => pickField('province','استان','انتخاب کن'),
  city:  () => pickField('city','شهر', R.province?'انتخاب کن':'اول استان رو انتخاب کن', !R.province),
  school:() => pickField('school','مدرسه', R.city?'انتخاب کن':'اول شهر رو انتخاب کن', !R.city),
};
V.register = () => { const st=REG_STEPS[R.step], last=R.step===REG_STEPS.length-1;
  return `<div class="screen no-nav has-act">
    <div class="sticky"><div class="topbar"><button class="icon-btn" onclick="regBack()" aria-label="بازگشت">${I.back}</button><div class="title">ثبت‌نام</div><span class="sp"></span></div>
      <div class="steps" aria-label="مرحلهٔ ${fa(R.step+1)} از ${fa(REG_STEPS.length)}">${REG_STEPS.map((_,i)=>`<i class="${i<R.step?'done':i===R.step?'cur':''}"></i>`).join('')}</div></div>
    <div class="qwrap">
      <p class="small muted" style="margin-top:14px">مرحلهٔ ${fa(R.step+1)} از ${fa(REG_STEPS.length)}</p>
      <h1>${st.title}</h1><p class="muted" style="margin-bottom:20px">${st.sub}</p>
      ${st.keys.map(k=>FIELDS[k]()).join('')}
      ${R.step===0?`<div style="margin-top:18px">${testHint(`یه کد ملی معتبر: <b class="ltr">${fa('0012345679')}</b>`)}</div>`:''}
    </div>
  </div>${actions(`<button class="btn btn-primary" id="regBtn" onclick="regNext()">${last?'ارسال کد تأیید':'ادامه'}</button>`)}`; };
const pickField = (key, label, ph, off) => fld(key,label,`<button class="field field-btn ${R.errs[key]?'err':''}" onclick="openPick('${key}')" ${off?'disabled':''}>${R[key]?`<span>${esc(R[key])}</span>`:`<span class="muted">${ph}</span>`}${I.down}</button>`);
const PICK = { province:{ title:'استان', list:()=>Object.keys(PROVINCES) }, city:{ title:'شهر', list:()=>PROVINCES[R.province]||[] }, school:{ title:'مدرسه', list:()=>schoolsOf(R.city) } };
function openPick(key){
  const p=PICK[key], items=p.list();
  sheet(`<h2>${p.title}</h2>${key==='school'?`<p class="muted small">مدرسه‌های ${esc(R.city)}</p>`:''}
    ${items.length>6?`<div class="pick-search">${I.search}<input id="pq" class="field txt" placeholder="جستجوی ${p.title}" autocomplete="off" oninput="filterPick(this.value)"></div>`:''}
    <div class="pick-list" id="pl">${items.map(x=>`<button class="pick-it ${R[key]===x?'on':''}" data-v="${esc(x)}" onclick="setPick('${key}',this.dataset.v)"><span>${esc(x)}</span>${R[key]===x?I.check:''}</button>`).join('')}<p class="muted small center" id="pnone" hidden>چیزی پیدا نشد.</p></div>`);
}
function filterPick(v){ const t=v.trim(); let n=0; document.querySelectorAll('#pl .pick-it').forEach(b=>{ const ok=!t||b.dataset.v.includes(t); b.hidden=!ok; if(ok) n++; }); $('#pnone').hidden=n>0; }
function setPick(key,v){ if(R[key]!==v){ R[key]=v; if(key==='province'){ R.city=PROVINCES[v].length===1?PROVINCES[v][0]:''; R.school=''; } if(key==='city') R.school=''; } delete R.errs[key]; closeSheet(); render(); haptic(); }
function clr(k){ if(R.errs[k]){ delete R.errs[k]; render(); } }
function setR(k,v){ R[k]=v; delete R.errs[k]; render(); haptic(); }
function onDigits(el,k,n){ const v=toEn(el.value).replace(/\D/g,'').slice(0,n); R[k]=v; el.value=fa(v); clr(k); }
function validNid(c){ if(!/^\d{10}$/.test(c) || /^(\d)\1{9}$/.test(c)) return false; const d=c.split('').map(Number); const s=d.slice(0,9).reduce((a,x,i)=>a+x*(10-i),0)%11; return d[9]===(s<2?s:11-s); }
function checkR(k){ switch(k){
  case 'first': return R.first.trim()?'':'نامت رو بنویس.';
  case 'last': return R.last.trim()?'':'نام خانوادگیت رو بنویس.';
  case 'nid': return !/^\d{10}$/.test(R.nid)?'کد ملی باید ۱۰ رقم باشه.':!validNid(R.nid)?'این کد ملی درست نیست. دوباره نگاهش کن.':'';
  case 'phone': return /^09\d{9}$/.test(R.phone)?'':'شماره باید ۱۱ رقم باشه و با ۰۹ شروع بشه.';
  case 'birth': return R.birth?'':'تاریخ تولدت رو انتخاب کن.';
  case 'gender': return R.gender?'':'یکی رو انتخاب کن.';
  case 'grade': return R.grade?'':'کلاست رو انتخاب کن.';
  case 'province': return R.province?'':'استانت رو انتخاب کن.';
  case 'city': return R.city?'':'شهرت رو انتخاب کن.';
  case 'school': return R.school?'':'مدرسه‌ت رو انتخاب کن.';
} return ''; }
const focusFirst = () => setTimeout(()=>{ const i=$('.screen .qwrap input'); if(i) i.focus(); },420);
function regNext(){
  const btn=$('#regBtn'); if(!btn || btn.classList.contains('loading')) return;
  const e={}; REG_STEPS[R.step].keys.forEach(k=>{ const m=checkR(k); if(m) e[k]=m; }); R.errs=e; const ks=Object.keys(e);
  if(ks.length){ render(); const el=$('#f-'+ks[0]); el.scrollIntoView({block:'center',behavior:'smooth'}); kick(el,'shake'); haptic(30); return; }
  if(R.step<REG_STEPS.length-1){ R.step++; rerender('fwd'); focusFirst(); haptic(); return; }
  btn.classList.add('loading');
  setTimeout(()=>{ btn.classList.remove('loading'); L={mode:'register',phone:R.phone,otp:'',err:'',resendAt:Date.now()+DATA.login.resendSeconds*1000}; go('otp'); setTimeout(()=>$('#otp')&&$('#otp').focus(),380); },700);
}
function regBack(){ if(R.step>0){ R.step--; R.errs={}; rerender('back'); } else back(); }

/* ---------- معرفی اپ بعد از ثبت‌نام ---------- */
let W = 0;
const WELCOME = [
  { art:'books',  title:'آزمون بده، هر جا که هستی', text:'آزمون‌های مدرسه رو همین‌جا بده. هر دفترچه تایمر داره و سؤال‌های سخت رو می‌تونی علامت بزنی تا بعداً بهشون برگردی.' },
  { art:'trophy', title:'کارنامه و رتبه‌ت رو ببین', text:'بعد از اعلام نتیجه، نمره‌ت رو می‌بینی و رتبه‌ت بین همهٔ بچه‌های پایهٔ خودت توی کل کشور.' },
  { art:'target', title:'از اشتباه‌هات یاد بگیر', text:'سؤال‌هایی رو که اشتباه زدی با توضیح مرور می‌کنی. هر کدوم رو نفهمیدی، می‌ندازیش توی سبد تا از معلمت بپرسی.' },
];
V.welcome = () => { const s=WELCOME[W], last=W===WELCOME.length-1;
  return `<div class="screen no-nav has-act center" id="wel">
    <div class="row between" style="min-height:44px">${W===0?`<span class="badge ok">ثبت‌نامت کامل شد</span>`:'<span></span>'}${last?'<span></span>':'<button class="btn btn-ghost btn-xs" onclick="endWelcome()">رد شدن</button>'}</div>
    <div class="qwrap">
      <div class="illus wel-art">${ART[s.art]}</div>
      <h1>${s.title}</h1><p class="muted wel-text">${nob(s.text)}</p>
    </div>
  </div>${actions(`<div class="dots">${WELCOME.map((_,i)=>`<button class="${i===W?'on':''}" onclick="wGo(${i})" aria-label="مرحلهٔ ${fa(i+1)}"></button>`).join('')}</div>
    <button class="btn btn-primary" onclick="wNext()">${last?`بزن بریم، ${esc(me().first)}!`:'بعدی'}</button>`)}`; };
function wGo(i){ if(i===W||i<0||i>=WELCOME.length) return; const d=i-W; W=i; render(); kick('.qwrap', d>0?'q-next':'q-prev'); haptic(); }
function wNext(){ if(W<WELCOME.length-1) wGo(W+1); else endWelcome(); }
function endWelcome(){ stack=[]; go('home',{},false); toast(`خوش اومدی ${me().first}!`); }
function bindSwipe(){ const el=$('#wel'); if(!el || el._sw) return; el._sw=true; let x0=null;
  el.addEventListener('pointerdown',e=>{ x0=e.clientX; });
  el.addEventListener('pointerup',e=>{ if(x0===null) return; const dx=e.clientX-x0; x0=null; if(Math.abs(dx)>50) wGo(W+(dx>0?1:-1)); }); }   // در راست‌به‌چپ، کشیدن به راست = بعدی

/* ---------- انتخاب تاریخ با چرخ ---------- */
let DP;
const dim = (y,m) => m<=6 ? 31 : m<=11 ? 30 : ([1391,1395,1399,1403].includes(y) ? 30 : 29);
const range = n => Array.from({length:n},(_,i)=>i+1);
function openDate(){
  DP = R.birth ? {...R.birth} : {y:1394, m:1, d:1};
  sheet(`<h2>تاریخ تولد</h2><p class="muted small">روز، ماه و سال رو بالا و پایین کن.</p>
    <div class="wheel"><div class="wheel-band"></div><div class="wheel-col" id="wd"></div><div class="wheel-col" id="wm"></div><div class="wheel-col" id="wy"></div></div>
    <div class="acts"><button class="btn btn-primary" onclick="setDate()">تأیید</button></div>`);
  fillCol('wd', range(dim(DP.y,DP.m)).map(fa), DP.d-1, i=>{ DP.d=i+1; });
  fillCol('wm', DATA.months, DP.m-1, i=>{ DP.m=i+1; refreshDays(); });
  fillCol('wy', DATA.years.map(fa), DATA.years.indexOf(DP.y), i=>{ DP.y=DATA.years[i]; refreshDays(); });
}
function fillCol(id, items, sel, onPick){
  const c=$('#'+id); c.innerHTML = `<div class="wsp"></div>${items.map((t,i)=>`<div class="wi" data-i="${i}">${t}</div>`).join('')}<div class="wsp"></div>`;
  c.scrollTop = Math.max(0,sel)*44; c._pick=onPick; markCol(c);
  if(!c._bound){ c._bound=true; let tm;
    c.addEventListener('scroll',()=>{ const i=markCol(c); clearTimeout(tm); tm=setTimeout(()=>{ c._pick(i); },110); if(i!==c._last){ c._last=i; haptic(4); } });
    c.addEventListener('click',e=>{ const w=e.target.closest('.wi'); if(w) c.scrollTo({top:+w.dataset.i*44,behavior:'smooth'}); }); }
}
function markCol(c){ const pos=c.scrollTop/44, items=c.querySelectorAll('.wi'), i=Math.min(items.length-1,Math.max(0,Math.round(pos)));
  items.forEach((e,j)=>{ const dd=Math.abs(j-pos); e.style.opacity=Math.max(.25,1-dd*.28).toFixed(2); e.classList.toggle('on',j===i); }); return i; }
function refreshDays(){ const n=dim(DP.y,DP.m), c=$('#wd'); if(c && c.querySelectorAll('.wi').length!==n){ DP.d=Math.min(DP.d,n); fillCol('wd', range(n).map(fa), DP.d-1, i=>{ DP.d=i+1; }); } }
function setDate(){ DP.d=markCol($('#wd'))+1; DP.m=markCol($('#wm'))+1; DP.y=DATA.years[markCol($('#wy'))]; DP.d=Math.min(DP.d,dim(DP.y,DP.m));
  R.birth={...DP}; delete R.errs.birth; closeSheet(); render(); haptic(); }

/* ---------- خانه ---------- */
const basketBtn = (onclick="go('basket')") => { const n=openBasket().length; return `<button id="basketBtn" class="icon-btn basket-btn" onclick="${onclick}" aria-label="سبد از معلم می‌پرسم${n?'، '+fa(n)+' سؤال':''}">${I.basket}${n?`<span class="cnt">${fa(n)}</span>`:''}</button>`; };
const medal = (rank, me) => `<span class="medal ${me?'me':rank<=3?'m'+rank:''}">${faN(rank)}</span>`;
function examCard(){
  const st=S.exam.status;
  if(st==='available') return `<div class="card center stack" style="padding:20px 18px">
      <div class="illus">${ART.books}</div>
      <div><span class="badge">${DATA.exam.title}</span> ${DATA.exam.free?'<span class="badge ok">رایگان</span>':''}</div>
      <h1>اولین آزمونت آماده‌ست</h1><p class="muted">${nob(examMeta()+' · هر وقت آماده بودی شروع کن.')}</p>
      <button class="btn btn-primary" onclick="go('rules')">شروع آزمون</button></div>`;
  if(st==='inProgress') return `<div class="card center stack" style="padding:20px 18px">
      <div class="illus">${ART.clock}</div><div><span class="badge">${DATA.exam.title}</span></div><h1>آزمونت نیمه‌کاره‌ست</h1>
      <p class="muted">دفترچهٔ ${fa(S.exam.booklet+1)} · ${mmss(timeLeft())} وقت مونده</p>
      <button class="btn btn-primary" onclick="go('exam')">ادامهٔ آزمون</button></div>`;
  if(st==='submitted') return `<div class="card center stack" style="padding:20px 18px">
      <div class="illus">${ART.clock}</div><div><span class="badge ok">${DATA.exam.title} تحویل داده شد</span></div><h1>منتظر نتیجه</h1>
      <p class="muted">نتیجه ${DATA.exam.resultAt} اعلام می‌شه.</p>
      <button class="btn btn-ghost btn-sm" onclick="publish()" style="color:#8A3E26">حالت تست: اعلام نتیجه</button></div>`;
  const ss=storyState();
  if(ss==='new') return `<div class="card center stack res-new" style="padding:20px 18px">
      <div class="illus">${ART.trophy}</div><div><span class="badge pri">نتیجهٔ ${DATA.exam.title} اومد</span></div>
      <h1>نتیجه‌ت آماده‌ست!</h1><p class="muted">${nob('ببین چطور شدی و بعدش اشتباه‌هات رو با هم مرور کنیم.')}</p>
      <button class="btn btn-primary pulse" onclick="startStory()">دیدن نتیجهٔ آزمون</button></div>`;
  if(ss==='progress'){ const st2=S.story, w=result().wrong.length, inRev=STEPS()[st2.step]==='review';
    return `<div class="card center stack" style="padding:20px 18px">
      <div class="illus">${ART.target}</div><div><span class="badge warn">نیمه‌کاره</span></div>
      <h1>مرور نتیجه‌ت مونده</h1><p class="muted">${inRev?`${fa(st2.k)} از ${fa(w)} سؤال رو مرور کردی. از همون‌جا ادامه بده.`:'از همون‌جایی که بودی ادامه بده.'}</p>
      ${inRev?`<div class="progress" style="margin-top:14px"><i style="width:${pct(st2.k,w)}%"></i></div>`:''}
      <button class="btn btn-primary" onclick="go('story')">ادامه بده</button></div>`; }
  const r=result();
  return `<button class="card tap row between" onclick="go('result')" style="display:flex">
      <div class="grow stack"><span class="cap">نتیجهٔ ${DATA.exam.title}</span>
        <div style="font-size:23px;font-weight:900;line-height:1.3;margin-top:2px">رتبهٔ <span data-count="${r.rank}" data-from="${TOTAL}" data-sep="1">${faN(r.rank)}</span> کشور</div>
        <span class="muted small">دیدن کارنامه و راه‌حل‌ها</span></div>
      ${ring(r.correct,r.total,'درست')}</button>`;
}
V.home = () => {
  const s=me(), pub=S.exam.status==='published', r=pub?result():null, top=topList().slice(0,3), meTop=top.some(x=>x.me);
  const row = x => `<div class="t3-row ${x.me?'me':''}">${medal(x.rank,x.me)}<img class="avatar" src="${avatar(x.av)}" alt=""><span class="grow"><b>${x.me?'تو':x.name}</b><span class="muted small"> · ${x.city}</span></span><span class="small muted">${fa(x.score)} از ${fa(Q.length)}</span></div>`;
  const mine = meTop ? '' : pub
    ? `<div class="t3-row me">${medal(r.rank,true)}<img class="avatar" src="${avatar()}" alt=""><span class="grow"><b>تو</b><span class="muted small"> · ${esc(s.city)}</span></span><span class="small muted">${fa(r.correct)} از ${fa(Q.length)}</span></div>`
    : `<div class="t3-row me"><span class="medal me">؟</span><img class="avatar" src="${avatar()}" alt=""><span class="grow"><b>تو</b><br><span class="muted small">${S.exam.status==='submitted'?'رتبه‌ت بعد از اعلام نتیجه میاد':'بعد از آزمون، رتبه‌ت اینجا میاد'}</span></span></div>`;
  return `<div class="screen stack">
    <div class="row between sticky"><div class="grow"><h1>سلام ${esc(s.first)}</h1><p class="muted small">پایهٔ ${esc(s.grade)} · ${esc(s.school)}</p></div>
      <div class="row" style="gap:10px">${basketBtn()}<button class="av-btn" onclick="tab('profile')" aria-label="پروفایل"><img class="avatar" src="${avatar()}" alt=""></button></div></div>
    ${examCard()}
    <div class="card top3">
      <div class="row between"><b>برترین‌های کشور</b><span class="muted small">${DATA.exam.title} · ${faN(TOTAL)} نفر</span></div>
      <div class="t3-list">${top.map(row).join('')}${mine?'<div class="gap">···</div>'+mine:''}</div>
      <button class="btn btn-ghost" onclick="tab('leaderboard')">دیدن رتبه‌بندی کامل</button>
    </div>
  </div>${navbar('home')}`;
};
function publish(){ S.exam.status='published'; S.story=null; save(); rerender('tab'); toast('نتیجهٔ آزمون ۱ اعلام شد'); }

/* ---------- آزمون‌های من ---------- */
V.exams = () => {
  const st=S.exam.status, r=st==='published'?result():null;
  const chip={available:'<span class="badge ok">قابل شرکت</span>',inProgress:'<span class="badge warn">نیمه‌کاره</span>',submitted:'<span class="badge">در انتظار نتیجه</span>',published:'<span class="badge pri">نتیجه آمده</span>'}[st];
  const sub={available:`${examMeta()}${DATA.exam.free?' · رایگان':''}`,inProgress:`${mmss(timeLeft())} از دفترچهٔ ${fa(S.exam.booklet+1)} مونده`,submitted:`نتیجه: ${DATA.exam.resultAt}`,published:r?(storyState()==='done'?`${fa(r.correct)} از ${fa(Q.length)} درست · رتبهٔ ${faN(r.rank)} کشور`:storyState()==='new'?'دیدن نتیجهٔ آزمون':'مرور نتیجه نیمه‌کاره‌ست'):''}[st];
  const act={available:"go('rules')",inProgress:"go('exam')",submitted:"examWait()",published:storyState()==='done'?"go('result')":storyState()==='new'?'startStory()':"go('story')"}[st];
  return `<div class="screen stack"><h1 class="sticky">آزمون‌های من</h1>
    <button class="list-item" onclick="${act}"><span class="grow"><span class="row between"><b>${DATA.exam.title}</b>${chip}</span><span class="muted small">${sub}</span></span><span class="chev">${I.chev}</span></button>
    ${DATA.otherExams.map((e,i)=>`<button class="list-item" onclick="otherExam(${i})"><span class="grow"><span class="row between"><b>${e.title}</b><span class="badge">${e.state==='upcoming'?'هنوز شروع نشده':'مهلت گذشته'}</span></span><span class="muted small">${e.note}</span></span><span class="chev">${I.chev}</span></button>`).join('')}
  </div>${navbar('exams')}`;
};
function examWait(){ sheet(`<h2>نتیجه هنوز نیومده</h2><p class="muted">نتیجهٔ ${DATA.exam.title} ${DATA.exam.resultAt} اعلام می‌شه.</p><div class="acts"><button class="btn btn-primary" onclick="closeSheet()">باشه</button></div>`); }
function otherExam(i){ const e=DATA.otherExams[i]; sheet(`<h2>${e.title}</h2><p class="muted">${e.state==='upcoming'?e.note+'. اون موقع می‌تونی شرکت کنی.':e.note+' و دیگه نمی‌شه شرکت کرد.'}</p><div class="acts"><button class="btn btn-primary" onclick="closeSheet()">باشه</button></div>`); }

/* ---------- قوانین ---------- */
V.rules = () => { const b=DATA.exam.booklets; return `<div class="screen no-nav has-act stack">${topbar('قبل از شروع')}
  <div><h1>${DATA.exam.title}</h1><p class="muted">${examMeta()} · چهارگزینه‌ای · بدون نمرهٔ منفی</p></div>
  <div class="card stack"><b>آزمون ${fa(b.length)} تا دفترچه داره</b>
    <div class="bk-steps">${b.map((x,i)=>`${i?`<span class="ar">${I.arrowL}</span>`:''}<div class="st"><b>دفترچهٔ ${fa(i+1)}</b><div class="small muted">${x.title}</div><div class="small">${fa(QB(i).length)} سؤال · ${fa(x.minutes)} دقیقه</div></div>`).join('')}</div>
    <p class="small muted">وقتی بری دفترچهٔ بعدی، دیگه به دفترچهٔ قبلی برنمی‌گردی.</p></div>
  <div class="card stack small">
    <div class="row"><span class="mark n" style="background:var(--terra-soft)">${I.flag.replace('<svg','<svg width="14" height="14"')}</span><span>سؤالِ سخت رو با «علامت بزن» نشون کن تا بعداً راحت پیداش کنی.</span></div>
    <div class="row"><span class="mark n" style="background:var(--pri-soft)">${I.clock.replace('<svg','<svg width="14" height="14"')}</span><span>تایمر با بستن اپ متوقف نمی‌شه، ولی جواب‌هات ذخیره می‌مونه.</span></div>
    <div class="row"><span class="mark n" style="background:var(--green-soft)">${I.undo.replace('<svg','<svg width="14" height="14"')}</span><span>برای پاک کردن جواب، دوباره روی همون گزینه بزن.</span></div>
  </div></div>${actions(`<button class="btn btn-primary" onclick="startExam()">شروع دفترچهٔ ۱</button>`)}`; };
function startExam(){ const e=S.exam; e.status='inProgress'; e.booklet=0; e.endsAt[0]=Date.now()+DATA.exam.booklets[0].minutes*60000; save(); stack=[]; go('exam',{},false); }

/* ---------- آزمون ---------- */
V.exam = () => {
  const e=S.exam, b=e.booklet, list=QB(b), k=e.idx[b], q=list[k], gi=q.i, left=timeLeft(), last=k===list.length-1, lastB=b===BOOKLETS.length-1;
  return `<div class="screen no-nav" style="padding-bottom:120px">
    <div class="sticky"><div class="topbar"><button class="icon-btn" onclick="leaveExam()" aria-label="خروج">${I.close}</button>
      <div class="title">دفترچهٔ ${fa(b+1)} از ${fa(BOOKLETS.length)}<div class="small muted" style="font-weight:500">${DATA.exam.booklets[b].title}</div></div>
      <span class="timer ${left<180000?'low':''}" id="timer">${mmss(left)}</span></div>
    ${xprog()}
    <div class="row between x-sub"><span class="muted small">سؤال ${fa(k+1)} از ${fa(list.length)}</span>
      <div class="row" style="gap:8px"><button class="btn btn-ghost btn-xs ${e.flags[gi]?'flag-on':''}" onclick="toggleFlag(${gi})">${I.flag}${e.flags[gi]?'علامت خورده':'علامت بزن'}</button>
      <button class="btn btn-ghost btn-xs" onclick="examGrid()">${I.grid}همهٔ سؤالات</button></div></div></div>
    <div class="qwrap stack">
      ${qBody(q)}
      <div class="${optsCls(q)}">${q.o.map((o,j)=>`<button class="opt ${q.oi?'img':''} ${e.answers[gi]===j?'sel':''}" onclick="pick(${gi},${j})" aria-pressed="${e.answers[gi]===j}"><span class="n">${fa(j+1)}</span>${optIn(q,j)}</button>`).join('')}</div>
    </div>
  </div>
  <div class="exam-foot">
    <button class="btn btn-ghost" onclick="move(-1)" ${k===0?'disabled':''}>قبلی</button>
    ${last?`<button class="btn btn-primary" onclick="${lastB?'finishExam()':'toNextBooklet()'}">${lastB?'پایان آزمون':'دفترچهٔ بعدی'}</button>`
          :`<button class="btn btn-primary" onclick="move(1)">بعدی</button>`}
  </div>`;
};
const passedCount = () => Q.filter((q,i)=>passedOf(i)).length;
function pick(gi,j){ const e=S.exam; e.answers[gi] = e.answers[gi]===j ? null : j; save(); render(); haptic(); }
function toggleFlag(gi){ S.exam.flags[gi]=!S.exam.flags[gi]; save(); render(); haptic(); }
function markPassed(){ const e=S.exam, before=passedCount(); e.passed[QB(e.booklet)[e.idx[e.booklet]].i]=true; return passedCount()!==before; }
function slideQ(d, bumped){ render(); kick('.qwrap', d>0?'q-next':'q-prev'); if(bumped) kick('.knob','bump'); top0(); }
function move(d){ const e=S.exam, b=e.booklet, k=Math.min(Math.max(0,e.idx[b]+d),QB(b).length-1); if(k===e.idx[b]) return; const bm=markPassed(); e.idx[b]=k; save(); slideQ(d,bm); }
function jump(k){ const e=S.exam, d=k-e.idx[e.booklet]; closeSheet(); if(!d) return; const bm=markPassed(); e.idx[e.booklet]=k; save(); slideQ(d,bm); }
function examGrid(){
  const e=S.exam, b=e.booklet, list=QB(b), answered=list.filter(x=>e.answers[x.i]!==null).length;
  sheet(`<div class="row between"><h2>دفترچهٔ ${fa(b+1)}</h2><span class="muted small">${fa(answered)} از ${fa(list.length)} جواب داده</span></div>
  <div class="grid" style="margin:14px 0 16px">${list.map((x,k)=>`<button class="cell ${e.answers[x.i]!==null?'ans':''} ${k===e.idx[b]?'cur':''}" onclick="jump(${k})">${fa(k+1)}${e.flags[x.i]?'<span class="f"></span>':''}</button>`).join('')}</div>
  <div class="legend"><span><i style="background:var(--pri)"></i>جواب داده</span><span><i style="background:var(--card)"></i>بی‌جواب</span><span><i style="background:var(--terra)"></i>علامت‌دار</span></div>`);
}
function leaveExam(){ sheet(`<h2>از آزمون بیرون می‌ری؟</h2><p class="muted">جواب‌هات ذخیره می‌مونه، ولی تایمر متوقف نمی‌شه.</p>
  <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">ادامهٔ آزمون</button><button class="btn btn-ghost" onclick="stack=[];go('home',{},false)">برو به خانه</button></div>`); }
function toNextBooklet(){
  const e=S.exam, un=QB(e.booklet).filter(x=>e.answers[x.i]===null).length;
  sheet(`<h2>بری دفترچهٔ ${fa(e.booklet+2)}؟</h2><p class="muted">${un?`<b style="color:var(--bad)">${fa(un)} سؤال</b> رو جواب ندادی. `:'همهٔ سؤال‌ها رو جواب دادی. '}بعد از رفتن، دیگه به این دفترچه برنمی‌گردی.</p>
  <div class="acts">${un?`<button class="btn btn-primary" onclick="firstUnanswered()">برگردم و جواب بدم</button><button class="btn btn-ghost" onclick="goNextBooklet()">برو دفترچهٔ بعدی</button>`
   :`<button class="btn btn-primary" onclick="goNextBooklet()">برو دفترچهٔ بعدی</button><button class="btn btn-ghost" onclick="closeSheet()">بمونم</button>`}</div>`);
}
function firstUnanswered(){ const e=S.exam,b=e.booklet,list=QB(b),k=list.findIndex(x=>e.answers[x.i]===null); closeSheet(); if(k>=0 && k!==e.idx[b]){ const d=k-e.idx[b]; e.idx[b]=k; save(); slideQ(d); } }
function goNextBooklet(auto){ const e=S.exam; QB(e.booklet).forEach(x=>e.passed[x.i]=true); e.booklet++; e.idx[e.booklet]=0; e.endsAt[e.booklet]=Date.now()+DATA.exam.booklets[e.booklet].minutes*60000; save(); closeSheet(); rerender('fwd'); if(auto) toast(`وقت دفترچهٔ ${fa(e.booklet)} تموم شد؛ رفتی دفترچهٔ بعدی`); }
function finishExam(){
  const e=S.exam, un=QB(e.booklet).filter(x=>e.answers[x.i]===null).length;
  sheet(`<h2>آزمون رو تحویل بدی؟</h2><p class="muted">${un?`<b style="color:var(--bad)">${fa(un)} سؤال</b> از این دفترچه بی‌جواب مونده. `:'همهٔ سؤال‌ها رو جواب دادی. '}بعد از تحویل، دیگه نمی‌شه جواب‌ها رو عوض کرد.</p>
  <div class="acts">${un?`<button class="btn btn-primary" onclick="firstUnanswered()">برگردم و جواب بدم</button><button class="btn btn-ghost" onclick="submitExam()">تحویل بده</button>`
   :`<button class="btn btn-primary" onclick="submitExam()">تحویل بده</button><button class="btn btn-ghost" onclick="closeSheet()">بازم نگاه کنم</button>`}</div>`);
}
function submitExam(auto){ S.exam.passed=S.exam.passed.map(()=>true); S.exam.status='submitted'; save(); closeSheet(); stack=[]; go('done',{auto},false);
  setTimeout(()=>{ const c=$('.success-ic'); if(c){ const r=c.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2); haptic(20); } },420); }
V.done = () => `<div class="screen no-nav has-act center" style="padding-top:60px">
  <div class="success-ic">${I.check}</div><h1>آزمونت تحویل داده شد</h1>
  <p class="muted">${route.p.auto?'وقت تموم شد و جواب‌هات خودکار ثبت شد. ':''}نتیجه ${DATA.exam.resultAt} اعلام می‌شه.</p></div>
  ${actions(`<button class="btn btn-primary" onclick="tab('home')">برگشت به خانه</button>`)}`;

/* ---------- کارنامه ---------- */
V.result = () => {
  if(S.exam.status!=='published') return `<div class="screen no-nav">${topbar('نتیجه')}${empty(ART.clock,'نتیجه هنوز نیومده',`نتیجه ${DATA.exam.resultAt} اعلام می‌شه.`)}</div>`;
  const r=result(), am=activeMission();
  return `<div class="screen no-nav stack">${topbar('کارنامهٔ '+DATA.exam.title)}
    <div class="card row between"><div class="grow"><span class="cap">نمرهٔ تو</span>
      <div class="big" data-count="${pct(r.correct,r.total)}" data-suffix="٪">${fa(pct(r.correct,r.total))}٪</div>
      <span class="muted small">${fa(r.correct)} از ${fa(r.total)} سؤال درست</span></div>${ring(r.correct,r.total,'درست')}</div>
    <button class="list-item" onclick="tab('leaderboard')"><span class="grow"><span class="cap">رتبه در کشور</span><b style="font-size:20px;font-weight:900">${faN(r.rank)} از ${faN(TOTAL)}</b></span><span class="thumb">${ART.trophy}</span></button>
    <span class="cap sec">بر اساس سطح سؤال</span>
    <div class="card">${['easy','medium','hard'].map(d=>{ const [c,t]=r.by[d], miss=t-c, hs=r.correct+miss;
      return `<div class="lv"><div class="row between"><b>${DIFF[d]}</b><span class="num">${fa(c)}/${fa(t)}</span></div><div class="bar"><i style="width:${pct(c,t)}%"></i></div>
        <p class="small ${miss?'':'muted'}" style="margin-top:8px">${miss?`اگه ${fa(miss)} سؤالِ ${DIFF[d]} رو هم درست زده بودی: <b>رتبهٔ ${faN(rankOf(hs))}</b> · ${fa(pct(hs,r.total))}٪`:'همهٔ سؤال‌های این سطح رو درست زدی.'}</p></div>`; }).join('')}
      <div class="note" style="margin-top:12px">${I.info}<span>این رتبه‌ها فرضی‌ان و فقط برای مقایسه‌ن؛ توی رتبه‌بندی ثبت نمی‌شن.</span></div></div>
    ${am?`<button class="list-item" onclick="openMission('${am.id}')"><span class="grow"><span class="cap">مأموریت بعدی</span><b>${am.title}</b><br><span class="muted small">از روی اشتباه‌های همین آزمون</span></span><span class="thumb">${ART.target}</span></button>`:''}
    ${r.wrong.length?`<span class="cap sec">سؤال‌هایی که اشتباه زدی یا جواب ندادی</span>
      ${r.wrong.map(i=>{ const my=S.exam.answers[i]; return `<button class="list-item compact" onclick="showAnswer(${i})"><span class="mark ${my===null?'n':'x'}">${my===null?'–':'✕'}</span><span class="grow"><b class="small">سؤال ${fa(i+1)} · ${DIFF[Q[i].d]}</b><br><span class="muted small">${Q[i].q.length>44?Q[i].q.slice(0,44)+'…':Q[i].q}</span></span><span class="chev">${I.chev}</span></button>`; }).join('')}`:''}
  </div>`;
};
function showAnswer(i){
  const q=Q[i], my=S.exam.answers[i];
  sheet(`<div class="row between"><span class="badge">سؤال ${fa(i+1)} · ${DIFF[q.d]}</span>${my===null?'<span class="badge warn">بی‌جواب</span>':''}</div>
    ${qBody(q)}
    <div class="${optsCls(q)}" style="margin-top:12px">${q.o.map((o,j)=>staticOpt(q,j,my,true)).join('')}</div>
    <div class="card" style="margin-top:16px"><span class="cap">راه‌حل</span><p style="margin-top:4px;line-height:2">${q.s}</p></div>
    <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">فهمیدم</button></div>`);
}
// گزینهٔ فقط‌نمایشی: جواب تو (و اگر showRight، جواب درست)
function staticOpt(q,j,my,showRight){ const right=showRight&&j===q.a, mine=j===my;
  const tag = right?'<span class="tag ok">جواب درست</span>':mine?`<span class="tag ${showRight?'bad':'me'}">جواب تو</span>`:'';
  return `<div class="opt static ${q.oi?'img':''} ${right?'right':mine?(showRight?'wrong':'mine'):''}" style="animation:none"><span class="n">${right?'✓':mine&&showRight?'✕':fa(j+1)}</span>${q.oi?optIn(q,j):`<span class="grow">${q.o[j]}</span>`}${tag}</div>`; }

/* ---------- نتیجهٔ آزمون: قصه و مرور ---------- */
// مرحله‌ها: آمار ← دسته‌ها ← «اگه...» ← دعوت به مرور ← مرور سؤال‌به‌سؤال ← پایان
const STEPS = () => result().wrong.length ? ['stats','cats','whatif','go','review','end'] : ['stats','end'];
const storyState = () => !S.story ? 'new' : S.story.done ? 'done' : 'progress';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function startStory(){ if(!S.story) S.story={ step:0, k:0, phase:'read', pick:null, res:{}, stars:0, done:false }; save(); go('story'); }
function storyNext(){ const st=S.story; st.step=Math.min(st.step+1, STEPS().length-1); st.phase='read'; st.pick=null; if(STEPS()[st.step]==='end') st.done=true; save(); rerender('fwd'); haptic(); }
function storyExit(){ sheet(`<h2>از مرور نتیجه بیرون می‌ری؟</h2><p class="muted">هر جا که هستی نگهش می‌داریم. از خانه می‌تونی ادامه بدی.</p>
  <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">ادامهٔ مرور</button><button class="btn btn-ghost" onclick="stack=[];go('home',{},false)">بیرون می‌رم</button></div>`); }
function wrongByTopic(){ const m={}; result().wrong.forEach(i=>{ const t=Q[i].t; m[t]=(m[t]||0)+1; }); return Object.entries(m).sort((a,b)=>b[1]-a[1]); }

function storyHead(){
  const st=S.story, steps=STEPS(), cur=steps[st.step], w=result().wrong.length;
  const bars=steps.filter(x=>x!=='end').map((x,i)=>{ const fill = i<st.step||cur==='end' ? 100 : i>st.step ? 0 : x==='review' ? pct(st.k+(st.phase==='got'?1:0), w) : 100;
    return `<i class="${x==='review'?'rv':''}"><b class="${i===st.step&&x!=='review'?'now':''}" style="width:${fill}%"></b></i>`; }).join('');
  return `<div class="sticky st-hd"><div class="st-bars">${bars}</div>
    <div class="row between st-top"><span class="stars" id="starCnt">${I.star}<b>${fa(st.stars)}</b></span>
      <div class="row" style="gap:10px">${basketBtn('peekBasket()')}<button class="st-x" onclick="storyExit()" aria-label="خروج از مرور">${I.close}</button></div></div></div>`;
}
function peekBasket(){ const open=openBasket();
  sheet(`<h2>سبد «از معلم می‌پرسم»</h2>${open.length?`<p class="muted small">${fa(open.length)} سؤال توی سبدته. بعد از مرور می‌تونی یکی‌یکی ببینیشون.</p>
    <div class="stack" style="margin-top:12px">${open.map(b=>`<div class="card flat small">${b.qi!=null?Q[b.qi].q:b.q}</div>`).join('')}</div>`
    :'<p class="muted">هنوز چیزی توی سبدت نیست. هر سؤالی رو متوجه نشدی، بندازش اینجا.</p>'}
    <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">ادامهٔ مرور</button></div>`); }

V.story = () => {
  if(S.exam.status!=='published') return V.home();
  if(!S.story) S.story={ step:0, k:0, phase:'read', pick:null, res:{}, stars:0, done:false };
  const st=S.story, cur=STEPS()[st.step], r=result(), w=r.wrong.length;
  const un=r.wrong.filter(i=>S.exam.answers[i]===null).length, bad=w-un;
  let body='', act='';

  if(cur==='stats'){
    const order=Q.map((q,i)=>S.exam.answers[i]===null?'none':S.exam.answers[i]===q.a?'ok':'bad');
    const p=pct(r.correct,r.total), verdict = p>=80?'عالی بود! واقعاً خوب پیش رفتی.':p>=50?'خوب بود؛ ولی می‌تونی بهتر هم بشی.':'شروع خوبیه. بیا ببینیم کجاها جا موند.';
    body=`<div class="st-body center">
      <span class="cap">${DATA.exam.title} · نتیجه</span>
      <h1 class="st-h">از ${fa(r.total)} سؤال، <span class="hl" data-count="${r.correct}" data-delay="300">${fa(r.correct)}</span> تا رو درست زدی</h1>
      <div class="tiles-wrap" aria-hidden="true">${BOOKLETS.map(b=>`<div class="tiles-b"><span class="cap">دفترچهٔ ${fa(b+1)}</span><div class="tiles">${QB(b).map(q=>`<i class="${order[q.i]}" style="--d:${300+q.i*55}ms">${fa(q.i-QB(b)[0].i+1)}</i>`).join('')}</div></div>`).join('')}</div>
      <div class="st-stats">
        <div class="stt ok" style="--d:1.3s"><b data-count="${r.correct}" data-delay="1300">${fa(r.correct)}</b><span>درست</span></div>
        <div class="stt bad" style="--d:1.5s"><b data-count="${bad}" data-delay="1500">${fa(bad)}</b><span>غلط</span></div>
        <div class="stt none" style="--d:1.7s"><b data-count="${un}" data-delay="1700">${fa(un)}</b><span>بی‌جواب</span></div>
      </div>
      <p class="muted st-line" style="--d:2s">${verdict}</p></div>`;
    act=`<button class="btn btn-primary" onclick="storyNext()">${w?'بعدی':'بریم ادامه'}</button>`;
  }

  if(cur==='cats'){
    const cats=wrongByTopic(), max=cats[0][1];
    body=`<div class="st-body">
      <span class="cap">${fa(w)} سؤالی که غلط زدی یا جواب ندادی</span>
      <h1 class="st-h">این‌ها از کجا بودن؟</h1>
      <div class="cats">${cats.map(([t,n],i)=>`<div class="cat-row" style="--d:${250+i*170}ms"><div class="row between"><b>${TOPIC[t]}</b><span class="cat-n">${fa(n)} سؤال</span></div><div class="cbar"><i style="--w:${pct(n,max)}%"></i></div></div>`).join('')}</div>
      <p class="muted st-line" style="--d:${350+cats.length*170}ms">${nob(cats.length>1?`بیشتر از همه توی «${TOPIC[cats[0][0]]}» جا موندی.`:`همه‌شون از «${TOPIC[cats[0][0]]}» بودن.`)}</p></div>`;
    act=`<button class="btn btn-primary" onclick="storyNext()">بعدی</button>`;
  }

  if(cur==='whatif'){
    const one=rankOf(r.correct+1), jump1=r.rank-one, cats=wrongByTopic();
    const steps=[...Array(Math.min(w,4)).keys()].map(n=>n+1).map(n=>({n, rank:rankOf(r.correct+n)}));
    const ahead=pct(TOTAL-r.rank,TOTAL);
    body=`<div class="st-body">
      <span class="cap">فقط برای مقایسه</span>
      <h1 class="st-h">فقط یک جواب درستِ بیشتر، چقدر می‌ارزید؟</h1>
      <div class="card wf">
        <div class="wf-now"><span class="muted small">رتبهٔ الان تو</span><b class="ltr">${faN(r.rank)}</b></div>
        <div class="wf-arrow">${I.arrowL}</div>
        <div class="wf-then"><span class="small">با یک سؤال بیشتر</span><b class="ltr" data-count="${one}" data-from="${r.rank}" data-sep="1" data-delay="500">${faN(r.rank)}</b></div>
      </div>
      <div class="wf-chips"><span class="chip-up" style="--d:1.5s">یعنی ${faN(jump1)} نفر رو جلو می‌زدی</span></div>
      ${steps.length>1?`<span class="cap sec" style="margin-top:22px">هر سؤال، یک پله بالاتر</span>
      <div class="card ladder">${steps.map((x,i)=>`<div class="ld-row" style="--d:${1.7+i*.16}s"><span class="ld-n">+${fa(x.n)}</span><div class="grow"><div class="row between"><b>رتبهٔ ${faN(x.rank)}</b><span class="muted small">${faN(r.rank-x.rank)} نفر جلوتر</span></div><div class="cbar"><i style="--w:${Math.max(6,pct(r.rank-x.rank,r.rank))}%"></i></div></div></div>`).join('')}</div>`:''}
      ${cats.length>1?`<span class="cap sec" style="margin-top:22px">اگه فقط یک دسته رو درست زده بودی</span>
      <div class="card" style="padding:6px 14px">${cats.map(([t,n],i)=>`<div class="wf-row" style="--d:${2.3+i*.12}s"><span class="grow">${TOPIC[t]} <span class="muted small">(${fa(n)} سؤال)</span></span><b>رتبهٔ ${faN(rankOf(r.correct+n))}</b></div>`).join('')}</div>`:''}
      <p class="muted small center st-line" style="--d:2.6s">همین الان هم از ${fa(ahead)}٪ شرکت‌کننده‌ها جلوتری.</p>
      <div class="note" style="margin-top:14px">${I.info}<span>این رتبه‌ها فرضی‌ان و توی رتبه‌بندی کشوری ثبت نمی‌شن.</span></div></div>`;
    act=`<button class="btn btn-primary" onclick="storyNext()">بعدی</button>`;
  }

  if(cur==='go'){
    body=`<div class="st-body center">
      <div class="illus go-art">${ART.target}</div>
      <h1 class="st-h">بیا با هم مرورشون کنیم</h1>
      <p class="muted st-lead">${nob(`${fa(w)} سؤال رو یکی‌یکی با توضیح می‌بینی. اگه فهمیدی، جواب درست رو بزن و ستاره بگیر. اگه نفهمیدی، بندازش توی سبد تا از معلمت بپرسی.`)}</p>
      <div class="go-legend"><span>${I.star}هر جواب درست، یک ستاره</span><span>${I.basket}سؤال‌های نفهمیده، توی سبد</span></div></div>`;
    act=`<button class="btn btn-primary pulse" onclick="storyNext()">شروع مرور</button>`;
  }

  if(cur==='review'){
    const i=r.wrong[st.k], q=Q[i], my=S.exam.answers[i], ph=st.phase, last=st.k===w-1;
    const opts = ph==='read'
      ? q.o.map((o,j)=>staticOpt(q,j,my,false)).join('')
      : q.o.map((o,j)=>{ const ok=ph==='got'&&j===q.a, no=ph==='answer'&&st.pick===j;
          return `<button class="opt ${q.oi?'img':''} ${ok?'right':''} ${no?'wrong':''}" ${ph==='got'?'disabled':''} onclick="reviewPick(${j})"><span class="n">${ok?'✓':no?'✕':fa(j+1)}</span>${optIn(q,j)}</button>`; }).join('');
    body=`<div class="qwrap stack">
      <div class="row between small"><span class="muted">سؤال ${fa(st.k+1)} از ${fa(w)} · ${TOPIC[q.t]}</span>${my===null?'<span class="badge warn">جواب نداده بودی</span>':'<span class="badge">غلط زده بودی</span>'}</div>
      <div class="rv-card card" id="rvCard">${qBody(q)}<div class="${optsCls(q)}" style="margin-top:12px">${opts}</div></div>
      ${ph==='read'?`<div class="card explain"><span class="cap">توضیح</span><p>${q.s}</p></div>`:''}
      ${ph==='answer'?`<p class="ask ${st.pick!==null?'no':''}">${st.pick!==null?'نه، این نبود. یه بار دیگه فکر کن یا توضیح رو دوباره بخون.':'حالا خودت جواب درست رو بزن.'}</p>`:''}
      ${ph==='got'?`<div class="got"><span class="got-star">${I.star}</span><b>آفرین! یک ستاره گرفتی.</b></div>`:''}
    </div>`;
    act = ph==='read' ? `<button class="btn btn-primary" onclick="understood()">${I.check}متوجه شدم</button><button class="btn btn-ghost" onclick="toBasket()">${I.basket}متوجه نشدم؛ بندازش توی سبد</button>`
        : ph==='answer' ? `<div class="row2"><button class="btn btn-ghost" onclick="reread()">دوباره توضیح</button><button class="btn btn-ghost" onclick="toBasket()">${I.basket}بنداز توی سبد</button></div>`
        : `<button class="btn btn-primary" onclick="nextReview()">${last?'تموم شد؛ بریم ببینیم!':'سؤال بعدی'}</button>`;
  }

  if(cur==='end'){
    const got=Object.values(st.res).filter(v=>v==='got').length, inB=Object.values(st.res).filter(v=>v==='basket').length, nb=openBasket().length;
    if(!w) body=`<div class="st-body center"><div class="illus end-art">${ART.trophy}</div><h1 class="st-h">همه رو درست زدی!</h1><p class="muted st-lead">${nob('هیچ سؤالی برای مرور نمونده. ایول، دمت گرم!')}</p></div>`;
    else if(!inB) body=`<div class="st-body center"><div class="illus end-art">${ART.trophy}</div>
      <h1 class="st-h">ایول، دمت گرم!</h1><p class="muted st-lead">${nob(`هر ${fa(got)} سؤال رو یاد گرفتی. دفعهٔ بعد این‌ها دیگه غافلگیرت نمی‌کنن.`)}</p>
      <div class="star-total">${I.star}<b data-count="${st.stars}" data-delay="400">${fa(st.stars)}</b><span>ستاره گرفتی</span></div></div>`;
    else body=`<div class="st-body center"><div class="illus end-art">${ART.bubble}</div>
      <h1 class="st-h">آفرین، مرورت تموم شد!</h1>
      <p class="muted st-lead">${nob(`${fa(got)} سؤال رو یاد گرفتی و ${fa(inB)} سؤال انداختی توی سبد.`)}</p>
      <div class="star-total">${I.star}<b data-count="${st.stars}" data-delay="400">${fa(st.stars)}</b><span>ستاره گرفتی</span></div>
      <div class="card basket-call"><span class="basket-big">${I.basket}<span class="cnt">${fa(nb)}</span></span><div class="grow"><b>${fa(nb)} سؤال توی سبدت هست</b><p class="small muted">می‌خوای ببینیشون؟ می‌تونی سر کلاس از معلمت بپرسی.</p></div></div></div>`;
    act = w&&inB ? `<button class="btn btn-primary" onclick="stack=[{name:'home',p:{}}];route={name:'basket',p:{}};rerender('fwd')">دیدن سبد</button><button class="btn btn-ghost" onclick="tab('home')">بعداً؛ برگشت به خانه</button>`
                 : `<button class="btn btn-primary" onclick="tab('home')">برگشت به خانه</button><button class="btn btn-ghost" onclick="stack=[{name:'home',p:{}}];go('result')">دیدن کارنامه</button>`;
  }
  return `<div class="screen no-nav has-act story story-${cur}">${cur==='end'?'':storyHead()}${body}</div>${actions(act)}`;
};
function storyFx(){
  const cur=STEPS()[S.story?.step];
  if(cur==='stats') setTimeout(()=>{ if(route.name==='story' && STEPS()[S.story.step]==='stats' && pct(result().correct,Q.length)>=50){ const h=$('.st-stats'); if(h){ const b=h.getBoundingClientRect(); burst(b.left+b.width/2,b.top); } } },2000);
  if(cur==='whatif') setTimeout(()=>{ const t=$('.wf-then b'); if(t && route.name==='story'){ const b=t.getBoundingClientRect(); burst(b.left+b.width/2,b.top+b.height/2); haptic(20); } },1450);
  if(cur==='end'){ const go=()=>{ const t=$('.end-art'); if(t && route.name==='story'){ const b=t.getBoundingClientRect(); burst(b.left+b.width/2,b.top+b.height/2); } };
    setTimeout(go,350); setTimeout(go,900); setTimeout(()=>{ if(route.name==='story') burst(innerWidth*.25,140); },1300); setTimeout(()=>{ if(route.name==='story') burst(innerWidth*.75,140); },1500); haptic(30); }
}
function understood(){ S.story.phase='answer'; S.story.pick=null; save(); render(); kick('#rvCard','pulse-in'); haptic(); }
function reread(){ S.story.phase='read'; S.story.pick=null; save(); render(); }
function reviewPick(j){
  const st=S.story, i=result().wrong[st.k], q=Q[i]; if(st.phase!=='answer') return;
  if(j!==q.a){ st.pick=j; save(); render(); haptic(30); return; }
  st.phase='got'; st.pick=null; st.res[i]='got'; save(); render(); haptic(15);
  const opt=document.querySelectorAll('#rvCard .opt')[j]; if(!opt) return;
  const r=opt.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2);
  const star=document.createElement('span'); star.className='fly-star'; star.innerHTML=I.star;
  fly(star, {left:r.left+r.width/2-22, top:r.top+r.height/2-22, width:44, height:44}, $('#starCnt'), {scaleTo:.5, arc:-90, dur:800}).then(()=>{ st.stars++; save(); render(); kick('#starCnt','bump'); haptic(10); });
}
function nextReview(){ const st=S.story; if(st.k>=result().wrong.length-1){ st.k=result().wrong.length; storyNext(); return; } st.k++; st.phase='read'; st.pick=null; save(); render(); kick('.qwrap','q-next'); top0(); }
// انداختن سؤال توی سبد: کارت سؤال کوچک می‌شود و با یک قوس می‌افتد توی دکمهٔ سبد (مثل فرستادن پست در دایرکت)
function toBasket(){
  const st=S.story, i=result().wrong[st.k], card=$('#rvCard'); if(!card || st.busy) return; st.busy=true;
  if(!S.basket.find(b=>b.key==='exam-'+i&&!b.solved)) S.basket.push({ key:'exam-'+i, id:Date.now(), qi:i, mission:`${DATA.exam.title} · سؤال ${fa(i+1)}`, my:S.exam.answers[i], solved:false });
  st.res[i]='basket';
  const r=card.getBoundingClientRect(), clone=card.cloneNode(true); clone.removeAttribute('id'); clone.classList.add('flying');
  card.style.visibility='hidden'; card.closest('.qwrap').classList.add('tossing'); haptic(12);
  const after=()=>{ st.busy=false; save(); render(); kick('#basketBtn','bump'); kick('#basketBtn .cnt','pop-in'); haptic(18); setTimeout(nextReview,420); };
  fly(clone, r, $('#basketBtn'), {scaleTo:.04, arc:-70, dur:760, rot:-14}).then(after);
}
function fly(node, from, toEl, {dur=700, scaleTo=.08, arc=-60, rot=-10}={}){
  return new Promise(res=>{
    if(!toEl || reduced()){ res(); return; }
    const t=toEl.getBoundingClientRect(), dx=t.left+t.width/2-(from.left+from.width/2), dy=t.top+t.height/2-(from.top+from.height/2);
    Object.assign(node.style,{position:'fixed',left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px',margin:'0',zIndex:50,pointerEvents:'none',transformOrigin:'center'});
    document.body.appendChild(node);
    const a=node.animate([
      {transform:'translate(0,0) scale(1) rotate(0)', opacity:1},
      {transform:`translate(0,6px) scale(.94) rotate(0)`, opacity:1, offset:.12},
      {transform:`translate(${dx*.35}px,${dy*.35+arc}px) scale(${(1+scaleTo)/2.4}) rotate(${rot/2}deg)`, opacity:1, offset:.5},
      {transform:`translate(${dx}px,${dy}px) scale(${scaleTo}) rotate(${rot}deg)`, opacity:.5}],
      {duration:dur, easing:'cubic-bezier(.5,0,.3,1)'});
    a.onfinish=()=>{ node.remove(); res(); };
  });
}

/* ---------- رتبه‌بندی کشوری ---------- */
V.leaderboard = () => {
  const st=S.exam.status, pub=st==='published', r=pub?result():null, top=topList();
  const pod=(x,cls)=>`<div class="pod ${cls} ${x.me?'me':''}">${cls==='p1'?I.crown:''}<img class="avatar" src="${avatar(x.av)}" alt=""><div class="nm">${x.me?'تو':x.name}</div><div class="sc">${x.city}</div><div class="blk">${fa(x.rank)}</div></div>`;
  const lrow = x => `<div class="lb-row ${x.me?'me':''}"><span class="rank">${faN(x.rank)}</span><img class="avatar" src="${avatar(x.av)}" alt=""><span class="grow">${x.me?'<b>تو</b>':x.name}<br><span class="muted small">${x.city}</span></span><span class="muted small">${fa(x.score)} از ${fa(Q.length)}</span></div>`;
  const at = rank => rank<=10 ? top[rank-1] : rank===r?.rank ? { me:true, name:'تو', city:me().city, av:S.avatar, rank, score:r.correct } : person(rank, rank);
  const ranks = [...new Set((pub?[4,5,6,7,r.rank-1,r.rank,r.rank+1]:[4,5,6,7,8,9,10]).filter(k=>k>=4&&k<=TOTAL))].sort((a,b)=>a-b);
  let rows='', prev=3; ranks.forEach(k=>{ if(k>prev+1) rows+='<div class="gap">···</div>'; rows+=lrow(at(k)); prev=k; });
  if(prev<TOTAL) rows+=`<div class="gap">···</div><p class="small muted center" style="padding:4px 0 6px">${faN(TOTAL)} شرکت‌کننده از ${fa(Object.keys(PROVINCES).length)} استان</p>`;
  const myCard = pub
    ? `<div class="card row between"><span>جایگاه تو در کشور</span><b><span data-count="${r.rank}" data-from="${TOTAL}" data-sep="1">${faN(r.rank)}</span> از ${faN(TOTAL)}</b></div>`
    : `<div class="card row" style="gap:14px"><img class="avatar" src="${avatar()}" alt="" style="width:46px;height:46px;border:1.6px solid var(--ink)"><div class="grow"><b>تو هنوز رتبه نداری</b><p class="small muted">${st==='submitted'?`رتبه‌ت بعد از اعلام نتیجه (${DATA.exam.resultAt}) اینجا میاد.`:'بعد از شرکت در آزمون و اعلام نتیجه، جایگاهت اینجا میاد.'}</p></div></div>
       ${st==='available'?`<button class="btn btn-primary" onclick="go('rules')">شروع آزمون</button>`:st==='inProgress'?`<button class="btn btn-primary" onclick="go('exam')">ادامهٔ آزمون</button>`:''}`;
  return `<div class="screen stack"><div class="sticky"><h1>رتبه‌بندی کشوری</h1><p class="muted small">${DATA.exam.title} · پایهٔ ${esc(me().grade)} · ${faN(TOTAL)} شرکت‌کننده</p></div>
    <div class="card podium-card"><div class="podium">${pod(top[1],'p2')}${pod(top[0],'p1')}${pod(top[2],'p3')}</div></div>
    ${myCard}
    <div class="card" style="padding:8px 12px">${rows}</div>
    <div class="note">${I.info}<span>رتبه فقط از نمرهٔ آزمون حساب می‌شه و در نمرهٔ برابر، کسی که زودتر تحویل داده جلوتره. مرور سؤال‌ها و سبد، رتبه رو تغییر نمی‌دن.</span></div>
  </div>${navbar('leaderboard')}`;
};

/* ---------- پروفایل ---------- */
V.profile = () => { const s=me(), ph=S.phone||'09121234567'; return `<div class="screen stack"><h1 class="sticky">پروفایل</h1>
    <div class="card pf-head"><div class="pf-av"><img class="avatar" src="${avatar()}" alt="عکس پروفایل"><button class="icon-btn edit" onclick="pickAvatar()" aria-label="تغییر عکس">${I.cam}</button></div>
      <h2 style="margin:0">${esc(s.first)} ${esc(s.last)}</h2>
      <p class="muted small">پایهٔ ${esc(s.grade)} · ${esc(s.school)}</p><p class="muted small">${esc(s.city)}، ${esc(s.province)}</p>
      <p class="muted small ltr">${maskPhone(ph)}</p>
      <button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="pickAvatar()">تغییر عکس پروفایل</button></div>
    <span class="cap sec">حساب کاربری</span>
    <button class="list-item compact" onclick="soon()"><span class="chev">${I.edit}</span><span class="grow"><b>ویرایش اطلاعات</b></span><span class="chev">${I.chev}</span></button>
    <button class="list-item compact" onclick="soon()"><span class="chev">${I.chat}</span><span class="grow"><b>پیام‌ها و پشتیبانی</b></span><span class="chev">${I.chev}</span></button>
    <button class="list-item compact" onclick="soon()"><span class="chev">${I.card}</span><span class="grow"><b>مالی و اطلاعات پرداخت</b></span><span class="chev">${I.chev}</span></button>
    <button class="list-item compact" onclick="logout()"><span class="chev" style="color:var(--bad)">${I.out}</span><span class="grow"><b style="color:var(--bad)">خروج از حساب</b></span></button>
    <div class="row" style="flex-wrap:wrap;gap:10px;margin-top:20px"><button class="btn btn-ghost btn-sm" style="color:#8A3E26" onclick="retakeExam()">حالت تست: دوباره آزمون بده</button><button class="btn btn-ghost btn-sm" style="color:#8A3E26" onclick="resetDemo()">حالت تست: پاک کردن همه‌چیز</button></div>
  </div>${navbar('profile')}`; };
function soon(){ toast('این بخش هنوز ساخته نشده'); }
function pickAvatar(){ sheet(`<h2>عکس پروفایلت رو انتخاب کن</h2><div class="av-grid">${ASSET.avatars.map((a,i)=>`<button class="av-opt ${i===S.avatar?'on':''}" onclick="setAvatar(${i})"><img src="${a}" alt="آواتار ${fa(i+1)}"></button>`).join('')}</div><div class="acts"><button class="btn btn-ghost" onclick="closeSheet()">بستن</button></div>`); }
function setAvatar(i){ S.avatar=i; save(); closeSheet(); render(); kick('.pf-av .avatar','bump'); haptic(); toast('عکس پروفایلت عوض شد'); }
function logout(){ stashUser(); S.loggedIn=false; save(); closeSheet(); stack=[]; route={name:'login',p:{}}; L={mode:'login',phone:'',otp:'',err:'',resendAt:0}; rerender('tab'); }
function retakeExam(){ S.exam=freshExam(); S.missions={done:[]}; S.basket=[]; S.story=null; stashUser(); save(); stack=[]; go('home',{},false); toast('آزمون از اول آماده‌ست'); }
function resetDemo(){ S=fresh(); save(); closeSheet(); stack=[]; route={name:'login',p:{}}; L={mode:'login',phone:'',otp:'',err:'',resendAt:0}; R=freshR(); rerender('tab'); }

/* ---------- مأموریت‌ها ---------- */
V.missions = () => {
  if(S.exam.status!=='published') return `<div class="screen stack"><h1 class="sticky">مأموریت‌ها</h1>${empty(ART.target,'هنوز مأموریتی نداری','بعد از اعلام نتیجهٔ آزمون، از روی اشتباه‌هات مأموریت‌های تمرینی برات ساخته می‌شه.')}</div>${navbar('missions')}`;
  const list=missionList();
  if(!list.length) return `<div class="screen stack"><h1 class="sticky">مأموریت‌ها</h1>${empty(ART.paper,'تمرین جبرانی نداری','همهٔ سؤال‌های آزمون رو درست جواب دادی!')}</div>${navbar('missions')}`;
  const isDone=m=>S.missions.done.includes(m.id), doneN=list.filter(isDone).length, sug=list.findIndex(m=>!isDone(m));
  return `<div class="screen stack"><div class="sticky"><h1>مأموریت‌ها</h1><p class="muted">از روی اشتباه‌های ${DATA.exam.title} ساخته شدن. هر کدوم رو خواستی شروع کن.</p></div>
    <div class="row between small"><span class="muted">مأموریت‌های انجام‌شده</span><b>${fa(doneN)} از ${fa(list.length)}</b></div>
    <div class="progress"><i style="width:${pct(doneN,list.length)}%"></i></div>
    <div class="card tl" style="padding:8px 0">${list.map((m,i)=>{ const d=isDone(m);
      return `<div class="tl-step ${d?'done':'cur'}"><span class="tl-ic">${d?I.check:I.play}</span><div class="grow"><div class="row between" style="gap:8px"><b>${m.title}</b>${!d&&i===sug?'<span class="badge pri">پیشنهاد</span>':''}</div><p class="small muted">سطح ${DIFF[m.level]} · ${fa(m.qs.length)} سؤال${d?' · انجام شد':''}</p>
        <button class="btn ${d?'btn-ghost':'btn-primary'} btn-sm" style="margin-top:10px" onclick="openMission('${m.id}')">${d?'دوباره انجام بده':'شروع مأموریت'}</button></div></div>`; }).join('')}</div>
    ${sug<0?`<div class="card center stack">${ART.paper.replace('<svg','<svg style="width:120px"')}<b>همهٔ مأموریت‌ها تموم شد!</b><p class="muted small">آفرین. مأموریت‌های جدید بعد از آزمون بعدی میان.</p></div>`:''}
    <div class="note">${I.info}<span>مأموریت‌ها رتبه رو تغییر نمی‌دن؛ رتبه فقط از آزمون حساب می‌شه.</span></div>
  </div>${navbar('missions')}`;
};
function openMission(id){ M={id,view:'learn',k:0,wrong:null,right:null,finished:false}; go('mission',{id}); }
const curMission = () => missionList().find(x=>x.id===route.p.id);
const nextMission = () => { const l=missionList(); return l.find(x=>x.id!==route.p.id && !S.missions.done.includes(x.id)); };
const finishActs = () => { const n=nextMission(); return n
  ? `<button class="btn btn-primary" onclick="startNextMission()">شروع مأموریت بعدی: ${n.title}</button><button class="btn btn-ghost" onclick="backToMissions()">برگشت به مأموریت‌ها</button>`
  : `<button class="btn btn-primary" onclick="backToMissions()">برگشت به مأموریت‌ها</button>`; };
V.mission = () => {
  const m=curMission(); if(!m) return V.missions();
  if(M.view==='learn') return `<div class="screen no-nav has-act stack">${topbar(m.title)}
    <div class="illus sm">${ART.books}</div>
    <div><span class="badge pri">آموزش · سطح ${DIFF[m.level]}</span></div>
    <div class="card"><p style="line-height:2.1">${m.learn}</p></div>
    <p class="small muted">بعدش ${fa(m.qs.length)} سؤال سنجش داری. اگه سؤالی برات سخت بود، می‌تونی بذاریش توی سبد تا از معلمت بپرسی.</p>
  </div>${actions(`<button class="btn btn-primary" onclick="M.view='quiz';rerender('fwd')">شروع سؤال‌ها</button>`)}`;
  const q=m.qs[M.k], last=M.k===m.qs.length-1, locked=M.wrong!==null||M.right!==null||M.finished;
  const act = M.finished ? actions(finishActs())
            : M.wrong!==null ? actions(`<button class="btn btn-primary" onclick="retryQ()">دوباره جواب می‌دم</button><div class="row2"><button class="btn btn-ghost" onclick="lessonSheet()">مرور آموزش</button><button class="btn btn-ghost" onclick="askTeacher()">از معلم می‌پرسم</button></div>`)
            : M.right!==null ? actions(`<button class="btn btn-primary" onclick="nextQ()">سؤال بعدی</button>`) : '';
  return `<div class="screen no-nav ${act?'has-act':''} stack">${topbar(m.title)}
    <div class="row between small"><span class="muted">سؤال سنجش ${fa(M.k+1)} از ${fa(m.qs.length)}</span>${M.finished?'<span class="badge ok">مأموریت تموم شد</span>':''}</div>
    <div class="progress"><i style="width:${pct(M.k+(M.right!==null||M.finished?1:0),m.qs.length)}%"></i></div>
    <div class="qwrap stack">${qBody(q)}
      <div class="stack">${q.o.map((o,j)=>`<button class="opt ${M.wrong===j?'wrong':''} ${M.right===j?'right':''}" ${locked?'disabled':''} onclick="answerMission(${j})"><span class="n">${M.right===j?'✓':M.wrong===j?'✕':fa(j+1)}</span>${o}</button>`).join('')}</div>
      ${M.wrong!==null&&!M.finished?`<div class="row small" style="color:var(--bad);font-weight:700"><span class="mark x">✕</span>این جواب درست نبود. می‌خوای چی کار کنی؟</div>`:''}
    </div></div>${act}`;
};
function answerMission(j){
  const m=curMission(), q=m.qs[M.k]; if(M.wrong!==null||M.right!==null||M.finished) return;
  if(j!==q.a){ M.wrong=j; render(); haptic(30); return; }
  M.right=j; if(M.k===m.qs.length-1) completeMission(); render(); haptic(15); setTimeout(rightSheet,380);
}
function completeMission(){ const m=curMission(); if(!S.missions.done.includes(m.id)) S.missions.done.push(m.id); M.finished=true; save(); }
function rightSheet(){
  const m=curMission(), q=m.qs[M.k], last=M.k===m.qs.length-1;
  sheet(`<div class="center"><div class="success-ic sm">${I.check}</div><h2>${last?'آفرین! مأموریت تموم شد':'آفرین! درست جواب دادی'}</h2></div>
    <div class="card" style="margin-top:12px"><span class="cap">راه‌حل</span><p style="margin-top:4px;line-height:2">${q.s}</p></div>
    <div class="acts">${last?finishActs():`<button class="btn btn-primary" onclick="nextQ()">سؤال بعدی</button>`}</div>`);
  setTimeout(()=>{ const c=$('.sheet .success-ic'); if(c){ const r=c.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2); } },300);
}
function finishSheet(added){
  const m=curMission();
  sheet(`<div class="center"><div class="success-ic sm">${I.check}</div><h2>مأموریت «${m.title}» تموم شد</h2><p class="muted small">${added?'سؤال آخر به سبد «از معلم می‌پرسم» اضافه شد. ':''}یادت نره سؤال‌های سبد رو از معلمت بپرسی.</p></div>
    <div class="acts">${finishActs()}</div>`);
  setTimeout(()=>{ const c=$('.sheet .success-ic'); if(c){ const r=c.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2); haptic(25); } },300);
}
function retryQ(){ M.wrong=null; render(); kick('.qwrap','q-prev'); }
function lessonSheet(){ const m=curMission(); sheet(`<span class="badge pri">آموزش</span><h2 style="margin-top:8px">${m.title}</h2><p style="line-height:2.1">${m.learn}</p>
  <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">برگشت به سؤال</button></div>`); }
function askTeacher(){
  const m=curMission(), q=m.qs[M.k], key=m.id+'-'+M.k;
  if(!S.basket.find(b=>b.key===key&&!b.solved)) S.basket.push({key, id:Date.now(), mission:m.title, q:q.q, o:q.o, my:M.wrong, solved:false});
  save(); haptic(12);
  if(M.k===m.qs.length-1){ completeMission(); render(); setTimeout(()=>finishSheet(true),300); } else { toast('به سبد «از معلم می‌پرسم» اضافه شد'); nextQ(); }
}
function nextQ(){ closeSheet(); M.k++; M.wrong=null; M.right=null; render(); kick('.qwrap','q-next'); top0(); }
function startNextMission(){ const n=nextMission(); closeSheet(); if(!n) return backToMissions(); M={id:n.id,view:'learn',k:0,wrong:null,right:null,finished:false}; route={name:'mission',p:{id:n.id}}; rerender('fwd'); }
function backToMissions(){ closeSheet(); stack=[]; go('missions',{},false); }

/* ---------- سبد: از معلم می‌پرسم ---------- */
V.basket = () => { const open=openBasket(), solved=S.basket.length-open.length;
  return `<div class="screen no-nav stack">${topbar('از معلم می‌پرسم')}
    ${open.length?open.map(b=>`<button class="list-item" onclick="go('basketItem',{id:${b.id}})"><span class="grow"><b class="small">${b.qi!=null?Q[b.qi].q:b.q}</b><br><span class="muted small">${b.mission}</span></span><span class="chev">${I.chev}</span></button>`).join('')
      :empty(ART.bubble,'سبدت خالیه','وقتی موقع مرور نتیجه سؤالی رو متوجه نشدی، بندازش توی سبد تا از معلمت بپرسی.')}
    ${solved?`<p class="muted small center">${fa(solved)} سؤال حل‌شده از سبد بیرون رفته.</p>`:''}
  </div>`; };
V.basketItem = () => { const b=S.basket.find(x=>x.id===route.p.id); if(!b) return V.basket(); const q=b.qi!=null?Q[b.qi]:b;
  return `<div class="screen no-nav has-act stack">${topbar('سؤال من')}
    <div><span class="badge">${b.mission}</span></div>
    ${qBody(q)}
    <div class="${optsCls(q)}">${q.o.map((o,j)=>staticOpt(q,j,b.my,false)).join('')}</div>
    <div class="note">${I.info}<span>این سؤال رو سر کلاس یا از همون راهی که با معلمت در ارتباطی بپرس.</span></div>
    <b>اشکالت رفع شد؟</b>
  </div>${actions(`<button class="btn btn-primary" onclick="solve(${b.id})">آره، حل شد</button><div class="row2"><button class="btn btn-ghost" onclick="back();toast('سؤال برای پیگیری توی سبد می‌مونه')">هنوز نه</button><button class="btn btn-ghost btn-danger" onclick="removeItem(${b.id})">حذف از سبد</button></div>`)}`; };
function solve(id){ S.basket.find(x=>x.id===id).solved=true; save(); back(); toast('از فهرست حل‌نشده‌ها بیرون رفت'); burst(innerWidth/2,160); haptic(20); }
function removeItem(id){ S.basket=S.basket.filter(x=>x.id!==id); save(); back(); toast('از سبد حذف شد'); }

/* ============ رندر و تایمر ============ */
function render(){
  const html=(V[route.name]||V.home)(), app=$('#app');
  if(NAV || !app.firstChild){
    app.innerHTML=html;
    const sc=app.querySelector('.screen'), kind=NAV||'tab';
    if(sc){ sc.classList.add('enter-'+kind); if(kind==='tab') [...sc.children].forEach((c,i)=>c.style.setProperty('--i',Math.min(i,8))); }
    growBars(app); countUp(app); NAV=null;
    if(route.name==='story') storyFx();
  } else { const t=document.createElement('div'); t.innerHTML=html; morphKids(app,t); }
  if(route.name==='otp') tickResend();
  if(route.name==='welcome') bindSwipe();
  document.body.classList.toggle('scrolled', scrollY>4);
}
window.addEventListener('scroll',()=>document.body.classList.toggle('scrolled', scrollY>4),{passive:true});
setInterval(()=>{
  if(route.name==='otp') tickResend();
  const e=S.exam; if(e.status!=='inProgress' || !e.endsAt[e.booklet]) return;
  const left=timeLeft();
  if(left<=0){ if(e.booklet<BOOKLETS.length-1) goNextBooklet(true); else submitExam(true); return; }
  const t=$('#timer'); if(t){ t.textContent=mmss(left); t.classList.toggle('low',left<180000); }
},1000);
render();
