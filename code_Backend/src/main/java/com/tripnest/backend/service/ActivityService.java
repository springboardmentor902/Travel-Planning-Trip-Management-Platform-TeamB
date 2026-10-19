
package com.tripnest.backend.service;

import com.tripnest.backend.dto.activity.ActivityRequestDTO;
import com.tripnest.backend.dto.activity.ActivityResponseDTO;
import com.tripnest.backend.entity.Activity;
import com.tripnest.backend.entity.ItineraryDay;
import com.tripnest.backend.repository.ActivityRepository;
import com.tripnest.backend.repository.ItineraryDayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ItineraryDayRepository itineraryDayRepository;

    public ActivityResponseDTO createActivity(ActivityRequestDTO requestDTO) {

        ItineraryDay itineraryDay = itineraryDayRepository
                .findById(requestDTO.getItineraryDayId())
                .orElseThrow(() -> new RuntimeException("Itinerary day not found"));

        Activity activity = new Activity();

        activity.setTitle(requestDTO.getTitle());
        activity.setDescription(requestDTO.getDescription());
        activity.setCategory(requestDTO.getCategory());
        activity.setStartTime(requestDTO.getStartTime());
        activity.setEndTime(requestDTO.getEndTime());
        activity.setLocation(requestDTO.getLocation());
        activity.setBookingDetails(requestDTO.getBookingDetails());
        activity.setChecklist(requestDTO.getChecklist());
        activity.setItineraryDay(itineraryDay);

        Activity savedActivity = activityRepository.save(activity);

        return new ActivityResponseDTO(
                savedActivity.getId(),
                savedActivity.getTitle(),
                savedActivity.getDescription(),
                savedActivity.getCategory(),
                savedActivity.getStartTime(),
                savedActivity.getEndTime(),
                savedActivity.getLocation(),
                savedActivity.getBookingDetails(),
                savedActivity.getChecklist(),
                savedActivity.getItineraryDay().getId()
        );
    }



    // Get all activities belonging to a specific itinerary day
    public List<ActivityResponseDTO> getActivitiesByItineraryDay(Long itineraryDayId) {

        List<Activity> activities =
                activityRepository.findByItineraryDayId(itineraryDayId);

        return activities.stream()
                .map(activity -> new ActivityResponseDTO(
                        activity.getId(),
                        activity.getTitle(),
                        activity.getDescription(),
                        activity.getCategory(),
                        activity.getStartTime(),
                        activity.getEndTime(),
                        activity.getLocation(),
                        activity.getBookingDetails(),
                        activity.getChecklist(),
                        activity.getItineraryDay().getId()
                ))
                .toList();
    }


        // Get one activity using its ID
        public ActivityResponseDTO getActivityById(Long activityId) {

                Activity activity = activityRepository.findById(activityId)
                        .orElseThrow(() ->
                                new RuntimeException("Activity not found"));

                return new ActivityResponseDTO(
                        activity.getId(),
                        activity.getTitle(),
                        activity.getDescription(),
                        activity.getCategory(),
                        activity.getStartTime(),
                        activity.getEndTime(),
                        activity.getLocation(),
                        activity.getBookingDetails(),
                        activity.getChecklist(),
                        activity.getItineraryDay().getId()
                );
        }


        // Update an existing activity
        public ActivityResponseDTO updateActivity(
                Long activityId,
                ActivityRequestDTO requestDTO) {

                Activity activity = activityRepository.findById(activityId)
                        .orElseThrow(() ->
                                new RuntimeException("Activity not found"));

                ItineraryDay itineraryDay = itineraryDayRepository
                        .findById(requestDTO.getItineraryDayId())
                        .orElseThrow(() ->
                                new RuntimeException("Itinerary day not found"));

                activity.setTitle(requestDTO.getTitle());
                activity.setDescription(requestDTO.getDescription());
                activity.setCategory(requestDTO.getCategory());
                activity.setStartTime(requestDTO.getStartTime());
                activity.setEndTime(requestDTO.getEndTime());
                activity.setLocation(requestDTO.getLocation());
                activity.setBookingDetails(requestDTO.getBookingDetails());
                activity.setChecklist(requestDTO.getChecklist());
                activity.setItineraryDay(itineraryDay);

                Activity updatedActivity = activityRepository.save(activity);

                return new ActivityResponseDTO(
                        updatedActivity.getId(),
                        updatedActivity.getTitle(),
                        updatedActivity.getDescription(),
                        updatedActivity.getCategory(),
                        updatedActivity.getStartTime(),
                        updatedActivity.getEndTime(),
                        updatedActivity.getLocation(),
                        updatedActivity.getBookingDetails(),
                        updatedActivity.getChecklist(),
                        updatedActivity.getItineraryDay().getId()
                );
        }




        // Delete an activity by its ID
        public void deleteActivity(Long activityId) {

                Activity activity = activityRepository.findById(activityId)
                        .orElseThrow(() ->
                                new RuntimeException("Activity not found"));

                activityRepository.delete(activity);
        }



}









//----------------------------------------

// package com.tripnest.backend.service;

// import com.tripnest.backend.repository.ActivityRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class ActivityService {

//     private final ActivityRepository activityRepository;
// }
