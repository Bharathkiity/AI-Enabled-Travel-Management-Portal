package com.ht.controller;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ht.dto.request.AIRecommendationRequest;
import com.ht.dto.response.AIRecommendationResponse;
import com.ht.service.AIRecommendationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIRecommendationController {

    private final AIRecommendationService recommendationService;

    @PostMapping("/recommendation")
    public ResponseEntity<AIRecommendationResponse> generateRecommendation(
            @Valid @RequestBody AIRecommendationRequest request
    ) {
        return new ResponseEntity<>(
                recommendationService.generateRecommendation(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<AIRecommendationResponse>> getUserRecommendations() {
        return ResponseEntity.ok(recommendationService.getUserRecommendations());
    }

    @DeleteMapping("/recommendations/{id}")
    public ResponseEntity<Void> deleteRecommendation(@PathVariable Long id) {
        recommendationService.deleteRecommendation(id);
        return ResponseEntity.noContent().build();
    }
}