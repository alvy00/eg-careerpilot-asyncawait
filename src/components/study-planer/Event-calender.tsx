'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import 'temporal-polyfill/global'
import { useAuth } from '@/context/AuthContext'
import DashboardPageWrapper from '@/components/reuseable/DashboardPageWrapper'
import EventFormPage from './ActivitiesForm'

interface Activity {
  _id: string
  title: string
  description?: string
  status?: 'todo' | 'process' | 'done'
  start: string
  end: string
  timezone?: string
}

const STATUS_COLORS = {
  todo:    { bg: 'bg-purple-500/20 border-l-4 border-purple-500 text-purple-200 hover:bg-purple-500 hover:text-white', dot: 'bg-purple-500', badge: 'bg-purple-500/20 text-purple-300' },
  process: { bg: 'bg-orange-500/20 border-l-4 border-orange-500 text-orange-200 hover:bg-orange-500 hover:text-white', dot: 'bg-orange-500', badge: 'bg-orange-500/20 text-orange-300' },
  done:    { bg: 'bg-green-500/20  border-l-4 border-green-500  text-green-200  hover:bg-green-500  hover:text-white', dot: 'bg-green-500',  badge: 'bg-green-500/20  text-green-300'  },
}

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function getWeekDates(base: Date) {
  const day = base.getDay()
  const diff = (day === 0 ? -6 : 1 - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + diff + i)
    return d
  })
}

