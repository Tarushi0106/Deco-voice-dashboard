import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import "./CampaignDetail.css";

const CAMPAIGN_DATA = {
  1: { name: "Appointment booking", id: "cdemo-e0fd4hich2872h..", status: "completed", number: "+91 7495725345", createdOn: "09:30 pm (04.06.26)", createdBy: "demo@deco.in", totalContacts: 4, connected: 3, duration: "1m 26s", dndCalls: 0, transfers: 0, totalLeads: 0, engaged: 3, notEngaged: 1 },
  2: { name: "Customer support",    id: "cdemo-e0fd4hich2872h..", status: "completed", number: "+91 7495725345", createdOn: "09:30 pm (04.06.26)", createdBy: "demo@deco.in", totalContacts: 4, connected: 3, duration: "1m 26s", dndCalls: 0, transfers: 0, totalLeads: 0, engaged: 3, notEngaged: 1 },
  3: { name: "Lead qualification",  id: "cdemo-e0fd4hich2872h..", status: "running",   number: "+91 7495725345", createdOn: "09:30 pm (04.06.26)", createdBy: "demo@deco.in", totalContacts: 4, connected: 3, duration: "1m 26s", dndCalls: 0, transfers: 0, totalLeads: 0, engaged: 3, notEngaged: 1 },
  4: { name: "Lead follow up",      id: "cdemo-e0fd4hich2872h..", status: "queued",    number: "+91 7495725345", createdOn: "09:30 pm (04.06.26)", createdBy: "demo@deco.in", totalContacts: 4, connected: 3, duration: "1m 26s", dndCalls: 0, transfers: 0, totalLeads: 0, engaged: 3, notEngaged: 1 },
};

const ALL_ROWS = [
  { phone: "+91 9845677545", time: "03:45 pm", status: "ongoing",   leads: 0, transfer: 0, duration: "1m 26s", hasRecording: true, summary: "The caller expressed interest in ready possession properties and engaged..." },
  { phone: "+91 9845677545", time: "03:45 pm", status: "ringing",   leads: 0, transfer: 0, duration: null,     hasRecording: true, summary: "The caller expressed interest in ready possession properties and engaged..." },
  { phone: "+91 9845677545", time: "03:45 pm", status: "completed", leads: 0, transfer: 0, duration: "0m 30s", hasRecording: true, summary: "The caller expressed interest in ready possession properties and engaged..." },
];

const STATUS_FILTER_MAP = { Completed: "completed", Running: "ongoing", Queued: "ringing" };

function CircleProgress({ total, connected }) {
  const r = 28, cx = 36, cy = 36;
  const circ = 2 * Math.PI * r;
  const dash = (connected / total) * circ;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e0e7ff" strokeWidth="7" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#6366f1" strokeWidth="7"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
    </svg>
  );
}

function DonutChart({ a, b }) {
  const r = 16, cx = 22, cy = 22;
  const circ = 2 * Math.PI * r;
  const aDash = (a / (a + b)) * circ;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fca5a5" strokeWidth="8" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22c55e" strokeWidth="8"
        strokeDasharray={`${aDash} ${circ - aDash}`} strokeLinecap="butt"
        transform={`rotate(-90 ${cx} ${cy})`} />
    </svg>
  );
}

