
package ch.wiss.m223.hangman.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import ch.wiss.m223.hangman.model.Game;
import ch.wiss.m223.hangman.repository.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class GameServiceTest {

    @InjectMocks
    private GameService gameService;

    @Mock
    private GameRepository gameRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testStartNewGame() {
        Game game = new Game();
        game.setId(1L);
        when(gameRepository.save(any(Game.class))).thenReturn(game);

        Game result = gameService.startNewGame();
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }
}
