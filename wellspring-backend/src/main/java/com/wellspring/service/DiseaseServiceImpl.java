package com.wellspring.service;

import com.wellspring.dto.DiseaseDto;
import com.wellspring.entity.Disease;
import com.wellspring.exception.ResourceNotFoundException;
import com.wellspring.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Disease Service Implementation
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DiseaseServiceImpl implements DiseaseService {

    private final DiseaseRepository diseaseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DiseaseDto> getAllDiseases() {
        return diseaseRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DiseaseDto getDiseaseById(Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", id));
        return mapToDto(disease);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DiseaseDto> searchDiseases(String keyword) {
        return diseaseRepository.findByNameContainingIgnoreCase(keyword).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DiseaseDto createDisease(DiseaseDto diseaseDto) {
        Disease disease = Disease.builder()
                .name(diseaseDto.getName())
                .description(diseaseDto.getDescription())
                .symptoms(diseaseDto.getSymptoms())
                .causes(diseaseDto.getCauses())
                .prevention(diseaseDto.getPrevention())
                .build();

        Disease savedDisease = diseaseRepository.save(disease);
        log.info("Disease created: {}", savedDisease.getName());
        return mapToDto(savedDisease);
    }

    @Override
    @Transactional
    public DiseaseDto updateDisease(Long id, DiseaseDto diseaseDto) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", id));

        disease.setName(diseaseDto.getName());
        disease.setDescription(diseaseDto.getDescription());
        disease.setSymptoms(diseaseDto.getSymptoms());
        disease.setCauses(diseaseDto.getCauses());
        disease.setPrevention(diseaseDto.getPrevention());

        Disease updatedDisease = diseaseRepository.save(disease);
        log.info("Disease updated: {}", updatedDisease.getName());
        return mapToDto(updatedDisease);
    }

    @Override
    @Transactional
    public void deleteDisease(Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", id));
        diseaseRepository.delete(disease);
        log.info("Disease deleted: {}", id);
    }

    private DiseaseDto mapToDto(Disease disease) {
        return DiseaseDto.builder()
                .id(disease.getId())
                .name(disease.getName())
                .description(disease.getDescription())
                .symptoms(disease.getSymptoms())
                .causes(disease.getCauses())
                .prevention(disease.getPrevention())
                .build();
    }
}
