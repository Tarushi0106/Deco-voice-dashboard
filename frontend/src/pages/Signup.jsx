import { useState } from "react";
import { signup } from "../api/auth.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signup({ email, password, name });
      localStorage.setItem("token", result.token);
      navigate("/onboarding");
    } catch (err) {
      setError(err.error || "Signup failed.");
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
        <p className="muted">Log in to manage your AI-powered calling system</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />

          <label>Name (optional)</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" />

          {error && <p className="error-text">{error}</p>}

          <button className="primary" type="submit">Continue</button>
        </form>

        <div className="small-note">By continuing, you agree to our Terms of services and Privacy Policy</div>
      </div>
    </div>
  );
}
