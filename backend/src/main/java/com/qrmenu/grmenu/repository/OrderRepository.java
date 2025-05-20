package com.qrmenu.grmenu.repository;

import com.qrmenu.grmenu.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByStatus(String status);
}