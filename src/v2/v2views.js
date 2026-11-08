
/* ================================================================
   نسخهٔ دوم — لایهٔ ظاهری جدید. منطق اپ همان نسخهٔ اول است؛
   اینجا فقط صفحه‌ها و چند تابعِ سازندهٔ نشانه‌گذاری دوباره تعریف می‌شوند.
   ================================================================ */
const TOPIC_EMO = { pattern:'🔢', logic:'🧩', numbers:'➗', geometry:'📐', science:'🧪' };
const TOPIC_BG  = { pattern:'#FFE9D6', logic:'#E8E4FF', numbers:'#FFE1EA', geometry:'#DDF1FF', science:'#E2F5E6' };
const tile = (emo, bg) => `<span class="tile" style="--t:${bg}" aria-hidden="true">${emo}</span>`;
const go2 = () => `<span class="go" aria-hidden="true">${I.arrowL}</span>`;
const hd = (title, opt={}) => `<header class="hd sticky"><button class="ib" onclick="${opt.back||'back()'}" aria-label="${opt.close?'خروج':'بازگشت'}">${opt.close?I.close:I.back}</button><div class="hd-t">${title}</div>${opt.right||'<span class="ib-sp"></span>'}</header>`;
const ph = (title, sub='') => `<header class="ph sticky"><h1>${title}</h1>${sub?`<p class="sub">${sub}</p>`:''}</header>`;
const aura = (inner, cls='') => `<div class="aura ${cls}"><div class="glow" aria-hidden="true"></div><div class="aura-in">${inner}</div></div>`;
const emo = (e, cls='') => `<span class="big-emo ${cls}" aria-hidden="true">${e}</span>`;
const empty2 = (e, title, text) => `<div class="empty2">${aura(emo(e),'aura-sm')}<h2>${title}</h2><p class="sub">${text}</p></div>`;
const tags = list => `<div class="tags">${list.map(([t,c])=>`<span class="tg ${c||''}">${t}</span>`).join('')}</div>`;

// موج سؤال‌ها: هر میله یک سؤال؛ دو گروه برای دو دفترچه
const WH = Q.map((_,i)=> +(0.34 + 0.66*Math.abs(Math.sin(i*1.73+0.5))*(0.6+0.4*Math.abs(Math.cos(i*0.83)))).toFixed(2));
function wave(mode){
  const e=S.exam;
  return `<div class="wave ${mode}" aria-hidden="true">${BOOKLETS.map(b=>`<div class="wv-g">${QB(b).map(q=>{ const i=q.i;
    const c = mode==='result' ? (e.answers[i]===Q[i].a?'ok':'no') : mode==='exam' ? (passedOf(i)?'past':'') : '';
    return `<i class="${c}" style="--h:${WH[i]};--d:${(i*0.08).toFixed(2)}s"></i>`; }).join('')}</div>`).join('')}</div>`;
}
// پراگرس آزمون: موج کوچک؛ میله‌های ردشده تیره، سؤال فعلی نارنجی. فقط با دکمه جلو می‌رود.
function xwave(){
  const e=S.exam, cur=QB(e.booklet)[e.idx[e.booklet]].i, n=Q.filter((q,i)=>passedOf(i)).length;
  return `<div class="xw" role="img" aria-label="${fa(n)} از ${fa(Q.length)} سؤال">${BOOKLETS.map(b=>`<div class="xw-g">${QB(b).map(q=>`<i class="${passedOf(q.i)?'past':''} ${q.i===cur?'cur':''}" style="--h:${WH[q.i]}"></i>`).join('')}</div>`).join('')}</div>`;
}
const qBody2 = q => `<p class="q-text">${nob(q.q)}</p>${q.img?`<button class="q-img" onclick="zoomImg('${q.img}')"><img src="${ASSET[q.img]}" alt="شکل سؤال"><span class="zoom">${I.zoom}بزرگ‌نمایی</span></button>`:''}`;

