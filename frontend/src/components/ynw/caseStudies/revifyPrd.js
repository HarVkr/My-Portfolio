/**
 * REVIFY PRD — Interactive Case Study & Notion Embedded Document Module
 * Authentic PRD experience based on Harshal's Notion Product Specification:
 * https://app.notion.com/p/work-by-harshal/Revify-B2C-AI-Review-Analytics-4066e359e29b80d0a793f3e045f1bffe
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('revify-prd-styles')) return;

    var css = `
/* ================================================================
   REVIFY PRD NOTION-STYLE VIEWER & CASE STUDY STYLES
   ================================================================ */
.prd-shell {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* PRD Notion Chrome / Topbar */
.prd-chrome {
  background: #121216;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.prd-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
}

.prd-crumb-icon {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-weight: 700;
  font-size: 11px;
}

.prd-crumb-current {
  color: #fff;
  font-weight: 600;
}

.prd-chrome-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.prd-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(46, 213, 115, 0.12);
  border: 1px solid rgba(46, 213, 115, 0.3);
  color: #2ed573;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.prd-status-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #2ed573;
  border-radius: 50%;
  box-shadow: 0 0 8px #2ed573;
}

.prd-notion-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(181, 31, 50, 0.18);
  border: 1px solid var(--accent-primary);
  color: #fff;
  padding: 7px 16px;
  border-radius: 4px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.prd-notion-btn:hover {
  background: var(--accent-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(181, 31, 50, 0.4);
}

/* Document Body Layout: Sidebar TOC + Main Content */
.prd-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  align-items: start;
}

@media (max-width: 960px) {
  .prd-layout {
    grid-template-columns: 1fr;
  }
  .prd-sidebar {
    display: none;
  }
}

/* Sidebar Table of Contents */
.prd-sidebar {
  position: sticky;
  top: 20px;
  background: #111115;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 18px;
}

.prd-sidebar-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.prd-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.prd-toc-link {
  display: block;
  padding: 6px 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 4px;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

.prd-toc-link:hover,
.prd-toc-link.is-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  border-left-color: var(--accent-primary);
}

/* Main PRD Document */
.prd-document {
  background: #111115;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 36px 40px;
}

@media (max-width: 640px) {
  .prd-document {
    padding: 24px 20px;
  }
}

.prd-doc-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 24px;
  margin-bottom: 32px;
}

.prd-doc-icon {
  font-size: 40px;
  margin-bottom: 14px;
  display: inline-block;
}

.prd-doc-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px 0;
  letter-spacing: -0.5px;
}

.prd-doc-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* PRD Section Blocks */
.prd-section {
  margin-bottom: 40px;
  scroll-margin-top: 30px;
}

.prd-section-heading {
  font-family: 'Clash Display', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 10px;
}

.prd-section-heading .num {
  color: var(--accent-primary);
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

.prd-prose {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 16px 0;
}

/* Phase Cards Grid */
.prd-phases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}

@media (max-width: 800px) {
  .prd-phases-grid {
    grid-template-columns: 1fr;
  }
}

.prd-phase-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 18px;
  position: relative;
  transition: all 0.2s ease;
}

.prd-phase-card--active {
  background: rgba(181, 31, 50, 0.06);
  border-color: rgba(181, 31, 50, 0.4);
}

.prd-phase-tag {
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin-bottom: 6px;
  display: block;
}

.prd-phase-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px 0;
}

.prd-phase-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
}

/* Callout Box (Notion Style) */
.prd-callout {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid var(--accent-primary);
  border-radius: 4px;
  padding: 16px 20px;
  margin: 18px 0;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.prd-callout-icon {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}

.prd-callout-content {
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.prd-callout-content strong {
  color: #fff;
}

/* Persona Card */
.prd-persona-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(20, 20, 26, 0.7) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 22px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 22px;
  align-items: start;
  margin: 20px 0;
}

@media (max-width: 640px) {
  .prd-persona-card {
    grid-template-columns: 1fr;
  }
}

.prd-persona-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary) 0%, #301018 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Clash Display', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.prd-persona-name {
  font-family: 'Clash Display', sans-serif;
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.prd-persona-role {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--accent-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  display: block;
}

.prd-persona-bio {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0 0 14px 0;
}

