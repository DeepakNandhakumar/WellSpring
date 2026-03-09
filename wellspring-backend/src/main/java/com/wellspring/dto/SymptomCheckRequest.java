package com.wellspring.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Symptom Check Request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SymptomCheckRequest {

    @NotBlank(message = "Symptoms description is required")
    private String symptoms;
}
