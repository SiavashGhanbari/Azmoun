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
  heart: SVGI('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.500 15.4 12 20 12 20z"/>','stroke-width="1.8"'),
  bolt: SVGI('<path d="M13 3 5 13.5h6L10 21l8-10.500h-6z"/>','stroke-width="1.8"'),
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
  // هر دفترچه ۶۰ سؤال؛ دفترچهٔ اول سخت‌تر است و ضریب ۳ دارد. هر جواب غلط یک‌سومِ نمرهٔ یک سؤال را کم می‌کند.
  exam: { title:'آزمون ۱', free:true, resultAt:'چهارشنبه ۱۳ آبان، ساعت ۱۸:۰۰', negative:1/3, others:231,
    booklets:[ { title:'استعداد تحلیلی', minutes:75, coef:3 }, { title:'ریاضی و علوم', minutes:25, coef:1 } ] },
  nextExam:{ title:'آزمون ۲', when:'پنجشنبه ۲۱ آبان، ساعت ۹:۰۰' },
  pastExams:[ { title:'آزمون آزمایشی مهر', date:'۲۴ مهر', taraz:5380, rank:88, total:214, pd:31, pt:44 } ],
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

const HQ = [
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

/* ---------- بانک سؤال: هر دفترچه ۶۰ سؤال ---------- */
// ۲۰ سؤال بالا دست‌نویس‌اند؛ بقیه از الگوهای زیر ساخته می‌شوند. «سؤال مشابه» هر سؤال هم از همان الگو با عددهای دیگر ساخته می‌شود.
const rngOf = seed => { let a=seed>>>0; return () => { a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; };
const ri = (r,a,b) => a+Math.floor(r()*(b-a+1));
const pickOf = (r,arr) => arr[Math.floor(r()*arr.length)];
function mk(r, t, q, right, wrongs, s){
  const num=typeof right==='number'; let ws=[...new Set(wrongs)].filter(x=>x!==right && (!num||x>0));
  for(let k=1; num && ws.length<3; k++){ const c=right+k*2+1; if(!ws.includes(c)) ws.push(c); }
  ws=ws.slice(0,3); const pos=ri(r,0,3), o=ws.slice(); o.splice(pos,0,right);
  return { t, q, o:o.map(x=>num?fa(x):x), a:pos, s };
}
const DAYS=['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
const KIDS=['علی','سارا','رضا','مینا','امیر','نگار','پویا','هدی'];
const THINGS=['دفتر','مداد','پاک‌کن','خودکار','شکلات','بادکنک'];
const ANALOGY=[
  ['«معلم» به «مدرسه» مثل «پزشک» به …','بیمارستان',['دارو','بیمار','آمبولانس'],'معلم در مدرسه کار می‌کند و پزشک در بیمارستان.'],
  ['«ماهی» به «آب» مثل «پرنده» به …','آسمان',['لانه','بال','دانه'],'ماهی در آب حرکت می‌کند و پرنده در آسمان.'],
  ['«چشم» به «دیدن» مثل «گوش» به …','شنیدن',['صدا','سر','بوییدن'],'با چشم می‌بینیم و با گوش می‌شنویم.'],
  ['«نانوا» به «نان» مثل «نجار» به …','میز',['چوب','اره','کارگاه'],'نانوا نان درست می‌کند و نجار میز.'],
  ['«روز» به «خورشید» مثل «شب» به …','ماه',['تاریکی','خواب','ستاره‌شناس'],'در روز خورشید در آسمان است و در شب ماه.'],
  ['«دست» به «دستکش» مثل «پا» به …','جوراب',['کفش‌فروشی','راه رفتن','زانو'],'دستکش را روی دست می‌پوشیم و جوراب را روی پا.'],
  ['«قلم» به «نوشتن» مثل «قیچی» به …','بریدن',['کاغذ','تیز','خیاط'],'با قلم می‌نویسیم و با قیچی می‌بُریم.'],
  ['«درخت» به «جنگل» مثل «ستاره» به …','کهکشان',['شب','نور','تلسکوپ'],'جنگل از تعداد زیادی درخت درست شده و کهکشان از تعداد زیادی ستاره.'],
  ['«بهار» به «تابستان» مثل «پاییز» به …','زمستان',['برف','مهر','سرما'],'بعد از بهار تابستان می‌آید و بعد از پاییز زمستان.'],
  ['«گندم» به «نان» مثل «شیر» به …','پنیر',['گاو','سفید','لیوان'],'نان از گندم درست می‌شود و پنیر از شیر.'],
  ['«راننده» به «اتوبوس» مثل «خلبان» به …','هواپیما',['فرودگاه','آسمان','مسافر'],'راننده اتوبوس را می‌راند و خلبان هواپیما را.'],
  ['«سرد» به «گرم» مثل «تاریک» به …','روشن',['شب','سیاه','چراغ'],'گرم مخالف سرد است و روشن مخالف تاریک.'],
];
const ODD=[
  [['گربه','اسب','کبوتر','گاو'],2,'گربه، اسب و گاو پستاندارند ولی کبوتر پرنده است.'],
  [['دایره','مربع','مثلث','مکعب'],3,'دایره، مربع و مثلث شکل‌های تخت‌اند ولی مکعب حجم دارد.'],
  [['تهران','شیراز','ایران','تبریز'],2,'تهران، شیراز و تبریز شهرند ولی ایران کشور است.'],
  [['مداد','خودکار','ماژیک','دفتر'],3,'با مداد، خودکار و ماژیک می‌نویسیم ولی دفتر چیزی است که رویش می‌نویسیم.'],
  [['۲','۴','۷','۸'],2,'۲، ۴ و ۸ زوج‌اند ولی ۷ فرد است.'],
  [['فروردین','شنبه','آبان','دی'],1,'فروردین، آبان و دی ماه‌اند ولی شنبه روز هفته است.'],
  [['متر','کیلوگرم','سانتی‌متر','کیلومتر'],1,'متر، سانتی‌متر و کیلومتر واحد طول‌اند ولی کیلوگرم واحد جرم است.'],
  [['قاشق','چنگال','بشقاب','چکش'],3,'قاشق، چنگال و بشقاب وسیلهٔ غذا خوردن‌اند ولی چکش ابزار کار است.'],
  [['۹','۱۶','۲۰','۲۵'],2,'۹ = ۳×۳، ۱۶ = ۴×۴ و ۲۵ = ۵×۵ هستند، ولی ۲۰ حاصل ضرب یک عدد در خودش نیست.'],
  [['چشم','گوش','بینی','کفش'],3,'چشم، گوش و بینی عضو بدن‌اند ولی کفش پوشیدنی است.'],
  [['گل رز','لاله','کاج','نرگس'],2,'رز، لاله و نرگس گل‌اند ولی کاج درخت است.'],
  [['۳','۶','۱۰','۱۲'],2,'۳، ۶ و ۱۲ بر ۳ بخش‌پذیرند ولی ۱۰ نیست.'],
];
const SCI=[
  ['گیاهان برای ساختن غذای خود به کدام یک نیاز دارند؟','نور خورشید',['خاک رس','نمک','باد'],'گیاه با کمک نور خورشید، آب و کربن دی‌اکسید غذا می‌سازد (فتوسنتز).'],
  ['کدام حالت ماده شکل و حجم ثابت دارد؟','جامد',['مایع','گاز','بخار'],'جامد هم شکلش ثابت است هم حجمش؛ مایع فقط حجمش ثابت است.'],
  ['کدام سیاره به خورشید نزدیک‌تر است؟','عطارد',['زمین','مریخ','مشتری'],'ترتیب از خورشید: عطارد، زهره، زمین، مریخ و…'],
  ['کدام یک رسانای خوب برق است؟','سیم مسی',['چوب خشک','پلاستیک','شیشه'],'فلزها مثل مس برق را به‌خوبی عبور می‌دهند.'],
  ['یخ در چند درجهٔ سانتی‌گراد آب می‌شود؟','صفر',['۱۰','۵۰','۱۰۰'],'نقطهٔ ذوب یخ صفر درجهٔ سانتی‌گراد است.'],
  ['کدام اندام کار تنفس را انجام می‌دهد؟','شش',['معده','کبد','کلیه'],'هوا وارد شش‌ها می‌شود و اکسیژن آن به خون می‌رسد.'],
  ['کدام یک انرژی حرکتی دارد؟','توپِ در حال غلتیدن',['کتابِ روی میز','باتریِ نو','سنگِ بالای کوه'],'هر چیزی که حرکت می‌کند انرژی حرکتی دارد.'],
  ['کدام تغییر، تغییر شیمیایی است؟','سوختن چوب',['آب شدن یخ','خرد شدن شیشه','تا کردن کاغذ'],'در سوختن، مادهٔ جدیدی (خاکستر و دود) درست می‌شود.'],
  ['ماه نور خود را از کجا می‌گیرد؟','خورشید',['زمین','ستاره‌ها','خودش'],'ماه از خودش نور ندارد و نور خورشید را بازتاب می‌کند.'],
  ['کدام یک جزو مهره‌داران نیست؟','پروانه',['ماهی','قورباغه','گنجشک'],'پروانه حشره است و ستون مهره ندارد.'],
  ['صدا در کدام یک تندتر حرکت می‌کند؟','آهن',['هوا','آب','پنبه'],'صدا در جامدها تندتر از مایع‌ها و گازها حرکت می‌کند.'],
  ['کدام یک برای جدا کردن براده‌های آهن از شن مناسب است؟','آهنربا',['صافی','آب','ترازو'],'آهنربا براده‌های آهن را جذب می‌کند ولی شن را نه.'],
  ['گردش زمین به دور خودش چه چیزی را به وجود می‌آورد؟','شب و روز',['فصل‌ها','ماه‌گرفتگی','جزر و مد'],'زمین هر ۲۴ ساعت یک بار دور خودش می‌چرخد و شب و روز درست می‌شود.'],
  ['کدام بخش گیاه آب را از خاک می‌گیرد؟','ریشه',['برگ','گل','ساقه'],'ریشه آب و مواد معدنی را از خاک جذب می‌کند.'],
  ['کدام یک سوخت فسیلی است؟','نفت',['باد','نور خورشید','آب رودخانه'],'نفت از بقایای جانداران قدیمی درست شده است.'],
  ['وقتی آب بخار می‌شود، چه تغییری کرده است؟','مایع به گاز تبدیل شده',['جامد به مایع تبدیل شده','گاز به مایع تبدیل شده','مادهٔ جدیدی ساخته شده'],'تبخیر یعنی تبدیل مایع به گاز.'],
  ['کدام حس با پوست انجام می‌شود؟','لامسه',['بویایی','شنوایی','چشایی'],'پوست گرما، سرما و زبری را حس می‌کند.'],
  ['کدام وسیله دما را اندازه می‌گیرد؟','دماسنج',['ترازو','خط‌کش','زمان‌سنج'],'دماسنج دما را به درجه نشان می‌دهد.'],
  ['کدام یک زنجیرهٔ غذایی را شروع می‌کند؟','گیاه',['خرگوش','روباه','عقاب'],'گیاهان غذا می‌سازند و بقیهٔ جانداران از آن‌ها تغذیه می‌کنند.'],
  ['نیرویی که اجسام را به طرف زمین می‌کشد چه نام دارد؟','گرانش',['اصطکاک','مغناطیس','کشسانی'],'گرانش (جاذبهٔ زمین) همه‌چیز را به طرف زمین می‌کشد.'],
];
const fromList = (L, t, head) => (r, idx) => { const x=L[(idx ?? ri(r,0,L.length-1)) % L.length]; return head ? { t, q:head, o:x[0], a:x[1], s:x[2] } : mk(r, t, x[0], x[1], x[2], x[3]); };
const GEN = {
  seqA(r){ const a=ri(r,2,12), d=ri(r,3,9), xs=[0,1,2,3].map(i=>a+i*d), n=a+4*d;
    return mk(r,'pattern',`عدد بعدی این دنباله چیست؟ ${xs.map(fa).join('، ')}، ؟`, n,[n+d,n-1,n+2],`هر عدد ${fa(d)} تا از عدد قبلی بیشتر است: ${fa(xs[3])} + ${fa(d)} = ${fa(n)}.`); },
  seqG(r){ const a=ri(r,1,5), k=pickOf(r,[2,3]), xs=[0,1,2,3].map(i=>a*k**i), n=a*k**4;
    return mk(r,'pattern',`عدد بعدی این دنباله چیست؟ ${xs.map(fa).join('، ')}، ؟`, n,[xs[3]+xs[2],n+k,xs[3]+k],`هر عدد ${fa(k)} برابرِ عدد قبلی است: ${fa(xs[3])} × ${fa(k)} = ${fa(n)}.`); },
  seqS(r){ const a=ri(r,1,9), s0=ri(r,1,3), xs=[a]; for(let i=0;i<4;i++) xs.push(xs[i]+s0+i); const n=xs[4];
    return mk(r,'pattern',`عدد بعدی این دنباله چیست؟ ${xs.slice(0,4).map(fa).join('، ')}، ؟`, n,[xs[3]+s0+2,n+1,n+2],`فاصلهٔ عددها هر بار یکی بیشتر می‌شود: ${fa(s0)}، ${fa(s0+1)}، ${fa(s0+2)}. پس این بار ${fa(s0+3)} تا اضافه می‌کنیم: ${fa(xs[3])} + ${fa(s0+3)} = ${fa(n)}.`); },
  day(r){ const d=ri(r,0,6); let n=ri(r,8,30); if(n%7===0) n++; const ans=DAYS[(d+n)%7], rem=n%7;
    return mk(r,'logic',`اگر امروز ${DAYS[d]} باشد، ${fa(n)} روز بعد چه روزی است؟`, ans,[DAYS[(d+n+1)%7],DAYS[(d+n+6)%7],DAYS[(d+n+2)%7]],`هر ۷ روز همان روز تکرار می‌شود. ${fa(n)} = ${fa(n-rem)} + ${fa(rem)}، پس کافی است ${fa(rem)} روز از ${DAYS[d]} جلو برویم: ${ans}.`); },
  queue(r){ const nm=pickOf(r,KIDS), a=ri(r,3,9), b=ri(r,4,12), n=a+b-1;
    return mk(r,'logic',`${nm} در یک صف، نفر ${fa(a)}م از جلو و نفر ${fa(b)}م از عقب است. صف چند نفر است؟`, n,[a+b,n-1,a+b+1],`جلوی ${nm} ${fa(a-1)} نفر و پشت سرش ${fa(b-1)} نفر هستند. با خودش: ${fa(a-1)} + ${fa(b-1)} + ۱ = ${fa(n)} نفر.`); },
  age(r){ const nm=pickOf(r,KIDS), x=ri(r,9,13), y=ri(r,2,5), n=2*x-y;
    return mk(r,'logic',`${nm} ${fa(x)} ساله است و ${fa(y)} سال از برادرش بزرگ‌تر است. مجموع سن این دو نفر چند سال است؟`, n,[2*x+y,2*x,x+y],`برادرش ${fa(x)} − ${fa(y)} = ${fa(x-y)} ساله است. مجموع: ${fa(x)} + ${fa(x-y)} = ${fa(n)}.`); },
  sym(r){ const a=ri(r,2,9); let b=ri(r,2,9); if(b===a) b++; const n=2*a+b;
    return mk(r,'logic',`اگر هر ▲ برابر ${fa(a)} و هر ● برابر ${fa(b)} باشد، حاصل ▲ + ▲ + ● چند است؟`, n,[a+b,a+2*b,2*a+2*b],`به جای هر شکل عددش را می‌گذاریم: ${fa(a)} + ${fa(a)} + ${fa(b)} = ${fa(n)}.`); },
  clock(r){ const h=ri(r,1,5), n=h*30;
    return mk(r,'geometry',`ساعت دقیقاً ${fa(h)}:۰۰ است. زاویهٔ کوچک‌تر بین دو عقربه چند درجه است؟`, n,[n+30,h*15,n+60],`صفحهٔ ساعت ۱۲ قسمت دارد و هر قسمت ۳۰ درجه است. از ۱۲ تا ${fa(h)}، ${fa(h)} قسمت است: ${fa(h)} × ۳۰ = ${fa(n)} درجه.`); },
  analogy: fromList(ANALOGY,'logic'),
  odd: fromList(ODD,'logic','کدام یک با بقیه فرق دارد؟'),
  frac(r){ const n=pickOf(r,[7,9,11,13]), a=ri(r,1,3), b=ri(r,1,3), f=(x,y)=>`${fa(x)}/${fa(y)}`;
    return mk(r,'numbers',`حاصل ${f(a,n)} + ${f(b,n)} چیست؟`, f(a+b,n),[f(a+b,2*n),f(a+b+1,n),f(a+b,n+1)],`مخرج‌ها یکی‌اند، پس فقط صورت‌ها را جمع می‌کنیم: ${fa(a)} + ${fa(b)} = ${fa(a+b)}. جواب ${f(a+b,n)} است.`); },
  perc(r){ const p=pickOf(r,[10,20,25,50,75]), N=pickOf(r,[40,60,80,120,200]), n=p*N/100;
    return mk(r,'numbers',`${fa(p)} درصدِ عدد ${fa(N)} چند است؟`, n,[n+5,n*2,n+10],`${fa(p)} درصد یعنی ${fa(p)} از ۱۰۰: ${fa(N)} × ${fa(p)} ÷ ۱۰۰ = ${fa(n)}.`); },
  rate(r){ const th=pickOf(r,THINGS), k=ri(r,3,6), u=ri(r,3,9); let m=ri(r,7,12); const n=m*u;
    return mk(r,'numbers',`قیمت ${fa(k)} ${th} ${fa(k*u)} هزار تومان است. ${fa(m)} ${th} چند هزار تومان می‌شود؟`, n,[n+u,k*u+m,n-u],`قیمت یک ${th}: ${fa(k*u)} ÷ ${fa(k)} = ${fa(u)} هزار تومان. پس ${fa(m)} تا: ${fa(m)} × ${fa(u)} = ${fa(n)} هزار تومان.`); },
  peri(r){ const a=ri(r,5,12), b=ri(r,2,a-1), n=2*(a+b);
    return mk(r,'geometry',`طول و عرض یک مستطیل ${fa(a)} و ${fa(b)} سانتی‌متر است. محیط آن چند سانتی‌متر است؟`, n,[a*b,a+b,2*a+b],`محیط مستطیل = (طول + عرض) × ۲ = (${fa(a)} + ${fa(b)}) × ۲ = ${fa(n)}.`); },
  area(r){ const a=ri(r,5,12), b=ri(r,3,a-1), n=a*b;
    return mk(r,'geometry',`طول و عرض یک مستطیل ${fa(a)} و ${fa(b)} سانتی‌متر است. مساحت آن چند سانتی‌متر مربع است؟`, n,[2*(a+b),a+b,n+a],`مساحت مستطیل = طول × عرض = ${fa(a)} × ${fa(b)} = ${fa(n)}.`); },
  avg(r){ const m=ri(r,8,20), d=ri(r,1,5), e=ri(r,1,5), xs=[m-d,m+d+e,m-e];
    return mk(r,'numbers',`میانگین سه عدد ${xs.map(fa).join('، ')} چند است؟`, m,[m+1,m-1,m+d+e],`جمع سه عدد ${fa(3*m)} است. میانگین = ${fa(3*m)} ÷ ۳ = ${fa(m)}.`); },
  gcd(r){ const g=pickOf(r,[2,3,4,5,6]), [p,q]=pickOf(r,[[2,3],[3,4],[2,5],[3,5]]), a=g*p, b=g*q;
    return mk(r,'numbers',`بزرگ‌ترین شمارندهٔ مشترک ${fa(a)} و ${fa(b)} کدام است؟`, g,[g*p*q,1,g===2?4:g-1],`${fa(a)} = ${fa(g)} × ${fa(p)} و ${fa(b)} = ${fa(g)} × ${fa(q)}. چون ${fa(p)} و ${fa(q)} شمارندهٔ مشترکی جز ۱ ندارند، جواب ${fa(g)} است.`); },
  mins(r){ const h=ri(r,1,3), m=pickOf(r,[15,20,30,45]), n=60*h+m;
    return mk(r,'numbers',`${fa(h)} ساعت و ${fa(m)} دقیقه روی هم چند دقیقه است؟`, n,[100*h+m,60*h,n+10],`هر ساعت ۶۰ دقیقه است: ${fa(h)} × ۶۰ = ${fa(60*h)}. با ${fa(m)} دقیقه می‌شود ${fa(n)} دقیقه.`); },
  sci: fromList(SCI,'science'),
};
const LISTS = { analogy:ANALOGY, odd:ODD, sci:SCI };
// الگوی نزدیک به هر سؤال دست‌نویس (برای ساختن سؤال مشابه) و سختی پایهٔ هر الگو
const HQ_KIND = ['seqS','analogy','seqG','sym','odd','clock','day','seqA','queue','rate','frac','gcd','peri','perc','avg','sci','sci','sci','sci','sci'];
const BETA = { seqA:-1.3, seqG:-.7, seqS:.5, day:.3, queue:.9, age:-.1, sym:-.6, clock:.2, analogy:-1, odd:-1.2, frac:.1, perc:.4, rate:-.2, peri:-.8, area:-.5, avg:.7, gcd:1.1, mins:-1, sci:-.4 };
const PLAN = [
  [['seqA',7],['seqG',5],['seqS',5],['day',5],['queue',5],['age',5],['sym',5],['clock',3],['analogy',5],['odd',5]],
  [['frac',6],['perc',6],['rate',5],['peri',5],['area',5],['avg',5],['gcd',4],['mins',4],['sci',10]],
];
const Q = (() => {
  const out=[], noise=rngOf(31);
  PLAN.forEach((plan,b)=>{
    HQ.filter(q=>q.b===b).forEach(q=>out.push({ ...q, k:HQ_KIND[HQ.indexOf(q)], beta:({easy:-1,medium:0,hard:1})[q.d] }));
    const gen=[], seen=new Set(out.map(q=>q.q));
    plan.forEach(([k,n])=>{ for(let j=0, s=0; j<n; s++){ const li=LISTS[k]?j:null, x=GEN[k](rngOf(1000+b*500+s*17+k.length*131+j), li ?? undefined);
      if(seen.has(x.q) && !LISTS[k]) continue; seen.add(x.q); gen.push({ ...x, b, k, li, beta:BETA[k] }); j++; } });
    // سؤال‌های ساخته‌شده را قاطی می‌کنیم تا هم‌الگوها پشت سر هم نیایند
    const sh=rngOf(7+b); for(let i=gen.length-1;i>0;i--){ const j=Math.floor(sh()*(i+1)); [gen[i],gen[j]]=[gen[j],gen[i]]; }
    out.push(...gen);
  });
  // دفترچهٔ اول سخت‌تر است
  out.forEach(q=>{ q.beta += (q.b===0 ? 1 : 0) + (noise()-.5)*1.1; });
  return out;
})();
const BOOKLETS = [0,1];
const QB = b => Q.map((q,i)=>({...q,i})).filter(q=>q.b===b);
const NB = BOOKLETS.map(b=>Q.filter(q=>q.b===b).length);
// سؤال مشابه برای تمرین
function SIM(i){ const q=Q[i], L=LISTS[q.k];
  for(let s=0;s<30;s++){ const x=GEN[q.k](rngOf(5000+i*37+s), L ? (q.li ?? i)+Math.ceil(L.length/2)+s : undefined); if(x.q!==q.q) return x; }
  return GEN.seqA(rngOf(i)); }

/* ---------- نمره، تراز و رتبه ---------- */
// درصد هر دفترچه با نمرهٔ منفی (هر ۳ غلط = یک درست)، و درصد کل با ضریب دفترچه‌ها
const NEG = DATA.exam.negative;
const bPct = (c,w,n) => (c - w*NEG)/n*100;
const COEF = DATA.exam.booklets.map(b=>b.coef), COEF_SUM = COEF.reduce((a,b)=>a+b,0);
const scoreOf = (c,w) => BOOKLETS.reduce((s,b)=>s+COEF[b]*bPct(c[b],w[b],NB[b]),0)/COEF_SUM;
const NAMES = ['آرین','سارا','نیما','هستی','پارسا','یاسمن','امیرعلی','مهسا','رادین','نازنین','کیان','ترانه','سینا','آوا','بردیا','فاطمه','محمد','زهرا','علی','مریم','حسین','رها','ماهان','النا'];
const INITS = ['ا','ب','ر','ک','م','ن','ح','ص','ج','ف','ط','ق','ش'];
// شرکت‌کننده‌های دیگر (شبیه‌سازی‌شده). از روی جواب‌های همین‌ها سطح هر سؤال معلوم می‌شود.
const POP = (() => {
  const r=rngOf(77), N=DATA.exam.others, ok=Array(Q.length).fill(0), list=[];
  const norm=()=>{ let s=0; for(let i=0;i<6;i++) s+=r(); return (s-3)/.707; };
  for(let n=0;n<N;n++){ const th=norm(), c=[0,0], w=[0,0];
    Q.forEach((q,i)=>{ if(r() < 1/(1+Math.exp(-1.3*(th-q.beta)))){ c[q.b]++; ok[i]++; } else if(r()<.45){ if(r()<.25){ c[q.b]++; ok[i]++; } else w[q.b]++; } });
    list.push({ name:NAMES[(n*5+3)%NAMES.length]+' '+INITS[(n*7+2)%INITS.length]+'.', city:CAPS[(n*11+4)%CAPS.length], av:(n*5+2)%ASSET.avatars.length, score:scoreOf(c,w) }); }
  // سطح سؤال: ۵۰٪ به بالا درست زده باشند = ساده، ۳۰ تا ۵۰٪ = متوسط، کمتر = سخت
  Q.forEach((q,i)=>{ q.rate=ok[i]/N; q.d = q.rate>=.5 ? 'easy' : q.rate>=.3 ? 'medium' : 'hard'; });
  list.sort((a,b)=>b.score-a.score);
  const mean=list.reduce((s,x)=>s+x.score,0)/N, sd=Math.sqrt(list.reduce((s,x)=>s+(x.score-mean)**2,0)/N);
  return { list, mean, sd };
})();
const TOTAL = POP.list.length + 1;
const tarazOf = s => Math.round(5000 + 1000*(s-POP.mean)/POP.sd);
const rankOf = s => 1 + POP.list.filter(x=>x.score>s).length;
POP.list.forEach(x=>x.taraz=tarazOf(x.score));
// جدول رتبه‌بندی، با خود کاربر اگر نتیجه‌اش آمده باشد
function board(){
  const list=POP.list.slice();
  if(S.exam.status==='published'){ const r=result(); list.splice(r.rank-1,0,{ me:true, name:'تو', city:me().city, av:S.avatar, score:r.score, taraz:r.taraz }); }
  return list.map((x,i)=>({...x, rank:i+1}));
}

/* ============ وضعیت ============ */
const KEY = 'azmoun-demo-v6';
// دادهٔ هر کاربر (با شمارهٔ موبایل) جداست؛ کاربر جدید همیشه از آزمون اول شروع می‌کند
const freshExam = () => ({ status:'available', booklet:0, idx:BOOKLETS.map(()=>0), answers:Array(Q.length).fill(null), flags:Array(Q.length).fill(false), passed:Array(Q.length).fill(false), endsAt:BOOKLETS.map(()=>null) });
const freshPractice = () => ({ res:{}, cur:null, speed:{} });
const freshUser = () => ({ profile:null, avatar:0, exam:freshExam(), practice:freshPractice(), basket:[], story:null });
const USER_KEYS = ['profile','avatar','exam','practice','basket','story'];
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
const freshR = () => ({ step:0, invite:'', first:'', last:'', nid:'', phone:'', birth:null, gender:'', grade:'', province:'', city:'', school:'', avatar:0, errs:{} });
let R = freshR();

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
function result(a=S.exam.answers){
  const c=[0,0], w=[0,0], u=[0,0], wrong=[], by={easy:[0,0],medium:[0,0],hard:[0,0]};
  Q.forEach((q,i)=>{ by[q.d][1]++; if(a[i]===q.a){ c[q.b]++; by[q.d][0]++; } else { wrong.push(i); a[i]===null ? u[q.b]++ : w[q.b]++; } });
  const score=scoreOf(c,w);
  return { c, w, u, correct:c[0]+c[1], bad:w[0]+w[1], blank:u[0]+u[1], total:Q.length, pb:BOOKLETS.map(b=>bPct(c[b],w[b],NB[b])), score, taraz:tarazOf(score), rank:rankOf(score), wrong, by };
}
const fa1 = x => fa((Math.round(x*10)/10).toFixed(1).replace(/\.0$/,'')).replace('.','٫').replace('-','−');
const openBasket = () => S.basket.filter(b=>!b.solved);
const timeLeft = () => { const e=S.exam.endsAt[S.exam.booklet]; return e ? e-Date.now() : DATA.exam.booklets[S.exam.booklet].minutes*60000; };
const passedOf = i => S.exam.passed[i];
// تمرین: سؤال‌هایی که غلط زده یا جواب نداده، به ترتیب سطح (اول ساده‌ها)
const LEVELS = ['easy','medium','hard'];
// دفترچهٔ ۱: تمرین با راه‌حل و سؤال مشابه، به ترتیب سطح. دفترچهٔ ۲: بازی سرعت برای هر دسته.
const pracList = lv => result().wrong.filter(i=>Q[i].b===0 && Q[i].d===lv);
const pracDone = lv => pracList(lv).filter(i=>S.practice.res[i]).length;
const nextLevel = () => LEVELS.find(lv=>pracDone(lv)<pracList(lv).length);
const SPEED = { n:8, secs:15, lives:3 };
const speedTopics = () => { const m={}; result().wrong.forEach(i=>{ if(Q[i].b===1) m[Q[i].t]=(m[Q[i].t]||0)+1; }); return Object.entries(m).sort((a,b)=>b[1]-a[1]).map(x=>x[0]); };
// ایستگاه‌های مسیر تمرین
function stations(){ const out=[];
  LEVELS.forEach(lv=>{ const t=pracList(lv).length, d=pracDone(lv); if(t) out.push({ type:'lv', key:lv, title:`سؤال‌های ${DIFF[lv]}`, total:t, done:d, ok:d===t }); });
  speedTopics().forEach(t=>{ const sp=S.practice.speed[t]||{}; out.push({ type:'speed', key:t, title:TOPIC[t], ok:!!sp.won, best:sp.best, tries:sp.tries||0 }); });
  return out; }
const pracAll = () => { const s=stations(); return [s.filter(x=>x.ok).length, s.length]; };
const pracState = () => { const s=stations(), d=s.filter(x=>x.ok).length; return !s.length ? 'none' : d===s.length ? 'done' : (d || s.some(x=>x.done||x.tries)) ? 'progress' : 'new'; };
const nextStation = () => stations().find(x=>!x.ok);
function goStation(type,key,fromStory){ const r={ name:type==='lv'?'practice':'speed', p:type==='lv'?{lv:key}:{t:key} }; G=null;
  if(fromStory){ S.story.done=true; stack=[{name:'exams',p:{}}]; route=r; save(); closeSheet(); rerender('fwd'); return; } go(r.name,r.p); }
const qLabel = i => `دفترچهٔ ${fa(Q[i].b+1)} · سؤال ${fa(i-QB(Q[i].b)[0].i+1)}`;

/* ============ اجزای مشترک ============ */
const topbar = (title, extra='<span class="sp"></span>', onBack='back()', icon=I.back) => `<div class="topbar sticky"><button class="icon-btn" onclick="${onBack}" aria-label="بازگشت">${icon}</button><div class="title">${title}</div>${extra}</div>`;
const actions = html => `<div class="actions">${html}</div>`;
const empty = (art, title, text) => `<div class="empty"><div class="illus sm">${art}</div><h2>${title}</h2><p class="muted">${text}</p></div>`;
const examMeta = () => `${fa(Q.length)} سؤال · ${fa(DATA.exam.booklets.reduce((s,x)=>s+x.minutes,0))} دقیقه`;
const ring = (v,t,label) => { const C=2*Math.PI*42; return `<div class="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" class="trk"/><circle cx="50" cy="50" r="42" class="val" style="--c:${C.toFixed(1)};--off:${(C*(1-v/t)).toFixed(1)}"/></svg><div class="ring-t"><b>${fa(v)}/${fa(t)}</b><span>${label}</span></div></div>`; };
function navbar(active){
  const items=[['home','خانه',I.home],['exams','آزمون و تمرین',I.exam],['leaderboard','رتبه‌بندی',I.rank],['profile','پروفایل',I.user]];
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
      S.avatar=R.avatar||0; S.profile={ first:R.first.trim(), last:R.last.trim(), grade:R.grade, province:R.province, city:R.city, school:R.school, gender:R.gender, birth:R.birth, nid:R.nid };
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
  { title:'یه عکس برای خودت انتخاب کن', sub:'ورق بزن و هر کدوم رو دوست داشتی وسط نگه دار. بعداً هم می‌تونی عوضش کنی.', keys:['avatar'] },
  { title:'شمارهٔ موبایلت چنده؟', sub:'کد تأیید به این شماره پیامک می‌شه.', keys:['phone'] },
];
const enterNext = `onkeydown="if(event.key==='Enter')regNext()"`;
// کروسل انتخاب آواتار: آواتارِ وسط انتخاب‌شده است
let AVC=0;
const avCarousel = (id, sel) => { AVC=sel; const n=ASSET.avatars.length; return `<div class="avc-wrap"><div class="avc" id="${id}" onscroll="avcScroll('${id}')">${ASSET.avatars.map((a,i)=>`<button class="avc-it ${i===sel?'on':''}" onclick="avcGo('${id}',${i})" aria-label="عکس ${fa(i+1)} از ${fa(n)}" aria-pressed="${i===sel}"><img src="${a}" alt=""></button>`).join('')}</div></div>
  <div class="avc-ctl"><button class="icon-btn" onclick="avcGo('${id}',Math.max(0,AVC-1))" aria-label="عکس قبلی">${I.back}</button><b id="${id}n">${fa(sel+1)} از ${fa(n)}</b><button class="icon-btn" onclick="avcGo('${id}',Math.min(${n-1},AVC+1))" aria-label="عکس بعدی">${I.chev}</button></div>`; };
function avcIndex(id){ const el=$('#'+id), c=el.getBoundingClientRect(), mid=c.left+c.width/2; let best=0, bd=1e9; [...el.children].forEach((b,i)=>{ const r=b.getBoundingClientRect(), d=Math.abs(r.left+r.width/2-mid); if(d<bd){ bd=d; best=i; } }); return best; }
function avcScroll(id){ const i=avcIndex(id); if(i===AVC) return; AVC=i; [...$('#'+id).children].forEach((b,k)=>{ b.classList.toggle('on',k===i); b.setAttribute('aria-pressed',k===i); }); $('#'+id+'n').textContent=`${fa(i+1)} از ${fa(ASSET.avatars.length)}`; if(id==='avcR') R.avatar=i; haptic(5); }
function avcGo(id,i,instant){ const el=$('#'+id); if(!el) return; const b=el.children[i], rb=b.getBoundingClientRect(), rc=el.getBoundingClientRect(); el.scrollBy({ left:(rb.left+rb.width/2)-(rc.left+rc.width/2), behavior:instant||reduced()?'auto':'smooth' }); if(instant){ AVC=-1; avcScroll(id); } }
const FIELDS = {
  avatar:() => `<div id="f-avatar">${avCarousel('avcR',R.avatar||0)}</div>`,
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
  { art:'trophy', title:'کارنامه و رتبه‌ت رو ببین', text:'بعد از اعلام نتیجه، نمره‌ت رو می‌بینی و تراز و رتبه‌ت بین همهٔ شرکت‌کننده‌ها.' },
  { art:'target', title:'از اشتباه‌هات یاد بگیر', text:'برای هر سؤالی که اشتباه زدی، راه‌حلش رو می‌بینی و یه سؤال مشابه تمرین می‌کنی. هر کدوم جا نیفتاد، می‌ندازیش توی سبد تا از معلمت بپرسی.' },
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
const basketBtn = (onclick="go('basket')", cls='') => { const n=openBasket().length; return `<button id="basketBtn" class="icon-btn basket-btn ${cls}" onclick="${onclick}" aria-label="سبد از معلم می‌پرسم${n?'، '+fa(n)+' سؤال':''}">${I.basket}${n?`<span class="cnt">${fa(n)}</span>`:''}</button>`; };
const medal = (rank, me) => `<span class="medal ${me?'me':rank<=3?'m'+rank:''}">${faN(rank)}</span>`;
const BANNERS = [
  { tone:'pri', art:'books', title:'آزمون ۲ نزدیکه', text:'پنجشنبه ۲۱ آبان، ساعت ۹ صبح', cta:'یادم بنداز' },
  { tone:'sage', art:'bubble', title:'کلاس رفع اشکال آنلاین', text:'سؤال‌های سبدت رو با معلم حل کن', cta:'بیشتر بدونم' },
  { tone:'terra', art:'trophy', title:'دوستت رو دعوت کن', text:'با کد دعوت، با هم رقابت کنید', cta:'گرفتن کد دعوت' },
];
const carousel = () => `<div class="bn-wrap"><div class="bn" id="bn" onscroll="bnDots()">${BANNERS.map(b=>`<button class="bn-it ${b.tone}" onclick="soon()"><span class="grow"><b>${b.title}</b><span class="bn-t">${b.text}</span><span class="bn-cta">${b.cta}${I.chev}</span></span><span class="bn-art">${ART[b.art]}</span></button>`).join('')}</div>
  <div class="bn-dots" id="bnDots">${BANNERS.map((b,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div></div>`;
let BN_HOLD=0;
function bnIndex(){ const el=$('#bn'); return el ? Math.round(Math.abs(el.scrollLeft)/el.clientWidth) : 0; }
function bnDots(){ const i=bnIndex(); document.querySelectorAll('#bnDots i').forEach((d,k)=>d.classList.toggle('on',k===i)); BN_HOLD=Date.now(); }
function bnAuto(){ const el=$('#bn'); if(!el || Date.now()-BN_HOLD<4500 || $('#layer .overlay')) return; const i=(bnIndex()+1)%BANNERS.length; el.scrollTo({ left:-i*el.clientWidth, behavior:reduced()?'auto':'smooth' }); }
// کارت وضعیت: آزمون فعلی یا تمرینِ همان آزمون (هیچ‌وقت هر دو با هم نیستند)
function statusCard(){
  const st=S.exam.status, x=DATA.exam;
  const card=(art,badge,title,text,btn,extra='')=>`<div class="card status"><div class="row" style="gap:14px"><div class="grow stack-s"><div>${badge}</div><h2>${title}</h2><p class="muted small">${nob(text)}</p></div><div class="illus sm">${art}</div></div>${extra}${btn}</div>`;
  if(st==='available') return card(ART.books,`<span class="badge">${x.title}</span> ${x.free?'<span class="badge ok">رایگان</span>':''}`,'آزمونت آماده‌ست',examMeta()+' · هر وقت آماده بودی شروع کن.',`<button class="btn btn-primary" onclick="go('rules')">شروع آزمون</button>`);
  if(st==='inProgress') return card(ART.clock,`<span class="badge warn">نیمه‌کاره</span>`,'آزمونت نیمه‌کاره‌ست',`دفترچهٔ ${fa(S.exam.booklet+1)} · ${mmss(timeLeft())} وقت مونده`,`<button class="btn btn-primary" onclick="go('exam')">ادامهٔ آزمون</button>`);
  if(st==='submitted') return card(ART.clock,`<span class="badge ok">تحویل داده شد</span>`,'منتظر نتیجه',`نتیجهٔ ${x.title} ${x.resultAt} اعلام می‌شه.`,'');
  const ss=storyState(), ps=pracState(), [d,t]=pracAll();
  if(ss==='new') return card(ART.trophy,`<span class="badge pri">نتیجهٔ ${x.title} اومد</span>`,'نتیجه‌ت آماده‌ست!','ببین چطور شدی و رتبه‌ت چند شد.',`<button class="btn btn-primary pulse" onclick="startStory()">دیدن نتیجهٔ آزمون</button>`);
  if(ss==='progress') return card(ART.trophy,`<span class="badge warn">نیمه‌کاره</span>`,'نتیجه‌ت رو تا آخر ندیدی','از همون‌جایی که بودی ادامه بده.',`<button class="btn btn-primary" onclick="go('story')">ادامه بده</button>`);
  if(ps==='new'||ps==='progress'){ const ns=nextStation();
    return card(ART.target,`<span class="badge pri">تمرین ${x.title}</span>`,ps==='new'?'مسیر تمرینت آماده‌ست':'مسیر تمرینت نیمه‌کاره‌ست',`${fa(d)} از ${fa(t)} ایستگاه رو رد کردی. ایستگاه بعدی: ${ns.type==='speed'?'مسیر سرعت · ':''}${ns.title}.`,`<button class="btn btn-primary" onclick="goStation('${ns.type}','${ns.key}')">${ps==='new'?'شروع تمرین':'ادامهٔ تمرین'}</button>`,`<div class="progress"><i style="width:${pct(d,t)}%"></i></div>`); }
  return card(ART.trophy,`<span class="badge ok">همه‌چی انجام شد</span>`,ps==='none'?'همه رو درست زده بودی!':'تمرین‌هات تموم شد','آزمون بعدی: '+DATA.nextExam.when,`<button class="btn btn-ghost" onclick="go('result')">دیدن کارنامه</button>`);
}
V.home = () => {
  const s=me(), pub=S.exam.status==='published', r=pub?result():null, top=board().slice(0,3), nb=openBasket().length, [d,t]=pub?pracAll():[0,0];
  const tile=(act,cap,val,sub,cls='')=>`<button class="tile ${cls}" onclick="${act}"><span class="cap">${cap}</span><b>${val}</b><span class="small muted">${sub}</span></button>`;
  const row = x => `<div class="t3-row ${x.me?'me':''}">${medal(x.rank,x.me)}<img class="avatar" src="${avatar(x.av)}" alt=""><span class="grow"><b>${x.name}</b><span class="muted small"> · ${x.city}</span></span><span class="small muted">تراز ${faN(x.taraz)}</span></div>`;
  return `<div class="screen stack">
    <div class="row between sticky"><div class="grow"><h1>سلام ${esc(s.first)}</h1><p class="muted small">پایهٔ ${esc(s.grade)} · ${esc(s.school)}</p></div>
      <div class="row" style="gap:10px">${basketBtn("go('basket')",'lg')}<button class="av-btn" onclick="tab('profile')" aria-label="پروفایل"><img class="avatar" src="${avatar()}" alt=""></button></div></div>
    ${carousel()}
    ${statusCard()}
    <div class="tile-grid">
      ${tile("tab('leaderboard')",'رتبهٔ تو',pub?`<span data-count="${r.rank}" data-from="${TOTAL}">${fa(r.rank)}</span>`:'—',pub?`از ${fa(TOTAL)} نفر`:'بعد از نتیجه')}
      ${tile(pub?"go('result')":"tab('exams')",'تراز',pub?`<span data-count="${r.taraz}" data-sep="1">${faN(r.taraz)}</span>`:'—',pub?'دیدن کارنامه':'بعد از نتیجه')}
      ${tile("tab('exams')",'تمرین',pub&&t?`${fa(d)}<small> از ${fa(t)}</small>`:'—',pub?(t?'ایستگاهِ ردشده':'تمرینی نداری'):'بعد از نتیجه')}
      ${tile("go('basket')",'سبد معلم',fa(nb),nb?'سؤال برای پرسیدن':'خالیه')}
    </div>
    <div class="card top3">
      <div class="row between"><b>برترین‌های ${DATA.exam.title}</b><span class="muted small">${fa(TOTAL)} شرکت‌کننده</span></div>
      <div class="t3-list">${top.map(row).join('')}</div>
      <button class="btn btn-ghost" onclick="tab('leaderboard')">دیدن رتبه‌بندی کامل</button>
    </div>
  </div>${navbar('home')}`;
};

/* ---------- آزمون و تمرین ---------- */
V.exams = () => {
  const st=S.exam.status, pub=st==='published', r=pub?result():null, x=DATA.exam, sts=pub?stations():[], ns=sts.find(z=>!z.ok);
  const stn=(z,n)=>{ const cur=z===ns, sp=z.type==='speed';
    const sub = sp ? (z.ok?`بردی · رکورد ${secs(z.best)} ثانیه`:z.tries?`${fa(z.tries)} بار امتحان کردی`:`${fa(SPEED.n)} سؤال سریع · ${fa(SPEED.lives)} جون`) : `${fa(z.done)} از ${fa(z.total)} سؤال`;
    return `<button class="stn ${z.ok?'done':cur?'cur':''}" onclick="goStation('${z.type}','${z.key}')"><span class="stn-node">${z.ok?I.check:sp?I.bolt:fa(n)}</span><span class="stn-card"><span class="row between"><b>${z.title}</b>${z.ok?'<span class="badge ok">تموم شد</span>':cur?'<span class="badge pri">از اینجا</span>':''}</span><span class="muted small">${sub}</span>${sp?'':`<span class="progress"><i style="width:${pct(z.done,z.total)}%"></i></span>`}</span></button>`; };
  const lvS=sts.filter(z=>z.type==='lv'), spS=sts.filter(z=>z.type==='speed');
  const levels = sts.length ? `<span class="cap sec">مسیر تمرین ${x.title}</span><div class="path">
      ${lvS.length?`<div class="path-h"><b>دفترچهٔ ۱</b><span>راه‌حل و سؤال مشابه</span></div>${lvS.map((z,i)=>stn(z,i+1)).join('')}`:''}
      ${spS.length?`<div class="path-h"><b>دفترچهٔ ۲</b><span>مسیر سرعت</span></div>${spS.map((z,i)=>stn(z,i+1)).join('')}`:''}
      <div class="path-end ${ns?'':'on'}"><span class="stn-node">${I.flag}</span><span>${ns?'پایان مسیر':'به آخر مسیر رسیدی!'}</span></div></div>` : '';
  const cur = pub ? `<div class="card stack-s"><div class="row between"><b>${x.title}</b><span class="badge pri">نتیجه آمده</span></div>
      <div class="kv2"><div><span class="cap">تراز</span><b>${faN(r.taraz)}</b></div><div><span class="cap">رتبه</span><b>${fa(r.rank)}<small> از ${fa(TOTAL)}</small></b></div><div><span class="cap">درصد کل</span><b>${fa1(r.score)}٪</b></div></div>
      <div class="row2"><button class="btn btn-primary btn-sm" onclick="startStory(true)">${storyState()==='new'?'دیدن نتیجه':'نتیجهٔ آزمون'}</button><button class="btn btn-ghost btn-sm" onclick="go('result')">کارنامه</button></div></div>` : statusCard();
  return `<div class="screen stack"><h1 class="sticky">آزمون و تمرین</h1>
    ${cur}${levels}
    <span class="cap sec">آزمون بعدی</span>
    <button class="list-item" onclick="nextExam()"><span class="grow"><span class="row between"><b>${DATA.nextExam.title}</b><span class="badge">هنوز شروع نشده</span></span><span class="muted small">${DATA.nextExam.when}</span></span><span class="chev">${I.chev}</span></button>
    <span class="cap sec">آزمون‌های قبلی</span>
    ${DATA.pastExams.map((e,i)=>`<button class="list-item" onclick="pastExam(${i})"><span class="grow"><span class="row between"><b>${e.title}</b><span class="muted small">${e.date}</span></span><span class="muted small">تراز ${faN(e.taraz)} · رتبهٔ ${fa(e.rank)} از ${fa(e.total)} · تمرین ${fa(e.pd)} از ${fa(e.pt)}</span></span><span class="chev">${I.chev}</span></button>`).join('')}
  </div>${navbar('exams')}`;
};
function nextExam(){ const e=DATA.nextExam; sheet(`<h2>${e.title}</h2><p class="muted">${e.when}. اون موقع از همین‌جا می‌تونی شرکت کنی.</p><div class="acts"><button class="btn btn-primary" onclick="closeSheet()">باشه</button></div>`); }
function pastExam(i){ const e=DATA.pastExams[i]; sheet(`<div class="row between"><h2>${e.title}</h2><span class="muted small">${e.date}</span></div>
  <div class="kv2" style="margin:14px 0"><div><span class="cap">تراز</span><b>${faN(e.taraz)}</b></div><div><span class="cap">رتبه</span><b>${fa(e.rank)}<small> از ${fa(e.total)}</small></b></div><div><span class="cap">تمرین</span><b>${fa(e.pd)}<small> از ${fa(e.pt)}</small></b></div></div>
  <div class="acts"><button class="btn btn-primary" onclick="protoOnly()">نتیجهٔ آزمون</button><div class="row2"><button class="btn btn-ghost" onclick="protoOnly()">تمرین‌ها</button><button class="btn btn-ghost" onclick="protoOnly()">کارنامه</button></div></div>`); }
function protoOnly(){ toast('توی این پروتوتایپ فقط '+DATA.exam.title+' کامل ساخته شده'); }

/* ---------- قوانین ---------- */
V.rules = () => { const b=DATA.exam.booklets; return `<div class="screen no-nav has-act stack">${topbar('قبل از شروع')}
  <div><h1>${DATA.exam.title}</h1><p class="muted">${examMeta()} · چهارگزینه‌ای</p></div>
  <div class="card stack"><b>آزمون ${fa(b.length)} تا دفترچه داره</b>
    <div class="bk-steps">${b.map((x,i)=>`${i?`<span class="ar">${I.arrowL}</span>`:''}<div class="st"><b>دفترچهٔ ${fa(i+1)}</b><div class="small muted">${x.title}</div><div class="small">${fa(NB[i])} سؤال · ${fa(x.minutes)} دقیقه</div><div class="small muted">ضریب ${fa(x.coef)}</div></div>`).join('')}</div>
    <p class="small muted">وقتی بری دفترچهٔ بعدی، دیگه به دفترچهٔ قبلی برنمی‌گردی.</p></div>
  <div class="card stack small">
    <div class="row"><span class="mark n" style="background:var(--bad-soft);color:var(--bad)">−</span><span>جواب غلط نمرهٔ منفی داره: هر ۳ غلط، یک درست رو از بین می‌بره. اگه مطمئن نیستی، نزن.</span></div>
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
const answerMap = (onclick) => { const a=S.exam.answers; return `<div class="tiles-wrap">${BOOKLETS.map(b=>`<div class="tiles-b"><span class="cap">دفترچهٔ ${fa(b+1)} · ${DATA.exam.booklets[b].title}</span><div class="tiles">${QB(b).map((q,k)=>{ const c=a[q.i]===null?'none':a[q.i]===q.a?'ok':'bad'; return onclick?`<button class="${c}" onclick="${onclick}(${q.i})" aria-label="سؤال ${fa(k+1)}">${fa(k+1)}</button>`:`<i class="${c}" style="--d:${250+(q.i%60)*18+b*500}ms"></i>`; }).join('')}</div></div>`).join('')}</div>`; };
const mapLegend = `<div class="legend"><span><i style="background:var(--green)"></i>درست</span><span><i style="background:var(--bad)"></i>غلط</span><span><i style="background:var(--track)"></i>بی‌جواب</span></div>`;
V.result = () => {
  if(S.exam.status!=='published') return `<div class="screen no-nav">${topbar('کارنامه')}${empty(ART.clock,'نتیجه هنوز نیومده',`نتیجه ${DATA.exam.resultAt} اعلام می‌شه.`)}</div>`;
  const r=result(), bk=DATA.exam.booklets;
  return `<div class="screen no-nav has-act stack">${topbar('کارنامهٔ '+DATA.exam.title)}
    <div class="card row between"><div class="grow"><span class="cap">تراز تو</span>
      <div class="big" data-count="${r.taraz}" data-sep="1">${faN(r.taraz)}</div>
      <span class="muted small">میانگین تراز همه ${faN(5000)} است</span></div>
      <div class="rk"><span class="cap">رتبه</span><b>${fa(r.rank)}</b><span class="muted small">از ${fa(TOTAL)} نفر</span></div></div>
    <span class="cap sec">دفترچه‌ها</span>
    <div class="card rep">
      <div class="rep-h"><span>دفترچه</span><span>درست</span><span>غلط</span><span>نزده</span><span>درصد</span></div>
      ${BOOKLETS.map(b=>`<div class="rep-r"><span><b>${bk[b].title}</b><small>ضریب ${fa(bk[b].coef)}</small></span><span class="ok">${fa(r.c[b])}</span><span class="bad">${fa(r.w[b])}</span><span>${fa(r.u[b])}</span><span><b>${fa1(r.pb[b])}٪</b></span></div>`).join('')}
      <div class="rep-r sum"><span><b>درصد کل</b><small>با ضریب‌ها</small></span><span class="ok">${fa(r.correct)}</span><span class="bad">${fa(r.bad)}</span><span>${fa(r.blank)}</span><span><b>${fa1(r.score)}٪</b></span></div>
      <div class="note" style="margin-top:12px">${I.info}<span>هر ۳ جواب غلط، نمرهٔ یک جواب درست رو از بین می‌بره. سؤالِ نزده نمرهٔ منفی نداره.</span></div>
    </div>
    <span class="cap sec">بر اساس سطح سؤال</span>
    <div class="card">${LEVELS.map(d=>{ const [c,t]=r.by[d]; return `<div class="lv"><div class="row between"><b>${DIFF[d]}</b><span class="num">${fa(c)}/${fa(t)}</span></div><div class="bar"><i style="width:${pct(c,t)}%"></i></div></div>`; }).join('')}
      <div class="note" style="margin-top:12px">${I.info}<span>سؤالی «ساده» حساب می‌شه که دست‌کم نصف شرکت‌کننده‌ها درست جوابش داده باشن.</span></div></div>
    <span class="cap sec">پاسخ‌برگ · روی هر سؤال بزن</span>
    <div class="card">${answerMap('showAnswer')}${mapLegend}</div>
  </div>${actions(`<button class="btn btn-primary" onclick="reportSheet()">${I.down}دانلود کارنامه</button>`)}`;
};
function showAnswer(i){
  const q=Q[i], my=S.exam.answers[i];
  sheet(`<div class="row between"><span class="badge">${qLabel(i)} · ${DIFF[q.d]}</span>${my===null?'<span class="badge warn">بی‌جواب</span>':my===q.a?'<span class="badge ok">درست زدی</span>':''}</div>
    ${qBody(q)}
    <div class="${optsCls(q)}" style="margin-top:12px">${q.o.map((o,j)=>staticOpt(q,j,my,true)).join('')}</div>
    <div class="card explain" style="margin-top:16px"><span class="cap">راه‌حل</span><p>${q.s}</p></div>
    <p class="muted small center" style="margin-top:10px">${fa(Math.round(q.rate*100))}٪ شرکت‌کننده‌ها این سؤال رو درست زدن.</p>
    <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">فهمیدم</button></div>`);
}
// گزینهٔ فقط‌نمایشی: جواب تو (و اگر showRight، جواب درست)
function staticOpt(q,j,my,showRight){ const right=showRight&&j===q.a, mine=j===my;
  const tag = right?'<span class="tag ok">جواب درست</span>':mine?`<span class="tag ${showRight?'bad':'me'}">جواب تو</span>`:'';
  return `<div class="opt static ${q.oi?'img':''} ${right?'right':mine?(showRight?'wrong':'mine'):''}" style="animation:none"><span class="n">${right?'✓':mine&&showRight?'✕':fa(j+1)}</span>${q.oi?optIn(q,j):`<span class="grow">${q.o[j]}</span>`}${tag}</div>`; }
// کارنامهٔ قابل دانلود (تصویر)
function reportImage(){
  const r=result(), s=me(), bk=DATA.exam.booklets, W=1080, H=1400, c=document.createElement('canvas'); c.width=W; c.height=H;
  const x=c.getContext('2d'), F=(w,px)=>x.font=`${w} ${px}px "Yekan Bakh", Tahoma, sans-serif`, INK='#1D1D1B', MUT='#5F5B55';
  const box=(X,Y,w,h,fill,stroke)=>{ x.beginPath(); x.roundRect(X,Y,w,h,36); x.fillStyle=fill; x.fill(); if(stroke){ x.lineWidth=4; x.strokeStyle=INK; x.stroke(); } };
  const txt=(t,X,Y,col=INK,al='right')=>{ x.fillStyle=col; x.textAlign=al; x.fillText(t,X,Y); };
  x.direction='rtl'; x.fillStyle='#ECE9E3'; x.fillRect(0,0,W,H);
  F(900,64); txt('کارنامهٔ '+DATA.exam.title,W-70,130); F(500,32); txt(`${s.first} ${s.last} · پایهٔ ${s.grade} · ${s.school}`,W-70,190,MUT); txt(`${s.city}، ${s.province}`,W-70,236,MUT);
  box(70,290,460,250,'#947EDC',true); F(600,34); txt('تراز',490,360,'#fff'); F(900,110); txt(faN(r.taraz),490,480,'#fff');
  box(550,290,460,250,'#fff',true); F(600,34); txt('رتبه',970,360,MUT); F(900,110); txt(fa(r.rank),970,480); F(500,32); txt(`از ${fa(TOTAL)} نفر`,970-x.measureText(fa(r.rank)).width*3.6-20,480,MUT);
  box(70,580,940,520,'#fff'); const cols=[950,560,430,300,130], head=['دفترچه','درست','غلط','نزده','درصد']; F(600,30);
  head.forEach((h,i)=>txt(h,cols[i],650,MUT,i?'center':'right'));
  const rows=[...BOOKLETS.map(b=>[`${bk[b].title} (ضریب ${fa(bk[b].coef)})`,r.c[b],r.w[b],r.u[b],r.pb[b]]),['درصد کل',r.correct,r.bad,r.blank,r.score]];
  rows.forEach((row,k)=>{ const Y=750+k*120; x.fillStyle='#E4E0D8'; x.fillRect(110,Y-70,860,2); F(k===2?900:700,36); txt(row[0],cols[0],Y); F(800,40);
    txt(fa(row[1]),cols[1],Y,'#2F6B34','center'); txt(fa(row[2]),cols[2],Y,'#B33A2B','center'); txt(fa(row[3]),cols[3],Y,INK,'center'); txt(fa1(row[4])+'٪',cols[4],Y,INK,'center'); });
  F(500,28); txt('هر ۳ جواب غلط، نمرهٔ یک جواب درست را از بین می‌برد.',950,1065,MUT);
  box(70,1140,940,150,'#fff'); F(600,30); LEVELS.forEach((d,i)=>{ const X=950-i*300; txt('سؤال‌های '+DIFF[d],X,1200,MUT); F(900,40); txt(`${fa(r.by[d][0])} از ${fa(r.by[d][1])}`,X,1256); F(600,30); });
  F(500,26); txt('آزمون · کارنامهٔ دانش‌آموز',W/2,1350,MUT,'center');
  return c;
}
function reportSheet(){
  const c=reportImage(), url=c.toDataURL('image/png');
  sheet(`<h2>کارنامهٔ ${DATA.exam.title}</h2><p class="muted small">می‌تونی این تصویر رو ذخیره کنی و به پدر و مادرت نشون بدی.</p>
    <img class="rep-img" src="${url}" alt="تصویر کارنامه">
    <div class="acts"><a class="btn btn-primary" href="${url}" download="karnameh-azmoun-1.png">${I.down}ذخیرهٔ تصویر</a><button class="btn btn-ghost" onclick="closeSheet()">بستن</button></div>
    <p class="muted small center" style="margin-top:10px">اگه دکمه کار نکرد، انگشتت رو روی تصویر نگه دار و «ذخیره» رو بزن.</p>`);
}

/* ---------- نتیجهٔ آزمون: قصهٔ چندصفحه‌ای ---------- */
const STEPS = () => { const r=result(); return r.wrong.length ? ['stats','score','cats',...(r.bad?['compare']:[]),'go'] : ['stats','score','go']; };
const storyState = () => !S.story ? 'new' : S.story.done ? 'done' : 'progress';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
// replay: دوباره دیدن قصه از اول، بدون اینکه «دیده‌شده» بودنش عوض شود
function startStory(replay){ if(!S.story) S.story={ step:0, done:false }; else if(replay && S.story.done) S.story.step=0; save(); go('story'); }
function storyNext(){ const st=S.story, n=STEPS().length; if(st.step>=n-1) return; st.step++; if(st.step===n-1) st.done=true; save(); rerender('fwd'); haptic(); }
function storyBack(){ const st=S.story; if(!st.step) return; st.step--; save(); rerender('back'); haptic(); }
function storyClose(){ closeSheet(); stack=[]; go('home',{},false); }
function storyExit(){ if(S.story.done) return storyClose();
  sheet(`<h2>بقیه‌ش رو بعداً می‌بینی؟</h2><p class="muted">همین‌جا نگهش می‌داریم. از خانه می‌تونی ادامه بدی.</p>
  <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">ادامه می‌دم</button><button class="btn btn-ghost" onclick="storyClose()">بیرون می‌رم</button></div>`); }
function wrongByTopic(){ const m={}; result().wrong.forEach(i=>{ const t=Q[i].t; m[t]=(m[t]||0)+1; }); return Object.entries(m).sort((a,b)=>b[1]-a[1]); }
function storyHead(){ const st=S.story, steps=STEPS();
  return `<div class="sticky st-hd"><div class="st-bars">${steps.map((x,i)=>`<i><b class="${i===st.step?'now':''}" style="width:${i<=st.step?100:0}%"></b></i>`).join('')}</div>
    <div class="row between st-top"><button class="icon-btn" onclick="storyBack()" aria-label="صفحهٔ قبل" ${st.step?'':'style="visibility:hidden"'}>${I.back}</button>
      <button class="st-x" onclick="storyExit()" aria-label="بستن">${I.close}</button></div></div>`; }

V.story = () => {
  if(S.exam.status!=='published') return V.home();
  if(!S.story) S.story={ step:0, done:false };
  const st=S.story, steps=STEPS(); st.step=Math.min(st.step,steps.length-1);
  const cur=steps[st.step], r=result(), w=r.wrong.length, bk=DATA.exam.booklets;
  let body='', act=`<button class="btn btn-primary" onclick="storyNext()">بعدی</button>`;

  if(cur==='stats'){
    const p=pct(r.correct,r.total), verdict = p>=80?'عالی بود! واقعاً خوب پیش رفتی.':p>=50?'خوب بود؛ ولی می‌تونی بهتر هم بشی.':'شروع خوبیه. بیا ببینیم کجاها جا موند.';
    body=`<div class="st-body center">
      <span class="cap">${DATA.exam.title} · نتیجه</span>
      <h1 class="st-h">از ${fa(r.total)} سؤال، <span class="hl" data-count="${r.correct}" data-delay="300">${fa(r.correct)}</span> تا رو درست زدی</h1>
      <div aria-hidden="true">${answerMap()}</div>
      <div class="st-stats">
        <div class="stt ok" style="--d:1.5s"><b data-count="${r.correct}" data-delay="1500">${fa(r.correct)}</b><span>درست</span></div>
        <div class="stt bad" style="--d:1.7s"><b data-count="${r.bad}" data-delay="1700">${fa(r.bad)}</b><span>غلط</span></div>
        <div class="stt none" style="--d:1.9s"><b data-count="${r.blank}" data-delay="1900">${fa(r.blank)}</b><span>بی‌جواب</span></div>
      </div>
      <p class="muted st-line" style="--d:2.2s">${verdict}</p></div>`;
  }
  if(cur==='score'){
    body=`<div class="st-body center">
      <span class="cap">رتبهٔ تو</span>
      <h1 class="st-h">بین ${fa(TOTAL)} نفر، شدی نفرِ</h1>
      <div class="taraz"><b data-count="${r.rank}" data-from="${TOTAL}" data-delay="350" data-dur="1100">${fa(TOTAL)}</b></div>
      <div class="wf-chips"><span class="chip-up" style="--d:1.6s">از ${fa(TOTAL-r.rank)} نفر جلوتری</span><span class="chip-up plain" style="--d:1.8s">درصد کل: ${fa1(r.score)}٪</span></div>
      <div class="cats" style="text-align:right">${BOOKLETS.map((b,i)=>`<div class="cat-row" style="--d:${2+i*.18}s"><div class="row between"><b>${bk[b].title}</b><span class="muted small">ضریب ${fa(bk[b].coef)}</span></div><div class="row" style="gap:10px;margin-top:8px"><div class="cbar grow" style="margin:0"><i class="${r.pb[b]>=50?'good':''}" style="--w:${Math.max(3,Math.min(100,r.pb[b]))}%"></i></div><b class="pc">${fa1(r.pb[b])}٪</b></div></div>`).join('')}</div>
      <p class="muted small st-line" style="--d:2.5s">${nob('هر ۳ جواب غلط، نمرهٔ یک جواب درست رو از بین می‌بره.')}</p></div>`;
  }
  if(cur==='cats'){
    const cats=wrongByTopic(), max=cats[0][1];
    body=`<div class="st-body">
      <span class="cap">${fa(w)} سؤالی که غلط زدی یا جواب ندادی</span>
      <h1 class="st-h">این‌ها از کجا بودن؟</h1>
      <div class="cats">${cats.map(([t,n],i)=>`<div class="cat-row" style="--d:${250+i*170}ms"><div class="row between"><b>${TOPIC[t]}</b><span class="cat-n">${fa(n)} سؤال</span></div><div class="cbar"><i style="--w:${pct(n,max)}%"></i></div></div>`).join('')}</div>
      <p class="muted st-line" style="--d:${350+cats.length*170}ms">${nob(cats.length>1?`بیشتر از همه توی «${TOPIC[cats[0][0]]}» جا موندی.`:`همه‌شون از «${TOPIC[cats[0][0]]}» بودن.`)}</p></div>`;
  }
  if(cur==='compare'){
    // اگر سؤال‌های غلط را اصلاً جواب نمی‌داد (نمرهٔ منفی نمی‌گرفت)
    const s2=scoreOf(r.c,[0,0]), rank2=rankOf(s2), up=r.rank-rank2;
    body=`<div class="st-body">
      <span class="cap">فقط برای مقایسه</span>
      <h1 class="st-h">اگه اون ${fa(r.bad)} سؤالی که غلط زدی رو اصلاً جواب نمی‌دادی…</h1>
      <div class="card wf">
        <div class="wf-now"><span class="muted small">رتبهٔ الان تو</span><b>${fa(r.rank)}</b></div>
        <div class="wf-arrow">${I.arrowL}</div>
        <div class="wf-then"><span class="small">رتبه‌ت می‌شد</span><b data-count="${rank2}" data-from="${r.rank}" data-delay="500">${fa(r.rank)}</b></div>
      </div>
      <div class="wf-chips"><span class="chip-up" style="--d:1.5s">${up?`${fa(up)} پله بالاتر`:'رتبه‌ت همین می‌موند'}</span><span class="chip-up plain" style="--d:1.7s">درصد کل ${fa1(s2)}٪ به‌جای ${fa1(r.score)}٪</span></div>
      <div class="card neg st-line" style="--d:1.9s"><b>${fa(r.bad)} جواب غلط = ${fa1(r.bad*NEG)} نمرهٔ منفی</b><p class="muted small">${nob('یعنی جواب‌های غلط، نمرهٔ این تعداد از جواب‌های درستت رو از بین بردن.')}</p></div>
      <p class="st-line tip" style="--d:2.1s">${nob('وقتی مطمئن نیستی، نزدن بهتر از غلط زدنه.')}</p>
      <div class="note">${I.info}<span>این رتبه فرضیه و توی رتبه‌بندی ثبت نمی‌شه.</span></div></div>`;
  }
  if(cur==='go'){
    if(!w){ body=`<div class="st-body center"><div class="illus end-art">${ART.trophy}</div><h1 class="st-h">همه رو درست زدی!</h1><p class="muted st-lead">${nob('هیچ سؤالی برای تمرین نمونده. ایول، دمت گرم!')}</p></div>`;
      act=`<button class="btn btn-primary" onclick="storyClose()">برگشت به خانه</button><button class="btn btn-ghost" onclick="stack=[{name:'home',p:{}}];go('result')">دیدن کارنامه</button>`; }
    else { const ns=nextStation()||stations()[0], b1=LEVELS.reduce((n,l)=>n+pracList(l).length,0), b2=speedTopics().length;
      body=`<div class="st-body center">
        <div class="illus go-art">${ART.target}</div>
        <h1 class="st-h">حالا بریم سراغ تمرین</h1>
        <p class="muted st-lead">${nob(`برای سؤال‌های دفترچهٔ ۱ راه‌حل رو می‌بینی و یه سؤال مشابه حل می‌کنی. برای دفترچهٔ ۲ یه بازی سرعت داریم.`)}</p>
        <div class="lv-chips"><span class="lv-chip ${b1?'':'off'}" style="--d:.5s"><b>${fa(b1)}</b>سؤال با راه‌حل</span><span class="lv-chip ${b2?'':'off'}" style="--d:.65s"><b>${fa(b2)}</b>مرحلهٔ سرعت</span></div></div>`;
      act=`<button class="btn btn-primary pulse" onclick="goStation('${ns.type}','${ns.key}',true)">${pracState()==='new'?'شروع تمرین':'ادامهٔ تمرین'}</button><button class="btn btn-ghost" onclick="storyClose()">بعداً</button>`; }
  }
  return `<div class="screen no-nav has-act story story-${cur}">${storyHead()}${body}</div>${actions(act)}`;
};
function storyFx(){
  const cur=STEPS()[S.story?.step], at=(sel,ms)=>setTimeout(()=>{ const t=$(sel); if(t && route.name==='story' && STEPS()[S.story.step]===cur){ const b=t.getBoundingClientRect(); burst(b.left+b.width/2,b.top+b.height/2); haptic(20); } },ms);
  if(cur==='score') at('.taraz',1500);
  if(cur==='compare') at('.wf-then b',1450);
  if(cur==='go' && !result().wrong.length){ at('.end-art',350); at('.end-art',900); }
}

/* ---------- تمرین (همان مأموریت‌ها): راه‌حل ← سؤال مشابه ← آفرین یا سبد ---------- */
const pracCur = lv => { const qi=pracList(lv).find(i=>!S.practice.res[i]); if(qi==null) return null; const c=S.practice.cur; if(!c || c.qi!==qi) S.practice.cur={ qi, phase:'explain', pick:null }; return S.practice.cur; };
function peekBasket(){ const open=openBasket();
  sheet(`<h2>سبد «از معلم می‌پرسم»</h2>${open.length?`<p class="muted small">${fa(open.length)} سؤال توی سبدته. بعد از تمرین می‌تونی یکی‌یکی ببینیشون.</p>
    <div class="stack" style="margin-top:12px">${open.slice(-6).reverse().map(b=>`<div class="card flat small">${Q[b.qi].q}</div>`).join('')}</div>`
    :'<p class="muted">هنوز چیزی توی سبدت نیست. هر سؤالی برات جا نیفتاد، بندازش اینجا تا از معلمت بپرسی.</p>'}
    <div class="acts"><button class="btn btn-primary" onclick="closeSheet()">ادامهٔ تمرین</button></div>`); }
V.practice = () => {
  if(S.exam.status!=='published') return V.home();
  const lv=route.p.lv||'easy', list=pracList(lv), done=pracDone(lv), c=pracCur(lv);
  const head=`<div class="sticky"><div class="topbar"><button class="icon-btn" onclick="pracBack()" aria-label="بازگشت">${I.back}</button>
      <div class="title">تمرین · سؤال‌های ${DIFF[lv]}<div class="small muted" style="font-weight:500">${c?`${fa(done+1)} از ${fa(list.length)}`:'تموم شد'}</div></div>${basketBtn('peekBasket()')}</div>
      <div class="progress"><i style="width:${pct(done+(c&&(c.phase==='ok')?1:0),list.length)}%"></i></div></div>`;
  if(!c){ // پایان این سطح
    const res=list.map(i=>S.practice.res[i]), ok=res.filter(x=>x==='ok').length, inB=res.filter(x=>x==='basket').length, ns=nextStation(), nb=openBasket().length;
    return `<div class="screen no-nav has-act practice">${head}<div class="st-body center">
      <div class="illus end-art">${inB?ART.bubble:ART.trophy}</div>
      <h1 class="st-h">${!list.length?'اینجا تمرینی نداری':ok===list.length?'ایول، دمت گرم!':'آفرین، این سطح تموم شد!'}</h1>
      <p class="muted st-lead">${nob(!list.length?`همهٔ سؤال‌های ${DIFF[lv]} رو توی آزمون درست زده بودی.`:`از ${fa(list.length)} سؤالِ ${DIFF[lv]}، ${fa(ok)} تا رو درست حل کردی${inB?` و ${fa(inB)} تا رو انداختی توی سبد`:''}.`)}</p>
      ${nb?`<button class="card tap basket-call" style="display:flex;width:100%" onclick="go('basket')"><span class="basket-big">${I.basket}<span class="cnt">${fa(nb)}</span></span><div class="grow"><b>${fa(nb)} سؤال توی سبدت هست</b><p class="small muted">می‌خوای ببینیشون؟ می‌تونی سر کلاس از معلمت بپرسی.</p></div><span class="chev">${I.chev}</span></button>`:''}
      </div></div>${actions(ns?`<button class="btn btn-primary" onclick="stack=[{name:'exams',p:{}}];route={name:'${ns.type==='lv'?'practice':'speed'}',p:{${ns.type==='lv'?'lv':'t'}:'${ns.key}'}};rerender('fwd')">ایستگاه بعدی: ${ns.type==='speed'?'مسیر سرعت':ns.title}</button><button class="btn btn-ghost" onclick="tab('exams')">مسیر تمرین</button>`:`<button class="btn btn-primary" onclick="tab('home')">برگشت به خانه</button><button class="btn btn-ghost" onclick="stack=[{name:'home',p:{}}];go('result')">دیدن کارنامه</button>`)}`;
  }
  const qi=c.qi, q=Q[qi], my=S.exam.answers[qi], ph=c.phase, sq=SIM(qi);
  let body, act;
  if(ph==='explain'){
    body=`<div class="row between small"><span class="muted">${qLabel(qi)} · ${TOPIC[q.t]}</span>${my===null?'<span class="badge warn">جواب نداده بودی</span>':'<span class="badge">غلط زده بودی</span>'}</div>
      <div class="rv-card card" id="rvCard">${qBody(q)}<div class="${optsCls(q)}" style="margin-top:12px">${q.o.map((o,j)=>staticOpt(q,j,my,true)).join('')}</div></div>
      <div class="card explain"><span class="cap">راه‌حل</span><p>${q.s}</p></div>`;
    act=`<button class="btn btn-primary" onclick="pracSimilar()">حالا یه سؤال مشابه حل کن</button>`;
  } else {
    const opts=sq.o.map((o,j)=>{ const right=ph!=='similar'&&j===sq.a, no=ph==='no'&&c.pick===j;
      return `<button class="opt ${right?'right':''} ${no?'wrong':''}" ${ph==='similar'?'':'disabled'} onclick="pracPick(${j})"><span class="n">${right?'✓':no?'✕':fa(j+1)}</span><span class="grow">${o}</span>${right?'<span class="tag ok">جواب درست</span>':no?'<span class="tag bad">جواب تو</span>':''}</button>`; }).join('');
    body=`<div class="row between small"><span class="badge pri">سؤال مشابه</span><span class="muted">${TOPIC[q.t]}</span></div>
      <div class="rv-card card" id="rvCard"><p class="q-text">${nob(sq.q)}</p><div class="stack" style="margin-top:12px">${opts}</div></div>
      ${ph==='ok'?`<div class="got"><b>آفرین! درست بود.</b></div>`:''}
      ${ph==='no'?`<div class="card explain"><span class="cap">راه‌حل</span><p>${sq.s}</p></div><p class="ask">${nob('این یکی درست نشد. بندازش توی سبد تا از معلمت بپرسی.')}</p>`:''}`;
    act = ph==='similar' ? '' : ph==='ok' ? `<button class="btn btn-primary" onclick="pracNext('ok')">${done+1>=list.length?'تموم شد!':'سؤال بعدی'}</button>`
        : `<button class="btn btn-primary" onclick="toBasket()">${I.basket}بنداز توی سبد</button><button class="btn btn-ghost" onclick="pracNext('skip')">فعلاً نه؛ سؤال بعدی</button>`;
  }
  return `<div class="screen no-nav ${act?'has-act':''} practice ${ph==='no'?'act2':''}">${head}<div class="qwrap stack">${body}</div></div>${act?actions(act):''}`;
};
function pracSimilar(){ S.practice.cur.phase='similar'; save(); render(); kick('.qwrap','q-next'); top0(); haptic(); }
function pracBack(){ const c=S.practice.cur; if(c && c.phase==='similar' && pracCur(route.p.lv)) return pracExplain(); back(); }
function pracExplain(){ S.practice.cur.phase='explain'; save(); render(); kick('.qwrap','q-prev'); top0(); }
function pracPick(j){ const c=S.practice.cur, sq=SIM(c.qi); if(c.phase!=='similar') return; c.pick=j;
  if(j===sq.a){ c.phase='ok'; save(); render(); haptic(15); const o=document.querySelectorAll('#rvCard .opt')[j]; if(o){ const r=o.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height/2); } kick('.got','pop-in'); }
  else { c.phase='no'; save(); render(); kick(document.querySelectorAll('#rvCard .opt')[j],'shake'); haptic(30); } }
function pracNext(res){ const c=S.practice.cur; S.practice.res[c.qi]=res; S.practice.cur=null; save(); render(); kick('.qwrap','q-next'); top0(); if(!pracCur(route.p.lv)){ NAV='fwd'; render(); const t=$('.end-art'); if(t){ const b=t.getBoundingClientRect(); setTimeout(()=>burst(b.left+b.width/2,b.top+b.height/2),350); haptic(25); } } }
// انداختن سؤال توی سبد: کارت کوچک می‌شود و با یک قوس می‌افتد توی دکمهٔ سبد (مثل فرستادن پست در دایرکت)
let TOSS=false;
function toBasket(){
  const c=S.practice.cur, card=$('#rvCard'); if(!c || !card || TOSS) return; TOSS=true; const i=c.qi;
  if(!S.basket.find(b=>b.qi===i&&!b.solved)) S.basket.push({ id:Date.now(), qi:i, from:`${DATA.exam.title} · ${qLabel(i)}`, my:S.exam.answers[i], sim:{ pick:c.pick }, solved:false });
  const r=card.getBoundingClientRect(), clone=card.cloneNode(true); clone.removeAttribute('id'); clone.classList.add('flying');
  card.style.visibility='hidden'; card.closest('.qwrap').classList.add('tossing'); haptic(12);
  fly(clone, r, $('#basketBtn'), {scaleTo:.04, arc:-70, dur:760, rot:-14}).then(()=>{ TOSS=false; save(); render(); kick('#basketBtn','bump'); kick('#basketBtn .cnt','pop-in'); haptic(18); setTimeout(()=>pracNext('basket'),380); });
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

/* ---------- مسیر سرعت (تمرین دفترچهٔ ۲): سؤال‌های مشابه با زمان کم و سه جون ---------- */
let G=null;
const speedKinds = t => [...new Set(Q.filter(q=>q.b===1&&q.t===t).map(q=>q.k))];
// هر بار سؤال‌های تازه از همان دسته
function speedDeck(t, seed=(Date.now()%1e9)|0){ const r=rngOf(seed), ks=speedKinds(t), out=[], seen=new Set();
  for(let g=0; out.length<SPEED.n && g<300; g++){ const x=GEN[ks[g%ks.length]](rngOf(ri(r,1,1e9))); if(seen.has(x.q)) continue; seen.add(x.q); out.push(x); } return out; }
const hearts = n => `<span class="hearts" role="img" aria-label="${fa(n)} جون">${[0,1,2].map(i=>`<i class="${i<n?'':'off'}">${I.heart}</i>`).join('')}</span>`;
const secs = ms => fa1(ms/1000);
function speedStart(){ const t=route.p.t; G={ t, qs:speedDeck(t), k:0, lives:SPEED.lives, pick:null, res:[], streak:0, used:0, phase:'count', count:3 }; const g=G; render(); haptic();
  const step=()=>{ if(G!==g||route.name!=='speed') return; if(--g.count>0){ render(); kick('.gcount b','pop-in'); haptic(); setTimeout(step,650); } else speedAsk(); }; setTimeout(step,650); }
function speedAsk(){ G.phase='play'; G.pick=null; G.endsAt=Date.now()+SPEED.secs*1000; render(); kick('.qwrap','q-next'); requestAnimationFrame(speedTick); }
function speedTick(){ if(!G||G.phase!=='play'||G.frozen||route.name!=='speed') return; const left=G.endsAt-Date.now(), bar=$('#gbar');
  if(bar){ bar.style.width=Math.max(0,left/(SPEED.secs*10))+'%'; bar.parentNode.classList.toggle('low',left<5000); const n=$('#gsec'); if(n) n.textContent=fa(Math.max(0,Math.ceil(left/1000))); }
  if(left<=0) return speedAnswer(-1); requestAnimationFrame(speedTick); }
function speedAnswer(j){ if(!G||G.phase!=='play') return; const g=G, q=g.qs[g.k], right=j===q.a;
  g.used+=Math.min(SPEED.secs*1000, SPEED.secs*1000-(g.endsAt-Date.now())); g.pick=j; g.phase='fb'; g.res.push(right?'ok':'bad');
  if(right){ g.streak++; } else { g.lives--; g.streak=0; }
  render();
  if(right){ haptic(12); const o=document.querySelectorAll('.gopts .opt')[j]; if(o){ const r=o.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height/2); } if(g.streak>=2) kick('.streak','pop-in'); }
  else { haptic(40); kick('.gcard','shake'); kick('.hearts i.off:first-of-type','pop-in'); const hs=document.querySelectorAll('.hearts i'); if(hs[g.lives]) kick(hs[g.lives],'heart-break'); }
  setTimeout(()=>{ if(G!==g||route.name!=='speed') return;
    if(g.lives<=0){ g.phase='lost'; const s=S.practice.speed[g.t]||(S.practice.speed[g.t]={}); s.tries=(s.tries||0)+1; save(); NAV='fwd'; render(); haptic(50); }
    else if(g.k>=g.qs.length-1){ const s=S.practice.speed[g.t]||(S.practice.speed[g.t]={}); g.record=!s.best||g.used<s.best; s.won=true; s.best=g.record?g.used:s.best; s.tries=(s.tries||0)+1; g.phase='won'; save(); NAV='fwd'; render(); speedCheer(); }
    else { g.k++; speedAsk(); } }, right?600:1300);
}
function speedCheer(){ const go=()=>{ const t=$('.end-art'); if(t && route.name==='speed'){ const b=t.getBoundingClientRect(); burst(b.left+b.width/2,b.top+b.height/2); } }; setTimeout(go,300); setTimeout(go,800); setTimeout(()=>{ if(route.name==='speed') burst(innerWidth*.3,150); },1150); haptic(30); }
function speedQuit(){ if(G && (G.phase==='play'||G.phase==='fb'||G.phase==='count')){ const g=G; g.frozen=true;
    sheet(`<h2>وسط بازی بیرون می‌ری؟</h2><p class="muted">این دور حساب نمی‌شه و دفعهٔ بعد با سؤال‌های تازه از اول شروع می‌کنی.</p><div class="acts"><button class="btn btn-primary" onclick="speedResume()">ادامه می‌دم</button><button class="btn btn-ghost" onclick="G=null;closeSheet();back()">بیرون می‌رم</button></div>`); g.pausedLeft=g.endsAt-Date.now(); return; }
  G=null; back(); }
function speedResume(){ closeSheet(); if(!G) return; G.frozen=false; if(G.phase==='play'){ G.endsAt=Date.now()+Math.max(1500,G.pausedLeft||0); requestAnimationFrame(speedTick); } }
V.speed = () => {
  if(S.exam.status!=='published') return V.home();
  const t=route.p.t; if(!G||G.t!==t) G={ t, phase:'intro' };
  const g=G, sp=S.practice.speed[t]||{}, playing=g.phase==='play'||g.phase==='fb';
  const head=`<div class="sticky"><div class="topbar"><button class="icon-btn" onclick="speedQuit()" aria-label="بازگشت">${I.back}</button>
      <div class="title">مسیر سرعت<div class="small muted" style="font-weight:500">${TOPIC[t]}</div></div>${g.phase==='intro'||g.phase==='won'?'<span style="width:42px"></span>':hearts(g.lives)}</div>
    ${playing?`<div class="gdots">${g.qs.map((x,i)=>`<i class="${g.res[i]||''} ${i===g.k&&g.phase==='play'?'cur':''}"></i>`).join('')}</div>
      <div class="gtime-row"><div class="gtime ${g.frozen&&g.endsAt-Date.now()<5000?'low':''}"><i id="gbar" style="width:${g.phase==='play'?Math.max(0,(g.endsAt-Date.now())/(SPEED.secs*10)):0}%"></i></div><b id="gsec">${g.phase==='play'?fa(Math.max(0,Math.ceil((g.endsAt-Date.now())/1000))):'۰'}</b></div>`:''}</div>`;
  let body='', act='';
  if(g.phase==='intro'){
    body=`<div class="st-body center"><div class="illus go-art">${ART.clock}</div>
      <h1 class="st-h">${sp.won?'می‌خوای رکوردت رو بزنی؟':'آماده‌ای؟'}</h1>
      <p class="muted st-lead">${nob('سؤال‌ها مثل سؤال‌های دفترچهٔ ۲ هستن و سخت نیستن؛ اینجا سرعت و دقت مهمه.')}</p>
      <div class="lv-chips"><span class="lv-chip" style="--d:.3s"><b>${fa(SPEED.n)}</b>سؤال</span><span class="lv-chip" style="--d:.45s"><b>${fa(SPEED.secs)}</b>ثانیه برای هر سؤال</span><span class="lv-chip" style="--d:.6s"><b>${fa(SPEED.lives)}</b>جون</span></div>
      <p class="muted small st-line" style="--d:.8s">${nob('جواب غلط یا تموم شدن وقت، یک جون کم می‌کنه. اگه هر سه جون بره، با سؤال‌های تازه از اول شروع می‌کنی.')}</p>
      ${sp.best?`<p class="st-line tip" style="--d:.9s">رکورد تو: ${secs(sp.best)} ثانیه</p>`:''}</div>`;
    act=`<button class="btn btn-primary pulse" onclick="speedStart()">بزن بریم!</button>`;
  }
  if(g.phase==='count') body=`<div class="gcount"><span class="muted">آماده…</span><b>${fa(g.count)}</b></div>`;
  if(playing){ const q=g.qs[g.k], fb=g.phase==='fb', long=q.o.some(o=>String(o).length>12);
    body=`<div class="qwrap stack">
      <div class="row between small"><span class="muted">سؤال ${fa(g.k+1)} از ${fa(g.qs.length)}</span>${g.streak>=2?`<span class="streak">${I.bolt}${fa(g.streak)} تا پشت هم!</span>`:''}</div>
      <div class="card gcard"><p class="q-text">${nob(q.q)}</p></div>
      <div class="gopts ${long?'one':''}">${q.o.map((o,j)=>{ const right=fb&&j===q.a, no=fb&&g.pick===j&&j!==q.a; return `<button class="opt ${right?'right':''} ${no?'wrong':''}" ${fb?'disabled':''} onclick="speedAnswer(${j})"><span class="n">${right?'✓':no?'✕':fa(j+1)}</span><span class="grow">${o}</span></button>`; }).join('')}</div>
      ${fb?`<p class="ask ${g.pick===q.a?'yes':'no'}">${g.pick===q.a?'آفرین!':g.pick===-1?'وقت تموم شد!':'این نبود!'}</p>`:''}</div>`; }
  if(g.phase==='won'){ const ns=nextStation();
    body=`<div class="st-body center"><div class="illus end-art">${ART.trophy}</div>
      <h1 class="st-h">این مرحله رو بردی!</h1>${g.record?'<div><span class="badge pri">رکورد جدید</span></div>':''}
      <div class="st-stats"><div class="stt" style="--d:.3s"><b>${secs(g.used)}</b><span>ثانیه</span></div><div class="stt ok" style="--d:.45s"><b>${fa(g.res.filter(x=>x==='ok').length)}</b><span>جواب درست</span></div><div class="stt" style="--d:.6s"><b>${fa(g.lives)}</b><span>جونِ مونده</span></div></div>
      <p class="muted st-line" style="--d:.9s">${nob(`به‌طور میانگین هر سؤال رو توی ${secs(g.used/g.qs.length)} ثانیه جواب دادی.`)}</p></div>`;
    act=(ns?`<button class="btn btn-primary" onclick="G=null;stack=[{name:'exams',p:{}}];route={name:'${ns.type==='lv'?'practice':'speed'}',p:{${ns.type==='lv'?'lv':'t'}:'${ns.key}'}};rerender('fwd')">ایستگاه بعدی: ${ns.title}</button>`:`<button class="btn btn-primary" onclick="G=null;tab('home')">برگشت به خانه</button>`)+`<div class="row2"><button class="btn btn-ghost" onclick="speedStart()">یه دور دیگه</button><button class="btn btn-ghost" onclick="G=null;tab('exams')">مسیر تمرین</button></div>`;
  }
  if(g.phase==='lost'){
    body=`<div class="st-body center"><div class="illus end-art lost">${ART.clock}</div>
      <h1 class="st-h">جون‌هات تموم شد</h1>
      <p class="muted st-lead">${nob(`تا سؤال ${fa(g.k+1)} از ${fa(g.qs.length)} اومدی و ${fa(g.res.filter(x=>x==='ok').length)} تا رو درست زدی. یه بار دیگه با سؤال‌های تازه امتحان کن.`)}</p>
      <div class="gdots big">${g.qs.map((x,i)=>`<i class="${g.res[i]||''}"></i>`).join('')}</div></div>`;
    act=`<button class="btn btn-primary" onclick="speedStart()">دوباره از اول</button><button class="btn btn-ghost" onclick="G=null;tab('exams')">برگشت به مسیر تمرین</button>`;
  }
  return `<div class="screen no-nav ${act?'has-act':''} practice speed sp-${g.phase} ${g.phase==='won'?'act2':''}">${head}${body}</div>${act?actions(act):''}`;
};

/* ---------- خروجی PDF سبد ---------- */
function makePdf(pages){ // هر صفحه یک تصویر JPEG تمام‌صفحه (A4)
  const enc=new TextEncoder(), parts=[], offs=[]; let pos=0;
  const push=x=>{ const u=typeof x==='string'?enc.encode(x):x; parts.push(u); pos+=u.length; };
  const obj=(n,body)=>{ offs[n]=pos; push(`${n} 0 obj\n`); body(); push(`\nendobj\n`); };
  push('%PDF-1.4\n');
  obj(1,()=>push('<< /Type /Catalog /Pages 2 0 R >>'));
  obj(2,()=>push(`<< /Type /Pages /Kids [${pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] /Count ${pages.length} >>`));
  pages.forEach((j,i)=>{ const p=3+i*3, content='q 595 0 0 842 0 0 cm /Im0 Do Q';
    obj(p,()=>push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ${p+1} 0 R >> >> /Contents ${p+2} 0 R >>`));
    obj(p+1,()=>{ push(`<< /Type /XObject /Subtype /Image /Width ${j.w} /Height ${j.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${j.data.length} >>\nstream\n`); push(j.data); push('\nendstream'); });
    obj(p+2,()=>push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)); });
  const xref=pos, n=3+pages.length*3; push(`xref\n0 ${n}\n0000000000 65535 f \n`);
  for(let i=1;i<n;i++) push(String(offs[i]).padStart(10,'0')+' 00000 n \n');
  push(`trailer\n<< /Size ${n} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts,{type:'application/pdf'});
}
const loadImg = src => new Promise(res=>{ const im=new Image(); im.onload=()=>res(im); im.onerror=()=>res(null); im.src=src; });
async function basketPages(){
  const items=openBasket(), s=me(), W=1240, H=1754, M=90, CW=W-2*M, INK='#1D1D1B', MUT='#5F5B55', pages=[];
  const imgs={}; for(const b of items){ const q=Q[b.qi]; if(q.img) imgs[q.img]=imgs[q.img]||await loadImg(ASSET[q.img]); if(q.oi) for(const u of q.oi) imgs[u]=imgs[u]||await loadImg(u); }
  await (document.fonts && document.fonts.ready);
  let c, x, y;
  const F=(w,px)=>x.font=`${w} ${px}px "Yekan Bakh", Tahoma, sans-serif`;
  const txt=(t,X,Y,col=INK,al='right')=>{ x.fillStyle=col; x.textAlign=al; x.fillText(t,X,Y); };
  const wrap=(t,maxW)=>{ const out=[]; let line=''; String(t).replace(/ /g,' ').split(' ').forEach(w=>{ const tr=line?line+' '+w:w; if(x.measureText(tr).width>maxW && line){ out.push(line); line=w; } else line=tr; }); if(line) out.push(line); return out; };
  const para=(t,X,maxW,lh,dry,col)=>{ wrap(t,maxW).forEach(l=>{ if(!dry) txt(l,X,y+lh*.72,col); y+=lh; }); };
  const page=()=>{ c=document.createElement('canvas'); c.width=W; c.height=H; x=c.getContext('2d'); x.direction='rtl'; x.fillStyle='#fff'; x.fillRect(0,0,W,H); pages.push(c); y=M; };
  const opts=(q,pick,dry,X,maxW)=>{
    if(q.oi){ const S2=170, gap=24; q.o.forEach((o,j)=>{ const X0=X-(j+1)*S2-j*gap; if(!dry){ if(imgs[q.oi[j]]) x.drawImage(imgs[q.oi[j]],X0,y,S2,S2); if(pick===j){ x.lineWidth=6; x.strokeStyle='#947EDC'; x.beginPath(); x.roundRect(X0-6,y-6,S2+12,S2+12,26); x.stroke(); } F(700,26); txt(fa(j+1)+(pick===j?' · جواب من':''),X0+S2/2,y+S2+36,pick===j?'#4B3A92':MUT,'center'); } }); y+=S2+60; return; }
    q.o.forEach((o,j)=>{ F(pick===j?800:500,27); const mine=pick===j; if(!dry && mine){ const h=wrap(`${fa(j+1)}) ${o}`,maxW-230).length*40; x.fillStyle='#E9E3F8'; x.beginPath(); x.roundRect(X-maxW,y-4,maxW,h+8,14); x.fill(); F(800,24); txt('جواب من',X-maxW+20,y+27,'#4B3A92','left'); F(800,27); }
      para(`${fa(j+1)}) ${o}`,X-16,maxW-230,40,dry); y+=4; });
  };
  const item=(b,n,dry)=>{ const q=Q[b.qi], y0=y;
    if(!dry){ x.fillStyle=INK; x.beginPath(); x.arc(W-M-26,y+26,26,0,7); x.fill(); F(900,28); txt(fa(n),W-M-26,y+36,'#fff','center'); F(600,26); txt(b.from,W-M-70,y+35,MUT); } y+=74;
    F(800,31); para(q.q,W-M,CW,50,dry); y+=6;
    if(q.img && imgs[q.img]){ const im=imgs[q.img], w=Math.min(CW,760), h=w*im.height/im.width; if(!dry) x.drawImage(im,W-M-w,y,w,h); y+=h+20; }
    opts(q,b.my,dry,W-M,CW);
    if(b.my===null){ F(700,28); para('جواب من: این سؤال رو توی آزمون جواب نداده بودم.',W-M,CW,46,dry,'#8A3E26'); }
    if(b.sim){ const sq=SIM(b.qi); y+=14; const yb=y; let hb=0;
      const inner=d=>{ y=yb+26; F(700,24); para('سؤال مشابهی که توی تمرین حل کردم',W-M-30,CW-60,40,d,MUT); F(700,27); para(sq.q,W-M-30,CW-60,42,d); y+=4; opts(sq,b.sim.pick,d,W-M-30,CW-60); y+=14; };
      inner(true); hb=y-yb; if(!dry){ x.fillStyle='#F7F5F1'; x.beginPath(); x.roundRect(M,yb,CW,hb,24); x.fill(); inner(false); } y=yb+hb; }
    y+=22; if(!dry){ x.fillStyle='#D6D0C6'; x.fillRect(M,y,CW,2); } y+=28; return y-y0; };
  page(); F(900,54); txt('از معلم می‌پرسم',W-M,y+50); y+=84; F(500,28); txt(`${s.first} ${s.last} · پایهٔ ${s.grade} · ${s.school}`,W-M,y+24,MUT); y+=44; txt(`${DATA.exam.title} · ${fa(items.length)} سؤال`,W-M,y+24,MUT); y+=60; x.fillStyle=INK; x.fillRect(M,y,CW,4); y+=44;
  items.forEach((b,i)=>{ const keep=y; const h=item(b,i+1,true); y=keep; if(y+h>H-M-40 && y>M+10) page(); item(b,i+1,false); });
  pages.forEach((cv,i)=>{ const g=cv.getContext('2d'); g.direction='rtl'; g.font='500 24px "Yekan Bakh", Tahoma, sans-serif'; g.fillStyle=MUT; g.textAlign='center'; g.fillText(`صفحهٔ ${fa(i+1)} از ${fa(pages.length)}`,W/2,H-50); });
  return pages;
}
let PDF_URL=null;
async function basketPdf(){
  if(!openBasket().length) return toast('سبدت خالیه');
  toast('دارم PDF رو می‌سازم…');
  const pages=await basketPages(), bytes=u=>{ const b=atob(u.split(',')[1]), a=new Uint8Array(b.length); for(let i=0;i<b.length;i++) a[i]=b.charCodeAt(i); return a; };
  const blob=makePdf(pages.map(c=>({ w:c.width, h:c.height, data:bytes(c.toDataURL('image/jpeg',.9)) })));
  if(PDF_URL) URL.revokeObjectURL(PDF_URL); PDF_URL=URL.createObjectURL(blob); window.PDF_BLOB=blob;
  sheet(`<h2>PDF سبدت آماده‌ست</h2><p class="muted small">${fa(openBasket().length)} سؤال با جواب‌های خودت، در ${fa(pages.length)} صفحه. می‌تونی چاپش کنی یا برای معلمت بفرستی.</p>
    <img class="rep-img" src="${pages[0].toDataURL('image/jpeg',.7)}" alt="پیش‌نمایش صفحهٔ اول">
    <div class="acts"><a class="btn btn-primary" href="${PDF_URL}" download="sabad-az-moallem-miporsam.pdf">${I.down}دانلود PDF</a><button class="btn btn-ghost" onclick="closeSheet()">بستن</button></div>`);
}

/* ---------- رتبه‌بندی ---------- */
V.leaderboard = () => {
  const st=S.exam.status, pub=st==='published', r=pub?result():null, B=board(), top=B.slice(0,3);
  const pod=(x,cls)=>`<div class="pod ${cls} ${x.me?'me':''}">${cls==='p1'?I.crown:''}<img class="avatar" src="${avatar(x.av)}" alt=""><div class="nm">${x.name}</div><div class="sc">تراز ${faN(x.taraz)}</div><div class="blk">${fa(x.rank)}</div></div>`;
  const lrow = x => `<div class="lb-row ${x.me?'me':''}"><span class="rank">${fa(x.rank)}</span><img class="avatar" src="${avatar(x.av)}" alt=""><span class="grow">${x.me?'<b>تو</b>':x.name}<br><span class="muted small">${x.city}</span></span><span class="muted small">تراز ${faN(x.taraz)}</span></div>`;
  const ranks = [...new Set((pub?[4,5,6,7,8,r.rank-2,r.rank-1,r.rank,r.rank+1,r.rank+2]:[4,5,6,7,8,9,10,11,12]).filter(k=>k>=4&&k<=B.length))].sort((a,b)=>a-b);
  let rows='', prev=3; ranks.forEach(k=>{ if(k>prev+1) rows+='<div class="gap">···</div>'; rows+=lrow(B[k-1]); prev=k; });
  if(prev<B.length) rows+=`<div class="gap">···</div>`;
  const myCard = pub
    ? `<div class="card row between"><span>جایگاه تو</span><b><span data-count="${r.rank}" data-from="${TOTAL}">${fa(r.rank)}</span> از ${fa(TOTAL)} · تراز ${faN(r.taraz)}</b></div>`
    : `<div class="card row" style="gap:14px"><img class="avatar" src="${avatar()}" alt="" style="width:46px;height:46px;border:1.6px solid var(--edge)"><div class="grow"><b>تو هنوز رتبه نداری</b><p class="small muted">${st==='submitted'?`رتبه‌ت بعد از اعلام نتیجه (${DATA.exam.resultAt}) اینجا میاد.`:'بعد از شرکت در آزمون و اعلام نتیجه، جایگاهت اینجا میاد.'}</p></div></div>
       ${st==='available'?`<button class="btn btn-primary" onclick="go('rules')">شروع آزمون</button>`:st==='inProgress'?`<button class="btn btn-primary" onclick="go('exam')">ادامهٔ آزمون</button>`:''}`;
  return `<div class="screen stack"><div class="sticky"><h1>رتبه‌بندی</h1><p class="muted small">${DATA.exam.title} · پایهٔ ${esc(me().grade)} · ${fa(TOTAL)} شرکت‌کننده</p></div>
    <div class="card podium-card"><div class="podium">${pod(top[1],'p2')}${pod(top[0],'p1')}${pod(top[2],'p3')}</div></div>
    ${myCard}
    <div class="card" style="padding:8px 12px">${rows}</div>
    <div class="note">${I.info}<span>رتبه از روی تراز آزمون حساب می‌شه. تمرین‌ها و سبد، رتبه رو تغییر نمی‌دن.</span></div>
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
    <button class="list-item compact" onclick="logoutAsk()"><span class="chev" style="color:var(--bad)">${I.out}</span><span class="grow"><b style="color:var(--bad)">خروج از حساب</b></span></button>
  </div>${navbar('profile')}`; };
function soon(){ toast('این بخش هنوز ساخته نشده'); }
function pickAvatar(){ sheet(`<h2>عکس پروفایلت رو انتخاب کن</h2><p class="muted small">ورق بزن و هر کدوم رو دوست داشتی وسط نگه دار.</p>${avCarousel('avcP',S.avatar)}<div class="acts"><button class="btn btn-primary" onclick="setAvatar(AVC)">همین رو می‌خوام</button><button class="btn btn-ghost" onclick="closeSheet()">بی‌خیال</button></div>`); setTimeout(()=>avcGo('avcP',S.avatar,true),30); }
function setAvatar(i){ S.avatar=i; save(); closeSheet(); render(); kick('.pf-av .avatar','bump'); haptic(); toast('عکس پروفایلت عوض شد'); }
function logoutAsk(){ sheet(`<h2>از حسابت خارج می‌شی؟</h2><p class="muted">جواب‌ها و تمرین‌هات سر جاشون می‌مونن. برای برگشتن باید دوباره با شماره‌ت وارد بشی.</p><div class="acts"><button class="btn btn-primary btn-danger-fill" onclick="logout()">آره، خارج می‌شم</button><button class="btn btn-ghost" onclick="closeSheet()">نه، می‌مونم</button></div>`); }
function logout(){ stashUser(); S.loggedIn=false; save(); closeSheet(); stack=[]; route={name:'login',p:{}}; L={mode:'login',phone:'',otp:'',err:'',resendAt:0}; rerender('tab'); }

/* ---------- سبد: از معلم می‌پرسم ---------- */
V.basket = () => { const open=openBasket(), solved=S.basket.length-open.length;
  return `<div class="screen no-nav ${open.length?'has-act':''} stack">${topbar('از معلم می‌پرسم')}
    ${open.length?`<p class="muted small">${nob('سؤال‌های آزمون که توی تمرین هم برات جا نیفتادن. با PDF می‌تونی همه رو یک‌جا به معلمت نشون بدی.')}</p>`:''}
    ${open.length?open.map(b=>`<button class="list-item" onclick="go('basketItem',{id:${b.id}})"><span class="grow"><b class="small">${Q[b.qi].q}</b><br><span class="muted small">${b.from}${b.sim?' · با یک سؤال مشابه':''}</span></span><span class="chev">${I.chev}</span></button>`).join('')
      :empty(ART.bubble,'سبدت خالیه','وقتی توی تمرین سؤالی برات جا نیفتاد، بندازش توی سبد تا از معلمت بپرسی.')}
    ${solved?`<p class="muted small center">${fa(solved)} سؤال حل‌شده از سبد بیرون رفته.</p>`:''}
  </div>${open.length?actions(`<button class="btn btn-primary" onclick="basketPdf()">${I.down}دانلود PDF سؤال‌ها و جواب‌هام</button>`):''}`; };
V.basketItem = () => { const b=S.basket.find(x=>x.id===route.p.id); if(!b) return V.basket(); const q=Q[b.qi];
  return `<div class="screen no-nav has-act stack">${topbar('سؤال من')}
    <div class="row between"><span class="badge">${b.from}</span><span class="muted small">سؤال اصلی آزمون</span></div>
    ${qBody(q)}
    <div class="${optsCls(q)}">${q.o.map((o,j)=>staticOpt(q,j,b.my,true)).join('')}</div>
    ${b.sim?(sq=>`<span class="cap sec">سؤال مشابهی که توی تمرین حل کردی</span><div class="card linked"><p class="q-text sm">${nob(sq.q)}</p><div class="stack" style="margin-top:10px">${sq.o.map((o,j)=>staticOpt(sq,j,b.sim.pick,true)).join('')}</div></div>`)(SIM(b.qi)):''}
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
    if(route.name==='register' && $('#avcR')) avcGo('avcR',R.avatar||0,true);
    sbar();
    if(route.name==='home') bnDots();
  } else { const t=document.createElement('div'); t.innerHTML=html; morphKids(app,t); }
  if(route.name==='otp') tickResend();
  if(route.name==='welcome') bindSwipe();
  document.body.classList.toggle('scrolled', scrollY>4);
}
window.addEventListener('scroll',()=>document.body.classList.toggle('scrolled', scrollY>4),{passive:true});
let TICK=0;
setInterval(()=>{
  if(route.name==='otp') tickResend();
  if(route.name==='home' && ++TICK%5===0) bnAuto();
  const e=S.exam; if(e.status!=='inProgress' || !e.endsAt[e.booklet]) return;
  const left=timeLeft();
  if(left<=0){ if(e.booklet<BOOKLETS.length-1) goNextBooklet(true); else submitExam(true); return; }
  const t=$('#timer'); if(t){ t.textContent=mmss(left); t.classList.toggle('low',left<180000); }
},1000);
/* ---------- نشانگر اسکرول داخل اپ (به‌جای اسکرول‌بار مرورگر) ---------- */
let SB_T=0;
function sbar(show){
  let el=$('#sbar'); if(!el){ el=document.createElement('div'); el.id='sbar'; el.innerHTML='<i></i>'; el.setAttribute('aria-hidden','true'); document.body.appendChild(el); }
  const doc=document.documentElement, H=innerHeight, full=doc.scrollHeight, app=$('#app').getBoundingClientRect();
  if(full<=H+4){ el.classList.remove('on'); return; }
  const top=10, track=H-20, th=Math.max(36, track*H/full), y=top+(track-th)*(scrollY/(full-H));
  el.style.left=(app.left+3)+'px'; el.firstChild.style.cssText=`height:${th}px;transform:translateY(${y}px)`;
  if(show){ el.classList.add('on'); clearTimeout(SB_T); SB_T=setTimeout(()=>el.classList.remove('on'),900); }
}
addEventListener('scroll',()=>sbar(true),{passive:true}); addEventListener('resize',()=>sbar());

/* ============ ابزار پیش‌نمایش (preview.html از این‌ها استفاده می‌کند) ============ */
const DEV_PERF = { strong:[.9,.04], mid:[.6,.16], weak:[.34,.26] };
function devFill(perf){ const P=DEV_PERF[perf]||DEV_PERF.mid, r=rngOf((perf||'mid').length*97+5);
  S.exam=freshExam(); S.exam.status='published'; S.exam.passed=S.exam.passed.map(()=>true);
  S.exam.answers=Q.map(q=>{ const pc=Math.min(.98,Math.max(.05,P[0]+(q.rate-.45)*.6)), u=r(); return u<pc ? q.a : u<pc+P[1] ? null : (q.a+1+Math.floor(r()*3))%4; }); }
function devUser(){ if(S.loggedIn && S.profile) return; S.loggedIn=true; S.phone='09121112233'; if(!S.registered.includes(S.phone)) S.registered.push(S.phone); loadUser(S.phone,true);
  S.profile={ first:'سارا', last:'احمدی', grade:'ششم', province:'تهران', city:'تهران', school:'دبستان فرهنگ', gender:'دختر', birth:{y:1393,m:5,d:12}, nid:'0012345679' }; S.avatar=10; }
function devGo(id, perf){
  closeSheet(); stack=[]; G=null; const [g,a]=id.split(':'); let name=g, p={}, after=null;
  const auth=()=>{ if(S.loggedIn){ stashUser(); S.loggedIn=false; } L={mode:'login',phone:'',otp:'',err:'',resendAt:0}; R=freshR(); };
  const pub=()=>{ devUser(); devFill(perf); S.story=null; S.practice=freshPractice(); S.basket=[]; };
  const seen=()=>{ pub(); S.story={step:STEPS().length-1,done:true}; };
  const sit=b=>{ devUser(); S.exam=freshExam(); S.exam.status='inProgress'; S.exam.booklet=b; if(b) QB(0).forEach(q=>S.exam.passed[q.i]=true); S.exam.endsAt[b]=Date.now()+DATA.exam.booklets[b].minutes*60000-(b?0:754000); name='exam'; };
  const drill=(n,mode)=>{ const w=result().wrong.filter(i=>Q[i].b===0); w.slice(0,n).forEach((i,k)=>{ const bk=mode==='mix'&&k%3===2; S.practice.res[i]=bk?'basket':'ok'; if(bk) S.basket.push({id:1000+i,qi:i,from:`${DATA.exam.title} · ${qLabel(i)}`,my:S.exam.answers[i],sim:{pick:(SIM(i).a+1)%4},solved:false}); }); if(n>=999) speedTopics().forEach((t,k)=>S.practice.speed[t]={won:true,best:61000+k*9000,tries:2}); };
  if(g==='login'){ auth(); }
  else if(g==='unregistered'){ auth(); L.phone=DATA.login.unregistered; }
  else if(g==='otp'){ auth(); L.phone='09121112233'; L.resendAt=Date.now()+60000; }
  else if(g==='invite'){ auth(); }
  else if(g==='register'){ auth(); name='register'; Object.assign(R,{step:+a,invite:'AZ1405',first:'سارا',last:'احمدی',nid:'0012345679'}); if(+a>1) Object.assign(R,{birth:{y:1393,m:5,d:12},gender:'دختر'}); if(+a>2) Object.assign(R,{grade:'ششم',province:'تهران',city:'تهران',school:'دبستان فرهنگ'}); if(+a>3) R.avatar=10; }
  else if(g==='welcome'){ devUser(); W=+a||0; }
  else if(g==='home'){ name='home';
    if(a==='available'){ devUser(); S.exam=freshExam(); S.story=null; S.practice=freshPractice(); S.basket=[]; }
    if(a==='progress'){ sit(0); name='home'; }
    if(a==='wait'){ pub(); S.exam.status='submitted'; }
    if(a==='new') pub();
    if(a==='story'){ pub(); S.story={step:2,done:false}; }
    if(a==='practice'){ seen(); drill(7,'mix'); }
    if(a==='done'){ seen(); drill(999,'mix'); } }
  else if(g==='rules'){ devUser(); S.exam=freshExam(); }
  else if(g==='exam'){ sit(a==='b2'||a==='img2'||a==='last'?1:0); const e=S.exam;
    if(a==='img') e.idx[0]=7; if(a==='img2') e.idx[1]=2; if(a==='long') e.idx[0]=14;
    if(a==='mid'){ QB(0).slice(0,22).forEach((q,k)=>{ e.passed[q.i]=true; if(k%5!==3) e.answers[q.i]=(q.a+(k%4===0?1:0))%4; if(k%7===2) e.flags[q.i]=true; }); e.idx[0]=22; }
    if(a==='grid'){ QB(0).slice(0,22).forEach((q,k)=>{ e.passed[q.i]=true; if(k%5!==3) e.answers[q.i]=q.a; if(k%7===2) e.flags[q.i]=true; }); e.idx[0]=22; after=examGrid; }
    if(a==='last'){ QB(1).forEach((q,k)=>{ e.passed[q.i]=true; if(k%6) e.answers[q.i]=q.a; }); e.idx[1]=NB[1]-1; after=finishExam; } }
  else if(g==='done'){ pub(); S.exam.status='submitted'; }
  else if(g==='story'){ pub(); const n=STEPS(), k=Math.max(0,n.indexOf(a)); S.story={step:k,done:k===n.length-1}; }
  else if(g==='practice'){ seen(); const lv=nextLevel()||'easy'; p={lv}; const c=pracCur(lv);
    if(c && a!=='explain' && a!=='end'){ const sq=SIM(c.qi); c.phase=a; if(a==='ok') c.pick=sq.a; if(a==='no') c.pick=(sq.a+1)%4; }
    if(a==='end'){ pracList(lv).forEach((i,k)=>{ const bk=k%3===1; S.practice.res[i]=bk?'basket':'ok'; if(bk) S.basket.push({id:1000+i,qi:i,from:`${DATA.exam.title} · ${qLabel(i)}`,my:S.exam.answers[i],sim:{pick:(SIM(i).a+1)%4},solved:false}); }); S.practice.cur=null; } }
  else if(g==='speed'){ seen(); const t=speedTopics()[0]||'numbers'; p={t}; const deck=speedDeck(t,4242);
    if(a==='intro') G={t,phase:'intro'};
    if(a==='count') G={t,qs:deck,k:0,lives:3,res:[],streak:0,used:0,phase:'count',count:2,frozen:true};
    if(a==='play') G={t,qs:deck,k:3,lives:2,res:['ok','ok','bad'],streak:0,used:21000,phase:'play',frozen:true,endsAt:Date.now()+9400};
    if(a==='streak') G={t,qs:deck,k:4,lives:3,res:['ok','ok','ok','ok','ok'],streak:5,used:24000,pick:deck[4].a,phase:'fb',frozen:true,endsAt:Date.now()+9000};
    if(a==='wrong') G={t,qs:deck,k:5,lives:1,res:['ok','bad','ok','ok','bad','bad'],streak:0,used:40000,pick:(deck[5].a+1)%4,phase:'fb',frozen:true,endsAt:Date.now()+3000};
    if(a==='lost') G={t,qs:deck,k:5,lives:0,res:['ok','bad','ok','ok','bad','bad'],streak:0,used:40000,phase:'lost'};
    if(a==='won'){ S.practice.speed[t]={won:true,best:52300,tries:2}; G={t,qs:deck,k:7,lives:2,res:['ok','ok','bad','ok','ok','ok','ok','ok'],streak:5,used:52300,record:true,phase:'won'}; } }
  else if(g==='exams'){ if(a==='before'){ devUser(); S.exam=freshExam(); S.story=null; S.practice=freshPractice(); } else { seen(); drill(a==='done'?999:5,'mix'); } }
  else if(g==='result'){ seen(); }
  else if(g==='report'){ seen(); name='result'; after=reportSheet; }
  else if(g==='answer'){ seen(); name='result'; after=()=>showAnswer(result().wrong[0] ?? 0); }
  else if(g==='leaderboard'){ if(a==='before'){ devUser(); S.exam=freshExam(); } else seen(); }
  else if(g==='basket'){ seen(); if(a!=='empty') drill(12,'mix'); if(a==='item'){ name='basketItem'; p={id:S.basket[0].id}; stack=[{name:'basket',p:{}}]; } if(a==='pdf') after=basketPdf; }
  else if(g==='profile'){ devUser(); }
  else if(g==='logout'){ devUser(); name='profile'; after=logoutAsk; }
  else if(g==='avatar'){ devUser(); name='profile'; after=pickAvatar; }
  else if(g==='reset'){ S=fresh(); auth(); name='login'; }
  if(['practice','speed','basket','basketItem','result','story','rules'].includes(name) && !stack.length) stack=[{name:name==='practice'||name==='speed'?'exams':'home',p:{}}];
  route={name,p}; save(); NAV='tab'; render(); scrollTo(0,0);
  if(after) setTimeout(after,350);
}
window.addEventListener('message', e=>{ const d=e.data && e.data.azmoun; if(d && d.go) devGo(d.go, d.perf); });
window.DEV = devGo;

render();