function navbar(active){
  const items=[['home','خانه',I.home],['exams','آزمون‌ها',I.exam],['missions','مأموریت‌ها',I.mission],['leaderboard','رتبه‌بندی',I.rank],['profile','پروفایل',I.user]];
  return `<nav class="nav">${items.map(([k,l,ic])=>`<button class="${k===active?'on':''}" onclick="tab('${k}')" ${k===active?'aria-current="page"':''}>${ic}<span>${l}</span></button>`).join('')}</nav>`;
}
function burst(x, y){
  const colors=['#FF6A1A','#FF3E7F','#FFB21A','#17120F','#7CC6FF'];
  for(let i=0;i<24;i++){
    const d=document.createElement('i'); d.className='confetti'; d.style.left=x+'px'; d.style.top=y+'px'; d.style.background=colors[i%colors.length]; document.body.appendChild(d);
    const a=Math.random()*Math.PI*2, r=70+Math.random()*100;
    d.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r+60}px) scale(.4)`,opacity:0}],{duration:900+Math.random()*400,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>d.remove();
  }
}
function tickResend(){ const el=$('#resend'); if(!el) return; const left=L.resendAt-Date.now();
  el.innerHTML = left>0 ? `<span class="sub">ارسال دوبارهٔ کد تا <b class="ltr">${mmss(left)}</b></span>` : `<button class="b b-soft b-xs" onclick="resend()">ارسال دوبارهٔ کد</button>`; }
function slideQ(d, bumped){ render(); kick('.qwrap', d>0?'q-next':'q-prev'); if(bumped) kick('.xw i.cur','pop'); top0(); }

/* ---------- ورود ---------- */
V.login = () => `<div class="screen no-nav has-act">
    ${aura(`<div class="logo">آزمون</div>`,'aura-logo')}
    <div class="center-txt"><h1 class="h-xl">سلام! خوش اومدی</h1><p class="sub">شماره‌ای رو بزن که مدرسه برات ثبت کرده.</p></div>
    <div class="f" style="margin-top:22px"><label class="f-label" for="phone">شمارهٔ موبایل</label>
      <input id="phone" class="field ltr ${L.err?'err':''}" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" value="${fa(L.phone)}" oninput="onPhone(this)" onkeydown="if(event.key==='Enter')submitPhone()">
      ${L.err?`<div class="err-msg">${L.err}</div>`:''}</div>
    <div class="hint">حالت تست · کد پیامک: <b class="ltr">${fa(DATA.login.testCode)}</b> · شمارهٔ ثبت‌نشده: <b class="ltr">${fa(DATA.login.unregistered)}</b></div>
  </div>${actions(`<button id="phoneBtn" class="b b-ink" onclick="submitPhone()" ${L.phone.length===11?'':'disabled'}>دریافت کد</button>
    <button class="b b-soft" onclick="startRegister()">ثبت‌نام با کد دعوت</button>`)}`;

V.unregistered = () => `<div class="screen no-nav has-act">${hd('')}
    ${aura(emo('📱'),'aura-sm')}
    <div class="center-txt"><h1 class="h-l">این شماره ثبت نشده</h1><p class="sub">شمارهٔ <b class="ltr">${fmtPhone(L.phone)}</b> توی فهرست مدرسه نیست.</p></div>
    <ol class="steps-list"><li>اگه از مدرسه کد دعوت گرفتی، با همون ثبت‌نام کن.</li><li>اگه کد دعوت نداری، از پدر یا مادرت بخواه به دفتر مدرسه زنگ بزنن.</li></ol>
  </div>${actions(`<button class="b b-ink" onclick="startRegister()">ثبت‌نام با کد دعوت</button><button class="b b-soft" onclick="back()">وارد کردن شمارهٔ دیگه</button>`)}`;

V.otp = () => `<div class="screen no-nav has-act">${hd('')}
    <h1 class="h-xl">کد رو وارد کن</h1>
    <p class="sub">کد ۵ رقمی به <b class="ltr">${fmtPhone(L.phone)}</b> پیامک شد.</p>
    <button class="b b-soft b-xs" style="margin-top:10px" onclick="back()">${I.edit}اصلاح شماره</button>
    <div class="f" style="margin-top:26px"><input id="otp" class="field otp ltr ${L.err?'err':''}" type="tel" inputmode="numeric" autocomplete="one-time-code" maxlength="5" placeholder="•••••" oninput="onOtp(this)" aria-label="کد تأیید">
      ${L.err?`<div class="err-msg">${L.err}</div>`:''}</div>
    <div id="resend" class="resend"></div>
    <div class="hint">حالت تست · کد پیامک: <b class="ltr">${fa(DATA.login.testCode)}</b></div>
  </div>${actions(`<button class="b b-ink" id="otpBtn" onclick="submitOtp()" disabled>${L.mode==='register'?'تأیید و ورود':'ورود'}</button>`)}`;

/* ---------- ثبت‌نام ---------- */
V.invite = () => `<div class="screen no-nav has-act">${hd('ثبت‌نام')}
    ${aura(emo('🔑'),'aura-sm')}
    <div class="center-txt"><h1 class="h-l">کد دعوت داری؟</h1><p class="sub">کد دعوتی که از مدرسه گرفتی رو وارد کن.</p></div>
    <div class="f" style="margin-top:20px"><input id="invite" class="field ltr code ${R.errs.invite?'err':''}" maxlength="10" autocomplete="off" autocapitalize="characters" placeholder="------" value="${esc(R.invite)}" oninput="onInvite(this)" onkeydown="if(event.key==='Enter')submitInvite()" aria-label="کد دعوت">
      ${R.errs.invite?`<div class="err-msg">${R.errs.invite}</div>`:''}</div>
    <div class="hint">حالت تست · کد دعوت: <b class="ltr">${DATA.login.invite}</b></div>
  </div>${actions(`<button class="b b-ink" id="invBtn" onclick="submitInvite()" ${R.invite.trim()?'':'disabled'}>ادامه</button>`)}`;

const pickTiles = (key, list, emos) => `<div class="ch2">${list.map((g,i)=>`<button class="cht ${R[key]===g?'on':''}" onclick="setR('${key}','${g}')" aria-pressed="${R[key]===g}"><span class="cht-e" aria-hidden="true">${emos[i]}</span>${g}</button>`).join('')}</div>`;
const FIELDS2 = {
  first: () => fld('first','نام',`<input class="field txt ${R.errs.first?'err':''}" value="${esc(R.first)}" autocomplete="given-name" onkeydown="if(event.key==='Enter')regNext()" oninput="R.first=this.value;clr('first')">`),
  last:  () => fld('last','نام خانوادگی',`<input class="field txt ${R.errs.last?'err':''}" value="${esc(R.last)}" autocomplete="family-name" onkeydown="if(event.key==='Enter')regNext()" oninput="R.last=this.value;clr('last')">`),
  nid:   () => fld('nid','کد ملی',`<input class="field ltr ${R.errs.nid?'err':''}" type="tel" inputmode="numeric" maxlength="10" placeholder="۰۰۱۲۳۴۵۶۷۹" value="${fa(R.nid)}" onkeydown="if(event.key==='Enter')regNext()" oninput="onDigits(this,'nid',10)">`),
  phone: () => fld('phone','شمارهٔ موبایل',`<input class="field ltr ${R.errs.phone?'err':''}" type="tel" inputmode="numeric" maxlength="11" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" value="${fa(R.phone)}" onkeydown="if(event.key==='Enter')regNext()" oninput="onDigits(this,'phone',11)">`),
  birth: () => fld('birth','تاریخ تولد',`<button class="field field-btn ${R.errs.birth?'err':''}" onclick="openDate()">${R.birth?`<span>${fmtDate(R.birth)}</span>`:'<span class="ph-t">انتخاب کن</span>'}${I.down}</button>`),
  gender:() => fld('gender','جنسیت', pickTiles('gender', DATA.genders, ['👧','👦'])),
  grade: () => fld('grade','کلاس', pickTiles('grade', DATA.grades, ['🎒','📚'])),
  city:  () => fld('city','شهر',`<div class="chips">${DATA.cities.map(c=>`<button class="${R.city===c?'on':''}" onclick="setR('city','${c}')" aria-pressed="${R.city===c}">${c}</button>`).join('')}</div>`),
};
V.register = () => { const st=REG_STEPS[R.step], last=R.step===REG_STEPS.length-1;
  return `<div class="screen no-nav has-act">
    <div class="sticky reg-hd"><div class="hd"><button class="ib" onclick="regBack()" aria-label="بازگشت">${I.back}</button><div class="hd-t">${fa(R.step+1)} از ${fa(REG_STEPS.length)}</div><span class="ib-sp"></span></div>
      <div class="steps" aria-hidden="true">${REG_STEPS.map((_,i)=>`<i class="${i<R.step?'done':i===R.step?'cur':''}"></i>`).join('')}</div></div>
    <div class="qwrap">
      <h1 class="h-xl" style="margin-top:18px">${st.title}</h1><p class="sub" style="margin-bottom:22px">${st.sub}</p>
      ${st.keys.map(k=>FIELDS2[k]()).join('')}
      ${R.step===0?`<div class="hint" style="margin-top:20px">حالت تست · یه کد ملی معتبر: <b class="ltr">${fa('0012345679')}</b></div>`:''}
    </div>
  </div>${actions(`<button class="b b-ink" id="regBtn" onclick="regNext()">${last?'ارسال کد تأیید':'ادامه'}</button>`)}`; };

