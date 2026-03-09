package com.wellspring.controller;

import com.wellspring.dto.ApiResponse;
import com.wellspring.dto.SupportMessageDto;
import com.wellspring.service.SupportMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Support Controller - Handles support message endpoints
 */
@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SupportController {

    private final SupportMessageService messageService;

    /**
     * Create support message (Public)
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createMessage(@Valid @RequestBody SupportMessageDto messageDto) {
        SupportMessageDto created = messageService.createMessage(messageDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Message sent successfully", created));
    }

    /**
     * Get all messages (Admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllMessages() {
        List<SupportMessageDto> messages = messageService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved successfully", messages));
    }

    /**
     * Get message by ID (Admin only)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getMessageById(@PathVariable Long id) {
        SupportMessageDto message = messageService.getMessageById(id);
        return ResponseEntity.ok(ApiResponse.success("Message retrieved successfully", message));
    }

    /**
     * Delete message (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.success("Message deleted successfully"));
    }
}
