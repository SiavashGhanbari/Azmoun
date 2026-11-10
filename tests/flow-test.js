// تست کامل مسیرها با Playwright:  node tests/flow-test.js
// از هر صفحه عکس می‌گیرد (tests/screens/) و خطاهای جاوااسکریپت و اسکرول افقی را گزارش می‌کند.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../index.html');
const out = path.resolve(__dirname, 'screens'); fs.mkdirSync(out, { recursive: true });

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errors = [], overflow = [];
  p.on('pageerror', e => errors.push(e.message));
  let n = 0;
  const shot = async (name, wait = 500) => {
    await p.waitForTimeout(wait);
    const w = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (w > 0) overflow.push(name + ':' + w);
    await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` });
  };
  const click = async (sel, wait = 450) => { await p.click(sel); await p.waitForTimeout(wait); };
  const btn = t => `button:has-text("${t}")`;

  await p.goto(URL); await p.evaluate(() => localStorage.clear()); await p.reload();
  await shot('login');
  // ثبت‌نام
  await click(btn('ثبت‌نام با کد دعوت'));
  await p.fill('#invite', 'AZ1405'); await click('#invBtn', 900);
  await p.fill('.qwrap input >> nth=0', 'سارا'); await p.fill('.qwrap input >> nth=1', 'احمدی');
  await p.fill('.qwrap input >> nth=2', '0012345679'); await click('#regBtn', 600);
  await click('#f-birth button'); await click('.sheet ' + btn('تأیید'), 500);
  await click('#f-gender ' + btn('دختر')); await click('#regBtn', 600);
  await click('#f-grade ' + btn('ششم'));
  await shot('register-school-empty');
  await click('#f-province button', 600); await shot('pick-province');
  await p.fill('#pq', 'اصف'); await shot('pick-province-search', 200);
  await click('.pick-it:visible >> nth=0', 500);
  await click('#f-city button', 600); await click('.pick-it >> nth=1', 500);
  await click('#f-school button', 600); await shot('pick-school'); await click('.pick-it >> nth=0', 500);
  await shot('register-school-filled');
  await click('#regBtn', 600);
  await p.fill('.qwrap input', '09121112233'); await click('#regBtn', 1100);
  await p.fill('#otp', '12345'); await p.waitForTimeout(1200);
  await shot('welcome');
  await click(btn('بعدی')); await click(btn('بعدی')); await click('.actions .btn-primary', 700);
  await shot('home-available', 900);
  await click(btn('دیدن رتبه‌بندی کامل'), 800); await shot('leaderboard-before', 900);
  await click('.nav button >> nth=0', 600);
  // آزمون
  await click(btn('شروع آزمون'), 600); await click(btn('شروع دفترچهٔ ۱'), 700);
  await shot('exam-q1');
  const answers = [2, 1, 3, 0, 2, 2, null, 2, 1, 2]; // دفترچهٔ ۱: سؤال ۸ تصویری
  for (let i = 0; i < 10; i++) {
    if (answers[i] !== null) await click(`.qwrap .opt >> nth=${answers[i]}`, 250);
    if (i === 7) await shot('exam-image-options');
    if (i === 3) { await click(btn('همهٔ سؤالات'), 600); await shot('exam-grid'); await p.evaluate(() => closeSheet()); await p.waitForTimeout(300); }
    if (i < 9) await click('.exam-foot .btn-primary', 350);
  }
  await click('.exam-foot .btn-primary', 500); await click('.sheet ' + btn('برو دفترچهٔ بعدی'), 700);
  const answers2 = [2, null, 1, 1, 0, 2, 1, 3, 1, 2];
  for (let i = 0; i < 10; i++) {
    if (answers2[i] !== null) await click(`.qwrap .opt >> nth=${answers2[i]}`, 250);
    if (i === 2) await shot('exam-image-options-2');
    if (i < 9) await click('.exam-foot .btn-primary', 350);
  }
  await click('.exam-foot .btn-primary', 500); await click('.sheet ' + btn('تحویل بده'), 900);
  await shot('done');
  await click(btn('برگشت به خانه'), 700); await shot('home-submitted');
  await click(btn('حالت تست: اعلام نتیجه'), 900); await shot('home-result-new', 900);
  // قصهٔ نتیجه
  await click(btn('دیدن نتیجهٔ آزمون'), 300); await shot('story-stats-start', 200); await shot('story-stats', 2400);
  await click('.actions .btn-primary', 300); await shot('story-cats', 1800);
  await click('.actions .btn-primary', 300); await shot('story-whatif', 2400);
  await click('.actions .btn-primary', 300); await shot('story-go', 900);
  await click('.actions .btn-primary', 600); await shot('review-read');
  await click(btn('متوجه شدم'), 500); await shot('review-answer');
  // اول گزینهٔ غلط، بعد درست
  const right = await p.evaluate(() => Q[result().wrong[S.story.k]].a);
  await click(`#rvCard .opt >> nth=${(right + 1) % 4}`, 500); await shot('review-wrong-pick');
  await click(`#rvCard .opt >> nth=${right}`, 250); await shot('review-star-flying', 250); await shot('review-got', 900);
  await click(btn('سؤال بعدی'), 600);
  // انداختن توی سبد با موشن
  await click(btn('متوجه نشدم'), 300); await shot('review-basket-flying', 120); await shot('review-after-basket', 1300);
  await click('#basketBtn', 600); await shot('story-peek-basket'); await p.evaluate(() => closeSheet()); await p.waitForTimeout(300);
  // خروج وسط مرور و ادامه از خانه
  await click('.st-x', 500); await shot('story-exit-sheet'); await click('.sheet ' + btn('بیرون می‌رم'), 900);
  await shot('home-story-progress', 900);
  await click(btn('ادامه بده'), 700); await shot('review-resumed');
  // بقیهٔ سؤال‌ها: یکی درمیان فهمیدم/سبد
  for (let g = 0; g < 30; g++) {
    const cur = await p.evaluate(() => STEPS()[S.story.step]); if (cur !== 'review') break;
    const k = await p.evaluate(() => S.story.k);
    if (k % 2) { await click(btn('متوجه نشدم'), 1500); }
    else { await click(btn('متوجه شدم'), 400); const a = await p.evaluate(() => Q[result().wrong[S.story.k]].a); await click(`#rvCard .opt >> nth=${a}`, 1200); await click('.actions .btn-primary', 700); }
  }
  await shot('story-end', 1600);
  await click(btn('دیدن سبد'), 800); await shot('basket');
  await click('.list-item >> nth=0', 700); await shot('basket-item');
  await p.evaluate(() => { stack = []; go('home', {}, false); }); await shot('home-done', 1000);
  await click('.card.tap', 800); await shot('result');
  await click('.nav button >> nth=3', 800).catch(() => {});
  await p.evaluate(() => tab('leaderboard')); await shot('leaderboard-after', 1000);
  await p.evaluate(() => tab('profile')); await shot('profile', 800);
  await p.evaluate(() => tab('exams')); await shot('exams', 800);
  console.log('errors', errors, 'overflow', overflow);
  await b.close();
})();
