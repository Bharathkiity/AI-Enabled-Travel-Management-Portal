package com.ht.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ht.dto.request.AIRecommendationRequest;
import com.ht.dto.request.GeminiRequest;
import com.ht.dto.response.GeminiResponse;
import com.ht.entity.AIRecommendation;
import com.ht.entity.User;
import com.ht.repository.AIRecommendationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;



@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiAIService {

    private final WebClient geminiWebClient;
    private final AIRecommendationRepository recommendationRepository;

    @Value("${gemini.model}")
    private String modelName;

    public AIRecommendation generateTravelRecommendation(AIRecommendationRequest request, User user) {
        try {
            String prompt = createTravelPrompt(request);
            String aiResponse = callGeminiAPI(prompt);
            
            AIRecommendation recommendation = AIRecommendation.builder()
                    .type("TRAVEL")
                    .content(aiResponse)
                    .destination(request.getDestination())
                    .budgetRange(request.getBudgetRange())
                    .user(user)
                    .createdAt(LocalDateTime.now())
                    .build();
            
            return recommendationRepository.save(recommendation);
            
        } catch (Exception e) {
            log.error("Error calling Gemini API: {}", e.getMessage());
            // Fallback to dummy recommendation if API fails
            return createFallbackRecommendation(request, user);
        }
    }

    private String createTravelPrompt(AIRecommendationRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert travel advisor. Provide personalized travel recommendations based on the following:\n\n");
        prompt.append(String.format("Destination: %s\n", request.getDestination()));
        
        if (request.getBudgetRange() != null && !request.getBudgetRange().isEmpty()) {
            prompt.append(String.format("Budget Range: %s\n", request.getBudgetRange()));
        }
        
        if (request.getPreferences() != null && !request.getPreferences().isEmpty()) {
            prompt.append(String.format("Preferences: %s\n", request.getPreferences()));
        }
        
        prompt.append("\nPlease provide a comprehensive travel recommendation including:\n");
        prompt.append("1. Best time to visit\n");
        prompt.append("2. Must-see attractions\n");
        prompt.append("3. Local cuisine recommendations\n");
        prompt.append("4. Accommodation suggestions\n");
        prompt.append("5. Transportation tips\n");
        prompt.append("6. Estimated daily budget breakdown\n");
        prompt.append("7. Cultural tips and local customs\n");
        prompt.append("8. Safety considerations\n\n");
        prompt.append("Format the response in a friendly, informative manner with clear sections.");
        
        return prompt.toString();
    }

    private String callGeminiAPI(String prompt) {
        GeminiRequest request = GeminiRequest.builder()
                .contents(List.of(
                    GeminiRequest.Content.builder()
                            .parts(List.of(
                                GeminiRequest.Part.builder()
                                        .text(prompt)
                                        .build()
                            ))
                            .build()
                ))
                .generationConfig(GeminiRequest.GenerationConfig.builder()
                        .temperature(0.7)
                        .maxOutputTokens(2048)
                        .topP(0.95)
                        .build())
                .build();

        try {
            GeminiResponse response = geminiWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path("/models/" + modelName + ":generateContent").build())
                    .bodyValue(request)
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                            clientResponse -> clientResponse.bodyToMono(String.class)
                                    .flatMap(errorBody -> {
                                        log.error("Gemini API error: {}", errorBody);
                                        return Mono.error(new RuntimeException("Gemini API error: " + errorBody));
                                    }))
                    .bodyToMono(GeminiResponse.class)
                    .block();

            if (response != null && response.getCandidates() != null && !response.getCandidates().isEmpty()) {
                GeminiResponse.Candidate candidate = response.getCandidates().get(0);
                if (candidate.getContent() != null && 
                    candidate.getContent().getParts() != null && 
                    !candidate.getContent().getParts().isEmpty()) {
                    return candidate.getContent().getParts().get(0).getText();
                }
            }
            
            return "Unable to generate recommendation at this time.";
            
        } catch (Exception e) {
            log.error("Error calling Gemini API: {}", e.getMessage());
            throw new RuntimeException("Failed to get AI recommendation", e);
        }
    }

    private AIRecommendation createFallbackRecommendation(AIRecommendationRequest request, User user) {
        String fallbackContent = String.format(
                "🌍 Travel Guide for %s\n\n" +
                "Based on your interests, here are some recommendations:\n\n" +
                "🏨 **Accommodation**: Consider booking hotels in the city center for easy access to attractions. " +
                "Look for places with good reviews and within your %s budget.\n\n" +
                "🍽️ **Food**: Try local restaurants away from tourist areas for authentic cuisine at better prices.\n\n" +
                "📍 **Attractions**: Mix popular tourist spots with hidden gems. Research free walking tours.\n\n" +
                "🚗 **Transport**: Public transportation is usually more economical than taxis. Consider getting a travel pass.\n\n" +
                "💡 **Tip**: Book major attractions online in advance to save time and money.",
                request.getDestination(),
                request.getBudgetRange() != null ? request.getBudgetRange() : "specified"
        );

        return AIRecommendation.builder()
                .type("TRAVEL")
                .content(fallbackContent)
                .destination(request.getDestination())
                .budgetRange(request.getBudgetRange())
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public List<AIRecommendation> getUserRecommendations(User user) {
        return recommendationRepository.findByUserId(user.getId());
    }
}