package com.example.artgallery.controller;

import com.example.artgallery.model.Painting;
import com.example.artgallery.service.PaintingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/paintings")
public class PaintingController {
    @Autowired
    private PaintingService service;

    @GetMapping
    public List<Painting> getAllPaintings() {
        return service.getAllPaintings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Painting> getPaintingById(@PathVariable Long id) {
        Painting painting = service.getPaintingById(id);
        return painting != null ? ResponseEntity.ok(painting) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Painting createPainting(@RequestBody Painting painting) {
        return service.savePainting(painting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Painting> updatePainting(@PathVariable Long id, @RequestBody Painting painting) {
        Painting existing = service.getPaintingById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        painting.setId(id);
        return ResponseEntity.ok(service.savePainting(painting));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePainting(@PathVariable Long id) {
        if (service.getPaintingById(id) == null) return ResponseEntity.notFound().build();
        service.deletePainting(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPainting(@RequestPart("painting") Painting painting,
                                            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                String uploadDir = "src/main/resources/static/images/";
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, image.getBytes());
                painting.setImagePath("/images/" + fileName);
            } else {
                painting.setImagePath(null);
            }
            Painting savedPainting = service.savePainting(painting);
            return ResponseEntity.ok(savedPainting);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi lưu file ảnh: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi server: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/upload")
    public ResponseEntity<?> updatePaintingWithImage(@PathVariable Long id,
                                                     @RequestPart("painting") Painting painting,
                                                     @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            Painting existing = service.getPaintingById(id);
            if (existing == null) return ResponseEntity.notFound().build();

            // Cập nhật thông tin tranh
            painting.setId(id);
            if (image != null && !image.isEmpty()) {
                // Xóa ảnh cũ nếu có
                if (existing.getImagePath() != null) {
                    Path oldImagePath = Paths.get("src/main/resources/static" + existing.getImagePath());
                    Files.deleteIfExists(oldImagePath);
                }
                // Lưu ảnh mới
                String uploadDir = "src/main/resources/static/images/";
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, image.getBytes());
                painting.setImagePath("/images/" + fileName);
            } else {
                // Giữ ảnh cũ nếu không upload ảnh mới
                painting.setImagePath(existing.getImagePath());
            }
            Painting savedPainting = service.savePainting(painting);
            return ResponseEntity.ok(savedPainting);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi lưu file ảnh: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi server: " + e.getMessage());
        }
    }
}