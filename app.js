/* ============================================================================
   Kshitiz Garg — portfolio engine.
   DOM from config.js · a holographic PRESENTER figure (Kshitiz) who narrates
   in a male voice (no subtitles) · custom cursor · scroll choreography.
   Wrapped so a single CDN hiccup never blanks the page.
   ============================================================================ */

const P = window.PORTFOLIO;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ============================================================ 1. BUILD DOM */
function buildContent() {
  const [first, ...rest] = P.name.split(" ");
  const nameEl = $(".hero-name");
  nameEl.innerHTML =
    `<span class="line" data-split>${first}</span>` +
    `<span class="line outline" data-split>${rest.join(" ") || ""}</span>`;
  $$(".hero-name [data-split]").forEach(splitChars);

  $("[data-availability]").textContent = P.availability;
  $("[data-tagline]").textContent = P.tagline;

  const at = $("[data-about-text]");
  at.innerHTML = P.about.text.split(" ").map(w => `<span class="w">${w}</span>`).join(" ");
  $("[data-about-facts]").innerHTML = P.about.facts
    .map(f => `<li><span class="k">${f.k}</span><span class="v">${f.v}</span></li>`).join("");

  $("[data-skills]").innerHTML = P.skills.map(g => `
    <div class="skill-card" data-tilt data-reveal>
      <h3>${g.group}</h3>
      <div class="skill-tags">${g.items.map(i => `<span class="skill-tag" data-cursor="hover">${i}</span>`).join("")}</div>
    </div>`).join("");

  const words = P.marqueeWords.map((w, i) =>
    `<span class="${i % 3 === 0 ? "fill" : ""}">${w}</span><span class="sep">✦</span>`).join("");
  $("[data-marquee]").innerHTML = words + words;

  $("[data-projects]").innerHTML = P.projects.map((p, i) => {
    const num = String(i + 1).padStart(2, "0");
    const links = [
      p.link && `<a class="project-link" href="${p.link}" target="_blank" rel="noopener" data-cursor="hover">Live ↗</a>`,
      p.repo && `<a class="project-link" href="${p.repo}" target="_blank" rel="noopener" data-cursor="hover">Code ↗</a>`,
    ].filter(Boolean).join("");
    return `
    <article class="project" data-reveal data-project="${i}" style="--pc:${p.accent}">
      <div class="project-body">
        <div class="project-meta">
          <span class="project-num">${num}</span>
          <span class="project-kind">${p.kind}</span>
          <span class="project-year">${p.year}</span>
        </div>
        <h3 class="project-name">${p.name}</h3>
        <p class="project-blurb">${p.blurb}</p>
        <ul class="project-highlights">${p.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="project-links">${links}</div>
      </div>
      <div class="project-visual" data-tilt>
        <span class="badge">// ${p.kind}</span>
        ${sparkSVG(p.sparkline, p.accent)}
        <span class="glyph">${p.glyph || p.name[0]}</span>
        <span class="speaking-badge"><span class="eq"><i></i><i></i><i></i></span> Kshitiz</span>
      </div>
    </article>`;
  }).join("");

  $("[data-timeline]").innerHTML = P.experience.map(e => `
    <div class="tl-item" data-reveal>
      <div class="tl-period">${e.period}</div>
      <div class="tl-role">${e.role}</div>
      <div class="tl-org">${e.org}</div>
      <div class="tl-detail">${e.detail}</div>
    </div>`).join("");

  const email = $("[data-email-link]");
  email.textContent = P.email; email.href = `mailto:${P.email}`;
  const S = P.socials;
  const social = [
    S.linkedin && ["LinkedIn", S.linkedin],
    S.github   && ["GitHub", S.github],
    S.twitter  && ["Twitter / X", S.twitter],
    S.resume   && ["Résumé", S.resume],
    ["Email", `mailto:${P.email}`],
  ].filter(Boolean);
  $("[data-socials]").innerHTML = social.map(([label, href]) =>
    `<a class="social-btn magnetic" href="${href}" target="_blank" rel="noopener" data-cursor="hover">${label} <span style="opacity:.5">↗</span></a>`).join("");
}

