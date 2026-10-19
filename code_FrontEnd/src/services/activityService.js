import apiClient from "./apiClient";

/**
 * Activity Scheduling API Service (Milestone 2 Task 10)
 */
export const activityService = {
  // Get all activities for a specific itinerary day
  async getActivitiesByDay(itineraryDayId) {
    const response = await apiClient.get(
      `/api/activities/day/${itineraryDayId}`
    );
    return response.data;
  },

  // Get a single activity by ID
  async getActivityById(activityId) {
    const response = await apiClient.get(`/api/activities/${activityId}`);
    return response.data;
  },

  // Create a new activity
  async createActivity(activityData) {
    const response = await apiClient.post("/api/activities", activityData);
    return response.data;
  },

  // Update an existing activity
  async updateActivity(activityId, activityData) {
    const response = await apiClient.put(
      `/api/activities/${activityId}`,
      activityData
    );
    return response.data;
  },

  // Delete an activity
  async deleteActivity(activityId) {
    const response = await apiClient.delete(`/api/activities/${activityId}`);
    return response.data;
  },
};

export default activityService;
