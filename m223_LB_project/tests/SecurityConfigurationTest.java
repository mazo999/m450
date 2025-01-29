
package ch.wiss.m223.hangman.config;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

public class SecurityConfigurationTest {

    @InjectMocks
    private SecurityConfiguration securityConfiguration;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void securityConfig_ShouldBeInitialized() {
        assertNotNull(securityConfiguration, "Security Configuration should be initialized");
    }
}