.prd-persona-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.prd-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 10px;
  border-radius: 3px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: var(--text-secondary);
}

/* User Story Cards */
.prd-story-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 16px;
}

.prd-story-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 8px;
}

.prd-story-tag {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-primary);
  letter-spacing: 0.5px;
}

.prd-story-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.prd-story-narrative {
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  color: #fff;
  font-style: italic;
  margin: 0 0 14px 0;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.prd-ac-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.prd-ac-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.prd-ac-list li {
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  color: var(--text-secondary);
  line-height: 1.55;
}

/* Interactive Weight & Sentiment Scoring Simulator */
.prd-sim-container {
  background: #0e0e12;
  border: 1px solid rgba(181, 31, 50, 0.3);
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
}

.prd-sim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.prd-sim-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.prd-sim-badge {
  background: rgba(181, 31, 50, 0.15);
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.prd-sim-sliders {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 720px) {
  .prd-sim-sliders {
    grid-template-columns: 1fr;
  }
}

.prd-sim-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px;
  border-radius: 6px;
}

.prd-sim-item-header {
  display: flex;
  justify-content: space-between;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
}

.prd-sim-slider {
  width: 100%;
  accent-color: var(--accent-primary);
  cursor: pointer;
}

.prd-sim-sentiment {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
}

.prd-sim-result {
  background: #14141a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
}

.prd-sim-calc-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
  max-width: 440px;
}

.prd-sim-score-badge {
  text-align: right;
}

.prd-sim-score-val {
  font-family: 'Clash Display', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #2ed573;
  line-height: 1;
}

.prd-sim-score-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Metrics Cards */
.prd-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 18px 0;
}

@media (max-width: 800px) {
  .prd-metrics-grid {
    grid-template-columns: 1fr;
  }
}

.prd-metric-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 18px;
}

.prd-metric-card--northstar {
  background: rgba(181, 31, 50, 0.05);
  border-color: rgba(181, 31, 50, 0.35);
}

.prd-metric-tag {
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
  display: block;
}

.prd-metric-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px 0;
}

