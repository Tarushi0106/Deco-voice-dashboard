import { useState } from "react";
import { login } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login({ email, password });
      localStorage.setItem("otpEmail", email);
      if (result.otp) {
        localStorage.setItem("otpCode", result.otp);
      } else {
        localStorage.removeItem("otpCode");
      }
      navigate("/verify-otp");
    } catch (err) {
      setError(err.error || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim() && password.trim() && !loading;

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
        <p className="muted">Log in to manage your AI-powered calling system</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Username</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Username"
            required
          />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button
            className="primary"
            type="submit"
            disabled={!canSubmit}
            style={{ opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "not-allowed" }}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <div className="small-note">
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "var(--muted)" }}>Terms of services</a> and{" "}
          <a href="#" style={{ color: "var(--muted)" }}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

