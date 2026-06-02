import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ArrowLeft, ChevronDown, ChevronUp, Cat, User, Sparkles } from 'lucide-react'

// Black/white base + vivid accents
// #FF3CAC magenta · #FFDE03 yellow · #00F5D4 mint · #FF6B00 orange

const chipColors = ['#FF3CAC', '#FFDE03', '#00F5D4', '#FF6B00']

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[['#FF3CAC'], ['#FFDE03'], ['#00F5D4']].map(([c], i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: c }}
          animate={{ y: [0, -8, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function Message({ msg, index }) {
  const isUser = msg.role === 'user'
  const [showSources, setShowSources] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg"
        style={isUser
          ? { background: 'linear-gradient(135deg,#FF3CAC,#FF6B00)', boxShadow: '0 4px 16px rgba(255,60,172,0.45)' }
          : { background: 'linear-gradient(135deg,#00F5D4,#FFDE03)', boxShadow: '0 4px 16px rgba(0,245,212,0.4)' }
        }
      >
        {isUser
          ? <User className="w-5 h-5 text-black" />
          : <Cat className="w-5 h-5 text-black" />
        }
      </div>

      <div className={`max-w-[75%] flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-5 py-3 text-sm leading-relaxed font-semibold"
          style={isUser
            ? {
                background: 'linear-gradient(135deg,#FF3CAC,#FF6B00)',
                color: '#000',
                borderRadius: '1.5rem 1.5rem 0.25rem 1.5rem',
                boxShadow: '0 4px 20px rgba(255,60,172,0.35)',
              }
            : {
                background: '#181818',
                border: '2px solid rgba(0,245,212,0.3)',
                color: '#f0f0f0',
                borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem',
              }
          }
        >
          {msg.content}
        </div>

        {msg.sources && msg.sources.length > 0 && (
          <div className="w-full">
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center gap-1 text-xs font-bold transition-colors"
              style={{ color: showSources ? '#00F5D4' : 'rgba(255,255,255,0.3)' }}
            >
              {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {msg.sources.length} sources
            </button>
            <AnimatePresence>
              {showSources && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1 overflow-hidden"
                >
                  {msg.sources.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-2xl text-xs"
                      style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                      <span className="px-2 py-0.5 rounded-full font-black whitespace-nowrap text-black"
                        style={{ background: '#FFDE03' }}>
                        {(s.similarity * 100).toFixed(0)}%
                      </span>
                      <span className="leading-relaxed">{s.text}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const suggestions = [
  'How long do cats sleep?',
  'What sounds can cats make?',
  'Do cats have good eyesight?',
  'Why do cats purr?',
]

export default function ChatPage({ onBack }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am CatGPT. Ask me anything about cats and I will find the best answer from my knowledge base!' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const question = text || input.trim()
    if (!question || loading) return
    setInput('')
    setError('')
    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer, sources: data.retrieved_knowledge }])
    } catch {
      setError('Could not reach the server. Make sure the FastAPI backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen" style={{ background: '#0a0a0a', color: '#fff' }}>

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(255,60,172,0.1)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(0,245,212,0.08)' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 px-6 py-4 backdrop-blur-md"
        style={{ borderBottom: '2px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.7)' }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-2xl transition-colors"
          style={{ border: '2px solid rgba(0,245,212,0.4)', color: '#00F5D4' }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg,#FF3CAC,#FF6B00)', boxShadow: '0 4px 20px rgba(255,60,172,0.45)' }}>
            <Cat className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="font-black text-white text-lg leading-none">CatGPT</h1>
            <span className="text-xs flex items-center gap-1 mt-0.5 font-bold" style={{ color: '#00F5D4' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#00F5D4' }} />
              Online
            </span>
          </div>
        </div>

        <div className="ml-auto text-xs font-medium hidden sm:block" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Powered by Ollama · RAG
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => <Message key={i} msg={msg} index={i} />)}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00F5D4,#FFDE03)', boxShadow: '0 4px 16px rgba(0,245,212,0.4)' }}>
              <Cat className="w-5 h-5 text-black" />
            </div>
            <div style={{ background: '#181818', border: '2px solid rgba(0,245,212,0.3)', borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem' }}>
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-sm rounded-2xl px-4 py-3 font-bold"
            style={{ color: '#FF3CAC', background: 'rgba(255,60,172,0.08)', border: '2px solid rgba(255,60,172,0.3)' }}>
            {error}
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {messages.length === 1 && (
        <div className="relative z-10 px-4 pb-3 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => sendMessage(s)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full text-sm font-black flex items-center gap-1.5 text-black"
              style={{ background: chipColors[i], boxShadow: `0 4px 16px ${chipColors[i]}55` }}
            >
              <Sparkles className="w-3 h-3" />
              {s}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative z-10 px-4 py-4 backdrop-blur-md"
        style={{ borderTop: '2px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.7)' }}>
        <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cats..."
            disabled={loading}
            className="flex-1 px-5 py-3 rounded-2xl text-white text-sm font-medium transition-all disabled:opacity-50 focus:outline-none"
            style={{ background: '#181818', border: '2px solid rgba(255,255,255,0.1)', caretColor: '#FF3CAC' }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(255,60,172,0.7)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
          <motion.button
            type="submit"
            disabled={loading || !input.trim()}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-black disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg,#FF3CAC,#FF6B00)', boxShadow: '0 4px 20px rgba(255,60,172,0.45)' }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  )
}
