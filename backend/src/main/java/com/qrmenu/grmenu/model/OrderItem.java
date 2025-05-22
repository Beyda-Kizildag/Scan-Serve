package com.qrmenu.grmenu.model;

/**
 * OrderItem sınıfı, bir siparişteki tekil ürünleri ve bunlara ait bilgileri tutar.
 * Her ürün için: ürün adı, fiyatı, adet bilgisi, ürün ID'si ve görsel URL'si bulunur.
 */

public class OrderItem {
    private String menuItemId;   // Menüdeki ürünün ID'si
    private String name;         // Ürün adı
    private String description;  // Ürün açıklaması
    private double price;        // Ürün fiyatı
    private int quantity;        // Sipariş edilen adet
    private String imageUrl;     // Ürünün görseli

    // Boş constructor (Gerekli)
    public OrderItem() {}

    // Parametreli constructor
    public OrderItem(String menuItemId, String name, String description, double price, int quantity, String imageUrl) {
        this.menuItemId = menuItemId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }

    // Getter ve Setter'lar

    public String getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(String menuItemId) {
        this.menuItemId = menuItemId;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
