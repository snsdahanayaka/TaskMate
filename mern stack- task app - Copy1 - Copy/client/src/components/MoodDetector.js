import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const moodToTaskMap = {
  happy: "Tackle a challenging task!",
  sad: "Try a simple, uplifting task or take a break.",
  angry: "Take a deep breath and do a calming task.",
  surprised: "Explore something new or creative!",
  fearful: "Do a familiar, easy task to build confidence.",
  disgusted: "Do a quick clean-up or organize your space.",
  neutral: "Pick any task you like!",
};

const MoodDetector = ({ tasks = [], onMoodChange }) => {
  const videoRef = useRef();
  const [mood, setMood] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [webcamError, setWebcamError] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        setWebcamError("Failed to load face-api.js models. Check /models folder.");
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          setWebcamError(
            "Could not access webcam: " +
              (err.name === "NotAllowedError"
                ? "Permission denied. Please allow camera access."
                : err.message)
          );
        });
    }
  }, [modelsLoaded]);

  useEffect(() => {
    let interval;
    if (modelsLoaded && !webcamError) {
      interval = setInterval(async () => {
        if (videoRef.current && !videoRef.current.paused) {
          try {
            const detections = await faceapi
              .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
              .withFaceExpressions();
            if (detections && detections.expressions) {
              const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
              const topMood = sorted[0][0];
              setMood(topMood);
            if (onMoodChange) onMoodChange(topMood);
              let taskSuggestion = moodToTaskMap[topMood] || "Pick any task you like!";
              if (tasks.length > 0) {
                const filtered = tasks.filter((task) =>
                  task.category && task.category.toLowerCase().includes(topMood)
                );
                if (filtered.length > 0) {
                  taskSuggestion = filtered[0].title;
                }
              }
        
            }
          } catch (err) {
            // Ignore detection errors
          }
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [modelsLoaded, tasks, webcamError]);

  return (
    <div style={styles.container}>
      <h2>Detect Your Mood</h2>
      {webcamError ? (
        <div style={{ color: "#dc2626", margin: "1rem 0", fontWeight: 600 }}>{webcamError}</div>
      ) : (
        <video ref={videoRef} autoPlay muted width={320} height={240} style={styles.video} />
      )}
      <div style={styles.moodBox}>
        <span style={styles.moodLabel}>Mood:</span> {mood || (webcamError ? "-" : "Detecting...")}
      </div>
      <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
        (Webcam data never leaves your device)
      </p>
    </div>
  );
};

const styles = {
  container: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2rem auto",
    maxWidth: 400,
  },
  video: {
    borderRadius: 8,
    marginBottom: 16,
    background: "#222",
  },
  moodBox: {
    fontSize: 20,
    margin: "8px 0",
    color: "#4f46e5",
    fontWeight: 600,
  },
  moodLabel: {
    fontWeight: 700,
    marginRight: 8,
  },

};

export default MoodDetector;
