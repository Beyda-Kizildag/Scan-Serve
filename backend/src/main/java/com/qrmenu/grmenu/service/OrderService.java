package com.qrmenu.grmenu.service;

import com.qrmenu.grmenu.model.Order;
import com.qrmenu.grmenu.model.User;
import com.qrmenu.grmenu.repository.OrderRepository;
import com.qrmenu.grmenu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Order createOrder(Order order) {
        order.setStatus("pending");
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Optional<Order> approveOrder(String id, String waiterId) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        Optional<User> waiterOpt = userRepository.findById(waiterId);

        if (orderOpt.isPresent() && waiterOpt.isPresent()) {
            Order order = orderOpt.get();
            User waiter = waiterOpt.get();

            if (!"WAITER".equals(waiter.getRole())) {
                return Optional.empty();
            }

            order.setStatus("approved");
            order.setApprovedByWaiterId(waiter.getId());
            order.setApprovedByWaiterName(waiter.getName());
            order.setApprovedAt(LocalDateTime.now());

            // Garsonun performans kaydını güncelle
            User.PerformanceRecord performanceRecord = new User.PerformanceRecord();
            performanceRecord.setDate(LocalDateTime.now());
            performanceRecord.setTotalOrders(1);
            performanceRecord.setTotalAmount(order.getTotalPrice());
            performanceRecord.setOrderItems(order.getItems().stream()
                    .map(item -> new User.PerformanceRecord.OrderItem(
                            item.getName(),
                            item.getQuantity(),
                            item.getPrice()))
                    .collect(java.util.stream.Collectors.toList()));

            List<User.PerformanceRecord> records = waiter.getPerformanceRecords();
            if (records == null) {
                records = new java.util.ArrayList<>();
            }
            records.add(performanceRecord);
            waiter.setPerformanceRecords(records);
            userRepository.save(waiter);

            return Optional.of(orderRepository.save(order));
        }
        return Optional.empty();
    }

    public Optional<Order> updateOrder(String id, Order updatedOrder) {
        return orderRepository.findById(id).map(existingOrder -> {
            updatedOrder.setId(id);
            return orderRepository.save(updatedOrder);
        });
    }

    public boolean deleteOrder(String id) {
        return orderRepository.findById(id).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
    }
}
