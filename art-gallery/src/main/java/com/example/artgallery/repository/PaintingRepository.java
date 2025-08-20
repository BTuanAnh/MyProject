package com.example.artgallery.repository;

import com.example.artgallery.model.Painting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaintingRepository extends JpaRepository<Painting, Long> {
    // Không cần viết code, JPA tự tạo findAll(), save(), deleteById(), v.v.
}