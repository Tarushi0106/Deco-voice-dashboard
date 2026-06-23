import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import "./ForwardedCalls.css";

const ROWS = [
  { id: 0, campaign: "Appointment  Booking", contact: "+91 7805723XXXX", forwardedTo: "Human agent", forwardedOn: "19 June  5:16 PM", status: "completed" },
  { id: 1, campaign: "Customer support",     contact: "+91 7805723XXXX", forwardedTo: "Human agent", forwardedOn: "19 June  5:40 PM", status: "completed" },
];

const STATUS_FILTER_MAP = { Completed: "completed", Running: "running", Queued: "queued" };

function SemiCircleGauge({ pct = 0.9 }) {
  const r = 38, cx = 50, cy = 50;
  const circ = Math.PI * r;
  const dash = pct * circ;
  return (
    <svg width="90" height="52" viewBox="0 0 100 56">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#e0e7ff" strokeWidth="8" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#3464ff" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`} />
    </svg>
  );
}

export default function ForwardedCalls() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All status");
  const filters = ["All status", "Completed", "Running", "Queued"];

  const rows = activeFilter === "All status"
    ? ROWS
    : ROWS.filter(r => r.status === STATUS_FILTER_MAP[activeFilter]);

  return (
    <Layout searchPlaceholder="Knowledge Base">
      {/* Page header */}
      <div className="fc-page-header">
        <h2 className="fc-title">Forwarded calls</h2>
        <p className="fc-subtitle">Monitor and manage calls transferred calls</p>
      </div>

      {/* Stat cards */}
      <div className="fc-stats-row">
        {/* Card 1: Total forwarded calls */}
        <div className="fc-stat-card">
          <div className="fc-stat-icon fc-icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              <path d="M21 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <div className="fc-stat-info">
            <span className="fc-stat-label">Total forwarded calls</span>
            <span className="fc-stat-value">800</span>
          </div>
        </div>

        {/* Card 2: Avg forwarding time */}
        <div className="fc-stat-card">
          <div className="fc-stat-icon fc-icon-orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div className="fc-stat-info">
            <span className="fc-stat-label">Avg. forwarding time</span>
            <span className="fc-stat-value">03:45</span>
          </div>
        </div>

        {/* Card 3: Successful forwards */}
        <div className="fc-stat-card fc-stat-card-gauge">
          <div className="fc-stat-icon fc-icon-red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="8 12 11 15 16 9"/>
            </svg>
          </div>
          <div className="fc-stat-info">
            <span className="fc-stat-label">Successful Forwards</span>
            <span className="fc-stat-value">90%</span>
          </div>
          <div className="fc-gauge-wrap">
            <SemiCircleGauge pct={0.9} />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="fc-filter-row">
        {filters.map(f => (
          <button key={f} className={`fc-filter-tab ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="fc-table-card">
        <div className="fc-table-head">
          <span>Campaign name</span>
          <span>Contact no.</span>
          <span>Forwarded to</span>
          <span>Forwarded on</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <div className="fc-table-body">
          {rows.length === 0 ? (
            <p className="fc-empty">No records found.</p>
          ) : rows.map((row) => (
            <div key={row.id} className="fc-table-row">
              <span className="fc-td fc-td-name">{row.campaign}</span>
              <span className="fc-td">{row.contact}</span>
              <span className="fc-td">{row.forwardedTo}</span>
              <span className="fc-td">{row.forwardedOn}</span>
              <span className="fc-td">
                <span className={`fc-status-pill ${row.status}`}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </span>
              <span className="fc-td">
                <button className="fc-view-btn" onClick={() => navigate(`/forwarding/${row.id}`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View details
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
