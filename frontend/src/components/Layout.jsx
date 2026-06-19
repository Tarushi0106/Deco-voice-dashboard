import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import { fetchProfile } from "../api/auth.js";
import "./Layout.css";

const MAIN_NAV = [
  { key: "dashboard",  label: "Dashboard",           path: "/dashboard" },
  { key: "knowledge",  label: "Knowledge Base",       path: "/knowledge" },
  { key: "script",     label: "Script Management",    path: "/script" },
  { key: "campaign",   label: "Campaign Management",  path: "/campaign" },
  { key: "forwarding", label: "Forwarded Calls",      path: "/forwarding" },
  { key: "reports",    label: "Delivery Reports",     path: "/reports" },
  { key: "provider",   label: "Provider Management",  path: "/provider" },
];

const ADDON_NAV = [
  { key: "scriptwriter", label: "Script writer", path: "/scriptwriter" },
];

export default function Layout({ children, searchPlaceholder = "Search..." }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    fetchProfile()
      .then((p) => {
        const raw = p?.name || p?.email || "U";
        setInitials(raw[0].toUpperCase());
      })
      .catch(() => {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    });
  }, []);

  const activeKey =
    [...MAIN_NAV, ...ADDON_NAV].find((n) => location.pathname === n.path)?.key || "dashboard";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dv-shell">
      {/* ── Sidebar ── */}
      <aside className="dv-sidebar">
        <div className="dv-brand">
          <div className="dv-logo-row">
            <img src="/assets/logo%20.jpeg" alt="logo" className="dv-logo-icon-img" />
            <div className="dv-logo-text">
              <span className="dv-logo-deco">DECO</span>
              <span className="dv-logo-voice">Voice</span>
            </div>
          </div>
        </div>

        <div className="dv-nav-section">
          <span className="dv-nav-label">MAIN</span>
          {MAIN_NAV.map((item) => (
            <button
              key={item.key}
              className={`dv-nav-item${activeKey === item.key ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon
                name={item.key}
                size={16}
                color={activeKey === item.key ? "#fff" : "#9ca3af"}
              />
              {item.label}
            </button>
          ))}
        </div>

        <div className="dv-nav-section">
          <span className="dv-nav-label">GENERAL</span>
          <button className="dv-nav-item" onClick={logout}>
            <Icon name="settings" size={16} color="#9ca3af" />
            Settings
          </button>
        </div>

        <div className="dv-nav-section">
          <span className="dv-nav-label">ADD ON</span>
          {ADDON_NAV.map((item) => (
            <button
              key={item.key}
              className={`dv-nav-item${activeKey === item.key ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon
                name={item.key}
                size={16}
                color={activeKey === item.key ? "#fff" : "#9ca3af"}
              />
              {item.label}
            </button>
          ))}
        </div>

        <div className="dv-mascot">
          <img src="/assets/deco-image.png" alt="mascot" className="dv-mascot-img" />
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dv-main">
        <div className="dv-topbar">
          <div className="dv-search">
            <Icon name="search" size={15} color="#9ca3af" filled={false} />
            <input placeholder={searchPlaceholder} />
          </div>
          <div className="dv-avatar">{initials}</div>
        </div>

        <div className="dv-body">{children}</div>
      </div>
    </div>
  );
}
