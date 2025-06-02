package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.Order;
import com.qrmenu.grmenu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Siparişlerle ilgili tüm HTTP endpoint'lerini yöneten controller sınıfıdır.
 * Sipariş oluşturma, listeleme, durum güncelleme gibi işlemleri yönetir.
 */
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Tüm kaynaklardan gelen istekleri kabul eder (CORS)
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * Yeni bir sipariş oluşturur.
     * Örnek istek: POST /api/orders
     * @param order Frontend'den gelen sipariş nesnesi
     * @return Oluşturulan siparişi döner
     */
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    /**
     * Tüm siparişleri getirir.
     * @return Sipariş listesi
     */
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    /**
     * Beklemede olan (pending) siparişleri getirir.
     * @return Pending sipariş listesi
     */
    @GetMapping("/pending")
    public ResponseEntity<List<Order>> getPendingOrders() {
        return ResponseEntity.ok(orderService.getOrdersByStatus("pending"));
    }

    /**
     * Belirli bir siparişi onaylar (durumunu "approved" yapar).
     * @param id Siparişin ID'si
     * @param waiterId Garson ID'si
     * @return Onaylanmış sipariş veya 404
     */
    @PostMapping("/{id}/approve")
    public ResponseEntity<Order> approveOrder(
            @PathVariable String id,
            @RequestParam String waiterId) {
        Optional<Order> approvedOrder = orderService.approveOrder(id, waiterId);
        return approvedOrder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * ID'ye göre tek bir siparişi getirir.
     * @param id Siparişin ID'si
     * @return Sipariş nesnesi veya 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Mevcut bir siparişi günceller.
     * @param id Güncellenecek siparişin ID'si
     * @param updatedOrder Yeni sipariş verisi
     * @return Güncellenmiş sipariş veya 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        return orderService.updateOrder(id, updatedOrder)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Siparişi veritabanından siler.
     * @param id Silinecek siparişin ID'si
     * @return 200 OK veya 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        boolean deleted = orderService.deleteOrder(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
