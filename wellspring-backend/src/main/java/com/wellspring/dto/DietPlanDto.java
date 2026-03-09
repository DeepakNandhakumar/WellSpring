package com.wellspring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for diet plan data transfer
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DietPlanDto {

    private Long id;

    @NotNull(message = "Disease ID is required")
    private Long diseaseId;

    private String diseaseName;

    @NotBlank(message = "Age group is required")
    private String ageGroup;

    @NotBlank(message = "Diet type is required")
    private String type;

    private String breakfast;
    private String lunch;
    private String dinner;
    private String avoidFood;
}
