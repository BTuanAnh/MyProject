package com.example.artgallery.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * Utility class for handling JWT operations such as token generation, validation, and claim extraction.
 */
@Component
public class JwtUtil {
    private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());

    @Value("${jwt.secret:yourverysecuresecretkey1234567890abcdef}")
    private String secret;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes()); // Tạo key an toàn cho HS256
    }

    /**
     * Extracts the username from the JWT token.
     * @param token JWT token
     * @return Username (subject) from the token
     * @throws Exception if token parsing fails
     */
    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            LOGGER.severe("Error extracting username from token: " + token + ", error: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Extracts the expiration date from the JWT token.
     * @param token JWT token
     * @return Expiration date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts a specific claim from the JWT token.
     * @param token JWT token
     * @param claimsResolver Function to extract the claim
     * @return Claim value
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts all claims from the JWT token.
     * @param token JWT token
     * @return Claims object
     * @throws Exception if token parsing fails
     */
    private Claims extractAllClaims(String token) {
        try {
            LOGGER.info("Parsing JWT: " + token);
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            LOGGER.severe("Error parsing JWT: " + token + ", error: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Checks if the token is expired.
     * @param token JWT token
     * @return True if token is expired, false otherwise
     */
    private Boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            LOGGER.severe("Error checking token expiration: " + token + ", error: " + e.getMessage());
            return true;
        }
    }

    /**
     * Generates a JWT token for the given user.
     * @param userDetails User details
     * @return JWT token
     * @throws IllegalArgumentException if username is null or empty
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Thêm vai trò vào claims (bỏ tiền tố ROLE_ để tương thích frontend)
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(role -> role.startsWith("ROLE_") ? role.substring(5) : role)
                .collect(Collectors.toList()));
        String subject = userDetails.getUsername();
        if (subject == null || subject.isEmpty()) {
            LOGGER.severe("Cannot generate token: username is null or empty");
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        String token = createToken(claims, subject);
        LOGGER.info("Generated token for user: " + subject + ", roles: " + claims.get("roles"));
        return token;
    }

    /**
     * Creates a JWT token with the given claims and subject.
     * @param claims Claims to include in the token
     * @param subject Username
     * @return JWT token
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 giờ
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validates the JWT token against user details.
     * @param token JWT token
     * @param userDetails User details
     * @return True if token is valid, false otherwise
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            boolean isValid = username.equals(userDetails.getUsername()) && !isTokenExpired(token);
            LOGGER.info("Token validation for user: " + username + ", valid: " + isValid);
            return isValid;
        } catch (Exception e) {
            LOGGER.severe("Error validating token: " + token + ", error: " + e.getMessage());
            return false;
        }
    }
}