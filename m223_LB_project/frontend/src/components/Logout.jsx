import AuthService from "../services/AuthService.js";

const Logout = () => {
  const handleLogout = () => {
    AuthService.logout(); // Entfernt Benutzerdaten
    window.location.reload(); // Seite neu laden
  };

  return (
    <>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
