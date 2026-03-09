package com.wellspring.controller;

import com.wellspring.dto.ApiResponse;
import com.wellspring.dto.MedicinalPlantDto;
import com.wellspring.service.MedicinalPlantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Medicinal Plant Controller - Handles medicinal plant endpoints
 */
@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MedicinalPlantController {

    private final MedicinalPlantService plantService;

    /**
     * Get all plants (Public)
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllPlants() {
        List<MedicinalPlantDto> plants = plantService.getAllPlants();
        return ResponseEntity.ok(ApiResponse.success("Plants retrieved successfully", plants));
    }

    /**
     * Get plant by ID (Public)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPlantById(@PathVariable Long id) {
        MedicinalPlantDto plant = plantService.getPlantById(id);
        return ResponseEntity.ok(ApiResponse.success("Plant retrieved successfully", plant));
    }

    /**
     * Search plants (Public)
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchPlants(@RequestParam String keyword) {
        List<MedicinalPlantDto> plants = plantService.searchPlants(keyword);
        return ResponseEntity.ok(ApiResponse.success("Search results retrieved", plants));
    }

    /**
     * Create plant (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createPlant(@Valid @RequestBody MedicinalPlantDto plantDto) {
        MedicinalPlantDto created = plantService.createPlant(plantDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Plant created successfully", created));
    }

    /**
     * Update plant (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updatePlant(@PathVariable Long id,
                                                   @Valid @RequestBody MedicinalPlantDto plantDto) {
        MedicinalPlantDto updated = plantService.updatePlant(id, plantDto);
        return ResponseEntity.ok(ApiResponse.success("Plant updated successfully", updated));
    }

    /**
     * Delete plant (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
        return ResponseEntity.ok(ApiResponse.success("Plant deleted successfully"));
    }
}
