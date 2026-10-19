package com.tripnest.backend.dto.attraction;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionRequestDTO {

    @NotBlank(message = "Attraction name is required")
    private String name;

    private String description;

    private String location;

    private String category;

    private Double entryFee;

    @NotNull(message = "Destination ID is required")
    private Long destinationId;
}