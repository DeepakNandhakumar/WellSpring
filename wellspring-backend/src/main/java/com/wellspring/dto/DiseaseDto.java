package com.wellspring.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for disease data transfer
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiseaseDto {

    private Long id;

    @NotBlank(message = "Disease name is required")
    private String name;

    private String description;
    private String symptoms;
    private String causes;
    private String prevention;
}
