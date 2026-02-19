package com.ht.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.ht.entity.Trip.TripStatus;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class TripRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Budget is required")
    @Positive(message = "Budget must be positive")
    private BigDecimal budget;

    private TripStatus status;
}
