package com.wellspring.repository;

import com.wellspring.entity.AyurvedicSolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for AyurvedicSolution entity operations
 */
@Repository
public interface AyurvedicSolutionRepository extends JpaRepository<AyurvedicSolution, Long> {

    /**
     * Find Ayurvedic solution by disease ID
     */
    List<AyurvedicSolution> findByDiseaseId(Long diseaseId);
}
