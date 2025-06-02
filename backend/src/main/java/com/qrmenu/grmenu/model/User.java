package com.qrmenu.grmenu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String password;
    private String role; // ADMIN, WAITER
    private String email;
    private boolean active;
    private List<PerformanceRecord> performanceRecords = new ArrayList<>();

    public static class PerformanceRecord {
        private LocalDateTime date;
        private int totalOrders;
        private double totalAmount;
        private List<OrderItem> orderItems;

        public static class OrderItem {
            private String itemName;
            private int quantity;
            private double price;

            public OrderItem() {}

            public OrderItem(String itemName, int quantity, double price) {
                this.itemName = itemName;
                this.quantity = quantity;
                this.price = price;
            }

            // Getters and Setters
            public String getItemName() {
                return itemName;
            }

            public void setItemName(String itemName) {
                this.itemName = itemName;
            }

            public int getQuantity() {
                return quantity;
            }

            public void setQuantity(int quantity) {
                this.quantity = quantity;
            }

            public double getPrice() {
                return price;
            }

            public void setPrice(double price) {
                this.price = price;
            }
        }

        // Getters and Setters
        public LocalDateTime getDate() {
            return date;
        }

        public void setDate(LocalDateTime date) {
            this.date = date;
        }

        public int getTotalOrders() {
            return totalOrders;
        }

        public void setTotalOrders(int totalOrders) {
            this.totalOrders = totalOrders;
        }

        public double getTotalAmount() {
            return totalAmount;
        }

        public void setTotalAmount(double totalAmount) {
            this.totalAmount = totalAmount;
        }

        public List<OrderItem> getOrderItems() {
            return orderItems;
        }

        public void setOrderItems(List<OrderItem> orderItems) {
            this.orderItems = orderItems;
        }
    }

    public User() {
        this.active = true;
        this.performanceRecords = new ArrayList<>();
    }

    public User(String name, String password, String role) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.active = true;
        this.performanceRecords = new ArrayList<>();
    }

    public User(String name, String password, String role, String email) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.email = email;
        this.active = true;
        this.performanceRecords = new ArrayList<>();
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<PerformanceRecord> getPerformanceRecords() {
        return performanceRecords;
    }

    public void setPerformanceRecords(List<PerformanceRecord> performanceRecords) {
        this.performanceRecords = performanceRecords;
    }
}