/* ---------- معرفی ---------- */
const WELCOME2 = [
  { m:()=>wave('idle'), title:'آزمون بده، هر جا که هستی', text:'هر میله یه سؤاله. آزمون‌های مدرسه رو همین‌جا بده؛ دفترچه‌ها تایمر دارن و سؤال سخت رو می‌تونی علامت بزنی.' },
  { m:()=>emo('🏆'), title:'نتیجه و رتبه‌ت رو ببین', text:'بعد از اعلام نتیجه، نمره‌ت، راه‌حل سؤال‌هایی که اشتباه زدی و رتبه‌ت بین بچه‌های مدرسه رو می‌بینی.' },
  { m:()=>emo('🎯'), title:'از اشتباه‌هات یاد بگیر', text:'از روی اشتباه‌هات مأموریت ساخته می‌شه. هر سؤالی هم برات حل نشد، می‌ذاریش توی سبد تا از معلمت بپرسی.' },
];
V.welcome = () => { const s=WELCOME2[W], last=W===WELCOME2.length-1;
  return `<div class="screen no-nav has-act" id="wel">
    <div class="row between" style="min-height:44px">${W===0?'<span class="tg ok">ثبت‌نامت کامل شد</span>':'<span></span>'}${last?'<span></span>':'<button class="b b-soft b-xs" onclick="endWelcome()">رد شدن</button>'}</div>
    <div class="qwrap">${aura(s.m(),'aura-xl')}
      <div class="center-txt"><h1 class="h-xl">${s.title}</h1><p class="sub lead">${nob(s.text)}</p></div></div>
  </div>${actions(`<div class="dots">${WELCOME2.map((_,i)=>`<button class="${i===W?'on':''}" onclick="wGo(${i})" aria-label="مرحلهٔ ${fa(i+1)}"></button>`).join('')}</div>
    <button class="b b-ink" onclick="wNext()">${last?`بزن بریم، ${esc(me().first)}!`:'بعدی'}</button>`)}`; };

