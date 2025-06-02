package com.qrmenu.grmenu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.time.LocalDateTime;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private String approvedByWaiterId; // Onaylayan garsonun ID'si
    private String approvedByWaiterName; // Onaylayan garsonun adı
    private int tableNumber;
    private List<OrderItem> items; // Artık MenuItem değil, OrderItem listesi
    private double totalPrice;
    private String status; // e.g., "Pending", "Completed"
    private long timestamp;
    private String note; // Sipariş notu
    private LocalDateTime approvedAt; // Onaylanma zamanı

    public Order() {}

    public Order(String userId, int tableNumber, List<OrderItem> items, double totalPrice, String status, long timestamp) {
        this.userId = userId;
        this.tableNumber = tableNumber;
        this.items = items;
        this.totalPrice = totalPrice;
        this.status = status;
        this.timestamp = timestamp;
        this.note = note;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(int tableNumber) {
        this.tableNumber = tableNumber;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
       this.note = note;
    }

    public String getApprovedByWaiterId() {
        return approvedByWaiterId;
    }

    public void setApprovedByWaiterId(String approvedByWaiterId) {
        this.approvedByWaiterId = approvedByWaiterId;
    }

    public String getApprovedByWaiterName() {
        return approvedByWaiterName;
    }

    public void setApprovedByWaiterName(String approvedByWaiterName) {
        this.approvedByWaiterName = approvedByWaiterName;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }
}
