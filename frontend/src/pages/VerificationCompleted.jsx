import { useLocation, useNavigate } from "react-router-dom";

export default function VerificationCompleted() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const onboarded = location.state?.onboarded;

  const handleContinue = () => {
    navigate(onboarded === false ? "/onboarding" : "/dashboard");
  };

  return (
    <div className="verified-overlay">
      <div className="verified-modal">
        <img
          src="/assets/deco-image.png"
          alt="verified"
          className="verified-mascot"
        />
        <h2 className="verified-heading">Verification completed</h2>
        <button className="primary verified-btn" onClick={handleContinue}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
