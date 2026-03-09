package com.wellspring.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for AI Symptom Checker Analysis Response
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
        private double confidenceScore;
        private int confidencePercentage;
        private SeverityLevel severity;
        private String recommendation;
        private List<String> matchedSymptoms;
        private int matchedCount;
        private int totalSymptoms;
    }

    public enum SeverityLevel {
        LOW, MEDIUM, HIGH, CRITICAL
    }
}
