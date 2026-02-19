package com.ht.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ht.dto.request.TripRequest;
import com.ht.dto.response.TripResponse;
import com.ht.entity.Trip;
import com.ht.entity.User;
import com.ht.exception.ResourceNotFoundException;
import com.ht.exception.UnauthorizedException;
import com.ht.mapper.TripMapper;
import com.ht.repository.TripRepository;
import com.ht.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final TripMapper tripMapper;

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    @Transactional
    public TripResponse createTrip(TripRequest request) {
        User currentUser = getCurrentUser();
        Trip trip = tripMapper.toEntity(request, currentUser);
        Trip savedTrip = tripRepository.save(trip);
        return tripMapper.toResponse(savedTrip);
    }

    @Transactional
    public TripResponse updateTrip(Long tripId, TripRequest request) {
        User currentUser = getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));

        if (!trip.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this trip");
        }

        tripMapper.updateEntity(request, trip);
        Trip updatedTrip = tripRepository.save(trip);
        return tripMapper.toResponse(updatedTrip);
    }

    @Transactional
    public void deleteTrip(Long tripId) {
        User currentUser = getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));

        if (!trip.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this trip");
        }

        tripRepository.delete(trip);
    }

    public List<TripResponse> getAllUserTrips() {
        User currentUser = getCurrentUser();
        return tripRepository.findByUserId(currentUser.getId())
                .stream()
                .map(tripMapper::toResponse)
                .collect(Collectors.toList());
    }

    public TripResponse getTripById(Long tripId) {
        User currentUser = getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));

        if (!trip.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to view this trip");
        }

        return tripMapper.toResponse(trip);
    }
}