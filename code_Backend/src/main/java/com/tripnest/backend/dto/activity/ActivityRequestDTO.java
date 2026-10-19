package com.tripnest.backend.dto.activity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalTime;

@Data
public class ActivityRequestDTO {

    @NotBlank
    private String title;

    private String description;

    private String category;

    private LocalTime startTime;

    private LocalTime endTime;

    private String location;

    private String bookingDetails;

    private String checklist;

    private Long itineraryDayId;
}

