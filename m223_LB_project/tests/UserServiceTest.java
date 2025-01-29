
package ch.wiss.m223.hangman.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import ch.wiss.m223.hangman.model.User;
import ch.wiss.m223.hangman.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindUserById_UserExists() {
        User user = new User(1L, "testUser");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.findUserById(1L);
        assertNotNull(result);
        assertEquals("testUser", result.getUsername());
    }

    @Test
    void testFindUserById_UserNotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        User result = userService.findUserById(2L);
        assertNull(result);
    }
}
