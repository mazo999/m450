import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HangmanGame.css";

const HANGMANPICS = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
`,
];

function HangmanGame() {
  const [word, setWord] = useState(""); // Das zu ratende Wort
  const [guessedLetters, setGuessedLetters] = useState([]); // Erratene Buchstaben
  const [wrongGuesses, setWrongGuesses] = useState(0); // Anzahl der falschen Buchstaben
  const [isGameOver, setIsGameOver] = useState(false); // Spielstatus
  const [isWinner, setIsWinner] = useState(false); // Status bei Gewinn
  const [error, setError] = useState(""); // Fehleranzeige

  // Funktion zum Abrufen eines zufälligen Worts aus dem Backend
  const fetchWord = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        throw new Error("Benutzer nicht authentifiziert.");
      }

      const response = await axios.get("http://localhost:8080/words/random", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const randomWord = response.data.word;

      if (!randomWord) {
        throw new Error("Keine gültige Antwort vom Server.");
      }

      setWord(randomWord.toUpperCase());
      setError(""); // Fehler zurücksetzen
    } catch (err) {
      console.error("Fehler beim Abrufen des zufälligen Worts:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Ein Fehler ist aufgetreten."
      );
    }
  };

  // Abrufen des Worts beim Laden der Komponente
  useEffect(() => {
    fetchWord();
  }, []);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || isGameOver || isWinner) return;

    const updatedGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedGuessedLetters);

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= HANGMANPICS.length - 1) {
        setIsGameOver(true);
      }
    } else {
      const allGuessed = word
        .split("")
        .every(
          (letter) =>
            updatedGuessedLetters.includes(letter.toUpperCase()) ||
            letter === " "
        );
      if (allGuessed) {
        setIsWinner(true);
      }
    }
  };

  const displayWord = () => {
    return word
      .split("")
      .map((letter) =>
        guessedLetters.includes(letter.toUpperCase()) ? letter : "_"
      )
      .join(" ");
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setIsGameOver(false);
    setIsWinner(false);
    setError("");
    fetchWord();
  };

  return (
    <div className="hangman-container">
      <h1>Hangman</h1>
      {error && <p className="error">{error}</p>}
      <pre className="hangman-art">{HANGMANPICS[wrongGuesses]}</pre>
      {isGameOver ? (
        <div>
          <h2>Game Over! Das Wort war: {word}</h2>
          <button className="reset-button" onClick={resetGame}>
            Neues Spiel
          </button>
        </div>
      ) : isWinner ? (
        <div>
          <h2>Herzlichen Glückwunsch! Du hast das Wort erraten: {word}</h2>
          <button className="reset-button" onClick={resetGame}>
            Neues Spiel
          </button>
        </div>
      ) : (
        <div>
          <p>
            Falsche Versuche: {wrongGuesses} / {HANGMANPICS.length - 1}
          </p>
          <p className="word-display">{displayWord()}</p>
          <div className="keyboard">
            {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                className="keyboard-button"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HangmanGame;
