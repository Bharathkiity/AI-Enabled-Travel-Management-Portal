package com.ht.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ht.entity.Expense;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByTripId(Long tripId);
    
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.trip.id = :tripId")
    BigDecimal sumExpensesByTripId(@Param("tripId") Long tripId);
    
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.trip.user.id = :userId")
    BigDecimal sumExpensesByUserId(@Param("userId") Long userId);
}
