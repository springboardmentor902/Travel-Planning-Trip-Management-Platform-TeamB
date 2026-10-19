
package com.tripnest.backend.dto.trip;

import com.tripnest.backend.entity.TripStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TripResponse {

    private Long id;

    private String title;

    private String destination;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer numberOfTravelers;

    private TripStatus status;

    private Long ownerId;
}

