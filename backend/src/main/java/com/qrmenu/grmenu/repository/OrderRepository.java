package com.qrmenu.grmenu.repository;

import com.qrmenu.grmenu.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Additional query methods can be defined here if needed
}