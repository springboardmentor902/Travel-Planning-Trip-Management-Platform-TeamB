package com.tripnest.backend.dto.itinerary;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ItineraryDayRequest {

    @NotNull(message = "Day number is required")
    @Positive(message = "Day number must be greater than zero")
    private Integer dayNumber;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Day title is required")
    private String title;

    private String description;
}