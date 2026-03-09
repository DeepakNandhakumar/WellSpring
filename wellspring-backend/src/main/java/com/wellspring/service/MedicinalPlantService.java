package com.wellspring.service;

import com.wellspring.dto.MedicinalPlantDto;

import java.util.List;

/**
 * Medicinal Plant Service Interface
 */
public interface MedicinalPlantService {

    /**
     * Get all medicinal plants
     */
    List<MedicinalPlantDto> getAllPlants();

    /**
     * Get plant by ID
     */
    MedicinalPlantDto getPlantById(Long id);

    /**
     * Search plants by keyword
     */
    List<MedicinalPlantDto> searchPlants(String keyword);

    /**
     * Create new plant (Admin only)
     */
    MedicinalPlantDto createPlant(MedicinalPlantDto plantDto);

    /**
     * Update plant (Admin only)
     */
    MedicinalPlantDto updatePlant(Long id, MedicinalPlantDto plantDto);

    /**
     * Delete plant (Admin only)
     */
    void deletePlant(Long id);
}
