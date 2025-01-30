package ch.wiss.m223.tests;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import ch.wiss.m223.hangman.config.UserDetailsImpl;
import ch.wiss.m223.hangman.config.UserDetailsServiceImpl;
import ch.wiss.m223.hangman.model.User;
import ch.wiss.m223.hangman.repositories.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;

public class UserDetailsServiceImplTest {

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername_UserExists() {
        User user = new User();
        user.setId(1); // ID setzen, um NullPointer zu vermeiden
        user.setUsername("testUser");
        user.setPassword("password123");

        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));

        UserDetailsImpl result = (UserDetailsImpl) userDetailsService.loadUserByUsername("testUser");
        assertNotNull(result);
        assertEquals("testUser", result.getUsername());
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByUsername("unknownUser")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("unknownUser");
        });
    }
}
