
package ch.wiss.m223.hangman.config;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.util.Date;

public class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    @Mock
    private Authentication authentication;

    private String secretKey = "testSecret";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void generateJwtToken_ShouldReturnValidToken() {
        String token = jwtUtils.generateJwtToken(authentication);
        assertNotNull(token, "Generated token should not be null");
    }

    @Test
    void validateJwtToken_ShouldReturnTrueForValidToken() {
        String token = Jwts.builder()
                .setSubject("testUser")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 10000))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, secretKey)
                .compact();

        assertTrue(jwtUtils.validateJwtToken(token), "Token should be valid");
    }
}
