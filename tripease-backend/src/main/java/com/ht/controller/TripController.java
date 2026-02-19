package com.ht.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ht.dto.request.TripRequest;
import com.ht.dto.response.TripResponse;
import com.ht.service.TripService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping
    public ResponseEntity<TripResponse> createTrip(@Valid @RequestBody TripRequest request) {
        return new ResponseEntity<>(tripService.createTrip(request), HttpStatus.CREATED);
    }

    @PutMapping("/{tripId}")
    public ResponseEntity<TripResponse> updateTrip(
            @PathVariable Long tripId,
            @Valid @RequestBody TripRequest request
    ) {
        return ResponseEntity.ok(tripService.updateTrip(tripId, request));
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long tripId) {
        tripService.deleteTrip(tripId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllUserTrips() {
        return ResponseEntity.ok(tripService.getAllUserTrips());
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long tripId) {
        return ResponseEntity.ok(tripService.getTripById(tripId));
    }
}