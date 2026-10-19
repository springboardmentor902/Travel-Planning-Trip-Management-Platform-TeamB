
package com.tripnest.backend.controller;

import com.tripnest.backend.dto.trip.TripRequest;
import com.tripnest.backend.dto.trip.TripResponse;
import com.tripnest.backend.entity.Trip;
import com.tripnest.backend.entity.User;
import com.tripnest.backend.repository.UserRepository;
import com.tripnest.backend.service.TripService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;
    private final UserRepository userRepository;

    public TripController(
            TripService tripService,
            UserRepository userRepository) {

        this.tripService = tripService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<TripResponse> createTrip(
            @Valid @RequestBody TripRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = new Trip();

        trip.setTitle(request.getTitle());
        trip.setDestination(request.getDestination());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setNumberOfTravelers(request.getNumberOfTravelers());
        trip.setStatus(request.getStatus());
        trip.setOwner(owner);

        Trip savedTrip = tripService.saveTrip(trip);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(convertToResponse(savedTrip));
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getMyTrips(
            Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Trip> trips = tripService.getTripsByOwner(owner.getId());

        List<TripResponse> responses = trips.stream()
                .map(this::convertToResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

//     @GetMapping("/{tripId}")
//     public ResponseEntity<TripResponse> getTripById(
//             @PathVariable Long tripId) {

//         Trip trip = tripService.getTripById(tripId)
//                 .orElseThrow(() -> new RuntimeException("Trip not found"));

//         return ResponseEntity.ok(convertToResponse(trip));
//     }


        @GetMapping("/{tripId}")
        public ResponseEntity<TripResponse> getTripById(
                @PathVariable Long tripId,
                Authentication authentication) {

                String email = authentication.getName();

                User owner = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                Trip trip = tripService.getTripById(tripId)
                        .orElseThrow(() -> new RuntimeException("Trip not found"));

                boolean isOwner = tripService.isTripOwnedByUser(
                        tripId,
                        owner.getId()
                );

                if (!isOwner) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }

                return ResponseEntity.ok(convertToResponse(trip));
        }

        // update trip by id  with authentication
        @PutMapping("/{tripId}")
        public ResponseEntity<TripResponse> updateTrip(
                @PathVariable Long tripId,
                @Valid @RequestBody TripRequest request,
                Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip existingTrip = tripService.getTripById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        boolean isOwner = tripService.isTripOwnedByUser(
                tripId,
                owner.getId()
        );

        if (!isOwner) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        existingTrip.setTitle(request.getTitle());
        existingTrip.setDestination(request.getDestination());
        existingTrip.setStartDate(request.getStartDate());
        existingTrip.setEndDate(request.getEndDate());
        existingTrip.setNumberOfTravelers(request.getNumberOfTravelers());
        existingTrip.setStatus(request.getStatus());

        Trip updatedTrip = tripService.saveTrip(existingTrip);

        return ResponseEntity.ok(convertToResponse(updatedTrip));
        }






        @DeleteMapping("/{tripId}")
        public ResponseEntity<Void> deleteTrip(
                @PathVariable Long tripId,
                Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = tripService.getTripById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        boolean isOwner = tripService.isTripOwnedByUser(
                tripId,
                owner.getId()
        );

        if (!isOwner) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        tripService.deleteTrip(tripId);

        return ResponseEntity.noContent().build();
        }



        // v1 ... wtt authentication
//     @DeleteMapping("/{tripId}")
//     public ResponseEntity<Void> deleteTrip(
//             @PathVariable Long tripId) {

//         tripService.deleteTrip(tripId);

//         return ResponseEntity.noContent().build();
//     }

    private TripResponse convertToResponse(Trip trip) {

        TripResponse response = new TripResponse();

        response.setId(trip.getId());
        response.setTitle(trip.getTitle());
        response.setDestination(trip.getDestination());
        response.setStartDate(trip.getStartDate());
        response.setEndDate(trip.getEndDate());
        response.setNumberOfTravelers(trip.getNumberOfTravelers());
        response.setStatus(trip.getStatus());
        response.setOwnerId(trip.getOwner().getId());

        return response;
    }
}

