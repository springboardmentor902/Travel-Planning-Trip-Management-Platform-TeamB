package com.tripnest.backend.service;

import com.tripnest.backend.dto.itinerary.ItineraryDayRequest;
import com.tripnest.backend.dto.itinerary.ItineraryDayResponse;
import com.tripnest.backend.dto.itinerary.ItineraryResponse;
import com.tripnest.backend.entity.Itinerary;
import com.tripnest.backend.entity.ItineraryDay;
import com.tripnest.backend.entity.Trip;
import com.tripnest.backend.repository.ItineraryDayRepository;
import com.tripnest.backend.repository.ItineraryRepository;
import com.tripnest.backend.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;
    private final ItineraryDayRepository itineraryDayRepository;
    private final TripRepository tripRepository;

    public ItineraryService(
            ItineraryRepository itineraryRepository,
            ItineraryDayRepository itineraryDayRepository,
            TripRepository tripRepository) {

        this.itineraryRepository = itineraryRepository;
        this.itineraryDayRepository = itineraryDayRepository;
        this.tripRepository = tripRepository;
    }

    private void validateDayAgainstTrip(Trip trip, ItineraryDayRequest request) {

        LocalDate startDate = trip.getStartDate();
        LocalDate endDate = trip.getEndDate();

        long tripDuration = ChronoUnit.DAYS.between(startDate, endDate) + 1;

        if (request.getDayNumber() > tripDuration) {
                throw new RuntimeException("Day number exceeds trip duration");
        }

        if (request.getDate().isBefore(startDate)
                || request.getDate().isAfter(endDate)) {
                throw new RuntimeException("Day date must be within trip dates");
        }

        LocalDate expectedDate =
                startDate.plusDays(request.getDayNumber() - 1);

        if (!request.getDate().equals(expectedDate)) {
                throw new RuntimeException(
                        "Day number and date do not match the trip schedule"
                );
        }
        }



    public ItineraryResponse createItinerary(Long tripId, Long userId) {

        Trip trip = getOwnedTrip(tripId, userId);

        if (itineraryRepository.findByTripId(tripId).isPresent()) {
            throw new RuntimeException("Itinerary already exists for this trip");
        }

        Itinerary itinerary = Itinerary.builder()
                .trip(trip)
                .build();

        Itinerary savedItinerary = itineraryRepository.save(itinerary);

        return convertToItineraryResponse(savedItinerary);
    }

    public ItineraryResponse getItinerary(Long tripId, Long userId) {

        getOwnedTrip(tripId, userId);

        Itinerary itinerary = itineraryRepository.findByTripId(tripId)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        return convertToItineraryResponse(itinerary);
    }

    public ItineraryDayResponse addDay(
            Long tripId,
            ItineraryDayRequest request,
            Long userId) {

        //getOwnedTrip(tripId, userId);
        Trip trip = getOwnedTrip(tripId, userId);
        validateDayAgainstTrip(trip, request);

        Itinerary itinerary = itineraryRepository.findByTripId(tripId)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        ItineraryDay day = ItineraryDay.builder()
                .itinerary(itinerary)
                .dayNumber(request.getDayNumber())
                .date(request.getDate())
                .title(request.getTitle())
                .description(request.getDescription())
                .build();

        ItineraryDay savedDay = itineraryDayRepository.save(day);

        return convertToDayResponse(savedDay);
    }

    public List<ItineraryDayResponse> getDays(
            Long tripId,
            Long userId) {

        getOwnedTrip(tripId, userId);

        Itinerary itinerary = itineraryRepository.findByTripId(tripId)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        return itineraryDayRepository
                .findByItineraryIdOrderByDayNumberAsc(itinerary.getId())
                .stream()
                .map(this::convertToDayResponse)
                .toList();
    }

    private Trip getOwnedTrip(Long tripId, Long userId) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getOwner().getId().equals(userId)) {
            throw new AccessDeniedException(
                    "You are not authorized to access this trip"
            );
            //throw new RuntimeException("You are not authorized to access this trip");
        }

        return trip;
    }

    private ItineraryResponse convertToItineraryResponse(
            Itinerary itinerary) {

        ItineraryResponse response = new ItineraryResponse();

        response.setId(itinerary.getId());
        response.setTripId(itinerary.getTrip().getId());

        return response;
    }

    private ItineraryDayResponse convertToDayResponse(
            ItineraryDay day) {

        ItineraryDayResponse response = new ItineraryDayResponse();

        response.setId(day.getId());
        response.setItineraryId(day.getItinerary().getId());
        response.setDayNumber(day.getDayNumber());
        response.setDate(day.getDate());
        response.setTitle(day.getTitle());
        response.setDescription(day.getDescription());

        return response;
    }

    public ItineraryDayResponse updateDay(
        Long tripId,
        Long dayId,
        ItineraryDayRequest request,
        Long userId) {

    //getOwnedTrip(tripId, userId);
        Trip trip = getOwnedTrip(tripId, userId);
        validateDayAgainstTrip(trip, request);

    Itinerary itinerary = itineraryRepository.findByTripId(tripId)
            .orElseThrow(() -> new RuntimeException("Itinerary not found"));

    ItineraryDay day = itineraryDayRepository.findById(dayId)
            .orElseThrow(() -> new RuntimeException("Itinerary day not found"));

    if (!day.getItinerary().getId().equals(itinerary.getId())) {
        throw new RuntimeException(
                "Itinerary day does not belong to this trip"
        );
    }

    day.setDayNumber(request.getDayNumber());
    day.setDate(request.getDate());
    day.setTitle(request.getTitle());
    day.setDescription(request.getDescription());

    ItineraryDay updatedDay = itineraryDayRepository.save(day);

    return convertToDayResponse(updatedDay);
}


    public void deleteDay(
            Long tripId,
            Long dayId,
            Long userId) {

        getOwnedTrip(tripId, userId);

        Itinerary itinerary = itineraryRepository.findByTripId(tripId)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        ItineraryDay day = itineraryDayRepository.findById(dayId)
                .orElseThrow(() -> new RuntimeException("Itinerary day not found"));

        if (!day.getItinerary().getId().equals(itinerary.getId())) {
            throw new RuntimeException(
                    "Itinerary day does not belong to this trip"
            );
        }

        itineraryDayRepository.delete(day);
    }












}