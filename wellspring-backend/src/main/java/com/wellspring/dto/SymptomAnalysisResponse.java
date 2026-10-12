package com.wellspring.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for educational symptom keyword-match response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SymptomAnalysisResponse {

    private boolean success;
    private String message;
    private List<DiseaseMatch> matches;
    private String disclaimer;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiseaseMatch {
        private Long diseaseId;
        private String diseaseName;
        private double matchScore;
        private int matchPercentage;
        private String recommendation;
        private List<String> matchedSymptoms;
        private int matchedCount;
        private int totalSymptoms;
    }
}
