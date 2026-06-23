const API_BASE = "http://localhost:4000/api";

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

export const signup    = (payload) => request("/auth/signup",     { method: "POST", body: payload });
export const login     = (payload) => request("/auth/login",      { method: "POST", body: payload });
export const sendOtp   = (payload) => request("/auth/send-otp",   { method: "POST", body: payload });
export const verifyOtp = (payload) => request("/auth/verify-otp", { method: "POST", body: payload });
export const fetchProfile  = ()        => request("/user/profile");
export const onboardUser   = (payload) => request("/user/onboard", { method: "POST", body: payload });
