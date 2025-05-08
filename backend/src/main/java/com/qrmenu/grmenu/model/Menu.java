package com.qrmenu.grmenu.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Menü sınıfı, bir restoranın menüsünü temsil eder.
 * Her menü, birden fazla menü öğesi (MenuItem) içerebilir.
 * MongoDB'de "menus" koleksiyonunda saklanır.
 */
@Data
@Document(collection = "menus")
public class Menu {
    @Id
    private String id;          // Menünün benzersiz kimliği
    private String name;        // Menü adı
    private String description; // Menü açıklaması
    private List<MenuItem> items; // Menüdeki ürünlerin listesi
    private String restaurantId;  // Bu menünün ait olduğu restoranın ID'si
    private boolean isActive;     // Menünün aktif/pasif durumu
} 