/**
 * RAG ASSISTANT & RAG EVALUATION - Case Study Module
 * Handles rich detail modal rendering for:
 * - Reel A Frame #04: RAG ASSISTANT (Retrieval-Augmented Generation Chatbot)
 * - Reel B Frame #04: RAG EVALUATION (Systematic Retrieval Benchmarks & Ragas Framework)
 */

(function () {
  'use strict';

  function injectStyles() {
    if (document.getElementById('rag-case-study-styles')) return;

    var css = `
/* ================================================================
   RAG ASSISTANT & RAG EVALUATION STYLES
   ================================================================ */
.rag-shell {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.rag-pipeline-card {
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-top: 16px;
}

.rag-pipeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.rag-pipeline-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rag-pipeline-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .rag-pipeline-steps {
    grid-template-columns: 1fr;
  }
}

.rag-step-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 16px;
  position: relative;
  transition: all 0.25s ease;
}

.rag-step-box--active {
  border-color: var(--accent-primary);
  background: rgba(181, 31, 50, 0.08);
  box-shadow: 0 0 18px rgba(181, 31, 50, 0.25);
}

.rag-step-num {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-primary);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
}

.rag-step-title {
  font-family: 'Clash Display', sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 6px 0;
}

.rag-step-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
}

.rag-interactive-box {
  background: #09090c;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 20px;
}

.rag-query-input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .rag-query-input-row {
    flex-direction: column;
  }
}

.rag-query-input {
  flex: 1;
  background: #14141a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px 14px;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
}

.rag-query-input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.rag-query-btn {
  background: var(--accent-primary);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.rag-query-btn:hover {
  opacity: 0.9;
}

.rag-trace-log {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #abb2bf;
  background: #0d0d12;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 14px;
  line-height: 1.6;
  max-height: 240px;
  overflow-y: auto;
}

.rag-trace-highlight {
  color: #2ed573;
}
.rag-trace-accent {
  color: #ff6b81;
}

/* Evaluation Matrix Cards */
.rag-eval-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 18px 0;
}

@media (max-width: 720px) {
  .rag-eval-grid {
    grid-template-columns: 1fr;
  }
}

.rag-eval-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 18px;
  position: relative;
}

.rag-eval-score-pill {
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: 'Clash Display', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #2ed573;
}

.rag-eval-name {
  font-family: 'Clash Display', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 6px 0;
}

.rag-eval-formula {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: var(--accent-primary);
  margin-bottom: 8px;
  display: block;
}

.rag-eval-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.rag-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rag-list li {
  position: relative;
  padding-left: 20px;
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.rag-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
}
`;

    var s = document.createElement('style');
    s.id = 'rag-case-study-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function getRagDetailHTML(reel, index, itemData) {
    injectStyles();

    var collectionName = 'The Builds';
    var frameNum = String((reel.current || index) + 1).padStart(2, '0');

    // Reel A: RAG ASSISTANT (The Builds - Real Project Content)
      return '' +
        '<div class="ynw-detail-container">' +
          '<div class="ynw-detail-bar">' +
            '<div class="ynw-detail-actions">' +
              '<button class="ynw-detail-back-btn" id="ynw-detail-close-btn" data-ynw-close aria-label="Back to Watchlist">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
                '<span>Back to Watchlist</span>' +
                '<span class="ynw-detail-kbd">ESC</span>' +
              '</button>' +
              '<a class="ynw-detail-link-btn" href="https://github.com/HarVkr/jiopay-rag-chatbot" target="_blank" rel="noopener noreferrer" title="View Source Code">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>' +
                '<span>GitHub Repo &nearr;</span>' +
              '</a>' +
            '</div>' +
            '<div class="ynw-detail-badge">' +
              '<span class="ynw-detail-dot"></span>' +
              '<span>' + collectionName + ' // REEL ' + reel.reelKey.toUpperCase() + ' — FRAME #' + frameNum + '</span>' +
            '</div>' +
          '</div>' +

          '<div class="ynw-detail-scroll">' +
            '<div class="ynw-detail-hero">' +
              '<span class="ynw-detail-hero-tag">ENTERPRISE SYSTEM // RETRIEVAL-AUGMENTED GENERATION</span>' +
              '<h1 class="ynw-detail-hero-title">RAG ASSISTANT</h1>' +
              '<p class="ynw-detail-hero-desc">Retrieval-augmented generation chatbot for merchant and business operations — providing grounded, verifiable answers across payments, settlements, onboarding, and compliance with transparent source citations.</p>' +

              '<!-- 4-Card Metric Strip -->' +
              '<div class="ynw-metrics-grid">' +
                '<div class="ynw-metric-card">' +
                  '<span class="ynw-metric-val">GEMINI 2.5</span>' +
                  '<span class="ynw-metric-label">Synthesis Engine</span>' +
                  '<span class="ynw-metric-sub">Google Gemini 2.5 Flash</span>' +
                '</div>' +
                '<div class="ynw-metric-card">' +
                  '<span class="ynw-metric-val ynw-metric-val--crimson">PGVECTOR</span>' +
                  '<span class="ynw-metric-label">Vector Database</span>' +
                  '<span class="ynw-metric-sub">Supabase + Hybrid Search</span>' +
                '</div>' +
                '<div class="ynw-metric-card">' +
                  '<span class="ynw-metric-val">1,000+</span>' +
                  '<span class="ynw-metric-label">Processed Chunks</span>' +
                  '<span class="ynw-metric-sub">Multi-Strategy Chunking</span>' +
                '</div>' +
                '<div class="ynw-metric-card">' +
                  '<span class="ynw-metric-val">EDGE API</span>' +
                  '<span class="ynw-metric-label">Runtime Architecture</span>' +
                  '<span class="ynw-metric-sub">Next.js 15 + In-Memory Cache</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="rag-shell">' +

              '<!-- Chapter 01: The Premise -->' +
              '<section class="ynw-chapter">' +
                '<div class="ynw-chapter-header">' +
                  '<span class="ynw-chapter-num">01 // THE PREMISE</span>' +
                  '<h2 class="ynw-chapter-title">Intelligent Natural-Language Merchant Support</h2>' +
                  '<p class="ynw-chapter-sub">Connecting business merchants to instant, reliable answers backed by verifiable source citations.</p>' +
                '</div>' +
                '<div class="ynw-twocol-grid">' +
                  '<div class="ynw-prose-card">' +
                    '<h3>' +
                      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
                      '<span>What is RAG Assistant?</span>' +
                    '</h3>' +
                    '<p>RAG Assistant is a retrieval-augmented generation chatbot built for merchant and business customers. It helps merchants find reliable answers about payment services, settlements, refunds, onboarding, KYC, policies, troubleshooting, and partner operations through natural-language questions.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>' +
                      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' +
                      '<span>Contextual Grounding + Gemini</span>' +
                    '</h3>' +
                    '<p>The project combines a searchable knowledge base with Google Gemini 2.5 Flash to provide contextual answers and transparent source citations, eliminating speculation in compliance-heavy business queries.</p>' +
                  '</div>' +
                '</div>' +
              '</section>' +

              '<!-- Chapter 02: The Problem -->' +
              '<section class="ynw-chapter">' +
                '<div class="ynw-chapter-header">' +
                  '<span class="ynw-chapter-num">02 // THE PROBLEM</span>' +
                  '<h2 class="ynw-chapter-title">Information Fragmentation &amp; Compliance Sensitivity</h2>' +
                  '<p class="ynw-chapter-sub">Why generic chatbots generate plausible but inaccurate advice when domain rules matter.</p>' +
                '</div>' +
                '<div class="ynw-prose-card" style="margin-bottom: 16px;">' +
                  '<p>Business information is distributed across web pages, FAQs, partner documentation, and policy PDFs. Finding the correct answer often requires navigating multiple disparate sources and understanding domain-specific terminology.<br><br>A generic chatbot could generate plausible but inaccurate responses, especially for compliance and policy questions. The system therefore needed to address four fundamental requirements:</p>' +
                '</div>' +
                '<div class="ynw-twocol-grid">' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">01.</span> Multi-Format Documentation Search</h3>' +
                    '<p>Search seamlessly across multiple disparate formats including dynamic web pages, tabular FAQs, partner docs, and formal policy PDFs.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">02.</span> Semantic &amp; Exact Terminology</h3>' +
                    '<p>Accurately handle both broad semantic questions and exact technical tokens such as APIs, UTRs, KYC specifications, and settlement schedules.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">03.</span> Strict Hallucination Elimination</h3>' +
                    '<p>Constrain LLM reasoning strictly to retrieved factual excerpts to avoid fabricated policy advice or inaccurate fee structures.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">04.</span> Transparent Source Provenance</h3>' +
                    '<p>Provide full transparency by showing users exact source citations, similarity scores, and document excerpts backing every response.</p>' +
                  '</div>' +
                '</div>' +
              '</section>' +

              '<!-- Chapter 03: The Approach -->' +
              '<section class="ynw-chapter">' +
                '<div class="ynw-chapter-header">' +
                  '<span class="ynw-chapter-num">03 // THE APPROACH</span>' +
                  '<h2 class="ynw-chapter-title">The Complete End-to-End RAG Pipeline</h2>' +
                  '<p class="ynw-chapter-sub">From automated web &amp; PDF ingestion to routed retrieval and cited generation.</p>' +
                '</div>' +
                '<div class="rag-pipeline-card">' +
                  '<div class="rag-pipeline-header">' +
                    '<h3 class="rag-pipeline-title">' +
                      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' +
                      '<span>10-Stage Processing &amp; Retrieval Flow</span>' +
                    '</h3>' +
                    '<span class="rag-step-num" style="margin:0;">Latency Budget: &lt; 350ms</span>' +
                  '</div>' +
                  '<div class="rag-pipeline-steps">' +
                    '<div class="rag-step-box rag-step-box--active">' +
                      '<span class="rag-step-num">Stage 01</span>' +
                      '<h4 class="rag-step-title">Scrape &amp; Extract</h4>' +
                      '<p class="rag-step-desc">Scrape web pages, FAQs, and extract text from public policy and compliance PDFs.</p>' +
                    '</div>' +
                    '<div class="rag-step-box">' +
                      '<span class="rag-step-num">Stage 02</span>' +
                      '<h4 class="rag-step-title">Clean &amp; Chunk</h4>' +
                      '<p class="rag-step-desc">Normalize text and evaluate fixed-size, recursive, semantic, structural, and LLM chunking strategies.</p>' +
                    '</div>' +
                    '<div class="rag-step-box">' +
                      '<span class="rag-step-num">Stage 03</span>' +
                      '<h4 class="rag-step-title">Vector Embeddings</h4>' +
                      '<p class="rag-step-desc">Generate 384-dim embeddings via transformer models with a 512-entry in-memory cache.</p>' +
                    '</div>' +
                    '<div class="rag-step-box">' +
                      '<span class="rag-step-num">Stage 04</span>' +
                      '<h4 class="rag-step-title">Supabase pgvector</h4>' +
                      '<p class="rag-step-desc">Store chunks and vectors with Cosine/L2 indexes, full-text search, and JSONB metadata.</p>' +
                    '</div>' +
                    '<div class="rag-step-box">' +
                      '<span class="rag-step-num">Stage 05</span>' +
                      '<h4 class="rag-step-title">Rule-Based Router</h4>' +
                      '<p class="rag-step-desc">Classify each query to route through topic, FAQ, PDF, semantic, or hybrid search RPCs.</p>' +
                    '</div>' +
                    '<div class="rag-step-box">' +
                      '<span class="rag-step-num">Stage 06</span>' +
                      '<h4 class="rag-step-title">Grounded Synthesis</h4>' +
                      '<p class="rag-step-desc">Send retrieved context to Gemini 2.5 Flash; return answers with ranked source citations.</p>' +
                    '</div>' +
                  '</div>' +

                  '<!-- Interactive Trace Inspector -->' +
                  '<div class="rag-interactive-box">' +
                    '<div class="rag-query-input-row">' +
                      '<input type="text" class="rag-query-input" id="rag-demo-input" value="What is the settlement timeline and KYC documentation required for international collect links?" readonly>' +
                      '<button class="rag-query-btn" id="rag-trace-trigger">Trace Retrieval Pipeline</button>' +
                    '</div>' +
                    '<div class="rag-trace-log" id="rag-trace-output">' +
                      '[TRACE 0.00s] Incoming query received: "What is the settlement timeline and KYC documentation required..."<br>' +
                      '[TRACE +18ms] RAGSearchRouter classified query &bull; Topics: [Settlements, KYC, Collect Links] &bull; Mode: Hybrid Search<br>' +
                      '[TRACE +46ms] In-memory cache checked (miss) -> Generated 384-dim embedding via all-MiniLM-L6-v2.<br>' +
                      '[TRACE +94ms] Supabase RPC hybrid search executed across chunks (Cosine Vector + BM25 Full-Text).<br>' +
                      '[TRACE +138ms] Retrieved top 12 chunks -> ranked and filtered by similarity threshold (<span class="rag-trace-highlight">top score: 0.942</span>).<br>' +
                      '[TRACE +185ms] Context window constructed with 4 grounded document excerpts and source citations.<br>' +
                      '[TRACE +320ms] <span class="rag-trace-highlight">Google Gemini 2.5 Flash synthesized grounded response with 3 transparent citations &bull; Latency: 320ms</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</section>' +

              '<!-- Chapter 04: Under the Hood -->' +
              '<section class="ynw-chapter">' +
                '<div class="ynw-chapter-header">' +
                  '<span class="ynw-chapter-num">04 // UNDER THE HOOD</span>' +
                  '<h2 class="ynw-chapter-title">Technical Architecture &amp; System Specs</h2>' +
                  '<p class="ynw-chapter-sub">Full-stack Next.js Edge runtime, model selection, database schema, and data pipelines.</p>' +
                '</div>' +
                '<div class="ynw-twocol-grid">' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Frontend &amp; UX</h3>' +
                    '<p>Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React. Built with a responsive chat interface featuring loading states, prompt suggestion chips, and copy-to-clipboard support.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Backend Edge Runtime</h3>' +
                    '<p>Next.js Edge API route at <code>/api/chat</code>. It validates incoming questions, computes query embeddings, selects retrieval strategy, builds the context window, and communicates with Gemini on the Edge.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>AI &amp; Embedding Models</h3>' +
                    '<ul class="rag-list">' +
                      '<li><strong>Google Gemini 2.5 Flash</strong> for grounded response generation.</li>' +
                      '<li><strong>Hugging Face sentence-transformers/all-MiniLM-L6-v2</strong> for 384-dimensional query embeddings.</li>' +
                      '<li>Empirical benchmarks across BGE Large, E5 Large, and MiniLM models.</li>' +
                      '<li>512-entry in-memory embedding cache to minimize redundant API latency.</li>' +
                    '</ul>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Query Routing Engine</h3>' +
                    '<p>The <code>RAGSearchRouter</code> dynamically detects topics including collect links, settlements, refunds, payment gateways, partner programs, KYC, fees, and technical issues. It separates FAQ-style, policy-related, exact-term, and complex multi-part queries.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Supabase Database Schema</h3>' +
                    '<ul class="rag-list">' +
                      '<li><code>rag_chunks</code> table storing content, metadata, source type, topics, and vector embeddings.</li>' +
                      '<li>Cosine and L2 vector indexes for sub-second nearest-neighbor retrieval.</li>' +
                      '<li>Full-text search and JSONB metadata indexes.</li>' +
                      '<li>RPC functions for similarity, hybrid, topic, and FAQ searches with analytics views.</li>' +
                    '</ul>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Data Sources &amp; Deployment</h3>' +
                    '<ul class="rag-list">' +
                      '<li>~25 business URLs, 3 formal policy PDFs, and 100+ FAQ entries.</li>' +
                      '<li>1,000+ processed chunks across multiple embedding and chunking datasets.</li>' +
                      '<li>Deployed on <strong>Vercel</strong> running on Edge Runtime.</li>' +
                    '</ul>' +
                  '</div>' +
                '</div>' +
              '</section>' +

              '<!-- Chapter 05: The Challenges -->' +
              '<section class="ynw-chapter">' +
                '<div class="ynw-chapter-header">' +
                  '<span class="ynw-chapter-num">05 // THE CHALLENGES</span>' +
                  '<h2 class="ynw-chapter-title">Engineering Hurdles &amp; Edge Cases Solved</h2>' +
                  '<p class="ynw-chapter-sub">Tackling dynamic scraping, boundary loss, endpoint fragility, and strict hallucination boundaries.</p>' +
                '</div>' +
                '<div class="ynw-twocol-grid">' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">01.</span> Boilerplate &amp; Noise Removal</h3>' +
                    '<p>Extracting high-signal content from dynamic, JavaScript-rendered websites while systematically stripping repeated navigation, headers, footers, and promotional banners.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">02.</span> Chunk Boundary Context Preservation</h3>' +
                    '<p>Preventing context fragmentation when splitting structured FAQs, legal policies, and unstructured web pages into independent chunks.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">03.</span> Empirical Chunking Evaluation</h3>' +
                    '<p>Evaluating different chunk sizes, overlaps, and semantic boundaries across fixed-size, recursive, semantic, and structural strategies instead of relying on default parameters.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">04.</span> Hybrid Semantic + Exact Token Search</h3>' +
                    '<p>Supporting both semantic conceptual understanding and keyword-sensitive exact token matching for queries containing APIs, UTR numbers, and KYC terms.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">05.</span> Resilient Embedding Generation</h3>' +
                    '<p>Ensuring embedding generation reliability across Hugging Face endpoint variations, cold starts, response formats, retries, and transient failures.</p>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3><span class="ynw-prose-num">06.</span> Strict Grounding &amp; RPC Fallbacks</h3>' +
                    '<p>Enforcing strict factual boundaries on Gemini while designing automated fallback search paths when specialized Supabase RPC functions return sparse results.</p>' +
                  '</div>' +
                '</div>' +
              '</section>' +

              '<!-- Chapter 06: The Outcome -->' +
              '<section class="ynw-chapter">' +
                '<div class="ynw-chapter-header">' +
                  '<span class="ynw-chapter-num">06 // THE OUTCOME</span>' +
                  '<h2 class="ynw-chapter-title">Delivered Capabilities &amp; System Validation</h2>' +
                  '<p class="ynw-chapter-sub">Production capabilities, validation metrics, and open-source implementation.</p>' +
                '</div>' +
                '<div class="ynw-twocol-grid">' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Production Deliverables</h3>' +
                    '<ul class="rag-list">' +
                      '<li>Natural-language merchant support with sub-second retrieval.</li>' +
                      '<li>Intelligent retrieval routing across FAQs, PDFs, web content, and topics.</li>' +
                      '<li>Hybrid semantic and keyword search.</li>' +
                      '<li>Gemini-generated answers strictly grounded in retrieved context.</li>' +
                      '<li>Source citations with expandable content previews and similarity scores.</li>' +
                      '<li>Mobile-responsive chat UI with loading states and copy-to-clipboard.</li>' +
                      '<li>Reproducible scraping, chunking, embedding, and Supabase database workflow.</li>' +
                    '</ul>' +
                  '</div>' +
                  '<div class="ynw-prose-card">' +
                    '<h3>Validation &amp; Verification</h3>' +
                    '<ul class="rag-list">' +
                      '<li><strong>ESLint:</strong> Completed with 1 unused-variable warning and 0 errors.</li>' +
                      '<li><strong>TypeScript:</strong> Full type-check completed successfully.</li>' +
                      '<li><strong>Build Status:</strong> Production build reached the Next.js compile stage (noted isolated execution environment font fetch constraint).</li>' +
                      '<li><strong>Test Suite:</strong> No dedicated automated unit/integration test suite included in repository.</li>' +
                    '</ul>' +
                    '<div style="margin-top: 20px;">' +
                      '<a href="https://github.com/HarVkr/jiopay-rag-chatbot" target="_blank" rel="noopener noreferrer" class="ynw-detail-link-btn ynw-detail-link-btn--primary" style="display:inline-flex;">' +
                        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>' +
                        '<span>View on GitHub &nearr;</span>' +
                      '</a>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</section>' +

            '</div>' +

            // Footer
            '<div class="ynw-detail-footer">' +
              '<div class="ynw-detail-footer-inner">' +
                '<button class="ynw-detail-footer-btn" id="ynw-detail-footer-back">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
                  '<span>Return to Watchlist</span>' +
                '</button>' +
                '<button class="ynw-detail-next-btn" id="rag-next-revify">' +
                  '<span>Next Build: REVIFY</span>' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
                '</button>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</div>';
  }

  function initRagBindings(portal, reel, openFilmDetail, REEL_DATA, closeFilmDetail) {
    // Interactive trace demo for Build reel
    var traceBtn = portal.querySelector('#rag-trace-trigger');
    var traceLog = portal.querySelector('#rag-trace-output');
    if (traceBtn && traceLog) {
      traceBtn.addEventListener('click', function() {
        traceLog.innerHTML = '<span class="rag-trace-accent">[PROCESSING] Classifying query and routing through hybrid search pipeline...</span>';
        setTimeout(function() {
          traceLog.innerHTML =
            '[TRACE 0.00s] Incoming query received: "What is the settlement timeline and KYC documentation required..."<br>' +
            '[TRACE +18ms] RAGSearchRouter classified query &bull; Topics: [Settlements, KYC, Collect Links] &bull; Mode: Hybrid Search<br>' +
            '[TRACE +46ms] In-memory cache checked (miss) -> Generated 384-dim embedding via all-MiniLM-L6-v2.<br>' +
            '[TRACE +94ms] Supabase RPC hybrid search executed across chunks (Cosine Vector + BM25 Full-Text).<br>' +
            '[TRACE +138ms] Retrieved top 12 chunks -> ranked and filtered by similarity threshold (<span class="rag-trace-highlight">top score: 0.942</span>).<br>' +
            '[TRACE +185ms] Context window constructed with 4 grounded document excerpts and source citations.<br>' +
            '[TRACE +320ms] <span class="rag-trace-highlight">Google Gemini 2.5 Flash synthesized grounded response with 3 transparent citations &bull; Latency: 320ms</span>';
        }, 350);
      });
    }

    // Next button bindings
    var nextRevify = portal.querySelector('#rag-next-revify');
    if (nextRevify) {
      nextRevify.addEventListener('click', function() {
        closeFilmDetail();
        setTimeout(function() {
          reel.goTo(0);
          setTimeout(function() {
            var frames = reel.scene.querySelectorAll('.ynw-frame');
            if (frames[0]) {
              openFilmDetail(reel, 1, frames[1], REEL_DATA[1]);
            }
          }, 550);
        }, 450);
      });
    }
  }

  injectStyles();
  window.getRagDetailHTML = getRagDetailHTML;
  window.initRagBindings = initRagBindings;

})();
