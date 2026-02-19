package com.ht.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ht.dto.request.ExpenseRequest;
import com.ht.dto.response.ExpenseResponse;
import com.ht.service.ExpenseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping("/trip/{tripId}")
    public ResponseEntity<ExpenseResponse> addExpense(
            @PathVariable Long tripId,
            @Valid @RequestBody ExpenseRequest request
    ) {
        return new ResponseEntity<>(expenseService.addExpense(tripId, request), HttpStatus.CREATED);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<ExpenseResponse>> getTripExpenses(@PathVariable Long tripId) {
        return ResponseEntity.ok(expenseService.getTripExpenses(tripId));
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId) {
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.noContent().build();
    }
}