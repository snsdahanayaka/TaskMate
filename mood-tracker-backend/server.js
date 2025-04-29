const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// MongoDB Atlas connection string
const atlasUri = process.env.MONGODB_URI || 'mongodb+srv://it22282286:it22282286sliit@cluster1.ge1tl.mongodb.net/moodTracker?retryWrites=true&w=majority&appName=Cluster1';

// Connect to MongoDB Atlas
mongoose.connect(atlasUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err));

// Define a schema for mood entries
const moodEntrySchema = new mongoose.Schema({
  mood: { type: String, required: true, enum: ['Happy', 'Sad', 'Stressed', 'Angry'] }, // Validate mood values
  rating: { type: Number, required: true, min: 1, max: 10 }, // Validate rating range
  description: { type: String, default: '', maxlength: 500 }, // Limit description length
  weatherCondition: { type: String, default: 'Sunny', enum: ['Sunny', 'Rainy', 'Cloudy', 'Windy'] }, // Validate weather values
  emotionTriggers: { type: [String], default: [], enum: ['Work', 'Family', 'Friends', 'Social Media', 'Personal Reflection'] }, // Validate emotion triggers
  sleepQuality: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Create a model for mood entries
const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);

// Route to save a mood entry
app.post('/api/mood/entries', async (req, res) => {
  try {
    const { mood, rating, description, weatherCondition, emotionTriggers, sleepQuality } = req.body;

    // Validate required fields
    if (!mood || !rating) {
      return res.status(400).json({ error: 'Mood and rating are required' });
    }

    // Validate mood enum
    const validMoods = ['Happy', 'Sad', 'Stressed', 'Angry'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ error: 'Invalid mood selection.' });
    }

    // Validate rating range
    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10.' });
    }

    // Create a new mood entry
    const newEntry = new MoodEntry({
      mood,
      rating,
      description,
      weatherCondition,
      emotionTriggers,
      sleepQuality,
    });

    // Save the entry to the database
    await newEntry.save();

    // Send a success response
    res.status(201).json({ message: 'Mood entry saved successfully', entry: newEntry });
  } catch (err) {
    console.error('Error saving mood entry:', err);
    res.status(500).json({ error: 'Failed to save mood entry', details: err.message });
  }
});

// Route to fetch all mood entries
app.get('/api/mood/entries', async (req, res) => {
  try {
    const entries = await MoodEntry.find().sort({ createdAt: -1 }); // Sort by latest first
    res.status(200).json(entries);
  } catch (err) {
    console.error('Error fetching mood entries:', err);
    res.status(500).json({ error: 'Failed to fetch mood entries', details: err.message });
  }
});

// Route to fetch a single mood entry by ID
app.get('/api/mood/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid mood entry ID' });
    }

    // Find the entry by ID
    const entry = await MoodEntry.findById(id);

    if (!entry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.status(200).json(entry);
  } catch (err) {
    console.error('Error fetching mood entry:', err);
    res.status(500).json({ error: 'Failed to fetch mood entry', details: err.message });
  }
});

// Route to update a mood entry (within 24 hours)
app.put('/api/mood/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid mood entry ID' });
    }

    // Find the entry by ID
    const entry = await MoodEntry.findById(id);

    if (!entry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    // Check if the entry is older than 24 hours
    const timeDiff = Date.now() - entry.createdAt;
    if (timeDiff > 24 * 60 * 60 * 1000) {
      return res.status(400).json({ error: 'Cannot update entry after 24 hours.' });
    }

    // Validate mood and rating if provided in the request body
    if (req.body.mood) {
      const validMoods = ['Happy', 'Sad', 'Stressed', 'Angry'];
      if (!validMoods.includes(req.body.mood)) {
        return res.status(400).json({ error: 'Invalid mood selection.' });
      }
    }

    if (req.body.rating && (req.body.rating < 1 || req.body.rating > 10)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10.' });
    }

    // Update the entry
    const updatedEntry = await MoodEntry.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Mood entry updated successfully', entry: updatedEntry });
  } catch (err) {
    console.error('Error updating mood entry:', err);
    res.status(500).json({ error: 'Failed to update mood entry', details: err.message });
  }
});

// Route to delete a mood entry
app.delete('/api/mood/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid mood entry ID' });
    }

    // Delete the entry
    const deletedEntry = await MoodEntry.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.status(200).json({ message: 'Mood entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting mood entry:', err);
    res.status(500).json({ error: 'Failed to delete mood entry', details: err.message });
  }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});