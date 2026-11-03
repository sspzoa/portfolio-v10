import argparse
import html
import json
import os
import re
import subprocess
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
FINAL = HERE
SESSION = f"portfolio-thumbnails-{os.getpid()}"
BANNED = "·ㆍ•"
FONT_CSS = "https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
W, H = 1600, 900
MARK_TOP = 56


def url(base, s):
    return f"url('{(base / s['file']).resolve().as_uri()}')"


def phone_el(base, s, x, y, w, extra=""):
    h = int(w * s.get("ratio", 844 / 390))
    r = int(w * s.get("radiusRatio", 0.115))
    return (f'<div class="mob" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;border-radius:{r}px;'
            f'background-image:{url(base, s)};background-position:center {s.get("position", "top")};{extra}"></div>')


def desktop(cfg, base):
    sc = cfg["screens"]
    s = sc[0]
    left = cfg.get("deskLeft", 120)
    top = cfg.get("deskTop", 148)
    w = cfg.get("deskWidth", W - 2 * left)
    zoom = s.get("zoom", w / 1440)
    if "crop" in s:
        cx, cy, cw, ch = s["crop"]
        zoom = w / cw
        size = f"{1440 * zoom:.1f}px auto"
        pos = f"{-cx * zoom:.1f}px {-cy * zoom:.1f}px"
        h = min(int(ch * zoom), H - top + 60)
    else:
        size = f"{1440 * zoom:.1f}px auto"
        pos = s.get("position", "left top")
        h = H - top + 60
    out = (f'<div class="desk" style="left:{left}px;top:{top}px;width:{w}px;height:{h}px;'
           f'background-image:{url(base, s)};background-size:{size};background-position:{pos}"></div>')
    if len(sc) > 1:
        p = sc[1]
        if "crop" in p:

            cx, cy, cw, ch = p["crop"]
            iw = cfg.get("insetWidth", 600)
            k = iw / cw
            out += (f'<div class="desk inset" style="left:{cfg.get("insetLeft", W - 64 - iw)}px;top:{cfg.get("insetTop", 330)}px;'
                    f'width:{iw}px;height:{int(ch * k)}px;background-image:{url(base, p)};background-size:{1440 * k:.1f}px auto;'
                    f'background-position:{-cx * k:.1f}px {-cy * k:.1f}px"></div>')
        else:
            pw = cfg.get("phoneWidth", 300)
            out += phone_el(base, p, cfg.get("phoneLeft", W - 64 - pw), cfg.get("phoneTop", 300), pw)
    return out


def mobile(cfg, base):
    sc = cfg["screens"]
    n = len(sc)
    pw = cfg.get("phoneWidth", {1: 480, 2: 420, 3: 360}.get(n, 330))
    gap = cfg.get("gap", 48)
    widths = [s.get("width", pw) for s in sc]
    total = sum(widths) + (n - 1) * gap
    x = (W - total) // 2 + cfg.get("shiftX", 0)
    offs = cfg.get("offsets", {1: [0], 2: [0, 72], 3: [72, 0, 72]}.get(n, [0] * n))
    out = ""
    for i, s in enumerate(sc):
        y = cfg.get("phoneTop", 150) + offs[i]
        w = widths[i]
        if s.get("frame") == "card":
            with Image.open(base / s["file"]) as im:
                iw, ih = im.size
            ch = int(w * ih / iw)
            out += (f'<div class="mob" style="left:{x}px;top:{y}px;width:{w}px;height:{ch}px;border-radius:28px;'
                    f'background-color:{s.get("cardBg", "#fff")};background-image:{url(base, s)};background-size:contain;background-position:center"></div>')
        else:
            out += phone_el(base, s, x, y, w)
        x += w + gap
    return out


