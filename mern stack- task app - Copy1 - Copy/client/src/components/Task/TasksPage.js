// client/src/pages/TasksPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/Task/TaskItem";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f0f2f5",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  filterInput: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    marginBottom: "1.5rem",
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "1rem",
    transition: "transform 0.2s ease",
  },
  taskTitle: {
    fontSize: "1.25rem",
    fontWeight: "500",
    color: "#333",
  },
  taskDetail: {
    fontSize: "1rem",
    color: "#555",
  },
  subTaskList: {
    marginTop: "0.5rem",
    paddingLeft: "1.5rem",
  },
  subTaskItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    color: "#666",
  },
  subTaskTitle: {
    textDecoration: (isCompleted) => (isCompleted ? "line-through" : "none"),
  },
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Get today's date (without time for comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Sort tasks by how close their dueDate is to today
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
    return Math.abs(dateA - today) - Math.abs(dateB - today);
  });

  // Find the first non-completed task (the "next item")
  const nextItem = sortedTasks.find((task) => !task.isCompleted);

  // Apply the filter (title/category search) if the user has entered a filter
  const filteredTasks = filter
    ? sortedTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(filter.toLowerCase()) ||
          task.category.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedTasks;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Tasks</h1>
        <input
          type="text"
          placeholder="Filter tasks by title or category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterInput}
        />
        <div>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                style={styles.taskCard}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <TaskItem
                  task={task}
                  onSelect={() => console.log("Task selected:", task)}
                  isNextItem={nextItem && nextItem._id === task._id}
                />
                <p style={styles.taskDetail}>
                  <strong>Category:</strong> {task.category}
                </p>
                <p style={styles.taskDetail}>
                  <strong>Due Date:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
                <p style={styles.taskDetail}>
                  <strong>Status:</strong>{" "}
                  {task.isCompleted ? "Completed" : "Not Completed"}
                </p>
                {/* Display Subtasks */}
                {task.subTasks && task.subTasks.length > 0 ? (
                  <div style={styles.subTaskList}>
                    <p style={styles.taskDetail}>
                      <strong>Subtasks:</strong>
                    </p>
                    {task.subTasks.map((subTask) => (
                      <div key={subTask._id} style={styles.subTaskItem}>
                        <input
                          type="checkbox"
                          checked={subTask.isCompleted}
                          readOnly
                        />
                        <span
                          style={{
                            ...styles.subTaskTitle,
                            textDecoration: subTask.isCompleted
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {subTask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={styles.taskDetail}>No subtasks available.</p>
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#555" }}>No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;