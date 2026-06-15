import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";
import CreateScriptWizard from "./CreateScript.jsx";
import "./ScriptManagement.css";

// ── Static script data ──────────────────────────────────────────────────
const SCRIPTS = [
  {
    id: 1,
    isDefault: true,
    name: "Default set up",
    type: "Primary script",
    badge: "agentbase",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Male",
    previewTitle: null,
    previewBody: "Hey! How can I help you today?",
  },
  {
    id: 2,
    name: "Customer Support",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Female",
    previewTitle: "Hey! Welcome student",
    previewBody:
      "I am from SISS school of ed-tech. I am calling to inform you about our admission process. Are u interested in this? Free admission, admissions open, please once visit our school between...",
  },
  {
    id: 3,
    name: "Sales support",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Female",
    previewTitle: "Welcome — Hi, I am calling from MFONLINE & i see...",
    previewBody:
      "Mutual Funds are powerful tool to create wealth in long term and achieve your financial goals. We at MFONLINE are expert in recommending right funds as per your goals. You can start investing with even small amount of Rs 500 per month. Are you interested in knowing more about Mutual...",
  },
  {
    id: 4,
    name: "Appointment Booking",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Male",
    previewTitle: "Welcome — MBBS Admissions are Started Now",
    previewBody:
      "Hello, my name is Ankita from Phoenix Overseas Consultancy. We help students secure admission in internationally recognized medical universities for MBBS programs abroad...",
  },
  {
    id: 5,
    name: "Sales support",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Female",
    previewTitle: "Welcome — Hi, this is Babita calling from Aura Opto.",
    previewBody:
      "We specialize in high-impact indoor and outdoor LED display solutions, delivering complete turnkey projects across India. We've helped 1000+ clients enhance visibility with dynamic video displays...",
  },
  {
    id: 6,
    name: "Lead Follow-up",
    type: "Personalized script",
    badge: "rejected",
    primaryLang: "Hindi",
    secondaryLang: "Marathi",
    voice: "Male",
    ivrBlocked: true,
    previewTitle: "Welcome — Hello, welcome to Winson Group..",
    previewBody:
      "To help you with the right project, please choose an option: Press 1 for Windsor County — shops and showrooms...",
  },
  {
    id: 7,
    name: "Sales support",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Female",
    previewTitle: "Welcome — Hi, I am calling from MFONLINE & I see...",
    previewBody:
      "Mutual Funds are powerful tool to create wealth in long term and achieve your financial goals...",
  },
  {
    id: 8,
    name: "Lead Follow-up",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Female",
    previewTitle: "Welcome — MBBS Admissions are Started Now",
    previewBody:
      "Hello, my name is Ankita from Phoenix Overseas Consultancy. We help students secure admission in internationally recognized medical universities...",
  },
  {
    id: 9,
    name: "Appointment Booking",
    type: "Personalized script",
    badge: "active",
    primaryLang: "English",
    secondaryLang: "Hindi",
    voice: "Female",
    previewTitle: "Welcome — Hi, this is scheduling assistant",
    previewBody:
      "I am calling to confirm your appointment. Would you like to reschedule or confirm your booking for this week?",
  },
];

const LANGUAGES = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Bengali", "Gujarati"];

// ── Icons ───────────────────────────────────────────────────────────────
function GlobeIcon({ color = "#f59e0b" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  );
}

