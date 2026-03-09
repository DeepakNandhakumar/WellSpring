package com.wellspring.service;

import com.wellspring.dto.AyurvedicSolutionDto;

import java.util.List;

/**
 * Ayurvedic Solution Service Interface
 */
public interface AyurvedicSolutionService {

    /**
     * Get all Ayurvedic solutions
     */
    List<AyurvedicSolutionDto> getAllSolutions();

    /**
     * Get solution by ID
     */
    AyurvedicSolutionDto getSolutionById(Long id);

    /**
     * Get solution by disease ID
     */
    List<AyurvedicSolutionDto> getSolutionByDisease(Long diseaseId);

    /**
     * Create new solution (Admin only)
     */
    AyurvedicSolutionDto createSolution(AyurvedicSolutionDto solutionDto);

    /**
     * Update solution (Admin only)
     */
    AyurvedicSolutionDto updateSolution(Long id, AyurvedicSolutionDto solutionDto);

    /**
     * Delete solution (Admin only)
     */
    void deleteSolution(Long id);
}
