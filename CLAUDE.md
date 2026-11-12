# Azmoun — working rules

- Source of truth is `src/`. Never hand-edit `index.html`; run `python3 build.py`.
- Design system lives in `design-system/` (brand book `README.md`, `tokens.json`, `components/*`). Read its README before any UI change and follow it: clickable things get an ink border + hard shadow, display-only cards a soft shadow; primary colour only for the main action; no bare text buttons; no horizontal page scroll; Persian digits; no orphan last word (`nob()`).
- Any new or changed UI pattern must be reflected in the design system in the same change: update the component README + `preview.html`, regenerate `components/bundle.css` from `src/style.css`, and update the published "آزمون" Design System artifact.
- Show changes in the preview first (`preview.html`: phone frame + jump panel). Add a jump entry in `preview.html` and a matching `devGo` scenario in `src/app.js` for every new screen or state.
- Do not push to GitHub until Siavash explicitly asks.
- After changes run `node tests/flow-test.js` (all preview scenarios at iPhone 13 and iPhone SE; must report no errors and no overflow).
- UI copy is informal Persian addressed to the student as «تو». Post-exam work is called «تمرین», not «مأموریت». No stars/points; a correct answer gets «آفرین».
