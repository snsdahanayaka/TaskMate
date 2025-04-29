// client/src/pages/SettingsPage.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SettingsPage = () => {
  const { user, setUser } = useContext(AuthContext);

  // State for username update
  const [newUsername, setNewUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  // State for password update
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Handler for theme change (existing)
  const handleThemeChange = async (e) => {
    const newTheme = e.target.value;
    try {
      const res = await axios.put("http://localhost:5000/api/auth/theme", {
        theme: newTheme,
      });
      setUser({ ...user, theme: res.data.theme });
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  // Handler for username update
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      setUsernameMessage("Username cannot be empty.");
      return;
    }
    try {
      const res = await axios.put("http://localhost:5000/api/auth/username", {
        newUsername,
      });
      setUser({ ...user, username: res.data.username });
      setNewUsername(""); // Clear input
      setUsernameMessage("Username updated successfully!");
    } catch (error) {
      setUsernameMessage(
        error.response?.data?.message || "Error updating username."
      );
    }
  };

  // Handler for password update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters.");
      return;
    }
    try {
      const res = await axios.put("http://localhost:5000/api/auth/password", {
        currentPassword,
        newPassword,
      });
      setCurrentPassword(""); // Clear inputs
      setNewPassword("");
      setPasswordMessage("Password updated successfully!");
    } catch (error) {
      setPasswordMessage(
        error.response?.data?.message || "Error updating password."
      );
    }
  };

  // If user is not logged in
  if (!user) {
    return <div>Please log in to access settings.</div>;
  }

  // Inline styles for consistency
  const styles = {
    section: { marginBottom: "2rem" },
    label: { display: "block", marginBottom: "0.5rem" },
    input: { width: "100%", padding: "0.5rem", marginBottom: "0.5rem" },
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    message: { marginTop: "0.5rem" },
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Settings Page</h1>

      {/* Username Update */}
      <div style={styles.section}>
        <h2>Update Username</h2>
        <p>Current username: {user.username}</p>
        <form onSubmit={handleUsernameSubmit}>
          <label style={styles.label}>New Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Update Username
          </button>
        </form>
        {usernameMessage && <p style={styles.message}>{usernameMessage}</p>}
      </div>

      {/* Password Update */}
      <div style={styles.section}>
        <h2>Update Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <label style={styles.label}>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            style={styles.input}
          />
          <label style={styles.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Update Password
          </button>
        </form>
        {passwordMessage && <p style={styles.message}>{passwordMessage}</p>}
      </div>
    </div>
  );
};

export default SettingsPage;