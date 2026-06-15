import { useState, useRef, useEffect } from "react";
import "./CreateScript.css";

// ── Data ─────────────────────────────────────────────────────────────────────
const USE_CASES = [
  { id: "appointment", label: "Appointment Booking", desc: "Generate leads and close deals" },
  { id: "customer",    label: "Customer support",    desc: "Resolve customer queries" },
];

const GOALS_MAP = {
  appointment: ["Lead generation", "Close deals", "Demo scheduling", "Follow-up calls"],
  customer:    ["Resolve customer queries", "Technical support", "Escalation handling", "Feedback collection"],
};
const AUDIENCES_MAP = {
  appointment: ["Small businesses", "Enterprise clients", "Startups", "Individuals"],
  customer:    ["Existing customers", "New customers", "Premium users", "Trial users"],
};
const TONES     = ["Professional", "Friendly", "Formal", "Conversational", "Empathetic"];
const LANGUAGES = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Bengali", "Gujarati"];
const COVERAGE_OPTIONS = [
  "Introduction", "Verify Candidate Details", "Ask Qualification Questions",
  "Check Availability", "Interview Scheduling",
];
const KNOWLEDGE_SOURCES = ["FAQs", "Product Information", "Company Details"];

const GENERATED_SCRIPT = {
  opening: "Hello, this is Sarah from ABC Technologies",
  content: `We noticed that you recently showed interest in our programs, and we're reaching out to see if you need any assistance with the admission process.\n\nOur team can help you with course details, eligibility requirements, fees, important dates, and application guidance.\n\nWould you like to receive more information about admissions or speak with a counsellor? Important dates, and application guidance. Would you like to receive more information about admissions or speak with a counsellor?`,
};

