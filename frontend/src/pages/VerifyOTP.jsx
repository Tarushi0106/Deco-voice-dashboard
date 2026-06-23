import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp, sendOtp } from "../api/auth.js";

export default function VerifyOTP() {
  const [otp, setOtp]               = useState(["", "", "", ""]);
  const [otpError, setOtpError]     = useState("");
  const [message, setMessage]       = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [loading, setLoading]       = useState(false);
  const inputRefs                   = [useRef(), useRef(), useRef(), useRef()];
  const navigate                    = useNavigate();
  const email                       = localStorage.getItem("otpEmail") || "";

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setOtpError("");
    if (value && index < 3) inputRefs[index + 1].current?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) return;
    setLoading(true);
    setOtpError("");
    try {
      const result = await verifyOtp({ email, code });
      localStorage.setItem("token", result.token);
      navigate("/verified", { state: { onboarded: result.user.onboarded } });
    } catch (err) {
      setOtpError(err.error || "OTP entered is incorrect.");
      setOtp(["", "", "", ""]);
      setTimeout(() => inputRefs[0].current?.focus(), 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!resendCountdown) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleResend = async () => {
    try {
      setOtpError("");
      setMessage("");
      await sendOtp({ email });
      setMessage("New OTP sent to your email.");
      setResendCountdown(60);
    } catch (err) {
      setOtpError(err.error || "Unable to resend OTP.");
    }
  };

  const canVerify = otp.join("").length === 4 && !loading;

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="hero-inner">
          <img src="/assets/deco-image.png" alt="hero" className="hero-img" />
        </div>
      </div>

      <div className="auth-card" style={{ position: "relative" }}>
        <button className="otp-back-btn" onClick={() => navigate("/login")} type="button">
          &#8249;
        </button>

        <div className="brand">
          <img src="/assets/logo .jpeg" alt="DecoVoice" style={{ height: "52px", objectFit: "contain" }} />
        </div>

        <h3>Welcome to DecoVoice</h3>
        <p className="muted">Enter the OTP sent to {email}</p>

        <form onSubmit={handleSubmit} className="auth-form otp-form">
          <label>Email</label>
          <input value={email} type="email" readOnly style={{ background: "#f9fafb", color: "#6b7280" }} />

          <label>Enter OTP</label>
          <div className="otp-row">
            {otp.map((val, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`otp-input${otpError ? " otp-input-error" : ""}`}
              />
            ))}
          </div>

          {otpError && (
            <div className="otp-error-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {otpError}
            </div>
          )}

          {message && <p className="muted" style={{ textAlign: "left", marginBottom: 0 }}>{message}</p>}

          <button className="primary" type="submit" disabled={!canVerify}
            style={{ opacity: canVerify ? 1 : 0.45, cursor: canVerify ? "pointer" : "not-allowed" }}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="otp-meta">
          <button type="button" className="link otp-resend-link"
            onClick={handleResend} disabled={resendCountdown > 0 || !email}>
            {resendCountdown > 0
              ? <>Resend OTP in <span className="otp-countdown">00:{String(resendCountdown).padStart(2, "0")}</span></>
              : "Resend OTP"}
          </button>
          <button type="button" className="link" onClick={() => navigate("/login")}>Change email</button>
        </div>

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
