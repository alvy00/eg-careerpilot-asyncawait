"use client"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { motion } from "framer-motion"
import TaskCard from "../reuseable/TaskCard"
import EventFormPage from "./ActivitiesForm"
import { useAuth } from "@/context/AuthContext"
import MeshBackground from "@/components/Homepage/MeshBackground"

interface Activity {
  _id: string
  title: string
  description?: string
  tag?: string
  status: "todo" | "process" | "done"
  start: string
  end: string
}

const columns = [
  {
    key: "todo",
    label: "To Do",
    badge: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    glow: "from-purple-500/5",
    hover: "hover:border-purple-500/30",
  },
  {
    key: "process",
    label: "In Progress",
    badge: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
    glow: "from-orange-500/5",
    hover: "hover:border-orange-500/30",
  },
  {
    key: "done",
    label: "Done",
    badge: "bg-green-500/20 text-green-300 border border-green-500/30",
    glow: "from-green-500/5",
    hover: "hover:border-green-500/30",
  },
]

export default function Activities() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [editData, setEditData] = useState<Activity | null>(null)

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["activities", user?.uid],
    queryFn: async () => {
      const url = user ? `/api/activities?userId=${user.uid}` : "/api/activities"
      const { data } = await axios.get(url)
      return data
    },
    refetchInterval: 5000,
  })

  const openCreate = () => {
    setEditData(null)
    ;(document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()
  }

  const openEdit = (task: Activity) => {
    setEditData(task)
    ;(document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()
  }

  const handleDone = () => {
    queryClient.invalidateQueries({ queryKey: ["activities"] })
  }

  const grouped = {
    todo:    tasks.filter((t: Activity) => t.status === "todo"),
    process: tasks.filter((t: Activity) => t.status === "process"),
    done:    tasks.filter((t: Activity) => t.status === "done"),
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-[#030712]">
        <div className="text-gray-400 text-sm">Loading activities...</div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen py-6 px-2 bg-[#030712]">
      <MeshBackground />
      <div className="absolute top-0 -left-24 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map(({ key, label, badge, glow, hover }, i) => {
          const colTasks = grouped[key as keyof typeof grouped]
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col gap-3 bg-gradient-to-b ${glow} to-transparent bg-white/[0.02] backdrop-blur-md border border-white/10 ${hover} rounded-2xl p-4 min-h-[500px] transition-colors duration-500`}
            >
              <header className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-white/90 font-semibold text-sm">{label}</h2>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badge}`}>
                    {colTasks.length}
                  </span>
                </div>
                <button className="text-gray-600 hover:text-gray-300 transition-colors text-lg tracking-widest leading-none">···</button>
              </header>

              <div className="flex flex-col gap-3 flex-1">
                {colTasks.map((task: Activity) => (
                  <TaskCard key={task._id} task={task} onEdit={() => openEdit(task)} />
                ))}
              </div>

              <button
                onClick={openCreate}
                className="mt-2 w-full border border-dashed border-white/10 hover:border-indigo-500/40 text-gray-500 hover:text-gray-300 text-sm py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1"
              >
                + Create
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#0d1117] border border-white/10 rounded-2xl max-w-[540px] p-8">
          <EventFormPage onActivityCreated={handleDone} editData={editData} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </main>
  )
}