// ── Reusable Dropdown ─────────────────────────────────────────────────────────
function Dropdown({ value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="cs-dropdown">
      <button type="button" className="cs-dd-trigger" onClick={() => setOpen(!open)}>
        <span className={value ? "cs-dd-value" : "cs-dd-placeholder"}>{value || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="cs-dd-menu">
          {options.map((o) => (
            <div key={o} className={`cs-dd-item${value === o ? " active" : ""}`}
              onClick={() => { onChange(o); setOpen(false); }}>
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Modal shell ───────────────────────────────────────────────────────────────
function ModalShell({ title, subtitle, onClose, children, footer }) {
  return (
    <div className="cs-overlay">
      <div className="cs-modal">
        <div className="cs-modal-hdr">
          <div className="cs-modal-hdr-left">
            <div className="cs-modal-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#3464ff">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 13h8v2H8v-2zm0 4h5v2H8v-2zm0-8h2v2H8V9z" />
              </svg>
            </div>
            <div>
              <p className="cs-modal-title">{title}</p>
              <p className="cs-modal-sub">{subtitle}</p>
            </div>
          </div>
          <button className="cs-modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="cs-modal-body">{children}</div>
        <div className="cs-modal-foot">{footer}</div>
      </div>
    </div>
  );
}

// ── Page footer ───────────────────────────────────────────────────────────────
function PageFooter({ onBack, onContinue, continueDisabled }) {
  return (
    <div className="cs-page-foot">
      <button className="cs-back-btn" onClick={onBack}>Back</button>
      <button className="cs-continue-btn" onClick={onContinue} disabled={continueDisabled}>Continue</button>
    </div>
  );
}

// ── STEP 1: Use case ──────────────────────────────────────────────────────────
function UseCaseStep({ selected, onSelect, onBack, onContinue }) {
  return (
    <div className="cs-page">
      <div className="cs-page-hdr">
        <h2 className="cs-page-title">Create new script</h2>
        <p className="cs-page-sub">What type of script would you like to create?</p>
      </div>
      <h3 className="cs-section-label">Choose the use case that best matches your goal</h3>
      <div className="cs-uc-grid">
        {USE_CASES.map((uc) => (
          <div key={uc.id} className={`cs-uc-card${selected === uc.id ? " selected" : ""}`}
            onClick={() => onSelect(uc.id)}>
            <div className="cs-uc-icon">
              {uc.id === "appointment" ? (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                  <circle cx="8" cy="15" r="1" fill="#3464ff" stroke="none" />
                  <circle cx="12" cy="15" r="1" fill="#3464ff" stroke="none" />
                  <circle cx="16" cy="15" r="1" fill="#3464ff" stroke="none" />
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              )}
            </div>
            <p className="cs-uc-label">{uc.label}</p>
            <p className="cs-uc-desc">{uc.desc}</p>
          </div>
        ))}
      </div>
      <PageFooter onBack={onBack} onContinue={onContinue} continueDisabled={!selected} />
    </div>
  );
}

// ── STEP 2: Creation method ───────────────────────────────────────────────────
function MethodStep({ selected, onSelect, onBack, onContinue }) {
  return (
    <div className="cs-page">
      <div className="cs-page-hdr">
        <h2 className="cs-page-title">Create new script</h2>
        <p className="cs-page-sub">Customize your AI agent settings and voice preferences</p>
      </div>
      <h3 className="cs-section-label">Select a creation method</h3>
      <div className="cs-method-grid">

        {/* Generate with AI — col 1 row 1 */}
        <div className={`cs-method-card${selected === "ai" ? " selected" : ""}`}
          onClick={() => onSelect("ai")}>
          <div className="cs-method-inner">
            <div className="cs-method-left">
              <div className="cs-method-top">
                <div className="cs-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3464ff">
                    <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.78 1.18 6.95L12 17.77l-5.27 3.23 1.18-6.95L3 9.27l5.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="cs-method-text">
                  <p className="cs-method-label">Generate with AI</p>
                  <p className="cs-method-desc">Let AI create a script based on your requirements</p>
                </div>
              </div>
              <div className="cs-method-chips">
                <span className="cs-chip">Customizable output</span>
                <span className="cs-chip">Smart suggestions</span>
              </div>
            </div>
            <div className="cs-method-illus">
              <svg width="96" height="88" viewBox="0 0 96 88">
                <ellipse cx="48" cy="50" rx="34" ry="34" fill="#dde4ff" />
                <rect x="32" y="28" width="32" height="28" rx="10" fill="#6366f1" />
                <rect x="38" y="35" width="8" height="9" rx="3" fill="#fff" />
                <rect x="50" y="35" width="8" height="9" rx="3" fill="#fff" />
                <circle cx="42" cy="39" r="2.5" fill="#312e81" />
                <circle cx="54" cy="39" r="2.5" fill="#312e81" />
                <path d="M38 50 Q48 56 58 50" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="26" y="38" width="6" height="10" rx="3" fill="#a5b4fc" />
                <rect x="64" y="38" width="6" height="10" rx="3" fill="#a5b4fc" />
                <rect x="42" y="24" width="12" height="6" rx="3" fill="#818cf8" />
                <path d="M16 22 Q22 18 26 22" stroke="#c7d2fe" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="14" cy="22" r="2" fill="#c7d2fe" />
                <path d="M78 32 Q84 28 88 32" stroke="#c7d2fe" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="76" cy="32" r="2" fill="#c7d2fe" />
              </svg>
            </div>
          </div>
        </div>

        {/* Use template — col 2 row 1 */}
        <div className={`cs-method-card${selected === "template" ? " selected" : ""}`}
          onClick={() => onSelect("template")}>
          <div className="cs-method-inner">
            <div className="cs-method-left">
              <div className="cs-method-top">
                <div className="cs-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3464ff">
                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <div className="cs-method-text">
                  <p className="cs-method-label">Use template</p>
                  <p className="cs-method-desc">Choose from pre-built templates and edit accordingly</p>
                </div>
              </div>
              <div className="cs-method-chips">
                <span className="cs-chip">Quick start</span>
                <span className="cs-chip">Industry best practices</span>
              </div>
            </div>
            <div className="cs-method-illus">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <rect x="6"  y="12" width="40" height="50" rx="5" fill="#dde4ff" />
                <rect x="13" y="20" width="26" height="3"  rx="1.5" fill="#818cf8" />
                <rect x="13" y="27" width="18" height="2"  rx="1"   fill="#a5b4fc" />
                <rect x="13" y="32" width="22" height="2"  rx="1"   fill="#a5b4fc" />
                <rect x="13" y="37" width="14" height="2"  rx="1"   fill="#c7d2fe" />
                <rect x="16" y="8"  width="40" height="50" rx="5" fill="#c7d2fe" opacity=".85" />
                <rect x="26" y="4"  width="40" height="50" rx="5" fill="#a5b4fc" opacity=".6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Build manually — col 1 row 2 */}
        <div className={`cs-method-card${selected === "manual" ? " selected" : ""}`}
          onClick={() => onSelect("manual")}>
          <div className="cs-method-inner">
            <div className="cs-method-left">
              <div className="cs-method-top">
                <div className="cs-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3464ff">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </div>
                <div className="cs-method-text">
                  <p className="cs-method-label">Build manually</p>
                  <p className="cs-method-desc">Create your script from scratch with full control</p>
                </div>
              </div>
              <div className="cs-method-chips">
                <span className="cs-chip">Flexibility</span>
                <span className="cs-chip">Advanced editing</span>
              </div>
            </div>
            <div className="cs-method-illus">
              <svg width="84" height="68" viewBox="0 0 84 68">
                <rect x="8" y="10" width="68" height="48" rx="7" fill="#dde4ff" />
                <rect x="8" y="10" width="68" height="14" rx="7" fill="#c7d2fe" />
                <rect x="8" y="17" width="68" height="7" rx="0" fill="#c7d2fe" />
                <circle cx="18" cy="17" r="3" fill="#818cf8" />
                <circle cx="27" cy="17" r="3" fill="#a5b4fc" />
                <circle cx="36" cy="17" r="3" fill="#c7d2fe" />
                <text x="42" y="42" textAnchor="middle" fontSize="16" fontWeight="700" fill="#6366f1" fontFamily="serif">T</text>
                <rect x="40" y="45" width="4" height="8" rx="1" fill="#818cf8" />
                <text x="18" y="52" fontSize="9" fill="#a5b4fc" fontFamily="sans-serif">✦</text>
                <text x="62" y="35" fontSize="9" fill="#a5b4fc" fontFamily="sans-serif">✦</text>
                <text x="66" y="52" fontSize="7" fill="#c7d2fe" fontFamily="sans-serif">+</text>
              </svg>
            </div>
          </div>
        </div>

      </div>
      <PageFooter onBack={onBack} onContinue={onContinue} continueDisabled={!selected} />
    </div>
  );
}

// ── MODAL 1: Script details ───────────────────────────────────────────────────
function DetailsModal({ useCase, form, setForm, onCancel, onContinue }) {
  const goals     = GOALS_MAP[useCase]     || GOALS_MAP.customer;
  const audiences = AUDIENCES_MAP[useCase] || AUDIENCES_MAP.customer;
  const canContinue = form.name && form.goal && form.audience && form.tone;
  return (
    <ModalShell
      title="Tell us about your script"
      subtitle="Provide a few details about your booking process, and we'll generate a tailored conversation script."
      onClose={onCancel}
      footer={
        <>
          <button className="cs-m-cancel" onClick={onCancel}>Cancel</button>
          <button className={`cs-m-continue${canContinue ? "" : " disabled"}`} onClick={onContinue}>Continue</button>
        </>
      }
    >
      <div className="cs-fields">
        <div className="cs-field">
          <label>Script name</label>
          <input className="cs-input" placeholder="Select script name"
            value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="cs-field">
          <label>Goal of the script</label>
          <Dropdown value={form.goal} placeholder="Select goal of the script" options={goals}
            onChange={(v) => setForm(p => ({ ...p, goal: v }))} />
        </div>
        <div className="cs-field">
          <label>Target audience</label>
          <Dropdown value={form.audience} placeholder="Select target audience" options={audiences}
            onChange={(v) => setForm(p => ({ ...p, audience: v }))} />
        </div>
        <div className="cs-field">
          <label>Tone of voice</label>
          <Dropdown value={form.tone} placeholder="Select tone" options={TONES}
            onChange={(v) => setForm(p => ({ ...p, tone: v }))} />
        </div>
      </div>
    </ModalShell>
  );
}

// ── MODAL 2: Preferences ──────────────────────────────────────────────────────
function PreferenceModal({ form, setForm, onBack, onContinue }) {
  return (
    <ModalShell
      title="Tell us about your script"
      subtitle="Provide a few details about your booking process, and we'll generate a tailored conversation script."
      onClose={onBack}
      footer={
        <>
          <button className="cs-m-cancel" onClick={onBack}>Back</button>
          <button className="cs-m-continue" onClick={onContinue}>Continue</button>
        </>
      }
    >
      <h3 className="cs-modal-section-title">Set preference</h3>
      <div className="cs-fields">
        <div className="cs-field">
          <label>Primary language</label>
          <Dropdown value={form.primaryLang} placeholder="Select language" options={LANGUAGES}
            onChange={(v) => setForm(p => ({ ...p, primaryLang: v }))} />
        </div>
        <div className="cs-field">
          <label>Secondary language</label>
          <Dropdown value={form.secondaryLang} placeholder="Select language" options={LANGUAGES}
            onChange={(v) => setForm(p => ({ ...p, secondaryLang: v }))} />
        </div>
        <div className="cs-field">
          <label>Select voice</label>
          {["male", "female"].map((v) => (
            <button key={v} type="button"
              className={`cs-voice-btn cs-voice-${v}${form.voice === v ? " selected" : ""}`}
              onClick={() => setForm(p => ({ ...p, voice: v }))}>
              <span className="cs-voice-left">
                <span className="cs-voice-icon-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill={form.voice === v ? (v === "male" ? "#3464ff" : "#ec4899") : "#9ca3af"}>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                </span>
                {v === "male" ? "Male voice" : "Female voice"}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24"
                fill={form.voice === v ? (v === "male" ? "#3464ff" : "#ec4899") : "#d1d5db"}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}

// ── MODAL 3: Coverage ─────────────────────────────────────────────────────────
function CoverageModal({ form, setForm, onBack, onContinue }) {
  const toggle = (item) => {
    const cur = form.coverage || [];
    setForm(p => ({
      ...p, coverage: cur.includes(item) ? cur.filter(x => x !== item) : [...cur, item]
    }));
  };
  return (
    <ModalShell
      title="Tell us about your script"
      subtitle="Provide a few details about your booking process, and we'll generate a tailored conversation script."
      onClose={onBack}
      footer={
        <>
          <button className="cs-m-cancel" onClick={onBack}>Back</button>
          <button className="cs-m-continue" onClick={onContinue}>Continue</button>
        </>
      }
    >
      <h3 className="cs-modal-section-title">What should the agent cover?</h3>
      <div className="cs-checklist">
        {COVERAGE_OPTIONS.map((item) => {
          const checked = (form.coverage || []).includes(item);
          return (
            <div key={item} className={`cs-check-row${checked ? " checked" : ""}`} onClick={() => toggle(item)}>
              <span>{item}</span>
              <span className={`cs-checkbox${checked ? " checked" : ""}`}>
                {checked && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </span>
            </div>
          );
        })}
      </div>
      <div className="cs-field" style={{ marginTop: 16 }}>
        <label>Other</label>
        <input className="cs-input" placeholder="Please specify"
          value={form.other || ""}
          onChange={(e) => setForm(p => ({ ...p, other: e.target.value }))} />
      </div>
    </ModalShell>
  );
}

// ── MODAL 4: Knowledge ────────────────────────────────────────────────────────
function KnowledgeModal({ form, setForm, onBack, onContinue, hasKnowledge = true }) {
  const toggleSrc = (src) => {
    const cur = form.knowledge || [];
    setForm(p => ({
      ...p, knowledge: cur.includes(src) ? cur.filter(x => x !== src) : [...cur, src]
    }));
  };
  return (
    <ModalShell
      title="Tell us about your script"
      subtitle="Provide a few details about your booking process, and we'll generate a tailored conversation script."
      onClose={onBack}
      footer={
        <>
          <button className="cs-m-cancel" onClick={onBack}>Back</button>
          <button className="cs-m-continue" onClick={onContinue}>Continue</button>
        </>
      }
    >
      <h3 className="cs-modal-section-title">
        Attach knowledge <span className="cs-optional">(optional)</span>
      </h3>
      {hasKnowledge ? (
        <>
          <div className="cs-field">
            <label>Search existing knowledge base</label>
            <div className="cs-search-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input placeholder="Search existing knowledge base"
                value={form.knowledgeSearch || ""}
                onChange={(e) => setForm(p => ({ ...p, knowledgeSearch: e.target.value }))} />
            </div>
          </div>
          <div className="cs-or">or</div>
          <div className="cs-field">
            <label>Select source</label>
            <div className="cs-checklist">
              {KNOWLEDGE_SOURCES.map((src) => {
                const checked = (form.knowledge || []).includes(src);
                return (
                  <div key={src} className={`cs-check-row${checked ? " checked" : ""}`} onClick={() => toggleSrc(src)}>
                    <span>{src}</span>
                    <span className={`cs-checkbox${checked ? " checked" : ""}`}>
                      {checked && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="cs-kb-empty">
            <p className="cs-kb-empty-title">Knowledge Base is empty</p>
            <p className="cs-kb-empty-desc">Add FAQs, product information, or company details to help your AI agent provide accurate responses.</p>
          </div>
          <button className="cs-add-kb">+ Add knowledge base</button>
        </>
      )}
    </ModalShell>
  );
}

// ── MODAL 5: Review ───────────────────────────────────────────────────────────
function ReviewModal({ form, onClose, onCreated }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="cs-overlay">
      <div className="cs-modal cs-modal-wide">
        {/* Header */}
        <div className="cs-modal-hdr">
          <div className="cs-modal-hdr-left">
            <div className="cs-modal-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#3464ff">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 13h8v2H8v-2zm0 4h5v2H8v-2zm0-8h2v2H8V9z" />
              </svg>
            </div>
            <div>
              <p className="cs-modal-title">New script</p>
              <p className="cs-modal-sub">Welcome message, languages, and voice — saved per script slot</p>
            </div>
          </div>
          <button className="cs-modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="cs-generating">
            <div className="cs-gen-spinner" />
            <p>Generating your script…</p>
          </div>
        ) : (
          <div className="cs-review-body">
            {/* Left: details */}
            <div className="cs-review-left">
              <div className="cs-review-head">
                <span className="cs-review-head-title">Script details</span>
                <button className="cs-edit-icon-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="cs-detail-block">
                <p className="cs-detail-label">Script name</p>
                <div className="cs-detail-value">{form.name || "Customer support"}</div>
              </div>
              <div className="cs-detail-block">
                <p className="cs-detail-label">Tone of script</p>
                <div className="cs-detail-value">{form.tone || "Professional"}</div>
              </div>
              <div className="cs-detail-block">
                <p className="cs-detail-label">Language</p>
                <div className="cs-detail-value">{form.primaryLang || "English"} (primary)</div>
                <div className="cs-detail-value">{form.secondaryLang || "Hindi"} (secondary)</div>
              </div>
              <div className="cs-detail-block">
                <p className="cs-detail-label">Voice</p>
                <div className={`cs-detail-voice cs-detail-voice-${form.voice || "female"}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24"
                    fill={form.voice === "male" ? "#3464ff" : "#ec4899"}>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                  {form.voice === "male" ? "Male voice" : "Female voice"}
                  <svg width="13" height="13" viewBox="0 0 24 24"
                    fill={form.voice === "male" ? "#3464ff" : "#ec4899"} style={{ marginLeft: "auto" }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
              {form.coverage?.length > 0 && (
                <div className="cs-detail-block">
                  <p className="cs-detail-label">Conversation includes</p>
                  <div className="cs-review-checklist">
                    {form.coverage.map((item) => (
                      <div key={item} className="cs-check-row checked" style={{ fontSize: 13 }}>
                        <span>{item}</span>
                        <span className="cs-checkbox checked">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: script preview */}
            <div className="cs-review-right">
              <div className="cs-review-head">
                <span className="cs-review-head-title">Script</span>
                <button className="cs-edit-manually-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit manually
                </button>
              </div>
              <div className="cs-script-box">
                <div className="cs-script-section">
                  <div className="cs-script-section-head">
                    <span className="cs-script-label">Opening line <span className="cs-script-count">(8 words)</span></span>
                    <button className="cs-play-btn cs-play-pink">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#ec4899">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  </div>
                  <p className="cs-script-text">{GENERATED_SCRIPT.opening}</p>
                </div>
                <div className="cs-script-section">
                  <p className="cs-script-label">Script content <span className="cs-script-count">(100 words)</span></p>
                  <p className="cs-script-body">{GENERATED_SCRIPT.content}</p>
                </div>
              </div>
              <div className="cs-review-actions">
                <button className="cs-regen-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#3464ff">
                    <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.78 1.18 6.95L12 17.77l-5.27 3.23 1.18-6.95L3 9.27l5.91-1.01L12 2z" />
                  </svg>
                  Regenerate
                </button>
                <button className="cs-create-btn" onClick={onCreated}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z" />
                  </svg>
                  Create script
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main exported wizard ──────────────────────────────────────────────────────
export default function CreateScriptWizard({ onBack, onCreated }) {
  const [pageStep, setPageStep]   = useState("usecase"); // usecase | method
  const [useCase, setUseCase]     = useState(null);
  const [method, setMethod]       = useState(null);
  const [modalStep, setModalStep] = useState(null); // null|details|preference|coverage|knowledge|review
  const [form, setForm]           = useState({
    name: "", goal: "", audience: "", tone: "",
    primaryLang: "English", secondaryLang: "Hindi",
    voice: "female", coverage: [], other: "",
    knowledge: [], knowledgeSearch: "",
  });

  const closeModal = () => setModalStep(null);

  return (
    <>
      {pageStep === "usecase" && (
        <UseCaseStep
          selected={useCase}
          onSelect={setUseCase}
          onBack={onBack}
          onContinue={() => useCase && setPageStep("method")}
        />
      )}
      {pageStep === "method" && (
        <MethodStep
          selected={method}
          onSelect={setMethod}
          onBack={() => setPageStep("usecase")}
          onContinue={() => method && setModalStep("details")}
        />
      )}
      {modalStep === "details" && (
        <DetailsModal useCase={useCase} form={form} setForm={setForm}
          onCancel={closeModal} onContinue={() => setModalStep("preference")} />
      )}
      {modalStep === "preference" && (
        <PreferenceModal form={form} setForm={setForm}
          onBack={() => setModalStep("details")} onContinue={() => setModalStep("coverage")} />
      )}
      {modalStep === "coverage" && (
        <CoverageModal form={form} setForm={setForm}
          onBack={() => setModalStep("preference")} onContinue={() => setModalStep("knowledge")} />
      )}
      {modalStep === "knowledge" && (
        <KnowledgeModal form={form} setForm={setForm}
          onBack={() => setModalStep("coverage")} onContinue={() => setModalStep("review")} />
      )}
      {modalStep === "review" && (
        <ReviewModal form={form} onClose={closeModal} onCreated={onCreated} />
      )}
    </>
  );
}
