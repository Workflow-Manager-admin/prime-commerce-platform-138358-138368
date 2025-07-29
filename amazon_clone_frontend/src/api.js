const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

/**
 * PUBLIC_INTERFACE
 * Helper to make GET requests to backend.
 */
export async function apiGet(endpoint, opts = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    credentials: "include",
    ...opts,
    method: "GET",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * Helper for POST requests.
 */
export async function apiPost(endpoint, body, opts = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    credentials: "include",
    ...opts,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Additional helpers (PUT, DELETE) can be added as needed.
