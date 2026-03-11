"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

interface EventFormPageProps {
  onActivityCreated?: () => void
}

export default function EventFormPage({ onActivityCreated }: EventFormPageProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (event: any) => {
      const { data } = await axios.post("/api/activities", event)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      alert("Activity created successfully!")
      if (onActivityCreated) {
        onActivityCreated()
      }
      const modal = document.getElementById('my_modal_5') as HTMLDialogElement
      modal?.close()
    },
    onError: (error) => {
      console.error("Error:", error)
      alert("Failed to create activity")
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    const startValue = formData.get("start") as string
    const endValue = formData.get("end") as string
    
    const startDate = new Date(startValue)
    const endDate = new Date(endValue)
    
    const event = {
      title: formData.get("title"),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      description: formData.get("description"),
      status: formData.get("status"),
      timezone: timezone,
      userId: user?.uid || null
    }

    mutation.mutate(event)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="min-h-screen text-green-900 flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Event
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Event title"
            className="border rounded-lg px-3 py-2"
            required
          />

          {/* Start Time */}
          <input
            type="datetime-local"
            name="start"
            className="border rounded-lg px-3 py-2"
            required
          />

          {/* End Time */}
          <input
            type="datetime-local"
            name="end"
            className="border rounded-lg px-3 py-2"
            required
          />

          {/* Status */}
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Status</option>
            <option value="todo">Todo</option>
            <option value="process">Process</option>
            <option value="done">Done</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            rows={4}
            placeholder="Event description"
            className="border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
          >
            {mutation.isPending ? "Creating..." : "Create Event"}
          </button>

        </form>
      </div>
    </div>
  )
}