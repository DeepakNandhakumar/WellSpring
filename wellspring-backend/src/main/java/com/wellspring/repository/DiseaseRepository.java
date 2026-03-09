package com.wellspring.repository;

import com.wellspring.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Disease entity operations
 */
@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    /**
     * Search diseases by name containing keyword (case insensitive)
     */
    List<Disease> findByNameContainingIgnoreCase(String keyword);
}