function splitChars(el) {
  el.innerHTML = [...el.textContent].map(c => c === " " ? " " : `<span class="char">${c}</span>`).join("");
}
function sparkSVG(vals, color) {
  if (!vals || !vals.length) return "";
  const w = 220, h = 70, max = Math.max(...vals), min = Math.min(...vals);
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * w, h - ((v - min) / (max - min || 1)) * h]);
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  return `
    <svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="g${color.slice(1)}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${d} L${w} ${h} L0 ${h} Z" fill="url(#g${color.slice(1)})"/>
      <path class="spark-line" d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
}

/* ============================================================ 2. CURSOR */
function initCursor() {
  const dot = $("#cursor-dot"), ring = $("#cursor-ring");
  if (!dot) return;
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  addEventListener("mousedown", () => ring.classList.add("down"));
  addEventListener("mouseup", () => ring.classList.remove("down"));
  const hoverSel = '[data-cursor="hover"], a, button, .magnetic, .skill-tag';
  document.addEventListener("mouseover", e => { if (e.target.closest(hoverSel)) ring.classList.add("hover"); });
  document.addEventListener("mouseout",  e => { if (e.target.closest(hoverSel)) ring.classList.remove("hover"); });

  $$(".magnetic").forEach(el => {
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
  $$("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", px * 100 + "%");
      card.style.setProperty("--my", py * 100 + "%");
      const glyph = card.querySelector(".glyph");
      if (glyph) glyph.style.transform = `translateZ(40px) rotateY(${(px - .5) * 22}deg) rotateX(${(.5 - py) * 22}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      const glyph = card.querySelector(".glyph"); if (glyph) glyph.style.transform = "translateZ(40px)";
    });
  });
}

/* ============================================================ 3. NAV + PROGRESS */
function initChrome() {
  const nav = $("#nav"), fill = $("#scroll-progress-fill");
  let last = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("scrolled", y > 40);
    nav.classList.toggle("hide", y > last && y > 400);
    last = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    fill.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ============================================================ 4. TYPEWRITER */
function initTypewriter() {
  const el = $("#role-typewriter"); if (!el) return;
  const roles = P.roles; let r = 0, c = 0, deleting = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!deleting && c < word.length) c++;
    else if (deleting && c > 0) c--;
    else if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1600); }
    else { deleting = false; r = (r + 1) % roles.length; }
    setTimeout(tick, deleting ? 40 : 90);
  })();
}

/* ============================================================ 5. SPEECH (male, no subtitles) */
const Speech = {
  ready: false, muted: false, voice: null, spoken: new Set(), activeEl: null, lastText: "",
  bar: null, toggle: null,

  init() {
    this.bar = $("#caption-bar"); this.toggle = $("#sound-toggle");
    const synth = window.speechSynthesis;
    if (!synth) { this.toggle.style.display = "none"; return; }
    const pick = () => {
      const voices = synth.getVoices(); if (!voices.length) return;
      for (const name of P.voice.preferred) {
        const v = voices.find(v => v.name === name) || voices.find(v => v.name.includes(name));
        if (v) { this.voice = v; this.ready = true; return; }
      }
      const male = /(\bmale\b|david|daniel|alex|rishi|\bguy\b|mark|fred|george|james|aaron|arthur|oliver|thomas|ravi|prabhat)/i;
      const female = /(\bfemale\b|samantha|victoria|karen|moira|tessa|fiona|susan|zira|hazel|catherine|linda|heera|veena|rish?aa)/i;
      const en = voices.filter(v => /^en[-_]/i.test(v.lang));
      this.voice = en.find(v => male.test(v.name)) || en.find(v => !female.test(v.name)) || en[0] || voices[0];
      this.ready = true;
    };
    pick(); synth.onvoiceschanged = pick;
    this.toggle.addEventListener("click", () => this.muted ? this.unmute() : this.mute());
    this.toggle.classList.add("playing");
  },

  speakOnce(id, text, el) {
    if (this.spoken.has(id)) return;
    this.spoken.add(id);
    if (P.voice.autoSpeakOnScroll) this.speak(text, { el });
  },

  speak(text, { el = null } = {}) {
    const synth = window.speechSynthesis; if (!synth) return;
    this.lastText = text;
    if (this.muted) return;
    synth.cancel();
    this.setSpeaking(el, true);
    const parts = text.match(/[^.!?]+[.!?]*/g) || [text];
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part.trim());
      if (this.voice) u.voice = this.voice;
      u.rate = P.voice.rate; u.pitch = P.voice.pitch; u.volume = P.voice.volume;
      if (i === parts.length - 1) u.onend = () => this.setSpeaking(el, false);
      synth.speak(u);
    });
  },

  setSpeaking(el, on) {
    this.bar.classList.toggle("show", on);
    this.bar.classList.toggle("speaking", on);
    this.toggle.classList.toggle("playing", on && !this.muted);
    if (this.activeEl && this.activeEl !== el) this.activeEl.classList.remove("is-speaking");
    if (el) el.classList.toggle("is-speaking", on);
    this.activeEl = on ? el : null;
    if (window.__viz) window.__viz.speaking = on;
    if (!on) this._hide = setTimeout(() => this.bar.classList.remove("show"), 1500);
  },
  mute() {
    this.muted = true; window.speechSynthesis && window.speechSynthesis.cancel();
    this.toggle.classList.add("muted"); this.toggle.classList.remove("playing");
    this.toggle.querySelector(".sound-label").textContent = "Voice off";
    this.setSpeaking(this.activeEl, false);
  },
  unmute() {
    this.muted = false;
    this.toggle.classList.remove("muted");
    this.toggle.querySelector(".sound-label").textContent = "Voice on";
    if (this.lastText) this.speak(this.lastText, { el: this.activeEl });
  },
};