/* ---------- خانه ---------- */
V.home = () => {
  const st=S.exam.status, s=me(), r=st==='published'?result():null, am=activeMission(), nb=openBasket().length;
  let mode='idle', body='';
  if(st==='available') body=`<h1 class="h-xl">اولین آزمونت آماده‌ست</h1>${tags([[DATA.exam.title],[`${fa(Q.length)} سؤال`],[`${fa(DATA.exam.booklets.reduce((a,x)=>a+x.minutes,0))} دقیقه`],['رایگان','ok']])}
      <button class="b b-ink" onclick="go('rules')">شروع آزمون</button>`;
  if(st==='inProgress'){ mode='exam'; body=`<h1 class="h-xl">آزمونت نیمه‌کاره‌ست</h1>${tags([[`دفترچهٔ ${fa(S.exam.booklet+1)}`],[`${mmss(timeLeft())} وقت مونده`]])}
      <button class="b b-ink" onclick="go('exam')">ادامهٔ آزمون</button>`; }
  if(st==='submitted'){ mode='wait'; body=`<h1 class="h-xl">منتظر نتیجه‌ایم</h1><p class="sub">نتیجهٔ ${DATA.exam.title} ${DATA.exam.resultAt} اعلام می‌شه.</p>
      <button class="b b-soft b-sm" onclick="publish()" style="color:var(--o-dk)">حالت تست: اعلام نتیجه</button>`; }
  if(st==='published'){ mode='result'; body=`<div class="score"><span data-count="${pct(r.correct,r.total)}" data-suffix="٪">${fa(pct(r.correct,r.total))}٪</span></div>
      <p class="sub">رتبهٔ <b data-count="${r.rank}" data-from="${TOTAL}">${fa(r.rank)}</b> از ${fa(TOTAL)} در مدرسه</p>
      <button class="b b-ink" onclick="go('result')">دیدن کارنامه</button>`; }
  return `<div class="screen">
    <header class="home-hd sticky"><div><div class="logo sm">آزمون</div></div><button class="avb" onclick="tab('profile')" aria-label="پروفایل"><img src="${avatar()}" alt=""></button></header>
    <section class="hero">${aura(wave(mode),'aura-wave')}
      <p class="eyebrow">سلام ${esc(s.first)} · پایهٔ ${esc(s.grade)}</p>${body}</section>
    <section class="sec">
      <div class="t3">
        <button onclick="tab('missions')"><span class="t3-e" aria-hidden="true">🎯</span><b>مأموریت‌ها</b><small>${st!=='published'?'بعد از نتیجه':am?`${fa(missionList().filter(m=>!S.missions.done.includes(m.id)).length)} تا مونده`:'همه انجام شد'}</small></button>
        <button onclick="go('basket')"><span class="t3-e" aria-hidden="true">💬</span><b>از معلم می‌پرسم</b><small>${nb?`${fa(nb)} سؤال`:'خالیه'}</small>${nb?`<span class="dot">${fa(nb)}</span>`:''}</button>
        <button onclick="tab('leaderboard')"><span class="t3-e" aria-hidden="true">🏆</span><b>رتبه‌بندی</b><small>${r?`${fa(r.rank)} از ${fa(TOTAL)}`:`${fa(OTHERS.length)} نفر`}</small></button>
      </div>
    </section>
    ${am?`<section class="sec"><h2 class="sec-t">ادامه بده</h2><div class="rows">
      <button class="r" onclick="openMission('${am.id}')">${tile(TOPIC_EMO[am.id],TOPIC_BG[am.id])}<span class="grow r-t"><b>${am.title}</b><span class="r-s">مأموریت · سطح ${DIFF[am.level]} · ${fa(am.qs.length)} سؤال</span></span>${go2()}</button></div></section>`:''}
  </div>${navbar('home')}`;
};

/* ---------- آزمون‌ها ---------- */
V.exams = () => {
  const st=S.exam.status, r=st==='published'?result():null;
  const chip={available:['قابل شرکت','ok'],inProgress:['نیمه‌کاره',''],submitted:['در انتظار نتیجه','gray'],published:['نتیجه آمده','']}[st];
  const sub={available:`${examMeta()}${DATA.exam.free?' · رایگان':''}`,inProgress:`${mmss(timeLeft())} از دفترچهٔ ${fa(S.exam.booklet+1)} مونده`,submitted:`نتیجه: ${DATA.exam.resultAt}`,published:r?`${fa(r.correct)} از ${fa(Q.length)} درست · رتبهٔ ${fa(r.rank)}`:''}[st];
  const act={available:"go('rules')",inProgress:"go('exam')",submitted:"examWait()",published:"go('result')"}[st];
  return `<div class="screen">${ph('آزمون‌ها','آزمون‌های مدرسه‌ت، از جدید به قدیم.')}
    <div class="rows">
      <button class="r" onclick="${act}">${tile('📝','#FFE9D6')}<span class="grow r-t"><b>${DATA.exam.title}</b><span class="r-s">${sub}</span></span><span class="tg ${chip[1]}">${chip[0]}</span>${go2()}</button>
      ${DATA.otherExams.map((e,i)=>`<button class="r" onclick="otherExam(${i})">${tile(e.state==='upcoming'?'🗓️':'⌛',e.state==='upcoming'?'#DDF1FF':'#EFEAE4')}<span class="grow r-t"><b>${e.title}</b><span class="r-s">${e.note}</span></span><span class="tg gray">${e.state==='upcoming'?'هنوز شروع نشده':'مهلت گذشته'}</span>${go2()}</button>`).join('')}
    </div>
  </div>${navbar('exams')}`;
};

