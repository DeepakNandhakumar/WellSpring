package com.wellspring.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DietPlan Entity - Stores diet recommendations for specific diseases
 */
@Entity
@Table(name = "diet_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Disease is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id", nullable = false)
    private Disease disease;

    @NotBlank(message = "Age group is required")
    @Column(name = "age_group", nullable = false, length = 50)
    private String ageGroup;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DietType type;

    @Column(columnDefinition = "TEXT")
    private String breakfast;

    @Column(columnDefinition = "TEXT")
    private String lunch;

    @Column(columnDefinition = "TEXT")
    private String dinner;

    @Column(name = "avoid_food", columnDefinition = "TEXT")
    private String avoidFood;

    public enum DietType {
        VEG, NONVEG
    }
}
