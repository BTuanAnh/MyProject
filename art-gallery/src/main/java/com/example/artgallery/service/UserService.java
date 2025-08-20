package com.example.artgallery.service;

import com.example.artgallery.model.User;
import com.example.artgallery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService implements UserDetailsService {
    private static final Logger LOGGER = Logger.getLogger(UserService.class.getName());

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        LOGGER.info("Attempting to register user: " + user.getUsername());
        if (repository.findByUsername(user.getUsername()).isPresent()) {
            LOGGER.warning("Username already exists: " + user.getUsername());
            throw new IllegalArgumentException("Username đã tồn tại");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Gán role với tiền tố ROLE_ cho nhất quán
        String role = user.getRole() != null && user.getRole().equals("ADMIN") ? "ROLE_ADMIN" : "ROLE_USER";
        user.setRole(role);
        User savedUser = repository.save(user);
        LOGGER.info("User registered: " + savedUser.getUsername() + " with role: " + savedUser.getRole());
        return savedUser;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOGGER.info("Loading user: " + username);
        User user = repository.findByUsername(username)
                .orElseThrow(() -> {
                    LOGGER.warning("User not found: " + username);
                    return new UsernameNotFoundException("User not found: " + username);
                });
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }

    public List<User> getAllUsers() {
        LOGGER.info("Fetching all users");
        return repository.findAll();
    }

    public User updateUser(Long id, User user) {
        LOGGER.info("Updating user with id: " + id);
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setAddress(user.getAddress());
        existingUser.setPhone(user.getPhone());
        return repository.save(existingUser);
    }

    public void deleteUser(Long id) {
        LOGGER.info("Deleting user with id: " + id);
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("User không tồn tại");
        }
        repository.deleteById(id);
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }
}
