package com.tripnest.backend.dto.itinerary;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ItineraryDayResponse {

    private Long id;

    private Long itineraryId;

    private Integer dayNumber;

    private LocalDate date;

    private String title;

    private String description;
}