/* ---------- قوانین ---------- */
V.rules = () => { const b=DATA.exam.booklets; return `<div class="screen no-nav has-act">${hd('قبل از شروع')}
  <h1 class="h-xl">${DATA.exam.title}</h1>${tags([[`${fa(Q.length)} سؤال`],[`${fa(b.reduce((a,x)=>a+x.minutes,0))} دقیقه`],['چهارگزینه‌ای'],['بدون نمرهٔ منفی','ok']]).replace('class="tags"','class="tags start"')}
  <section class="sec"><h2 class="sec-t">${fa(b.length)} تا دفترچه، پشت سر هم</h2>
    <ol class="bk">${b.map((x,i)=>`<li><span class="bk-n">${fa(i+1)}</span><span class="grow"><b>${x.title}</b><span class="r-s">${fa(QB(i).length)} سؤال · ${fa(x.minutes)} دقیقه</span></span></li>`).join('')}</ol>
    <p class="sub">وقتی بری دفترچهٔ بعدی، دیگه به دفترچهٔ قبلی برنمی‌گردی.</p></section>
  <section class="sec"><h2 class="sec-t">چند تا نکته</h2><div class="rows">
    <div class="r static">${tile('🚩','#FFE9D6')}<span class="grow r-t"><b>سؤال سخت؟ علامت بزن</b><span class="r-s">بعداً از شبکهٔ سؤال‌ها راحت پیداش می‌کنی.</span></span></div>
    <div class="r static">${tile('⏱️','#E8E4FF')}<span class="grow r-t"><b>تایمر متوقف نمی‌شه</b><span class="r-s">با بستن اپ هم ادامه داره، ولی جواب‌هات ذخیره می‌مونه.</span></span></div>
    <div class="r static">${tile('↩️','#E2F5E6')}<span class="grow r-t"><b>پاک کردن جواب</b><span class="r-s">دوباره روی همون گزینه بزن.</span></span></div>
  </div></section>
  </div>${actions(`<button class="b b-ink" onclick="startExam()">شروع دفترچهٔ ۱</button>`)}`; };

/* ---------- آزمون ---------- */
V.exam = () => {
  const e=S.exam, b=e.booklet, list=QB(b), k=e.idx[b], q=list[k], gi=q.i, left=timeLeft(), last=k===list.length-1, lastB=b===BOOKLETS.length-1;
  const long=q.o.some(o=>o.length>14);
  return `<div class="screen no-nav exam2">
    <div class="sticky ex-hd"><div class="ex-top"><button class="ib" onclick="leaveExam()" aria-label="خروج">${I.close}</button>
      <div class="ex-t"><b>دفترچهٔ ${fa(b+1)}</b><span>${DATA.exam.booklets[b].title}</span></div>
      <span class="timer ${left<180000?'low':''}" id="timer">${mmss(left)}</span></div>${xwave()}</div>
    <div class="qwrap">
      <div class="q-meta"><span class="qn">سؤال ${fa(k+1)}<small> از ${fa(list.length)}</small></span>
        <button class="b b-soft b-xs ${e.flags[gi]?'flag-on':''}" onclick="toggleFlag(${gi})" aria-pressed="${e.flags[gi]}">${I.flag}${e.flags[gi]?'علامت خورده':'علامت بزن'}</button></div>
      ${qBody2(q)}
      <div class="ans ${long?'one':''}">${q.o.map((o,j)=>{ const on=e.answers[gi]===j; return `<button class="at ${on?'sel':''}" onclick="pick(${gi},${j})" aria-pressed="${on}"><span class="at-n">${fa(j+1)}</span><span class="at-t">${o}</span>${on?'<span class="at-ck" aria-hidden="true">✓</span>':''}</button>`; }).join('')}</div>
    </div>
  </div>
  <div class="actions row">
    <button class="b b-soft b-sq" onclick="examGrid()" aria-label="همهٔ سؤال‌ها">${I.grid}</button>
    <button class="b b-soft" onclick="move(-1)" ${k===0?'disabled':''}>قبلی</button>
    ${last?`<button class="b b-ink" onclick="${lastB?'finishExam()':'toNextBooklet()'}">${lastB?'پایان آزمون':'دفترچهٔ بعدی'}</button>`
          :`<button class="b b-ink" onclick="move(1)">بعدی</button>`}
  </div>`;
};
V.done = () => `<div class="screen no-nav has-act">
  ${aura(`<div class="success-ic">${I.check}</div>`,'aura-xl')}
  <div class="center-txt"><h1 class="h-xl">آزمونت تحویل داده شد</h1>
  <p class="sub lead">${route.p.auto?'وقت تموم شد و جواب‌هات خودکار ثبت شد. ':''}نتیجه ${DATA.exam.resultAt} اعلام می‌شه.</p></div></div>
  ${actions(`<button class="b b-ink" onclick="tab('home')">برگشت به خانه</button>`)}`;

