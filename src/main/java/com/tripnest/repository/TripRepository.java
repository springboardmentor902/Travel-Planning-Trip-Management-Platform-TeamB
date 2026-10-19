package com.tripnest.repository;

import com.tripnest.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {

    Optional<Trip> findByIdAndUserId(Long id, Long userId);
}