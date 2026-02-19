package com.ht.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ht.entity.AIRecommendation;

import java.util.List;

@Repository
public interface AIRecommendationRepository extends JpaRepository<AIRecommendation, Long> {
    List<AIRecommendation> findByUserId(Long userId);
}
