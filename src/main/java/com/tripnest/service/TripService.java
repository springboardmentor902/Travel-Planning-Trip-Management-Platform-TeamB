package com.tripnest.service;

import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.repository.TripRepository;
import com.tripnest.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    public TripService(
            TripRepository tripRepository,
            UserRepository userRepository) {

        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

    // Get trip details
    public Trip getTripById(Long tripId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return tripRepository.findByIdAndUserId(
                tripId,
                user.getId()
        ).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Trip not found or you are not authorized to access this trip."
                ));
    }

    // Update trip
    public Trip updateTrip(
            Long tripId,
            String email,
            Trip updatedTrip) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Trip existingTrip =
                tripRepository.findByIdAndUserId(
                        tripId,
                        user.getId()
                ).orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Trip not found or you are not authorized to edit this trip."
                        ));

        existingTrip.setTitle(updatedTrip.getTitle());
        existingTrip.setDestination(updatedTrip.getDestination());
        existingTrip.setStartDate(updatedTrip.getStartDate());
        existingTrip.setEndDate(updatedTrip.getEndDate());
        existingTrip.setDescription(updatedTrip.getDescription());
        existingTrip.setBudget(updatedTrip.getBudget());

        return tripRepository.save(existingTrip);
    }

    // Delete trip
    public void deleteTrip(
            Long tripId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Trip existingTrip =
                tripRepository.findByIdAndUserId(
                        tripId,
                        user.getId()
                ).orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Trip not found or you are not authorized to delete this trip."
                        ));

        tripRepository.delete(existingTrip);
    }
}