import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      title: title,
      description: description
    };
    try {
      const response = await axios.post("http://localhost:3100/todo", data);
      console.log("Task added successfully!", response.data);
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="task">Task Name:</label>
      <br />
      <input type="text" id="task" name="task" value={title} onChange={handleTitle} />
      <br />
      <label htmlFor="description">Description:</label>
      <br />
      <textarea
        id="description"
        value={description}
        onChange={handleDescription}
        rows="3"></textarea>
      <br />
      <input type="submit" value="Add Task" />
    </form>
  );
};

export default AddTask;
