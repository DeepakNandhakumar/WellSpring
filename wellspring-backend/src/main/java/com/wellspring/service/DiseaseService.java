package com.wellspring.service;

import com.wellspring.dto.DiseaseDto;

import java.util.List;

/**
 * Disease Service Interface
 */
public interface DiseaseService {

    /**
     * Get all diseases
     */
    List<DiseaseDto> getAllDiseases();

    /**
     * Get disease by ID
     */
    DiseaseDto getDiseaseById(Long id);

    /**
     * Search diseases by keyword
     */
    List<DiseaseDto> searchDiseases(String keyword);

    /**
     * Create new disease (Admin only)
     */
    DiseaseDto createDisease(DiseaseDto diseaseDto);

    /**
     * Update disease (Admin only)
     */
    DiseaseDto updateDisease(Long id, DiseaseDto diseaseDto);

    /**
     * Delete disease (Admin only)
     */
    void deleteDisease(Long id);
}
