import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import "../public/style.css";

const App = () => {
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3100/todo");
      setData(response.data.todos);
    } catch (error) {
      console.error("Error fetching data:", error.response);
    }
  };

  const handleTaskChange = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3100/todo/${taskId}`, {
        task: newStatus
      });
      console.log("Task status updated successfully!");
      const updatedData = data.map((task) =>
        task.id === taskId ? { ...task, task: newStatus } : task
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3100/todo/${taskId}`);
      const updatedData = data.filter((task) => task.id !== taskId);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleShown = async () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <h1>Task Master</h1>
      {isShown ? <AddTask isShown={isShown} handleToggleShown={handleToggleShown} /> : null}
      <Tasks data={data} handleTaskChange={handleTaskChange} handleDelete={handleDelete} />
      <FaPlus
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "block",
          fontSize: "25px",
          zIndex: 9999
        }}
        onClick={handleToggleShown}
      />
    </div>
  );
};

export default App;
