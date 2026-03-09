package com.wellspring.service;

import com.wellspring.dto.SupportMessageDto;
import com.wellspring.entity.SupportMessage;
import com.wellspring.exception.ResourceNotFoundException;
import com.wellspring.repository.SupportMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Support Message Service Implementation
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SupportMessageServiceImpl implements SupportMessageService {

    private final SupportMessageRepository messageRepository;

    @Override
    @Transactional
    public SupportMessageDto createMessage(SupportMessageDto messageDto) {
        SupportMessage message = SupportMessage.builder()
                .name(messageDto.getName())
                .email(messageDto.getEmail())
                .message(messageDto.getMessage())
                .build();

        SupportMessage savedMessage = messageRepository.save(message);
        log.info("Support message created from: {}", savedMessage.getEmail());
        return mapToDto(savedMessage);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupportMessageDto> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SupportMessageDto getMessageById(Long id) {
        SupportMessage message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SupportMessage", "id", id));
        return mapToDto(message);
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        SupportMessage message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SupportMessage", "id", id));
        messageRepository.delete(message);
        log.info("Support message deleted: {}", id);
    }

    private SupportMessageDto mapToDto(SupportMessage message) {
        return SupportMessageDto.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
