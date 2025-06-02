package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.User;
import com.qrmenu.grmenu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waiters")
@CrossOrigin(origins = "*")
public class WaiterController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllWaiters() {
        return ResponseEntity.ok(userRepository.findByRoleAndActive("WAITER", true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getWaiterById(@PathVariable String id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createWaiter(@RequestBody User waiter) {
        waiter.setRole("WAITER");
        waiter.setActive(true);
        return ResponseEntity.ok(userRepository.save(waiter));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateWaiter(@PathVariable String id, @RequestBody User waiter) {
        return userRepository.findById(id)
                .map(existingWaiter -> {
                    if (!"WAITER".equals(existingWaiter.getRole())) {
                        return ResponseEntity.badRequest().<User>body(null);
                    }
                    existingWaiter.setName(waiter.getName());
                    existingWaiter.setEmail(waiter.getEmail());
                    return ResponseEntity.ok(userRepository.save(existingWaiter));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWaiter(@PathVariable String id) {
        return userRepository.findById(id)
                .map(waiter -> {
                    if (!"WAITER".equals(waiter.getRole())) {
                        return ResponseEntity.badRequest().body("Kullanıcı bir garson değil.");
                    }
                    waiter.setActive(false);
                    userRepository.save(waiter);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 