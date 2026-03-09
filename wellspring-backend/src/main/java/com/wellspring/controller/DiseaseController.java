package com.wellspring.controller;

import com.wellspring.dto.ApiResponse;
import com.wellspring.dto.DiseaseDto;
import com.wellspring.service.DiseaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Disease Controller - Handles disease information endpoints
 */
@RestController
@RequestMapping("/api/diseases")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DiseaseController {

    private final DiseaseService diseaseService;

    /**
     * Get all diseases (Public)
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllDiseases() {
        List<DiseaseDto> diseases = diseaseService.getAllDiseases();
        return ResponseEntity.ok(ApiResponse.success("Diseases retrieved successfully", diseases));
    }

    /**
     * Get disease by ID (Public)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getDiseaseById(@PathVariable Long id) {
        DiseaseDto disease = diseaseService.getDiseaseById(id);
        return ResponseEntity.ok(ApiResponse.success("Disease retrieved successfully", disease));
    }

    /**
     * Search diseases (Public)
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchDiseases(@RequestParam String keyword) {
        List<DiseaseDto> diseases = diseaseService.searchDiseases(keyword);
        return ResponseEntity.ok(ApiResponse.success("Search results retrieved", diseases));
    }

    /**
     * Create disease (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createDisease(@Valid @RequestBody DiseaseDto diseaseDto) {
        DiseaseDto created = diseaseService.createDisease(diseaseDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Disease created successfully", created));
    }

    /**
     * Update disease (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateDisease(@PathVariable Long id, 
                                                     @Valid @RequestBody DiseaseDto diseaseDto) {
        DiseaseDto updated = diseaseService.updateDisease(id, diseaseDto);
        return ResponseEntity.ok(ApiResponse.success("Disease updated successfully", updated));
    }

    /**
     * Delete disease (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteDisease(@PathVariable Long id) {
        diseaseService.deleteDisease(id);
        return ResponseEntity.ok(ApiResponse.success("Disease deleted successfully"));
    }
}
