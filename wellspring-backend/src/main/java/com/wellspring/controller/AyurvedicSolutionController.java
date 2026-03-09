package com.wellspring.controller;

import com.wellspring.dto.ApiResponse;
import com.wellspring.dto.AyurvedicSolutionDto;
import com.wellspring.service.AyurvedicSolutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Ayurvedic Solution Controller - Handles Ayurvedic solution endpoints
 */
@RestController
@RequestMapping("/api/ayurvedic")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AyurvedicSolutionController {

    private final AyurvedicSolutionService solutionService;

    /**
     * Get all Ayurvedic solutions (Admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllSolutions() {
        List<AyurvedicSolutionDto> solutions = solutionService.getAllSolutions();
        return ResponseEntity.ok(ApiResponse.success("Solutions retrieved successfully", solutions));
    }

    /**
     * Get solution by ID (Authenticated)
     */
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getSolutionById(@PathVariable Long id) {
        AyurvedicSolutionDto solution = solutionService.getSolutionById(id);
        return ResponseEntity.ok(ApiResponse.success("Solution retrieved successfully", solution));
    }

    /**
     * Get solution by disease ID (Authenticated)
     */
    @GetMapping("/disease/{diseaseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getSolutionByDisease(@PathVariable Long diseaseId) {
    List<AyurvedicSolutionDto> solutions = solutionService.getSolutionByDisease(diseaseId);
    return ResponseEntity.ok(ApiResponse.success("Solutions retrieved successfully", solutions));
}

    /**
     * Create solution (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createSolution(@Valid @RequestBody AyurvedicSolutionDto solutionDto) {
        AyurvedicSolutionDto created = solutionService.createSolution(solutionDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Solution created successfully", created));
    }

    /**
     * Update solution (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateSolution(@PathVariable Long id,
                                                      @Valid @RequestBody AyurvedicSolutionDto solutionDto) {
        AyurvedicSolutionDto updated = solutionService.updateSolution(id, solutionDto);
        return ResponseEntity.ok(ApiResponse.success("Solution updated successfully", updated));
    }

    /**
     * Delete solution (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteSolution(@PathVariable Long id) {
        solutionService.deleteSolution(id);
        return ResponseEntity.ok(ApiResponse.success("Solution deleted successfully"));
    }
}
