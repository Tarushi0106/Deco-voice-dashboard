const API_BASE = "http://localhost:4000/api";

const MOCK_EMAIL = "admin@gmail.com";
const MOCK_OTP = "1234";
const MOCK_TOKEN = "mock-admin-token-deco-voice";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw { ...data, _status: response.status };
  return data;
}

export const signup = (payload) => request("/auth/signup", { method: "POST", body: payload });

export const login = (payload) => {
  if (payload.email === MOCK_EMAIL) {
    return Promise.resolve({ message: "OTP sent to " + MOCK_EMAIL, otp: MOCK_OTP });
  }
  return request("/auth/login", { method: "POST", body: payload });
};

export const sendOtp = (payload) => {
  if (payload.email === MOCK_EMAIL) {
    return Promise.resolve({ message: "OTP sent to " + MOCK_EMAIL, otp: MOCK_OTP });
  }
  return request("/auth/send-otp", { method: "POST", body: payload });
};

export const verifyOtp = (payload) => {
  if (payload.email === MOCK_EMAIL) {
    if (payload.code === MOCK_OTP) {
      return Promise.resolve({ token: MOCK_TOKEN, user: { onboarded: true } });
    }
    return Promise.reject({ error: "Invalid OTP. Use 1234 for the admin account." });
  }
  return request("/auth/verify-otp", { method: "POST", body: payload });
};

export const fetchProfile = () => {
  if (localStorage.getItem("token") === MOCK_TOKEN) {
    return Promise.resolve({ id: 1, email: MOCK_EMAIL, name: "Admin", onboarded: true });
  }
  return request("/user/profile");
};

export const onboardUser = (payload) => request("/user/onboard", { method: "POST", body: payload });
