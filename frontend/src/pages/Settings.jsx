import { useState } from "react";
import Layout from "../components/Layout.jsx";
import "./Settings.css";

const NAV_ICONS = {
  profile: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  voice: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
      <path d="M19 10v2a7 7 0 01-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  team: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  help: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

const SECTIONS = [
  { key: "profile", label: "Profile" },
  { key: "voice",   label: "Voice agent preferences" },
  { key: "team",    label: "Team management" },
  { key: "help",    label: "Help and support" },
];

/* ── Profile ─────────────────────────────────────────── */
function ProfileSection() {
  const [form, setForm] = useState({
    fullName: "Akansha Gupta",
    email: "Akansha123@gmail.com",
    username: "demo@decovoice.in",
    password: "e5E9I+aoIPZ;8e1F3",
  });
  const [showPass, setShowPass] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="st-section">
      <h3 className="st-section-title">Profile</h3>
      <p className="st-section-sub">Update your information</p>
      <div className="st-form-grid">
        <div className="st-field">
          <label className="st-label">Full name</label>
          <input className="st-input" value={form.fullName} onChange={set("fullName")} />
        </div>
        <div className="st-field">
          <label className="st-label">Email Address</label>
          <input className="st-input" value={form.email} onChange={set("email")} />
        </div>
        <div className="st-field">
          <label className="st-label">Username</label>
          <input className="st-input" value={form.username} onChange={set("username")} />
        </div>
        <div className="st-field">
          <label className="st-label">Password</label>
          <div className="st-pass-wrap">
            <input
              className="st-input"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
            />
            <button className="st-pass-eye" type="button" onClick={() => setShowPass(v => !v)}>
              {showPass ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Voice agent preferences ─────────────────────────── */
function VoiceSection() {
  const [defaultLang,   setDefaultLang]   = useState("English");
  const [secondaryLang, setSecondaryLang] = useState("Hindi");
  const [voice,         setVoice]         = useState("male");
  const [useDefault,    setUseDefault]    = useState(false);

  const LANGS = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi"];

  return (
    <div className="st-section">
      <h3 className="st-section-title">Voice agent preferences</h3>
      <p className="st-section-sub">Update your information</p>

      <div className="st-form-grid">
        <div className="st-field">
          <label className="st-label">Default language</label>
          <div className="st-select-wrap">
            <select className="st-select" value={defaultLang} onChange={e => setDefaultLang(e.target.value)}>
              {LANGS.map(l => <option key={l}>{l}</option>)}
            </select>
            <svg className="st-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div className="st-field">
          <label className="st-label">Secondary language</label>
          <div className="st-select-wrap">
            <select className="st-select" value={secondaryLang} onChange={e => setSecondaryLang(e.target.value)}>
              {LANGS.map(l => <option key={l}>{l}</option>)}
            </select>
            <svg className="st-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </div>

      <div className="st-field st-voice-field">
        <label className="st-label">Default voice</label>
        <div className="st-voice-btns">
          <button
            type="button"
            className={`st-voice-btn male${voice === "male" ? " active" : ""}`}
            onClick={() => setVoice("male")}
          >
            <span className="st-voice-av male-av">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </span>
            <span className="st-voice-name">Male</span>
            <span className="st-voice-play">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
          </button>

          <button
            type="button"
            className={`st-voice-btn female${voice === "female" ? " active" : ""}`}
            onClick={() => setVoice("female")}
          >
            <span className="st-voice-av female-av">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </span>
            <span className="st-voice-name">Female</span>
            <span className="st-voice-play">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
          </button>
        </div>
      </div>

      <div className="st-toggle-row">
        <span className="st-label">Use default settings for new script</span>
        <button
          type="button"
          className={`st-toggle${useDefault ? " on" : ""}`}
          onClick={() => setUseDefault(v => !v)}
        >
          <span className="st-toggle-thumb" />
        </button>
      </div>
    </div>
  );
}

/* ── Team management ─────────────────────────────────── */
function TeamSection() {
  const [email,    setEmail]    = useState("Akansha123@gmail.com");
  const [role,     setRole]     = useState("Viewer");
  const [showDrop, setShowDrop] = useState(false);

  const ROLES = ["Admin", "Manager", "Viewer"];
  const ACCESS = {
    Admin:   ["View Dashboard", "View Reports", "Manage Team", "Manage Campaigns"],
    Manager: ["View Dashboard", "View Reports", "Manage Campaigns"],
    Viewer:  ["View Dashboard", "View Reports"],
  };

  return (
    <div className="st-section">
      <h3 className="st-section-title">Team management</h3>
      <p className="st-section-sub">Invite users</p>

      <div className="st-form-grid">
        <div className="st-field">
          <label className="st-label">Email address</label>
          <input
            className="st-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email address..."
          />
        </div>
        <div className="st-field">
          <label className="st-label">Role</label>
          <div className="st-select-wrap" style={{ position: "relative" }}>
            <button
              type="button"
              className="st-role-btn"
              onClick={() => setShowDrop(v => !v)}
            >
              {role}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {showDrop && (
              <div className="st-role-drop">
                {ROLES.map(r => (
                  <button
                    key={r}
                    type="button"
                    className={`st-role-opt${role === r ? " sel" : ""}`}
                    onClick={() => { setRole(r); setShowDrop(false); }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="st-access">
        <label className="st-label">Access level</label>
        <div className="st-access-list">
          {ACCESS[role].map(a => (
            <div key={a} className="st-access-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {a}
            </div>
          ))}
        </div>
      </div>

      <div className="st-invite-row">
        <button type="button" className="st-invite-btn">Invite</button>
      </div>
    </div>
  );
}

/* ── Help and support ────────────────────────────────── */
function HelpSection() {
  return (
    <div className="st-section">
      <h3 className="st-section-title">Help and support</h3>
      <p className="st-section-sub">We're here to help you with any question or issues</p>

      <div className="st-help-cards">
        <div className="st-help-card">
          <div className="st-help-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 015.13 12.8a19.8 19.8 0 01-3.07-8.68 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <h4 className="st-help-card-title">Call us</h4>
          <p className="st-help-card-desc">Speak directly with our support team for instant assistance.</p>
          <button type="button" className="st-help-btn">Call now</button>
        </div>

        <div className="st-help-card">
          <div className="st-help-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <h4 className="st-help-card-title">Message us</h4>
          <p className="st-help-card-desc">Send us a message and our team will get back to you.</p>
          <button type="button" className="st-help-btn">Message now</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Settings page ──────────────────────────────── */
export default function Settings() {
  const [active, setActive] = useState("profile");

  return (
    <Layout searchPlaceholder="Knowledge Base">
      <div className="st-page-header">
        <h2 className="st-page-title">Settings</h2>
        <p className="st-page-subtitle">Manage your account, preference and other settings</p>
      </div>

      <div className="st-body">
        {/* Left nav */}
        <div className="st-nav">
          {SECTIONS.map(s => (
            <button
              key={s.key}
              type="button"
              className={`st-nav-item${active === s.key ? " active" : ""}`}
              onClick={() => setActive(s.key)}
            >
              <span className="st-nav-icon">{NAV_ICONS[s.key]}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div className="st-content-wrap">
          {active === "profile" && <ProfileSection />}
          {active === "voice"   && <VoiceSection />}
          {active === "team"    && <TeamSection />}
          {active === "help"    && <HelpSection />}
        </div>
      </div>
    </Layout>
  );
}