/* ---------- کارنامه ---------- */
V.result = () => {
  if(S.exam.status!=='published') return `<div class="screen no-nav">${hd('کارنامه')}${empty2('⏰','نتیجه هنوز نیومده',`نتیجه ${DATA.exam.resultAt} اعلام می‌شه.`)}</div>`;
  const r=result(), am=activeMission();
  return `<div class="screen no-nav">${hd('کارنامهٔ '+DATA.exam.title)}
    <h1 class="h-xl">${r.correct>=r.total*0.75?'آفرین':'خسته نباشی'} ${esc(me().first)}!</h1><p class="sub">کارنامهٔ ${DATA.exam.title} آماده‌ست.</p>
    ${aura(wave('result'),'aura-wave sm')}
    <p class="legend2"><i class="lg-ok"></i>درست <i class="lg-no"></i>غلط یا بی‌جواب</p>
    <div class="rows kv">
      <div class="r static"><span class="grow">جواب درست</span><b class="v"><span data-count="${r.correct}">${fa(r.correct)}</span> از ${fa(r.total)}</b></div>
      <div class="r static"><span class="grow">نمره</span><b class="v" data-count="${pct(r.correct,r.total)}" data-suffix="٪">${fa(pct(r.correct,r.total))}٪</b></div>
      <button class="r" onclick="tab('leaderboard')"><span class="grow">رتبه در مدرسه</span><b class="v">${fa(r.rank)} از ${fa(TOTAL)}</b>${go2()}</button>
    </div>
    <section class="sec"><h2 class="sec-t">بر اساس سطح سؤال</h2>
      <div class="rows">${['easy','medium','hard'].map(d=>{ const [c,t]=r.by[d], miss=t-c, hs=r.correct+miss;
        return `<div class="r static col"><div class="row between"><b>${DIFF[d]}</b><b class="v">${fa(c)}/${fa(t)}</b></div><div class="mb"><i style="width:${pct(c,t)}%"></i></div>
          <span class="r-s">${miss?`اگه ${fa(miss)} سؤالِ ${DIFF[d]} رو هم درست زده بودی: <b>رتبهٔ ${fa(rankOf(hs))}</b> · ${fa(pct(hs,r.total))}٪`:'همهٔ سؤال‌های این سطح رو درست زدی.'}</span></div>`; }).join('')}</div>
      <p class="note2">${I.info}<span>رتبه‌های بالا فرضی‌ان و فقط برای مقایسه‌ن؛ توی رتبه‌بندی ثبت نمی‌شن.</span></p></section>
    ${am?`<button class="promo" onclick="openMission('${am.id}')"><span class="promo-e" aria-hidden="true">${TOPIC_EMO[am.id]}</span><span class="grow"><small>مأموریت بعدی</small><b>${am.title}</b></span><span class="b b-white b-xs">شروع</span></button>`:''}
    ${r.wrong.length?`<section class="sec"><h2 class="sec-t">اشتباه‌ها و بی‌جواب‌ها</h2><p class="sub">روی هر سؤال بزن تا جواب درست و راه‌حلش رو ببینی.</p>
      <div class="rows">${r.wrong.map(i=>{ const my=S.exam.answers[i]; return `<button class="r" onclick="showAnswer(${i})">${my===null?tile('–','#EFEAE4'):tile('✕','#FDE3DE').replace('class="tile"','class="tile bad"')}<span class="grow r-t"><b>سؤال ${fa(i+1)} · ${DIFF[Q[i].d]}</b><span class="r-s clip">${Q[i].q}</span></span>${go2()}</button>`; }).join('')}</div></section>`:''}
  </div>`;
};

/* ---------- رتبه‌بندی ---------- */
V.leaderboard = () => {
  const st=S.exam.status, pub=st==='published', r=pub?result():null;
  const mine = pub ? {name:'تو', score:r.correct, me:true, av:S.avatar} : null;
  const all=[...OTHERS, ...(mine?[mine]:[])].sort((a,b)=>b.score-a.score || (a.me?-1:b.me?1:0));
  all.forEach(x=>x.rank=1+all.filter(o=>o.score>x.score).length);
  const pd=(x,c)=>`<div class="pd ${c} ${x.me?'me':''}">${c==='p1'?'<span class="crown" aria-hidden="true">👑</span>':''}<img src="${avatar(x.av)}" alt=""><b>${x.me?'تو':x.name}</b><small>${fa(x.score)} از ${fa(Q.length)}</small><div class="bk2">${fa(x.rank)}</div></div>`;
  const mi=mine?all.indexOf(mine):-1;
  const show=[...new Set((mine?[3,4,mi-1,mi,mi+1]:[3,4,5,6,7,8,9]).filter(i=>i>=3&&i<all.length))].sort((a,b)=>a-b);
  let rows='', prev=2; show.forEach(i=>{ if(i>prev+1) rows+='<div class="gap">···</div>'; const x=all[i]; rows+=`<div class="r static lb ${x.me?'me':''}"><span class="rk">${fa(x.rank)}</span><img src="${avatar(x.av)}" alt=""><span class="grow">${x.me?'<b>تو</b>':x.name}</span><span class="r-s">${fa(x.score)} از ${fa(Q.length)}</span></div>`; prev=i; });
  const myRow = pub ? `<div class="mypos"><img src="${avatar()}" alt=""><span class="grow">جایگاه تو</span><b><span data-count="${r.rank}" data-from="${TOTAL}">${fa(r.rank)}</span> از ${fa(TOTAL)}</b></div>`
    : `<div class="mypos"><img src="${avatar()}" alt=""><span class="grow"><b>تو هنوز رتبه نداری</b><span class="r-s">${st==='submitted'?`بعد از اعلام نتیجه (${DATA.exam.resultAt}) میای اینجا.`:'بعد از آزمون و اعلام نتیجه میای اینجا.'}</span></span>
       ${st==='available'?`<button class="b b-ink b-xs" onclick="go('rules')">شروع آزمون</button>`:st==='inProgress'?`<button class="b b-ink b-xs" onclick="go('exam')">ادامه</button>`:''}</div>`;
  return `<div class="screen">${ph('رتبه‌بندی مدرسه',`${DATA.exam.title} · ${fa(all.length)} شرکت‌کننده`)}
    ${aura(`<div class="pod3">${pd(all[1],'p2')}${pd(all[0],'p1')}${pd(all[2],'p3')}</div>`,'aura-pod')}
    ${myRow}
    <div class="rows">${rows}</div>
    <p class="note2">${I.info}<span>رتبه فقط از نمرهٔ آزمون حساب می‌شه. مأموریت‌ها و سبد سؤال رتبه رو تغییر نمی‌دن.</span></p>
  </div>${navbar('leaderboard')}`;
};

