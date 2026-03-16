import { Pencil } from "lucide-react"

export interface Task {
  _id?: string
  title: string
  description?: string
  status?: string
  tag?: string
  start?: string
  end?: string
}

const tagColors: Record<string, string> = {
  todo:     "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  process:  "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  done:     "bg-green-500/20  text-green-300  border border-green-500/30",
  research: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  design:   "bg-pink-500/20   text-pink-300   border border-pink-500/30",
  high:     "bg-red-500/20    text-red-300    border border-red-500/30",
  admin:    "bg-slate-500/20  text-slate-300  border border-slate-500/30",
}

const tickColors: Record<string, string> = {
  todo:    "bg-purple-500 border-purple-500",
  process: "bg-orange-500 border-orange-500",
  done:    "bg-green-500  border-green-500",
}

function getTagColor(key?: string) {
  return tagColors[key?.toLowerCase() ?? ""] ?? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
}

function getTickColor(status?: string) {
  return tickColors[status ?? ""] ?? "bg-indigo-500 border-indigo-500"
}

export default function TaskCard({
  task,
  onEdit,
}: {
  task: Task
  onEdit?: (task: Task) => void
}) {
  const isDone = task.status === "done"

  return (
    <article className="group bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-indigo-500/30 rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1">
          {/* Tick */}
          <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
            isDone ? getTickColor(task.status) : "border-white/20 bg-black/30"
          }`}>
            {isDone && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <h2 className={`text-sm font-medium leading-snug ${isDone ? "line-through text-gray-500" : "text-gray-200"}`}>
            {task.title}
          </h2>
        </div>

        {/* Edit button */}
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-gray-500 hover:text-indigo-300 transition-all shrink-0"
          >
            <Pencil size={13} />
          </button>
        )}
      </div>

      {task.description && (
        <p className="text-gray-500 text-xs pl-7 leading-relaxed">{task.description}</p>
      )}

      <div className="pl-7">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${getTagColor(task.tag ?? task.status)}`}>
          {task.tag ?? task.status}
        </span>
      </div>
    </article>
  )
}
