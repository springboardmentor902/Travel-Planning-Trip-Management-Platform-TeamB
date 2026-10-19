package com.tripnest.backend.dto.destination;

import lombok.AllArgsConstructor;
import lombok.Data;
//import lombok.Getter;
import lombok.NoArgsConstructor;

//@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationResponseDTO {

    private Long id;
    private String name;
    private String country;
    private String description;
    private String type;
    private String bestTimeToVisit;
    private String travelInformation;
    private String imageUrl;
}