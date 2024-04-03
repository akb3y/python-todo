/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const Tasks = ({ data, handleToggleCompleted, fetchData }) => {
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3100/todo/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    fetchData();
  };
  return (
    <div>
      <table className="task-table">
        <thead>
          <tr>
            <th className="task-col">Task</th>
            <th className="description-col">Description</th>
            <th className="completed-col">Done</th>
            <th className="delete-col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((todo) => (
            <tr key={todo.id}>
              <td className="task-col">{todo.title}</td>
              <td className="description-col">{todo.description}</td>
              <td className="completed-col">
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(todo.id)}
                  />
                </label>
              </td>
              <td className="delete-col">
                <MdDeleteForever
                  onClick={() => deleteTask(todo.id)}
                  style={{ color: "red", fontSize: "20px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