def panel(cfg, base):
    s = cfg["screens"][0]
    with Image.open(base / s["file"]) as im:
        iw, ih = im.size
    h = cfg.get("panelHeight", 700)
    w = int(h * iw / ih)
    pad = cfg.get("panelPad", 40)
    pw = cfg.get("panelWidth", w + 2 * pad)
    left = (W - pw) // 2
    return (f'<div class="panel" style="left:{left}px;top:{cfg.get("panelTop", 148)}px;width:{pw}px;height:{h + 2 * pad}px;'
            f'background-color:{cfg.get("panelBg", "#fff")};background-image:{url(base, s)};background-size:{w}px {h}px;background-position:center"></div>')


def mark(cfg, base):
    logo = base / cfg.get("logoFile", "logo.svg")
    lh = cfg.get("logoHeight", 40)
    if cfg.get("wordmark"):
        return f'<img class="wm" src="{logo.resolve().as_uri()}" style="height:{cfg.get("wordmarkHeight", 40)}px">'
    logo_html = "" if cfg.get("noLogo") else f'<img class="lg" src="{logo.resolve().as_uri()}" style="height:{lh}px">'
    return f'{logo_html}<span class="nm">{html.escape(cfg["title"])}</span>'


def page(cfg):
    base = FINAL / "projects" / cfg["slug"]
    assert not any(c in cfg["title"] for c in BANNED), cfg["slug"]
    body = {"desktop": desktop, "mobile": mobile, "panel": panel}[cfg["layout"]](cfg, base)


    bg = cfg.get("bg", "#F5F5F5")
    return f"""<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="{FONT_CSS}"><style>
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:{W}px;height:{H}px;overflow:hidden}}
body{{position:relative;background:{bg};font-family:'Wanted Sans Variable','Wanted Sans',sans-serif;-webkit-font-smoothing:antialiased}}
.mark{{position:absolute;left:{cfg.get('markLeft', 96)}px;top:{MARK_TOP}px;height:56px;display:flex;align-items:center;gap:14px;z-index:5;color:{cfg.get('ink', '#000')}}}
.lg,.wm{{display:block;width:auto}}
.nm{{font-size:{cfg.get('namePx', 34)}px;font-weight:600;letter-spacing:-0.02em;line-height:1;white-space:nowrap}}
.desk,.mob,.panel{{position:absolute;background-repeat:no-repeat;background-color:#fff}}
.desk{{border-radius:24px;background-size:cover;
  box-shadow:0 0 0 2px #E5E5E5,0 30px 60px -40px rgba(0,0,0,.10);z-index:2}}
.desk.inset{{border-radius:18px;z-index:3;box-shadow:0 0 0 2px #E5E5E5,0 24px 60px -30px rgba(0,0,0,.16)}}
.mob{{background-size:cover;
  box-shadow:0 0 0 2px #E5E5E5,0 24px 60px -30px rgba(0,0,0,.16);z-index:3}}
.panel{{border-radius:24px;z-index:2;box-shadow:0 0 0 2px #E5E5E5}}
</style></head><body><div class="mark">{mark(cfg, base)}</div>{body}</body></html>"""


def ab(*args):
    result = subprocess.run(
        ["agent-browser", "--session", SESSION, *args],
        capture_output=True, text=True, timeout=120,
    )
    if result.returncode:
        raise RuntimeError(result.stderr or result.stdout)
    return result.stdout


def validate(presets):
    seen = set()
    for cfg in presets:
        slug = cfg["slug"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug) or slug in seen:
            raise ValueError(f"Invalid or duplicate slug: {slug}")
        seen.add(slug)
        if cfg["layout"] not in {"desktop", "mobile", "panel"} or not cfg["screens"]:
            raise ValueError(f"Invalid layout or empty screens: {slug}")
        if any(c in cfg["title"] for c in BANNED):
            raise ValueError(f"Remove middle dots from the title: {slug}")
        if "offsets" in cfg and len(cfg["offsets"]) != len(cfg["screens"]):
            raise ValueError(f"Provide one offset per screen: {slug}")
        base = (FINAL / "projects" / slug).resolve()
        files = [screen["file"] for screen in cfg["screens"]]
        if not cfg.get("noLogo"):
            files.append(cfg.get("logoFile", "logo.svg"))
        for name in files:
            path = (base / name).resolve()
            if not path.is_relative_to(base) or not path.is_file():
                raise ValueError(f"Missing or out-of-project input: {slug}/{name}")


