package com.ht.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ht.dto.request.AIRecommendationRequest;
import com.ht.dto.response.AIRecommendationResponse;
import com.ht.entity.AIRecommendation;
import com.ht.entity.User;
import com.ht.exception.UnauthorizedException;
import com.ht.mapper.AIRecommendationMapper;
import com.ht.repository.AIRecommendationRepository;
import com.ht.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AIRecommendationService {

    private final AIRecommendationRepository recommendationRepository;
    private final UserRepository userRepository;
    private final AIRecommendationMapper recommendationMapper;
    private final GeminiAIService geminiAIService;

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    @Transactional
    public AIRecommendationResponse generateRecommendation(AIRecommendationRequest request) {
        User currentUser = getCurrentUser();
        
        // Use Gemini AI to generate real recommendation
        AIRecommendation aiRecommendation = geminiAIService.generateTravelRecommendation(request, currentUser);
        
        return recommendationMapper.toResponse(aiRecommendation);
    }

    public List<AIRecommendationResponse> getUserRecommendations() {
        User currentUser = getCurrentUser();
        return geminiAIService.getUserRecommendations(currentUser)
                .stream()
                .map(recommendationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteRecommendation(Long recommendationId) {
        User currentUser = getCurrentUser();
        AIRecommendation recommendation = recommendationRepository.findById(recommendationId)
                .orElseThrow(() -> new RuntimeException("Recommendation not found"));
        
        if (!recommendation.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this recommendation");
        }
        
        recommendationRepository.delete(recommendation);
    }
}