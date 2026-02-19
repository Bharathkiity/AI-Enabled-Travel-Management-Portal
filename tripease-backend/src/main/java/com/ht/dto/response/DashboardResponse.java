package com.ht.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private Long totalTrips;
    private BigDecimal totalExpenses;
    private List<TripResponse> upcomingTrips;
    private BudgetSummary budgetSummary;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BudgetSummary {
        private BigDecimal totalBudget;
        private BigDecimal totalSpent;
        private BigDecimal remainingBudget;
        private double percentageUsed;
    }
}