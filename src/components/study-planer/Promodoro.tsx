"use client"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import DashboardPageWrapper from "@/components/reuseable/DashboardPageWrapper"

type Mode = "focus" | "short" | "long"

const MODES: Record<Mode, {
  label: string; seconds: number
  color: string; ring: string; glow: string
  solid: string; badge: string; bg: string
}> = {
  focus: {
    label: "Pomodoro", seconds: 1500,
    color: "text-orange-400",
    ring: "stroke-orange-500",
    glow: "shadow-orange-500/30",
    solid: "bg-orange-500 hover:bg-orange-600",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    bg: "bg-orange-500/5 border-orange-500/20",
  },
  short: {
    label: "Short Break", seconds: 300,
    color: "text-blue-400",
    ring: "stroke-blue-500",
    glow: "shadow-blue-500/30",
    solid: "bg-blue-500 hover:bg-blue-600",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    bg: "bg-blue-500/5 border-blue-500/20",
  },
  long: {
    label: "Long Break", seconds: 900,
    color: "text-green-400",
    ring: "stroke-green-500",
    glow: "shadow-green-500/30",
    solid: "bg-green-500 hover:bg-green-600",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
    bg: "bg-green-500/5 border-green-500/20",
  },
}

const RADIUS = 110
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface Quote { text: string; author: string }

export default function Promodoro() {
  const [mode, setMode] = useState<Mode>("focus")
  const [second, setSecond] = useState(MODES.focus.seconds)
  const [active, setActive] = useState(false)
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" })
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [fadeQuote, setFadeQuote] = useState(true)

  const total = MODES[mode].seconds
  const progress = second / total
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const m = MODES[mode]

  const fetchQuote = useCallback(async () => {
    setQuoteLoading(true)
    setFadeQuote(false)
    try {
      const { data } = await axios.get<Quote>("/api/quote")
      setTimeout(() => { setQuote(data); setFadeQuote(true) }, 300)
    } catch {
      setFadeQuote(true)
    } finally {
      setQuoteLoading(false)
    }
  }, [])

  // Fetch once on mount
  useEffect(() => { fetchQuote() }, [])

  // Timer — fetch new quote every 30 elapsed seconds while active
  useEffect(() => {
    if (!active) return
    let elapsed = 0
    const id = setInterval(() => {
      elapsed += 1
      setSecond(prev => {
        if (prev <= 1) { clearInterval(id); setActive(false); return 0 }
        return prev - 1
      })
      if (elapsed % 30 === 0) fetchQuote()
    }, 1000)
    return () => clearInterval(id)
  }, [active, fetchQuote])

  const changeMode = (mo: Mode) => {
    setActive(false); setMode(mo); setSecond(MODES[mo].seconds)
  }

  const mins = String(Math.floor(second / 60)).padStart(2, "0")
  const secs = String(second % 60).padStart(2, "0")

  return (
    <DashboardPageWrapper>
      <div className="flex items-center justify-center min-h-screen px-6 py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT — Timer */}
          <div className="flex flex-col items-center gap-8">

            {/* Mode tabs */}
            <div className="flex gap-2 bg-white/[0.03] border border-white/10 rounded-2xl p-1.5">
              {(Object.keys(MODES) as Mode[]).map(mo => (
                <button key={mo} onClick={() => changeMode(mo)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    mode === mo
                      ? `${MODES[mo].solid} text-white shadow-lg ${MODES[mo].glow}`
                      : "text-gray-400 hover:text-white"
                  }`}>
                  {MODES[mo].label}
                </button>
              ))}
            </div>

            {/* SVG Ring */}
            <div className="relative flex items-center justify-center">
              <svg width="280" height="280" className="-rotate-90">
                <circle cx="140" cy="140" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle
                  cx="140" cy="140" r={RADIUS} fill="none"
                  className={`${m.ring} transition-all duration-1000`}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-7xl font-bold tabular-nums ${m.color}`} style={{ textShadow: `0 0 20px currentColor` }}>
                  {mins}:{secs}
                </span>
                <span className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{m.label}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={() => setActive(a => !a)}
                className={`px-12 py-3.5 ${m.solid} text-white font-bold text-lg rounded-xl shadow-lg ${m.glow} transition-all active:scale-95 hover:opacity-90`}
              >
                {active ? "PAUSE" : "START"}
              </button>
              <button
                onClick={() => changeMode(mode)}
                className="px-8 py-3.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-300 font-bold text-lg rounded-xl transition-all active:scale-95"
              >
                RESET
              </button>
            </div>

            {/* Duration cards */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {(Object.keys(MODES) as Mode[]).map(mo => (
                <div key={mo} className={`border rounded-xl p-3 text-center transition-all ${mode === mo ? MODES[mo].bg : "bg-white/[0.02] border-white/5"}`}>
                  <p className={`text-sm font-bold ${MODES[mo].color}`}>{MODES[mo].seconds / 60} min</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{MODES[mo].label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Quote */}
          <div className={`flex flex-col justify-center gap-6 border rounded-2xl p-8 ${m.bg} transition-all duration-500`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${m.badge}`}>
                Daily Inspiration
              </span>
              <button
                onClick={fetchQuote}
                disabled={quoteLoading}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-40"
                title="New quote"
              >
                <span className={`material-symbols-outlined text-lg ${quoteLoading ? "animate-spin" : ""}`}>
                  {quoteLoading ? "progress_activity" : "refresh"}
                </span>
              </button>
            </div>

            <div className={`transition-opacity duration-300 ${fadeQuote ? "opacity-100" : "opacity-0"}`}>
              <div className={`text-5xl font-serif ${m.color} mb-4 opacity-40`}>"</div>
              <p className="text-xl font-light italic text-gray-200 leading-relaxed">
                {quote.text}
              </p>
              <p className="text-sm text-gray-500 mt-4 uppercase tracking-widest">— {quote.author}</p>
            </div>

            <div className="h-px bg-white/5 my-2" />

            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Session tips</p>
              {["Silence notifications", "Keep water nearby", "Take deep breaths on breaks"].map(tip => (
                <div key={tip} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className={`w-1.5 h-1.5 rounded-full ${m.solid}`} />
                  {tip}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardPageWrapper>
  )
}
