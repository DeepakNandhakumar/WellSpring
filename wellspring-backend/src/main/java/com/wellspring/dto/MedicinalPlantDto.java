package com.wellspring.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for medicinal plant data transfer
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicinalPlantDto {

    private Long id;

    @NotBlank(message = "Plant name is required")
    private String plantName;

    private String scientificName;
    private String uses;
    private String imageUrl;
}
