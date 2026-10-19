import apiClient from "./apiClient";

/**
 * Trip Management API Service (Milestone 2 Tasks 7 & 8)
 */
export const tripService = {
  // Get all trips owned by the authenticated user
  async getMyTrips() {
    const response = await apiClient.get("/api/trips");
    return response.data;
  },

  // Get a single trip by ID (validates ownership)
  async getTripById(tripId) {
    const response = await apiClient.get(`/api/trips/${tripId}`);
    return response.data;
  },

  // Create a new trip
  async createTrip(tripData) {
    const response = await apiClient.post("/api/trips", tripData);
    return response.data;
  },

  // Update an existing trip by ID
  async updateTrip(tripId, tripData) {
    const response = await apiClient.put(`/api/trips/${tripId}`, tripData);
    return response.data;
  },

  // Delete a trip by ID
  async deleteTrip(tripId) {
    const response = await apiClient.delete(`/api/trips/${tripId}`);
    return response.data;
  },
};

export default tripService;
