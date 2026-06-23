import Layout from "../components/Layout.jsx";
import "./ProviderManagement.css";

const SECTIONS = [
  {
    title: "Telephony",
    subtitle: "Integrated providers",
    providers: [
      { name: "Exotel", img: "/assets/Exotel Agent.png" },
      { name: "Tata",   img: "/assets/Tata Steel Right to Work.png" },
    ],
  },
  {
    title: "WhatsApp",
    subtitle: "Integrate WhatsApp to send messages",
    providers: [
      { name: "WhatsApp", img: "/assets/ic_baseline-whatsapp.png" },
    ],
  },
  {
    title: "CRM",
    subtitle: "Integrated CRMs",
    providers: [
      { name: "Salesforce", img: "/assets/devicon_salesforce.png" },
      { name: "Zoho",       img: "/assets/logos_zoho.png" },
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
                  <img src={p.img} alt={p.name} className="pm-provider-img" />
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
