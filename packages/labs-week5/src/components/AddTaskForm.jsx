import React, { useState } from "react";

const AddTaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return; // Prevent empty tasks

    addTask(task); // Call function from App.js
    setTask(""); // Clear input field after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="rounded-lg border-1 border-gray-400 outline-0 px-3 py-2 hover:bg-gray-50"
        placeholder="New task name"
        value={task}
        onChange={(e) => setTask(e.target.value)} // Update local state
      />
      <button
        type="submit"
        className="text-white rounded-lg bg-sky-500 hover:bg-sky-700 px-3 py-2 mt-3 ml-4 cursor-pointer"
      >
        Add task
      </button>
    </form>
  );
};

export default AddTaskForm;
