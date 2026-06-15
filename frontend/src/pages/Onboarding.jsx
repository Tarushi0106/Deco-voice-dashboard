import { useState, useEffect } from "react";
import { onboardUser, fetchProfile } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().then((profile) => {
      if (profile.onboarded) navigate("/dashboard");
      if (profile?.name) setName(profile.name);
    }).catch(() => {
      navigate("/login");
    });
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onboardUser({ name });
      navigate("/dashboard");
    } catch (err) {
      setError(err.error || "Onboarding failed.");
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

        <h3>Tell us about yourself</h3>
        <p className="muted">A little information to get your dashboard ready</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />

          {error && <p className="error-text">{error}</p>}

          <button className="primary" type="submit">Continue</button>
        </form>

        <div className="small-note">By continuing, you agree to our Terms of services and Privacy Policy</div>
      </div>
    </div>
  );
}
