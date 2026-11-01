/**
 * RAG ASSISTANT & RAG EVALUATION — Case Study Module
 * Covers:
 * - Reel A Frame #03: RAG ASSISTANT (Enterprise Hybrid Retrieval Engine)
 * - Reel B Frame #03: RAG EVALUATION (Systematic Retrieval Benchmarks & Ragas Framework)
 */
(function() {
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
  gap: 28px;
}

.rag-pipeline-card {
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
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
  line-height: 1.5;
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
  padding: 0 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
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
  max-height: 220px;
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
`;

    var s = document.createElement('style');
    s.id = 'rag-case-study-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function getRagDetailHTML(reel, index, itemData) {
    injectStyles();

    var isThinkingReel = reel.reelKey === 'b';
    var collectionName = isThinkingReel ? 'The Thinking' : 'The Builds';
    var frameNum = String((reel.current || index) + 1).padStart(2, '0');

    if (isThinkingReel) {
      // Reel B: RAG EVALUATION (Thinking / Strategy)
      return '' +
        '<div class="ynw-detail-container">' +
          '<div class="ynw-detail-bar">' +
            '<button class="ynw-detail-back-btn" id="ynw-detail-close-btn" aria-label="Back to Watchlist">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
              '<span>Back to Watchlist</span>' +
              '<span class="ynw-detail-kbd">ESC</span>' +
            '</button>' +
            '<div class="ynw-detail-badge">' +
              '<span class="ynw-detail-dot"></span>' +
              '<span>' + collectionName + ' // REEL ' + reel.reelKey.toUpperCase() + ' — FRAME #' + frameNum + '</span>' +
            '</div>' +
          '</div>' +

          '<div class="ynw-detail-scroll">' +
            '<div class="ynw-detail-hero">' +
              '<span class="ynw-detail-hero-tag">EVALUATION FRAMEWORK // AI BENCHMARKING</span>' +
              '<h1 class="ynw-detail-hero-title">RAG EVALUATION &amp; HALLUCINATION GUARDRAILS</h1>' +
              '<p class="ynw-detail-hero-desc">Systematic testing methodologies, synthetic test dataset generation, and continuous Ragas metrics for enterprise retrieval-augmented generation systems.</p>' +
            '</div>' +

            '<div class="rag-shell">' +
              // Section 1
              '<div class="ef-section">' +
                '<div class="ef-section-header">' +
                  '<span class="ef-section-num">01</span>' +
                  '<h2 class="ef-section-title">The Evaluation Dilemma in Probabilistic Systems</h2>' +
                '</div>' +
                '<p class="ef-prose">Traditional unit testing breaks when testing LLM-powered applications. Given the non-deterministic nature of generative responses and multi-hop retrieval pipelines, manual spot-checking fails to detect subtle regressions, context dilution, or subtle hallucination loops before deployment.</p>' +
                '<div class="ef-cards-grid">' +
                  '<div class="ef-card">' +
                    '<span class="ef-card-tag">FAILURE MODE 01</span>' +
                    '<h3 class="ef-card-title">Context Dilution</h3>' +
                    '<p class="ef-card-desc">Retrieving top-k chunks with low signal-to-noise ratio confuses the LLM attention window, increasing answer latency and prompting plausible yet fabricated answers.</p>' +
                  '</div>' +
                  '<div class="ef-card">' +
                    '<span class="ef-card-tag">FAILURE MODE 02</span>' +
                    '<h3 class="ef-card-title">Silent Factual Drift</h3>' +
                    '<p class="ef-card-desc">When underlying knowledge bases update, stale semantic embeddings or incorrect chunk boundaries introduce undetected factual contradictions.</p>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              // Section 2
              '<div class="ef-section">' +
                '<div class="ef-section-header">' +
                  '<span class="ef-section-num">02</span>' +
                  '<h2 class="ef-section-title">The 4-Pillar Ragas Evaluation Framework</h2>' +
                '</div>' +
                '<div class="rag-eval-grid">' +
                  '<div class="rag-eval-card">' +
                    '<span class="rag-eval-score-pill">97.4%</span>' +
                    '<h3 class="rag-eval-name">Faithfulness</h3>' +
                    '<span class="rag-eval-formula">Score = |Claims supported by context| / |Total claims|</span>' +
                    '<p class="rag-eval-desc">Measures the factual consistency of the generated answer against the retrieved context chunks. A high faithfulness score mathematically guarantees the absence of hallucination.</p>' +
                  '</div>' +
                  '<div class="rag-eval-card">' +
                    '<span class="rag-eval-score-pill">94.8%</span>' +
                    '<h3 class="rag-eval-name">Answer Relevance</h3>' +
                    '<span class="rag-eval-formula">Cosine_Sim(Embedding(Q), Embedding(Generated_Q_from_A))</span>' +
                    '<p class="rag-eval-desc">Assesses whether the response directly addresses the user\'s explicit question or wanders into redundant, evasive, or extraneous narrative.</p>' +
                  '</div>' +
                  '<div class="rag-eval-card">' +
                    '<span class="rag-eval-score-pill">93.2%</span>' +
                    '<h3 class="rag-eval-name">Context Precision</h3>' +
                    '<span class="rag-eval-formula">mAP = &Sigma; (Precision@k &times; relevance_k) / |Relevant Chunks|</span>' +
                    '<p class="rag-eval-desc">Evaluates whether signal-bearing chunks were prioritized at the very top of the retrieved context window rather than buried at lower rank positions.</p>' +
                  '</div>' +
                  '<div class="rag-eval-card">' +
                    '<span class="rag-eval-score-pill">96.1%</span>' +
                    '<h3 class="rag-eval-name">Context Recall</h3>' +
                    '<span class="rag-eval-formula">Recall = |Ground truth facts retrieved| / |Total ground truth facts|</span>' +
                    '<p class="rag-eval-desc">Verifies whether the hybrid retrieval step captured all facts necessary to construct a complete, unambiguous response according to reference standards.</p>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              // Section 3
              '<div class="ef-section">' +
                '<div class="ef-section-header">' +
                  '<span class="ef-section-num">03</span>' +
                  '<h2 class="ef-section-title">Continuous CI/CD Quality Gates</h2>' +
                '</div>' +
                '<p class="ef-prose">Every prompt adjustment, chunk size tuning, or embedding model migration runs against a synthetic golden test suite of 500+ curated queries with automated regression alerts:</p>' +
                '<div class="rag-trace-log">' +
                  '[CI GATE] Running Ragas Automated Benchmark Suite (520 test pairs)...<br>' +
                  '[STEP 1/3] Context Precision Check: <span class="rag-trace-highlight">93.2% (Pass &gt; 90.0%)</span><br>' +
                  '[STEP 2/3] Faithfulness (Zero Hallucination Gate): <span class="rag-trace-highlight">97.4% (Pass &gt; 95.0%)</span><br>' +
                  '[STEP 3/3] Answer Relevance Check: <span class="rag-trace-highlight">94.8% (Pass &gt; 90.0%)</span><br>' +
                  '<span class="rag-trace-highlight">[STATUS] All quality gates passed. Safe to merge pull request.</span>' +
                '</div>' +
              '</div>' +

            '</div>' +

            // Footer
            '<div class="ynw-detail-footer">' +
              '<div class="ynw-detail-footer-inner">' +
                '<button class="ynw-detail-footer-btn" id="ynw-detail-footer-back">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
                  '<span>Return to Watchlist</span>' +
                '</button>' +
                '<button class="ynw-detail-next-btn" id="rag-next-swiggy">' +
                  '<span>Next Thinking: SWIGGY TEARDOWN</span>' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
                '</button>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</div>';
    } else {
      // Reel A: RAG ASSISTANT (Engineering / Build)
      return '' +
        '<div class="ynw-detail-container">' +
          '<div class="ynw-detail-bar">' +
            '<button class="ynw-detail-back-btn" id="ynw-detail-close-btn" aria-label="Back to Watchlist">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
              '<span>Back to Watchlist</span>' +
              '<span class="ynw-detail-kbd">ESC</span>' +
            '</button>' +
            '<div class="ynw-detail-badge">' +
              '<span class="ynw-detail-dot"></span>' +
              '<span>' + collectionName + ' // REEL ' + reel.reelKey.toUpperCase() + ' — FRAME #' + frameNum + '</span>' +
            '</div>' +
          '</div>' +

          '<div class="ynw-detail-scroll">' +
            '<div class="ynw-detail-hero">' +
              '<span class="ynw-detail-hero-tag">ENTERPRISE SYSTEM // RETRIEVAL-AUGMENTED GENERATION</span>' +
              '<h1 class="ynw-detail-hero-title">RAG ASSISTANT: PRODUCTION RETRIEVAL ENGINE</h1>' +
              '<p class="ynw-detail-hero-desc">Sub-second, zero-hallucination semantic query engine with hybrid dense-sparse vector search, cross-encoder reranking, and dynamic query decomposition.</p>' +
            '</div>' +

            '<div class="rag-shell">' +
              // Section 1
              '<div class="ef-section">' +
                '<div class="ef-section-header">' +
                  '<span class="ef-section-num">01</span>' +
                  '<h2 class="ef-section-title">The Engineering Challenge</h2>' +
                '</div>' +
                '<p class="ef-prose">Naïve RAG systems (single vector database + cosine distance + prompt stuffing) fail in production environments due to vocabulary mismatch, lost-in-the-middle context degradation, and high end-to-end latency. RAG Assistant was built with a high-throughput multi-stage retrieval architecture designed for enterprise documents.</p>' +
              '</div>' +

              // Section 2: Pipeline
              '<div class="rag-pipeline-card">' +
                '<div class="rag-pipeline-header">' +
                  '<h3 class="rag-pipeline-title">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' +
                    '<span>Multi-Stage Retrieval Architecture</span>' +
                  '</h3>' +
                  '<span class="rag-step-num" style="margin:0;">Latency Budget: &lt; 400ms</span>' +
                '</div>' +
                '<div class="rag-pipeline-steps">' +
                  '<div class="rag-step-box rag-step-box--active">' +
                    '<span class="rag-step-num">Stage 01</span>' +
                    '<h4 class="rag-step-title">HyDE Expansion</h4>' +
                    '<p class="rag-step-desc">Generates hypothetical document embeddings to bridge lexical domain gaps for abstract queries.</p>' +
                  '</div>' +
                  '<div class="rag-step-box">' +
                    '<span class="rag-step-num">Stage 02</span>' +
                    '<h4 class="rag-step-title">Hybrid Retrieval</h4>' +
                    '<p class="rag-step-desc">Fuses dense vector semantic similarity with sparse BM25 exact keyword matching via RRF.</p>' +
                  '</div>' +
                  '<div class="rag-step-box">' +
                    '<span class="rag-step-num">Stage 03</span>' +
                    '<h4 class="rag-step-title">Cross-Encoder</h4>' +
                    '<p class="rag-step-desc">Full token-level interaction reranks top 50 candidates down to top 5 high-relevance chunks.</p>' +
                  '</div>' +
                  '<div class="rag-step-box">' +
                    '<span class="rag-step-num">Stage 04</span>' +
                    '<h4 class="rag-step-title">Stream Synthesis</h4>' +
                    '<p class="rag-step-desc">Streams citations and verified answers with active factual verification filters.</p>' +
                  '</div>' +
                '</div>' +

                // Interactive Trace Inspector
                '<div class="rag-interactive-box">' +
                  '<div class="rag-query-input-row">' +
                    '<input type="text" class="rag-query-input" id="rag-demo-input" value="How does the system handle high concurrency and cache invalidation?" readonly>' +
                    '<button class="rag-query-btn" id="rag-trace-trigger">Trace Retrieval Pipeline</button>' +
                  '</div>' +
                  '<div class="rag-trace-log" id="rag-trace-output">' +
                    '[TRACE 0.00s] Incoming query received: "How does the system handle high concurrency..."<br>' +
                    '[TRACE +42ms] Generated HyDE hypothetical passage embedding (1536 dims).<br>' +
                    '[TRACE +85ms] Qdrant HNSW vector search fetched 30 dense candidates.<br>' +
                    '[TRACE +98ms] BM25 inverted index retrieved 30 sparse keyword candidates.<br>' +
                    '[TRACE +135ms] Reciprocal Rank Fusion merged 46 unique candidate passages.<br>' +
                    '[TRACE +220ms] Cohere Cross-Encoder reranked top 5 chunks (<span class="rag-trace-highlight">relevance score: 0.962</span>).<br>' +
                    '[TRACE +340ms] Synthesizing stream output with verified source anchors.' +
                  '</div>' +
                '</div>' +
              '</div>' +

              // Section 3: Architecture Specs
              '<div class="ef-section">' +
                '<div class="ef-section-header">' +
                  '<span class="ef-section-num">03</span>' +
                  '<h2 class="ef-section-title">Production Metrics &amp; Benchmarks</h2>' +
                '</div>' +
                '<div class="ef-cards-grid">' +
                  '<div class="ef-card">' +
                    '<span class="ef-card-tag">LATENCY</span>' +
                    '<h3 class="ef-card-title">380ms P50 Retrieval</h3>' +
                    '<p class="ef-card-desc">Achieved via async pipelining, Redis semantic cache for frequent queries, and quantized HNSW indexing.</p>' +
                  '</div>' +
                  '<div class="ef-card">' +
                    '<span class="ef-card-tag">ACCURACY</span>' +
                    '<h3 class="ef-card-title">94.6% Context Precision</h3>' +
                    '<p class="ef-card-desc">Cross-encoder reranking eliminates irrelevant boilerplate, keeping token cost low and generation fidelity high.</p>' +
                  '</div>' +
                '</div>' +
              '</div>' +

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
  }

  function initRagBindings(portal, reel, openFilmDetail, REEL_DATA, closeFilmDetail) {
    var isThinkingReel = reel.reelKey === 'b';

    // Interactive trace demo for Build reel
    var traceBtn = portal.querySelector('#rag-trace-trigger');
    var traceLog = portal.querySelector('#rag-trace-output');
    if (traceBtn && traceLog) {
      traceBtn.addEventListener('click', function() {
        traceLog.innerHTML = '<span class="rag-trace-accent">[PROCESSING] Decomposing query and querying Qdrant cluster...</span>';
        setTimeout(function() {
          traceLog.innerHTML =
            '[TRACE 0.00s] Incoming query received: "How does the system handle high concurrency..."<br>' +
            '[TRACE +38ms] Generated HyDE hypothetical passage embedding (1536 dims).<br>' +
            '[TRACE +79ms] Qdrant HNSW vector search fetched 30 dense candidates.<br>' +
            '[TRACE +94ms] BM25 inverted index retrieved 30 sparse keyword candidates.<br>' +
            '[TRACE +128ms] Reciprocal Rank Fusion merged 46 unique candidate passages.<br>' +
            '[TRACE +215ms] Cohere Cross-Encoder reranked top 5 chunks (<span class="rag-trace-highlight">relevance score: 0.968</span>).<br>' +
            '[TRACE +330ms] <span class="rag-trace-highlight">Response streaming initiated &bull; Latency: 330ms</span>';
        }, 400);
      });
    }

    // Next button bindings
    if (isThinkingReel) {
      var nextSwiggy = portal.querySelector('#rag-next-swiggy');
      if (nextSwiggy) {
        nextSwiggy.addEventListener('click', function() {
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
    } else {
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
  }

  injectStyles();
  window.getRagDetailHTML = getRagDetailHTML;
  window.initRagBindings = initRagBindings;

})();

