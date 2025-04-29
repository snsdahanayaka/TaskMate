// client/src/components/Layout/Sidebar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [showTasksSubmenu, setShowTasksSubmenu] = React.useState(false);
  const { user, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Define a shared link style
  const linkStyle = {
    color: "#f5f5f5",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  };

  // Define logout button style to match the link style
  const logoutButtonStyle = {
    color: "#f5f5f5",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "1.1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.3s ease",
    textAlign: "left",
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset AuthContext
    setToken(null);
    setUser(null);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>TaskMate</div>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          {user ? (
            <>
              <li style={{ ...styles.li }}>
                <div
                  style={{ ...linkStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', userSelect: 'none' }}
                  onClick={() => setShowTasksSubmenu((open) => !open)}
                  tabIndex={0}
                  aria-expanded={showTasksSubmenu}
                >
                  <span style={{ marginRight: 8, fontSize: '1.1em' }}>📂</span>
                  Tasks
                  <span style={{ marginLeft: 'auto', fontSize: '1.1em' }}>{showTasksSubmenu ? '▼' : '▶'}</span>
                </div>
                {showTasksSubmenu && (
                  <ul style={{
                    listStyle: 'none',
                    paddingLeft: 24,
                    marginTop: 6,
                    marginBottom: 6,
                    background: '#222',
                    borderLeft: '3px solid #2563eb',
                    borderRadius: 4,
                  }}>
                    <li style={{ margin: 0, padding: '0.4rem 0' }}>
                      <Link to="/tasks" style={{ ...linkStyle, paddingLeft: 8 }}>All Tasks</Link>
                    </li>
                    <li style={{ margin: 0, padding: '0.4rem 0' }}>
                      <Link to="/tasks/report" style={{ ...linkStyle, paddingLeft: 8 }}>Monthly Report</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li style={styles.li}>
                <Link to="/settings" style={linkStyle}>
                  Settings
                </Link>
              </li>

            </>
          ) : null}
        </ul>
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#1a1a1a",
    color: "#f5f5f5",
    height: "500vh",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    boxShadow: "2px 0 12px rgba(0, 0, 0, 0.5)",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  logo: {
    marginBottom: "2.5rem",
    fontSize: "2rem",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  nav: {
    flexGrow: 1,
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  li: {
    marginBottom: "1.5rem",
  },
};

export default Sidebar;