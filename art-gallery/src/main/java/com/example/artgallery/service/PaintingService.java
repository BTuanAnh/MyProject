package com.example.artgallery.service;

import com.example.artgallery.model.Painting;
import com.example.artgallery.repository.PaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaintingService {
    @Autowired  // Tự động inject repository
    private PaintingRepository repository;

    public List<Painting> getAllPaintings() {
        return repository.findAll();
    }

    public Painting savePainting(Painting painting) {
        return repository.save(painting);
    }

    public Painting getPaintingById(Long id) {
        return repository.findById(id).orElse(null);  // Trả null nếu không tìm thấy
    }

    public void deletePainting(Long id) {
        repository.deleteById(id);
    }
}