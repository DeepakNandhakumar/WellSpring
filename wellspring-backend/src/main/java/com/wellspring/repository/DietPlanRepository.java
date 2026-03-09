package com.wellspring.repository;

import com.wellspring.entity.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for DietPlan entity operations
 */
@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {

    /**
     * Find diet plans by disease ID
     */
    List<DietPlan> findByDiseaseId(Long diseaseId);

    /**
     * Find diet plans by disease ID and age group
     */
    List<DietPlan> findByDiseaseIdAndAgeGroup(Long diseaseId, String ageGroup);

    /**
     * Find diet plans by disease ID, age group and type
     */
    List<DietPlan> findByDiseaseIdAndAgeGroupAndType(Long diseaseId, String ageGroup, DietPlan.DietType type);
}
