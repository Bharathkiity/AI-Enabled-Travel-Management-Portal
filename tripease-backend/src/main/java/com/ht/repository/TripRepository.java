package com.ht.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ht.entity.Trip;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserId(Long userId);
    
    @Query("SELECT t FROM Trip t WHERE t.user.id = :userId AND t.startDate > :currentDate ORDER BY t.startDate ASC")
    List<Trip> findUpcomingTripsByUser(@Param("userId") Long userId, @Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT COUNT(t) FROM Trip t WHERE t.user.id = :userId")
    Long countTripsByUserId(@Param("userId") Long userId);
}
