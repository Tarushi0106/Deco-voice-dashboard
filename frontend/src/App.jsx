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

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/verified" element={<VerificationCompleted />} />
      <Route path="/otp-error" element={<OTPError />} />
      <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/knowledge" element={<PrivateRoute><KnowledgeBase /></PrivateRoute>} />
      <Route path="/script" element={<PrivateRoute><ScriptManagement /></PrivateRoute>} />
      <Route path="/campaign" element={<PrivateRoute><CampaignManagement /></PrivateRoute>} />
      <Route path="/campaign/:id" element={<PrivateRoute><CampaignDetail /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