function WaveIcon({ color = "#f59e0b" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c1-4 3-6 4-6s3 4 4 8 3 8 4 8 3-4 4-8 3-6 4-6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
    </svg>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────
function Badge({ type }) {
  if (type === "active")    return <span className="sm-badge active"><span className="sm-badge-dot" />Active</span>;
  if (type === "rejected")  return <span className="sm-badge rejected"><span className="sm-badge-dot" />Rejected</span>;
  if (type === "agentbase") return <span className="sm-badge agentbase">⚡ Agent base</span>;
  return null;
}

// ── Script Card ─────────────────────────────────────────────────────────
function ScriptCard({ script }) {
  return (
    <div className="sm-card">
      <div className="sm-card-head">
        <div className="sm-card-head-left">
          <div className={`sm-card-icon${script.isDefault ? " default-icon" : ""}`}>
            {script.isDefault
              ? <StarIcon />
              : <Icon name="document" size={20} color="#7c3aed" />}
            {!script.isDefault && <span className="sm-icon-badge">?</span>}
          </div>
          <div>
            <p className="sm-card-name">{script.name}</p>
            <p className="sm-card-type">{script.type}</p>
          </div>
        </div>
        <Badge type={script.badge} />
      </div>

      <div className="sm-meta">
        <div className="sm-meta-row">
          <span className="sm-meta-left"><GlobeIcon color="#f59e0b" /> Primary language</span>
          <span className="sm-meta-val">{script.primaryLang}</span>
        </div>
        <div className="sm-meta-row">
          <span className="sm-meta-left"><GlobeIcon color="#f59e0b" /> Secondary language</span>
          <span className="sm-meta-val">{script.secondaryLang}</span>
        </div>
        <div className="sm-meta-row">
          <span className="sm-meta-left"><WaveIcon color="#f59e0b" /> Voice</span>
          <span className="sm-meta-val">{script.voice}</span>
        </div>
      </div>

      {script.ivrBlocked && (
        <div className="sm-ivr-row">
          <span className="sm-ivr-badge">IVR NOT ALLOWED</span>
          <button className="sm-ivr-btn">View solution</button>
        </div>
      )}

      <div className="sm-preview">
        {script.previewTitle && <p className="sm-preview-title">{script.previewTitle}</p>}
        <p className="sm-preview-text">{script.previewBody}</p>
      </div>

      <div className="sm-card-foot">
        <button className="sm-icon-btn" title="Edit"><PencilIcon /></button>
        {!script.isDefault && <button className="sm-icon-btn" title="Delete"><TrashIcon /></button>}
      </div>
    </div>
  );
}

// ── Language Dropdown ───────────────────────────────────────────────────
function LangDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="sm-lang-wrap">
      <button type="button" className="sm-lang-trigger" onClick={() => setOpen(!open)}>
        <span>{value}</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="sm-lang-menu">
          {LANGUAGES.map((l) => (
            <div key={l} className={`sm-lang-item${value === l ? " active" : ""}`}
              onClick={() => { onChange(l); setOpen(false); }}>
              {l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Toggle Switch ───────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button type="button" className={`sm-toggle${checked ? " on" : ""}`}
      onClick={() => onChange(!checked)}>
      <div className="sm-toggle-thumb" />
    </button>
  );
}

// ── Script Evaluation Modal ─────────────────────────────────────────────
function EvaluationModal({ onEdit, onSubmit }) {
  const score = 20;
  return (
    <div className="sm-eval-overlay" onClick={(e) => e.target === e.currentTarget && onEdit()}>
      <div className="sm-eval-modal">
        {/* Header */}
        <div className="sm-eval-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="sm-eval-icon">
              <Icon name="document" size={20} color="#7c3aed" />
            </div>
            <span className="sm-eval-title">Script evaluation</span>
          </div>
          <button className="sm-close-btn" onClick={onEdit}>
            <Icon name="close" size={18} color="#6b7280" />
          </button>
        </div>

        <div className="sm-eval-body">
          {/* Score */}
          <span className="sm-score-badge low">Low</span>
          <div className="sm-score-bar-track">
            <div className="sm-score-bar-fill" style={{ width: `${score}%` }} />
          </div>

          {/* Criteria checklist */}
          <button className="sm-checklist-btn" type="button">
            <span>Criteria checklist</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Suggestions */}
          <div className="sm-eval-section">
            <div className="sm-eval-section-head">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
              </svg>
              <span>Suggestions</span>
            </div>
            <div className="sm-eval-box">
              <ul className="sm-eval-list">
                <li>Add your company name in the first sentence, for example, 'Hello! This is [Your Company Name]. How can I help you today?'</li>
                <li>Include a clear benefit for the customer, such as 'We provide solutions that can help you save time and money.'</li>
                <li>End with a question to engage the customer, like 'Is there anything specific you would like to know about our services?'</li>
              </ul>
            </div>
          </div>

          {/* Warnings */}
          <div className="sm-eval-section">
            <div className="sm-eval-section-head" style={{ color: "#d97706" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#d97706">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <span>Script warnings</span>
            </div>
            <div className="sm-eval-box" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
              <ul className="sm-eval-list" style={{ color: "#92400e" }}>
                <li>Script may sound too formal. Consider using a more conversational tone.</li>
                <li>Missing a clear call-to-action at the end of the script.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sm-eval-footer">
          <button className="sm-eval-edit-btn" onClick={onEdit}>Edit script</button>
          <button className="sm-eval-submit-btn" onClick={onSubmit}>Submit anyway</button>
        </div>
      </div>
    </div>
  );
}

// ── Enhance with AI chip ────────────────────────────────────────────────
function EnhanceChip() {
  return (
    <span className="sm-enhance-chip">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#7c3aed">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
      Enhance with AI
    </span>
  );
}

// ── Welcome Modal ───────────────────────────────────────────────────────
function WelcomeModal({ onClose, onContinue }) {
  const [form, setForm] = useState({ name: "", company: "", mobile: "", email: "" });

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="sm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sm-modal sm-modal-large">
        <div className="sm-modal-header">
          <div className="sm-modal-title-row">
            <div className="sm-modal-icon" style={{ background: "#eff6ff" }}>
              <Icon name="document" size={22} color="#3464ff" />
            </div>
            <div>
              <p className="sm-modal-title">Welcome to DecoVoice</p>
              <p className="sm-modal-sub">Let's personalize your AI calling experience. Please share your details to configure your AI demo campaign script</p>
            </div>
          </div>
          <button className="sm-close-btn" onClick={onClose}>
            <Icon name="close" size={20} color="#6b7280" />
          </button>
        </div>

        <div className="sm-modal-body sm-modal-body-scroll">
          <div className="sm-field">
            <label className="sm-field-label">Name</label>
            <input className="sm-input" placeholder="Your full name" value={form.name} onChange={set("name")} />
          </div>
          <div className="sm-field">
            <label className="sm-field-label">Company name</label>
            <input className="sm-input" placeholder="Your company" value={form.company} onChange={set("company")} />
          </div>
          <div className="sm-field">
            <label className="sm-field-label">Mobile number</label>
            <input className="sm-input" placeholder="10- digit mobile number" value={form.mobile} onChange={set("mobile")} type="tel" maxLength={10} />
          </div>
          <div className="sm-field">
            <label className="sm-field-label">Email</label>
            <input className="sm-input" placeholder="shourrya@gmail.com" value={form.email} onChange={set("email")} type="email" />
          </div>
        </div>

        <div className="sm-modal-footer">
          <button className="sm-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="sm-continue-btn" onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}

// ── New Script Modal ────────────────────────────────────────────────────
function NewScriptModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    openingLine: "",
    script: "",
    primaryLang: "English",
    secondaryLang: "Hindi",
    forwardToHuman: false,
    captureLead: false,
    voice: "male",
  });
  const [phase, setPhase] = useState("form"); // "form" | "evaluating" | "evaluation"

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") {
        if (phase === "evaluation") setPhase("form");
        else onClose();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, phase]);

  const handleCreate = () => {
    setPhase("evaluating");
    setTimeout(() => setPhase("evaluation"), 2000);
  };

  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <>
      {/* Base modal */}
      <div className="sm-overlay" onClick={(e) => e.target === e.currentTarget && phase === "form" && onClose()}>
        <div className="sm-modal sm-modal-large">
          {/* Header */}
          <div className="sm-modal-header">
            <div className="sm-modal-title-row">
              <div className="sm-modal-icon" style={{ background: "#f5f3ff" }}>
                <Icon name="document" size={22} color="#7c3aed" />
              </div>
              <div>
                <p className="sm-modal-title">New script</p>
                <p className="sm-modal-sub">Welcome message, languages, and voice — saved per script slot</p>
              </div>
            </div>
            <button className="sm-close-btn" onClick={onClose}>
              <Icon name="close" size={20} color="#6b7280" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="sm-modal-body sm-modal-body-scroll" style={{ position: "relative" }}>
            {/* Evaluating overlay */}
            {phase === "evaluating" && (
              <div className="sm-loading-overlay">
                <div className="sm-loading-card">
                  <div className="sm-loading-dot" />
                  <p className="sm-loading-text">Evaluating your script...</p>
                </div>
              </div>
            )}

            {/* Script name */}
            <div className="sm-field">
              <label className="sm-field-label">
                Script name{" "}
                <span className="sm-char-count">({form.name.length}/200)</span>
              </label>
              <input className="sm-input" placeholder="e.g. Admission follow up"
                maxLength={200} value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              <span className="sm-field-hint">
                Shown on your script cards and in campaign config picker. Leave blank to keep the standard label.
              </span>
            </div>

            {/* Opening line */}
            <div className="sm-field">
              <label className="sm-field-label">
                Opening line{" "}
                <span className="sm-char-count">({form.openingLine.length}/300)</span>
                <EnhanceChip />
              </label>
              <input className="sm-input" placeholder="Enter your greeting message"
                maxLength={300} value={form.openingLine}
                onChange={(e) => setForm((p) => ({ ...p, openingLine: e.target.value }))} />
            </div>

            {/* Add script */}
            <div className="sm-field">
              <label className="sm-field-label">
                Add script{" "}
                <span className="sm-char-count">({form.script.length}/5000)</span>
                <EnhanceChip />
              </label>
              <textarea className="sm-textarea" placeholder="Give your script for AI agent"
                maxLength={5000} rows={8} value={form.script}
                onChange={(e) => setForm((p) => ({ ...p, script: e.target.value }))} />
            </div>

            {/* Language row */}
            <div className="sm-lang-row">
              <div className="sm-field" style={{ flex: 1 }}>
                <label className="sm-field-label">
                  Primary language<span style={{ color: "#ef4444" }}>*</span>
                </label>
                <LangDropdown value={form.primaryLang} onChange={set("primaryLang")} />
              </div>
              <div className="sm-field" style={{ flex: 1 }}>
                <label className="sm-field-label">Secondary language</label>
                <LangDropdown value={form.secondaryLang} onChange={set("secondaryLang")} />
              </div>
            </div>

            {/* Forward to human agent */}
            <div className="sm-toggle-row">
              <div className="sm-toggle-label">
                <div className="sm-toggle-icon" style={{ background: "#eff6ff" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    <path d="M21 3l-6 6M21 3h-5M21 3v5" />
                  </svg>
                </div>
                Forward to human agent
              </div>
              <Toggle checked={form.forwardToHuman} onChange={set("forwardToHuman")} />
            </div>

            {/* Capture lead */}
            <div className="sm-toggle-row">
              <div className="sm-toggle-label">
                <div className="sm-toggle-icon" style={{ background: "#ecfdf5" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </div>
                Capture lead
              </div>
              <Toggle checked={form.captureLead} onChange={set("captureLead")} />
            </div>

            {/* Select voice */}
            <div className="sm-field">
              <label className="sm-field-label">
                Select voice<span style={{ color: "#ef4444" }}>*</span>
              </label>
              <p className="sm-field-hint" style={{ marginBottom: 10 }}>
                Shown on your script cards and in campaign config picker. Leave blank to keep the standard label.
              </p>
              <div className="sm-voice-row">
                {["male", "female"].map((v) => (
                  <button key={v} type="button"
                    className={`sm-voice-btn${form.voice === v ? " selected" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, voice: v }))}>
                    <span className="sm-voice-left">
                      <svg width="18" height="18" viewBox="0 0 24 24"
                        fill={form.voice === v ? "#3464ff" : "#9ca3af"}>
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                      {v === "male" ? "Male voice" : "Female voice"}
                    </span>
                    <span className="sm-voice-play">
                      <svg width="12" height="12" viewBox="0 0 24 24"
                        fill={form.voice === v ? "#3464ff" : "#9ca3af"}>
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sm-modal-footer">
            <button className="sm-cancel-btn" onClick={onClose}>Cancel</button>
            <button className="sm-continue-btn sm-create-btn" onClick={handleCreate}>
              <Icon name="document" size={16} color="#fff" />
              Create Script
            </button>
          </div>
        </div>
      </div>

      {/* Evaluation modal (stacked on top) */}
      {phase === "evaluation" && (
        <EvaluationModal
          onEdit={() => setPhase("form")}
          onSubmit={onCreated}
        />
      )}
    </>
  );
}

// ── Page ────────────────────────────────────────────────────────────────
export default function ScriptManagement() {
  const [showCreate, setShowCreate]     = useState(false);
  const [showToast, setShowToast]       = useState(false);
  const [scriptStatus, setScriptStatus] = useState(null); // null | "pending" | "approved"

  const handleCreated = () => {
    setShowCreate(false);
    setScriptStatus("pending");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Layout searchPlaceholder="Script name">
      {/* Success toast */}
      {showToast && (
        <div className="sm-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#16a34a">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Script created
        </div>
      )}

      {showCreate ? (
        <CreateScriptWizard
          onBack={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      ) : (
        <>
          {/* Page header */}
          <div className="sm-page-header">
            <div className="dv-page-title" style={{ margin: 0 }}>
              <h2>Scripts</h2>
              <p>Customize your AI agent settings and voice preferences</p>
            </div>
            <button className="sm-new-btn" onClick={() => setShowCreate(true)}>
              + New Script
            </button>
          </div>

          {/* Status banners */}
          {scriptStatus === "pending" && (
            <div className="sm-status-banner sm-banner-pending">
              <div className="sm-banner-icon sm-banner-icon-pending">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#d97706">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
              </div>
              <div className="sm-banner-text">
                <p className="sm-banner-title">1 script pending approval</p>
                <p className="sm-banner-sub">Your script is under review. Campaign require at least one approved script</p>
              </div>
            </div>
          )}
          {scriptStatus === "approved" && (
            <div className="sm-status-banner sm-banner-approved">
              <div className="sm-banner-icon sm-banner-icon-approved">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#16a34a">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="sm-banner-text">
                <p className="sm-banner-title sm-banner-title-approved">1 script approved</p>
                <p className="sm-banner-sub">Your script is approved. Use it for campaign</p>
              </div>
              <button className="sm-create-campaign-btn" onClick={() => {}}>Create campaign</button>
            </div>
          )}

          {/* Scripts grid */}
          <div className="sm-grid">
            {SCRIPTS.map((s) => <ScriptCard key={s.id} script={s} />)}
          </div>
        </>
      )}
    </Layout>
  );
}
