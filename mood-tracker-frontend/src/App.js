import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MoodEntry from './pages/MoodEntry';
import MoodHistory from './pages/MoodHistory';
import MoodCharts from './pages/MoodCharts';
import GenerateReport from './pages/GenerateReport';
import UpdateMood from './pages/UpdateMood';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood-entry" element={<MoodEntry />} />
        <Route path="/mood-history" element={<MoodHistory />} />
        <Route path="/mood-charts" element={<MoodCharts />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        <Route path="/update-mood/:id" element={<UpdateMood />} />
      </Routes>
    </Router>
  );
}

export default App;