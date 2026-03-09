package com.wellspring.controller;

import com.wellspring.dto.ApiResponse;
import com.wellspring.dto.SymptomAnalysisResponse;
import com.wellspring.dto.SymptomCheckRequest;
import com.wellspring.service.SymptomRuleEngineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Symptom Checker Controller - AI-powered symptom analysis
 */
@RestController
@RequestMapping("/api/symptoms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SymptomController {

    private final SymptomRuleEngineService ruleEngineService;

    /**
     * Analyze symptoms and return matching diseases with confidence scores
     */
    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse> analyzeSymptoms(@Valid @RequestBody SymptomCheckRequest request) {
        SymptomAnalysisResponse analysis = ruleEngineService.analyzeSymptoms(request.getSymptoms());
        return ResponseEntity.ok(ApiResponse.success("Symptom analysis complete", analysis));
    }

    /**
     * Quick symptom check endpoint (GET for simple queries)
     */
    @GetMapping("/check")
    public ResponseEntity<ApiResponse> quickCheck(@RequestParam String symptoms) {
        SymptomAnalysisResponse analysis = ruleEngineService.analyzeSymptoms(symptoms);
        return ResponseEntity.ok(ApiResponse.success("Symptom analysis complete", analysis));
    }
}
