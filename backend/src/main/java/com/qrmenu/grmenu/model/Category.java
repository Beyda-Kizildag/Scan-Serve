package com.qrmenu.grmenu.model;

public enum Category {
    // Kahve Kategorileri
    HOT_COFFEE("Sıcak Kahveler"),
    COLD_COFFEE("Soğuk Kahveler"),
    SPECIALTY_COFFEE("Özel Kahveler"),
    TURKISH_COFFEE("Türk Kahveleri"),
    
    // Çay Kategorileri
    BLACK_TEA("Siyah Çaylar"),
    HERBAL_TEA("Bitki Çayları"),
    
    // Tatlı Kategorileri
    CAKE("Pastalar"),
    TRADITIONAL_DESSERT("Geleneksel Tatlılar"),
    COLD_DESSERT("Soğuk Tatlılar"),
    SPECIALTY_DESSERT("Özel Tatlılar");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
} 