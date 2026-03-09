package com.wellspring.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * MedicinalPlant Entity - Stores information about Ayurvedic medicinal plants
 */
@Entity
@Table(name = "medicinal_plants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicinalPlant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Plant name is required")
    @Column(name = "plant_name", nullable = false, length = 200)
    private String plantName;

    @Column(name = "scientific_name", length = 300)
    private String scientificName;

    @Column(columnDefinition = "TEXT")
    private String uses;

    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
