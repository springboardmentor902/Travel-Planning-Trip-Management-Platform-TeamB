package com.tripnest.backend.dto.destination;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DestinationRequestDTO {

    @NotBlank
    private String name;
    private String country;
    private String description;
    private String type;
    private String bestTimeToVisit;
    private String travelInformation;
    private String imageUrl;
}