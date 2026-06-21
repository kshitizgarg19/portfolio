/* ============================================================================
   KSHITIZ GARG — quant trader. All content lives here; edit this file only.
   The AI presenter reads the `say` fields aloud as visitors scroll.
   ============================================================================ */

window.PORTFOLIO = {
  // ---- Identity -----------------------------------------------------------
  name: "Kshitiz Garg",
  firstName: "Kshitiz",
  roles: [
    "Quantitative Trader",
    "HFT & Low-Latency Systems",
    "Quant Researcher",
    "Machine Learning for Markets",
  ],
  tagline: "I turn market microstructure into low-latency, machine-driven strategy.",
  location: "Delhi, India",
  email: "kshitizgarg19@gmail.com",
  availability: "Open to quant research & trading roles",

  socials: {
    linkedin: "https://www.linkedin.com/in/kshitiz-garg-898403207/",
    github: "",   // TODO: paste your GitHub URL and it appears automatically
    twitter: "",  // TODO: optional (X / Twitter)
    resume: "",   // TODO: optional link to a PDF résumé
  },

  // ---- About --------------------------------------------------------------
  about: {
    text:
      "I'm a self-driven undergraduate at Delhi Technological University working at the " +
      "intersection of quantitative finance, high-frequency trading, and machine learning. " +
      "I build predictive models, research volatility patterns, and engineer low-latency data " +
      "pipelines that turn complex market data into actionable signal.",
    say:
      "I'm Kshitiz — a quantitative trader and researcher, and an undergraduate at D T U. " +
      "I work where high-frequency trading, machine learning, and market microstructure meet. " +
      "I build predictive models, study volatility, and ship low-latency systems that trade in real time.",
    facts: [
      { k: "Focus",      v: "Quant trading · HFT · ML" },
      { k: "Edge",       v: "Low-latency systems & signal" },
      { k: "Core stack", v: "Python · C++ · ML" },
      { k: "Education",  v: "DTU — undergraduate" },
    ],
  },

  // ---- Skills -------------------------------------------------------------
  skills: [
    { group: "Languages", items: ["Python", "C++", "SQL"] },
    { group: "Quant & ML", items: ["Pandas", "NumPy", "XGBoost", "LightGBM", "Streamlit"] },
    { group: "Markets", items: ["Market Microstructure", "Options Greeks", "Volatility Modeling", "Signal Generation", "Market Making"] },
    { group: "Systems", items: ["Low-Latency Pipelines", "WebSocket", "REST APIs", "Order Management"] },
    { group: "Platforms", items: ["XTS Symphony", "Greeksoft"] },
  ],

  // words that scroll across the big marquee
  marqueeWords: ["Volatility", "HFT", "Market Making", "Signal", "Low-Latency", "Options Greeks",
                 "Microstructure", "Machine Learning", "Alpha", "Order Flow"],

  // ---- Projects (the presenter narrates each `say` as it scrolls in) -------
  projects: [
    {
      name: "Market Making Terminal",
      kind: "Real-Time Quoting Engine",
      year: "2025",
      glyph: "⇅",
      accent: "#22d3ee",
      blurb:
        "A real-time quoting engine that continuously posts two-sided quotes at the best bid and " +
        "best ask with ultra-low latency — sustaining up to 100 orders per second.",
      say:
        "First, my Market Making Terminal — a real-time quoting engine that posts two-sided quotes " +
        "at the best bid and ask, sustaining up to a hundred orders per second. A C plus plus " +
        "execution core, a Python strategy layer, wired together over WebSocket and REST.",
      highlights: [
        "Two-sided quoting at best bid / best ask",
        "Up to 100 orders/sec at ultra-low latency",
        "C++ execution core + Python strategy layer",
      ],
      tags: ["C++", "Python", "WebSocket", "REST API", "Low-Latency"],
      link: "", repo: "",
      sparkline: [12, 18, 14, 22, 19, 28, 24, 33, 30, 40, 36, 46],
    },
    {
      name: "PulseScreen",
      kind: "Options Analytics & Screener",
      year: "2025",
      glyph: "σ",
      accent: "#7c5cff",
      blurb:
        "Maps the full volatility surface — delta, IV skew, IV lean and IV charts — to surface " +
        "arbitrage and option mispricings across the chain. Includes a multi-leg strategy builder " +
        "with payoff & Greeks, plus Order-to-Trade Ratio analysis for exchange compliance.",
      say:
        "Next, PulseScreen — my options analytics and screener. It maps the entire volatility " +
        "surface — delta, I V skew, and I V lean — to surface mispricings and arbitrage across the " +
        "chain, with an Opstra-style multi-leg strategy builder and full Greeks.",
      highlights: [
        "Delta, IV skew, IV lean & IV charts across the chain",
        "Multi-leg strategy builder with payoff + Greeks",
        "Order-to-Trade Ratio (OTR) compliance analysis",
      ],
      tags: ["Python", "Options Greeks", "IV Surface", "Streamlit"],
      link: "", repo: "",
      sparkline: [30, 26, 34, 28, 38, 31, 42, 36, 30, 40, 33, 44],
    },
    {
      name: "MarketMind",
      kind: "AI Trading Strategy Assistant",
      year: "2025",
      glyph: "✦",
      accent: "#34d399",
      blurb:
        "A web-based AI tool built on a curated knowledge base of quantitative trading material. " +
        "It delivers full stock analysis — historical performance, sentiment and advanced analytics — " +
        "and generates strategy code for XTS Symphony, grounded in observed market behavior.",
      say:
        "Then, MarketMind — an A I trading assistant built on a curated quant knowledge base. It runs " +
        "full stock analysis across history, sentiment, and advanced analytics, and writes strategy " +
        "code for X T S Symphony.",
      highlights: [
        "Curated quant & finance knowledge base",
        "Full analysis: history, sentiment, analytics",
        "Generates XTS Symphony strategy code",
      ],
      tags: ["Python", "LLM / RAG", "XTS Symphony", "Analytics"],
      link: "", repo: "",
      sparkline: [10, 16, 13, 20, 26, 22, 30, 27, 35, 32, 41, 38],
    },
    {
      name: "Greeksoft Algo Terminal",
      kind: "Automated Execution System",
      year: "2024",
      glyph: "Δ",
      accent: "#f59e0b",
      blurb:
        "A fully automated options execution system implementing a Greeksoft terminal over REST API " +
        "and WebSocket, featuring a complete IV-based order-placement strategy built for ultra-fast, " +
        "hands-free execution.",
      say:
        "And finally, my Greeksoft Algo Terminal — a fully automated options execution system over " +
        "REST and WebSocket, running an I V based order placement strategy for hands-free, " +
        "ultra-fast execution.",
      highlights: [
        "Fully automated, hands-free execution",
        "IV-based order-placement strategy",
        "Greeksoft terminal via REST + WebSocket",
      ],
      tags: ["Python", "Greeksoft", "REST API", "WebSocket"],
      link: "", repo: "",
      sparkline: [22, 28, 25, 32, 29, 36, 40, 34, 44, 39, 48, 52],
    },
  ],

  // ---- Journey / timeline -------------------------------------------------
  experience: [
    {
      role: "Quantitative Trader",
      org: "Proprietary Trading Desk",
      period: "2026 — Present",
      detail: "Built an end-to-end, in-house market making terminal from scratch — order book reconstruction, quoting engine, inventory & risk controls — delivering two-sided liquidity and high-frequency jobbing.",
    },
    {
      role: "Quantitative Research Intern",
      org: "Securities Research",
      period: "Summer 2025",
      detail: "Designed and implemented predictive models for implied volatility, spot prices, ROCE and realized volatility using XGBoost, LSTM and LightGBM.",
    },
    {
      role: "B.Tech — Delhi Technological University (DTU)",
      org: "DCE · Delhi",
      period: "Undergraduate",
      detail: "Quantitative finance, machine learning, and high-frequency trading.",
    },
  ],

  // ---- What the presenter says (intro/outro + per-section) ----------------
  narration: {
    intro:
      "Hey — I'm Kshitiz Garg, a quantitative trader. Welcome to my world. Let me walk you through " +
      "who I am and the systems I've built — how I turn raw market data into low-latency, " +
      "machine-driven strategy.",
    skills:
      "My toolkit: Python for research and strategy, C plus plus where every microsecond matters, " +
      "and machine learning — XGBoost and LightGBM — to pull signal from the noise.",
    projectsIntro:
      "Now, my systems. Four builds — a market-making terminal, an options analytics screener, " +
      "an A I trading assistant, and an automated execution terminal. Let me take you through each.",
    outro:
      "That's the tour. If you work in quant research, trading systems, or machine learning for " +
      "markets — let's build something. My links are right here.",
  },

  // ---- Voice tuning (male presenter) -------------------------------------
  voice: {
    gender: "male",
    // tried in order; falls back to any male English voice it can find
    preferred: ["Rishi", "Google UK English Male", "Daniel", "Microsoft Guy Online (Natural) - English (United States)",
                "Microsoft David - English (United States)", "Alex", "Microsoft Mark - English (United States)"],
    rate: 1.0,
    pitch: 0.95,
    volume: 1.0,
    autoSpeakOnScroll: true,
  },
};
