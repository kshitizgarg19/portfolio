# Kshitiz Garg — Portfolio

An interactive, 3D portfolio for **Kshitiz Garg** — quantitative trader. A single
static site featuring a live volatility-surface backdrop, a holographic quant
presenter, and a scroll-driven showcase of trading systems.

## Run locally

Any static file server works — there's no build step:

```bash
python3 -m http.server 4599
# then open http://localhost:4599
```

(or `npx serve`).

## Tech

- **Three.js** (r160) — 3D scene, presenter figure, holographic chart panels
- **GSAP + ScrollTrigger** — scroll-driven animation
- **Lenis** — smooth scrolling
- Vanilla **JS + CSS** — zero build tooling

## Customize

All content lives in **`config.js`** — identity, about, skills, projects, journey,
and links. Edit that one file; nothing to rebuild.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Markup |
| `style.css`  | Design system + styling |
| `config.js`  | All personal content — **edit this** |
| `app.js`     | 3D scene, animations, interactions |
