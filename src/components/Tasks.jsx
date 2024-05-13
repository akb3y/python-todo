/* eslint-disable react/prop-types */
import React from "react";
import { MdDelete } from "react-icons/md";

const Task = ({ data, handleTaskChange, handleDelete }) => {
  const renderTasks = (status) => {
    return data
      .filter((task) => task.task === status)
      .map((task) => (
        <div key={task.id}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <p style={{ width: "90%", marginBottom: "-5px" }}>{task.title}</p>
            <MdDelete style={{ fontSize: "20px" }} onClick={() => handleDelete(task.id)} />
          </span>
          <ul>{task.description}</ul>
          <ul>
            <select
              value={task.task}
              onChange={(e) => handleTaskChange(task.id, e.target.value)}
              className="task-select">
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </ul>
        </div>
      ));
  };

  return (
    <div className="task-table">
      <div className="todo-container">
        <h2 style={{ textAlign: "center" }}>Todo</h2>
        {renderTasks("todo")}
      </div>
      <div className="doing-container">
        <h2 style={{ textAlign: "center" }}>Doing</h2>
        {renderTasks("doing")}
      </div>
      <div className="done-container">
        <h2 style={{ textAlign: "center" }}>Done</h2>
        {renderTasks("done")}
      </div>
    </div>
  );
};

export default Task;
