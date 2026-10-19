package com.tripnest.backend.dto.activity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponseDTO {

    private Long id;
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