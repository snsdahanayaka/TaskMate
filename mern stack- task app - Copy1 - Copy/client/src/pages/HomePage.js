import React from "react";
import TaskBuddyChatbot from "../components/TaskBuddyChatbot";

const HomePage = () => {
  const [showChatbot, setShowChatbot] = React.useState(false);

  return (
    <div style={styles.dashboardBg}>
    {/* Header Section */}
    <header style={styles.headerSection}>
      <h1 style={styles.headerTitle}>Welcome to TaskMate</h1>
      <p style={styles.headerSubtitle}>
        Organize your day, boost your productivity, and never miss a task again.
      </p>
    </header>

    {/* Dashboard Cards */}
    <div style={styles.getStartedContainer}>
      <button style={styles.getStartedButton} onClick={() => window.location.href='/login'}>
        Get Started
      </button>
    </div>

    {/* Floating Chatbot Icon */}
    <div style={styles.chatbotIcon} onClick={() => setShowChatbot(true)} title="Open Chatbot">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#6366f1" />
        <path d="M12 24v-2.4A3.6 3.6 0 0115.6 18h4.8A3.6 3.6 0 0124 21.6V24" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="15" cy="15" r="1" fill="#fff"/>
        <circle cx="21" cy="15" r="1" fill="#fff"/>
      </svg>
    </div>
    {/* Chatbot Modal */}
    {showChatbot && (
      <div style={styles.chatbotModalBg} onClick={() => setShowChatbot(false)}>
        <div style={styles.chatbotModal} onClick={e => e.stopPropagation()}>
          <TaskBuddyChatbot />
          <button style={styles.closeChatbotButton} onClick={() => setShowChatbot(false)}>Close</button>
        </div>
      </div>
    )}
  </div>
  );
};

const styles = {
  dashboardBg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 1rem 3rem 1rem",
    position: "relative",
  },
  headerSection: {
    textAlign: "center",
    marginTop: "4vh",
    marginBottom: "2vh",
  },
  headerTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#4f46e5",
    marginBottom: "0.5rem",
    letterSpacing: "-1px",
  },
  headerSubtitle: {
    fontSize: "1.25rem",
    color: "#64748b",
    marginBottom: "0.5rem",
    lineHeight: 1.6,
  },
  getStartedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4vh",
  },
  getStartedButton: {
    padding: "1rem 3rem",
    fontSize: "1.3rem",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    boxShadow: "0 4px 16px rgba(99,102,241,0.15)",
    cursor: "pointer",
    letterSpacing: "1px",
    marginTop: "1.5rem",
    transition: "background 0.2s, box-shadow 0.2s",
  },
  chatbotIcon: {
    position: "fixed",
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#6366f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(99,102,241,0.16)",
    cursor: "pointer",
    zIndex: 1000,
    transition: "background 0.2s",
  },
  chatbotModalBg: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.25)",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatbotModal: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(99,102,241,0.18)",
    padding: "2rem 1.5rem 1.5rem 1.5rem",
    minWidth: 320,
    maxWidth: 380,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  closeChatbotButton: {
    marginTop: 16,
    padding: "0.5rem 1.5rem",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(99,102,241,0.15)",
    transition: "background 0.2s",
  },
};

export default HomePage;