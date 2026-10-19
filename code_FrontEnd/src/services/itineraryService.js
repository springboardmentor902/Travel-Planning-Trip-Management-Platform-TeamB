import apiClient from "./apiClient";

/**
 * Itinerary Management API Service (Milestone 2 Task 9)
 */
export const itineraryService = {
  // Get the itinerary for a trip
  async getItinerary(tripId) {
    const response = await apiClient.get(`/api/trips/${tripId}/itinerary`);
    return response.data;
  },

  // Create an itinerary for a trip
  async createItinerary(tripId) {
    const response = await apiClient.post(`/api/trips/${tripId}/itinerary`);
    return response.data;
  },

  // Ensures an itinerary exists for the trip (creates if not existing)
  async ensureItinerary(tripId) {
    try {
      return await this.getItinerary(tripId);
    } catch {
      try {
        return await this.createItinerary(tripId);
      } catch {
        // If race condition or already exists, re-fetch
        return await this.getItinerary(tripId);
      }
    }
  },

  // Get all days for a trip itinerary
  async getDays(tripId) {
    const response = await apiClient.get(`/api/trips/${tripId}/itinerary/days`);
    return response.data;
  },

  // Add a day to the itinerary
  async addDay(tripId, dayData) {
    const response = await apiClient.post(
      `/api/trips/${tripId}/itinerary/days`,
      dayData
    );
    return response.data;
  },

  // Update a day
  async updateDay(tripId, dayId, dayData) {
    const response = await apiClient.put(
      `/api/trips/${tripId}/itinerary/days/${dayId}`,
      dayData
    );
    return response.data;
  },

  // Delete a day
  async deleteDay(tripId, dayId) {
    const response = await apiClient.delete(
      `/api/trips/${tripId}/itinerary/days/${dayId}`
    );
    return response.data;
  },
};

export default itineraryService;
