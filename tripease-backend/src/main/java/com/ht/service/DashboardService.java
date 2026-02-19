package com.ht.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.ht.dto.response.DashboardResponse;
import com.ht.dto.response.TripResponse;
import com.ht.entity.Trip;
import com.ht.entity.User;
import com.ht.exception.UnauthorizedException;
import com.ht.mapper.TripMapper;
import com.ht.repository.ExpenseRepository;
import com.ht.repository.TripRepository;
import com.ht.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TripRepository tripRepository;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final TripMapper tripMapper;

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    public DashboardResponse getDashboardData() {
        User currentUser = getCurrentUser();
        Long userId = currentUser.getId();

        // Get total trips
        Long totalTrips = tripRepository.countTripsByUserId(userId);

        // Get total expenses
        BigDecimal totalExpenses = expenseRepository.sumExpensesByUserId(userId);

        // Get upcoming trips
        List<TripResponse> upcomingTrips = tripRepository
                .findUpcomingTripsByUser(userId, LocalDate.now())
                .stream()
                .map(tripMapper::toResponse)
                .collect(Collectors.toList());

        // Calculate budget summary
        DashboardResponse.BudgetSummary budgetSummary = calculateBudgetSummary(userId);

        return DashboardResponse.builder()
                .totalTrips(totalTrips)
                .totalExpenses(totalExpenses)
                .upcomingTrips(upcomingTrips)
                .budgetSummary(budgetSummary)
                .build();
    }

    private DashboardResponse.BudgetSummary calculateBudgetSummary(Long userId) {
        List<Trip> userTrips = tripRepository.findByUserId(userId);
        
        BigDecimal totalBudget = userTrips.stream()
                .map(Trip::getBudget)
                .filter(budget -> budget != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSpent = expenseRepository.sumExpensesByUserId(userId);
        BigDecimal remainingBudget = totalBudget.subtract(totalSpent);
        
        double percentageUsed = totalBudget.compareTo(BigDecimal.ZERO) > 0 
                ? totalSpent.divide(totalBudget, 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100))
                        .doubleValue()
                : 0.0;

        return DashboardResponse.BudgetSummary.builder()
                .totalBudget(totalBudget)
                .totalSpent(totalSpent)
                .remainingBudget(remainingBudget)
                .percentageUsed(percentageUsed)
                .build();
    }
}