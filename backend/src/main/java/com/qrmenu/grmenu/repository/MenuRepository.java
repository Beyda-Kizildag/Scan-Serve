package com.qrmenu.grmenu.repository;

import com.qrmenu.grmenu.model.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends MongoRepository<Menu, String> {
    List<Menu> findByRestaurantId(String restaurantId);
    List<Menu> findByIsActive(boolean isActive);
} 