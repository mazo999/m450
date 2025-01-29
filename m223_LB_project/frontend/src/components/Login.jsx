import { useState } from "react";
import AuthService from "../services/AuthService.js";
import "./Auth.css";

function Login({ onLogin }) {
  const [entries, setEntries] = useState({
    username: "",
    password: "",
  });
  const store = (e) => {
    setEntries({ ...entries, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await AuthService.login(
        entries.username,
        entries.password
      );
      console.log("Login erfolgreich:", result);
      // Seite neu laden nach erfolgreichem Login
      window.location.reload();
    } catch (error) {
      console.error("Login fehlgeschlagen:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={entries.username}
            onChange={store}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={entries.password}
            onChange={store}
            required
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
