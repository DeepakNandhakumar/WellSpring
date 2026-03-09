package com.wellspring.service;

import com.wellspring.dto.MedicinalPlantDto;
import com.wellspring.entity.MedicinalPlant;
import com.wellspring.exception.ResourceNotFoundException;
import com.wellspring.repository.MedicinalPlantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Medicinal Plant Service Implementation
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MedicinalPlantServiceImpl implements MedicinalPlantService {

    private final MedicinalPlantRepository plantRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MedicinalPlantDto> getAllPlants() {
        return plantRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MedicinalPlantDto getPlantById(Long id) {
        MedicinalPlant plant = plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicinalPlant", "id", id));
        return mapToDto(plant);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicinalPlantDto> searchPlants(String keyword) {
        List<MedicinalPlant> byName = plantRepository.findByPlantNameContainingIgnoreCase(keyword);
        if (!byName.isEmpty()) {
            return byName.stream().map(this::mapToDto).collect(Collectors.toList());
        }
        return plantRepository.findByScientificNameContainingIgnoreCase(keyword).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MedicinalPlantDto createPlant(MedicinalPlantDto plantDto) {
        MedicinalPlant plant = MedicinalPlant.builder()
                .plantName(plantDto.getPlantName())
                .scientificName(plantDto.getScientificName())
                .uses(plantDto.getUses())
                .imageUrl(plantDto.getImageUrl())
                .build();

        MedicinalPlant savedPlant = plantRepository.save(plant);
        log.info("Medicinal plant created: {}", savedPlant.getPlantName());
        return mapToDto(savedPlant);
    }

    @Override
    @Transactional
    public MedicinalPlantDto updatePlant(Long id, MedicinalPlantDto plantDto) {
        MedicinalPlant plant = plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicinalPlant", "id", id));

        plant.setPlantName(plantDto.getPlantName());
        plant.setScientificName(plantDto.getScientificName());
        plant.setUses(plantDto.getUses());
        plant.setImageUrl(plantDto.getImageUrl());

        MedicinalPlant updatedPlant = plantRepository.save(plant);
        log.info("Medicinal plant updated: {}", updatedPlant.getPlantName());
        return mapToDto(updatedPlant);
    }

    @Override
    @Transactional
    public void deletePlant(Long id) {
        MedicinalPlant plant = plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicinalPlant", "id", id));
        plantRepository.delete(plant);
        log.info("Medicinal plant deleted: {}", id);
    }

    private MedicinalPlantDto mapToDto(MedicinalPlant plant) {
        return MedicinalPlantDto.builder()
                .id(plant.getId())
                .plantName(plant.getPlantName())
                .scientificName(plant.getScientificName())
                .uses(plant.getUses())
                .imageUrl(plant.getImageUrl())
                .build();
    }
}