const STAT_ICONS = {
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  dnd: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
      <path d="M6.6 6.6l10.8 10.8M22 16.9v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91"/>
    </svg>
  ),
  transfer: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
    </svg>
  ),
  leads: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
};

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromReports = location.state?.from === "reports";
  const camp = CAMPAIGN_DATA[id] || CAMPAIGN_DATA[1];
  const [activeFilter, setActiveFilter] = useState("All status");
  const [copied, setCopied] = useState(false);

  const filters = ["All status", "Completed", "Running", "Queued"];
  const rows = activeFilter === "All status"
    ? ALL_ROWS
    : ALL_ROWS.filter(r => r.status === STATUS_FILTER_MAP[activeFilter]);

  const handleCopy = () => {
    navigator.clipboard.writeText(camp.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Layout searchPlaceholder="campaign">
      {/* Top bar */}
      <div className="cd-topbar">
        <button className="cd-back-btn" onClick={() => navigate(fromReports ? "/reports" : "/campaign")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          {fromReports ? "Back to reports" : "Back to campaigns"}
        </button>
        <button className="cd-download-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download report
        </button>
      </div>

      {/* Campaign header card */}
      <div className="cd-header-card">
        <div className="cd-header-left">
          <div className="cd-campaign-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4z"/>
            </svg>
          </div>
          <div>
            <div className="cd-camp-title-row">
              <span className="cd-camp-name">Campaign: {camp.name}</span>
              <span className={`cd-status-badge ${camp.status}`}>{camp.status}</span>
            </div>
            <div className="cd-camp-id-row">
              <span className="cd-camp-id">{camp.id}</span>
              <button className="cd-copy-btn" onClick={handleCopy} title="Copy ID">
                {copied ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="cd-header-right">
          <div className="cd-meta-item">
            <span className="cd-meta-label">Number</span>
            <span className="cd-meta-value">{camp.number}</span>
          </div>
          <div className="cd-meta-divider" />
          <div className="cd-meta-item">
            <span className="cd-meta-label">Created on</span>
            <span className="cd-meta-value">{camp.createdOn}</span>
          </div>
          <div className="cd-meta-divider" />
          <div className="cd-meta-item">
            <span className="cd-meta-label">Created by</span>
            <span className="cd-meta-value">{camp.createdBy}</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="cd-overview-wrap">
        <p className="cd-section-title">Overview</p>
        <div className="cd-overview-grid">
          {/* Card 1: circle progress */}
          <div className="cd-ov-card">
            <CircleProgress total={camp.totalContacts} connected={camp.connected} />
            <div className="cd-ov-circle-text">
              <span className="cd-ov-circle-label">Total contacts- {camp.totalContacts}</span>
              <span className="cd-ov-circle-label">Total Connected- {camp.connected}/{camp.totalContacts}</span>
            </div>
          </div>

          {/* Card 2: Duration */}
          <div className="cd-ov-card cd-ov-stat">
            <div className="cd-ov-icon">{STAT_ICONS.clock}</div>
            <span className="cd-ov-value">{camp.duration}</span>
            <span className="cd-ov-label">Duration</span>
          </div>

          {/* Card 3: DND */}
          <div className="cd-ov-card cd-ov-stat">
            <div className="cd-ov-icon">{STAT_ICONS.dnd}</div>
            <span className="cd-ov-value">{camp.dndCalls}</span>
            <span className="cd-ov-label">DND Calls</span>
          </div>

          {/* Card 4: Transfers */}
          <div className="cd-ov-card cd-ov-stat">
            <div className="cd-ov-icon">{STAT_ICONS.transfer}</div>
            <span className="cd-ov-value">{camp.transfers}</span>
            <span className="cd-ov-label">Transfers</span>
          </div>

          {/* Card 5: Total leads */}
          <div className="cd-ov-card cd-ov-stat">
            <div className="cd-ov-icon">{STAT_ICONS.leads}</div>
            <span className="cd-ov-value">{camp.totalLeads}</span>
            <span className="cd-ov-label">Total leads</span>
          </div>

          {/* Card 6: Engagement donut */}
          <div className="cd-ov-card cd-ov-donut">
            <DonutChart a={camp.engaged} b={camp.notEngaged} />
            <div className="cd-ov-donut-legend">
              <span className="cd-ov-donut-dot green" />{camp.engaged}
              <span className="cd-ov-donut-dot red" style={{ marginLeft: 8 }} />{camp.notEngaged}
            </div>
            <span className="cd-ov-label">Engagement</span>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="cd-analytics-card">
        <div className="cd-analytics-header">
          <p className="cd-analytics-title">Analytics</p>
          <div className="cd-filter-tabs">
            {filters.map(f => (
              <button key={f} className={`cd-filter-tab ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <span className="cd-total-label">Total contacts- {camp.totalContacts}</span>
        </div>

        {/* Table */}
        <div className="cd-table-wrap">
          <div className="cd-table-head">
            <span>Number</span>
            <span>Time</span>
            <span>Status</span>
            <span>Transfer</span>
            <span>Duration</span>
            <span>Recording</span>
            <span>Call summary</span>
            <span />
          </div>

          {rows.map((row, i) => (
            <div key={i} className="cd-table-row">
              <span className="cd-td-phone">{row.phone}</span>
              <span className="cd-td">{row.time}</span>
              <span className="cd-td">
                <span className={`cd-status-pill ${row.status}`}>
                  {row.status === "ongoing" ? "On going" : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </span>
              <span className="cd-td">{row.transfer !== null ? row.transfer : "–"}</span>
              <span className="cd-td">{row.duration ?? "–"}</span>
              <span className="cd-td">
                {row.hasRecording ? (
                  <button className="cd-play-btn">
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="13" fill="#eff6ff" stroke="#dbeafe" strokeWidth="1.5"/>
                      <polygon points="11,9 21,14 11,19" fill="#6366f1"/>
                    </svg>
                  </button>
                ) : (
                  <span className="cd-dash">–</span>
                )}
              </span>
              <span className="cd-td cd-td-summary">{row.summary ?? "–"}</span>
              <span className="cd-td">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
