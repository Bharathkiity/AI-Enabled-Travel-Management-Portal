package com.ht.mapper;


import org.springframework.stereotype.Component;

import com.ht.dto.request.ExpenseRequest;
import com.ht.dto.response.ExpenseResponse;
import com.ht.entity.Expense;
import com.ht.entity.Trip;

@Component
public class ExpenseMapper {
    
    public Expense toEntity(ExpenseRequest request, Trip trip) {
        return Expense.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .amount(request.getAmount())
                .expenseDate(request.getExpenseDate())
                .category(request.getCategory())
                .trip(trip)
                .build();
    }
    
    public ExpenseResponse toResponse(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .description(expense.getDescription())
                .amount(expense.getAmount())
                .expenseDate(expense.getExpenseDate())
                .category(expense.getCategory())
                .tripId(expense.getTrip().getId())
                .createdAt(expense.getCreatedAt())
                .updatedAt(expense.getUpdatedAt())
                .build();
    }
}