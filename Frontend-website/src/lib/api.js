import { API_BASE_URL } from "@/lib/site";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function request(path, { method = "GET", body, headers = {}, signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
    ...(method === "GET" || method === "HEAD" ? {} : {}),
    // Always hit the network: a revalidated 304 has no body, and the API is
    // dynamic, so a cached copy only ever produces stale or failed requests.
    cache: "no-store",
  });

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && data.message
        ? data.message
        : `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};

export function createAppointment(payload, options) {
  return api.post("/appointments", payload, options);
}
