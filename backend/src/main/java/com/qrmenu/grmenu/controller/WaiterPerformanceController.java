package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.User;
import com.qrmenu.grmenu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/waiter-performance")
@CrossOrigin(origins = "*")
public class WaiterPerformanceController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/waiters")
    public ResponseEntity<List<User>> getAllWaiters() {
        return ResponseEntity.ok(userRepository.findByRoleAndActive("WAITER", true));
    }

    @GetMapping("/{waiterId}")
    public ResponseEntity<?> getWaiterPerformance(
            @PathVariable String waiterId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        return userRepository.findById(waiterId)
                .map(waiter -> {
                    if (!"WAITER".equals(waiter.getRole())) {
                        return ResponseEntity.badRequest().body("Kullanıcı bir garson değil.");
                    }

                    List<User.PerformanceRecord> performances = waiter.getPerformanceRecords() != null ?
                            waiter.getPerformanceRecords().stream()
                                    .filter(record -> (record.getDate().isAfter(startOfDay) || record.getDate().isEqual(startOfDay)) && 
                                                    (record.getDate().isBefore(endOfDay) || record.getDate().isEqual(endOfDay)))
                                    .collect(Collectors.toList()) :
                            new ArrayList<>();

                    Map<String, Object> stats = new HashMap<>();
                    double totalRevenue = performances.stream()
                            .mapToDouble(User.PerformanceRecord::getTotalAmount)
                            .sum();
                    int totalOrders = performances.stream()
                            .mapToInt(User.PerformanceRecord::getTotalOrders)
                            .sum();
                    double averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

                    stats.put("waiterName", waiter.getName());
                    stats.put("totalOrders", totalOrders);
                    stats.put("totalRevenue", totalRevenue);
                    stats.put("averageOrderValue", averageOrderValue);
                    stats.put("performances", performances);

                    return ResponseEntity.ok(stats);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/approved-orders")
    public ResponseEntity<?> getApprovedOrders(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        List<User> waiters = userRepository.findWaitersWithPerformanceInDateRange(startOfDay, endOfDay);
        
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> waiterStats = waiters.stream()
                .map(waiter -> {
                    Map<String, Object> stats = new HashMap<>();
                    stats.put("waiterId", waiter.getId());
                    stats.put("waiterName", waiter.getName());
                    
                    List<User.PerformanceRecord> performances = waiter.getPerformanceRecords() != null ?
                            waiter.getPerformanceRecords().stream()
                                    .filter(record -> (record.getDate().isAfter(startOfDay) || record.getDate().isEqual(startOfDay)) && 
                                                    (record.getDate().isBefore(endOfDay) || record.getDate().isEqual(endOfDay)))
                                    .collect(Collectors.toList()) :
                            new ArrayList<>();
                    
                    int totalOrders = performances.stream()
                            .mapToInt(User.PerformanceRecord::getTotalOrders)
                            .sum();
                    double totalRevenue = performances.stream()
                            .mapToDouble(User.PerformanceRecord::getTotalAmount)
                            .sum();
                    
                    stats.put("totalOrders", totalOrders);
                    stats.put("totalRevenue", totalRevenue);
                    stats.put("performances", performances);
                    
                    return stats;
                })
                .filter(stats -> (int)stats.get("totalOrders") > 0)
                .collect(Collectors.toList());
        
        result.put("waiters", waiterStats);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/top-performers")
    public ResponseEntity<?> getTopPerformers(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        List<User> topPerformers = userRepository.findTopPerformingWaiters(startOfDay, endOfDay);
        return ResponseEntity.ok(topPerformers);
    }

    @PostMapping("/{waiterId}/performance")
    public ResponseEntity<?> addPerformanceRecord(
            @PathVariable String waiterId,
            @RequestBody User.PerformanceRecord performanceRecord) {
        
        return userRepository.findById(waiterId)
                .map(waiter -> {
                    if (!"WAITER".equals(waiter.getRole())) {
                        return ResponseEntity.badRequest().body("Kullanıcı bir garson değil.");
                    }

                    performanceRecord.setDate(LocalDateTime.now());
                    List<User.PerformanceRecord> records = waiter.getPerformanceRecords();
                    records.add(performanceRecord);
                    waiter.setPerformanceRecords(records);
                    
                    return ResponseEntity.ok(userRepository.save(waiter));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/summary/{waiterId}")
    public ResponseEntity<?> getWaiterSummary(
            @PathVariable String waiterId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.plusDays(1).atStartOfDay();

        return userRepository.findById(waiterId)
                .map(waiter -> {
                    if (!"WAITER".equals(waiter.getRole())) {
                        return ResponseEntity.badRequest().body("Kullanıcı bir garson değil.");
                    }

                    List<User.PerformanceRecord> performances = waiter.getPerformanceRecords().stream()
                            .filter(record -> (record.getDate().isAfter(startDateTime) || record.getDate().isEqual(startDateTime)) && 
                                            (record.getDate().isBefore(endDateTime) || record.getDate().isEqual(endDateTime)))
                            .collect(Collectors.toList());

                    Map<String, Object> summary = new HashMap<>();
                    summary.put("waiterName", waiter.getName());
                    summary.put("totalOrders", performances.stream()
                            .mapToInt(User.PerformanceRecord::getTotalOrders)
                            .sum());
                    summary.put("totalRevenue", performances.stream()
                            .mapToDouble(User.PerformanceRecord::getTotalAmount)
                            .sum());
                    summary.put("performances", performances);

                    return ResponseEntity.ok(summary);
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 