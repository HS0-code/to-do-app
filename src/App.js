import { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (input === "") {
      alert("Please enter a task!");
      return;
    }

    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="App">
      <div className="todo-box">
        <h1 className="todo-title">To-Do List</h1>

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
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredTasks.map((task, index) => (
          <div className="todo-item" key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span className={task.completed ? "done" : ""}>{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        ))}

        {tasks.length > 0 && (
          <div className="todo-footer-row">
            <span>
              {completedCount} of {tasks.length} tasks completed
            </span>
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        )}

        <p className="todo-footer">
          Powered by <span>Pinecone Academy</span>
        </p>
      </div>
    </div>
  );
};

export default App;
