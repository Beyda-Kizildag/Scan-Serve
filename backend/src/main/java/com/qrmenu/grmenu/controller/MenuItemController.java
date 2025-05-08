package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.Category;
import com.qrmenu.grmenu.model.MenuItem;
import com.qrmenu.grmenu.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/menu-item")
@CrossOrigin(origins = "*")
public class MenuItemController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    // @GetMapping("/menu-item/category/{category}")
    // public List<MenuItem> getMenuItemsByCategory(@PathVariable Category category) {
    //     return menuItemRepository.findByCategory(category);
    // }

    @GetMapping("/category/{category}")
    public List<MenuItem> getMenuItemsByCategory(@PathVariable String category) {
    try {
        Category categoryEnum = Category.valueOf(category.toUpperCase());
        return menuItemRepository.findByCategory(categoryEnum);
    } catch (IllegalArgumentException e) {
        return new ArrayList<>(); // Geçersiz kategori için boş liste döner
    }
}

    @GetMapping("/available")
    public List<MenuItem> getAvailableMenuItems() {
        return menuItemRepository.findByAvailable(true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable String id) {
        return menuItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MenuItem createMenuItem(@RequestBody MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable String id, @RequestBody MenuItem updatedItem) {
        Optional<MenuItem> existingItemOptional = menuItemRepository.findById(id);

        if (existingItemOptional.isPresent()) {
            MenuItem existingItem = existingItemOptional.get();
            existingItem.setName(updatedItem.getName());
            existingItem.setDescription(updatedItem.getDescription());
            existingItem.setPrice(updatedItem.getPrice());
            existingItem.setCategory(updatedItem.getCategory());
            existingItem.setAvailable(updatedItem.isAvailable());
            existingItem.setImageUrl(updatedItem.getImageUrl());

            MenuItem savedItem = menuItemRepository.save(existingItem);
            return ResponseEntity.ok(savedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable String id) {
        return menuItemRepository.findById(id)
                .map(menuItem -> {
                    menuItemRepository.delete(menuItem);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}