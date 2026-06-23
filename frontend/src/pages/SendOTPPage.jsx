import { useState } from "react";
import { sendOtp } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export default function SendOTPPage() {
  const loginEmail          = localStorage.getItem("loginEmail") || "";
  const [email, setEmail]   = useState(loginEmail);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const navigate            = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      await sendOtp({ email: email.trim() });
      localStorage.setItem("otpEmail", email.trim());
      navigate("/verify-otp");
    } catch (err) {
      setError(err.error || "Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="hero-inner">
          <img src="/assets/deco-image.png" alt="hero" className="hero-img" />
        </div>
      </div>

      <div className="auth-card">
        <div className="brand">
          <img src="/assets/logo .jpeg" alt="DecoVoice" style={{ height: "52px", objectFit: "contain" }} />
        </div>

        <h3 style={{ marginTop: "8px" }}>Welcome to DecoVoice</h3>
        {loginEmail && (
          <p className="muted">Logged in as {loginEmail}</p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email to receive OTP"
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button
            className="primary"
            type="submit"
            disabled={!email.trim() || loading}
            style={{ opacity: email.trim() && !loading ? 1 : 0.45, cursor: email.trim() && !loading ? "pointer" : "not-allowed" }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="small-note">
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Terms of services</a>
          {" "}and{" "}
          <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
