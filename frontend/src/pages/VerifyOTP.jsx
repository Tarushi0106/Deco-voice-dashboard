import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp, sendOtp } from "../api/auth.js";

function OTPInput({ value, onChange }) {
  return (
    <input
      type="text"
      maxLength="1"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
      className="otp-input"
    />
  );
}

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [otpCode, setOtpCode] = useState(localStorage.getItem("otpCode") || "");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendError, setResendError] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("otpEmail") || "";

  const handleChange = (index, value) => {
    const next = [...otp];
    next[index] = value;
    setOtp(next);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const code = otp.join("");
      const result = await verifyOtp({ email, code });
      localStorage.setItem("token", result.token);
      navigate("/verified", { state: { onboarded: result.user.onboarded } });
    } catch (err) {
      navigate("/otp-error", { state: { message: err.error || "Invalid OTP.", email } });
    }
  };

  useEffect(() => {
    if (!resendCountdown) return;
    const timer = setTimeout(() => setResendCountdown((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleResend = async () => {
    try {
      setResendError("");
      setMessage("");
      setOtpCode("");
      const result = await sendOtp({ email });
      setMessage(result.message || "OTP resent.");
      if (result.otp) {
        localStorage.setItem("otpCode", result.otp);
        setOtpCode(result.otp);
      } else {
        localStorage.removeItem("otpCode");
        setOtpCode("");
      }
      setResendCountdown(60);
    } catch (err) {
      setResendError(err.error || "Unable to resend OTP.");
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
          <h2>DecoVoice</h2>
          <p className="muted">Powered by Dewin solution</p>
        </div>

        <h3>Welcome to DecoVoice</h3>
        <p className="muted">Enter the OTP sent to {email}</p>

        <form onSubmit={handleSubmit} className="auth-form otp-form">
          <label>Email</label>
          <input value={email} type="email" readOnly />

          <label>Enter OTP</label>
          <div className="otp-row">
            {otp.map((value, index) => (
              <OTPInput key={index} value={value} onChange={(value) => handleChange(index, value)} />
            ))}
          </div>

          {message && <p className="muted">{message}</p>}
          {otpCode && <p className="error-text">For local testing, your OTP is {otpCode}</p>}

          <button className="primary" type="submit">Verify OTP</button>
        </form>

        <div className="otp-meta">
          <button type="button" className="link" onClick={handleResend} disabled={resendCountdown > 0 || !email}>
            {resendCountdown > 0 ? `Resend OTP in 00:${String(resendCountdown).padStart(2, "0")}` : "Resend OTP"}
          </button>
          <button type="button" className="link" onClick={() => navigate("/login")}>Change email</button>
        </div>

        {resendError && <p className="error-text">{resendError}</p>}

        <div className="small-note">By continuing, you agree to our Terms of services and Privacy Policy</div>
      </div>
    </div>
  );
}
