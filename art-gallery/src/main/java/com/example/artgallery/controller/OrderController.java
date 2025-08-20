package com.example.artgallery.controller;

import com.example.artgallery.model.Order;
import com.example.artgallery.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private static final Logger LOGGER = Logger.getLogger(OrderController.class.getName());

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, Authentication authentication) {
        try {
            LOGGER.info("Creating order for user: " + authentication.getName());
            Order createdOrder = orderService.createOrder(order, authentication.getName());
            return ResponseEntity.ok(createdOrder);
        } catch (Exception e) {
            LOGGER.severe("Error creating order: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi tạo đơn hàng: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getOrders(Authentication authentication) {
        try {
            LOGGER.info("Fetching orders for user: " + authentication.getName());
            List<Order> orders = orderService.getOrdersByUser(authentication.getName());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            LOGGER.severe("Error fetching orders: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi lấy danh sách đơn hàng: " + e.getMessage());
        }
    }

    // Cho admin: Lấy tất cả đơn hàng
    @GetMapping("/admin")
    public ResponseEntity<?> getAllOrders() {
        try {
            LOGGER.info("Admin fetching all orders");
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            LOGGER.severe("Error fetching all orders: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi lấy danh sách đơn hàng: " + e.getMessage());
        }
    }

    // Cho admin: Cập nhật trạng thái đơn hàng
    @PutMapping("/admin/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody String status) {
        try {
            LOGGER.info("Admin updating order status for orderId: " + orderId);
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            LOGGER.severe("Error updating order status: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi cập nhật trạng thái đơn hàng: " + e.getMessage());
        }
    }

    // Cho admin: Xóa đơn hàng
    @DeleteMapping("/admin/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        try {
            LOGGER.info("Admin deleting order with id: " + orderId);
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok("Xóa đơn hàng thành công");
        } catch (Exception e) {
            LOGGER.severe("Error deleting order: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi xóa đơn hàng: " + e.getMessage());
        }
    }
}