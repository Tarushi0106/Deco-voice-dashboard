import { useState, useRef, useCallback, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";
import "./KnowledgeBase.css";

// ── Card / modal config ─────────────────────────────────────────────────
const CARDS = [
  {
    id: "faq",
    cardIconColor: "#f59e0b",
    cardIconBg: "transparent",
    modalIconColor: "#3464ff",
    modalIconBg: "#eff6ff",
    iconName: "chat",
    title: "Upload FAQs",
    subtitle: "Question- answer pairs",
    modalTitle: "Upload FAQ's",
    modalSubtitle: "Question- answer pairs",
  },
  {
    id: "product",
    cardIconColor: "#8b5cf6",
    cardIconBg: "transparent",
    modalIconColor: "#8b5cf6",
    modalIconBg: "#f5f3ff",
    iconName: "info",
    title: "Add product info",
    subtitle: "add features, benefits, pricing",
    modalTitle: "Add product details",
    modalSubtitle: "add features, benefits, pricing",
  },
  {
    id: "company",
    cardIconColor: "#10b981",
    cardIconBg: "transparent",
    modalIconColor: "#3464ff",
    modalIconBg: "#eff6ff",
    iconName: "document",
    title: "Add company details",
    subtitle: "add policies, address, contact",
    modalTitle: "Add company details",
    modalSubtitle: "add policies, address, contact",
  },
];

// ── Upload illustration SVG ─────────────────────────────────────────────
function UploadIllustration() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="10" y="8" width="44" height="52" rx="5" fill="#e0e9ff" />
      <rect x="16" y="18" width="24" height="3" rx="1.5" fill="#a5b4fc" />
      <rect x="16" y="25" width="32" height="3" rx="1.5" fill="#a5b4fc" />
      <rect x="16" y="32" width="28" height="3" rx="1.5" fill="#a5b4fc" />
      <circle cx="52" cy="52" r="14" fill="#3464ff" />
      <path d="M52 44v16M44 52l8-8 8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── File check icon ─────────────────────────────────────────────────────
function CheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

// ── Modal ───────────────────────────────────────────────────────────────
function UploadModal({ card, onClose }) {
  const [tab, setTab]       = useState("pdf");
  const [lang, setLang]     = useState("english");
  const [dragging, setDragging] = useState(false);
  const [files, setFiles]   = useState([]);
  const [url, setUrl]       = useState("");
  const inputRef            = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const formatSize = (bytes) => {
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(0)} mb`;
    return `${(bytes / 1_000).toFixed(0)} kb`;
  };

  const addFiles = useCallback((rawFiles) => {
    const pdfs = Array.from(rawFiles).filter((f) => f.type === "application/pdf");
    if (!pdfs.length) return;

    const newEntries = pdfs.map((f) => ({
      id: `${f.name}-${f.lastModified}`,
      name: f.name,
      size: formatSize(f.size),
      progress: 0,
      done: false,
    }));

    setFiles((prev) => [...prev, ...newEntries]);

    // Simulate upload progress for each new file
    newEntries.forEach((entry) => {
      let pct = 0;
      const iv = setInterval(() => {
        pct += Math.floor(Math.random() * 15) + 5;
        if (pct >= 100) {
          pct = 100;
          clearInterval(iv);
          setFiles((prev) =>
            prev.map((f) => (f.id === entry.id ? { ...f, progress: 100, done: true } : f))
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === entry.id ? { ...f, progress: pct } : f))
          );
        }
      }, 200);
    });
  }, []);

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="kb-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="kb-modal">
        {/* Header */}
        <div className="kb-modal-header">
          <div className="kb-modal-title-row">
            <div className="kb-modal-icon" style={{ background: card.modalIconBg }}>
              <Icon name={card.iconName} size={22} color={card.modalIconColor} />
            </div>
            <div>
              <p className="kb-modal-title">{card.modalTitle}</p>
              <p className="kb-modal-sub">{card.modalSubtitle}</p>
            </div>
          </div>
          <button className="kb-close-btn" onClick={onClose}>
            <Icon name="close" size={20} color="#6b7280" />
          </button>
        </div>

        {/* Body */}
        <div className="kb-modal-body">
          {/* Tabs */}
          <div className="kb-tabs">
            <button
              className={`kb-tab ${tab === "pdf" ? "active" : "inactive"}`}
              onClick={() => setTab("pdf")}
            >
              Upload Pdf
            </button>
            <button
              className={`kb-tab ${tab === "url" ? "active" : "inactive"}`}
              onClick={() => setTab("url")}
            >
              Add URL
            </button>
          </div>

          {tab === "pdf" ? (
            <>
              {/* Drop zone */}
              <div
                className={`kb-dropzone${dragging ? " dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => addFiles(e.target.files)}
                />
                <UploadIllustration />
                <p className="kb-dropzone-text">
                  Drag and drop your <span className="blue">PDF</span> here or click to{" "}
                  <span className="blue">browse</span>
                </p>
                <p className="kb-dropzone-hint">only .pdf files are supported</p>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="kb-file-list">
                  {files.map((file) => (
                    <div key={file.id} className="kb-file-item">
                      <span className="kb-file-icon">PDF</span>
                      <div className="kb-file-info">
                        <div className="kb-file-name">
                          {file.name}
                          {file.done && <CheckCircle />}
                        </div>
                        {file.done ? (
                          <div className="kb-file-size">{file.size}</div>
                        ) : (
                          <div className="kb-progress-row">
                            <div className="kb-progress-bar">
                              <div
                                className="kb-progress-fill"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <span className="kb-progress-pct">{file.progress}%</span>
                          </div>
                        )}
                      </div>
                      <button
                        className="kb-file-action"
                        onClick={() => removeFile(file.id)}
                      >
                        <Icon
                          name={file.done ? "trash" : "circle-x"}
                          size={18}
                          color={file.done ? "#9ca3af" : "#9ca3af"}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Language support */}
              <div className="kb-lang-label">Language support</div>
              <div className="kb-lang-options">
                {[
                  { key: "english", label: "English" },
                  { key: "multi",   label: "Multilingual (Hindi, Tamil etc)" },
                ].map((opt) => (
                  <div
                    key={opt.key}
                    className={`kb-lang-option${lang === opt.key ? " selected" : ""}`}
                    onClick={() => setLang(opt.key)}
                  >
                    <span className="kb-lang-option-text">{opt.label}</span>
                    <div className="kb-lang-check">
                      {lang === opt.key && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="kb-lang-label" style={{ marginBottom: 8 }}>Website URL</div>
              <input
                className="kb-url-input"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="kb-lang-label">Language support</div>
              <div className="kb-lang-options">
                {[
                  { key: "english", label: "English" },
                  { key: "multi",   label: "Multilingual (Hindi, Tamil etc)" },
                ].map((opt) => (
                  <div
                    key={opt.key}
                    className={`kb-lang-option${lang === opt.key ? " selected" : ""}`}
                    onClick={() => setLang(opt.key)}
                  >
                    <span className="kb-lang-option-text">{opt.label}</span>
                    <div className="kb-lang-check">
                      {lang === opt.key && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="kb-modal-footer">
            <button className="kb-upload-btn">
              {tab === "pdf" ? "Upload PDF" : "Add URL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────
export default function KnowledgeBase() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <Layout>
      <div className="dv-page-title">
        <h2>Knowledge Base</h2>
        <p>Manage FAQs, company information, product details, and AI responses.</p>
      </div>

      <div className="kb-grid">
        {CARDS.map((card) => (
          <button key={card.id} className="kb-card" onClick={() => setOpenCard(card)}>
            <div className="kb-card-icon-area">
              <Icon name={card.iconName} size={72} color={card.cardIconColor} />
            </div>
            <div className="kb-card-body">
              <p className="kb-card-title">{card.title}</p>
              <p className="kb-card-sub">{card.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {openCard && (
        <UploadModal card={openCard} onClose={() => setOpenCard(null)} />
      )}
    </Layout>
  );
}
