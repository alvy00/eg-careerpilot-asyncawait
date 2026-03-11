"use client";

import axios from "axios";

export default function EventFormPage() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const event = {
  title: formData.get("title"),
  start: formData.get("start"),
  end: formData.get("end"),
  description: formData.get("description"),
  status: formData.get("status"),
};

    try {
      const res = await axios.post("/api/activities", event);
      console.log("Saved:", res.data);

      alert("Activity created successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            rows="4"
            placeholder="Event description"
            className="border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
}