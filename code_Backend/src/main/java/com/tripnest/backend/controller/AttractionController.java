package com.tripnest.backend.controller;

import com.tripnest.backend.dto.attraction.AttractionRequestDTO;
import com.tripnest.backend.dto.attraction.AttractionResponseDTO;
import com.tripnest.backend.service.AttractionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attractions")
public class AttractionController {

    private final AttractionService attractionService;

    public AttractionController(AttractionService attractionService) {
        this.attractionService = attractionService;
    }

    /**
     * Creates a new attraction and associates it with a destination.
     */
    @PostMapping
    public ResponseEntity<AttractionResponseDTO> createAttraction(
            @Valid @RequestBody AttractionRequestDTO request) {

        AttractionResponseDTO response = attractionService.createAttraction(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Retrieves all attractions.
     */
    @GetMapping
    public ResponseEntity<List<AttractionResponseDTO>> getAllAttractions() {

        return ResponseEntity.ok(attractionService.getAllAttractions());
    }

    /**
     * Retrieves a single attraction using its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AttractionResponseDTO> getAttractionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(attractionService.getAttractionById(id));
    }

    /**
     * Updates an existing attraction.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AttractionResponseDTO> updateAttraction(
            @PathVariable Long id,
            @Valid @RequestBody AttractionRequestDTO request) {

        return ResponseEntity.ok(
                attractionService.updateAttraction(id, request)
        );
    }

    /**
     * Deletes an attraction using its ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttraction(
            @PathVariable Long id) {

        attractionService.deleteAttraction(id);

        return ResponseEntity.noContent().build();
    }
}