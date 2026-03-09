package com.wellspring.repository;

import com.wellspring.entity.MedicinalPlant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for MedicinalPlant entity operations
 */
@Repository
public interface MedicinalPlantRepository extends JpaRepository<MedicinalPlant, Long> {

    /**
     * Search plants by name containing keyword (case insensitive)
     */
    List<MedicinalPlant> findByPlantNameContainingIgnoreCase(String keyword);

    /**
     * Search by scientific name
     */
    List<MedicinalPlant> findByScientificNameContainingIgnoreCase(String keyword);
}
