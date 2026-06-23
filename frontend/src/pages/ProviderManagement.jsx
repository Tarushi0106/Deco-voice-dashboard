import Layout from "../components/Layout.jsx";
import "./ProviderManagement.css";

const EXOTEL_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#111827" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const TATA_ICON = (
  <svg width="22" height="22" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="19" fill="#1a3c8f" stroke="#1a3c8f" strokeWidth="1"/>
    <text x="20" y="15" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700" fontFamily="sans-serif">TATA</text>
    <ellipse cx="20" cy="24" rx="10" ry="5" fill="none" stroke="#fff" strokeWidth="1.5"/>
    <line x1="20" y1="19" x2="20" y2="29" stroke="#fff" strokeWidth="1.5"/>
  </svg>
);

const WHATSAPP_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.112 1.523 5.837L.044 23.25a.75.75 0 00.916.916l5.413-1.479A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.176-1.432l-.371-.22-3.846 1.049 1.049-3.846-.22-.371A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const SALESFORCE_ICON = (
  <svg width="22" height="22" viewBox="0 0 64 64">
    <path d="M26.4 12.8a9.6 9.6 0 0116.3 5.4 12 12 0 0116 11.4 12 12 0 01-4.8 9.6A8.8 8.8 0 0148 54.4H18.4a10.4 10.4 0 01-1.6-20.6 9.6 9.6 0 019.6-21z" fill="#00a1e0"/>
  </svg>
);

const ZOHO_ICON = (
  <svg width="28" height="16" viewBox="0 0 80 28">
    <rect x="0" y="4" width="20" height="20" rx="4" fill="#e04a2f"/>
    <rect x="22" y="4" width="20" height="20" rx="4" fill="#f5a623"/>
    <rect x="44" y="4" width="20" height="20" rx="4" fill="#26b77a"/>
    <rect x="66" y="4" width="14" height="20" rx="4" fill="#3d6ec5"/>
  </svg>
);

const SECTIONS = [
  {
    title: "Telephony",
    subtitle: "Integrated providers",
    providers: [
      { name: "Exotel", icon: EXOTEL_ICON },
      { name: "Tata",   icon: TATA_ICON },
    ],
  },
  {
    title: "WhatsApp",
    subtitle: "Integrate WhatsApp to send messages",
    providers: [
      { name: "WhatsApp", icon: WHATSAPP_ICON },
    ],
  },
  {
    title: "CRM",
    subtitle: "Integrated CRMs",
    providers: [
      { name: "Salesforce", icon: SALESFORCE_ICON },
      { name: "Zoho",       icon: ZOHO_ICON },
    ],
  },
];

export default function ProviderManagement() {
  return (
    <Layout searchPlaceholder="Knowledge Base">
      <div className="pm-header">
        <h2 className="pm-title">Provider management</h2>
        <p className="pm-subtitle">Monitor call activity, campaign performance, and AI agent insights.</p>
      </div>

      <div className="pm-grid">
        {SECTIONS.map((sec) => (
          <div key={sec.title} className="pm-card">
            <p className="pm-card-title">{sec.title}</p>
            <p className="pm-card-sub">{sec.subtitle}</p>
            <div className="pm-providers">
              {sec.providers.map((p) => (
                <button key={p.name} className="pm-provider-btn">
                  <span className="pm-provider-icon">{p.icon}</span>
                  <span className="pm-provider-name">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
