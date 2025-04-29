const express = require('express');
const router = express.Router();
const { chatWithOpenAI } = require('../controllers/chatController');

// POST /api/chat
router.post('/chat', chatWithOpenAI);

module.exports = router;
