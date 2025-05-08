package com.qrmenu.grmenu.repository;

import com.qrmenu.grmenu.model.Category;
import com.qrmenu.grmenu.model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * MenuItemRepository, menü öğelerinin veritabanı işlemlerini yönetir.
 * MongoRepository'den kalıtım alarak temel CRUD işlemlerini otomatik sağlar.
 * Özel sorgular için ek metodlar tanımlanmıştır.
 */
@Repository
public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
    // Kategoriye göre menü öğelerini getirir
    List<MenuItem> findByCategory(Category category);
    
    // Mevcut olan menü öğelerini getirir
    List<MenuItem> findByAvailable(boolean available);

    // Ürün adına göre menü öğesini getirir
    Optional<MenuItem> findByName(String name);
}