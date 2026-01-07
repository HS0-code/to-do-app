import { useState } from "react";
import "./App.css";

const App = () => {
  const [activeBtn, setActiveBtn] = useState("All");
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input === "") {
      alert("Please enter a task!");
    }
  };

  return (
    <div className="App">
      <div className="todo-box">
        <h1 className="todo-title">To-Do list</h1>

        <div className="todo-input-row">
          <input
            className="todo-input"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="todo-button" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="todo-filters">
          <button
            className={activeBtn === "All" ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveBtn("All")}
          >
            All
          </button>
          <button
            className={
              activeBtn === "Active" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setActiveBtn("Active")}
          >
            Active
          </button>
          <button
            className={
              activeBtn === "Completed" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setActiveBtn("Completed")}
          >
            Completed
          </button>
        </div>

        <p className="todo-empty">No tasks yet. Add one above!</p>

        <p className="todo-footer">
          Powered by <span>Pinecone Academy</span>
        </p>
      </div>
    </div>
  );
};

export default App;
