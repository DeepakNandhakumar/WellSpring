package com.wellspring.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Ayurvedic solution data transfer
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AyurvedicSolutionDto {

    private Long id;

    @NotNull(message = "Disease ID is required")
    private Long diseaseId;

    private String diseaseName;

    private String herbs;
    private String homeRemedy;
    private String lifestyleChanges;
}
