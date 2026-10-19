package com.tripnest.backend.controller;

import com.tripnest.backend.dto.activity.ActivityRequestDTO;
import com.tripnest.backend.dto.activity.ActivityResponseDTO;
import com.tripnest.backend.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ActivityResponseDTO> createActivity(
            @Valid @RequestBody ActivityRequestDTO requestDTO) {

        ActivityResponseDTO responseDTO =
                activityService.createActivity(requestDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }



        // Get all activities planned for a specific itinerary day
        @GetMapping("/day/{itineraryDayId}")
        public ResponseEntity<List<ActivityResponseDTO>> getActivitiesByItineraryDay(
                @PathVariable Long itineraryDayId) {

        List<ActivityResponseDTO> activities =
                activityService.getActivitiesByItineraryDay(itineraryDayId);

        return ResponseEntity.ok(activities);
        }

        // Get one activity by its ID
        @GetMapping("/{activityId}")
        public ResponseEntity<ActivityResponseDTO> getActivityById(
                @PathVariable Long activityId) {

                ActivityResponseDTO responseDTO =
                        activityService.getActivityById(activityId);

                return ResponseEntity.ok(responseDTO);
        }


        // Update an existing activity
        @PutMapping("/{activityId}")
        public ResponseEntity<ActivityResponseDTO> updateActivity(
                @PathVariable Long activityId,
                @Valid @RequestBody ActivityRequestDTO requestDTO) {

                ActivityResponseDTO responseDTO =
                        activityService.updateActivity(activityId, requestDTO);

                return ResponseEntity.ok(responseDTO);
        }

        // Delete an existing activity
        @DeleteMapping("/{activityId}")
        public ResponseEntity<Void> deleteActivity(
                @PathVariable Long activityId) {

                activityService.deleteActivity(activityId);

                return ResponseEntity.noContent().build();
        }



}

