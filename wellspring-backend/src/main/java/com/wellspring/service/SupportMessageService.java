package com.wellspring.service;

import com.wellspring.dto.SupportMessageDto;

import java.util.List;

/**
 * Support Message Service Interface
 */
public interface SupportMessageService {

    /**
     * Create new support message
     */
    SupportMessageDto createMessage(SupportMessageDto messageDto);

    /**
     * Get all support messages (Admin only)
     */
    List<SupportMessageDto> getAllMessages();

    /**
     * Get message by ID (Admin only)
     */
    SupportMessageDto getMessageById(Long id);

    /**
     * Delete message (Admin only)
     */
    void deleteMessage(Long id);
}
