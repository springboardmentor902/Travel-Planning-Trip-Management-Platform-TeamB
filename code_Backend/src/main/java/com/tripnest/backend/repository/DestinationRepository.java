package com.tripnest.backend.repository;

import com.tripnest.backend.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    boolean existsByName(String name);
    Optional<Destination> findByName(String name);
    List<Destination> findAllByName(String name);
    List<Destination> findAllByNameIgnoreCase(String name);
}