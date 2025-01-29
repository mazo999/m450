import React, { useState } from "react";
import axios from "axios";
import "./crud-word.css";

export default function AddWord() {
  const [entries, setEntries] = useState({ word: "" });

  // Eingaben im State speichern
  const store = (e) => {
    setEntries({ ...entries, [e.target.name]: e.target.value });
  };

  // Formular absenden und POST-Anfrage ausführen
  const handleSubmit = async (event) => {
    event.preventDefault();

    // **Minimal-Validierung**
    if (!entries.word.trim()) {
      alert("Das Wort darf nicht leer sein.");
      return;
    }

    try {
      // Token aus localStorage abrufen
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        alert("Sie sind nicht eingeloggt.");
        return;
      }

      // POST-Anfrage senden
      const response = await axios.post(
        "http://localhost:8080/words",
        { word: entries.word },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Erfolgsmeldung
      alert(`Wort "${response.data.word}" erfolgreich hinzugefügt!`);
      setEntries({ word: "" }); // Eingaben zurücksetzen
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Ein unerwarteter Fehler ist aufgetreten."
      );
      console.error("Fehler:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Neues Wort hinzufügen</h2>
        <div className="form-control">
          <label htmlFor="word">Wort hinzufügen:</label>
          <input
            type="text"
            id="word"
            name="word"
            value={entries.word}
            onChange={store}
            placeholder="Neues Wort"
            required
          />
        </div>
        <button className="add-button" type="submit">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}
