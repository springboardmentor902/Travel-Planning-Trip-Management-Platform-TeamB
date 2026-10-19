import apiClient from "./apiClient";

/**
 * Authentication API Service (Milestone 1)
 */
export async function registerUser(userData) {
  const response = await apiClient.post("/api/auth/register", userData);
  return response.data;
}

export async function loginUser(credentials) {
  const response = await apiClient.post("/api/auth/login", credentials);
  return response.data;
}
