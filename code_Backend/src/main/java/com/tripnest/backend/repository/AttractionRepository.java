package com.tripnest.backend.repository;

import com.tripnest.backend.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    List<Attraction> findByDestinationId(Long destinationId);
}