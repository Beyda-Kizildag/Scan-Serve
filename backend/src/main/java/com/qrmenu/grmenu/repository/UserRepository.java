package com.qrmenu.grmenu.repository;

import com.qrmenu.grmenu.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByRoleAndActive(String role, boolean active);
    
    Optional<User> findByName(String name);
    
    @Query(value = "{'role': 'WAITER', 'active': true, 'performanceRecords': {$elemMatch: {'date': {$gte: ?0, $lt: ?1}}}}")
    List<User> findWaitersWithPerformanceInDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query(value = "{'role': 'WAITER', 'active': true, 'performanceRecords': {$elemMatch: {'date': {$gte: ?0, $lt: ?1}}}}", 
           sort = "{'performanceRecords.totalAmount': -1}")
    List<User> findTopPerformingWaiters(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query(value = "{'role': 'WAITER', 'active': true, 'performanceRecords': {$exists: true, $ne: []}}")
    List<User> findWaitersWithPerformance();
    
    @Query(value = "{'role': 'WAITER', 'active': true, 'performanceRecords.date': {$gte: ?0, $lte: ?1}}", 
           count = true)
    long countActiveWaitersInDateRange(LocalDateTime startDate, LocalDateTime endDate);
}