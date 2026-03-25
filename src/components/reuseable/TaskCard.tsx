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

const STATUS_HEX: Record<string, string> = {
  todo:    "#F97316",
  process: "#06B6D4",
  done:    "#4fa3a5",
}

function getHex(key?: string) {
  return STATUS_HEX[key?.toLowerCase() ?? ""] ?? "#F97316"
}

export default function TaskCard({
  task,
  onEdit,
}: {
  task: Task
  onEdit?: (task: Task) => void
}) {
  const isDone = task.status === "done"
  const statusKey = task.status ?? "todo"
  const hex = getHex(statusKey)
  const tagKey = task.tag ?? task.status

  return (
    <article
      className="group bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-xl p-4 flex flex-col gap-3 transition-all duration-300"
      style={{ borderColor: `${hex}22` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1">
          {/* Tick */}
          <div
            className="mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors"
            style={isDone
              ? { backgroundColor: hex, borderColor: hex }
              : { borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(0,0,0,0.3)" }
            }
          >
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
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-white/5 text-gray-500 transition-all shrink-0"
            style={{ color: hex }}
          >
            <Pencil size={13} />
          </button>
        )}
      </div>

      {task.description && (
        <p className="text-gray-500 text-xs pl-7 leading-relaxed">{task.description}</p>
      )}

      <div className="pl-7">
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
          style={{ color: getHex(tagKey), borderColor: `${getHex(tagKey)}40`, backgroundColor: `${getHex(tagKey)}15` }}
        >
          {tagKey}
        </span>
      </div>
    </article>
  )
}
