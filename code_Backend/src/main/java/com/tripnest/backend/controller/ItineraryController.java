package com.tripnest.backend.controller;

import com.tripnest.backend.dto.itinerary.ItineraryDayRequest;
import com.tripnest.backend.dto.itinerary.ItineraryDayResponse;
import com.tripnest.backend.dto.itinerary.ItineraryResponse;
import com.tripnest.backend.entity.User;
import com.tripnest.backend.repository.UserRepository;
import com.tripnest.backend.service.ItineraryService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/itinerary")
public class ItineraryController {

    private final ItineraryService itineraryService;
    private final UserRepository userRepository;

    public ItineraryController(
            ItineraryService itineraryService,
            UserRepository userRepository) {

        this.itineraryService = itineraryService;
        this.userRepository = userRepository;
    }

    // Create itinerary for a trip
    @PostMapping
    public ResponseEntity<ItineraryResponse> createItinerary(
            @PathVariable Long tripId,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        ItineraryResponse response =
                itineraryService.createItinerary(
                        tripId,
                        user.getId()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get itinerary for a trip
    @GetMapping
    public ResponseEntity<ItineraryResponse> getItinerary(
            @PathVariable Long tripId,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        ItineraryResponse response =
                itineraryService.getItinerary(
                        tripId,
                        user.getId()
                );

        return ResponseEntity.ok(response);
    }

    // Add a day to itinerary
    @PostMapping("/days")
    public ResponseEntity<ItineraryDayResponse> addDay(
            @PathVariable Long tripId,
            @Valid @RequestBody ItineraryDayRequest request,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        ItineraryDayResponse response =
                itineraryService.addDay(
                        tripId,
                        request,
                        user.getId()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get all itinerary days
    @GetMapping("/days")
    public ResponseEntity<List<ItineraryDayResponse>> getDays(
            @PathVariable Long tripId,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        List<ItineraryDayResponse> responses =
                itineraryService.getDays(
                        tripId,
                        user.getId()
                );

        return ResponseEntity.ok(responses);
    }

    private User getAuthenticatedUser(
            Authentication authentication) {

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }






        @PutMapping("/days/{dayId}")
        public ResponseEntity<ItineraryDayResponse> updateDay(
                @PathVariable Long tripId,
                @PathVariable Long dayId,
                @Valid @RequestBody ItineraryDayRequest request,
                Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        ItineraryDayResponse response =
                itineraryService.updateDay(
                        tripId,
                        dayId,
                        request,
                        user.getId()
                );

        return ResponseEntity.ok(response);
        }


        @DeleteMapping("/days/{dayId}")
        public ResponseEntity<Void> deleteDay(
                @PathVariable Long tripId,
                @PathVariable Long dayId,
                Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        itineraryService.deleteDay(
                tripId,
                dayId,
                user.getId()
        );

        return ResponseEntity.noContent().build();
        }
}