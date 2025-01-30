package ch.wiss.m223.tests;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import ch.wiss.m223.hangman.config.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import java.util.Date;

public class JwtUtilsTest {

    private JwtUtils jwtUtils;
    private final String jwtSecret = "testSecretKey";
    private final int jwtExpirationMs = 3600000;
    private final String testUsername = "testUser";
    private String token;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtUtils = new JwtUtils();
        jwtUtils.setSecret(jwtSecret);

        token = Jwts.builder()
                .setSubject(testUsername)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes())
                .compact();
    }

    @Test
    void testGenerateJwtToken() {
        assertNotNull(token);
    }

    @Test
    void testValidateJwtToken_Valid() {
        boolean isValid = jwtUtils.validateJwtToken(token);
        assertTrue(isValid);
    }

    @Test
    void testValidateJwtToken_Invalid() {
        boolean isValid = jwtUtils.validateJwtToken(token + "invalid");
        assertFalse(isValid);
    }

    @Test
    void testGetUserNameFromJwtToken() {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        assertEquals(testUsername, username);
    }
}
