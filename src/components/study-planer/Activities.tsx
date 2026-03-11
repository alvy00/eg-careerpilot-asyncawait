"use client"
import { useEffect, useState } from "react";
import TaskCard from "../reuseable/TaskCard";
import EventFormPage from "./ActivitiesForm";
import { useAuth } from "@/context/AuthContext";

interface Activity {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "process" | "done";
  start: string;
  end: string;
}

export default function Activities() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [user]);

  const fetchActivities = async () => {
    try {
      const url = user ? `/api/activities?userId=${user.uid}` : "/api/activities";
      const response = await fetch(url);
      const data = await response.json();
      console.log("Activities fetched:", data); // Debug log
      setTasks(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityCreated = () => {
    fetchActivities();
  };

  const todo = tasks.filter((task) => task.status === "todo");
  const process = tasks.filter((task) => task.status === "process");
  const done = tasks.filter((task) => task.status === "done");

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center py-4">
        <div className="text-gray-600">Loading activities...</div>
      </main>
    );
  }

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
        <footer className="mt-4">
<button 
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium w-full transition-colors" 
  onClick={()=>(document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal()}
>
  + Create New Activity
</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <EventFormPage></EventFormPage>
    <div className="modal-action">
      <form method="dialog">
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
