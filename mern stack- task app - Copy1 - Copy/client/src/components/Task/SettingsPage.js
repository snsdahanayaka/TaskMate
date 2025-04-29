// client/src/pages/SettingsPage.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SettingsPage = () => {
  const { user, setUser } = useContext(AuthContext);

  // Local state for profile update
  const [username, setUsername] = useState(user?.username || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [theme, setTheme] = useState(user?.theme || "light");
  const [message, setMessage] = useState("");

  // Handle updating profile (username and password)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Call a backend endpoint that updates the user's profile
      const res = await axios.put("http://localhost:5000/api/auth/update-profile", {
        username,
        oldPassword,
        newPassword,
      });
      // Assume the response contains the updated user object
      setUser(res.data.user);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile.");
    }
  };

  // Handle updating theme separately
  const handleThemeChange = async (e) => {
    const newTheme = e.target.value;
    try {
      const res = await axios.put("http://localhost:5000/api/auth/theme", {
        theme: newTheme,
      });
      // Update the user in context with the new theme
      setUser({ ...user, theme: res.data.theme });
      setTheme(res.data.theme);
      setMessage("Theme updated successfully!");
    } catch (error) {
      console.error("Error updating theme:", error);
      setMessage("Error updating theme.");
    }
  };

  if (!user) {
    return <div>Please log in to access settings.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Settings</h1>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Update Profile</h2>
        <form onSubmit={handleProfileUpdate} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Update Profile
          </button>
        </form>
      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333",
  },
  message: {
    textAlign: "center",
    color: "green",
    marginBottom: "1rem",
  },
  section: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
  },
  sectionHeading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#444",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  text: {
    fontSize: "1.1rem",
    color: "#333", 
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginTop: "0.5rem",
  },
};

export default SettingsPage;
