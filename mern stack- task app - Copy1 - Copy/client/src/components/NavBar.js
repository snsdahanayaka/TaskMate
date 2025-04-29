// client/src/components/NavBar.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update AuthContext to reflect logged-out state
    setToken(null);
    setUser(null);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav>
      {/* Add other navigation links here if needed */}
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default NavBar;