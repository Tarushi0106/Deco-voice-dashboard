import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";
import "./CampaignManagement.css";

// ── Static data ─────────────────────────────────────────────────────────
const CAMPAIGNS = [
  { id: 1, name: "Appointment Booking",  campId: "cdemo-e0fd4..", status: "completed", totalCalls: 10, connected: 5,  total: 10, date: "03/05/26" },
  { id: 2, name: "Customer support",     campId: "cdemo-e0fd4..", status: "completed", totalCalls: 1,  connected: 1,  total: 1,  date: "03/05/26" },
  { id: 3, name: "Lead qualification",   campId: "cdemo-e0fd4..", status: "completed", totalCalls: 2,  connected: 1,  total: 2,  date: "03/05/26" },
  { id: 4, name: "Lead follow up",       campId: "cdemo-e0fd4..", status: "completed", totalCalls: 5,  connected: 5,  total: 5,  date: "03/05/26" },
  { id: 5, name: "Lead follow up",       campId: "cdemo-e0fd4..", status: "completed", totalCalls: 10, connected: 7,  total: 10, date: "03/05/26" },
  { id: 6, name: "Appointment Booking",  campId: "cdemo-e0fd4..", status: "completed", totalCalls: 1,  connected: 1,  total: 1,  date: "03/05/26" },
  { id: 7, name: "Lead follow up",       campId: "cdemo-e0fd4..", status: "completed", totalCalls: 5,  connected: 5,  total: 5,  date: "03/05/26" },
];

const SCRIPTS    = ["Customer Support", "Appointment Booking", "Lead Qualification", "Lead Follow-up", "Sales voice"];
const LANGUAGES  = ["English", "Hindi"];

const SCRIPT_PREVIEWS = {
  "Customer Support":    "Opening line- Hey! Welcome, how can I help you?",
  "Appointment Booking": "Opening line- Hey! Welcome student",
  "Lead Qualification":  "Opening line- Hi, are you looking for more info?",
  "Lead Follow-up":      "Opening line- Hi, following up on your inquiry.",
  "Sales voice":         "Opening line- Hello, I am calling from our sales team.",
};

// ── Helpers ─────────────────────────────────────────────────────────────
function CircleProgress({ connected, total }) {
  const r = 14, circ = 2 * Math.PI * r;
  const dash = total > 0 ? (connected / total) * circ : 0;
  return (
    <div style={{ position: "relative", width: 38, height: 38, flexShrink: 0 }}>
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3" />
        <circle cx="19" cy="19" r={r} fill="none" stroke="#3464ff" strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 19 19)" />
      </svg>
      <span style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 700, color: "#374151",
      }}>
        {connected}/{total}
      </span>
    </div>
  );
}

