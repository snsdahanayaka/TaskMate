import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import TasksPage from "./pages/TasksPage";
import TaskReportPage from "./pages/TaskReportPage";


import MoodSuggestionsPage from "./pages/MoodSuggestionsPage";
import SettingsPage from "./pages/SettingsPage";

import PrivateRoute from "./components/PrivateRoute";





function App() {
  return (
    <Router>
      <AppWithSidebarControl />
    </Router>
  );
}

function AppWithSidebarControl() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
        <Route path="/tasks/report" element={<PrivateRoute><TaskReportPage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="*" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;