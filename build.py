"""Build the two self-contained prototype files.

    python3 build.py

Writes app/v1/index.html and app/v2/index.html. Each output is a single HTML
file with the font and images inlined, so it opens offline.
"""
import base64
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / 'src'

def read(p): return (SRC / p).read_text(encoding='utf-8')

FONT = 'data:font/ttf;base64,' + base64.b64encode((SRC / 'fonts/YekanBakh-VF.ttf').read_bytes()).decode()
JS = read('app.js').replace('/*__ASSETS__*/', read('assets.js'))

def page(css, js, theme, extra=''):
    return f'''<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="{theme}">
<title>آزمون</title>
<style>
{css}</style>
</head>
<body>
<div class="app" id="app"></div>
<div id="layer"></div>
{extra}<script>
{js}</script>
</body>
</html>
'''

DOTS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.6" cy="1.6" r="1.15" fill="#D98F76"/></pattern></defs></svg>\n'

# v1: base views + v1 stylesheet
v1 = page(read('v1/style.css').replace('__FONT__', FONT), JS, '#ECE9E3', DOTS)

# v2: same logic, v2 views appended as an override layer, render() moved last
assert JS.rstrip().endswith('render();')
js2 = JS.rstrip()[:-len('render();')] + read('v2/v2views.js') + '\nrender();\n'
v2 = page(read('v2/style2.css').replace('__FONT__', FONT), js2, '#F7F4F0')

for name, html in (('v1', v1), ('v2', v2)):
    out = ROOT / 'app' / name / 'index.html'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding='utf-8')
    print(out.relative_to(ROOT), len(html))
