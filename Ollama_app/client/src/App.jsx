import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import ChatPage from './pages/ChatPage'

export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <AnimatePresence mode="wait">
      {page === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4 }}
        >
          <LandingPage onEnterChat={() => setPage('chat')} />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.4 }}
          className="h-screen"
        >
          <ChatPage onBack={() => setPage('landing')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
