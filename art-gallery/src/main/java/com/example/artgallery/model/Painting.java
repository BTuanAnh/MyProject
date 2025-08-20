package com.example.artgallery.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity  // Đánh dấu đây là entity cho JPA
@Data    // Lombok tự tạo getter/setter/toString
public class Painting {
    @Id  // Khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Tự động tăng
    private Long id;
    private String title;      // Tiêu đề tranh
    private String description; // Mô tả
    private Double price;      // Giá
    private String imagePath; //Ảnh
    private String category;   // Danh mục
}