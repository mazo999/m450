import React, { useState } from "react";
import AuthService from "../services/AuthService";
import "./Auth.css";

const Signup = () => {
  const [entries, setEntries] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const store = (e) => {
    setEntries({ ...entries, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !entries.username.trim() ||
      !entries.email.trim() ||
      !entries.password.trim()
    ) {
      setMessage("Alle Felder müssen ausgefüllt sein.");
      return;
    }

    try {
      // Aufruf der register-Methode aus AuthService
      await AuthService.register(
        entries.username,
        entries.email,
        entries.password
      );
      setMessage("Registrierung erfolgreich! Sie können sich jetzt einloggen.");
      setEntries({ username: "", email: "", password: "" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
      setMessage(errorMsg);
      console.error("Fehler bei der Registrierung:", error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Registrieren</h2>
        {message && <p className="message">{message}</p>}
        <div className="form-group">
          <label htmlFor="username">Benutzername:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={entries.username}
            onChange={store}
            placeholder="Benutzername"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={entries.email}
            onChange={store}
            placeholder="E-Mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={entries.password}
            onChange={store}
            placeholder="Passwort"
            required
          />
        </div>
        <button className="signup-button" type="submit">
          Registrieren
        </button>
      </form>
    </div>
  );
};

export default Signup;
