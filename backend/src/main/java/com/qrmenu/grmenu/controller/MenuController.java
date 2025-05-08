package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.MenuItem;
import com.qrmenu.grmenu.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import com.qrmenu.grmenu.model.Category;

/**
 * MenuController, menü öğeleri için REST API endpoint'lerini sağlar.
 * CRUD (Create, Read, Update, Delete) işlemlerini ve özel sorguları yönetir.
 * Tüm endpoint'ler /api/menu altında bulunur.
 */
@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {
    
    private static final Logger logger = LoggerFactory.getLogger(MenuController.class);
    
    @Autowired
    private MenuItemRepository menuItemRepository;

    // Tüm menü öğelerini listeler
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        try {
            List<MenuItem> items = menuItemRepository.findAll();
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            logger.error("Error getting all menu items: ", e);            //.\mvnw.cmd spring-boot:run
            throw e;
        }
    }

    // Yeni bir menü öğesi oluşturur
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem item) {
        try {
            logger.info("Creating menu item: {}", item);
            MenuItem savedItem = menuItemRepository.save(item);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            logger.error("Error creating menu item: ", e);
            throw e;
        }
    }

    // ID'ye göre menü öğesi getirir
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable String id) {
        try {
            return menuItemRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error getting menu item by id {}: ", id, e);
            throw e;
        }
    }

    // Mevcut bir menü öğesini günceller
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable String id, @RequestBody MenuItem item) {
        try {
            return menuItemRepository.findById(id)
                    .map(existingItem -> {
                        item.setId(id);
                        return ResponseEntity.ok(menuItemRepository.save(item));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error updating menu item {}: ", id, e);
            throw e;
        }
    }

    // Menü öğesini siler
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable String id) {
        try {
            return menuItemRepository.findById(id)
                    .map(item -> {
                        menuItemRepository.delete(item);
                        return ResponseEntity.ok().<Void>build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error deleting menu item {}: ", id, e);
            throw e;
        }
    }

    // Kategoriye göre menü öğelerini getirir
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable String category) {
        try {
            Category categoryEnum = Category.valueOf(category.toUpperCase());
            return ResponseEntity.ok(menuItemRepository.findByCategory(categoryEnum));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Sadece mevcut olan menü öğelerini getirir
    @GetMapping("/available")
    public ResponseEntity<List<MenuItem>> getAvailableMenuItems() {
        return ResponseEntity.ok(menuItemRepository.findByAvailable(true));
    }
}