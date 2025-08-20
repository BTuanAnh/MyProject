package com.example.artgallery.controller;

import com.example.artgallery.model.User;
import com.example.artgallery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/admin/users")
public class AdminController {
    private static final Logger LOGGER = Logger.getLogger(AdminController.class.getName());

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            LOGGER.info("Admin fetching all users");
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            LOGGER.severe("Error fetching users: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi lấy danh sách user: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            LOGGER.info("Admin updating user with id: " + id);
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            LOGGER.severe("Error updating user: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi cập nhật user: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            LOGGER.info("Admin deleting user with id: " + id);
            userService.deleteUser(id);
            return ResponseEntity.ok("Xóa user thành công");
        } catch (Exception e) {
            LOGGER.severe("Error deleting user: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi xóa user: " + e.getMessage());
        }
    }
}