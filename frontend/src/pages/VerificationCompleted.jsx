import { useLocation, useNavigate } from "react-router-dom";

export default function VerificationCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  const onboarded = location.state?.onboarded;

  const handleContinue = () => {
    if (onboarded === false) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ textAlign: "center", maxWidth: "520px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <img
            src="/assets/deco-image.png"
            alt="verification completed"
            style={{ width: "120px", height: "120px" }}
          />
        </div>

        <h2 style={{ margin: "0 0 10px" }}>Verification completed</h2>
        <p style={{ color: "#6b7280", margin: "0 0 28px" }}>
          Your identity has been verified successfully.
        </p>

        <button className="primary" style={{ width: "100%" }} onClick={handleContinue}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
