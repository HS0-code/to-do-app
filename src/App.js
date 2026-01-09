import { useState } from "react";
import "./App.css";

// React Components --> Functional Component vs Class Component
// Hook --> helps the functional component behave same as class component
// UseState hook --> Allow us to store data within functional component

const App = () => {
  const [tasks, setTasks] = useState(["Task1", "Task2"]);
  const [taskValue, setTaskValue] = useState("");

  const clearTasks = () => setTasks([]);

  const addTask = () => {
    if (taskValue === "") {
      alert("Please enter a task!");
    }

    setTasks((prev) => [...prev, taskValue]);
    setTaskValue("");
  };

  console.log(tasks);

  return (
    <div id="app-container">
      <div id="card">
        <h1>To-do list</h1>

        <div id="task-manager">
          <input
            type="text"
            maxLength={100}
            placeholder="Add a new task..."
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
          <button onClick={clearTasks}>Clear</button>
        </div>

        <ul id="tasks">
          {tasks.map((task) => {
            return <li>{task}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
