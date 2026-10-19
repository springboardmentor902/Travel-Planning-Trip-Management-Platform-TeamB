


package com.tripnest.backend.service;

import com.tripnest.backend.dto.destination.DestinationRequestDTO;
import com.tripnest.backend.dto.destination.DestinationResponseDTO;
import com.tripnest.backend.entity.Destination;
import com.tripnest.backend.repository.DestinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    // Create destination: DTO → Entity → Database → Response DTO.
    public DestinationResponseDTO createDestination(DestinationRequestDTO request) {

        Destination destination = new Destination();

        destination.setName(request.getName());
        destination.setCountry(request.getCountry());
        destination.setDescription(request.getDescription());
        destination.setType(request.getType());
        destination.setBestTimeToVisit(request.getBestTimeToVisit());
        destination.setTravelInformation(request.getTravelInformation());
        destination.setImageUrl(request.getImageUrl());

        Destination savedDestination = destinationRepository.save(destination);

        return convertToResponseDTO(savedDestination);
    }

    // Get all destinations.
    public List<DestinationResponseDTO> getAllDestinations() {

        return destinationRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get one destination by ID.
    public Optional<DestinationResponseDTO> getDestinationById(Long id) {

        return destinationRepository.findById(id)
                .map(this::convertToResponseDTO);
    }

    // Update an existing destination.
    public DestinationResponseDTO updateDestination(
            Long id,
            DestinationRequestDTO request) {

        Destination existing = destinationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Destination not found"));

        existing.setName(request.getName());
        existing.setCountry(request.getCountry());
        existing.setDescription(request.getDescription());
        existing.setType(request.getType());
        existing.setBestTimeToVisit(request.getBestTimeToVisit());
        existing.setTravelInformation(request.getTravelInformation());
        existing.setImageUrl(request.getImageUrl());

        Destination updatedDestination =
                destinationRepository.save(existing);

        return convertToResponseDTO(updatedDestination);
    }

    // Delete a destination by ID.
    public void deleteDestination(Long id) {

        destinationRepository.deleteById(id);
    }

    // Converts Entity into the DTO returned to the client.
    private DestinationResponseDTO convertToResponseDTO(
            Destination destination) {

        return new DestinationResponseDTO(
                destination.getId(),
                destination.getName(),
                destination.getCountry(),
                destination.getDescription(),
                destination.getType(),
                destination.getBestTimeToVisit(),
                destination.getTravelInformation(),
                destination.getImageUrl()
        );
    }
}









// --------------------------------

// package com.tripnest.backend.service;

// import com.tripnest.backend.entity.Destination;
// import com.tripnest.backend.repository.DestinationRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class DestinationService {

//     private final DestinationRepository destinationRepository;

//     public DestinationService(DestinationRepository destinationRepository) {
//         this.destinationRepository = destinationRepository;
//     }


//         // Saves a new destination in the database.
//     public Destination createDestination(Destination destination) {
//         return destinationRepository.save(destination);
//     }


//         // Gets all destinations from the database.
//     public List<Destination> getAllDestinations() {
//         return destinationRepository.findAll();
//     }



//         // Get one destination using its ID.
//     public Optional<Destination> getDestinationById(Long id) {
//         return destinationRepository.findById(id);
//     }

//     // Update an existing destination.
//     public Destination updateDestination(Long id, Destination destination) {
//         Destination existing = destinationRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Destination not found"));

//         existing.setName(destination.getName());
//         existing.setCountry(destination.getCountry());
//         existing.setDescription(destination.getDescription());
//         existing.setType(destination.getType());
//         existing.setBestTimeToVisit(destination.getBestTimeToVisit());
//         existing.setTravelInformation(destination.getTravelInformation());

//         return destinationRepository.save(existing);
//     }

//     // Delete a destination using its ID.
//     public void deleteDestination(Long id) {
//         destinationRepository.deleteById(id);
//     }


// }