package com.tripnest.controller;

import com.tripnest.dto.TripRequest;
import com.tripnest.entity.Trip;
import com.tripnest.service.TripService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    // GET /api/trips/{id}
    // View complete trip details
    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTrip(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        Trip trip = tripService.getTripById(id, email);

        return ResponseEntity.ok(trip);
    }

    // PUT /api/trips/{id}
    // Edit trip
    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(
            @PathVariable Long id,
            @Valid @RequestBody TripRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Trip updatedTrip = new Trip();

        updatedTrip.setTitle(request.getTitle());
        updatedTrip.setDestination(request.getDestination());
        updatedTrip.setStartDate(request.getStartDate());
        updatedTrip.setEndDate(request.getEndDate());
        updatedTrip.setDescription(request.getDescription());
        updatedTrip.setBudget(request.getBudget());

        Trip result =
                tripService.updateTrip(
                        id,
                        email,
                        updatedTrip
                );

        return ResponseEntity.ok(result);
    }

    // DELETE /api/trips/{id}
    // Delete trip
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        tripService.deleteTrip(id, email);

        return ResponseEntity.noContent().build();
    }
}