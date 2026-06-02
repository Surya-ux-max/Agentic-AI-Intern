import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Sparkles, Brain, Zap } from 'lucide-react'
import Cat3D from '../components/Cat3D'

// Black/white base + vivid accent colours
// #FF3CAC (hot magenta) · #FFDE03 (electric yellow) · #00F5D4 (neon mint) · #FF6B00 (vivid orange)

const features = [
  {
    icon: <Brain className="w-7 h-7 text-black" />,
    title: 'Smart Answers',
    desc: 'A local AI brain that actually understands your cat questions!',
    accent: '#FF3CAC',
    shadow: 'rgba(255,60,172,0.45)',
  },
  {
    icon: <Sparkles className="w-7 h-7 text-black" />,
    title: 'Magic Search',
    desc: 'Finds the most relevant cat facts using special vector magic.',
    accent: '#FFDE03',
    shadow: 'rgba(255,222,3,0.45)',
  },
  {
    icon: <Zap className="w-7 h-7 text-black" />,
    title: 'Super Fast',
    desc: 'Faster than a cat pounce — answers appear in a blink!',
    accent: '#00F5D4',
    shadow: 'rgba(0,245,212,0.4)',
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-black" />,
    title: 'Fun Chat',
    desc: 'A bold, exciting chat made for curious minds!',
    accent: '#FF6B00',
    shadow: 'rgba(255,107,0,0.45)',
  },
]

const catFacts = [
  'Cats sleep 12 to 16 hours a day',
  'Cats can make over 100 different sounds',
  'A group of cats is called a clowder',
  'Cats have 32 muscles in each ear',
  'Cats can jump 5 times their own height',
]

const tickerColors = ['#FF3CAC', '#FFDE03', '#00F5D4', '#FF6B00', '#FF3CAC']

const bubbles = [
  { color: '#FF3CAC', size: 26, left: '4%',  top: '12%', delay: 0   },
  { color: '#FFDE03', size: 18, left: '20%', top: '74%', delay: 0.5 },
  { color: '#00F5D4', size: 32, left: '77%', top: '16%', delay: 0.9 },
  { color: '#FF6B00', size: 15, left: '87%', top: '60%', delay: 0.2 },
  { color: '#FFDE03', size: 22, left: '50%', top: '5%',  delay: 0.7 },
  { color: '#FF3CAC', size: 19, left: '35%', top: '88%', delay: 1.1 },
  { color: '#00F5D4', size: 13, left: '64%', top: '79%', delay: 0.4 },
]

function Bubble({ color, size, left, top, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left, top, background: color, opacity: 0.2 }}
      animate={{ y: [0, -24, 0], scale: [1, 1.3, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

export default function LandingPage({ onEnterChat }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden" style={{ background: '#0a0a0a', color: '#fff' }}>

      {/* Floating bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {bubbles.map((b, i) => <Bubble key={i} {...b} />)}
      </div>

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-8%] left-[-8%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(255,60,172,0.15)' }} />
        <div className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(0,245,212,0.12)' }} />
        <div className="absolute bottom-[5%] left-[25%] w-[350px] h-[350px] rounded-full blur-[110px]" style={{ background: 'rgba(255,222,3,0.1)' }} />
      </div>

      {/* Hero */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase text-black"
          style={{ background: '#FFDE03', boxShadow: '0 4px 24px rgba(255,222,3,0.5)' }}
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Cat Knowledge Base
          <Sparkles className="w-4 h-4" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-black leading-none mb-4"
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)' }}
        >
          <span style={{ color: '#FF3CAC', textShadow: '0 0 80px rgba(255,60,172,0.7), 0 0 160px rgba(255,60,172,0.3)' }}>
            Cat
          </span>
          <span style={{ color: '#00F5D4', textShadow: '0 0 80px rgba(0,245,212,0.7), 0 0 160px rgba(0,245,212,0.3)' }}>
            GPT
          </span>
          <br />
          <span className="text-white font-extrabold" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
            Ask anything about cats!
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed font-semibold"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Discover amazing cat facts powered by AI — fun for curious minds of all ages!
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <motion.button
            onClick={onEnterChat}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 justify-center text-black"
            style={{ background: 'linear-gradient(135deg, #FF3CAC, #FF6B00)', boxShadow: '0 8px 32px rgba(255,60,172,0.5)' }}
          >
            <MessageCircle className="w-5 h-5" />
            Start Chatting!
          </motion.button>
          <motion.a
            href="http://localhost:8000/docs"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl font-bold text-lg"
            style={{ border: '2px solid rgba(0,245,212,0.6)', color: '#00F5D4', background: 'rgba(0,245,212,0.07)' }}
          >
            API Docs ↗
          </motion.a>
        </motion.div>

        {/* 3D Cat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          <Cat3D height="560px" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm flex flex-col items-center gap-1 font-bold"
          style={{ color: '#FFDE03' }}
        >
          <span>scroll down</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </motion.section>

      {/* Ticker */}
      <div className="relative z-10 py-5 overflow-hidden" style={{ background: '#111', borderTop: '2px solid rgba(255,255,255,0.08)', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...catFacts, ...catFacts].map((fact, i) => (
            <span key={i} className="text-sm font-black flex items-center gap-2 uppercase tracking-wide"
              style={{ color: tickerColors[i % tickerColors.length] }}>
              <span className="text-white text-base">★</span>
              {fact}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <section className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Built for{' '}
            <span style={{ color: '#FF3CAC' }}>curious</span>
            {' '}
            <span style={{ color: '#FFDE03' }}>kids</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Modern AI meets a world full of amazing cat knowledge!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative p-6 rounded-3xl cursor-default overflow-hidden group"
              style={{ background: '#111', border: `2px solid ${f.accent}44` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                style={{ background: f.accent, boxShadow: `0 4px 20px ${f.shadow}` }}
              >
                {f.icon}
              </div>
              <h3 className="font-black text-lg mb-2 text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{f.desc}</p>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: `${f.accent}08` }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl"
          style={{ background: '#111', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 0 80px rgba(255,60,172,0.12)' }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #FF3CAC, #FF6B00)', boxShadow: '0 8px 40px rgba(255,60,172,0.5)' }}
            >
              <MessageCircle className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-4xl font-black mb-4 text-white">
            Ready to chat with{' '}
            <span style={{ color: '#FF3CAC' }}>CatGPT?</span>
          </h2>
          <p className="text-lg mb-8 font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Ask about sleep habits, breeds, history, behaviour — and so much more!
          </p>
          <motion.button
            onClick={onEnterChat}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-2xl font-black text-xl flex items-center gap-2 mx-auto text-black"
            style={{ background: 'linear-gradient(135deg, #FF3CAC, #FF6B00)', boxShadow: '0 8px 32px rgba(255,60,172,0.5)' }}
          >
            <Sparkles className="w-5 h-5" />
            Start Chatting!
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm font-medium"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}>
        Built with React · FastAPI · Ollama · Three.js
      </footer>
    </div>
  )
}
