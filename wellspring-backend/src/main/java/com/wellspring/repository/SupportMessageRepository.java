package com.wellspring.repository;

import com.wellspring.entity.SupportMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for SupportMessage entity operations
 */
@Repository
public interface SupportMessageRepository extends JpaRepository<SupportMessage, Long> {

    /**
     * Find all messages ordered by creation date descending
     */
    List<SupportMessage> findAllByOrderByCreatedAtDesc();
}
