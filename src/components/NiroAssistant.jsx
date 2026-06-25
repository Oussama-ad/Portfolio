import { useState, useRef, useEffect } from 'react';
import './NiroAssistant.css';

const NiroAssistant = ({ isAppLoaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'niro', text: 'hello am niro oussama personal assistant how can i help you' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isAppLoaded && !isOpen) {
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 500);
      
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 3500);
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else if (isOpen) {
      setShowTooltip(false);
    }
  }, [isAppLoaded, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://ouss-ad85-niro-home.hf.space/niro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'niro', text: data.response }]);
    } catch (error) {
      console.error('Error fetching from Niro:', error);
      setMessages((prev) => [...prev, { sender: 'niro', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="niro-assistant-container">
      {isOpen && (
        <div className="niro-chat-window">
          <div className="niro-chat-header">
            <div className="niro-avatar">
              <img src="/assets/niro.png" alt="Niro Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div>
              <h3>Niro</h3>
              <span>Online</span>
            </div>
            <button className="niro-close-btn" onClick={() => setIsOpen(false)}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          
          <div className="niro-chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`niro-message ${msg.sender}`}>
                <div className="niro-message-content">
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="niro-message niro">
                <div className="niro-message-content typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="niro-chat-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
              <ion-icon name="send-outline"></ion-icon>
            </button>
          </div>
        </div>
      )}

      <div className={`niro-tooltip ${showTooltip ? 'visible' : ''}`}>
        Come and take a discussion with Niro!
      </div>

      <button 
        className={`niro-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Niro"
      >
        {isOpen ? (
          <ion-icon name="close-outline"></ion-icon>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default NiroAssistant;
