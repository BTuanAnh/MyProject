package com.example.artgallery.repository;

import com.example.artgallery.model.Order;
import com.example.artgallery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}