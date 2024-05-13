import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "block"
  }
};

// eslint-disable-next-line react/prop-types
const AddTask = ({ isShown, handleToggleShown }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState("todo");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTask = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      title: title,
      description: description,
      task: task
    };
    try {
      const response = await axios.post("http://localhost:3100/todo", data);
      console.log("Task added successfully!", response.data);
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      handleToggleShown();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Modal
      isOpen={isShown}
      onRequestClose={handleToggleShown}
      style={customStyles}
      contentLabel="Add Task Modal"
      ariaHideApp={false}>
      <h2>Add Task</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="task">Task Name:</label>
        <br />
        <input type="text" id="task" name="task" value={title} onChange={handleTitle} required />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={handleDescription}
          rows="3"></textarea>
        <br />
        <select onChange={handleTask}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <br />
        <button type="submit">Add Task</button>
        <button onClick={handleToggleShown}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddTask;
