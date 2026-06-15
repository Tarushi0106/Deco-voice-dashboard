import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";
import "./CampaignDetail.css";

// ── Static detail data ──────────────────────────────────────────────────
const CAMPAIGN_INFO = {
  1: { name: "Appointment Booking",  id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
  2: { name: "Customer support",     id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
  3: { name: "Lead qualification",   id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
  4: { name: "Lead follow up",       id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
  5: { name: "Lead follow up",       id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
  6: { name: "Appointment Booking",  id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
  7: { name: "Lead follow up",       id: "cdemo-e0fd4..", status: "completed", date: "03/05/26" },
};

const MINI_STATS = [
  { label: "Total calls",      value: 10,    iconName: "phone",    bg: "#eff6ff", color: "#3464ff" },
  { label: "Connected",        value: 5,     iconName: "check",    bg: "#ecfdf5", color: "#10b981" },
  { label: "Not connected",    value: 5,     iconName: "close",    bg: "#fef2f2", color: "#ef4444" },
  { label: "Avg. duration",    value: "01:20", iconName: "clock",  bg: "#fdf4ff", color: "#a855f7" },
  { label: "Total duration",   value: "06:43", iconName: "clock",  bg: "#fff7ed", color: "#f59e0b" },
  { label: "Success rate",     value: "50%", iconName: "chart",    bg: "#ecfdf5", color: "#10b981" },
];

const CALL_ROWS = [
  { phone: "78934741104", start: "07:30 AM", end: "07:31 AM", duration: "01:21", status: "connected" },
  { phone: "9313333331",  start: "07:31 AM", end: "07:32 AM", duration: "01:20", status: "connected" },
  { phone: "7893474104",  start: "07:31 AM", end: "07:33 AM", duration: "01:39", status: "connected" },
  { phone: "7982228898",  start: "07:32 AM", end: "07:32 AM", duration: "00:11", status: "no-answer" },
  { phone: "7893474104",  start: "07:33 AM", end: "07:33 AM", duration: "00:00", status: "busy" },
  { phone: "6204200699",  start: "07:33 AM", end: "07:35 AM", duration: "01:24", status: "connected" },
  { phone: "9026644144",  start: "07:34 AM", end: "07:34 AM", duration: "00:00", status: "no-answer" },
  { phone: "9026644144",  start: "07:34 AM", end: "07:36 AM", duration: "01:40", status: "connected" },
  { phone: "9026644144",  start: "07:35 AM", end: "07:35 AM", duration: "00:00", status: "no-answer" },
  { phone: "9026644144",  start: "07:36 AM", end: "07:36 AM", duration: "00:00", status: "no-answer" },
];

const STATUS_LABEL = {
  "connected":   "Connected",
  "no-answer":   "No answer",
  "busy":        "Busy",
  "ringing":     "Ringing",
  "in-progress": "In progress",
};

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const camp = CAMPAIGN_INFO[id] || CAMPAIGN_INFO[1];

  return (
    <Layout searchPlaceholder="campaign">
      {/* Back */}
      <div className="cd-back-row">
        <button className="cd-back-btn" onClick={() => navigate("/campaign")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to campaigns
        </button>
      </div>

      {/* Campaign header card */}
      <div className="cd-header-card">
        <div className="cd-header-left">
          <div className="cd-campaign-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4z" />
            </svg>
          </div>
          <div>
            <p className="cd-camp-name">{camp.name}</p>
            <p className="cd-camp-id">{camp.id}</p>
          </div>
        </div>
        <div className="cd-header-right">
          <span className={`cd-status-badge ${camp.status}`}>{camp.status}</span>
          <span className="cd-date-label">{camp.date}</span>
        </div>
      </div>

      {/* Mini stats row */}
      <div className="cd-mini-stats">
        {MINI_STATS.map((s) => (
          <div key={s.label} className="cd-mini-card">
            <div className="cd-mini-icon-row">
              <div className="cd-mini-icon" style={{ background: s.bg }}>
                <Icon name={s.iconName} size={17} color={s.color} />
              </div>
              <p className="cd-mini-label">{s.label}</p>
            </div>
            <span className="cd-mini-value">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Calls table */}
      <div className="cd-table-card">
        <p className="cd-table-title">Call analytics</p>
        <div className="cd-table-head">
          <span className="cd-th">Phone number</span>
          <span className="cd-th">Call start</span>
          <span className="cd-th">Call end</span>
          <span className="cd-th">Duration</span>
          <span className="cd-th">Status</span>
          <span className="cd-th">Recording</span>
          <span className="cd-th" />
        </div>

        {CALL_ROWS.map((row, i) => (
          <div key={i} className="cd-table-row">
            <span className="cd-td cd-td-name">{row.phone}</span>
            <span className="cd-td">{row.start}</span>
            <span className="cd-td">{row.end}</span>
            <span className="cd-td">{row.duration}</span>
            <span className="cd-td">
              <span className={`cd-call-status ${row.status}`}>
                {STATUS_LABEL[row.status] || row.status}
              </span>
            </span>
            <span className="cd-td">
              {row.status === "connected" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="#3464ff" stroke="none" />
                </svg>
              ) : (
                <span style={{ color: "#d1d5db" }}>—</span>
              )}
            </span>
            <span className="cd-td">
              <button className="cd-view-btn">View details</button>
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
}
