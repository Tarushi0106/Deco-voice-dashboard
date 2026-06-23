import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import "./DeliveryReports.css";

const REPORTS = [
  { id: 1, campaign: "Appointment  Booking", campaignId: "cdemo-e0fd4..", status: "completed", totalCalls: 10, connected: 10, date: "18 June, 26" },
  { id: 2, campaign: "Customer support",     campaignId: "cdemo-e0fd4..", status: "completed", totalCalls: 6,  connected: 6,  date: "18 June, 26" },
];

/* ── Calendar helpers ─────────────────────────────────── */
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS  = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayMon(y, m) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
function sameDay(a, b) { return a && b && a.toDateString() === b.toDateString(); }
function inRange(d, s, e) {
  if (!d || !s || !e) return false;
  const t = d.getTime();
  return t >= Math.min(s.getTime(), e.getTime()) && t <= Math.max(s.getTime(), e.getTime());
}
function fmtDate(d) {
  if (!d) return "";
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function CalendarPicker({ startDate, endDate, onApply }) {
  const init = startDate || new Date(2026, 5, 20);
  const [vy, setVy] = useState(init.getFullYear());
  const [vm, setVm] = useState(init.getMonth());
  const [s, setS] = useState(startDate);
  const [e, setE] = useState(endDate);
  const [step, setStep] = useState("start");

  const prev = () => { if (vm === 0) { setVy(y => y-1); setVm(11); } else setVm(m => m-1); };
  const next = () => { if (vm === 11) { setVy(y => y+1); setVm(0); } else setVm(m => m+1); };

  const clickDay = (day) => {
    const clicked = new Date(vy, vm, day);
    if (step === "start") { setS(clicked); setE(null); setStep("end"); }
    else {
      if (clicked < s) { setS(clicked); setE(s); } else setE(clicked);
      setStep("start");
    }
  };

  const days = getDaysInMonth(vy, vm);
  const pad  = getFirstDayMon(vy, vm);
  const cells = [...Array(pad).fill(null), ...Array.from({length: days}, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="dr-cal">
      <div className="dr-cal-head">
        <button className="dr-cal-nav" onClick={prev}>&#8249;</button>
        <span className="dr-cal-month">{MONTH_NAMES[vm]} {vy} &#8964;</span>
        <button className="dr-cal-nav" onClick={next}>&#8250;</button>
      </div>

      <div className="dr-cal-grid">
        {DAY_LABELS.map(d => <span key={d} className="dr-cal-label">{d}</span>)}
        {cells.map((day, i) => {
          if (!day) return <span key={i} className="dr-cal-empty" />;
          const date   = new Date(vy, vm, day);
          const isSel  = sameDay(date, s) || sameDay(date, e);
          const isRng  = !isSel && inRange(date, s, e);
          return (
            <button
              key={i}
              className={`dr-cal-day${isSel ? " sel" : ""}${isRng ? " rng" : ""}`}
              onClick={() => clickDay(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="dr-cal-foot">
        <button className="dr-cal-apply" disabled={!s} onClick={() => onApply(s, e || s)}>
          Apply
        </button>
      </div>
    </div>
  );
}

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

  const [startDate, setStartDate] = useState(new Date(2026, 5, 20));
  const [endDate,   setEndDate]   = useState(new Date(2026, 5, 24));
  const [showCal,   setShowCal]   = useState(false);
  const [showFmt,   setShowFmt]   = useState(false);
  const [format,    setFormat]    = useState("PDF");

  const calRef = useRef(null);
  const fmtRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) setShowCal(false);
      if (fmtRef.current && !fmtRef.current.contains(e.target)) setShowFmt(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const [copied, setCopied] = useState(null);
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleApply = (s, e) => {
    setStartDate(s);
    setEndDate(e);
    setShowCal(false);
  };

  const dateLabel = `${fmtDate(startDate)} - ${fmtDate(endDate)}`;

  return (
    <Layout searchPlaceholder="Knowledge Base">
      {/* Page header */}
      <div className="dr-topbar">
        <div>
          <h2 className="dr-title">Delivery reports</h2>
          <p className="dr-subtitle">View and download detailed reports of your campaigns</p>
        </div>

        <div className="dr-controls">
          {/* Date range picker */}
          <div className="dr-date-wrap" ref={calRef}>
            <button className="dr-date-btn" onClick={() => { setShowCal(v => !v); setShowFmt(false); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {dateLabel}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {showCal && (
              <CalendarPicker startDate={startDate} endDate={endDate} onApply={handleApply} />
            )}
          </div>

          {/* Download report */}
          <div className="dr-dl-wrap" ref={fmtRef}>
            <button className="dr-download-trigger" onClick={() => { setShowFmt(v => !v); setShowCal(false); }}>
              Download report
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            {showFmt && (
              <div className="dr-fmt-drop">
                <p className="dr-drop-section">Select format</p>
                <label className={`dr-drop-option${format === "CSV" ? " selected" : ""}`} onClick={() => setFormat("CSV")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  CSV
                </label>
                <label className={`dr-drop-option${format === "PDF" ? " selected" : ""}`} onClick={() => setFormat("PDF")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  PDF
                </label>
              </div>
            )}
          </div>
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
            <div key={row.id} className="dr-table-row" onClick={() => navigate(`/campaign/${row.id}`, { state: { from: "reports" } })} style={{ cursor: "pointer" }}>
              <span className="dr-td dr-td-name">{row.campaign}</span>

              <span className="dr-td dr-td-id">
                {row.campaignId}
                <button className="dr-copy-btn" onClick={(e) => { e.stopPropagation(); handleCopy(row.id, row.campaignId); }}>
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
                <button className="dr-view-btn" onClick={(e) => { e.stopPropagation(); navigate(`/campaign/${row.id}`, { state: { from: "reports" } }); }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View details
                </button>
                <button className="dr-dl-btn" title="Download" onClick={(e) => e.stopPropagation()}>
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
