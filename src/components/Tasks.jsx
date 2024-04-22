/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const Tasks = ({ data, handleToggleCompleted, fetchData, handleToggleShown }) => {
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editingDescriptionId, setEditingDescriptionId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3100/todo/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    fetchData();
  };

  const handleEditTitle = (todo) => {
    setEditingTitleId(todo.id);
    setEditingDescriptionId(null);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleEditDescription = (todo) => {
    setEditingTitleId(null);
    setEditingDescriptionId(todo.id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleSave = async (todoId) => {
    try {
      await axios.put(`http://localhost:3100/todo/${todoId}`, {
        title: editedTitle,
        description: editedDescription
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
    setEditingTitleId(null);
    setEditingDescriptionId(null);
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
              <td className="task-col" onClick={() => handleEditTitle(todo)}>
                {editingTitleId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <FaSave onClick={() => handleSave(todo.id)} className="save-icon" />
                  </>
                ) : (
                  todo.title
                )}
              </td>
              <td className="description-col" onClick={() => handleEditDescription(todo)}>
                {editingDescriptionId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <FaSave onClick={() => handleSave(todo.id)} className="save-icon" />
                  </>
                ) : (
                  todo.description
                )}
              </td>
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
      <div className="add-button-container">
        <button className="add-button" onClick={handleToggleShown}>
          Add task
        </button>
      </div>
    </div>
  );
};

export default Tasks;
