// src/App.js
import React from "react"; // Importiere die React-Bibliothek
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importiere BrowserRouter und Routes aus react-router-dom
import HangmanGame from "./pages/HangmanGame"; // Importiere die HangmanGame-Komponente
import Impressum from "./pages/Impressum"; // Importiere die Impressum-Komponente
import Spielregeln from "./pages/Spielregeln"; // Importiere die Spielregeln-Komponente
import Navi from "./components/Navi"; // Importiere die Navigations-Komponente
import AddWord from "./pages/AddWord"; //Importiere die CreateWord-Komponente
import DeleteWords from "./pages/DeleteWord";
import UpdateWords from "./pages/UpdateWord";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import AuthService from "./services/AuthService.js";
import Signup from "./components/Signup.jsx";
import "./App.css";

function App() {
  const currentUser = AuthService.getCurrentUser();
  return (
    <>
      <Navi />
      <Routes>
        <Route path="/" element={<h1>Willkommen zur Hangman App!</h1>} />
        <Route path="/game" element={<HangmanGame />} />
        <Route path="/rules" element={<Spielregeln />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/words" element={<AddWord />} />
        <Route path="/delete" element={<DeleteWords />} />
        <Route path="/update" element={<UpdateWords />} />
        {!currentUser && <Route path="/signup" element={<Signup />} />}
      </Routes>
      {currentUser ? (
        <>
          <Logout />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;
