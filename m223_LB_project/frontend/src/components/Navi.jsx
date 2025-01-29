import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navi = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      setIsLoggedIn(true); // Benutzer ist eingeloggt
      if (user.roles?.includes("ROLE_ADMIN")) {
        setIsAdmin(true); // Benutzer ist Admin
      }
    }
  }, []);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Startseite</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/game">Hangman-Spiel</Link>
          </li>
        )}
        <li>
          <Link to="/rules">Spielregeln</Link>
        </li>
        <li>
          <Link to="/impressum">Impressum</Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to="/signup">Benutzer registrieren</Link>
          </li>
        )}
        {isAdmin && (
          <>
            <li>
              <Link to="/words">Wörter erstellen</Link>
            </li>
            <li>
              <Link to="/delete">Wörter löschen</Link>
            </li>
            <li>
              <Link to="/update">Wörter aktualisieren</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navi;
