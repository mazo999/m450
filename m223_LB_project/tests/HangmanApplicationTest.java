
package ch.wiss.m223.hangman;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class HangmanApplicationTest {

    @Test
    void contextLoads() {
        HangmanApplication app = new HangmanApplication();
        assertNotNull(app, "Application should not be null");
    }
}
