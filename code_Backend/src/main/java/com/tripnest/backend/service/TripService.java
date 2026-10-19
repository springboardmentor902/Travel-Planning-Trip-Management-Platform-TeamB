
package com.tripnest.backend.service;

import com.tripnest.backend.entity.Trip;
import com.tripnest.backend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    // Create or update a trip
    public Trip saveTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    // Get all trips
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    // Get a trip by ID
    public Optional<Trip> getTripById(Long tripId) {
        return tripRepository.findById(tripId);
    }

    // Get trips belonging to a particular user
    public List<Trip> getTripsByOwner(Long ownerId) {
        return tripRepository.findByOwnerId(ownerId);
    }

    // Check whether a trip belongs to a particular user
    public boolean isTripOwnedByUser(Long tripId, Long ownerId) {

        Optional<Trip> tripOptional = tripRepository.findById(tripId);

        if (tripOptional.isEmpty()) {
            return false;
        }

        Trip trip = tripOptional.get();

        return trip.getOwner().getId().equals(ownerId);
    }


    public Trip updateTrip(Long tripId, Trip updatedTrip) {

        Trip existingTrip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        existingTrip.setTitle(updatedTrip.getTitle());
        existingTrip.setDestination(updatedTrip.getDestination());
        existingTrip.setStartDate(updatedTrip.getStartDate());
        existingTrip.setEndDate(updatedTrip.getEndDate());
        existingTrip.setNumberOfTravelers(updatedTrip.getNumberOfTravelers());
        existingTrip.setStatus(updatedTrip.getStatus());

        return tripRepository.save(existingTrip);
    }



    // Delete a trip
    public void deleteTrip(Long tripId) {
        tripRepository.deleteById(tripId);
    }
}





// V1 --------------------------------------------------
// package com.tripnest.backend.service;

// import com.tripnest.backend.entity.Trip;
// import com.tripnest.backend.repository.TripRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class TripService {

//     private final TripRepository tripRepository;

//     public TripService(TripRepository tripRepository) {
//         this.tripRepository = tripRepository;
//     }

//     // Create or update a trip
//     public Trip saveTrip(Trip trip) {
//         return tripRepository.save(trip);
//     }

//     // Get all trips
//     public List<Trip> getAllTrips() {
//         return tripRepository.findAll();
//     }

//     // Get a trip by ID
//     public Optional<Trip> getTripById(Long tripId) {
//         return tripRepository.findById(tripId);
//     }

//     // Get trips belonging to a particular user
//     public List<Trip> getTripsByOwner(Long ownerId) {
//         return tripRepository.findByOwnerId(ownerId);
//     }

//     // Delete a trip
//     public void deleteTrip(Long tripId) {
//         tripRepository.deleteById(tripId);
//     }
// }

