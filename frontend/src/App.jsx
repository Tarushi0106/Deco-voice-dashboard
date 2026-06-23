import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";
import ScriptManagement from "./pages/ScriptManagement.jsx";
import CampaignManagement from "./pages/CampaignManagement.jsx";
import CampaignDetail from "./pages/CampaignDetail.jsx";
import ForwardedCalls from "./pages/ForwardedCalls.jsx";
import ForwardedCallDetail from "./pages/ForwardedCallDetail.jsx";
import DeliveryReports from "./pages/DeliveryReports.jsx";
import SendOTPPage from "./pages/SendOTPPage.jsx";
import ProviderManagement from "./pages/ProviderManagement.jsx";
import Layout from "./components/Layout.jsx";

function ComingSoon({ title }) {
  return (
    <Layout>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{title}</p>
        <p style={{ fontSize: 14, color: "#6b7280" }}>This page is coming soon.</p>
      </div>
    </Layout>
  );
}
import VerifyOTP from "./pages/VerifyOTP.jsx";
import VerificationCompleted from "./pages/VerificationCompleted.jsx";
import OTPError from "./pages/OTPError.jsx";
import Settings from "./pages/Settings.jsx";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/send-otp" element={<SendOTPPage />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/verified" element={<VerificationCompleted />} />
      <Route path="/otp-error" element={<OTPError />} />
      <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/knowledge" element={<PrivateRoute><KnowledgeBase /></PrivateRoute>} />
      <Route path="/script" element={<PrivateRoute><ScriptManagement /></PrivateRoute>} />
      <Route path="/campaign" element={<PrivateRoute><CampaignManagement /></PrivateRoute>} />
      <Route path="/campaign/:id" element={<PrivateRoute><CampaignDetail /></PrivateRoute>} />
      <Route path="/forwarding" element={<PrivateRoute><ForwardedCalls /></PrivateRoute>} />
      <Route path="/forwarding/:id" element={<PrivateRoute><ForwardedCallDetail /></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><DeliveryReports /></PrivateRoute>} />
      <Route path="/provider" element={<PrivateRoute><ProviderManagement /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/scriptwriter" element={<PrivateRoute><ComingSoon title="Script Writer" /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
