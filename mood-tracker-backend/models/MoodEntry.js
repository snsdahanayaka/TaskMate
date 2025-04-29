const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
  mood: { type: String, required: true, enum: ['Happy', 'Sad', 'Stressed', 'Angry'] }, // Validate mood values
  rating: { type: Number, required: true, min: 1, max: 10 }, // Validate rating range
  description: { type: String, default: '', maxlength: 500 }, // Limit description length
  weatherCondition: { type: String, default: 'Sunny', enum: ['Sunny', 'Rainy', 'Cloudy', 'Windy'] }, // Validate weather values
  emotionTriggers: { type: [String], default: [], enum: ['Work', 'Family', 'Friends', 'Social Media', 'Personal Reflection'] }, // Validate emotion triggers
  sleepQuality: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MoodEntry', moodEntrySchema);