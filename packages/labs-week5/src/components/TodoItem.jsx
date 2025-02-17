import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ taskDescription, completed, onDelete, onToggle }) => {
  return (
    <div className="button-container flex justify-between max-w-50">
      <label>
        {/* Checkbox now correctly updates the task's completion status */}
        <input
          className="mx-2 my-3"
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
        <span className={completed ? "line-through text-gray-500" : ""}>
          {taskDescription}
        </span>
      </label>
      {/* Click on trashcan to delete task */}
      <FontAwesomeIcon
        className="text-gray-500 cursor-pointer"
        icon={faTrash}
        onClick={onDelete}
      />
    </div>
  );
};

export default TodoItem;
