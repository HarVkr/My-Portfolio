/**
 * SWIGGY TEARDOWN — Case Study & Interactive PDF Embed Module
 * Fully modularized project detail experience for your-next-watch.html
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('swiggy-case-study-styles')) return;

    var css = `
/* ================================================================
   SWIGGY TEARDOWN STYLES (PDF VIEWER & CASE STUDY)
   ================================================================ */
.sw-pdf-container {
  width: 100%;
  height: 680px;
  background: #0d0d10;
  border: 1px solid rgba(42, 42, 48, 0.85);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  position: relative;
}

.sw-pdf-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: #141418;
  border-bottom: 1px solid rgba(42, 42, 48, 0.85);
  flex-wrap: wrap;
  gap: 12px;
}

.sw-pdf-browser-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.sw-pdf-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.sw-pdf-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.sw-pdf-dot--red    { background: #e0443e; }
.sw-pdf-dot--yellow { background: #dea123; }
.sw-pdf-dot--green  { background: #1aab29; }

.sw-pdf-address {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  background: #0a0a0c;
  padding: 5px 14px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.sw-pdf-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sw-pdf-action-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 3px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sw-pdf-action-btn:hover {
  background: rgba(181, 31, 50, 0.16);
  border-color: var(--accent-primary);
  color: #fff;
}

.sw-pdf-action-btn--primary {
  background: rgba(181, 31, 50, 0.2);
  border-color: rgba(181, 31, 50, 0.45);
  color: #fff;
}

.sw-pdf-action-btn--primary:hover {
  background: var(--accent-primary);
  box-shadow: 0 0 16px rgba(181, 31, 50, 0.4);
}

.sw-pdf-iframe-wrap {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  background: #111115;
}

.sw-pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

@media (max-width: 768px) {
  .sw-pdf-container {
    height: 500px;
  }
}
    `;

    var styleEl = document.createElement('style');
    styleEl.id = 'swiggy-case-study-styles';
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
  }

  function getSwiggyDetailHTML(reel, index, itemData) {
    injectStyles();

    return '' +
      '<div class="ynw-detail-container">' +
        '<!-- Top Action & Navigation Bar -->' +
        '<div class="ynw-detail-bar">' +
          '<div class="ynw-detail-actions">' +
            '<button class="ynw-detail-back-btn" id="ynw-detail-close-btn" aria-label="Back to Watchlist">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
              '<span>Back to Watchlist</span>' +
              '<span class="ynw-detail-kbd">ESC</span>' +
            '</button>' +
            '<a class="ynw-detail-link-btn" href="https://drive.google.com/file/d/1pEVYoh2cVsSDOmYdQsMvdfkXh_12X0v-/view" target="_blank" rel="noopener noreferrer" title="Open PDF in Google Drive">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
              '<span>Open in Drive &nearr;</span>' +
            '</a>' +
            '<a class="ynw-detail-link-btn ynw-detail-link-btn--primary" href="pdfs/swiggy-teardown.pdf" download="Swiggy-Product-Teardown.pdf" title="Download Offline Copy">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
              '<span>Download PDF &darr;</span>' +
            '</a>' +
          '</div>' +
          '<div class="ynw-detail-badge">' +
            '<span class="ynw-detail-dot"></span>' +
            '<span>THE THINKING // REEL B &mdash; FRAME #01</span>' +
          '</div>' +
        '</div>' +

        '<!-- Scrollable Case Study Body -->' +
        '<div class="ynw-detail-scroll" id="ynw-detail-scroll-pane">' +

          '<!-- Hero Summary -->' +
          '<div class="ynw-detail-hero">' +
            '<span class="ynw-detail-hero-tag">PRODUCT TEARDOWN // UX FRICTION &amp; RETENTION</span>' +
            '<h1 class="ynw-detail-hero-title">SWIGGY TEARDOWN</h1>' +
            '<p class="ynw-detail-hero-desc">An exhaustive product, behavioral psychology, and interaction teardown analyzing hyperlocal ordering friction, cart abandonment thresholds, and post-checkout retention loops.</p>' +

            '<!-- 4-Card Metric Strip -->' +
            '<div class="ynw-metrics-grid">' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val">9 PAGES</span>' +
                '<span class="ynw-metric-label">Deconstructed Deck</span>' +
                '<span class="ynw-metric-sub">Complete UX Wireframes</span>' +
              '</div>' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val ynw-metric-val--crimson">CART FLOW</span>' +
                '<span class="ynw-metric-label">Friction Focus</span>' +
                '<span class="ynw-metric-sub">Drop-off Point Analysis</span>' +
              '</div>' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val">HYPERLOCAL</span>' +
                '<span class="ynw-metric-label">Delivery Economics</span>' +
                '<span class="ynw-metric-sub">Surcharges &amp; Conversion</span>' +
              '</div>' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val">EMBEDDED</span>' +
                '<span class="ynw-metric-label">Interactive Deck</span>' +
                '<span class="ynw-metric-sub">Multi-Page Reader</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- Embedded Interactive PDF Viewer -->' +
          '<div class="sw-pdf-container">' +
            '<div class="sw-pdf-topbar">' +
              '<div class="sw-pdf-browser-left">' +
                '<div class="sw-pdf-dots">' +
                  '<div class="sw-pdf-dot sw-pdf-dot--red"></div>' +
                  '<div class="sw-pdf-dot sw-pdf-dot--yellow"></div>' +
                  '<div class="sw-pdf-dot sw-pdf-dot--green"></div>' +
                '</div>' +
                '<div class="sw-pdf-address">' +
                  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
                  '<span>swiggy-product-teardown.pdf &bull; Interactive Multi-Page Viewer</span>' +
                '</div>' +
              '</div>' +
              '<div class="sw-pdf-actions">' +
                '<a class="sw-pdf-action-btn" href="https://drive.google.com/file/d/1pEVYoh2cVsSDOmYdQsMvdfkXh_12X0v-/view" target="_blank" rel="noopener noreferrer">' +
                  '<span>Full Screen &nearr;</span>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="sw-pdf-iframe-wrap">' +
              '<iframe class="sw-pdf-iframe" src="https://drive.google.com/file/d/1pEVYoh2cVsSDOmYdQsMvdfkXh_12X0v-/preview" allow="autoplay" loading="lazy"></iframe>' +
            '</div>' +
          '</div>' +

          '<!-- Teardown Chapters & Key Insights -->' +
          '<section class="ynw-chapter">' +
            '<div class="ynw-chapter-header">' +
              '<span class="ynw-chapter-num">01 // TEARDOWN SYNTHESIS</span>' +
              '<h2 class="ynw-chapter-title">Core Friction Points &amp; Strategic Opportunities</h2>' +
              '<p class="ynw-chapter-sub">Critical takeaways deconstructed across the end-to-end customer ordering journey.</p>' +
            '</div>' +
            '<div class="ynw-challenges-grid">' +
              '<div class="ynw-challenge-card">' +
                '<div class="ynw-challenge-head">' +
                  '<h3 class="ynw-challenge-title">1. Search &amp; Hyperlocal Discovery</h3>' +
                  '<span class="ynw-challenge-tag">DISCOVERY</span>' +
                '</div>' +
                '<p class="ynw-challenge-body">Analyzing cognitive overload on the home feed: excessive banner carousels, algorithmic recommendation fatigue, and the lack of intent-driven filtering for time-sensitive eaters.</p>' +
              '</div>' +
              '<div class="ynw-challenge-card">' +
                '<div class="ynw-challenge-head">' +
                  '<h3 class="ynw-challenge-title">2. Dish Customization Architecture</h3>' +
                  '<span class="ynw-challenge-tag">UX FLOW</span>' +
                '</div>' +
                '<p class="ynw-challenge-body">Evaluating modal friction during mandatory add-ons, portion selections, and dietary tags. Identifying how complex customization steps cause session abandonment midway through selection.</p>' +
              '</div>' +
              '<div class="ynw-challenge-card">' +
                '<div class="ynw-challenge-head">' +
                  '<h3 class="ynw-challenge-title">3. Cart Abandonment &amp; Fee Transparency</h3>' +
                  '<span class="ynw-challenge-tag">CHECKOUT</span>' +
                '</div>' +
                '<p class="ynw-challenge-body">The critical drop-off moment: unexpected delivery surcharges, packaging taxes, and surge fees revealed late in the funnel. Deconstructing the psychological barrier of price escalations at checkout.</p>' +
              '</div>' +
              '<div class="ynw-challenge-card">' +
                '<div class="ynw-challenge-head">' +
                  '<h3 class="ynw-challenge-title">4. Post-Order Tracking &amp; Habit Loops</h3>' +
                  '<span class="ynw-challenge-tag">RETENTION</span>' +
                '</div>' +
                '<p class="ynw-challenge-body">Redesigning live GPS delivery tracking, estimated delivery intervals, gamified delivery feedback, and habit-forming loyalty triggers to maximize 30-day repeat order velocity.</p>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<!-- Footer Navigation Dual-Action -->' +
          '<div class="ynw-detail-footer">' +
            '<div class="ynw-detail-footer-nav">' +
              '<button class="ynw-detail-footer-btn" id="ynw-detail-footer-back">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
                '<span>Return to Watchlist</span>' +
              '</button>' +
              '<button class="ynw-detail-next-btn" id="sw-next-prd">' +
                '<span>Next Thinking: REVIFY PRD</span>' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>';
  }

  function initSwiggyBindings(portal, reelB, openFilmDetail, REEL_B_DATA, closeFilmDetail) {
    var nextBtn = portal.querySelector('#sw-next-prd');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        closeFilmDetail();
        setTimeout(function() {
          reelB.goTo(1);
          setTimeout(function() {
            var frames = reelB.scene.querySelectorAll('.ynw-frame');
            if (frames[1]) {
              openFilmDetail(reelB, 1, frames[1], REEL_B_DATA[1]);
            }
          }, 550);
        }, 450);
      });
    }
  }

  window.getSwiggyDetailHTML = getSwiggyDetailHTML;
  window.initSwiggyBindings = initSwiggyBindings;

})();

