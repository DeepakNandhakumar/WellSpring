package com.wellspring.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider();
        // HS512 requires a key of at least 512 bits (64 bytes).
        ReflectionTestUtils.setField(
                tokenProvider,
                "jwtSecret",
                "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
        );
        ReflectionTestUtils.setField(tokenProvider, "jwtExpiration", 60_000L);
    }

    @Test
    void generatedTokenCanBeValidatedAndItsClaimsRead() {
        String token = tokenProvider.generateTokenFromUserId(
                42L,
                "deepak@example.test",
                "ROLE_USER"
        );

        assertNotNull(token);
        assertTrue(tokenProvider.validateToken(token));
        assertEquals(42L, tokenProvider.getUserIdFromToken(token));
        assertEquals("deepak@example.test", tokenProvider.getEmailFromToken(token));
        assertEquals("ROLE_USER", tokenProvider.getRoleFromToken(token));
    }

    @Test
    void malformedTokenIsRejected() {
        assertFalse(tokenProvider.validateToken("not-a-valid-jwt"));
    }

    @Test
    void expiredTokenIsRejected() {
        ReflectionTestUtils.setField(tokenProvider, "jwtExpiration", -1_000L);
        String expiredToken = tokenProvider.generateTokenFromUserId(
                7L,
                "expired@example.test",
                "ROLE_USER"
        );

        assertFalse(tokenProvider.validateToken(expiredToken));
    }
}