function MiniGauge({ pct }) {
  const r = 28, circ = Math.PI * r, fill = (pct / 100) * circ;
  return (
    <svg width="80" height="48" viewBox="0 0 80 48">
      <path d="M12,44 A28,28 0 0 1 68,44" fill="none" stroke="#e5e7eb" strokeWidth="7" strokeLinecap="round" />
      <path d="M12,44 A28,28 0 0 1 68,44" fill="none" stroke="#3464ff" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${fill} ${circ}`} />
    </svg>
  );
}

// ── Custom Dropdown ──────────────────────────────────────────────────────
function Dropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="cm-dropdown-wrap">
      <button type="button" className="cm-dropdown-trigger" onClick={() => setOpen(!open)}>
        <span style={{ color: value ? "#111827" : "#9ca3af" }}>{value || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="cm-dropdown-menu">
          {options.map((opt) => (
            <div key={opt} className="cm-dropdown-item"
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Create Campaign Modal (3 steps) ─────────────────────────────────────
function CreateCampaignModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", script: "", phones: "" });

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const step1Valid = form.name.trim().length > 0 && form.script;
  const step2Valid = form.phones.trim().split("\n").filter(Boolean).length > 0;
  const canNext = step === 1 ? step1Valid : step === 2 ? step2Valid : true;

  return (
    <div className="cm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cm-modal">
        {/* Header */}
        <div className="cm-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="cm-modal-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4z" />
              </svg>
            </div>
            <div>
              <p className="cm-modal-title">Campaign</p>
              <p className="cm-modal-sub">Let's personalize your AI calling experience. Please share your details to configure your AI demo campaign script</p>
            </div>
          </div>
          <button className="cm-close-btn" onClick={onClose}>
            <Icon name="close" size={20} color="#6b7280" />
          </button>
        </div>

        {/* Progress */}
        <div className="cm-progress">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`cm-progress-bar${step >= s ? " active" : ""}`} />
          ))}
        </div>

        {/* Step body */}
        <div className="cm-modal-body">
          {step === 1 && (
            <>
              <div className="cm-field">
                <label>
                  Campaign name
                  <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 4 }}>({form.name.length}/20)</span>
                  <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input className="cm-input" placeholder="Enter your campaign name"
                  maxLength={20} value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>

              <div className="cm-field">
                <label>Script<span style={{ color: "#ef4444" }}>*</span></label>
                <Dropdown placeholder="Select script" options={SCRIPTS} value={form.script} onChange={set("script")} />
                {form.script && (
                  <div className="cm-script-preview">{SCRIPT_PREVIEWS[form.script]}</div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <div className="cm-field">
              <label>
                Phone numbers
                <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 4 }}>(1 per line)</span>
                <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea className="cm-textarea"
                placeholder={"7893474104\n91 7893474104\n91 7893474104"}
                value={form.phones}
                onChange={(e) => setForm((p) => ({ ...p, phones: e.target.value }))}
                rows={6} />
              <p className="cm-hint">
                Plain 10-digit numbers only — no +91 or country code (e.g. 9876543210)-{" "}
                <span style={{ color: "#3464ff" }}>maximum 10 numbers.</span>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="cm-review">
              {[
                ["Campaign name", form.name],
                ["Script",        form.script   || "—"],
                ["Phone numbers", `${form.phones.split("\n").filter(Boolean).length} number(s)`],
              ].map(([label, val]) => (
                <div key={label} className="cm-review-row">
                  <span className="cm-review-label">{label}</span>
                  <span className="cm-review-val">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cm-modal-footer">
          {step > 1 && <button className="cm-back-btn" onClick={() => setStep((s) => s - 1)}>Back</button>}
          <button className="cm-next-btn" disabled={!canNext}
            onClick={() => { if (step < 3) setStep((s) => s + 1); else onClose(); }}>
            {step === 3 ? "Launch Campaign" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────
export default function CampaignManagement() {
  const navigate    = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const TABS = [
    { key: "all", label: "All status" },
    { key: "completed", label: "Completed" },
    { key: "running",   label: "Running" },
    { key: "queued",    label: "Queued" },
  ];

  const rows = activeTab === "all" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.status === activeTab);

  const copyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(id);
  };

  return (
    <Layout searchPlaceholder="campaign">
      {/* Header */}
      <div className="cm-page-header">
        <div className="dv-page-title" style={{ margin: 0 }}>
          <h2>Campaign overview</h2>
          <p>Create and manage AI call campaigns</p>
        </div>
        <div className="cm-header-btns">
          <button className="cm-schedule-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Schedule campaign
          </button>
          <button className="cm-create-btn" onClick={() => setShowModal(true)}>
            + Create demo campaign
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="cm-stats-row">
        <div className="cm-stat-card">
          <div className="cm-stat-header">
            <div className="cm-stat-icon" style={{ background: "#eff6ff" }}>
              <Icon name="phone" size={20} color="#3464ff" />
            </div>
            <span className="cm-stat-label">Total live calls</span>
          </div>
          <span className="cm-stat-value">500</span>
        </div>

        <div className="cm-stat-card">
          <div className="cm-stat-header">
            <div className="cm-stat-icon" style={{ background: "#fff7ed" }}>
              <Icon name="campaign" size={20} color="#f59e0b" />
            </div>
            <span className="cm-stat-label">Active Campaigns</span>
          </div>
          <span className="cm-stat-value">130</span>
        </div>

        <div className="cm-stat-card">
          <div className="cm-stat-header">
            <div className="cm-stat-icon" style={{ background: "#fdf4ff" }}>
              <Icon name="clock" size={20} color="#a855f7" />
            </div>
            <span className="cm-stat-label">Avg. duration</span>
          </div>
          <span className="cm-stat-value">03:45</span>
        </div>

        <div className="cm-stat-card">
          <div className="cm-stat-header">
            <div className="cm-stat-icon" style={{ background: "#ecfdf5" }}>
              <Icon name="check" size={20} color="#10b981" />
            </div>
            <span className="cm-stat-label">Success rate</span>
          </div>
          <div className="cm-stat-value-row">
            <span className="cm-stat-value">90%</span>
            <MiniGauge pct={90} />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="cm-tabs">
        {TABS.map((t) => (
          <button key={t.key}
            className={`cm-tab${activeTab === t.key ? " active" : ""}`}
            onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="cm-table-card">
        <div className="cm-table-head">
          <span className="cm-th">Campaign name</span>
          <span className="cm-th">Campaign ID</span>
          <span className="cm-th">Status</span>
          <span className="cm-th">Total calls</span>
          <span className="cm-th">Connected</span>
          <span className="cm-th">Created on</span>
          <span className="cm-th" />
        </div>

        {rows.map((row) => (
          <div key={row.id} className="cm-table-row"
            onClick={() => navigate(`/campaign/${row.id}`)}>
            <span className="cm-td cm-td-name">{row.name}</span>
            <span className="cm-td">
              <span className="cm-camp-id">
                {row.campId}
                <button className="cm-copy-btn" onClick={(e) => copyId(e, row.campId)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              </span>
            </span>
            <span className="cm-td">
              <span className={`cm-status-badge ${row.status}`}>{row.status}</span>
            </span>
            <span className="cm-td">{row.totalCalls}</span>
            <span className="cm-td">
              <CircleProgress connected={row.connected} total={row.total} />
            </span>
            <span className="cm-td">{row.date}</span>
            <span className="cm-chevron">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      {showModal && <CreateCampaignModal onClose={() => setShowModal(false)} />}
    </Layout>
  );
}
