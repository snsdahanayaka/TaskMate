const axios = require('axios');

// POST /api/chat
exports.chatWithOpenAI = async (req, res) => {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment.' });
  }
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: messages,
        max_tokens: 400,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Task Buddy Chatbot'
        },
      }
    );
    const aiMessage = response.data.choices[0].message.content;
    res.json({ reply: aiMessage });
  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data?.error || 'Failed to get response from OpenRouter.' });
  }
};
