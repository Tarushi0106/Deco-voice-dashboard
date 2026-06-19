import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";
import "./Dashboard.css";

// ── Static data ────────────────────────────────────────────────────────
const WEEK_LINE = [
  { label: "Mon", v: 1500 },
  { label: "Tue", v: 2000 },
  { label: "Wed", v: 2100 },
  { label: "Thu", v: 2500 },
  { label: "Fri", v: 2300 },
  { label: "Sat", v: 1700 },
  { label: "Sun", v: 1950 },
];

const CALL_BARS = [
  { label: "04/05", v: 2200 },
  { label: "05/05", v: 1500 },
  { label: "06/05", v: 2000 },
  { label: "07/05", v: 2700 },
  { label: "08/05", v: 2100 },
  { label: "09/05", v: 480 },
  { label: "10/05", v: 1200 },
];

const RECENT = [
  { bg: "#fff7ed", text: 'Campaign "summer offer" launched',  time: "2 mins ago",  svg: "campaign"  },
  { bg: "#f5f3ff", text: 'New script "Product demo" created', time: "15 mins ago", svg: "script"    },
  { bg: "#eff6ff", text: 'Knowledge base "FAQs" updated',     time: "1 hour ago",  svg: "knowledge" },
  { bg: "#ecfdf5", text: "Call forwarded to +1 (555) 123-4567", time: "2 hours ago", svg: "phone"  },
  { bg: "#f9fafb", text: 'Provider "Fastel" connected',       time: "3 hours ago", svg: "provider"  },
];

const USAGE = [
  { bg: "#eff6ff", color: "#3464ff", label: "Call connected",       value: "12,000",   svg: "phone"      },
  { bg: "#fef2f2", color: "#ef4444", label: "Call failed",           value: "3,600",    svg: "phone-off"  },
  { bg: "#ecfdf5", color: "#10b981", label: "Transferred calls",     value: "2,000",    svg: "transfer"   },
  { bg: "#fff7ed", color: "#f59e0b", label: "Average call duration", value: "2m 40sec", svg: "clock"      },
];

