package com.tripnest.backend.dto.attraction;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionResponseDTO {

    private Long id;
    private String name;
    private String description;
    private String location;
    private String category;
    private Double entryFee;
    private Long destinationId;
    private String destinationName;
}