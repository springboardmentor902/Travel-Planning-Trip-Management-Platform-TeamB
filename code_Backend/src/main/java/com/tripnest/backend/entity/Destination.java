package com.tripnest.backend.entity;

// JPA annotation used to mark this class as a database entity.
import jakarta.persistence.Entity;

// JPA annotation used to specify the primary key.
import jakarta.persistence.Id;

// Automatically generates the ID value.
import jakarta.persistence.GeneratedValue;

// Defines how the ID should be generated.
import jakarta.persistence.GenerationType;

// Lombok generates getters and setters automatically.
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Destination {

    // Primary key of the destination table.
    @Id

    // PostgreSQL will generate the ID automatically.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the destination, e.g. "Varanasi".
    private String name;

    // Country where the destination is located.
    private String country;

    // Short description of the destination.
    private String description;

    // Type of destination, e.g. Beach, Hill Station, Temple.
    private String type;

    // Recommended period for visiting the destination.
    private String bestTimeToVisit;

    // General travel-related information.
    private String travelInformation;

    // Photography image URL for UI presentation.
    private String imageUrl;
}