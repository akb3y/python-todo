import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import axios from "axios";
import "../public/style.css";

const App = () => {
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3100/todo");
      console.log("Response data:", response.data);
      setData(response.data.todos);
    } catch (error) {
      console.error("Error fetching data:", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleCompleted = async (id) => {
    try {
      const updatedData = data.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setData(updatedData);

      // Make a PUT request to update the todo's completed status on the server
      await axios.patch(`http://localhost:3100/todo/${id}`, {
        completed: updatedData.find((todo) => todo.id === id).completed
      });
    } catch (error) {
      console.error("Error toggling completed status:", error);
    }
  };

  const handleToggleShown = async () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <h1>Task Master</h1>
      {isShown ? <AddTask isShown={isShown} handleToggleShown={handleToggleShown} /> : null}
      <Tasks
        data={data}
        handleToggleCompleted={handleToggleCompleted}
        fetchData={fetchData}
        handleToggleShown={handleToggleShown}
      />
    </div>
  );
};

export default App;
