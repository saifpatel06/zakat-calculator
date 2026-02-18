"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Chatbotbutton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Assalamu Alaikum! 👋 How can I help you with Zakat calculation today?',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showTooltip) setShowTooltip(false);
  };

  const sendMessage = async () => {

    const messageText = input.trim();

    if (!messageText) return;

    const userMessage = {
      role: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {

      const res = await fetch("/api/zakat-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageText   // ✅ FIXED
        })
      });

      const data = await res.json();

      const botMessage = {
        role: 'bot',
        text: data.reply || 'Sorry, error occurred.',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {

      const errorMessage = {
        role: 'bot',
        text: 'Connection error. Please try again.',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setMessages(prev => [...prev, errorMessage]);

    } finally {

      setLoading(false);

    }

  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = async (question) => {

    const userMessage = {
      role: 'user',
      text: question,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {

      const res = await fetch("/api/zakat-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question
        })
      });

      const data = await res.json();

      const botMessage = {
        role: 'bot',
        text: data.reply,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setMessages(prev => [...prev, botMessage]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <div className={styles.chatbotContainer}>
        {showTooltip && !isOpen && (
          <div className={styles.tooltip}>
            <div className={styles.tooltipContent}>
              <strong>Need help with Zakat?</strong>
              <p>Ask me anything!</p>
            </div>
            <button 
              className={styles.tooltipClose}
              onClick={() => setShowTooltip(false)}
            >
              ×
            </button>
          </div>
        )}

        <button 
          className={`${styles.chatButton} ${isOpen ? styles.chatButtonOpen : ''}`}
          onClick={toggleChat}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faTimes} className={styles.icon} />
          ) : (
            <>
              <FontAwesomeIcon icon={faCommentDots} className={styles.icon} />
              <span className={styles.notificationDot}></span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.botAvatar}>🤖</div>
              <div className={styles.botDetails}>
                <h3 className={styles.botName}>Zakat AI Assistant</h3>
                <span className={styles.botStatus}>
                  <span className={styles.statusDot}></span>
                  {loading ? 'Typing...' : 'Online'}
                </span>
              </div>
            </div>
            <button 
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}
              >
                {msg.role === 'bot' && (
                  <div className={styles.messageAvatar}>🤖</div>
                )}
                <div className={styles.messageContent}>
                  <div className={styles.messageBubble}>
                    {msg.text}
                  </div>
                  <span className={styles.messageTime}>{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageAvatar}>🤖</div>
                <div className={styles.messageContent}>
                  <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.chatInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question..."
              className={styles.inputField}
              disabled={loading}
            />
            <button 
              className={styles.sendButton}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>

          {/* Footer */}
          <div className={styles.chatFooter}>
            <span>🤖 Powered by AI • ❤️</span>
            <div style={{
              fontSize: "11px",
              marginTop: "4px",
              color: "#888"
            }}>
              ⚠️ This AI provides general guidance. Please consult a qualified Islamic scholar for final rulings.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;