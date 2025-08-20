package com.example.artgallery.controller;

import com.example.artgallery.model.User;
import com.example.artgallery.security.JwtUtil;
import com.example.artgallery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger LOGGER = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            LOGGER.info("Registering user: " + user.getUsername());
            if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
                return ResponseEntity.badRequest().body("Thiếu username, password hoặc email");
            }
            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            LOGGER.severe("Registration error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi đăng ký: " + e.getMessage());
        } catch (Exception e) {
            LOGGER.severe("Unexpected registration error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi đăng ký: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            LOGGER.info("Login attempt for username: " + user.getUsername());
            if (user.getUsername() == null || user.getPassword() == null) {
                LOGGER.warning("Missing username or password");
                return ResponseEntity.badRequest().body("Thiếu username hoặc password");
            }
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
            LOGGER.info("UserDetails loaded: " + userDetails.getUsername() + ", authorities: " + userDetails.getAuthorities());
            String jwt = jwtUtil.generateToken(userDetails);
            LOGGER.info("Generated JWT: " + jwt);
            return ResponseEntity.ok(jwt);
        } catch (BadCredentialsException e) {
            LOGGER.warning("Bad credentials for username: " + user.getUsername());
            return ResponseEntity.status(401).body("Tên đăng nhập hoặc mật khẩu sai");
        } catch (Exception e) {
            LOGGER.severe("Login error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Lỗi đăng nhập: " + e.getMessage());
        }
    }
}