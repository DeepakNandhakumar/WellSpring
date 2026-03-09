package com.wellspring.controller;

import com.wellspring.dto.ApiResponse;
import com.wellspring.dto.DietPlanDto;
import com.wellspring.service.DietPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Diet Plan Controller - Handles diet plan endpoints
 */
@RestController
@RequestMapping("/api/diet-plans")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DietPlanController {

    private final DietPlanService dietPlanService;

    /**
     * Get all diet plans (Admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllDietPlans() {
        List<DietPlanDto> dietPlans = dietPlanService.getAllDietPlans();
        return ResponseEntity.ok(ApiResponse.success("Diet plans retrieved successfully", dietPlans));
    }

    /**
     * Get diet plan by ID (Authenticated)
     */
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getDietPlanById(@PathVariable Long id) {
        DietPlanDto dietPlan = dietPlanService.getDietPlanById(id);
        return ResponseEntity.ok(ApiResponse.success("Diet plan retrieved successfully", dietPlan));
    }

    /**
     * Get diet plans by disease (Authenticated)
     */
    @GetMapping("/disease/{diseaseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getDietPlansByDisease(@PathVariable Long diseaseId) {
        List<DietPlanDto> dietPlans = dietPlanService.getDietPlansByDisease(diseaseId);
        return ResponseEntity.ok(ApiResponse.success("Diet plans retrieved successfully", dietPlans));
    }

    /**
     * Get diet plans by disease, age group and type (Authenticated)
     */
    @GetMapping("/filter")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getDietPlansByFilter(
            @RequestParam Long diseaseId,
            @RequestParam String ageGroup,
            @RequestParam String type) {
        List<DietPlanDto> dietPlans = dietPlanService.getDietPlansByDiseaseAgeAndType(diseaseId, ageGroup, type);
        return ResponseEntity.ok(ApiResponse.success("Diet plans retrieved successfully", dietPlans));
    }

    /**
     * Create diet plan (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createDietPlan(@Valid @RequestBody DietPlanDto dietPlanDto) {
        DietPlanDto created = dietPlanService.createDietPlan(dietPlanDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Diet plan created successfully", created));
    }

    /**
     * Update diet plan (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateDietPlan(@PathVariable Long id,
                                                      @Valid @RequestBody DietPlanDto dietPlanDto) {
        DietPlanDto updated = dietPlanService.updateDietPlan(id, dietPlanDto);
        return ResponseEntity.ok(ApiResponse.success("Diet plan updated successfully", updated));
    }

    /**
     * Delete diet plan (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteDietPlan(@PathVariable Long id) {
        dietPlanService.deleteDietPlan(id);
        return ResponseEntity.ok(ApiResponse.success("Diet plan deleted successfully"));
    }
}
