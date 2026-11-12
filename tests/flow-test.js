// تست با Playwright:  node tests/flow-test.js
// همهٔ حالت‌های پنل پیش‌نمایش را در دو اندازهٔ iPhone 13 و iPhone SE باز می‌کند، عکس می‌گیرد (tests/screens/)
// و خطاهای جاوااسکریپت و اسکرول افقی را گزارش می‌کند. بعد چند مسیر را با کلیک واقعی می‌رود.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const ROOT = path.resolve(__dirname, '..'), URL = 'file://' + ROOT + '/index.html';
const out = path.resolve(__dirname, 'screens'); fs.rmSync(out, { recursive:true, force:true }); fs.mkdirSync(out, { recursive:true });
const IDS = [...fs.readFileSync(ROOT + '/preview.html', 'utf8').matchAll(/\['([a-z0-9:]+)','/g)].map(m => m[1]);
const SIZES = { i13:[390,844], se:[375,667] };

(async () => {
  const b = await chromium.launch(); const errors = [], overflow = [];
  for (const [dev,[w,h]] of Object.entries(SIZES)) {
    const p = await b.newPage({ viewport:{ width:w, height:h }, deviceScaleFactor:1 });
    p.on('pageerror', e => errors.push(dev + ' ' + e.message));
    await p.goto(URL); await p.evaluate(() => localStorage.clear()); await p.reload();
    for (const perf of ['mid','strong','weak']) for (const id of IDS) {
      if (perf !== 'mid' && !/^(story|home:new|result|exams$|practice:explain)/.test(id)) continue;
      await p.evaluate(([id,perf]) => DEV(id,perf), [id,perf]); await p.waitForTimeout(perf==='mid' ? 700 : 250);
      const ow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ow > 0) overflow.push(`${dev} ${id} ${perf}: ${ow}`);
      if (perf === 'mid') await p.screenshot({ path:`${out}/${dev}-${id.replace(':','-')}.png` });
    }
    if (dev === 'i13') { // مسیرهای کلیکی
      const click = async (s, t=450) => { await p.click(s); await p.waitForTimeout(t); }, btn = t => `button:has-text("${t}")`;
      await p.evaluate(() => DEV('story:stats','mid')); await p.waitForTimeout(400);
      for (let i=0;i<4;i++) await click('.actions .btn-primary');
      await click('.st-top .icon-btn'); await click('.actions .btn-primary');
      await click(btn('شروع تمرین'), 700);
      await click(btn('حالا یه سؤال مشابه حل کن'));
      let a = await p.evaluate(() => SIM(S.practice.cur.qi).a); await click(`#rvCard .opt >> nth=${a}`, 600);
      await p.screenshot({ path:`${out}/flow-practice-ok.png` }); await click(btn('سؤال بعدی'));
      await click(btn('حالا یه سؤال مشابه حل کن'));
      a = await p.evaluate(() => SIM(S.practice.cur.qi).a); await click(`#rvCard .opt >> nth=${(a+1)%4}`, 600);
      await click(btn('بنداز توی سبد'), 200); await p.screenshot({ path:`${out}/flow-basket-flying.png` }); await p.waitForTimeout(1500);
      const st = await p.evaluate(() => [Object.values(S.practice.res).join(','), openBasket().length, route.name]);
      console.log('practice', st);
      await p.evaluate(() => DEV('logout')); await p.waitForTimeout(700); await click(btn('آره، خارج می‌شم'), 600);
      console.log('after logout', await p.evaluate(() => [route.name, S.loggedIn]));
      const d = await p.evaluate(() => ({ total:TOTAL, levels:['easy','medium','hard'].map(l=>Q.filter(q=>q.d===l).length), byB:[0,1].map(b=>['easy','medium','hard'].map(l=>Q.filter(q=>q.b===b&&q.d===l).length)), opts:Q.filter(q=>new Set(q.o).size!==4).length, dup:Q.length-new Set(Q.map(q=>q.q)).size, simSame:Q.filter((q,i)=>SIM(i).q===q.q).length }));
      console.log('data', JSON.stringify(d));
      for (const perf of ['strong','mid','weak']) console.log(perf, await p.evaluate(perf => { DEV('result',perf); const r=result(); return JSON.stringify({ c:r.correct, bad:r.bad, blank:r.blank, pb:r.pb.map(x=>+x.toFixed(1)), score:+r.score.toFixed(1), taraz:r.taraz, rank:r.rank, noNeg:rankOf(scoreOf(r.c,[0,0])) }); }, perf));
    }
    await p.close();
  }
  const p = await b.newPage({ viewport:{ width:1280, height:800 } }); p.on('pageerror', e => errors.push('preview ' + e.message));
  await p.goto('file://' + ROOT + '/preview.html'); await p.waitForTimeout(1200); await p.click('[data-go="story:score"]'); await p.waitForTimeout(2200); await p.screenshot({ path:`${out}/preview-13.png` });
  await p.click('[data-d="se"]'); await p.click('[data-go="home:practice"]'); await p.waitForTimeout(1200); await p.screenshot({ path:`${out}/preview-se.png` });
  console.log('scenarios', IDS.length, 'errors', errors, 'overflow', overflow);
  await b.close();
})();
