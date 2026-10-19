import apiClient from "./apiClient";

/**
 * Destination & Attraction API Service (Milestone 2 Task 11)
 */
export const destinationService = {
  // Get all destinations
  async getAllDestinations() {
    const response = await apiClient.get("/api/destinations");
    return response.data;
  },

  // Get a single destination by ID
  async getDestinationById(id) {
    const response = await apiClient.get(`/api/destinations/${id}`);
    return response.data;
  },

  // Get all attractions for a specific destination
  async getAttractionsByDestination(destinationId) {
    const response = await apiClient.get(
      `/api/destinations/${destinationId}/attractions`
    );
    return response.data;
  },
};

export default destinationService;
