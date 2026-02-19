package com.ht.service;


import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ht.dto.request.ExpenseRequest;
import com.ht.dto.response.ExpenseResponse;
import com.ht.entity.Expense;
import com.ht.entity.Trip;
import com.ht.entity.User;
import com.ht.exception.ResourceNotFoundException;
import com.ht.exception.UnauthorizedException;
import com.ht.mapper.ExpenseMapper;
import com.ht.repository.ExpenseRepository;
import com.ht.repository.TripRepository;
import com.ht.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    @Transactional
    public ExpenseResponse addExpense(Long tripId, ExpenseRequest request) {
        User currentUser = getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));

        if (!trip.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to add expenses to this trip");
        }

        Expense expense = expenseMapper.toEntity(request, trip);
        Expense savedExpense = expenseRepository.save(expense);

        // Update trip total expenses
        BigDecimal totalExpenses = expenseRepository.sumExpensesByTripId(tripId);
        trip.setTotalExpenses(totalExpenses);
        tripRepository.save(trip);

        return expenseMapper.toResponse(savedExpense);
    }

    public List<ExpenseResponse> getTripExpenses(Long tripId) {
        User currentUser = getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));

        if (!trip.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to view expenses for this trip");
        }

        return expenseRepository.findByTripId(tripId)
                .stream()
                .map(expenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteExpense(Long expenseId) {
        User currentUser = getCurrentUser();
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + expenseId));

        if (!expense.getTrip().getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this expense");
        }

        Long tripId = expense.getTrip().getId();
        expenseRepository.delete(expense);

        // Update trip total expenses
        BigDecimal totalExpenses = expenseRepository.sumExpensesByTripId(tripId);
        Trip trip = expense.getTrip();
        trip.setTotalExpenses(totalExpenses);
        tripRepository.save(trip);
    }
}