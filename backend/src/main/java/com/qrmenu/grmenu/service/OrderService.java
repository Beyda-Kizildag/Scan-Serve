package com.qrmenu.grmenu.service;

import com.qrmenu.grmenu.model.Order;
import com.qrmenu.grmenu.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

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

    public Optional<Order> approveOrder(String id) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus("approved");
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
