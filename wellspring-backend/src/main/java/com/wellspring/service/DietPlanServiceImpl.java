package com.wellspring.service;

import com.wellspring.dto.DietPlanDto;
import com.wellspring.entity.DietPlan;
import com.wellspring.entity.Disease;
import com.wellspring.exception.ResourceNotFoundException;
import com.wellspring.repository.DietPlanRepository;
import com.wellspring.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Diet Plan Service Implementation
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DietPlanServiceImpl implements DietPlanService {

    private final DietPlanRepository dietPlanRepository;
    private final DiseaseRepository diseaseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DietPlanDto> getAllDietPlans() {
        return dietPlanRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DietPlanDto getDietPlanById(Long id) {
        DietPlan dietPlan = dietPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DietPlan", "id", id));
        return mapToDto(dietPlan);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DietPlanDto> getDietPlansByDisease(Long diseaseId) {
        return dietPlanRepository.findByDiseaseId(diseaseId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DietPlanDto> getDietPlansByDiseaseAgeAndType(Long diseaseId, String ageGroup, String type) {
        DietPlan.DietType dietType = DietPlan.DietType.valueOf(type.toUpperCase());
        return dietPlanRepository.findByDiseaseIdAndAgeGroupAndType(diseaseId, ageGroup, dietType).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DietPlanDto createDietPlan(DietPlanDto dietPlanDto) {
        Disease disease = diseaseRepository.findById(dietPlanDto.getDiseaseId())
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", dietPlanDto.getDiseaseId()));

        DietPlan dietPlan = DietPlan.builder()
                .disease(disease)
                .ageGroup(dietPlanDto.getAgeGroup())
                .type(DietPlan.DietType.valueOf(dietPlanDto.getType().toUpperCase()))
                .breakfast(dietPlanDto.getBreakfast())
                .lunch(dietPlanDto.getLunch())
                .dinner(dietPlanDto.getDinner())
                .avoidFood(dietPlanDto.getAvoidFood())
                .build();

        DietPlan savedDietPlan = dietPlanRepository.save(dietPlan);
        log.info("Diet plan created for disease: {}", disease.getName());
        return mapToDto(savedDietPlan);
    }

    @Override
    @Transactional
    public DietPlanDto updateDietPlan(Long id, DietPlanDto dietPlanDto) {
        DietPlan dietPlan = dietPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DietPlan", "id", id));

        Disease disease = diseaseRepository.findById(dietPlanDto.getDiseaseId())
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", dietPlanDto.getDiseaseId()));

        dietPlan.setDisease(disease);
        dietPlan.setAgeGroup(dietPlanDto.getAgeGroup());
        dietPlan.setType(DietPlan.DietType.valueOf(dietPlanDto.getType().toUpperCase()));
        dietPlan.setBreakfast(dietPlanDto.getBreakfast());
        dietPlan.setLunch(dietPlanDto.getLunch());
        dietPlan.setDinner(dietPlanDto.getDinner());
        dietPlan.setAvoidFood(dietPlanDto.getAvoidFood());

        DietPlan updatedDietPlan = dietPlanRepository.save(dietPlan);
        log.info("Diet plan updated: {}", id);
        return mapToDto(updatedDietPlan);
    }

    @Override
    @Transactional
    public void deleteDietPlan(Long id) {
        DietPlan dietPlan = dietPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DietPlan", "id", id));
        dietPlanRepository.delete(dietPlan);
        log.info("Diet plan deleted: {}", id);
    }

    private DietPlanDto mapToDto(DietPlan dietPlan) {
        return DietPlanDto.builder()
                .id(dietPlan.getId())
                .diseaseId(dietPlan.getDisease().getId())
                .diseaseName(dietPlan.getDisease().getName())
                .ageGroup(dietPlan.getAgeGroup())
                .type(dietPlan.getType().name())
                .breakfast(dietPlan.getBreakfast())
                .lunch(dietPlan.getLunch())
                .dinner(dietPlan.getDinner())
                .avoidFood(dietPlan.getAvoidFood())
                .build();
    }
}
