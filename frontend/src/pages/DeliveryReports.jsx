import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import "./DeliveryReports.css";

const REPORTS = [
  { id: 1, campaign: "Appointment  Booking", campaignId: "cdemo-e0fd4..", status: "completed", totalCalls: 10, connected: 10, date: "18 June, 26" },
  { id: 2, campaign: "Customer support",     campaignId: "cdemo-e0fd4..", status: "completed", totalCalls: 6,  connected: 6,  date: "18 June, 26" },
];

const RANGES  = ["All", "This week", "This month", "Custom range"];
const FORMATS = [
  { key: "CSV",          icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { key: "PDF",          icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { key: "Email report", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
];

function ConnectedBadge({ connected, total }) {
  const r = 15, cx = 18, cy = 18;
  const circ = 2 * Math.PI * r;
  const dash = (connected / total) * circ;
  return (
    <div className="dr-badge-wrap">
      <svg width="42" height="42" viewBox="0 0 36 36">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e0e7ff" strokeWidth="3.5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3464ff" strokeWidth="3.5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} />
      </svg>
      <span className="dr-badge-text">{connected}/{total}</span>
    </div>
  );
}

export default function DeliveryReports() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [range, setRange] = useState("This week");
  const [format, setFormat] = useState("PDF");
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [copied, setCopied] = useState(null);
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Layout searchPlaceholder="Knowledge Base">
      {/* Page header */}
      <div className="dr-topbar">
        <div>
          <h2 className="dr-title">Delivery reports</h2>
          <p className="dr-subtitle">View and download detailed reports of your campaigns</p>
        </div>

        {/* Download report dropdown */}
        <div className="dr-dropdown-wrap" ref={dropRef}>
          <button className="dr-download-trigger" onClick={() => setShowDropdown(v => !v)}>
            Download report
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {showDropdown && (
            <div className="dr-dropdown">
              <p className="dr-drop-section">Select range</p>
              {RANGES.map(r => (
                <label key={r} className={`dr-drop-option${range === r ? " selected" : ""}`} onClick={() => setRange(r)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={range === r ? "#3464ff" : "#9ca3af"} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {r}
                </label>
              ))}

              <p className="dr-drop-section" style={{ marginTop: 14 }}>Select format</p>
              {FORMATS.map(f => (
                <label key={f.key} className={`dr-drop-option${format === f.key ? " selected" : ""}`} onClick={() => setFormat(f.key)}>
                  <span className="dr-drop-fmt-icon">{f.icon}</span>
                  {f.key}
                </label>
              ))}

              <button className="dr-drop-download-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="dr-table-card">
        <div className="dr-table-head">
          <span>Campaign name</span>
          <span>Campaign ID</span>
          <span>Status</span>
          <span>Total calls</span>
          <span>Connected</span>
          <span>Date</span>
          <span>Action</span>
        </div>

        <div className="dr-table-body">
          {REPORTS.map((row) => (
            <div key={row.id} className="dr-table-row">
              <span className="dr-td dr-td-name">{row.campaign}</span>

              <span className="dr-td dr-td-id">
                {row.campaignId}
                <button className="dr-copy-btn" onClick={() => handleCopy(row.id, row.campaignId)}>
                  {copied === row.id
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  }
                </button>
              </span>

              <span className="dr-td">
                <span className={`dr-status-pill ${row.status}`}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </span>

              <span className="dr-td">{row.totalCalls}</span>

              <span className="dr-td">
                <ConnectedBadge connected={row.connected} total={row.totalCalls} />
              </span>

              <span className="dr-td">{row.date}</span>

              <span className="dr-td dr-td-action">
                <button className="dr-view-btn" onClick={() => navigate(`/campaign/${row.id}`, { state: { from: "reports" } })}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View details
                </button>
                <button className="dr-dl-btn" title="Download">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
