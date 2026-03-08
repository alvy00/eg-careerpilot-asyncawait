export default function TaskCard({task }: {task: {title: string, code: string}}) {
  return (
    <article className="bg-white rounded-md p-4 flex flex-col gap-3 border border-gray-200 shadow-sm">
      <h2 className="text-gray-700 font-medium text-sm">{task.title}</h2>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 rounded p-0.5">
            <svg
              className="h-3 w-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-blue-500 text-xs font-semibold">
            {task.code}
          </span>
        </div>

      </div>
    </article>
  );
}