/* ---------- پروفایل ---------- */
V.profile = () => { const s=me(), ph2=S.phone||'09121234567'; return `<div class="screen">
    ${aura(`<div class="pf-av"><img class="avatar" src="${avatar()}" alt="عکس پروفایل"><button class="ib edit" onclick="pickAvatar()" aria-label="تغییر عکس">${I.cam}</button></div>`,'aura-pf')}
    <div class="center-txt"><h1 class="h-l">${esc(s.first)} ${esc(s.last)}</h1><p class="sub">پایهٔ ${esc(s.grade)} · ${esc(s.city)} · <span class="ltr">${maskPhone(ph2)}</span></p></div>
    <section class="sec"><h2 class="sec-t">حساب کاربری</h2><div class="grp">
      <button class="r" onclick="pickAvatar()">${tile('🖼️','#FFE9D6')}<span class="grow r-t"><b>عکس پروفایل</b></span>${go2()}</button>
      <button class="r" onclick="soon()">${tile('✏️','#E8E4FF')}<span class="grow r-t"><b>ویرایش اطلاعات</b></span>${go2()}</button>
      <button class="r" onclick="soon()">${tile('💌','#DDF1FF')}<span class="grow r-t"><b>پیام‌ها و پشتیبانی</b></span>${go2()}</button>
      <button class="r" onclick="soon()">${tile('💳','#E2F5E6')}<span class="grow r-t"><b>مالی و اطلاعات پرداخت</b></span>${go2()}</button>
      <button class="r" onclick="logout()">${tile('🚪','#FDE3DE')}<span class="grow r-t"><b class="bad-t">خروج از حساب</b></span></button>
    </div></section>
    <div class="test-row"><button class="b b-soft b-xs" onclick="retakeExam()">حالت تست: دوباره آزمون بده</button><button class="b b-soft b-xs" onclick="resetDemo()">حالت تست: پاک کردن همه‌چیز</button></div>
  </div>${navbar('profile')}`; };

