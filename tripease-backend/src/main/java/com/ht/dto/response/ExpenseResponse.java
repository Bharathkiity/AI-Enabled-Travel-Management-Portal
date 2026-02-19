package com.ht.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal amount;
    private LocalDate expenseDate;
    private String category;
    private Long tripId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}