'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import MeshBackground from '@/components/Homepage/MeshBackground'

interface Message { role: 'user' | 'assistant'; content: string; time: string }

function now() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function cleanMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .trim()
}

export default function AiChatbotPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your CareerPilot AI Mentor. Ask me anything about your learning journey, roadmaps, or career goals.", time: now() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { data: roadmaps = [] } = useQuery({
    queryKey: ['mentor-roadmaps', user?.uid],
    queryFn: async () => {
      const url = user ? `/api/mentor?userId=${user.uid}` : '/api/mentor'
      const { data } = await axios.get(url)
      return data
    },
    enabled: !!user,
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 128) + 'px'
  }, [input])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return
    const userMsg: Message = { role: 'user', content: text, time: now() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setIsTyping(true)

    try {
      const { data } = await axios.post('/api/mentor', {
        messages: updated.map(m => ({ role: m.role, content: m.content })),
        userId: user?.uid ?? null,
      })
      setMessages(prev => [...prev, { role: 'assistant', content: cleanMarkdown(data.reply), time: now() }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't respond. Please try again.", time: now() }])
    } finally {
      setIsTyping(false)
    }
  }

  // Roadmap quick-ask chips
  const roadmapChips = roadmaps.slice(0, 3).map((r: any) => ({
    label: r.roadmap?.skill ?? 'Roadmap',
    prompt: `Explain my ${r.roadmap?.skill} roadmap in detail — phases, topics, and what I should focus on first.`,
  }))

  const staticChips = [
    { label: "Study tip", prompt: "Give me a practical study tip for today" },
    { label: "Stay consistent", prompt: "How do I stay consistent with my learning?" },
  ]

  const chips = [...roadmapChips, ...staticChips]

  return (
    <div className="relative flex flex-col overflow-hidden -m-4 md:-m-8 -mt-20 lg:-mt-8" style={{ height: '100vh' }}>
      <MeshBackground />

      {/* Header */}
      <header className="shrink-0 h-16 border-b border-white/5 flex items-center px-6 bg-black/20 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a1a] rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-white leading-tight">CareerPilot Mentor</h2>
            <p className="text-[11px] text-green-400 font-medium">Online • Gemini AI</p>
          </div>
        </div>
      </header>

      {/* Messages — fills remaining space */}
      <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(234,88,12,0.2) transparent' }}>
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 shrink-0 flex items-center justify-center text-orange-400 self-start mt-1">
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </div>
                )}
                <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-500/20'
                      : 'bg-white/[0.05] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-600 px-1">{msg.time}</span>
                  {msg.role === 'assistant' && (
                    <div className="flex gap-1">
                      {['content_copy', 'thumb_up', 'thumb_down'].map(icon => (
                        <button key={icon} className="p-1.5 rounded-md hover:bg-white/5 text-gray-600 hover:text-gray-400 transition-colors">
                          <span className="material-symbols-outlined text-[15px]">{icon}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 shrink-0 flex items-center justify-center text-orange-400 self-start mt-1">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div className="bg-white/[0.05] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1 items-center h-4">
                  {[0, 150, 300].map(d => (
                    <div key={d} className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="shrink-0 border-t border-white/5 bg-[#0a0a1a]/90 backdrop-blur-md px-4 py-4 z-10">
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {chips.map(c => (
              <button key={c.label} onClick={() => sendMessage(c.prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-400 hover:border-orange-500/50 hover:text-orange-300 transition-all flex items-center gap-1.5">
                {roadmapChips.find((r: {label: string}) => r.label === c.label) && (
                  <span className="material-symbols-outlined text-[13px]">map</span>
                )}
                {c.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl flex items-end p-2 gap-2 focus-within:border-orange-500/40 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
                placeholder="Ask anything about your learning journey..."
                rows={1}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-2 overflow-y-auto resize-none text-gray-200 placeholder:text-gray-600 outline-none"
                style={{ minHeight: 44, maxHeight: 128 }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-40 shrink-0"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-600">CareerPilot AI can make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  )
}
