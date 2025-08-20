package com.example.artgallery.service;

import com.example.artgallery.model.Order;
import com.example.artgallery.model.User;
import com.example.artgallery.repository.OrderRepository;
import com.example.artgallery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

@Service
public class OrderService {
    private static final Logger LOGGER = Logger.getLogger(OrderService.class.getName());

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Order createOrder(Order order, String username) {
        LOGGER.info("Creating order for user: " + username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        // Tính totalAmount dựa trên paintingIds nếu cần
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(String username) {
        LOGGER.info("Fetching orders for user: " + username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
        return orderRepository.findByUser(user);
    }

    // Cho admin: Lấy tất cả đơn hàng
    public List<Order> getAllOrders() {
        LOGGER.info("Fetching all orders");
        return orderRepository.findAll();
    }

    // Cho admin: Cập nhật trạng thái đơn hàng
    public Order updateOrderStatus(Long orderId, String status) {
        LOGGER.info("Updating order status for orderId: " + orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order không tồn tại"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Cho admin: Xóa đơn hàng
    public void deleteOrder(Long orderId) {
        LOGGER.info("Deleting order with id: " + orderId);
        if (!orderRepository.existsById(orderId)) {
            throw new IllegalArgumentException("Order không tồn tại");
        }
        orderRepository.deleteById(orderId);
    }
}