.prd-metric-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
`;

    var s = document.createElement('style');
    s.id = 'revify-prd-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function getRevifyPrdDetailHTML(reel, index, itemData) {
    injectStyles();

    var titleLines = 'REVIFY PRD: B2C AI REVIEW ANALYTICS';
    var collectionName = 'The Thinking';
    var notionUrl = 'https://app.notion.com/p/work-by-harshal/Revify-B2C-AI-Review-Analytics-4066e359e29b80d0a793f3e045f1bffe?source=copy_link';

    return '' +
      '<div class="ynw-detail-container">' +
        // Top navigation bar
        '<div class="ynw-detail-bar">' +
          '<button class="ynw-detail-back-btn" id="ynw-detail-close-btn" aria-label="Back to Watchlist">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
            '<span>Back to Watchlist</span>' +
            '<span class="ynw-detail-kbd">ESC</span>' +
          '</button>' +
          '<div class="ynw-detail-actions">' +
            '<a href="' + notionUrl + '" target="_blank" rel="noopener" class="ynw-detail-action-btn" title="Open in Notion workspace">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 19.5v-15zM6.5 4a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5H18a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H6.5z"/></svg>' +
              '<span>Open in Notion ↗</span>' +
            '</a>' +
          '</div>' +
          '<div class="ynw-detail-badge">' +
            '<span class="ynw-detail-dot"></span>' +
            '<span>' + collectionName + ' // REEL ' + reel.reelKey.toUpperCase() + ' \u2014 FRAME #' + String((reel.current || index) + 1).padStart(2, '0') + '</span>' +
          '</div>' +
        '</div>' +

        // Main scrollable content
        '<div class="ynw-detail-scroll">' +
          // Hero
          '<div class="ynw-detail-hero">' +
            '<span class="ynw-detail-hero-tag">FEATURED PRODUCT SPEC // PRODUCT REQUIREMENTS DOCUMENT</span>' +
            '<h1 class="ynw-detail-hero-title">' + titleLines + '</h1>' +
            '<p class="ynw-detail-hero-desc">Phase 1 MVP specification for the e-commerce review trust layer. Scoped around high-intent shopper persona Akash (28), weighted sentiment extraction, and deterministic Revify Rating.</p>' +
          '</div>' +

          '<div class="prd-shell">' +
            // Notion Chrome bar
            '<div class="prd-chrome">' +
              '<div class="prd-breadcrumbs">' +
                '<span class="prd-crumb-icon">N</span>' +
                '<span>work-by-harshal</span>' +
                '<span>/</span>' +
                '<span>PRDs</span>' +
                '<span>/</span>' +
                '<span class="prd-crumb-current">Revify — B2C AI Review Analytics</span>' +
              '</div>' +
              '<div class="prd-chrome-actions">' +
                '<span class="prd-status-badge">MVP SPEC // ACTIVE</span>' +
                '<a href="' + notionUrl + '" target="_blank" rel="noopener" class="prd-notion-btn">' +
                  '<span>Open Live Notion Page</span>' +
                  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>' +
                '</a>' +
              '</div>' +
            '</div>' +

            // Document layout with TOC + Reader
            '<div class="prd-layout">' +
              // Sticky Sidebar TOC
              '<aside class="prd-sidebar">' +
                '<div class="prd-sidebar-title">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' +
                  '<span>Table of Contents</span>' +
                '</div>' +
                '<ul class="prd-toc-list">' +
                  '<li><a href="#prd-sec-1" class="prd-toc-link is-active">1. Vision & Scope</a></li>' +
                  '<li><a href="#prd-sec-2" class="prd-toc-link">2. Problem Statement</a></li>' +
                  '<li><a href="#prd-sec-3" class="prd-toc-link">3. Target Persona</a></li>' +
                  '<li><a href="#prd-sec-4" class="prd-toc-link">4. Value Proposition</a></li>' +
                  '<li><a href="#prd-sec-5" class="prd-toc-link">5. User Stories & AC</a></li>' +
                  '<li><a href="#prd-sec-sim" class="prd-toc-link">⚙️ Scoring Simulator</a></li>' +
                  '<li><a href="#prd-sec-6" class="prd-toc-link">6. Architecture</a></li>' +
                  '<li><a href="#prd-sec-7" class="prd-toc-link">7. Metrics & Analytics</a></li>' +
                '</ul>' +
              '</aside>' +

              // Notion Document Body
              '<main class="prd-document">' +
                '<div class="prd-doc-header">' +
                  '<div class="prd-doc-icon">📄</div>' +
                  '<h2 class="prd-doc-title">Revify — B2C AI Review Analytics</h2>' +
                  '<p class="prd-doc-subtitle">A Product Requirements Document (PRD) for the Phase 1 MVP. Author: Harshal &bull; Status: In Execution</p>' +
                '</div>' +

                // Section 1
                '<section id="prd-sec-1" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">01</span> Product Vision and Scope</h3>' +
                  '<p class="prd-prose">Revify’s ultimate vision is to become the definitive trust layer for the e-commerce review ecosystem. The long-term product roadmap spans three distinct phases:</p>' +
                  '<div class="prd-phases-grid">' +
                    '<div class="prd-phase-card prd-phase-card--active">' +
                      '<span class="prd-phase-tag">Phase 1 &bull; Active MVP</span>' +
                      '<h4 class="prd-phase-title">The B2C Analytics Tool</h4>' +
                      '<p class="prd-phase-desc">Aggregates third-party reviews (via scraping platforms like Apify) to generate personalized, feature-level insights and a custom "Revify Rating" for shoppers.</p>' +
                    '</div>' +
                    '<div class="prd-phase-card">' +
                      '<span class="prd-phase-tag">Phase 2 &bull; Planned</span>' +
                      '<h4 class="prd-phase-title">Anonymous Trust Layer</h4>' +
                      '<p class="prd-phase-desc">User-generated social layer where shoppers post anonymous, genuine feature reviews, restricting brands from interfering or soliciting forced positive feedback.</p>' +
                    '</div>' +
                    '<div class="prd-phase-card">' +
                      '<span class="prd-phase-tag">Phase 3 &bull; Planned</span>' +
                      '<h4 class="prd-phase-title">B2B Monetization</h4>' +
                      '<p class="prd-phase-desc">Brand collaboration portal allowing companies to incentivize genuine user feedback without compromising shopper anonymity or review integrity.</p>' +
                    '</div>' +
                  '</div>' +
                  '<div class="prd-callout">' +
                    '<span class="prd-callout-icon">📌</span>' +
                    '<div class="prd-callout-content"><strong>Scope Constraint:</strong> This PRD is strictly scoped to the execution of the Phase 1 MVP (B2C Review Analytics).</div>' +
                  '</div>' +
                '</section>' +

                // Section 2
                '<section id="prd-sec-2" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">02</span> The Problem Statement</h3>' +
                  '<p class="prd-prose">According to research conducted by Capital One Shopping Research, online shoppers spend an average of <strong>13 minutes</strong> reading unstructured, long, and irrelevant reviews about a product they intend to buy.</p>' +
                  '<div class="prd-callout">' +
                    '<span class="prd-callout-icon">⚠️</span>' +
                    '<div class="prd-callout-content">' +
                      '<strong>Key Friction Points:</strong><br>' +
                      '&bull; Shoppers read dozens of reviews that may or may not mention the specific features they care about.<br>' +
                      '&bull; Conflicting opinions within general reviews create ambiguity.<br>' +
                      '&bull; Results in severe decision fatigue, leading to cart abandonment or suboptimal purchases based on guesswork.' +
                    '</div>' +
                  '</div>' +
                '</section>' +

                // Section 3
                '<section id="prd-sec-3" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">03</span> Target Audience</h3>' +
                  '<div class="prd-persona-card">' +
                    '<div class="prd-persona-avatar">A</div>' +
                    '<div class="prd-persona-info">' +
                      '<h4 class="prd-persona-name">Akash, 28</h4>' +
                      '<span class="prd-persona-role">Primary Persona // High-Intent Shopper</span>' +
                      '<p class="prd-persona-bio">Akash is a middle-class e-commerce consumer who buys with calculated intent. Because he operates with limited purchasing power, he thoroughly researches high-consideration items (such as electronics or appliances) to ensure they meet his exact needs. He relies heavily on specific product capabilities rather than generic overall star ratings, and needs a tool that validates his specific feature requirements before he commits to a purchase.</p>' +
                      '<div class="prd-persona-tags">' +
                        '<span class="prd-tag">Calculated Intent</span>' +
                        '<span class="prd-tag">High-Consideration Purchases</span>' +
                        '<span class="prd-tag">Feature-Specific Shopper</span>' +
                        '<span class="prd-tag">Seeks Decision Confidence</span>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</section>' +

                // Section 4
                '<section id="prd-sec-4" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">04</span> Value Proposition</h3>' +
                  '<div class="prd-callout">' +
                    '<span class="prd-callout-icon">💡</span>' +
                    '<div class="prd-callout-content">' +
                      'Revify helps Akash translate hundreds of long, unstructured reviews—all talking about disparate aspects—into <strong>detailed feature-based analytics personalized to the attributes he prioritizes</strong>, generating an ultimate custom <strong>"Revify Rating"</strong> that dramatically simplifies his decision-making.' +
                    '</div>' +
                  '</div>' +
                '</section>' +

                // Section 5
                '<section id="prd-sec-5" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">05</span> Core User Stories & Acceptance Criteria</h3>' +

                  // Story 1
                  '<div class="prd-story-card">' +
                    '<div class="prd-story-header">' +
                      '<h4 class="prd-story-title">Story 1: Product Input & Preference Selection</h4>' +
                      '<span class="prd-story-tag">ONBOARDING &amp; INPUT</span>' +
                    '</div>' +
                    '<p class="prd-story-narrative">"As a shopper, I want to input a product URL and select my specific feature preferences so that the analysis is tailored exactly to my needs."</p>' +
                    '<div class="prd-ac-title">Acceptance Criteria:</div>' +
                    '<ol class="prd-ac-list">' +
                      '<li>The UI must accept standard product URLs from major e-commerce platforms such as Amazon, Flipkart, etc.</li>' +
                      '<li>Upon URL submission, the system must parse the product name, category, and dynamically extract a list of the product\'s key features.</li>' +
                      '<li>The user must be able to select/deselect specific features and assign a weight/importance rating to them on a scale of 1-10.</li>' +
                    '</ol>' +
                  '</div>' +

                  // Story 2
                  '<div class="prd-story-card">' +
                    '<div class="prd-story-header">' +
                      '<h4 class="prd-story-title">Story 2: Feature-Level Analytics Generation</h4>' +
                      '<span class="prd-story-tag">PROCESSING &amp; VISUALIZATION</span>' +
                    '</div>' +
                    '<p class="prd-story-narrative">"As a shopper, I should get detailed analytics of the product reviews strictly based on my feature preferences so I can understand the experience of past buyers regarding the aspects I care about."</p>' +
                    '<div class="prd-ac-title">Acceptance Criteria:</div>' +
                    '<ol class="prd-ac-list">' +
                      '<li>The system should use the input product URL and fetch reviews strictly relevant to the user\'s selected features.</li>' +
                      '<li>The UI must display a clear sentiment breakdown of each feature with visualizations (distribution charts, positive/neutral/negative splits).</li>' +
                      '<li>The UI should display a short summary of the feature after analytics (e.g. "80% of negative reviews mention the battery degrades quickly after a year").</li>' +
                      '<li><strong>UX status updates:</strong> Because analysis takes up to 45 seconds, the UI must feature a dynamic loading state (showing which agent is currently working: "Fetching reviews...", "Extracting features...") to prevent drop-off during the wait.</li>' +
                    '</ol>' +
                  '</div>' +

                  // Story 3
                  '<div class="prd-story-card">' +
                    '<div class="prd-story-header">' +
                      '<h4 class="prd-story-title">Story 3: The Customized Revify Rating</h4>' +
                      '<span class="prd-story-tag">DECISION ENGINE</span>' +
                    '</div>' +
                    '<p class="prd-story-narrative">"As a shopper, I want to see a single, personalized \'Revify Rating\' based on my weighted preferences so I can make a fast, confident purchasing decision."</p>' +
                    '<div class="prd-ac-title">Acceptance Criteria:</div>' +
                    '<ul class="prd-ac-list" style="list-style-type: disc;">' +
                      '<li>The system must calculate a final, unified score (out of 10 or 5 stars) driven exclusively by the sentiment of the user\'s selected features and their assigned weights.</li>' +
                      '<li><strong>Strict personalization rule:</strong> General reviews that do not mention the user\'s selected features must be mathematically excluded from this final score.</li>' +
                    '</ul>' +
                  '</div>' +
                '</section>' +

                // Simulator Section
                '<section id="prd-sec-sim" class="prd-section">' +
                  '<div class="prd-sim-container">' +
                    '<div class="prd-sim-header">' +
                      '<h4 class="prd-sim-title">' +
                        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' +
                        '<span>Interactive PRD Spec Simulator: Story 1 & 3 in Action</span>' +
                      '</h4>' +
                      '<span class="prd-sim-badge">Deterministic Formula</span>' +
                    '</div>' +
                    '<p class="prd-prose" style="font-size:12.5px; margin-bottom:18px;">Test the exact mathematical weighting logic specified in Story 3. Adjust the importance weight (1–10) for Akash\'s selected features to observe how the customized Revify Rating recalculates dynamically:</p>' +
                    '<div class="prd-sim-sliders">' +
                      '<div class="prd-sim-item">' +
                        '<div class="prd-sim-item-header"><span>Battery Life</span><span id="prd-val-battery">Weight: 9 / 10</span></div>' +
                        '<input type="range" class="prd-sim-slider" id="prd-slider-battery" min="1" max="10" value="9">' +
                        '<div class="prd-sim-sentiment"><span style="color:#2ed573">● 84% Positive</span><span style="color:#e0443e">16% Neg</span></div>' +
                      '</div>' +
                      '<div class="prd-sim-item">' +
                        '<div class="prd-sim-item-header"><span>Display Clarity</span><span id="prd-val-display">Weight: 8 / 10</span></div>' +
                        '<input type="range" class="prd-sim-slider" id="prd-slider-display" min="1" max="10" value="8">' +
                        '<div class="prd-sim-sentiment"><span style="color:#2ed573">● 92% Positive</span><span style="color:#e0443e">8% Neg</span></div>' +
                      '</div>' +
                      '<div class="prd-sim-item">' +
                        '<div class="prd-sim-item-header"><span>Speaker Quality</span><span id="prd-val-speaker">Weight: 3 / 10</span></div>' +
                        '<input type="range" class="prd-sim-slider" id="prd-slider-speaker" min="1" max="10" value="3">' +
                        '<div class="prd-sim-sentiment"><span style="color:#e0443e">● 42% Positive</span><span style="color:#e0443e">58% Neg</span></div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="prd-sim-result">' +
                      '<div class="prd-sim-calc-desc">' +
                        '<strong>Deterministic Formula:</strong> <code>Revify Score = &Sigma;(Sentiment_i &times; Weight_i) / &Sigma;(Weight_i)</code>. Note that reviews talking about shipping or packaging are excluded from the denominator.' +
                      '</div>' +
                      '<div class="prd-sim-score-badge">' +
                        '<div class="prd-sim-score-val" id="prd-calc-score">8.6 <span style="font-size:16px; color:#888;">/ 10</span></div>' +
                        '<div class="prd-sim-score-label">Akash\'s Custom Rating</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</section>' +

                // Section 6
                '<section id="prd-sec-6" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">06</span> Technical Architecture and Constraints</h3>' +
                  '<p class="prd-prose">To fulfill the acceptance criteria reliably while avoiding LLM hallucination and API timeouts:</p>' +
                  '<div class="prd-callout">' +
                    '<span class="prd-callout-icon">⚙️</span>' +
                    '<div class="prd-callout-content">' +
                      '&bull; <strong>Scraping Layer:</strong> Apify actors normalize raw Amazon and e-commerce review structures into structured JSON.<br>' +
                      '&bull; <strong>Multi-Agent Orchestration:</strong> CrewAI partitions work between Chunk Summary Agent, Review Analysis Agent, and Scoring Validator.<br>' +
                      '&bull; <strong>Deterministic Computation:</strong> The final rating calculation is never delegated to probabilistic LLM text generation; it is computed by a Python microservice to guarantee mathematical consistency.' +
                    '</div>' +
                  '</div>' +
                '</section>' +

                // Section 7
                '<section id="prd-sec-7" class="prd-section">' +
                  '<h3 class="prd-section-heading"><span class="num">07</span> Metrics and Analytics</h3>' +
                  '<div class="prd-metrics-grid">' +
                    '<div class="prd-metric-card prd-metric-card--northstar">' +
                      '<span class="prd-metric-tag">7.1 &bull; North Star Metric</span>' +
                      '<h4 class="prd-metric-title">Monthly Active Users (MAU)</h4>' +
                      '<p class="prd-metric-desc">Tracks returning users generating analytics. We deliberately track MAU rather than WAU because e-commerce purchasing is episodic: returning for a 2nd or 3rd purchase validates decision fatigue reduction.</p>' +
                    '</div>' +
                    '<div class="prd-metric-card">' +
                      '<span class="prd-metric-tag">7.2 &bull; Adoption &amp; Engagement</span>' +
                      '<h4 class="prd-metric-title">Task Success Rate</h4>' +
                      '<p class="prd-metric-desc">Percentage of URL inputs that successfully produce a fully generated feature breakdown and Revify Rating. Directly measures funnel drop-off and scraping robustness.</p>' +
                    '</div>' +
                    '<div class="prd-metric-card">' +
                      '<span class="prd-metric-tag">7.2 &bull; Engagement Metric</span>' +
                      '<h4 class="prd-metric-title">Feature Customization Rate</h4>' +
                      '<p class="prd-metric-desc">Percentage of users who actively modify default 1–10 feature weights before rating generation, confirming that shoppers value hyper-personalization.</p>' +
                    '</div>' +
                  '</div>' +
                  '<div class="prd-metrics-grid" style="margin-top:12px;">' +
                    '<div class="prd-metric-card">' +
                      '<span class="prd-metric-tag">7.2 &bull; Qualitative Validation</span>' +
                      '<h4 class="prd-metric-title">Explicit User Satisfaction</h4>' +
                      '<p class="prd-metric-desc">Simple Thumbs Up / Thumbs Down prompt beneath the final rating: <em>"Did this help you make a decision?"</em> Provides immediate qualitative validation of LLM accuracy.</p>' +
                    '</div>' +
                    '<div class="prd-metric-card">' +
                      '<span class="prd-metric-tag">7.3 &bull; Guardrail Metric</span>' +
                      '<h4 class="prd-metric-title">Average System Latency</h4>' +
                      '<p class="prd-metric-desc">Total elapsed time from URL submission to final rating display. Must strictly remain <strong>&lt; 60 seconds</strong> to prevent user abandonment during review parsing.</p>' +
                    '</div>' +
                    '<div class="prd-metric-card">' +
                      '<span class="prd-metric-tag">7.3 &bull; Guardrail Metric</span>' +
                      '<h4 class="prd-metric-title">Review Acquisition Failure Rate</h4>' +
                      '<p class="prd-metric-desc">Percentage of times the scraping actor fails or returns empty data. Monitored with automated alerting because scraping failure stops the analysis pipeline.</p>' +
                    '</div>' +
                  '</div>' +
                '</section>' +

              '</main>' +
            '</div>' +
          '</div>' +

          // Footer
          '<div class="ynw-detail-footer">' +
            '<div class="ynw-detail-footer-inner">' +
              '<button class="ynw-detail-footer-btn" id="ynw-detail-footer-back">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
                '<span>Return to Watchlist</span>' +
              '</button>' +
              '<button class="ynw-detail-next-btn" id="prd-next-swiggy">' +
                '<span>Next Thinking: SWIGGY PRODUCT TEARDOWN</span>' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>';
  }

  function initRevifyPrdBindings(portal, reelB, openFilmDetail, REEL_B_DATA, closeFilmDetail) {
    // Simulator interactive calculation
    var sBattery = portal.querySelector('#prd-slider-battery');
    var sDisplay = portal.querySelector('#prd-slider-display');
    var sSpeaker = portal.querySelector('#prd-slider-speaker');
    var lBattery = portal.querySelector('#prd-val-battery');
    var lDisplay = portal.querySelector('#prd-val-display');
    var lSpeaker = portal.querySelector('#prd-val-speaker');
    var scoreDisplay = portal.querySelector('#prd-calc-score');

    function updateScore() {
      if (!sBattery || !sDisplay || !sSpeaker || !scoreDisplay) return;
      var wB = parseInt(sBattery.value, 10);
      var wD = parseInt(sDisplay.value, 10);
      var wS = parseInt(sSpeaker.value, 10);

      if (lBattery) lBattery.textContent = 'Weight: ' + wB + ' / 10';
      if (lDisplay) lDisplay.textContent = 'Weight: ' + wD + ' / 10';
      if (lSpeaker) lSpeaker.textContent = 'Weight: ' + wS + ' / 10';

      // Sentiment scores: Battery 8.4/10, Display 9.2/10, Speaker 4.2/10
      var weightedSum = (8.4 * wB) + (9.2 * wD) + (4.2 * wS);
      var totalWeight = wB + wD + wS;
      var finalScore = (weightedSum / totalWeight).toFixed(1);

      scoreDisplay.innerHTML = finalScore + ' <span style="font-size:16px; color:#888;">/ 10</span>';
    }

    if (sBattery) sBattery.addEventListener('input', updateScore);
    if (sDisplay) sDisplay.addEventListener('input', updateScore);
    if (sSpeaker) sSpeaker.addEventListener('input', updateScore);

    // Sidebar active link on scroll
    var tocLinks = portal.querySelectorAll('.prd-toc-link');
    tocLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = link.getAttribute('href');
        var targetEl = portal.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          tocLinks.forEach(function(l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    });

    // Next button: Navigate to Swiggy Teardown (Index 1 in Reel B)
    var nextBtn = portal.querySelector('#prd-next-swiggy');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        closeFilmDetail();
        setTimeout(function() {
          reelB.goTo(1);
          setTimeout(function() {
            var activeFrame = reelB.scene.querySelector('.ynw-frame.is-active') || reelB.scene.querySelectorAll('.ynw-frame')[1];
            if (activeFrame) {
              openFilmDetail(reelB, 1, activeFrame, REEL_B_DATA[1]);
            }
          }, 550);
        }, 450);
      });
    }
  }

  injectStyles();
  window.getRevifyPrdDetailHTML = getRevifyPrdDetailHTML;
  window.initRevifyPrdBindings = initRevifyPrdBindings;

})();

