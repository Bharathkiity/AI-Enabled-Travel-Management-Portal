package com.ht.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIRecommendationResponse {
    private Long id;
    private String type;
    private String content;
    private String destination;
    private String budgetRange;
    private LocalDateTime createdAt;
}