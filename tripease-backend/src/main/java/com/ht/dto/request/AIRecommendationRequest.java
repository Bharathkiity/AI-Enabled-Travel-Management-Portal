package com.ht.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AIRecommendationRequest {
    @NotBlank(message = "Destination is required")
    private String destination;

    private String budgetRange;

    private String preferences;
}