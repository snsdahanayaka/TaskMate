import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Define styles for consistency and reusability
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "350px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "#333",
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
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  message: {
    textAlign: "center",
    marginTop: "1rem",
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: "1rem",
    color: "#1a1a1a",
    textDecoration: "none",
  },
};

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      setMessage({ text: response.data.message, type: "success" });
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.data) {
        setMessage({ text: error.response.data.error || "Registration failed", type: "error" });
      } else {
        setMessage({ text: "Registration failed", type: "error" });
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleRegister}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
          >
            Register
          </button>
        </form>
        {message.text && (
          <p style={{ ...styles.message, color: message.type === "success" ? "green" : "red" }}>
            {message.text}
          </p>
        )}
        <Link to="/login" style={styles.link}>
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;