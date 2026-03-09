package com.wellspring.service;

import com.wellspring.dto.AyurvedicSolutionDto;
import com.wellspring.entity.AyurvedicSolution;
import com.wellspring.entity.Disease;
import com.wellspring.exception.ResourceNotFoundException;
import com.wellspring.repository.AyurvedicSolutionRepository;
import com.wellspring.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Ayurvedic Solution Service Implementation
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AyurvedicSolutionServiceImpl implements AyurvedicSolutionService {

    private final AyurvedicSolutionRepository solutionRepository;
    private final DiseaseRepository diseaseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AyurvedicSolutionDto> getAllSolutions() {
        return solutionRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AyurvedicSolutionDto getSolutionById(Long id) {
        AyurvedicSolution solution = solutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AyurvedicSolution", "id", id));
        return mapToDto(solution);
    }

    @Override
@Transactional(readOnly = true)
public List<AyurvedicSolutionDto> getSolutionByDisease(Long diseaseId) {

    List<AyurvedicSolution> solutions = solutionRepository.findByDiseaseId(diseaseId);

    if (solutions.isEmpty()) {
        throw new ResourceNotFoundException("AyurvedicSolution", "diseaseId", diseaseId);
    }

    return solutions.stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
}

    @Override
    @Transactional
    public AyurvedicSolutionDto createSolution(AyurvedicSolutionDto solutionDto) {
        Disease disease = diseaseRepository.findById(solutionDto.getDiseaseId())
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", solutionDto.getDiseaseId()));

        AyurvedicSolution solution = AyurvedicSolution.builder()
                .disease(disease)
                .herbs(solutionDto.getHerbs())
                .homeRemedy(solutionDto.getHomeRemedy())
                .lifestyleChanges(solutionDto.getLifestyleChanges())
                .build();

        AyurvedicSolution savedSolution = solutionRepository.save(solution);
        log.info("Ayurvedic solution created for disease: {}", disease.getName());
        return mapToDto(savedSolution);
    }

    @Override
    @Transactional
    public AyurvedicSolutionDto updateSolution(Long id, AyurvedicSolutionDto solutionDto) {
        AyurvedicSolution solution = solutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AyurvedicSolution", "id", id));

        Disease disease = diseaseRepository.findById(solutionDto.getDiseaseId())
                .orElseThrow(() -> new ResourceNotFoundException("Disease", "id", solutionDto.getDiseaseId()));

        solution.setDisease(disease);
        solution.setHerbs(solutionDto.getHerbs());
        solution.setHomeRemedy(solutionDto.getHomeRemedy());
        solution.setLifestyleChanges(solutionDto.getLifestyleChanges());

        AyurvedicSolution updatedSolution = solutionRepository.save(solution);
        log.info("Ayurvedic solution updated: {}", id);
        return mapToDto(updatedSolution);
    }

    @Override
    @Transactional
    public void deleteSolution(Long id) {
        AyurvedicSolution solution = solutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AyurvedicSolution", "id", id));
        solutionRepository.delete(solution);
        log.info("Ayurvedic solution deleted: {}", id);
    }

    private AyurvedicSolutionDto mapToDto(AyurvedicSolution solution) {
        return AyurvedicSolutionDto.builder()
                .id(solution.getId())
                .diseaseId(solution.getDisease().getId())
                .diseaseName(solution.getDisease().getName())
                .herbs(solution.getHerbs())
                .homeRemedy(solution.getHomeRemedy())
                .lifestyleChanges(solution.getLifestyleChanges())
                .build();
    }
}
