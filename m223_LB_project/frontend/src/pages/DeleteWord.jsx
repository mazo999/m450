import React, { useState } from "react";
import axios from "axios";
import "./crud-word.css";

export default function DeleteWord() {
  const [wordId, setWordId] = useState(""); // State für die Wort-ID
  const [message, setMessage] = useState(""); // Feedback-Meldung

  // Eingabe speichern
  const store = (e) => {
    setWordId(e.target.value);
  };

  // DELETE-Anfrage ausführen
  const handleDelete = async (event) => {
    event.preventDefault();

    if (!wordId.trim()) {
      alert("Bitte eine gültige ID eingeben.");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        alert("Sie sind nicht eingeloggt.");
        return;
      }

      // DELETE-Anfrage senden
      const response = await axios.delete(
        `http://localhost:8080/words/${wordId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`Wort mit der ID "${wordId}" wurde erfolgreich gelöscht.`);
      console.log("DELETE erfolgreich:", response);
      setWordId("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Ein unerwarteter Fehler ist aufgetreten."
      );
      console.error("Fehler bei DELETE:", error.response || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <h2>Wort löschen</h2>
        <div className="form-control">
          <label htmlFor="wordId">Wort ID:</label>
          <input
            type="text"
            id="wordId"
            name="wordId"
            value={wordId}
            onChange={store}
            placeholder="Gib die ID des zu löschenden Worts ein"
            required
          />
        </div>
        <button className="delete-button" type="submit">
          Löschen
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
