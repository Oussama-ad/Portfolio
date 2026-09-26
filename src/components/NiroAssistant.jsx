import { useState, useRef, useEffect } from 'react'
import './NiroAssistant.css'

const QUICK_PROMPTS = [
  'What are Oussama\'s main skills?',
  'Tell me about the SmartSchool project',
  'What AI projects has he worked on?',
  'How can I get in touch with him?',
]

// Sleek robot SVG icon replacing the picture
const RobotIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="robot-svg-icon"
  >
    <rect x="3" y="11" width="18" height="10" rx="3" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2.5" />
    <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2.5" />
    <line x1="2" y1="15" x2="3" y2="15" />
    <line x1="21" y1="15" x2="22" y2="15" />
  </svg>
)

const NiroAssistant = ({ isAppLoaded }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'niro',
      text: 'Hail traveler! I am Niro, Oussama\'s AI companion. Ask me anything about his projects, skills, education at ESI, or background!',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    if (isAppLoaded && !isOpen) {
      const showTimer = setTimeout(() => {
        setShowTooltip(true)
      }, 1000)

      const hideTimer = setTimeout(() => {
        setShowTooltip(false)
      }, 5000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    } else if (isOpen) {
      setShowTooltip(false)
    }
  }, [isAppLoaded, isOpen])

  const sendQuery = async (queryText) => {
    if (!queryText.trim()) return

    const userMessage = queryText.trim()
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('https://ouss-ad85-niro-home.hf.space/niro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        {
          sender: 'niro',
          text: data.answer || data.message || 'I received your inquiry, my lord.',
        },
      ])
    } catch (error) {
      console.error('Error querying Niro:', error)
      let fallback = "Forgive me, the Citadel archive is waking up from slumber. Oussama is a CS Engineering student at ESI Algiers specializing in Full Stack (MERN, FastAPI) and AI (RAG, PyTorch). You can reach him directly at om_admane@esi.dz!"
      if (userMessage.toLowerCase().includes('smartschool')) {
        fallback = "SmartSchool is a full-stack school management system led by Oussama Admane with a team of 6. He designed the MVC backend, SQL schemas, and deployed it to production!"
      } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('email')) {
        fallback = "You can dispatch a raven to Oussama at om_admane@esi.dz or reach his direct line at +213 556 75 42 20."
      }
      setMessages((prev) => [...prev, { sender: 'niro', text: fallback }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    sendQuery(inputValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="niro-assistant-container">
      {isOpen && (
        <div className="niro-chat-window animate-scale-up">
          {/* Header */}
          <div className="niro-chat-header">
            <div className="niro-avatar-frame">
              <RobotIcon size={22} />
              <span className="niro-status-dot"></span>
            </div>
            <div className="niro-header-text">
              <h3 className="niro-title">Niro Assistant</h3>
              <span className="niro-status-label">Citadel AI &bull; Online</span>
            </div>
            <button
              className="niro-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Niro Chat"
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="niro-quick-prompts">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="quick-prompt-chip"
                onClick={() => sendQuery(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Body */}
          <div className="niro-chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`niro-message ${msg.sender}`}>
                {msg.sender === 'niro' && (
                  <div className="niro-msg-avatar">
                    <RobotIcon size={16} />
                  </div>
                )}
                <div className="niro-message-content">
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="niro-message niro">
                <div className="niro-msg-avatar">
                  <RobotIcon size={16} />
                </div>
                <div className="niro-message-content typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="niro-chat-input-area">
            <input
              type="text"
              placeholder="Ask Niro anything about Oussama..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="niro-send-btn"
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send Message"
            >
              <ion-icon name="send"></ion-icon>
            </button>
          </div>
        </div>
      )}

      {/* Floating Tooltip */}
      <div className={`niro-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span className="tooltip-snowflake">❄</span>
        <span>Consult Niro, Oussama's AI!</span>
      </div>

      {/* Floating Action Button */}
      <button
        className={`niro-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Consult Niro AI"
        aria-label="Toggle Niro Chat"
      >
        {isOpen ? (
          <ion-icon name="close-outline"></ion-icon>
        ) : (
          <div className="niro-fab-content">
            <RobotIcon size={28} />
            <span className="niro-fab-pulse"></span>
          </div>
        )}
      </button>
    </div>
  )
}

export default NiroAssistant
