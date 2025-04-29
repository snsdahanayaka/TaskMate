import React, { useEffect, useState } from "react";
import axios from "axios";
import MoodDetector from "../components/MoodDetector";

// Simple mood-to-keywords mapping for semantic suggestion
const moodKeywords = {
  happy: ["enjoy", "celebrate", "fun", "reward", "smile"],
  sad: ["easy", "uplifting", "break", "relax", "comfort"],
  angry: ["calm", "breathe", "organize", "relax", "meditate"],
  surprised: ["explore", "new", "creative", "discover", "learn"],
  fearful: ["familiar", "easy", "routine", "confidence", "safe"],
  disgusted: ["clean", "tidy", "organize", "refresh", "reset"],
  neutral: ["any", "choose", "pick", "task", "start"],
};

// MoodSuggestionsPage removed as per user request
/*
  const [tasks, setTasks] = useState([]);
  const [detectedMood, setDetectedMood] = useState("");
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load tasks. Please try again later.");
        setTasks([]);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Called by MoodDetector when mood changes
  const handleMoodChange = (mood) => {
    setDetectedMood(mood);
    if (!mood || !tasks.length) {
      setSuggestedTasks([]);
      return;
    }
    // Collect keywords for the detected mood
    const keywords = moodKeywords[mood] || [];
    // Rank tasks by number of matching keywords in description
    const ranked = tasks
      .map((task) => {
        const desc = (task.description || "") + " " + (task.title || "");
        const matchCount = keywords.filter((kw) => desc.toLowerCase().includes(kw)).length;
        return { ...task, matchCount };
      })
      .filter((t) => t.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
    setSuggestedTasks(ranked.slice(0, 3)); // Show top 3 suggestions
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mood-Based Task Suggestions</h1>
      {error ? (
        <div style={{ color: '#dc2626', margin: '1rem 0', fontWeight: 600 }}>{error}</div>
      ) : loading ? (
        <div style={{ color: '#666', margin: '1rem 0' }}>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div style={{ color: '#888', margin: '1rem 0' }}>No tasks available. Please add some tasks first.</div>
      ) : (
        <>
          <MoodDetector tasks={tasks} onMoodChange={handleMoodChange} />
          <div style={styles.suggestionsBox}>
            <h2 style={styles.subtitle}>
              {detectedMood ? `Suggested tasks for mood: ${detectedMood}` : "Detecting mood..."}
            </h2>
            {suggestedTasks.length > 0 ? (
              <ul style={styles.taskList}>
                {suggestedTasks.map((task) => (
                  <li key={task._id} style={styles.taskItem}>
                    <strong>{task.title}</strong>
                    <div style={styles.taskDesc}>{task.description}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={styles.noTask}>No relevant tasks found for your current mood.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f0f2f5",
    padding: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    color: "#333",
  },
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#4f46e5",
  },
  suggestionsBox: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "2rem",
    maxWidth: 600,
    width: "100%",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskItem: {
    padding: "1rem 0",
    borderBottom: "1px solid #eee",
  },
  taskDesc: {
    color: "#666",
    fontSize: "1rem",
    marginTop: 4,
  },
  noTask: {
    color: "#888",
    fontStyle: "italic",
  },
};

*/
// export default MoodSuggestionsPage;
