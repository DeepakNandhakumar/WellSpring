package com.wellspring.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AyurvedicSolution Entity - Stores Ayurvedic remedies for diseases
 */
@Entity
@Table(name = "ayurvedic_solutions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AyurvedicSolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Disease is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id", nullable = false)
    private Disease disease;

    @Column(columnDefinition = "TEXT")
    private String herbs;

    @Column(name = "home_remedy", columnDefinition = "TEXT")
    private String homeRemedy;

    @Column(name = "lifestyle_changes", columnDefinition = "TEXT")
    private String lifestyleChanges;
}
