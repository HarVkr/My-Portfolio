// Imperative engine ported from the original your-next-watch.html prototype.
// 3D cylinder film reels (drag / wheel / touch / keyboard) + the cinematic
// shared-element expansion into full case-study detail views.

import "./caseStudies/emflow.js";
import "./caseStudies/swiggy.js";
import "./caseStudies/revifyPrd.js";
import "./caseStudies/rag.js";

const RADIUS = 420;
const ANIM_TIME = 750;

function pad(n) {
  return String(n).padStart(2, "0");
}

function ringDistance(target, current, total) {
  let d = target - current;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

function perfsHTML(isBottom) {
  let h = "";
  for (let i = 0; i < 22; i++) h += '<div class="ynw-perf"></div>';
  return '<div class="ynw-perfs ' + (isBottom ? "ynw-perfs--bottom" : "") + '">' + h + "</div>";
}

export function createFilmExperience(root, reelsData) {
  const reelsByKey = {};
  const cleanups = [];
  let isDetailActive = false;
  let isClosingDetail = false;
  let currentExpandedPortal = null;
  let activeOriginFrame = null;
  let activeOriginReel = null;
  let activeOriginRect = null;

  // ── Lightbox (gallery zoom) ──
  function openLightbox(src, caption) {
    let lb = document.getElementById("ynw-lightbox-modal");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "ynw-lightbox-modal";
      lb.className = "ynw-lightbox";
      lb.innerHTML =
        '<div class="ynw-lightbox-content">' +
        '<button class="ynw-lightbox-close" aria-label="Close zoomed screenshot">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        "<span>Close</span></button>" +
        '<img class="ynw-lightbox-img" alt="Zoomed project screenshot" />' +
        '<p class="ynw-lightbox-caption"></p>' +
        "</div>";
      lb.addEventListener("click", (e) => {
        if (e.target === lb) closeLightbox();
      });
      lb.querySelector(".ynw-lightbox-close").addEventListener("click", closeLightbox);
      document.body.appendChild(lb);
    }
    lb.querySelector("img").src = src;
    lb.querySelector(".ynw-lightbox-caption").textContent = caption || "";
    requestAnimationFrame(() => lb.classList.add("is-open"));
  }

  function closeLightbox() {
    const lb = document.getElementById("ynw-lightbox-modal");
    if (lb) lb.classList.remove("is-open");
  }

  // ── Inline detail builders (title cards + Revify) ──
  function buildTitleCardHTML(reel, itemData) {
    const isReelA = reel.reelKey === "a";
    const collectionName = isReelA ? "The Builds" : "The Thinking";
    const chapterTag = isReelA ? "CHAPTER 01 // PRODUCTION ARCHITECTURE" : "CHAPTER 02 // PRODUCT STRATEGY & TEARDOWNS";
    const overview = isReelA
      ? "High-impact engineering systems, full-stack architecture, and production distributed applications built by Harshal."
      : "Product strategy breakdowns, user friction teardowns, and comprehensive MVP specifications authored by Harshal.";
    const projects = reel.data.filter((f) => f.renderer !== "title-card");
    const cardsHTML = projects
      .map((p, i) => {
        const label = (isReelA ? "BUILD 0" : "CASE STUDY 0") + (i + 1);
        return (
          '<div class="ef-card">' +
          '<span class="ef-card-tag">' + label + "</span>" +
          '<h3 class="ef-card-title">' + p.title.replace(/\n/g, " ") + "</h3>" +
          '<p class="ef-card-desc">' + p.desc + "</p>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="ynw-detail-container">' +
      '<div class="ynw-detail-bar">' +
      '<button class="ynw-detail-back-btn" data-ynw-close aria-label="Back to Watchlist">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      "<span>Back to Watchlist</span>" +
      '<span class="ynw-detail-kbd">ESC</span>' +
      "</button>" +
      '<div class="ynw-detail-badge">' +
      '<span class="ynw-detail-dot"></span>' +
      "<span>" + collectionName + " // COLLECTION OVERVIEW</span>" +
      "</div>" +
      "</div>" +
      '<div class="ynw-detail-scroll">' +
      '<div class="ynw-detail-hero">' +
      '<span class="ynw-detail-hero-tag">' + chapterTag + "</span>" +
      '<h1 class="ynw-detail-hero-title">' + itemData.title + "</h1>" +
      '<p class="ynw-detail-hero-desc">' + overview + "</p>" +
      "</div>" +
      '<div class="ef-cards-grid" style="margin-top:24px;">' + cardsHTML + "</div>" +
      '<div class="ynw-detail-footer">' +
      '<div class="ynw-detail-footer-inner">' +
      '<button class="ynw-detail-footer-btn" data-ynw-close>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      "<span>Return to Watchlist</span>" +
      "</button>" +
      '<button class="ynw-detail-next-btn" data-ynw-title-next>' +
      "<span>" + (isReelA ? "Next Build: " : "Next Case Study: ") + projects[0].title.replace(/\n/g, " ") + "</span>" +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  const REVIFY_SCREENS = [
    { n: 1, title: "Product URL Ingestion & Onboarding", desc: "The primary user landing portal welcoming shoppers to input any standard Amazon product listing URL for automated review scraping.", caption: "Screen 01 — Hero Landing & Ingestion: 'Transform Reviews Into Insights' entry portal with live API connection indicator and Amazon URL input." },
    { n: 2, title: "Analysis Setup & Product Mapping", desc: "Captures the target product URL and optional user aliases, providing transparent onboarding guidance on how feature-based analysis works.", caption: "Screen 02 — Analysis Initialization: Validating product metadata, ASIN, and user review requirements before triggering the multi-agent pipeline." },
    { n: 3, title: "Dynamic Feature Selection Matrix", desc: "The AI agent parses product technical specifications into discrete capability facets, allowing the shopper to choose exactly what matters for their purchase.", caption: "Screen 03 — Dynamic Feature Selection: AI extracts 9 product capabilities (Performance, Processor, Battery, Display, Camera, Build, Storage, UI) for personalized weighting." },
    { n: 4, title: "Real-Time Pipeline Execution & Progress", desc: "Live multi-agent orchestration visualizer featuring dynamic stage progression (Scraping → Chunking → Analysis) to maintain shopper engagement.", caption: "Screen 04 — Real-Time Agent Pipeline: 5-stage progress UX (Initializing, Feature Extraction, Review Scraping, AI Analysis, Finalizing) eliminating cart abandonment during the 45s window." },
    { n: 5, title: "Executive Sentiment & Score Dashboard", desc: "High-level quantitative overview delivering rapid visual insights: Features Analyzed (7), Reviews Processed (197), Top Feature (Processor), and distribution charts.", caption: "Screen 05 — Executive Intelligence Dashboard: Synthesizing 197 processed reviews into sentiment pie charts, relative feature score bars, and overall product rating." },
    { n: 6, title: "Granular Feature Sentiment Analysis", desc: "Comprehensive breakdown providing honest, verified consensus on each individual feature (e.g. 100% Display vs. 20% Camera in low light) with zero marketing fluff.", caption: "Screen 06 — Detailed Feature Analysis: per-feature sentiment and verified buyer consensus — Processor 100% Positive, Battery life 60% Mixed-to-Positive, Display quality 100% Positive, Camera quality 20% Negative, Build quality 60% Mixed, Storage capacity 50% Neutral." },
  ];

  function buildRevifyDetailHTML(reel, itemData) {
    const isReelA = reel.reelKey === "a";
    const collectionName = isReelA ? "The Builds" : "The Thinking";
    const links = itemData.links || {};
    const linkBtns =
      (links.github
        ? '<a class="ynw-detail-link-btn" href="' + links.github + '" target="_blank" rel="noopener noreferrer" title="View Source Code">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>' +
          "<span>GitHub Repo &nearr;</span></a>"
        : "") +
      (links.live
        ? '<a class="ynw-detail-link-btn ynw-detail-link-btn--primary" href="' + links.live + '" target="_blank" rel="noopener noreferrer" title="Launch Web Application">' +
          '<span class="ynw-live-pulse"></span><span>Live Demo &nearr;</span></a>'
        : "");
    const galleryCards = REVIFY_SCREENS.map(
      (s) =>
        '<div class="ynw-gallery-card" data-cursor-hover data-full="/revify-project-screenshots/' + s.n + '.png" data-caption="' + s.caption.replace(/"/g, "&quot;") + '">' +
        '<div class="ynw-gallery-img-wrap">' +
        '<img src="/revify-project-screenshots/' + s.n + '.png" alt="Revify ' + s.title + '" loading="lazy" onerror="this.closest(\'.ynw-gallery-img-wrap\').classList.add(\'is-missing\'); this.remove();">' +
        '<div class="ynw-gallery-zoom-badge">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
        "<span>Click to Zoom</span></div></div>" +
        '<div class="ynw-gallery-info">' +
        '<div class="ynw-gallery-header">' +
        '<h3 class="ynw-gallery-title">' + s.title + "</h3>" +
        '<span class="ynw-gallery-tag">SCREEN 0' + s.n + "</span></div>" +
        '<p class="ynw-gallery-desc">' + s.desc + "</p>" +
        "</div></div>"
    ).join("");

    return (
      '<div class="ynw-detail-container">' +
      '<div class="ynw-detail-bar">' +
      '<div class="ynw-detail-actions">' +
      '<button class="ynw-detail-back-btn" data-ynw-close aria-label="Back to Watchlist">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      "<span>Back to Watchlist</span>" +
      '<span class="ynw-detail-kbd">ESC</span>' +
      "</button>" + linkBtns + "</div>" +
      '<div class="ynw-detail-badge">' +
      '<span class="ynw-detail-dot"></span>' +
      "<span>" + collectionName + " // REEL " + reel.reelKey.toUpperCase() + " &mdash; FRAME #" + pad(reel.current + 1) + "</span>" +
      "</div></div>" +

      '<div class="ynw-detail-scroll">' +
      '<div class="ynw-detail-hero">' +
      '<span class="ynw-detail-hero-tag">B2C AI ANALYTICS // MULTI-AGENT TRUST LAYER</span>' +
      '<h1 class="ynw-detail-hero-title">REVIFY</h1>' +
      '<p class="ynw-detail-hero-desc">The definitive trust layer for high-consideration e-commerce purchases. Transforming chaotic, generic user reviews into personalized, feature-level intelligence with deterministic scoring.</p>' +
      '<div class="ynw-metrics-grid">' +
      '<div class="ynw-metric-card"><span class="ynw-metric-val">13 MINS</span><span class="ynw-metric-label">Avg. Reading Time</span><span class="ynw-metric-sub">Capital One Research</span></div>' +
      '<div class="ynw-metric-card"><span class="ynw-metric-val ynw-metric-val--crimson">&lt; 60 SECS</span><span class="ynw-metric-label">Pipeline Latency</span><span class="ynw-metric-sub">Target: 45s with wait-time UX</span></div>' +
      '<div class="ynw-metric-card"><span class="ynw-metric-val">4 AGENTS</span><span class="ynw-metric-label">CrewAI Architecture</span><span class="ynw-metric-sub">Powered by Gemini 3.5 Flash</span></div>' +
      '<div class="ynw-metric-card"><span class="ynw-metric-val">DETERMINISTIC</span><span class="ynw-metric-label">Revify Scoring Logic</span><span class="ynw-metric-sub">Zero stochastic rating drift</span></div>' +
      "</div></div>" +

      '<div class="ynw-showcase-box">' +
      '<div class="ynw-showcase-topbar">' +
      '<div class="ynw-showcase-browser-left">' +
      '<div class="ynw-showcase-dots"><div class="ynw-showcase-dot ynw-showcase-dot--red"></div><div class="ynw-showcase-dot ynw-showcase-dot--yellow"></div><div class="ynw-showcase-dot ynw-showcase-dot--green"></div></div>' +
      '<div class="ynw-showcase-address">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
      "<span>https://revify.ai/analyze/sony-wh1000xm5</span></div></div>" +
      '<div class="ynw-showcase-tabs">' +
      '<button type="button" class="ynw-showcase-tab is-active" data-tab="tab-weights">01 // Ingestion &amp; Weights</button>' +
      '<button type="button" class="ynw-showcase-tab" data-tab="tab-pipeline">02 // Multi-Agent Pipeline</button>' +
      '<button type="button" class="ynw-showcase-tab" data-tab="tab-rating">03 // Revify Rating &amp; Sentiment</button>' +
      "</div></div>" +

      '<div class="ynw-showcase-panel is-active" id="tab-weights">' +
      '<div class="ynw-sc-input-bar">' +
      '<input class="ynw-sc-input" type="text" value="https://www.amazon.com/dp/B0D1XD1ZW3 &mdash; Sony WH-1000XM5 Premium Wireless ANC Headphones" readonly>' +
      '<button class="ynw-sc-btn" type="button">Extract Features</button></div>' +
      '<div class="ynw-sc-sliders-grid">' +
      '<div class="ynw-sc-slider-card"><div class="ynw-sc-slider-meta"><div class="ynw-sc-slider-title">Active Noise Cancellation</div><div class="ynw-sc-slider-note">Acoustic isolation in transit</div></div><div class="ynw-sc-slider-controls"><input class="ynw-sc-range" type="range" min="1" max="10" value="10" data-target="val-anc"><span class="ynw-sc-val-badge" id="val-anc">10 / 10</span></div></div>' +
      '<div class="ynw-sc-slider-card"><div class="ynw-sc-slider-meta"><div class="ynw-sc-slider-title">Battery Life &amp; Charging</div><div class="ynw-sc-slider-note">Continuous playback duration</div></div><div class="ynw-sc-slider-controls"><input class="ynw-sc-range" type="range" min="1" max="10" value="9" data-target="val-bat"><span class="ynw-sc-val-badge" id="val-bat">9 / 10</span></div></div>' +
      '<div class="ynw-sc-slider-card"><div class="ynw-sc-slider-meta"><div class="ynw-sc-slider-title">Comfort &amp; Long-Session Wear</div><div class="ynw-sc-slider-note">Ear cup clamp force &amp; padding</div></div><div class="ynw-sc-slider-controls"><input class="ynw-sc-range" type="range" min="1" max="10" value="8" data-target="val-comf"><span class="ynw-sc-val-badge" id="val-comf">8 / 10</span></div></div>' +
      '<div class="ynw-sc-slider-card"><div class="ynw-sc-slider-meta"><div class="ynw-sc-slider-title">Microphone &amp; Call Clarity</div><div class="ynw-sc-slider-note">Voice isolation in public spaces</div></div><div class="ynw-sc-slider-controls"><input class="ynw-sc-range" type="range" min="1" max="10" value="4" data-target="val-mic"><span class="ynw-sc-val-badge" id="val-mic">4 / 10</span></div></div>' +
      "</div></div>" +

      '<div class="ynw-showcase-panel" id="tab-pipeline">' +
      '<div class="ynw-sc-pipeline-header"><div class="ynw-sc-pipeline-title">CREWAI MULTI-AGENT EXECUTION GRAPH</div><div class="ynw-sc-pipeline-time"><span class="ynw-live-pulse"></span><span>ELAPSED: 28.4s // CAPPED &lt; 60s</span></div></div>' +
      '<div class="ynw-sc-agent-cards">' +
      '<div class="ynw-sc-agent-row"><div class="ynw-sc-agent-info"><div class="ynw-sc-agent-icon">01</div><div><div class="ynw-sc-agent-name">Review Acquisition Agent (Apify Zebu Actor)</div><div class="ynw-sc-agent-duty">Scraped, normalized and deduplicated 248 verified customer reviews from Amazon US</div></div></div><span class="ynw-sc-agent-pill ynw-sc-agent-pill--done">&#10003; Ingested (8.2s)</span></div>' +
      '<div class="ynw-sc-agent-row"><div class="ynw-sc-agent-info"><div class="ynw-sc-agent-icon">02</div><div><div class="ynw-sc-agent-name">Feature Extraction Agent (Gemini 3.5 Flash)</div><div class="ynw-sc-agent-duty">Parsed product taxonomy into 6 key capability facets &amp; mapped to user weight matrix</div></div></div><span class="ynw-sc-agent-pill ynw-sc-agent-pill--done">&#10003; Extracted (4.1s)</span></div>' +
      '<div class="ynw-sc-agent-row"><div class="ynw-sc-agent-info"><div class="ynw-sc-agent-icon">03</div><div><div class="ynw-sc-agent-name">Chunk Summary Agent (Context-Window Bypass)</div><div class="ynw-sc-agent-duty">Partitioned reviews into 4 structured JSON batches to eliminate token boundary overflows</div></div></div><span class="ynw-sc-agent-pill ynw-sc-agent-pill--done">&#10003; Synthesized (11.6s)</span></div>' +
      '<div class="ynw-sc-agent-row is-active"><div class="ynw-sc-agent-info"><div class="ynw-sc-agent-icon ynw-sc-agent-icon--running">04</div><div><div class="ynw-sc-agent-name">Review Analysis Agent (Sentiment &amp; Evidence Engine)</div><div class="ynw-sc-agent-duty">Evaluating weighted feature pros/cons &amp; computing mathematical Revify score</div></div></div><span class="ynw-sc-agent-pill ynw-sc-agent-pill--running">&#9889; Processing Batch 3/4</span></div>' +
      "</div></div>" +

      '<div class="ynw-showcase-panel" id="tab-rating">' +
      '<div class="ynw-sc-rating-layout">' +
      '<div class="ynw-sc-rating-main"><span class="ynw-sc-rating-tag">Personalized Rating</span><div class="ynw-sc-rating-score">8.6<span>/10</span></div><div class="ynw-sc-rating-match">High Recommendation Match</div><p class="ynw-sc-rating-desc">Weighted against your top priorities: ANC (10), Battery (9), Comfort (8), and Mic (4).</p></div>' +
      '<div class="ynw-sc-features-breakdown">' +
      '<div class="ynw-sc-feat-row"><div class="ynw-sc-feat-head"><span class="ynw-sc-feat-title">Active Noise Cancellation (Weight 10/10)</span><span class="ynw-sc-feat-pct">94% Positive // 204 Mentions</span></div><div class="ynw-sc-feat-bar-track"><div class="ynw-sc-feat-bar-fill" style="width: 94%;"></div></div></div>' +
      '<div class="ynw-sc-feat-row"><div class="ynw-sc-feat-head"><span class="ynw-sc-feat-title">Battery Life &amp; Charging (Weight 9/10)</span><span class="ynw-sc-feat-pct">91% Positive // 168 Mentions</span></div><div class="ynw-sc-feat-bar-track"><div class="ynw-sc-feat-bar-fill" style="width: 91%;"></div></div></div>' +
      '<div class="ynw-sc-feat-row"><div class="ynw-sc-feat-head"><span class="ynw-sc-feat-title">Comfort &amp; Ergonomics (Weight 8/10)</span><span class="ynw-sc-feat-pct">85% Positive // 112 Mentions</span></div><div class="ynw-sc-feat-bar-track"><div class="ynw-sc-feat-bar-fill" style="width: 85%;"></div></div></div>' +
      '<div class="ynw-sc-feat-row"><div class="ynw-sc-feat-head"><span class="ynw-sc-feat-title">Microphone Clarity (Weight 4/10)</span><span class="ynw-sc-feat-pct ynw-sc-feat-pct--mixed">58% Mixed // 44 Mentions</span></div><div class="ynw-sc-feat-bar-track"><div class="ynw-sc-feat-bar-fill ynw-sc-feat-bar-fill--mixed" style="width: 58%;"></div></div></div>' +
      "</div>" +
      '<div class="ynw-sc-quote-box">&ldquo;Verified Buyer Citation: The ANC genuinely silences the loudest subway trains and the 30-hour battery carried me through four days of heavy work without a charger. The mic picks up slight cafe ambience, but for listening it is superlative.&rdquo;</div>' +
      "</div></div></div>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">01 // THE PREMISE</span><h2 class="ynw-chapter-title">The Definitive Trust Layer for High-Consideration E-Commerce</h2><p class="ynw-chapter-sub">How Revify transforms overwhelming, generic product feedback into actionable, individualized confidence.</p></div>' +
      '<div class="ynw-twocol-grid">' +
      '<div class="ynw-prose-card"><h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg><span>What is Revify?</span></h3><p>Revify is a B2C AI analytics tool designed to act as the definitive trust layer for the e-commerce review ecosystem. It transforms how shoppers evaluate high-consideration purchases by generating personalized, feature-level insights and calculating a custom <strong>&ldquo;Revify Rating.&rdquo;</strong></p></div>' +
      '<div class="ynw-prose-card"><h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>What problem does it address?</span></h3><p>Shoppers currently suffer from decision fatigue and buyer&rsquo;s remorse. High-intent consumers are forced to sift through hundreds of irrelevant reviews to find information about the specific product capabilities they care about, often leading to cart abandonment or suboptimal purchases based on guesswork.</p></div>' +
      "</div></section>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">02 // THE PROBLEM</span><h2 class="ynw-chapter-title">The 13-Minute Dilemma: Why Modern Product Reviews Fail Shoppers</h2><p class="ynw-chapter-sub">The breakdown of today&rsquo;s unstructured, noisy, and conflicting feedback loops.</p></div>' +
      '<div class="ynw-threecol-grid">' +
      '<div class="ynw-prose-card"><h3><span class="ynw-prose-num">01.</span><span>Unstructured &amp; Generic</span></h3><p>According to Capital One Shopping Research, online shoppers spend an average of <strong>13 minutes</strong> reading reviews. High-signal technical feedback is buried inside endless commentary on unrelated customer service issues or superficial impressions.</p></div>' +
      '<div class="ynw-prose-card"><h3><span class="ynw-prose-num">02.</span><span>Irrelevant Noise</span></h3><p>A buyer seeking battery performance on a laptop must comb through dozens of reviews complaining about courier delivery delays, damaged packaging, or color variations that have zero bearing on the machine&rsquo;s real computing capabilities.</p></div>' +
      '<div class="ynw-prose-card"><h3><span class="ynw-prose-num">03.</span><span>Contradictory Sentiment</span></h3><p>One buyer praises the display while another calls it dim under the same listing. Without normalized feature extraction, users are left paralyzed by polarized anecdotes, leading directly to cart abandonment.</p></div>' +
      "</div></section>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">03 // THE APPROACH</span><h2 class="ynw-chapter-title">The 5-Stage Multi-Agent Architecture</h2><p class="ynw-chapter-sub">From raw marketplace URLs to personalized mathematical confidence in under 60 seconds.</p></div>' +
      '<div class="ynw-pipeline-flow">' +
      '<div class="ynw-pipe-step"><span class="ynw-pipe-step-num">STAGE 01</span><h4 class="ynw-pipe-step-title">Review Aggregation</h4><p class="ynw-pipe-step-desc">Ingests standard product URLs (initially prioritizing Amazon) and utilizes third-party scraping infrastructure to retrieve, normalize, and deduplicate customer reviews.</p></div>' +
      '<div class="ynw-pipe-step"><span class="ynw-pipe-step-num">STAGE 02</span><h4 class="ynw-pipe-step-title">Feature Extraction</h4><p class="ynw-pipe-step-desc">An AI agent parses the product page to dynamically identify key product features. The user then selects priority features and assigns each a custom weight from 1 to 10.</p></div>' +
      '<div class="ynw-pipe-step"><span class="ynw-pipe-step-num">STAGE 03</span><h4 class="ynw-pipe-step-title">Chunk Summary Agent</h4><p class="ynw-pipe-step-desc">Employs a CrewAI-orchestrated workflow where this specialized agent breaks massive review corpuses into discrete batches to bypass context-window boundaries.</p></div>' +
      '<div class="ynw-pipe-step"><span class="ynw-pipe-step-num">STAGE 04</span><h4 class="ynw-pipe-step-title">Sentiment Analysis</h4><p class="ynw-pipe-step-desc">A dedicated Review Analysis Agent maps summarized review data against user-selected features, generating clear sentiment breakdowns, pros/cons, and explanatory summaries.</p></div>' +
      '<div class="ynw-pipe-step"><span class="ynw-pipe-step-num">STAGE 05</span><h4 class="ynw-pipe-step-title">Personalized Scoring</h4><p class="ynw-pipe-step-desc">A deterministic Scoring Engine mathematically excludes reviews not mentioning the user&rsquo;s chosen features, producing a Revify Rating driven strictly by what they explicitly value.</p></div>' +
      "</div></section>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">04 // UNDER THE HOOD</span><h2 class="ynw-chapter-title">Technical Architecture &amp; System Stack</h2><p class="ynw-chapter-sub">Enterprise orchestration bridging modern web interfaces, agentic LLMs, and deterministic math.</p></div>' +
      '<table class="ynw-stack-table"><thead><tr><th style="width: 22%;">System Layer</th><th style="width: 28%;">Technologies</th><th>Key Engineering Responsibilities</th></tr></thead><tbody>' +
      '<tr><td class="ynw-stack-layer">Frontend</td><td class="ynw-stack-tech">React.js, Vite</td><td>Dynamic UX wait-time retention engine, interactive feature sliders, real-time pipeline status stream to keep shoppers actively engaged during the 45-60s processing cycle.</td></tr>' +
      '<tr><td class="ynw-stack-layer">Backend &amp; Logic</td><td class="ynw-stack-tech">Python, Flask</td><td>RESTful API layer, batch data orchestration, and the deterministic mathematical scoring engine that calculates the customized Revify Rating.</td></tr>' +
      '<tr><td class="ynw-stack-layer">AI Orchestration &amp; LLM</td><td class="ynw-stack-tech">CrewAI, Google Gemini 3.5 Flash</td><td>Multi-agent coordination powering 4 specialized agents: Feature Extraction, Review Acquisition, Chunk Summary, and Review Analysis.</td></tr>' +
      '<tr><td class="ynw-stack-layer">Data Acquisition</td><td class="ynw-stack-tech">Apify (Zebu Actor)</td><td>High-reliability e-commerce scraping infrastructure, proxy rotation, and normalization of unstructured marketplace payloads.</td></tr>' +
      '<tr><td class="ynw-stack-layer">Database &amp; Auth</td><td class="ynw-stack-tech">Supabase (PostgreSQL), Auth</td><td>Normalized review storage, intermediate AI output persistence to eliminate redundant LLM calls, and user profile management.</td></tr>' +
      "</tbody></table></section>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">05 // THE CHALLENGES</span><h2 class="ynw-chapter-title">Engineering Roadblocks &amp; Architectural Decisions</h2><p class="ynw-chapter-sub">Critical challenges solved in data acquisition, pipeline latency, context budgets, and scoring integrity.</p></div>' +
      '<div class="ynw-challenges-grid">' +
      '<div class="ynw-challenge-card"><div class="ynw-challenge-head"><h3 class="ynw-challenge-title">Marketplace Acquisition Reliability</h3><span class="ynw-challenge-tag">RESILIENCY</span></div><p class="ynw-challenge-body">The entire product pipeline depends on successful data extraction. If the Apify Zebu actor fails or returns empty data due to marketplace anti-scraping measures, downstream agents have no ground truth. We engineered automated retry policies with exponential backoff and payload validation checks.</p></div>' +
      '<div class="ynw-challenge-card"><div class="ynw-challenge-head"><h3 class="ynw-challenge-title">The 45-60s Latency Window vs. Retention</h3><span class="ynw-challenge-tag">PERFORMANCE</span></div><p class="ynw-challenge-body">Orchestrating multi-agent LLMs and web scrapers takes significant execution time, creating a 45-60 second wait window. To eliminate cart abandonment, the frontend implements captivating real-time pipeline status feeds that explain ongoing agent tasks step-by-step.</p></div>' +
      '<div class="ynw-challenge-card"><div class="ynw-challenge-head"><h3 class="ynw-challenge-title">Context Limits &amp; Hallucination Elimination</h3><span class="ynw-challenge-tag">ACCURACY</span></div><p class="ynw-challenge-body">Ingesting hundreds of reviews directly into an LLM causes context overflows and increases hallucination risks. The specialized Chunk Summary Agent partitions raw reviews into discrete batches and enforces strict JSON schemas to guarantee traceability back to verified customer quotes.</p></div>' +
      '<div class="ynw-challenge-card"><div class="ynw-challenge-head"><h3 class="ynw-challenge-title">Deterministic vs. Probabilistic Scoring</h3><span class="ynw-challenge-tag">FIDELITY</span></div><p class="ynw-challenge-body">Asking LLMs to generate the final rating led to stochastic scoring drift where identical inputs yielded fluctuating scores. We deliberately shifted final score calculation entirely into deterministic Python logic, combining feature sentiment exclusively with user-defined weights.</p></div>' +
      "</div></section>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">06 // THE OUTCOME</span><h2 class="ynw-chapter-title">Current Milestones &amp; Strategic Vision</h2><p class="ynw-chapter-sub">From the tested Phase 1 MVP to consumer social trust networks and B2B brand portals.</p></div>' +
      '<div class="ynw-roadmap-grid">' +
      '<div class="ynw-phase-card is-current"><span class="ynw-phase-badge ynw-phase-badge--live">&#9679; Phase 1: Built &amp; Tested (Current MVP)</span><h3 class="ynw-phase-title">End-to-End B2C Analytics Engine</h3><p class="ynw-phase-desc">Functional MVP with Amazon URL ingestion, CrewAI multi-agent orchestration, deterministic Revify Rating logic, and an engagement-optimized React interface with active failure guardrails.</p></div>' +
      '<div class="ynw-phase-card"><span class="ynw-phase-badge ynw-phase-badge--planned">&#9675; Phase 2: Planned</span><h3 class="ynw-phase-title">&ldquo;Anonymous Trust&rdquo; Social Layer</h3><p class="ynw-phase-desc">A consumer review community allowing verified purchasers to submit anonymous, feature-specific feedback completely insulated from merchant manipulation or sponsored bias.</p></div>' +
      '<div class="ynw-phase-card"><span class="ynw-phase-badge ynw-phase-badge--planned">&#9675; Phase 3: Planned</span><h3 class="ynw-phase-title">B2B Collaboration &amp; Multi-Platform</h3><p class="ynw-phase-desc">Expansion to Flipkart, Best Buy, and global retailers, paired with a brand intelligence portal allowing merchants to benchmark feature sentiment and address legitimate consumer pain points.</p></div>' +
      "</div></section>" +

      '<section class="ynw-chapter"><div class="ynw-chapter-header"><span class="ynw-chapter-num">07 // APPLICATION INTERFACE GALLERY</span><h2 class="ynw-chapter-title">Production Interface &amp; User Flow</h2><p class="ynw-chapter-sub">High-resolution walkthrough of the deployed Revify application &mdash; from Amazon URL ingestion to deterministic sentiment scoring.</p></div>' +
      '<div class="ynw-gallery-grid">' + galleryCards + "</div></section>" +

      '<div class="ynw-detail-footer"><div class="ynw-detail-footer-nav">' +
      '<button class="ynw-detail-footer-btn" data-ynw-close>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      "<span>Return to Watchlist</span></button>" +
      '<button class="ynw-detail-next-btn" data-ynw-next-frame="2"><span>Next Build: EMFLOW</span>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>' +
      "</div></div>" +

      "</div></div>"
    );
  }

  // ── Cinematic film-frame expansion ──
  function portalPerfsHTML(isBottom, metaText) {
    let holes = "";
    for (let i = 0; i < 28; i++) holes += '<div class="ynw-portal-hole"></div>';
    return (
      '<div class="ynw-portal-perfs ' + (isBottom ? "ynw-portal-perfs--bottom" : "") + '">' +
      '<div class="ynw-portal-holes">' + holes + "</div>" +
      '<span class="ynw-portal-meta">' + metaText + "</span></div>"
    );
  }

  function buildDetailHTML(reel, index, itemData) {
    const renderer = itemData.renderer || "title-card";
    if (renderer === "revify") return buildRevifyDetailHTML(reel, itemData);
    if (renderer === "emflow" && window.getEmFlowDetailHTML) return window.getEmFlowDetailHTML(reel, index, itemData);
    if (renderer === "swiggy" && window.getSwiggyDetailHTML) return window.getSwiggyDetailHTML(reel, index, itemData);
    if (renderer === "revify-prd" && window.getRevifyPrdDetailHTML) return window.getRevifyPrdDetailHTML(reel, index, itemData);
    if (renderer === "rag" && window.getRagDetailHTML) return window.getRagDetailHTML(reel, index, itemData);
    return buildTitleCardHTML(reel, itemData);
  }

  function openFilmDetail(reel, index, frameEl, itemData) {
    if (isDetailActive || isClosingDetail) return;
    isDetailActive = true;
    activeOriginReel = reel;
    activeOriginFrame = frameEl;

    reel.scene.classList.add("is-transitioning");
    reel.scene.style.transform = "translateZ(-" + RADIUS + "px) rotateY(" + -reel.accumDeg + "deg)";

    const rect = frameEl.getBoundingClientRect();
    activeOriginRect = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };

    const container = root.querySelector(".ynw-container");
    if (container) container.classList.add("ynw-receding");

    let backdrop = document.getElementById("ynw-expansion-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "ynw-expansion-backdrop";
      backdrop.className = "ynw-expansion-backdrop";
      document.body.appendChild(backdrop);
    }
    backdrop.classList.add("is-active");

    const portal = document.createElement("div");
    portal.className = "ynw-expansion-portal";
    portal.style.top = activeOriginRect.top + "px";
    portal.style.left = activeOriginRect.left + "px";
    portal.style.width = activeOriginRect.width + "px";
    portal.style.height = activeOriginRect.height + "px";

    const titleLines = itemData.title.split("\n").map((s) => s.trim()).join("<br>");
    const previewHTML =
      '<div class="ynw-portal-preview">' +
      '<span class="ynw-tag">' + itemData.tag + "</span>" +
      '<h3 class="ynw-title">' + titleLines + "</h3>" +
      '<p class="ynw-desc">' + itemData.desc + "</p>" +
      "</div>";

    portal.innerHTML = portalPerfsHTML(false, "YNW // " + itemData.title.replace(/\n/g, " ")) +
      '<div class="ynw-portal-body">' + previewHTML + buildDetailHTML(reel, index, itemData) + "</div>" +
      portalPerfsHTML(true, "35MM // 5219");
    document.body.appendChild(portal);
    currentExpandedPortal = portal;

    void portal.offsetWidth;

    const isMobile = window.innerWidth <= 768;
    const targetWidth = Math.min(window.innerWidth - (isMobile ? 20 : 64), 1180);
    const targetHeight = Math.min(window.innerHeight - (isMobile ? 30 : 80), 800);
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = Math.max(16, (window.innerHeight - targetHeight) / 2);

    requestAnimationFrame(() => {
      portal.style.top = targetTop + "px";
      portal.style.left = targetLeft + "px";
      portal.style.width = targetWidth + "px";
      portal.style.height = targetHeight + "px";
      portal.classList.add("is-expanded");
    });

    frameEl.classList.add("is-concealed");

    setTimeout(() => {
      portal.classList.add("is-content-revealed");

      // Generic close bindings
      portal.querySelectorAll("[data-ynw-close]").forEach((btn) => btn.addEventListener("click", closeFilmDetail));

      // Title card: advance to first project frame
      const titleNext = portal.querySelector("[data-ynw-title-next]");
      if (titleNext) {
        titleNext.addEventListener("click", () => {
          closeFilmDetail();
          setTimeout(() => {
            reel.goTo(1);
            setTimeout(() => {
              const frames = reel.scene.querySelectorAll(".ynw-frame");
              if (frames[1]) openFilmDetail(reel, 1, frames[1], reel.data[1]);
            }, 550);
          }, 450);
        });
      }

      // Revify: next build button (EMFLOW at index 2)
      const nextFrame = portal.querySelector("[data-ynw-next-frame]");
      if (nextFrame) {
        const target = parseInt(nextFrame.getAttribute("data-ynw-next-frame"), 10);
        nextFrame.addEventListener("click", () => {
          closeFilmDetail();
          setTimeout(() => {
            reel.goTo(target);
            setTimeout(() => {
              const frames = reel.scene.querySelectorAll(".ynw-frame");
              if (frames[target]) openFilmDetail(reel, target, frames[target], reel.data[target]);
            }, 550);
          }, 450);
        });
      }

      // Case-study module bindings
      const renderer = itemData.renderer;
      if (renderer === "emflow" && window.initEmFlowBindings) window.initEmFlowBindings(portal, reel, openFilmDetail, reel.data, closeFilmDetail);
      if (renderer === "swiggy" && window.initSwiggyBindings) window.initSwiggyBindings(portal, reel, openFilmDetail, reel.data, closeFilmDetail);
      if (renderer === "revify-prd" && window.initRevifyPrdBindings) window.initRevifyPrdBindings(portal, reel, openFilmDetail, reel.data, closeFilmDetail);
      if (renderer === "rag" && window.initRagBindings) window.initRagBindings(portal, reel, openFilmDetail, reel.data, closeFilmDetail);

      // Showcase tabs (Revify interactive canvas)
      const tabs = portal.querySelectorAll(".ynw-showcase-tab");
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
          portal.querySelectorAll(".ynw-showcase-panel").forEach((p) => {
            p.classList.toggle("is-active", p.id === tab.getAttribute("data-tab"));
          });
        });
      });

      // Feature weighting sliders update their value badges
      portal.querySelectorAll(".ynw-sc-range").forEach((range) => {
        const badge = portal.querySelector("#" + range.getAttribute("data-target"));
        if (!badge) return;
        range.addEventListener("input", () => {
          badge.textContent = range.value + " / 10";
        });
      });

      // Gallery lightbox
      portal.querySelectorAll(".ynw-gallery-card").forEach((card) => {
        card.addEventListener("click", () => openLightbox(card.getAttribute("data-full"), card.getAttribute("data-caption")));
      });

      const closeBtn = portal.querySelector("[data-ynw-close]");
      if (closeBtn) closeBtn.focus();
    }, 380);
  }

  function closeFilmDetail() {
    if (!isDetailActive || !currentExpandedPortal || isClosingDetail) return;
    isClosingDetail = true;

    const portal = currentExpandedPortal;
    const frameEl = activeOriginFrame;
    const container = root.querySelector(".ynw-container");
    const backdrop = document.getElementById("ynw-expansion-backdrop");

    portal.classList.remove("is-content-revealed");
    portal.classList.remove("is-expanded");
    portal.style.top = activeOriginRect.top + "px";
    portal.style.left = activeOriginRect.left + "px";
    portal.style.width = activeOriginRect.width + "px";
    portal.style.height = activeOriginRect.height + "px";

    if (container) container.classList.remove("ynw-receding");
    if (backdrop) backdrop.classList.remove("is-active");

    let hasCleanedUp = false;
    function finalizeClose() {
      if (hasCleanedUp) return;
      hasCleanedUp = true;
      if (frameEl) frameEl.classList.remove("is-concealed");
      if (portal && portal.parentNode) portal.parentNode.removeChild(portal);
      currentExpandedPortal = null;
      activeOriginFrame = null;
      activeOriginReel = null;
      activeOriginRect = null;
      isDetailActive = false;
      isClosingDetail = false;
    }

    portal.addEventListener("transitionend", function onEnd(e) {
      if (e.target === portal && (e.propertyName === "width" || e.propertyName === "top")) {
        portal.removeEventListener("transitionend", onEnd);
        finalizeClose();
      }
    });

    setTimeout(finalizeClose, 650);
  }

  // ── FilmReel: 3D cylinder carousel ──
  class FilmReel {
    constructor(cfg) {
      this.viewport = cfg.viewport;
      this.scene = cfg.scene;
      this.dotsEl = cfg.dotsEl;
      this.curEl = cfg.curEl;
      this.totEl = cfg.totEl;
      this.nameEl = cfg.nameEl;
      this.reelEl = cfg.reelEl;
      this.data = cfg.data;
      this.reelKey = cfg.reelKey;
      this.total = cfg.data.length;
      this.angle = 360 / this.total;
      this.current = 0;
      this.accumDeg = 0;
      this.isBusy = false;
      this.isDragging = false;
      this.startX = 0;
      this.dragOffset = 0;
      this.hasMoved = false;
      this.lastScrollTime = 0;
      this.init();
    }

    init() {
      const self = this;
      this.totEl.textContent = pad(this.total);

      this.data.forEach((item, i) => {
        const frame = document.createElement("div");
        frame.className = "ynw-frame";
        frame.style.transform = "rotateY(" + this.angle * i + "deg) translateZ(" + RADIUS + "px)";
        frame.setAttribute("data-idx", i);

        const titleLines = item.title.split("\n").map((s) => s.trim()).join("<br>");
        frame.innerHTML =
          '<div class="ynw-strip">' +
          perfsHTML(false) +
          '<div class="ynw-content">' +
          '<span class="ynw-tag">' + item.tag + "</span>" +
          '<h3 class="ynw-title">' + titleLines + "</h3>" +
          '<p class="ynw-desc">' + item.desc + "</p>" +
          '<div class="ynw-expand-hint">' +
          '<svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>' +
          "<span>Expand Frame</span></div>" +
          '<span class="ynw-edge ynw-edge--left">FRAME #' + pad(i + 1) + "</span>" +
          '<span class="ynw-edge ynw-edge--right">35MM // 5219</span>' +
          "</div>" +
          perfsHTML(true) +
          "</div>";

        // Click handling is delegated at scene level (see setupInteractions):
        // 3D-projected frames can miss naive hit-testing at their bbox centers.

        self.scene.appendChild(frame);
      });

      for (let i = 0; i < this.total; i++) {
        const dot = document.createElement("div");
        dot.className = "ynw-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("data-testid", "ynw-dot-" + this.reelKey + "-" + i);
        dot.addEventListener("click", () => self.goTo(i));
        this.dotsEl.appendChild(dot);
      }

      this.reelEl.querySelectorAll(".ynw-arrow").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (isDetailActive) return;
          self.goTo(btn.getAttribute("data-dir") === "prev" ? self.current - 1 : self.current + 1);
        });
      });

      this.setupInteractions();

      this.scene.style.transform = "translateZ(-" + RADIUS + "px) rotateY(0deg)";
      this.updateClasses();
    }

    setupInteractions() {
      const self = this;
      const vp = this.viewport;

      const onMouseDown = (e) => {
        if (isDetailActive || e.button !== 0) return;
        self.isDragging = true;
        self.hasMoved = false;
        self.startX = e.clientX;
        self.dragOffset = 0;
        vp.classList.add("is-dragging");
        self.scene.classList.remove("is-transitioning");
        e.preventDefault();
      };
      const onMouseMove = (e) => {
        if (!self.isDragging || isDetailActive) return;
        const deltaX = e.clientX - self.startX;
        if (Math.abs(deltaX) > 4) self.hasMoved = true;
        self.dragOffset = deltaX;
        const degDelta = (deltaX / 300) * self.angle;
        self.scene.style.transform = "translateZ(-" + RADIUS + "px) rotateY(" + (-self.accumDeg + degDelta) + "deg)";
      };
      const onMouseUp = () => {
        if (!self.isDragging) return;
        self.isDragging = false;
        vp.classList.remove("is-dragging");
        self.scene.classList.add("is-transitioning");
        const threshold = 45;
        if (self.dragOffset < -threshold) self.goTo(self.current + 1);
        else if (self.dragOffset > threshold) self.goTo(self.current - 1);
        else self.goTo(self.current);
        self.dragOffset = 0;
      };

      vp.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      cleanups.push(() => {
        vp.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      });

      let touchStartX = 0;
      let touchStartY = 0;
      let isHorizontalSwipe = false;

      const onTouchStart = (e) => {
        if (isDetailActive) return;
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        self.startX = t.clientX;
        self.isDragging = true;
        self.hasMoved = false;
        self.dragOffset = 0;
        isHorizontalSwipe = false;
        self.scene.classList.remove("is-transitioning");
      };
      const onTouchMove = (e) => {
        if (!self.isDragging || isDetailActive) return;
        const t = e.touches[0];
        const deltaX = t.clientX - touchStartX;
        const deltaY = t.clientY - touchStartY;
        if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) isHorizontalSwipe = true;
        if (isHorizontalSwipe) {
          if (e.cancelable) e.preventDefault();
          self.hasMoved = true;
          self.dragOffset = deltaX;
          const degDelta = (deltaX / 260) * self.angle;
          self.scene.style.transform = "translateZ(-" + RADIUS + "px) rotateY(" + (-self.accumDeg + degDelta) + "deg)";
        }
      };
      const onTouchEnd = () => {
        if (!self.isDragging) return;
        self.isDragging = false;
        self.scene.classList.add("is-transitioning");
        const threshold = 40;
        if (self.dragOffset < -threshold) self.goTo(self.current + 1);
        else if (self.dragOffset > threshold) self.goTo(self.current - 1);
        else self.goTo(self.current);
        self.dragOffset = 0;
      };

      vp.addEventListener("touchstart", onTouchStart, { passive: true });
      vp.addEventListener("touchmove", onTouchMove, { passive: false });
      vp.addEventListener("touchend", onTouchEnd);
      cleanups.push(() => {
        vp.removeEventListener("touchstart", onTouchStart);
        vp.removeEventListener("touchmove", onTouchMove);
        vp.removeEventListener("touchend", onTouchEnd);
      });

      const onWheel = (e) => {
        if (isDetailActive) return;
        const now = Date.now();
        if (now - self.lastScrollTime < 500) {
          e.preventDefault();
          return;
        }
        const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(dominantDelta) > 18) {
          e.preventDefault();
          self.lastScrollTime = now;
          self.goTo(dominantDelta > 0 ? self.current + 1 : self.current - 1);
        }
      };
      vp.addEventListener("wheel", onWheel, { passive: false });
      cleanups.push(() => vp.removeEventListener("wheel", onWheel));

      // Deterministic click zones: the browser's hit-testing is unreliable on
      // 3D-projected frames, so resolve intent geometrically — centre third
      // expands the active frame, the flanks rotate to the adjacent one.
      const onViewportClick = (e) => {
        if (isDetailActive || self.hasMoved) return;
        const rect = vp.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        if (Math.abs(dx) < rect.width * 0.3) {
          const frameEl = self.scene.querySelectorAll(".ynw-frame")[self.current];
          if (frameEl) openFilmDetail(self, self.current, frameEl, self.data[self.current]);
        } else {
          self.goTo(self.current + (dx < 0 ? -1 : 1));
        }
      };
      vp.addEventListener("click", onViewportClick);
      cleanups.push(() => vp.removeEventListener("click", onViewportClick));
    }

    goTo(index) {
      if (this.isBusy || isDetailActive) return;
      this.isBusy = true;
      const self = this;
      let diff = index - this.current;
      if (diff > this.total / 2) diff -= this.total;
      if (diff < -this.total / 2) diff += this.total;
      this.accumDeg += diff * this.angle;
      this.current = ((index % this.total) + this.total) % this.total;
      this.scene.classList.add("is-transitioning");
      this.scene.style.transform = "translateZ(-" + RADIUS + "px) rotateY(" + -this.accumDeg + "deg)";
      this.updateClasses();
      setTimeout(() => {
        self.isBusy = false;
      }, ANIM_TIME);
    }

    updateClasses() {
      const self = this;
      this.scene.querySelectorAll(".ynw-frame").forEach((f, i) => {
        f.classList.remove("is-active", "is-adjacent", "is-hidden");
        const dist = ringDistance(i, self.current, self.total);
        if (dist === 0) f.classList.add("is-active");
        else if (Math.abs(dist) === 1) f.classList.add("is-adjacent");
        else f.classList.add("is-hidden");
      });
      this.dotsEl.querySelectorAll(".ynw-dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === self.current);
      });
      this.curEl.textContent = pad(this.current + 1);
      this.nameEl.textContent = this.data[this.current].title.replace("\n", " ");
    }
  }

  // Instantiate reels from the catalog
  reelsData.forEach((reelDef) => {
    const el = root.querySelector('.ynw-reel[data-reel="' + reelDef.key + '"]');
    if (!el) return;
    const reel = new FilmReel({
      viewport: el.querySelector(".ynw-viewport"),
      scene: el.querySelector(".ynw-scene"),
      dotsEl: el.querySelector(".ynw-dots"),
      curEl: el.querySelector(".ynw-counter-current"),
      totEl: el.querySelector("[data-reel-total]"),
      nameEl: el.querySelector(".ynw-counter-name"),
      reelEl: el,
      data: reelDef.frames,
      reelKey: reelDef.key,
    });
    reelsByKey[reelDef.key] = reel;
  });

  // Keyboard: arrows rotate the hovered reel, ESC closes detail / lightbox
  let activeHoverReel = null;
  reelsData.forEach((reelDef) => {
    const el = root.querySelector('.ynw-reel[data-reel="' + reelDef.key + '"]');
    if (!el) return;
    const enter = () => {
      activeHoverReel = reelDef.key;
    };
    const leave = () => {
      activeHoverReel = null;
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    cleanups.push(() => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    });
  });

  const onKeydown = (e) => {
    const lb = document.getElementById("ynw-lightbox-modal");
    if (e.key === "Escape" && lb && lb.classList.contains("is-open")) {
      lb.classList.remove("is-open");
      e.preventDefault();
      return;
    }
    if (e.key === "Escape" && isDetailActive) {
      closeFilmDetail();
      e.preventDefault();
      return;
    }
    if (isDetailActive || !activeHoverReel) return;
    const reel = reelsByKey[activeHoverReel];
    if (!reel) return;
    if (e.key === "ArrowLeft") {
      reel.goTo(reel.current - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      reel.goTo(reel.current + 1);
      e.preventDefault();
    }
  };
  document.addEventListener("keydown", onKeydown);
  cleanups.push(() => document.removeEventListener("keydown", onKeydown));

  // Cleanup: tear down listeners, open overlays and injected state
  return function cleanup() {
    cleanups.forEach((fn) => fn());
    const portal = currentExpandedPortal;
    if (portal && portal.parentNode) portal.parentNode.removeChild(portal);
    const backdrop = document.getElementById("ynw-expansion-backdrop");
    if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    const lb = document.getElementById("ynw-lightbox-modal");
    if (lb && lb.parentNode) lb.parentNode.removeChild(lb);
  };
}
