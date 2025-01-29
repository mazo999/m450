package ch.wiss.m223.hangman.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.validation.annotation.Validated;

@Entity
@Validated
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Cannot insert empty word.")
    private String word;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
}
