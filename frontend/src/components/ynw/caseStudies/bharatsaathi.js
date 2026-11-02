/**
 * BHARATSAATHI — HyperVerge Case Study Module
 * Reel B Frame #04: BHARATSAATHI (Simplifying Digital KYC for Bharat using AI)
 * Author: Harshal Vhatkar (Associate Product Manager at Hyperverge)
 */

(function () {
  'use strict';

  function injectStyles() {
    if (document.getElementById('bharatsaathi-case-study-styles')) return;

    var css = `
/* ================================================================
   BHARATSAATHI CASE STUDY STYLES
   ================================================================ */
.bs-shell {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.bs-author-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(181, 31, 50, 0.12);
  border: 1px solid rgba(181, 31, 50, 0.3);
  border-radius: 999px;
  padding: 6px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: var(--paper);
  margin-top: 12px;
  letter-spacing: 0.5px;
}

.bs-author-chip span {
  color: var(--crimson-light);
  font-weight: 600;
}

.bs-persona-card {
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bs-persona-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 10px;
}

.bs-persona-name {
  font-family: 'Clash Display', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.bs-persona-tag {
  font-family: monospace;
  font-size: 10px;
  color: var(--accent-primary);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.bs-persona-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 4px 0;
}

.bs-trait-pill {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 11px;
  color: var(--text-secondary);
}

.bs-strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 14px;
}

@media (max-width: 768px) {
  .bs-strategy-grid {
    grid-template-columns: 1fr;
  }
}

.bs-strategy-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 18px;
}

.bs-strategy-card h4 {
  font-family: 'Clash Display', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bs-cta-banner {
  border: 1px solid rgba(181, 31, 50, 0.4);
  background: linear-gradient(145deg, rgba(181, 31, 50, 0.14) 0%, rgba(20, 20, 26, 0.95) 100%);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 12px 40px rgba(181, 31, 50, 0.15);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bs-metrics-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
  font-size: 13px;
}

.bs-metrics-table th,
.bs-metrics-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.bs-metrics-table th {
  color: var(--text-secondary);
  font-family: monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bs-metrics-table td {
  color: var(--paper);
}

.bs-metrics-table td strong {
  color: #2ed573;
}
`;

    var s = document.createElement('style');
    s.id = 'bharatsaathi-case-study-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  var DRIVE_LINK = "https://drive.google.com/file/d/18QIjkYB5ZfamfvYVMiEBNywS8D1Vq7Hn/view?usp=sharing";

  function getBharatSaathiDetailHTML(reel, index, itemData) {
    injectStyles();

    return '' +
      '<div class="ynw-detail-container">' +
        '<div class="ynw-detail-bar">' +
          '<div class="ynw-detail-actions">' +
            '<button class="ynw-detail-back-btn" id="ynw-detail-close-btn" aria-label="Back to Watchlist">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
              '<span>Back to Watchlist</span>' +
              '<span class="ynw-detail-kbd">ESC</span>' +
            '</button>' +
            '<a class="ynw-detail-link-btn ynw-detail-link-btn--primary" href="' + DRIVE_LINK + '" target="_blank" rel="noopener noreferrer" title="View Full 16-Slide Case Study on Google Drive">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
              '<span>Full Case Study (Drive) &nearr;</span>' +
            '</a>' +
          '</div>' +
          '<div class="ynw-detail-badge">' +
            '<span class="ynw-detail-dot"></span>' +
            '<span>THE THINKING // REEL B &mdash; FRAME #04</span>' +
          '</div>' +
        '</div>' +

        '<div class="ynw-detail-scroll">' +
          '<!-- Hero -->' +
          '<div class="ynw-detail-hero">' +
            '<span class="ynw-detail-hero-tag">HYPERVERGE CASE STUDY // AI FOR FINANCIAL INCLUSION</span>' +
            '<h1 class="ynw-detail-hero-title">BHARATSAATHI</h1>' +
            '<p class="ynw-detail-hero-desc">Simplifying Digital KYC for Bharat using AI. A lightweight, voice-first, offline-friendly onboarding solution designed for rural and semi-urban India.</p>' +

            '<div class="bs-author-chip">' +
              'Case Study on <span>HyperVerge</span> &bull; By Harshal Vhatkar (Associate Product Manager)' +
            '</div>' +

            '<!-- 4-Card Metric Strip -->' +
            '<div class="ynw-metrics-grid" style="margin-top: 24px;">' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val">HYPERVERGE</span>' +
                '<span class="ynw-metric-label">Product Context</span>' +
                '<span class="ynw-metric-sub">Digital KYC &amp; Identity AI</span>' +
              '</div>' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val ynw-metric-val--crimson">&ge; 90%</span>' +
                '<span class="ynw-metric-label">Target Completion</span>' +
                '<span class="ynw-metric-sub">&le; 3 min verification cycle</span>' +
              '</div>' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val">VOICE-FIRST</span>' +
                '<span class="ynw-metric-label">Regional AI Guide</span>' +
                '<span class="ynw-metric-sub">Two-way dialect assistance</span>' +
              '</div>' +
              '<div class="ynw-metric-card">' +
                '<span class="ynw-metric-val">OFFLINE-READY</span>' +
                '<span class="ynw-metric-label">Resilient Architecture</span>' +
                '<span class="ynw-metric-sub">Encrypted progress &amp; retry</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bs-shell">' +

            '<!-- Chapter 01: The Problem -->' +
            '<section class="ynw-chapter">' +
              '<div class="ynw-chapter-header">' +
                '<span class="ynw-chapter-num">01 // THE ROADBLOCKS</span>' +
                '<h2 class="ynw-chapter-title">Why Digital KYC Breaks in Bharat</h2>' +
                '<p class="ynw-chapter-sub">Millions of rural and semi-urban users drop off due to app complexity, network volatility, and distrust.</p>' +
              '</div>' +
              '<div class="ynw-twocol-grid">' +
                '<div class="bs-persona-card">' +
                  '<div class="bs-persona-header">' +
                    '<h3 class="bs-persona-name">Ramesh (Age 50)</h3>' +
                    '<span class="bs-persona-tag">Rural Jharkhand</span>' +
                  '</div>' +
                  '<div class="bs-persona-traits">' +
                    '<span class="bs-trait-pill">Basic Android Phone</span>' +
                    '<span class="bs-trait-pill">Low Digital Literacy</span>' +
                    '<span class="bs-trait-pill">First-time KYC</span>' +
                  '</div>' +
                  '<p class="ef-prose" style="font-size:13px; line-height:1.6; margin:0;">' +
                    'Overwhelmed by confusing, jargon-filled screens. Frequent network dropouts cause timeouts and data loss. High skepticism about online document legitimacy prevents completion without in-person assistance.' +
                  '</p>' +
                '</div>' +
                '<div class="bs-persona-card">' +
                  '<div class="bs-persona-header">' +
                    '<h3 class="bs-persona-name">Abhishek (Age 28)</h3>' +
                    '<span class="bs-persona-tag">Semi-Urban Tier-3</span>' +
                  '</div>' +
                  '<div class="bs-persona-traits">' +
                    '<span class="bs-trait-pill">Mid-range Smartphone</span>' +
                    '<span class="bs-trait-pill">Medium Literacy</span>' +
                    '<span class="bs-trait-pill">Values Speed</span>' +
                  '</div>' +
                  '<p class="ef-prose" style="font-size:13px; line-height:1.6; margin:0;">' +
                    'Frustrated by repetitive, lengthy forms and inefficient document upload failures. Having to restart the entire verification flow after a single minor upload glitch causes instant app abandonment.' +
                  '</p>' +
                '</div>' +
              '</div>' +
            '</section>' +

            '<!-- Chapter 02: The Mission & Solutions -->' +
            '<section class="ynw-chapter">' +
              '<div class="ynw-chapter-header">' +
                '<span class="ynw-chapter-num">02 // THE MISSION</span>' +
                '<h2 class="ynw-chapter-title">Four Core Pillars Making KYC Effortless</h2>' +
                '<p class="ynw-chapter-sub">To design a solution so intuitive Ramesh completes it without help, and so fast Abhishek loves it.</p>' +
              '</div>' +
              '<div class="ynw-twocol-grid">' +
                '<div class="ynw-prose-card">' +
                  '<h3>' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>' +
                    '<span>01. Voice Mode Assistance</span>' +
                  '</h3>' +
                  '<p>A simple on-screen mic toggle reads instructions aloud in regional languages. Supports two-way voice Q&amp;A (&ldquo;How do I upload Aadhaar?&rdquo;) and context-aware screen narration, enabling independent completion.</p>' +
                '</div>' +
                '<div class="ynw-prose-card">' +
                  '<h3>' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h10M7 17h6"/></svg>' +
                    '<span>02. AI Document Autoextract</span>' +
                  '</h3>' +
                  '<p>Instantly extracts Name, DOB, Address, and ID numbers from Aadhaar, PAN, DL, and Voter ID. Intelligent field mapping detects missing or mismatched data, eliminating manual typing errors.</p>' +
                '</div>' +
                '<div class="ynw-prose-card">' +
                  '<h3>' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                    '<span>03. AI Helpline Agent</span>' +
                  '</h3>' +
                  '<p>Integrated toll-free IVR inside the app. The AI agent pre-screens and understands user friction in their native dialect before warm-transferring to a human operator when necessary.</p>' +
                '</div>' +
                '<div class="ynw-prose-card">' +
                  '<h3>' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>' +
                    '<span>04. Fail-Safe Retry &amp; Resume</span>' +
                  '</h3>' +
                  '<p>Every step auto-saves locally in encrypted form. Users never restart from scratch if connectivity drops or the app closes. Friendly retry prompts allow repeating single actions without losing progress.</p>' +
                '</div>' +
              '</div>' +
            '</section>' +

            '<!-- Chapter 03: Architecture & Low Bandwidth -->' +
            '<section class="ynw-chapter">' +
              '<div class="ynw-chapter-header">' +
                '<span class="ynw-chapter-num">03 // ARCHITECTURE</span>' +
                '<h2 class="ynw-chapter-title">Low-Bandwidth &amp; Hybrid Processing</h2>' +
                '<p class="ynw-chapter-sub">Balancing client-side instant responsiveness with cloud-grade fraud checks and compliance.</p>' +
              '</div>' +
              '<div class="bs-strategy-grid">' +
                '<div class="bs-strategy-card">' +
                  '<h4>' +
                    '<span style="color:var(--accent-primary);">&#9679;</span>' +
                    '<span>On-Device Execution</span>' +
                  '</h4>' +
                  '<p class="ef-prose" style="font-size:12.5px; line-height:1.6; margin:0;">' +
                    '&bull; <strong>Offline Mode:</strong> Form filling, document capture, and liveness checks work without active internet.<br>' +
                    '&bull; <strong>Adaptive Compression:</strong> Automatically scales document images and video resolution to match 2G/3G speeds.<br>' +
                    '&bull; <strong>Instant Feedback:</strong> Local edge heuristics provide immediate visual &amp; audio alerts before uploading.' +
                  '</p>' +
                '</div>' +
                '<div class="bs-strategy-card">' +
                  '<h4>' +
                    '<span style="color:var(--accent-primary);">&#9679;</span>' +
                    '<span>Server-Side Cloud Core</span>' +
                  '</h4>' +
                  '<p class="ef-prose" style="font-size:12.5px; line-height:1.6; margin:0;">' +
                    '&bull; <strong>High-Accuracy Face Match:</strong> Cloud biometric matching and anti-spoofing validation.<br>' +
                    '&bull; <strong>Fraud &amp; Tamper Detection:</strong> AI detects digital image alterations and forged government IDs.<br>' +
                    '&bull; <strong>SDK Sizing Optimization:</strong> Modular SDK architecture with selective language downloads minimizes app footprint.' +
                  '</p>' +
                '</div>' +
              '</div>' +
            '</section>' +

            '<!-- Chapter 04: Metrics & Impact -->' +
            '<section class="ynw-chapter">' +
              '<div class="ynw-chapter-header">' +
                '<span class="ynw-chapter-num">04 // OUTCOME</span>' +
                '<h2 class="ynw-chapter-title">Success Targets &amp; Measurable Impact</h2>' +
                '<p class="ynw-chapter-sub">Quantitative KPIs set to validate financial onboarding adoption across rural Bharat.</p>' +
              '</div>' +
              '<table class="bs-metrics-table">' +
                '<thead>' +
                  '<tr>' +
                    '<th>Metric</th>' +
                    '<th>Definition</th>' +
                    '<th>Target SLA</th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody>' +
                  '<tr>' +
                    '<td><strong>Completion Rate</strong></td>' +
                    '<td>% of started KYC processes completed without abandonment</td>' +
                    '<td><strong>&ge; 90%</strong> (within 3 months)</td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td><strong>Average Onboarding Time</strong></td>' +
                    '<td>End-to-end user time from opening app to verification approval</td>' +
                    '<td><strong>&le; 3 min</strong> (Doc) &bull; <strong>&le; 2 min</strong> (DigiLocker)</td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td><strong>Retry &amp; Resume Recovery</strong></td>' +
                    '<td>% of dropped sessions successfully resumed from saved state</td>' +
                    '<td><strong>&ge; 80%</strong> successful recovery</td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td><strong>AI Voice Mode Adoption</strong></td>' +
                    '<td>% of rural and first-time digital users engaging voice guidance</td>' +
                    '<td><strong>50%+ adoption</strong> in target cohort</td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td><strong>Autoextract Accuracy</strong></td>' +
                    '<td>Field extraction accuracy without manual user correction</td>' +
                    '<td><strong>&ge; 95%</strong> accuracy</td>' +
                  '</tr>' +
                '</tbody>' +
              '</table>' +
            '</section>' +

            '<!-- CTA Card: Detailed Presentation Link -->' +
            '<div class="bs-cta-banner">' +
              '<span style="font-family: monospace; font-size: 10px; color: var(--accent-primary); letter-spacing: 2px; text-transform: uppercase;">' +
                'DETAILED CASE STUDY &bull; 16-SLIDE DECK' +
              '</span>' +
              '<h3 style="margin: 0; font-family: \'Clash Display\', sans-serif; font-size: 20px; color: #fff;">' +
                'Want to explore the complete BharatSaathi presentation?' +
              '</h3>' +
              '<p style="margin: 0; font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">' +
                'The full slide deck covers feature prioritization matrices, security protocols against face-spoofing and document tampering, complete interactive UI prototype flows, and SDK packaging strategies.' +
              '</p>' +
              '<div style="margin-top: 6px;">' +
                '<a href="' + DRIVE_LINK + '" target="_blank" rel="noopener noreferrer" class="ynw-detail-link-btn ynw-detail-link-btn--primary" style="display:inline-flex; padding: 12px 24px; font-size: 12px;">' +
                  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
                  '<span>Open Complete Case Study on Google Drive &nearr;</span>' +
                '</a>' +
              '</div>' +
            '</div>' +

          '</div>' +

          '<!-- Footer -->' +
          '<div class="ynw-detail-footer">' +
            '<div class="ynw-detail-footer-inner">' +
              '<button class="ynw-detail-footer-btn" id="ynw-detail-footer-back">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
                '<span>Return to Watchlist</span>' +
              '</button>' +
              '<button class="ynw-detail-next-btn" id="bs-next-swiggy">' +
                '<span>Next Thinking: SWIGGY PRODUCT TEARDOWN</span>' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>';
  }

  function initBharatSaathiBindings(portal, reel, openFilmDetail, REEL_DATA, closeFilmDetail) {
    var nextSwiggy = portal.querySelector('#bs-next-swiggy');
    if (nextSwiggy) {
      nextSwiggy.addEventListener('click', function() {
        closeFilmDetail();
        setTimeout(function() {
          reel.goTo(0);
          setTimeout(function() {
            var frames = reel.scene.querySelectorAll('.ynw-frame');
            if (frames[1]) {
              openFilmDetail(reel, 1, frames[1], REEL_DATA[1]);
            }
          }, 550);
        }, 450);
      });
    }
  }

  injectStyles();
  window.getBharatSaathiDetailHTML = getBharatSaathiDetailHTML;
  window.initBharatSaathiBindings = initBharatSaathiBindings;

})();

