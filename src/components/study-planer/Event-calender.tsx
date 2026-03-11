'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createViewMonthGrid, createViewWeek } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { useMemo, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface Activity {
  _id: string
  title: string
  description?: string
  start: string
  end: string   
  timezone: string
}

function CalendarApp() {
  const { user } = useAuth()

  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ['activities', user?.uid],
    queryFn: async () => {
      const url = user ? `/api/activities?userId=${user.uid}` : "/api/activities"
      const { data } = await axios.get<Activity[]>(url)
      return data
    },
    refetchInterval: 5000,
  })

  const events = activities.map(event => ({
    id: event._id,
    title: event.title,
    start: Temporal.ZonedDateTime.from(event.start + `[${event.timezone}]`),
    end: Temporal.ZonedDateTime.from(event.end + `[${event.timezone}]`),
    description: event.description || ''
  }))

  const eventsService = useMemo(() => createEventsServicePlugin(), [])

  const calendar = useNextCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events,
    // Schedule-X expects PlainDate here, not ZonedDateTime
    selectedDate: Temporal.Now.plainDateISO(),
    plugins: [eventsService, createEventModalPlugin()],
  })

  useEffect(() => {
    if (eventsService && events.length > 0) {
      eventsService.set(events)
    }
  }, [events, eventsService])

  return <ScheduleXCalendar calendarApp={calendar} />
}

export default CalendarApp