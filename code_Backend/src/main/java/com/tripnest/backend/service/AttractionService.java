package com.tripnest.backend.service;

import com.tripnest.backend.dto.attraction.AttractionRequestDTO;
import com.tripnest.backend.dto.attraction.AttractionResponseDTO;
import com.tripnest.backend.entity.Attraction;
import com.tripnest.backend.entity.Destination;
import com.tripnest.backend.repository.AttractionRepository;
import com.tripnest.backend.repository.DestinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttractionService {

    private final AttractionRepository attractionRepository;
    private final DestinationRepository destinationRepository;

    public AttractionService(AttractionRepository attractionRepository,
                             DestinationRepository destinationRepository) {
        this.attractionRepository = attractionRepository;
        this.destinationRepository = destinationRepository;
    }

    public AttractionResponseDTO createAttraction(AttractionRequestDTO request) {

        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new RuntimeException("Destination not found"));

        Attraction attraction = Attraction.builder()
                .name(request.getName())
                .description(request.getDescription())
                .location(request.getLocation())
                .category(request.getCategory())
                .entryFee(request.getEntryFee())
                .destination(destination)
                .build();

        Attraction savedAttraction = attractionRepository.save(attraction);

        return mapToResponseDTO(savedAttraction);
    }

    public List<AttractionResponseDTO> getAllAttractions() {
        return attractionRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public AttractionResponseDTO getAttractionById(Long id) {

        Attraction attraction = attractionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attraction not found"));

        return mapToResponseDTO(attraction);
    }

    public AttractionResponseDTO updateAttraction(Long id,
                                                   AttractionRequestDTO request) {

        Attraction attraction = attractionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attraction not found"));

        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new RuntimeException("Destination not found"));

        attraction.setName(request.getName());
        attraction.setDescription(request.getDescription());
        attraction.setLocation(request.getLocation());
        attraction.setCategory(request.getCategory());
        attraction.setEntryFee(request.getEntryFee());
        attraction.setDestination(destination);

        Attraction updatedAttraction = attractionRepository.save(attraction);

        return mapToResponseDTO(updatedAttraction);
    }

    public void deleteAttraction(Long id) {

        if (!attractionRepository.existsById(id)) {
            throw new RuntimeException("Attraction not found");
        }

        attractionRepository.deleteById(id);
    }

    public List<AttractionResponseDTO> getAttractionsByDestination(Long destinationId) {

        if (!destinationRepository.existsById(destinationId)) {
            throw new RuntimeException("Destination not found");
        }

        return attractionRepository.findByDestinationId(destinationId)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    private AttractionResponseDTO mapToResponseDTO(Attraction attraction) {

        return AttractionResponseDTO.builder()
                .id(attraction.getId())
                .name(attraction.getName())
                .description(attraction.getDescription())
                .location(attraction.getLocation())
                .category(attraction.getCategory())
                .entryFee(attraction.getEntryFee())
                .destinationId(attraction.getDestination().getId())
                .destinationName(attraction.getDestination().getName())
                .build();
    }
}