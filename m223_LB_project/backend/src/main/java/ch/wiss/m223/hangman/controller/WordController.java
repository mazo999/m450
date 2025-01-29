package ch.wiss.m223.hangman.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m223.hangman.model.Word;
import ch.wiss.m223.hangman.repositories.WordRepository;

@RestController
@RequestMapping(path = "/words")
public class WordController {

    @Autowired
    private WordRepository wordRepository;

    @GetMapping
    public List<Word> getAllWords() {
        return (List<Word>) wordRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Word> createWord(@RequestBody Word Word) {
        Word savedWord = wordRepository.save(Word);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedWord);
    }

    @GetMapping("/{id}")
    public Word getWordById(@PathVariable Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    // Return a random word
    @GetMapping("/random")
    public @ResponseBody Word getRandomWord() {
        return wordRepository.getRandomWord();
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
    }
}