// ── Charts ──────────────────────────────────────────────────────────────
function CallVolumeChart() {
  const W = 560, H = 200;
  const pl = 44, pr = 16, pt = 14, pb = 34;
  const cW = W - pl - pr, cH = H - pt - pb;
  const yMax = 3000;
  const x = (i) => pl + (i / (WEEK_LINE.length - 1)) * cW;
  const y = (v) => pt + (1 - v / yMax) * cH;
  const pts = WEEK_LINE.map((d, i) => `${x(i)},${y(d.v)}`).join(" ");
  const area = `${x(0)},${H - pb} ${pts} ${x(WEEK_LINE.length - 1)},${H - pb}`;
  const yTicks = [0, 500, 1000, 1500, 2000, 2500];
  const fmt = (v) => v === 0 ? "0" : v >= 1000 ? `${v / 1000}K` : `${v}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <defs>
        <linearGradient id="cvGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3464ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3464ff" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={pl} y1={y(v)} x2={W - pr} y2={y(v)} stroke="#f0f0f0" strokeWidth="1" />
          <text x={pl - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{fmt(v)}</text>
        </g>
      ))}
      <polygon points={area} fill="url(#cvGrad)" />
      <polyline points={pts} fill="none" stroke="#3464ff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {WEEK_LINE.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.v)} r="4" fill="#fff" stroke="#3464ff" strokeWidth="2" />
          <text x={x(i)} y={H - pb + 18} textAnchor="middle" fontSize="11" fill="#9ca3af">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

function CallBarsChart() {
  const W = 360, H = 210;
  const pl = 36, pr = 8, pt = 14, pb = 34;
  const cW = W - pl - pr, cH = H - pt - pb;
  const yMax = 3000;
  const gap = cW / CALL_BARS.length;
  const bw = gap * 0.52;
  const x = (i) => pl + i * gap + (gap - bw) / 2;
  const y = (v) => pt + (1 - v / yMax) * cH;
  const bh = (v) => (v / yMax) * cH;
  const yTicks = [0, 500, 1000, 1500, 2000, 2500];
  const fmt = (v) => v === 0 ? "0" : v >= 1000 ? `${v / 1000}K` : `${v}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={pl} y1={y(v)} x2={W - pr} y2={y(v)} stroke="#f0f0f0" strokeWidth="1" />
          <text x={pl - 4} y={y(v) + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{fmt(v)}</text>
        </g>
      ))}
      {CALL_BARS.map((d, i) => (
        <g key={i}>
          <rect x={x(i)} y={y(d.v)} width={bw} height={bh(d.v)} rx="6" fill="#b8caff" />
          <text x={x(i) + bw / 2} y={H - pb + 16} textAnchor="middle" fontSize="9" fill="#9ca3af">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

function MiniGauge({ pct }) {
  const r = 34;
  const circ = Math.PI * r;
  const fill = (pct / 100) * circ;
  return (
    <svg width="100" height="56" viewBox="0 0 100 56">
      <path d="M 16,50 A34,34 0 0 1 84,50" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
      <path d="M 16,50 A34,34 0 0 1 84,50" fill="none" stroke="#3464ff" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${fill} ${circ}`} />
    </svg>
  );
}

// ── Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <Layout>
      <div className="dv-page-title">
        <h2>Overview</h2>
        <p>Monitor call activity, campaign performance, and AI agent insights.</p>
      </div>

      {/* ── Stat cards ── */}
      <div className="dv-stats-row">
        <div className="dv-stat-card">
          <div className="dv-stat-icon" style={{ background: "#eff6ff" }}>
            <Icon name="phone" size={20} color="#3464ff" />
          </div>
          <span className="dv-stat-label">Total calls handled</span>
          <span className="dv-stat-value">300</span>
        </div>

        <div className="dv-stat-card">
          <div className="dv-stat-icon" style={{ background: "#fff7ed" }}>
            <Icon name="campaign" size={20} color="#f59e0b" />
          </div>
          <span className="dv-stat-label">Active Campaigns</span>
          <span className="dv-stat-value">130</span>
        </div>

        <div className="dv-stat-card">
          <div className="dv-stat-icon" style={{ background: "#fdf4ff" }}>
            <Icon name="robot" size={20} color="#a855f7" />
          </div>
          <span className="dv-stat-label">AI agent performance</span>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>Excellent</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>High positive interaction</div>
          </div>
        </div>

        <div className="dv-stat-card">
          <div className="dv-stat-icon" style={{ background: "#ecfdf5" }}>
            <Icon name="check" size={20} color="#10b981" />
          </div>
          <span className="dv-stat-label">Success rate</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="dv-stat-value">25%</span>
            <MiniGauge pct={25} />
          </div>
        </div>
      </div>

      {/* ── Row 2: Line chart + Usage summary ── */}
      <div className="dv-row2">
        <div className="dv-card">
          <div className="dv-card-header">
            <span className="dv-card-title">Call volume over time</span>
            <button className="dv-dropdown-btn">This Week ▾</button>
          </div>
          <CallVolumeChart />
        </div>

        <div className="dv-card">
          <div className="dv-card-header">
            <span className="dv-card-title">Usage summary</span>
            <button className="dv-dropdown-btn">This month ▾</button>
          </div>
          <div className="dv-usage-list">
            {USAGE.map((u, i) => (
              <div key={i} className="dv-usage-row">
                <div className="dv-usage-left">
                  <div className="dv-usage-icon" style={{ background: u.bg }}>
                    <Icon name={u.svg} size={18} color={u.color} />
                  </div>
                  <span className="dv-usage-label">{u.label}</span>
                </div>
                <span className="dv-usage-value">{u.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Recent activities + Bar chart ── */}
      <div className="dv-row3">
        <div className="dv-card">
          <div className="dv-card-header">
            <span className="dv-card-title">Recent activities</span>
            <button className="dv-link-btn">View all</button>
          </div>
          {RECENT.map((a, i) => (
            <div key={i} className="dv-activity-row">
              <div className="dv-activity-icon" style={{ background: a.bg }}>
                <Icon name={a.svg} size={16} color="#6b7280" />
              </div>
              <span className="dv-activity-text">{a.text}</span>
              <span className="dv-activity-time">{a.time}</span>
            </div>
          ))}
        </div>

        <div className="dv-card">
          <div className="dv-card-header">
            <span className="dv-card-title">Call over time</span>
            <button className="dv-dropdown-btn">This week ▾</button>
          </div>
          <CallBarsChart />
        </div>
      </div>
    </Layout>
  );
}
