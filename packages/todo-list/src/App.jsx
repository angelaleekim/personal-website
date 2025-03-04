import TodoItem from "./components/TodoItem";
import AddTaskForm from "./components/AddTaskForm";
import { useState } from "react";
import Modal from "./components/Modal";
import { GroceryPanel } from "./components/GroceryPanel";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, description: "Eat", completed: false },
    { id: 2, description: "Sleep", completed: false },
    { id: 3, description: "Repeat", completed: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, description: newTask, completed: false },
    ]);
    setIsOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <main className="p-7">
      <div className="taskForm">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white rounded-xl bg-sky-500 hover:bg-sky-700 px-3 py-2 mt-3 ml-4 cursor-pointer"
        >
          New Task
        </button>
        <Modal
          isOpen={isOpen}
          onCloseRequested={() => setIsOpen(false)}
          headerLabel="New Task"
        >
          <AddTaskForm addTask={addTask} />
        </Modal>
        <section>
          <h1 className="text-xl m-4 font-bold">To Do</h1>
          <ul className="m-4">
            {tasks.map((task) => (
              <li key={task.id}>
                <TodoItem
                  id={task.id}
                  taskDescription={task.description}
                  completed={task.completed}
                  onDelete={() => deleteTask(task.id)}
                  onToggle={() => toggleTask(task.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <GroceryPanel addTask={addTask} />
    </main>
  );
}

export default App;
