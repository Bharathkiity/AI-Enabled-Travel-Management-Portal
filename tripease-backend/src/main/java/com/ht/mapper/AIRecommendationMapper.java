package com.ht.mapper;


import org.springframework.stereotype.Component;

import com.ht.dto.response.AIRecommendationResponse;
import com.ht.entity.AIRecommendation;

@Component
public class AIRecommendationMapper {
    
    public AIRecommendationResponse toResponse(AIRecommendation recommendation) {
        return AIRecommendationResponse.builder()
                .id(recommendation.getId())
                .type(recommendation.getType())
                .content(recommendation.getContent())
                .destination(recommendation.getDestination())
                .budgetRange(recommendation.getBudgetRange())
                .createdAt(recommendation.getCreatedAt())
                .build();
    }
}