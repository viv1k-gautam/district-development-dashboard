import {
  getAccessToken, getRefreshToken, updateAccessToken, logout,
} from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

// Django ke errors ({email: ["..."], password: ["...", "..."]}) ko ek message mein badalta hai
function errorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data.detail === "string") return data.detail;
  const messages = Object.values(data)
    .flat()
    .filter((m) => typeof m === "string");
  return messages.length ? messages.join(" ") : fallback;
}

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  const res = await fetch(`${BASE_URL}/api/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) return false;

  const data = await res.json();
  updateAccessToken(data.access);
  return true;
}

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const send = () =>
    fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(auth && getAccessToken()
          ? { Authorization: `Bearer ${getAccessToken()}` }
          : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

  let res;
  try {
    res = await send();
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  // Token expire ho gaya: ek baar refresh karke dobara try karo
  if (res.status === 401 && auth) {
    if (await refreshAccessToken()) {
      res = await send();
    }
    if (res.status === 401) {
      logout();
      window.location.assign("/login");
    }
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // khali response
  }

  if (!res.ok) {
    throw new Error(errorMessage(data, "Something went wrong. Please try again."));
  }
  return data;
}