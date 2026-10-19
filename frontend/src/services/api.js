const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("tripnest_token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getTrips: () => request("/trips"),
  getTrip: (id) => request(`/trips/${id}`),
  createTrip: (trip) => request("/trips", { method: "POST", body: JSON.stringify(trip) }),
  getDestinations: () => request("/destinations"),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) })
};
