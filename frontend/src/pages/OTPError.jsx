import { useLocation, useNavigate } from "react-router-dom";

export default function OTPError() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "OTP entered is incorrect.";
  const email = location.state?.email || "";

  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ textAlign: "center", maxWidth: "520px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <img src="/assets/deco-image.png" alt="otp error" style={{ width: "120px", height: "120px" }} />
        </div>

        <h2 style={{ margin: "0 0 10px" }}>OTP entered is incorrect</h2>
        <p style={{ color: "#ef4444", margin: "0 0 18px" }}>{message}</p>
        {email && <p style={{ color: "#6b7280", margin: "0 0 24px" }}>Try again for {email}</p>}

        <button className="primary" style={{ width: "100%", marginBottom: "12px" }} onClick={() => navigate("/verify-otp")}>Retry OTP</button>
        <button className="link" type="button" onClick={() => navigate("/login")}>Change email</button>
      </div>
    </div>
  );
}
