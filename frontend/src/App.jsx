import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";
import ScriptManagement from "./pages/ScriptManagement.jsx";
import CampaignManagement from "./pages/CampaignManagement.jsx";
import CampaignDetail from "./pages/CampaignDetail.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import VerificationCompleted from "./pages/VerificationCompleted.jsx";
import OTPError from "./pages/OTPError.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/verified" element={<VerificationCompleted />} />
      <Route path="/otp-error" element={<OTPError />} />
      <Route path="/onboarding" element={token ? <Onboarding /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/knowledge" element={token ? <KnowledgeBase /> : <Navigate to="/login" />} />
      <Route path="/script" element={token ? <ScriptManagement /> : <Navigate to="/login" />} />
      <Route path="/campaign" element={token ? <CampaignManagement /> : <Navigate to="/login" />} />
      <Route path="/campaign/:id" element={token ? <CampaignDetail /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
