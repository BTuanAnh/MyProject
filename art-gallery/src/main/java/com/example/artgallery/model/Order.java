package com.example.artgallery.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Liên kết với User thay vì Customer
    private User user;

    @ElementCollection
    @CollectionTable(name = "order_paintings", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "painting_id")
    private List<Long> paintingIds;

    private LocalDateTime orderDate;
    private String status; // Ví dụ: "PENDING", "COMPLETED", "CANCELLED"
    private double totalAmount;
}