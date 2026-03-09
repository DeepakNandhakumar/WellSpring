package com.wellspring.service;

import com.wellspring.dto.SymptomAnalysisResponse;
import com.wellspring.entity.Disease;
import com.wellspring.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * AI Symptom Rule Engine Service
 * Analyzes symptoms using weighted scoring algorithm
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SymptomRuleEngineService {

    private final DiseaseRepository diseaseRepository;

    // Symptom keyword mappings with weights for each disease
    private static final Map<String, List<SymptomWeight>> DISEASE_SYMPTOM_MAP = new HashMap<>();

    static {
        // Diabetes symptoms and weights
        DISEASE_SYMPTOM_MAP.put("diabetes", Arrays.asList(
            new SymptomWeight("thirsty", 10),
            new SymptomWeight("thirst", 10),
            new SymptomWeight("urination", 10),
            new SymptomWeight("frequent urination", 12),
            new SymptomWeight("hunger", 8),
            new SymptomWeight("hungry", 8),
            new SymptomWeight("weight loss", 10),
            new SymptomWeight("losing weight", 10),
            new SymptomWeight("fatigue", 8),
            new SymptomWeight("tired", 7),
            new SymptomWeight("blurred vision", 9),
            new SymptomWeight("blurry", 8),
            new SymptomWeight("sugar", 8),
            new SymptomWeight("blood sugar", 10),
            new SymptomWeight("dry mouth", 7),
            new SymptomWeight("slow healing", 7),
            new SymptomWeight("infections", 6)
        ));

        // Hypertension symptoms and weights
        DISEASE_SYMPTOM_MAP.put("hypertension", Arrays.asList(
            new SymptomWeight("headache", 9),
            new SymptomWeight("dizziness", 9),
            new SymptomWeight("chest pain", 12),
            new SymptomWeight("shortness of breath", 11),
            new SymptomWeight("breathing difficulty", 10),
            new SymptomWeight("nosebleed", 8),
            new SymptomWeight("flushing", 6),
            new SymptomWeight("blood pressure", 10),
            new SymptomWeight("high bp", 10),
            new SymptomWeight("vision changes", 7),
            new SymptomWeight("anxiety", 6),
            new SymptomWeight("nausea", 5)
        ));

        // Heart Disease symptoms and weights
        DISEASE_SYMPTOM_MAP.put("heart disease", Arrays.asList(
            new SymptomWeight("chest pain", 15),
            new SymptomWeight("chest tightness", 14),
            new SymptomWeight("shortness of breath", 12),
            new SymptomWeight("fatigue", 8),
            new SymptomWeight("irregular heartbeat", 12),
            new SymptomWeight("palpitations", 11),
            new SymptomWeight("swelling", 8),
            new SymptomWeight("edema", 8),
            new SymptomWeight("nausea", 6),
            new SymptomWeight("sweating", 7),
            new SymptomWeight("heart", 8),
            new SymptomWeight("cardiac", 9)
        ));

        // Asthma symptoms and weights
        DISEASE_SYMPTOM_MAP.put("asthma", Arrays.asList(
            new SymptomWeight("wheezing", 12),
            new SymptomWeight("coughing", 9),
            new SymptomWeight("cough", 8),
            new SymptomWeight("shortness of breath", 12),
            new SymptomWeight("breathing difficulty", 11),
            new SymptomWeight("chest tightness", 10),
            new SymptomWeight("tight chest", 9),
            new SymptomWeight("breathlessness", 10),
            new SymptomWeight("night cough", 9),
            new SymptomWeight("allergies", 6),
            new SymptomWeight("trigger", 5)
        ));

        // Arthritis symptoms and weights
        DISEASE_SYMPTOM_MAP.put("arthritis", Arrays.asList(
            new SymptomWeight("joint pain", 12),
            new SymptomWeight("joints", 10),
            new SymptomWeight("stiffness", 11),
            new SymptomWeight("swelling", 9),
            new SymptomWeight("redness", 7),
            new SymptomWeight("warmth", 6),
            new SymptomWeight("decreased range", 8),
            new SymptomWeight("morning stiffness", 11),
            new SymptomWeight("fatigue", 6),
            new SymptomWeight("fever", 5),
            new SymptomWeight("arthritis", 10)
        ));

        // Obesity symptoms and weights
        DISEASE_SYMPTOM_MAP.put("obesity", Arrays.asList(
            new SymptomWeight("overweight", 10),
            new SymptomWeight("weight gain", 10),
            new SymptomWeight("obesity", 12),
            new SymptomWeight("excess fat", 9),
            new SymptomWeight("body fat", 8),
            new SymptomWeight("shortness of breath", 7),
            new SymptomWeight("sweating", 6),
            new SymptomWeight("snoring", 6),
            new SymptomWeight("fatigue", 7),
            new SymptomWeight("joint pain", 6),
            new SymptomWeight("bmi", 8)
        ));

        // Stress & Anxiety symptoms and weights
        DISEASE_SYMPTOM_MAP.put("stress anxiety", Arrays.asList(
            new SymptomWeight("stress", 9),
            new SymptomWeight("anxiety", 11),
            new SymptomWeight("worry", 9),
            new SymptomWeight("nervous", 9),
            new SymptomWeight("tension", 8),
            new SymptomWeight("panic", 11),
            new SymptomWeight("depression", 10),
            new SymptomWeight("insomnia", 8),
            new SymptomWeight("irritability", 7),
            new SymptomWeight("restlessness", 8),
            new SymptomWeight("racing thoughts", 8),
            new SymptomWeight("sweating", 6),
            new SymptomWeight("trembling", 7)
        ));

        // Insomnia symptoms and weights
        DISEASE_SYMPTOM_MAP.put("insomnia", Arrays.asList(
            new SymptomWeight("insomnia", 12),
            new SymptomWeight("sleep", 9),
            new SymptomWeight("cannot sleep", 11),
            new SymptomWeight("sleepless", 11),
            new SymptomWeight("wake up", 8),
            new SymptomWeight("tired", 7),
            new SymptomWeight("difficulty falling", 11),
            new SymptomWeight("early waking", 9),
            new SymptomWeight("daytime fatigue", 8),
            new SymptomWeight("concentration", 6),
            new SymptomWeight("mood swings", 6)
        ));

        // Digestive Disorders symptoms and weights
        DISEASE_SYMPTOM_MAP.put("digestive disorders", Arrays.asList(
            new SymptomWeight("stomach pain", 10),
            new SymptomWeight("abdominal pain", 10),
            new SymptomWeight("bloating", 9),
            new SymptomWeight("constipation", 10),
            new SymptomWeight("diarrhea", 10),
            new SymptomWeight("nausea", 9),
            new SymptomWeight("vomiting", 9),
            new SymptomWeight("heartburn", 9),
            new SymptomWeight("indigestion", 9),
            new SymptomWeight("gas", 7),
            new SymptomWeight("acid reflux", 10),
            new SymptomWeight("appetite loss", 7)
        ));

        // Cold & Flu symptoms and weights
        DISEASE_SYMPTOM_MAP.put("cold flu", Arrays.asList(
            new SymptomWeight("fever", 11),
            new SymptomWeight("cough", 9),
            new SymptomWeight("cold", 8),
            new SymptomWeight("sore throat", 10),
            new SymptomWeight("runny nose", 9),
            new SymptomWeight("flu", 11),
            new SymptomWeight("sneezing", 8),
            new SymptomWeight("body aches", 9),
            new SymptomWeight("headache", 8),
            new SymptomWeight("chills", 9),
            new SymptomWeight("fatigue", 8),
            new SymptomWeight("congestion", 8)
        ));
    }

    /**
     * Analyze symptoms and return matching diseases with confidence scores
     */
    public SymptomAnalysisResponse analyzeSymptoms(String symptomsInput) {
        log.info("Analyzing symptoms: {}", symptomsInput);
        
        if (symptomsInput == null || symptomsInput.trim().isEmpty()) {
            return SymptomAnalysisResponse.builder()
                    .success(false)
                    .message("Please describe your symptoms")
                    .matches(Collections.emptyList())
                    .disclaimer(getDisclaimer())
                    .build();
        }

        String normalizedInput = symptomsInput.toLowerCase();
        List<SymptomAnalysisResponse.DiseaseMatch> matches = new ArrayList<>();

        // Calculate scores for each disease
        for (Map.Entry<String, List<SymptomWeight>> entry : DISEASE_SYMPTOM_MAP.entrySet()) {
            String diseaseKey = entry.getKey();
            List<SymptomWeight> symptomWeights = entry.getValue();

            int totalScore = 0;
            int maxPossibleScore = symptomWeights.stream()
                    .mapToInt(SymptomWeight::getWeight)
                    .sum();
            
            List<String> matchedSymptoms = new ArrayList<>();
            
            for (SymptomWeight sw : symptomWeights) {
                if (normalizedInput.contains(sw.getKeyword())) {
                    totalScore += sw.getWeight();
                    matchedSymptoms.add(sw.getKeyword());
                }
            }

            if (totalScore > 0) {
                double confidenceScore = (double) totalScore / maxPossibleScore;
                int confidencePercentage = (int) Math.min(confidenceScore * 100, 100);
                
                // Determine severity based on confidence
                SymptomAnalysisResponse.SeverityLevel severity = determineSeverity(confidencePercentage);
                
                // Get recommendation
                String recommendation = getRecommendation(diseaseKey, confidencePercentage);

                matches.add(SymptomAnalysisResponse.DiseaseMatch.builder()
                        .diseaseId(null) // Will be populated from database
                        .diseaseName(formatDiseaseName(diseaseKey))
                        .confidenceScore(confidenceScore)
                        .confidencePercentage(confidencePercentage)
                        .severity(severity)
                        .recommendation(recommendation)
                        .matchedSymptoms(matchedSymptoms)
                        .matchedCount(matchedSymptoms.size())
                        .totalSymptoms(symptomWeights.size())
                        .build());
            }
        }

        // Sort by confidence score descending
        matches.sort((a, b) -> Double.compare(b.getConfidenceScore(), a.getConfidenceScore()));

        // Limit to top 3 matches
        List<SymptomAnalysisResponse.DiseaseMatch> topMatches = matches.stream()
                .limit(3)
                .collect(Collectors.toList());

        // Enrich with disease IDs from database
        enrichWithDiseaseIds(topMatches);

        return SymptomAnalysisResponse.builder()
                .success(!topMatches.isEmpty())
                .message(topMatches.isEmpty() ? 
                        "No matching conditions found. Please try describing your symptoms differently." :
                        "Analysis complete. Please consult a healthcare professional for accurate diagnosis.")
                .matches(topMatches)
                .disclaimer(getDisclaimer())
                .build();
    }

    /**
     * Determine severity level based on confidence percentage
     */
    private SymptomAnalysisResponse.SeverityLevel determineSeverity(int confidencePercentage) {
        if (confidencePercentage >= 70) {
            return SymptomAnalysisResponse.SeverityLevel.HIGH;
        } else if (confidencePercentage >= 40) {
            return SymptomAnalysisResponse.SeverityLevel.MEDIUM;
        } else {
            return SymptomAnalysisResponse.SeverityLevel.LOW;
        }
    }

    /**
     * Get recommendation based on disease and confidence
     */
    private String getRecommendation(String diseaseKey, int confidencePercentage) {
        if (confidencePercentage >= 70) {
            return "High match detected. We strongly recommend consulting a healthcare provider for proper evaluation.";
        } else if (confidencePercentage >= 40) {
            return "Moderate match. Consider monitoring your symptoms and consult a doctor if they persist.";
        } else {
            return "Low confidence match. Please provide more detailed symptoms for better analysis.";
        }
    }

    /**
     * Format disease key to display name
     */
    private String formatDiseaseName(String key) {
        return Arrays.stream(key.split(" "))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    /**
     * Enrich matches with disease IDs from database
     */
    private void enrichWithDiseaseIds(List<SymptomAnalysisResponse.DiseaseMatch> matches) {
        List<Disease> allDiseases = diseaseRepository.findAll();
        
        for (SymptomAnalysisResponse.DiseaseMatch match : matches) {
            allDiseases.stream()
                    .filter(d -> d.getName().toLowerCase().contains(match.getDiseaseName().toLowerCase()) ||
                            match.getDiseaseName().toLowerCase().contains(d.getName().toLowerCase()))
                    .findFirst()
                    .ifPresent(d -> match.setDiseaseId(d.getId()));
        }
    }

    /**
     * Get medical disclaimer
     */
    private String getDisclaimer() {
        return "This analysis is for educational purposes only and should not be considered as medical advice. " +
               "Always consult a qualified healthcare provider for proper diagnosis and treatment.";
    }

    /**
     * Inner class to represent symptom weight
     */
    private static class SymptomWeight {
        private final String keyword;
        private final int weight;

        public SymptomWeight(String keyword, int weight) {
            this.keyword = keyword;
            this.weight = weight;
        }

        public String getKeyword() {
            return keyword;
        }

        public int getWeight() {
            return weight;
        }
    }
}
