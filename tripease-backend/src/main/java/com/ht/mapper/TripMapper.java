package com.ht.mapper;


import java.math.BigDecimal;

import org.springframework.stereotype.Component;

import com.ht.dto.request.TripRequest;
import com.ht.dto.response.TripResponse;
import com.ht.entity.Trip;
import com.ht.entity.User;

@Component
public class TripMapper {
    
    public Trip toEntity(TripRequest request, User user) {
        return Trip.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .destination(request.getDestination())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .budget(request.getBudget())
                .totalExpenses(BigDecimal.ZERO)
                .status(request.getStatus() != null ? request.getStatus() : Trip.TripStatus.PLANNING)
                .user(user)
                .build();
    }
    
    public TripResponse toResponse(Trip trip) {
        return TripResponse.builder()
                .id(trip.getId())
                .title(trip.getTitle())
                .description(trip.getDescription())
                .destination(trip.getDestination())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .budget(trip.getBudget())
                .totalExpenses(trip.getTotalExpenses())
                .status(trip.getStatus())
                .userId(trip.getUser().getId())
                .createdAt(trip.getCreatedAt())
                .updatedAt(trip.getUpdatedAt())
                .build();
    }
    
    public void updateEntity(TripRequest request, Trip trip) {
        if (request.getTitle() != null) trip.setTitle(request.getTitle());
        if (request.getDescription() != null) trip.setDescription(request.getDescription());
        if (request.getDestination() != null) trip.setDestination(request.getDestination());
        if (request.getStartDate() != null) trip.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) trip.setEndDate(request.getEndDate());
        if (request.getBudget() != null) trip.setBudget(request.getBudget());
        if (request.getStatus() != null) trip.setStatus(request.getStatus());
    }
}