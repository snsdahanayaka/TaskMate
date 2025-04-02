import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './pages/Tasks/Tasks';
import Reminders from './pages/Reminders/Reminders';
import MoodTracking from './pages/MoodTracking/MoodTracking';
import UniqueFeature from './pages/UniqueFeature/UniqueFeature';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/mood-tracking" element={<MoodTracking />} />
                <Route path="/unique-feature" element={<UniqueFeature />} />
            </Routes>
        </Router>
    );
};

export default App;
