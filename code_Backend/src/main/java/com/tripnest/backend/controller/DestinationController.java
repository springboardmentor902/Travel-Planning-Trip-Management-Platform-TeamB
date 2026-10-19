package com.tripnest.backend.controller;

import com.tripnest.backend.dto.attraction.AttractionResponseDTO;
import com.tripnest.backend.dto.destination.DestinationRequestDTO;
import com.tripnest.backend.dto.destination.DestinationResponseDTO;
import com.tripnest.backend.service.DestinationService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.tripnest.backend.service.AttractionService;
import com.tripnest.backend.dto.attraction.AttractionResponseDTO;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationService destinationService;
    //private final DestinationService destinationService;
    private final AttractionService attractionService;

    public DestinationController(DestinationService destinationService,
                                AttractionService attractionService) {
        this.destinationService = destinationService;
        this.attractionService = attractionService;
    }

    // Create a new destination.
    @PostMapping
    public ResponseEntity<DestinationResponseDTO> createDestination(
            @Valid @RequestBody DestinationRequestDTO request) {

        return ResponseEntity.ok(
                destinationService.createDestination(request)
        );
    }

    // Get all destinations.
    @GetMapping
    public ResponseEntity<List<DestinationResponseDTO>> getAllDestinations() {

        return ResponseEntity.ok(
                destinationService.getAllDestinations()
        );
    }

    // Get one destination by ID.
    @GetMapping("/{id}")
    public ResponseEntity<DestinationResponseDTO> getDestinationById(
            @PathVariable Long id) {

        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an existing destination.
    @PutMapping("/{id}")
    public ResponseEntity<DestinationResponseDTO> updateDestination(
            @PathVariable Long id,
            @Valid @RequestBody DestinationRequestDTO request) {

        return ResponseEntity.ok(
                destinationService.updateDestination(id, request)
        );
    }

    // Delete a destination.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(
            @PathVariable Long id) {

        destinationService.deleteDestination(id);

        return ResponseEntity.noContent().build();
    }



    // dest + attraction ... combnd
        /**
         * Retrieves all attractions belonging to a specific destination.
         */
        @GetMapping("/{destinationId}/attractions")
        public ResponseEntity<List<AttractionResponseDTO>> getAttractionsByDestination(
                @PathVariable Long destinationId) {

            return ResponseEntity.ok(
                    attractionService.getAttractionsByDestination(destinationId)
            );
        }
}