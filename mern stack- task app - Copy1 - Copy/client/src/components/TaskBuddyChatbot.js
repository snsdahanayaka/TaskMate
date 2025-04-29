import React, { useState, useRef } from "react";
import axios from "axios";

const TaskBuddyChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Task Buddy. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Voice output
  const speak = (text) => {
    console.log('[TaskBuddy] speak() called with:', text);
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      alert('Sorry, your browser does not support voice output.');
      return;
    }
    try {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onerror = (e) => {
        alert('Voice output error: ' + (e.error || e.message || e));
        console.error('[TaskBuddy] SpeechSynthesisUtterance error:', e);
      };
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      alert('Voice output failed: ' + (e.message || e));
      console.error('[TaskBuddy] speak() exception:', e);
    }
  };



  // Voice input
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      sendMessage(transcript, true);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  // Send a message
  const sendMessage = async (msg, isVoice = false) => {
    if (!msg.trim() || loading) return;
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = newMessages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));
      const res = await axios.post("/api/chat", { messages: apiMessages });
      const reply = res.data.reply;
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      if (isVoice) speak(reply);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I couldn't get a response from the AI right now." }]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.header}>Task Buddy <span style={styles.statusDot} /> </div>
      <div style={styles.messagesArea}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={msg.sender === "bot" ? styles.botMsg : styles.userMsg}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={styles.botMsg}><em>Task Buddy is typing...</em></div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={styles.input}
          disabled={listening}
        />
        <button
          style={styles.sendBtn}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || listening}
        >
          Send
        </button>
        <button
          style={listening ? styles.voiceBtnActive : styles.voiceBtn}
          onClick={startListening}
          disabled={listening}
          title="Speak to Task Buddy"
        >
          <span
            role="img"
            aria-label="mic"
            style={{
              fontSize: '2rem',
              color: '#fff',
              filter: listening ? 'drop-shadow(0 0 4px #f59e42)' : 'none',
              transition: 'color 0.2s, filter 0.2s',
              verticalAlign: 'middle',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >🎤</span>
        </button>
      </div>
      <div style={styles.infoBar}>
        <span>Text or voice supported. Task Buddy remembers this chat.</span>
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    width: 520,
    height: 600,
    background: '#f8fafc',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(99,102,241,0.13)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: 'inherit',
  },
  header: {
    padding: '1.2rem 1.5rem',
    background: '#6366f1',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.15rem',
    display: 'flex',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  statusDot: {
    display: 'inline-block',
    width: 9,
    height: 9,
    background: '#22c55e',
    borderRadius: '50%',
    marginLeft: 8,
  },
  messagesArea: {
    flex: 1,
    background: '#fff',
    padding: '1.2rem 1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  botMsg: {
    alignSelf: 'flex-start',
    background: '#e0e7ff',
    color: '#3730a3',
    padding: '0.8rem 1.3rem',
    borderRadius: '1.2rem 1.2rem 1.2rem 0.4rem',
    marginBottom: 4,
    maxWidth: '85%',
    fontSize: '1.08rem',
  },
  userMsg: {
    alignSelf: 'flex-end',
    background: '#6366f1',
    color: '#fff',
    padding: '0.8rem 1.3rem',
    borderRadius: '1.2rem 1.2rem 0.4rem 1.2rem',
    marginBottom: 4,
    maxWidth: '85%',
    fontSize: '1.08rem',
  },
  inputArea: {
    display: 'flex',
    gap: 12,
    padding: '1rem 1.5rem',
    background: '#f1f5f9',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '0.6rem 1rem',
    borderRadius: 8,
    border: '1px solid #c7d2fe',
    fontSize: '1rem',
    outline: 'none',
  },
  sendBtn: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.6rem 1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.2s',
  },
  voiceBtn: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '2rem',
    boxShadow: '0 2px 8px rgba(99,102,241,0.18)',
    transition: 'background 0.2s, box-shadow 0.2s',
    outline: 'none',
  },
  voiceBtnActive: {
    background: '#f59e42',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    cursor: 'not-allowed',
    fontSize: '2rem',
    boxShadow: '0 2px 8px rgba(245,158,66,0.18)',
    transition: 'background 0.2s, box-shadow 0.2s',
    opacity: 0.85,
    outline: 'none',
  },
  infoBar: {
    fontSize: '0.9rem',
    color: '#64748b',
    background: '#f1f5f9',
    padding: '0.4rem 1rem',
    textAlign: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
};

export default TaskBuddyChatbot;
