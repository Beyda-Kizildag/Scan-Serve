package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.Order;
import com.qrmenu.grmenu.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Create a new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        order.setStatus("pending");
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }

    // Get pending orders
    @GetMapping("/pending")
    public ResponseEntity<List<Order>> getPendingOrders() {
        List<Order> orders = orderRepository.findByStatus("pending");
        return ResponseEntity.ok(orders);
    }

    // Approve an order
    @PostMapping("/{id}/approve")
    public ResponseEntity<Order> approveOrder(@PathVariable String id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus("approved");
            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an order
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        return orderRepository.findById(id).map(existingOrder -> {
            updatedOrder.setId(id);
            Order savedOrder = orderRepository.save(updatedOrder);
            return ResponseEntity.ok(savedOrder);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        return orderRepository.findById(id).map(order -> {
            orderRepository.delete(order);
            return ResponseEntity.ok().<Void>build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}