'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createViewMonthGrid, createViewWeek } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { useMemo, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import EventFormPage from './ActivitiesForm'

interface Activity {
  _id: string
  title: string
  description?: string
  status?: string
  start: string
  end: string
  timezone?: string
}

function toZDT(iso: string, tz?: string): Temporal.ZonedDateTime {
  const zone = tz ?? 'UTC'
  try {
    return Temporal.Instant.from(iso).toZonedDateTimeISO(zone)
  } catch {
    return Temporal.Instant.fromEpochMilliseconds(new Date(iso).getTime()).toZonedDateTimeISO('UTC')
  }
}

const STATUS_COLOR: Record<string, string> = {
  todo: 'orange', process: 'cyan', done: 'green',
}

// All schedule-x CSS variables that carry purple/indigo
const SX_ORANGE_OVERRIDE = `
  :root, .sx__wrapper {
    --sx-color-primary: #ED8936 !important;
    --sx-color-primary-container: rgba(237,137,54,0.15) !important;
    --sx-color-on-primary: #ffffff !important;
    --sx-color-on-primary-container: #92400E !important;
    --sx-color-secondary: #ED8936 !important;
    --sx-color-secondary-container: rgba(237,137,54,0.12) !important;
    --sx-color-on-secondary: #ffffff !important;
    --sx-color-on-secondary-container: #92400E !important;
    --sx-color-surface-variant: rgba(237,137,54,0.08) !important;
    --sx-color-on-surface-variant: #ED8936 !important;
    --sx-color-tertiary: #ED8936 !important;
    --sx-color-tertiary-container: rgba(237,137,54,0.12) !important;
    --sx-color-on-tertiary: #ffffff !important;
    --sx-color-on-tertiary-container: #92400E !important;
  }
  .sx__month-grid-day__header-date.is-today,
  .sx__week-grid__date.is-today,
  .sx__date-indicator--today,
  [class*="is-today"] .sx__date-indicator {
    background-color: #ED8936 !important;
    color: #fff !important;
    border-color: #ED8936 !important;
  }
  .sx__view-selection-item--selected,
  .sx__button--primary {
    background-color: #ED8936 !important;
    color: #fff !important;
    border-color: #ED8936 !important;
  }
  .sx__calendar-header__navigation button:hover,
  .sx__chevron-wrapper:hover { color: #ED8936 !important; }
  *:focus-visible { outline-color: #ED8936 !important; }
`

export default function CalendarApp() {
  const { user } = useAuth()

  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ['activities', user?.uid],
    queryFn: async () => {
      const url = user ? `/api/activities?userId=${user.uid}` : '/api/activities'
      const { data } = await axios.get<Activity[]>(url)
      return data
    },
    refetchInterval: 5000,
    enabled: !!user,
  })

  const eventsService = useMemo(() => createEventsServicePlugin(), [])

  const calendar = useNextCalendarApp({
    views: [createViewMonthGrid(), createViewWeek()],
    defaultView: 'month-grid',
    events: [],
    calendars: {
      orange: {
        colorName: 'orange',
        lightColors: { main: '#ED8936', container: '#FEF3C7', onContainer: '#92400E' },
        darkColors:  { main: '#ED8936', container: '#78350F', onContainer: '#FDE68A' },
      },
      cyan: {
        colorName: 'cyan',
        lightColors: { main: '#38BDF8', container: '#E0F2FE', onContainer: '#0C4A6E' },
        darkColors:  { main: '#38BDF8', container: '#0C4A6E', onContainer: '#BAE6FD' },
      },
      green: {
        colorName: 'green',
        lightColors: { main: '#22C55E', container: '#DCFCE7', onContainer: '#14532D' },
        darkColors:  { main: '#22C55E', container: '#14532D', onContainer: '#BBF7D0' },
      },
    },
    plugins: [eventsService, createEventModalPlugin()],
  })

  useEffect(() => {
    if (!eventsService || activities.length === 0) return
    try {
      eventsService.set(
        activities
          .filter(a => a.start && a.end)
          .map(a => ({
            id: a._id,
            title: a.title,
            start: toZDT(a.start, a.timezone),
            end: toZDT(a.end, a.timezone),
            description: a.description ?? '',
            calendarId: STATUS_COLOR[a.status ?? 'todo'] ?? 'orange',
          }))
      )
    } catch (err) {
      console.error('[Calendar] Failed to parse events:', err)
    }
  }, [activities, eventsService])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SX_ORANGE_OVERRIDE }} />

      <div className="h-full w-full">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>

    </>
  )
}