/* ---------- مأموریت‌ها ---------- */
V.missions = () => {
  if(S.exam.status!=='published') return `<div class="screen">${ph('مأموریت‌ها')}${empty2('🎯','هنوز مأموریتی نداری','بعد از اعلام نتیجهٔ آزمون، از روی اشتباه‌هات مأموریت‌های تمرینی برات ساخته می‌شه.')}</div>${navbar('missions')}`;
  const list=missionList();
  if(!list.length) return `<div class="screen">${ph('مأموریت‌ها')}${empty2('🌟','تمرین جبرانی نداری','همهٔ سؤال‌های آزمون رو درست جواب دادی!')}</div>${navbar('missions')}`;
  const isDone=m=>S.missions.done.includes(m.id), doneN=list.filter(isDone).length, sug=list.findIndex(m=>!isDone(m));
  return `<div class="screen">${ph('مأموریت‌ها',`از روی اشتباه‌های ${DATA.exam.title}. هر کدوم رو خواستی شروع کن.`)}
    <div class="prog-line"><span>${fa(doneN)} از ${fa(list.length)} انجام شد</span><div class="mb"><i style="width:${pct(doneN,list.length)}%"></i></div></div>
    <div class="rows">${list.map((m,i)=>{ const d=isDone(m); return `<button class="r ${d?'done':''}" onclick="openMission('${m.id}')">${tile(TOPIC_EMO[m.id],TOPIC_BG[m.id])}
      <span class="grow r-t"><b>${m.title}${!d&&i===sug?' <span class="tg">پیشنهاد</span>':''}</b><span class="r-s">سطح ${DIFF[m.level]} · ${fa(m.qs.length)} سؤال${d?' · انجام شد':''}</span><span class="mb"><i style="width:${d?100:0}%"></i></span></span>
      ${d?`<span class="go ok" aria-hidden="true">${I.check}</span>`:go2()}</button>`; }).join('')}</div>
    ${sug<0?empty2('🌟','همهٔ مأموریت‌ها تموم شد!','آفرین. مأموریت‌های جدید بعد از آزمون بعدی میان.'):''}
    <p class="note2">${I.info}<span>مأموریت‌ها رتبه رو تغییر نمی‌دن؛ رتبه فقط از آزمون حساب می‌شه.</span></p>
  </div>${navbar('missions')}`;
};
V.mission = () => {
  const m=curMission(); if(!m) return V.missions();
  if(M.view==='learn') return `<div class="screen no-nav has-act">${hd('آموزش')}
    ${aura(emo(TOPIC_EMO[m.id]),'aura-sm')}
    <div class="center-txt"><span class="tg">سطح ${DIFF[m.level]}</span><h1 class="h-xl" style="margin-top:8px">${m.title}</h1></div>
    <p class="lesson">${nob(m.learn)}</p>
    <p class="sub center-txt">بعدش ${fa(m.qs.length)} سؤال سنجش داری. اگه سؤالی سخت بود، می‌ذاریش توی سبد تا از معلمت بپرسی.</p>
  </div>${actions(`<button class="b b-ink" onclick="M.view='quiz';rerender('fwd')">شروع سؤال‌ها</button>`)}`;
  const q=m.qs[M.k], locked=M.wrong!==null||M.right!==null||M.finished;
  const act = M.finished ? actions(finishActs())
            : M.wrong!==null ? actions(`<button class="b b-ink" onclick="retryQ()">دوباره جواب می‌دم</button><div class="row2"><button class="b b-soft" onclick="lessonSheet()">مرور آموزش</button><button class="b b-soft" onclick="askTeacher()">از معلم می‌پرسم</button></div>`)
            : M.right!==null ? actions(`<button class="b b-ink" onclick="nextQ()">سؤال بعدی</button>`) : '';
  return `<div class="screen no-nav ${act?'has-act':''}">${hd(`${fa(M.k+1)} از ${fa(m.qs.length)}`,{right:M.finished?'<span class="tg ok">تموم شد</span>':'<span class="ib-sp"></span>'})}
    <div class="qwrap">
      <p class="sub center-txt">${m.title} · جواب درست رو انتخاب کن</p>
      ${aura(emo(TOPIC_EMO[m.id]),'aura-q')}
      <p class="q-text center">${nob(q.q)}</p>
      <div class="wcs">${q.o.map((o,j)=>`<button class="wc ${M.wrong===j?'wrong':''} ${M.right===j?'right':''}" ${locked?'disabled':''} onclick="answerMission(${j})">${M.right===j?'✓ ':M.wrong===j?'✕ ':''}${o}</button>`).join('')}</div>
      ${M.wrong!==null&&!M.finished?`<p class="sub center-txt bad-t" style="margin-top:14px">این جواب درست نبود. می‌خوای چی کار کنی؟</p>`:''}
    </div></div>${act}`;
};

/* ---------- سبد ---------- */
V.basket = () => { const open=openBasket(), solved=S.basket.length-open.length;
  return `<div class="screen no-nav">${hd('از معلم می‌پرسم')}
    ${open.length?`<p class="sub">این سؤال‌ها رو سر کلاس از معلمت بپرس.</p><div class="rows">${open.map(b=>`<button class="r" onclick="go('basketItem',{id:${b.id}})">${tile('💬','#E3ECFF')}<span class="grow r-t"><b class="clip">${b.q}</b><span class="r-s">${b.mission}</span></span>${go2()}</button>`).join('')}</div>`
      :empty2('💬','سبدت خالیه','وقتی توی مأموریت سؤالی برات حل نشد، با «از معلم می‌پرسم» بیارش اینجا.')}
    ${solved?`<p class="sub center-txt" style="margin-top:16px">${fa(solved)} سؤال حل‌شده از سبد بیرون رفته.</p>`:''}
  </div>`; };
V.basketItem = () => { const b=S.basket.find(x=>x.id===route.p.id); if(!b) return V.basket();
  return `<div class="screen no-nav has-act">${hd('سؤال من')}
    <span class="tg">${b.mission}</span>
    <p class="q-text" style="margin-top:12px">${nob(b.q)}</p>
    <div class="rows">${b.o.map((o,j)=>`<div class="r static">${tile(fa(j+1), b.my===j?'#17120F':'#EFEAE4').replace('class="tile"',b.my===j?'class="tile inv"':'class="tile"')}<span class="grow">${o}</span>${b.my===j?'<span class="tg gray">جواب من</span>':''}</div>`).join('')}</div>
    <p class="note2">${I.info}<span>این سؤال رو سر کلاس یا از همون راهی که با معلمت در ارتباطی بپرس.</span></p>
    <h2 class="sec-t" style="margin-top:18px">اشکالت رفع شد؟</h2>
  </div>${actions(`<button class="b b-ink" onclick="solve(${b.id})">آره، حل شد</button><div class="row2"><button class="b b-soft" onclick="back();toast('سؤال برای پیگیری توی سبد می‌مونه')">هنوز نه</button><button class="b b-soft bad-t" onclick="removeItem(${b.id})">حذف از سبد</button></div>`)}`; };
