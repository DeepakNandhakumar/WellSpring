package com.wellspring.service;

import com.wellspring.dto.*;

/**
 * Authentication Service Interface
 */
public interface AuthService {

    /**
     * Register a new user
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Login user and return JWT token
     */
    AuthResponse login(LoginRequest request);

    /**
     * Get current user profile
     */
    UserDto getCurrentUser(Long userId);
}
