import { useState } from "react";
import { sendOtp } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("tarushi.chaudhary@shaurryatele.com");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await sendOtp({ email });
      localStorage.setItem("otpEmail", email);
      if (result.otp) {
        localStorage.setItem("otpCode", result.otp);
      } else {
        localStorage.removeItem("otpCode");
      }
      setMessage(result.message || "OTP sent.");
      setOtpCode(result.otp || "");
      navigate("/verify-otp");
    } catch (err) {
      setError(err.error || "Unable to send OTP.");
      setMessage("");
      setOtpCode("");
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
        <p className="muted">Enter your email to receive an OTP</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

          {error && <p className="error-text">{error}</p>}
          {message && <p className="muted">{message}</p>}
          {otpCode && <p className="error-text">For local testing, your OTP is {otpCode}</p>}

          <button className="primary" type="submit">Send OTP</button>
        </form>

        <div className="small-note">By continuing, you agree to our Terms of services and Privacy Policy</div>
      </div>
    </div>
  );
}

