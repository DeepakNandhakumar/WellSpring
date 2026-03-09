package com.wellspring.service;

import com.wellspring.dto.DietPlanDto;

import java.util.List;

/**
 * Diet Plan Service Interface
 */
public interface DietPlanService {

    /**
     * Get all diet plans
     */
    List<DietPlanDto> getAllDietPlans();

    /**
     * Get diet plan by ID
     */
    DietPlanDto getDietPlanById(Long id);

    /**
     * Get diet plans by disease ID
     */
    List<DietPlanDto> getDietPlansByDisease(Long diseaseId);

    /**
     * Get diet plans by disease, age group and type
     */
    List<DietPlanDto> getDietPlansByDiseaseAgeAndType(Long diseaseId, String ageGroup, String type);

    /**
     * Create new diet plan (Admin only)
     */
    DietPlanDto createDietPlan(DietPlanDto dietPlanDto);

    /**
     * Update diet plan (Admin only)
     */
    DietPlanDto updateDietPlan(Long id, DietPlanDto dietPlanDto);

    /**
     * Delete diet plan (Admin only)
     */
    void deleteDietPlan(Long id);
}
