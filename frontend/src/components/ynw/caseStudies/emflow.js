/**
 * EMFLOW — Case Study & Interactive Demonstration Module
 * Fully modularized project detail experience for your-next-watch.html
 */
(function () {
  'use strict';

  // ─── Inject EmFlow Dedicated Styles if not already loaded ───
  function injectStyles() {
    if (document.getElementById('emflow-case-study-styles')) return;

    var css = `
/* ================================================================
   EMFLOW CASE STUDY & WORKSPACE SHOWCASE STYLES
   ================================================================ */
.ef-role-toggle-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(42, 42, 48, 0.6);
  flex-wrap: wrap;
  gap: 12px;
}

.ef-role-selector {
  display: flex;
  background: #101014;
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 3px;
  gap: 4px;
}

.ef-role-btn {
  background: transparent;
  border: none;
  padding: 6px 14px;
  border-radius: 3px;
  color: var(--text-secondary);
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ef-role-btn:hover {
  color: var(--text-primary);
}

.ef-role-btn.is-active {
  background: rgba(181, 31, 50, 0.22);
  color: #fff;
  border: 1px solid rgba(181, 31, 50, 0.45);
}

.ef-dash-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}

.ef-dash-card {
  background: rgba(20, 20, 26, 0.75);
  border: 1px solid rgba(42, 42, 48, 0.8);
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ef-dash-num {
  font-family: 'Clash Display', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
}

.ef-dash-num--accent { color: #ff4d61; }
.ef-dash-num--green  { color: #22c55e; }
.ef-dash-num--blue   { color: #3b82f6; }

.ef-dash-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.ef-tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ef-task-item {
  background: rgba(18, 18, 22, 0.7);
  border: 1px solid rgba(42, 42, 48, 0.7);
  border-radius: 4px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  transition: all 0.2s ease;
}

.ef-task-item:hover {
  border-color: rgba(181, 31, 50, 0.4);
  background: rgba(22, 22, 28, 0.85);
}

.ef-task-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ef-task-check {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1.5px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-size: 11px;
}

.ef-task-check--done {
  background: rgba(34, 197, 94, 0.15);
  border-color: #22c55e;
}

.ef-task-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.ef-task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ef-priority-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}

.ef-priority-badge--urgent {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #ef4444;
}

.ef-priority-badge--medium {
  background: rgba(234, 179, 8, 0.15);
  border: 1px solid rgba(234, 179, 8, 0.35);
  color: #eab308;
}

.ef-priority-badge--low {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: #3b82f6;
}

.ef-schema-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.ef-schema-card {
  background: rgba(20, 20, 26, 0.7);
  border: 1px solid rgba(42, 42, 48, 0.8);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ef-schema-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(42, 42, 48, 0.6);
  padding-bottom: 8px;
}

.ef-schema-name {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-primary);
}

.ef-schema-count {
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5px;
  color: var(--text-secondary);
}

.ef-schema-fields {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.ef-schema-fields span {
  color: #e5e5e7;
}

@media (max-width: 900px) {
  .ef-dash-grid { grid-template-columns: repeat(2, 1fr); }
  .ef-schema-grid { grid-template-columns: 1fr; }
}
    `;

    var styleEl = document.createElement('style');
    styleEl.id = 'emflow-case-study-styles';
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
  }

  // ─── Generate EmFlow Case Study HTML ───
  function getEmFlowDetailHTML(reel, index, itemData) {
    injectStyles();

    function pad(n) {
      return String(n).padStart(2, '0');
    }

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
      '<a class="ynw-detail-link-btn" href="https://github.com" target="_blank" rel="noopener noreferrer" title="View Source Code">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>' +
      '<span>GitHub Repo &nearr;</span>' +
      '</a>' +
      '<a class="ynw-detail-link-btn ynw-detail-link-btn--primary" href="https://emflow-app.vercel.app" target="_blank" rel="noopener noreferrer" title="Launch Web Application">' +
      '<span class="ynw-live-pulse"></span>' +
      '<span>Live App &nearr;</span>' +
      '</a>' +
      '</div>' +
      '<div class="ynw-detail-badge">' +
      '<span class="ynw-detail-dot"></span>' +
      '<span>THE BUILDS // REEL A &mdash; FRAME #' + pad((reel.current || 0) + 1) + '</span>' +
      '</div>' +
      '</div>' +

      '<!-- Scrollable Case Study Body -->' +
      '<div class="ynw-detail-scroll" id="ynw-detail-scroll-pane">' +

      '<!-- Hero Summary -->' +
      '<div class="ynw-detail-hero">' +
      '<span class="ynw-detail-hero-tag">FULL-STACK WORKFORCE PLATFORM // ROLE-AWARE OPERATIONS</span>' +
      '<h1 class="ynw-detail-hero-title">EMFLOW</h1>' +
      '<p class="ynw-detail-hero-desc">Centralized employee workflow and task management platform unifying work assignment, team coordination, event scheduling, and support ticket resolution in a role-aware workspace.</p>' +

      '<!-- 4-Card Metric Strip -->' +
      '<div class="ynw-metrics-grid">' +
      '<div class="ynw-metric-card">' +
      '<span class="ynw-metric-val">3 ROLES</span>' +
      '<span class="ynw-metric-label">RBAC Architecture</span>' +
      '<span class="ynw-metric-sub">Admin, Manager &amp; Member</span>' +
      '</div>' +
      '<div class="ynw-metric-card">' +
      '<span class="ynw-metric-val ynw-metric-val--crimson">6 ENTITIES</span>' +
      '<span class="ynw-metric-label">Relational Models</span>' +
      '<span class="ynw-metric-sub">Synchronized MongoDB Core</span>' +
      '</div>' +
      '<div class="ynw-metric-card">' +
      '<span class="ynw-metric-val">MERN STACK</span>' +
      '<span class="ynw-metric-label">Tech Foundation</span>' +
      '<span class="ynw-metric-sub">React 18 + Node/Express</span>' +
      '</div>' +
      '<div class="ynw-metric-card">' +
      '<span class="ynw-metric-val">DOCKER &amp; CI</span>' +
      '<span class="ynw-metric-label">Deployment Ready</span>' +
      '<span class="ynw-metric-sub">Compose &amp; GitHub Actions</span>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<!-- Interactive Workspace Showcase (Project Screens) -->' +
      '<div class="ynw-showcase-box">' +
      '<div class="ynw-showcase-topbar">' +
      '<div class="ynw-showcase-browser-left">' +
      '<div class="ynw-showcase-dots">' +
      '<div class="ynw-showcase-dot ynw-showcase-dot--red"></div>' +
      '<div class="ynw-showcase-dot ynw-showcase-dot--yellow"></div>' +
      '<div class="ynw-showcase-dot ynw-showcase-dot--green"></div>' +
      '</div>' +
      '<div class="ynw-showcase-address">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
      '<span>https://emflow.internal/workspace/dashboard</span>' +
      '</div>' +
      '</div>' +
      '<div class="ynw-showcase-tabs">' +
      '<button class="ynw-showcase-tab is-active" data-tab="ef-tab-roles">01 // Role-Aware Dashboard</button>' +
      '<button class="ynw-showcase-tab" data-tab="ef-tab-workflow">02 // Operational Workflows</button>' +
      '<button class="ynw-showcase-tab" data-tab="ef-tab-schema">03 // Relational MongoDB Schema</button>' +
      '</div>' +
      '</div>' +

      '<!-- Showcase Tab 1: Role-Aware Dashboard View -->' +
      '<div class="ynw-showcase-panel is-active" id="ef-tab-roles">' +
      '<div class="ef-role-toggle-bar">' +
      '<div class="ef-role-selector">' +
      '<button class="ef-role-btn is-active" data-view="manager">Team Manager View</button>' +
      '<button class="ef-role-btn" data-view="employee">Team Member View</button>' +
      '</div>' +
      '<div style="font-family: monospace; font-size: 11px; color: var(--text-secondary);">' +
      'AUTHENTICATED: JWT HTTP-ONLY COOKIE // ROLE: <span id="ef-current-role" style="color:var(--accent-primary);">TEAM_MANAGER</span>' +
      '</div>' +
      '</div>' +

      '<!-- Manager Dashboard View -->' +
      '<div id="ef-view-manager">' +
      '<div class="ef-dash-grid">' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num ef-dash-num--accent">14</span>' +
      '<span class="ef-dash-label">Active Team Tasks</span>' +
      '</div>' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num ef-dash-num--green">88%</span>' +
      '<span class="ef-dash-label">Team Velocity</span>' +
      '</div>' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num ef-dash-num--blue">3</span>' +
      '<span class="ef-dash-label">Open Support Tickets</span>' +
      '</div>' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num">6</span>' +
      '<span class="ef-dash-label">Direct Team Members</span>' +
      '</div>' +
      '</div>' +
      '<div class="ef-tasks-list">' +
      '<div class="ef-task-item">' +
      '<div class="ef-task-left">' +
      '<span class="ef-task-check ef-task-check--done">&#10003;</span>' +
      '<div>' +
      '<div class="ef-task-title">Database Index Optimization for Ticket Queries</div>' +
      '<div style="font-size: 11px; color: var(--text-secondary);">Assigned: Alex Rivera &bull; Due: Today &bull; Team: Core Platform</div>' +
      '</div>' +
      '</div>' +
      '<div class="ef-task-meta">' +
      '<span class="ef-priority-badge ef-priority-badge--urgent">High Priority</span>' +
      '<span style="font-size: 11px; color:#22c55e;">Completed</span>' +
      '</div>' +
      '</div>' +
      '<div class="ef-task-item">' +
      '<div class="ef-task-left">' +
      '<span class="ef-task-check">&bull;</span>' +
      '<div>' +
      '<div class="ef-task-title">Q4 All-Hands Event Scheduling &amp; Invitations</div>' +
      '<div style="font-size: 11px; color: var(--text-secondary);">Assigned: Sarah Chen &bull; Due: Friday &bull; Team: Operations</div>' +
      '</div>' +
      '</div>' +
      '<div class="ef-task-meta">' +
      '<span class="ef-priority-badge ef-priority-badge--medium">Medium</span>' +
      '<span style="font-size: 11px; color:#eab308;">In Progress</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<!-- Employee Dashboard View (hidden by default) -->' +
      '<div id="ef-view-employee" style="display: none;">' +
      '<div class="ef-dash-grid">' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num ef-dash-num--accent">4</span>' +
      '<span class="ef-dash-label">My Assigned Tasks</span>' +
      '</div>' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num ef-dash-num--green">2</span>' +
      '<span class="ef-dash-label">Tickets Resolved</span>' +
      '</div>' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num ef-dash-num--blue">1</span>' +
      '<span class="ef-dash-label">Upcoming Event</span>' +
      '</div>' +
      '<div class="ef-dash-card">' +
      '<span class="ef-dash-num">94%</span>' +
      '<span class="ef-dash-label">On-Time Completion</span>' +
      '</div>' +
      '</div>' +
      '<div class="ef-tasks-list">' +
      '<div class="ef-task-item">' +
      '<div class="ef-task-left">' +
      '<span class="ef-task-check">&bull;</span>' +
      '<div>' +
      '<div class="ef-task-title">Refactor Auth Middleware for Refresh Token Rotation</div>' +
      '<div style="font-size: 11px; color: var(--text-secondary);">Task #204 &bull; Deadline: 18:00 Today &bull; Dependencies: Cleared</div>' +
      '</div>' +
      '</div>' +
      '<span class="ef-priority-badge ef-priority-badge--urgent">Urgent</span>' +
      '</div>' +
      '<div class="ef-task-item">' +
      '<div class="ef-task-left">' +
      '<span class="ef-task-check ef-task-check--done">&#10003;</span>' +
      '<div>' +
      '<div class="ef-task-title">Ticket #104: Password Reset OAuth Callback Fix</div>' +
      '<div style="font-size: 11px; color: var(--text-secondary);">Status: Resolved &bull; Thread: 3 Responses &bull; Closed by Admin</div>' +
      '</div>' +
      '</div>' +
      '<span class="ef-priority-badge ef-priority-badge--low">Resolved</span>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '</div>' +

      '<!-- Showcase Tab 2: Operational Workflows -->' +
      '<div class="ynw-showcase-panel" id="ef-tab-workflow">' +
      '<div class="ynw-sc-pipeline-header">' +
      '<div class="ynw-sc-pipeline-title">CENTRALIZED 7-STAGE WORKFLOW ENGINE</div>' +
      '<div class="ynw-sc-pipeline-time">' +
      '<span class="ynw-live-pulse"></span>' +
      '<span>ROLE-BASED DISPATCH // REAL-TIME SYNC</span>' +
      '</div>' +
      '</div>' +
      '<div class="ynw-sc-agent-cards">' +
      '<div class="ynw-sc-agent-row">' +
      '<div class="ynw-sc-agent-info">' +
      '<div class="ynw-sc-agent-icon">01</div>' +
      '<div>' +
      '<div class="ynw-sc-agent-name">Admin Account &amp; Role Provisioning</div>' +
      '<div class="ynw-sc-agent-duty">Creates employee records, assigns permissions (Admin / Manager / Member), and configures departmental access boundaries.</div>' +
      '</div>' +
      '</div>' +
      '<span class="ynw-sc-agent-pill ynw-sc-agent-pill--done">RBAC Guard</span>' +
      '</div>' +
      '<div class="ynw-sc-agent-row">' +
      '<div class="ynw-sc-agent-info">' +
      '<div class="ynw-sc-agent-icon">02</div>' +
      '<div>' +
      '<div class="ynw-sc-agent-name">Team Formation &amp; Task Assignment</div>' +
      '<div class="ynw-sc-agent-duty">Managers group employees into functional teams and delegate granular tasks with explicit deadlines, priorities, and dependencies.</div>' +
      '</div>' +
      '</div>' +
      '<span class="ynw-sc-agent-pill ynw-sc-agent-pill--done">Delegation</span>' +
      '</div>' +
      '<div class="ynw-sc-agent-row">' +
      '<div class="ynw-sc-agent-info">' +
      '<div class="ynw-sc-agent-icon">03</div>' +
      '<div>' +
      '<div class="ynw-sc-agent-name">Operational Ticket Lifecycle &amp; Escalation</div>' +
      '<div class="ynw-sc-agent-duty">Staff open support tickets for blockers. Threaded responses connect employees with resolvers, tracking reopen rates and time-to-close.</div>' +
      '</div>' +
      '</div>' +
      '<span class="ynw-sc-agent-pill ynw-sc-agent-pill--done">Support Loop</span>' +
      '</div>' +
      '<div class="ynw-sc-agent-row is-active">' +
      '<div class="ynw-sc-agent-info">' +
      '<div class="ynw-sc-agent-icon ynw-sc-agent-icon--running">04</div>' +
      '<div>' +
      '<div class="ynw-sc-agent-name">Performance Calculation &amp; Velocity Synthesis</div>' +
      '<div class="ynw-sc-agent-duty">Aggregates completed deliverables, ticket turnaround, and timeline adherence into transparent, objective performance summaries.</div>' +
      '</div>' +
      '</div>' +
      '<span class="ynw-sc-agent-pill ynw-sc-agent-pill--running">&#9889; Active Metrics</span>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<!-- Showcase Tab 3: Relational MongoDB Schema -->' +
      '<div class="ynw-showcase-panel" id="ef-tab-schema">' +
      '<div class="ef-schema-grid">' +
      '<div class="ef-schema-card">' +
      '<div class="ef-schema-head">' +
      '<span class="ef-schema-name">employees</span>' +
      '<span class="ef-schema-count">Core Identity</span>' +
      '</div>' +
      '<div class="ef-schema-fields">' +
      '_id: ObjectId<br>' +
      'name, email, password<br>' +
      '<span>role: "admin"|"manager"|"member"</span><br>' +
      'team: ref &rarr; teams<br>' +
      'assignedTasks: [ref &rarr; tasks]<br>' +
      'googleId, avatar' +
      '</div>' +
      '</div>' +
      '<div class="ef-schema-card">' +
      '<div class="ef-schema-head">' +
      '<span class="ef-schema-name">teams</span>' +
      '<span class="ef-schema-count">Work Unit</span>' +
      '</div>' +
      '<div class="ef-schema-fields">' +
      '_id: ObjectId<br>' +
      'name: String<br>' +
      '<span>manager: ref &rarr; employees</span><br>' +
      'members: [ref &rarr; employees]<br>' +
      'performanceScore: Number<br>' +
      'createdAt, updatedAt' +
      '</div>' +
      '</div>' +
      '<div class="ef-schema-card">' +
      '<div class="ef-schema-head">' +
      '<span class="ef-schema-name">tasks</span>' +
      '<span class="ef-schema-count">Deliverables</span>' +
      '</div>' +
      '<div class="ef-schema-fields">' +
      '_id: ObjectId<br>' +
      'title, description<br>' +
      '<span>assignedTo: ref &rarr; employees</span><br>' +
      'createdBy: ref &rarr; employees<br>' +
      'status: "pending"|"in-progress"|"done"<br>' +
      'priority, deadline' +
      '</div>' +
      '</div>' +
      '<div class="ef-schema-card">' +
      '<div class="ef-schema-head">' +
      '<span class="ef-schema-name">tickets</span>' +
      '<span class="ef-schema-count">Support</span>' +
      '</div>' +
      '<div class="ef-schema-fields">' +
      '_id: ObjectId<br>' +
      'subject, description<br>' +
      '<span>submittedBy: ref &rarr; employees</span><br>' +
      'assignedTo: ref &rarr; employees<br>' +
      'status: "open"|"in-review"|"closed"<br>' +
      'priority, category' +
      '</div>' +
      '</div>' +
      '<div class="ef-schema-card">' +
      '<div class="ef-schema-head">' +
      '<span class="ef-schema-name">ticketresponses</span>' +
      '<span class="ef-schema-count">Threaded Chat</span>' +
      '</div>' +
      '<div class="ef-schema-fields">' +
      '_id: ObjectId<br>' +
      '<span>ticketId: ref &rarr; tickets</span><br>' +
      'sender: ref &rarr; employees<br>' +
      'message: String<br>' +
      'attachments: [String]<br>' +
      'timestamp: Date' +
      '</div>' +
      '</div>' +
      '<div class="ef-schema-card">' +
      '<div class="ef-schema-head">' +
      '<span class="ef-schema-name">events</span>' +
      '<span class="ef-schema-count">Scheduling</span>' +
      '</div>' +
      '<div class="ef-schema-fields">' +
      '_id: ObjectId<br>' +
      'title, location<br>' +
      'startDate, endDate<br>' +
      '<span>creator: ref &rarr; employees</span><br>' +
      'invitedEmployees: [ref &rarr; employees]<br>' +
      'type: "meeting"|"review"|"all-hands"' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<!-- Chapter 01: The Premise -->' +
      '<section class="ynw-chapter">' +
      '<div class="ynw-chapter-header">' +
      '<span class="ynw-chapter-num">01 // THE PREMISE</span>' +
      '<h2 class="ynw-chapter-title">Unified Employee Workflow and Task Management</h2>' +
      '<p class="ynw-chapter-sub">Bringing tasks, teams, events, performance visibility, and support tickets into one role-aware workspace.</p>' +
      '</div>' +
      '<div class="ynw-twocol-grid">' +
      '<div class="ynw-prose-card">' +
      '<h3>' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
      '<span>What is EmFlow?</span>' +
      '</h3>' +
      '<p>EmFlow is a full-stack Employee Workflow and Task Management platform designed to centralize how organizations assign work, coordinate teams, manage events, and resolve employee support tickets.</p>' +
      '</div>' +
      '<div class="ynw-prose-card">' +
      '<h3>' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
      '<span>What problem does it address?</span>' +
      '</h3>' +
      '<p>It addresses the problem of fragmented workforce management. Instead of relying on separate spreadsheets, chats, calendars, and email threads, EmFlow brings tasks, teams, events, performance visibility, and tickets into one cohesive, role-aware workspace.</p>' +
      '</div>' +
      '</div>' +
      '</section>' +

      '<!-- Chapter 02: The Problem -->' +
      '<section class="ynw-chapter">' +
      '<div class="ynw-chapter-header">' +
      '<span class="ynw-chapter-num">02 // THE PROBLEM</span>' +
      '<h2 class="ynw-chapter-title">The Interpretability Dilemma in Workforce Performance</h2>' +
      '<p class="ynw-chapter-sub">Why traditional employee reviews are subjective, disconnected from reality, and difficult to interpret.</p>' +
      '</div>' +
      '<div class="ynw-prose-card" style="margin-bottom: 16px;">' +
      '<p>Existing employee and product-performance reviews are difficult to interpret because the underlying information is usually fragmented across disparate tools and heavily clouded by subjectivity. Without a unified ledger of action, reviews fail to reflect true operational reality.</p>' +
      '</div>' +
      '<div class="ynw-threecol-grid">' +
      '<div class="ynw-prose-card">' +
      '<h3><span class="ynw-prose-num">01.</span> Task Allocation Ambiguity</h3>' +
      '<p>Reviews cannot reliably verify which tasks were assigned, when they were delegated, or whether scope creep occurred midway through execution.</p>' +
      '</div>' +
      '<div class="ynw-prose-card">' +
      '<h3><span class="ynw-prose-num">02.</span> Dependency vs. Ownership</h3>' +
      '<p>Fails to distinguish whether project delays were caused by individual bandwidth, blocking cross-team dependencies, or ambiguous ownership.</p>' +
      '</div>' +
      '<div class="ynw-prose-card">' +
      '<h3><span class="ynw-prose-num">03.</span> Unrecorded Ticket Friction</h3>' +
      '<p>Ignores operational friction &mdash; such as how many blockers or support tickets were resolved, reopened, or escalated during the sprint.</p>' +
      '</div>' +
      '<div class="ynw-prose-card">' +
      '<h3><span class="ynw-prose-num">04.</span> Individual vs. Team Blend</h3>' +
      '<p>Blurs the distinction between individual employee output and broader collective team performance, obscuring high and low contributors.</p>' +
      '</div>' +
      '<div class="ynw-prose-card" style="grid-column: span 2;">' +
      '<h3><span class="ynw-prose-num">05.</span> Longitudinal Inconsistency &amp; EmFlow&rsquo;s Solution</h3>' +
      '<p>Progress is rarely measured consistently over time. EmFlow dramatically improves interpretability by connecting task status, deadlines, team membership, employee roles, ticket activity, and performance summaries in a single shared, verifiable ledger.</p>' +
      '</div>' +
      '</div>' +
      '</section>' +

      '<!-- Chapter 03: The Approach -->' +
      '<section class="ynw-chapter">' +
      '<div class="ynw-chapter-header">' +
      '<span class="ynw-chapter-num">03 // THE APPROACH</span>' +
      '<h2 class="ynw-chapter-title">The Centralized Role-Aware Operational Model</h2>' +
      '<p class="ynw-chapter-sub">Connecting administrators, managers, and employees through structured records and RESTful APIs.</p>' +
      '</div>' +
      '<div class="ynw-pipeline-flow" style="grid-template-columns: repeat(4, 1fr);">' +
      '<div class="ynw-pipe-step">' +
      '<span class="ynw-pipe-step-num">STEP 01</span>' +
      '<h4 class="ynw-pipe-step-title">Admin Account Governance</h4>' +
      '<p class="ynw-pipe-step-desc">Administrators manage employee accounts, assign permissions, and maintain organizational boundary controls.</p>' +
      '</div>' +
      '<div class="ynw-pipe-step">' +
      '<span class="ynw-pipe-step-num">STEP 02</span>' +
      '<h4 class="ynw-pipe-step-title">Team Formation &amp; Tasks</h4>' +
      '<p class="ynw-pipe-step-desc">Team managers assemble specialized teams, allocate deliverables, and assign priority-weighted tasks.</p>' +
      '</div>' +
      '<div class="ynw-pipe-step">' +
      '<span class="ynw-pipe-step-num">STEP 03</span>' +
      '<h4 class="ynw-pipe-step-title">Employee Execution</h4>' +
      '<p class="ynw-pipe-step-desc">Employees view assigned queues in their personal portal, log milestones, and advance task statuses in real time.</p>' +
      '</div>' +
      '<div class="ynw-pipe-step">' +
      '<span class="ynw-pipe-step-num">STEP 04</span>' +
      '<h4 class="ynw-pipe-step-title">Monitoring &amp; Performance</h4>' +
      '<p class="ynw-pipe-step-desc">Managers monitor task velocity, review delivery health, and track computed team performance summaries.</p>' +
      '</div>' +
      '<div class="ynw-pipe-step">' +
      '<span class="ynw-pipe-step-num">STEP 05</span>' +
      '<h4 class="ynw-pipe-step-title">Support Ticket Loops</h4>' +
      '<p class="ynw-pipe-step-desc">Employees open internal support tickets to unblock issues, tracking threaded conversations to resolution.</p>' +
      '</div>' +
      '<div class="ynw-pipe-step">' +
      '<span class="ynw-pipe-step-num">STEP 06</span>' +
      '<h4 class="ynw-pipe-step-title">Event Scheduling</h4>' +
      '<p class="ynw-pipe-step-desc">Shared events, reviews, and all-hands are created and targeted to specific invited employee groups.</p>' +
      '</div>' +
      '<div class="ynw-pipe-step" style="grid-column: span 2;">' +
      '<span class="ynw-pipe-step-num">STEP 07</span>' +
      '<h4 class="ynw-pipe-step-title">Role-Specific Data Presentation</h4>' +
      '<p class="ynw-pipe-step-desc">Dashboards present role-tailored views of operational data, ensuring each user sees exactly what is relevant to their authorization tier.</p>' +
      '</div>' +
      '</div>' +
      '</section>' +

      '<!-- Chapter 04: Under the Hood -->' +
      '<section class="ynw-chapter">' +
      '<div class="ynw-chapter-header">' +
      '<span class="ynw-chapter-num">04 // UNDER THE HOOD</span>' +
      '<h2 class="ynw-chapter-title">Full-Stack Architecture &amp; Data Engineering</h2>' +
      '<p class="ynw-chapter-sub">Enterprise MERN architecture with JWT cookie rotation and MongoDB relational modeling.</p>' +
      '</div>' +
      '<table class="ynw-stack-table">' +
      '<thead>' +
      '<tr>' +
      '<th style="width: 22%;">System Layer</th>' +
      '<th style="width: 28%;">Technologies</th>' +
      '<th>Key Engineering Responsibilities</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr>' +
      '<td class="ynw-stack-layer">Frontend Client</td>' +
      '<td class="ynw-stack-tech">React 18, Vite, Tailwind CSS</td>' +
      '<td>Single-page app with React Router, React Context global state, Radix UI primitives, Framer Motion transitions, and Recharts performance visualizations.</td>' +
      '</tr>' +
      '<tr>' +
      '<td class="ynw-stack-layer">Backend &amp; APIs</td>' +
      '<td class="ynw-stack-tech">Node.js, Express REST</td>' +
      '<td>RESTful endpoints for auth, JWT access/refresh token rotation, Passport Google OAuth, task management, team velocity logic, and ticket escalation.</td>' +
      '</tr>' +
      '<tr>' +
      '<td class="ynw-stack-layer">Database &amp; Models</td>' +
      '<td class="ynw-stack-tech">MongoDB, Mongoose ODM</td>' +
      '<td>6 relational entities: employees, teams, tasks, events, tickets, and ticketresponses connected via cross-collection references.</td>' +
      '</tr>' +
      '<tr>' +
      '<td class="ynw-stack-layer">RBAC &amp; Roles</td>' +
      '<td class="ynw-stack-tech">Admin, Manager &amp; Member</td>' +
      '<td>No autonomous AI agents; strictly role-based operational actors enforced via authMiddleware, adminCheck, and managerAccess guards.</td>' +
      '</tr>' +
      '<tr>' +
      '<td class="ynw-stack-layer">Deployment &amp; CI</td>' +
      '<td class="ynw-stack-tech">Vercel, Docker, GitHub Actions</td>' +
      '<td>Multi-stage Dockerfiles, Docker Compose orchestrations, and automated CI/CD pipeline triggers on repository push.</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</section>' +

      '<!-- Chapter 05: The Challenges -->' +
      '<section class="ynw-chapter">' +
      '<div class="ynw-chapter-header">' +
      '<span class="ynw-chapter-num">05 // THE CHALLENGES</span>' +
      '<h2 class="ynw-chapter-title">Engineering Roadblocks &amp; System Hardening</h2>' +
      '<p class="ynw-chapter-sub">Critical challenges solved in relational integrity, token synchronization, and permissions.</p>' +
      '</div>' +
      '<div class="ynw-challenges-grid">' +
      '<div class="ynw-challenge-card">' +
      '<div class="ynw-challenge-head">' +
      '<h3 class="ynw-challenge-title">Role-Based Access Control (RBAC)</h3>' +
      '<span class="ynw-challenge-tag">SECURITY</span>' +
      '</div>' +
      '<p class="ynw-challenge-body">Engineering tiered middleware to cleanly separate permissions for admins, team managers, and employees without code duplication or security privilege leaks across route handlers.</p>' +
      '</div>' +
      '<div class="ynw-challenge-card">' +
      '<div class="ynw-challenge-head">' +
      '<h3 class="ynw-challenge-title">Relational Synchronization in NoSQL</h3>' +
      '<span class="ynw-challenge-tag">DATA INTEGRITY</span>' +
      '</div>' +
      '<p class="ynw-challenge-body">Keeping task, team, and employee relationships synchronized across MongoDB references when employees transfer teams, reassign tasks, or update ticket response threads.</p>' +
      '</div>' +
      '<div class="ynw-challenge-card">' +
      '<div class="ynw-challenge-head">' +
      '<h3 class="ynw-challenge-title">JWT Lifecycle &amp; Cookie Persistence</h3>' +
      '<span class="ynw-challenge-tag">AUTHENTICATION</span>' +
      '</div>' +
      '<p class="ynw-challenge-body">Managing short-lived JWT access tokens alongside secure HTTP-only refresh tokens, resolving edge-case refresh-token race conditions during concurrent client API requests.</p>' +
      '</div>' +
      '<div class="ynw-challenge-card">' +
      '<div class="ynw-challenge-head">' +
      '<h3 class="ynw-challenge-title">Cross-Origin Deployment Auth</h3>' +
      '<span class="ynw-challenge-tag">NETWORKING</span>' +
      '</div>' +
      '<p class="ynw-challenge-body">Managing CORS headers, preflight OPTIONS requests, and SameSite credentials between decoupled Vercel frontend deployments and backend server instances.</p>' +
      '</div>' +
      '<div class="ynw-challenge-card">' +
      '<div class="ynw-challenge-head">' +
      '<h3 class="ynw-challenge-title">Ticket Lifecycle &amp; Resolution Loops</h3>' +
      '<span class="ynw-challenge-tag">STATE ENGINE</span>' +
      '</div>' +
      '<p class="ynw-challenge-body">Supporting ticket assignment, reassignment, reopen statuses, threaded responses, and permissions so that only ticket creators and managers can alter resolution states.</p>' +
      '</div>' +
      '<div class="ynw-challenge-card">' +
      '<div class="ynw-challenge-head">' +
      '<h3 class="ynw-challenge-title">Operational Performance Calculations</h3>' +
      '<span class="ynw-challenge-tag">ANALYTICS</span>' +
      '</div>' +
      '<p class="ynw-challenge-body">Extracting meaningful team velocity and on-time task delivery ratios from raw timestamp records to display objective operational metrics rather than subjective manager ratings.</p>' +
      '</div>' +
      '</div>' +
      '</section>' +

      '<!-- Chapter 06: The Outcome -->' +
      '<section class="ynw-chapter">' +
      '<div class="ynw-chapter-header">' +
      '<span class="ynw-chapter-num">06 // THE OUTCOME</span>' +
      '<h2 class="ynw-chapter-title">Current Delivery State &amp; Future Horizons</h2>' +
      '<p class="ynw-chapter-sub">Documenting built capabilities, test status, and strategic enhancement roadmap.</p>' +
      '</div>' +
      '<div class="ynw-roadmap-grid">' +
      '<div class="ynw-phase-card is-current">' +
      '<span class="ynw-phase-badge ynw-phase-badge--live">&#9679; Built Foundation</span>' +
      '<h3 class="ynw-phase-title">Operational Core Active</h3>' +
      '<p class="ynw-phase-desc">Working foundation for auth, JWT routes, role dashboards, team creation, task delegation, event invites, support ticketing, and team performance calculations.</p>' +
      '</div>' +
      '<div class="ynw-phase-card">' +
      '<span class="ynw-phase-badge ynw-phase-badge--live" style="background:rgba(234,179,8,0.15); color:#eab308; border-color:rgba(234,179,8,0.4);">&#9679; Tested State</span>' +
      '<h3 class="ynw-phase-title">Build &amp; Test Diagnostics</h3>' +
      '<p class="ynw-phase-desc">Production Vite build succeeds. Frontend test script completes with Dashboard unit test. ESLint flags 407 prop-type warnings. Automated backend tests planned.</p>' +
      '</div>' +
      '<div class="ynw-phase-card">' +
      '<span class="ynw-phase-badge ynw-phase-badge--planned">&#9675; Strategic Roadmap</span>' +
      '<h3 class="ynw-phase-title">Planned Enhancements</h3>' +
      '<p class="ynw-phase-desc">Calendar sync, multi-level employee hierarchies, SLA escalation alerts, WebSocket real-time notifications, and full automated integration test suites.</p>' +
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
      '<button class="ynw-detail-next-btn" id="ynw-detail-next-build">' +
      '<span>Next Build: RAG ASSISTANT</span>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>' +
      '</div>' +
      '</div>' +

      '</div>' +
      '</div>';
  }

  // ─── Bind EmFlow Interactive Events ───
  function initEmFlowBindings(portal, reelA, openFilmDetail, REEL_A_DATA, closeFilmDetail) {
    // Tab switcher in showcase
    var tabs = portal.querySelectorAll('.ynw-showcase-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var targetId = tab.getAttribute('data-tab');
        var panels = portal.querySelectorAll('.ynw-showcase-panel');
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        var activePanel = portal.querySelector('#' + targetId);
        if (activePanel) activePanel.classList.add('is-active');
      });
    });

    // Role View Switcher in Tab 1
    var roleBtns = portal.querySelectorAll('.ef-role-btn');
    var viewManager = portal.querySelector('#ef-view-manager');
    var viewEmployee = portal.querySelector('#ef-view-employee');
    var roleLabel = portal.querySelector('#ef-current-role');

    roleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        roleBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var view = btn.getAttribute('data-view');
        if (view === 'manager') {
          if (viewManager) viewManager.style.display = 'block';
          if (viewEmployee) viewEmployee.style.display = 'none';
          if (roleLabel) roleLabel.textContent = 'TEAM_MANAGER';
        } else {
          if (viewManager) viewManager.style.display = 'none';
          if (viewEmployee) viewEmployee.style.display = 'block';
          if (roleLabel) roleLabel.textContent = 'TEAM_MEMBER';
        }
      });
    });

    // Next Build Button: Advances Reel A to Frame 4 (RAG ASSISTANT)
    var nextBtn = portal.querySelector('#ynw-detail-next-build');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        closeFilmDetail();
        setTimeout(function () {
          reelA.goTo(3);
          setTimeout(function () {
            var activeFrame = reelA.scene.querySelector('.ynw-frame.is-active') || reelA.scene.querySelectorAll('.ynw-frame')[3];
            if (activeFrame) {
              openFilmDetail(reelA, 3, activeFrame, REEL_A_DATA[3]);
            }
          }, 550);
        }, 450);
      });
    }
  }

  // Export to window
  injectStyles();
  window.getEmFlowDetailHTML = getEmFlowDetailHTML;
  window.initEmFlowBindings = initEmFlowBindings;

})();