/* ============================================================ 6. SECTION NARRATION */
function initNarration() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.intersectionRatio < 0.5) return;
      const t = e.target;
      if (t.id === "about")    Speech.speakOnce("about", P.about.say);
      if (t.id === "skills")   Speech.speakOnce("skills", P.narration.skills);
      if (t.id === "projects") Speech.speakOnce("projectsIntro", P.narration.projectsIntro);
      if (t.id === "contact")  Speech.speakOnce("outro", P.narration.outro);
      if (t.dataset.project != null) {
        const p = P.projects[+t.dataset.project];
        Speech.speakOnce("proj" + t.dataset.project, p.say, t);
      }
    });
  }, { threshold: [0.5, 0.6] });
  ["#about", "#skills", "#projects", "#contact"].forEach(s => io.observe($(s)));
  $$("[data-project]").forEach(el => io.observe(el));
}

/* ============================================================ 7. LOADER */
function initLoader() {
  const loader = $("#loader"), fill = $("#loader-fill"),
        pct = $("#loader-percent"), btn = $("#enter-btn"), status = $("#loader-status");
  const msgs = ["Booting the terminal…", "Streaming market data…", "Calibrating the vol surface…", "Waking the presenter…", "Ready."];
  let p = 0;
  const timer = setInterval(() => {
    p = Math.min(100, p + Math.random() * 16 + 4);
    fill.style.width = p + "%"; pct.textContent = Math.floor(p) + "%";
    status.textContent = msgs[Math.min(msgs.length - 1, Math.floor(p / 22))];
    if (p >= 100) { clearInterval(timer); btn.disabled = false; }
  }, 180);

  btn.addEventListener("click", () => {
    loader.classList.add("done");
    Speech.init();
    Speech.spoken.add("intro");
    setTimeout(() => Speech.speak(P.narration.intro), 650);
    revealHero();
    setTimeout(() => loader.remove(), 900);
  }, { once: true });
}
function revealHero() {
  if (!window.gsap) return;
  const g = window.gsap;
  g.set("#nav, #content", { opacity: 1 });
  g.from(".hero-name .char", { yPercent: 120, opacity: 0, stagger: 0.03, duration: 0.9, ease: "power4.out" });
  g.from([".hero-availability", ".hero-role", ".hero-tagline", ".hero-cta", ".scroll-hint"],
    { y: 26, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", delay: 0.3 });
  g.from(".nav", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out" });
}

/* ============================================================ 8. SMOOTH SCROLL + REVEALS */
async function initScroll() {
  const g = window.gsap, ST = window.ScrollTrigger;
  if (g && ST) g.registerPlugin(ST);
  let lenis = null;
  if (!reduceMotion) {
    try {
      const { default: Lenis } = await import("https://unpkg.com/lenis@1.1.14/dist/lenis.mjs");
      lenis = new Lenis({ lerp: 0.09 });
      window.__lenis = lenis; // debug hook
      if (ST) lenis.on("scroll", ST.update);
      g.ticker.add(t => lenis.raf(t * 1000));
      g.ticker.lagSmoothing(0);
    } catch (e) { console.warn("Lenis unavailable, native scroll", e); }
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = $(a.getAttribute("href")); if (!t) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: 0 }) : t.scrollIntoView({ behavior: "smooth" });
  }));
  if (!g || !ST) return;

  $$("[data-reveal]").forEach(el => g.to(el, {
    opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
  $$("[data-split-words]").forEach(t => {
    t.innerHTML = t.textContent.split(" ").map(w => `<span style="display:inline-block">${w}</span>`).join(" ");
    g.from(t.children, { yPercent: 110, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power4.out",
      scrollTrigger: { trigger: t, start: "top 88%" } });
  });
  g.to(".about-text .w", { opacity: 1, stagger: 0.02, ease: "none",
    scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 60%", scrub: true } });
  $$(".project-visual").forEach(v => g.fromTo(v, { y: 40 }, { y: -40, ease: "none",
    scrollTrigger: { trigger: v.closest(".project"), start: "top bottom", end: "bottom top", scrub: true } }));
  $$(".section-index").forEach(idx => g.from(idx, { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)",
    scrollTrigger: { trigger: idx, start: "top 90%" } }));
}

/* ============================================================ 9. THE PRESENTER (3D) */
async function initThree() {
  if (reduceMotion) return;
  const THREE = await import("three");
  const C1 = 0x22d3ee, C2 = 0x7c5cff;               // cyan / violet
  const canvas = $("#bg-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04050a, 0.052);
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);

  // ---- lights (soft fill so the figure reads, plus neon rims) -----------
  scene.add(new THREE.AmbientLight(0x33456b, 1.25));
  const key = new THREE.DirectionalLight(0xd6e4ff, 0.85); key.position.set(2.5, 4, 3); scene.add(key);
  const fill = new THREE.PointLight(0xaebfff, 9, 12, 2); fill.position.set(1.75, 1.6, 3.2); scene.add(fill);   // front fill on face
  const rimC = new THREE.PointLight(C1, 40, 16, 2); rimC.position.set(0.4, 1.9, -1.4); scene.add(rimC);
  const rimV = new THREE.PointLight(C2, 34, 16, 2); rimV.position.set(4.2, 2.5, -1.1); scene.add(rimV);
  const screenGlow = new THREE.PointLight(0x6fe0ff, 9, 8, 2); screenGlow.position.set(1.75, 0.7, 2); scene.add(screenGlow);

  // ---- calm ambient: faint floor grid + sparse dust --------------------
  const grid = new THREE.GridHelper(60, 60, 0x1b2742, 0x0e1626);
  grid.position.y = -1.4; grid.material.transparent = true; grid.material.opacity = 0.18; scene.add(grid);

  const DUST = 320, dustG = new THREE.BufferGeometry(), dPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) { dPos[i*3] = (Math.random()-.5)*24; dPos[i*3+1] = Math.random()*9-1; dPos[i*3+2] = (Math.random()-.5)*18 - 4; }
  dustG.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
  const dust = new THREE.Points(dustG, new THREE.PointsMaterial({ size: 0.035, color: 0x8fa6d8, transparent: true, opacity: 0.5, depthWrite: false }));
  scene.add(dust);

  // ---- the figure (Kshitiz, holographic) --------------------------------
  const stage = new THREE.Group(); stage.position.set(1.75, 0, 0); stage.scale.setScalar(1.05); scene.add(stage);
  const fade = [];                                   // materials that fade on scroll
  const M = (color, o = {}) => { const m = new THREE.MeshStandardMaterial({ color, roughness: o.r ?? 0.5, metalness: o.m ?? 0.35, emissive: o.e ?? 0x000000, emissiveIntensity: o.ei ?? 1, transparent: true, opacity: 1 }); fade.push(m); return m; };
  const body = M(0x222a3e, { r: 0.5, m: 0.22 });
  const dark = M(0x0c0e16, { r: 0.7, m: 0.2 });
  const visorMat = M(0x001a22, { e: 0x2fe6ff, ei: 1.7, r: 0.2, m: 0.5 });
  const accentMat = M(0x10131f, { e: C2, ei: 0.7, r: 0.4, m: 0.6 });

  function limb(p1, p2, r, mat) {
    const a = new THREE.Vector3(...p1), b = new THREE.Vector3(...p2);
    const dir = new THREE.Vector3().subVectors(b, a), len = dir.length();
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(r, Math.max(0.02, len - 2 * r), 6, 12), mat);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return mesh;
  }
  // torso + shoulders + neck
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.62, 8, 16), body);
  torso.position.set(0, 0.52, 0); torso.rotation.x = 0.09; stage.add(torso);
  [[-0.44, 1.0, 0.02], [0.44, 1.0, 0.02]].forEach(p => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), body); s.position.set(...p); stage.add(s); });
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.2, 12), body); neck.position.set(0, 1.16, 0.01); stage.add(neck);

  // head group (animated: looks toward cursor + nods while speaking)
  const head = new THREE.Group(); head.position.set(0, 1.46, 0.02); stage.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), body); head.add(skull);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.31, 24, 24), dark);
  hair.scale.set(1.04, 0.92, 1.06); hair.position.set(0, 0.07, -0.03);
  // shave the front so it reads as a hairline
  hair.geometry = new THREE.SphereGeometry(0.31, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62); head.add(hair);
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.09), visorMat);
  visor.position.set(0, 0.0, 0.26); visor.rotation.x = -0.04; head.add(visor);
  // headphones
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.035, 10, 28), dark); head.add(band);
  [-1, 1].forEach(s => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.09, 16), dark);
    cup.rotation.z = Math.PI / 2; cup.position.set(0.31 * s, -0.02, 0); head.add(cup);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.016, 8, 20), accentMat);
    ring.rotation.y = Math.PI / 2; ring.position.set(0.355 * s, -0.02, 0); head.add(ring);
  });

  // arms — left rests forward, right raised in a presenting gesture
  stage.add(limb([-0.44, 1.0, 0.04], [-0.55, 0.66, 0.34], 0.12, body));   // L upper
  stage.add(limb([-0.55, 0.66, 0.34], [-0.4, 0.42, 0.66], 0.1, body));    // L fore
  const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), body); lHand.position.set(-0.4, 0.4, 0.7); stage.add(lHand);
  const rArm = new THREE.Group(); stage.add(rArm);                        // grouped so it can gesture
  rArm.add(limb([0.44, 1.0, 0.04], [0.62, 0.86, 0.3], 0.12, body));       // R upper
  rArm.add(limb([0.62, 0.86, 0.3], [0.66, 0.62, 0.66], 0.1, body));       // R fore
  const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), body); rHand.position.set(0.66, 0.6, 0.72); rArm.add(rHand);

  // ---- floating holographic chart panels --------------------------------
  function makeChart(kind) {
    const cv = document.createElement("canvas"); cv.width = 512; cv.height = 320;
    const x = cv.getContext("2d");
    const tex = new THREE.CanvasTexture(cv);
    let closes = Array.from({ length: 30 }, (_, i) => 20 + Math.sin(i * 0.5) * 5 + Math.random() * 3), f = 0;
    const mapY = v => 300 - (clamp(v, 4, 36) - 4) / 32 * 280 + 10;
    function draw(speak) {
      f++; x.clearRect(0, 0, 512, 320); x.fillStyle = "#000"; x.fillRect(0, 0, 512, 320);
      x.strokeStyle = "rgba(40,90,130,.45)"; x.lineWidth = 1;
      for (let i = 0; i <= 4; i++) { const yy = 10 + i / 4 * 300; x.beginPath(); x.moveTo(0, yy); x.lineTo(512, yy); x.stroke(); }
      if (kind === "candles") {
        if (f % 7 === 0) { const last = closes.at(-1) + (Math.random() - 0.5) * 3; closes.push(clamp(last, 5, 35)); if (closes.length > 32) closes.shift(); }
        const n = closes.length, cw = 512 / n;
        for (let i = 1; i < n; i++) {
          const o = closes[i - 1], c = closes[i], up = c >= o, cx = i * cw + cw / 2;
          const hi = Math.max(o, c) + 1 + Math.abs(Math.sin(i * 1.7)) * 2, lo = Math.min(o, c) - 1 - Math.abs(Math.cos(i * 1.3)) * 2;
          x.strokeStyle = up ? "#34d399" : "#fb7185"; x.lineWidth = 1.3;
          x.beginPath(); x.moveTo(cx, mapY(hi)); x.lineTo(cx, mapY(lo)); x.stroke();
          x.fillStyle = up ? "#34d399" : "#fb7185";
          x.fillRect(cx - cw * 0.3, mapY(Math.max(o, c)), cw * 0.6, Math.max(2, Math.abs(mapY(o) - mapY(c))));
        }
        const ly = mapY(closes.at(-1));
        x.strokeStyle = "#34f0ff"; x.setLineDash([6, 5]); x.lineWidth = 1.4;
        x.beginPath(); x.moveTo(0, ly); x.lineTo(512, ly); x.stroke(); x.setLineDash([]);
        x.fillStyle = "#34f0ff"; x.beginPath(); x.arc(500, ly, 4, 0, 7); x.fill();
        x.fillStyle = "rgba(120,200,255,.9)"; x.font = "600 22px JetBrains Mono, monospace";
        x.fillText("NIFTY  " + (18000 + closes.at(-1) * 30).toFixed(1), 16, 36);
      } else if (kind === "depth") {
        x.fillStyle = "rgba(120,200,255,.9)"; x.font = "600 20px JetBrains Mono, monospace"; x.fillText("ORDER BOOK", 16, 32);
        for (let i = 0; i < 9; i++) {
          const yy = 60 + i * 27, bid = 80 + Math.abs(Math.sin(i + f * .03)) * 150, ask = 80 + Math.abs(Math.cos(i + f * .035)) * 150;
          x.fillStyle = "rgba(52,211,153,.55)"; x.fillRect(256 - bid, yy, bid, 18);
          x.fillStyle = "rgba(251,113,133,.55)"; x.fillRect(256, yy, ask, 18);
        }
        x.strokeStyle = "rgba(120,200,255,.6)"; x.beginPath(); x.moveTo(256, 50); x.lineTo(256, 300); x.stroke();
      } else { // iv
        x.fillStyle = "rgba(180,150,255,.95)"; x.font = "600 20px JetBrains Mono, monospace"; x.fillText("IV SURFACE", 16, 32);
        x.strokeStyle = "#a78bff"; x.lineWidth = 3; x.beginPath();
        for (let i = 0; i <= 60; i++) { const xx = i / 60 * 512, v = 160 + Math.pow((i - 30) / 30, 2) * 90 - 40 + Math.sin(f * .04 + i * .2) * 6; i ? x.lineTo(xx, v) : x.moveTo(xx, v); }
        x.stroke();
        x.fillStyle = "rgba(120,255,220,.9)"; x.font = "500 19px JetBrains Mono, monospace";
        x.fillText("Δ .52  Γ .03", 16, 250); x.fillText("Θ -.04  ν .12", 16, 280);
      }
      tex.needsUpdate = true;
    }
    draw(0);
    return { tex, draw };
  }
  const panels = [];
  function panel(kind, pos, rot, w, h, color) {
    const grp = new THREE.Group(); grp.position.set(...pos); grp.rotation.set(rot[0], rot[1], rot[2]);
    const chart = makeChart(kind);
    const screenMat = new THREE.MeshBasicMaterial({ map: chart.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, opacity: 0.8 });
    fade.push(screenMat);
    grp.add(new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMat));
    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, opacity: 0.07 });
    fade.push(glowMat);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.12, h + 0.12), glowMat); glow.position.z = -0.01; grp.add(glow);
    grp.userData = { chart, baseY: pos[1], phase: panels.length * 1.7 };
    stage.add(grp); panels.push(grp);
  }
  // panels clustered tightly around the figure (kept low so head/shoulders stay clear)
  panel("candles", [0.05, 0.5, 1.05], [-0.05, -0.16, 0], 1.05, 0.64, C1);
  panel("depth",   [-0.78, 0.34, 0.85], [0, 0.5, 0], 0.66, 0.52, 0x34d399);
  panel("iv",      [0.86, 0.66, 0.55], [0, -0.55, 0.02], 0.6, 0.46, C2);

  // ---- subtle bloom (optional) ------------------------------------------
  let composer = null;
  try {
    const { EffectComposer } = await import("three/addons/postprocessing/EffectComposer.js");
    const { RenderPass } = await import("three/addons/postprocessing/RenderPass.js");
    const { UnrealBloomPass } = await import("three/addons/postprocessing/UnrealBloomPass.js");
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.7, 0.7, 0.2));
  } catch (e) { console.warn("Bloom unavailable", e); }

  // ---- interaction + loop ------------------------------------------------
  const viz = window.__viz = { speaking: false, intensity: 0 };
  let tmx = 0, tmy = 0, mxs = 0, mys = 0, scrollN = 0;
  addEventListener("mousemove", e => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; });
  addEventListener("scroll", () => { const m = document.documentElement.scrollHeight - innerHeight; scrollN = m > 0 ? scrollY / m : 0; }, { passive: true });
  addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight); composer && composer.setSize(innerWidth, innerHeight);
  });
  let hidden = false;
  document.addEventListener("visibilitychange", () => { hidden = document.hidden; });

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (hidden) return;
    const t = clock.getElapsedTime();
    mxs += (tmx - mxs) * 0.05; mys += (tmy - mys) * 0.05;
    viz.intensity += ((viz.speaking ? 1 : 0) - viz.intensity) * 0.08;
    const present = 1 - clamp(scrollY / (innerHeight * 0.9), 0, 1);  // fade over the first viewport (device-independent)

    // idle life
    torso.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    head.rotation.y = mxs * 0.6 + Math.sin(t * 0.7) * 0.04;
    head.rotation.x = mys * 0.3 + Math.sin(t * 1.1) * 0.03 + viz.intensity * Math.sin(t * 9) * 0.05; // nod while speaking
    visorMat.emissiveIntensity = 1.3 + Math.sin(t * 2) * 0.2 + viz.intensity * 1.4;
    screenGlow.intensity = 9 + viz.intensity * 8;
    rArm.rotation.z = Math.sin(t * 1.3) * 0.05 + viz.intensity * (0.12 + Math.sin(t * 5) * 0.08); // gesture
    lHand.position.y = 0.4 + Math.sin(t * 5 + 1) * 0.01;

    // panels: gentle bob + live charts (skip redraw when faded away)
    panels.forEach((g, i) => {
      g.position.y = g.userData.baseY + Math.sin(t * 0.8 + g.userData.phase) * 0.03;
      g.rotation.z = Math.sin(t * 0.5 + i) * 0.015;
      if (present > 0.05 && Math.floor(t * 60) % 4 === i % 4) g.userData.chart.draw(viz.intensity);
    });

    // fade the whole figure/panels as you enter the content
    fade.forEach(m => { m.opacity = (m.userData?.base ?? 1) * present; });
    stage.visible = present > 0.01;
    rimC.intensity = 40 * present; rimV.intensity = 34 * present;
    fill.intensity = 9 * present; screenGlow.intensity *= present;

    // calm ambient always present
    dust.rotation.y = t * 0.01;

    // aim LEFT of the figure so it sits in the right portion; scale by aspect
    // so it stays clear of the name on wide screens. On tall/portrait screens,
    // drop it lower + shrink it so the name stays clean above it.
    const portrait = camera.aspect < 0.9;
    const lookX = clamp(1.75 - (camera.aspect - 0.5) * 1.2, 0.25, 1.75);
    const drop = portrait ? (0.9 - camera.aspect) * 2.8 : 0;        // push figure well below the hero text on phones
    stage.scale.setScalar(portrait ? 0.82 : 1.05);                 // smaller on phones
    camera.position.set(lookX * 0.45 + mxs * 0.5, 1.34 - mys * 0.4 + drop * 0.35 + scrollN * 2.4, 4.6 + drop * 1.0 - scrollN * 0.6);
    camera.lookAt(lookX, 1.05 + drop * 1.15 + scrollN * 1.2, 0);

    composer ? composer.render() : renderer.render(scene, camera);
  }
  // remember each material's intended max opacity (screens 0.92, glow 0.1, rest 1)
  fade.forEach(m => (m.userData = { base: m.opacity }));
  frame();
}

/* ============================================================ BOOT */
function boot() {
  buildContent();
  initCursor();
  initChrome();
  initTypewriter();
  initScroll().catch(e => console.warn("scroll init", e));
  initThree().catch(e => console.warn("3D disabled — content still works", e));
  // no loader, no enter gate, no voice — reveal straight to the hero
  if (window.gsap) revealHero();
  else { $("#content").style.opacity = 1; $("#nav").style.opacity = 1; }
}
if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot);
else boot();
