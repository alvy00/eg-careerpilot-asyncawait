"use client"
import TaskCard from "../reuseable/TaskCard";
import EventFormPage from "./ActivitiesForm";

const tasks = [
  { title: "Features Research 1", code: "CAR-8", status: "todo" },
  { title: "Features Research 2", code: "CAR-12", status: "todo" },

  { title: "UI Improvements", code: "CAR-21", status: "process" },
  { title: "Fix Calendar Bug", code: "CAR-22", status: "process" },

  { title: "Authentication Setup", code: "CAR-30", status: "done" },
];

export default function Activities() {

  const todo = tasks.filter((task) => task.status === "todo");
  const process = tasks.filter((task) => task.status === "process");
  const done = tasks.filter((task) => task.status === "done");

  return (
    <main className="min-h-screen flex justify-center py-4">
      <div className="w-full max-w-full bg-[#f9fafb] p-4 rounded-lg shadow-sm border border-gray-100 min-h-[665px] flex flex-col gap-6">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* TO DO */}
        <section>
          <header className="flex items-center gap-2 mb-2">
            <h1 className="text-gray-500 font-bold text-xs tracking-wider uppercase">
              TO DO
            </h1>
            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">
              {todo.length}
            </span>
          </header>

          <div className="flex flex-col gap-2">
            {todo.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </div>
        </section>
            {/* IN PROCESS */}
        <section>
          <header className="flex items-center gap-2 mb-2">
            <h1 className="text-orange-500 font-bold text-xs tracking-wider uppercase">
              IN PROCESS
            </h1>
            <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold">
              {process.length}
            </span>
          </header>

          <div className="flex flex-col gap-2">
            {process.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </div>
        </section>

        {/* DONE */}
        <section>
          <header className="flex items-center gap-2 mb-2">
            <h1 className="text-green-500 font-bold text-xs tracking-wider uppercase">
              DONE
            </h1>
            <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">
              {done.length}
            </span>
          </header>

          <div className="flex flex-col gap-2">
            {done.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </div>
        </section>

        {/* Create Button */}
        <footer>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <EventFormPage></EventFormPage>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </footer>
        </div>

    
      </div>
    </main>
  );
}