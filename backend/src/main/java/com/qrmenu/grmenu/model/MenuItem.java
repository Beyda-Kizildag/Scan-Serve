package com.qrmenu.grmenu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * MenuItem sınıfı, menüdeki her bir ürünü temsil eder.
 * Örneğin: Pizza, içecek, tatlı gibi.
 * MongoDB'de "menu_items" koleksiyonunda saklanır.
 */
@Document(collection = "menu_items")
public class MenuItem {
    @Id
    private String id;          // Ürünün benzersiz kimliği
    private String name;        // Ürün adı
    private String description; // Ürün açıklaması
    private double price;       // Ürün fiyatı
    private Category category;  // Ürün kategorisi (örn: Pizza, İçecek)
    private boolean available; // Ürünün mevcut olup olmadığı
    private String imageUrl;    // Ürün resminin URL'i
    private Integer favoriteCount = 0; // Favori sayısı alanı
    

    // Constructor
    public MenuItem() {}

    public MenuItem(String name, String description, double price, Category category, boolean available, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.available = available;
        this.imageUrl = imageUrl;
        this.favoriteCount = 0; // Başlangıçta 0 olarak ayarlanır
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

     public Integer getFavoriteCount() {
        return favoriteCount;
    }

    public void setFavoriteCount(Integer favoriteCount) {
        this.favoriteCount = favoriteCount;
    }
} 