function fmtHour(h: number) {
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

function fmtMonthYear(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getEventStyle(activity: Activity) {
  const start = new Date(activity.start)
  const end = new Date(activity.end)
  const startMinutes = start.getHours() * 60 + start.getMinutes()
  const durationMinutes = Math.max((end.getTime() - start.getTime()) / 60000, 30)
  const HOUR_HEIGHT = 80
  const top = (startMinutes / 60) * HOUR_HEIGHT
  const height = Math.max((durationMinutes / 60) * HOUR_HEIGHT, 36)
  return { top, height }
}

export default function CalendarApp() {
  const { user } = useAuth()
  const [baseDate, setBaseDate] = useState(new Date())
  const [view, setView] = useState<'week' | 'month'>('week')
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  const weekDates = useMemo(() => getWeekDates(baseDate), [baseDate])
  const today = new Date()

  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ['activities', user?.uid],
    queryFn: async () => {
      const url = user ? `/api/activities?userId=${user.uid}` : '/api/activities'
      const { data } = await axios.get<Activity[]>(url)
      return data
    },
    refetchInterval: 5000,
  })

  const filtered = activities.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  )

  const prevWeek = () => { const d = new Date(baseDate); d.setDate(d.getDate() - 7); setBaseDate(d) }
  const nextWeek = () => { const d = new Date(baseDate); d.setDate(d.getDate() + 7); setBaseDate(d) }

  // Next upcoming event
  const nextEvent = activities
    .filter(a => new Date(a.start) > today)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0]

  const nextEventIn = nextEvent ? (() => {
    const diff = new Date(nextEvent.start).getTime() - today.getTime()
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    return `${h}h ${m}m`
  })() : null

  return (
    <DashboardPageWrapper>
      <div className="flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">{fmtMonthYear(baseDate)}</h2>
            <div className="flex items-center gap-1 bg-white/[0.05] border border-white/10 p-1 rounded-xl">
              <button onClick={prevWeek} className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button onClick={() => setBaseDate(new Date())} className="px-3 py-1 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition-all">
                Today
              </button>
              <button onClick={nextWeek} className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-sm mx-6">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex p-1 bg-white/[0.05] border border-white/10 rounded-xl">
              {(['week','month'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${view === v ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Week view */}
        {view === 'week' && (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Day labels */}
            <div className="grid sticky top-0 z-[5] bg-[#030712]/90 backdrop-blur-md border-b border-white/5"
              style={{ gridTemplateColumns: '72px repeat(7, 1fr)' }}>
              <div className="h-16 border-r border-white/5" />
              {weekDates.map((d, i) => {
                const isToday = isSameDay(d, today)
                return (
                  <div key={i} className={`flex flex-col items-center justify-center h-16 border-r border-white/5 ${isToday ? 'bg-indigo-500/5' : ''}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-indigo-400' : 'text-gray-500'}`}>{DAYS[i]}</span>
                    <div className={`mt-1 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${isToday ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-300'}`}>
                      {d.getDate()}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Time grid */}
            <div className="relative" style={{ display: 'grid', gridTemplateColumns: '72px repeat(7, 1fr)' }}>
              {/* Time labels */}
              <div className="flex flex-col">
                {HOURS.map(h => (
                  <div key={h} className="flex justify-end pr-3 pt-2 text-[10px] font-bold text-gray-600 uppercase" style={{ height: 80, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {fmtHour(h)}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDates.map((d, di) => {
                const dayEvents = filtered.filter(a => isSameDay(new Date(a.start), d))
                const isToday = isSameDay(d, today)
                return (
                  <div key={di} className={`relative border-r border-white/5 ${isToday ? 'bg-indigo-500/[0.02]' : ''}`}
                    style={{ height: 80 * 24 }}>
                    {/* Hour lines */}
                    {HOURS.map(h => (
                      <div key={h} className="absolute w-full border-b border-white/[0.04]" style={{ top: h * 80, height: 80 }} />
                    ))}
                    {/* Events */}
                    {dayEvents.map(ev => {
                      const { top, height } = getEventStyle(ev)
                      const status = ev.status ?? 'todo'
                      const colors = STATUS_COLORS[status] ?? STATUS_COLORS.todo
                      const startTime = new Date(ev.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                      return (
                        <div key={ev._id}
                          className={`absolute left-1 right-1 rounded-xl px-3 py-2 cursor-pointer transition-all duration-200 group ${colors.bg}`}
                          style={{ top, height, zIndex: 10 }}>
                          <div className="flex justify-between items-start">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${colors.badge}`}>{startTime}</span>
                          </div>
                          <p className="text-xs font-semibold mt-1 truncate">{ev.title}</p>
                          {height > 60 && ev.description && (
                            <p className="text-[10px] opacity-70 mt-0.5 line-clamp-2">{ev.description}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Month view */}
        {view === 'month' && (
          <div className="flex-1 overflow-y-auto p-4">
            <MonthView baseDate={baseDate} activities={filtered} />
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t border-white/5 bg-[#030712]/80 backdrop-blur-md px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            {/* Legend */}
            {(['todo','process','done'] as const).map(s => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[s].dot}`} />
                <span className="text-xs text-gray-500 capitalize">{s === 'process' ? 'In Progress' : s === 'todo' ? 'To Do' : 'Done'}</span>
              </div>
            ))}
            {nextEventIn && (
              <div className="flex items-center gap-1.5 ml-4">
                <span className="material-symbols-outlined text-gray-500 text-sm">schedule</span>
                <span className="text-xs text-gray-500">Next event in {nextEventIn}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:scale-105 transition-transform text-white"
          >
            <span className="material-symbols-outlined text-2xl">add</span>
          </button>
        </div>
      </div>

      {/* Create modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-[540px] p-8 shadow-2xl">
            <EventFormPage onActivityCreated={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </DashboardPageWrapper>
  )
}

function MonthView({ baseDate, activities }: { baseDate: Date; activities: Activity[] }) {
  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const cells = Array.from({ length: startOffset + daysInMonth }, (_, i) => {
    if (i < startOffset) return null
    return new Date(year, month, i - startOffset + 1)
  })

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-600 py-2">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />
          const isToday = isSameDay(d, today)
          const dayEvents = activities.filter(a => isSameDay(new Date(a.start), d))
          return (
            <div key={i} className={`min-h-[100px] rounded-xl p-2 border transition-all ${isToday ? 'border-indigo-500/40 bg-indigo-500/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'}`}>
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 ${isToday ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'text-gray-400'}`}>
                {d.getDate()}
              </div>
              <div className="flex flex-col gap-0.5">
                {dayEvents.slice(0, 3).map(ev => {
                  const s = ev.status ?? 'todo'
                  return (
                    <div key={ev._id} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md truncate ${STATUS_COLORS[s]?.badge ?? STATUS_COLORS.todo.badge}`}>
                      {ev.title}
                    </div>
                  )
                })}
                {dayEvents.length > 3 && <span className="text-[10px] text-gray-600">+{dayEvents.length - 3} more</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
