package com.example.artgallery.security;

import com.example.artgallery.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = Logger.getLogger(JwtFilter.class.getName());

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        LOGGER.info("Processing request: " + path);

        // Bỏ qua filter cho các endpoint công khai
        if (path.startsWith("/auth/") || path.matches("/api/paintings(/\\d+)?")) {
            LOGGER.info("Bypassing JWT filter for public endpoint: " + path);
            chain.doFilter(request, response);
            return;
        }

        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Kiểm tra và trích xuất token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
            if (!token.isEmpty()) {
                try {
                    username = jwtUtil.extractUsername(token);
                } catch (Exception e) {
                    LOGGER.severe("Error extracting username from token: " + e.getMessage());
                }
            } else {
                LOGGER.warning("Empty token provided in Authorization header");
            }
        } else {
            LOGGER.warning("Authorization header missing or does not start with Bearer");
        }

        // Xác thực user nếu username hợp lệ và chưa có authentication
        if (username != null && !username.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userService.loadUserByUsername(username);
                if (jwtUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    LOGGER.info("Authenticated user: " + username + ", roles: " + userDetails.getAuthorities());
                } else {
                    LOGGER.warning("Invalid token for user: " + username);
                }
            } catch (Exception e) {
                LOGGER.severe("Error validating token or loading user: " + username + ", error: " + e.getMessage());
            }
        } else if (username == null && token != null) {
            LOGGER.warning("No username extracted from token: " + token);
        }

        chain.doFilter(request, response);
    }
}