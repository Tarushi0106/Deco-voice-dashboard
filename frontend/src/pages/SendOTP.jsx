import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendOTP() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("otpEmail", email);
    navigate("/verify-otp");
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
        <p className="muted">Logged in as demo@troikatech.in</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

          <button className="primary" type="submit">Send OTP</button>
        </form>

        <div className="small-note">By continuing, you agree to our Terms of services and Privacy Policy</div>
      </div>
    </div>
  );
}
