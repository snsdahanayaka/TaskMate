const axios = require('axios');

// Replace with a valid mood entry ID from your database
const moodEntryId = '64f1b2c3e4b0d8f9c8e9f0a1'; // Example ID

// Data to update
const updatedData = {
  mood: 'Happy',
  rating: 9,
  description: 'Feeling amazing today!',
  weatherCondition: 'Sunny',
  emotionTriggers: ['Work', 'Friends'],
  sleepQuality: true,
};

// Send a PUT request to update the mood entry
axios
  .put(`http://localhost:5000/api/mood/entries/${moodEntryId}`, updatedData)
  .then((response) => {
    console.log('Update Response:', response.data);
  })
  .catch((error) => {
    console.error('Error updating mood entry:', error.response ? error.response.data : error.message);
  });