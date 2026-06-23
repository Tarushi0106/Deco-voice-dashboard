import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import "./ForwardedCallDetail.css";

const DETAIL_DATA = {
  0: {
    campaign: "Appointment Booking",
    contact: "+91 7985738248",
    forwardedTo: "Booking team",
    duration: "4min 2sec",
    status: "completed",
    date: "18 June 2024, 10:00 AM",
  },
  1: {
    campaign: "Customer support",
    contact: "+91 7985738248",
    forwardedTo: "Recruiter team",
    duration: "1min 0sec",
    status: "completed",
    date: "18 June 2024, 10:15 AM",
  },
};

const TRANSCRIPT = [
  { speaker: "Booking team", text: "Content will appear here. Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here." },
  { speaker: "Customer",     text: "Content will appear here. Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here." },
  { speaker: "Booking team", text: "Content will appear here. Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here." },
  { speaker: "Customer",     text: "Content will appear here. Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here.Content will appear here." },
];

const META_ICONS = {
  campaign: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
      <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4z" fill="#3464ff" stroke="none"/>
    </svg>
  ),
  contact: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  forwarded: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      <path d="M21 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91"/>
    </svg>
  ),
  duration: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  status: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
};

export default function ForwardedCallDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = DETAIL_DATA[id] || DETAIL_DATA[0];

  return (
    <Layout searchPlaceholder="campaign">
      {/* Back */}
      <div className="fcd-back-row">
        <button className="fcd-back-btn" onClick={() => navigate("/forwarding")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Back to Forwarded calls
        </button>
      </div>

      {/* Header card */}
      <div className="fcd-header-card">
        <div className="fcd-header-top">
          <h2 className="fcd-page-title">Forwarded calls detail</h2>
          <p className="fcd-date">{detail.date}</p>
        </div>
        <div className="fcd-meta-row">
          <div className="fcd-meta-card">
            <div className="fcd-meta-icon">{META_ICONS.campaign}</div>
            <div className="fcd-meta-text">
              <span className="fcd-meta-label">Campaign</span>
              <span className="fcd-meta-value">{detail.campaign}</span>
            </div>
          </div>
          <div className="fcd-meta-card">
            <div className="fcd-meta-icon">{META_ICONS.contact}</div>
            <div className="fcd-meta-text">
              <span className="fcd-meta-label">Contact no.</span>
              <span className="fcd-meta-value">{detail.contact}</span>
            </div>
          </div>
          <div className="fcd-meta-card">
            <div className="fcd-meta-icon">{META_ICONS.forwarded}</div>
            <div className="fcd-meta-text">
              <span className="fcd-meta-label">Forwarded to</span>
              <span className="fcd-meta-value">{detail.forwardedTo}</span>
            </div>
          </div>
          <div className="fcd-meta-card">
            <div className="fcd-meta-icon">{META_ICONS.duration}</div>
            <div className="fcd-meta-text">
              <span className="fcd-meta-label">Duration</span>
              <span className="fcd-meta-value">{detail.duration}</span>
            </div>
          </div>
          <div className="fcd-meta-card">
            <div className="fcd-meta-icon">{META_ICONS.status}</div>
            <div className="fcd-meta-text">
              <span className="fcd-meta-label">Status</span>
              <span className={`fcd-status-badge ${detail.status}`}>
                {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body: transcript + recording */}
      <div className="fcd-body-grid">
        {/* Calls detail */}
        <div className="fcd-transcript-card">
          <h3 className="fcd-card-title">Calls detail</h3>
          <div className="fcd-transcript-list">
            {TRANSCRIPT.map((entry, i) => (
              <div key={i} className="fcd-transcript-entry">
                <p className="fcd-speaker">{entry.speaker}</p>
                <p className="fcd-speech">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call recording */}
        <div className="fcd-recording-card">
          <h3 className="fcd-card-title">Call recording</h3>
          <div className="fcd-recording-row">
            <div className="fcd-rec-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3464ff" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/>
              </svg>
              <span className="fcd-rec-label">Male voice</span>
            </div>
            <button className="fcd-play-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
