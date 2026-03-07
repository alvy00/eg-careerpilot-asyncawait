'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
//   createViewDay,
//   createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { useState } from "react";

function CalendarApp() {
  const [eventsService] = useState(() => createEventsServicePlugin());

  const calendar = useNextCalendarApp({
    views: [
    //   createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
    //   createViewMonthAgenda()
    ],
    events: [
      {
        id: '1',
        title: 'Event Nontu boltu',
        start: Temporal.ZonedDateTime.from('2026-03-04T10:05:00+01:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2026-03-04T10:35:00+01:00[Europe/Berlin]'),
        description: 'This is the first event',
      },
      {
        id: '2',
        title: 'Event er name nai',
        start: Temporal.ZonedDateTime.from('2026-03-06T10:05:00+01:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2026-03-06T10:35:00+01:00[Europe/Berlin]'),
        description: 'This is the first event',
      },
      {
        id: '3',
        title: 'Event Ki jani',
        start: Temporal.ZonedDateTime.from('2026-03-05T10:05:00+01:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2026-03-05T10:35:00+01:00[Europe/Berlin]'),
        description: 'This is the first event',
      },
    ],
    selectedDate: Temporal.PlainDate.from('2026-03-04'),
    plugins: [eventsService],
  });

  return (
    <div className='flex justify-center items-center'>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;