def render(cfg, output):
    slug = cfg["slug"]
    html_path = output / f"{slug}.html"
    html_path.write_text(page(cfg), encoding="utf-8")
    ab("set", "viewport", str(W), str(H), "2")
    ab("open", html_path.as_uri())
    state = ab("eval", """(async () => {
      await document.fonts.load('600 34px "Wanted Sans Variable"');
      await document.fonts.ready;
      const urls = new Set([...document.images].map(image => image.src));
      for (const element of document.querySelectorAll('.desk,.mob,.panel')) {
        const background = getComputedStyle(element).backgroundImage;
        const match = background.match(/^url\\(["']?(.*?)["']?\\)$/);
        if (match) urls.add(match[1]);
      }
      await Promise.all([...urls].map(src => new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = () => reject(new Error('Image failed to load'));
        image.src = src;
      })));
      if (![...document.fonts].some(font => font.family.includes('Wanted Sans') && font.status === 'loaded')) {
        throw new Error('Wanted Sans failed to load');
      }
      return 'ready';
    })()""")
    if "ready" not in state:
        raise RuntimeError(f"Assets were not ready: {slug}")
    capture = output / f"{slug}@2x.png"
    ab("screenshot", str(capture))
    destination = output / f"{slug}.png"
    with Image.open(capture) as source:
        source.convert("RGB").resize((W, H), Image.Resampling.LANCZOS).save(destination, optimize=True)
    capture.unlink()
    return destination


def gallery(configs, output):
    cards = "".join(
        f'<figure><img src="{cfg["slug"]}.png" alt="{html.escape(cfg["title"], quote=True)}">'
        f'<figcaption>{html.escape(cfg["title"])}</figcaption></figure>'
        for cfg in configs
    )
    (output / "gallery.html").write_text(
        '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width">'
        '<title>포트폴리오 썸네일 검수</title><style>'
        '*{box-sizing:border-box}body{margin:40px;background:#fff;color:#111;font:14px sans-serif}'
        'main{display:grid;grid-template-columns:repeat(2,332px);gap:24px;max-width:688px;margin:auto}'
        'figure{margin:0}img{display:block;width:100%;aspect-ratio:16/9;border:1px solid #e5e5e5;object-fit:cover}'
        'figcaption{padding:8px 0}@media(max-width:730px){body{margin:20px}main{grid-template-columns:minmax(0,1fr)}}'
        '@media(prefers-color-scheme:dark){body{background:#000;color:#fff}}'
        '</style><main>' + cards + '</main></html>', encoding="utf-8",
    )


def main():
    parser = argparse.ArgumentParser(description="Render the approved 1600 × 900 portfolio cover template.")
    parser.add_argument("slugs", nargs="*", help="Project slugs; omit to render all 21 presets")
    parser.add_argument("--presets", type=Path, default=HERE / "presets.json")
    parser.add_argument("--output", type=Path, default=HERE / "output")
    parser.add_argument("--check", action="store_true", help="Validate inputs without opening a browser")
    args = parser.parse_args()
    presets = json.loads(args.presets.read_text(encoding="utf-8"))
    validate(presets)
    unknown = set(args.slugs) - {cfg["slug"] for cfg in presets}
    if unknown:
        parser.error(f"Unknown project: {', '.join(sorted(unknown))}")
    selected = [cfg for cfg in presets if not args.slugs or cfg["slug"] in args.slugs]
    if args.check:
        print(f"Validated {len(presets)} presets and their input files.")
        return
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    try:
        for cfg in selected:
            print(render(cfg, output), flush=True)
        gallery(selected, output)
        print(output / "gallery.html", flush=True)
    finally:
        ab("close")


if __name__ == "__main__":
    main()
