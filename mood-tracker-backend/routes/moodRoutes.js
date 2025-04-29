const express = require('express');
const router = express.Router();
const moodEntryController = require('../controllers/moodEntryController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Protect all routes with authentication
router.use(authMiddleware);

// Create a new mood entry
router.post('/', moodEntryController.createMoodEntry);

// Get all mood entries for the authenticated user
router.get('/', moodEntryController.getMoodHistory);

// Get a single mood entry by ID
router.get('/:id', moodEntryController.getMoodEntryById);

// Update a mood entry (within 24 hours)
router.put('/:id', moodEntryController.updateMoodEntry);

// Delete a mood entry
router.delete('/:id', moodEntryController.deleteMoodEntry);

module.exports = router;